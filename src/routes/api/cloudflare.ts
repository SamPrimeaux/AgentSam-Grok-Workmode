import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Body = z.object({
  token: z.string().min(8).max(200),
  accountId: z.string().min(8).max(80),
  projectName: z.string().min(1).max(80),
  files: z
    .array(z.object({ path: z.string().min(1).max(240), content: z.string().max(400_000) }))
    .min(1)
    .max(80),
});

const CF = "https://api.cloudflare.com/client/v4";

async function cf(token: string, path: string, init?: RequestInit) {
  const res = await fetch(`${CF}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.body && !(init.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
      ...(init?.headers ?? {}),
    },
  });
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { errors: [{ message: text.slice(0, 240) }] };
  }
  return { ok: res.ok, status: res.status, json };
}

function cfError(json: unknown) {
  const errors = (json as { errors?: { message?: string }[] } | null)?.errors;
  return errors?.[0]?.message ?? "Cloudflare request failed";
}

export const Route = createFileRoute("/api/cloudflare")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed: z.infer<typeof Body>;
        try {
          parsed = Body.parse(await request.json());
        } catch {
          return Response.json({ error: "Invalid Cloudflare request." }, { status: 400 });
        }

        const { token, accountId, projectName, files } = parsed;
        const slug = projectName
          .toLowerCase()
          .replace(/[^a-z0-9-]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 50);

        const existing = await cf(token, `/accounts/${accountId}/pages/projects/${slug}`);
        if (existing.status === 401 || existing.status === 403) {
          return Response.json({ error: "Cloudflare rejected the token." }, { status: 401 });
        }
        if (!existing.ok) {
          const created = await cf(token, `/accounts/${accountId}/pages/projects`, {
            method: "POST",
            body: JSON.stringify({ name: slug, production_branch: "main" }),
          });
          if (!created.ok) {
            return Response.json({ error: cfError(created.json) }, { status: 502 });
          }
        }

        const form = new FormData();
        for (const file of files) {
          const path = file.path.replace(/^\/+/, "");
          form.append(path, new Blob([file.content], { type: "application/octet-stream" }), path);
        }

        const deployed = await cf(
          token,
          `/accounts/${accountId}/pages/projects/${slug}/deployments`,
          { method: "POST", body: form },
        );

        if (!deployed.ok) {
          return Response.json({ error: cfError(deployed.json) }, { status: 502 });
        }

        const result = (deployed.json as { result?: { url?: string; id?: string } } | null)?.result;
        const url = result?.url ?? `https://${slug}.pages.dev`;
        return Response.json({ ok: true, url, id: result?.id ?? "", project: slug, files: files.length });
      },
    },
  },
});

import { z } from "zod";

/**
 * Validated environment variables. Server and client schemas are kept
 * separate so a server-only secret can never accidentally end up in a
 * client schema (and therefore in the browser bundle).
 *
 * Next.js only inlines `NEXT_PUBLIC_*` vars when they're referenced as a
 * static `process.env.NEXT_PUBLIC_X` property access — do not destructure
 * or loop over `process.env` here, it breaks the inlining.
 */

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
  NEXT_PUBLIC_GA_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_CLARITY_ID: z.string().min(1).optional(),
});

const parsedServerEnv = serverSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
});

const parsedClientEnv = clientSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
});

if (!parsedServerEnv.success) {
  throw new Error(`Invalid server environment variables: ${parsedServerEnv.error.message}`);
}

if (!parsedClientEnv.success) {
  throw new Error(`Invalid client environment variables: ${parsedClientEnv.error.message}`);
}

export const env = {
  ...parsedServerEnv.data,
  ...parsedClientEnv.data,
};

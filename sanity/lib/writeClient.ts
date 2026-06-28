/**
 * writeClient.ts
 *
 * A server-only Sanity client configured with a write-capable API token.
 * Used exclusively in API routes for:
 *   - Creating documents (create)
 *   - Uploading file assets (assets.upload)
 *   - Patching documents (patch)
 *
 * Never import this file in client components — it exposes SANITY_API_TOKEN.
 */

import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN must be off for writes to go to the live API
  useCdn: false,
  // Server-only write token — set in .env.local and Vercel env vars
  token: process.env.SANITY_API_TOKEN,
});

# ctr-reactor
## Secure Admin Access

To access the admin panel using a secret, set the `ADMIN_SECRET` environment variable on the server (do not set `NEXT_PUBLIC_ADMIN_SECRET` unless you intentionally want the value to be public). When `ADMIN_SECRET` is configured, the admin panel will be available at:

	/secure/<ADMIN_SECRET>

Notes:
- Secrets may be comma-separated if you need to allow multiple keys (e.g., `ADMIN_SECRET=abc,def`)
- The route will `decodeURIComponent` the `key` parameter and trim whitespace, so you can use space or URL-encoded characters (`%20`) in the path if necessary.
- For security, the application returns 404 when unauthorized or when the secret isn't set.

Example:
- `ADMIN_SECRET=super-secret-abc` -> https://yourdomain.tld/secure/super-secret-abc

Keep this value secret and rotate it when necessary.

# ctr-reactor-v2
# ctr-reactor

<!-- Redeploy trigger: do not remove -->
<!-- redeploy: 2025-11-22T18:45:00Z -->

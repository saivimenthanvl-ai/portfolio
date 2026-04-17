# Deployment Guide for saivimenthanvl-ai.com

## 1. Push to GitHub
Create a new GitHub repository and upload this project.

## 2. Deploy on Vercel
1. Sign in to Vercel.
2. Click **Add New Project**.
3. Import the GitHub repository.
4. Framework preset: **Vite**.
5. Build command: `npm run build`
6. Output directory: `dist`
7. Deploy.

## 3. Connect Custom Domain
1. In Vercel project settings, open **Domains**.
2. Add `saivimenthanvl-ai.com`.
3. Add `www.saivimenthanvl-ai.com` if you want.
4. Update DNS records at your registrar exactly as Vercel shows.
5. Wait for SSL issuance and propagation.

## 4. Final Checks
- Verify HTTPS works.
- Confirm both root and www resolve correctly.
- Recheck GitHub, LinkedIn, and email links.
- Replace or add a real resume link if desired.

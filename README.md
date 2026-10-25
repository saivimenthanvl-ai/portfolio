# Portfolio website

## Overview

This portfolio website is designed to present personal branding, technical projects, and professional links in a polished and responsive interface. It serves as a central hub for recruiters, collaborators, and developers to explore featured work, GitHub repositories, and social profiles.

## Installation

Clone the repository:

git clone https://github.com/your-username/your-portfolio-repo.git



Install dependencies:

npm install

Run the development server:

npm run dev


## Production Build

npm run build


To preview the build:

npm run preview


## Profile Photo (Local Screen Only)

The profile photo slot appears only on localhost (`localhost`, `127.0.0.1`, `[::1]`) for testing on your local machine:
- The uploaded photo is downscaled and stored strictly in this browser's `localStorage`.
- It is never uploaded or sent to Vercel, GitHub, Vercel Blob, or any server.
- Visitors on the live site, public URLs, or other devices will never see the slot, controls, or photo.
- Clearing site data or clicking "Remove" deletes it.

## Deployment

https://portfolio-git-main-saivimenthanvlai.vercel.app/

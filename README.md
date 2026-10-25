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


## Environment Variables

To enable server-side profile photo storage with Vercel Blob and secure owner upload/deletion controls, configure the following environment variables in your Vercel Project Settings (`Settings -> Environment Variables`):

| Variable | Description |
|---|---|
| `BLOB_READ_WRITE_TOKEN` | Created automatically when you attach a Vercel Blob store to your project in the Vercel dashboard (`Storage -> Connect Store -> Blob`). Grants read/write access to store the profile photo publicly. |
| `OWNER_PASSPHRASE` | A secret password of your choice used to authenticate photo uploads and deletions at `/api/photo`. Access the site with `?owner=1` to open the passphrase unlock prompt. |

## Deployment

https://portfolio-git-main-saivimenthanvlai.vercel.app/

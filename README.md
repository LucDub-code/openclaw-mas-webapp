# OpenClaw MAS

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)

## Stack

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/react-19-20232a.svg?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-4-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Better Auth](https://img.shields.io/badge/better%20auth-000000.svg?style=for-the-badge&logo=betterauth&logoColor=white)

## Overview

Read-only dashboard for a multi-agent AI piloting system built on OpenClaw. AI agents automatically produce activity reports for a group of five companies and answer the director's questions asked through Telegram. This web app reads the Neon PostgreSQL database and displays those reports, answers and the agents' token consumption.

## Deployment

Application on **Vercel**, database **PostgreSQL** on **Neon**

## Technologies

**Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui

**Markdown rendering**: react-markdown, remark-gfm

**Authentication**: Better Auth (email/password)

**Database**: Neon PostgreSQL, read via `@neondatabase/serverless`

## Features

The app is a read-only dashboard with three main sections:

**Reports**: List of consolidated reports produced automatically by the agents, sorted by date, with a badge on the most recent one. Each report opens as rendered markdown (tables included).

**Telegram responses**: List of answers the agents gave to the director's questions asked via Telegram. Each response opens with its question and the full answer rendered as markdown.

**Usage tracking**: Token consumption per agent across two tabs (automatic cycles and Telegram responses). Totals are aggregated in SQL, and each row opens a per-agent breakdown of input, output and total tokens.

**Authentication**: Single-user access (the director) with Better Auth. Protected routes and automatic redirection to login without a session.

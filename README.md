Branch Loan API – DevOps Assignment 🚀

A production-ready setup for running the Loan API service using Docker, NGINX (with HTTPS), PostgreSQL, and GitHub Actions. Designed for multi-environment deployment and easy local development.

📦 Project Overview

This repository contains a containerized version of the Branch Loan API, integrated with:

Docker + Docker Compose

PostgreSQL Database

NGINX as reverse proxy with SSL

Multi-environment support (dev, staging, prod)

Self-signed HTTPS locally using branchloans.com

Placeholder GitHub Actions CI/CD workflow

🛠 Tech Stack
Component	Technology
Backend	Node.js (Express)
Database	PostgreSQL
Reverse Proxy	NGINX (SSL)
Infrastructure	Docker, Compose
CI/CD	GitHub Actions
Monitoring	(TODO: Prometheus)
🏗 Folder Structure
loan-api/
├── app/                  # Node.js Loan API
├── nginx/
│   ├── default.conf      # NGINX reverse proxy config
│   └── ssl/              # Self-signed certs
├── .github/workflows/    # CI/CD workflows
├── .env.dev              # Environment configs
├── docker-compose.yml
├── Dockerfile
└── README.md

<img width="786" height="533" alt="image" src="https://github.com/user-attachments/assets/8ae41707-d150-48b2-bc99-3ff446598944" />


🚀 Run Locally (with HTTPS)
Prerequisites

Docker & Docker Compose installed

Add the following to /etc/hosts:

127.0.0.1  branchloans.com

Generate Self-signed Certificates
mkdir -p nginx/ssl
openssl req -x509 -newkey rsa:4096 -nodes -out nginx/ssl/cert.pem -keyout nginx/ssl/key.pem -days 365 \
  -subj "/C=IN/ST=DL/L=ND/O=Dev/CN=branchloans.com"

Start (in Development Mode)
ENV=dev docker compose up --build

Verify

Open browser:

https://branchloans.com/health
<img width="1919" height="703" alt="image" src="https://github.com/user-attachments/assets/aedc0152-c711-4379-a0dd-9e6b6b68ea1e" />



OR test endpoints:

GET /api/loans

POST /api/loans

GET /api/stats

🌍 Multi-Environment Support

Switch between environments by specifying the ENV variable:

ENV=dev docker compose up -d      # Development
ENV=staging docker compose up -d  # Staging
ENV=prod docker compose up -d     # Production


Each env file (.env.dev, .env.staging, .env.prod) contains configuration overrides.

🔄 CI/CD (GitHub Actions)

A GitHub Actions workflow is included at:

.github/workflows/ci-cd.yml

# LearnPath AI

A full-stack generative AI agent that creates personalized study plans.
Built with **Pydantic AI**, **FastAPI**, and **Next.js**.

## Features

- **Personalized Curriculum**: Generates plans based on topic, level, and time commitment.
- **Agentic Workflow**: Uses Pydantic AI to structure the output into Weeks -> Days -> Tasks.
- **Resource Recommendations**: Suggests books, videos, and articles.

## Tech Stack

- **Backend**: Python, FastAPI, Pydantic AI (OpenRouter/Gemini)
- **Frontend**: Next.js, Tailwind CSS, Framer Motion
- **Deployment**: Vercel

## Setup

1. **Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   cp .env.example .env
   # Add your OPENROUTER_API_KEY to .env
   uvicorn main:app --reload
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Deployment

This project is configured for Vercel.
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the root directory.

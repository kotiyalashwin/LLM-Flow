# OrchLLM - LLM Orchestration Platform
  >> OrchLLM is under developement

OrchLLM menables users to add various nodes
which can use LLMs( Claude or Gemini or OpenAI), and 
assign tasks to them.
This reduces the need of users to move from one LLM to another

//Screenshot here

## Features
- Easy ***UI NODE*** based connection.
-  **Task Dependency** - Task can depend on output of previous tasks.Till prev output is generated. Following task waits.</details>
- Processing and completion updates from backend using ***WebSockets***.
- Acces to **Claude**, **OPEN-AI** and **Gemini** at one place.

## Tech Stack
OrchLLM uses **Nextjs** for Frontend, **Express** based BackendServer and **Websockets** for realtime updates.
The entire project uses **Typescript** as the main language.

## Upcoming Features
- [ ] Rate Limiting 
- [ ] UserAuth (for strict limiting)
- [ ] Better Display of Response in frontend (can stream responses as well)
- [ ] Dockerise the application


# Local Developement

## 1. Clone the repository locally
      
      git clone https://github.com/kotiyalashwin/LLM-Flow

## 2. Copy the env.example

      cd server/
      cp en.example .env

## 4.  Add API Keys

      GEMININ_KEY=
      ANTHROPIC_KEY=
      OPENAI_API_KEY

## 5. Install dependecies inside the respective folders

      cd server/  ---> npm install
      cd web/ --> npm install

## 6. Run both apps locally.

      cd server/ ---> npm run dev
      cd web/ -----> npm run dev

Sitemap Generator 🚀
A full-stack web application that allows users to generate, save, and download sitemaps for any website. This project features a complete user authentication system, a backend API, and a separate frontend built with Next.js.

Live Demo: https://site-map-generator.vercel.app/

## Features
User Authentication: Secure user registration and login functionality.

Dynamic Sitemap Generation: Enter any website URL to crawl and generate a complete sitemap.

Download Options: View and download generated sitemaps in both JSON and XML formats.

User Dashboard: Logged-in users can view a list of their previously generated and saved sitemaps.

Admin Panel: A separate section for administrators to manage users.

Dark Mode: Built-in light/dark theme toggle.

## Tech Stack
This project is a monorepo with a separate backend and frontend.

Frontend:

Framework: Next.js

UI: Mantine UI Component Library

Form Management: Formik & Yup

Notifications: React Hot Toast

Backend:

Runtime: Node.js

Framework: Express.js

Database ODM: Mongoose

Web Scraping: Puppeteer

Database & Deployment:

Database: MongoDB Atlas

Frontend Hosting: Vercel

Backend Hosting: Render

## Project Structure
The project is divided into two main parts inside the root folder:

/frontend: Contains the Next.js application for the user interface.

/backend: Contains the Node.js and Express.js server for the API and database logic.

## Environment Variables
To run this project locally, you need to create two environment files.

Backend (/backend/.env)

Code snippet

DATABASE_URL="your_mongodb_atlas_connection_string"
Frontend (/frontend/.env.local)

Code snippet

NEXT_PUBLIC_API_URL="http://localhost:5500"
## Getting Started (Local Setup)
To get a local copy up and running, follow these simple steps.

### Prerequisites
Node.js and npm installed

A free MongoDB Atlas account

### Installation & Setup
Clone the repository:

Bash

git clone https://github.com/arpit-shukla-13/SiteMapGenerator.git
cd Site-Map-main
Setup the Backend:

Navigate to the backend directory and install dependencies.

Bash

cd backend
npm install
Create a .env file and add your DATABASE_URL (from MongoDB Atlas).

Start the backend server (it will run on http://localhost:5500).

Bash

npm run dev
Setup the Frontend:

Open a new, separate terminal.

Navigate to the frontend directory and install dependencies.

Bash

cd frontend
npm install
Create a .env.local file and add the NEXT_PUBLIC_API_URL variable as shown above.

Start the frontend development server (it will run on http://localhost:3000).

Bash

npm run dev
Open http://localhost:3000 in your browser to see the result.

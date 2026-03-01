# SkyCast Global - Containerized Weather Dashboard

## Project Overview
SkyCast is a real-time weather dashboard fetching data from the OpenWeatherMap API. For Assignment 2 (DevOps Team Collaboration), this application has been migrated from a local deployment into a highly portable, production-ready, and isolated containerized environment using Docker and Docker Compose.

## Group Information
- Student 1 (DevOps): Tharidu Dilshan [ITBNM-2313-0064]
- Student 2 (Frontend): Nadun Dilshan [ITBNM-2313-0035]

## Live Deployment
- Live URL: https://sky-cast-devops-assignment.vercel.app

## Application Features
- Real-time Weather: Retrieves current temperature, humidity, and wind speed.
- Glassmorphism Design: Modern user interface with a dynamic cloudy background.
- Live Clock: Displays current date and time.
- Responsive Gallery: Optimized for both mobile and desktop environments.
- Navigation: Multi-page structure including Home, Forecast, Gallery, and About.

## Technical Stack
- Frontend: HTML5, CSS3 (Flexbox and Grid), JavaScript (Fetch API)
- Version Control: Git and GitHub
- Cloud Deployment: Vercel
- Containerization: Docker, Docker Compose

## Docker Architecture
- Base Image: nginx:alpine
- Architecture: Single-container deployment serving static web assets.
- Networking: Deployed within a custom isolated Docker bridge network (skycast_net).
- Port Mapping: Host port 8080 is mapped to Container port 80.

## Individual Contributions
- Tharidu Dilshan (ITBNM-2313-0064): Repository setup, CI/CD with GitHub Actions, Vercel Deployment, JavaScript Logic, and Docker Containerization.
- Nadun Dilshan (ITBNM-2313-0035): UI Design (HTML/CSS), Frontend Development, and Technical Documentation.

## Branch Strategy
- main: Production release
- develop: Integration branch
- feature/branches: Feature development

## Deployment Instructions (Docker)
To test and evaluate this containerized application on your local machine, please ensure Docker Desktop and Git are installed.

### 1. Clone the Repository
Open your command line interface and execute the following command to clone the project:

git clone https://github.com/RDTharidu/SkyCast-devops-assignment.git
cd SkyCast-devops-assignment

### 2. Build and Execute
Use Docker Compose to build the image and start the container in detached mode:

docker-compose up -d --build

### 3. Access the Application
Once the container initialization is complete, open a web browser and navigate to:
http://localhost:8080

### 4. Teardown
To safely stop and remove the container, network, and associated resources after testing, run:

docker-compose down

## Repository Structure
SkyCast-devops-assignment/
  src/
  Dockerfile
  docker-compose.yml
  .dockerignore
  README.md

# Knock Knock - Community Expertise Sharing

## Installation

1. **Clone the repository**
   ```bash
   git clone <the_url_from_clicking_the_green_url_button>
   cd knock-knock
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   <The_local_host_port_prompted_by_terminal>
   ```

## Project Description

Knock Knock is a location-based community platform that connects neighbors with different expertise areas. Users can discover skilled people nearby and easily reach out for help with various tasks and problems.

## Purpose & Pitch

The app solves the problem of finding local expertise in your neighborhood. Instead of searching online for expensive services or struggling alone, users can find skilled neighbors willing to help - creating a collaborative community where everyone benefits from shared knowledge.


## Please observe

The following functionality have been created (visible in the files) but have been left out of the final version of the submitted draft to the Appathon finale. This is for the sole reason of reducing the steps of installation:
* Express API acting as middlehand (WebSocket) for to clients sending messages (the chat functionality)
* Azure Functions CRUD operations to connect Frontend to Mongo DB

## Key Features

- **Browse nearby experts** - View people in your area with their skills and distance from you
- **Expertise filtering** - Find exactly the skills you need
- **User profiles** - See detailed information about each person including their expertise and recent help provided
- **Direct messaging** - "Knock" button to start conversations with experts
- **Help history** - Track previous assistance provided to build trust

## Tech Stack

- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Backend**: Azure Functions (C# .NET 8)
- **Database**: MongoDB (local with seed data)

## MVP Functionality

- View list of nearby users with their expertise
- Filter users by skills
- Access detailed user profiles showing expertise and recent help
- Initiate direct messages through "Knock" feature
- Browse help history for each user
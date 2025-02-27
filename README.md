# Scriptum

Scriptum is a powerful and user-friendly website designed to help users take
notes and collaborate seamlessly with others. Built using modern web
technologies, Scriptum combines the best of simplicity and functionality to
create an optimal note-taking and collaborative experience.

Live demo: https://scriptum-wnan.vercel.app/

## Features

- **Note-Taking**: Create, edit, and organize your notes effortlessly.
- **Authentication**: Secure and seamless sign-up and sign-in process using
  Clerk.
- **Scalable Backend**: Powered by Convex for real-time data handling and
  EdgeStore for efficient file storage.
- **Modern UI**: Responsive and clean design for a great user experience across
  devices.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) - A React framework for
  server-rendered and static websites.
- **Authentication**: [Clerk](https://clerk.dev/) - A user management and
  authentication solution.
- **Backend**: [Convex](https://www.convex.dev/) - A backend platform for
  building real-time web apps.
- **File Storage**: [EdgeStore](https://www.edgestore.io/) - A fast and reliable
  file storage service.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development environment:

- Node.js (>= 20.18.2)
- npm or yarn

### Installation

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

2. Set up environment variables: Create a `.env.local` file in the root
   directory and configure the following variables:

   ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<clerk-public-key>
    CONVEX_DEPLOYMENT=<convex-deployment>
    NEXT_PUBLIC_CONVEX_URL=<convex-public-key>
    EDGE_STORE_ACCESS_KEY=<edge-access-key>
    EDGE_STORE_SECRET_KEY=<edge-secret-key>
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Your app will be running at [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - Start the development server.
- `npm run build` - Build the application for production.
- `npm start` - Start the production server.
- `npm run lint` - Lint your codebase.

## Screenshots

![Screen Shot 2025-02-27 at 23 11 00 PM](https://github.com/user-attachments/assets/d15413d5-c87e-432e-bfa2-7bb1ad67fc19)

![Screen Shot 2025-02-27 at 23 12 30 PM](https://github.com/user-attachments/assets/503f950b-d392-4efb-8f64-1f1f3e343b73)

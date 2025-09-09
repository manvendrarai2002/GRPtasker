# GRP Tasker

[cite\_start]GRP Tasker is a full-stack task and team management application designed to help modern teams streamline their workflow and boost productivity[cite: 1]. [cite\_start]It's built with a robust tech stack to provide a comprehensive and efficient user experience[cite: 1].

-----

## ✨ Features

  * [cite\_start]**Next.js 14 App Router:** The application uses React and server route handlers for a modern and efficient frontend[cite: 1].
  * [cite\_start]**Tailwind CSS:** The design system is built with Tailwind CSS, supporting a clean and dark-mode friendly theme[cite: 1].
  * [cite\_start]**Prisma ORM with SQLite:** Data is managed using Prisma, with key models for `User`, `Group`, `Task`, `ChecklistItem`, `Comment`, and `Notification`[cite: 1].
  * [cite\_start]**JWT Auth:** Secure authentication is handled via JWT (JSON Web Tokens) with an `httpOnly` cookie, protecting key routes[cite: 1].
  * [cite\_start]**Admin Dashboard:** Admins have a central hub to create and manage tasks, users, and groups, as well as manage group membership[cite: 1, 4].
  * [cite\_start]**Task Details:** Users can view and manage tasks with features like checklist toggles, comments, and progress tracking[cite: 1, 3, 5].
  * [cite\_start]**Analytics Dashboard:** The application includes a server API and page for comprehensive analytics and automated reporting[cite: 1].
  * [cite\_start]**Notifications:** Users receive notifications for new comments on tasks[cite: 5].

-----

## 🚀 Getting Started

[cite\_start]To get the project up and running locally, follow these simple steps[cite: 1]:

1.  **Copy the environment template:**

    ```bash
    cp .env.example .env
    ```

    [cite\_start]Then, edit the `.env` file with your specific values[cite: 1]:

    ```env
    DATABASE_URL="file:./dev.db"
    JWT_SECRET="replace-with-strong-secret"
    NEXT_PUBLIC_BASE_URL="http://localhost:3000"
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Setup and seed the database:**

    ```bash
    npm run db:push
    npm run db:seed
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    [cite\_start]Open your browser and navigate to `http://localhost:3000`[cite: 1].

### **✅ Demo Credentials**

  * [cite\_start]**Admin:** `admin@example.com` / `admin123` [cite: 2]
  * [cite\_start]**Employee:** `jane@example.com` / `password` [cite: 2]

-----

## 🛣️ Main Routes

  * [cite\_start]**`/login`**: The authentication page for users to sign in[cite: 2].
  * [cite\_start]**`/dashboard`**: The user's tasks overview[cite: 4].
  * [cite\_start]**`/admin`**: The admin hub for creating and managing tasks, users, and groups[cite: 4].
  * [cite\_start]**`/tasks/:id`**: The detailed view for a specific task, including checklists and comments[cite: 3, 5].

-----

### Initial Login Page

[cite\_start]The initial login page is a welcoming landing page that highlights the core features of GRP Tasker, including task management, team collaboration, and analytics[cite: 1]. [cite\_start]It provides a clear entry point for users with a prominent login button[cite: 1].

-----

### Login and Admin Dashboard

[cite\_start]Clicking the **Login** button takes you to a simple login page where you can enter your credentials[cite: 2]. [cite\_start]After logging in as an admin, you're directed to the **Admin Dashboard**, which serves as the central control panel for creating new tasks, groups, and users, as well as managing user roles[cite: 4].

-----

### Employee Dashboard and Task View

[cite\_start]When an employee logs in, their dashboard displays all their assigned tasks, showing their progress and due dates[cite: 4]. [cite\_start]Clicking on a task, such as "task1," opens a detailed view where they can see the checklist items and add comments for updates[cite: 3].

-----

### Task Completion and Notifications

[cite\_start]Once a task is complete, an employee can update the checklist and leave a comment for the admin[cite: 5, 6]. [cite\_start]For example, the image shows a comment from "Jane Doe" stating "done and report has been mailed to you"[cite: 5]. [cite\_start]This action triggers a notification for the admin, who can then review the update[cite: 5, 6].

# GRP Tasker

GRP Tasker is a full-stack task and team management application designed to help modern teams streamline their workflow and boost productivity.It's built with a robust tech stack to provide a comprehensive and efficient user experience

-----

✨ Features

1. Next.js 14 App Router: The application uses React and server route handlers for a modern and efficient frontend.


2. Tailwind CSS: The design system is built with Tailwind CSS, supporting a clean and dark-mode friendly theme.


3. Prisma ORM with SQLite: Data is managed using Prisma, with key models for User, Group, Task, ChecklistItem, Comment, and Notification.


4. JWT Auth: Secure authentication is handled via JWT (JSON Web Tokens) with an httpOnly cookie, protecting key routes.


5. Admin Dashboard: Admins have a central hub to create and manage tasks, users, and groups, as well as manage group membership.



6. Task Details: Users can view and manage tasks with features like checklist toggles, comments, and progress tracking.



7. Analytics Dashboard: The application includes a server API and page for comprehensive analytics and automated reporting.


8. Notifications: Users receive notifications for new comments on tasks

-----

## 🚀 Getting Started

To get the project up and running locally, follow these simple steps.

1.  **Copy the environment template:**

    ```bash
    cp .env.example .env
    ```

    Then, edit the `.env` file with your specific values

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

    Open your browser and navigate to `http://localhost:3000`.

### **✅ Demo Credentials**

**Admin:** `admin@example.com` / `admin123` .
**Employee:** `jane@example.com` / `password`.

-----

## 🛣️ Main Routes

**`/login`**: The authentication page for users to sign in.
**`/dashboard`**: The user's tasks overview.
**`/admin`**: The admin hub for creating and managing tasks, users, and groups.
**`/tasks/:id`**: The detailed view for a specific task, including checklists and comments.

-----

### Initial Login Page

The initial login page is a welcoming landing page that highlights the core features of GRP Tasker, including task management, team collaboration, and analytics[cite: 1]. [cite\_start]It provides a clear entry point for users with a prominent login button.
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/8a50d2dc-4908-4f8c-8049-def9126a0156" />


-----

### Login and Admin Dashboard

Clicking the **Login** button takes you to a simple login page where you can enter your credentials. After logging in as an admin, you're directed to the **Admin Dashboard**, which serves as the central control panel for creating new tasks, groups, and users, as well as managing user roles.
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/5a0e6811-6c1c-4ef7-a266-84986b854932" />
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/d739e122-6f31-4fb9-831d-5b19e73bf5f0" />
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/c19f4c05-6377-459a-8eea-018a75e9c805" />



-----

### Employee Dashboard and Task View

When an employee logs in, their dashboard displays all their assigned tasks, showing their progress and due dates.Clicking on a task, such as "task1," opens a detailed view where they can see the checklist items and add comments for updates.
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/270c4db4-0324-4672-95ca-725585a5e256" />
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/2603cd8d-a71e-46be-8145-ae6910b9fe7d" />



-----

### Task Completion and Notifications

Once a task is complete, an employee can update the checklist and leave a comment for the admin. For example, the image shows a comment from "Jane Doe" stating "done and report has been mailed to you". This action triggers a notification for the admin, who can then review the update.

<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/5c2e9521-afd2-49a1-ad01-b68ccded6470" />


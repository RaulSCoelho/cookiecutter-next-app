# Cookiecutter Next App

🍪 A Next.js template with Tailwind CSS and Prisma 🎨

## ✍️ Introduction

Cookiecutter Next App is a template designed to kickstart your Next.js project with a beautiful combination of Tailwind CSS and Prisma.

## ✨ Features

🛠️ **Next.js**: A powerful React framework for building server-side rendered and statically generated web applications.

🌀 **Tailwind CSS**: A utility-first CSS framework that enables you to rapidly build custom and responsive user interfaces.

💎 **Prisma**: A next-generation ORM (Object-Relational Mapping) tool that simplifies database access and management.

## 🚀 Getting Started

To create a new project using the Cookiecutter Next App template, follow these steps:

1. Make sure you have [Node.js](https://nodejs.org) installed on your machine.

2. Install [Cookiecutter](https://cookiecutter.readthedocs.io/)

3. Generate a new Next.js project with the Cookiecutter Next App template:
   
```bash
cookiecutter git@github.com:RaulSCoelho/cookiecutter-next-app.git
```

4. Navigate into the generated project folder:

```bash
cd your-project-name
```

5. Install the project dependencies:

```bash
npm install
```

6. Start the development server:

```bash
npm run dev
```

7. Open your browser and visit http://localhost:3000 to see your new Next.js application in action!

## 🚧 Important

After completing the construction of your schemas, execute the following command to generate the necessary artifacts:

```bash
npx prisma generate --schema="complete path to your schema.prisma file"
npx prisma migrate dev --schema="complete path to your schema.prisma file" // if you are using PostgreSQL
npx prisma db push --schema="complete path to your schema.prisma file" // if you are using MongoDB
```

Make sure to replace "complete path to your schema.prisma file" with the actual file path of your schema.prisma file. 

🎉 Happy coding with your Next.js application! 🚀
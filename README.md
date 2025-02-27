# Task Management Assessment

## 📌 Overview
This project is a backend application built with Node.js, Express, Sequelize, and TypeScript. It provides authentication, task management, and OTP verification.

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:nenzi/task-management.git
   cd task-management

2. Install dependencies:
    ```bash
   npm install
   
3. 📦 Database Setup & Migrations
    ```bash
   npx sequelize-cli db:migrate
   
4. 🔨 Build and Run
   ```bash
   npm run postinstall
   
5. Start Application
   ```bash
   npm run start
   
6. Test Application
   ```bash
   npm test
   
## 📄 Environment Variables 

	•	The .env file has been included in the repository for testing purposes.
	•	Ensure that it contains the correct database configuration before running the application.

## 📮 API Documentation

Postman documentation is available here: https://documenter.getpostman.com/view/12637175/2sAYdfpWRu

## Features

✅ User authentication (Register, Login, Password Reset, OTP Verification)
✅ Task management (CRUD operations)
✅ PostgreSQL with Sequelize ORM
✅ API validation
✅ Secure authentication with JWT

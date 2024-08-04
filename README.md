# About code
this is a Backend of course selling web application that enables users to buy and sell courses. It provides a add courses, user authentication, and facilitating course purchases.

# Features
* User and Admin authentication using JWT tokens
* Add courses (Admin only)
* User signup, login, and course purchase
* View purchased courses by users
* MongoDB database integration
* Express server with token-based authentication

# Tech Stack
## Backend
* Node.js
* Express.js
* MongoDB (via Mongoose)

## Authentication
* JSON Web Tokens (JWT)
* Zod

# Getting Started
## Prerequisites
Make sure you have the following installed:

* Node.js
* npm (Node Package Manager)
* MongoDB

## Installation
Clone the repository:

    git clone https://github.com/satishsurani/Course-selling-website-Backend-Server/
    cd Course-selling-website-Backend-Server

## Install dependencies:

    npm install

## Set up your MongoDB database:
Create a config Folder and inside a folder create a two file name 'jwtconfig.js' nad 'dbconfig.js' 

### dbconfig.js :
    module.exports = 'MONGO_CONNECTION_URL';

### jwtconfig.js :
    module.exports = 'YOUR_JWT_SECRET';

## Run the application:
    node index.js

**or**
    
    npx nodemon index.js

The application should now be running on http://localhost:3000.

## Project Structure
* db : Mongoose Schema Defined.
* middleware : Contains authentication middleware using JWT.
* routes/admin : Defines the API routes for signup, login, create courses, and getting all courses.
* routes/user : Defines the API routes for signup, login, getting all courses which are published, buying a particular course, and getting all purchased courses.

## Usage

* Admin routes:
  
| Method  | End-point | Description |
| ------------- | ------------- | ---------- |
| `POST`  | `/admin/signup`  | Signup as a new admin |
| `POST`  | `/admin/signin`  | 	login as existing admin |
| `GET`  | `/admin/courses`  | List all course |
| `POST`  | `/admin/courses`  | Create a specific course|

* User routes:
  
| Method  | End-point | Description |
| ------------- | ------------- | ---------- |
| `POST`  | `/user/signup`  | Signup as a new user |
| `POST`  | `/user/signin`  | 	login as existing user |
| `GET`  | `/user/courses`  | Get all published course |
| `POST`  | `/user/courses:courseId`  | Purchase a specific course |
| `GET` | `/purchasedCourses` | List all purchased course |

**Feel free to contribute to this project, report issues, or suggest improvements. Happy coding!**
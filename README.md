# Visitors Tracker

This is a full-stack clock-in system that tracks users' entry and exit times. The application consists of a backend built with Node.js and Express, and a frontend built with React (Vite). It also uses MySQL for database management.

## Prerequisites

- **Node.js & npm**: [Install Node.js](https://nodejs.org/)
- **XAMPP**: [Install XAMPP](https://www.apachefriends.org/index.html) and ensure MySQL is running.
- **Vite**: Run `npm install -g vite` if Vite is not installed globally.

## Installation

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/visitors-tracker.git
   cd visitors-tracker/backend
   ```
2. **Create a .env file**

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=visitors_tracker
PORT=3000
```

3. **Install dependencies**
   `npm install`

4. **Start Backend**
   `npm start`

### Frontend Setup

This is the frontend of the Clock-In Application built with React and Vite.

`cd visitors-tracker/frontend`

1. **Install dependencies**
   `npm install`

2. **Start Backend**
   `npm run dev`

## Screenshots

### Dashboard

![image](https://github.com/user-attachments/assets/1b653f40-dfca-4b94-8a24-c55585e90d19)

### Check In

![image](https://github.com/user-attachments/assets/15b5a54e-e90d-434b-bdb2-06f2f071b03e)

### Check Out

![image](https://github.com/user-attachments/assets/7e057db0-0dc0-4531-a76c-7b83c5a150b4)

### Add User

![image](https://github.com/user-attachments/assets/1043363a-1480-4f1e-8627-ff8f85520e44)

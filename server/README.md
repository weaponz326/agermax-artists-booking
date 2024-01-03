# Agermax Artists Booking App - Backend

## Overview

This is the backend repository for Agermax, an artist booking management application. It handles user authentication, artist profiles, event organization, and booking management.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT) for authentication

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB Compass

### Installing

1. **Clone the Repository**

   ```
   git clone [URL of the Agermax repository]
   cd agermax-artists-booking/server
   ```

2. **Install Dependencies**

   ```
   npm install
   ```

3. **Set Environment Variables**

   Create a `.env` file in the root directory and add the following:

   ```
   JWT_SECRET=your_jwt_secret
   MONGO_URI=mongodb://localhost:27017/booking_app
   NODE_ENV=development
   ```

4. **Start the Server**

   ```
   npm start
   ```

   The server should be running on `http://localhost:5000`.

## API Documentation

- **User Authentication**
  - `POST /api/users/register`: Register a new user
  - `POST /api/users/login`: Login a user

  Additional API endpoints for artists, event organizers, and bookings should be documented similarly.

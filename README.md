# Personal Blog Platform

A simple blog platform where users can create, manage, and view blog posts. The platform includes authentication (sign up, login), post creation, and post management functionalities, along with a user dashboard.

![Screenshot 2024-11-23 225648](https://github.com/user-attachments/assets/866b5b43-ee4c-48ea-8b54-f24fab7a6568)

![Screenshot 2024-11-23 225657](https://github.com/user-attachments/assets/e94bd122-525b-438a-a19b-aec5d67a822d)

---

## Features

- **User Authentication**: 
  - Register and log in to the platform.
  - Session management using JWT tokens.
  
- **Post Management**: 
  - Create blog posts with a title and content.
  - View and edit your own posts from the dashboard.

- **Search Functionality**: 
  - Search posts by author name.

- **Responsive Design**: 
  - Fully responsive UI for desktop, tablet, and mobile devices.

- **Animations**: 
  - Smooth animations for a polished user experience (e.g., fade-in, slide-up).

---

## Tech Stack

- **Frontend**: 
  - React, Next.js, TypeScript, Styled Components.
  
- **Backend**: 
  - Node.js, Express, MongoDB, JWT-based Authentication.

---

## Getting Started

Follow the instructions below to get the project up and running locally.

### Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (MongoDB Atlas recommended)

---

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Vikas-hub17/personal-blog-platform.git
   cd personal-blog-platform/backend
   
2. **Create a .env file in the backend directory and add your MongoDB connection URI and JWT secret:**:
   MONGO_URI=your_mongodb_connection_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000

3. **Start the backend Server**:
   npm start

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd personal-blog-platform/frontend
   
2. **Create a .env.local file in the frontend directory and add your API base URL:**
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000


4. **Start the backend Server**:
   npm run dev

**How to Use**
1. Sign Up:

- Go to the homepage and click on "Sign Up" to create a new account.

2. Login:

- After registering, log in with your credentials to access your dashboard.

3. Create a Post:

- In the dashboard, fill in the title and content of your post and submit it.
- Your posts will appear under "Your Posts".

4.View Posts:

- On the homepage, all posts will be displayed. You can filter them by author using the search bar.




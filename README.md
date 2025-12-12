## Project Overview

**ChefBazaar** is a modern online marketplace for local home-cooked meals. The platform connects home cooks (chefs) with customers looking for fresh, homemade food. Customers can explore daily menus, place orders, make secure payments, leave reviews, and track their orders in real time.  

For home cooks, it provides an easy way to earn income from their kitchen without the need for a physical restaurant. For customers, it offers access to healthy, affordable, homemade meals prepared by local chefs.  

The application is built using the **MERN stack**: MongoDB, Express.js, React, and Node.js. It includes role-based access control, JWT authentication, and a responsive, modern design.

## Live Demo

🔗 **Client URL:** [https://chefbazar.netlify.app/]  

## Key Features

### General
- Responsive layout for mobile, tablet, and desktop
- Dynamic title for every route
- Smooth animations (using Framer Motion)
- JWT-based authentication for secure access
- Loading and error pages

### Public Pages
- Home Page with animated hero, dynamic daily meals, and customer reviews
- Meals Page with pagination (10 meals per page), sort functionality, and meal details
- Registration & Login using Firebase Authentication
- Navbar & Footer with proper design, working hours, and social media links

### Private Pages (Protected by JWT)
- **Meal Details Page:** Full details of selected meals, order option, reviews, and add to favorites
- **Order Page:** Confirm orders with auto-filled meal info and quantity selection
- **Profile Page:** User information, role management (Be a Chef / Be an Admin requests)
- **Dashboard Pages:**
  - **User Dashboard:** Profile, Orders, Reviews, Favorite Meals
  - **Chef Dashboard:** Profile, Create Meal, My Meals, Order Requests
  - **Admin Dashboard:** Manage Users, Manage Requests, Platform Statistics
- **Favorite Meals Page:** View, manage, and delete favorite meals
- **My Orders Page:** View all orders with payment integration via Stripe
- **My Reviews Page:** View, update, and delete reviews

### Admin Features
- View and manage all users
- Approve/reject chef/admin requests
- Mark users as "fraud" to restrict functionality
- Platform statistics visualization using Recharts

### Chef Features
- Add, update, and delete meals
- Manage order requests from users
- Track payment status and order progress

### Additional Features
- Axios interceptors for request handling (optional)
- Search functionality (optional)
- Dark and light theme toggle (optional)
- All forms use **react-hook** for validation
- Secure Firebase and MongoDB credentials via environment variables

## User Roles

| Role      | Permissions                                                                 |
|-----------|-----------------------------------------------------------------------------|
| Admin     | Full system access, manage users, chefs, orders, platform settings          |
| Chef      | Create & manage meals, handle customer orders                               |
| Customer  | Browse meals, place orders, leave reviews, manage favorite meals            |

---

## Technologies Used

**Frontend:**
- React.js
- React Router
- Framer Motion
- React Hook Form
- Axios
- SweetAlert2
- DaisyUI / TailwindCSS
- Recharts

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT for authentication
- Firebase for authentication
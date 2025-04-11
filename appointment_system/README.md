# Appoinment System

This project is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) to provide a user-friendly and efficient system for managing doctor appointments. Patients can search for doctors by specialty, location, or availability, book appointments, view their appointment history, and manage their profile information. Doctors can manage their schedules, view patient information, and update appointment statuses.

## Key Features:

- Patient registration and profile management
- Doctor registration and profile management
- Appointment search and booking
- Appointment cancellation and rescheduling
- Appointment history and notifications
- Secure authentication and authorization
- Responsive and user-friendly design

## Technologies:

- Front-end: React.js, Redux, Ant Design, Bootstrap
- Back-end: Express.js, Node.js
- Database: MongoDB
- Authentication: JWT (JSON Web Token)
- Other dependencies: Axios, Moment

## API Endpoints:

### User Routes (`/api/v1/user`)
- `POST /login` - User login
- `POST /register` - User registration
- `POST /getUserData` - Get logged-in user's data (protected)
- `POST /apply-doctor` - Apply for a doctor account (protected)
- `POST /get-all-notification` - Get all user notifications (protected)
- `POST /delete-all-notification` - Delete all user notifications (protected)
- `GET /getAllDoctors` - Get list of approved doctors (protected)
- `POST /book-appointment` - Book an appointment with a doctor (protected)
- `POST /booking-availbility` - Check appointment availability (protected)
- `GET /user-appointments` - Get user's booked appointments (protected)

### Doctor Routes (`/api/v1/doctor`)
- `POST /getDoctorInfo` - Get doctor's profile information (protected)
- `POST /updateProfile` - Update doctor's profile (protected)
- `POST /getDoctorById` - Get doctor info by ID (protected)
- `GET /doctor-appointments` - Get doctor's appointments (protected)
- `POST /update-status` - Update appointment status (protected)

### Admin Routes (`/api/v1/admin`)
- `GET /getAllUsers` - Get all registered users (protected)
- `GET /getAllDoctors` - Get all doctor applications (protected)
- `POST /changeAccountStatus` - Approve/reject doctor applications (protected)


## Usage:

1. Open the application in your web browser (usually at http://localhost:3000).
2. Register as a patient or doctor (or use existing accounts if available).
3. Explore the features and functionality as needed.

## Database Schema:

### User Schema
- name: String (required)
- email: String (required)
- password: String (required, hashed)
- isAdmin: Boolean (default: false)
- isDoctor: Boolean (default: false)
- notification: Array (default: [])
- seennotification: Array (default: [])

### Doctor Schema
- userId: String (reference to User)
- firstName: String (required)
- lastName: String (required)
- phone: String (required)
- email: String (required)
- website: String
- address: String (required)
- specialization: String (required)
- experience: String (required)
- feesPerCunsaltation: Number (required)
- status: String (default: "pending")
- timings: Object (required)

### Appointment Schema
- userId: String (required)
- doctorId: String (required)
- doctorInfo: String (required)
- userInfo: String (required)
- date: String (required)
- status: String (required, default: "pending")
- time: String (required)
# Courier Tracking CMS

A full-stack courier website with parcel tracking and an admin dashboard, built with the **MERN stack** (MongoDB, Express, React, Node.js).

Customers can browse services, book shipments and track parcels. Admins manage everything from one dashboard.

---

## Features

**Customers**
- Register and log in
- Browse services, company info and gallery
- Submit shipment requests
- Track a parcel with its tracking number
- View their shipment history

**Admin**
- Dashboard with totals (shipments, pending, delivered, customers)
- Create, edit and delete shipments
- Update shipment status and add tracking updates (location, date/time, remarks)
- Manage services (add, edit, delete, activate/deactivate)
- Manage gallery content
- Manage customers
- Update own profile and password

**Shipment statuses:** `Booked` → `Picked Up` → `In Transit` → `Out for Delivery` → `Delivered` (or `Cancelled`)

---

## Tech Stack

| Part | Technologies |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, React Router, Lucide Icons |
| Backend | Node.js, Express, REST APIs |
| Database | MongoDB, Mongoose |
| Security | JWT authentication, bcrypt password hashing, role-based access |

---

## Project Structure

```text
courier-tracking-cms/
├── frontend/          # React app
│   └── src/           # components, pages, layouts, routes, services
├── backend/           # Express API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── README.md
```

---

## Getting Started

**Requirements:** Node.js and a MongoDB database (local or Atlas).

**1. Clone the repository**

```bash
git clone <your-github-repository-url>
cd courier-tracking-cms
```

**2. Set up the backend**

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm run dev
```

**3. Set up the frontend** (in a new terminal)

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

> Never commit your `.env` file or real secrets to GitHub.

---

## API Endpoints

| Area | Method | Endpoint | Description |
| --- | --- | --- | --- |
| Auth | POST | `/api/auth/register` | Register a user |
| | POST | `/api/auth/login` | Log in |
| | GET | `/api/auth/me` | Get current user |
| Shipments | GET | `/api/shipments` | List shipments |
| | GET | `/api/shipments/:id` | Get one shipment |
| | POST | `/api/shipments` | Create shipment |
| | PUT | `/api/shipments/:id` | Update shipment |
| | DELETE | `/api/shipments/:id` | Delete shipment |
| Tracking | GET | `/api/tracking/:trackingNumber` | Track a parcel |
| | POST | `/api/shipments/:id/tracking` | Add tracking update |
| | PATCH | `/api/shipments/:id/status` | Update status |
| Services | GET | `/api/services` | List services |
| | POST | `/api/services` | Create service |
| | PUT | `/api/services/:id` | Update service |
| | DELETE | `/api/services/:id` | Delete service |
| Gallery | GET | `/api/gallery` | List gallery items |
| | POST | `/api/gallery` | Add item |
| | DELETE | `/api/gallery/:id` | Delete item |

Admin-only routes are protected with JWT and role checks.

**Database collections:** `users`, `shipments`, `trackingUpdates`, `services`, `gallery`

---

## Deployment

- **Frontend:** run `npm run build` and deploy the `dist/` folder (e.g. Vercel).
- **Backend:** deploy the Express app to any Node.js host and set the environment variables there.
- **Database:** MongoDB (e.g. MongoDB Atlas).

---

## Future Ideas

- Email and SMS notifications
- Online payments
- Real-time tracking
- Driver management
- Analytics and route optimization
- Mobile app

---

## Author

**Rajesh Podilapu**
B.Tech — Computer Science & Engineering (AI/ML)

Built as an individual internship project for learning and demonstration purposes.
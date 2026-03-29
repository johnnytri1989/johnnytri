# LipGlow Cosmetics E-commerce

Complete full-stack lipstick e-commerce platform with React + Tailwind frontend and Express + MongoDB backend.

## Project structure

```text
johnnytri/
├── backend/
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── seed.js
│       ├── config/
│       │   ├── db.js
│       │   └── upload.js
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── cartController.js
│       │   ├── orderController.js
│       │   └── productController.js
│       ├── middleware/
│       │   ├── authMiddleware.js
│       │   └── errorMiddleware.js
│       ├── models/
│       │   ├── User.js
│       │   ├── Product.js
│       │   └── Order.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── cartRoutes.js
│       │   ├── orderRoutes.js
│       │   └── productRoutes.js
│       └── utils/
│           └── generateToken.js
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── api/client.js
│       ├── context/AuthContext.jsx
│       ├── components/
│       │   ├── FilterBar.jsx
│       │   ├── Navbar.jsx
│       │   └── ProductCard.jsx
│       └── pages/
│           ├── AdminPage.jsx
│           ├── CartPage.jsx
│           ├── HomePage.jsx
│           ├── LoginPage.jsx
│           ├── OrdersPage.jsx
│           └── ProductDetailPage.jsx
└── README.md
```

## Features implemented

- JWT auth (register/login)
- Product browsing, search, filter by color/brand/price
- Best seller section
- Product detail with fake reviews
- Cart + mock checkout
- Order history (user)
- Admin product CRUD + order management
- REST API with modular controllers/routes
- Input validation and error handling
- Environment-based configuration

## Setup instructions

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

Backend runs on `http://localhost:5000`.

### 2) Frontend

```bash
cd frontend
npm install
# optional .env file
# VITE_API_BASE_URL=http://localhost:5000/api
npm run dev
```

Frontend runs on `http://localhost:5173`.

## API endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Products
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)

### Cart
- `GET /api/cart`
- `POST /api/cart`
- `PUT /api/cart/:productId`
- `DELETE /api/cart`

### Orders
- `POST /api/orders`
- `GET /api/orders/my`
- `GET /api/orders` (admin)
- `PUT /api/orders/:id/status` (admin)

## Sample data

Seed command creates:
- Admin user: `admin@lipglow.com / Admin123!`
- Customer user: `jane@example.com / Password123!`
- 3 lipstick products with ratings, best-seller flags, and fake reviews.

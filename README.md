# E-commerce Platform

A full-featured e-commerce platform with payment integration (Stripe/PayPal), inventory management, and user authentication.

## Features

- User authentication and authorization
- Product browsing and searching
- Shopping cart functionality
- Checkout process
- Payment processing with Stripe and PayPal
- Order tracking
- Admin panel for inventory management
- Product reviews and ratings

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment Processing**: Stripe, PayPal

## Setup Instructions

### Prerequisites

- Node.js (v14.0.0 or later)
- MongoDB account
- Stripe and PayPal developer accounts

### Installation

1. Clone the repository
   ```
   git clone https://github.com/Latex999/ecommerce-platform.git
   cd ecommerce-platform
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   - Copy `.env.example` to `.env`
   - Fill in your MongoDB connection string, JWT secret, and payment API keys

4. Run the server
   ```
   npm run dev
   ```

## Client Setup (Frontend)

The frontend of this application is built with React. To set it up:

1. Navigate to the client directory
   ```
   cd client
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the client
   ```
   npm start
   ```

## API Endpoints

### Users
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a product (Admin)
- `PUT /api/products/:id` - Update a product (Admin)
- `DELETE /api/products/:id` - Delete a product (Admin)

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/myorders` - Get logged in user's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin)

### Payments
- `POST /api/payments/stripe` - Process payment with Stripe
- `POST /api/payments/paypal` - Create PayPal payment
- `POST /api/payments/paypal/execute` - Execute PayPal payment
- `GET /api/payments/paypal/client-id` - Get PayPal client ID

## Deployment

This application can be deployed to platforms like Heroku:

1. Create a new Heroku app
2. Connect your GitHub repository
3. Set up environment variables in Heroku dashboard
4. Deploy the application

## License

This project is licensed under the MIT License.
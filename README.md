# E-commerce API

A simple RESTful API for an e-commerce platform built using Node.js, Express, and MongoDB. The API includes authentication, user management, product handling, orders, and cart functionalities, secured with JWT-based authentication.

## Features

- **User Authentication**: Register, login, and manage user accounts with JWT token-based verification.
- **Product Management**: Create, update, delete, and fetch product details.
- **Order Handling**: Place orders, view order history, and fetch income statistics using MongoDB aggregation.
- **Cart Management**: Add and remove products from the cart.
- **Admin Controls**: Access to user, order, and product management with admin privileges.

## Tech Stack

- **Node.js**: Backend runtime environment
- **Express**: Web framework for building RESTful APIs
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM for MongoDB
- **JWT (jsonwebtoken)**: For secure authentication
- **bcryptjs**: For password hashing
- **dotenv**: For environment variable management
- **morgan**: HTTP request logger

## Prerequisites

- **Node.js** and **npm** installed
- **MongoDB** installed locally or a MongoDB Atlas account

## API Endpoints

### User Routes

- **POST /api/users/signup**: Register a new user
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword",
      "name": "John Doe"
    }
    ```

- **POST /api/users/login**: Log in an existing user
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
  - Response:
    ```json
    {
      "token": "your_jwt_token"
    }
    ```

- **PUT /api/users/:id**: Update an existing user (admin or authorized user)
  - Request Body:
    ```json
    {
      "name": "Updated Name",
      "email": "updated_email@example.com",
      "password": "newpassword"
    }
    ```

- **DELETE /api/users/:id**: Delete an existing user (admin or authorized user)
  - Response:
    ```json
    {
      "message": "User deleted from Database"
    }
    ```

- **GET /api/users/find/:id**: Get a user by ID (admin only)
  - Response:
    ```json
    {
      "name": "User Name",
      "email": "user@example.com",
      "createdAt": "2024-01-01T00:00:00Z"
    }
    ```

- **GET /api/users**: Get all users (admin only)
  - Query Parameters: `new=true` to get the most recent user.
  - Response:
    ```json
    [
      {
        "name": "User Name",
        "email": "user@example.com",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ]
    ```

- **GET /api/users/stats**: Get the number of new users registered per month (admin only)
  - Response:
    ```json
    [
      {
        "_id": 1,
        "total": 5
      },
      {
        "_id": 2,
        "total": 10
      }
    ]
    ```

---

### Product Routes

- **POST /api/products**: Add a new product (admin only)
  - Request Body:
    ```json
    {
      "name": "Product Name",
      "description": "Product Description",
      "price": 100,
      "categories": ["Category1", "Category2"]
    }
    ```

- **PUT /api/products/:id**: Update an existing product (admin only)
  - Request Body:
    ```json
    {
      "name": "Updated Product Name",
      "price": 120
    }
    ```

- **DELETE /api/products/:id**: Delete an existing product (admin only)
  - Response:
    ```json
    {
      "message": "Product has been deleted successfully!"
    }
    ```

- **GET /api/products/find/:id**: Get a product by ID
  - Response:
    ```json
    {
      "name": "Product Name",
      "description": "Product Description",
      "price": 100,
      "categories": ["Category1", "Category2"]
    }
    ```

- **GET /api/products**: Get all products
  - Query Parameters:
    - `new=true`: Get the latest products.
    - `category=CategoryName`: Filter by category.
  - Response:
    ```json
    [
      {
        "name": "Product Name",
        "price": 100,
        "categories": ["Category1"]
      }
    ]
    ```

---

### Order Routes

- **POST /api/orders**: Create a new order
  - Request Body:
    ```json
    {
      "userId": "user_id",
      "items": [
        { "productId": "product_id", "quantity": 2 }
      ],
      "totalAmount": 200
    }
    ```

- **PUT /api/orders/:id**: Update an existing order (admin only)
  - Request Body:
    ```json
    {
      "status": "shipped"
    }
    ```

- **DELETE /api/orders/:id**: Delete an order (admin only)
  - Response:
    ```json
    {
      "message": "Order deleted successfully!"
    }
    ```

- **GET /api/orders/find/:userId**: Get an order by user ID (admin only)
  - Response:
    ```json
    {
      "userId": "user_id",
      "items": [
        { "productId": "product_id", "quantity": 2 }
      ],
      "totalAmount": 200
    }
    ```

- **GET /api/orders**: Get all orders (admin only)
  - Response:
    ```json
    [
      {
        "userId": "user_id",
        "items": [
          { "productId": "product_id", "quantity": 2 }
        ],
        "totalAmount": 200
      }
    ]
    ```

- **GET /api/orders/income**: Get monthly income from orders (admin only)
  - Response:
    ```json
    [
      {
        "_id": 1,
        "total": 500
      },
      {
        "_id": 2,
        "total": 800
      }
    ]
    ```

---

### Cart Routes

- **POST /api/carts**: Create a new cart for a user
  - Request Body:
    ```json
    {
      "userId": "user_id",
      "items": [
        { "productId": "product_id", "quantity": 2 }
      ]
    }
    ```

- **PUT /api/carts/:id**: Update an existing cart (authorized user only)
  - Request Body:
    ```json
    {
      "items": [
        { "productId": "product_id", "quantity": 3 }
      ]
    }
    ```

- **DELETE /api/carts/:id**: Delete a cart (authorized user only)
  - Response:
    ```json
    {
      "message": "Order removed from cart successfully!"
    }
    ```

- **GET /api/carts/find/:userId**: Get a cart by user ID (authorized user only)
  - Response:
    ```json
    {
      "userId": "user_id",
      "items": [
        { "productId": "product_id", "quantity": 2 }
      ]
    }
    ```

- **GET /api/carts**: Get all carts (admin only)
  - Response:
    ```json
    [
      {
        "userId": "user_id",
        "items": [
          { "productId": "product_id", "quantity": 2 }
        ]
      }
    ]
    ```

---

### Authentication and Authorization Middleware

- **verifyTokenAndAuthorization**: Middleware to ensure the user is authorized to access the resource.
- **verifyTokenAndAdmin**: Middleware to ensure the user has admin privileges to access the resource.

---


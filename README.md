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

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/L3vi-Ackerman/E-commerce-API-using-Node.js.git
   cd e-commerce-api/server

# MRA Backend

This repository contains the backend code for the MRA platform. The backend is built with Node.js, Express, TypeScript, and MongoDB. It handles the core logic for user authentication, database interaction, and payment integration.


## Installation

To get started with the MRA backend, follow the steps below:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/alimransahin/mra-backend.git
   cd mra-backend
2. **Install dependencies**:
   ```bash
   npm install
3. **Environment Variables**
Make sure to create a .env file in the root of the project. Below is an example of the required environment variables:
   ```bash
    NODE_ENV=development
    PORT=5000
    DATABASE_URL=mongodb+srv://mra:mra@cluster0.vgokw2y.mongodb.net/mra?retryWrites=true&w=majority&appName=Cluster0
    BCRYPT_SALT_ROUNDS=12
    DEFAULT_PASS=rentCar@#$
    JWT_ACCESS_SECRET=rent_car
    JWT_ACCESS_EXPIRE_IN=1d
    JWT_REFRESH_SECRET=refresh_rent_car
    JWT_REFRESH_EXPIRE_IN=10d
    STORE_ID=aamarpaytest
    SIGNATURE_KEY=dbb74894e82415a2f7ff0ec3a97e4183
    PAYMENT_URL=https://sandbox.aamarpay.com/jsonpost.php
    RESET_UI_LINK=https://mra-six.vercel.app/
4. **Running the Project**
```bash
npm run dev

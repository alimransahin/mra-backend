## Environment Variables

The application requires several environment variables to function correctly. Below are the environment variables that need to be set in a `.env` file at the root of the project:

```bash
# Environment: set to development during development
NODE_ENV=development

# Server Port
PORT=5000

# MongoDB Database URL
DATABASE_URL=mongodb+srv://rent-car:rent-car@cluster0.vgokw2y.mongodb.net/rentCar?retryWrites=true&w=majority&appName=Cluster0

# Bcrypt Salt Rounds for password hashing
BCRYPT_SALT_ROUNDS=12

# Default password for new users
DEFAULT_PASS=rentCar@#$

# JWT Configuration
JWT_ACCESS_SECRET=rent_car
JWT_ACCESS_EXPIRE_IN=1d
JWT_REFRESH_SECRET=refresh_rent_car
JWT_REFRESH_EXPIRE_IN=10d

# Payment Gateway Information (Aamarpay)
STORE_ID=aamarpaytest
SIGNATURE_KEY=dbb74894e82415a2f7ff0ec3a97e4183

# Aamarpay Payment URL for the sandbox environment
PAYMENT_URL=https://sandbox.aamarpay.com/jsonpost.php
```

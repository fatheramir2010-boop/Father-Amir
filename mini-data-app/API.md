# API Documentation

## Base URLs

- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-backend-url/api`

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Get Token

After login, you'll receive a token:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "walletBalance": 0,
    "referralCode": "REF12345678"
  }
}
```

---

## Endpoints

### Authentication

#### Register User

```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+234 800 000 0000",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+234 800 000 0000",
    "walletBalance": 0,
    "referralCode": "REF1f77bcf8"
  }
}
```

---

#### Login User

```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "walletBalance": 5000,
    "referralCode": "REF1f77bcf8"
  }
}
```

---

#### Get Current User

```
GET /auth/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+234 800 000 0000",
    "walletBalance": 5000,
    "referralCode": "REF1f77bcf8",
    "isAdmin": false,
    "accountStatus": "active",
    "createdAt": "2026-06-07T14:00:00Z",
    "updatedAt": "2026-06-07T14:30:00Z"
  }
}
```

---

### User Profile

#### Get User Profile

```
GET /user/profile
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+234 800 000 0000",
    "walletBalance": 5000
  }
}
```

---

### Wallet

#### Get Wallet Balance

```
GET /wallet/balance
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "balance": 5000
}
```

---

#### Fund Wallet

```
POST /wallet/fund
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 10000,
  "paymentMethod": "paystack",
  "reference": "MINI_DATA_123456789"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Wallet funded successfully",
  "newBalance": 15000
}
```

---

#### Get Wallet History

```
GET /wallet/history
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "transactions": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439012",
      "type": "fund_wallet",
      "amount": 10000,
      "status": "successful",
      "reference": "MINI_DATA_123456789",
      "createdAt": "2026-06-07T14:00:00Z"
    }
  ]
}
```

---

### VTU Services

#### Get Available Plans

```
GET /vtu/plans
```

**Response (200):**
```json
{
  "success": true,
  "plans": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "1GB - 1 Day",
      "network": "MTN",
      "type": "data",
      "amount": 500,
      "sellingPrice": 550,
      "validity": "1 Day",
      "dataSize": "1GB",
      "description": "1GB data valid for 1 day",
      "isActive": true
    }
  ]
}
```

---

#### Buy Data

```
POST /vtu/data/buy
Authorization: Bearer <token>
Content-Type: application/json

{
  "network": "MTN",
  "phone": "+234 800 000 0000",
  "amount": 550,
  "planId": "507f1f77bcf86cd799439011"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Data purchase successful",
  "reference": "MINI_DATA_987654321",
  "status": "successful",
  "newBalance": 4450
}
```

---

#### Buy Airtime

```
POST /vtu/airtime/buy
Authorization: Bearer <token>
Content-Type: application/json

{
  "network": "MTN",
  "phone": "+234 800 000 0000",
  "amount": 1000
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Airtime purchase successful",
  "reference": "MINI_DATA_987654321",
  "status": "successful",
  "newBalance": 4000
}
```

---

### Transactions

#### Get User Transactions

```
GET /transactions
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "transactions": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439012",
      "type": "buy_data",
      "amount": 550,
      "status": "successful",
      "reference": "MINI_DATA_987654321",
      "network": "MTN",
      "phone": "+234 800 000 0000",
      "createdAt": "2026-06-07T14:00:00Z"
    }
  ]
}
```

---

### Admin

#### Get Dashboard Stats

```
GET /admin/dashboard
Authorization: Bearer <token>
```

**Note**: User must have `isAdmin: true`

**Response (200):**
```json
{
  "success": true,
  "totalUsers": 150,
  "totalTransactions": 500,
  "totalRevenue": 125000,
  "totalWalletBalance": 50000
}
```

---

#### Get All Users

```
GET /admin/users
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+234 800 000 0000",
      "walletBalance": 5000,
      "isAdmin": false,
      "accountStatus": "active"
    }
  ]
}
```

---

## Error Responses

### 400 - Bad Request

```json
{
  "message": "Please provide all required fields"
}
```

### 401 - Unauthorized

```json
{
  "message": "Not authorized to access this route"
}
```

### 403 - Forbidden

```json
{
  "message": "Not authorized as admin"
}
```

### 404 - Not Found

```json
{
  "message": "Route not found"
}
```

### 500 - Server Error

```json
{
  "message": "Internal Server Error"
}
```

---

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per IP

---

## Testing

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+234800000000",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get Profile (use token from login)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Create new request
2. Set method (GET, POST, etc.)
3. Enter endpoint URL
4. Set headers: `Authorization: Bearer <token>`
5. Add body (JSON) if needed
6. Send request

---

## Webhooks

### Paystack Webhook

**Endpoint**: `POST /webhook/paystack`

**Payload:**
```json
{
  "event": "charge.success",
  "data": {
    "reference": "MINI_DATA_123456789",
    "status": "success",
    "amount": 1000000,
    "customer": {
      "email": "user@example.com"
    }
  }
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Endpoint not found |
| 500 | Server Error - Internal error |

---

## Best Practices

1. **Always use HTTPS** in production
2. **Store tokens securely** in httpOnly cookies
3. **Validate input** on client and server
4. **Handle errors gracefully** with proper status codes
5. **Use rate limiting** to prevent abuse
6. **Monitor API usage** and performance
7. **Keep dependencies updated** for security
8. **Log important events** for debugging

---

## Support

For issues or questions:
1. Check the documentation
2. Review error logs
3. Contact support team
4. Open GitHub issue

---

Last Updated: June 7, 2026

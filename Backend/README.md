# User API Documentation

## Register User
Register a new user in the system.

**Endpoint:** `POST /user/register`

### Request Body
```json
{
  "fullName": {
    "firstName": "string", // minimum 3 characters
    "lastName": "string"   // minimum 3 characters
  },
  "email": "string",      // valid email format
  "password": "string"    // minimum 6 characters
}
```

### Response

#### Success Response
**Code:** 201 Created
```json
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string",
    "_id": "string"
  }
}
```

#### Error Responses

**Code:** 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Validation Rules
- Email must be valid format
- First Name must be at least 3 characters long
- Password must be at least 6 characters long
- All fields (firstName, lastName, email, password) are required

## Login User
Login with existing user credentials.

**Endpoint:** `POST /user/login`

### Request Body
```json
{
  "email": "string",      // valid email format
  "password": "string"    // minimum 6 characters
}
```

### Response

#### Success Response
**Code:** 200 OK
```json
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string",
    "_id": "string"
  }
}
```

#### Error Responses

**Code:** 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**Code:** 401 Unauthorized
```json
{
  "message": "Invalid Email or Password"
}
```

### Validation Rules
- Email must be valid format
- Password must be at least 6 characters long
- Both email and password are required

## Get User Profile
Get the profile of the currently authenticated user.

**Endpoint:** `GET /user/profile`

### Headers
```
Authorization: Bearer JWT_TOKEN_STRING
```

### Response

#### Success Response
**Code:** 200 OK
```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "email": "string",
  "_id": "string"
}
```

#### Error Response
**Code:** 401 Unauthorized
```json
{
  "message": "Please authenticate"
}
```

## Logout User
Logout the currently authenticated user and invalidate the token.

**Endpoint:** `GET /user/logout`

### Headers
```
Authorization: Bearer JWT_TOKEN_STRING
```

### Response

#### Success Response
**Code:** 200 OK
```json
{
  "message": "Logged out"
}
```

#### Error Response
**Code:** 401 Unauthorized
```json
{
  "message": "Please authenticate"
}
```

# Captain API Documentation

## Register Captain
Register a new captain with vehicle details.

**Endpoint:** `POST /captain/register`

### Request Body
```json
{
  "fullName": {
    "firstName": "string",    // minimum 3 characters
    "lastName": "string"      // minimum 3 characters
  },
  "email": "string",          // valid email format
  "password": "string",       // minimum 6 characters
  "vehicle": {
    "color": "string",        // minimum 3 characters
    "plate": "string",        // minimum 3 characters
    "capacity": "number",     // minimum 1
    "vehicleType": "string"   // "car", "bike", or "auto"
  }
}
```

### Response

#### Success Response
**Code:** 201 Created
```json
{
  "token": "JWT_TOKEN_STRING",
  "captain": {
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "Status": "inactive",
    "_id": "string"
  }
}
```

#### Error Responses

**Code:** 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**Code:** 400 Bad Request
```json
{
  "message": "Captain Already Exists"
}
```

### Validation Rules
- Email must be valid format
- First Name must be at least 3 characters
- Password must be at least 6 characters
- Vehicle color must be at least 3 characters
- Vehicle plate must be at least 3 characters
- Vehicle capacity must be at least 1
- Vehicle type must be one of: car, bike, auto
- All fields are required

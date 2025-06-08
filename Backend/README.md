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

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
      "msg": "Your First Name must Be atleast 3 Characters long",
      "param": "fullName.firstName",
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
- Last Name is required
- Password must be at least 6 characters
- Vehicle color must be at least 3 characters
- Vehicle plate must be at least 3 characters
- Vehicle capacity must be at least 1
- Vehicle type must be one of: "car", "bike", "auto"
- All fields are required

## Login Captain
Login with existing captain credentials.

**Endpoint:** `POST /captain/login`

### Request Body
```json
{
  "email": "string",    // valid email format
  "password": "string"  // minimum 6 characters
}
```

### Response

#### Success Response
**Code:** 200 OK
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

**Code:** 401 Unauthorized
```json
{
  "message": "Invalid Email or Password"
}
```

## Get Captain Profile
Get the profile of the currently authenticated captain.

**Endpoint:** `GET /captain/profile`

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
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "string"
  },
  "Status": "inactive",
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

## Logout Captain
Logout the currently authenticated captain and invalidate the token.

**Endpoint:** `GET /captain/logout`

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

# Ride API Documentation

## Create Ride
Create a new ride.

**Endpoint:** `POST /rides/create`

### Request Body
```json
{
  "pickup": "string",       // minimum 3 characters
  "destination": "string",  // minimum 3 characters
  "vehicleType": "string"   // "auto", "bike", or "car"
}
```

### Response

#### Success Response
**Code:** 201 Created
```json
{
  "user": "string",
  "pickup": "string",
  "destination": "string",
  "otp": "string",
  "fare": "number",
  "_id": "string"
}
```

#### Error Responses

**Code:** 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Invalid pickup Location",
      "param": "pickup",
      "location": "body"
    }
  ]
}
```

**Code:** 500 Internal Server Error
```json
{
  "message": "Error message"
}
```

### Validation Rules
- Pickup must be a string with at least 3 characters
- Destination must be a string with at least 3 characters
- Vehicle type must be one of: "auto", "bike", "car"
- All fields are required

## Get Fare
Calculate fare for a ride.

**Endpoint:** `GET /rides/get-fare`

### Query Parameters
```
pickup: string (minimum 3 characters)
destination: string (minimum 3 characters)
```

### Response

#### Success Response
**Code:** 200 OK
```json
{
  "auto": "number",
  "bike": "number",
  "car": "number"
}
```

#### Error Responses

**Code:** 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Invalid pickup Location",
      "param": "pickup",
      "location": "query"
    }
  ]
}
```

**Code:** 500 Internal Server Error
```json
{
  "message": "Error message"
}
```

### Validation Rules
- Pickup must be a string with at least 3 characters
- Destination must be a string with at least 3 characters
- Both fields are required

# Map API Documentation

## Get Location Coordinates
Get latitude and longitude for a given address.

**Endpoint:** `GET /maps/get-location`

### Query Parameters
```
address: string (minimum 3 characters)
```

### Response

#### Success Response
**Code:** 200 OK
```json
{
  "lat": "string",
  "lon": "string"
}
```

#### Error Responses

**Code:** 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "address",
      "location": "query"
    }
  ]
}
```

**Code:** 404 Not Found
```json
{
  "message": "Coordinates Not Found"
}
```

### Validation Rules
- Address must be a string with at least 3 characters
- Address is required

## Get Distance and Time
Calculate distance and time between two locations.

**Endpoint:** `GET /maps/get-distance-time`

### Query Parameters
```
origin: string (minimum 3 characters)
destination: string (minimum 3 characters)
```

### Response

#### Success Response
**Code:** 200 OK
```json
{
  "distance": "string (e.g., '10.5 Km')",
  "duration": "string (e.g., '15.5 Minutes')"
}
```

#### Error Responses

**Code:** 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "origin",
      "location": "query"
    }
  ]
}
```

**Code:** 404 Not Found
```json
{
  "message": "Route Not Found Between the 2 Areas"
}
```

### Validation Rules
- Origin must be a string with at least 3 characters
- Destination must be a string with at least 3 characters
- Both fields are required

## Get AutoComplete Suggestions
Get location suggestions based on input.

**Endpoint:** `GET /maps/get-suggestions`

### Query Parameters
```
input: string (minimum 3 characters)
```

### Response

#### Success Response
**Code:** 200 OK
```json
[
  {
    "display_name": "string",
    "lat": "string",
    "lon": "string"
  }
]
```

#### Error Responses

**Code:** 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "input",
      "location": "query"
    }
  ]
}
```

**Code:** 404 Not Found
```json
{
  "message": "No suggestions found for the given input"
}
```

### Validation Rules
- Input must be a string with at least 3 characters
- Input is required

# Root Endpoint

## Welcome Message
Get a welcome message from the server.

**Endpoint:** `GET /`

### Response

#### Success Response
**Code:** 200 OK
```
hello Worlds
```

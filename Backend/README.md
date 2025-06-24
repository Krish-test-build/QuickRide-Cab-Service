## User API Documentation

### Register User

**Endpoint:** `POST /users/register`

**Request Body:**

```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "email": "string",
  "password": "string"
}
```

**Success Response:** `201 Created`

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

**Error Response:** `400 Bad Request`

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

**Validation Rules:**

* Email must be valid format
* First Name must be at least 3 characters
* Password must be at least 6 characters
* All fields are required

---

### Login User

**Endpoint:** `POST /users/login`

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Success Response:** `200 OK`

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

**Error Responses:**

* `400 Bad Request`

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

* `401 Unauthorized`

```json
{
  "message": "Invalid Email or Password"
}
```

**Validation Rules:**

* Email must be valid format
* Password must be at least 6 characters
* All fields are required

---

### Get User Profile

**Endpoint:** `GET /users/profile`

**Headers:** `Authorization: Bearer JWT_TOKEN_STRING`

**Success Response:** `200 OK`

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

**Error Response:** `401 Unauthorized`

```json
{
  "message": "Please authenticate"
}
```

---

### Logout User

**Endpoint:** `GET /users/logout`

**Headers:** `Authorization: Bearer JWT_TOKEN_STRING`

**Success Response:** `200 OK`

```json
{
  "message": "Logged out"
}
```

**Error Response:** `401 Unauthorized`

```json
{
  "message": "Please authenticate"
}
```

---

## Captain API Documentation

### Register Captain

**Endpoint:** `POST /captains/register`

**Request Body:**

```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "string"
  }
}
```

**Success Response:** `201 Created`

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

**Error Responses:**

* `400 Bad Request`

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

* `400 Bad Request`

```json
{
  "message": "Captain Already Exists"
}
```

**Validation Rules:**

* Email must be valid format
* First Name must be at least 3 characters
* Last Name is required
* Password must be at least 6 characters
* Vehicle color & plate must be at least 3 characters
* Vehicle capacity must be at least 1
* Vehicle type must be one of: "car", "bike", "auto"
* All fields are required

---

### Login Captain

**Endpoint:** `POST /captains/login`

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Success Response:** `200 OK`

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

**Error Responses:**

* `400 Bad Request`

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

* `401 Unauthorized`

```json
{
  "message": "Invalid Email or Password"
}
```

---

### Get Captain Profile

**Endpoint:** `GET /captains/profile`

**Headers:** `Authorization: Bearer JWT_TOKEN_STRING`

**Success Response:** `200 OK`

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

**Error Response:** `401 Unauthorized`

```json
{
  "message": "Please authenticate"
}
```

---

### Logout Captain

**Endpoint:** `GET /captains/logout`

**Headers:** `Authorization: Bearer JWT_TOKEN_STRING`

**Success Response:** `200 OK`

```json
{
  "message": "Logged out"
}
```

**Error Response:** `401 Unauthorized`

```json
{
  "message": "Please authenticate"
}
```
## Ride API Documentation

### Create Ride

**Endpoint:** `POST /rides/create`

**Headers:** `Authorization: Bearer JWT_TOKEN_STRING`

**Request Body:**

```json
{
  "pickup": "string",
  "destination": "string",
  "vehicleType": "string"
}
```

**Success Response:** `201 Created`

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

**Error Responses:**

* `400 Bad Request`
* `500 Internal Server Error`

**Validation Rules:**

* All fields are required and must be valid strings
* Vehicle type must be one of: "auto", "bike", "car"

---

### Get Fare

**Endpoint:** `GET /rides/get-fare`

**Headers:** `Authorization: Bearer JWT_TOKEN_STRING`

**Query Parameters:** `pickup`, `destination`

**Success Response:** `200 OK`

```json
{
  "auto": "number",
  "bike": "number",
  "car": "number"
}
```

**Error Responses:**

* `400 Bad Request`
* `500 Internal Server Error`

---

### Confirm Ride

**Endpoint:** `POST /rides/confirm`

**Headers:** `Authorization: Bearer JWT_TOKEN_STRING`

**Request Body:**

```json
{
  "rideId": "string"
}
```

**Success Response:** `200 OK`

```json
{
  "user": { ... },
  "pickup": "string",
  "destination": "string",
  "fare": "number",
  "status": "accepted",
  "captain": { ... }
}
```

**Error Responses:**

* `400 Bad Request`
* `404 Not Found`
* `401 Unauthorized`

---

### Start Ride

**Endpoint:** `GET /rides/start-ride`

**Headers:** `Authorization: Bearer JWT_TOKEN_STRING`

**Query Parameters:** `rideId`, `otp`

**Success Response:** `200 OK`

```json
{
  "user": { ... },
  "pickup": "string",
  "destination": "string",
  "fare": "number",
  "status": "ongoing",
  "captain": { ... },
  "otp": "string"
}
```

**Error Responses:** `400`, `500`, `401`

---

### End Ride

**Endpoint:** `POST /rides/end-ride`

**Headers:** `Authorization: Bearer JWT_TOKEN_STRING`

**Request Body:**

```json
{
  "rideId": "string"
}
```

**Success Response:** `200 OK`

```json
{
  "user": { ... },
  "pickup": "string",
  "destination": "string",
  "fare": "number",
  "status": "completed",
  "captain": { ... },
  "createdAt": "string",
  "updatedAt": "string"
}
```

**Error Responses:**

* `400 Bad Request`
* `500 Internal Server Error`
* `401 Unauthorized`

## Map API Documentation

### Get Location Coordinates

**Endpoint:** `GET /maps/get-location`

**Headers:** `Authorization: Bearer JWT_TOKEN_STRING`

**Query Parameters:** `address`

**Success Response:** `200 OK`

```json
{
  "lat": "string",
  "lon": "string"
}
```

**Error Responses:**

* `400 Bad Request`
* `404 Not Found`

**Validation Rules:**

* Address must be a valid string with minimum 3 characters

---

### Get Distance and Time

**Endpoint:** `GET /maps/get-distance-time`

**Headers:** `Authorization: Bearer JWT_TOKEN_STRING`

**Query Parameters:** `origin`, `destination`

**Success Response:** `200 OK`

```json
{
  "distance": "string",
  "duration": "string"
}
```

**Error Responses:**

* `400 Bad Request`
* `404 Not Found`

**Validation Rules:**

* Origin and Destination must be valid strings with minimum 3 characters

---

### Get AutoComplete Suggestions

**Endpoint:** `GET /maps/get-suggestions`

**Headers:** `Authorization: Bearer JWT_TOKEN_STRING`

**Query Parameters:** `input`

**Success Response:** `200 OK`

```json
[
  {
    "display_name": "string",
    "lat": "string",
    "lon": "string"
  }
]
```

**Error Responses:**

* `400 Bad Request`
* `404 Not Found`

**Validation Rules:**

* Input must be a valid string with minimum 3 characters

## WebSocket Events Documentation

### Connection Events

#### Join Room

**Event:** `join`

**Payload:**

```json
{
  "userId": "string",
  "type": "string" // "user" or "captain"
}
```

---

#### Update Captain Location

**Event:** `update-location-captain`

**Payload:**

```json
{
  "userId": "string",
  "location": {
    "lat": "number",
    "long": "number"
  }
}
```

---

### Server-to-Client Events

* **`new-ride-request`** — Sent to nearby captains when a new ride is created.
* **`ride-confirmed`** — Sent to user when a captain confirms the ride.
* **`ride-started`** — Sent to user when ride begins.
* **`ride-ended`** — Sent to user when ride ends.

---

## Root Endpoint

### Welcome Message

**Endpoint:** `GET /`

**Success Response:** `200 OK`

{
  "message": "Hello World"
}

## 🚗 Live Tracking (Real-Time Location Updates)

 The live tracking feature allows users to see the captain’s current location during a ride, using **React + Leaflet** on the frontend and **Socket.IO** for real-time communication.

## 🔁 Flow Overview
### Captain Joins WebSocket Room

#### Upon login, the captain emits a join event:

json
Copy
Edit
{
  "userId": "string",
  "type": "captain"
}
#### Captain Sends Location Updates

At regular intervals (e.g., every 3–5 seconds), the captain emits:

json
Copy
Edit
{
  "userId": "string",
  "location": {
    "lat": "number",
    "long": "number"
  }
}
### Event Name: update-location-captain

#### Server Emits Location to User

The backend emits the captain’s updated location to the assigned user via a custom event, e.g., captain-location-update.

#### User Receives and Displays Location

The frontend listens for captain-location-update and repositions the marker on the map.
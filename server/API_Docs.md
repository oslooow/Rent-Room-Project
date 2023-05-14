## Endpoints

List of Available Endpoints:

- `GET /accomodations`
- `GET /accomodations/detail`
- `POST /accomodations`
- `POST /accomodations/types`
- `DELETE /accomodations/:id`
- `POST /auth/login`
- `POST /auth/register`

### GET /accomodations

#### Description

- Get all the users data

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": Integer,
        "name": String,
        "facility": String,
        "roomCapacity": Integer,
        "imgUrl": String,
        "authorId": Integer,
        "location": String,
        "price": Integer,
        "typeId": Integer,
        "createdAt": Date,
        "updatedAt": Date
      },
      ...
    ]
  }
  ```

### POST /accomodations

#### Description

- Create a new accomodation data

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
    "access_token": "access_token"
  }
  ```
- Body
  ```json
  {
    "name": String,
    "facility": Text,
    "roomCapacity": Integer,
    "imgUrl": String,
    "authorId": Integer,
    "location": String,
    "price": Integer,
    "typeId": Integer
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "statusCode": 201,
    "message": "Accomodation created successfully",
    "data": {
     "name": String,
      "facility": Text,
      "roomCapacity": Integer,
      "imgUrl": String,
      "authorId": Integer,
      "location": String,
      "price": Integer,
      "typeId": Integer,
      "createdAt": Date,
      "updatedAt": Date
    }
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```

### DELETE /accomodations/:id

#### Description

- Remove a accomodation data based on given id

#### Response

_200 - OK_

- Body
  `json
    {
      "statusCode": 200,
      "message": "Data with ID {id} has been removed"
    }
    `
  _404 - Not Found_
- Body
  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "Accomodation with id {id} is not found"
    }
  }
  ```

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
  }
  ```

# MoviesApp

## BaseUrl
http://localhost:3000/api

## User API's

### 1. Create User API

- **Endpoint:** `/user/createUser`
- **Allowed Method:** POST
- **Authentication:** Bearer token

**Request Payload:**

```json
{
  "email": "testing@gmail.com",
  "password": "Hello@123"
}

**response payload:**

```json
{
 "status": true,
 "message": "Created Successful!",
 "data": {
 "email": "testing@gmail.com",
 "password": "$2a$1$ew54S.zBCHEog126S9ti9uwPPamogVJ/hoT7fmNt5Cv5JgQeJh.RC",
 "\_id": "65a612ff8c4499df8c47b860",
 "createdAt": "2024-01-16T05:24:15.258Z",
 "updatedAt": "2024-01-16T05:24:15.258Z",
 "\_\_v": 0
}


### User Login API

- **Endpoint:** `/user/login`
- **Allowed Method:** POST

**Request Payload:**

```json
{
  "email": "testing@gmail.com",
  "password": "Hello@123"
}

**response_payload:**

```json
{
 "status": true,
"message": "Login successful!",
"data": {
"email": "testing@gmail.com",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RpbmdAZ21haWwuY29tIiwiaWF0IjoxNzA1Mzg4MDQ3LCJleHAiOjE3MDU0MDYwNDd9.VCdSeTXolFNcTzY9-ltN3O_ODLMi3Z-ZCYgHkJkqXTM"
}

## Movie Module API 

### 1. Create Movie API

-**endpoint:** `/movie/addMovie`
-**allowed method:** POST
-**Authentication:** Bearer token

**Request Payload (form-data):**


```json
{
"title":"testingMovie8",
"publishingYear":"2022-01-09T12:34:56.789Z",
"thumbnail: "fileLocation"  // Replace "fileLocation" with the actual path or URL of the image
}

**response payload:**

```json
{
"status": true,
"message": "Movie Created Successfully",
"data": {
"title": "testingMovie8",
"publishingYear": "2022-01-09T12:34:56.789Z",
"image": "https://movieApp.s3.ap-south-1.amazonaws.com/Screenshot%202023-03-02%20125246.png",
"userId": "65a612ff8c4499df8c47b860",
"\_id": "65a6250afd525b18f6969a45",
"createdAt": "2024-01-16T06:41:14.496Z",
"updatedAt": "2024-01-16T06:41:14.496Z",
"\_\_v": 0
}

### 2. Get and Search Movies API

-**endpoint:** = `/movie/getMovies`
-**allowed method:** GET
-**Authentication:** Bearer token

**request payload:**


```json
{
  "query": "testingMovie",
  "limit": 1,
  "offset": 1
}

**response payload:**

```json
{
"status": true,
"message": "Record Fetched!",
"movies": [
{
"_id": "65a6250afd525b18f6969a45",
"title": "testingMovie",
"publishingYear": "2022-01-09T12:34:56.789Z",
"image": "https://movieApp.s3.ap-south-1.amazonaws.com/Screenshot%202023-03-23%20110513.png",
"userId": "65a612ff8c4499df8c47b860",
"createdAt": "2024-01-16T06:41:14.496Z",
"updatedAt": "2024-01-16T06:43:14.297Z",
"__v": 0
}
],
"pages": 1
}


### 3. Update Movie API

-**endpoint:** `/movie/updateMovies`
-**allowed method:** PUT
-**Authentication:** Bearer token

**request payload (form-data):** 

```json
{
"title":"testingMovie8",
"publishingYear":"2022-01-09T12:34:56.789Z",
"thumbnail: "**fileLocation**"(Image)
}

**response payload:**

```json
{
"status": true,
"message": "Updated Successful!",
"data": {
"\_id": "65a6250afd525b18f6969a45",
"title": "testingMovie",
"publishingYear": "2022-01-09T12:34:56.789Z",
"image": "https://movieApp.s3.ap-south-1.amazonaws.com/Screenshot%202023-03-23%20110513.png",
"userId": "65a612ff8c4499df8c47b860",
"createdAt": "2024-01-16T06:41:14.496Z",
"updatedAt": "2024-01-16T06:43:14.297Z",
"\_\_v": 0
}

### 4. Delete Movie API

-**endpoint:** `/movie/deleteMovie`
-**allowed method:**  DELETE
-**Authentication:**  Bearer token

**request payload:**

```json
{
"movieId":"65a613238c4499df8c47b865"
}

**response payload:**

```json
{
"status": true,
"message": "Deleted Successfull!"
}

### 4. Get Movie By Id API

-**endpoint:** `/movie/getMovieById`
-**allowed method:**  GET
-**Authentication:**  Bearer token

**request payload:**

```json
{
"status": true,
"message": "Record Fetched!",
"data": {
"\_id": "65a6514aec1e6c28c4db6834",
"title": "testingMovie8",
"publishingYear": 2024,
"image": "https://testainty-images.s3.ap-south-1.amazonaws.com/test.png",
"userId": "65a64f1d9e7533959dbcb4a0",
"createdAt": "2024-01-16T09:50:02.830Z",
"updatedAt": "2024-01-16T09:50:02.830Z",
"\_\_v": 0
}

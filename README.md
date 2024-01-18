# MoviesApp

BaseUrl : http://localhost:3000/api

==========User API's =============

1. Create User API

**endpoint** = /user/createUser
**allowed method** = POST
**Authentication** = Bearer token

**request_payload** =

	{  
	 "email":"testing@gmail.com",
	 "password":"Hello@123"
	}

**response_payload** =

	{

	"status": true,
	"message": "Created Successful!",
	"data": {
		"email": "testing@gmail.com",
		"password": "$2a$10$ew54S.zBCHEog126S9ti9uwPPamogVJ/hoT7fmNt5Cv5JgQeJh.RC",
		"\_id": "65a612ff8c4499df8c47b860",
		"createdAt": "2024-01-16T05:24:15.258Z",
		"updatedAt": "2024-01-16T05:24:15.258Z",
		"\_\_v": 0
	}

	}

2. User Login API

**endpoint** = /user/login
**allowed method** = POST

**request_payload** =

    {
        "email":"testing@gmail.com",
        "password":"Hello@123"
    }

**response_payload** =

	{
	"status": true,
	"message": "Login successful!",
	"data": {
		"email": "testing@gmail.com",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RpbmdAZ21haWwuY29tIiwiaWF0IjoxNzA1Mzg4MDQ3LCJleHAiOjE3MDU0MDYwNDd9.VCdSeTXolFNcTzY9-ltN3O_ODLMi3Z-ZCYgHkJkqXTM"
		}
	}

==========Movie Module API =============

1. Create Movie API

**endpoint** = /movie/addMovie
**allowed method** = POST
**Authentication** = Bearer token

**request_payload**(form-data) =

	{
	"title":"testingMovie8",
	"publishingYear":"2022-01-09T12:34:56.789Z",
	"thumbnail: "**fileLocation**"(Image)
	}

**response_payload** =

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
	}
======================================================================

2. Get and Search Movies API

**endpoint** = /movie/getMovies
**allowed method** = GET
**Authentication** = Bearer token

**request_payload**=

	{
	"query":"testingMovie", **Write title of movie here, if blank it will return all the movies list**
	"limit":"1", **Limit for list of movies in a single page**
	"offset":"1" **Page no**
	}

**response_payload** =

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
==========================================================================

3. Update Movie API

**endpoint** = /movie/updateMovies
**allowed method** = PUT
**Authentication** = Bearer token

**request_payload**(form-data) =

	{
	"title":"testingMovie8",
	"publishingYear":"2022-01-09T12:34:56.789Z",
	"thumbnail: "**fileLocation**"(Image)
	}

**response_payload** =

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
	}
======================================================================

4. Delete Movie API

**endpoint** = /movie/deleteMovie
**allowed method** = DELETE
**Authentication** = Bearer token

**request_payload** =

	{
	"movieId":"65a613238c4499df8c47b865"
	}

**response_payload** =

	{
	"status": true,
	"message": "Deleted Successfull!"
	}
======================================================================

4. Get Movie By Id API

**endpoint** = /movie/getMovieById
**allowed method** = GET
**Authentication** = Bearer token

**request_payload** =

	{
	"movieId":"65a613238c4499df8c47b865"
	}

**response_payload** =

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
	}
================================================================

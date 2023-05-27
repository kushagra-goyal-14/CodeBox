# CodeBox

> API is still under early stages of development, so feel free to contribute in the project.

### Introducing the new CodeBox API

An API which executes codes

## Info

This version is not hosted, you can access the deployed version here - "https://github.com/kushagra-goyal-14/CodeBox-API"

## Requirements !!

Docker and docker-compose should be present on the machine.

`Step 1 :`

    Clone the repo

`Step 2 :` building the images and start the container.

    docker compose up

### Execute Code and fetch output

#### `POST` /

This endpoint allows you to execute your script and fetch output results.

### Inputs required for API call -

| Parameter | Description                                                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| "src"     | Should contain the script that needs to be executed                                                                           |
| "stdin"   | In case the script requires any kind of input for execution, leave empty if no input required                                 |
| "lang"    | Language that the script is written in for example: java, cpp, etc. (Check language as a payload down below in next question) |

### What are the languages that are supported for execution?

All the Languages are listed below .
| Languages | Language as a payload |
|-----------|-----------------------|
| C++ | cpp |
| Java | java |
| Python | python3 |
| C | c |
| GoLang | go |
| JS | javascript |

### On Postman : `(recommended)`

Sending a json post request to `http://localhost:3300/api/v1/submit`

### It is a c++ script to print Hello World.

```json
{
  "src": "\n\n#include<bits/stdc++.h>\n\nusing namespace std ;\n\nint main()\n{  cout << \"Hello World \"<< endl ;}",
  "stdin": "48\n95",
  "lang": "cpp"
}
```

The output is a JSON object comprising only one parameter that is the output.

```json
{
  "message": "Successfully ran it",
  "data": "http://localhost:3300/api/v1/results/Test59b64ddfdd6978a4fef4",
  "err": {},
  "success": true
}
```

#### `GET` /

Make a GET request on `http://localhost:3300/api/v1/results/Test59b64ddfdd6978a4fef4`

the output will be

```json
{
  "message": "Successfully got it",
  "data": "{\"output\":\"Hello World \\n\",\"status\":\"Success\",\"stderr\":\"\",\"submission_id\":\"Test59b64ddfdd6978a4fef4\"}",
  "err": {},
  "success": true
}
```

<br>
<br>

## Different types of status:

<br>

    "status": "Invalid Request"

If the field in post request is empty then it will show invalid request

<br>

    "status":"Queued"

If the request is in waiting stage i.e. in queue.

<br>

    "status":"Processing"

Script is running

<br>

    "status":"Runtime Error"

Most probably timeout happened

<br>

    "status":"Failed"

Causes due to compilation error or runtime error.

<br>

    "status":"Successful"

Worked Successfully !!

<br>
<br>

## PORT - 3300

This port is exposed by docker-compose.

> This project is not deployed as it requires a full instance due to various microservices, but a version will be deployed that is not scaled like this version but will be usefull for running all the codes.

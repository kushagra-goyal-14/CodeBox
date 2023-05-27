# CodeBox

A scalable Node.js-powered platform for executing code with ease.

### Introducing the new CodeBox API

An API which executes codes,

### Execute Code and fetch output

#### `POST` /

This endpoint allows you to execute your script and fetch output results.

### What are the Input Parameters for execute api call?

| Parameter | Description                                                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| "src"     | Should contain the script that needs to be executed                                                                           |
| "stdin"   | In case the script requires any kind of input for execution, leave empty if no input required                                 |
| "lang"    | Language that the script is written in for example: java, cpp, etc. (Check language as a payload down below in next question) |

### What are the languages that are supported for execution?

Whichever language you might mention in the language field, it would be automatically executed with the latest version of it's compiler.
| Languages | Language as a payload |
|-----------|-----------------------|
| C++ | cpp |
| Java | java |
| Python | python3 |
| C | c |
| GoLang | go |
| JS | javascript |

- On Postman : `(recommended)`

  Sending a json post request to `http://localhost:3300/api/v1/submit`

  ### It is a c++ script to print Hello World.

  ```json
  {
    "src": "\n\n#include<bits/stdc++.h>\n\nusing namespace std ;\n\nint main()\n{  cout << \"Hello World \"<< endl ;}",
    "stdin": "48\n95",
    "lang": "cpp"
  }
  ```

    <br>

### Sample Output

The output is a JSON object comprising only one parameter that is the output.

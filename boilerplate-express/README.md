# Basic Node and Express

- Use `--watch` in node server.js or use nodemon package for live server updates during development

- Express Methods

  - In Express, routes takes the following structure: app.METHOD(PATH, HANDLER). METHOD is an http method in lowercase. PATH is a relative path on the server (it can be a string, or even a regular expression). HANDLER is a function that Express calls when the route is matched. Handlers take the form function(req, res) {...}, where req is the request object, and res is the response object. For example, the handler
    ```
    function(req, res) {
        res.send('Response String');
    }
    ```
    will serve the string 'Response String'.

- Express middleware

  - In Express, you can put in place this functionality using the middleware express.static(path), where the path parameter is the absolute path of the folder containing the assets.
  - Middleware are functions that intercept route handlers, adding some kind of information. A middleware needs to be mounted using the method app.use(path, middlewareFunction). The first path argument is optional. If you don’t pass it, the middleware will be executed for all requests.

- JSON and REST

  - While an HTML server serves HTML, an API serves data. A REST (REpresentational State Transfer) API allows data exchange in a simple way, without the need for clients to know any detail about the server. The client only needs to know where the resource is (the URL), and the action it wants to perform on it (the verb). The GET verb is used when you are fetching some information, without modifying anything. These days, the preferred data format for moving information around the web is JSON. Simply put, JSON is a convenient way to represent a JavaScript object as a string, so it can be easily transmitted.

- Use of `.env` variable
  - The .env file is a hidden file that is used to pass environment variables to your application. This file is secret, no one but you can access it, and it can be used to store data that you want to keep private or hidden. For example, you can store API keys from external services or your database URI. You can also use it to store configuration options. By setting configuration options, you can change the behavior of your application, without the need to rewrite some code.
  - The environment variables are accessible from the app as process.env.VAR_NAME. The process.env object is a global Node object, and variables are passed as strings. By convention, the variable names are all uppercase, with words separated by an underscore. The .env is a shell file, so you don’t need to wrap names or values in quotes. It is also important to note that there cannot be space around the equals sign when you are assigning values to your variables, e.g. VAR_NAME=value. Usually, you will put each variable definition on a separate line.
  - You will need to use the dotenv package. It loads environment variables from your .env file into process.env.
  - The dotenv package has already been installed, and is in your project's package.json file.
  - At the top of your myApp.js file, add require('dotenv').config() to load the environment variables.

6.  Implement a Root-Level Request Logger Middleware
    - Earlier, you were introduced to the express.static() middleware function. Now it’s time to see what middleware is, in more detail. Middleware functions are functions that take 3 arguments: the request object, the response object, and the next function in the application’s request-response cycle. These functions execute some code that can have side effects on the app, and usually add information to the request or response objects. They can also end the cycle by sending a response when some condition is met. If they don’t send the response when they are done, they start the execution of the next function in the stack. This triggers calling the 3rd argument, next().
    - Look at the following example:
      function(req, res, next) {
      console.log("I'm a middleware...");
      next();
      }
    - Let’s suppose you mounted this function on a route. When a request matches the route, it displays the string “I’m a middleware…”, then it executes the next function in the stack. In this exercise, you are going to build root-level middleware. As you have seen in challenge 4, to mount a middleware function at root level, you can use the app.use(<mware-function>) method. In this case, the function will be executed for all the requests, but you can also set more specific conditions. For example, if you want a function to be executed only for POST requests, you could use app.post(<mware-function>). Analogous methods exist for all the HTTP verbs (GET, DELETE, PUT, …).
7.  Chain Middleware to Create a Time Server
    - Middleware can be mounted at a specific route using app.METHOD(path, middlewareFunction). Middleware can also be chained within a route definition.
      app.get('/user', function(req, res, next) {
      req.user = getTheUserSync(); // Hypothetical synchronous operation
      next();
      }, function(req, res) {
      res.send(req.user);
      });
    - This approach is useful to split the server operations into smaller units. That leads to a better app structure, and the possibility to reuse code in different places. This approach can also be used to perform some validation on the data. At each point of the middleware stack you can block the execution of the current chain and pass control to functions specifically designed to handle errors. Or you can pass control to the next matching route, to handle special cases. We will see how in the advanced Express section.
8.  Get Route Parameter Input from the Client

    - When building an API, we have to allow users to communicate to us what they want to get from our service. For example, if the client is requesting information about a user stored in the database, they need a way to let us know which user they're interested in. One possible way to achieve this result is by using route parameters. Route parameters are named segments of the URL, delimited by slashes (/). Each segment captures the value of the part of the URL which matches its position. The captured values can be found in the req.params object.
      route_path: '/user/:userId/book/:bookId'
      actual_request_URL: '/user/546/book/6754'
      req.params: {userId: '546', bookId: '6754'}

      app.get("/:word/echo", (req, res) => {
      res.json({"echo": req.params.word});
      })

9.  Get Query Parameter Input from the Client

    - Another common way to get input from the client is by encoding the data after the route path, using a query string. The query string is delimited by a question mark (?), and includes field=value couples. Each couple is separated by an ampersand (&). Express can parse the data from the query string, and populate the object req.query. Some characters, like the percent (%), cannot be in URLs and have to be encoded in a different format before you can send them. If you use the API from JavaScript, you can use specific methods to encode/decode these characters.
      route_path: '/library'
      actual_request_URL: '/library?userId=546&bookId=6754'
      req.query: {userId: '546', bookId: '6754'}

    - Note: extended is a configuration option that tells body-parser which parsing needs to be used. When extended=false it uses the classic encoding querystring library. When extended=true it uses qs library for parsing.
    - When using extended=false, values can be only strings or arrays. The object returned when using querystring does not prototypically inherit from the default JavaScript Object, which means functions like hasOwnProperty, toString will not be available. The extended version allows more data flexibility, but it is outmatched by JSON.
    -

10. Get Data from POST Requests


    * Mount a POST handler at the path /name. It’s the same path as before. We have prepared a form in the html frontpage. It will submit the same data of exercise 10 (Query string). If the body-parser is configured correctly, you should find the parameters in the object req.body. Have a look at the usual library example:
    	route: POST '/library'
    	urlencoded_body: userId=546&bookId=6754
    	req.body: {userId: '546', bookId: '6754'}
    * here are several other http methods other than GET and POST. And by convention there is a correspondence between the http verb, and the operation you are going to execute on the server. The conventional mapping is:
    * POST (sometimes PUT) - Create a new resource using the information sent with the request,
    * GET - Read an existing resource without modifying it,
    * PUT or PATCH (sometimes POST) - Update a resource using the data sent,
    * DELETE - Delete a resource.

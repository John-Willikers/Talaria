# Talaria
A lightweight XMLHTTPRequest Wrapper


This is a lightweight wrapper that allows people to easily make GET and POST request Asynchronously and Synchronously.

```
  let request = new Talaria('/users', 'GET', false); // Run Talaria Synchronously
  request.send();
  console.log(request.responseText);
```

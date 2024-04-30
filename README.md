# Talaria
A lightweight XMLHTTPRequest Wrapper


This is a lightweight wrapper that allows people to easily make GET and POST request Asynchronously and Synchronously.

# Synchronous GET example
```javascript
  //Create a new XMLHttpRequest object that has Talaria wrapped around it
  let request = new Talaria('/users', 'GET', false); // Run Talaria Synchronously
  request.send();
  console.log(request.responseText);
```

# Synchronous POST example
```javascript
  //Create a new XMLHttpRequest object that has Talaria wrapped around it
  let request = new Talaria('/user', 'POST'); // Run Talaria Synchronously, 3rd arg defaults to true
  request.append([
    {name: 'username', value: 'johnwilliker' },
    {name: 'dob', value: '05/04/1999'}
  ]);
  request.send();
  
  console.log(request.responseText);
```

# Asynchronous POST example
```javascript
  //Create a new XMLHttpRequest object that has Talaria wrapped around it
  let request = new Talaria('/user', 'POST'); // Run Talaria Asynchronously, 3rd arg defaults to true
  request.append([
    {name: 'username', value: 'johnwilliker' },
    {name: 'dob', value: '05/04/1999'}
  ]);
  request.ready((response) => {
    //returns response body or if JSON an Object
  });
  
  request.send()
  ```

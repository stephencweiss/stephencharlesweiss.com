---
title: Axios And Routing With baseURLs
date: '2018-11-27'
publish: '2018-11-27'
category: ['programming']
tags: ['axios', 'basurl', 'javascript', 'routing']
---

I was unifying multiple micro services into a single front-end. To do this efficiently, I wanted to create a single proxy that sat in front of the services and directed traffic as necessary.

# Why Use baseURL

In order to get the services APIs to work directly, however, I needed to refactor away from absolute URLs since the APIs the services used would no longer recognize the source of the request.

This is where using Axios to manage my APIs really came in handy. From the [Axios documents](https://github.com/axios/axios):

> // `baseURL` will be prepended to `url` unless `url` is absolute.
>
> // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
>
> // to methods of that instance.

To set the `baseURL` use `axios.create({ baseURL: 'http://www.thesampleurl.com' })`.

To make use of this new URL, however, it needs to be assigned to a variable - the documentation suggests `instance`:
e.g., `const instance = axios.create({ baseURL: 'http://www.thesampleurl.com' });`

Then, when you want to write your `GET`, instead of the standard `axios.get()`, you would use `instance.get()`.

# Examples of baseURLs

I've found two primary use cases for setting a baseURL so far:

1. When I have services running on separate ports on my local machine during development.
2. When I have services running on different deployed environments (e.g., AWS EC2)

In these cases, you might use the following:

-   `axios.create({ baseURL: 'http://localhost:8080' })` for when the service is running on port 8080 locally
-   `axios.create({ baseURL: 'http://ec2-11-11-111-11.us-east-2.compute.amazonaws.com' })` for when you're running the service on EC2.

# Refactoring For baseURLs

Here’s an example of how I have refactored my response for the micro-service to take advantage of the URL I established using `baseURL` in my configuration:

```javascript
// The original GET request which worked when the service ran on its own
getData(id){
  axios.get(`/data/${id}`)
    .then( (response) => {
      this.setState({ data : response.data }) })
    .catch( (error) => { console.log( `The error of the axios GET is: -------> `, error); })
  }

// Refactored GET request to take advantage of an example baseURL
getData(id){
  const instance = axios.create({ baseURL:'http://www.thesampleurl.com' });
  instance.get(`/data/${id}`)
    .then( (response) => {
      this.setState({ data : response.data }) })
    .catch( (error) => { console.log(`The error of the axios GET is: -------> `, error); })
  }
```

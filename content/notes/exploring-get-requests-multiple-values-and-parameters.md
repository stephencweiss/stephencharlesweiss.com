---
title: 'Exploring GET Requests: Multiple Values And Parameters'
date: '2019-01-30'
publish: '2019-01-30'
category: ['programming']
tags: ['GET Requests', 'multiple parameters']
---

The ease of writing GET requests varies with the clarity of the supporting documentation. With that in mind, I recently explored an API which suggested it was capable of responding to a request with multiple values on a single parameter.

_How_ to submit such a request, however, was not immediately clear from the documentation.

After more time than I’d like to admit, I found the solution while working with peers. To avoid that pain for myself in the future - I’ve written up some lessons to hopefully make it clear what you’d an expect.

Below we’ll work through three scenarios:

1. **Multiple Parameters, Single Value**: A request for information about two parameters, names and ages, with a single value for each, e.g., John and 23
2. **Single Parameter, Multiple Values**: A request for information about a single parameter, names, with two distinct values, e.g., John and James
3. **Multiple Values, Multiple Parameters**: A request for information about multiple parameters, names and ages, with multiple values for names, e.g., John and James and 23

## Multiple Parameters, Single Value

Multiple parameters has been the much more common scenario in my experience to date, and it can be accomplished by creating a string which is then sent to a server using your preferred AJAX method (Fetch, Axios, jQuery, etc.).

```js
// Build the query string
let reqName = `John`,
    reqAge = `23`
const queryString = 'name=' + reqName + '&age=' + reqAge

// Make the AJAX request ...
```

This results in a query string (post encoding) where each variable is separated by an `&` (i.e. `?name=John&age=23`). Because of this, it makes intuitive sense that the request will be an intersection of these two parameters.

## Single Parameter, Multiple Values

What happens though when we want to look at multiple values of a single parameters?

**BN**: The only time I’ve come across this, the API was specifically designed to accommodate multiple values with certain parameters. That said, the following will be implementation dependent.

Let’s imagine the following scenario: An API has two parameters `name` and `names[]`. The former we discussed above, but the latter is specifically designed to allow for multiple values be queried.

If we think about the set that the response will include, instead of an intersection of values, we will get the union.

```js
let reqNames = [‘John’, ‘James’];
let queryString = ‘’;
for(name in reqNames) {
  queryString += `&names[]=${reqNames[name]}`;
};
// queryString === "&names[]=John&names[]=James"

// before submitting, the leading `&` will need to be trimmed
queryString = queryString.substring(1);

// Make the AJAX request ...
```

**Take away**: The way to submit multiple parameter values is _repeat_ the parameter in the query string for each sought after value.

**Side note**: If you’re worried about running out of space in your query string, don’t. The smallest limit for a URL is ~2000 characters (IE) and most other browsers can handle much longer strings [Relevant StackOverflow thread](https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers) and the primary [research](https://www.boutell.com/newfaq/misc/urllength.html) (from 2006).

## Multiple Parameters, Multiple Values

If we combine these two approaches, what can we expect?

With all the same caveats above of implementation dependence, my expectation is that the response will yield all results where records match James is 23 as well as John is 23 (I.e. find the intersections first (age and name) then union).

How might we write this query?

```js

let reqNames = [‘John’, ‘James’], reqAge = 23;
let queryString += `age=`+reqAge;
for(name in reqNames) {
  queryString += `&names[]=${reqNames[name]}`;
};

// queryString === "age=23&names[]=John&names[]=James"
// Unlike above, since the names are not the first element, we do not need to trim the leading `&`

// Make the AJAX request ...

```

# Conclusion

Certain APIs will allow for the submission of multiple values of a single parameter (these might be identified through the inclusion of `[]`).

Knowing this is available, and how to take advantage of the capability, can reduce the number of requests needed to retrieve the information you need.

Since network requests are orders of magnitude slower than local computation, eliminating unnecessary API requests will have an immediate effect on your application’s performance.

# Further Exploration

To see this in action, take a look at the Array Of Things program in the city of Chicago. [Array of Things HTTP API](https://arrayofthings.docs.apiary.io/#reference/0/observations-endpoint/list-the-observations)

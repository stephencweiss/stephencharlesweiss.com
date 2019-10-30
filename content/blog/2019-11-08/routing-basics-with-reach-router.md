---
title: 'Routing Basics With Reach Router'
date: '2019-10-30'
publish: '2019-11-08'
category: ['programming']
tags: ['react','@reach/router', 'react-router', 'routing']
---

Imagine you have a Single page application but you want to allow your users to navigate to different pages within the app. 

I wanted to learn how to do that and found Reach Router a nice place to start.

Let’s dive in. 

This is a very basic example (similar to what you would find in Reach Router’s [Basic Usage example](https://reach.tech/router/example/basic)):

I’ll have an app with two basic views:
1. Search (titled `SearchParams`)
2. Details (titled `Details`)

The basic flow is that the user will enter a search. That will populate results. When a user selects one of the returned results, they will see the Details. 

Initially, however, this is what I had:
``` javascript
import React from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";
import Details from "./Details"

const App = () => (
  const [selected, setSelected] = useState()
  <div id="main-div">
    <h1>My Site</h1>
    <React.StrictMode>
      <SearchParams setSelected={setSelected} />
      <Details selected={selected} />
    </React.StrictMode>
  </div>
);

render(<App />, document.getElementById("root"));

```
I passed along a dispatch to the `<SearchParams>` to allow the user to select a returned result.

Once they did, that selected item would be passed to Details which would render _below_ the search results.

Not ideal.

I wanted instead to show _only_ the `<Details>` when an item was selected. 

This is exactly what Routing is good for. By adding a `<Router>` component that wraps our destination components with specified routes, ( the `path` prop) we can render select components at a given time. 
``` javascript
import { Router } from "@reach/router";

const App = () => (
  <div id="main-div">
    <h1>My Site</h1>
    <React.StrictMode>
      <Router>
        <SearchParams path="/" />
        <Details path="/details/:id" />
      </Router>
    </React.StrictMode>
  </div>
);
```
In this case, our Search is our root - it’s the page users will go to by default when they load our application. To get to the `<Details>` page, they would need to append `/details/:id`. 

Right now, that would be a manual process. The user would look at the `id` of the item they’re interested in and then have to know to type in the URL.

That doesn’t feel very ideal. Enter relative links. Relative links are a great way to navigate an app internally. 

For example, right now if I’m on the `<Details>` page (ignoring for a moment _how I got there_), there’s no way to get home without _again_ modifying the URL.

Let’s fix that with a `<Link>` tag.
``` javascript
import { Router } from "@reach/router";

const App = () => (
  <div id="main-div">
    <header>
      <Link to="/">My Site!</Link>
    </header>
    <React.StrictMode>
      <Router>
        <SearchParams path="/" />
        <Details path="/details/:id" />
      </Router>
    </React.StrictMode>
  </div>
);
```
I replaced the `<h1>` with a `<header>` tag, but the more important part is I wrapped the text in the `<Link>` tag and provided the path `”/“` to indicate the root of the application.

It’s worth noting that the path on `<Link>` components is relative - which means Reach Router only needs to know where to go from where in the app it’s currently located. 

My example doesn’t demonstrate this well as it provides effectively the entire app on one screen - but imagine another set of `<Link>` tags within the `<Details>` component. These could show different dimensions of details. For example, maybe we have sub pages for demographics and background. 

In details, we could have something like:
``` javascript
const Details = () => {
    <div>
        {/* Details */}
        <ul>
            <li>
                <Link to="demographics" />
            </li>
            <li>
                <Link to="background" />
            </li>
        </ul>
    </div>
}
```
Notably absent is a leading `details/` from the path. 

This is also how we would connect the `<SearchParams>` component to the `<Details>`

When a search is successful, the `<SearchParams>` renders `<Results>`
``` javascript
import React from "react";
import Item from "./Item";

const Results = ({ items }) => {
  return (
    <div className="search">
      {items.length === 0 ? (
        <h1>No items found!</h1>
      ) : (
        items.map(item => (
          <Item
            // other props
          id={item.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
```

And then the `<Item>` itself has the link to the `<Details>`:
``` javascript
import React from “react”;
import { Link } from “@reach/router”;

export default function Item(props) {
  
  return (
    <Link to={`/details/${id}`} >
      {/* Display the item */}
    </Link>
  );
}
```

Voilá!

## Conclusion
Routing has been a topic that’s been on the periphery for a while now and has intimidated me for too long. 

I’m glad I finally found an excuse to dive in because it’s much more accessible than I feared. Perhaps I’m only scratching the surface (I know I’m only scratching the surface), but by just getting this example working I’ve gained an appreciation for the possible. 

Routing adds a huge number of interaction opportunities that are simply not available when you’re dealing with _truly_ a single page. 

I find that prospect exciting and am looking forward to finding out what else I can unlock through further exploration. 

## Want To Learn More?
* [Reach Router: Next Generation Routing for React](https://reach.tech/router)
* [React Router: Declarative Routing for React.js](https://reacttraining.com/react-router/)
* [React Training: The Future of React Router and @reach/router](https://reacttraining.com/blog/reach-react-router-future/) The two most popular React routers are merging! 



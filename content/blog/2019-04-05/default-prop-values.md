---
title: 'Default Prop Values In React'
date: '2019-04-05'
category: ['programming']
tags: ['React', 'default props']
---

What value does a prop get if no value is assigned?

To think about this more tangibly, imagine you have a higher order component, `Container`. That component does *nothing* but render a subcomponent, `RandomComponent` to which it passes a prop, `propInQuestion`.

(**NB**: In the code snippets below, I am skipping certain details like `import`, etc. to zoom in on the pertinent information.)

A couple of things to note:
1. We never assign `propInQuestion` a value.
2. `propInQuestion` is not an argument that's passed from wherever `Container` is being called.

```javascript
const Container = () => (
    <RandomComopnent propInQuestion />
)
```

At this point, you might expect `propInQuestion` to be `undefined`. I did.

But before we conclude, let's look at our `RandomComponent`

```javascript
class RandomComponent extends Component {

  render () {
    const {propInQuestion} = this.props;
    return (
      <React.Fragment>
      <p>`The value of propInQuestion? --> ${propInQuestion}`</p>
      </React.Fragment>
    )
  }
}

RandomComponent.defaultProps = {
    propInQuestion: false,
};
```

The first thing I noticed when I came across this pattern was the `defaultProps` at the bottom. **Finally!** I had a value assignment! So the answer's `false`, right?

Wrong.

It turns out that when a prop is passed around, it defaults to `true`, mirroring the behavior of HTML. Which is to say, we actually passed along a value for `propInQuestion`, through the `Container`, even though it was the first time it was referenced.

So, it turns out `Container`'s doing more than I initially gave it credit. By passing the prop, `propInQuestion`, it gave it a value. A more verbose way of writing the same thing would be:

```javascript
const Container = () => (
    <RandomComopnent propInQuestion={true} />
)
```

On the other hand, in order to *use* the `defaultProps`,  it would have needed to be:
```javascript
const Container = () => (
    <RandomComopnent />
)
```

The more you know!

H/t to @glanks, @tehpsalmist, and @MinimumViablePerson from [CodingBlocks community](https://codingblocks.slack.com) for pointing me in the right direction!

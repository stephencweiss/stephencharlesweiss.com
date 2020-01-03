---
title: 'Package Discovery: react-focus-lock'
date: '2020-01-03'
publish: '2020-01-12'
category: ['programming']
tags:
  [
    'npm',
    'package discovery',
    'anton korzunov',
    'a11y',
    'accessiibility',
    'focus',
    'focus-lock',
    'modals',
  ]
---

When it comes to getting focus on dialog boxes on the internet, there's a lot to get right.<sup>[1](#footnotes)</sup><a id="fn1"></a>

At Remine, to help us get the details right, we use [`react-focus-lock`](https://www.npmjs.com/package/react-focus-lock).<sup>[2](#footnotes)</sup><a id="fn2"></a>

A simplified version of the Modal component our team uses is the following:

```javascript
import React from 'react'
import FocusLock from 'react-focus-lock'

const Mask = styled.div`
  width: 100%;
  position: absolute;
`

const ModalStyled = styled.div`
  width: 400px;
  min-height: 100px;
  background-color: white;
  border-radius: 3px;
  box-shadow: 1px 3px 15px 2px rgba(0, 0, 0, 0.02), 1px 3px 3px 0 rgba(0, 0, 0, 0.2);
  margin: 10vh auto auto;
  position: relative;
`

class Modal extends React.PureComponent {
  state = {
    isShown: false,
  }

  componentDidMount() {
    if (this.props.open) {
      this.toggleIsShown(this.props.open)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isShown !== nextProps.open) {
      this.toggleIsShown(nextProps.open)
    }
  }

  toggleIsShown = open => {
    if (this.isShownTimeout) {
      clearTimeout(this.isShownTimeout)
      this.isShownTimeout = null
    }

    if (open) {
      this.setState({ isShown: true })
    } else {
      this.isShownTimeout = setTimeout(
        () => this.setState({ isShown: false }),
        this.props.duration
      )
    }
  }

  render() {
    return (
      <FocusLock
        returnFocus={returnFocusOnClose}
        disabled={!this.state.isShown}
      >
        <ModalWrapper {...this.props}>
          <Mask />
          <Dialog {...this.props} />
        </ModalWrapper>
      </FocusLock>
    )
  }
}

export const Dialog = props => {
  const { children, rest } = props
  return (
    <ModalStyled role="dialog" aria-modal="true" {...rest}>
      {children}
      {onClose && <CloseButton />}
    </ModalStyled>
  )
}
```

The nice thing about this is that the `<FocusLock>` automatically handles all of heavy lifting around focus.

In fact, it even autofocuses. This, however, created an interesting problem for a modal I was designing with multiple buttons.

A simplified version looked like this:

```javascript
<Modal>
  <Header>{props.headerText}</Header>
  <Body>{props.bodyText}</Body>
  <Flex width={'100%'} justifyContent={'space-around'}>
    <Button variant={'secondary'} width={'45%'} onClick={props.closeModal}>
      Cancel
    </Button>
    <Button width={'45%'} onClick={props.onConfirm}>
      Proceed
    </Button>
  </Flex>
</Modal>
```

The issue was that this automatically focused on the _first_ interactive component.

![](./autofocus-cancel.png)

Looking through the API documentation, however, it turns out that the author of `react-focus-lock`, [@thekashey](https://github.com/thekashey), had already thought about this with the [autofocus](https://www.npmjs.com/package/react-focus-lock#autofocus) API:

The result is that I can target _which_ child element I want to have auto focus initially by passing the `data-autofocus` prop.

```javascript
<Modal>
  <Header>{props.headerText}</Header>
  <Body>{props.bodyText}</Body>
  <Flex width={'100%'} justifyContent={'space-around'}>
    <Button variant={'secondary'} width={'45%'} onClick={props.closeModal}>
      Cancel
    </Button>
    <Button data-autofocus width={'45%'} onClick={props.onConfirm}>
      Proceed
    </Button>
  </Flex>
</Modal>
```

![](./autofocus-proceed.png)

It's worth noting that a potential drawback of this approach is that it _skips_ the "Cancel" button initially. However, because of the focus lock, it's easily accessible through tabbing.

To see this in practice, we can see a modal in action.
![](./modal-loop.gif)

## Conclusion

Making the internet accessible to all is something I'm passionate about, but that doesn't mean it's easy. Modals and dialog boxes often fall short when it comes to accessibility. While `react-focus-lock` is not a panacea (scroll lock and text-to-speech lock are notably _not_ addressed), it does address one of the more common issues with dialogs with an accessible API. I'm excited to continue to explore the problem space and find new ways to improve in the future.

## Footnotes

<sup>[1](#fn1)</sup> This [MDN Article on ARIA and the dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role) has a ton of useful information on what's required.
<sup>[2](#fn2)</sup> Anton Korzunov, aka @theKashey, the author of `react-focus-lock` wrote this article, [It's a (focus) Trap!](https://medium.com/hackernoon/its-a-focus-trap-699a04d66fb5?) which walks through many of the challenges facing focus and how his library addresses them.

---
title: 'Using Variables To Make Interchangeable React Components'
date: '2019-05-31'
category: ['programming']
tags: ['react', 'components', 'design patterns']
---

# Using Variables To Make Interchangeable React Components

I’m still making tweaks to the Stepper project I wrote about previously ([here](https://www.stephencharlesweiss.com/2019-05-26/local-git-stale-branch-cleanup/) and [here](https://www.stephencharlesweiss.com/2019-05-07/z-index-geometry-not-magic/)) and the lessons keep coming. Today, the challenge was simplifying the logic surrounding applying styles based on props being passed to the parent component.

For context, here’s the relevant portion of the folder structure.

```bash
$ tree -L 1
.
├── Stepper.styled.js
├── Stepper.theme.ts
├── Stepper.tsx
└── index.js
```

# Starting Point

My starting point for today, already significantly better than where it was after my first attempt at building the stepper, was premised on a series of if/else statements.

```javascript
if (alternativeLabel && labelOnTop && !minor) {
  labelComponent = (
    <TopLabelMajorPosition disableRipple icon={icon}>
      {label}
    </TopLabelMajorPosition>
  )
} else if (alternativeLabel && labelOnTop && minor) {
  labelComponent = <TopLabelMinorPosition disableRipple icon={icon} />
} else if (alternativeLabel && !minor) {
  labelComponent = (
    <BottomMajorLabelPosition disableRipple icon={icon}>
      {label}
    </BottomMajorLabelPosition>
  )
} else if (alternativeLabel && minor) {
  labelComponent = <BottomMinorLabelPosition disableRipple icon={icon} />
}
```

I like that this solution clearly articulates what occurs under what conditions, but I was violating DRY without much benefit other than avoiding short-term pain of refactoring.

What started as passing along just the `icon` prop had now added a `disableRipple` prop. Who knew how many others would come eventually.

# Create A Mask

Wanting to find a better way, I found that creating what I’m calling a "mask" worked quite well.

By mask, all I mean is that my `LabelPosition` is the outward appearance for any of my actual components, which are still controlled by the same switch logic.

```javascript
const LabelPosition =
  alternativeLabel && labelOnTop && !minor
    ? TopLabelMajorPosition
    : alternativeLabel && labelOnTop && minor
    ? TopLabelMinorPosition
    : alternativeLabel && !minor
    ? BottomMajorLabelPosition
    : alternativeLabel && minor
    ? BottomMinorLabelPosition
    : BottomMinorLabelPosition // this is our fallback

labelComponent = (
  <LabelPosition disableRipple icon={icon}>
    {!minor && label}
  </LabelPosition>
)
```

One line I went back and forth on was whether or not to include the logic for the fallback.

```javascript
        : alternativeLabel && minor
        ? BottomMinorLabelPosition
```

Also playing the position of the `else` position, I could eliminate this without affecting the result. I decided to keep it in, however, for three reasons:

1. It communicates the situation that we _expect_ it to be called,
2. It allows the logic to change (maybe in the future we’ll have a third prop that affects the situation), and
3. It allows a different fallback to be used in the future.

# Conclusion

By using a variable in this case, I was able to reduce redundant code while maintaining, or arguably increasing, the communicative power of the code without sacrificing functionality.

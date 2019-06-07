---
title: 'Lessons In Typescript: Extending 3rd Party Libraries And Reading Type Definitions '
date: '2019-06-07'
category: ['programming']
tags: ['typescript', 'react-intl', 'react', 'i18n', 'dates']
---

Using third party libraries is great when they do exactly what you want them to do. When it comes to extending them, however, it can get tricky. That was the situation I found myself in when I wanted to create my own standard formatted date using `react-intl` for internationalization support.

I started with a published component that would return a date and time.

```typescript
import { InjectedIntlProps, injectIntl } from 'react-intl'

export interface IPublishedProps {
  publishDate: Date
}

function Published(props: IPublishedProps & InjectedIntlProps) {
  const { intl, publishDate } = props
  return (
    <React.Fragment>
      <span>
        {intl.formatDate(publishDate, {
          localeMatcher: 'best fit',
          month: 'numeric',
          year: 'numeric',
          day: 'numeric',
        })}
      </span>
      <span>{intl.formatTime(publishDate, { timeZoneName: 'short' })}</span>
    </React.Fragment>
  )
}

export default injectIntl(Published)
```

The initial approach used `react-intl`’s HOC `injectIntl` to provide access to methods like `formatDate` and `formatTime`. I however, was more interested in a standard reusable component that would abstract away much of the logic and provide a set of sensible defaults.

Since I was essentially trying to replicate the logic of `intl.formatDate`, I looked into it’s type definition where I noticed two things:

1. The `formatDate` method I’d been using on `intl` referenced a class `FormattedDate`
2. Whereas `intl.formatDate` takes a second parameter, `options`, `FormattedDate` has no such prop.

From the type definition file of `react-intl`, we see:

```typescript
interface InjectedIntl {
    formatDate(value: DateSource, options?: FormattedDate.PropsBase): string;
    formatTime(value: DateSource, options?: FormattedTime.PropsBase): string;
    ...
}

interface InjectedIntlProps {
    intl: InjectedIntl;
}

namespace IntlComponent {
    interface DateTimeFormatProps extends Intl.DateTimeFormatOptions {
        format?: string;
    }
}
namespace FormattedDate {
    type PropsBase = IntlComponent.DateTimeFormatProps;

    interface Props extends PropsBase {
        value: DateSource;
        children?: (formattedDate: string) => React.ReactNode;
    }
}

class FormattedDate extends React.Component<FormattedDate.Props> { }
```

Let’s follow this crumb trail and see where it leads:

- The `FormattedDate`’s props, `Props`, extends `PropsBase`.
- `PropsBase`is assigned to `IntlComponent.DateTimeFormatProps`.
- `DateTimeFormatProps` extends `Intl.DateTimeFormatOptions`.
- Finally, we arrive at the end of the trail where we find `DateTimeFormatOptions` is defined as:

```typescript
interface DateTimeFormatOptions {
  localeMatcher?: string
  weekday?: string
  era?: string
  year?: string
  month?: string
  day?: string
  hour?: string
  minute?: string
  second?: string
  timeZoneName?: string
  formatMatcher?: string
  hour12?: boolean
  timeZone?: string
}
```

Pulling all of these details together, I was able to construct an `<IntlDate>` and `<IntlTime>` component that would default my initial configuration, while allowing customization should it be desired.

Here’s what that looked like for `<IntlDate>`:

```typescript
import React, { FunctionComponent } from 'react'
import { DateSource, FormattedDate } from 'react-intl'

export interface IDateProps {
  date: DateSource
  localeMatcher?: string
  month?: string
  year?: string
  day?: string
}

const IntlDate: FunctionComponent<IDateProps> = props => (
  <FormattedDate
    value={props.date}
    localeMatcher={props.localeMatcher}
    month={props.month}
    year={props.year}
    day={props.day}
  />
)

const defaultProps = {
  localeMatcher: 'best fit',
  month: 'numeric',
  year: 'numeric',
  day: 'numeric',
}

IntlDate.defaultProps = defaultProps

const propsAreEqual = (prevProps: IDateProps, nextProps: IDateProps): boolean =>
  prevProps.date === nextProps.date

export default React.memo(IntlDate, propsAreEqual)
```

The lesson for me was the interface. Since `<FormattedDate>` didn’t have an `options` prop, but was an extension of an extension of an extension - ultimately, the way I would use it is by passing in those props from the `DateTimeFormatOptions` directly.

Using them became a matter of importing and simply passing in the date.

```javascript
import { IntlDate, IntlTime } from 'src/components/DateTime'

export interface IPublishedProps {
  publishDate: Date;
}

function Published(props: IPublishedProps) {
  const { publishDate } = props
  return (
    <React.Fragment>
      <span>
        <IntlDate date={publishDate} />
      </span>
      <span>
        <IntlTime date={publishDate} />
      </span>
    </React.Fragment>
  )
}

export default Published
```

By reconstructing a wrapper for `FormattedDate`, I got a glimpse into how `react-intl` uses `intl.formatDate` to parse out the properties passed in the `options` object and return a `FormattedDate` component.

Without a reason to go looking, however, I never would have known.

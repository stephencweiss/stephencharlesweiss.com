---
title: 'Mocks And Spies: Inspecting Console Messages With Jest'
date: '2020-03-23'
publish: '2020-04-12'
category: ['programming']
tags: ['testing', 'jest', 'spyon', 'mock']
---

I was working recently on a project where a function would print to the console when it was executed. I was practicing writing more tests, so I wanted to verify that this function was executing properly and figured there'd be a way to do that with tests.

The problem was I didn't know how. It turns out this was a great opportunity to learn more about mocks and spys - concepts I'd heard plenty about when it came to testing but so far hadn't found a need to explore.

The naive approach: mocking.

```typescript:title="generic.tests.ts"
global.console.log = jest.fn()

describe("Unit tests for my generic class", () => {
  test("Verify the console.log is called", () => {
      const instance = new Instance()
		instance.printResults()
      expect(console.log).toBeCalledTimes(1)
      expect(console.log).toHaveBeenLastCalledWith('The results are spectacular!')
  }
}
```

This works! Even better - it's simple!

You can confirm it by changing the function to `warn` or `error` instead of logging. There are a few issues with this approach though: namely, it's polluting the global namespace and any other test that might rely on that functionality in this test could be unreliable.

An alternative (better) approach is to use jest's `spyOn` functionality.

```typescript:title="generic.tests.ts"
const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
describe("Unit tests for my generic class", () => {
  beforeEach(() => {
    consoleSpy.mockClear()
  })
  test("Verify the console.log is called", () => {
      const instance = new Instance()
		instance.printResults()
      expect(console.log).toBeCalledTimes(1)
      expect(console.log).toHaveBeenLastCalledWith('The results are spectacular!')
  }
}
```

Spys aren't full proof though. They have the same potential danger. For example, if we _didn't_ clear the mock before each test, we could end up in the same situation where our tests are unreliable.

Take for instance the following example:

```typescript:title="generic.tests.ts"
const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
describe("Unit tests for my generic class", () => {
  beforeEach(() => {
    consoleSpy.mockClear()
  })
  test("Verify the console.log is called", () => {
      const instance = new Instance()
		instance.printResults()
      expect(console.log).toBeCalledTimes(1)
      expect(console.log).toHaveBeenLastCalledWith('The results are spectacular!')
  }
  test("An eerily similar test that the console.log is called", () => {
      const instance = new Instance()
		instance.printResults()
      expect(console.log).toBeCalledTimes(1)
      expect(console.log).toHaveBeenLastCalledWith('The results are spectacular!')
  }
}
```

The "eerily similar test" would fail because the call count wasn't reset.

```shell
Error: expect(jest.fn()).toBeCalledTimes(expected)

Expected number of calls: 1
Received number of calls: 2
```

## Conclusion

This project was one of the first where I had the opportunity to write tests from the get go and I have to say, it's been a lot of fun! I haven't taken a TDD approach, but more of a behavioral one - testing the behavior I expect my code to take. Along the way I've had to move code around, refactor a few times, and each time - it's been a really smooth process. It's fascinating! Excited to continue exploring how to take advantage of tests!

h/t to [tanguy_k for his answer](https://stackoverflow.com/a/56677834) to this [Stack Overflow question](https://stackoverflow.com/questions/41223963/jest-how-to-mock-console-when-it-is-used-by-a-third-party-library)

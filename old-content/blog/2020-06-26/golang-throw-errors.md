---
title: 'Throwing Errors In Golang'
date: '2020-05-10'
publish: '2020-06-23'
category: ['programming']
tags: ['golang', 'errors', 'errorf', 'errors.new']
---

Imagine we're counting the nucleotides in a given strand of DNA. If there's an invalid nucleotide, we want to abort the process. How might we do that?

In Golang, here are two approaches:

1. Use `errors`' `New` method
2. Use `fmt`'s `Errorf` method

## Approach 1: errors.New()

```go:
package main

import (
	"errors"
	"fmt"
)

type Histogram map[rune]int

type DNA string

func (d DNA) Counts() (Histogram, error) {
	h := Histogram{
		'A': 0,
		'C': 0,
		'G': 0,
		'T': 0,
	}
	fmt.Println(d)
	for _, c := range d {
		if _, present := h[c]; !present {
			errMsg := fmt.Sprintf("Invalid nucleotide! %q is not valid", c) //highlight-line
			return h, errors.New(errMsg) //highlight-line
		}
		h[c]++

	}
	return h, nil
}

func main() {
	fmt.Println(DNA.Counts("AGCTTA"))
	fmt.Println(DNA.Counts("AGCHHATTA"))
}
```

Here's an [interactive playground](https://goplay.space/#jyJhEXv_Ps9).

## Approach 2: fmt.Errorf

The `fmt` package's `Errorf` function allows for formatting descriptive error messages and is noted as an alternative to using `errors.New` in the [docs](https://godoc.org/errors#New):

```go:title=nucleotide_count.go
package dna

import (
	"fmt"
)

// Histogram is a mapping from nucleotide to its count in given DNA.
type Histogram map[rune]int

// DNA is the the incoming string received by the function
type DNA string

// Counts generates a histogram of valid nucleotides in the given DNA.
// Returns an error if d contains an invalid nucleotide.
func (d DNA) Counts() (Histogram, error) {
	h := Histogram{
		'A': 0,
		'C': 0,
		'G': 0,
		'T': 0,
	}
	fmt.Println(d)
	for _, c := range d {
		if _, present := h[c]; !present {
			return h, fmt.Errorf("Invalid nucleotide! %q is not valid", c) //highlight-line
		}
		h[c]++

	}
	return h, nil
}

```

Here's a [playground](https://goplay.space/#c5p9srIp3O5) to play around with it yourself.

## Conclusion

When the error is this simple, there's not much advantage to bringing in a whole new package, but the [error's package](https://godoc.org/errors) has more to it than just creating a new error. Something to keep in mind.

On an unrelated note, you may notice that the result `h` does not have any letters - this is because it is keyed by runes, and each key is the Unicode code point value.

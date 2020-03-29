---
title: 'System Design & Base Conversions'
date: '2020-03-28'
publish: '2020-04-16'
category: ['programming']
tags:
    [
        'tushar roy',
        'system design',
        'base conversion',
        'base 10',
        'base 2',
        'base 62',
        'bits and bytes',
    ]
---

https://www.youtube.com/watch?v=fMZMm_0ZhK4

In his System Design walkthrough of TinyUrl, Tushar Roy does an excellent job of describing which assumptions he's making and the pros and cons of the different decisions.

One thing I _didn't_ fully understand, and so want to explore in this post is converting bases and how to determine how much space is needed to represent a particular string / number.

For the purposes of this exercise, we'll follow Tushar's example and decide that a 7 character URL of strings and numbers is a good starting point. We can always change that assumption later.

First, if the URL is comprised only of `a-z`, `A-Z`, and `0-9` characters, there are 62 different options for each spot (26 for `a-z`, 26 for `A-Z` and another 10 for `0-9`). This is the total set of available characters.

If the URL is 7 characters long, then we have 62<sup>7</sup> possible permutations ([~3.5 trillion](https://www.hackmath.net/en/calculator/combinations-and-permutations?n=62&k=7&order=1&repeat=1)).<sup>[1](#footnotes)</sup><a id="fn1"></a>

At this point, we know the number of possible permutations, but Tushar then makes the claim that we can represent numbers 0-3.5 trillion with 43 bits.

To see why this is the case, let's take a quick detour to refresh ourselves on bits before determining where 43 came from. For starters: A bit is a single digit, 1 or 0. A byte is 8 bits. A byte can represent a number 0-255. The byte that represents 255 is `11111111`. This is because `11111111` is evaluated as:<sup>[2](#footnotes)</sup><a id="fn2"></a>

```
  1*2^0 // 1
+ 1*2^1 // 2
+ 1*262 // 4
+ 1*2^3 // 8
+ 1*2^4 // 16
+ 1*2^5 // 32
+ 1*2^6 // 64
+ 1*2^7 // 128
-----------------------
255
```

The value of a byte then is capped at ~2<sup>8</sup>. What is the value of 2<sup>41</sup>? ~2,2 trillion. Not quite large enough. 2<sup>42</sup>? 4.4 trillion. Voila. So, why the 43rd bit? This is reserved for the [most significant bit](https://en.wikipedia.org/wiki/Bit_numbering), which can be used to correspond to the sign. If we did not add the 43rd bit, we'd be left with ~2.2 trillion _positive_ numbers and 2.2 trillion negative -- falling short of the 3.5 trillion target.

Now that we know how long our URLs need to be, we can figure out how to create them. One way to do that would be to hash the long URL and then take the first 43 bits and convert them into _base 62_. Base 62, in this context, means that we can map the value to a letter `a-z`, `A-Z` or a digit `0-9`. This is analogous to how we evaluated the byte above, but now we're going from 43 binary bits to a base 62 string.

Using the example of the byte then, let's take a quick look at going backwards from base 10 to base 2.

```
convertBase10ToBase2(13)
13 / 2^7 < 1
...
13 / 2^4 < 1
13 / 2^3 > 1
13 % 2^3 // 5, 1*2^3 +...
5 / 2^2 > 1
5 % 2^2 // 1, 1*2^3 + 1*2^2 +...
1 / 2^1 < 1 //1*2^3 + 1*2^2 + 0*2^1 +...
1 / 2^0 == 1 (equivalent to 1 % 2^0 === 0)
1*2^3 + 1*2^2 + 0*2^1 + 1*2^0
00001101
```

Okay! This makes sense. If we have 8 bits, we look at each bit to see if it should be flipped. Since I'm using a byte, I started at 2<sup>7</sup> and worked down from there.

This is also how we can tell if we need more space to store a value. For example, if, instead of converting 13, I tried converting 256 to base 2 with only a byte of space, I'd run into problems because `256 / 1*2^7 > 1`.

Taking the first 43 bits of the hashed URL then, we could convert it to base 62. Converting it _first_ to base 10 makes this exercise a little clearer however because of the familiarity of base 10 (this is also what Tushar does, and I assume it's for similar reasons).

So, let's say that the first 43 bits of the hashed URL correspond to `00111101 00111011 10011011 00111101 00111011 100`<sup>[3](#footnotes)</sup><a id="fn3"></a>. In base 10, this number is `2103944276444`. Now, we could convert this to _base 62_ to represent it with our available character set. This is a two-step process. The first is to create the base 62 representation, and the second is to convert that into the associated characters.

For example, this calculation by hand might look like:

```
2103944276444 / (37*62^6) > 1 // 37*62^6 +...
2103944276444 % (37*62^6) // 2335559836
2335559836 / (2*62^5) > 1 // 37*62^6 + 2*62^5 + ...
2335559836 % (2*62^5) // 503294172
503294172 / (34*62^4) > 1 // 37*62^6 + 2*62^5 + 34*62^4 +...
503294172 % (34*62^4) // 898748
898748 / (3*62^3) > 1 // 37*62^6 + 2*62^5 + 34*62^4 + 3*62^3 + ...
898748 % (3*62^3) // 183764
183764 / (47*62^2) > 1 // 37*62^6 + 2*62^5 + 34*62^4 + 3*62^3 + 47*62^2...
183764 % (47*62^2) // 3096
3096 / (49*62^1) > 1 // 37*62^6 + 2*62^5 + 34*62^4 + 3*62^3 + 47*62^2 + 49*62^1 + ...
3096 % (49*62^1) // 58
58 % (58*62^0) // 0
```

So, the conversion from base 2 to base 62 resulted in: `37*62^6 + 2*62^5 + 34*62^4 + 3*62^3 + 47*62^2 + 49*62^1 + 58*62^0`. Or, more concisely as `37 2 34 3 47 49 58`.

Now we can convert this into our alpha-numeric representation:<sup>[4](#footnotes)</sup><a id="fn4"></a> `LcIdVX6`.

And just like that, we've converted the first 43 bits of a URL into its base 62 representation.

## Wrapping Up

Most of this post has focused on the mechanics of _how_ to convert between different bases - a topic I've investigated in the past, but clearly had not really stopped to think about deeply like I did today.

And while I feel the need to understand the mechanics before I can safely apply a concept, the _why_ here is important. In the context of a designing a system, these concepts can be used validate critical assumptions.

Notice the assumption that a 7 character URL with 62 available characters for each position would be sufficient. This assumption was based on an estimate that the service would not need to handle more than 1000 writes / second.

In that scenario, it would take ~110 years to consume all of the available permutations. Plenty of time to see an end coming and perhaps add an 8th character.

Using round numbers we can see this for ourselves:

```
1000 URLs / second * 60 seconds / minute * 60 minutes / hour * 24 hours / day * 365 days / year = 31,536,000 seconds / year
3,500,000,000,000 URLs / 31,500,000,000 URLs / Year ~ 111 years
```

But what if we initially wanted even _shorter_ URLs? For example, if wanted a six digit URL instead of seven, we now have "only" 56.8 billion and suddenly, at 1,000 writes / second, our service would operate for less than two years before we'd exhausted all of our combinations:

```
56,800,235,584 URLs / 31,500,000,000 URLs / Year ~ 1.8 years
```

On the other hand, if the service was used an order or two magnitude more, we could see the lifespan evaporate quickly (i.e. 10,000 URLs / second write reduces the lifespan accordingly to ~11 years).

I bring all of this up because while the 7 digit URL seemed arbitrary when first explained, by doing some back of the envelope calculations we can validate them easily. The point is to see how they all come together and digging through these calculations helped me do exactly that with the added benefit of understanding better how to convert between bases!

## Footnotes

-   <sup>[1](#fn1)</sup> Figuring out _which_ permutation formula to use was not immediately obvious to me. When I think of combinations and permutations, I tend to start with "n choose k" written as `n! / [k!(n-k)!]` - that is, the combinations of size k within a set of size n. That sort of formula makes a lot of sense if you're looking for combinations of resources that are consumed when utilized in a set. For example, if you have a roster of 20 people (n), how many different groups of 5 people (k) can you have? It would make no sense for one person to be in a group _twice_. This is sometimes referred to as "without replacement" in the context of [combinatorics](https://en.wikipedia.org/wiki/Combination) or "with repetition" in the context of [permutations](https://en.wikipedia.org/wiki/Permutation). With the understanding that replacement is allowed _and_ the order is important, we can see that the formula is n<sup>k</sup>.
-   <sup>[2](#fn2)</sup> While not explicitly stated, what I mean by "evaluating" this byte is converting it from base 2 to base 10.
-   <sup>[3](#fn3)</sup> This is a completely arbitrary number. It's only for demonstration purposes.
-   <sup>[4](#fn4)</sup> The table for the crosswalk I used is described below, though there's no reason why this is the only way I could have done this.

```
a=0     A=26    0=52
b=1     B=27    1=53
c=2     C=28    2=54
d=3     D=29    3=55
e=4     E=30    4=56
f=5     F=31    5=57
g=6     G=32    6=58
h=7     H=33    7=59
i=8     I=34    8=60
j=9     J=35    9=61
k=10    K=36
l=11    L=37
m=12    M=38
n=13    N=39
o=14    O=40
p=15    P=41
q=16    Q=42
r=17    R=43
s=18    S=44
t=19    T=45
u=20    U=46
v=21    V=47
w=22    W=48
x=23    X=49
y=24    Y=50
z=25    Z=51
```


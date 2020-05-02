---
title: 'Basic Flow Control In Python'
date: '2020-05-02'
publish: '2020-06-08'
category: ['programming']
tags: ['python','flow control','examples','beginner']
---
Continuing my basics education of Python, here are some examples of flow control.

I'll explore the following: 
1. If, else if, and else
2. Iterating over lists
3. Break statements
4. Ranges, starts, ends and steps
5. While loops

## If, Else If, and Else
``` python:title=if_elif_else.py
# if, elif, else
x = int(input("enter an integer: "))
if x < 0:
    x = 0
    print('Negative number set to 0.')
elif x == 0:
    print('zero')
elif x == 1:
    print('one')
else:
    print('some other number')
```
The fun part about this example is that if you run the program, it will ask for an input from the console. 

## Iterating Over Lists
```python:title=lists.py
pets = ['Cat', 'Dog', 'Elephant', 'Hamster']

for pet in pets:
    print(f'I have a {pet}.')
```

When we run this, python will iterate over the list:
```shell
$ python lists.py
I have a Cat.
I have a Dog.
I have a Elephant.
I have a Hamster.
```

## Adding In Break Statements
In the next example, we'll break out of the iteration if we see a Dog:

```python:title=no_dogs.py
pets = ['Cat', 'Dog', 'Elephant', 'Hamster']

for pet in pets:
    if pet == 'Dog':
        print('No dogs allowed!')
        break
    else:
        print(f"We love {pet}s!")
```

For example:
```
$ python no_dogs.py
We love Cats!
No dogs allowed!
```

## Ranges
When using ranges, there are up to three parameters and behavior changes depending on how many are provided. In all cases, the range is inclusive of the start and non-inclusive of the end.
```python:title=ranges.py
for i in range(5):
    print(i)

for i in range(10, 15):
    #          (start, end)
    print(i)

for i in range(0, 30, 5):
    #         (start, end, step)
    print(i)

for i in range(30, 0, -5):
    print(i)
```

With just one argument, the value is the end of the range. 
With two, we have a start and end.
WIth three we have start, end, and step/increment. The increment can be positive or negative.

## While Loops
The while loop will continue to operate as long as it remains true. 
```python:title=while.py
# while loops
x = 0
while x < 10:
    print(x)
    x += 1
```

In this case, the while loop evaluates if x is less than 10. While true, it prints x and then increments x. 

---
title: 'Removing Null Values From A Dictionary'
date: '2020-06-07'
publish: '2020-06-06'
category: ['programming']
tags: ['python', 'dictionary', 'recursion']
---

I recently was converting a Python dictionary to a JSON object to include in the body of a POST request. Unfortunately, this triggered a response from the service I was sending the data too:

```json
{
    "Code": "InvalidInputValue",
    "Message": "Cannot perform operation because the value doesn't match the data type of the following field(s): Date_Client_Received"
}
```

This is because my dictionary had a null value that I hadn't removed. Knowing the issue, we can now solve it.

Assuming for the moment that we don't have control over what goes _into_ the dictionary, we have two approaches

1. Dictionary Comprehension (works well if the dictionary is _not_ nested)
2. Recursive "cleaning"

## Approach One: Dictionary Comprehension

```python:title=clean.py
def remove_none_values(dict):
    """
    Given a dictionary, dict, remove None values
    If a dictionary includes nested values, a recursive approach is required
    """
    return {
        key:value
        for key, value in dict.items()
        if value is not None
    }

```

## Approach Two: Recursive Cleaning

Similar to the dictionary comprehension, we need to look at each key in the dictionary and, if it's `None`, remove it. However, in this case, if a value is another dictionary, we can dive into that key as well to remove `None` values.

```python:title=recursive_clean.py
def remove_none_values(dict):
    """
    Given a dictionary, dict, remove None values
    If the dictionary includes nested dictionaries, investigate and remove None values there too.
    """
    cleaned_dict = {}
    for key, value in dict.items():
        if isinstance(value, dict):
            nested_dict = remove_non_values(value)
            if len(nested_dict.keys()) > 0:
                cleaned_dict[key] = nested_dict
        elif value is not None:
            cleaned_dict[key] = value
    return cleaned_dict
```

## Conclusion

Here are two ways to clean a dictionary of empty keys - the latter which can handle nested dictionaries. This can helpful if you need to send along the dictionary to another service that may not be able to handle a `None` value.

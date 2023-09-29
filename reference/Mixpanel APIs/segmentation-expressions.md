---
title: "Segmentation Expressions"
slug: "segmentation-expressions"
hidden: false
createdAt: "2020-10-21T23:25:38.408Z"
updatedAt: "2021-11-03T19:36:47.214Z"
---
Segmentation Expressions are used in [Query API](ref:query-api) and [Raw Data Export API](raw-data-export-api) to allow for more specificity when querying your data.

The power of segmentation comes from the ability to define custom expressions based on property names in the where and on parameters. An expression consists of a property, combined with one or more operators that can perform mathematical operations, logical operations, or typecasts. Expression are then applied in the where and on parameters of the segmentation API. The full grammar for expressions is given here:
[block:code]
{
  "codes": [
    {
      "code": "<expression> ::= 'properties[\"' <property> '\"]'\n                | <expression> <binary op> <expression>\n                | <unary op> <expression>\n                | <math op> '(' <expression> ')'\n                | <typecast op> '(' <expression> ')'\n                | '(' <expression> ')'\n                | <boolean literal>\n                | <numeric literal>\n                | <string literal>\n  <binary op> ::= '+' | '-' | '*' | '/' | '%' | '==' | '!=' |\n                  '>' | '>=' | '<' | '<=' | 'in' | 'and' | 'or'\n   <unary op> ::= '-' | 'not'\n    <math op> ::= 'floor' | 'round' | 'ceil'\n<typecast op> ::= 'boolean' | 'number' | 'string'\n   <property> ::= 'properties[\"' <property name> '\"]'",
      "language": "text",
      "name": "Expression Syntax"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Examples"
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "Expression",
    "h-1": "Description",
    "0-0": "`properties[\"account_id\"] in [1,2,3,4]`",
    "0-1": "Returns `true` if `account_id` event property is 1, 2, 3, or 4, otherwise `false`.",
    "1-0": "`user[\"$email\"] == \"allison@example.com\"`",
    "1-1": "Returns `true` if `$email` user property is \"allison@example.com\" otherwise `false`.",
    "2-0": "`defined(properties[\"My Prop\"])`",
    "2-1": "Returns `true` if `My Prop` event property has any value, otherwise `false`. This is the same as \"is set\" in the UI.",
    "3-0": "`not defined(properties[\"city\"])`",
    "3-1": "Returns `false` if `city` event property has any value, otherwise `true`. This is the same as \"is not set\" in the UI."
  },
  "cols": 2,
  "rows": 4
}
[/block]
## Typecast Operations

Internally, all properties of events have a type. This type is determined when we parse the event sent to us into a JSON object. Currently, there are three types, string, number, and boolean, which may be specified directly. A property may also have the values null and undefined, which are only handled internally. The default type is string. If you wish to treat an expression as another type, you may use the typecast operators to cast a property to a different type. For example, if `properties["signed up"]` has values of `"true"` and `"false"` as strings, and you wish to intercode them as booleans, you may cast them by using the `boolean() typecast function: boolean(properties["signed up"])`.

The typecasting rules are described below.

## Casting to String
[block:parameters]
{
  "data": {
    "0-0": "**Type**",
    "0-1": "Result",
    "1-0": "**String**",
    "1-1": "Same String",
    "2-0": "**Number**",
    "2-1": "String containing the decimal representation of the number.",
    "3-0": "**Boolean**",
    "3-1": "\"true\" or \"false\"",
    "4-0": "**null**",
    "4-1": "null",
    "5-0": "**Undefined**",
    "5-1": "undefined"
  },
  "cols": 2,
  "rows": 6
}
[/block]
## Casting to Number
[block:parameters]
{
  "data": {
    "0-0": "**Type**",
    "0-1": "Result",
    "1-0": "**String**",
    "1-1": "Attempts to interpret the string as a decimal. If this fails, the value becomes undefined.",
    "2-0": "**Number**",
    "2-1": "Same number",
    "3-0": "**Boolean**",
    "3-1": "1.0 if true, 0.0 if false",
    "4-0": "**null**",
    "4-1": "undefined",
    "5-0": "**undefined**",
    "5-1": "undefined"
  },
  "cols": 2,
  "rows": 6
}
[/block]
## Binary Operations

The arithmetic operators `"-"`, `"*"`, `"/"`, `"%"` perform the subtraction, multiplication, division, and remainder operations, respectively. The division operator will return undefined if the divisor is 0. The sign of the value of the remainder will be equivalent to the dividend. All four of these operators expect both operands to be of the type number, or else the result is undefined.

The `"+"` operator behaves as addition if its two operands are of type number. However, if its two operands are of type string, it will concatenate the two strings. In other cases, the result is undefined.

The equals operator `"=="` will always return a boolean. When its two types are equal, it performs the standard equality comparison based on the values. If the types of its operands are not equal, false is returned. The not equals operator `"!="` returns false when the equals operator would return true and vice-versa.

The comparison operators `">"`, `">="`, `"<"`, and `"<="` returns a boolean value based on evaluating the comparison when its operands are both of type number. When its types are not equal, undefined is returned.

The `"in"` operator returns true if both operands are of type string and the first string is a substring of the second. When both operands are of differing types, undefined is returned.

The logical operators `"and"` and `"or"` accept boolean and undefined operands. An operand with type undefined evaluates as false. Any other types will result in an error.

## Unary and Math Operations

The `"-"` operator will negate an operand of type number, and return undefined otherwise.

The `"not"` operator will perform the logical not on an operand of type boolean. It will also evaluate an operand of type undefined as true. All other operands will be evaluated to undefined.

The `"floor"`, `"round"`, and `"ceil"` functions perform their mathematical operations on an operand of type number. On all other types, it will return undefined.
---
title: "Custom Properties"
slug: "custom-properties"
hidden: false
metadata:
  title: "Custom Properties"
  description: "Learn about custom properties."
---

# Overview

Custom properties lets you combine existing properties into new properties on the fly, using a simple Excel-like formula language. You can then use these new properties almost anywhere that you can use regular properties, with the ability to save/share them for reuse across your team. For more on why we built this, check out [our blog](https://mixpanel.com/blog/introducing-the-mixpanel-modeling-layer/).

Example use-cases include:

- Create custom buckets for numeric properties ("low", "medium", "high")
- Compute the days between two date properties (eg days since signup)
- Mathematical functions on numeric properties (round, ceiling, floor..)
- Split a string into its parts (eg: extract domain from URL or email)
- Arbitrarily complex string manipulation with regex

# Use Cases

## Custom Bucketing

You can use custom properties to create arbitrary buckets out of your numerical properties, for example creating age groups from age, or income brackets from salary.

Note: you can do this without creating a custom property as well, using [Custom Buckets](doc:other-advanced-features#custom-buckets). Custom Properties enables you to save and share this bucketing with the rest of your team.

For example, if you have a property for “Days since registration” and you want to bucket the users into “Months since registration” (0-1 months: X users, 1-6 months: Y users, 6+ months: Z users), you can use custom properties.

![https://help.mixpanel.com/hc/article_attachments/360053124672/mceclip0.png](https://help.mixpanel.com/hc/article_attachments/360053124672/mceclip0.png)

## Merge or Rename Values to Fix Implementation Issues

Use custom properties to combine multiple property values into one. This is helpful when customers want to take multiple variations of a property value (e.g. facebook, fb, fbsocial) and then combine them into one property value (e.g. facebook).

If you send values into Mixpanel with variations (even though they may have been minor) and you want to correct this issue by grouping those values together.

For example:

A marketing manager wants to understand what portion of the user base is coming through a social traffic acquisition path. They want to group all social channel values into a single value, and keep the rest of the channels as-is.

They can create a custom property using the channel with this transformation:

![https://help.mixpanel.com/hc/article_attachments/360053125752/mceclip1.png](https://help.mixpanel.com/hc/article_attachments/360053125752/mceclip1.png)

## Add Domain Knowledge from Existing Data to Make Data More Accessible

Capture your business logic with Custom Properties to add meaning to your data in Mixpanel, and empower the rest of your team to ask more questions with ease. Take signals in your data and add domain-specific understanding to help other teams unfamiliar with your data model explore your data.

For example, take the case where the marketing team for a music streaming service wants to understand the adoption of original music within their platform. The logic to determine which songs are "original" might be a bit complicated for members outside the product team to discover.

The product team can take these property values and add on domain understanding as a new property, so more team members can dig into the data and drive insights for their needs.

In this example, let’s say that there is an event called “Media Played”, that has the properties "mediaType" (values of 0 or 1, which really mean song (0) or video (1), "Artist" (string, where if the string contains "myflix", then it means that’s an original), so a new custom property could be created to define whether something is an "OriginalSong" (true/false) by combining the logic from "mediaType" and "Artist":

## Create New Properties Based on Values of Different Properties

Use custom properties to create a new property using the values of multiple other properties.

For example:

A marketplace company wants to track total purchase amount for an order, but the per-unit price is passed as a property and the number of items is passed as a property.

They can create a custom property using “price” and “quantity” with this transformation:

![https://help.mixpanel.com/hc/article_attachments/360053125952/mceclip2.png](https://help.mixpanel.com/hc/article_attachments/360053125952/mceclip2.png)

## Compute the Number of Days Between Two Date Properties

Use custom properties to compute the date/time difference between two date properties. You can also use the special "TODAY()" function to find the difference between a date property and the current date/time. This is ideal when you want to transform a "DateofBirth" property into “age” or a "Created" property into “days active since registration”.

A new custom property can be defined by taking into account the “Created” property and using the following transformation:

![https://help.mixpanel.com/hc/article_attachments/360052865351/Untitled.png](https://help.mixpanel.com/hc/article_attachments/360052865351/Untitled.png)

This will create the following output:

![https://help.mixpanel.com/hc/article_attachments/360052735852/Untitled2.png](https://help.mixpanel.com/hc/article_attachments/360052735852/Untitled2.png)

## Modify Defined Properties

Use custom properties to create a new property if and only if a property is defined.

For example:

A telco company charges its customers based on talk-time (minutes spoken) and on apps purchased. If the company wants to track the average duration per minute, they would want to restrict the calculation to just the purchases for talk-time (where duration (minutes) is defined).

They can create a custom property using “Duration” and “Amount” with this transformation:

![https://help.mixpanel.com/hc/article_attachments/360053264991/mceclip3.png](https://help.mixpanel.com/hc/article_attachments/360053264991/mceclip3.png)

## Check whether Property Values Are the Same

Use custom properties to create a new property if two property values are the same.

For example:

A company wants to find out what percentage of purchases are being made by users that have changed countries since sign up.

They can create a custom property to determine whether the two country values are the same with this transformation:

![https://help.mixpanel.com/hc/article_attachments/360053127592/mceclip4.png](https://help.mixpanel.com/hc/article_attachments/360053127592/mceclip4.png)

## Transform String Property Values to Upper/Lowercase

Use custom properties to change the case of a string property value.

For example:

If a company that sells ice-cream wants to look at popular pie flavors, and if the flavors were written with different casing (“vanilla”, “Vanilla”, vaNilla”), the three values would show up differently as opposed to being the same.

They can create a custom property that combines and casts all these values to the same case using this transformation:

![https://help.mixpanel.com/hc/article_attachments/360053127672/mceclip5.png](https://help.mixpanel.com/hc/article_attachments/360053127672/mceclip5.png)

## Extract Domain from Email Address

Extract the domain of the email from an email address. You can parse out parts of a string after "@" using the SPLIT function:

![https://help.mixpanel.com/hc/article_attachments/360068799312/mceclip1.png](https://help.mixpanel.com/hc/article_attachments/360068799312/mceclip1.png)

This provides the following output:

![https://help.mixpanel.com/hc/article_attachments/360069021451/mceclip2.png](https://help.mixpanel.com/hc/article_attachments/360069021451/mceclip2.png)

## Query a List with an Index

Use list referencing with custom properties to parse out any part of a list by an index.

Let’s say you have a list of recommendations as a property, and you’d like to parse out the first recommendation as another string property.

You can parse out the first delivery ID in a list property with several DeliveryIDs:

![https://help.mixpanel.com/hc/article_attachments/360052737872/Untitled5.png](https://help.mixpanel.com/hc/article_attachments/360052737872/Untitled5.png)

# Creating a Custom Property

Click **Create Custom > Event Property or User Property** to open the property builder.

![https://help.mixpanel.com/hc/article_attachments/360069674871/mceclip1.png](https://help.mixpanel.com/hc/article_attachments/360069674871/mceclip1.png)

Optionally give your property a name and click into the formula bar to start defining it. If you're new to this feature, we recommend starting with one of the examples. Click the **Insert Example** drop down to populate the box with a use-case specific custom property.

When writing your formula, click **Ctrl + Space** to see a list of all the available functions and their descriptions. Click **period (.)** to search for event or user profile properties to add to the formula.

![https://help.mixpanel.com/hc/article_attachments/360069675111/mceclip2.png](https://help.mixpanel.com/hc/article_attachments/360069675111/mceclip2.png)

Custom properties are local to the report by default, when you select **Apply**. To save the custom property permanently for use in other reports and to make it usable by other project members, click **Save**. We recommend Apply-ing the custom property and using it in your local analysis first, before saving and sharing, to reduce clutter in the project.

When you create custom properties and select **Save as Custom Property**, your created custom property will be private by default. You can also add a description at this stage, so you and your colleagues can know what the custom property is for. You can also decide to save the custom property and **share** that custom property with specific colleagues, teams or the entire organization by clicking "**Save and Share**":

# Reference

## Functions

Use the following functions in the **Formula** field to modify your custom property:

| Function | Definition | Syntax & Example |
| --- | --- | --- |
| if | Evaluates if an expression is true or false. | if(condition, value if true, value if false)<br />Example:<br />if(A=="Facebook" or A=="Twitter", "Social", A) |
| ifs | Runs multiple checks and returns a value corresponding to the first true result. If no conditions are true, undefined is returned. | ifs(condition1, value1, condition2, value2, …)<br />Example:<br />ifs( A<60,"Less than 1 hour",<br />A<120, "More than 1 hour but less than 2 hours",<br />A>=120, "More than 2 hours") |
| not | Returns values that are not true. | not(condition)<br />Example:<br />not (A == "Facebook") |
| and | Returns true if both conditions are met. Else, returns false. | x and y<br />Example:<br />if(A=="San Francisco" and<br />B=="Chrome", "Valid user", "Invalid User") |
| or | Returns true if either condition is met. Else, returns false. | x or y<br />Example:<br />if(A=="San Francisco" or B=="Chrome", "Valid user", "Invalid User") |
| in | Returns true if the first condition is contained in the second condition. | x in condition<br />Example:<br />if("Facebook" in A, "Facebook Corporation", A)This can also be used to check against a list of values:<br />if(A in ["Chrome","Firefox","Edge"],"Acceptable browser","Unsupported browser") |
| boolean | Casts the argument to a boolean. | boolean(value)->false, boolean(alternate value)-> true<br />Example:<br />boolean(A) |
| number | Casts the argument to a number. | number(value to cast)<br />Example:<br />number(A, B) |
| string | Casts the argument to a string. | string(value to cast)<br />Example:<br />string(A) |
| defined | Determines if a value exists. If a property is not defined on a parent event or profile, this will return false, otherwise this will return true. | defined(variable to check for existence)<br />Example:<br />defined(A) |
| has_prefix | Determines whether a string starts with another string. This comparison is case-insensitive. | has_prefix(string to check, prefix)<br />Example:<br />has_prefix(A, "United") |
| has_suffix | Determines whether a string ends with another string. This comparison is case-insensitive. | has_suffix(string to check, suffix)<br />Example:<br />has_suffix(A,"States") |
| min | Determines the minimum value between two numbers. | min(number, number)<br />Example:<br />min(A,B) |
| max | Determines the maximum value between two numbers. | max(number, number)<br />Example:<br />max(A,B) |
| floor | Returns the largest integer that is smaller than or equal to the input (ie: rounds down to the nearest integer). | floor(number)<br />Example:<br />floor(A) |
| ceil | Returns the smallest integer value greater than or equal to the input (ie: rounds up to the nearest integer). | ceil(number)<br />Example:<br />ceil(A) |
| round | Returns the nearest integer value of the input value. | round(number)<br />Example:<br />round(A) |
| upper | Cast string property values to uppercase. | upper(string property)<br />Example:<br />upper(A); upper("hello") -> "HELLO" |
| lower | Cast string property values to lowercase. | lower(string property)<br />Example:<br />lower(A); lower("FacEBook") -> "facebook" |
| regex_extract | If haystack is a string and pattern matches at least one substring, extracts the result from the first pattern match in haystack. The result is a string equal to the entire regex match, or if capture group is specified, only that portion of the match. | regex_extract(haystack, pattern, <optional capture group  #>)<br />Example:<br />regex_extract("iPhone5.1","iPhone(...)",1) ->5.1 |
| regex_match | Returns true if the pattern matches any part of the string. | regex_match(haystack, pattern)<br />Example:<br />regex_match("zzhaystackzz", "ha(..)ack") -> true// Use (?-i) for case-sensitive matchingregex_match("HAYSTACK", "(?-i)haystack") -> false |
| regex_replace | Replaces the parts of a string that match a regular expression with a different string. | regex_replace(haystack, pattern, replacement)<br />Example:<br />// convert currency string to numbernumber(regex_replace("$1,234,567", "[^.0-9]\*", "")) -> 1234567 |
| datedif | Subtract two dates. Units:<br />D: days.<br />M:  months.<br />Y: years<br />MD:  days remaining after subtracting whole months.<br />YM:  months remaining after subtracting whole years.<br />YD:  days, assuming start_date and end_date are within 1 year.<br />Use TODAY() for current day. |<br />datedif(start_date,end_date,unit)<br />Example:<br />datedif(registrationdate,TODAY(), "M") -> 5 |
| len | Returns the length of the string or the list. | len (string) or len (list)<br />Example:<br />len("Canada") -> 6 |
| left | Returns characters from the beginning of a given string. | left(string, num_of_characters)<br />Example:<br />left("Canada",3) -> "Can" |
| right | Returns characters from the end of a given string | right(string, num_of_characters)<br />Example:<br />right("Canada",3) -> "ada" |
| mid | Returns characters from the middle of a given string | mid(string, first_index, num_of_characters)<br />Example:<br />mid("Canada",1,4) -> "Cana" |
| split | Splits a string into different parts based on a user-specified delimiter, and lets you select a particular split. Delimiter must be a single ASCII character. To fetch a list of all splits, don't pass a third argument. The first split is accessible by passing n=1 (second with n=2, ...) | split(input string, delimiter, [n: optional]) → string <br />Examples with 1 split:<br />split("dwight@dm.com","@",2) -> "dm.com"<br />split("dwight@dm.com","@",4) -> undefined<br />split("dwight@dm.com","/",2) -> "dwight@dm.com"<br />split("empty//string/","/",2) -> ""Examples with all splits:<br />split("dwight@dm.com","@") -> ["dwight", "dm.com"]<br />split("a/b/c/d", "/") -> ["a", "b", "c", "d"]<br />split("a/b/c/d", "-") -> ["a/b/c/d"]<br />split("a//b/c/d", "/") -> ["a", "", "b", "c", "d"] |
| let | Define a variable and use it in an expression. This helps keep the custom property definition neat and non-repetitive. Variables are only active within the scope of the LET function. You can nest multiple let functions to define multiple variables. | LET(name, definition, expression)<br />// define a variable "spend" and use it in an expression<br />LET(<br />   spend, \<price\> * \<quantity\>,<br />   IFS(<br />       spend < 50, "no discount",<br />       spend < 200, "gold discount",<br />       spend > 200, "platinum discount",<br />       TRUE, "invalid"<br />   )<br />)    <br />Note: \<price\> and \<quantity\> are event properties. |
| any | Evaluates to TRUE if the given expression is true for any value in the given list. The expression can refer to the current list element by the given name. | ANY(name, list, expr) <br />Let's say you had a list of numbers called priceList= [5,205,178,12,22]<br />ANY(X, priceList, X > 300) will return false.<br />ANY(X, priceList, X >= 5 and X < 300) will return true. |
| all | Evaluates to TRUE if the given expression is true for all values in the given list. The expression can refer to the current list element by the given name. | ALL(name, list, expr) <br />Let's say you had a list of numbers called priceList= [5,205,178,12,22]<br />ALL(X, priceList, X > 5 and X < 200) will return false.<br />ALL(X, priceList, X >= 5 and X < 300) will return true. |
| filter | Filters the given list to only include items for which the given expression is true. The expression can refer to the current list element by the given name. | FILTER(name, list, expr) <br />Let's say you had a list of numbers called priceList= [5,205,178,12,22]<br />FILTER(X, priceList, X>100) would give you a new shortened list = [205,178] |
| map | Transforms each value in the given list using the given expression. The expression can refer to the current list element by the given name. | MAP(name, list, expr) <br />Assume a list property states = ["Georgia","Florida","Texas"]<br />MAP(X, states, LOWER(X)) will return ["georgia","florida","texas"] |
| sum | Sums all numbers in the given list. Non-numeric items in the list are ignored. | SUM(list) <br />Let's say you had a list of numbers called priceList= [5,205,178,12,22]<br />SUM(priceList) -> 422.<br />SUM(FILTER(X, priceList, X>100)) -> 383, because FILTER(X,priceList, X>100) would result in [205,178] and SUM([205,178]) = 383. |

## Numeric Operators

Use the following numeric operators in the **Formula** field to modify your custom property using:

- `+`: Addition. Can also be used to create a concatenation.
- `-`: Subtraction
- `*`: Multiplication
- `/`: Division
- `%`: Modulo

## Comparison Operators

Use the following comparison operators in the **Formula** field to modify your custom property:

- `<`: The first number is strictly less than the second number.
- `>`: The first number is strictly greater than the second number.
- `>=`: The first number is greater than or equal to the second number.
- `<=`: The first number is less than or equal to the second number.
- `==`: The first argument is equal to the second argument. If both arguments are strings, the comparison is case-insensitive.
- `!=`: The first argument is not equal to the second argument. If both arguments are strings, the comparison is case-insensitive.

## Constants
- `false`: Represents the literal value of boolean false.
- `true`: Represents the literal value of boolean true.
- `undefined`: Represents the literal value of cases that aren’t defined.

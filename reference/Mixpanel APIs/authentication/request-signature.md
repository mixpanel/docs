---
title: "Request Signature [Deprecated]"
slug: "request-signature"
hidden: false
createdAt: "2020-10-20T00:18:42.820Z"
updatedAt: "2021-10-07T14:36:59.941Z"
---
[block:callout]
{
  "type": "danger",
  "body": "API authentication via request signature is an outdated authentication. The documentation below has been included for your reference. Please migrate existing code to use Service Account authentication.",
  "title": "Deprecation Warning"
}
[/block]
Request signature authentication is the process of creating an encrypted token unique to a set of request parameters and their values. It was useful when requests were made insecurely or needed to be expirable. However, superior and more simplistic security practices have made this approach obsolete.
[block:api-header]
{
  "title": "Calculating a Signature"
}
[/block]
In order to generate a request signature you will need the following information:

**api_key**: This is the token from the corresponding to the project you wish to consume from.
**api_secret**: This is a secret API key corresponding to the project.
**expire**: UTC time in seconds; used to expire an API request.
**all other request parameters**: All of the information for the API request being performed

Calculating the signature is done in parts:
1) Alphabetically sort all parameters being used in the request. This excludes your api_secret
2) alphabetically sorted order, concatenate the parameter and parameter value joined by an equal sign. For example: `param1=paramvalue1param2=paramvalue2` 
2) append the api_secret to the string of concatenated parameters.
3) md5 hash the final string

The resulting hash is the request signature.
[block:code]
{
  "codes": [
    {
      "code": "# all query parameters going to be sent out with the request\nrequest_parameters = {\n   api_key: '123',\n   unit: 'hour',\n   interval: '24',\n   event: '[\"pages\"]',\n   expire: '1248499222',\n}\n\nsorted_parameter_names = sort(keys(request_parameters))\ncombined_params = ''\n\nfor param in sorted_parameter_names:\n\tcombined_params += \tparam + \"=\" + request_parameters[param]\n\nrequest_signature = md5(combined_params + api_secret)",
      "language": "shell",
      "name": "Pseudo Code"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Authenticating with a Request Signature"
}
[/block]
The generated signature needs to be provided with the parameters you used to calculate it. It will not work if any parameters or values change and it will not be valid after the expiry time.

Your URL should look similar to this however varying on the endpoint you are requesting data from:


[block:code]
{
  "codes": [
    {
      "code": "https://mixpanel.com/api/2.0/events/\n\t\t&interval=7\n\t\t&expire=1275624968\n\t\t&api_key=f0aa34668dsadsa231\n\t\t&type=average\n\t\t&event=%5B%22splash+features<%22%2C+%22account-page%22%5D\n\t\t&unit=day\n    &sig=046ceec93983811dad0fb20f842c351a\n",
      "language": "text",
      "name": "Request with Signature"
    }
  ]
}
[/block]
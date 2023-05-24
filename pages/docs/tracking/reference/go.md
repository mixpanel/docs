---
title: "Go"
slug: "go"
hidden: false
metadata: 
  title: "SDK Integration: Python library | Mixpanel Developer Docs"
  description: "Mixpanel's Go library is designed to be used for scripting, or in circumstances when a user isn't directly interacting with your application. Learn more here."
createdAt: "2023-05-23T18:57:57.678Z"
updatedAt: "2023-05-23T20:07:00.387Z"
---

The Mixpanel Go library is designed to be used for scripting, or in circumstances when a client can't or won't run client side scripts

The [Full API Reference](https://pkg.go.dev/github.com/mixpanel/mixpanel-go), [Library Source Code](https://github.com/mixpanel/mixpanel-go).
Also checkout our [Examples](https://github.com/mixpanel/mixpanel-go/tree/main/examples)

## Installing the Library

You can get the library using go get.
```shell
go get github.com/mixpanel/mixpanel-go
```

Once the library is installed, use the Mixpanel library in your applications with:

```go
mp := mixpanel.NewClient("PROJECT_TOKEN")
```

## EU Data Residency

Route data to Mixpanel's EU servers by using the EuResidency option
```go
mp := mixpanel.NewClient("PROJECT_TOKEN", mixpanel.EuResidency())
```

## Sending Events

Mixpanel events are sent using an instance of the Mixpanel class.

You can instantiate an instance of Mixpanel with a String containing your Mixpanel project token. You can find your project token in the settings dialog of the Mixpanel web application.

Once you have an instance of the tracker, you can track events by providing the event name and properties to [Track](https://pkg.go.dev/github.com/mixpanel/mixpanel-go#Mixpanel.Track).
```go
package main

import (
	"context"
	"github.com/mixpanel/mixpanel-go"
)

func main() {
	ctx := context.Background()

	mp := mixpanel.NewClient("PROJECT_TOKEN")
	if err := mp.Track(ctx, []*mixpanel.Event{
		mp.NewEvent("Signed Up", "", map[string]any{
			"Signup Type": "Referral",
		}),
	}); err != nil {
		panic(err)
	}
}

```

Mixpanel can determine default geolocation data ($city, $region, mp_country_code) using the IP address on the incoming request. As all server-side calls will likely originate from the same IP (that is, the IP of your server), this can have the unintended effect of setting the location of all of your users to the location of your datacenter. [Read about best practices for geolocation with server-side implementations](https://mixpanel.com/blog/2014/09/08/everything-about-server-side-updates/).


## Storing User Profiles

In addition to events, you can send user profile updates to Mixpanel. Mixpanel can maintain a profile of each of your users, storing information you know about them. An update is a message that changes the properties of a user profile.

You can use profiles to explore and segment users by who they are, rather than what they did. You can also use profiles to send messages, such as emails, SMS, or push notifications.

Mixpanel determines default geolocation data ($city, $region, mp_country_code) using the IP address on the incoming request. As all server-side calls will likely originate from the same IP (that is, the IP of your server), this can have the unintended effect of setting the location of all of your users to the location of your datacenter. [Read about best practices for geolocation with server-side implementations](https://mixpanel.com/blog/2014/09/08/everything-about-server-side-updates/).

### Setting Profile Properties
Instances of Mixpanel have a method to send profile updates.

```go
// create or update a profile with First Name, Last Name,
// E-Mail Address, Phone Number, and Favorite Color
// without updating geolocation data or $last_seen

```

This call to [PeopleSet](https://pkg.go.dev/github.com/mixpanel/mixpanel-go#Mixpanel.PeopleSet)</a> will change the value of properties on user 12345's profile. If there isn't a profile with distinct_id 12345 in Mixpanel already, a new profile will be created. If user 12345 already has has any of these properties set on their profile, the old values will be overwritten with the new ones.

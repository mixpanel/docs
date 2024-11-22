
interface Mixpanel {
  // @TODO: https://mixpanel.atlassian.net/browse/INTRACTIVE-685
  track_pageview: <T>({ [string]: string }) => T
  // @TODO: https://mixpanel.atlassian.net/browse/INTRACTIVE-685
  persistence: {
    props: {
      [property: string]: string
    }
  }
}
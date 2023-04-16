If you see something off with Mixpanel's [docs](https://developer.mixpanel.com/v3.19) (typo, broken link, outdated content/screenshot) you can now contribute that fix yourself!

# Contributing Fixes
You’ll need a [GitHub account](https://github.com/signup). It’s free and takes 1 minute to create. Not sure what to make your handle? We recommend `yourfullname-mixpanel`. 

To make an edit: 
* Go to the file you want to edit. Our directory structure roughly matches the hierarchy in ReadMe.
* Click the pencil icon to make edits to a file’s markdown. You can swap between code and preview to see what your edits look like.
* When you’re ready, hit “Commit” and follow the instructions to commit the changes to your branch and create a pull request review. Add a description if you like, keeping in mind that this is publicly accessible.
* GitHub will post a message in Mixpanel's internal Slack with a link to your review.
* One of the docs maintainers will review that request within 3 days and merge when approved (usually faster if it’s a small change).
* Once merged, changes will go live automatically, typically within 1-2 minutes.

# Adding Images
You can paste images directly into the markdown of the doc that you're editing. This will automatically upload the file to Github's CDN and embed the image in the doc.

You can customize the image's width or height using HTML. Here's a sample (replace the image link with the one generated when you paste your image in):
`<img height=“387” alt=“image” src=“https://user-images.githubusercontent.com/2077899/230281466-11bfdbf7-0820-41c0-a4e8-b802faabaf20.png”>`

Note: images can easily get out of date, so use them judiciously. If showcasing a new feature, we recommend putting images into the changelog instead of the docs.

# Previewing Changes
All pull requests will generate a staging link in Vercel. This lets you preview your changes without changing what's actually live. 

# Adding new docs / changing structure
The navigation of the docs is defined based on the directory structure in this repo. The top-level structure (getting-started, tracking, analysis, admin, other-bits) should not change very often.

We have fewer, longer docs rather than many micro-docs. This helps keep navigation clean and provides confidence to the reader that everything they need to know about a topic is likely in 1 place.

The exception to this rule is for How To guides (/tracking/how-tos) or Integrations (tracking/integrations). We expect these docs to be read linearly and focused on accomplishing a certain task.

# Adding to Changelog (TODO)
The changelog lives in the changelogs/ directory.

# Maintainers
[Vijay](https://github.com/ranic), [Marissa](https://github.com/marissakuhrau), [Seams](https://github.com/ryanseams), [Mav](https://github.com/mavlee). Eventually we’ll expand this list, but keeping it tight for now.


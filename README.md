If you see something off with Mixpanel's [docs](https://docs-mixpanel.vercel.app) (typo, broken link, outdated content/screenshot) you can now contribute that fix yourself!

# Contributing Fixes
You’ll need a [GitHub account](https://github.com/signup). It’s free and takes 1 minute to create. Not sure what to make your handle? We recommend `yourfullname-mixpanel`. 

Once there, email `it.help@mixpanel.com` with your Github handle to give you a Github seat in Okta. You should get automatically added to the "Mixpanel Docs" Github team, which allows you to contribute to this repository.

To make an edit: 
* Go to the file you want to edit. The file hierarchy matches the hierarchy in our [docs](https://docs-mixpanel.vercel.app), starting at /pages/docs/
* Click the pencil icon to make edits to a file’s markdown. You can swap between code and preview to see what your edits look like.
* When you’re ready, hit “Commit” and follow the instructions to commit the changes to your branch and create a pull request review. Add a description if you like, keeping in mind that this is publicly accessible.
* GitHub will post a message in Mixpanel's internal Slack with a link to your review.
* One of the docs maintainers will review that request within 3 days and merge when approved (usually faster if it’s a small change).
* Once merged, changes will go live automatically, typically within 1-2 minutes.

# Testing Locally
This is a bit more advanced, but makes it much faster to test the impact of your changes (no waiting for the staging deployment):
* Clone the repo
* Install `npm`
* Run `npm run-script dev` -- this will start serving the docs at localhost:3000
* Make whatever changes you want locally, this should automatically reflect in your local instance of the docs. 

# Adding Images/GIFs
Upload images/GIFs to the public/ directory. You can make sub-directories within `public/` to namespace them (eg: `/public/tutorials/` for all tutorial-related images).

To reference an image, use a relative link to the image with the `public` stripped out. For example, if you have an image `public/example.png`, you can reference it as follows: `[insert alt text here](/example.png)`.

Images are hard to keep up-to-date, so please use them judiciously.

# Previewing Changes
All pull requests will generate a staging link in Vercel. Here's an [example](https://github.com/mixpanel/docs/pull/33#issuecomment-1520474996). This lets you preview your changes without changing what's actually live. 

# Adding new docs / changing structure
The navigation of the docs is defined based on the directory structure in this repo. The top-level structure (getting-started, tracking, analysis, admin, other-bits) should not change very often.

We have fewer, longer docs rather than many micro-docs. This helps keep navigation clean and provides confidence to the reader that everything they need to know about a topic is likely in 1 place.

The exception to this rule is for How To guides (/tracking/how-tos) or Integrations (tracking/integrations). We expect these docs to be read linearly and focused on accomplishing a certain task.

# Maintainers
[Vijay](https://github.com/ranic), [Marissa](https://github.com/marissakuhrau), [Seams](https://github.com/ryanseams), [Mav](https://github.com/mavlee). Eventually we’ll expand this list, but keeping it tight for now.


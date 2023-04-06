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

# Previewing Changes
(TODO) All pull requests will generate a staging link in ReadMe with a staged copy of your changes. This lets you preview your changes without changing what's actually live. 

# Adding new docs / changing structure
These types of changes are currently not possible purely in GitHub due to a limitation of the ReadMe <> GitHub integration. We expect this to be rare anyway and want to add a little friction to adding new docs to avoid clutter. 

If you think we need a new doc (e.g. because we’re shipping a new feature or adding a how to), create an issue in this repository and write up the goals of the new doc. Keep in mind that this is publicly accessible. We’ll discuss in Github and one of the doc maintainers will create the doc in ReadMe if we decide it’s necessary, or close the issue if it's not. Once it’s created, you can then make a pull request to write up the contents of the doc, going through the normal workflow as outlined in the “Contributing fixes” section. 

# Adding to Product Updates
Product Updates live in the changelogs/ directory. Each update is its own file.

The steps for creating a new changelog post are:
1. Go to the [ReadMe console](https://dash.readme.com)
2. Navigate to "Changelog" on the left side nav. 
3. Add a new post. 
4. Click ... > edit metadata and copy the slug of that post. 
5. Add a file in GitHub under the changelogs/ folder. Copy the metadata section from one of the prior changelog posts, but swap out the slug for the slug of the new post.
6. Follow the steps in "Contributing Fixes" to edit the post with the contents that you want. 

If you want to edit an existing changelog post, you only need to do Step 6. 

Note: due to a ReadMe limitation, there is no staging environment for changelogs, they all get pushed to the main version.




# Maintainers
[Vijay](https://github.com/ranic), [Marissa](https://github.com/marissakuhrau), [Seams](https://github.com/ryanseams), [Mav](https://github.com/mavlee). Eventually we’ll expand this list, but keeping it tight for now.


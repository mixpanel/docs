If you see something off with our docs (typo, broken link, outdated content/screenshot) you can now propose that change yourself!

Our live docs live [here](https://developer.mixpanel.com/v3.19). 

# Contributing Fixes
You’ll need a Github account. It’s free and takes 1 minute to create. Not sure what to make your handle? We recommend yourfullname-mixpanel. 

To make an edit: 
* Go to the file you want to edit. Our directory structure roughly matches the hierarchy in ReadMe.
* Click the pencil icon to make edits to a file’s markdown. You can swap between code and preview to see what your edits look like.
* When you’re ready, hit “Commit” and follow the instructions to commit the changes to your branch and create a pull request review. Add a description if you like, keeping in mind that this is publicly accessible. 
* Github will post a message in Slack with a link to your review.
* One of the docs maintainers will approve and merge that request within 1 day (usually faster if it’s a small change). 

Once a commit is merged to main, a Github Actions workflow will push the changes to ReadMe. Docs will
typically go live 1-2 minutes after the commit is merged to main. 

# Fixing Images
All images/gifs also live in Github under the media/ folder. Updating an image takes 2 steps:
1. Make a commit which uploads the new image or images to the media folder. 
2. Make the change to the doc to link to that new image. 

You should do both of these commits to the same branch, so that they can be reviewed and merged together. 

# Previewing Changes
(TODO) All pull requests will generate a staging link in ReadMe with a staged copy of your changes. This lets you preview your changes without changing what's actually live. 

# Adding new docs / changing structure
These types of changes are currently not possible purely in Github due to a limitation of the ReadMe <> Github integration. We expect this to be rare anyway and want to add a little friction to adding new docs to avoid clutter. 

If you think we need a new doc (eg: because we’re shipping a new feature or adding a how to), create an issue in this repository and write up the goals of the new doc. Keep in mind that this is publicly accessible. We’ll discuss in Github and one of the doc maintainers will create the doc in ReadMe if we decide it’s necessary or close the issue if it's not. Once it’s created, you can then make a pull request to write up the contents of the doc, going through the normal workflow as outlined in the “Contributing fixes” section. 

# Advanced: Adding to Product Updates
Product Updates live in the changelogs/ directory. Each update is its own file.

The steps for creating a new changelog post are:
1. Go to the [ReadMe console](https://dash.readme.com)
2. Navigate to "Changelog" on the left side nav. 
3. Add a new post. 
4. Click ... > edit metadata and copy the slug of that post. 
5. Add a file in Github under the changelogs/ folder. Copy the metadata section from one of the prior changelog posts, but swap out the slug for the slug of the new post.
6. Follow the steps in "Contributing Fixes" to edit the post with the contents that you want. 

If you want to edit an existing changelog post, you only need to do Step 6. 

Note: due to a ReadMe limitation, there is no staging environment for changelogs, they all get pushed to the main version.




# Maintainers
Vijay, Marissa, Seams, Mav. Eventually we’ll expand this list, but keeping it tight for now.


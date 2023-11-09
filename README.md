<div align="center">
	<img width="150" src="https://github.com/mixpanel/docs/assets/71290498/1f5dfccf-8ba8-481a-8faa-c6c297d7d4c6" alt="Mixpanel">
	<h1>Mixpanel's Official Documentation</h1>
	<p>
		<b><a href="https://docs.mixpanel.com/">docs.mixpanel.com</a></b>
	</p>
	<br>
	<br>
	<br>
</div>

If you see something off with Mixpanel's [docs](https://docs.mixpanel.com) (typo, broken link, outdated content/screenshot) you can contribute that fix yourself!

# Contributing Fixes
You’ll need a [GitHub account](https://github.com/signup). It’s free and takes 1 minute to create. Not sure what to make your handle? We recommend `yourfullname-mixpanel`.

To make an edit:
1. Go to the page in our documentation that you want to edit. On the right side, under the table of contents, you should see an "Edit This Page" link. That will take you to the file in Github that contains the contents of that doc.
2. Click the pencil icon to make edits to a file’s markdown. You can swap between code and preview to see what your edits look like.
3. When you’re ready, hit “Commit” and follow the instructions to commit the changes to your branch and create a pull request review. Add a description if you like, keeping in mind that this is publicly accessible.
    * If you're making multiple related changes, don't create a pull request right away. Continue making changes in the branch until you're ready to post all of the changes together in one PR
4. One of the docs maintainers will review that request within 3 days and merge when approved (usually faster if it’s a small change).
5. Once merged, changes will go live automatically, typically within 1-2 minutes.

# Testing Locally
This is a bit more advanced, but makes it much faster to test the impact of your changes (no waiting for the staging deployment):
1. Clone the repo
2. Install dependencies:
   ```sh
   npm ci
   ```
4. Run the following to start serving the docs at <http://localhost:3000>
   ```sh
   npm run dev
   ```
6. Make whatever changes you want locally, this should automatically reflect in your local instance of the docs.

# Adding Images/GIFs
Upload images/GIFs to the public/ directory. You can make sub-directories within `public/` to namespace them (eg: `/public/tutorials/` for all tutorial-related images).

To reference an image, use a relative link to the image with the `public` stripped out. For example, if you have an image `public/example.png`, you can reference it as follows: `[insert alt text here](/example.png)`.

If you're making a diagram, please add it to this [Figjam](https://www.figma.com/file/m4XseN6oAiu2yGN18qfamD/Docs-Toolkit?type=whiteboard&node-id=0-1&t=j3TBgane3MsYReF2-0). That way, if others want to make small tweaks, they can discover the original.

Images are hard to keep up-to-date, so please use them judiciously.

# Previewing Changes
All pull requests will generate a staging link in Vercel. Here's an [example](https://github.com/mixpanel/docs/pull/33#issuecomment-1520474996). This lets you preview your changes without changing what's actually live.

# Maintainers
[Vijay](https://github.com/ranic), [Marissa](https://github.com/marissakuhrau), [Mav](https://github.com/mavlee), [Isha](https://github.com/ishamehramixpanel). Eventually we’ll expand this list, but keeping it tight for now.

## Review Process
For simple content changes, the reviewer will merge the PR for expediency. For code changes, the original author will merge changes.


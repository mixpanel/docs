<div align="center">
	<img width="150" src="images/mixpanel-logo.svg" alt="Mixpanel">
	<h1>Mixpanel's Official Documentation</h1>
	<p>
		<b><a href="https://docs.mixpanel.com/">docs.mixpanel.com</a></b>
	</p>
	<br>
	<br>
	<br>
</div>

If you see something off with Mixpanel's [docs](https://docs.mixpanel.com) (typo, broken link, outdated content/screenshot) you can contribute that fix yourself!

# Contributing

Mixpanel internal members can edit the docs through a web editor using the Mintlify app. If you do not see the app in your Okta instance, request access by logging a ticket with IT.

To contribute via GitHub you’ll need a [GitHub account](https://github.com/signup). It’s free and takes 1 minute to create. Not sure what to make your handle? We recommend `yourfullname-mixpanel`.

To make an edit:

1. Find the page you want to edit in the repo.
2. Click the pencil icon to make edits to the page’s markdown. You can swap between code and preview to see what your edits look like.
3. When you’re ready, hit “Commit” and follow the instructions to commit the changes to your branch and create a pull request review. Add a description if you like, keeping in mind that this is publicly accessible.
   - If you're making multiple related changes, don't create a pull request right away. Continue making changes in the branch until you're ready to post all of the changes together in one PR
4. One of the docs maintainers will review that request and merge when approved (usually faster if it’s a small change).
5. Once merged, changes will go live automatically, typically within 1-2 minutes.

# Testing Locally

Install the [Mintlify CLI](https://www.npmjs.com/package/mintlify) to preview the documentation changes locally. To install, use the following command:

```
npm i -g mintlify
```

Run the following command at the root of your documentation (where docs.json is):

```
mintlify dev
```

#### Troubleshooting

- Mintlify dev isn't running - Run `mintlify install` it'll re-install dependencies.
- Page loads as a 404 - Make sure you are running in a folder with `docs.json`

# Style guide

Before you write or edit a page, read the [docs style guide](https://docs.mixpanel.com/docs/style-guide). It covers voice and tone, terminology, formatting, code samples, images, and video.

# Previewing Changes

Every pull request generates a staging link, which the Mintlify bot posts as a comment in the pull request. This lets you preview your changes without changing what's actually live.

You may also preview changes by [testing locally](#testing-locally)

# Maintainers

[Code owners](https://github.com/mixpanel/docs/blob/main/.github/CODEOWNERS)

# Review Process

For simple content changes, the reviewer will merge the PR for expediency. For code changes, the original author will merge changes.

# WORK FOR IMPACT
Work For Impact Demo Theme

# Table of contents:

- [Pre-reqs](#pre-reqs)
- [Getting started](#getting-started)

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [Shopify CLI 2.x](https://shopify.dev/themes/tools/cli)

# Getting started
- Clone the repository
```
git clone https://github.com/nguyenanh91/work-for-impact-coding-test
```
- Install dependencies
```
npm install
```
or 
```
yarn
```

- Run the project
```
npm run dev
```
or 
```
yarn dev
```

Finally, navigate to `http://127.0.0.1:9292` and you should see the template being served and rendered locally!

# Project Structure
The most obvious difference in a Shopify + SASS project is the folder structure.
In a Shopify theme project, shopify doesn't support external directories.
Sass (`.scss`) files live in `styles` folder and after compilation are output as CSS (`.css`) in the `assets` folder.

# Deploying themes
There are many ways to deploy a Shopify theme, and in this project we preferred to deploy using the Shopify CLI command

### Merge Shopify and Git
1. Create new branch from `main` branch and name it `shopify-live`.
2. Pull live code from Shopify using command `npm run pull:live`.
3. Merge branch `shopify-live` into `main` branch.
4. Merge current sprint branch into `main` branch.

### Production deploy
1. Make sure you are in the `main` branch, all included folders will be deployed.
2. Duplicate the `LIVE THEME` theme to `LIVE THEME [SPRINT-*Previous Sprint]`.
3. Run command in terminal `shopify theme push`.
4. Choose `LIVE THEME`. 
5. Grab a cup of coffee - You'll see everything getting deployed in the output window. 
6. Done!

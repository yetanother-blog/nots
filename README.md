# 📝 nots

## 🤓 Development

### Prerequisites

- [Node.js v20](https://nodejs.org/en)
- [Docker Desktop](https://docs.docker.com/desktop/)

### App

To work on the Remix app, please follow the steps: 

1. Get the code: 
```sh
$ git clone git@github.com:yetanother-blog/nots.git
```
2. Install dependencies: 
```sh
$ npm install
```
3. Start docker compose to run a local Postgres database:
```sh
npm run docker:up
```
4. Migrate database:
```sh
$ npx drizzle-kit migrate
```
5. Start Remix dev server:
```sh
$ npm run dev
```

Go to http://localhost:5173/.

### Storybook

We use [Storybook](https://storybook.js.org/) to develop UI components. All UI components live in `~/app/ui`. To start Storybook, just run `npm run storybook` and go to http://localhost:6006/.

## 📦 Deployments

Every merge on `main` triggers a [deployment pipeline](https://github.com/yetanother-blog/nots/actions/workflows/cd.yml). The pipeline runs some checks and deploys the Remix app and Storybook. We have the following deployed instances:

| Name          | URL                                  |
| ------------- | ------------------------------------ |
| App (staging) | https://nots-app-staging.vercel.app/ |
| App (prod)    | https://nots-app-prod.vercel.app/    |
| UI (prod)     | https://nots-ui-prod.vercel.app/     |

In addition, every authorized pull request deploys a preview deployment of Storybook. You can find the link to the preview in the pull request. 

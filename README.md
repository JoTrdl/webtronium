# Webtronium

## Live demo
Go to [https://webtronium.herokuapp.com](https://webtronium.herokuapp.com) to see it live.

## Intro

Webtronium is a boilerplate built with performance first in mind. It is not like others framework/boilerplate where the server is only used to do the SSR.
Webtronium goal is trying to leverage both the client and the server:
- The server is used at the main source of truth: it is responsible to handle the app routing, SEO and SSR.
- The client renders the data received from the server and handle all the UI interactions with the user.

What does this simply mean? -> No routing on client = simpler code, smaller bundle app size and better SEO optimizations.
From the team management point of view, it is also simpler and cleaner to split the work.

## Main features
- Koa as the server (can be switched to express if needed)
- React/Redux (can be switched to whatever is more performant: Inferno.js, Preact, Vue.js, Marko.js, ...)
- PostCSS/CSSNext with CSS Modules

## Setup

### Installation
```bash
yarn install
```

### Running the Dev Server
```bash
yarn run dev
```
The application will be running by default at [http://localhost:8080](http://localhost:8080).

### Building and Running the Production Server
```bash
yarn run build
yarn start
```

The application will be running at [http://0.0.0.0](http://0.0.0.0).

## License
MIT. Copyright (c) 2017 Johann Troendle

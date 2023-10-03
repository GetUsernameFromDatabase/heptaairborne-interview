# HeptaAirborne Technical Interview Frontend <!-- omit in toc -->

The project uses [jonluca/vite-typescript-ssr-react](https://github.com/jonluca/vite-typescript-ssr-react) as the base.

Table of contents:

- [Introduction](#introduction)
  - [Loading new images](#loading-new-images)
  - [Swagger](#swagger)
- [Asset sources](#asset-sources)
- [Setup](#setup)
- [Run Locally](#run-locally)
- [Run In Production](#run-in-production)
- [Vite Typescript React 18 SSR](#vite-typescript-react-18-ssr)
  - [Development](#development)
  - [Building](#building)
  - [Files](#files)
  - [CI](#ci)

## Introduction

Just a simple webpage with two columns:

- left column which holds all images
- right column which shows a map of estonia using [leaflet](https://leafletjs.com/)

Server Side Rendering is supported.

### Loading new images

Images can be loaded by:

- scrolling down (infinite scrolling)

### Swagger

Files under [swagger](./src/swagger/) are generated using [Swagger Editor's](https://editor-next.swagger.io/) generate client feature (`typescript-axios`).\
This provides an easy way to communicate with the backend.
> Content was generated using [backend/docs/api-docs.json](../backend/docs/api-docs.json)

## Asset sources

Sources where I got my assets from:

- Favicon generated with <https://favicon.io/>
- Leaflet images taken from [node_modules/leaflet/dist/images](node_modules/leaflet/dist/images)
  - Needed for production with SSR
- Loading icon <https://icons8.com/preloaders/>

## Setup

Install dependencies

```bash
yarn install
```

## Run Locally

Start in server mode (SSR)

```bash
yarn dev:server
```

If you'd like to just develop the UI, you can use

```bash
yarn dev:client
```

## Run In Production

For production run

```bash
yarn serve
```

Make sure to supply environment variables:

- **VITE_API_HOST** -- `VITE_API_HOST=backend`
- **VITE_API_PORT** -- `VITE_API_PORT=8080`

## Vite Typescript React 18 SSR

[![Node CI](https://github.com/jonluca/vite-typescript-ssr-react/actions/workflows/nodejs.yml/badge.svg)](https://github.com/jonluca/vite-typescript-ssr-react/actions/workflows/nodejs.yml)

A _blazingly_ modern web development stack. This template repo tries to achieve the minimum viable example for each of the following:

![video](video.gif)

- [React 18](https://reactjs.org/blog/2022/03/29/react-v18.html)
- [Typescript 4.9](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/)
- [Vite with Vite SSR](https://vitejs.dev/guide/ssr.html)
- [GitHub Actions](https://github.com/features/actions)
- [Tailwind CSS](https://tailwindui.com/)
- [Prettier](https://prettier.io/) & [ESLint](https://eslint.org/)

### Development

```bash
yarn
yarn dev:server
```

That should start the server. It will open to <http://localhost:7456>.

If you'd like to just develop the UI, you can use

```bash
yarn
yarn dev:client
```

To start the native vite client.

### Building

```bash
yarn build
yarn serve
```

yarn build will create the assets in `dist` - a `client` and `server` folder. Serve will run `dist/server.js` with Node, but feel free to change this to use Docker or some other process manager to suit your deployment needs.

### Files

`eslintrc.js` - a barebones eslint configuration for 2021, that extends off of the recommended ESLint config and prettier

`.prettierrc.js` - the prettier config

`index.html` - the vite entrypoint, that includes the entry point for the client

`postcss.config.cjs` - CommonJS module that defines the PostCSS config

`server.ts` - The barebones Express server with logic for SSRing Vite pages

`tailwind.config.cjs` - CommonJS module that defines the Tailwind config

`tsconfig.json` - TypeScript configuration

`vite.config.ts` - Vite configuration

### CI

We use GitHub actions to build the app. The badge is at the top of the repo. Currently it just confirms that everything builds properly.

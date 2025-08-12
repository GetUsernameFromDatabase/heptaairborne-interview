# HeptaAirborne Technical Interview Frontend <!-- omit in toc -->

The uses [jonluca/vite-typescript-ssr-react](https://github.com/jonluca/vite-typescript-ssr-react) as the template.
> makes it faster to setup as it was important to get this working under a week

Table of contents:

- [Introduction](#introduction)
  - [Image column](#image-column)
  - [Swagger](#swagger)
- [Asset sources](#asset-sources)
- [Setup](#setup)
- [Run Locally](#run-locally)
- [Run In Production](#run-in-production)

## Introduction

Just a simple webpage with two columns:

- left column which holds all images
- right column which shows a map of estonia using [leaflet](https://leafletjs.com/)

Server Side Rendering is supported.

### Image column

Images can be loaded by:

- scrolling down (infinite scrolling)
- _there was plan to add purely paginated loading as well with switching page size and the user could toggle between infinite scrolling and that -- discarded_

The maximum sized image can be viewed by clicking on the image in the left column.

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

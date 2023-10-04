# HeptaAirborne Technical Interview <!-- omit in toc -->

- [Introduction](#introduction)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Setup](#setup)

## Introduction

Main objectives are:

1. Instantaneous feel – time to wait for anything to load (as perceived by the user) should be minimized, UI shouldn’t jump when results are loaded, the content should be loaded quickly even if it’s of lower quality at first etc.

2. 60 fps scrolling – the UI should remain responsive even when looking at hundreds of thousands of images

3. Rapid browsing – UI should enable quick and responsive browsing in both ways, i.e. if the user opens the page in the middle of the grid, the UI should respond quickly when scrolling up or down

4. Image loading trigger - add an UI element that will trigger loading of the images to the grid (button, clicking on the left column, etc.). So, the user could load new images by clicking on that element instead of reloading the page.

> [the exercise](Hepta-Software_Engineer_Technical_Exercise[629].pdf)

### Backend

> [backend readme](./backend/README.md)

### Frontend

> [frontend readme](./frontend/README.md)

## Setup

Copy [db.env.example](db.env.example) to `db.env`.

These are the environment variables used by the database.

```bash
cp db.env.example db.env
```

```bash
docker compose up --build
```

---

For running locally see the respective README files under [backend](./backend/) and [frontend](./frontend/).

Backend development profile uses [h2](http://h2database.com/html/main.html) database
so postgres installation is not needed.

> Docker files can be used as a guide on what needs to be done

# Bitcoin Price Tracker

## Description

Bitcoin Price Tracker is a web application developed using the Nuxt.js framework. It's designed to track and visualize historical Bitcoin price data. Users can select a time period for data display (day, week, month, year, or a custom range) and view price change graphs.

## Features

* View historical Bitcoin price data.

* Select time periods for data display (day, week, month, year, custom).

* Visualize data in graph format.

## Technologies

* **Frontend/Backend**: Nuxt.js
* **Database**: PostgreSQL
* **Data Collection Service**: Service in python, fetching data from an API.

## Run with Docker Compose

```bash
docker-compose up
```
This command will build and run all necessary containers, including the database and backend.

## Usage

After starting the project, the web interface will be accessible at `http://localhost:3000`.

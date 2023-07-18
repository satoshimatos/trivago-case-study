# trivago-case-study

Repository for a case study I got from Trivago

## Description

This is a test case project for Trivago's hiring process.
I decided to learn a new language and framework for this so I went with NodeJS and NodeJS Express instead of php and Mezzio/Laravel, which is what I'm most experienced with, so not everything will be perfect.

While it was challenging I'm happy with the result and even more so for managing to learn new technologies in a short time.

## Technologies Used

- Node.js
- Express.js
- TypeORM
- PostgreSQL
- OpenAPI (documentation)
- Docker/Docker-compose

## Requirements

- Git
- Docker / docker-compose

## Installation Instructions

Follow these steps to set up and run the project on your local machine:

1. Clone the repository to your local machine:

```bash
git clone git@github.com:satoshimatos/trivago-case-study.git
```
2. Change into the project's root directory (where the Dockerfile and docker-compose.yml files are).

3. Run docker-compose to build and up the images and containers:
```
docker-compose up --build
```
4. The app will be available at http://localhost:3333

5. The endpoints can be found at `docs/openapi.yaml`

## Personal Note

- Because I decided to learn NodeJS and Express for this project, some of what I did could have been done in much better ways. Also, I had never used redis before and setting up docker on my Windows 10 PC wasn't exactly pleasing. With all that said, despite facing some difficulties, it was a great challenge and I definitely learned a lot from it. Regardless of the outcome, I already feel like a winner.
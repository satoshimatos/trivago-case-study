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
2. Change into the project root directory and create a `.env` file:
```
DB_HOST='db'
DB_NAME='postgres'
DB_USER='dockeruser'
DB_PASSWORD='dockerpassword'
```
The step above may be skipped because I decided it would be easier to just add these throwaway credentials to the Dockerfile. If it were really sensitive information, such as production credentials, I would take them out of the Dockerfile and require the use of the ``.env` file.

3. Run docker-compose:
```
docker-compose up --build
```
4. The app will be available at http://localhost:3333
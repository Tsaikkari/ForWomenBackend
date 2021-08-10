<h3 align="center">Lady</h3>

## About The Project

The application will provide women tools for improving themselves and their life quality by multiple features such as monitoring weight, fitness, days for increasing the chances of getting pregnant - or avoid getting pregnant, depending on the case -, time management, inspirational quotes and wisdoms of life to start the day on the right foot and provide encouragement, and more.

### Tech Stacks

1. FrontEnd

   - [React](https://reactjs.org)
   - [Redux](https://react-redux.js.org/)
   - [React Bootstrap](https://semantic-ui.com/)
   - [Typescript](https://www.typescriptlang.org/)
   - [DevExtreme React](https://github.com/DevExpress/devextreme)

2. BackEnd
   - [Express](https://expressjs.com/)
   - [Validatorjs](https://www.npmjs.com/package/validatorjs)
   - [Postgres](https://www.postgresql.org/)
   - [Passport](https://www.npmjs.com/package/passport)
   - [Bcrypt](https://www.npmjs.com/package/bcrypt)
   - [JWT](https://jwt.io/)
3. Testing
   - [Jest](https://jestjs.io/)
4. Deployment

   - [AWS](https://aws.amazon.com/)
   - [Docker](https://www.docker.com)

   <!-- GETTING STARTED -->

## Getting Started

This section will give you the instruction about setting up this project locally.

### Prerequisites

These are the lists of tools that you need to run the project.

- [npm](https://www.npmjs.com/)
- [Nodejs](https://nodejs.org/en/)
- [Docker](https://docker.com)

### Installation of Repo

1. Clone the repo

```sh
git clone git@github.com:Tsaikkari/ForWomenBackend.git
```

2. Install dependencies:

```sh
npm install
```

3. For Mac and Linux user, give the permission to execute `db.sh` file. The script will run a postgres container as the app's database

```sh
chmod -x db.sh;
```

4. Create a `.env` file in the root directory and include the following varables:

```sh
PORT=5000
DB_PASSWORD=forWomen
JWT_SECRET = ashdjgksdkfjdf
SESSION_SECRET = fhjhfjkshsdjkfklskdr
```

6. Finally, start the app:

```sh
npm start
```

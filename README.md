# Microservice starter in NodeJS & Typescript

This is a Serverless (micro)service starter to kickstart your Express / Typescript project.

To learn how to set up a Serverless project, take a look at the [tutorial]() I wrote on Medium.
The rest of the project is inspired by the [TypeScript-Node-Starter](https://github.com/Microsoft/TypeScript-Node-Starter) by Microsoft.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to have the following installed:

- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/download-center#community)
- NPM package manager. To install / update run the following command:
```
$ npm install npm@latest -g
```
- NPM packages: TypeScript and Serverless
```
$ npm i -g typescript serverless
```

### Running the project for the first time

Get a development environment up & running.

- Clone the repository
```
$ git clone https://github.com/danielleklaasen/microservice-starter
```

- Install the node dependencies.

```
$ cd microservice-starter
$ npm i
```

- Configure Serverless with your own AWS account. You can find instruction on how to make an account [here]().

```
$ serverless config credentials --provider aws --key ACCESS-KEY-ID --secret SECRET-ACCESS-KEY
```

- Configure MongoDB

Add your personal url in the .env file.

- Build and run the project

```
$ npm run build
```

```
$ npm run start
```

Go to http://localhost:3000 and, if everything went right, you will now see the working project! :)

## Deployment

```
$ npm run deploy
```

## Built With

* [Serverless](http://www.dropwizard.io/1.0.2/docs/) - The Serverless Application framework
* [Express](https://github.com/expressjs/express) - Web framework for Node
* [TypeScript](https://maven.apache.org/) - TypeScript
* [MongoDB](https://rometools.github.io/rome/) - Database

## Authors

* **Danielle Klaasen** - *Initial work* - [Danielle Klaasen](https://www.danielleklaasen.com)

See also the list of [contributors](https://github.com/danielleklaasen/microservice-starter/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [ILUMY](http://www.ilumy.com) For giving me the opportunity to work on this project.
* [TypeScript-Node-Starter](https://github.com/Microsoft/TypeScript-Node-Starter#typescript-node-starter) As an inspiration for this starter kit
* [Adnan Rahić](https://hackernoon.com/@adnanrahic) For his tutorial series on Serverless development

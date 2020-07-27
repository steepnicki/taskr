# taskr

Taskr is a simple, tasks based CLI. Taskr can be used as a generic worker/helper script for NodeJS based projects. Designed for personal use.

## Installation

Install like a standard node module via yarn/npm. Make sure to install globally as well as locally. Global installation will enable you to use `taskr` command directly from the terminal.

```bash
yarn global add taskr
yarn add taskr

npm install taskr -g
npm install taskr
```

Make sure to create `taskr/tasks` folders in the root directory of your project. taskr will look for tasks in the `taskr/tasks/` folder.

## Usage

If installed globally, you will be able to use `taskr` command directly from your terminal.

```bash
taskr help
taskr -h

taskr run helloWorld # runs built-in example task
taskr run taskName # runs the task called taskName
```

In order to create new taskr compatible task, create a new `*.js` file under the `taskr/tasks/` dir. The file name will later be used as a part of the `taskr run` command. Make sure your task file follows the template from the example located below.

`testTask.js`
```
const task = (resourceLocator, cb) => {
  const { logger } = resourceLocator
  logger.info('Hello world!')
  logger.warn('Example of warn log.')
  logger.info('This is an example of taskr compatible task :)')
  cb(null)
}

module.exports = task
```

After creating your new task, run the following command.

```
taskr run testTask
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://github.com/steepnicki/taskr/blob/master/LICENSE)


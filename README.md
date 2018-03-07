# Inviting Customers

This is a CLI application developed using Node.js to filter users within a certain range of a geographical coordinates and display after reading details from a text file user details.

## Prerequisites

1. NPM
2. NodeJs.

### Installing

Run following command to install all required dependencies.
  
`npm install`

## Execution

Executable file is placed in below path

`bin/entry`

Don't forget to assign execute permission to file. To do so, execute following command:-

`chmod u+x bin/entry`

For windows, you can run "index.js" using below command.

`node index.js`

## CLI

For help, run following command:-

`bin/entry -help`

Application requires file path as a parameter:-

`bin/entry -p <file path>`

OR

`bin/entry --path <file path>`

## Configuration

Configurations, such as, range, source coordinates can be modified in file at below path

`config/config.js`

## Tests

For running tests, install "mocha" as a global dependency.

`npm install mocha -g`

Then, run tests using below command

`mocha test/test.js`

OR

`npm run test`

Console tests are performed using mocha and others are performed without using any external library.


Hope you like it !!!

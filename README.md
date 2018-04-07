# Angular-headless-ci
Angular cli test and e2e in headless context (gitlab runner for ex.) - include openJdk for sonar and Chrome latest.
Commands runs :
  - a rebuild for node-sass for the running env.
  - a prod build of your app
  - ng test for unit tests
  - ng e2e for end to end tests

# Start
We start from the principle that you have a root folder with Dockerfile and scripts and angular application in an `app` folder.
Your tests must be in `app/src/app/tests/` and `e2e` folder for End to End tests, `unit` folder for unitary tests.

Adapt that as you want ;)

# Required
You must add `"puppeteer": "0.10.2"` to the `devDependencies` of your angular project, because we use it for Karma.
Use our protractor and karma config files.

Add tests commands to `package.json`
```
"build": "node_modules/@angular/cli/bin/ng build --prod --progress=false",
"test:ng-e2e": "node_modules/@angular/cli/bin/ng e2e",
"test:ng-test": "node_modules/@angular/cli/bin/ng test --watch false --progress false --code-coverage",
"test": "npm rebuild node-sass && npm run build && npm run test:ng-test && npm run test:ng-e2e"
```

Locally, you can use `npm run test` as usual.

# Usage
Just start a DockerFile on your project with a script (it's better) to run your tests.

```
FROM bluja/angular-headless-ci:latest

ADD ./ /usr/src/

WORKDIR /usr/src/

ENTRYPOINT ["./project_scripts/testApp.sh"]

```

And a `project_scripts/testApp.sh`, $RET is used to get the exit code from container :

```
#!/bin/bash
false
RET=$?

pushd app
    npm install

    npm run test

    RET=$?
popd

exit $RET

```

# Angular-headless-ci
Angular cli test and e2e in headless context (gitlab runner for ex.) - include openJdk for sonar and Chrome latest

# Start
We start from the principle that you have a root folder with Dockerfile and scripts and angular application in an `app` folder.
Your tests must be in `app/src/app/tests/` and `e2e` folder for End to End tests, `unit` folder for unitary tests.

Adapt that as you want ;)

# Required
You must add `"jasmine-reporters": "latest"` to the `devDependencies` of your angular project.
Use our protractor and karma config files.

Add tests commands to `package.json`
```
		"test": "npm rebuild node-sass && npm run build && npm run test:unit && npm run test:functionnal",
    "test:functionnal": "node_modules/@angular/cli/bin/ng e2e",
		"test:unit": "node_modules/@angular/cli/bin/ng test --watch false --progress false --code-coverage"
```

# Usage
Just start a DockerFile on your projet with a script (it's better) to run your test.

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
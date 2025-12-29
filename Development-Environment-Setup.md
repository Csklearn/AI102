## Prerequisites

* **Admin rights**

  When you received your machine, you should have been granted admin rights in order to run CLI commands and install software needed for development. If you do not have admin rights, please submit a request via the [FM Support Portal - Ivanti](https://fmglobal-it-amc.ivanticloud.com/Modules/SelfService/#serviceCatalog/request/190944E052BE4CF5B7D9BA3BD4EBD8B8).

* **[Git](https://git-scm.com)**

  Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

* **[Homebrew](https://brew.sh) (Linux / MacOS only)**

  RDS is used by many different applications with different requirements. Homebrew is allows managing installations of common development tools such as Git, Node, and NVM more easily. This is especially useful if needing to install and use more than one version of those tools for the different projects.

* **[JFrog Artifactory](https://fmartifactory.jfrog.io/ui) authentication**

  From your terminal, run the following command and follow any corresponding instructions:
  ```bash
  npm login --registry=https://fmartifactory.jfrog.io/artifactory/api/npm/npm/ --auth-type=web
  ```

* **[NodeJS](https://nodejs.org/en/download/current)**

  RDS supports using node version >= 20.19.5 <= 25.x.

* **[Node Version Manager](https://github.com/nvm-sh/nvm)**

  In order to work within multiple projects, it may be necessary to change your node version. This tool allows for the installation of multiple Node versions and the ability to easily switch between them.

* **[VS Code](https://code.visualstudio.com) (recommended)**

  While it is not mandatory to use the VS Code IDE, it is recommended to gain access to the shared extensions and CoPilot AI assistance RDS and the FM organization provides. If using another IDE some of these utilities may be unavailable and could lead to inconsistent coding patterns. Just as RDS helps other applications look and feel consistent, the RDS library itself is built with a similar consistency and organization. If conflicting patterns are found during the pull request process, work may be delayed until those patterns are ironed out.

* **Yarn**

  RDS uses [classic yarn](https://classic.yarnpkg.com/lang/en/docs/install). To install run the following command from a terminal:
  ```bash
  npm install --global yarn
  ```

## Mono-repo setup

1. Clone the [rds-core](https://dev.azure.com/fmglobal/DCE/_git/rds-core) repository using HTTPS.

2. If using VS Code, please check out the [recommended rds-core extensions](https://dev.azure.com/fmglobal/DCE/_git/rds-core?path=/.vscode/extensions.json). These are optional, but may help call out issues prior to pushing code for review.

3. Run `yarn` to install project dependencies.

4. Build the packages
   ```bash
   yarn build-packages
   ```

5. Watch for changes (optional)
   ```bash
   yarn build:watch
   ```

7. Run tests (pass `--watch` with test command to re-run tests after making code changes)
   ```bash
   yarn test rds-components --e2e --runInBand --verbose --coverage
   ```

## React sandbox

The React sandbox is used to debug and ensure RDS components work as intended in a React framework.

```bash
yarn start rds-host --open --devRemotes=rds-react-sandbox
```

## Storybook

Run and explore the Storybook documentation locally to become familiar with the current components and documentation.<span style="color:red;">&dagger;</span>

```bash
yarn serve-storybook
```

<sub><span style="color:red;">&dagger; Before running Storybook make sure the test coverage has been created because it relies on the report in one of the pages.</span></sub>

## Troubleshooting

* Coverage reports are not generating as expected: Run `nx reset` to ensure the nx cache is cleared has this has been known to prevent generating accurate / up-to-date coverage reports.

* Failing to install: Ensure the correct versions of node and yarn are being used and clear cache such as `node_modules` because it can get corrupted with changes in dependencies over time (this issue sometimes occurs when switching between branches a lot due to possible dependency differences).
# What is Codelab.ai

Codelab.ai is a web application builder consisting of a data modeling tool and a view binding layer. It was the only available domain extension left & has nothing to do with Artifical Intelligence, but is a likely addition in the future.

- Create models with fields & configure their relationships using a D3.js graph interface.
- Build the UI by editing the DOM Tree & configuring the components

# Built With

### Build

- [NX](https://nx.dev/react)
  - NX is a CLI toolkit for Monorepo development, similar to Angular CLI but framework agnostic
  - It scaffolds packages & provide us with a unified API for interacting with our libraries

### Frontend

- [React](https://reactjs.org)
  - A JavasScript library for building user interfaces, although we only use `.tsx`
- [Next.js](https://nextjs.org)
  - A React Framework for server-side rendering (SSR) & other performance optimizations

### Backend

- [Mongoose]()
- [Nest.js](https://nestjs.com)
  - A Node.js framework suitable for micro-services architecture, which heavily uses OOP principles such as dependency injection (DI)

### UI

- [Storybook](https://storybook.js.org)
  - A tool for developing UI components in isolation
- [Ant Design](https://ant.design)
  - A UI/Component library for React

### Testing

- [Jest](https://jestjs.io)
  - JavaScript testing framework
- [Cypress](https://www.cypress.io)
  - E2e testing framework

# Getting Started

1. Install [NX Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console), you will use the interface to run the application
2. Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), for realtime visual linting

The project directory structure is based on NX, with `apps` directory containing all the user facing sites, while `libs` containing all imported libraries.

3. `cp .env.example .env.dev`
4. `yarn`
5. NX Console tab -> `Serve` -> `[your-app]`

or `Test` for running Jest. For entire list of commands, select `Run`.

# CI/CD pipeline

To commit code, run `yarn commit`. This will trigger the git `pre-commit` hook via [Husky](https://github.com/typicode/husky), which then uses [Lint Staged](https://github.com/okonet/lint-staged) to run [ESLint](https://github.com/eslint/eslint) on staged files. ESLint will use [Prettier](https://github.com/prettier/prettier) to format files.

[Commitizen](https://github.com/commitizen/cz-cli) will also show a terminal prompt for constructing the proper commit message format.

Once pushed to the remote repository, create a Pull Request on Github. Once all the unit tests run successfully, the PR will then be reviewed by the administrator.

You can run `yarn test` locally to make sure your changes haven't broken any tests.

# Site Documentation

For a more detailed documentation, go to the [Documentation Site](https://docs.codelab.ai)

# ServeReedley

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## For AI agents

Agents: start with [AGENTS.md](AGENTS.md). Full context and workflows are in `docs/` (tool-agnostic). See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for project overview, build/test commands, and conventions; see [docs/workflows/](docs/workflows/) for step-by-step workflows (e.g. update GraphQL model, change a Lambda).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `dist/` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Adding a New Coordinator

1. Add a Cognito User

	1. Select "Send an email invitation"
	1. Add email address
	1. Mark as verified
	1. Set a temporary password

1. Add user as a verified identity in Amazon SES

	1. Can only be completed AFTER user follows the login link.
	1. Create an identity for the email address

1. Open the Secrets Manager

	1. Select request-email-info
	1. Retrive the secret value
	1. Edit it to add the new email address

## Updating the graphql model

1. Pull the latest using `amplify pull`
1. Edit amplify\backend\api\crn\schema.graphql
1. Update the api by using `amplify push`
	1. Select yes to update the Code and graphql queries
1. Update code to use the new model, test all components that interact with the model
	1. Be careful of adding data during testing that the published frontend does not yet support
1. Commit the updated frontend code and push to github to trigger a new frontend build in amplify

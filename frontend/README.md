# How to run !!!

1. Init the frontend  (do this only one time)  
2.1 Go inside `frontend` directory.  
2.1 Run `yarn install`, to install all deps.  

2. Deploy the contract  
2.1 Go inside `chain` directory.  
2.2 Ensure that this file exists `chain/address.json` , with this content `{}`.  
2.2 In a shell, run a local blockchain, i've used `npx ganache --wallet.accountKeysPath ./ganache.accounts.json`.  This will save accounts <address/private_key> to a file.  
2.3 In other shell, deploy the smart contract, i've used `npx hardhat run --network localhost scripts/deploy.ts`.  
2.4 This will deploy the contract to the ganache localhost chain and write the address to file.  

3. Import contract ABI and Address into frontend  
2.1 Go inside `frontend` directory.  
3.1 Run `yarn run contracts:import`.

4. Run the frontend  
Run `yarn start`  

The rest of the README comes from Create-React-App.

*tresorama*

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

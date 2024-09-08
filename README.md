# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses TypeScript for type-checking.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## API Endpoints

This application uses the following APIs to fetch data and create dashboards:

- **Worldwide COVID-19 cases data:** [https://disease.sh/v3/covid-19/all](https://disease.sh/v3/covid-19/all)
- **Country-specific COVID-19 cases data:** [https://disease.sh/v3/covid-19/countries](https://disease.sh/v3/covid-19/countries)
- **Graph data for cases with date:** [https://disease.sh/v3/covid-19/historical/all?lastdays=all](https://disease.sh/v3/covid-19/historical/all?lastdays=all)

### Implement API Calls

- **Use React Query:** 
  - Utilize React Query to handle fetching and managing data from the provided API endpoints.
  - Set up queries to fetch data and handle responses accordingly.
  - Learn more in the [React Query documentation](https://react-query.tanstack.com/).

## Build and Deploy

1. **Build the App:**
   - Create a production build of your app by running:
     ```bash
     npm run build
     ```
   See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

2. **Deploy:**
   - Deploy the contents of the `build` folder to your chosen hosting provider.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Thank you for using this project. Happy coding!
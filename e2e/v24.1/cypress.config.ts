import { defineConfig } from 'cypress';
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
import fs from 'fs';
let credentials = '';

export default defineConfig({
	e2e: {
		viewportHeight: 1000,
		viewportWidth: 1500,
		projectId: 't3gyr5',
		video: false,
		screenshotOnRunFailure: true,
		numTestsKeptInMemory: 0,
		//baseUrl: 'https://apps-test.itwo40.eu/itwo40/sub6.4/client/#',
		baseUrl: 'https://apps-test.itwo40.eu/itwo40/sub24.1/client/#',


		setupNodeEvents(on, config) {
			on('before:browser:launch', (browser, launchOptions) => {
				if (browser.isHeadless || browser.isHeaded) {
					launchOptions.args.push('--incognito');
				}
				return launchOptions;
			}),
				// Global getter and setter task
				on('task', {
					setUser: (cred: any) => {
						return (credentials = cred);
					},
					getUser: () => {
						return credentials;
					},
				}),

			on('after:run', (results: any) => {

				const failedTests = results.totalFailed;

				const passedTests = results.totalTests - results.totalFailed;

				const passedPercentage = (passedTests / results.totalTests) * 100;

				const outputData = {
					passedTests,
					failedTests,
					passedPercentage,
				};
				fs.writeFileSync(`./${process.env.MODULE}.json`, JSON.stringify(outputData, null, 2));
			});

			//For allure report
			allureWriter(on, config);
			return config;
		},
		// To show all the independent test file in all modules
		specPattern: 'cypress/scenarios/**/*.cy.{js,jsx,ts,tsx}',
		supportFile: 'cypress/commands/e2e.{js,jsx,ts,tsx}',
		experimentalRunAllSpecs: true,
		chromeWebSecurity: false,
		fixturesFolder: 'cypress/test-data',
		testIsolation: false,
		defaultCommandTimeout: 20000,
		/* 
    "reporter": "junit",
    "reporterOptions": {
       "mochaFile": "tests/test-output-[hash].xml",
       "toConsole": true,
       "attachments": true
    } */
	},
});

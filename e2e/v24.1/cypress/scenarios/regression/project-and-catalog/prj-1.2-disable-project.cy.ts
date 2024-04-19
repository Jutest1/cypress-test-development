import { _common, _projectPage, _validate } from "cypress/pages";

import { app, tile, cnt, btn, commonLocators, sidebar } from 'cypress/locators';
import _ from 'cypress/types/lodash';
import cypress from 'cypress';
import { DataCells } from "cypress/pages/interfaces";
import { data } from "cypress/types/jquery";
const allure = Cypress.Allure.reporter.getInterface();
let PRJ_NO = 'PRC' + Cypress._.random(0, 999);
let PRJ_NAME = 'TEST-PRJ-' + Cypress._.random(0, 9999);
let CLERK_NAME = 'HS';

allure.epic('PROJECT AND CATALOG');
allure.feature('Project');
allure.story('PRJ- 1.2 | Disable Project');

describe('PRJ- 1.2 | Disable Project', () => {
	

	before(function () {
			const CREATEPROJECT_PARAMETERS: DataCells = {
				[commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
				[ commonLocators.CommonLabels.NAME] :PRJ_NAME,
				[ commonLocators.CommonLabels.CLERK] :CLERK_NAME
				
			  };
			  cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
			/* Open desktop should be called in before block */
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
			});
			_common.create_newRecord(cnt.uuid.PROJECTS);
			_projectPage.enterRecord_toCreateProject(CREATEPROJECT_PARAMETERS);
			cy.SAVE();
			_common.waitForLoaderToDisappear()
			cy.SAVE();
			_common.waitForLoaderToDisappear()
	});
	after(() => {
		cy.LOGOUT();
	});
	it('TC - Disabling Project', function () {
		_common.openTab(app.TabBar.PROJECT).then(() => {
		_common.setDefaultView(app.TabBar.PROJECT);
		_common.waitForLoaderToDisappear()
		_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		})
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.DISABLE_PROJECT);
		_common.clickOn_modalFooterButton(btn.ButtonText.OK);
		cy.SAVE();
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Verify the disabled project', function () {
		_common.openTab(app.TabBar.PROJECT).then(() => {
		_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_validate.verify_isRecordDeleted(cnt.uuid.PROJECTS, PRJ_NO);
	});
});

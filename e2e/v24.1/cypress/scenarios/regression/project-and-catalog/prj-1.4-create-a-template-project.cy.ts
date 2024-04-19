
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _bidPage, _saleContractPage, _projectPage } from "cypress/pages";
import { app, tile, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM, EST_HEADER } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"


let CREATEPROJECT_PARAMETERS

ALLURE.epic("PROJECT AND CATALOG");
ALLURE.feature("Project");
ALLURE.story('PRJ- 1.4 | Create a template Project');

describe("PRJ- 1.4 | Create a template Project", () => {

    before(function () {

       CREATEPROJECT_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NAME,
        [ commonLocators.CommonLabels.NAME] :PRJ_NAME,
        [ commonLocators.CommonLabels.CLERK] :CLERK_NAME 
        };
      cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(CREATEPROJECT_PARAMETERS);  
             cy.SAVE()
             _common.waitForLoaderToDisappear()
     });       
	      after(() => {
		  cy.LOGOUT();
	   });
    
	   it('TC- Creating template Project', function () {
		_common.openTab(app.TabBar.PROJECT).then(() => {
		_common.setDefaultView(app.TabBar.PROJECT);
		_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PRJ_NAME).pinnedItem(); 
		_common.waitForLoaderToDisappear() 
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.MAKE_TEMPLATE_PROJECT);
	    _common.waitForLoaderToDisappear() 
		_validate.validate_Text_message_In_PopUp("Project is made a template project");
		_common.clickOn_modalFooterButton(btn.ButtonText.OK);
		cy.SAVE();
		_common.waitForLoaderToDisappear() 
	});

});
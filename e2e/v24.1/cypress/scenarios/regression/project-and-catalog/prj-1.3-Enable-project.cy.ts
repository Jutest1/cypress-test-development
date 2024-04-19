
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _bidPage, _saleContractPage, _projectPage } from "cypress/pages";
import { app, tile, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM, EST_HEADER } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"

let SIDEBAR_PARAMETERS
let CREATEPROJECT_PARAMETERS

ALLURE.epic("PROJECT AND CATALOG");
ALLURE.feature("Project");
ALLURE.story("PRJ- 1.3 | Enable Project");

describe("PRJ- 1.3 | Enable Project", () => {

    before(function () {

       CREATEPROJECT_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NAME,
        [ commonLocators.CommonLabels.NAME] :PRJ_NAME,
        [ commonLocators.CommonLabels.CLERK] :CLERK_NAME 
        };

      SIDEBAR_PARAMETERS={
        [commonLocators.CommonKeys.CLASS]:commonLocators.CommonElements.LABEL_FOR_INCLUDE_NON_ACTIVE_ITEMS_ID,
        [commonLocators.CommonElements.LABEL]:commonLocators.CommonLabels.INCLUDE_INACTIVE_ITEMS,
        [commonLocators.CommonKeys.VALUE]:commonLocators.CommonKeys.CHECK
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
     it("TC - Disabling Project", function () {
       _common.openTab(app.TabBar.PROJECT).then(() => {
       _common.setDefaultView(app.TabBar.PROJECT)
       _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
       });
       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
       _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PRJ_NAME).pinnedItem(); 
       _common.waitForLoaderToDisappear() 
       _common.openTab(app.TabBar.PROJECT).then(() => {
       _common.setDefaultView(app.TabBar.PROJECT)
       _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
       });
       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
       _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.DISABLE_PROJECT);
       _common.clickOn_modalFooterButton(btn.ButtonText.OK)
       _common.waitForLoaderToDisappear()  
       cy.SAVE()
       cy.REFRESH_CONTAINER();
       _common.waitForLoaderToDisappear()  
     });
     it("TC - Verify the disabled project", function () {
       _common.openTab(app.TabBar.PROJECT).then(() => {
       _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
       });
       _validate.verify_isRecordDeleted(cnt.uuid.PROJECTS,PRJ_NO)
     });
     it("TC - Enable project", function () {
      _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
       });
       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
       cy.wait(1000)    
       _common.checkSearchOption_inSideBar(SIDEBAR_PARAMETERS)
       cy.wait(1000) 
       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
       _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PRJ_NAME).pinnedItem(); 
       _common.waitForLoaderToDisappear()  
     });
     it("TC - Verify the Enable project ", function () {
       _common.openTab(app.TabBar.PROJECT).then(() => {
       _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
       });
      _common.enterRecord_inNewRow(cnt.uuid.PROJECTS,app.GridCells.PROJECT_NAME_SMALL,app.InputFields.DOMAIN_TYPE_DESCRIPTION,"ENABLE1")
      _common.enterRecord_inNewRow(cnt.uuid.PROJECTS,app.GridCells.PROJECT_NAME_2,app.InputFields.DOMAIN_TYPE_DESCRIPTION,"ENABLE2")
      cy.SAVE()
      cy.wait(500)     
     }); 
});
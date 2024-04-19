import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage,_procurementPage,_estimatePage, _validate, _controllingUnit, _materialPage, _assembliesPage, _boqPage, _mainView } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { EST_HEADER } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECT_NO="PR" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const CREATE_JOB="JOB_1_"+ Cypress._.random(0, 999)
const CREATE_DESC="JOB_D1_"+ Cypress._.random(0, 999)
const CURRENT_JOB="JOB_2_"+ Cypress._.random(0, 999)
const CURRENT_JOB_DESC="JOB_D2_"+ Cypress._.random(0, 999)
const VERSION_EST_JOB="JOB_3_"+ Cypress._.random(0, 999)
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS
let LINE_ITEM_PARAMETERS:DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");

ALLURE.story("EST- 1.109 | Highlight a Version Estimate and click Restore Version button, Check the PRJ Estimate container");

describe("EST- 1.109 | Highlight a Version Estimate and click Restore Version button, Check the PRJ Estimate container", () => {
        
    before(function () {
        cy.fixture("estimate/est-1.109-highlight-a-version-estimate-click-restore-version-button-check-prj-estimate-container.json")
          .then((data) => {
            this.data = data;
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                  [app.GridCells.CODE]: ESTIMATE_CODE,
                  [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                  [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                  [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS = {
                        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
                        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM
            };
          }).then(()=>{
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
              _common.setDefaultView(app.TabBar.PROJECT)
              _common.waitForLoaderToDisappear()
              _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            _common.waitForLoaderToDisappear()
            cy.SAVE();          
            _common.waitForLoaderToDisappear()
            _common.waitForLoaderToDisappear()
            cy.SAVE();          
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
          })
    });  

    after(() => {
        cy.LOGOUT();
    });
   
    it("TC - Create estimate header, create estimate version, restore estimate version", function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.ESTIMATE,app.GridCells.IS_ACTIVE,commonLocators.CommonKeys.UNCHECK,1,EST_HEADER)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE,app.GridCells.DESCRIPTION_INFO,ESTIMATE_DESCRIPTION,EST_HEADER)
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE)
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE,app.GridCells.CODE,"EST_CODE",EST_HEADER)

        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
          _common.waitForLoaderToDisappear()
        });
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
    
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
        _common.waitForLoaderToDisappear()
        _common.filterCurrentEstimate(cnt.uuid.ESTIMATE,commonLocators.CommonKeys.NO_FILTER)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
        _estimatePage.createEstimateVersion(cnt.uuid.ESTIMATE,CREATE_JOB,CREATE_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.filterCurrentEstimate(cnt.uuid.ESTIMATE,commonLocators.CommonKeys.NO_FILTER)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE,app.GridCells.LGM_JOB_FK,CREATE_JOB,EST_HEADER)
        _estimatePage.restoreEstimateVersion(cnt.uuid.ESTIMATE,CURRENT_JOB,CURRENT_JOB_DESC,VERSION_EST_JOB)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    });

    it("TC - Version No. for current Estimate Version record should be populated as '3' & 'Is Active' Checkbox should be Checked", function () {
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE,app.GridCells.LGM_JOB_FK,CURRENT_JOB,EST_HEADER)
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE,app.GridCells.VERSION_NO,"3",EST_HEADER)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.ESTIMATE,app.GridCells.IS_ACTIVE,commonLocators.CommonKeys.CHECK,EST_HEADER)
    })

    it("TC - Job for Current Estimate & Version Estimate should be populated as mentioned in the popup", function () {
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE,app.GridCells.CODE,Cypress.env("EST_CODE")+"_V2",EST_HEADER)
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE,app.GridCells.LGM_JOB_FK,VERSION_EST_JOB,EST_HEADER)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE,app.GridCells.CODE,Cypress.env("EST_CODE"),EST_HEADER)
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE,app.GridCells.LGM_JOB_FK,CURRENT_JOB,EST_HEADER)
    })

    it("TC - 'Is Active' & 'Controlling' checkbox should be 'Unchecked' for Version Estimate(original Current Estimate)", function () {
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE,app.GridCells.CODE,Cypress.env("EST_CODE")+"_V2",EST_HEADER)
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.ESTIMATE,app.GridCells.IS_ACTIVE,commonLocators.CommonKeys.UNCHECK,EST_HEADER)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.ESTIMATE,app.GridCells.IS_ACTIVE,commonLocators.CommonKeys.UNCHECK,EST_HEADER)
    })
})
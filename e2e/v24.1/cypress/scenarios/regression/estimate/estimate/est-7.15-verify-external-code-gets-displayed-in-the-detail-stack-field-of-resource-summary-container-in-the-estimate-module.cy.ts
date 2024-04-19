import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { _common, _projectPage, _estimatePage,_wicpage,_boqPage, _mainView, _modalView, _schedulePage, _assembliesPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";

const EST_CODE = "EST_CODE-" + Cypress._.random(0, 999);
const EST_DESC = "EST_DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "LINE_DESC-" + Cypress._.random(0, 999);
const EXTERNAL_CODE = "EX_CODE-" + Cypress._.random(0, 999);

const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINER_COLUMNS_ESTIMATE;
let ESTIMATE_PARAMETERS;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINERS_RESOURCE;
let RESOURCE_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_RESOURCE_SUMMARY;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 7.15 | Verify external code gets displayed in the Detail stack field of Resource Summary container in the estimate module");

describe("EST- 7.15 | Verify external code gets displayed in the Detail stack field of Resource Summary container in the estimate module ", () => {

  before(function () {
    cy.fixture("estimate/est-7.15-verify-external-code-gets-displayed-in-the-detail-stack-field-of-resource-summary-container-in-the-estimate-module.json").then((data) => {
        this.data = data;
        
        CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
        CONTAINERS_ESTIMATE=this.data.CONTAINERS.ESTIMATE
        CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
        CONTAINER_COLUMNS_RESOURCE= this.data.CONTAINER_COLUMNS.RESOURCE
        CONTAINERS_RESOURCE= this.data.CONTAINERS.RESOURCE
        CONTAINER_COLUMNS_RESOURCE_SUMMARY= this.data.CONTAINER_COLUMNS.RESOURCE_SUMMARY

        ESTIMATE_PARAMETERS = {
          [app.GridCells.CODE]: EST_CODE,
          [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
          [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
        },
        RESOURCE_PARAMETERS = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
        }
        }).then(()=>{
          cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
          _common.openDesktopTile(tile.DesktopTiles.PROJECT);
          _common.waitForLoaderToDisappear()
          _common.openTab(app.TabBar.PROJECT).then(() => {
              _common.setDefaultView(app.TabBar.PROJECT)
              _common.waitForLoaderToDisappear()
              _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
          });
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
        })
    });
    it("TC - Create Estimate header record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2)
          _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.maximizeContainer(cnt.uuid.ESTIMATE)
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
      })
      it("TC - Create line item record", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM)
          })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.edit_containerCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,LINE_ITEM_DESC)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EXTERNAL_CODE,app.InputFields.DOMAIN_TYPE_DESCRIPTION,EXTERNAL_CODE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
      })
      it("TC - Assign resource to line item", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
        _common.setup_gridLayout(cnt.uuid.RESOURCES,CONTAINER_COLUMNS_RESOURCE)
        })
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
        cy.SAVE();
      });
      it("TC - Verify External code gets display in Detail stack of Resource", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES_SUMMARY, app.FooterTab.RESOURCES_SUMMARY);
        _common.setup_gridLayout(cnt.uuid.RESOURCES_SUMMARY,CONTAINER_COLUMNS_RESOURCE_SUMMARY)
        })
        _common.maximizeContainer(cnt.uuid.RESOURCES_SUMMARY)
        _common.clickOn_toolbarButton(cnt.uuid.RESOURCES_SUMMARY,app.GridCellIcons.ICO_REFRESH)
        _common.select_rowHasValue(cnt.uuid.RESOURCES_SUMMARY,CONTAINERS_RESOURCE.CODE)
        _estimatePage.selectLineItem_fromCellPopUpMenu(cnt.uuid.RESOURCES_SUMMARY,app.GridCells.DETAILS_STACK,LINE_ITEM_DESC)
        _common.waitForLoaderToDisappear()
        _mainView.select_popupItem(commonLocators.CommonKeys.DIV,LINE_ITEM_DESC)
        _validate.validateData_fromCellPopUpMenu(app.GridCells.EXTERNAL_CODE_CAP,EXTERNAL_CODE)
    });
    
})
after(() => {
  cy.LOGOUT();
});
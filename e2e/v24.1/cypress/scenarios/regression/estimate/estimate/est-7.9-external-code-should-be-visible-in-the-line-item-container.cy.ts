import { app, tile, sidebar, commonLocators, cnt, btn } from "cypress/locators";
import { _common, _estimatePage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS : DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS : DataCells;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;


ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST-7.9 | External code should be visible in the line item container");
describe("EST-7.9 | External code should be visible in the line item container", () => {
    before(function () {
      cy.fixture("estimate/est-7.9-external-code-should-be-visible-in-the-line-item-container.json").then((data) => {
        this.data = data;
        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
        CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
        ESTIMATE_PARAMETERS = {
          [app.GridCells.CODE]: ESTIMATE_CODE,
          [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
          [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
         }
        
        CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
        CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM;
        LINE_ITEM_PARAMETERS = {
          [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
          [app.GridCells.EXTERNAL_CODE]: CONTAINERS_LINE_ITEM.EXTERNAL_CODE,
          [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
          [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM
         }
         
    cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
      });
    })
  
    it("TC - Create new Estimate Header", function () {
      _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 1)
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
      })
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
      _common.waitForLoaderToDisappear();
      _common.create_newRecord(cnt.uuid.ESTIMATE);
      _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
      _common.waitForLoaderToDisappear();
      cy.SAVE()
      _common.waitForLoaderToDisappear();
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.ToolBar.ICO_GO_TO);
      _common.waitForLoaderToDisappear();
   
  })
  it("TC - Create new Estimate Line items", function () {
     _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
     _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
     _common.waitForLoaderToDisappear()
     _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 1)
     _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
  })
  _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.waitForLoaderToDisappear();
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.EXTERNAL_CODE,app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINERS_LINE_ITEM.EXTERNAL_CODE)
      _common.waitForLoaderToDisappear();
      cy.SAVE()
      
      _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EXTERNAL_CODE,CONTAINERS_LINE_ITEM.EXTERNAL_CODE)
      
  })
})
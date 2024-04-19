import { _common, _estimatePage, _validate } from "cypress/pages";
import { app, tile, cnt,commonLocators,btn,sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION1 = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION2 = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION3 = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);

let DJC_BUDGET_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let ESTIMATE_PARAMETERS:DataCells;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let LINE_ITEM_PARAMETERS1:DataCells;
let LINE_ITEM_PARAMETERS2:DataCells;
let LINE_ITEM_PARAMETERS3:DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let MODAL_GENERATE_BUDGET;
let COSTUNITORIGNAL;
let CONTAINER_COLUMNS_BUDGET;
let RESOURCE_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS2: DataCells;
let RESOURCE_SUB_PARAMETERS: DataCells;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 3.22 | Generating budget for general cost line item");

describe("EST- 3.22 | Generating budget for general cost line item", () => {
  before(function () {
    cy.fixture("estimate/est-3.22-generating-budget-for-general-cost-line-item.json").then((data) => {
      this.data = data;
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
      CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE;
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE;
      CONTAINER_COLUMNS_BUDGET=this.data.CONTAINER_COLUMNS.BUDGET
      MODAL_GENERATE_BUDGET = this.data.MODAL.GENERATE_BUDGET;
            ESTIMATE_PARAMETERS = {
                        [app.GridCells.CODE]: ESTIMATE_CODE,
                        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS1 = {
              [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION1,
            };
            LINE_ITEM_PARAMETERS2 = {
              [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION2,
            };
            LINE_ITEM_PARAMETERS3 = {
              [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION3,
            };
            RESOURCE_PARAMETERS = {
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
              [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            };
            RESOURCE_PARAMETERS2 = {
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY2,
            };
            RESOURCE_SUB_PARAMETERS = {
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
              [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE2,
            };
            DJC_BUDGET_PARAMETERS = {
              [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]:MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE,
              [commonLocators.CommonLabels.BUDGET_FROM]:MODAL_GENERATE_BUDGET.BUDGET_FROM,
              [commonLocators.CommonLabels.X_FACTOR]:MODAL_GENERATE_BUDGET.X_FACTOR,
              [commonLocators.CommonKeys.INDEX]:MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE_INDEX,
              [commonLocators.CommonKeys.RADIO_INDEX]:MODAL_GENERATE_BUDGET.BUDGET_FROM_INDEX
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
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();    
  })
  })
      
  after(() => {
    cy.LOGOUT();
  });

  it("TC - Create new line item record", function () {
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
      _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
      _common.create_newRecord(cnt.uuid.ESTIMATE);
      _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
          _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
          _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM)
          _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.budget,CONTAINER_COLUMNS_LINE_ITEM.islumpsum,CONTAINER_COLUMNS_LINE_ITEM.isgc,CONTAINER_COLUMNS_LINE_ITEM.isfixedprice],cnt.uuid.ESTIMATE_LINEITEMS)
      });
      _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS1);
      _common.set_cellCheckboxValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.IS_LUMP_SUM,commonLocators.CommonKeys.CHECK)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS2);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS3);
      _common.set_cellCheckboxValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.IS_GC,commonLocators.CommonKeys.CHECK)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.waitForLoaderToDisappear()
  });

  it("TC - Create new record in resource for cost code", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
      _common.waitForLoaderToDisappear();
      _common.setup_gridLayout(cnt.uuid.RESOURCES,CONTAINER_COLUMNS_RESOURCE);
    });
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0)
    });
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION1)
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT_TARGET,"BUDGET1")
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0)
    });
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION2)
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT_TARGET,"BUDGET2")
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0)
    });
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION3)
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS2);
    _common.waitForLoaderToDisappear()
    _common.create_newSubRecord(cnt.uuid.RESOURCES)
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_SUB_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT_TARGET,"BUDGET3")
    _common.waitForLoaderToDisappear()
  })

  it("TC - Generation of budget for fixed price line item", function () {
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC); 
    _estimatePage.generate_budgetFromDJC_fromWizard(DJC_BUDGET_PARAMETERS)
    _common.waitForLoaderToDisappear();
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_BUDGET);
    });
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION1);
    _validate.verify_isRecordPresent(cnt.uuid.ESTIMATE_LINEITEMS,Cypress.env("BUDGET1"))
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION2);
    _validate.verify_isRecordPresent(cnt.uuid.ESTIMATE_LINEITEMS,Cypress.env("BUDGET1"))
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION3);
    _validate.verify_isRecordPresent(cnt.uuid.ESTIMATE_LINEITEMS,Cypress.env("BUDGET1"))
  })
});

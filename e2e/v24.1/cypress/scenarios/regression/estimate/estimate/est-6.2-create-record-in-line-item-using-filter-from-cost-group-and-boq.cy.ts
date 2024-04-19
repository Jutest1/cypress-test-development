import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { _common, _boqPage, _estimatePage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ_DESC-" + Cypress._.random(0, 999);
const BOQSTRU_DESC = "BOQSTRU_DESC-" + Cypress._.random(0, 999);
const EST_CODE = "EST_CODE-" + Cypress._.random(0, 999);
const EST_DESC = "EST_DESC-" + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_BOQ;
let BOQ_PARAMETERS: DataCells;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_STRUCTURE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let ESTIMATE_PARAMETERS;
let CONTAINER_COLUMNS_BOQS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINER_COLUMNS_COST_GROUP;
let CONTAINERS_COST_GROUP;
let CONTAINERS_BOQS_ESTIMATE;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 6.2 | Create a record manually in the line item using filter from cost group and BOQ container");
describe("EST- 6.2 | Create a record manually in the line item using filter from cost group and BOQ container", () => {

  before(function () {

    cy.fixture("estimate/est-6.2-create-record-in-line-item-using-filter-from-cost-group-and-boq.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
      BOQ_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      }
      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      BOQ_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQSTRU_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY_1,
        [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
      }
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: EST_CODE,
        [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      CONTAINER_COLUMNS_BOQS_ESTIMATE = this.data.CONTAINER_COLUMNS.BOQS_ESTIMATE
      CONTAINERS_BOQS_ESTIMATE = this.data.CONTAINERS.BOQS_ESTIMATE
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      CONTAINER_COLUMNS_COST_GROUP = this.data.CONTAINER_COLUMNS.COST_GROUP
      CONTAINERS_COST_GROUP = this.data.CONTAINERS.COST_GROUP
    }).then(() => {
      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem()
    });

  });

  after(() => {
    cy.LOGOUT();
  });

  it("TC - Create new BOQ and go to BOQ", function () {
    _common.openTab(app.TabBar.BOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
    })
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create new BOQ structure", function () {
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    })
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.FINAL_PRICE_SMALL).then(($costTotal) => {
      Cypress.env("FINAL_PRICE_1", $costTotal.text())
    })
  });

  it("TC - Create Estimate", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2)
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
  })

  it("TC - Create Line item using BoQ filter", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_ESTIMATEBYBOQ, app.FooterTab.BOQs, 2)
      _common.setup_gridLayout(cnt.uuid.BOQ_ESTIMATEBYBOQ, CONTAINER_COLUMNS_BOQS_ESTIMATE)
    });
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.BOQ_ESTIMATEBYBOQ)
    _common.search_inSubContainer(cnt.uuid.BOQ_ESTIMATEBYBOQ, BOQSTRU_DESC)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_ESTIMATEBYBOQ, app.GridCells.BRIEF_INFO_SMALL, BOQSTRU_DESC)
    _common.toggle_radioFiledInContainer(CONTAINERS_BOQS_ESTIMATE.SELECT_RADIO, cnt.uuid.BOQ_ESTIMATEBYBOQ, app.GridCells.MARKER)
    cy.SAVE()
    _common.minimizeContainer(cnt.uuid.BOQ_ESTIMATEBYBOQ)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 1)
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    })
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    cy.SAVE()
    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQSTRU_DESC)
    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TOTAL, CONTAINERS_BOQ_STRUCTURE.QUANTITY_1)
    _common.toggle_radioFiledInContainer(CONTAINERS_BOQS_ESTIMATE.DESELECT_RADIO, cnt.uuid.BOQ_ESTIMATEBYBOQ, app.GridCells.MARKER)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
  })

  it("TC - Create Line item using Cost group filter", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_COSTGROUP, app.FooterTab.COSTGROUP, 2)
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_COSTGROUP, CONTAINER_COLUMNS_COST_GROUP)
    });
    _common.maximizeContainer(cnt.uuid.ESTIMATE_COSTGROUP)
    cy.REFRESH_CONTAINER()
    _estimatePage.selectdata_fromCostGroupContainer(cnt.uuid.ESTIMATE_COSTGROUP, CONTAINERS_COST_GROUP.COST_GROUP_TYPE);
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_COSTGROUP, CONTAINERS_COST_GROUP.COST_GROUP_DESCRIPTION)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_COSTGROUP, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_GROUP.COST_GROUP_DESCRIPTION)
    _common.toggle_radioFiledInContainer(CONTAINERS_COST_GROUP.SELECT_RADIO, cnt.uuid.ESTIMATE_COSTGROUP, app.GridCells.MARKER)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.ESTIMATE_COSTGROUP)
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 1)
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    })
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.wait(1000).then(() => { // This Wait is mandatory for creating a then block to assertvalues.
      _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_GROUP_LIC_DIN276_2018_12_DESC, CONTAINERS_COST_GROUP.COST_GROUP_DESCRIPTION)
    })
  })

})
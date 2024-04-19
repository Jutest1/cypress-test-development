import { tile, app, cnt,commonLocators,sidebar, btn } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _salesPage, _validate, _package } from "cypress/pages";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import { DataCells } from "cypress/pages/interfaces";
import { _preLoading } from "cypress/commands/integration/hooks";

const ALLURE = Cypress.Allure.reporter.getInterface();

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC1 = "BOQSTR-DESC-" + Cypress._.random(0, 999);

let BOQS_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_BOQ;
let BOQS_STRUCTURE_PARAMETERS:DataCells;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQS_STRUCTURE_PARAMETERS2:DataCells;
let CONTAINERS_BOQ_STRUCTURE2;
let BUDGETTOTAL1;
let BUDGETTOTAL2;


ALLURE.epic("BOQ");
ALLURE.feature("BoQ");
ALLURE.story("BOQ- 1.11 | Verify Budget Total & Budget/Unit  Calculation for BOQ Item");

describe("BOQ- 1.11 | Verify Budget Total & Budget/Unit  Calculation for BOQ Item", () => {
  before(function () {
    cy.fixture("boq/boq-1.11-verify-Budget-total-and-budget-unit-calculation-for-boq-item.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BOQ= this.data.CONTAINER_COLUMNS.BOQ
      CONTAINER_COLUMNS_BOQ_STRUCTURE= this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      CONTAINERS_BOQ_STRUCTURE= this.data.CONTAINERS.BOQ_STRUCTURE
      CONTAINERS_BOQ_STRUCTURE2= this.data.CONTAINERS.BOQ_STRUCTURE2
      BOQS_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      };
      BOQS_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
        [ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
      };
      BOQS_STRUCTURE_PARAMETERS2 = {
        [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_DESC1,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE2.QUANTITY,
        [ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE2.UNIT_RATE,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE2.UOM
      };
    }).then(() => {
    cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });
  })
  it("TC - Create new BoQ header", function () {
    _common.openTab(app.TabBar.BOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQS_PARAMETERS)
    _common.saveCellDataToEnv(cnt.uuid.BOQS, app.GridCells.BRIEF_INFO_SMALL,BOQ_DESC, BOQ_ROOT_ITEM)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
    _common.waitForLoaderToDisappear()
  });
  it("TC - Create BoQ Structure", function () {
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS2);
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCT_DESC)
    _common.waitForLoaderToDisappear();
    _common.set_cellCheckboxValue(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BUDGET_FIXED_UNIT,CONTAINERS_BOQ_STRUCTURE.CHECKBOX)
    _common.waitForLoaderToDisappear()
    _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BUDGET_PER_UNIT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_BOQ_STRUCTURE.BUDGET_UNIT)
     cy.SAVE();
     _common.waitForLoaderToDisappear()
     _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCT_DESC)
     _common.waitForLoaderToDisappear()
  });
  it("TC - Verify Budget Total at Division Level and Budget Unit at Position Level", function () {
    _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL).then(($QUANTITY) => {
      Cypress.env("QUANTITY",($QUANTITY.text()))  
      let QUANTITY=Cypress.env("QUANTITY") 

   _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BUDGET_PER_UNIT).then(($BUDGETUNIT) => {
      Cypress.env("BUDGETUNIT",($BUDGETUNIT.text()))  
      let BUDGET_UNIT=Cypress.env("BUDGETUNIT") 
  
   BUDGETTOTAL1 =parseFloat(BUDGET_UNIT)*parseFloat(QUANTITY)
   _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BUDGET_TOTAL,BUDGETTOTAL1.toString())
   })
  })
  _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCT_DESC1)
  _common.waitForLoaderToDisappear()
  _common.set_cellCheckboxValue(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BUDGET_FIXED_TOTAL,CONTAINERS_BOQ_STRUCTURE2.CHECKBOX)
  _common.waitForLoaderToDisappear()
  _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BUDGET_TOTAL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_BOQ_STRUCTURE2.BUDGET_TOTAL)
  cy.SAVE();
  _common.waitForLoaderToDisappear()
  _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BUDGET_TOTAL).then(($BUDGETTOTAL) => {
    Cypress.env("BUDGETTOTAL",($BUDGETTOTAL.text()))  
    BUDGETTOTAL2=Cypress.env("BUDGETTOTAL") 
  _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL).then(($QUANTITY) => {
    Cypress.env("QUANTITY",($QUANTITY.text()))  
    let QUANTITY=Cypress.env("QUANTITY") 

    let BUDGETUNIT =parseFloat(BUDGETTOTAL2)/parseFloat(QUANTITY)
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BUDGET_PER_UNIT, BUDGETUNIT.toString())
  })
  })
  _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BOQ_LINE_TYPE_FK,CONTAINERS_BOQ_STRUCTURE2.BOQ_TYPE)

})
  it("TC - Verify Division level Budget eual to sum of two boq item budget total", function () {
    _common.waitForLoaderToDisappear()
    let EXPBUDGETTOTAL=parseFloat(BUDGETTOTAL1)+parseFloat(BUDGETTOTAL2)
   _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BUDGET_TOTAL, EXPBUDGETTOTAL.toString())
  })
})

 after(() => {
  cy.LOGOUT();
 });
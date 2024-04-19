import { tile, app, cnt,commonLocators,sidebar, btn } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _salesPage, _validate, _package } from "cypress/pages";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import { DataCells } from "cypress/pages/interfaces";
import { _preLoading } from "cypress/commands/integration/hooks";

const ALLURE = Cypress.Allure.reporter.getInterface();

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC1 = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC2 = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC3 = "BOQSTR-DESC-" + Cypress._.random(0, 999);

let BOQS_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQS_STRUCTURE_PARAMETERS1:DataCells;
let CONTAINERS_BOQ_STRUCTURE;
let BOQS_STRUCTURE_PARAMETERS2:DataCells;
let BOQS_STRUCTURE_PARAMETERS3:DataCells;


ALLURE.epic("BOQ");
ALLURE.feature("BoQ");
ALLURE.story("BOQ- 1.13 | Verify Changing Item type base ALT Option for BOQ item");

describe("BOQ- 1.13 | Verify Changing Item type base ALT Option for BOQ item", () => {
  before(function () {
    cy.fixture("boq/boq-1.13-verify-changing-item-type-base-alt-option-for-boq-item.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BOQ= this.data.CONTAINER_COLUMNS.BOQ
      CONTAINER_COLUMNS_BOQ_STRUCTURE= this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      CONTAINERS_BOQ_STRUCTURE= this.data.CONTAINERS.BOQ_STRUCTURE
      BOQS_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      };
      BOQS_STRUCTURE_PARAMETERS1 = {
        [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_DESC1,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
        [ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0]
      };
      BOQS_STRUCTURE_PARAMETERS2 = {
        [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_DESC2,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[1],
        [ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[1],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0]
      };
      BOQS_STRUCTURE_PARAMETERS3 = {
        [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_DESC3,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[2],
        [ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[2],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0]
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
  it("TC - Create Three BoQ Structures", function () {
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS1);
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS2);
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS3);
    cy.SAVE();
    _common.waitForLoaderToDisappear();
  });
  it("TC - Verify AAN and AGN value for 'Base' Item type", function () {

    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCT_DESC1)
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithCaret(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BAS_ITEM_TYPE_2_FK,commonLocators.CommonKeys.LIST_EXACT,CONTAINERS_BOQ_STRUCTURE.ITEM_TYPE_BASE[0])
    cy.SAVE()  
    _common.waitForLoaderToDisappear()
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.AGN,CONTAINERS_BOQ_STRUCTURE.AGN)
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCT_DESC1)
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.AAN,CONTAINERS_BOQ_STRUCTURE.AAN[0])
});
it("TC - Verify Item total='0' and AAN='2' for 'Alternative' Item type", function () {
  _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCT_DESC2)
  _common.waitForLoaderToDisappear()
  _common.edit_dropdownCellWithCaret(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BAS_ITEM_TYPE_2_FK,commonLocators.CommonKeys.LIST_EXACT,CONTAINERS_BOQ_STRUCTURE.ITEM_TYPE_BASE[2])
  cy.SAVE()  
  _common.waitForLoaderToDisappear()
  _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.ITEM_TOTAL,CONTAINERS_BOQ_STRUCTURE.DEFAULT_VALUE)
  _common.waitForLoaderToDisappear();
  _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURES,app.GridCells.AGN,app.InputFields.DOMAIN_TYPE_DESCRIPTION,CONTAINERS_BOQ_STRUCTURE.AGN)
  cy.SAVE()
  _common.waitForLoaderToDisappear()
  _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.AAN,CONTAINERS_BOQ_STRUCTURE.AAN[1])
  _common.waitForLoaderToDisappear() 
});
  it("TC - Verify Item total='0' and AAN='4' for 'Alternative' Item type", function () {
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCT_DESC3)
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithCaret(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BAS_ITEM_TYPE_2_FK,commonLocators.CommonKeys.LIST_EXACT,CONTAINERS_BOQ_STRUCTURE.ITEM_TYPE_BASE[2])
    cy.SAVE()  
    _common.waitForLoaderToDisappear()
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.ITEM_TOTAL,CONTAINERS_BOQ_STRUCTURE.DEFAULT_VALUE)
    _common.waitForLoaderToDisappear();
    _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURES,app.GridCells.AGN,app.InputFields.DOMAIN_TYPE_DESCRIPTION,CONTAINERS_BOQ_STRUCTURE.AGN)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.AAN,CONTAINERS_BOQ_STRUCTURE.AAN[2])
    _common.waitForLoaderToDisappear()  
  });

  it("TC - Verify Base record populated as 'Base Postponed' & its Item Total should be '0'", function () {
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCT_DESC3)
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithCaret(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BAS_ITEM_TYPE_2_FK,commonLocators.CommonKeys.LIST_EXACT,CONTAINERS_BOQ_STRUCTURE.ITEM_TYPE_BASE[3])
    cy.SAVE()  
    _common.waitForLoaderToDisappear();
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCT_DESC1)
    _common.waitForLoaderToDisappear()
    _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BAS_ITEM_TYPE_2_FK,CONTAINERS_BOQ_STRUCTURE.ITEM_TYPE_BASE[1])
    _common.waitForLoaderToDisappear();
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.ITEM_TOTAL,CONTAINERS_BOQ_STRUCTURE.DEFAULT_VALUE)
    _common.waitForLoaderToDisappear();  
  });
  it("TC - Verify Item Total of Alternative awarded", function () {
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCT_DESC3)
    _common.waitForLoaderToDisappear()
    _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL).then(($QUANTITY) => {
      Cypress.env("QUANTITY",($QUANTITY.text()))  
      let QUANTITY=Cypress.env("QUANTITY") 
    _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.PRICE_SMALL).then(($UNIT_RATE) => {
      Cypress.env("UNIT_RATE",($UNIT_RATE.text()))  
      let UNIT_RATE=Cypress.env("UNIT_RATE") 
      let ITEMTOTAL =parseFloat(QUANTITY)*parseFloat(UNIT_RATE)
      _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.ITEM_TOTAL,ITEMTOTAL.toString()) 
      _common.minimizeContainer(cnt.uuid.BOQ_STRUCTURES)
    });
  })
 })
})
 
 after(() => {
  cy.LOGOUT();
 });
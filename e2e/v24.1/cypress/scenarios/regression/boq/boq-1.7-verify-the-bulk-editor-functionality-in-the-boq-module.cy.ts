import { tile, app, cnt, sidebar,commonLocators,btn } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _salesPage, _validate, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC1 = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC2 = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const CONG_DESC = "CONG-DESC-"+ Cypress._.random(0, 999);

let BOQS_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_BOQ;
let BOQS_STRUCTURE_PARAMETERS:DataCells;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINERS_BOQ_STRUCTURE2;
let BOQS_STRUCTURE_PARAMETERS2:DataCells;
let CONTAINERS_BOQ_STRUCTURE3
let BOQS_STRUCTURE_PARAMETERS3:DataCells;
let RULES;
let CONTAINERS_GET_QUANTITY;

ALLURE.epic("BOQ");
ALLURE.feature("BoQ");
ALLURE.story("BOQ- 1.7 | Verify the bulk editor functionality in the boq module");

describe("BOQ- 1.7 | Verify the bulk editor functionality in the boq module", () => {
  before(function () {
    cy.fixture("boq/boq-1.7-verify-the-bulk-editor-functionality-in-the-boq-module.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BOQ= this.data.CONTAINER_COLUMNS.BOQ
      CONTAINER_COLUMNS_BOQ_STRUCTURE= this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      CONTAINERS_BOQ_STRUCTURE= this.data.CONTAINERS.BOQ_STRUCTURE
      CONTAINERS_BOQ_STRUCTURE2= this.data.CONTAINERS.BOQ_STRUCTURE2
      CONTAINERS_BOQ_STRUCTURE3= this.data.CONTAINERS.BOQ_STRUCTURE3
      CONTAINERS_GET_QUANTITY=this.data.CONTAINERS.GET_QUANTITY
      RULES= this.data.CREATE_NEW_RULE
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
      BOQS_STRUCTURE_PARAMETERS3 = {
        [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_DESC2,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE3.QUANTITY,
        [ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE3.UNIT_RATE,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE3.UOM
      };
  });

  cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
  _common.openDesktopTile(tile.DesktopTiles.PROJECT);
  _common.waitForLoaderToDisappear()
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
  _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
  });
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
  it("TC - Create three BoQ Structure", function () {
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS2);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS3);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });
  it("TC - Edit quantity using bulk editor", function () {
    _common.waitForLoaderToDisappear()
    _common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
    _estimatePage.bulkEditor_createNewRule(cnt.uuid.BOQ_STRUCTURES,CONG_DESC,RULES)   
    _common.waitForLoaderToDisappear()
  })
  it("TC - Verify quantity edited by bulk editor", function () {
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCT_DESC)
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL,CONTAINERS_GET_QUANTITY.QUANTITY)
    
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCT_DESC1)
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL,CONTAINERS_GET_QUANTITY.QUANTITY)

    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCT_DESC2)
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL,CONTAINERS_GET_QUANTITY.QUANTITY)
  })
  after(() => {
		cy.LOGOUT();
	});
})

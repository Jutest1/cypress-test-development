import { tile, app, cnt, btn,commonLocators,sidebar } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _salesPage, _validate, _package } from "cypress/pages";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);

let BOQS_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_BOQ;
let BOQS_STRUCTURE_PARAMETERS:DataCells;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;

ALLURE.epic("BOQ");
ALLURE.feature("BoQ");
ALLURE.story("BOQ- 1.8 | Verify discount percentage ur calculation on item total in the boq structure container");

describe("BOQ- 1.8 | Verify discount percentage ur calculation on item total in the boq structure container", () => {
  before(function () {
    cy.fixture("boq/boq-1.8-verify-discount-percentage-ur-calculation-on-item-total-in-the-boq-structure-container.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BOQ= this.data.CONTAINER_COLUMNS.BOQ
      CONTAINER_COLUMNS_BOQ_STRUCTURE= this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      CONTAINERS_BOQ_STRUCTURE= this.data.CONTAINERS.BOQ_STRUCTURE
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
  it("TC - Create BoQ Structure", function () {
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURES,app.GridCells.DISCOUNT_PERCENT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_BOQ_STRUCTURE.DISCOUNT_AMOUNT)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTURES)
    _common.waitForLoaderToDisappear()
  });
  it("TC - Verify  Discounted Price in Position Level & Item Total (EUR) in Division Level", function () {
    _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.ITEM_TOTAL).then(($POSITION_ITEM_TOTAL) => {
    Cypress.env("POSITION_ITEM_TOTAL",($POSITION_ITEM_TOTAL.text()))  
    let positionitemtotal=Cypress.env("POSITION_ITEM_TOTAL") 

    _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.DISCOUNT_PERCENT).then(($DISCOUNT_PERCENT) => {
    Cypress.env("DISCOUNT_PERCENT", ($DISCOUNT_PERCENT.text()))
    let discountpercent=Cypress.env("DISCOUNT_PERCENT")

    let percentageofpositionitemtotal=(parseFloat(positionitemtotal.replace(",","")) * parseFloat(discountpercent))/100
    let positiondiscountedprice =parseFloat(positionitemtotal.replace(",",""))-percentageofpositionitemtotal
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.DISCOUNTED_PRICE, positiondiscountedprice.toString())
   
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BOQ_LINE_TYPE_FK,CONTAINERS_BOQ_STRUCTURE.BOQ_TYPE)
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.ITEM_TOTAL, positiondiscountedprice.toString())
    })
   })
  })

  after(() => {
		cy.LOGOUT();
	});
})
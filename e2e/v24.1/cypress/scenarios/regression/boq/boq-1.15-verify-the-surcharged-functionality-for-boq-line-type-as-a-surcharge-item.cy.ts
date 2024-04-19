import { tile, app, cnt,commonLocators,sidebar, btn } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _salesPage, _validate, _package } from "cypress/pages";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import { DataCells } from "cypress/pages/interfaces";
import { _preLoading } from "cypress/commands/integration/hooks";

const ALLURE = Cypress.Allure.reporter.getInterface();

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC1 = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC2 = "BOQSTR-DESC-" + Cypress._.random(0, 999);

let BOQS_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQS_STRUCTURE_PARAMETERS1:DataCells;
let CONTAINERS_BOQ_STRUCTURE;
let ITEM_TOTAL;

ALLURE.epic("BOQ");
ALLURE.feature("BoQ");
ALLURE.story("BOQ- 1.15 | Verify the Surcharged functionality for BOQ Line Type as a Surcharge Item");

describe("BOQ- 1.15 | Verify the Surcharged functionality for BOQ Line Type as a Surcharge Item", () => {
  before(function () {
    cy.fixture("boq/boq-1.15-verify-the-surcharged-functionality-for-boq-line-type-as-a-surcharge-item.json")
      .then((data) => {
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
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
        [ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
      };
    }).then(() => {
    cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });
  })

  after(() => {
    cy.LOGOUT();
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

  it("TC - Create BoQ Structures with surchanged checkbox", function () {
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 1);
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS1);
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.set_cellCheckboxValue(cnt.uuid.BOQ_STRUCTURES,app.GridCells.IS_SURCHARGED,CONTAINERS_BOQ_STRUCTURE.CHECKBOX)
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCT_DESC1)
    _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.ITEM_TOTAL)
           .then(($ITEM_TOTAL) => {
              Cypress.env("ITEM_TOTAL",($ITEM_TOTAL.text()))  
              ITEM_TOTAL=Cypress.env("ITEM_TOTAL") 
            })
  });

  it("TC - Verify quantity for 'Surcharge Item' boq line type", function () {
    _common.create_newRecord(cnt.uuid.BOQ_STRUCTURES)
    _common.waitForLoaderToDisappear();
    _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BRIEF_INFO_SMALL,app.InputFields.DOMAIN_TYPE_TRANSLATION,BOQ_STRUCT_DESC2)
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.edit_dropdownCellWithCaret(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BOQ_LINE_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_BOQ_STRUCTURE.BOQ_LINE_TYPE)
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCT_DESC2)
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.QUANTITY_SMALL,ITEM_TOTAL)
  });

  it("TC - Verify Item total for 'Surcharge Item' boq line type", function () {
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCT_DESC2)
    _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURES,app.GridCells.PRICE_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[1])
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCT_DESC2)
    _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.PRICE_SMALL)
           .then(($UNIT_RATE) => {
              Cypress.env("UNIT_RATE",($UNIT_RATE.text()))  
              let UNIT_RATE=Cypress.env("UNIT_RATE") 
              _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL)
                     .then(($QUANTITY) => {
                        Cypress.env("QUANTITY",($QUANTITY.text()))
                        let QUANTITY=Cypress.env("QUANTITY").replace(",","")
                        let ITEMTOTAL =parseFloat(QUANTITY)*parseFloat(UNIT_RATE)/100
                        _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.ITEM_TOTAL,ITEMTOTAL.toString())
                     });
             })
  })
})

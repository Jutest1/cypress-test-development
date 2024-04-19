
import { tile, app,btn, cnt,commonLocators,sidebar } from "cypress/locators";
import { _bidPage, _billPage, _boqPage, _common, _estimatePage, _modalView, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";


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
ALLURE.story("BOQ- 1.14 | Verify Lump Sum functionality on Position level record & division level");
describe("BOQ- 1.14 | Verify Lump Sum functionality on Position level record & division level", () => {
  before(function () {
    cy.fixture("boq/boq-1.14-verify-lump-sum-functionality-on-position-level-record-and-division-level.json").then((data) => {
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
    }).then(() => {
    cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });
  })

  it("TC- Create new BOQ and go to BOQ", function () {
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
  })
  it("TC- Create new BOQ structure", function () {
   
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCT_DESC)
    _common.waitForLoaderToDisappear();
    _common.set_cellCheckboxValue(cnt.uuid.BOQ_STRUCTURES,app.GridCells.IS_LUMP_SUM,CONTAINERS_BOQ_STRUCTURE.CHECKBOX)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
   });

   it("TC- Verify quantity should be equal to 1 & UoM should be LSUM", function () {
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.QUANTITY_SMALL,CONTAINERS_BOQ_STRUCTURE.UPDATED_QUANTITY)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BAS_UOM_FK,CONTAINERS_BOQ_STRUCTURE.UPDATED_UOM)
   });

   it("TC- Verify Item Total(EUR) = Updated unit Rate * Qty", function () {
    _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_BOQ_STRUCTURE.UPDATED_UNIT_RATE)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
   _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.BOQ_STRUCTURES,CONTAINERS_BOQ_STRUCTURE.UPDATED_UNIT_RATE,CONTAINERS_BOQ_STRUCTURE.UPDATED_QUANTITY,app.GridCells.ITEM_TOTAL)
   });

   it("TC- Verify Lumpsum Price(EUR) at division level = Item Total(EUR)", function () {
    _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES,app.GridCells.ITEM_TOTAL).then(($ItemTotal)=>{
      Cypress.env("ItemTotal",$ItemTotal.text())
    _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURES);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BOQ_LINE_TYPE_FK,CONTAINERS_BOQ_STRUCTURE.BOQ_TYPE)
    _common.waitForLoaderToDisappear()
    _common.set_cellCheckboxValue(cnt.uuid.BOQ_STRUCTURES,app.GridCells.IS_LUMP_SUM,CONTAINERS_BOQ_STRUCTURE.CHECKBOX)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.LUMP_SUM_PRICE,Cypress.env("ItemTotal"))
    })
   })
  });

   after(() => {
		cy.LOGOUT();
	 });


import { tile, app, cnt } from "cypress/locators";
import { _bidPage, _billPage, _boqPage, _common, _estimatePage, _modalView, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage } from "cypress/pages";

const allure = Cypress.Allure.reporter.getInterface();
allure.epic("BOQ");
allure.feature("BoQ");
allure.story("BOQ- 1.14 | Verify Lump Sum functionality on Position level record & division level");
describe("BOQ- 1.14 | Verify Lump Sum functionality on Position level record & division level", () => {
  beforeEach(function () {
    cy.fixture("boq/boq-1.14-verify-lump-sum-functionality-on-position-level-record-and-division-level.json").then((data) => {
      this.data = data;
    });
  });
  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("boq/boq-1.14-verify-lump-sum-functionality-on-position-level-record-and-division-level.json").then((data) => {
      this.data = data;
      const standardInputs = this.data.Prerequisites.SidebarInputs;
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });
  });

  it("TC- Create new BOQ and go to BOQ", function () {
    const BOQ = this.data.CreateNewBoq.CreateBoQ;
    const BOQ_COLUMNHEADER = this.data.CreateNewBoq.ColumnHeaders
    _common.openTab(app.tabBar.BoQ).then(()=>{
    _common.select_tabFromFooter(cnt.uuid.BOQS,app.FooterTab.BOQs)
    _common.setup_gridLayout(cnt.uuid.BOQS,BOQ_COLUMNHEADER)
    })
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
    _boqPage.enterRecord_toCreateBoQ(BOQ.outlineSpecification);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.BOQS);
  });

  it("TC- Create new BOQ structure", function () {
    const BOQ_STRUCTURE = this.data.CreateNewBoQStructure.BoQStructureInputs;
    const BOQ_STRUCTURE_COLUMNHEADER = this.data.CreateNewBoQStructure.ColumnHeaders
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(()=>{
    _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES,app.FooterTab.BOQ_STRUCTURE)
    _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_COLUMNHEADER)
    })
    _common.create_newSubRecord(cnt.uuid.BOQ_STRUCTURES);
    _boqPage.enterRecord_toCreateBoQStructure(BOQ_STRUCTURE.description, BOQ_STRUCTURE.quantity, BOQ_STRUCTURE.unitRate, BOQ_STRUCTURE.uom);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BOQ_LINE_TYPE_FK,"Position")
    _common.set_cellCheckboxValue(cnt.uuid.BOQ_STRUCTURES,app.gridCells.LUMSUM,"check")
    cy.SAVE();
    _common.waitForLoaderToDisappear()
   });

   it("TC- Verify quantity should be equal to 1 & UoM should be LSUM", function () {
    const BOQ_STRUCTURE = this.data.CreateNewBoQStructure.BoQStructureInputs;

    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.QUANTITY_SMALL,BOQ_STRUCTURE.UpdatedQuantity)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BAS_UOM_FK,BOQ_STRUCTURE.UpdatedUoM)
   });

   it("TC- Verify Item Total(EUR) = Updated unit Rate * Qty", function () {
    const BOQ_STRUCTURE = this.data.CreateNewBoQStructure.BoQStructureInputs;

    _common.editContainerCellwithDynamicInputField(cnt.uuid.BOQ_STRUCTURES, app.GridCells.PRICE, app.InputFields.INPUT_GROUP_CONTENT,BOQ_STRUCTURE.updatedUnitRate)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
   _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE.updatedUnitRate,BOQ_STRUCTURE.UpdatedQuantity,app.gridCells.ITEM_TOTAL)
   });

   it("TC- Verify Lumpsum Price(EUR) at division level = Item Total(EUR)", function () {

    _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES,app.gridCells.ITEM_TOTAL).then(($ItemTotal)=>{
      Cypress.env("ItemTotal",$ItemTotal.text())
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BOQ_LINE_TYPE_FK,"Level 2")
    _common.set_cellCheckboxValue(cnt.uuid.BOQ_STRUCTURES,app.gridCells.LUMSUM,"check")
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    cy.wait(200).then(()=>{
      _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.LUMP_SUM_PRICE,Cypress.env("ItemTotal"))
    })
   });

   after(() => {
		cy.LOGOUT();
	 });
})
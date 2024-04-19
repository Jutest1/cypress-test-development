import { tile, app, cnt, generic, btn } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _salesPage, _validate, _package } from "cypress/pages";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";

const allure = Cypress.Allure.reporter.getInterface();

const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const BOQ_HEADER_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);

allure.epic("BOQ");
allure.feature("BoQ");
allure.story("BOQ- 1.8 | Verify discount percentage ur calculation on item total in the boq structure container");

describe("BOQ- 1.8 | Verify discount percentage ur calculation on item total in the boq structure container", () => {
  beforeEach(function () {
    cy.fixture("boq/boq-1.8-verify-discount-percentage-ur-calculation-on-item-total-in-the-boq-structure-container.json").then((data) => {
      this.data = data;
    });
  });

  before(function () {
    cy.preLoading(
      Cypress.env("adminUserName"),
      Cypress.env("adminPassword"),
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName")
    )

    cy.fixture("boq/boq-1.8-verify-discount-percentage-ur-calculation-on-item-total-in-the-boq-structure-container.json").then((data) => {
      this.data = data;
      const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.tabBar.project).then(() => {
        _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0)
      })
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.Projects)
      _common.create_newRecord(cnt.uuid.Projects);
      _projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
      _common.waitForLoaderToDisappear()
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      _common.openSidebarOption(STANDARDINPUTS.Search).delete_pinnedItem();
      _common.search_fromSidebar(STANDARDINPUTS.searchType, PRJ_NO).pinnedItem();
    });
    _common.select_rowInContainer(cnt.uuid.Projects)
  });
  it("TC - Create new BoQ header", function () {
    const BOQ_HEADER_GRID = this.data.BoQHeader.Column_Headers
    const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
    _common.openSidebarOption(STANDARDINPUTS.QuickStart)
    _common.search_fromSidebar(STANDARDINPUTS.quickstart, STANDARDINPUTS.project)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.tabBar.BoQs).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
      _common.setup_gridLayout(cnt.uuid.BOQS, BOQ_HEADER_GRID)
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(BOQ_HEADER_DESC)
    _common.saveCellDataToEnv(cnt.uuid.BOQS, app.GridCells.BRIEF_INFO, BOQ_HEADER_DESC, BOQ_ROOT_ITEM)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _boqPage.textOfBoQCode(app.GridCells.BRIEF_INFO);
    _common.clickOn_toolbarButton(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
  });
  it("TC - Create BoQ Structure", function () {
    const BOQSTRUCTUREGRID = this.data.BoqStructure.Column_Headers;
    const BOQSTRUCTUREINPUTS = this.data.BoqStructure.BoQStructureInputs
    const DATACELLS: DataCells = {
      [app.GridCells.BRIEF_INFO]: BOQSTRUCT_DESC,
      [app.GridCells.QUANTITY_SMALL]: BOQSTRUCTUREINPUTS.Quantity,
      [ app.GridCells.PRICE]: BOQSTRUCTUREINPUTS.UnitRate,
      [app.GridCells.BAS_UOM_FK]: BOQSTRUCTUREINPUTS.Uom
    };
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, BOQSTRUCTUREGRID)
    });
    _boqPage.enterRecord_toCreateBoQStructure_V1(cnt.uuid.BOQ_STRUCTURES, DATACELLS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _boqPage.edit_BoQelements(cnt.uuid.BOQ_STRUCTURES,app.GridCells.DISCOUNT_PERCENT,BOQSTRUCTUREINPUTS.DiscountAmount)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });
  it("TC - Verify  Discounted Price in Position Level & Item Total (EUR) in Division Level", function () {
    const BOQSTRUCTUREGRID = this.data.BoqStructure.Column_Headers2;
    const BOQSTRUCTUREINPUTS = this.data.BoqStructure.BoQStructureInputs
    _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.gridCells.ITEM_TOTAL_EUR).then(($POSITION_ITEM_TOTAL) => {
    Cypress.env("POSITION_ITEM_TOTAL",($POSITION_ITEM_TOTAL.text()))  
    let positionitemtotal=Cypress.env("POSITION_ITEM_TOTAL") 

    _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.DISCOUNT_PERCENT).then(($DISCOUNT_PERCENT) => {
    Cypress.env("DISCOUNT_PERCENT", ($DISCOUNT_PERCENT.text()))
    let discountpercent=Cypress.env("DISCOUNT_PERCENT")

    let percentageofpositionitemtotal=(parseFloat(positionitemtotal.replace(",","")) * parseFloat(discountpercent))/100
    let positiondiscountedprice =parseFloat(positionitemtotal.replace(",",""))-percentageofpositionitemtotal
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.gridCells.DISCOUNTED_PRICE, positiondiscountedprice.toString())
   
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, BOQSTRUCTUREGRID)
    });
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BOQ_LINE_TYPE_FK,BOQSTRUCTUREINPUTS.BoQType)
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.gridCells.ITEM_TOTAL_EUR, positiondiscountedprice.toString())
    })
   })
  })

  after(() => {
		cy.LOGOUT();
	});
})
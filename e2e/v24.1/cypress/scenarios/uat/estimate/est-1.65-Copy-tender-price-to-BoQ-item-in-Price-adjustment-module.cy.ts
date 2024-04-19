import { _common,_estimatePage,_validate,_mainView,_boqPage,_projectPage, _wicpage, _package} from "cypress/pages";
import { app, tile, cnt } from "cypress/locators";
const allure = Cypress.Allure.reporter.getInterface();

const PROJ_N = "PRJ" + Cypress._.random(0, 999);
const PROJNAME = "PRO" + Cypress._.random(0, 999);
const CLERKNAME = "HS";
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_STRCU_DESC2 = "BOQ-STRC-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.65 | Copy tender price to boq item in price adjustment module");

describe("EST- 1.65 | Copy tender price to boq item in price adjustment module", () => {
  beforeEach(function () {
    cy.fixture(
      "estimate/est-1.65-Copy-tender-price-to-BoQ-item-in-Price-adjustment-module.json"
    ).then((data) => {
      this.data = data;
    });
  });

  before(function () {
    cy.preLoading(
      Cypress.env("adminUserName"),
      Cypress.env("adminPassword"),
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName")
    );

    cy.fixture(
      "estimate/est-1.65-Copy-tender-price-to-BoQ-item-in-Price-adjustment-module.json"
    ).then((data) => {
      this.data = data;
      
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.create_newRecord(cnt.uuid.Projects);
            _projectPage.enterRecord_toCreateProject(PROJ_N, PROJNAME, CLERKNAME);
            cy.SAVE();
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar("standard", PROJ_N).pinnedItem();
    });
  });

  it("TC - Create new boq header and BoQ structure", function () {
    const requiredColumns = this.data.createNewBoQ;
    const requiredColumnsbOq = this.data.CreateNewBoQStructure;
    const BoQStructureInputs =this.data.CreateNewBoQStructure.boQStructureInput;
    _common.openTab(app.tabBar.BoQs).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
      _common.setup_gridLayout(cnt.uuid.BOQS, requiredColumns.Column_Headers);
     });
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(BOQ_DESC);
    cy.SAVE();
    _boqPage.textOfBoQCode(app.GridCells.BRIEF_INFO);
    _common.clickOn_toolbarButton(cnt.uuid.BOQS);
    _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 0);
    _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES,requiredColumnsbOq.Column_Headers);
    _boqPage.enterRecord_toCreateBoQStructure(BOQ_STRCU_DESC2,BoQStructureInputs.quantity,BoQStructureInputs.unitRate,BoQStructureInputs.uom);
    cy.SAVE();
  });

  it("TC - Create new estimate", function () {
    const EstimateInputs = this.data.CreateEstimate.CreateEstimateInputs;
    const standardInputs = this.data.CreateEstimate.SidebarInputs;
    const requiredColumns = this.data.CreateEstimate.Column_Headers;

    _common.openSidebarOption(standardInputs.searchby)
           .search_fromSidebar(standardInputs.Quickstart, standardInputs.ModuleName);
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, requiredColumns);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE,EST_DESC,EstimateInputs.rubicCategory,EstimateInputs.estimateType);
    _estimatePage.textOfEstimateCode();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
  });

  it("TC - Generate Line item by wizard", function () {
    const LineItemInputs = this.data.GenrateLineItemFromBoQ.sidebarInputs;
    const requiredColumns = this.data.GenrateLineItemFromBoQ;
    _common.openTab(app.TabBar.ESTIMATEByBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BoQ_EstimateByBoQ,app.FooterTab.BOQs,2);
      _common.openTab(app.TabBar.ESTIMATEByBOQ).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS,app.FooterTab.LINE_ITEMS,2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,requiredColumns.Column_Headers);
      });
      _common.openSidebarOption(LineItemInputs.searchBy)
             .search_fromSidebar(LineItemInputs.Wizard,LineItemInputs.genarateLineItems);
      _boqPage.generate_LineItemBySendingInputValue();
    });
  });

  it('TC - Assign resource to the line item', function () {
    const resourceinputs = this.data.ResourcePageInputs.createResource
    const resColumn = this.data.ResourcePageInputs.ResourceColumn_header
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES,app.FooterTab.RESOURCES, 3);
      _common.setup_gridLayout(cnt.uuid.RESOURCES,resColumn);
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES)
    _estimatePage.enterRecord_toCreateMaterialResource(resourceinputs.shortKey,resourceinputs.Value)
   cy.SAVE()
  });

  it("TC - Update adjustment price WQ", function () {
    const priceAdjustinputs = this.data.PriceAdjustInputs.priceAdjust
    const priceAdjustColumnHeader = this.data.PriceAdjustInputs.ColumnHeader
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PRICEADJUSTMENT,app.FooterTab.PRICEADJUSTMENT, 3);
      _common.setup_gridLayout(cnt.uuid.PRICEADJUSTMENT,priceAdjustColumnHeader);
      _validate.set_ColumnAtTop(["Adjusted Price WQ"],cnt.uuid.PRICEADJUSTMENT)
    });
    _common.maximizeContainer(cnt.uuid.PRICEADJUSTMENT)
    cy.wait(1000)
   
    _estimatePage.updateRecordTo_AdjustPriceWQ(priceAdjustinputs.wqadjustmentprice,BOQ_STRCU_DESC2)
    cy.SAVE().REFRESH_CONTAINER()
    _common.getText_fromCell(cnt.uuid.PRICEADJUSTMENT,app.GridCells.WQ_ADJUSTMENT_PRICE).then(($ele1: JQuery<HTMLElement>) => {
      var adjustedPriceWq=parseFloat($ele1.text()).toFixed(2)
      Cypress.env("ADJUSTED_PRICE_WQ",adjustedPriceWq)
      })
   

  });

  it("TC - Copy tender price and verify it with boq item", function () {
   
    const priceAdjustColumnHeader = this.data.PriceAdjustInputs.ColumnHeader
    const Estimate = this.data.GenrateLineItemFromBoQ.Column_Headers;
    const standardInputs = this.data.CreateEstimate.SidebarInputs;
    const requiredColumns = this.data.createNewBoQ;
    const requiredColumnsbOq = this.data.CreateNewBoQStructure;


    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PRICEADJUSTMENT,app.FooterTab.PRICEADJUSTMENT, 3);
      _common.setup_gridLayout(cnt.uuid.PRICEADJUSTMENT,priceAdjustColumnHeader);
    });
     
    _estimatePage.copyTenderPrice("spaceToUp","option2")
    _common.minimizeContainer(cnt.uuid.PRICEADJUSTMENT)

    _common.openSidebarOption(standardInputs.searchby)
           .search_fromSidebar(standardInputs.Quickstart, standardInputs.ModuleName);


    _common.openTab(app.tabBar.BoQs).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, requiredColumns.Column_Headers);
        });
        cy.REFRESH_CONTAINER().wait(1000)
        _common.clear_subContainerFilter(cnt.uuid.BOQS);

    _boqPage.textOfBoQCode(app.GridCells.BRIEF_INFO);
    _common.clickOn_toolbarButton(cnt.uuid.BOQS);
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
           _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
           cy.REFRESH_CONTAINER()
    });

      _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BRIEF_INFO,BOQ_STRCU_DESC2)
      cy.REFRESH_CONTAINER()
      _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES,app.gridCells.FINALPRICE).then(($ele1: JQuery<HTMLElement>) => {
        var finalPrice=parseFloat($ele1.text()).toFixed(2)
        expect(finalPrice).to.equals(Cypress.env("ADJUSTED_PRICE_WQ"));
        })
  });
});

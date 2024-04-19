import { _common, _estimatePage, _validate, _mainView, _boqPage } from 'cypress/pages';
import { app, tile, cnt } from "cypress/locators";
const allure = Cypress.Allure.reporter.getInterface();

  const EST_CODE = '1' + Cypress._.random(0, 999);
  const EST_DESC = 'EST-DESC-' + Cypress._.random(0, 999);
  const BOQ_STRCU_DESC2 = 'BOQ-STRC-DESC-' + Cypress._.random(0, 999);
  const BOQ_DESC = 'BOQ-DESC-' + Cypress._.random(0, 999);
  
  allure.epic('ESTIMATE');
  allure.feature('Estimate');
  allure.story('EST- 2.2 | Generating line items from the associated BOQ and assigning resources manually (Material and cost code)');
  
  describe('EST- 2.2 | Generating line items from the associated BOQ and assigning resources manually (Material and cost code)', () => {
    beforeEach(function () {
      cy.fixture('estimate/est-2.2-generating-line-items-from-the-associated-BOQ-and-assigning-resources-manually-material-and-cost-code.json').then((data) => {
        this.data = data;
      });
    });
  
    before(function () {
      cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
  
      cy.fixture('estimate/est-2.2-generating-line-items-from-the-associated-BOQ-and-assigning-resources-manually-material-and-cost-code.json').then((data) => {
        this.data = data;
        const standardInputs = this.data.Prerequisites.SidebarInputs;
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.openSidebarOption('Search').delete_pinnedItem().search_fromSidebar(standardInputs.searchType, Cypress.env('PROJECT_NUMBER')).pinnedItem();
      });
    });
  
    it('TC - Create new BoQ header and BoQ structure', function () {
      const boqPageColumns = this.data.CreateNewBoQStructure.ColumnHeaders;
      const boQStructureInputs = this.data.CreateNewBoQStructure.BoQStructureInputs;
      _common.openTab(app.tabBar.BoQs).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
      });
      _common.clear_subContainerFilter(cnt.uuid.BOQS);
      _common.create_newRecord(cnt.uuid.BOQS);
      _boqPage.enterRecord_toCreateBoQ(BOQ_DESC);
      cy.SAVE();
      _boqPage.textOfBoQCode();
  
      _common.clickOn_toolbarButton(cnt.uuid.BOQS);
      _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, boqPageColumns);
      });
      _boqPage.enterRecord_toCreateBoQStructure(BOQ_STRCU_DESC2, boQStructureInputs.quantity, boQStructureInputs.unitRate, boQStructureInputs.uom);
    });
  
    it('TC - Create new estimate', function () {
      const EstimateInputs = this.data.EstimatePageInputs.CreateEstimate;
      const standardInputs = this.data.Prerequisites.SidebarInputs;
      const requireColumns = this.data.EstimatePageInputs.ColumnHeaders;
      _common.openSidebarOption(standardInputs.searchby).search_fromSidebar(standardInputs.Quickstart, standardInputs.ModuleName);
      _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE, requireColumns);
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
      _common.create_newRecord(cnt.uuid.ESTIMATE);
      _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, EstimateInputs.rubicCategory, EstimateInputs.estimateType);
      _estimatePage.textOfEstimateCode();
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
    });
  
    it('TC - Generate line item from BoQ by wizard and update line item', function () {
      const requireColumns = this.data.GenrateLineItemFromBoQ.Column_Headers;
      const LineItemSidebar = this.data.GenrateLineItemFromBoQ.sidebarInputs;
      _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, requireColumns);
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.openSidebarOption(LineItemSidebar.searchBy).search_fromSidebar(LineItemSidebar.Wizard, LineItemSidebar.genarateLineItems);
      _boqPage.generate_LineItemBySendingInputValue();
    });
  
    it('TC - Assign material and costcode resources to the line item', function () {
      const resourceinputs = this.data.AssignResource.ResourceInputs;
      const resourcesGrid = this.data.AssignResource.column_headers;
      _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        cy.wait(2000);
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
        _common.setup_gridLayout(cnt.uuid.RESOURCES, resourcesGrid);
      });
      _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
      _common.create_newRecord(cnt.uuid.RESOURCES);
      _estimatePage.enterRecord_toCreateResource(resourceinputs.shortKey1, resourceinputs.costCode1, resourceinputs.quantity1);
      cy.SAVE();
      cy.wait(2000);
      _common.create_newRecord(cnt.uuid.RESOURCES);
      _estimatePage.enterRecord_toCreateMaterialResource(resourceinputs.shortKey2, resourceinputs.costCode2);
      _common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, resourceinputs.quantity2);
      cy.SAVE();
      cy.wait(2000);
      _common.select_allContainerData(cnt.uuid.RESOURCES);
      _common.collapseAll(cnt.uuid.RESOURCES);
    });
  
    it('TC - Verify resources assigned with the line item by cost total ', function () {
      _estimatePage.verify_costTotalOfResources_WithLineItemCostTotal();
    });
  });

import cypress from "cypress";
import { tile, app, cnt } from "cypress/locators";
import { _common, _controllingUnit, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView } from "cypress/pages";


const allure = Cypress.Allure.reporter.getInterface();

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 1.5 | Update boq package from wizard estimate screen for selected line item");

describe("PCM- 1.5 | Update boq package from wizard estimate screen for selected line item", () => {
  beforeEach(function () {
    cy.fixture("pcm/pcm-1.5-update-boq-package-from-wizard-estimate-screen-for-selected-line-item.json").then((data) => {
      this.data = data
    })
  })

  before(function () {
    cy.preLoading(
      Cypress.env("adminUserName"),
      Cypress.env("adminPassword"),
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName")
    );

    cy.fixture("pcm/pcm-1.5-update-boq-package-from-wizard-estimate-screen-for-selected-line-item.json").then((data) => {
      this.data = data
      const standerdInputs = this.data.Prerequisites.SidebarInputs
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    })
  });
  after(() => {
    cy.LOGOUT();
  });
  it('TC - Create new BoQ header and BoQ structure', function () {
    const BoQInputs = this.data.CreateNewBoq.CreateBoQ
    const requiredColumn = this.data.CreateNewBoq.Column_header
    const BoQStructureInputs = this.data.CreateNewBoQStructure.BoQStructureInputs
    const reqColumn = this.data.CreateNewBoQStructure.Column_header

    Cypress.env("boqStructuredes", BoQStructureInputs.description + Cypress._.random(0, 999))
    _common.openTab(app.tabBar.BoQs).then(function () {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
      _common.setup_gridLayout(cnt.uuid.BOQS, requiredColumn)

    })
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS)
    _boqPage.enterRecord_toCreateBoQ(BoQInputs.newCode);
    cy.SAVE();
    _boqPage.textOfBoQCode();
    _common.clickOn_toolbarButton(cnt.uuid.BOQS)
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(function () {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, reqColumn)

    })
    _boqPage.enterRecord_toCreateBoQStructure(Cypress.env("boqStructuredes"), BoQStructureInputs.quantity, BoQStructureInputs.unitRate, BoQStructureInputs.uom);
    cy.SAVE();
  });
  it('TC - Create new estimate', function () {
    const EstimateInputs = this.data.EstimatePageInputes.CreateEstimate;
    const requiredColumn = this.data.EstimatePageInputes.Column_header;

    _mainView.goToWorkspace();
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, requiredColumn);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE)
    _estimatePage.enterRecord_toCreateEstimateHeader(EstimateInputs.newCode, EstimateInputs.description, EstimateInputs.rubicCategory, EstimateInputs.estimateType);
    _estimatePage.textOfEstimateCode();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
  });

  it('TC - Genrate line item and assign resource to it', function () {
    const LineItemInputs = this.data.CreateNewLineItemRecord.SidebarInputes;
    const EditLineItemInputs = this.data.CreateNewLineItemRecord.EditLineItem;
    const reqColumn = this.data.CreateNewLineItemRecord.LIColumn_header;

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, reqColumn);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.openSidebarOption(LineItemInputs.Wizard).search_fromSidebar(LineItemInputs.Wizard1, LineItemInputs.genarateLineItems);
    _boqPage.generate_LineItemBySendingInputValue();
    _common.openSidebarOption(LineItemInputs.Wizard);
    _estimatePage.edit_InputField(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, EditLineItemInputs.quantity)
    cy.wait(500).then(() => {
      _common.getTextfromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TOTAL)
    })
    const resourceInputs = this.data.ResourceRecord.CreateNewResource;
    const resColumn = this.data.ResourceRecord.ResourceColumn_header;
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, resColumn);
    });
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey, resourceInputs.code1)
    cy.SAVE();
  });
  it("TC - Create boq package from wizards option", function () {

    const Package = this.data.CreateBoQPackage.Package;
    const PackageColumn = this.data.CreateBoQPackage.PackageColumn_header;
    const reqColumn = this.data.CreateBoQPackage.Column_header;
    const standerdInputs = this.data.Prerequisites.SidebarInputs
    _common.openSidebarOption(standerdInputs.Wizard).search_fromSidebar(standerdInputs.wizard, "Create/Update BoQ Package");
    _package.enterRecord_toCreateBoQPackage_FromWizard("LineItemWithResource", Package.Scope, Package.groupingstructure, Package.ProcurementStructure, null, null, Package.transferFrom)
    _common.openTab(app.TabBar.PACKAGE).then(function () {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 3);
      _common.setup_gridLayout(cnt.uuid.PACKAGE, PackageColumn)
    })
    _common.openSidebarOption(standerdInputs.Wizard).search_fromSidebar(standerdInputs.wizard, "Change Package Status");
    _common.changeStatus_fromModal("In-Progress")
    _common.openTab(app.TabBar.BOQBASED).then(function () {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 3);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, reqColumn)
    })
    _package.getVerify_BoQDetails_With_BoQStructure(cnt.uuid.BOQ_STRUCTURE)
  })

  it('TC - Update line item quantity and Verify update package successfully;', function () {
    const EditLineItemInputs = this.data.CreateNewLineItemRecord.EditLineItem
    const UpdateBoQSidebar = this.data.UpdateBoQPackage.SidebarInputes
    const UpdateBoQ = this.data.UpdateBoQPackage.UpdateBoQ
    const standerdInputs = this.data.Prerequisites.SidebarInputs

    _common.openSidebarOption(standerdInputs.QuickStart);
    _common.search_fromSidebar(standerdInputs.quickstart, standerdInputs.project);
    cy.wait(5000) //required wait
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
    });
    _common.select_rowInContainer(cnt.uuid.ESTIMATE)
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
    cy.wait(5000) //required wait
    _common.clickOn_cellHasIcon(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.INFO, app.GridCellIcons.ICO_BASE_LINE)
    _estimatePage.edit_InputField(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, EditLineItemInputs.quantity1)
    cy.wait(2000).then(() => {
      _common.getTextfromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TOTAL)
      cy.log(Cypress.env("Text"));
    })
    _common.openSidebarOption(standerdInputs.Wizard).search_fromSidebar(standerdInputs.wizard, UpdateBoQSidebar.updateBoQ);
    _package.update_BoQPackages(UpdateBoQ.estimateScope, UpdateBoQ.createBoQ, UpdateBoQ.transferFrom)
    cy.REFRESH_CONTAINER()
    _common.openSidebarOption(standerdInputs.QuickStart);
    _common.search_fromSidebar(standerdInputs.quickstart, standerdInputs.package);
    cy.wait(5000).then(() => {
      _package.getVerify_BoQDetails_With_BoQStructure(cnt.uuid.BOQ_STRUCTURE)
    })
  });
  it('TC - Verify recalculated BOQ item container and total container', function () {
    const EditLineItemInputs = this.data.CreateNewLineItemRecord.EditLineItem
    const UpdateBoQSidebar = this.data.UpdateBoQPackage.SidebarInputes
    const UpdateBoQ = this.data.UpdateBoQPackage.UpdateBoQ
    const standerdInputs = this.data.Prerequisites.SidebarInputs

    _common.openSidebarOption(standerdInputs.QuickStart);
    _common.search_fromSidebar(standerdInputs.quickstart, standerdInputs.Estimate);
    cy.wait(5000) //required wait
    _estimatePage.edit_InputField(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, EditLineItemInputs.quantity2)
    cy.wait(2000).then(() => {
      _common.getTextfromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TOTAL)
      cy.log(Cypress.env("Text"));
    })
    _common.openSidebarOption(UpdateBoQSidebar.Wizard).search_fromSidebar(UpdateBoQSidebar.Wizard1, UpdateBoQSidebar.updateBoQ);
    _package.update_BoQPackages(UpdateBoQ.estimateScope, UpdateBoQ.createBoQ, UpdateBoQ.transferFrom)
    cy.REFRESH_CONTAINER()
    _common.openSidebarOption(standerdInputs.QuickStart);
    _common.search_fromSidebar(standerdInputs.quickstart, standerdInputs.package);
    cy.wait(3000).then(() => {
      _package.getVerify_BoQDetails_With_BoQStructure(cnt.uuid.BOQ_STRUCTURE)
    })
  })
})

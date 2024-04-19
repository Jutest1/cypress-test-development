import { tile, app, cnt, btn } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package } from "cypress/pages";

const allure = Cypress.Allure.reporter.getInterface();
const Packagecode1 = "Packagecode1";
const Packagecode2 = "Packagecode1";
allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.4 | Create requisition from a material package")

describe('PCM- 2.4 | Create requisition from a material package', () => {

  beforeEach(function () {
    cy.fixture("pcm/pcm-2.4-create-requisition-from-a-material-package.json").then((data) => {
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

    cy.fixture("pcm/pcm-2.4-create-requisition-from-a-material-package.json").then((data) => {
      this.data = data
      const standardInputs = this.data.Prerequisites.SidebarInputs
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    })
  });
  /*   after(() => {
      cy.LOGOUT();
    }); */
  it('TC - Create new estimate', function () {
    const EstimateInputs = this.data.EstimatePageInputs.CreateEstimate
    const requireColumns = this.data.EstimatePageInputs.ColumnHeaders;
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, "Estimate")
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, requireColumns)
    })
    Cypress.env("estimateDesc", EstimateInputs.description + Cypress._.random(0, 999))
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE)
    _estimatePage.enterRecord_toCreateEstimateHeader(EstimateInputs.newCode, Cypress.env("estimateDesc"), EstimateInputs.rubicCategory, EstimateInputs.estimateType);
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
  });

  it('TC - Create new line item with quantity', function () {
    const lineIteminputs = this.data.LineItemInputs.LineItem
    const footerTab = this.data.footersTabs.Tabs
    const requireColumns = this.data.LineItemInputs.ColumnHeaders;
    Cypress.env("LineItemDesc", lineIteminputs.lineItemDesc + Cypress._.random(0, 999))
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, "Line Items")
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, requireColumns)
    })
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    _estimatePage.enterRecord_toCreateLineItem(Cypress.env("LineItemDesc"), lineIteminputs.quantity, lineIteminputs.uom)
    cy.SAVE()
    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, Cypress.env("LineItemDesc"))
  });

  it('TC - Assign resource to the line item', function () {
    const resourceinputs = this.data.ResourcePageInputs.createResource
    const ResourceData = this.data.ResourcePageInputs.Footers;
    const resourcesGrid = this.data.ResourcePageInputs.column_headers;
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, ResourceData.FootersTab, 3);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, resourcesGrid)
    })
    _common.maximizeContainer(cnt.uuid.RESOURCES)
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES)
    _estimatePage.enterRecord_toCreateMaterialResource(resourceinputs.shortKey, resourceinputs.costCode)
    _common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, resourceinputs.quantity)
    cy.SAVE()
    cy.wait(1000)
    _package.get_qtyTotal_ofResources()
    cy.SAVE()
    _common.minimizeContainer(cnt.uuid.RESOURCES)
  });

  it('TC - Create material package', function () {
    const sideBarAction = this.data.sidebarInputs.sidebar
    const packageInputs = this.data.CreateMaterialPkg.SelectCriteria
    _common.openSidebarOption(sideBarAction.wizard)
    _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.materialPackage)
    _modalView.findModal().findCheckbox_byLabelnModal(packageInputs.Checkboxinputclass, packageInputs.MultiPackageAssignmentModel, 0).check();
    _estimatePage.enterRecord_toCreatePackage_wizard(packageInputs.MaterialCostCode, null, null, null)
  });

  it('TC - Change status of the material package', function () {
    const sideBarAction = this.data.sidebarInputs.sidebar
    const resourceinputs = this.data.ResourcePageInputs.createResource
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.setDefaultView(app.TabBar.PACKAGE)
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 4);
    });
    _common.saveCellDataToEnv(cnt.uuid.PACKAGE, app.GridCells.CODE, Packagecode1)
    _common.openSidebarOption(sideBarAction.wizard)
    _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.packageStatusOption)
    _common.changeStatus_fromModal(sideBarAction.packageStatus)
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGEITEM, app.FooterTab.ITEMS, 1)
      _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEM)
    });
    _common.maximizeContainer(cnt.uuid.PACKAGEITEM)
    _common.create_newRecord(cnt.uuid.PACKAGEITEM)
    _package.assingItems_ByMaterialNumber(resourceinputs.costCode2, resourceinputs.quantity)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.PACKAGEITEM)

  });

  it('TC - Verify Item Scope replacement in package module', function () {
    const resourceinputs = this.data.ResourcePageInputs.createResource
    const sideBarAction = this.data.sidebarInputs.sidebar

    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 3);

    })
    _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
    _common.select_rowHasValue(cnt.uuid.PACKAGEITEMS, resourceinputs.costCode)
    _common.openSidebarOption(sideBarAction.wizard)
    _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.ItemScopeReplacement)
    _common.selectRowHasValue_inModal(resourceinputs.costCode2, 1)
    _common.setCell_checkboxValue_Inmodal(app.GridCells.IS_CHECKED, "check")
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    cy.SAVE()
  })
  it('TC - Create requisition from material package', function () {
    const Column_RequisitionItems = this.data.Column_RequisitionItems;
    const resourceinputs = this.data.ResourcePageInputs.createResource
    const sideBarAction = this.data.sidebarInputs.sidebar
    _common.openSidebarOption(sideBarAction.wizard)
    _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.createRequisition)
    _modalView.findModal().acceptButton(btn.buttonText.gotoRequisition)
    cy.wait(3000)
    _common.openTab(app.tabBar.Main).then(() => {
      _common.setDefaultView(app.tabBar.Main)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, Column_RequisitionItems)
    });
    _common.select_rowInContainer(cnt.uuid.REQUISITIONITEMS)
    _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, resourceinputs.costCode2)
    _validate.verify_recordNotPresentInContainer(cnt.uuid.REQUISITIONITEMS, resourceinputs.costCode)
  });

  it('TC - Create second material package with Multi Package Assignment Model', function () {
    const sideBarAction = this.data.sidebarInputs.sidebar
    const packageInputs = this.data.CreateMaterialPkg.SelectCriteria
    const standardInputs = this.data.Prerequisites.SidebarInputs
    _common.openSidebarOption(standardInputs.Quickstart)
    _common.search_fromSidebar(standardInputs.quickstart, standardInputs.project)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, "Estimate")
    })
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.search_inSubContainer(cnt.uuid.ESTIMATE,Cypress.env("estimateDesc"))
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, "Line Items")
    })
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.openSidebarOption(sideBarAction.wizard)
    _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.materialPackage)
    _modalView.findModal().findCheckbox_byLabelnModal(packageInputs.Checkboxinputclass, packageInputs.MultiPackageAssignmentModel, 0).check();
    _estimatePage.enterRecord_toCreatePackage_wizard(packageInputs.MaterialCostCode, null, null, null)
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 4);
    });
    _common.saveCellDataToEnv(cnt.uuid.PACKAGE, app.GridCells.CODE, Packagecode2)
  });

  it("TC - Create contract from package", function () {
    const sideBarAction = this.data.sidebarInputs.sidebar
    _common.openSidebarOption(sideBarAction.wizard)
    _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.CreateContract);
    _estimatePage.create_contractFrom_package(sideBarAction.BuisnessPartner)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS);
    });
    _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.clickGotoButtonToolBarAndSelectModule(cnt.uuid.PROCUREMENTCONTRACT, sideBarAction.Package)
    _common.waitForLoaderToDisappear()

  })

  it('TC - Verify package status is contracted ', function () {
    const sideBarAction = this.data.sidebarInputs.sidebar
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 4);
    });
    _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.gridCells.PACKAGESTATUS, sideBarAction.Contracted)
  });
})
import { tile, app, cnt } from "cypress/locators";
import AppLayout from "cypress/locators/app-layout";
import { _modalView,_rfqPage,_bidPage,_billPage,_boqPage,_common,_estimatePage,_package,_projectPage, _saleContractPage,_salesPage,_validate,_wipPage,} from "cypress/pages";
import { SalesPage } from "cypress/pages/module/sales/sales/sales-page";

const allure = Cypress.Allure.reporter.getInterface();
allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.23 | Add new resource to existing line item of estimate, from resources that are manually added to package after generating package from estimate.");

    describe("PCM- 2.23 | Add new resource to existing line item of estimate, from resources that are manually added to package after generating package from estimate)", () => {
  beforeEach(function () {
    cy.fixture("pcm/PCM-2.23-Add-new-resource-existing-line-item-estimate-from-resources-are-manually-package-after-generating-package-estimate.json"
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
    cy.fixture("pcm/pcm-2.22-Add-new-line-item-respective-to-resources-AFTER-generating-package-from-estimate.json").then((data) => {
      this.data = data;
      const standerdInputs = this.data.Prerequisites.SidebarInputs;
      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openSidebarOption(standerdInputs.Search).delete_pinnedItem();
      _common.search_fromSidebar(standerdInputs.searchType,Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });
});
after(() => {
  cy.LOGOUT();
});
it("TC - Create new Estimate having line item and material resource to it", function () {
    const estimateInputs = this.data.Estimate.EstimateHeaderInputs;
    const resourceInputs = this.data.Estimate.ResourceInputs;
    const footer = this.data.Inputs.footerOptions;

    _common.openTab(app.tabBar.estimate).then(() =>{
    _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
   // _common.setup_gridLayout(cnt.uuid.ESTIMATE,{[Description:]})
    });

    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimateHeader(estimateInputs.code,estimateInputs.description,estimateInputs.rubricCategory,estimateInputs.estimateType);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
    cy.wait(5000)

    _common.openTab(app.tabBar.estimateLineItem).then(() =>{
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      });

    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(estimateInputs.LineItem1,estimateInputs.Quantity,estimateInputs.Uom);
    cy.SAVE();
});

it("TC - Add Resource for selected line item", function () {
    const sidebar = this.data.Inputs.SidebarOptions;
    const resourceInputs = this.data.Estimate.ResourceInputs;
    const footer = this.data.Inputs.footerOptions;
    const budgetInput = this.data.GenerateBudget.BudgetInputs;

    _common.openTab(app.tabBar.estimateLineItem).then(() =>{
      _common.select_tabFromFooter(cnt.uuid.RESOURCES,app.FooterTab.RESOURCES, 4);
      });

    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateMaterialResource(resourceInputs.shortKey,resourceInputs.code,"100");
    _common.enterRecord_inNewRow(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,resourceInputs.Quantity);
    cy.SAVE();
    cy.wait(2000);
    cy.REFRESH_CONTAINER();
    cy.wait(2000);
    _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, footer.Lineitems);
    _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS);
    cy.wait(2000);
    _common.select_tabFromFooter(cnt.uuid.RESOURCES, footer.Resources);
    _common.select_allContainerData(cnt.uuid.RESOURCES);
    _common.openSidebarOption(sidebar.wizard1);
    _common.search_fromSidebar(sidebar.wizard2, "Generate Budget from DJC");
    cy.wait(2000);
    _estimatePage.generate_BudgetForLineItem(budgetInput.XFactor,budgetInput.EstimateScope,budgetInput.EstimateScopeIndex,budgetInput.BugetFrom,budgetInput.BugetFromIndex)   
});

it("TC - Create Material Package from Estimate", function () {
    const sidebar = this.data.Inputs.SidebarOptions;
    const wizard = this.data.Inputs.wizardOptions;
    const packageInputs = this.data.Package.criteria;
    const status = this.data.Inputs.statusOption;
    const Newitem = this.data.Addnewitem;
    _common.openSidebarOption(sidebar.wizard1);
    _common.search_fromSidebar(sidebar.wizard2, wizard.CreateMaterialPackage);
    _estimatePage.enterRecord_toCreatePackage_wizard(packageInputs.MaterialandCostCode);
    cy.SAVE();
    cy.wait(10000);
    _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, "Items");
    cy.wait(2000);
    _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS);
    _common.create_newRecord(cnt.uuid.PACKAGEITEMS);
    _package.assingItems_toPackage(Newitem.Itemdescription1,Newitem.Quantity,Newitem.structure,Newitem.UoM,Newitem.MaterialNumber);
    cy.SAVE();
    cy.wait(2000);
    _common.openSidebarOption(sidebar.wizard1);
    _common.search_fromSidebar(sidebar.wizard2, "Update Estimate");
    cy.wait(2000);
    let checkboxLabelName = new Map<string, string>();
    checkboxLabelName.set("Update Estimate from linked Procurement BoQ item and material item","unchecked");
    checkboxLabelName.set("Create new Line Item to below specified Estimate for new Procurement BoQ item and Material Item","checked");
    checkboxLabelName.set("Create new Line Item for new Material Item","checked");
    checkboxLabelName.set("Create new Line Item for new Procurement BoQ item","unchecked");
    _estimatePage.openModalContainerByDownArrow();
    _estimatePage.fromWizard_UpdateEstimate(checkboxLabelName);
    _modalView.findModal().acceptButton("OK");
    cy.SAVE();
    cy.wait(3000);
    cy.REFRESH_CONTAINER();
    cy.wait(3000);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar("quickstart", "Estimate");
    cy.wait(5000);
});

it("TC - Get Estimate Line Items Cost Total by generating budget", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar("quickstart", "Estimate");
    cy.wait(5000);
    cy.REFRESH_CONTAINER();
    cy.wait(3000);
    _estimatePage.addition_Of_LineItemFields(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL);
});

it("TC - Verify resource Cost Total with Package itemTotalprice ", function () {
    const footer = this.data.Inputs.footerOptions;
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar("quickstart", "Package");
    cy.wait(10000);
    _common.select_tabFromFooter(cnt.uuid.TOTALS,"Total");
    _common.search_inSubContainer(cnt.uuid.TOTALS,"Total")
    _validate.verify_PackageTotal_with_CostTotal();
  });
});

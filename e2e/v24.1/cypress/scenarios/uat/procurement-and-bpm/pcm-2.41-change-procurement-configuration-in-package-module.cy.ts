import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig } from "cypress/pages";
import { app, tile, cnt, generic, btn } from "cypress/locators";
const allure = Cypress.Allure.reporter.getInterface();
const LINE_ITEM_COST = "LINE_ITEM_COST" + Cypress._.random(0, 9999);
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "LINE_ITEM_DESC_" + Cypress._.random(0, 999);
allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.41 | Change Procurement configuration in package module");
describe("PCM- 2.41 | Change Procurement configuration in package module", () => {

    beforeEach(function () {
        cy.fixture("pcm/pcm-2.41-change-procurement-configuration-in-package-module.json").then((data) => {
          this.data = data;
        });
    });
    
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("pcm/pcm-2.41-change-procurement-configuration-in-package-module.json").then((data) => {
          this.data = data;
          const standardInputs = this.data.Prerequisites.SidebarInputs;
          /* Open desktop should be called in before block */
          _common.openDesktopTile(tile.DesktopTiles.PROJECT);
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
          _common.search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        });
    });

    after(() => {
        cy.LOGOUT();
    });
    
    it("TC - Create estimate header", function() {
        const estimateInputs = this.data.Estimate.EstimateHeaderInputs;
        const estimateColumn=this.data.Headers.Column_Estimate
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE,estimateColumn)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, estimateInputs.rubricCategory, estimateInputs.estimateType);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);   
    });  

    it("TC - Create line item", function() {
        const estimateLineItemColumn = this.data.Headers.Column_EstimateLineItem;
        const lineItem = this.data.LineItem;
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, estimateLineItemColumn);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem( LINE_ITEM_DESC, lineItem.quantity, lineItem.uom, null,null);
        cy.SAVE()
        cy.wait(1000)
    })

    it("TC - Assing resource to line item", function() {
        const ResourceInput = this.data.CreateResource.CreateResourceInput;
        const resoruceColumn = this.data.Headers.Column_Resource;
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
          _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
          _common.setup_gridLayout(cnt.uuid.RESOURCES, resoruceColumn);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        cy.wait(1000)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(ResourceInput.shorttKey, ResourceInput.code);
        cy.SAVE();
        cy.wait(1000);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,LINE_ITEM_DESC)
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL,LINE_ITEM_COST)
    })

    it("TC - Create/Update material package", function () {
        const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
        const wizardInputs = this.data.SidebarOptions.wizardInputs;
        const createUpdateMaterialCostCode = this.data.CreateUpdateMaterialCostCode
        const packageColumn = this.data.Headers.Column_Package;
        _common.openSidebarOption(sidebarInputs.wizard1);
        _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.CreateUpdateMaterialPackage);
        _estimatePage.enterRecord_toCreatePackage_wizard(createUpdateMaterialCostCode.CriteriaSelection,null,createUpdateMaterialCostCode.Material)      
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
            _common.setup_gridLayout(cnt.uuid.PACKAGE, packageColumn);
        }) 
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
    });

    it("TC - Verify change procurement configuration and net value in package module", function () {
        const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
        const wizardInputs = this.data.SidebarOptions.wizardInputs;
        const packageInputs = this.data.Package.PackageInputs;
        const totalsColumn = this.data.Headers.Column_Totals
        _common.openSidebarOption(sidebarInputs.wizard1);
        _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.ChangeProcurementConfiguration);
        _procurementConfig.changeProcurementConfiguration_FromWizard(packageInputs.Service,btn.ButtonText.YES)
        cy.wait(2000)  
        _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE,app.GridCells.CONFIGURATION_FK,packageInputs.Service)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TOTALS, app.FooterTab.TOTALS, 0)
            _common.setup_gridLayout(cnt.uuid.TOTALS, totalsColumn);
        }) 
        _common.search_inSubContainer(cnt.uuid.TOTALS,packageInputs.Total)
        cy.wait(2000)
        _common.assert_cellData_insideActiveRow(cnt.uuid.TOTALS,app.GridCells.VALUE_NET,Cypress.env(LINE_ITEM_COST))
    })
   
});

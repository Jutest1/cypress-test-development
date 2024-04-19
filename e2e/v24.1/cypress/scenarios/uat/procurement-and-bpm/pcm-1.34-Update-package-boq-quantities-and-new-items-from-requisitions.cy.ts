import { tile, app, cnt } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _package, _validate } from "cypress/pages";

const allure = Cypress.Allure.reporter.getInterface();
const PACKAGEBOQESC = "PACKAGEBOQESC-" + Cypress._.random(0, 999);
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const QUANTITY = "QUANTITY-" + Cypress._.random(0, 999);
const UNITRATE = "UNITRATE-" + Cypress._.random(0, 999);
const FINALPRICE = "FINALPRICE-" + Cypress._.random(0, 999);
const BOQ_OUTLINE = "BOQ_OUTLINE-" + Cypress._.random(0, 999);
allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 1.34 | Update package boq quantities and new items from requisitions");
describe("PCM- 1.34 | Update package boq quantities and new items from requisitions", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-1.34-Update-package-boq-quantities-and-new-items-from-requisitions.json").then((data) => {
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
        cy.fixture("pcm/pcm-1.34-Update-package-boq-quantities-and-new-items-from-requisitions.json").then((data) => {
            this.data = data
            const standardInputs = this.data.Prerequisites.SidebarInputs
            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        });
    });
    after(() => {
        cy.LOGOUT();
    });
    it("TC - Create new BoQ record", function () {
        const boqPageInputs = this.data.BoqStructure.BoQPageInputs
        const boqGrid = this.data.boq_ColumnHeaders.column_Headers
        const boqStructureGrid = this.data.boqStructure_ColumnHeaders.column_Headers;
        _common.openTab(app.tabBar.BoQs).then(() => {
            _common.setDefaultView(app.tabBar.BoQs)
            cy.wait(2000)
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
            _common.setup_gridLayout(cnt.uuid.BOQS, boqGrid)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(BOQ_DESC)
        cy.SAVE();
        _boqPage.textOfBoQCode();
        _common.clickOn_toolbarButton(cnt.uuid.BOQS);
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, boqStructureGrid)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _boqPage.enterRecord_toCreateBoQStructure(BOQSTRUCT_DESC, boqPageInputs.Quantity, boqPageInputs.UnitRate, boqPageInputs.Uom);
        cy.SAVE();
    });
    it("TC - Create new estimate header record and generate line item", function () {
        const DataCells: DataCells = {
            [app.GridCells.CODE]: EST_CODE,
            [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
            [app.GridCells.RUBRIC_CATEGORY_FK]: this.data.EstimateHeader.EstimateHeaderInputs.rubricCategory,
            [app.GridCells.EST_TYPE_FK]: this.data.EstimateHeader.EstimateHeaderInputs.estimateType
        }
        const sideBarAction = this.data.sidebarInputs.sidebar
        const estimateGrid = this.data.estimate_ColumnHeaders.column_headers
        const lineItemGrid = this.data.lineItem_ColumnHeaders.column_headers
        _common.openSidebarOption(sideBarAction.quickStart)
        _common.search_fromSidebar(sideBarAction.quickStart1, sideBarAction.project);
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 1);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, estimateGrid)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimateHeader_V1(DataCells);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
        cy.wait(1000)
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, lineItemGrid)
        });
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.GenerateLineItem);
        _boqPage.generate_LineItemBycode(BOQ_DESC)
        cy.wait(1500)
        cy.SAVE()
    });
    it("TC - Create BoQ package and change Package Status", function () {
        const sideBarAction = this.data.sidebarInputs.sidebar
        const boqPackageCreation = this.data.boqPackage.boqPackageInputs
        const requisitionGrid = this.data.requisition_ColumnHeaders.column_headers
        const boqStructureGrid = this.data.boqStructure_ColumnHeaders.column_Headers;
        const packageBoQCheckbox = this.data.UpdatePackageBoQ;
        const packageboq = this.data.packboqinput.column_inputs

        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.boqPackage)
        _package.enterRecord_toCreateBoQPackage_FromWizard("BoQ", boqPackageCreation.estimateScope, boqPackageCreation.grouping, boqPackageCreation.procurementStructure)
        cy.REFRESH_SELECTED_ENTITIES();
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _package.changeStatus_ofPackage_inWizard()
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.createRequisition)
        _modalView.findModal().acceptButton("Go To Requisition")
        cy.wait(1000)
        _common.openTab(app.tabBar.Main).then(() => {
            cy.wait(2000)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, requisitionGrid)
        });
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.requisitionStatus)
        cy.wait(1000)
        _common.changeStatus_fromModal(sideBarAction.StatuschangeReq)
        cy.wait(1000)
        _common.openTab(app.tabBar.REQUISITIONBOQS)
        _common.setDefaultView(app.tabBar.REQUISITIONBOQS)
        _common.openTab(app.tabBar.REQUISITIONBOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONBOQSTRUCTURE, boqStructureGrid)
        });
        _common.maximizeContainer(cnt.uuid.REQUISITIONBOQSTRUCTURE);
        cy.REFRESH_CONTAINER();
        _boqPage.enterRecord_toCreateBoQStructureUnderpackage(cnt.uuid.REQUISITIONBOQSTRUCTURE, PACKAGEBOQESC, packageboq.Quantity, packageboq.unitrate, packageboq.UOM)
        cy.SAVE()
        cy.wait(1000)
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, QUANTITY)
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONBOQSTRUCTURE,  app.GridCells.PRICE, UNITRATE)
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL, FINALPRICE)
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.BRIEF_INFO, BOQ_OUTLINE)
        cy.wait(500)
        cy.wait(4000) //** Application need time to load //  
        cy.SAVE();
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.updatePackageBoq)
        _package.updatePackageBoQ_FromWizard(packageBoQCheckbox)
        cy.wait(2000)
        _common.openTab(app.tabBar.Main)
        _common.setDefaultView(app.tabBar.Main)
        _common.openTab(app.tabBar.Main).then(() => {
            cy.wait(2000)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, requisitionGrid)
        });
        _common.maximizeContainer(cnt.uuid.REQUISITIONS);
        _common.goToButton_inActiveRow(cnt.uuid.REQUISITIONS, app.gridCells.REQUISITION_STATUS)
        cy.wait(1000)
    })

    it("TC - Verify unit rate, quantity, final price, Outline Specification in package boq structure", function () {
        const packageBoqStructureGrid = this.data.packageboqPageColumns.column_headers;
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            cy.wait(2000)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, packageBoqStructureGrid)
            _validate.set_ColumnAtTop([packageBoqStructureGrid.quantity,packageBoqStructureGrid.price,packageBoqStructureGrid.finalprice,packageBoqStructureGrid.briefinfo],cnt.uuid.BOQ_STRUCTURE)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURE);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE,app.GridCells.BRIEF_INFO,PACKAGEBOQESC)
        _common.selectActiveRow_inContainer(cnt.uuid.BOQ_STRUCTURE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.PRICE_SMALL, Cypress.env(UNITRATE));
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, Cypress.env(QUANTITY));
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL, Cypress.env(FINALPRICE));
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BRIEF_INFO, Cypress.env(BOQ_OUTLINE));
    })
})
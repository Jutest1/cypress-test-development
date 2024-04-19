import { tile, app, cnt } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _package } from "cypress/pages";

const allure = Cypress.Allure.reporter.getInterface();
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 1.16 | Create new or update requisition of updated quantities-BOQ Package");
describe("PCM- 1.16 | Create new or update requisition of updated quantities-BOQ Package", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-1.16-create-new-or-update-requisition-of-updated-quantities-boq-package.json").then((data) => {
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
        cy.fixture("pcm/pcm-1.16-create-new-or-update-requisition-of-updated-quantities-boq-package.json").then((data) => {
            this.data = data
            const standardInputs = this.data.Prerequisites.SidebarInputs
            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            cy.wait(2000)
            _common.openTab(app.tabBar.project).then(() => {
                _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        });
    });
    after(() => {
        cy.LOGOUT();
    });
    it("TC - Set requisition status under customizing", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const DATA_TYPES_COLUMN = this.data.columns.dataTypesColumn;
        const DATA_RECORDS_COLUMN = this.data.columns.dataRecordsColumn_2;
        const CUSTOMIZING_INPUT=this.data.customizingInput
    
        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.customizing);

        _common.openTab(app.tabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Entity_Types, app.FooterTab.DATA_TYPES, 0);
            _common.setup_gridLayout(cnt.uuid.Entity_Types,DATA_TYPES_COLUMN)
        })
        _common.search_inSubContainer(cnt.uuid.Entity_Types,CUSTOMIZING_INPUT.requisitionStatus)
        cy.REFRESH_CONTAINER()
        cy.wait(2000)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Entity_Types,app.GridCells.NAME,CUSTOMIZING_INPUT.requisitionStatus)
        _common.openTab(app.tabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
            _common.setup_gridLayout(cnt.uuid.INSTANCES,DATA_RECORDS_COLUMN)
        })
        _common.search_inSubContainer(cnt.uuid.INSTANCES,CUSTOMIZING_INPUT.approved)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,CUSTOMIZING_INPUT.approved)
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.gridCells.IS_PUBLISHED,BASIC_INPUTS.check)
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.gridCells.IS_ORDERED,BASIC_INPUTS.check)
        //_common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.gridCells.IS_QUOTED,BASIC_INPUTS.uncheck)
        cy.SAVE()
    });
    
    it("TC - Create new BoQ record", function () {
        const boqPageInputs = this.data.BoqStructure.BoQPageInputs
        const boqGrid = this.data.boq_ColumnHeaders.column_Headers
        const boqStructureGrid = this.data.boqStructure_ColumnHeaders.column_Headers;
        const BASIC_INPUTS = this.data.basicInputs;

        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.modulename);

        _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();
        _common.search_fromSidebar(BASIC_INPUTS.searchType,Cypress.env("PROJECT_NUMBER")).pinnedItem();
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
        _boqPage.enterRecord_toCreateBoQStructure(BOQSTRUCT_DESC, boqPageInputs.Quantity, boqPageInputs.UnitRate, boqPageInputs.Uom);
        cy.SAVE();
    });
    it("TC - Create new estimate header record and generate line item", function () {
        const estimateInputs = this.data.EstimateHeader.EstimateHeaderInputs
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
        _estimatePage.enterRecord_toCreateEstimateHeader(estimateInputs.code, EST_DESC, estimateInputs.rubricCategory, estimateInputs.estimateType);
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
        cy.wait(1500)
        cy.REFRESH_CONTAINER()
        cy.wait(2000)

    });

    it("TC - Create BoQ package and change Package Status", function () {
        const sideBarAction = this.data.sidebarInputs.sidebar
        const boqPackageCreation = this.data.boqPackage.boqPackageInputs
        const requisitionGrid = this.data.requisition_ColumnHeaders.column_headers
        const reqBoqStructureGrid = this.data.ReqboqStructure_ColumnHeaders.column_Headers;
        const revisedBoqQty = this.data.revisedBoqQuantities.boqQuantitiesInputs
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.boqPackage)
        _package.enterRecord_toCreateBoQPackage_FromWizard("BoQ", boqPackageCreation.estimateScope, boqPackageCreation.grouping, boqPackageCreation.procurementStructure)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _package.changeStatus_ofPackage_inWizard()
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.createRequisition)
        _modalView.findModal().acceptButton("Go To Requisition")
        cy.wait(1000)
        _common.openTab(app.tabBar.Main).then(() => {
            _common.setDefaultView(app.tabBar.Main)
            cy.wait(2000)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, requisitionGrid)
        });
        _common.clickGotoButtonToolBarAndSelectModule(cnt.uuid.REQUISITIONS,"Package")
        cy.wait(1000)
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.openTab(app.TabBar.BOQDETAILS).then(() => {
            _common.setDefaultView(app.TabBar.BOQDETAILS)
            cy.wait(2000)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, reqBoqStructureGrid)
        });
       
        cy.REFRESH_SELECTED_ENTITIES()
        cy.wait(2000)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BRIEF_INFO, BOQSTRUCT_DESC)
        cy.wait(500)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, revisedBoqQty.quantity1)
        cy.SAVE()
        cy.wait(1000)
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.createRequisition)
        _package.createRequisition_FromWizard(sideBarAction.modalOverWriteReqRadio, 0)
        _modalView.findModal().acceptButton("Go To Requisition")
        _common.openTab(app.tabBar.REQUISITIONBOQS).then(() => {
            _common.setDefaultView(app.tabBar.REQUISITIONBOQS)
            cy.wait(2000)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONBOQSTRUCTURE, reqBoqStructureGrid)
        });
        _common.openTab(app.tabBar.Main).then(() => {
            _common.setDefaultView(app.tabBar.Main)
            cy.wait(2000)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, requisitionGrid)
        });
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.requisitionStatus)
        cy.wait(1000)
        _common.changeStatus_fromModal(sideBarAction.StatuschangeReq)
        cy.wait(1000)
        _common.clickGotoButtonToolBarAndSelectModule(cnt.uuid.REQUISITIONS,"Package")
        cy.wait(1000)
        _common.openTab(app.TabBar.BOQDETAILS).then(() => {
            _common.setDefaultView(app.TabBar.BOQDETAILS)
            cy.wait(2000)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, reqBoqStructureGrid)
        });
        _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURE)
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURE)
        cy.REFRESH_SELECTED_ENTITIES()
        cy.wait(2000)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BRIEF_INFO, BOQSTRUCT_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, revisedBoqQty.quantity2)
        cy.SAVE()
        cy.wait(1000)
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.createRequisition)
        _package.createRequisition_FromWizard(sideBarAction.modalCreateReqRadio, 1)
        _modalView.findModal().acceptButton("Go To Requisition")
    })
})
import { tile, app, cnt, btn } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _package, _rfqPage, _validate } from "cypress/pages";

import { v4 as uuidv4 } from 'uuid';

const allure = Cypress.Allure.reporter.getInterface();
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ-"+ Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 1.41 | Price comparison BoQ-Check contract creation");
describe("PCM- 1.41 | Price comparison BoQ-Check contract creation", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-1.41-price-comparison-BoQ-check-contract-creation.json").then((data) => {
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
        cy.fixture("pcm/pcm-1.41-price-comparison-BoQ-check-contract-creation.json").then((data) => {
            this.data = data
            const sideBarAction = this.data.sidebarInputs.sidebar
            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
           _common.openTab(app.tabBar.project).then(() => {
                _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
            });
            _common.create_newRecord(cnt.uuid.Projects);
            _projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
            cy.wait(500)
            _common.openSidebarOption(sideBarAction.search).delete_pinnedItem().search_fromSidebar(sideBarAction.Standard, PRJ_NO).pinnedItem();
        })
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
        _boqPage.enterRecord_toCreateBoQStructure(BOQSTRUCT_DESC, boqPageInputs.Quantity, boqPageInputs.UnitRate, boqPageInputs.Uom);
        cy.SAVE();
    });
    it("TC - Create new Estimate header record and generate Line item and Resources", function () {
        const sideBarAction = this.data.sidebarInputs.sidebar
        const EstimateInputs = this.data.EstimateHeader.EstimateHeaderInputs;
        const estimateGrid = this.data.estimate_ColumnHeaders.column_headers
        const lineItemGrid = this.data.lineItem_ColumnHeaders.column_headers
        const resourceInputs = this.data.AssignResource.resourceInputs
        const resourcesGrid = this.data.resources_ColumnHeaders.column_headers;
        _common.openSidebarOption(sideBarAction.quickStart)
        _common.search_fromSidebar(sideBarAction.quickStart1, sideBarAction.project);
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, estimateGrid)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimateHeader(EstimateInputs.newCode, EST_DESC, EstimateInputs.rubricCategory, EstimateInputs.estimateType);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
        cy.wait(2000)
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, lineItemGrid)
        });
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.GenerateLineItem);
        _boqPage.generate_LineItemBycode(BOQ_DESC)
        cy.wait(3000)
        cy.SAVE()
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            cy.wait(2000)
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, resourcesGrid)
        });
        cy.wait(500)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey1, resourceInputs.code1);
        cy.SAVE();
    });
    it("TC - Create BoQ package,requisition,RFQ,Quote and change Status", function () {
        const sideBarAction = this.data.sidebarInputs.sidebar
        const boqPackageCreation = this.data.boqPackage.boqPackageInputs
        const requisitionGrid = this.data.requisition_ColumnHeaders.column_headers
        const packageGrid = this.data.package_ColumnHeaders.column_headers
        const rfqInputs = this.data.rfqPage.createRfq
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.boqPackage)
        _package.enterRecord_toCreateBoQPackage_FromWizard("BoQ", boqPackageCreation.estimateScope, boqPackageCreation.grouping, boqPackageCreation.procurementStructure)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.setup_gridLayout(cnt.uuid.PACKAGE,packageGrid)
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.saveCellDataToEnv(cnt.uuid.PACKAGE,app.GridCells.CODE,"PKCODE")
        _package.changeStatus_ofPackage_inWizard()
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.createRequisition)
        _modalView.findModal().acceptButton(btn.buttonText.gotoRequisition)
        cy.wait(1000)
        _common.openTab(app.tabBar.Main).then(() => {
            cy.wait(2000)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, requisitionGrid)
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.requisitionStatus)
        cy.wait(1000)
        _common.changeStatus_fromModal(sideBarAction.StatuschangeReq)
        cy.wait(1000)
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.createRFQ)
        _rfqPage.fromWizard_CreateRequestForCode([rfqInputs.BP1, rfqInputs.BP2])
        _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_RFQ)
        cy.wait(3000)
        _common.clear_subContainerFilter(cnt.uuid.Request_for_Quote)
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.changerfqStatus)
        _common.changeStatus_fromModal(sideBarAction.rfqStatus)
        cy.wait(500)
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.createQuote)
        _rfqPage.fromWizard_CreateQuote([rfqInputs.BP1, rfqInputs.BP2], ["check", "check"])
        _modalView.findModal().acceptButton(btn.buttonText.GoToQuote)
    })


    it("TC - Update BoQ Structure in Quote", function () {
        const boqStructureGrid = this.data.boqStructure_ColumnHeaders.column_Headers;
        const boqStructureColumnHeaders = this.data.boq_ColumnsHeaders.Headers;
        const rfqInputs = this.data.rfqPage.createRfq
        const boqPageInputs = this.data.BoqStructure.BoQPageInputs
        const quoteGrid = this.data.quote_ColumnHeaders.column_headers
        const sideBarAction = this.data.sidebarInputs.sidebar
        cy.wait(2000)
        _common.openTab(app.tabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Quotes, app.FooterTab.QUOTES, 1);
            _common.setup_gridLayout(cnt.uuid.Quotes, quoteGrid)
        });
        cy.wait(2000)
        _common.search_inSubContainer(cnt.uuid.Quotes,rfqInputs.BP1)
        cy.REFRESH_CONTAINER().wait(5000)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Quotes,app.GridCells.BUSINESS_PARTNER_FK,rfqInputs.BP1)
        _common.saveCellDataToEnv(cnt.uuid.Quotes,app.GridCells.SUPPLIER_FK,"SUPPLIERNO1")
        _common.openTab(app.tabBar.quoteBoQs).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QuoteBoQStructure, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.QuoteBoQStructure, boqStructureGrid)
            cy.wait(1000)
            _validate.set_ColumnAtTop(boqStructureColumnHeaders,cnt.uuid.QuoteBoQStructure)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QuoteBoQStructure,app.GridCells.BRIEF_INFO,BOQSTRUCT_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.QuoteBoQStructure, app.GridCells.PRICE,app.InputFields.INPUT_GROUP_CONTENT,boqPageInputs.updatedUR1)
        cy.SAVE().wait(4000)
        _common.saveCellDataToEnv(cnt.uuid.QuoteBoQStructure, app.GridCells.PRICE,"UNITRATE");
        _common.saveCellDataToEnv(cnt.uuid.QuoteBoQStructure,app.GridCells.FINAL_PRICE_SMALL,"FINALPRICE1");
        _common.openTab(app.tabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Quotes, app.FooterTab.QUOTES, 1);
        });
        _common.search_inSubContainer(cnt.uuid.Quotes,rfqInputs.BP2)
        cy.REFRESH_CONTAINER().wait(5000)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Quotes,app.GridCells.BUSINESS_PARTNER_FK,rfqInputs.BP2)
        _common.saveCellDataToEnv(cnt.uuid.Quotes,app.GridCells.SUPPLIER_FK,"SUPPLIERNO2")
        _common.openTab(app.tabBar.quoteBoQs).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QuoteBoQStructure, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.QuoteBoQStructure, boqStructureGrid)
            cy.wait(1000)
            _validate.set_ColumnAtTop(boqStructureColumnHeaders,cnt.uuid.QuoteBoQStructure)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QuoteBoQStructure,app.GridCells.BRIEF_INFO,BOQSTRUCT_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.QuoteBoQStructure, app.GridCells.PRICE,app.InputFields.INPUT_GROUP_CONTENT,boqPageInputs.updatedUR2)
        cy.SAVE().wait(4000)
        _common.saveCellDataToEnv(cnt.uuid.QuoteBoQStructure,app.GridCells.FINAL_PRICE_SMALL,"FINALPRICE2");
        _common.openTab(app.tabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Quotes, app.FooterTab.QUOTES, 0);
        });
        cy.wait(1000)
        _common.clear_subContainerFilter(cnt.uuid.Quotes)
        cy.wait(1000)
        _common.select_allContainerData(cnt.uuid.Quotes)
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.changeQuoteStatus)
        _common.changeStatus_ofMultipleRecord_inWizard(sideBarAction.quoteStatus)
        cy.wait(500)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Quotes,app.GridCells.BUSINESS_PARTNER_FK,rfqInputs.BP2)
        _salesPage.navigate_toContainer_usingGoToButtonInBills(cnt.uuid.Quotes,sideBarAction.priceComparisonValue)
        _common.openTab(app.tabBar.PriceComparison).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_COMPARISONBOQ, app.FooterTab.PRICE_COMPARISONBOQ, 3);
        });
        cy.wait(3000)
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.createContract)
        _saleContractPage.create_ContractInPriceComparision_fromWizard(rfqInputs.BP1,PRJ_NO)
        cy.wait(4000)
    })

    it("TC - Verify the all details in contracts", function () {
        const contractsGrid = this.data.procurementContract_ColumnHeaders.column_headers
        const rfqInputs = this.data.rfqPage.createRfq
        const ColumnsheaderNames = this.data.columnHeaders.columnsNames
        const boqStructureGrid = this.data.boqStructure_ColumnHeaders.column_Headers;
        const boqStructureColumnHeaders = this.data.boq_ColumnsHeaders.Headers;
        const boqPageInputs = this.data.BoqStructure.BoQPageInputs
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT,contractsGrid)
            _validate.set_ColumnAtTop([ColumnsheaderNames.supplier,ColumnsheaderNames.businessPartner,ColumnsheaderNames.packageCode],cnt.uuid.PROCUREMENTCONTRACT)
            cy.wait(2000)
        });
        _common.assert_cellData(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PACKAGE_FK,Cypress.env("PKCODE"))
        _common.assert_cellData(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.BUSINESS_PARTNER_FK,rfqInputs.BP1)
        _common.assert_cellData(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.SUPPLIER_FK,Cypress.env("SUPPLIERNO1"))
        _common.openTab(app.tabBar.ProcurementContractBoQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ProcurementContract_BoQStructure, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.ProcurementContract_BoQStructure,boqStructureGrid)
            _validate.set_ColumnAtTop(boqStructureColumnHeaders,cnt.uuid.ProcurementContract_BoQStructure)
            cy.wait(2000)
        });
        cy.REFRESH_CONTAINER().wait(3000)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ProcurementContract_BoQStructure,app.GridCells.BRIEF_INFO,BOQSTRUCT_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ProcurementContract_BoQStructure,app.GridCells.QUANTITY_SMALL,boqPageInputs.Quantity)

    })

    it("TC - Verify the all details in contracts-2", function () {
        const boqPageInputs = this.data.BoqStructure.BoQPageInputs
         _common.assert_cellData_insideActiveRow(cnt.uuid.ProcurementContract_BoQStructure, app.GridCells.PRICE,boqPageInputs.updatedUR2)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ProcurementContract_BoQStructure,app.gridCells.FINALPRICE,Cypress.env("FINALPRICE2"))
    })
})

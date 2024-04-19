import { tile, app, cnt, btn } from "cypress/locators";
import { _common, _estimatePage, _package, _mainView, _modalView, _sidebar, _rfqPage, _boqPage, _projectPage, _validate } from "cypress/pages";



import _ from "cypress/types/lodash";
const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const RFQ_DESC = "RFQ_DESC-" + Cypress._.random(0, 999);
const BoQS_DESC1 = "LI1-DESC-" + Cypress._.random(0, 999);
const BoQS_DESC2 = "LI2-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"

var reqCode: string;
var rfqCode: string;


allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 6.4 |  Update the estimate from the Quote module by updating the unit rate in BOQ in the BOQ structure tab");

describe("EST- 6.4 | Update the estimate from the Quote module by updating the unit rate in BOQ in the BOQ structure tab", () => {
    beforeEach(function () {
        cy.fixture("estimate/est-6.4-Update-estimate-from-quote-by-updating-unit-rate-in-boq-in-quote.json").then((data) => {
            this.data = data;
        });
    });
    before(function () {
        cy.fixture("estimate/est-6.4-Update-estimate-from-quote-by-updating-unit-rate-in-boq-in-quote.json").then((data) => {
            this.data = data;
        });
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName"));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    });
    after(() => {
		cy.LOGOUT();
	});
    it("TC - Create New Project", function () {
        const standardInputs = this.data.Prerequisites.SidebarInputs;
       
        _common.openTab(app.tabBar.project).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
        });
        _common.openSidebarOption(standardInputs.Search).delete_pinnedItem()
        _common.create_newRecord(cnt.uuid.Projects);
        _projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
        cy.SAVE();
        _common.openSidebarOption(standardInputs.Search).delete_pinnedItem().search_fromSidebar(standardInputs.searchType, PRJ_NO).pinnedItem();
    });

    it("TC - Create BOQ header and BOQ structure", function () {
        const BoQStructureInputs = this.data.CreateNewBoQStructure.BoQStructureInputs;
        const standardInputs = this.data.Prerequisites.SidebarInputs;
        const boqColumn = this.data.Headers.Column_BoQHeaders
        const boqStructureColumn = this.data.Headers.Column_BoQStruct


        _common.openTab(app.tabBar.BoQs).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, boqColumn)
        });
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(BOQ_DESC);
        cy.SAVE();
        _boqPage.textOfBoQCode();
        _common.clickOn_toolbarButton(cnt.uuid.BOQS);
       
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, boqStructureColumn)
        });
        _validate.set_ColumnAtTop([boqStructureColumn.quantity,boqStructureColumn.basuomfk,boqStructureColumn.price],cnt.uuid.BOQ_STRUCTURES)

        _boqPage.enterRecord_toCreateBoQStructure(BoQS_DESC1, BoQStructureInputs.quantity, BoQStructureInputs.unitRate, BoQStructureInputs.uom, null, null, null);
       
        cy.SAVE()
        _boqPage.get_BoQsFinalPrice()
        _boqPage.enterRecord_toCreateSecondBoQStructure(BoQS_DESC2,  BoQStructureInputs.quantity, BoQStructureInputs.unitRate, BoQStructureInputs.uom);
        cy.SAVE();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(standardInputs.searchTypeQuick, standardInputs.modulename);
    });

    it("TC - Create estimate header", function () {
        const estimateInputs = this.data.Estimate.EstimateHeaderInputs;
        const estimateColumn = this.data.Headers.Column_Estimate
        const standardInputs = this.data.Prerequisites.SidebarInputs;

       
        _common.openSidebarOption(standardInputs.Search).delete_pinnedItem()
        _common.search_fromSidebar(standardInputs.searchType, PRJ_NO).pinnedItem();

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, estimateColumn)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, estimateInputs.rubricCategory, estimateInputs.estimateType);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
    });

    it("TC - Generate BOQ line item and create Resource", function () {
        const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
        const wizardInputs = this.data.SidebarOptions.wizardInputs;
        const estimateLineItemColumn = this.data.Headers.Column_EstimateLineItem
        const resourceColumn = this.data.Headers.Column_Resource
        const resourceColumnInput = this.data.resource_Input.resorcesInput
        

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, resourceColumn)
        });
        _validate.set_ColumnAtTop([resourceColumn.isgeneratedprc,resourceColumn.commenttext,resourceColumn.costtotal],cnt.uuid.RESOURCES)

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, estimateLineItemColumn)
        });
        _common.openSidebarOption(sidebarInputs.wizard1);
        _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.GenerateLineItem);
        _boqPage.generate_LineItemBycode(BOQ_DESC);
        
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        cy.wait(200)

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
                _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
              
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,BoQS_DESC1)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateMaterialResource(resourceColumnInput.shortkey, resourceColumnInput.code);
        cy.SAVE();

        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,BoQS_DESC2)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateMaterialResource(resourceColumnInput.shortkey, resourceColumnInput.code2);
        cy.SAVE();
           
     
    });
    it("TC - Create BoQ Package from the Estimate", function () {
        const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
        const wizardInputs = this.data.SidebarOptions.wizardInputs;
        const packageinputs = this.data.Package.PackageInputs;

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
           
        });
        _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.openSidebarOption(sidebarInputs.wizard1);
        _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.CreateUpdateBoQPackage);
        _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(packageinputs.BasedOn, packageinputs.estimateScope, packageinputs.estimateScopeIndex, packageinputs.WICBoQ, packageinputs.ProcurementStructure, packageinputs.QtyType, "check")
        cy.wait(1000)//required wait
    })

    it('TC - Create requisition from Package', function () {
        const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
        const wizardInputs = this.data.Prerequisites.wizardInputs;
        const reqColumn = this.data.Headers.reqColumn_header

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        })
       
       
        _common.openSidebarOption(sidebarInputs.wizard1);
        _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.CreateRequisition);
        _common.clickOn_modalFooterButton(btn.buttonText.gotoRequisition)
        _common.openTab(app.tabBar.Main).then(() => {
            _common.setDefaultView(app.tabBar.Main)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 2)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, reqColumn)
        })
       
        _common.openSidebarOption(sidebarInputs.wizard1);
        _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.ChangeRequisitionStatus)
        _common.changeStatus_fromModal(wizardInputs.Requisitionstatus);

    });
    it('TC - Create Request For Quote from wizard and change status', function () {
        const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
        const Bidder = this.data.BidderInputs
        const reqColumn = this.data.Headers.rfqColumn
        const wizardInputs = this.data.Prerequisites.wizardInputs;

        _common.openSidebarOption(sidebarInputs.wizard1);
        _common.search_fromSidebar(sidebarInputs.wizard2,wizardInputs.CreateRRequestForQuote);
        _rfqPage.fromWizard_CreateRequestForCode([Bidder.bidder1,Bidder.bidder2]);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        cy.SAVE();
        _common.openTab(app.tabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Request_for_Quote, app.FooterTab.RFQ, 2)
            _common.setup_gridLayout(cnt.uuid.Request_for_Quote, reqColumn)
        })
       
        _common.openSidebarOption(sidebarInputs.wizard1);
        _common.search_fromSidebar(sidebarInputs.wizard2,wizardInputs.changeRfqStatus);
        _common.changeStatus_fromModal(wizardInputs.RFQstatus);
        cy.SAVE();
    });

    it('TC - Create Quote and update unit rate in BoQ structure', function () {
        const wizardInputs = this.data.Prerequisites.wizardInputs;
        const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
        const Bidder = this.data.BidderInputs
        const UpdateEstimate = this.data.UpdateEstimate
        const boqStructureColumn = this.data.Headers.Column_BoQStruct

        _common.openSidebarOption(sidebarInputs.wizard1);
        _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.CreateQuote);
        _rfqPage.fromWizard_CreateQuote([Bidder.bidder1,Bidder.bidder2]);
        _modalView.findModal().acceptButton(btn.buttonText.GoToQuote);
        cy.SAVE();
        _common.openTab(app.tabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Quotes, app.FooterTab.QUOTES, 0)
        })
        _common.openTab(app.tabBar.quoteBoQs).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QuoteBoQStructure, app.FooterTab.BOQ_STRUCTURE, 2)
            _common.setup_gridLayout(cnt.uuid.QuoteBoQStructure, boqStructureColumn)
        })
       
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QuoteBoQStructure, app.GridCells.BRIEF_INFO, BoQS_DESC1)
        _common.edit_containerCell(cnt.uuid.QuoteBoQStructure,  app.GridCells.PRICE, UpdateEstimate.UnitRateUpdated)
        _common.set_cellCheckboxValue(cnt.uuid.QuoteBoQStructure, app.GridCells.IS_FREE_QUANTITY, UpdateEstimate.chkStatus)
        _common.edit_containerCell(cnt.uuid.QuoteBoQStructure, app.GridCells.QUANTITY_SMALL, UpdateEstimate.updatedQuantity1)
        cy.SAVE()

        _common.clickOn_cellHasUniqueValue(cnt.uuid.QuoteBoQStructure, app.GridCells.BRIEF_INFO, BoQS_DESC2)
        _common.edit_containerCell(cnt.uuid.QuoteBoQStructure,  app.GridCells.PRICE, UpdateEstimate.UnitRateUpdated)
        _common.set_cellCheckboxValue(cnt.uuid.QuoteBoQStructure, app.GridCells.IS_FREE_QUANTITY, UpdateEstimate.chkStatus)
        _common.edit_containerCell(cnt.uuid.QuoteBoQStructure, app.GridCells.QUANTITY_SMALL,UpdateEstimate.updatedQuantity2)
        cy.SAVE()
        cy.wait(1000)//required wait
    })

    it("TC - Update Estimate", function () {
        const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
        const wizardInputs = this.data.SidebarOptions.wizardInputs;
        const UpdateEstimate = this.data.UpdateEstimate
        const standardInputs = this.data.Prerequisites.SidebarInputs;

        let checkboxLabelName = new Map<string, string>();
        checkboxLabelName.set(UpdateEstimate.option1, UpdateEstimate.chkStatus2);
        checkboxLabelName.set(UpdateEstimate.option2,UpdateEstimate.chkStatus3);

        _common.openSidebarOption(sidebarInputs.wizard1);
        _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.UpdateEstimate);
       
        _estimatePage.openModalContainerByDownArrow();
        _estimatePage.fromWizard_UpdateEstimate(checkboxLabelName);
        cy.wait(1000)//This wait necessary 
        _modalView.findModal().acceptButton(btn.ButtonText.OK);
       
        _common.openTab(app.tabBar.quoteBoQs).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QuoteBoQStructure, app.FooterTab.BOQ_STRUCTURE, 2)

        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(standardInputs.searchTypeQuick, standardInputs.estimate);
        cy.wait(1000)
        cy.REFRESH_CONTAINER()

       
    })

    it("TC - Verify resource generated prc is checked, cost total, comment gets updated as per boq", function () {
           
            const UpdateEstimate = this.data.UpdateEstimate
    
            _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
                _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            });
            _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BoQS_DESC1)
          
            _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
                _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            });
            _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.DESCRIPTION_INFO,"Nachunternehmer")
            cy.wait(500).then(() => {
            _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.RESOURCES, UpdateEstimate.UnitRateUpdated,UpdateEstimate.updatedQuantity1,app.GridCells.COST_TOTAL )
            _common.assert_cellData_by_contain(cnt.uuid.RESOURCES, app.gridCells.COMMENTINLINEITEM, UpdateEstimate.commenttext)
            _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.gridCells.GENERATEDPRC,UpdateEstimate.chkStatus2)
        })
    })

    it("TC - Verify line item AQ quantity is updated with boq quantity", function () {
        const UpdateEstimate = this.data.UpdateEstimate
    

             _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
                _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            });
            _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BoQS_DESC1)
        
            cy.wait(500).then(() => {
                _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET,UpdateEstimate.updatedQuantity1)   
            })
    })
})
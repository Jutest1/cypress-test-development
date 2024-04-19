import { tile, app, cnt, btn } from "cypress/locators";
import { _common, _estimatePage, _package, _mainView, _modalView, _sidebar, _rfqPage, _boqPage, _projectPage, _validate } from "cypress/pages";



import _ from "cypress/types/lodash";
const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const LINEITEM_DESC="EST-DESC" + Cypress._.random(0, 999);

var reqCode: string;
var rfqCode: string;


allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 6.5 |  Update the estimate from the Quote module by updating qunatity in item container");

describe("EST- 6.5 | Update the estimate from the Quote module by updating qunatity in item container", () => {
    beforeEach(function () {
        cy.fixture("estimate/est-6.5-Update-estimate-from-quote-by-updating-quantity-in-item-container.json").then((data) => {
            this.data = data;
        });
    });
    before(function () {
        cy.fixture("estimate/est-6.5-Update-estimate-from-quote-by-updating-quantity-in-item-container.json").then((data) => {
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

    it("TC - Create line item and add resource", function () {
       
        const resourceColumnInput = this.data.resource_Input.resorcesInput
        const lineItemInput = this.data.CreateNewLineItem;
          
           
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
          
        });
         _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(LINEITEM_DESC, lineItemInput.quantity1, lineItemInput.uom);
        cy.SAVE();

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
                _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
              
        });
       
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateMaterialResource(resourceColumnInput.shortkey, resourceColumnInput.code);
        cy.SAVE();

    });
    it("TC - Create material package from the estimate", function () {
        const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
        const wizardInputs = this.data.SidebarOptions.wizardInputs;
        const PACKAGE_INPUT = this.data.Package.PackageInputs
        const resourceColumnInput = this.data.resource_Input.resorcesInput
      

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
           
        });
        _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.openSidebarOption(sidebarInputs.wizard1);
        _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.CreateUpdateBoQPackage);
        _package.create_materialPackage_Consolidatedchkbox(PACKAGE_INPUT.scope, PACKAGE_INPUT.scopeID, PACKAGE_INPUT.criteriaSelection,resourceColumnInput.code)
      
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

    it('TC - Create Quote and update qunatity in item container', function () {
        const wizardInputs = this.data.Prerequisites.wizardInputs;
        const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
        const Bidder = this.data.BidderInputs
        const UpdateEstimate = this.data.UpdateEstimate
        const PACKAGE_Grid = this.data.Package.Column_Headers

        _common.openSidebarOption(sidebarInputs.wizard1);
        _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.CreateQuote);
        _rfqPage.fromWizard_CreateQuote([Bidder.bidder1,Bidder.bidder2]);
        _modalView.findModal().acceptButton(btn.buttonText.GoToQuote);
        cy.SAVE();
        _common.openTab(app.tabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 0)
            _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS,PACKAGE_Grid)
        })
       _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS,  app.GridCells.PRICE, UpdateEstimate.UnitRateUpdated)
        _common.set_cellCheckboxValue(cnt.uuid.QUOTES_ITEMS, app.GridCells.IS_FREE_QUANTITY, UpdateEstimate.chkStatus)
        _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.QUANTITY_SMALL, UpdateEstimate.updatedQuantity1)
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
       
        _common.openTab(app.tabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 2)

        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(standardInputs.searchTypeQuick, standardInputs.estimate);
        cy.REFRESH_CONTAINER()

       
    })

     it("TC - Verify resource generated prc is checked, cost total, comment ,quantity gets updated as per item in quote", function () {
           
            const UpdateEstimate = this.data.UpdateEstimate
            const ResourceGrid = this.data.Headers.Column_Resource
    
            _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
                _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            });
            _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
          
            _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
                _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
                _common.setup_gridLayout(cnt.uuid.RESOURCES,ResourceGrid)
            });
            _common.select_rowInContainer(cnt.uuid.RESOURCES)
            cy.wait(500).then(() => {
            _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.RESOURCES, UpdateEstimate.UnitRateUpdated,UpdateEstimate.updatedQuantity1,app.GridCells.COST_TOTAL )
            _common.assert_cellData_by_contain(cnt.uuid.RESOURCES, app.gridCells.COMMENTINLINEITEM, UpdateEstimate.commenttext)
            _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.gridCells.GENERATEDPRC,UpdateEstimate.chkStatus2)
            _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL,UpdateEstimate.updatedQuantity1)   
        })
    })

   
})
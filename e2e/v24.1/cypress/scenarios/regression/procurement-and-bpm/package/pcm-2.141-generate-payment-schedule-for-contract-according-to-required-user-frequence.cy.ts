import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _package, _rfqPage, _validate, _procurementContractPage } from "cypress/pages";
import { app, tile, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const EST_CODE = "CODE-" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LI_DESC = "LI-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999); 
const OCCURENCE=5
const INCREMENTEDDATE=30
const INCREMENTBY=7

let CONTAINERS_PROJECT;
let PROJECT_PARAMETERS: DataCells;

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let LINE_ITEM_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINERS_LINE_ITEM;

let RESOURCE_PARAMETERS: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTRACT_PARAMETERS:DataCells;
let RFQ_PARAMETERS:DataCells
let CONTAINERS_RFQ;
let CONTAINER_COLUMNS_REQUISITION
let CONTAINER_COLUMNS_QUOTE
let CONTAINER_COLUMNS_PACKAGE
let GENERATE_PAYMENT_SCHEDULE:DataCells

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.141 | Generate payment schedule for contract according to required User Frequence");
describe("PCM- 2.141 | Generate payment schedule for contract according to required User Frequence", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-2.141-generate-payment-schedule-for-contract-according-to-required-user-frequence.json").then((data) => {
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
        cy.fixture("pcm/pcm-2.141-generate-payment-schedule-for-contract-according-to-required-user-frequence.json").then((data) => {
            this.data = data
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT            
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME
            };
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LI_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
            },
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
            }
            CONTAINERS_RFQ = this.data.CONTAINERS.RFQ
            RFQ_PARAMETERS={
                [commonLocators.CommonLabels.BUSINESS_PARTNER]:[CONTAINERS_RFQ.BP1, CONTAINERS_RFQ.BP2]
            }
            CONTRACT_PARAMETERS = {
				[app.GridCells.BUSINESS_PARTNER_FK_SMALL]: CONTAINERS_RFQ.BP1,
				[app.GridCells.PROJECT_FK]: PRJ_NO,
			}
            CONTAINER_COLUMNS_REQUISITION= this.data.CONTAINER_COLUMNS.REQUISITION
            CONTAINER_COLUMNS_QUOTE= this.data.CONTAINER_COLUMNS.QUOTE
            CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE
            GENERATE_PAYMENT_SCHEDULE = {
                [commonLocators.CommonKeys.RADIO]:CONTAINERS_RFQ.RADIO,
                [commonLocators.CommonLabels.TOTAL_OC_NET]:CONTAINERS_RFQ.TOTAL_OC,
                [commonLocators.CommonLabels.START_DATE]: _common.getDate("current"),
                [commonLocators.CommonLabels.END_DATE]: _common.getDate("incremented",INCREMENTEDDATE)
            }
           
            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
            cy.SAVE()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        })
    });
    after(() => {
        cy.LOGOUT();
    });
    it("TC - Create new Estimate header record and generate Line item and Resources", function () {            
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
           _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 1);
           _common.setup_gridLayout(cnt.uuid.ESTIMATE,CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
         cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
     
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
         cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create material package,requisition,RFQ,Quote and change Status", function () {    
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
        _estimatePage.enterRecord_toCreatePackage_wizard(CONTAINERS_RESOURCE.MATERIAL_COST_CODE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _package.changeStatus_ofPackage_inWizard()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
       _common.waitForLoaderToDisappear()
       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE)
        _rfqPage.create_requestForQuote_fromWizard(RFQ_PARAMETERS)
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE)
        _rfqPage.create_quote_fromWizard([CONTAINERS_RFQ.BP1, CONTAINERS_RFQ.BP2], ["check", "check"])
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
    })


    it("TC - Assign price to items in Quotes and changes status of quotes", function () {        
               
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_QUOTE)
        });
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        _common.select_rowInContainer(cnt.uuid.QUOTES,CONTAINERS_RFQ.BP1)
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RFQ.ITEMSPRICE1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.QUOTES,CONTAINERS_RFQ.BP2)
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RFQ.ITEMSPRICE2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.QUOTES)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS)
        _common.changeStatus_ofMultipleRecord_fromModal(commonLocators.CommonKeys.CHECKED)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Navigate to price comparison and create contract,change status", function () {                
        _salesPage.navigate_toContainer_usingGoToButtonInBills(cnt.uuid.QUOTES, sidebar.SideBarOptions.PRICE_COMPARISON)
        cy.wait(1000)//required wait to load data
        _common.openTab(app.TabBar.PRICECOMPARISON).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_COMPARISONBOQ, app.FooterTab.PRICE_COMPARISONBOQ, 1);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT)
        _saleContractPage.create_contractInPriceComparison_fromWizard(CONTRACT_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.CHECKED)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify the dates of payment schedule in contract", function () {        
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_PAYMENT_SCHEDULE)
        _saleContractPage.enterRecord_toGeneratePaymentScheduleInContract(GENERATE_PAYMENT_SCHEDULE)
        cy.wait(500)//required wait
        _modalView.findModal().acceptButton(btn.ButtonText.OK)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PAYMENT_SCHEDULE, app.FooterTab.PAYMENT_SCHEDULE, 2);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PAYMENT_SCHEDULE,app.GridCells.CODE,"∑")
        _common.assert_cellData_insideActiveRow(cnt.uuid.PAYMENT_SCHEDULE,app.GridCells.PERCENT_OF_CONTRACT,CONTAINERS_RFQ.ITEMSPRICE1)
        cy.wait(1000).then(()=>{
            for(let i=1;i<=OCCURENCE;i++)
            {
                if(i==1)
                {
                    _common.clickOn_cellHasUniqueValue(cnt.uuid.PAYMENT_SCHEDULE,app.GridCells.CODE,"0"+i)
                    _common.assert_cellData_insideActiveRow(cnt.uuid.PAYMENT_SCHEDULE,app.GridCells.DATE_PAYMENT,_common.getDate("current"))
                }
                if(i==OCCURENCE)
                {
                    _common.clickOn_cellHasUniqueValue(cnt.uuid.PAYMENT_SCHEDULE,app.GridCells.CODE,"0"+i)
                    _common.assert_cellData_insideActiveRow(cnt.uuid.PAYMENT_SCHEDULE,app.GridCells.DATE_PAYMENT,_common.getDate("incremented",INCREMENTEDDATE))
                }
                if(i!=1 && i!=OCCURENCE)
                {
                    _common.clickOn_cellHasUniqueValue(cnt.uuid.PAYMENT_SCHEDULE,app.GridCells.CODE,"0"+(i-1))
                    _common.getText_fromCell(cnt.uuid.PAYMENT_SCHEDULE,app.GridCells.DATE_PAYMENT).then(($dates)=>{
                    _common.clickOn_cellHasUniqueValue(cnt.uuid.PAYMENT_SCHEDULE,app.GridCells.CODE,"0"+i)
                    _common.assert_cellData_insideActiveRow(cnt.uuid.PAYMENT_SCHEDULE,app.GridCells.DATE_PAYMENT,_common.getDate("fetchedDateIncrement",INCREMENTBY,$dates.text()))
                    })    
                }
            }
        })
    })
})
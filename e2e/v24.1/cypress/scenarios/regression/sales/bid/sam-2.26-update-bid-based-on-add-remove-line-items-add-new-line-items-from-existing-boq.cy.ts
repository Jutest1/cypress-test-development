
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface()

const BID_DESC="BD1_" + Cypress._.random(0, 999)

const PROJECT_NO="24" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

const LINE_ITEM_DESC="LI_DESC-" + Cypress._.random(0, 999)
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM
let GENERATE_LINE_ITEMS_PARAMETERS:DataCells


const BOQ_DESC="BOQ1_DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC="BSD-" + Cypress._.random(0, 999);
let BOQ_PARAMETERS:DataCells
let BOQ_STRUCTURE_PARAMETERS:DataCells


let CONTAINERS_BOQ_STRUCTURE
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

let CONTAINER_COLUMNS_BID
let MODAL_CREATE_BID
let CONTAINER_COLUMNS_BID_BOQ_STRUCTURE

ALLURE.epic("SALES");
ALLURE.feature("Sales-BID")
ALLURE.story("SAM- 2.26 | Update BID based on add/remove line items : Add new line items from existing BOQ")

describe("SAM- 2.26 | Update BID based on add/remove line items : Add new line items from existing BOQ", () => {

    before(function () {
        cy.fixture("sam/sam-2.26-update-bid-based-on-add-remove-line-items-add-new-line-items-from-existing-boq.json")
          .then((data) => {
            this.data = data;
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }

            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }

            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_RESOURCE.QUANTITY
            };

            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            GENERATE_LINE_ITEMS_PARAMETERS={
                [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_DESC               
            }

            CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ
            BOQ_PARAMETERS={
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
            }
            CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
            BOQ_STRUCTURE_PARAMETERS={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
            }
            CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
           
            CONTAINER_COLUMNS_BID=this.data.CONTAINER_COLUMNS.BID
            MODAL_CREATE_BID=this.data.MODAL.CREATE_BID
            CONTAINER_COLUMNS_BID_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BID_BOQ_STRUCTURE
          })
          .then(()=>{
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            _common.waitForLoaderToDisappear()
            cy.SAVE();          
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  
          })
    })

    after(() => {
    cy.LOGOUT();
    })

    it("TC - Create BOQ header and BOQ structure", function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  

        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.setDefaultView(app.TabBar.BOQS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.maximizeContainer(cnt.uuid.BOQS)
        _common.create_newRecord(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.BOQS)
        _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create new estimate record', function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.setDefaultView(app.TabBar.ESTIMATE)
        _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Generate boq line item and assign resource to it", function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo,CONTAINER_COLUMNS_LINE_ITEM.code,CONTAINER_COLUMNS_LINE_ITEM.costtotal,CONTAINER_COLUMNS_LINE_ITEM.boqitemfk,CONTAINER_COLUMNS_LINE_ITEM.costunit],cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        })
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,BOQ_STRUCTURE_DESC)

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        })
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL,"EST_COST_TOTAL")
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_UNIT,"EST_COST_UNIT")
    });

    it("TC - Create Bid", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);

        _bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.MAIN_BID,BID_DESC,MODAL_CREATE_BID.BUSINESS_PARTNER,MODAL_CREATE_BID.STRUCTURE_TYPE)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BID).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
            _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BID)
        })
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BIDS,BID_DESC)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Go to estimate", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.search_inSubContainer(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION);
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create line item and assign resource to it", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo,CONTAINER_COLUMNS_LINE_ITEM.code,CONTAINER_COLUMNS_LINE_ITEM.costtotal,CONTAINER_COLUMNS_LINE_ITEM.boqitemfk,CONTAINER_COLUMNS_LINE_ITEM.costunit],cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,LINE_ITEM_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.BOQ_ITEM_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,BOQ_STRUCTURE_DESC)
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESC)

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL,"EST_COST_TOTAL_1")
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_UNIT,"EST_COST_UNIT_1")
    })

    it("TC - Create bid and verify Bid gets updated based on newly added line item & updated 'Bid' Net Amount = summation of both estimate line item 'Cost Total'", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);

        _bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.UPDATE_BID_WITH_MAIN_BID,"NA","NA",MODAL_CREATE_BID.STRUCTURE_TYPE)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BID).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
        })
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
        _common.select_rowHasValue(cnt.uuid.BIDS,BID_DESC)
        let costTotal1:any=parseFloat(Cypress.env("EST_COST_TOTAL_1").toString().replace(',','')).toFixed(2)
        let costTotal2:any=parseFloat(Cypress.env("EST_COST_TOTAL").toString().replace(',','')).toFixed(2)
        let calculatedCostTotal:any=(+costTotal1)+(+costTotal2)
        _common.assert_forNumericValues(cnt.uuid.BIDS,app.GridCells.AMOUNT_NET,calculatedCostTotal.toString())    
    })

    it("TC - Updated 'Unit Rate' in the bid boq structure container = summation of both estimate line item 'Cost/Unit'", function () {

        _common.openTab(app.TabBar.BIDBOQ).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.BIDBOQS,app.FooterTab.BOQS)
        }) 
        _common.clear_subContainerFilter(cnt.uuid.BIDBOQS)   
        _common.select_rowHasValue(cnt.uuid.BIDBOQS,BOQ_DESC)

        _common.openTab(app.TabBar.BIDBOQ).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.BIDBOQSTRUCTURE,app.FooterTab.BOQ_STRUCTURE)
            _common.setup_gridLayout(cnt.uuid.BIDBOQSTRUCTURE, CONTAINER_COLUMNS_BID_BOQ_STRUCTURE)
        }) 
        _common.clear_subContainerFilter(cnt.uuid.BIDBOQSTRUCTURE)   
        _common.select_allContainerData(cnt.uuid.BIDBOQSTRUCTURE)
        _common.clickOn_toolbarButton(cnt.uuid.BIDBOQSTRUCTURE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.select_rowHasValue(cnt.uuid.BIDBOQSTRUCTURE,BOQ_STRUCTURE_DESC)
        let costUnit1:any=parseFloat(Cypress.env("EST_COST_UNIT").toString().replace(',','')).toFixed(2)
        let costUnit2:any=parseFloat(Cypress.env("EST_COST_UNIT_1").toString().replace(',','')).toFixed(2)
        let calculatedCostUnit:any=(+costUnit1)+(+costUnit2)
        _common.assert_forNumericValues(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.PRICE_SMALL,calculatedCostUnit.toString())    


    })
})
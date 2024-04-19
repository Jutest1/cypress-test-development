
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage, _businessPartnerPage, _procurementContractPage } from "cypress/pages";
import { app, tile, cnt,  btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const MATERIAL_STRUCTURE="MR-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE
let PROCUREMENT_STRUCTURE_PARAMETERS:DataCells

const BRANCH_DESC="Br-" + Cypress._.random(0, 999);
const FAMILY_NAME="A-" + Cypress._.random(0, 999);
const FIRST_NAME="B-" + Cypress._.random(0, 999);
const BUSINESS_PARTNER_CODE="BPC-" + Cypress._.random(0, 999);
const BUSINESS_PARTNER_NAME="BPN-" + Cypress._.random(0, 999);
let BRANCH_PARAMETER:DataCells
let SUPPLIER_PARAMETER:DataCells
let SELECT_PROCUREMENT_STRUCTURE_PARAMETER:DataCells
let CONTAINERS_BRANCHES
let CONTAINER_COLUMNS_BUSINESS_PARTNER
let CONTAINER_COLUMNS_SUPPLIERS
let CONTAINER_COLUMNS_CONTACT
let CONTAINER_COLUMNS_BRANCHES

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let CONTAINER_COLUMNS_RESOURCE;
let CONTAINERS_RESOURCE
let RESOURCE_PARAMETERS:DataCells

const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);
let LINE_ITEM_PARAMETERS:DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;

let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE

let CONTAINER_COLUMNS_PACKAGE

let CONTAINER_COLUMNS_REQUISITION

let CREATE_RFQ_PARAMETERS:DataCells
let MODAL_REQUEST_FOR_QUOTE
let CREATE_RFQ_PARAMETERS_1:DataCells

let CONTAINER_COLUMNS_RFQ

let BP_ADVANCE_SEARCH_PARAMETER:DataCells

let CONTAINER_COLUMNS_BIDDER

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("RFQ");
ALLURE.story("PCM- 2.243 | Find bidder for RFQ");

describe("PCM- 2.243 | Find bidder for RFQ", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.243-find-bidder-for-rfq.json")
          .then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE=this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE
            PROCUREMENT_STRUCTURE_PARAMETERS={
                [app.GridCells.PRC_STRUCTURE_TYPE_FK]:commonLocators.CommonKeys.MATERIAL,
                [app.GridCells.CODE]:MATERIAL_STRUCTURE,
                [app.GridCells.DESCRIPTION_INFO]:MATERIAL_STRUCTURE
            }

            CONTAINERS_BRANCHES=this.data.CONTAINERS.BRANCHES
            BRANCH_PARAMETER={
                [app.GridCells.DESCRIPTION]:BRANCH_DESC,
                [app.GridCells.ADDRESS_TYPE_FK]:CONTAINERS_BRANCHES.BRANCH,
                [commonLocators.CommonLabels.STREET]:CONTAINERS_BRANCHES.STREET,
                [commonLocators.CommonKeys.ADDRESS_INDEX]:"0",
                [commonLocators.CommonLabels.ZIP_CODE]:CONTAINERS_BRANCHES.ZIP_CODE,
                [commonLocators.CommonLabels.COUNTRY]:CONTAINERS_BRANCHES.COUNTRY
            }
            SUPPLIER_PARAMETER={
                [app.GridCells.SUBSIDIARY_FK]:BRANCH_DESC
            }
            SELECT_PROCUREMENT_STRUCTURE_PARAMETER={
                [commonLocators.CommonKeys.SEARCH_RESULT]:MATERIAL_STRUCTURE,
                [app.GridCells.IS_SELECTED]:commonLocators.CommonKeys.CHECK
            }
            CONTAINER_COLUMNS_BUSINESS_PARTNER=this.data.CONTAINER_COLUMNS.BUSINESS_PARTNER
            CONTAINER_COLUMNS_BRANCHES=this.data.CONTAINER_COLUMNS.BRANCHES
            CONTAINER_COLUMNS_CONTACT=this.data.CONTAINER_COLUMNS.CONTACT
            CONTAINER_COLUMNS_SUPPLIERS=this.data.CONTAINER_COLUMNS.SUPPLIERS

            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM
            }; 
            
            CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
            RESOURCE_PARAMETERS = {
                  [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                  [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            };

            MODAL_CREATE_UPDATE_MATERIAL_PACKAGE=this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE

            CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE

            CONTAINER_COLUMNS_REQUISITION=this.data.CONTAINER_COLUMNS.REQUISITION

            MODAL_REQUEST_FOR_QUOTE=this.data.MODAL.REQUEST_FOR_QUOTE
            CREATE_RFQ_PARAMETERS={
                [commonLocators.CommonLabels.BUSINESS_PARTNER]:[MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER]
            }
            CREATE_RFQ_PARAMETERS_1={
                [commonLocators.CommonLabels.BUSINESS_PARTNER]:[BUSINESS_PARTNER_NAME]
            }

            CONTAINER_COLUMNS_RFQ=this.data.CONTAINER_COLUMNS.RFQ

            BP_ADVANCE_SEARCH_PARAMETER={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.PROCUREMENT_STRUCTURE_SMALL,
                [commonLocators.CommonKeys.CODE]:MATERIAL_STRUCTURE,
                [app.GridCells.BP_NAME_1]:BUSINESS_PARTNER_NAME,
                [commonLocators.CommonLabels.BRANCH_DESCRIPTION]:BRANCH_DESC,
                [app.GridCells.FIRST_NAME]:FIRST_NAME,
                [commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE]:commonLocators.CommonKeys.CHECK
            }
            CONTAINER_COLUMNS_BIDDER=this.data.CONTAINER_COLUMNS.BIDDER
          })
          .then(()=>{
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.setDefaultView(app.TabBar.PROJECT)
                _common.waitForLoaderToDisappear()
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
            _common.waitForLoaderToDisappear() 
          })
    });  

    after(() => {
    cy.LOGOUT();
    });

    it("TC - Create material procurement structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.GENERALS).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
          _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE)
        });
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.waitForLoaderToDisappear()
        _procurementPage.enterRecord_toCreateProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURES,PROCUREMENT_STRUCTURE_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create business partner, branch, suppliers, contacts and assign procurement view", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.setDefaultView(app.TabBar.BUSINESS_PARTNERS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
            _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESS_PARTNER)
        });

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUBSIDIARIES, app.FooterTab.BRANCHES, 1);
            _common.setup_gridLayout(cnt.uuid.SUBSIDIARIES, CONTAINER_COLUMNS_BRANCHES)
        });

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUPPLIERS, app.FooterTab.SUPPLIERS, 1);
            _common.setup_gridLayout(cnt.uuid.SUPPLIERS, CONTAINER_COLUMNS_SUPPLIERS)
        });

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS_BP, app.FooterTab.CONTACTS, 1);
            _common.setup_gridLayout(cnt.uuid.CONTACTS_BP, CONTAINER_COLUMNS_CONTACT)
        });

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
        });
        _common.maximizeContainer(cnt.uuid.BUSINESS_PARTNERS)
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
        _common.create_newRecord(cnt.uuid.BUSINESS_PARTNERS);
        _businessPartnerPage.enterRecord_toCreateBusinessPartner(BUSINESS_PARTNER_CODE, BUSINESS_PARTNER_NAME,CONTAINERS_BRANCHES.STREET,CONTAINERS_BRANCHES.ZIP_CODE,CONTAINERS_BRANCHES.CITY,CONTAINERS_BRANCHES.COUNTRY)
        cy.SAVE()            
        _common.waitForLoaderToDisappear()
        cy.SAVE()            
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
        _common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS,BUSINESS_PARTNER_NAME)
        _common.select_rowHasValue(cnt.uuid.BUSINESS_PARTNERS,BUSINESS_PARTNER_NAME)
        _common.minimizeContainer(cnt.uuid.BUSINESS_PARTNERS)
        _common.waitForLoaderToDisappear()

        //Branch Creation

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUBSIDIARIES, app.FooterTab.BRANCHES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.SUBSIDIARIES)
        _common.create_newRecord(cnt.uuid.SUBSIDIARIES)
        _procurementPage.enterRecord_toCreateBranch(cnt.uuid.SUBSIDIARIES,BRANCH_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _procurementPage.clickOn_ignoreButton()
        _common.waitForLoaderToDisappear()

        _common.saveCellDataToEnv(cnt.uuid.SUBSIDIARIES,app.GridCells.ADDRESSD_TO,"ADDRESS")

        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()


        //Supplier Creation
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUPPLIERS, app.FooterTab.SUPPLIERS, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.SUPPLIERS)
        _common.create_newRecord(cnt.uuid.SUPPLIERS)
        _procurementPage.enterRecord_toCreateSupplier(cnt.uuid.SUPPLIERS,SUPPLIER_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.SUPPLIERS,app.GridCells.CODE,"SUPPLIER_CODE")
    
        //Contact Creation
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS_BP, app.FooterTab.CONTACTS, 1);
        });
        _common.maximizeContainer(cnt.uuid.CONTACTS_BP)
        _common.clear_subContainerFilter(cnt.uuid.CONTACTS_BP)
        _common.create_newRecord(cnt.uuid.CONTACTS_BP)
        _common.enterRecord_inNewRow(cnt.uuid.CONTACTS_BP, app.GridCells.FIRST_NAME, app.InputFields.DOMAIN_TYPE_DESCRIPTION, FIRST_NAME)
        _common.enterRecord_inNewRow(cnt.uuid.CONTACTS_BP, app.GridCells.FAMILY_NAME, app.InputFields.DOMAIN_TYPE_DESCRIPTION, FAMILY_NAME)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.CONTACTS_BP, app.GridCells.CONTACT_ROLE_FK, commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.SERVICE_PERSONNEL);
        _common.set_cellCheckboxValue(cnt.uuid.CONTACTS_BP,app.GridCells.IS_DEFAULT,commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.CONTACTS_BP)


        _common.openTab(app.TabBar.PROCUREMENT_VIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
            _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESS_PARTNER)
        });
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
        _common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS,BUSINESS_PARTNER_NAME)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BUSINESS_PARTNERS,app.GridCells.BUSINESS_PARTNER_NAME_1,BUSINESS_PARTNER_NAME)
      
        _common.openTab(app.TabBar.PROCUREMENT_VIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURE_BP, app.FooterTab.PROCUREMENT_STRUCTURE, 1);
            //_common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURE_BP, BUSINESS_PARTNER_COLUMN)
        });

        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _businessPartnerPage.selectProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURE_BP,SELECT_PROCUREMENT_STRUCTURE_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Create new estimate record', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
        _common.waitForLoaderToDisappear()

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

    it("TC - Create new line item record", function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
            _common.waitForLoaderToDisappear()
        });
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });  

    it("TC - Add resource to line item", function () {
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
        cy.SAVE();
    });
    
    it("TC - Create/Update material package", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.MATERIAL_AND_COST_CODE,null,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.CONFIGURATION,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE);
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.setDefaultView(app.TabBar.PACKAGE)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
          _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER'));  
    }) 

    it("TC - Change package status", function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create requisition from package", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        cy.wait(2000) // This wait required as UI takes time to load
        _rfqPage.getCode_fromRequisitionModal("REQUISITION_CODE")
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
		_common.waitForLoaderToDisappear()
    })

    it("TC - Change requisition status", function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.search_inSubContainer(cnt.uuid.REQUISITIONS,Cypress.env("REQUISITION_CODE"))

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create RFQ from requisition", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
        _common.waitForLoaderToDisappear()
        _rfqPage.create_requestForQuote_fromWizard(CREATE_RFQ_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _rfqPage.getCode_fromRFQModal("RFQ_CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Check pop up 'find bidder' dialog when execute the wizard", function () {

        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0)
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.search_inSubContainer(cnt.uuid.REQUEST_FOR_QUOTE,Cypress.env("RFQ_CODE"))
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.FIND_BIDDER_CONCISE);
        _common.waitForLoaderToDisappear()
        _validate.verify_modalTitle(commonLocators.CommonKeys.FIND_BIDDER)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify search bp via the advanced criteria such as procurement structure and check on selecting bp in search result, the branch and contact of the bp shows correctly", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.FIND_BIDDER_CONCISE);
        _common.waitForLoaderToDisappear()
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_PARAMETER, btn.ButtonText.CANCEL)
    })
  
    it("TC - Verify on selecting the bp and click OK, the BP will show in the bidder container in RFQ module the branch and contact will show accordingly", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.FIND_BIDDER_CONCISE);
        _common.waitForLoaderToDisappear()
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_PARAMETER, btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        cy.wait(1000) // This wait is required
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.BIDDERS, 1)
            _common.setup_gridLayout(cnt.uuid.BIDDERS, CONTAINER_COLUMNS_BIDDER)
        })
        _common.maximizeContainer(cnt.uuid.BIDDERS)
        _common.clear_subContainerFilter(cnt.uuid.BIDDERS)
        _common.search_inSubContainer(cnt.uuid.BIDDERS,BUSINESS_PARTNER_NAME)
        cy.wait(2000)
        cy.REFRESH_SELECTED_ENTITIES()
          .then(()=>{
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS,app.GridCells.SUBSIDIARY_FK,BRANCH_DESC)
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS,app.GridCells.SUPPLIER_FK,Cypress.env("SUPPLIER_CODE"))
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS,app.GridCells.BUSINESS_PARTNER_FK,BUSINESS_PARTNER_NAME)
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS,app.GridCells.CONTACT_FIRST_NAME,FIRST_NAME)
          })
        _common.minimizeContainer(cnt.uuid.BIDDERS)
    })
   
});
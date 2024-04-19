import { _common, _controllingUnit, _package, _sidebar, _mainView, _validate, _modalView, _projectPage, _estimatePage, _boqPage,_rfqPage, _businessPartnerPage } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators, btn } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import Buttons from 'cypress/locators/buttons';

const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC" + Cypress._.random(0, 999);

let CONTAINERS_BUSINESS_PARTNERS
let CONTAINER_COLUMNS_BUSINESS_PARTNERS;
let CONTAINERS_CONTACT;
let CONTAINER_COLUMNS_CONTACT;
let FIRST_NAME;
let FAMILY_NAME;
let FIRST_NAME1;
let FAMILY_NAME1;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINERS_ESTIMATE;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINERS_RESOURCE;
let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE;
let CONTAINER_COLUMNS_PACKAGE;
let CONTAINER_COLUMNS_REQUISITION;
let MODAL_REQUEST_FOR_QUOTE;
let CONTAINER_COLUMNS_BIDDER

let ESTIMATE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS:DataCells;
let CREATE_RFQ_PARAMETERS:DataCells;
let CREATE_BIDDER_PARAMETERS : DataCells;

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);


ALLURE.epic("CUSTOMER DEFECTS");
ALLURE.feature("Mainka Defects");
ALLURE.story('MD- 36923 |  Verify bidder search in rfq module by takeover with and without contact');

describe('MD- 36923 | Verify bidder search in rfq module by takeover with and without contact', () => {

	before(function () {
		cy.fixture('customer-defects/md-36923-verify-bidder-search-in-rfq-module-by-takeover-with-and-without-contact.json').then((data) => {
			this.data = data;
            CONTAINERS_BUSINESS_PARTNERS= this.data.CONTAINERS.BUSINESS_PARTNERS
            CONTAINERS_CONTACT= this.data.CONTAINERS.CONTACT
            CONTAINER_COLUMNS_BUSINESS_PARTNERS = this.data.CONTAINER_COLUMNS.BUSINESS_PARTNERS
            CONTAINER_COLUMNS_CONTACT=this.data.CONTAINER_COLUMNS.CONTACT
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
            MODAL_CREATE_UPDATE_MATERIAL_PACKAGE=this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
            CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE
            CONTAINER_COLUMNS_REQUISITION=this.data.CONTAINER_COLUMNS.REQUISITION
            MODAL_REQUEST_FOR_QUOTE=this.data.MODAL.REQUEST_FOR_QUOTE
            CONTAINER_COLUMNS_BIDDER=this.data.CONTAINER_COLUMNS.BIDDER
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            },
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM
            }; 
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            };
            CREATE_RFQ_PARAMETERS={
                [commonLocators.CommonLabels.BUSINESS_PARTNER]:[MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER[0]]
            };
            CREATE_BIDDER_PARAMETERS={
                [commonLocators.CommonLabels.BUSINESS_PARTNER]:[MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER[1]],
                [app.GridCells.ID]: commonLocators.CommonKeys.CHECK
            };
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
        });
    });

    it("TC - Use Exisitng Business partners", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER);		
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
            _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESS_PARTNERS)
          });
        cy.REFRESH_CONTAINER()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.clear_searchInSidebar()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
        _common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS,CONTAINERS_BUSINESS_PARTNERS.BUSINESS_PARTNER[0]) 
        _common.select_rowHasValue(cnt.uuid.BUSINESS_PARTNERS,CONTAINERS_BUSINESS_PARTNERS.BUSINESS_PARTNER[0])
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.BUSINESS_PARTNERS)
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.CONTACTS_BP, app.FooterTab.CONTACTS, 1);
            _common.setup_gridLayout(cnt.uuid.CONTACTS_BP, CONTAINER_COLUMNS_CONTACT)
          });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.clear_searchInSidebar()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.CONTACTS_BP)
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
        _common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS,CONTAINERS_BUSINESS_PARTNERS.BUSINESS_PARTNER[0]) 
        _common.select_rowHasValue(cnt.uuid.CONTACTS_BP,CONTAINERS_CONTACT.FIRSTNAME[0])
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.CONTACTS_BP)
        _common.getText_fromCell(cnt.uuid.CONTACTS_BP, app.GridCells.FIRST_NAME).then(($FIRSTNAME) => {
            Cypress.env("FIRSTNAME",($FIRSTNAME.text()))  
            FIRST_NAME=Cypress.env("FIRSTNAME")
        })
        _common.getText_fromCell(cnt.uuid.CONTACTS_BP, app.GridCells.FAMILY_NAME).then(($FAMILYNAME) => {
            Cypress.env("FAMILYNAME",($FAMILYNAME.text()))  
            FAMILY_NAME=Cypress.env("FAMILYNAME")
        })
    })

    it("TC - Assertion of Contacts of first BP", function () {
        _common.assert_cellData(cnt.uuid.CONTACTS_BP,app.GridCells.FIRST_NAME,CONTAINERS_CONTACT.FIRSTNAME[0])
        _common.assert_cellData(cnt.uuid.CONTACTS_BP,app.GridCells.FAMILY_NAME,CONTAINERS_CONTACT.FAMILYNAME[0])
        _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.clear_searchInSidebar()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
        _common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS,CONTAINERS_BUSINESS_PARTNERS.BUSINESS_PARTNER[1]) 
        _common.select_rowHasValue(cnt.uuid.BUSINESS_PARTNERS,CONTAINERS_BUSINESS_PARTNERS.BUSINESS_PARTNER[1])
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.CONTACTS_BP, app.FooterTab.CONTACTS, 1);
        _common.clear_subContainerFilter(cnt.uuid.CONTACTS_BP)
        _common.select_rowHasValue(cnt.uuid.CONTACTS_BP,CONTAINERS_CONTACT.FIRSTNAME[1])
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.CONTACTS_BP)
        _common.getText_fromCell(cnt.uuid.CONTACTS_BP, app.GridCells.FIRST_NAME).then(($FIRSTNAME) => {
            Cypress.env("FIRSTNAME",($FIRSTNAME.text()))  
            FIRST_NAME1=Cypress.env("FIRSTNAME")
        })
        _common.getText_fromCell(cnt.uuid.CONTACTS_BP, app.GridCells.FAMILY_NAME).then(($FAMILYNAME) => {
            Cypress.env("FAMILYNAME",($FAMILYNAME.text()))  
            FAMILY_NAME1=Cypress.env("FAMILYNAME")
        })
    })

    it("TC - Assertion of Contacts of Second BP", function () {
        _common.assert_cellData(cnt.uuid.CONTACTS_BP,app.GridCells.FIRST_NAME,CONTAINERS_CONTACT.FIRSTNAME[1])
        _common.assert_cellData(cnt.uuid.CONTACTS_BP,app.GridCells.FAMILY_NAME,CONTAINERS_CONTACT.FAMILYNAME[1])
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
    }); 

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
    });

    it("TC - Create requisition from package", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        cy.wait(2000) // This wait required as UI takes time to load
        _rfqPage.getCode_fromRequisitionModal("REQUISITION_CODE")
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
		_common.waitForLoaderToDisappear()
    });

    it("TC - Change requisition status", function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')); 
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
    });

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

    it("TC - Add New Bidder and assert Business Partner with and without contacts", function () {
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.BIDDERS, 1)
            _common.setup_gridLayout(cnt.uuid.BIDDERS, CONTAINER_COLUMNS_BIDDER)
        })
        _common.maximizeContainer(cnt.uuid.BIDDERS)
        _common.clear_subContainerFilter(cnt.uuid.BIDDERS)
        _common.search_inSubContainer(cnt.uuid.BIDDERS,CONTAINERS_BUSINESS_PARTNERS.BUSINESS_PARTNER[0])
        _common.waitForLoaderToDisappear()
        cy.REFRESH_SELECTED_ENTITIES()
          .then(()=>{
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS,app.GridCells.CONTACT_FIRST_NAME,CONTAINERS_CONTACT.FIRSTNAME[0])
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS,app.GridCells.CONTACT_FK,CONTAINERS_CONTACT.FAMILYNAME[0])
          })
        _common.minimizeContainer(cnt.uuid.BIDDERS)
        _common.clear_subContainerFilter(cnt.uuid.BIDDERS)
        _common.create_newRecord(cnt.uuid.BIDDERS)
        cy.wait(2000)// wait needed bcoz it sometimes it overwrites into the existing business partner
        _common.lookUpButtonInCell(cnt.uuid.BIDDERS,app.GridCells.BUSINESS_PARTNER_FK,app.InputFields.ICO_INPUT_LOOKUP,0)
        _businessPartnerPage.enterRecord_toAddBusinessPartnerUsingLookUp(CREATE_BIDDER_PARAMETERS)
        cy.wait(2000) // wait is needed in order to load data after creation of business partner
        cy.SAVE()
        _common.clear_subContainerFilter(cnt.uuid.BIDDERS)
        _common.search_inSubContainer(cnt.uuid.BIDDERS,CONTAINERS_BUSINESS_PARTNERS.BUSINESS_PARTNER[1])
        _common.waitForLoaderToDisappear()
        cy.REFRESH_SELECTED_ENTITIES()
          .then(()=>{
            _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.BIDDERS,app.GridCells.CONTACT_FIRST_NAME,CONTAINERS_CONTACT.FIRSTNAME[1])
            _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.BIDDERS,app.GridCells.CONTACT_FK,CONTAINERS_CONTACT.FAMILYNAME[1])
           })
    })
})
    after(() => {
        cy.LOGOUT();
    });
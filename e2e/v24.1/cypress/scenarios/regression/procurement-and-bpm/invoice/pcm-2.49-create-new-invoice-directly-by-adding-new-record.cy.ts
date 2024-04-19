
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage } from "cypress/pages";
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
const ALLURE = Cypress.Allure.reporter.getInterface();

const PES_ENV="PES_ENV", CONTRACT_ENV="CONTRACT_ENV", CONTRACT_BP_ENV="CONTRACT_BP_ENV"
const CONTRACT_SP_ENV="CONTRACT_SP_ENV",CONTRACT_BANK_ENV="CONTRACT_BANK_ENV", CONTRACT_BRANCH_ENV="CONTRACT_BRANCH_ENV"
const CONTRACT_CUR="CONTRACT_CUR",CONTRACT_VAT="CONTRACT_VAT",CONTRACT_TC="CONTRACT_TC",CONTRACT_SC="CONTRACT_SC"
const CONTRACT_PK="CONTRACT_PK",CONTRACT_PNO="CONTRACT_PNO",CONTRACT_PA="CONTRACT_PA"
const CONTRACT_PAFI="CONTRACT_PAFI",PAYMENT_TERM="PAYMENT_TERM",BANK_TYPE="BANK_TYPE",CONTRACT_CONFIG="CONTRACT_CONFIG"
const CONTRACT_ENV_QTY="CONTRACT_ENV_QTY",PES_ENV_TG="PES_ENV_TG",CONTRACT_NETVALUE="CONTRACT_NETVALUE"
const CONTRACT_VATVALUE="CONTRACT_VATVALUE",CONTRACT_GROSS="CONTRACT_GROSS",PAYMENT_NETAMT="PAYMENT_NETAMT"
const CU_DESC = "CU-DESC-" + Cypress._.random(0, 999);
const INVOICE_NO="INVOICE_NO-" + Cypress._.random(0, 999);
const INVOICE_NO_1="INVOICE_NO_1-" + Cypress._.random(0, 999);
const INVOICE_NO_2="INVOICE_NO_2-" + Cypress._.random(0, 999);
const INVOICE_NO_3="INVOICE_NO_3-" + Cypress._.random(0, 999);
const INVOICE_NO_4="INVOICE_NO_4-" + Cypress._.random(0, 999);
const INVOICE_NO_5="INVOICE_NO_5-" + Cypress._.random(0, 999);
const INVOICE_NO_6="INVOICE_NO_6-" + Cypress._.random(0, 999);

const REFERENVE_NAME="REFERENVE_NAME-" + Cypress._.random(0, 999);
const BILLING_SCHEMA="BS-" + Cypress._.random(0, 999);
const BILLINGSCHEMADETAILSDESC="BSD-" + Cypress._.random(0, 999);
const PT_CODE="PC-" + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_BUSINESS_PARTNER
let CONTAINER_COLUMNS_BANK
let CONTAINERS_BANK
let CONTAINER_COLUMNS_BILLING_SCHEMA
let CONTAINER_COLUMNS_BILLING_SCHEMA_DETAILS
let CONTAINERS_BILLING_SCHEMA_DETAILS
let CONTAINER_COLUMNS_CONFIGURATION_HEADER
let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS:DataCells
let CONTAINERS_CONTROLLING_UNIT

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

const LINE_ITEM_DESCRIPTION='LI-DESC-' + Cypress._.random(0, 999);
let LINE_ITEMS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM

let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE

let CONTAINER_COLUMNS_PACKAGE

const PROJECT_NO="78" + Cypress._.random(0, 999);
const PROJECT_DESC="PR1DESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

let CONTAINER_COLUMNS_PAYMENT_TERM

let CONTAINERS_PAYMENT_TERM
let CONTAINER_COLUMNS_CONTRACTS
let CONTAINER_COLUMNS_CONTRACT_ITEMS
let CONTAINER_COLUMNS_INVOICE
let CONTAINER_COLUMNS_HEADERS
let CONTAINER_COLUMNS_PES_ITEMS
let CONTAINERS_PES
let CONTAINER_COLUMNS_INVOICE_CONTRACT_ITEMS
let CONTAINER_COLUMNS_INVOICE_BILLING_SCHEMA

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Invoice");
ALLURE.story("PCM- 2.49 | Create New Invoice directly by adding new record.");
describe("PCM- 2.49 | Create New Invoice directly by adding new record.", () => {

    
before(function () {
    cy.fixture("pcm/pcm-2.49-create-new-invoice-directly-by-adding-new-record.json")
      .then((data) => {
        this.data = data;
        CONTAINER_COLUMNS_BUSINESS_PARTNER=this.data.CONTAINER_COLUMNS.BUSINESS_PARTNER
        CONTAINER_COLUMNS_BANK=this.data.CONTAINER_COLUMNS.BANK
        MODAL_CREATE_UPDATE_MATERIAL_PACKAGE=this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
        CONTAINERS_BANK=this.data.CONTAINERS.BANK
        CONTAINER_COLUMNS_BILLING_SCHEMA=this.data.CONTAINER_COLUMNS.BILLING_SCHEMA
        CONTAINER_COLUMNS_BILLING_SCHEMA_DETAILS=this.data.CONTAINER_COLUMNS.BILLING_SCHEMA_DETAILS
        CONTAINERS_BILLING_SCHEMA_DETAILS=this.data.CONTAINERS.BILLING_SCHEMA_DETAILS
        CONTAINER_COLUMNS_CONFIGURATION_HEADER=this.data.CONTAINER_COLUMNS.CONFIGURATION_HEADER
        CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE
        CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
        CONTAINERS_CONTROLLING_UNIT=this.data.CONTAINERS.CONTROLLING_UNIT
        CONTROLLING_UNIT_PARAMETERS={
          [app.GridCells.DESCRIPTION_INFO]:CU_DESC,
          [app.GridCells.QUANTITY_SMALL]:CONTAINERS_CONTROLLING_UNIT.QUANTITY,
          [app.GridCells.UOM_FK]:CONTAINERS_CONTROLLING_UNIT.UOM
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
				  [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
			  };

        CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
        CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
        LINE_ITEMS_PARAMETERS={
          [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
          [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
          [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
        }

        MODAL_PROJECTS=this.data.MODAL.PROJECTS
        PROJECTS_PARAMETERS={
          [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
          [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
          [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK[0]
        }

        MODAL_CREATE_UPDATE_MATERIAL_PACKAGE=this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE

        CONTAINER_COLUMNS_PAYMENT_TERM=this.data.CONTAINER_COLUMNS.PAYMENT_TERM

        CONTAINERS_PAYMENT_TERM=this.data.CONTAINERS.PAYMENT_TERM

        CONTAINER_COLUMNS_CONTRACTS=this.data.CONTAINER_COLUMNS.CONTRACTS

        CONTAINER_COLUMNS_CONTRACT_ITEMS=this.data.CONTAINER_COLUMNS.CONTRACT_ITEMS

        CONTAINER_COLUMNS_INVOICE=this.data.CONTAINER_COLUMNS.INVOICE

        CONTAINER_COLUMNS_HEADERS=this.data.CONTAINER_COLUMNS.HEADERS
        CONTAINER_COLUMNS_PES_ITEMS=this.data.CONTAINER_COLUMNS.PES_ITEMS
        CONTAINERS_PES=this.data.CONTAINERS.PES
        CONTAINER_COLUMNS_INVOICE_CONTRACT_ITEMS=this.data.CONTAINER_COLUMNS.INVOICE_CONTRACT_ITEMS
        CONTAINER_COLUMNS_INVOICE_BILLING_SCHEMA=this.data.CONTAINER_COLUMNS.INVOICE_BILLING_SCHEMA
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
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
      })
});  

after(() => {
  cy.LOGOUT();
});

it("TC - Pre-condition",function(){
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER); 
  _common.waitForLoaderToDisappear()

  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
	_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.BUSINESS_PARTNER)
	_common.waitForLoaderToDisappear();

  cy.REFRESH_CONTAINER()
  _common.waitForLoaderToDisappear()
  cy.REFRESH_CONTAINER()
  _common.waitForLoaderToDisappear()

  _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
    _common.setDefaultView(app.TabBar.BUSINESS_PARTNERS)
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
    _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESS_PARTNER)
  });
  _common.maximizeContainer(cnt.uuid.BUSINESS_PARTNERS)
  _common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.BUSINESS_PARTNER)
  _common.waitForLoaderToDisappear()
  cy.REFRESH_CONTAINER()
  _common.waitForLoaderToDisappear()
  cy.REFRESH_CONTAINER()
  _common.waitForLoaderToDisappear()
  _common.clickOn_cellHasUniqueValue(cnt.uuid.BUSINESS_PARTNERS,app.GridCells.BUSINESS_PARTNER_NAME_1,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.BUSINESS_PARTNER)
  _common.minimizeContainer(cnt.uuid.BUSINESS_PARTNERS)

  _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BANKS, app.FooterTab.BANKS, 2);
    _common.setup_gridLayout(cnt.uuid.BANKS, CONTAINER_COLUMNS_BANK)
  });
  _common.search_inSubContainer(cnt.uuid.BANKS,CONTAINERS_BANK.BANK)
  _common.clickOn_cellHasUniqueValue(cnt.uuid.BANKS,app.GridCells.BANK_FK,CONTAINERS_BANK.BANK)
  _common.saveCellDataToEnv(cnt.uuid.BANKS,app.GridCells.BANK_TYPE_FK,BANK_TYPE)
})

it("TC - Create billing schema and assing billing schema to procurement configuration",function(){

  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING_SCHEMA);
  _common.waitForLoaderToDisappear()

  _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA,app.FooterTab.BILLINGSCHEMA)
    _common.setup_gridLayout(cnt.uuid.BILLING_SCHEMA,CONTAINER_COLUMNS_BILLING_SCHEMA)
  })
  _common.create_newRecord(cnt.uuid.BILLING_SCHEMA)
  _common.enterRecord_inNewRow(cnt.uuid.BILLING_SCHEMA,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,BILLING_SCHEMA)
  _common.waitForLoaderToDisappear()
  cy.SAVE()
  _common.waitForLoaderToDisappear()

  _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA_DETAILS,app.FooterTab.BILLINGSCHEMADETAILS)
    _common.setup_gridLayout(cnt.uuid.BILLING_SCHEMA_DETAILS,CONTAINER_COLUMNS_BILLING_SCHEMA_DETAILS)
  })

  _common.waitForLoaderToDisappear()
  _common.waitForLoaderToDisappear()
  _common.waitForLoaderToDisappear()
  _common.waitForLoaderToDisappear()
  _common.maximizeContainer(cnt.uuid.BILLING_SCHEMA_DETAILS)

  _common.waitForLoaderToDisappear()
  _common.select_allContainerData(cnt.uuid.BILLING_SCHEMA_DETAILS)
  _common.waitForLoaderToDisappear()
  _common.clickOn_actionButton_toSelectAction(cnt.uuid.BILLING_SCHEMA_DETAILS,commonLocators.CommonKeys.COLLAPSE)
  _common.waitForLoaderToDisappear()
  _common.select_allContainerData(cnt.uuid.BILLING_SCHEMA_DETAILS)
  _common.waitForLoaderToDisappear()
  _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.INVOICES)
  _common.clickOn_activeContainerButton(cnt.uuid.BILLING_SCHEMA_DETAILS,btn.IconButtons.ICO_TREE_COLLAPSE)
  _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.FINAL_INVOICE)
  _common.waitForLoaderToDisappear()
 // _common.create_newRecord(cnt.uuid.BILLING_SCHEMA_DETAILS)
  _billPage.createBillingSchemaDetailsRecord(cnt.uuid.BILLING_SCHEMA_DETAILS,commonLocators.CommonKeys.FINAL_INVOICE,BILLINGSCHEMADETAILSDESC,commonLocators.CommonKeys.NET_TOTAL,CONTAINERS_BILLING_SCHEMA_DETAILS.GENERAL_TYPE,CONTAINERS_BILLING_SCHEMA_DETAILS.TAX_CODE,CONTAINERS_BILLING_SCHEMA_DETAILS.CRED_FACTOR)
  _common.waitForLoaderToDisappear() 

  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION); 
  _common.waitForLoaderToDisappear()

  _common.openTab(app.TabBar.HEADER).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER, 0);
      _common.setup_gridLayout(cnt.uuid.CONFIGURATION_HEADER,CONTAINER_COLUMNS_CONFIGURATION_HEADER)
  });
  _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.MATERIAL)

  _common.openTab(app.TabBar.HEADER).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMAS, app.FooterTab.BILLING_SCHEMATA, 0);
  });
  _common.create_newRecord(cnt.uuid.BILLING_SCHEMAS)
  _common.edit_dropdownCellWithInput(cnt.uuid.BILLING_SCHEMAS,app.GridCells.BILLING_SCHEMA_FK,commonLocators.CommonKeys.LIST,app.InputFields.INPUT_GROUP_CONTENT,BILLING_SCHEMA)
  cy.SAVE()
})

it("TC - Create controlling unit", function () {
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS); 
  _common.waitForLoaderToDisappear()
  _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
    _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
  });
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
  _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  

  _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
    _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
    _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
  });
  _common.waitForLoaderToDisappear()
  _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
  _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
  cy.SAVE()
  _common.waitForLoaderToDisappear()
  _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT,CU_DESC)
  _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE,"CNTSUBCODE")
  _common.waitForLoaderToDisappear()
  cy.SAVE()
  _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
});

it("TC - Create payment term", function () {

  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PAYMENT_TERM); 
  _common.waitForLoaderToDisappear()

  _common.openTab(app.TabBar.PAYMENT_TERMS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PAYMENT_TERM, app.FooterTab.PAYMENT_TERMS, 0);
      _common.setup_gridLayout(cnt.uuid.PAYMENT_TERM, CONTAINER_COLUMNS_PAYMENT_TERM)
  });
  _common.waitForLoaderToDisappear()
  _common.maximizeContainer(cnt.uuid.PAYMENT_TERM)
  _common.create_newRecord(cnt.uuid.PAYMENT_TERM)
  _package.enterRecord_toCreatePaymentTerm(cnt.uuid.PAYMENT_TERM,PT_CODE,PT_CODE,PT_CODE,CONTAINERS_PAYMENT_TERM.NET_DAY,CONTAINERS_PAYMENT_TERM.DISCOUNT_DAYS,CONTAINERS_PAYMENT_TERM.DISCOUNT_PERCENT,CONTAINERS_PAYMENT_TERM.DAY_MONTH,CONTAINERS_PAYMENT_TERM.CAL_TYPE)
  cy.SAVE()
  _common.minimizeContainer(cnt.uuid.PAYMENT_TERM)
});
    
it("TC - Create estimate header", function() {
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT); 
  _common.waitForLoaderToDisappear()
  _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
  });
  _common.waitForLoaderToDisappear()
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
  _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
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

it("TC - Create line item", function() {
  _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)

  _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
    _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
		_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
		_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
	});
	_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
	_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEMS_PARAMETERS)
	cy.SAVE();
	_common.waitForLoaderToDisappear()
})   

it("TC - Add resource to line item.", function () {
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

it("TC - Create material package from wizard", function () {
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
  _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
});

it("TC - Change package status", function () {

  _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.setDefaultView(app.TabBar.PACKAGE)
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
   
it("TC - Create contract", function () {

  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
  _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
  _common.waitForLoaderToDisappear()
  _package.create_ContractfromPackage(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.BUSINESS_PARTNER)
  _common.waitForLoaderToDisappear()
  cy.wait(2000)
});

it("TC - Edit contract", function () {

  _common.openTab(app.TabBar.CONTRACT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
    _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACTS);
    _common.set_columnAtTop([CONTAINER_COLUMNS_CONTRACTS.controllingunitfk,CONTAINER_COLUMNS_CONTRACTS.clerkprcfk,CONTAINER_COLUMNS_CONTRACTS.description,CONTAINER_COLUMNS_CONTRACTS.paymenttermpafk,CONTAINER_COLUMNS_CONTRACTS.bankfk,CONTAINER_COLUMNS_CONTRACTS.code,CONTAINER_COLUMNS_CONTRACTS.configurationfk,CONTAINER_COLUMNS_CONTRACTS.billingschemafk],cnt.uuid.PROCUREMENTCONTRACT)
  })
  _common.waitForLoaderToDisappear()
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
  _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)

  _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
  _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("CONTRACT_CODE"))
  _common.waitForLoaderToDisappear()
  //_common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
  _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CODE,CONTRACT_ENV)
  _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONFIGURATION_FK,CONTRACT_CONFIG)

  _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CLERK_PRC_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,MODAL_PROJECTS.CLERK[0])
  _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CU_DESC)
  _common.enterRecord_inNewRow(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,REFERENVE_NAME)
  _common.waitForLoaderToDisappear() // This wait is necessary
  _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PAYMENT_TERM_PA_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PAYMENT_TERM.PAYMENT_TERM)
  _common.waitForLoaderToDisappear()
  cy.SAVE()
  _common.waitForLoaderToDisappear()
  _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
  _common.waitForLoaderToDisappear() // This wait is necessary
  _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.BANK_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_BANK.BANK)
  _common.waitForLoaderToDisappear() // This wait is necessary
  _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.BILLING_SCHEMA_FK,commonLocators.CommonKeys.LIST,app.InputFields.INPUT_GROUP_CONTENT,BILLING_SCHEMA)
  _common.waitForLoaderToDisappear()
  cy.SAVE()
  _common.waitForLoaderToDisappear() // This wait is necessary
})

it("TC - Change contract status and get contract columns value", function () {
  _common.openTab(app.TabBar.CONTRACT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
    _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT,CONTAINER_COLUMNS_CONTRACT_ITEMS);
    _common.set_columnAtTop([CONTAINER_COLUMNS_CONTRACT_ITEMS.quantity],cnt.uuid.ITEMSCONTRACT)
  })
  _common.waitForLoaderToDisappear()
  _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
  _common.select_activeRowInContainer(cnt.uuid.ITEMSCONTRACT)
  _common.waitForLoaderToDisappear()
  _common.saveCellDataToEnv(cnt.uuid.ITEMSCONTRACT,app.GridCells.QUANTITY_SMALL,CONTRACT_ENV_QTY)
  _common.waitForLoaderToDisappear()

  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
  _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
  _common.waitForLoaderToDisappear()
  _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
  _common.waitForLoaderToDisappear()

  //Fetch contract values

  _common.openTab(app.TabBar.CONTRACT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
    _common.set_columnAtTop([CONTAINER_COLUMNS_CONTRACTS.businesspartnerfk,CONTAINER_COLUMNS_CONTRACTS.supplierfk,CONTAINER_COLUMNS_CONTRACTS.bankfk,CONTAINER_COLUMNS_CONTRACTS.subsidiaryfk,CONTAINER_COLUMNS_CONTRACTS.code],cnt.uuid.PROCUREMENTCONTRACT)
    _common.waitForLoaderToDisappear()
  })
  _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env(CONTRACT_ENV))
  _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
  _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.BUSINESS_PARTNER_FK,CONTRACT_BP_ENV)
  _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.SUPPLIER_FK,CONTRACT_SP_ENV)
  _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.BANK_FK,CONTRACT_BANK_ENV)
  _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.SUBSIDIARY_FK,CONTRACT_BRANCH_ENV)

  _common.set_columnAtTop([CONTAINER_COLUMNS_CONTRACTS.taxcodefk,CONTAINER_COLUMNS_CONTRACTS.bpdvatgroupfk,CONTAINER_COLUMNS_CONTRACTS.bascurrencyfk],cnt.uuid.PROCUREMENTCONTRACT)
  _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env(CONTRACT_ENV))
  _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
  _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.TAX_CODE_FK,CONTRACT_TC)
  _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.BPD_VAT_GROUP_FK,CONTRACT_VAT)
  _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.BAS_CURRENCY_FK,CONTRACT_CUR)

  _common.set_columnAtTop([CONTAINER_COLUMNS_CONTRACTS.structureCode,CONTAINER_COLUMNS_CONTRACTS.projectfk,CONTAINER_COLUMNS_CONTRACTS.packagefk],cnt.uuid.PROCUREMENTCONTRACT)
  _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env(CONTRACT_ENV))
  _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
  _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.STRUCTURE_CODE,CONTRACT_SC)
  _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PROJECT_FK,CONTRACT_PNO)
  _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PACKAGE_FK,CONTRACT_PK)

  _common.set_columnAtTop([CONTAINER_COLUMNS_CONTRACTS.paymenttermpafk,CONTAINER_COLUMNS_CONTRACTS.paymenttermfifk],cnt.uuid.PROCUREMENTCONTRACT)
  _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env(CONTRACT_ENV))
  _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
  _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PAYMENT_TERM_PA_FK,CONTRACT_PA)
  _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PAYMENT_TERM_FI_FK,CONTRACT_PAFI)

  _common.openTab(app.TabBar.CONTRACT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.CONTRACT_TOTALS, app.FooterTab.TOTAL, 0)
  })
  _common.waitForLoaderToDisappear()
  _common.search_inSubContainer(cnt.uuid.CONTRACT_TOTALS,commonLocators.CommonKeys.TOTAL)
  _common.select_activeRowInContainer(cnt.uuid.CONTRACT_TOTALS)
  _common.saveCellDataToEnv(cnt.uuid.CONTRACT_TOTALS,app.GridCells.VALUE_NET,CONTRACT_NETVALUE)
  _common.saveCellDataToEnv(cnt.uuid.CONTRACT_TOTALS,app.GridCells.GROSS,CONTRACT_GROSS)
  _common.saveCellDataToEnv(cnt.uuid.CONTRACT_TOTALS,app.GridCells.VALUE_TAX,CONTRACT_VATVALUE)
})

it("TC - Verify set value to contract, progress invoice should according contract to regenerate", function () {
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE); 
  _common.waitForLoaderToDisappear()
  _common.openTab(app.TabBar.INVOICES).then(() => {
    _common.setDefaultView(app.TabBar.INVOICES)
    _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 1)
    _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE);
  })
  _common.set_columnAtTop([CONTAINER_COLUMNS_INVOICE.projectfk,CONTAINER_COLUMNS_INVOICE.conheaderfk,CONTAINER_COLUMNS_INVOICE.reference,CONTAINER_COLUMNS_INVOICE.prcconfigurationfk,CONTAINER_COLUMNS_INVOICE.invtypefk,CONTAINER_COLUMNS_INVOICE.progressid],cnt.uuid.INVOICEHEADER)
  _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
  _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
  _common.create_newRecord(cnt.uuid.INVOICEHEADER)
  _package.enterRecord_toCreateInvoiceHeader({container_UUID:cnt.uuid.INVOICEHEADER,invoiceNo:INVOICE_NO_4,contract:Cypress.env(CONTRACT_ENV)})
  _common.edit_dropdownCellWithInput(cnt.uuid.INVOICEHEADER,app.GridCells.PRC_CONFIGURATION_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,commonLocators.CommonKeys.SERVICE_PA)
  _common.edit_dropdownCellWithInput(cnt.uuid.INVOICEHEADER,app.GridCells.INV_TYPE_FK,commonLocators.CommonKeys.LIST,app.InputFields.INPUT_GROUP_CONTENT,commonLocators.CommonKeys.PROGRESS_INVOICE)
  cy.SAVE()
  _common.waitForLoaderToDisappear()
  _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO_4)
  _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
  _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
  _common.waitForLoaderToDisappear()
  _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
  _common.waitForLoaderToDisappear()
  _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.PROGRESS_ID,"1")

  _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
  _common.create_newRecord(cnt.uuid.INVOICEHEADER)
  _package.enterRecord_toCreateInvoiceHeader({container_UUID:cnt.uuid.INVOICEHEADER,invoiceNo:INVOICE_NO_5,contract:Cypress.env(CONTRACT_ENV)})
  _common.edit_dropdownCellWithInput(cnt.uuid.INVOICEHEADER,app.GridCells.PRC_CONFIGURATION_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,commonLocators.CommonKeys.SERVICE_PA)
  _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
  _common.waitForLoaderToDisappear()
  _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
  _common.waitForLoaderToDisappear()
  _common.edit_dropdownCellWithInput(cnt.uuid.INVOICEHEADER,app.GridCells.INV_TYPE_FK,commonLocators.CommonKeys.LIST,app.InputFields.INPUT_GROUP_CONTENT,commonLocators.CommonKeys.PROGRESS_INVOICE)
  _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
  _common.waitForLoaderToDisappear()
  _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
  _common.waitForLoaderToDisappear()
  cy.SAVE()
  _common.waitForLoaderToDisappear()
  _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
  _common.waitForLoaderToDisappear()
  _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
  _common.waitForLoaderToDisappear()

  
  _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO_5)
  _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
  _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.PROGRESS_ID,"2")
})

it("TC - Create PES", function () {

  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);

  _common.openTab(app.TabBar.CONTRACT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
  })
  _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env(CONTRACT_ENV))
  _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)

  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
  _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
  _common.waitForLoaderToDisappear()
  cy.wait(1000)// Added this wait as script was getting failed
  _procurementPage.getCode_fromPESModal(PES_ENV)
  _common.waitForLoaderToDisappear()
  _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.GO_TO_PES)
  _common.waitForLoaderToDisappear()
})

it("TC - Change PES status", function () {

  _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
    _common.setDefaultView(app.TabBar.PERFORMANCEENTRYSHEET)
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
    _common.setup_gridLayout(cnt.uuid.HEADERS,CONTAINER_COLUMNS_HEADERS);
  })
  _common.select_activeRowInContainer(cnt.uuid.HEADERS)
  _common.saveCellDataToEnv(cnt.uuid.HEADERS,app.GridCells.CODE,PES_ENV)

  _common.openTab(app.TabBar.PESBOQ).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2)
    _common.setup_gridLayout(cnt.uuid.ITEMS,CONTAINER_COLUMNS_PES_ITEMS);
    _common.set_columnAtTop([CONTAINER_COLUMNS_PES_ITEMS.quantity,CONTAINER_COLUMNS_PES_ITEMS.quantityremaining],cnt.uuid.ITEMS)
  })
  _common.clear_subContainerFilter(cnt.uuid.ITEMS)
  _common.select_activeRowInContainer(cnt.uuid.ITEMS)
  _common.enterRecord_inNewRow(cnt.uuid.ITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PES.QUANTITY[0])
  _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ITEMS).findGrid().findActiveRow().findCell(app.GridCells.QUANTITY_REMAINING)
  _common.waitForLoaderToDisappear()
  cy.SAVE()
  _common.waitForLoaderToDisappear()
  cy.SAVE()
  _common.waitForLoaderToDisappear()

  _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
    _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
  })
  _common.set_columnAtTop([CONTAINER_COLUMNS_HEADERS.code,CONTAINER_COLUMNS_HEADERS.TotalGross],cnt.uuid.HEADERS)
  _common.saveCellDataToEnv(cnt.uuid.HEADERS,app.GridCells.TOTAL_GROSS,PES_ENV_TG)

  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
  _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS);
  _common.waitForLoaderToDisappear()
  _common.changeStatus_fromModal(commonLocators.CommonKeys.ACCEPTION)
  _common.waitForLoaderToDisappear()
})

it("TC - Create invoice header", function () {

  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE); 
  _common.waitForLoaderToDisappear()

  _common.openTab(app.TabBar.INVOICES).then(() => {
    _common.setDefaultView(app.TabBar.INVOICES)
    _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 1)
    _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE);
  })
  _common.waitForLoaderToDisappear()
  _validate.verify_isContainerMinimized(cnt.uuid.INVOICEHEADER)
  _common.set_columnAtTop([CONTAINER_COLUMNS_INVOICE.amountgross,CONTAINER_COLUMNS_INVOICE.amountnet,CONTAINER_COLUMNS_INVOICE.conheaderfk,CONTAINER_COLUMNS_INVOICE.pesheaderfk,CONTAINER_COLUMNS_INVOICE.reference,CONTAINER_COLUMNS_INVOICE.invtypefk],cnt.uuid.INVOICEHEADER)
  _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
  _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
  _common.create_newRecord(cnt.uuid.INVOICEHEADER)
  _package.enterRecord_toCreateInvoiceHeader({container_UUID:cnt.uuid.INVOICEHEADER,invoiceNo:INVOICE_NO,pes:Cypress.env(PES_ENV),contract:Cypress.env(CONTRACT_ENV)})
  _common.enterRecord_inNewRow(cnt.uuid.INVOICEHEADER,app.GridCells.AMOUNT_GROSS,app.InputFields.INPUT_GROUP_CONTENT,parseFloat(Cypress.env(PES_ENV_TG).replace(',','')).toFixed(2))

  cy.SAVE()
  _common.waitForLoaderToDisappear()
  cy.SAVE()

  _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)
  _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
  _common.saveCellDataToEnv(cnt.uuid.INVOICEHEADER,app.GridCells.INV_TYPE_FK,PAYMENT_TERM)
  _common.saveCellDataToEnv(cnt.uuid.INVOICEHEADER,app.GridCells.AMOUNT_NET,PAYMENT_NETAMT)
})

it("TC - Verify contract/total/CO, contract total/invoice/%,contract gross/co gross, contract gross/invoice gross/% should get correct value and calculate", function () {
  _common.openTab(app.TabBar.INVOICES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.INVOICE_HEADER_DETAILS, app.FooterTab.INVOICE_HEADER_DETAILS, 2)
  })
  _validate.verify_isContainerMinimized(cnt.uuid.INVOICEHEADER)
  _validate.verify_invoiceHeaderDetailsValues(cnt.uuid.INVOICE_HEADER_DETAILS,commonLocators.CommonKeys.ALLOCATION,Cypress.env(CONTRACT_NETVALUE),Cypress.env(PAYMENT_NETAMT),Cypress.env(CONTRACT_GROSS),Cypress.env(PES_ENV_TG))
})

it("TC - Verify  set value to pes, the contract will get value from pes, and other columns will get value according setted contract, also, it will auto create record for pes container", function () {
  _common.openTab(app.TabBar.INVOICES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.CONTRACT_ITEMS, app.FooterTab.CONTRACT_ITEMS, 2)
    _common.setup_gridLayout(cnt.uuid.CONTRACT_ITEMS,CONTAINER_COLUMNS_INVOICE_CONTRACT_ITEMS);
  })
  _validate.verify_isContainerMinimized(cnt.uuid.INVOICEHEADER)
  _common.set_columnAtTop([CONTAINER_COLUMNS_INVOICE_CONTRACT_ITEMS.quantity,CONTAINER_COLUMNS_INVOICE_CONTRACT_ITEMS.prcitemfk],cnt.uuid.CONTRACT_ITEMS)
  _common.create_newRecord(cnt.uuid.CONTRACT_ITEMS)
  _common.enterRecord_inNewRow(cnt.uuid.CONTRACT_ITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,Cypress.env(CONTRACT_ENV_QTY))
  _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.CONTRACT_ITEMS).findGrid().findActiveRow().findCell(app.GridCells.PRC_ITEM_FK)
  _common.waitForLoaderToDisappear()
  _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.CONTRACT_ITEMS).findGrid().findActiveRow().findCell(app.GridCells.QUANTITY_SMALL)
  _common.waitForLoaderToDisappear()
  _common.edit_dropdownCellWithInput(cnt.uuid.CONTRACT_ITEMS,app.GridCells.PRC_ITEM_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RESOURCE.DESCRIPTION)
  _common.waitForLoaderToDisappear()
  _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.CONTRACT_ITEMS).findGrid().findActiveRow().findCell(app.GridCells.QUANTITY_SMALL)
  _common.waitForLoaderToDisappear()
  cy.SAVE()
  _common.waitForLoaderToDisappear()

  _common.openTab(app.TabBar.INVOICES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.INVOICE_HEADER_DETAILS, app.FooterTab.INVOICE_HEADER_DETAILS, 2)
  })
  _validate.verify_isCustomizeFormVisbilityChecked(cnt.uuid.INVOICE_HEADER_DETAILS,commonLocators.CommonKeys.RECONCILIATION)
  _validate.verify_invoiceHeaderDetailsValues(cnt.uuid.INVOICE_HEADER_DETAILS,commonLocators.CommonKeys.RECONCILIATION,Cypress.env(CONTRACT_NETVALUE),Cypress.env(PAYMENT_NETAMT),Cypress.env(CONTRACT_GROSS),Cypress.env(PES_ENV_TG))
})

it("TC - Verify billing schema should get value from contract and generate records for billing schema containers", function () {

  _common.openTab(app.TabBar.INVOICES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
    _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE);
  })
  _validate.verify_isContainerMinimized(cnt.uuid.INVOICEHEADER)
  _common.set_columnAtTop([CONTAINER_COLUMNS_INVOICE.billingschemafk],cnt.uuid.INVOICEHEADER)
  _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
  _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)
  _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
  _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.BILLING_SCHEMA_FK,BILLING_SCHEMA)
  
  _common.openTab(app.TabBar.INVOICES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.INVOICE_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA, 2)
    _common.setup_gridLayout(cnt.uuid.INVOICE_BILLING_SCHEMA,CONTAINER_COLUMNS_INVOICE_BILLING_SCHEMA);
  })
  _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,BILLINGSCHEMADETAILSDESC)
  //_common.select_activeRowInContainer(cnt.uuid.INVOICE_BILLING_SCHEMA)
  _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICE_BILLING_SCHEMA,app.GridCells.DESCRIPTION,BILLINGSCHEMADETAILSDESC)
})

it("TC - Verify the business partner and branch and supplier and bank should get value from contract", function () {
  _common.openTab(app.TabBar.INVOICES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 1)
    _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE);
  })
  _validate.verify_isContainerMinimized(cnt.uuid.INVOICEHEADER)
  _common.set_columnAtTop([CONTAINER_COLUMNS_INVOICE.supplierfk,CONTAINER_COLUMNS_INVOICE.bankfk,CONTAINER_COLUMNS_INVOICE.subsidiaryfk,CONTAINER_COLUMNS_INVOICE.businesspartnerfk],cnt.uuid.INVOICEHEADER)
  _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)
  _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
  _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.BUSINESS_PARTNER_FK,Cypress.env(CONTRACT_BP_ENV))
  _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.SUPPLIER_FK,Cypress.env(CONTRACT_SP_ENV))
  _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.BANK_FK,Cypress.env(CONTRACT_BANK_ENV))
  _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.SUBSIDIARY_FK,Cypress.env(CONTRACT_BRANCH_ENV))
})

it("TC - Verify vat group and currency and tax code should get value from contract", function () {

 _common.openTab(app.TabBar.INVOICES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 1)
    _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE);
  })
  _validate.verify_isContainerMinimized(cnt.uuid.INVOICEHEADER)
  _common.set_columnAtTop([CONTAINER_COLUMNS_INVOICE.taxcodefk,CONTAINER_COLUMNS_INVOICE.bpdvatgroupfk,CONTAINER_COLUMNS_INVOICE.currencyfk],cnt.uuid.INVOICEHEADER)
  _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)
  _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
  _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.TAX_CODE_FK,Cypress.env(CONTRACT_TC))
  _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.BPD_VAT_GROUP_FK,Cypress.env(CONTRACT_VAT))
  _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.CURRENCY_FK,Cypress.env(CONTRACT_CUR))
})

it("TC - Verify project,package,structure code,should get value from contract", function () {

  _common.openTab(app.TabBar.INVOICES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 1)
    _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE);
  })
  _validate.verify_isContainerMinimized(cnt.uuid.INVOICEHEADER)
  _common.set_columnAtTop([CONTAINER_COLUMNS_INVOICE.prcstructurefk,CONTAINER_COLUMNS_INVOICE.projectfk,CONTAINER_COLUMNS_INVOICE.prcpackagefk],cnt.uuid.INVOICEHEADER)
  _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)
  _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
  _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.PRC_STRUCTURE_FK,Cypress.env(CONTRACT_SC))
  _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.PROJECT_FK,Cypress.env(CONTRACT_PNO))
  _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.PRC_PACKAGE_FK,Cypress.env(CONTRACT_PK))
})

it("TC - Verify the bank type should get value according selected bank)", function () {

  _common.openTab(app.TabBar.INVOICES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 1)
    _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE);
  })
  _validate.verify_isContainerMinimized(cnt.uuid.INVOICEHEADER)
  _common.set_columnAtTop([CONTAINER_COLUMNS_INVOICE.bankfk,CONTAINER_COLUMNS_INVOICE.bpdbanktypefk],cnt.uuid.INVOICEHEADER)
  _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)
  _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
  _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.BANK_FK,Cypress.env(CONTRACT_BANK_ENV))
  _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.BPD_BANK_TYPE_FK,Cypress.env(BANK_TYPE))
})

it("TC - Verify set value to contract, the configuration should changed to with contract.configuration.configheader", function () {
  _common.openTab(app.TabBar.INVOICES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 1)
    _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE);
  })
  _validate.verify_isContainerMinimized(cnt.uuid.INVOICEHEADER)

  _common.set_columnAtTop([CONTAINER_COLUMNS_INVOICE.prcconfigurationfk],cnt.uuid.INVOICEHEADER)
  _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
  _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)
  _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
  _common.waitForLoaderToDisappear()
  _validate.verify_invoiceConfiguration(cnt.uuid.INVOICEHEADER,Cypress.env(CONTRACT_CONFIG))
})

it("TC - Verify set value to payment term, the discount date and discount basis and discount amount and net payable should be calculated", function () {

  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE); 
  _common.openTab(app.TabBar.INVOICES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 1)
    _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE);
  })
  _validate.verify_isContainerMinimized(cnt.uuid.INVOICEHEADER)
  _common.set_columnAtTop([CONTAINER_COLUMNS_INVOICE.projectfk,CONTAINER_COLUMNS_INVOICE.conheaderfk,CONTAINER_COLUMNS_INVOICE.reference,CONTAINER_COLUMNS_INVOICE.datediscount,CONTAINER_COLUMNS_INVOICE.amountdiscountbasis,CONTAINER_COLUMNS_INVOICE.amountdiscount,CONTAINER_COLUMNS_INVOICE.datenetpayable,CONTAINER_COLUMNS_INVOICE.amountgross,CONTAINER_COLUMNS_INVOICE.paymenttermfk],cnt.uuid.INVOICEHEADER)
  _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
  _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
  _common.create_newRecord(cnt.uuid.INVOICEHEADER)
  _common.waitForLoaderToDisappear()
  _common.clickOn_activeRowCell(cnt.uuid.INVOICEHEADER,app.GridCells.PROJECT_FK)
  _common.waitForLoaderToDisappear()
  _package.enterRecord_toCreateInvoiceHeader({container_UUID:cnt.uuid.INVOICEHEADER,invoiceNo:INVOICE_NO_3,contract:Cypress.env(CONTRACT_ENV)})
  _common.enterRecord_inNewRow(cnt.uuid.INVOICEHEADER,app.GridCells.AMOUNT_GROSS,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PAYMENT_TERM.AMOUNT_GROSS[0])
  _common.edit_dropdownCellWithInput(cnt.uuid.INVOICEHEADER,app.GridCells.PAYMENT_TERM_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,PT_CODE)
  _common.waitForLoaderToDisappear()
  cy.SAVE()
  _common.waitForLoaderToDisappear()
  _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
  _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO_3)

  _validate.verify_paymentTermCalculation(cnt.uuid.INVOICEHEADER,commonLocators.CommonKeys.DISCOUNT_AMOUNT,CONTAINERS_PAYMENT_TERM.DISCOUNT_DAYS,CONTAINERS_PAYMENT_TERM.DISCOUNT_PERCENT,CONTAINERS_PAYMENT_TERM.DAY_MONTH,CONTAINERS_PAYMENT_TERM.CAL_TYPE,CONTAINERS_PAYMENT_TERM.AMOUNT_GROSS[0])
  _validate.verify_paymentTermCalculation(cnt.uuid.INVOICEHEADER,commonLocators.CommonKeys.DISCOUNT_BASIS,CONTAINERS_PAYMENT_TERM.DISCOUNT_DAYS,CONTAINERS_PAYMENT_TERM.DISCOUNT_PERCENT,CONTAINERS_PAYMENT_TERM.DAY_MONTH,CONTAINERS_PAYMENT_TERM.CAL_TYPE,CONTAINERS_PAYMENT_TERM.AMOUNT_GROSS[0])
  _validate.verify_paymentTermCalculation(cnt.uuid.INVOICEHEADER,commonLocators.CommonKeys.DISCOUNT_DATE,CONTAINERS_PAYMENT_TERM.DISCOUNT_DAYS,CONTAINERS_PAYMENT_TERM.DISCOUNT_PERCENT,CONTAINERS_PAYMENT_TERM.DAY_MONTH,CONTAINERS_PAYMENT_TERM.CAL_TYPE,CONTAINERS_PAYMENT_TERM.AMOUNT_GROSS[0])
  _validate.verify_paymentTermCalculation(cnt.uuid.INVOICEHEADER,commonLocators.CommonKeys.NET_PAYABLE,CONTAINERS_PAYMENT_TERM.DISCOUNT_DAYS,CONTAINERS_PAYMENT_TERM.DISCOUNT_PERCENT,CONTAINERS_PAYMENT_TERM.DAY_MONTH,CONTAINERS_PAYMENT_TERM.CAL_TYPE,CONTAINERS_PAYMENT_TERM.AMOUNT_GROSS[0])
  _common.minimizeContainer(cnt.uuid.INVOICEHEADER)
})

it("TC - Verify set value to amount gross, it will recalculate amount net(amount net oc), amount gross(od), total performed net, total performed gross; same when modify amount net, it will recalculated other columns", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE); 
      _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 1)
      _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE);
    })
    _validate.verify_isContainerMinimized(cnt.uuid.INVOICEHEADER)
    _common.set_columnAtTop([CONTAINER_COLUMNS_INVOICE.projectfk,CONTAINER_COLUMNS_INVOICE.conheaderfk,CONTAINER_COLUMNS_INVOICE.reference,CONTAINER_COLUMNS_INVOICE.amountnetoc,CONTAINER_COLUMNS_INVOICE.amountgrossoc,CONTAINER_COLUMNS_INVOICE.totalperformedgross,CONTAINER_COLUMNS_INVOICE.totalperformednet,CONTAINER_COLUMNS_INVOICE.amountVatBalance,CONTAINER_COLUMNS_INVOICE.amountnet,CONTAINER_COLUMNS_INVOICE.amountgross],cnt.uuid.INVOICEHEADER)
    _common.waitForLoaderToDisappear()
    cy.wait(1000)
    _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
    _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
    _common.create_newRecord(cnt.uuid.INVOICEHEADER)
    _common.waitForLoaderToDisappear()
    _common.clickOn_activeRowCell(cnt.uuid.INVOICEHEADER,app.GridCells.PROJECT_FK)
    _common.waitForLoaderToDisappear()
    _package.enterRecord_toCreateInvoiceHeader({container_UUID:cnt.uuid.INVOICEHEADER,invoiceNo:INVOICE_NO_6,contract:Cypress.env(CONTRACT_ENV)})
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    _common.enterRecord_inNewRow(cnt.uuid.INVOICEHEADER,app.GridCells.AMOUNT_GROSS,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PAYMENT_TERM.AMOUNT_GROSS[1])
    _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
    _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO_6)
    _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
    _common.waitForLoaderToDisappear()
    _validate.verify_InvoiceSetAmountGross(cnt.uuid.INVOICEHEADER,CONTAINERS_PAYMENT_TERM.AMOUNT_GROSS[1]) 

    //--------
    _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
    _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO_6)
    _common.enterRecord_inNewRow(cnt.uuid.INVOICEHEADER,app.GridCells.AMOUNT_NET,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PAYMENT_TERM.AMOUNT_NET)
    _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
    _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO_6)
    _validate.verify_InvoiceSetAmountNet(cnt.uuid.INVOICEHEADER,CONTAINERS_PAYMENT_TERM.AMOUNT_NET) 
    _common.minimizeContainer(cnt.uuid.INVOICEHEADER)
})

it("TC - Verify if is-progress=false, then the payment term get value from contract.payment term(FI)", function () {

  //Customizing Code Start
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
  _common.waitForLoaderToDisappear()

  _common.openTab(app.TabBar.MASTER_DATA).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
  })
  _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,commonLocators.CommonKeys.INVOICE_TYPE)
  _common.waitForLoaderToDisappear()
  cy.REFRESH_CONTAINER()
  _common.waitForLoaderToDisappear()
  _common.waitForLoaderToDisappear()
  cy.REFRESH_CONTAINER()
  _common.waitForLoaderToDisappear()
  _common.waitForLoaderToDisappear()
  cy.REFRESH_CONTAINER()
  _common.waitForLoaderToDisappear()
  _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,commonLocators.CommonKeys.INVOICE_TYPE)

  _common.openTab(app.TabBar.MASTER_DATA).then(() => {
    _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
  })
  _common.search_inSubContainer(cnt.uuid.INSTANCES,Cypress.env(PAYMENT_TERM))
  _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,Cypress.env(PAYMENT_TERM))
  _validate.customizing_DataRecordCheckBox(app.GridCells.IS_PROGRESS,commonLocators.CommonKeys.UNCHECK)
  cy.SAVE()
  _common.waitForLoaderToDisappear()

  //Custominzing Code End

  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
  _common.waitForLoaderToDisappear()

  _common.openTab(app.TabBar.CONTRACT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
    _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACTS);
  })
  _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env(CONTRACT_ENV))
  _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)

  _common.clickOn_goToButton_toSelectModule(cnt.uuid.PROCUREMENTCONTRACT, commonLocators.CommonKeys.INVOICE)
  _common.waitForLoaderToDisappear()

  _common.openTab(app.TabBar.INVOICES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 1)
     _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE);
  })
  _common.set_columnAtTop([CONTAINER_COLUMNS_INVOICE.projectfk,CONTAINER_COLUMNS_INVOICE.conheaderfk,CONTAINER_COLUMNS_INVOICE.pesheaderfk,CONTAINER_COLUMNS_INVOICE.reference,CONTAINER_COLUMNS_INVOICE.invtypefk,CONTAINER_COLUMNS_INVOICE.paymenttermfk],cnt.uuid.INVOICEHEADER)
  _common.waitForLoaderToDisappear()
  _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
  _common.waitForLoaderToDisappear()
  _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
  _common.create_newRecord(cnt.uuid.INVOICEHEADER)
  _common.waitForLoaderToDisappear()
  _package.enterRecord_toCreateInvoiceHeader({container_UUID:cnt.uuid.INVOICEHEADER,invoiceNo:INVOICE_NO_1,contract:Cypress.env(CONTRACT_ENV)})
  cy.SAVE()
  _common.waitForLoaderToDisappear()
  _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO_1)
  _common.clickOn_cellHasUniqueValue(cnt.uuid.INVOICEHEADER,app.GridCells.REFERENCE,INVOICE_NO_1)
  _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.PAYMENT_TERM_FK,Cypress.env(CONTRACT_PAFI))
})

it("TC - Verify if is-progress=true,then the payment term get value contract.payment term(PA)", function () {

  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
  _common.waitForLoaderToDisappear()

  _common.openTab(app.TabBar.MASTER_DATA).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
  })
  _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,commonLocators.CommonKeys.INVOICE_TYPE)
  _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,commonLocators.CommonKeys.INVOICE_TYPE)

  _common.openTab(app.TabBar.MASTER_DATA).then(() => {
    _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
  })
  _common.search_inSubContainer(cnt.uuid.INSTANCES,Cypress.env(PAYMENT_TERM))
  _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,Cypress.env(PAYMENT_TERM))
  _validate.customizing_DataRecordCheckBox(app.GridCells.IS_PROGRESS,commonLocators.CommonKeys.CHECK)
  cy.SAVE()
  _common.waitForLoaderToDisappear()
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACTS);
    })
    _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env(CONTRACT_ENV))
    _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)

    _common.clickOn_goToButton_toSelectModule(cnt.uuid.PROCUREMENTCONTRACT, commonLocators.CommonKeys.INVOICE)

    _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 1)
      _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE);
    })
    _common.set_columnAtTop([CONTAINER_COLUMNS_INVOICE.projectfk,CONTAINER_COLUMNS_INVOICE.conheaderfk,CONTAINER_COLUMNS_INVOICE.pesheaderfk,CONTAINER_COLUMNS_INVOICE.reference,CONTAINER_COLUMNS_INVOICE.invtypefk,CONTAINER_COLUMNS_INVOICE.paymenttermfk],cnt.uuid.INVOICEHEADER)
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
    _common.create_newRecord(cnt.uuid.INVOICEHEADER)
    _common.waitForLoaderToDisappear()
    _package.enterRecord_toCreateInvoiceHeader({container_UUID:cnt.uuid.INVOICEHEADER,invoiceNo:INVOICE_NO_2,contract:Cypress.env(CONTRACT_ENV)})
    cy.wait(1000) // Added this as script was getting failed
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.wait(1000) // Added this as script was getting failed

    _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO_2)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.INVOICEHEADER,app.GridCells.REFERENCE,INVOICE_NO_2)
    _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.PAYMENT_TERM_FK,Cypress.env(CONTRACT_PA))
})

})

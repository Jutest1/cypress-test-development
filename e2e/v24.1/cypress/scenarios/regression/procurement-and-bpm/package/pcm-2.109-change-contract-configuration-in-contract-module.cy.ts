import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { _common, _controllingUnit, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView, _modalView, _validate, _rfqPage, _saleContractPage, _procurementPage, _salesPage, _procurementConfig, _procurementContractPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const BILLINGSCHEMANAME = "BS1-" + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_CONTRACT;
let CONTAINERS_CONTRACT;
let CONTRACT_PARAMETER:DataCells;
let CONTAINER_COLUMNS_BILLING_SCHEMA;
let CONTAINER_COLUMNS_CONFIG_HEADER;
let CONTAINER_COLUMNS_CONTRACT_BILLING_SCHEMA;
let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE
let CONTAINER_COLUMNS_GENERALS
let CONTAINER_COLUMNS_CERTIFICATE
let CONTAINER_COLUMNS_CONFIGURATION
let CONTAINER_COLUMNS_HEADER_TEXT
let CONTAINERS_CONFIG_HEADER;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.109 | Change contract configuration in contract module");
describe("PCM- 2.109 | Change contract configuration in contract module", () => {    
    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("pcm/pcm-2.109-change-contract-configuration-in-contract-module.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_CONTRACT=this.data.CONTAINER_COLUMNS.CONTRACT
            CONTAINERS_CONTRACT=this.data.CONTAINERS.CONTRACT
            CONTRACT_PARAMETER= {
                [commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_CONTRACT.CONFIGURATION,
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINERS_CONTRACT.BP
            }
            CONTAINER_COLUMNS_BILLING_SCHEMA= this.data.CONTAINER_COLUMNS.BILLING_SCHEMA
            CONTAINER_COLUMNS_CONFIG_HEADER = this.data.CONTAINER_COLUMNS.CONFIG_HEADER           
            CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE = this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE
            CONTAINER_COLUMNS_GENERALS = this.data.CONTAINER_COLUMNS.GENERALS
            CONTAINER_COLUMNS_CERTIFICATE = this.data.CONTAINER_COLUMNS.CERTIFICATE
            CONTAINER_COLUMNS_CONFIGURATION= this.data.CONTAINER_COLUMNS.CONFIGURATION
            CONTAINER_COLUMNS_HEADER_TEXT=this.data.CONTAINER_COLUMNS.HEADER_TEXT
            CONTAINERS_CONFIG_HEADER = this.data.CONTAINERS.CONFIG_HEADER
            CONTAINER_COLUMNS_CONTRACT_BILLING_SCHEMA=this.data.CONTAINER_COLUMNS.CONTRACT_BILLING_SCHEMA

            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        })
    })
    after(() => {
        cy.LOGOUT();
    });

    it('TC - Prerequisites-Procurement configuration/Billing Schema', function () {      
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER, 0);
            _common.setup_gridLayout(cnt.uuid.CONFIGURATION_HEADER, CONTAINER_COLUMNS_CONFIG_HEADER)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONFIGURATION_HEADER)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_CONFIG_HEADER.SERVICE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMAS, app.FooterTab.BILLING_SCHEMATA, 0);
            _common.setup_gridLayout(cnt.uuid.BILLING_SCHEMAS, CONTAINER_COLUMNS_BILLING_SCHEMA)
        });
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMAS, app.GridCells.BILLING_SCHEMA_FK, CONTAINERS_CONFIG_HEADER.STANDARD_CUMULATIVE)
        _common.set_cellCheckboxValue(cnt.uuid.BILLING_SCHEMAS, app.GridCells.IS_DEFAULT, CONTAINERS_CONFIG_HEADER.CHECK);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING_SCHEMA);
        _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA, app.FooterTab.BILLINGSCHEMA, 0);
            _common.setup_gridLayout(cnt.uuid.BILLING_SCHEMA, CONTAINER_COLUMNS_CONFIG_HEADER)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA, app.GridCells.DESCRIPTION_INFO, CONTAINERS_CONFIG_HEADER.STANDARD_CUMULATIVE)
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.BILLING_SCHEMA_DETAILS)
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.BILLING_SCHEMA_DETAILS)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.DESCRIPTION_INFO, CONTAINERS_CONFIG_HEADER.CONTRACT)
        _common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.DESCRIPTION_INFO, CONTAINERS_CONFIG_HEADER.CONSTRUCTION)
        _common.create_newRecord(cnt.uuid.BILLING_SCHEMA_DETAILS)            
        _common.edit_containerCell(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, BILLINGSCHEMANAME)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Create a Contract', function () {  
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        });
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT)
        _procurementContractPage.enterRecord_createNewProcurementContract_fromModal(CONTRACT_PARAMETER)
        cy.SAVE().then(() => {
            _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, "CONTRACTCODE")
        })
    })

    it('TC - Verify billing schema configuration with contract', function () {      
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION)        
        _validate.assertValueOf_billingSchemaIsGeneratedWithProcurementConfig(CONTAINERS_CONFIG_HEADER.CONFIGURATION,CONTAINERS_CONFIG_HEADER.STANDARD_CUMULATIVE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.BILLING_SCHEMA_FK, CONTAINERS_CONFIG_HEADER.STANDARD_CUMULATIVE)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLINGSCHEMACONTRACT, app.FooterTab.BILLING_SCHEMA, 1);
            _common.setup_gridLayout(cnt.uuid.BILLINGSCHEMACONTRACT, CONTAINER_COLUMNS_CONTRACT_BILLING_SCHEMA)
        });
        cy.wait(500).then(()=>{
            //Wait is required 
            _common.search_inSubContainer(cnt.uuid.BILLINGSCHEMACONTRACT, BILLINGSCHEMANAME)
        })
        _common.assert_cellData_insideActiveRow(cnt.uuid.BILLINGSCHEMACONTRACT, app.GridCells.DESCRIPTION, BILLINGSCHEMANAME)
    })


    it("TC - Create general, certificates in procurement structure", function () {        
        
        
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE)
        _common.openTab(app.TabBar.GENERALS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE)
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.CODE, CONTAINERS_CONFIG_HEADER.CODE)
        //Create Generals
        _common.openTab(app.TabBar.GENERALS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GENERALS, app.FooterTab.GENERALS, 1);
            _common.setup_gridLayout(cnt.uuid.GENERALS, CONTAINER_COLUMNS_GENERALS)
        });
        _common.search_inSubContainer(cnt.uuid.GENERALS,CONTAINERS_CONFIG_HEADER.SERVICE)
        _common.create_newRecordIfDataNotFound(cnt.uuid.GENERALS,app.GridCells.PRC_CONFIG_HEADER_FK,CONTAINERS_CONFIG_HEADER.SERVICE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.GENERALS, app.GridCells.PRC_GENERALS_TYPE_FK, "GENTYPE")
        //Create Certificate
        _common.openTab(app.TabBar.CERTIFICATES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE)
        });
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES, btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.CODE, CONTAINERS_CONFIG_HEADER.CODE)
        //create Certificate
        _common.openTab(app.TabBar.CERTIFICATES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CERTIFICATES, app.FooterTab.CERTIFICATES, 1);
            _common.setup_gridLayout(cnt.uuid.CERTIFICATES, CONTAINER_COLUMNS_CERTIFICATE)
        });
        _common.search_inSubContainer(cnt.uuid.CERTIFICATES,CONTAINERS_CONFIG_HEADER.SERVICE)
        _common.create_newRecordIfDataNotFound(cnt.uuid.CERTIFICATES,app.GridCells.BPD_CERTIFICATE_TYPE_FK,"CIS Certificate (en)")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.CERTIFICATES, app.GridCells.BPD_CERTIFICATE_TYPE_FK, "CERTTYPE")
    })

    it("TC - Create header texts", function () {           
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER, 0);
            _common.setup_gridLayout(cnt.uuid.CONFIGURATION_HEADER, CONTAINER_COLUMNS_CONFIG_HEADER)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONFIGURATION_HEADER)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_CONFIG_HEADER.MATERIAL)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONFIGURATIONS, app.FooterTab.CONFIGURATIONS, 0);
            _common.setup_gridLayout(cnt.uuid.CONFIGURATIONS, CONTAINER_COLUMNS_CONFIGURATION)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION, CONTAINERS_CONFIG_HEADER.CONTRACT)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION_INFO, CONTAINERS_CONTRACT.CONFIGURATION)
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.HEADER_TEXTS)
        _common.delete_recordFromContainer(cnt.uuid.HEADER_TEXTS)
        _common.create_newRecord(cnt.uuid.HEADER_TEXTS)
        _common.edit_dropdownCellWithInput(cnt.uuid.HEADER_TEXTS, app.GridCells.PRC_TEXT_TYPE_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT.HEADER_TEXT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })


    it("TC - Create general, certificates, header text for contract", function () {        
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        });
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env("CONTRACTCODE"))
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION)
        _procurementConfig.changeProcurementConfiguration_FromWizard(CONTAINERS_CONTRACT.CONFIGURATION, btn.ButtonText.YES)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GENERALS_CONTRACT, app.FooterTab.GENERALS, 3);
            _common.setup_gridLayout(cnt.uuid.GENERALS_CONTRACT, CONTAINER_COLUMNS_GENERALS)
        });
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.GENERALS_CONTRACT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_CONTRACT, app.GridCells.PRC_GENERALS_TYPE_FK, Cypress.env("GENTYPE"))
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_CERTIFICATES, app.FooterTab.CERTIFICATES, 4);
            _common.setup_gridLayout(cnt.uuid.CONTRACT_CERTIFICATES, CONTAINER_COLUMNS_CERTIFICATE)
        });
        _common.create_newRecord(cnt.uuid.CONTRACT_CERTIFICATES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CERTIFICATES, app.GridCells.BPD_CERTIFICATE_TYPE_FK, Cypress.env("CERTTYPE"))
    })

    it("TC - Verify header text should popped up in the header text container in contract module", function () {
         
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION)
        _procurementConfig.changeProcurementConfiguration_FromWizard( CONTAINERS_CONTRACT.CONFIGURATION, btn.ButtonText.YES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTHEADERTEXT, app.FooterTab.HEADER_TEXT, 2);
            _common.setup_gridLayout(cnt.uuid.CONTRACTHEADERTEXT, CONTAINER_COLUMNS_HEADER_TEXT)
        });
        _common.create_newRecord(cnt.uuid.CONTRACTHEADERTEXT)
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTHEADERTEXT, app.GridCells.PRC_TEXT_TYPE_FK,  CONTAINERS_CONTRACT.HEADER_TEXT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION)
        _procurementConfig.changeProcurementConfiguration_FromWizard(CONTAINERS_CONFIG_HEADER.CONFIGURATION, btn.ButtonText.NO)
       _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTHEADERTEXT, app.GridCells.PRC_TEXT_TYPE_FK, CONTAINERS_CONTRACT.HEADER_TEXT)
    })
})
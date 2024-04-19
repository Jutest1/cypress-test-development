import { _common, _projectPage, _salesPage, _salesConfigurationPage, _modalView, _mainView, _boqPage, _validate, _estimatePage, _bidPage } from "cypress/pages";
import _ from "cypress/types/lodash";
import { tile, cnt, app, sidebar, commonLocators, btn } from "cypress/locators";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
const allure = Cypress.Allure.reporter.getInterface();

allure.epic("SALES");
allure.feature("Sales-Configuration");
allure.story("SAM- 1.6 | Pre-Configuration In Sales Module");
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID_DESC-"+ Cypress._.random(0, 999);
const ESTIMATE_CODE = "ESTIMATE_CODE"+ Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION ="ESTIMATE_DESCRIPTION-"+ Cypress._.random(0, 999);
const CONFIGURATION_HEADER_DESC = "CONFIG-DESC-"+ Cypress._.random(0, 999);
const TOTAL_TYPES_CODE = "TCODE-"+ Cypress._.random(0, 999);
const CONFIGURATION_DESC = "CONFIG-DESC-"+ Cypress._.random(0, 999);

//let BID_PARAMETER: DataCells;
let BOQ_STRUCTURE_PARAMETER: DataCells;
let CONTAINER_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINER_BID;
let CONTAINER_COLUMNS_BID;
let CONTAINER_CONFIGURATION_HEADER
let CONTAINER_COLUMNS_CONFIGURATION_HEADER
let BOQ_PARAMETER:DataCells;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_ESTIMATE;
let ESTIMATE_PARAMETERS: DataCells;
let LINE_ITEMS_PARAMETER:DataCells;
let CONTAINERS_BILLING_SCHEMATA;
let CONTAINERS_RESOURCES;
let RESOURCE_PARAMETER:DataCells;
let CONTAINER_COLUMNS_CONFIGURATION
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINER_COLUMNS_RESOURCES;


describe("SAM- 1.6 | Pre-Configuration In Sales Module", () => {    
    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("sam/sam-1.6-pre-configuration-in-sales-module.json").then((data) => {
            this.data = data
            CONTAINER_BOQ_STRUCTURE  = this.data.CONTAINERS.BOQ_STRUCTURE
            CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
            CONTAINER_CONFIGURATION_HEADER= this.data.CONTAINERS.CONFIGURATION_HEADER;
            CONTAINER_COLUMNS_CONFIGURATION_HEADER = this.data.CONTAINER_COLUMNS.CONFIGURATION_HEADER
            BOQ_PARAMETER={
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
            }
            BOQ_STRUCTURE_PARAMETER={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]:BOQSTRUCT_DESC,
                [app.GridCells.QUANTITY_SMALL]:CONTAINER_BOQ_STRUCTURE.QUANTITY,
                [ app.GridCells.BAS_UOM_FK]: CONTAINER_BOQ_STRUCTURE.UOM,
                [ app.GridCells.PRICE]:CONTAINER_BOQ_STRUCTURE.UNITRATE
            }
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_ESTIMATE= this.data.CONTAINERS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINER_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINER_ESTIMATE.ESTIMATE_TYPE,
            }
            LINE_ITEMS_PARAMETER = {
                [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_DESC
            }
            CONTAINERS_RESOURCES= this.data.CONTAINERS.RESOURCES
            RESOURCE_PARAMETER= {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_RESOURCES.SHORT_KEY,
                [app.GridCells.CODE]:CONTAINERS_RESOURCES.CODE
            }
            CONTAINERS_BILLING_SCHEMATA= this.data.CONTAINERS.BILLING_SCHEMATA
            CONTAINER_COLUMNS_CONFIGURATION= this.data.CONTAINER_COLUMNS.CONFIGURATION
            CONTAINER_COLUMNS_LINE_ITEMS= this.data.CONTAINER_COLUMNS.LINE_ITEMS
            CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCES
            CONTAINER_BID= this.data.CONTAINERS.BID
            CONTAINER_COLUMNS_BID= this.data.CONTAINER_COLUMNS.BID

            _common.openDesktopTile(tile.DesktopTiles.PROJECT);            
            _common.openTab(app.TabBar.PROJECT).then(() => {
              _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();

        })
    });
    after(() => {
        cy.LOGOUT();
    })

    it("TC - Creation Of Configuration Header", function () {         
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.setup_gridLayout(cnt.uuid.CONFIGURATION_HEADER, CONTAINER_COLUMNS_CONFIGURATION_HEADER)
        });
        _common.create_newRecord(cnt.uuid.CONFIGURATION_HEADER);
        _salesConfigurationPage.enterRecord_toCreateConfigurationHeader(cnt.uuid.CONFIGURATION_HEADER,CONFIGURATION_HEADER_DESC,CONTAINER_CONFIGURATION_HEADER.PROCUREMENT_CONFIG_HEADER,CONTAINER_CONFIGURATION_HEADER.CONFIG_TYPE)
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TOTAL_TYPES, app.FooterTab.TOTAL_TYPES, 1);
        });
        _salesConfigurationPage.enterRecord_toCreateTotalType(TOTAL_TYPES_CODE);
        cy.SAVE();
    });
    it("TC - Creation Of Configuration For Bid", function () {        
       _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONFIGURATIONS, app.FooterTab.CONFIGURATIONS, 5);
            _common.setup_gridLayout(cnt.uuid.CONFIGURATIONS, CONTAINER_COLUMNS_CONFIGURATION)
        })        
        _common.maximizeContainer(cnt.uuid.CONFIGURATIONS)
        
        _salesConfigurationPage.select_BidConfiguration();
        _common.create_newRecord(cnt.uuid.CONFIGURATIONS)
        _salesConfigurationPage.enterRecord_toCreateConfiguration(cnt.uuid.CONFIGURATIONS,CONFIGURATION_DESC,CONTAINER_CONFIGURATION_HEADER.CONTRACT_TYPE, CONTAINER_CONFIGURATION_HEADER.PROJECT_CONTRACT_TYPE, CONTAINER_CONFIGURATION_HEADER.PATMENT_TERM_FI)
        cy.SAVE();
        _common.minimizeContainer(cnt.uuid.CONFIGURATIONS)
        
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMAS, app.FooterTab.BILLING_SCHEMATA, 2);
        })
        _common.create_newRecord(cnt.uuid.BILLING_SCHEMAS)
        _salesConfigurationPage.enterRecord_toCreateBillingSchemata(cnt.uuid.BILLING_SCHEMAS, CONTAINERS_BILLING_SCHEMATA.BILLING_SCHEMA);
        cy.SAVE();
    });

    it("TC - Creation Of BOQ", function () {       
            
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT);
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS,app.FooterTab.BOQs)
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        })
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETER)
        cy.SAVE();        
        _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)           
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETER)
        cy.SAVE();
    })

    it("TC - Verify generate line item from wizards option", function () {       
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT);
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE,CONTAINER_COLUMNS_ESTIMATE )
        });
        _common.create_newRecord(cnt.uuid.ESTIMATE)
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
        cy.SAVE()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 3);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS)
        _estimatePage.generate_lineItems_fromWizard(LINE_ITEMS_PARAMETER)
    });

    it("TC - Verify assign resource to line item", function () {   
        
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {            
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER);
        cy.SAVE();
    });

    it("TC - Creation of bid from wizard option", function () {        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID)
        _bidPage.createBidRecord_byWizardOptions(CONTAINER_BID.RUBRIC_CATEGORY, BID_DESC,CONTAINER_BID.BUSINESS_PARTNER, CONTAINER_BID.SOURCE_LEAD, null,CONFIGURATION_DESC);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BID).then(() => {            
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
            _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BID)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BID.rubriccategoryfk,CONTAINER_COLUMNS_BID.descriptioninfo,CONTAINER_COLUMNS_BID.billingschemafk,CONTAINER_COLUMNS_BID.configurationfk,CONTAINER_COLUMNS_BID.paymenttermfifk],cnt.uuid.BIDS)
        });
        _common.maximizeContainer(cnt.uuid.BIDS)
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.BIDS)        
        _common.search_inSubContainer(cnt.uuid.BIDS,BID_DESC)
        _common.waitForLoaderToDisappear()
        _bidPage.validate_BidsConfiguration(cnt.uuid.BIDS, CONTAINER_BID.RUBRIC_CATEGORY1, CONFIGURATION_DESC,CONTAINERS_BILLING_SCHEMATA.BILLING_SCHEMA, CONTAINER_CONFIGURATION_HEADER.PATMENT_TERM_FI)
    });
});
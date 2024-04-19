import { _common, _controllingUnit, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView, _modalView, _rfqPage, _procurementContractPage, _saleContractPage, _validate, _procurementPage, _procurementConfig, _wicpage } from "cypress/pages";
import { cnt, tile, app, btn, commonLocators, sidebar } from "cypress/locators";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import { DataCells } from "cypress/pages/interfaces";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "1R-" + Cypress._.random(0, 999)
const BOQ_STRU_DESC = "BQIT-" + Cypress._.random(0, 999)
const EST_HEADER = "1EST-" + Cypress._.random(0, 999)
const EST_CODE = "EST_-" + Cypress._.random(0, 999)
const CONTRACT_CODE01 = "CONT_CODE-01"
const WIC_BOQ_REFERENCE_NO = "REF-01-" + Cypress._.random(0, 999)

let BOQS_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINERS_BOQ_STRUCTURE
let BOQS_STRUCTURE_PARAMETERS:DataCells;

let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINERS_ESTIMATE;
let ESTIMATE_PARAMETER:DataCells;
let GENERATE_LINE_ITEMS_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_LINE_ITEM;
let MODAL_CREATE_UPDATE_BOQ_PACKAGE;
let CONTAINER_COLUMNS_PACKAGE;
let CONTAINERS_CONTRACT;
let CONTAINER_COLUMNS_CONTRACT;
let CREATE_WIC_FROM_BOQ_PARAMETER: DataCells
let CONTAINER_WIC;
let CONTAINER_COLUMNS_WIC_CATALOGUES;
let CONTAINER_COLUMNS_WIC_GROUP;



// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Contract");
ALLURE.story("PCM- 1.61 | Create a WIC from BoQ.");

describe("PCM- 1.61 | Create a WIC from BoQ.", () => {

    before(function () {
        cy.preLoading(Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("pcm/pcm-1.61-create-wic-from-boq.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_BOQ= this.data.CONTAINER_COLUMNS.BOQ
            CONTAINER_COLUMNS_BOQ_STRUCTURE= this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            BOQS_PARAMETERS = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
            };
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            BOQS_STRUCTURE_PARAMETERS = {
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRU_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                [ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
            };
            CONTAINER_COLUMNS_ESTIMATE= this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINERS_ESTIMATE= this.data.CONTAINERS.ESTIMATE
            ESTIMATE_PARAMETER = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_HEADER,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.rubricCategory,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.estimateType
            };
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            GENERATE_LINE_ITEMS_PARAMETERS={
                [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_DESC               
            }
            MODAL_CREATE_UPDATE_BOQ_PACKAGE= this.data.MODALS.CREATE_UPDATE_BOQ_PACKAGE;
            CONTAINER_COLUMNS_PACKAGE= this.data.CONTAINER_COLUMNS.PACKAGE;
            CONTAINERS_CONTRACT=this.data.CONTAINERS.CONTRACT;
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT;
            CONTAINER_WIC = this.data.CONTAINERS.WIC
            CREATE_WIC_FROM_BOQ_PARAMETER = {
                [commonLocators.CommonLabels.SOURCE_BOQ]: BOQ_DESC,
                [commonLocators.CommonLabels.TARGET_WIC_GROUP]: CONTAINER_WIC.WICGROUP,
                [commonLocators.CommonLabels.REFERENCE_NO]: WIC_BOQ_REFERENCE_NO,
                [commonLocators.CommonLabels.OUTLINE_SPECIFICATION]: BOQ_DESC
            }
            CONTAINER_COLUMNS_WIC_CATALOGUES=this.data.CONTAINER_COLUMNS.WIC_CATALOGUES
            CONTAINER_COLUMNS_WIC_GROUP = this.data.CONTAINER_COLUMNS.WIC_GROUP

            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        })
    });

    it("TC - Create a BoQ header and BoQ Structure in it.", function () {
        _common.openTab(app.TabBar.BOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        })
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQS_PARAMETERS);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQS_STRUCTURE_PARAMETERS);
        cy.SAVE();
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Quantity", $ele1.text())
            cy.log(Cypress.env("Quantity"))
        })
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES,  app.GridCells.PRICE_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("UnitRate", $ele1.text())
            cy.log(Cypress.env("UnitRate"))
        })
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BAS_UOM_FK).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("UoM", $ele1.text())
            cy.log(Cypress.env("UoM"))
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    })

    it("TC - Create an Estimate header, and Generate Line items using BoQ as a Structure.", function () {  

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETER);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        })
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        cy.REFRESH_CONTAINER()
    })

    it("TC - Create a BoQ Package from the Estimate Line items.", function () {        

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
        _package.enterRecord_toCreateBoQPackage_FromWizard(MODAL_CREATE_UPDATE_BOQ_PACKAGE.GROUPING, MODAL_CREATE_UPDATE_BOQ_PACKAGE.SCOPE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.GROUPING_STRUCTURE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.openTab(app.TabBar.BOQBASED).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_BOQS)
        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_BOQS, BOQ_DESC)
        _common.openTab(app.TabBar.BOQBASED).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
        })
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE, BOQ_STRU_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRU_DESC)
        cy.SAVE().then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, Cypress.env("Quantity"))
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS)
        _common.changeStatus_fromModal(MODAL_CREATE_UPDATE_BOQ_PACKAGE.STATUS)
        cy.SAVE()
    })

    it("TC - Create a Procurement Contract from the BoQ package.", function () { 
        

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT)
        _package.create_ContractfromPackage(CONTAINERS_CONTRACT.BUSINESS_PARTNER)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env(CONTRACT_CODE01, $ele1.text())
            cy.log(Cypress.env(CONTRACT_CODE01))
        })
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIC_FROM_BOQ)
        _boqPage.create_WICfromBoQ_fromWizard(CREATE_WIC_FROM_BOQ_PARAMETER)
        cy.SAVE()
    })

    it("TC - Verify created WIC catalogue in WIC module.", function () {        

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WIC)
        _common.openTab(app.TabBar.WORKITEMCATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIC_GROUPS, app.FooterTab.WIC_GROUPS, 0)
            _common.setup_gridLayout(cnt.uuid.WIC_GROUPS, CONTAINER_COLUMNS_WIC_GROUP);
        })
        _common.clear_subContainerFilter(cnt.uuid.WIC_GROUPS)
        _common.search_inSubContainer(cnt.uuid.WIC_GROUPS, CONTAINER_WIC.WICGROUPDESC)
        cy.REFRESH_CONTAINER()
        _common.select_rowHasValue(cnt.uuid.WIC_GROUPS, CONTAINER_WIC.WICGROUPDESC)
        _common.openTab(app.TabBar.WORKITEMCATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIC_CATALOGUES, app.FooterTab.WICCATALOGUES, 1)
            _common.setup_gridLayout(cnt.uuid.WIC_CATALOGUES, CONTAINER_COLUMNS_WIC_CATALOGUES);
        })
        _common.clear_subContainerFilter(cnt.uuid.WIC_CATALOGUES)
        _common.search_inSubContainer(cnt.uuid.WIC_CATALOGUES, BOQ_DESC)
        cy.REFRESH_CONTAINER()
        _common.select_rowHasValue(cnt.uuid.WIC_CATALOGUES, BOQ_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.WIC_CATALOGUES, app.GridCells.BRIEF_INFO_SMALL, BOQ_DESC, BOQ_ROOT_ITEM)
        _common.clickOn_toolbarButton(cnt.uuid.WIC_CATALOGUES,btn.IconButtons.ICO_GO_TO)
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRU_DESC)
        _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL, Cypress.env("Quantity"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BAS_UOM_FK, Cypress.env("UoM"))
    })

    after(() => {
        cy.LOGOUT();
    })

});
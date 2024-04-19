import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _bidPage, _saleContractPage, _projectPage, _package } from "cypress/pages";
import { app, tile, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import CommonLocators from "cypress/locators/common-locators";
import Buttons from "cypress/locators/buttons";
import { EST_HEADER } from "cypress/pages/variables";

const allure = Cypress.Allure.reporter.getInterface();
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const EST_CODE = "EST-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESCRIPTION = "LI1-DESC-" + Cypress._.random(0, 999);
const BOQ_DESCRIPTION = "BOQ-DESC-" + Cypress._.random(0, 999);

let CONTAINERS_DATA_RECORDS,
    CONTAINERS_ESTIMATE,
    CONTAINER_COLUMNS_ESTIMATE: DataCells,
    ESTIMATE_PARAMETERS,
    CONTAINER_COLUMNS_LINE_ITEM,
    CONTAINERS_RESOURCES,
    CONTAINER_COLUMNS_RESOURCES,
    RESOURCE_PARAMETER: DataCells,
    RESOURCE_PARAMETER_1: DataCells,
    CONTAINER_COLUMNS_DATA_RECORDS,
    BOQ_PARAMETERS: DataCells,
    CONTAINER_COLUMNS_BOQ_STRUCTURE,
    CONTAINERS_BOQ_STRUCTURE,
    BOQ_STRUCTURE_PARAMETERS: DataCells,
    GENERATE_LINE_ITEMS_PARAMETERS: DataCells,
    DJC_BUDGET_PARAMETERS: DataCells,
    MODAL_GENERATE_BUDGET,
    CONTAINERS_PACKAGE,
    CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 5.4 | System option 828 = 0 (Default)");

describe("EST- 5.4 | System option 828 = 0 (Default)", () => {
    before(function () {
        cy.fixture("estimate/est-5.4-system-option-828=0-(Default).json").then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_DATA_RECORDS = this.data.CONTAINER_COLUMNS.DATA_RECORDS
            CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            };
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM;
            CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCE;
            CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCES;
            RESOURCE_PARAMETER = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCES.CODE
            }
            RESOURCE_PARAMETER_1 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCES.CODE_1,
            }
            BOQ_PARAMETERS = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESCRIPTION
            }
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            BOQ_STRUCTURE_PARAMETERS = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
            }
            GENERATE_LINE_ITEMS_PARAMETERS = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESCRIPTION
            }
            MODAL_GENERATE_BUDGET = this.data.MODAL.GENERATE_BUDGET;
            DJC_BUDGET_PARAMETERS = {
                [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE,
                [commonLocators.CommonLabels.BUDGET_FROM]: MODAL_GENERATE_BUDGET.BUDGET_FROM,
                [commonLocators.CommonLabels.X_FACTOR]: MODAL_GENERATE_BUDGET.X_FACTOR,
                [commonLocators.CommonKeys.INDEX]: MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE_INDEX,
                [commonLocators.CommonKeys.RADIO_INDEX]: MODAL_GENERATE_BUDGET.BUDGET_FROM_INDEX
            }
            CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.PACKAGE_BOQ_STRUCTURE

            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        });
    })

    it("TC - Precondition : system option in customizing  Automatically push the budget = 0", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CommonLocators.CommonLabels.SYSTEM_OPTION)
        cy.REFRESH_CONTAINER()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, CommonLocators.CommonLabels.SYSTEM_OPTION)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 0);
            _common.setup_gridLayout(cnt.uuid.DATA_RECORDS, CONTAINER_COLUMNS_DATA_RECORDS)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, CONTAINERS_DATA_RECORDS.AUTOMATICALLY_PUSH_THE_BUDGET)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.DATA_RECORDS, CONTAINERS_DATA_RECORDS.AUTOMATICALLY_PUSH_THE_BUDGET)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.PARAMETER_VALUE, app.InputFields.DOMAIN_TYPE_COMMENT, CONTAINERS_DATA_RECORDS.PARAMETER_VALUE);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    after(() => {
        cy.LOGOUT();
    })

    it("TC - Create BOQ header and BOQ structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"))
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create estimate header", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"))
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, Buttons.ToolBar.ICO_GO_TO)
    })

    it("TC - Generate new line item record", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.set_containerLayoutUnderEditView(commonLocators.CommonLabels.LAYOUT_6)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_STRUCTURE_DESCRIPTION)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC -Assign Resource to Line item and generate budget from DJC", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC);
        _estimatePage.generate_budgetFromDJC_fromWizard(DJC_BUDGET_PARAMETERS)
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.BUDGET).then(($budget) => {
            Cypress.env("RESOURCE_BUDGET_VALUE", $budget.text())
        })
    });

    it("TC -Create BoQ package from wizard", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
        _package.enterRecord_toCreateBoQPackage_FromWizard("BoQ", CONTAINERS_PACKAGE.ESTIMATE_SCOPE, CONTAINERS_PACKAGE.GROUPING_STRUCTURE, CONTAINERS_PACKAGE.PROCUREMENT_STRUCTURE)
    });

    it("TC - Assign second resource to Line item and generate budget from DJC", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"))
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
        _common.search_inSubContainer(cnt.uuid.ESTIMATE, EST_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE, app.GridCells.DESCRIPTION_INFO, EST_DESC, EST_HEADER)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC);
        _estimatePage.generate_budgetFromDJC_fromWizard(DJC_BUDGET_PARAMETERS)
    });

    it("TC - Verify Budget remains zero for newly added resource and it is visible in 'Budget Total' column in 'BoQ based' tab in 'Package'", function () {
        _common.select_rowInSubContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        cy.wait(1000) //required wait to laod page
        _common.select_rowInSubContainer(cnt.uuid.RESOURCES)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.FooterTab.PACKAGE_ITEM_ASSIGNMENT, 2);
        });
        cy.wait(3000) //required wait to laod page
        _common.create_newRecord(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        cy.wait(500).then(() => {
            _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.PRC_PACKAGE_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("Package_Code"))
        })
        cy.SAVE()
        cy.wait(2000) //required wait to laod page
        cy.SAVE()
        cy.wait(2000) //required wait to laod page
        _common.select_rowInSubContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        cy.wait(2000) //required wait to laod page
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_RESOURCES.CODE_1)
        _common.select_rowInContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        cy.wait(1000) //required wait to laod page
        _common.goToButton_inActiveRow(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.EST_RESOURCE_FK, btn.IconButtons.ICO_PACKAGE)
        _common.openTab(app.TabBar.BOQBASED).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEM_ASSIGNMENT, app.FooterTab.ITEM_ASSIGNMENT, 2);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ITEM_ASSIGNMENT, app.GridCells.EST_RESOURCE_FK_DESCRIPTION, CONTAINERS_RESOURCES.CODE_1)
        _common.openTab(app.TabBar.BOQBASED).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE);
        });
        _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURE)
        _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BUDGET_TOTAL, Cypress.env("RESOURCE_BUDGET_VALUE"))
        })
    });
});
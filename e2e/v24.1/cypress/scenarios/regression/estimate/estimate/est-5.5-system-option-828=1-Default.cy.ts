import { commonLocators, tile, app, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _boqPage, _estimatePage, _validate, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCTURE_DESC = "BOQSTR-" + Cypress._.random(0, 999);
const PRJ_NO = "89" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"

let PROJECT_PARAMETERS
let CONTAINERS_DATA_RECORDS
let CONTAINERS_COLUMNS_BOQ;
let BOQ_PARAMETERS: DataCells
let CONTAINERS_BOQ_STRUCTURE
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_STRUCTURE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_LINE_ITEM;
let GENERATE_LINE_ITEMS_PARAMETERS;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let RESOURCE1_PARAMETERS: DataCells;
let RESOURCE2_PARAMETERS: DataCells;
let GENERATE_BUDGET_FROM_DJC_PARAMETERS: DataCells
let GENERATE_BUDGET_FROM_DJC_WIZARD;
let CREATE_UPDATE_BOQ_PACKAGE_WIZARD;
let CONTAINER_COLUMNS_PACKAGE;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 5.5 | System option 828 = 1");

describe("EST- 5.5 | System option 828 = 1", () => {

    before(function () {

        cy.fixture("estimate/est-5.5-system-option-828=1.json")
          .then((data) => {
            this.data = data;
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
            };
            CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
            CONTAINERS_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
            BOQ_PARAMETERS = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
            }
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            BOQ_STRUCTURE_PARAMETERS = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQSTRUCTURE_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
            }
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            GENERATE_LINE_ITEMS_PARAMETERS = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
            }
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            RESOURCE1_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE_1,
            };
            RESOURCE2_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE_2,
            };
            GENERATE_BUDGET_FROM_DJC_WIZARD = this.data.MODAL.GENERATE_BUDGET_FROM_DJC_WIZARD
            GENERATE_BUDGET_FROM_DJC_PARAMETERS = {
                [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: GENERATE_BUDGET_FROM_DJC_WIZARD.ESTIMATE_SCOPE,
                [commonLocators.CommonLabels.BUDGET_FROM]: GENERATE_BUDGET_FROM_DJC_WIZARD.BUDGET_FROM,
                [commonLocators.CommonLabels.X_FACTOR]: GENERATE_BUDGET_FROM_DJC_WIZARD.X_FACTOR,
                [commonLocators.CommonKeys.INDEX]: GENERATE_BUDGET_FROM_DJC_WIZARD.ESTIMATE_SCOPE_INDEX,
                [commonLocators.CommonKeys.RADIO_INDEX]: GENERATE_BUDGET_FROM_DJC_WIZARD.BUDGET_FROM_INDEX
            }
            CREATE_UPDATE_BOQ_PACKAGE_WIZARD = this.data.MODAL.CREATE_UPDATE_BOQ_PACKAGE
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
          })
          .then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
          });
    })

    after(() => {
        cy.LOGOUT();
    })

    it("TC - Precondition : system option in customizing  Automatically push the budget = 1", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CommonLocators.CommonLabels.SYSTEM_OPTION)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, CommonLocators.CommonLabels.SYSTEM_OPTION)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, CONTAINERS_DATA_RECORDS.AUTOMATICALLY_PUSH_BUDGET)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.DATA_RECORDS, CONTAINERS_DATA_RECORDS.AUTOMATICALLY_PUSH_BUDGET)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.PARAMETER_VALUE, app.InputFields.DOMAIN_TYPE_COMMENT, CONTAINERS_DATA_RECORDS.PARAMETER_VALUE);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create BOQ header and BOQ structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS);
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINERS_COLUMNS_BOQ)
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        cy.SAVE()
        
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURES)
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create Estimate header", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
    });

    it("TC - Generate BOQ line item ", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        cy.REFRESH_CONTAINER();
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it("TC - Assign Resource to Line item and generate budget from DJC", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.budget, CONTAINER_COLUMNS_RESOURCE.estresourcetypeshortkey], cnt.uuid.RESOURCES)
        });
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE1_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_budgetFromDJC_fromWizard(GENERATE_BUDGET_FROM_DJC_PARAMETERS)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create BoQ package from wizard", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
        _package.enterRecord_toCreateBoQPackage_FromWizard(CREATE_UPDATE_BOQ_PACKAGE_WIZARD.CASE_TYPE, CREATE_UPDATE_BOQ_PACKAGE_WIZARD.ESTIMATE_SCOPE, CREATE_UPDATE_BOQ_PACKAGE_WIZARD.GROUPING_STRUCTURE, CREATE_UPDATE_BOQ_PACKAGE_WIZARD.PROCUREMENT_STRUCTURE,"","","",PRJ_NO)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        });
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE);
        _common.waitForLoaderToDisappear()
    });

    it("TC - Assign second resource to Line item and generate budget from DJC", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.search_inSubContainer(cnt.uuid.ESTIMATE, EST_DESC)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE)
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.budget, CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo], cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, BOQSTRUCTURE_DESC)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
        });
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE2_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_budgetFromDJC_fromWizard(GENERATE_BUDGET_FROM_DJC_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.BUDGET).then(($budget) => {
            Cypress.env("BudgetTotalValue", $budget.text())
        })
    });

    it("TC - Verify Budget gets updated for selected BoQ package from estimate and it is visible in 'Budget Total' column in 'BoQ based' tab in 'Package'", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.FooterTab.PACKAGE_ITEM_ASSIGNMENT, 2);
            cy.wait(2000)
        });
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_RESOURCE.CODE_2)
        _common.create_newRecord(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        cy.wait(1000)
          .then(() => {
            _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.PRC_PACKAGE_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("Package_Code"))
            // _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.PRC_PACKAGE_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("Package_Code"))
            _common.select_activeRowInContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            // _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.BOQ_ITEM_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, BOQSTRUCTURE_DESC)
            // _common.select_activeRowInContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
            cy.wait(2000)
            _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
            _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_RESOURCE.CODE_2)
            cy.wait(1000)
            _common.select_rowInContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
            _common.lookUpButtonInCell(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.BOQ_ITEM_FK, app.InputFields.ICO_INPUT_LOOKUP, 0)
            _common.clickOn_modalFooterButton(btn.ButtonText.REFRESH)
            _common.waitForLoaderToDisappear()
            _common.clickOn_cellHasValue_fromModal(app.GridCells.BRIEF, BOQSTRUCTURE_DESC)
            _common.clickOn_modalFooterButton(btn.ButtonText.OK)
            _common.waitForLoaderToDisappear()
            cy.SAVE()
            _common.waitForLoaderToDisappear()
          })
        cy.wait(2000)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_RESOURCE.CODE_2)
        cy.SAVE()
        cy.wait(1000)

        _common.select_rowInContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.goToModule_inActiveRow(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.EST_RESOURCE_FK, btn.ButtonText.GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQBASED).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEM_ASSIGNMENT, app.FooterTab.ITEM_ASSIGNMENT, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ITEM_ASSIGNMENT)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ITEM_ASSIGNMENT, app.GridCells.EST_RESOURCE_FK, CONTAINERS_RESOURCE.CODE_2)
        
        _common.openTab(app.TabBar.BOQBASED).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_BOQS)
        _common.select_rowInContainer(cnt.uuid.PROCUREMENT_BOQS)
        _common.openTab(app.TabBar.BOQBASED).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE);
        });
        _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURE)
        _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BUDGET_TOTAL, Cypress.env("BudgetTotalValue"))
        })
        _common.minimizeContainer(cnt.uuid.BOQ_STRUCTURE)
    });

});
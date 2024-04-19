import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _controllingUnit, _boqPage, _saleContractPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "R_PR-" + Cypress._.random(0, 999)
const PRJ_NAME = "PR_DESC-" + Cypress._.random(0, 999)
const CU_MAIN_01 = "RNMHEADER_CU-" + Cypress._.random(0, 999)
const CU_SUB_01 = 'SUB_CU_01-' + Cypress._.random(0, 999);
const CU_SUB_02 = 'SUB_CU_02-' + Cypress._.random(0, 999);
const BOQ_HEAD_01 = 'BOQ_MAIN01-' + Cypress._.random(0, 999);
const BOQ_STRUCT_01 = 'BOQ_SUB01-' + Cypress._.random(0, 999);
const BOQ_STRUCT_02 = 'BOQ_SUB02-' + Cypress._.random(0, 999);
const CONTRACT_MAIN01 = 'MAIN_01_-' + Cypress._.random(0, 999);
const ADD_EXP_01 = 'AE_01_-' + Cypress._.random(0, 999);
const ADD_EXP_02 = 'AE_02_-' + Cypress._.random(0, 999);

let CONTAINERS_PROJECT, CONTAINERS_CONTROLLING_UNITS, CONTAINERS_BOQ_STRUCTURE, CONTAINERS_CONTRACTS, CONTAINERS_CONTRACT_BOQ_STRUCTURE;

let CONTAINER_COLUMNS_PROJECT, CONTAINER_COLUMNS_CONTROLLING_UNITS, CONTAINER_COLUMNS_BOQ, CONTAINER_COLUMNS_BOQ_STRUCTURE, CONTAINER_COLUMNS_CONTRACTS, CONTAINER_COLUMNS_CONTRACT_BOQS, CONTAINER_COLUMNS_CONTRACT_BOQ_STRUCTURE, CONTAINER_COLUMNS_COST_CONTROL, CONTAINER_COLUMNS_ADDITIONAL_EXPENSES;

let PROJECT_PARAMETERS: DataCells, CONTROLLING_UNIT_MAIN_PARAMETERS_1: DataCells, CONTROLLING_UNIT_SUB_PARAMETERS_1: DataCells, CONTROLLING_UNIT_SUB_PARAMETERS_2: DataCells, BOQ_PARAMETERS_1: DataCells, BOQ_STRUCTURE_PARAMETER_1: DataCells, BOQ_STRUCTURE_PARAMETER_2: DataCells, CONTRACT_SALES_PARAMETER: DataCells;

let MODAL_ADDITIONAL_EXPENSES_PARAMETERS;

ALLURE.epic("GENERAL CONTRACTOR CONTROLLING");
ALLURE.feature("General Contractor Controlling");
ALLURE.story("GCC- 1.3 | Create Additional Expenses for Controlling Unit in General Contractor Controlling.");

describe("GCC- 1.3 | Create Additional Expenses for Controlling Unit in General Contractor Controlling.", () => {

    before(function () {

        cy.fixture("general-contractor-controlling/gcc-1.3-create-additional-expenses-for-controlling-unit-in-general-contractor-controlling.json").then((data) => {
            this.data = data
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
            CONTAINER_COLUMNS_PROJECT = this.data.CONTAINER_COLUMNS.PROJECT;
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME
            };
            CONTAINERS_CONTROLLING_UNITS = this.data.CONTAINERS.CONTROLLING_UNITS
            CONTAINER_COLUMNS_CONTROLLING_UNITS = this.data.CONTAINER_COLUMNS.CONTROLLING_UNITS;
            CONTROLLING_UNIT_MAIN_PARAMETERS_1 = {
                [app.GridCells.DESCRIPTION_INFO]: CU_MAIN_01,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNITS.QUANTITY[0],
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNITS.UOM[0]
            }
            CONTROLLING_UNIT_SUB_PARAMETERS_1 = {
                [app.GridCells.DESCRIPTION_INFO]: CU_SUB_01,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNITS.QUANTITY[0],
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNITS.UOM[0]
            }
            CONTROLLING_UNIT_SUB_PARAMETERS_2 = {
                [app.GridCells.DESCRIPTION_INFO]: CU_SUB_02,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNITS.QUANTITY[0],
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNITS.UOM[0]
            }
            CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ;
            BOQ_PARAMETERS_1 = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_HEAD_01,
            }
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            BOQ_STRUCTURE_PARAMETER_1 = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_01,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0],
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
                [app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL]: CU_SUB_01
            };
            BOQ_STRUCTURE_PARAMETER_2 = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_02,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0],
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[1],
                [app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL]: CU_SUB_02
            };
            CONTAINERS_CONTRACTS = this.data.CONTAINERS.CONTRACTS
            CONTAINER_COLUMNS_CONTRACTS = this.data.CONTAINER_COLUMNS.CONTRACTS;
            CONTRACT_SALES_PARAMETER = {
                [commonLocators.CommonLabels.DESCRIPTION]: CONTRACT_MAIN01,
                [commonLocators.CommonLabels.BOQ_SOURCE]: CommonLocators.CommonKeys.PROJECT_BOQ,
                [commonLocators.CommonLabels.BOQS]: BOQ_HEAD_01,
            }
            CONTAINER_COLUMNS_CONTRACT_BOQS = this.data.CONTAINER_COLUMNS.CONTRACT_BOQS;
            CONTAINERS_CONTRACT_BOQ_STRUCTURE = this.data.CONTAINERS.CONTRACT_BOQ_STRUCTURE
            CONTAINER_COLUMNS_CONTRACT_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.CONTRACT_BOQ_STRUCTURE;
            CONTAINER_COLUMNS_COST_CONTROL = this.data.CONTAINER_COLUMNS.COST_CONTROL;
            CONTAINER_COLUMNS_ADDITIONAL_EXPENSES = this.data.CONTAINER_COLUMNS.ADDITIONAL_EXPENSES;
            MODAL_ADDITIONAL_EXPENSES_PARAMETERS = this.data.MODAL.ADDITIONAL_EXPENSES_PARAMETERS

        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create New Project & Pin it", function () {
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROJECTS, CONTAINER_COLUMNS_PROJECT)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
    })

    it("TC - Create Controlling Units", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS)
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 1);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNITS,)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_MAIN_PARAMETERS_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT, CU_MAIN_01)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_SUB_PARAMETERS_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT, CU_MAIN_01)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_SUB_PARAMETERS_2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create a BoQ header and BoQ item records.", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT)
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS_1);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER_1)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER_2)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create a Sales Contract using Source BoQ.", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.CONTRACT_SALES)
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.setDefaultView(app.TabBar.CONTRACTS)
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS);
            _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACTS)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.create_newRecord(cnt.uuid.CONTRACTS)
        _saleContractPage.enterRecord_createNewContractRecord(CONTAINERS_CONTRACTS.BUSINESS_PARTNER[0], CONTRACT_SALES_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACTBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTSALES_BOQS, app.FooterTab.BOQs, 0);
            _common.setup_gridLayout(cnt.uuid.CONTRACTSALES_BOQS, CONTAINER_COLUMNS_CONTRACT_BOQS)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTSALES_BOQS)
        _common.select_rowHasValue(cnt.uuid.CONTRACTSALES_BOQS, BOQ_HEAD_01)
        _common.openTab(app.TabBar.CONTRACTBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1, CONTAINER_COLUMNS_CONTRACT_BOQ_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURE1)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1, BOQ_STRUCT_01)
        _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT_BOQ_STRUCTURE.QUANTITY[0])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1, BOQ_STRUCT_01)
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item1_CU", $ele1.text())
            cy.log(Cypress.env("Item1_CU"))
        })
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.FINAL_PRICE_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item1_Price", $ele1.text())
            cy.log(Cypress.env("Item1_Price"))
        })
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURE1)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1, BOQ_STRUCT_02)
        _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT_BOQ_STRUCTURE.QUANTITY[0])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1, BOQ_STRUCT_02)
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item2_CU", $ele1.text())
            cy.log(Cypress.env("Item2_CU"))
        })
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.FINAL_PRICE_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item2_Price", $ele1.text())
            cy.log(Cypress.env("Item2_Price"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.setDefaultView(app.TabBar.CONTRACTS)
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS);
            _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACTS)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, Sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS)
        _common.changeStatus_fromModal(Sidebar.SideBarOptions.CONTRACTED)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create a Cost Control Structure in General Contractor Controlling module.", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT)
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.GENERAL_CONTRACTOR_CONTROLLING)
        _common.openTab(app.TabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.set_containerLayoutUnderEditView(CommonLocators.CommonKeys.LAYOUT_19)
            _common.select_tabFromFooter(cnt.uuid.COST_CONTROL, app.FooterTab.COST_CONTROL, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CONTROL, CONTAINER_COLUMNS_COST_CONTROL)
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CONTROL)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_COST_CONTROL_STRUCTURE)
        _common.select_multipleRow_fromModal()
        _common.select_rowHasValue_fromModal(CONTRACT_MAIN01)
        _common.set_cellCheckboxValue_fromModal(app.GridCells.MARKER, commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.SAVE().then(() => {
            _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item1_CU"))
            _common.assert_forNumericValues(cnt.uuid.COST_CONTROL, app.GridCells.REVENUE, Cypress.env("Item1_Price"))
            _common.assert_forNumericValues(cnt.uuid.COST_CONTROL, app.GridCells.BASIC_COST, Cypress.env("Item1_Price"))
            _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item2_CU"))
            _common.assert_forNumericValues(cnt.uuid.COST_CONTROL, app.GridCells.REVENUE, Cypress.env("Item2_Price"))
            _common.assert_forNumericValues(cnt.uuid.COST_CONTROL, app.GridCells.BASIC_COST, Cypress.env("Item2_Price"))
        })
        _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item1_CU"))
        _common.getText_fromCell(cnt.uuid.COST_CONTROL, app.GridCells.BUDGET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item1_Budget", $ele1.text())
            cy.log(Cypress.env("Item1_Budget"))
        })
        _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item2_CU"))
        _common.getText_fromCell(cnt.uuid.COST_CONTROL, app.GridCells.BUDGET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item2_Budget", $ele1.text())
            cy.log(Cypress.env("Item2_Budget"))
        })
    })

    it("TC - Create Additional Expenses for Controlling Units and and Verify them.", function () {
        _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item1_CU"))
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_ADDITIONAL_EXPENSES)
        _common.waitForLoaderToDisappear()
        _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.DESCRIPTION, 0, app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type(ADD_EXP_01, { force: true })
        _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.AMOUNT, 0, app.InputFields.INPUT_GROUP_CONTENT).clear({ force: true }).type(MODAL_ADDITIONAL_EXPENSES_PARAMETERS.ADDITIONAL_EXPENSE_AMOUNT[0], { force: true })
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CONTROL, app.FooterTab.COST_CONTROL, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item1_CU"))
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.COST_CONTROL, app.GridCells.ADDITIONAL_EXPENSES, MODAL_ADDITIONAL_EXPENSES_PARAMETERS.ADDITIONAL_EXPENSE_AMOUNT[0])
        })
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.COST_CONTROL, app.GridCells.ADDITIONAL_EXPENSES).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Additional_Expense_01", $ele1.text())
            cy.log(Cypress.env("Additional_Expense_01"))
        })
        _common.openTab(app.TabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ADDITIONAL_EXPENSES, app.FooterTab.ADDITIONAL_EXPENSES, 1);
            _common.waitForLoaderToDisappear()
            _common.setup_gridLayout(cnt.uuid.ADDITIONAL_EXPENSES, CONTAINER_COLUMNS_ADDITIONAL_EXPENSES)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ADDITIONAL_EXPENSES)
        _common.search_inSubContainer(cnt.uuid.ADDITIONAL_EXPENSES, ADD_EXP_01)
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.ADDITIONAL_EXPENSES)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.wait(500).then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.ADDITIONAL_EXPENSES, app.GridCells.DESCRIPTION, ADD_EXP_01)
            _common.assert_forNumericValues(cnt.uuid.ADDITIONAL_EXPENSES, app.GridCells.AMOUNT_SMALL, Cypress.env("Additional_Expense_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CONTROL, app.FooterTab.COST_CONTROL, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item2_CU"))
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_ADDITIONAL_EXPENSES)
        _common.waitForLoaderToDisappear()
        _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.DESCRIPTION, 0, app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type(ADD_EXP_02, { force: true })
        _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.AMOUNT, 0, app.InputFields.INPUT_GROUP_CONTENT).clear({ force: true }).type(MODAL_ADDITIONAL_EXPENSES_PARAMETERS.ADDITIONAL_EXPENSE_AMOUNT[1], { force: true })
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item2_CU"))
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.COST_CONTROL, app.GridCells.ADDITIONAL_EXPENSES, MODAL_ADDITIONAL_EXPENSES_PARAMETERS.ADDITIONAL_EXPENSE_AMOUNT[1])
        })
        _common.getText_fromCell(cnt.uuid.COST_CONTROL, app.GridCells.ADDITIONAL_EXPENSES).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Additional_Expense_02", $ele1.text())
            cy.log(Cypress.env("Additional_Expense_02"))
        })
        _common.openTab(app.TabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ADDITIONAL_EXPENSES, app.FooterTab.ADDITIONAL_EXPENSES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ADDITIONAL_EXPENSES)
        _common.search_inSubContainer(cnt.uuid.ADDITIONAL_EXPENSES, ADD_EXP_02)
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.ADDITIONAL_EXPENSES)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.wait(500).then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.ADDITIONAL_EXPENSES, app.GridCells.DESCRIPTION, ADD_EXP_02)
            _common.assert_forNumericValues(cnt.uuid.ADDITIONAL_EXPENSES, app.GridCells.AMOUNT_SMALL, Cypress.env("Additional_Expense_02"))
        })
    })

});

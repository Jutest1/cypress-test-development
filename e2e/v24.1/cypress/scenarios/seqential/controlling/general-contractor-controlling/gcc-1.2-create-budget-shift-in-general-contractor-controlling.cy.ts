import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _controllingUnit, _boqPage, _saleContractPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_HEADER } from "cypress/pages/variables";

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
const BUDGETSHIFT01 = 'BS_01_-' + Cypress._.random(0, 999);

let CONTAINERS_PROJECT, CONTAINERS_CONTROLLING_UNITS, CONTAINERS_BOQ_STRUCTURE, CONTAINERS_CONTRACTS;

let CONTAINER_COLUMNS_PROJECT, CONTAINER_COLUMNS_CONTROLLING_UNITS, CONTAINER_COLUMNS_BOQ, CONTAINER_COLUMNS_BOQ_STRUCTURE, CONTAINER_COLUMNS_CONTRACTS, CONTAINER_COLUMNS_CONTRACT_BOQS, CONTAINER_COLUMNS_CONTRAT_BOQ_STRUCTURE, CONTAINER_COLUMNS_COST_CONTROL, CONTAINER_COLUMNS_BUDGET_SHIFT;

let PROJECT_PARAMETERS: DataCells, CONTROLLING_UNIT_MAIN_PARAMETERS_1: DataCells, CONTROLLING_UNIT_SUB_PARAMETERS_1: DataCells, CONTROLLING_UNIT_SUB_PARAMETERS_2: DataCells, BOQ_PARAMETERS_1: DataCells, BOQ_STRUCTURE_PARAMETER_1: DataCells, BOQ_STRUCTURE_PARAMETER_2: DataCells, CONTRACT_SALES_PARAMETER: DataCells;

let MODAL_BUDGET_SHIFT_PARAMETERS;

ALLURE.epic("GENERAL CONTRACTOR CONTROLLING");
ALLURE.feature("General Contractor Controlling");
ALLURE.story("GCC- 1.2 | Create Budget Shift in General Contractor Controlling.");

describe("GCC- 1.2 | Create Budget Shift in General Contractor Controlling.", () => {

    before(function () {

        cy.fixture("general-contractor-controlling/gcc-1.2-create-budget-shift-in-general-contractor-controlling.json").then((data) => {
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
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[1],
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
            CONTAINER_COLUMNS_CONTRAT_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.CONTRACT_BOQ_STRUCTURE;
            CONTAINER_COLUMNS_COST_CONTROL = this.data.CONTAINER_COLUMNS.COST_CONTROL;
            MODAL_BUDGET_SHIFT_PARAMETERS = this.data.MODAL.BUDGET_SHIFT_PARAMETER
            CONTAINER_COLUMNS_BUDGET_SHIFT = this.data.CONTAINER_COLUMNS.BUDGET_SHIFT;

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
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1, CONTAINER_COLUMNS_CONTRAT_BOQ_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURE1)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1, BOQ_STRUCT_01)
        _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, "20")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
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
        _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, "20")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
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

    it("TC - Create a Budget shift and Verify it.", function () {
        _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item1_CU"))
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BUDGET_SHIFT)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasValue_fromModal(app.GridCells.CONTROLLINGUNITDESCRIPTION_BUDGET_SHIFT, CU_SUB_01)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inActiveRow_fromModal(app.GridCells.DESCRIPTION_COL, app.InputFields.DOMAIN_TYPE_DESCRIPTION, BUDGETSHIFT01)
        _common.enterRecord_inActiveRow_fromModal(app.GridCells.SHIFT_BUDGET, app.InputFields.DOMAIN_TYPE_DESCRIPTION, MODAL_BUDGET_SHIFT_PARAMETERS.SHIFT_AMOUNT[0])
        _common.clickOn_cellHasValue_fromModal(app.GridCells.CONTROLLINGUNITDESCRIPTION_BUDGET_SHIFT, CU_SUB_01)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasValue_fromModal(app.GridCells.SOURCE_OR_TARGET, CommonLocators.CommonKeys.TARGET)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inActiveRow_fromModal(app.GridCells.CONTROLLINGUNIT_BUDGET_SHIFT, app.InputFields.INPUT_GROUP_CONTENT, CU_SUB_02)
        _common.waitForLoaderToDisappear()
        cy.wait(2000).then(() => {
            _common.select_ItemFromPopUpList(CommonLocators.CommonKeys.GRID, CU_SUB_02)
        })
        _common.clickOn_cellHasValue_fromModal(app.GridCells.SOURCE_OR_TARGET, CommonLocators.CommonKeys.TARGET)
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell_fromModal(app.GridCells.SHIFT_BUDGET).then(($budget) => {
            Cypress.env("Target_Budget", $budget.text())
            cy.log("Shifted Budget =>  " + Cypress.env("Target_Budget"))
        })
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CONTROL, app.FooterTab.COST_CONTROL, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CONTROL, CONTAINER_COLUMNS_COST_CONTROL)
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item2_CU"))
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.COST_CONTROL, app.GridCells.BUDGET, ((parseFloat(Cypress.env("Item2_Budget")) + parseFloat(Cypress.env("Target_Budget"))).toString()))
        })
        _common.openTab(app.TabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BUDGET_SHIFT, app.FooterTab.BUDGET_SHIFT, 1);
            _common.setup_gridLayout(cnt.uuid.BUDGET_SHIFT, CONTAINER_COLUMNS_BUDGET_SHIFT)
        });
        _common.clear_subContainerFilter(cnt.uuid.BUDGET_SHIFT)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CONTROL, app.FooterTab.COST_CONTROL, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CONTROL, CONTAINER_COLUMNS_COST_CONTROL)
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item2_CU"))
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BUDGET_SHIFT, app.FooterTab.BUDGET_SHIFT, 1);
            _common.setup_gridLayout(cnt.uuid.BUDGET_SHIFT, CONTAINER_COLUMNS_BUDGET_SHIFT)
        });
        _common.select_rowHasValue(cnt.uuid.BUDGET_SHIFT, BUDGETSHIFT01)
        _common.waitForLoaderToDisappear()
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.BUDGET_SHIFT, app.GridCells.VALUE, (parseFloat(Cypress.env("Target_Budget"))).toString())
        })
    })

});
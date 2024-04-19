import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _controllingUnit, _boqPage, _saleContractPage, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "R_PR-" + Cypress._.random(0, 999)
const PRJ_NAME = "PR_DESC-" + Cypress._.random(0, 999)
const CLERK_NAME = "HS"
const CU_MAIN_01 = "RNMHEADER_CU-" + Cypress._.random(0, 999)
const CU_SUB_01 = 'SUB_CU_01-' + Cypress._.random(0, 999);
const CU_SUB_02 = 'SUB_CU_02-' + Cypress._.random(0, 999);
const BOQ_HEAD_01 = 'BOQ_MAIN01-' + Cypress._.random(0, 999);
const BOQ_STRUCT_01 = 'BOQ_SUB01-' + Cypress._.random(0, 999);
const BOQ_STRUCT_02 = 'BOQ_SUB02-' + Cypress._.random(0, 999);
const CONTRACT_MAIN01 = 'MAIN_01_' + Cypress._.random(0, 999);
const PACKAGEDESCRIPTION01 = 'R_PACKAGE01_' + Cypress._.random(0, 999);
const PACKAGEBOQ_REFCD = 'R_CD_-' + Cypress._.random(0, 999);
const PACKAGEBOQ_REFDESC = 'R_PCKDESC_' + Cypress._.random(0, 999);
const BOQ_STRUCT_03 = 'BOQ_N_SUB03-' + Cypress._.random(0, 999);
const BOQ_STRUCT_04 = 'BOQ_N_SUB04-' + Cypress._.random(0, 999);
const INVOICE_CODE = 'INV-' + Cypress._.random(0, 999);

let CONTAINERS_PROJECT, CONTAINERS_CONTROLLING_UNITS, CONTAINERS_BOQ_STRUCTURE, CONTAINERS_CONTRACTS, CONTAINERS_CONTRACT_BOQ_STRUCTURE, CONTAINERS_PACKAGE, CONTAINERS_INVOICE;

let CONTAINER_COLUMNS_PROJECT, CONTAINER_COLUMNS_CONTROLLING_UNITS, CONTAINER_COLUMNS_BOQ, CONTAINER_COLUMNS_BOQ_STRUCTURE, CONTAINER_COLUMNS_CONTRACTS, CONTAINER_COLUMNS_CONTRACT_BOQS, CONTAINER_COLUMNS_CONTRACT_BOQ_STRUCTURE, CONTAINER_COLUMNS_COST_CONTROL, CONTAINER_COLUMNS_PACKAGE, CONTAINER_COLUMNS_TOTALS, CONTAINER_COLUMNS_PACKAGE_PROCUREMENT_BOQS, CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE, CONTAINER_COLUMNS_PROCUREMENT_CONTRACT, CONTAINER_COLUMNS_PROCUREMENT_CONTRACT_BOQS, CONTAINER_COLUMNS_PROCUREMENT_CONTRACT_BOQ_STRUCTURE, CONTAINER_COLUMNS_PES, CONTAINER_COLUMNS_PES_BOQS, CONTAINER_COLUMNS_PES_BOQ_STRUCTURE, CONTAINER_COLUMNS_INVOICE, CONTAINER_COLUMNS_SALES_CONTRACT, CONTAINER_COLUMNS_PRC_PACKAGES, CONTAINER_COLUMNS_PRC_CONTRACT, CONTAINER_COLUMNS_PRC_PES, CONTAINER_COLUMNS_PRC_INVOICES;

let PROJECT_PARAMETERS: DataCells, CONTROLLING_UNIT_MAIN_PARAMETERS_1: DataCells, CONTROLLING_UNIT_SUB_PARAMETERS_1: DataCells, CONTROLLING_UNIT_SUB_PARAMETERS_2: DataCells, BOQ_PARAMETERS_1: DataCells, BOQ_STRUCTURE_PARAMETER_1: DataCells, BOQ_STRUCTURE_PARAMETER_2: DataCells, CONTRACT_SALES_PARAMETER: DataCells, BOQ_STRUCTURE_PARAMETER_3: DataCells, BOQ_STRUCTURE_PARAMETER_4: DataCells;

let MODAL_CREATE_CONTRACT_WIZARD;

allure.epic("GENERAL CONTRACTOR CONTROLLING");
allure.feature("General Contractor Controlling");
allure.story("GCC- 1.6 | Verify Sales & Procurement Cost data in General Contractor Controlling Module.");

describe("GCC- 1.6 | Verify Sales & Procurement Cost data in General Contractor Controlling Module.", () => {

    before(function () {
        cy.fixture("general-contractor-controlling/gcc-1.6-verify-sales-and-procurement-cost-data-in-general-contractor-controlling-module.json").then((data) => {
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
                [commonLocators.CommonLabels.PROJECT_NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.DESCRIPTION]: CONTRACT_MAIN01,
                [commonLocators.CommonLabels.BOQ_SOURCE]: CommonLocators.CommonKeys.PROJECT_BOQ,
                [commonLocators.CommonLabels.BOQS]: BOQ_HEAD_01,
            }
            CONTAINER_COLUMNS_CONTRACT_BOQS = this.data.CONTAINER_COLUMNS.CONTRACT_BOQS;
            CONTAINERS_CONTRACT_BOQ_STRUCTURE = this.data.CONTAINERS.CONTRACT_BOQ_STRUCTURE
            CONTAINER_COLUMNS_CONTRACT_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.CONTRACT_BOQ_STRUCTURE;
            CONTAINER_COLUMNS_COST_CONTROL = this.data.CONTAINER_COLUMNS.COST_CONTROL;
            CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE;
            CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS;
            CONTAINER_COLUMNS_PACKAGE_PROCUREMENT_BOQS = this.data.CONTAINER_COLUMNS.PACKAGE_PROCUREMENT_BOQS;
            CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.PACKAGE_BOQ_STRUCTURE;
            MODAL_CREATE_CONTRACT_WIZARD = this.data.MODAL.CREATE_CONTRACT_WIZARD
            BOQ_STRUCTURE_PARAMETER_3 = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_03,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[1],
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0],
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[1],
                [app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL]: CU_SUB_01
            };
            BOQ_STRUCTURE_PARAMETER_4 = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_04,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[1],
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0],
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[1],
                [app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL]: CU_SUB_02
            };
            CONTAINER_COLUMNS_PROCUREMENT_CONTRACT = this.data.CONTAINER_COLUMNS.PROCUREMENT_CONTRACT;
            CONTAINER_COLUMNS_PROCUREMENT_CONTRACT_BOQS = this.data.CONTAINER_COLUMNS.PROCUREMENT_CONTRACT_BOQS;
            CONTAINER_COLUMNS_PROCUREMENT_CONTRACT_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.PROCUREMENT_CONTRACT_BOQ_STRUCTURE;
            CONTAINER_COLUMNS_PES = this.data.CONTAINER_COLUMNS.PES;
            CONTAINER_COLUMNS_PES_BOQS = this.data.CONTAINER_COLUMNS.PES_BOQS;
            CONTAINER_COLUMNS_PES_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.PES_BOQ_STRUCTURE;
            CONTAINERS_INVOICE = this.data.CONTAINERS.INVOICE
            CONTAINER_COLUMNS_INVOICE = this.data.CONTAINER_COLUMNS.INVOICE;
            CONTAINER_COLUMNS_SALES_CONTRACT = this.data.CONTAINER_COLUMNS.SALES_CONTRACT;
            CONTAINER_COLUMNS_PRC_PACKAGES = this.data.CONTAINER_COLUMNS.PRC_PACKAGES;
            CONTAINER_COLUMNS_PRC_CONTRACT = this.data.CONTAINER_COLUMNS.PRC_CONTRACT;
            CONTAINER_COLUMNS_PRC_PES = this.data.CONTAINER_COLUMNS.PRC_PES;
            CONTAINER_COLUMNS_PRC_INVOICES = this.data.CONTAINER_COLUMNS.PRC_INVOICES;
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
        _common.waitForLoaderToDisappear()
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
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
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
        _common.select_rowInContainer(cnt.uuid.CONTRACTS)
        _common.getText_fromCell(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("ContractSales_01", $ele1.text())
            cy.log(Cypress.env("ContractSales_01"))
        })
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

    it("TC - Create a Procurement package from General Conntractor Controlling.", function () {
        _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item1_CU"))
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_PROCUREMENT_PACKAGE)
        _common.waitForLoaderToDisappear()
        _common.findRadio_byLabel_fromModal(CommonLocators.CommonLabels.CREATE, commonLocators.CommonKeys.RADIO, 0, CommonLocators.CommonElements.PLATFORM_FORM_ROW)
        _common.waitForLoaderToDisappear()
        _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.DESCRIPTION, 0, app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type(PACKAGEDESCRIPTION01, { force: true })
        _common.edit_dropDownWithInput_fromModal(CommonLocators.CommonLabels.PROCUREMENT_STRUCTURE, CommonLocators.CommonLabels.SERVICE, CommonLocators.CommonKeys.GRID)
        _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.CONFIGURATION, CommonLocators.CommonLabels.SERVICE, CommonLocators.CommonKeys.GRID)
        _common.inputField_fromModal(commonLocators.CommonElements.ROW, CommonLocators.CommonLabels.BUDGET, 0, app.InputFields.INPUT_GROUP_CONTENT).clear({ force: true }).type(CONTAINERS_PACKAGE.BUDGET[0], { force: true })
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalButtonByClass(btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.select_rowHasValue(cnt.uuid.PACKAGE, PACKAGEDESCRIPTION01)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TOTALS, app.FooterTab.TOTALS, 1)
            _common.setup_gridLayout(cnt.uuid.TOTALS, CONTAINER_COLUMNS_TOTALS)
        })
        _common.clear_subContainerFilter(cnt.uuid.TOTALS)
        _common.select_rowHasValue(cnt.uuid.TOTALS, CommonLocators.CommonLabels.BUDGET)
        _common.assert_forNumericValues(cnt.uuid.TOTALS, app.GridCells.VALUE_NET, CONTAINERS_PACKAGE.BUDGET[0])
        _common.getText_fromCell(cnt.uuid.TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PackageBudget", $ele1.text())
            cy.log(Cypress.env("PackageBudget"))
        })
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create a Package BoQ with items..", function () {
        _common.openTab(app.TabBar.BOQBASED).then(() => {
            _common.setDefaultView(app.TabBar.BOQBASED)
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_BOQS, CONTAINER_COLUMNS_PACKAGE_PROCUREMENT_BOQS)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_BOQS)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PROCUREMENT_BOQS)
        _common.waitForLoaderToDisappear()
        _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.REFERENCE_NO, 0, app.InputFields.DOMAIN_TYPE_CODE).clear({ force: true }).type(PACKAGEBOQ_REFCD, { force: true })
        _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.OUTLINE_SPECIFICATION, 0, app.InputFields.DOMAIN_TYPE_TRANSLATION).clear({ force: true }).type(PACKAGEBOQ_REFDESC, { force: true })
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQBASED).then(() => {
            _common.setDefaultView(app.TabBar.BOQBASED)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE)
        })
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURE)
        _common.select_rowInContainer(cnt.uuid.BOQ_STRUCTURE)

        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURE, BOQ_STRUCTURE_PARAMETER_3)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item1_total", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("Item1_total"))
        })
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURE, BOQ_STRUCTURE_PARAMETER_4)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item2_total", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("Item2_total"))
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, Sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS)
        _common.changeStatus_fromModal(Sidebar.SideBarOptions.IN_PROGRESS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TOTALS, app.FooterTab.TOTALS, 1)
            _common.setup_gridLayout(cnt.uuid.TOTALS, CONTAINER_COLUMNS_TOTALS)
        })
        _common.clear_subContainerFilter(cnt.uuid.TOTALS)
        _common.select_rowHasValue(cnt.uuid.TOTALS, CommonLocators.CommonKeys.TOTAL)
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.TOTALS, app.GridCells.VALUE_NET, ((parseFloat(Cypress.env("Item1_total")) + parseFloat(Cypress.env("Item2_total"))).toString()))
        })
        _common.getText_fromCell(cnt.uuid.TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PackageTotals_01", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("PackageTotals_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.TOTALS, CommonLocators.CommonLabels.BUDGET)
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.TOTALS, app.GridCells.VALUE_NET, CONTAINERS_PACKAGE.BUDGET[0])
        })
        _common.getText_fromCell(cnt.uuid.TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PackageBudget_01", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("PackageBudget_01"))
        })
    })

    it("TC - Create a Contract from Package.", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, Sidebar.SideBarOptions.CREATE_CONTRACT)
        _common.waitForLoaderToDisappear()
        _package.create_ContractfromPackage(MODAL_CREATE_CONTRACT_WIZARD.BUSINESS_PARTNER[0])
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.setDefaultView(app.TabBar.CONTRACT)
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_PROCUREMENT_CONTRACT)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME)
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CLERK_NAME)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.NET, Cypress.env("PackageTotals_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.NET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PrcContractTotal_01", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("PrcContractTotal_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT_BOQS, CONTAINER_COLUMNS_PROCUREMENT_CONTRACT_BOQS)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT_BOQS)
        _common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT_BOQS, PACKAGEBOQ_REFDESC)

        _common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, CONTAINER_COLUMNS_PROCUREMENT_CONTRACT_BOQ_STRUCTURE)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE)
        _common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, BOQ_STRUCT_03)
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL, Cypress.env("Item1_total"))
        })
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, BOQ_STRUCT_04)
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL, Cypress.env("Item2_total"))
        })
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, Sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create PES from Procurement Contract.", function () {
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, Sidebar.SideBarOptions.CREATE_PES)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
            _common.setup_gridLayout(cnt.uuid.HEADERS, CONTAINER_COLUMNS_PES)
        })
        _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME)
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.HEADERS)
        _common.openTab(app.TabBar.PESBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQS, 0)
            _common.setup_gridLayout(cnt.uuid.PES_ITEMS, CONTAINER_COLUMNS_PES_BOQS)
        })
        _common.clear_subContainerFilter(cnt.uuid.PES_ITEMS)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME)
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.PES_ITEMS)
        _common.openTab(app.TabBar.PESBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
            _common.setup_gridLayout(cnt.uuid.PES_BOQS_STRUCTURE, CONTAINER_COLUMNS_PES_BOQ_STRUCTURE)
        })
        _common.clear_subContainerFilter(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.select_rowHasValue(cnt.uuid.PES_BOQS_STRUCTURE, BOQ_STRUCT_03)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.PES_QUANTITY[0])
        _common.select_rowHasValue(cnt.uuid.PES_BOQS_STRUCTURE, BOQ_STRUCT_03)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PESItem1", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("PESItem1"))
        })
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PES_BOQS_STRUCTURE, BOQ_STRUCT_04)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.PES_QUANTITY[0])
        _common.select_rowHasValue(cnt.uuid.PES_BOQS_STRUCTURE, BOQ_STRUCT_04)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PESItem2", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("PESItem2"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        _common.select_rowInContainer(cnt.uuid.HEADERS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.HEADERS, app.GridCells.PES_VALUE, ((parseFloat(Cypress.env("PESItem1")) + parseFloat(Cypress.env("PESItem2"))).toString()))
        })
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.HEADERS, app.GridCells.PES_VALUE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PESTotal_01", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("PESTotal_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, Sidebar.SideBarOptions.CHANGE_PES_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.ACCEPTION)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create Invoice with Net total from PES.", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, Sidebar.SideBarOptions.CREATE_INVOICE)
        _common.waitForLoaderToDisappear()
        _package.enterRecord_toCreate_Invoice_FromWizard(Sidebar.SideBarOptions.CREATE_ONE_INVOICE_PER_PES, INVOICE_CODE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
            _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE)
        })
        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.INVOICEHEADER)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.INVOICEHEADER, app.GridCells.AMOUNT_NET, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_INVOICE.AMOUNT_NET[0])
        cy.SAVE()

        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, Sidebar.SideBarOptions.CHANGE_INVOICE_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.POSTED)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.INVOICEHEADER, INVOICE_CODE)
        _common.getText_fromCell(cnt.uuid.INVOICEHEADER, app.GridCells.AMOUNT_NET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("InvoiceTotal_01", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("InvoiceTotal_01"))
        })
    })

    it("TC - Verify Sales Contract, Package, Procurement Contract, PES and Invoice Totals in General Contractor Controlling Module.", function () {
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
            _common.set_containerLayoutUnderEditView(CommonLocators.CommonKeys.LAYOUT_21)
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
        _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item1_CU"))
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.COST_CONTROL, app.GridCells.GCC_PACKAGE_BUDGET, Cypress.env("PackageBudget_01"))
            _common.assert_forNumericValues(cnt.uuid.COST_CONTROL, app.GridCells.CONTRACT, Cypress.env("PrcContractTotal_01"))
            _common.assert_forNumericValues(cnt.uuid.COST_CONTROL, app.GridCells.INVOICE, Cypress.env("InvoiceTotal_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GCC_CONTRACTSALES, app.FooterTab.CONTRACT_SALES, 1);
            _common.setup_gridLayout(cnt.uuid.GCC_CONTRACTSALES, CONTAINER_COLUMNS_SALES_CONTRACT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.COST_CONTROL, app.FooterTab.COST_CONTROL, 0);
            _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item1_CU"))
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.GCC_CONTRACTSALES, app.FooterTab.CONTRACT_SALES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.GCC_CONTRACTSALES)
        _common.select_rowInContainer(cnt.uuid.GCC_CONTRACTSALES)
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.GCC_CONTRACTSALES, app.GridCells.TOTAL, Cypress.env("ContractSales_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_PACKAGES, app.FooterTab.PRC_PACKAGES, 2);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_PACKAGES, CONTAINER_COLUMNS_PRC_PACKAGES)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.COST_CONTROL, app.FooterTab.COST_CONTROL, 0);
            _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item1_CU"))
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_PACKAGES, app.FooterTab.PRC_PACKAGES, 2);
        });
        _common.select_rowInContainer(cnt.uuid.PROCUREMENT_PACKAGES)
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_PACKAGES)
        _common.select_rowInContainer(cnt.uuid.PROCUREMENT_PACKAGES)
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.PROCUREMENT_PACKAGES, app.GridCells.BUDGET, Cypress.env("PackageBudget_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GCC_PRC_CONTRACT, app.FooterTab.PRC_CONTRACTS, 3);
            _common.setup_gridLayout(cnt.uuid.GCC_PRC_CONTRACT, CONTAINER_COLUMNS_PRC_CONTRACT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.COST_CONTROL, app.FooterTab.COST_CONTROL, 0);
            _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item1_CU"))
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.GCC_PRC_CONTRACT, app.FooterTab.PRC_CONTRACTS, 3);
        });
        _common.clear_subContainerFilter(cnt.uuid.GCC_PRC_CONTRACT)
        _common.select_rowInContainer(cnt.uuid.GCC_PRC_CONTRACT)
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.GCC_PRC_CONTRACT, app.GridCells.TOTAL, Cypress.env("PrcContractTotal_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_PES, app.FooterTab.PRC_PES, 4);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_PES, CONTAINER_COLUMNS_PRC_PES)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.COST_CONTROL, app.FooterTab.COST_CONTROL, 0);
            _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item1_CU"))
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_PES, app.FooterTab.PRC_PES, 4);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_PES)
        _common.select_rowInContainer(cnt.uuid.PROCUREMENT_PES)
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.PROCUREMENT_PES, app.GridCells.PES_VALUE, Cypress.env("PESTotal_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GCC_PRC_INVOICE, app.FooterTab.PRC_INVOICE, 1);
            _common.setup_gridLayout(cnt.uuid.GCC_PRC_INVOICE, CONTAINER_COLUMNS_PRC_INVOICES)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.COST_CONTROL, app.FooterTab.COST_CONTROL, 0);
            _common.select_rowHasValue(cnt.uuid.COST_CONTROL, Cypress.env("Item1_CU"))
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.GCC_PRC_INVOICE, app.FooterTab.PRC_INVOICE, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.GCC_PRC_INVOICE)
        _common.select_rowInContainer(cnt.uuid.GCC_PRC_INVOICE)
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.GCC_PRC_INVOICE, app.GridCells.AMOUNT_NET, Cypress.env("InvoiceTotal_01"))
        })
        _common.waitForLoaderToDisappear()
    })

});
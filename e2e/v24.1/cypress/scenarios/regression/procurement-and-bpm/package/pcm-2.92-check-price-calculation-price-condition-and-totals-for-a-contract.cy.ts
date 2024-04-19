import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _package, _controllingUnit, _validate, _rfqPage } from "cypress/pages";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { randomNo } from "cypress/commands/integration";
import _ from "cypress/types/lodash";
import { DataCells } from "cypress/pages/interfaces";
import Buttons from "cypress/locators/buttons";

const allure = Cypress.Allure.reporter.getInterface();

const PRJ_NO = "R_PR-" + Cypress._.random(0, 999)
const PRJ_NAME = "PR-GCC-1.1-" + Cypress._.random(0, 999)
const CLERK_NAME = "HS"
const VALUE_NET = 'VALUE_NET'

let PROJECT_PARAMETERS: DataCells

let CONTAINER_PRICE_CONDITION,
    CONTAINER_COLUMNS_ORDER_ITEM,
    CONTAINER_COLUMNS_CONTRACT,
    CONTAINER_CONTRACT,
    CONTAINER_ORDER_ITEM,
    CONTAINER_COLUMNS_TOTALS,
    CONTAINER_COLUMNS_BILLING_SCHEMA

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.92 | Check price calculation, price condition and totals for a contract");
describe("PCM- 2.92 | Check price calculation, price condition and totals for a contract", () => {
    before(function () {
        cy.fixture("pcm/pcm-2.92-check-price-calculation-price-condition-and-totals-for-a-contract.json").then((data) => {
            this.data = data;
            CONTAINER_PRICE_CONDITION = this.data.CONTAINERS.PRICE_CONDITION
            CONTAINER_COLUMNS_ORDER_ITEM = this.data.CONTAINER_COLUMNS.ORDER_ITEM
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
            CONTAINER_CONTRACT = this.data.CONTAINERS.CONTRACT
            CONTAINER_ORDER_ITEM = this.data.CONTAINERS.ORDER_ITEM
            CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
            CONTAINER_COLUMNS_BILLING_SCHEMA = this.data.CONTAINER_COLUMNS.BILLING_SCHEMA
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME
            };
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.setDefaultView(app.TabBar.PROJECT)
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
        });
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Add price condition details if not exist", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PRICE_CONDITION);
        _common.openTab(app.TabBar.PRICE_CONDITION).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_CONDITION, app.FooterTab.PRICE_CONDITION, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PRICE_CONDITION, app.GridCells.DESCRIPTION_INFO, CONTAINER_PRICE_CONDITION.PRICE_CONDITION_DESCRIPTION)
        cy.REFRESH_CONTAINER()
        cy.wait(2000)
        _common.addRecord_inSubContainer_ifNotExist(cnt.uuid.PRICE_CONDITION_DETAILS, 0)
        cy.wait(2000)
        _common.edit_containerCell(cnt.uuid.PRICE_CONDITION_DETAILS, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PRICE_CONDITION.VALUE)
        cy.SAVE()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PRICE_CONDITION, app.GridCells.DESCRIPTION_INFO, CONTAINER_PRICE_CONDITION.FREIGHT_CHARGE)
        cy.wait(2000)
        _common.addRecord_inSubContainer_ifNotExist(cnt.uuid.PRICE_CONDITION_DETAILS, 0)
        cy.wait(2000)
        _common.edit_containerCell(cnt.uuid.PRICE_CONDITION_DETAILS, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PRICE_CONDITION.FREIGHT_CHARGE_VALUE)
        cy.SAVE()
    });

    it("TC - Add new record of standard singel in billing schema", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING_SCHEMA);
        cy.wait(2000)
        _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA, app.FooterTab.BILLINGSCHEMA, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA, app.GridCells.DESCRIPTION_INFO, commonLocators.CommonKeys.STANDARD_SINGEL)
        _common.select_allContainerData(cnt.uuid.BILLING_SCHEMA_DETAILS)
        _common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS, Buttons.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BILLING_SCHEMA_DETAILS).findCell_ByIcon(app.GridCellIcons.ICO_RUBRIC_CONTRACTS, 0)
        _common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS, Buttons.ToolBar.ICO_TREE_EXPAND_ALL)
        cy.wait(1000)
        _common.clickOn_cellHasIconWithIndex(cnt.uuid.BILLING_SCHEMA_DETAILS,app.GridCells.TREE,app.GridCellIcons.ICO_RUBRIC_CATEGORY,0)
        //_common.clickOn_cellHasValue(cnt.uuid.BILLING_SCHEMA_DETAILS,app.GridCells.DESCRIPTION_INFO,"Construction")
        cy.wait(2000)
        _common.addRecord_inSubContainer_ifNotExist(cnt.SubcontainerId.BILLING_SCHEMA_DETAILS, 1)
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_ORDER_ITEM)
            cy.REFRESH_SELECTED_ENTITIES()
        });
    });

    it("TC - Create new contract", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        });
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _saleContractPage.enterRecord_createNewContract(CONTAINER_CONTRACT.BUSINESS_PARTNER)
        cy.wait(2000)
    });

    it("TC - Create new Order Item", function () {
        _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_TOTALS, app.FooterTab.TOTALS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTRACT_TOTALS, CONTAINER_COLUMNS_TOTALS)
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_ORDER_ITEM)
        })
        _common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
        _saleContractPage.enterRecord_toCreateNewOrderItem(CONTAINER_ORDER_ITEM.MATERIAL_NO, CONTAINER_ORDER_ITEM.QUANTITY)
        cy.wait(2000)
        cy.SAVE()
        cy.wait(2000)
    });

    it("TC - Verify the total and total gross ,include oc should be recalculated;", function () {
        _common.getTextfromCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL,  app.GridCells.PRICE_SMALL)
        cy.wait(500).then(() => {
            _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.ITEMSCONTRACT, Cypress.env("Text"), Cypress.env("gridcell_2_Text"), app.GridCells.TOTAL_OC)
        })
            _common.getTextfromCell(cnt.uuid.CONTRACT_TOTALS, app.GridCells.VALUE_NET, app.GridCells.VALUE_TAX)
        cy.wait(500).then(()=>
        {
            _validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.CONTRACT_TOTALS, Cypress.env("Text"), Cypress.env("gridcell_2_Text"), app.GridCells.GROSS)
        })
    });

    it("TC - Verify Modify price, price gross,total price and total OC should be recalcalute", function () {
        _common.edit_containerCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_ORDER_ITEM.UPDATED_PRICE)
        cy.SAVE()
        cy.wait(2000)
        _common.getTextfromCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL, app.GridCells.PRICE_SMALL)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT,app.GridCells.TOTAL_PRICE,CONTAINER_ORDER_ITEM.UPDATED_PRICE)
        cy.wait(500).then(() => {
            _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.ITEMSCONTRACT, Cypress.env("Text"), Cypress.env("gridcell_2_Text"), app.GridCells.TOTAL_OC)
        })
    });

    it("TC - Verify Modify price condition, extra and extra oc will be recalculated,then total price total include oc should be recalculate", function () {
        _common.edit_dropdownCellWithCaret(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRC_PRICE_CONDITION_FK, commonLocators.CommonKeys.LIST, CONTAINER_PRICE_CONDITION.PRICE_CONDITION_DESCRIPTION)
        cy.SAVE()
        cy.wait(2000)
        cy.SAVE()
        _common.getTextfromCell(cnt.uuid.ITEMSCONTRACT,  app.GridCells.PRICE_SMALL, app.GridCells.PRICE_EXTRA)
        cy.wait(500).then(()=>
        {
            _validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.ITEMSCONTRACT, Cypress.env("Text"), Cypress.env("gridcell_2_Text"), app.GridCells.TOTAL_PRICE)
        })
        _common.getTextfromCell(cnt.uuid.ITEMSCONTRACT,  app.GridCells.PRICE_OC, app.GridCells.PRICE_EXTRA_OC)
        cy.wait(500).then(() => {
            _validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.ITEMSCONTRACT, Cypress.env("Text"), Cypress.env("gridcell_2_Text"), app.GridCells.TOTAL_PRICE_OC)
        })
        _common.edit_dropdownCellWithCaret(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRC_PRICE_CONDITION_FK, commonLocators.CommonKeys.LIST, CONTAINER_PRICE_CONDITION.FREIGHT_CHARGE)
        cy.SAVE()
        cy.wait(2000)
        cy.SAVE()
        _common.getTextfromCell(cnt.uuid.ITEMSCONTRACT,  app.GridCells.PRICE_SMALL, app.GridCells.PRICE_EXTRA_OC)
        cy.wait(500).then(() => {
            _validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.ITEMSCONTRACT, Cypress.env("Text"), Cypress.env("gridcell_2_Text"), app.GridCells.TOTAL_PRICE)
        })
        _common.getTextfromCell(cnt.uuid.ITEMSCONTRACT,  app.GridCells.PRICE_OC, app.GridCells.PRICE_EXTRA_OC)
        cy.wait(500).then(() => {
            _validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.ITEMSCONTRACT,  Cypress.env("Text"), Cypress.env("gridcell_2_Text"), app.GridCells.TOTAL_PRICE_OC)
        })
    });

    it("TC - Verify net value in total container and result in billing schema contianer ", function () {
        _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_TOTALS, app.FooterTab.TOTALS, 2);
            _common.saveCellDataToEnv(cnt.uuid.CONTRACT_TOTALS, app.GridCells.VALUE_NET, VALUE_NET)
            cy.wait(500).then(() => {
                _common.select_tabFromFooter(cnt.uuid.CONTRACT_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA, 2);
                _common.setup_gridLayout(cnt.uuid.CONTRACT_BILLING_SCHEMA, CONTAINER_COLUMNS_BILLING_SCHEMA)
                _common.select_rowInContainer(cnt.uuid.CONTRACT_BILLING_SCHEMA)
                _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_BILLING_SCHEMA, app.GridCells.RESULT, Cypress.env(VALUE_NET))
            })
        })
    })
})


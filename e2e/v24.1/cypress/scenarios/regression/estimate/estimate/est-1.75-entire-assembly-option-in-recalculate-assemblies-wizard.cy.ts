import { tile, app, cnt, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _assembliesPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

import _ from "cypress/types/lodash";
const allure = Cypress.Allure.reporter.getInterface();

const COST_TOTAL = 'COST_TOTAL'
const ASSEMBLY_COST_TOTAL = 'ASSEMBLY_COST_TOTAL'
let CONTAINERS_ASSEMBLY_CATEGORY
let CONTAINER_COLUMNS_ASSEMBLIES
let CONTAINERS_MATERIAL_CATALOG_RECORD
let CONTAINERS_MATERIAL_RECORD
let CONTAINER_COLUMNS_MATERIAL
let CONTAINERS_COST_CODE
let CONTAINER_COLUMNS_ASSEMBLY_RESOURCE
let RECALCULATE_ASSEMBLIES_PARAMETERS: DataCells
let MODAL_UPDATE_SETTING;
let MODAL_RECALCULATE_ASSEMBLIES;

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.75 | Entire assembly option in recalculate assemblies wizard")

describe("EST- 1.75 | Entire assembly option in recalculate assemblies wizard", () => {

    before(function () {
        cy.fixture("estimate/est-1.73-Highlight-assembly-option-in-recalculate-assemblies-wizard.json").then((data) => {
            this.data = data
            CONTAINERS_ASSEMBLY_CATEGORY = this.data.CONTAINERS.ASSEMBLY_CATEGORY
            CONTAINER_COLUMNS_ASSEMBLIES = this.data.CONTAINER_COLUMNS.ASSEMBLIES
            CONTAINERS_MATERIAL_CATALOG_RECORD = this.data.CONTAINERS.MATERIAL_CATALOG_RECORD
            CONTAINERS_MATERIAL_RECORD = this.data.CONTAINERS.MATERIAL_RECORD
            CONTAINER_COLUMNS_MATERIAL = this.data.CONTAINER_COLUMNS.MATERIAL
            CONTAINERS_COST_CODE = this.data.CONTAINERS.COST_CODE
            CONTAINER_COLUMNS_ASSEMBLY_RESOURCE = this.data.CONTAINER_COLUMNS.ASSEMBLY_RESOURCE
            MODAL_UPDATE_SETTING = this.data.MODAL.UPDATE_SETTING
            MODAL_RECALCULATE_ASSEMBLIES = this.data.MODAL.RECALCULATE_ASSEMBLIES

            RECALCULATE_ASSEMBLIES_PARAMETERS = {
                [commonLocators.CommonKeys.RADIO]: MODAL_RECALCULATE_ASSEMBLIES.SELECT_UPDATE_SCOPE,
                [commonLocators.CommonKeys.RADIO_INDEX]: 2,
                [commonLocators.CommonKeys.CHECKBOX]: MODAL_UPDATE_SETTING
            }
            cy.preLoading(
                Cypress.env("adminUserName"),
                Cypress.env("adminPassword"),
                Cypress.env("parentCompanyName"),
                Cypress.env("childCompanyName")
            );
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);

            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
            _common.waitForLoaderToDisappear()
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Verify assembly category, assemblies and assembly resources created', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLY_CATEGORIES, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINERS_ASSEMBLY_CATEGORY.DESCRIPTION)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_ASSEMBLY_CATEGORY.DESCRIPTION)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.ASSEMBLY_RECORD)
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLIES, app.GridCells.COST_TOTAL, COST_TOTAL)
    })

    it('TC - Update material list price, retail price and cost type from material module ', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 1);
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINERS_MATERIAL_CATALOG_RECORD.MATERIAL_CATALOG)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.MATERIAL_CATALOG)
        _common.clickOn_activeRowCell(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED)
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 1);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, CONTAINERS_MATERIAL_CATALOG_RECORD.MATERIAL_RESOURCE)
        _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.RETAIL_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE)
        _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.LIST_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORD.LIST_PRICE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.MATERIAL_RECORDS, app.GridCells.EST_COST_TYPE_FK, "list", CONTAINERS_MATERIAL_RECORD.COST_TYPE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })


    it('TC - Update  market rate and cost type from cost code module ', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES)
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODEDETAILS, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.COST_RESOURCE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODE_DETAILS, app.FooterTab.COSTCODES, 1);
        });
        _mainView.findCaretByLabel("Cost Type")
        _modalView.select_popupItem("list", CONTAINERS_MATERIAL_RECORD.COST_TYPE);
        _mainView.findInputInContainerByLabel(cnt.uuid.COST_CODE_DETAILS, CONTAINERS_COST_CODE.COST_CODE_RATE).clear().type(CONTAINERS_COST_CODE.MARKET_RATE)
        _estimatePage.edit_CostCheckboxInCostCodes(cnt.uuid.COST_CODE_DETAILS, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })


    it('TC - Recalculate assembly and verify cost total and cost type ', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.ASSEMBLY_CATEGORY)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES, CONTAINERS_MATERIAL_CATALOG_RECORD.ASSEMBLY_RECORD)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.ASSEMBLY_RECORD)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLIES, 1);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE, CONTAINER_COLUMNS_ASSEMBLY_RESOURCE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.MATERIAL_RESOURCE)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.RECALCULATE_ASSEMBLIES)
        _assembliesPage.recalculate_assemblies_fromWizard(RECALCULATE_ASSEMBLIES_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.ASSEMBLY_CATEGORY)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.ASSEMBLY_RECORD)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.MATERIAL_RESOURCE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.COST_UNIT, CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.EST_COST_TYPE_FK, CONTAINERS_MATERIAL_RECORD.COST_TYPE)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.COST_RESOURCE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.COST_UNIT, CONTAINERS_COST_CODE.MARKET_RATE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.EST_COST_TYPE_FK, CONTAINERS_MATERIAL_RECORD.COST_TYPE)
    })


    it('TC - Verify cost/unit is readonly when fixed unit rate is checked in cost code and if unchecked the cost total is not changed in assembly', function () {

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_RESOURCE, CONTAINERS_MATERIAL_CATALOG_RECORD.COST_RESOURCE)
        _validate.verify_inputFieldVisibility(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.COST_UNIT, app.InputFields.INPUT_GROUP_CONTENT, "notVisible")
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES)
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODEDETAILS, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.COST_RESOURCE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODE_DETAILS, app.FooterTab.COSTCODES, 1);
        });
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.ASSEMBLY_CATEGORY)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.ASSEMBLY_RECORD)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.MATERIAL_RESOURCE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.RECALCULATE_ASSEMBLIES)
        _assembliesPage.recalculate_assemblies_fromWizard(RECALCULATE_ASSEMBLIES_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.ASSEMBLY_CATEGORY)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.ASSEMBLY_RECORD)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.COST_RESOURCE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.COST_UNIT, CONTAINERS_COST_CODE.MARKET_RATE)
    })

    it('TC - Verify cost in cost code is unchecked and recalculate assembly', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES)
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODEDETAILS, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.COST_RESOURCE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODE_DETAILS, app.FooterTab.COSTCODES, 1);
        });
        _estimatePage.edit_CostCheckboxInCostCodes(cnt.uuid.COST_CODE_DETAILS, commonLocators.CommonKeys.UNCHECK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.ASSEMBLY_CATEGORY)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.ASSEMBLY_RECORD)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.COST_RESOURCE)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.RECALCULATE_ASSEMBLIES)
        _assembliesPage.recalculate_assemblies_fromWizard(RECALCULATE_ASSEMBLIES_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.ASSEMBLY_CATEGORY)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.ASSEMBLY_RECORD)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.COST_RESOURCE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.COST_UNIT, CONTAINERS_COST_CODE.MARKET_RATE)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLIES, app.GridCells.COST_TOTAL, ASSEMBLY_COST_TOTAL)
    })

    it('TC - Verify cost in cost code is unchecked and it is not added in cost total from assembly ', function () {
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_RECORD.MATERIAL_RESOURCE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.COST_TOTAL, Cypress.env(ASSEMBLY_COST_TOTAL))
    })
})
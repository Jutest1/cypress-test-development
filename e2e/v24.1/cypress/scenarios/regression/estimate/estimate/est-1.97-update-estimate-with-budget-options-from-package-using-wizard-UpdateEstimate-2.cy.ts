import { _common, _projectPage, _bidPage, _saleContractPage, _procurementPage, _wipPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage, _ticketSystemPage } from "cypress/pages";
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import { EST_HEADER } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const PACKAGE_DEC = "PACKAGE_DEC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const EST_DESCRIPTION = 'EST_DESCRIPTION'
const VERIFY_FINAL_PRICE = 'verifyFinalprice'
const BUDGET_PRICE = 'BUDGET_PRICE'
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let ESTIMATE_PARAMETERS: DataCells;
let CREATE_PROJECT_PARAMETERS: DataCells;
let CONTAINERS_CUSTOMIZING
let CONTAINER_COLUMNS_BOQ_STRUCTURE
let CONTAINERS_LINE_ITEM
let CONTAINER_COLUMNS_LINE_ITEM
let UPDATE_ESTIMATE_PARAMETER: DataCells
let MODAL_UPDATE_ESTIMATE_WIZARD

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 1.97 | Update Estimate with Budget options from Package using wizard 'Update Estimate' 2 ");

describe("EST- 1.97 | Update Estimate with Budget options from Package using wizard 'Update Estimate' 2", () => {
    before(function () {
        cy.fixture("estimate/est-1.97-update-estimate-with-budget-options-from-package-using-wizard-UpdateEstimate-2.json")
            .then((data) => {
                this.data = data;
                CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
                CONTAINERS_CUSTOMIZING = this.data.CONTAINERS.CUSTOMIZING;
                CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
                CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
                CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
                MODAL_UPDATE_ESTIMATE_WIZARD = this.data.MODAL.UPDATE_ESTIMATE_WIZARD
                CREATE_PROJECT_PARAMETERS = {
                    [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                    [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                    [commonLocators.CommonLabels.CLERK]: CLERK_NAME
                };
                ESTIMATE_PARAMETERS = {
                    [app.GridCells.CODE]: ESTIMATE_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                    [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                    [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
                };
                UPDATE_ESTIMATE_PARAMETER = {
                    [commonLocators.CommonKeys.CHECKBOX]: MODAL_UPDATE_ESTIMATE_WIZARD
                }

                cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.waitForLoaderToDisappear()
                _common.openTab(app.TabBar.PROJECT).then(() => {
                    _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
                });
                _common.create_newRecord(cnt.uuid.PROJECTS);
                _projectPage.enterRecord_toCreateProject(CREATE_PROJECT_PARAMETERS);
                _common.waitForLoaderToDisappear()
                cy.SAVE()
                cy.wait(2000) // required wait
                //_common.saveCellDataToEnv(cnt.uuid.PROJECTS,app.GridCells.PROJECT_NO,PRJ_NUMBER)
                _common.waitForLoaderToDisappear()
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
                _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
                _common.waitForLoaderToDisappear()
            });
    });
    after(() => {
        cy.LOGOUT();
    });

    it("TC - Set Estimation type under customizing module", function () {
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, CONTAINERS_CUSTOMIZING.DATA_TYPE)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, CONTAINERS_CUSTOMIZING.DATA_TYPE)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.search_inSubContainer(cnt.uuid.INSTANCES, CONTAINERS_CUSTOMIZING.DATA_RECORDS)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_CUSTOMIZING.DATA_RECORDS)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_TOTAL_WQ, commonLocators.CommonKeys.CHECK)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_TOTAL_AQ_BUDGET, commonLocators.CommonKeys.UNCHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.search_inSubContainer(cnt.uuid.INSTANCES, CONTAINERS_CUSTOMIZING.BID_ESTIMATE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_CUSTOMIZING.BID_ESTIMATE)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_TOTAL_WQ, commonLocators.CommonKeys.CHECK)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_TOTAL_AQ_BUDGET, commonLocators.CommonKeys.UNCHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Set Is For Package satatus under customizing module", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, CONTAINERS_CUSTOMIZING.DATA_TYPE_1)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, CONTAINERS_CUSTOMIZING.DATA_TYPE_1)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.search_inSubContainer(cnt.uuid.INSTANCES, CONTAINERS_CUSTOMIZING.DATA_RECORDS_1)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_CUSTOMIZING.DATA_RECORDS_1)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_ESTIMATE, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
    })

    it('TC - Create new estimate header.', function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE, app.GridCells.DESCRIPTION_INFO, EST_DESCRIPTION, EST_HEADER)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        cy.wait(3000) // required wait to load page
    });

    it('TC - Create a package and add record in procurmnet boq .', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.create_newRecord(cnt.uuid.PACKAGE)
        _package.enterRecord_toCreatePackage("Service", PACKAGE_DEC)
        _common.openTab(app.TabBar.BOQBASED).then(() => {
            _common.setDefaultView(app.TabBar.BOQBASED)
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 0);
        })
        _common.create_newRecord(cnt.uuid.PROCUREMENT_BOQS)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.openTab(app.TabBar.BOQBASED).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, CONTAINERS_LINE_ITEM.ROOT);
        _common.create_newRecord(cnt.uuid.BOQ_STRUCTURE);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, CONTAINERS_LINE_ITEM.POSITION);
        _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LINE_ITEM.QUANTITY);
        _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURE, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LINE_ITEM.UNIT_RATE);
        _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_ADJ, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LINE_ITEM.AQ_QUANTITY)
        _common.edit_dropdownCellWithInput(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BAS_UOM_FK, 'grid', app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LINE_ITEM.UOM);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Update the fixed budget and update the estimate .', function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.COPY_UNIT_RATE_TO_BUDGET_PER_UNIT);
        cy.wait(1000)//taking time to load page
        _common.clickOn_modalFooterButton(btn.ButtonText.YES)
        cy.wait(1000)//taking time to load page
        _common.openTab(app.TabBar.BOQBASED).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, CONTAINERS_LINE_ITEM.ROOT);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, CONTAINERS_LINE_ITEM.POSITION);
        _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURE)
        _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BUDGET_PER_UNIT, BUDGET_PRICE);
        _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL, VERIFY_FINAL_PRICE);
        _common.minimizeContainer(cnt.uuid.BOQ_STRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE)
        cy.wait(1000)//taking time to load page
        _estimatePage.update_estimate_fromWizard(UPDATE_ESTIMATE_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//taking time to load page
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Assertion 1- Navigate back to Estimate and verify the updated Budget price per unit .', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();

        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE)
        cy.wait(2000).then(() => {
            _common.search_inSubContainer(cnt.uuid.ESTIMATE, Cypress.env(EST_DESCRIPTION))
        })
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        cy.wait(3000)//taking time to load page
        cy.REFRESH_CONTAINER()
        cy.wait(5000)//***taking time to search
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS)
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
        })
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        cy.wait(1000)//taking time to load page
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.assert_cellDataByContent_inContainer(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.BUDGET_UNIT, CONTAINERS_LINE_ITEM.AQ_QUANTITY)
    })

    it('TC - Assertion-2 verify the updated Budget total in estimate line item .', function () {
        _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINERS_LINE_ITEM.AQ_QUANTITY, CONTAINERS_LINE_ITEM.QUANTITY, app.GridCells.BUDGET)
    })

    it('TC -  Assertion-3 verify the updated Budget total resource .', function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES)
        })
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL, CONTAINERS_LINE_ITEM.COST_TOTAL)
    })

})
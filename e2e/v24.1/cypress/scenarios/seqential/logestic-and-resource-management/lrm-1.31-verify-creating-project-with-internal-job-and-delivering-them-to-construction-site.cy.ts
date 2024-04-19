import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage, _billPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const CONTROLLING_UNIT = "CU" + Cypress._.random(0, 999);
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC" + Cypress._.random(0, 999);
const PLANT_TYPE = "Plant_Type-" + Cypress._.random(0, 999);
const PLANT_LIST1 = "PL-" + Cypress._.random(0, 999);
const PLANT_LIST2 = "Price List 2-" + Cypress._.random(0, 999);
const CONDITION_CODE = "CC-" + Cypress._.random(0, 999);
const CONDITION_DESC = "CDESC" + Cypress._.random(0, 999);
const RENTEL = "Rental" + Cypress._.random(0, 999);
const PERFORMANCE = "Performance" + Cypress._.random(0, 999);
const BULK = "Bulk" + Cypress._.random(0, 999);
const CODE_WORK = "Work" + Cypress._.random(0, 999);
const CODE_PERFORMANCE = "PERFORMANCE" + Cypress._.random(0, 999);
const DESC_WORK = "Work" + Cypress._.random(0, 999);
const DESC_PERFORMANCE = "PERFORMANCE" + Cypress._.random(0, 999);
const SUB_PLANT_GROUP = "SUB_PG" + Cypress._.random(0, 999);
const SUB_PLANT_GROUP_DESC = "SUB_PG_DESC" + Cypress._.random(0, 999);
const PLANT_DESCRIPTION = "Paylons" + Cypress._.random(0, 999);

let MODAL_PROJECTS
let PROJECTS_PARAMETERS: DataCells

let CONTAINER_COLUMNS_DATA_TYPES,
    CONTAINER_COLUMNS_DATA_RECORD,
    CONTAINER_DATA_RECORD,
    DATA_RECORD_PARAMETER1,
    DATA_RECORD_PARAMETER2;

let CONTAINER_OPERATION_TYPES,
    CONTAINER_COLUMNS_PLANT_TYPES,
    CONTAINER_COLUMNS_OPERATION_TYPES;

let OPERATION_TYPE_PARAMETER_WORK,
    OPERATION_TYPE_PARAMETER_PERFORMANCE;

let CONTAINERS_CONTROLLING_UNIT
let CONTAINER_COLUMNS_CONTROLLING_UNIT;
let CONTROLLING_UNIT_PARAMETERS: DataCells;


let CONTAINERS_PLANT_GROUP,
    CONTAINER_COLUMNS_PLANT_GROUP

let CONTAINERS_PLANT,
    CONTAINER_COLUMNS_PLANT,
    PLANT_PARAMETERS,
    CONTAINER_COLUMNS_PLANT_CONTROLLING;

let CONTAINER_COLUMNS_JOBS;
let CONTAINER_JOBS;
let CONTAINER_COLUMNS_CONDITIONS
let CONTAINERS_WORK_OPERATION_TYPE_CONDITIONS



// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("System Setup");
ALLURE.story("LRM- 1.31 | Verify creating project with internal job and delivering them to construction site");

describe("LRM- 1.31 | Verify creating project with internal job and delivering them to construction site", () => {

    before(function () {

        cy.fixture("LRM/lrm-1.31-verify-creating-project-with-internal-job-and-delivering-them-to-construction-site.json").then((data) => {
            this.data = data;
            CONTAINER_DATA_RECORD = this.data.CONTAINERS.DATA_RECORD;
            CONTAINER_COLUMNS_DATA_TYPES = this.data.CONTAINER_COLUMNS.DATA_TYPES;
            CONTAINER_OPERATION_TYPES = this.data.CONTAINERS.OPERATION_TYPES;
            CONTAINER_COLUMNS_PLANT_TYPES = this.data.CONTAINER_COLUMNS.PLANT_TYPES;
            CONTAINER_COLUMNS_OPERATION_TYPES = this.data.CONTAINER_COLUMNS.OPERATION_TYPES;
            CONTAINER_COLUMNS_DATA_RECORD = this.data.CONTAINER_COLUMNS.DATA_RECORD;
            CONTAINER_DATA_RECORD = this.data.CONTAINERS.DATA_RECORD;
            DATA_RECORD_PARAMETER1 = {
                [app.GridCells.PRICE_LIST_TYPE_FK]: PLANT_TYPE,
                [app.GridCells.ETM_CONTEXT_FK]: CONTAINER_DATA_RECORD.LINE_ITEM_CONTEXT,
                [app.GridCells.CURRENCY_FK]: CONTAINER_DATA_RECORD.CURRENCY,
                [app.GridCells.PERCENT]: CONTAINER_DATA_RECORD.PERCENT,
                [app.GridCells.DESCRIPTION_INFO]: PLANT_LIST1,
                [app.GridCells.UOM_FK]: CONTAINER_DATA_RECORD.UOM,
                [app.GridCells.CALCULATION_TYPE_FK]: CONTAINER_DATA_RECORD.AVERAGE_CATALOG_VALUE
            }
            DATA_RECORD_PARAMETER2 = {
                [app.GridCells.PRICE_LIST_TYPE_FK]: PLANT_TYPE,
                [app.GridCells.ETM_CONTEXT_FK]: CONTAINER_DATA_RECORD.LINE_ITEM_CONTEXT,
                [app.GridCells.CURRENCY_FK]: CONTAINER_DATA_RECORD.CURRENCY,
                [app.GridCells.PERCENT]: CONTAINER_DATA_RECORD.PERCENT,
                [app.GridCells.DESCRIPTION_INFO]: PLANT_LIST2,
                [app.GridCells.UOM_FK]: CONTAINER_DATA_RECORD.UOM,
                [app.GridCells.CALCULATION_TYPE_FK]: CONTAINER_DATA_RECORD.AVERAGE_CATALOG_VALUE
            }

            OPERATION_TYPE_PARAMETER_WORK = {
                [app.GridCells.IS_LIVE]: CONTAINER_OPERATION_TYPES.CHECK,
                [app.GridCells.CODE]: CODE_WORK,
                [app.GridCells.DESCRIPTION_INFO]: DESC_WORK,
                [app.GridCells.UOM_FK]: CONTAINER_OPERATION_TYPES.DAY,
                [app.GridCells.IS_HIRE]: CONTAINER_OPERATION_TYPES.CHECK
            }
            OPERATION_TYPE_PARAMETER_PERFORMANCE = {
                [app.GridCells.IS_LIVE]: CONTAINER_OPERATION_TYPES.CHECK,
                [app.GridCells.CODE]: CODE_PERFORMANCE,
                [app.GridCells.DESCRIPTION_INFO]: DESC_PERFORMANCE,
                [app.GridCells.UOM_FK]: CONTAINER_OPERATION_TYPES.HOUR,
            }

            CONTAINERS_PLANT_GROUP = this.data.CONTAINERS.PLANT_GROUP;
            CONTAINER_COLUMNS_PLANT_GROUP = this.data.CONTAINER_COLUMNS.PLANT_GROUP;

            CONTAINER_COLUMNS_PLANT = this.data.CONTAINER_COLUMNS.PLANT;
            CONTAINERS_PLANT = this.data.CONTAINERS.PLANT;
            PLANT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: PLANT_DESCRIPTION,
                [app.GridCells.PLANT_GROUP_FK]: SUB_PLANT_GROUP,
                [app.GridCells.PLANT_KIND_FK]: CONTAINERS_PLANT.PLANT_KIND,
                [app.GridCells.PLANT_TYPE_FK]: CONTAINERS_PLANT.PLANT_TYPE,
                [app.GridCells.PROCUREMENT_STRUCTURE_FK]: CONTAINERS_PLANT.STRUCTURE,
                [app.GridCells.CLERK_RESPONSIBLE_FK]: CONTAINERS_PLANT.CLERK_RESPONSIBLE
            }

            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT;
            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT;
            CONTROLLING_UNIT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: CONTROLLING_UNIT,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM,
            }
            CONTAINER_COLUMNS_JOBS = this.data.CONTAINER_COLUMNS.JOBS
            CONTAINER_JOBS = this.data.CONTAINERS.JOBS

            CONTAINER_COLUMNS_CONDITIONS = this.data.CONTAINER_COLUMNS.CONDITIONS

            CONTAINERS_WORK_OPERATION_TYPE_CONDITIONS = this.data.CONTAINERS.WORK_OPERATION_TYPE_CONDITIONS

            MODAL_PROJECTS = this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]: MODAL_PROJECTS.CLERK
            }

            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.setDefaultView(app.TabBar.PROJECT)
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).clear_searchInSidebar()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.create_newRecord(cnt.uuid.PROJECTS);
            cy.wait(1000)//required wait to enable project fields
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            _common.waitForLoaderToDisappear()
            cy.SAVE();
            _common.waitForLoaderToDisappear()
            cy.SAVE();
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        });
    })

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Add Plant Type Record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES)
            _common.setup_gridLayout(cnt.uuid.DATA_TYPES, CONTAINER_COLUMNS_DATA_TYPES)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_LIST_TYPE)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_LIST_TYPE)
        _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait to enable data input fields
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PLANT_TYPE);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })
    it("TC - Create New Data Record", function () {
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_PRICE_LIST)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_PRICE_LIST)

        _common.maximizeContainer(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _logesticPage.enterRecord_toCreatePlantListDataRecord(DATA_RECORD_PARAMETER1)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_MANUAL_EDIT_PLANT_MASTER, CONTAINER_DATA_RECORD.CHECK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _logesticPage.enterRecord_toCreatePlantListDataRecord(DATA_RECORD_PARAMETER2)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_MANUAL_EDIT_PLANT_MASTER, CONTAINER_DATA_RECORD.CHECK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.DATA_RECORDS)
    })

    it("TC - Add Plant Type Data Record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES)
            _common.setup_gridLayout(cnt.uuid.DATA_TYPES, CONTAINER_COLUMNS_DATA_TYPES)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_TYPE)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_TYPE)
        _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
        _common.maximizeContainer(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, RENTEL);
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_CLUSTER, commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PERFORMANCE);
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_TIMEKEEPING, commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, BULK);
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_BULK, commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })

    it("TC - Create Work Operation Types", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WORK_OPERATION_TYPES)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
            _common.setup_gridLayout(cnt.uuid.OPERATION_TYPE, CONTAINER_COLUMNS_OPERATION_TYPES)
            _common.select_tabFromFooter(cnt.uuid.OPERATION_2_PLANT_TYPE, app.FooterTab.PLANT_TYPES)
            _common.setup_gridLayout(cnt.uuid.OPERATION_2_PLANT_TYPE, CONTAINER_COLUMNS_PLANT_TYPES)
        })
        _common.maximizeContainer(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait to enable search field
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait to enable data input fields
        _logesticPage.enterRecord_toCreateOprationType(OPERATION_TYPE_PARAMETER_WORK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait to enable data input fields
        _logesticPage.enterRecord_toCreateOprationType(OPERATION_TYPE_PARAMETER_PERFORMANCE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.OPERATION_TYPE)
    })

    it("TC - Assign Plant Types to Work Operation Types", function () {
        _common.openTab(app.TabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
        })
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.search_inSubContainer(cnt.uuid.OPERATION_TYPE, DESC_WORK)
        cy.wait(1000) //required wait to select row
        _common.select_rowHasValue(cnt.uuid.OPERATION_TYPE, DESC_WORK)
        _common.select_tabFromFooter(cnt.uuid.OPERATION_2_PLANT_TYPE, app.FooterTab.PLANT_TYPES)
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, RENTEL);
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, BULK);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
        })
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.search_inSubContainer(cnt.uuid.OPERATION_TYPE, DESC_PERFORMANCE)
        cy.wait(1000) //required wait to select row
        _common.select_rowHasValue(cnt.uuid.OPERATION_TYPE, DESC_PERFORMANCE)
        _common.select_tabFromFooter(cnt.uuid.OPERATION_2_PLANT_TYPE, app.FooterTab.PLANT_TYPES)
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, PERFORMANCE);
        _common.set_cellCheckboxValue(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.IS_TIMEKEEPING_DEFAULT, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Add Controlling Unit", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
            _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.create_newRecord(cnt.uuid.CONTROLLING_UNIT)
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_BILLING_ELEMENT, commonLocators.CommonKeys.CHECK)
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_ACCOUNTING_ELEMENT, commonLocators.CommonKeys.CHECK)
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_PLANNING_ELEMENT, commonLocators.CommonKeys.CHECK)
        cy.wait(1000)//required wait to enable data input fields
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS)
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_BILLING_ELEMENT, commonLocators.CommonKeys.CHECK)
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_ACCOUNTING_ELEMENT, commonLocators.CommonKeys.CHECK)
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_PLANNING_ELEMENT, commonLocators.CommonKeys.CHECK)
        cy.wait(1000)//required wait to save the data
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create Job record in logistic job module", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.LOGISTIC_JOB)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.clear_searchInSidebar()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.LOGISTIC_JOB).then(() => {
            _common.select_tabFromFooter(cnt.uuid.JOBS, app.FooterTab.JOBS, 0);
            _common.setup_gridLayout(cnt.uuid.JOBS, CONTAINER_COLUMNS_JOBS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_JOBS.controllingunitfk], cnt.uuid.JOBS)

        });
        _common.clear_subContainerFilter(cnt.uuid.JOBS)
        _common.select_rowHasValue(cnt.uuid.JOBS, PROJECT_NO)
        _common.maximizeContainer(cnt.uuid.JOBS)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.JOBS, app.GridCells.SETTLED_BY_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINER_JOBS.SETTELED_BY)
        cy.wait(1000)//required wait to enable data input fields
        _common.clickOn_activeRowCell(cnt.uuid.JOBS, app.GridCells.CONTROLLING_UNIT_FK)
        cy.wait(1000)//required wait to save data
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.CONTROLLING_UNIT, CONTROLLING_UNIT, commonLocators.CommonKeys.GRID)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.select_activeRowInContainer(cnt.uuid.JOBS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.JOBS)
        _common.waitForLoaderToDisappear()

    })

    it("TC - Create Job record in logistic price condition module", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.LOGISTIC_PRICE_CONDITION)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.LOGISTIC_PRICE_CONDITION).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONDITIONS, app.FooterTab.CONDITIONS);
            _common.setup_gridLayout(cnt.uuid.CONDITIONS,CONTAINER_COLUMNS_CONDITIONS)
            _common.clear_subContainerFilter(cnt.uuid.CONDITIONS)
        });
        _common.maximizeContainer(cnt.uuid.CONDITIONS)
        _common.create_newRecord(cnt.uuid.CONDITIONS)
        _common.enterRecord_inNewRow(cnt.uuid.CONDITIONS, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, CONDITION_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.CONDITIONS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONDITION_DESC)
        _common.set_cellCheckboxValue(cnt.uuid.CONDITIONS, app.GridCells.IS_HANDLING_CHARGE,commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.CONDITIONS)
        _common.select_rowHasValue(cnt.uuid.CONDITIONS, CONDITION_CODE)
        _common.openTab(app.TabBar.PLANT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EQUIPMENT_CATALOG_PRICES, app.FooterTab.PLANT_CATALOG_PRICELISTS);
        });
        _common.create_newRecord(cnt.uuid.EQUIPMENT_CATALOG_PRICES)
        _common.edit_dropdownCellWithCaret(cnt.uuid.EQUIPMENT_CATALOG_PRICES, app.GridCells.EQUIPMENT_PRICE_LIST_FK, commonLocators.CommonKeys.LIST, PLANT_LIST2)
        
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PLANT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_CONDITION_ITEM, app.FooterTab.WORK_OPERATION_TYPE_CONDITIONS);
            _common.create_newRecord(cnt.uuid.PRICE_CONDITION_ITEM)
            _common.edit_dropdownCellWithInput(cnt.uuid.PRICE_CONDITION_ITEM, app.GridCells.WORK_OPERATION_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CODE_WORK)
        });
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait to enable data input fields
        _modalView.findCaretInsideModal(commonLocators.CommonLabels.PLANT_PRICING_GROUP)
        _common.select_ItemFromPopUpList(commonLocators.CommonKeys.LIST,CONTAINERS_WORK_OPERATION_TYPE_CONDITIONS.PLANT_PRICING_GROUP)
        cy.wait(1000)//required wait to enable button
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Assign Price condition in logistic job module", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.LOGISTIC_JOB)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait to open sidebar
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.clear_searchInSidebar()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.LOGISTIC_JOB).then(() => {
            _common.select_tabFromFooter(cnt.uuid.JOBS, app.FooterTab.JOBS);
            _common.select_rowHasValue(cnt.uuid.JOBS, PROJECT_NO)
        });
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.JOBS, app.GridCells.PRICE_CONDITION_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONDITION_CODE)
        _common.edit_dropdownCellWithInput(cnt.uuid.JOBS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_JOBS.BUSINESS_PARTNER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
});
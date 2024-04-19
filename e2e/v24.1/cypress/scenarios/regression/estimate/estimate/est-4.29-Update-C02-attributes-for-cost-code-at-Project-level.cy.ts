import { commonLocators, app, tile, sidebar, cnt, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _estimatePage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRJ" + Cypress._.random(0, 9999);
const PRJ_NAME = "TEST-" + PRJ_NO;
const EST_CODE = "EST" + Cypress._.random(0, 9999)
const EST_DESC = "EST_DESC_" + Cypress._.random(0, 9999)
const LINE_ITEM_1 = "ITEM-1-" + Cypress._.random(0, 9999)
const CO2_SOURCE_DESCRIPTION = "CO2-SOURCE-" + Cypress._.random(0, 9999)

let CONTAINERS_COST_CODES, CONTAINERS_ESTIMATE_COST_CODES, CONTAINERS_COST_CODES_JOB_RATE, CONTAINERS_PROJECT, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCE;

let CONTAINER_COLUMNS_COST_CODES, CONTAINER_COLUMNS_ESTIMATE_COST_CODES, CONTAINER_COLUMNS_COST_CODES_JOB_RATE, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCE;

let MODAL_UPDATE_ESTIMATE;

let PROJECT_PARAMETERS: DataCells, ESTIMATE_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS: DataCells, RESOURCE_PARAMETERS_1: DataCells, RESOURCE_PARAMETERS_2: DataCells;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 4.29 | Update CO2 attributes for cost codes at Project level")

describe("EST- 4.29 | Update CO2 attributes for cost codes at Project level", () => {

    before(function () {

        cy.fixture("estimate/est-4.29-update-CO2-attributes-for-cost-codes-at-project-level.json").then((data) => {
            this.data = data
            CONTAINERS_COST_CODES = this.data.CONTAINERS.COST_CODES
            CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES

            CONTAINERS_ESTIMATE_COST_CODES = this.data.CONTAINERS.ESTIMATE_COST_CODES
            CONTAINER_COLUMNS_ESTIMATE_COST_CODES = this.data.CONTAINER_COLUMNS.ESTIMATE_COST_CODES
            CONTAINERS_COST_CODES_JOB_RATE = this.data.CONTAINERS.COST_CODES_JOB_RATE
            CONTAINER_COLUMNS_COST_CODES_JOB_RATE = this.data.CONTAINER_COLUMNS.COST_CODES_JOB_RATE
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
            };
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            };
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM;
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_1,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY[0],
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM[0],
            };
            MODAL_UPDATE_ESTIMATE = this.data.MODAL.UPDATE_ESTIMATE_WIZARD
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCES;
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCES;
            RESOURCE_PARAMETERS_1 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.COST_CODE[0],
            };
            RESOURCE_PARAMETERS_2 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.COST_CODE[1],
            };
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        })

    })
    after(() => {
        cy.LOGOUT();
    });

    it(`TC - Pre-Conditions : Co2/kg (Source Name) Data Records should be added in 'CO2 Source' in customization`, function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CommonLocators.CommonLabels.CO2_SOURCE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, CommonLocators.CommonLabels.CO2_SOURCE)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.INSTANCES)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CO2_SOURCE_DESCRIPTION)
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES, app.GridCells.IS_DEFAULT, CommonLocators.CommonKeys.CHECK)
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES, app.GridCells.IS_LIVE, CommonLocators.CommonKeys.CHECK)
        _common.select_activeRowInContainer(cnt.uuid.INSTANCES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Pre-Conditions : Add CO2 project value to records and Cost Code Module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODES.co2project, CONTAINER_COLUMNS_COST_CODES.descriptioninfo], cnt.uuid.COST_CODES)
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.CO2_PROJECT_VALUE[0])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.getText_fromCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CostCode_CO2_Value", $ele1.text())
            cy.log(Cypress.env("CostCode_CO2_Value"))
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.COST_CODES, CONTAINERS_COST_CODES.COST_CODE[1])
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.CO2_PROJECT_VALUE[1])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE[1])
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.getText_fromCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CostCode_CO2_Value", $ele1.text())
            cy.log(Cypress.env("CostCode_CO2_Value"))
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Create new project and estimate header.', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(Sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create new line item and assign resource to it.', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.co2projecttotal, CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo], cnt.uuid.ESTIMATE_LINEITEMS,)
        });
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.co2project, CONTAINER_COLUMNS_RESOURCE.code], cnt.uuid.RESOURCES,)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_1);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2Item1", $ele1.text())
            cy.log(Cypress.env("CO2Item1"))
        })
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_2);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2Item2", $ele1.text())
            cy.log(Cypress.env("CO2Item2"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_PROJECT_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2TotalLineItem", $ele1.text())
            cy.log(Cypress.env("CO2TotalLineItem"))
        })
    });

    it('TC - Add CO2 project value to records in Cost Code container', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            _common.set_containerLayoutUnderEditView(CommonLocators.CommonKeys.LAYOUT_6)
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(Sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_COST_CODES, app.FooterTab.COSTCODES, 1);
            _common.setup_gridLayout(cnt.uuid.PROJECT_COST_CODES, CONTAINER_COLUMNS_ESTIMATE_COST_CODES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ESTIMATE_COST_CODES.co2project, CONTAINER_COLUMNS_ESTIMATE_COST_CODES.description], cnt.uuid.PROJECT_COST_CODES)
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECT_COST_CODES)
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COSTCODESJOBRATE, app.FooterTab.COST_CODE_JOB_RATE, 2);
            _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODES_JOB_RATE.co2project], cnt.uuid.COSTCODESJOBRATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.COSTCODESJOBRATE)
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_COST_CODES, app.FooterTab.COSTCODES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECT_COST_CODES)
        _common.search_inSubContainer(cnt.uuid.PROJECT_COST_CODES, CONTAINERS_ESTIMATE_COST_CODES.COST_CODE[0])
        _common.select_rowHasValue(cnt.uuid.PROJECT_COST_CODES, CONTAINERS_ESTIMATE_COST_CODES.COST_CODE[0])
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COSTCODESJOBRATE, app.FooterTab.COST_CODE_JOB_RATE, 2);
        });
        _common.select_rowInContainer(cnt.uuid.COSTCODESJOBRATE)
        _common.edit_containerCell(cnt.uuid.COSTCODESJOBRATE, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES_JOB_RATE.CO2_PROJECT_VALUE[0])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.COSTCODESJOBRATE, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CC_JobRate_UP_01", $ele1.text())
            cy.log(Cypress.env("CC_JobRate_UP_01"))
        })
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_COST_CODES, app.FooterTab.COSTCODES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECT_COST_CODES)
        _common.search_inSubContainer(cnt.uuid.PROJECT_COST_CODES, CONTAINERS_ESTIMATE_COST_CODES.COST_CODE[1])
        _common.select_rowHasValue(cnt.uuid.PROJECT_COST_CODES, CONTAINERS_ESTIMATE_COST_CODES.COST_CODE[1])
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COSTCODESJOBRATE, app.FooterTab.COST_CODE_JOB_RATE, 2);
        });
        _common.select_rowInContainer(cnt.uuid.COSTCODESJOBRATE)
        _common.edit_containerCell(cnt.uuid.COSTCODESJOBRATE, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES_JOB_RATE.CO2_PROJECT_VALUE[1])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.COSTCODESJOBRATE, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CC_JobRate_UP_02", $ele1.text())
            cy.log(Cypress.env("CC_JobRate_UP_01"))
        })
    });

    it("TC - Update CO2 per kg value from project level in ", function () {
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
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, commonLocators.CommonLabels.UPDATE_ESTIMATE)
        _estimatePage.update_estimate_fromWizard(MODAL_UPDATE_ESTIMATE);
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.ESTIMATE_LINEITEMS, Cypress.env("CC_JobRate_UP_01"), Cypress.env("CC_JobRate_UP_02"), app.GridCells.CO2_PROJECT_TOTAL)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.co2project, CONTAINER_COLUMNS_RESOURCE.code], cnt.uuid.RESOURCES,)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        cy.wait(1000).then(() => {
            _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE[0])
            _common.waitForLoaderToDisappear()
            _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT, Cypress.env("CC_JobRate_UP_01"))
            _common.waitForLoaderToDisappear()
            _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE[1])
            _common.waitForLoaderToDisappear()
            _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT, Cypress.env("CC_JobRate_UP_02"))
        })
    });

})

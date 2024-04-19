import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _procurementContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _procurementPage, _assembliesPage, _projectPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

import _ from "cypress/types/lodash";
import common from "mocha/lib/interfaces/common";
const allure = Cypress.Allure.reporter.getInterface()
const LINE_ITEM_DESC= "LINE_ITEM_1-" + Cypress._.random(0, 999);
const PRJ_NO = "PN-EST-4.17-" + Cypress._.random(0, 999);
const PRJ_NAME = "PRJ-EST-4.17_" + Cypress._.random(0, 999);
const EST_CODE = "EST-" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC" + Cypress._.random(0, 999);
const LINEITEM_DESC = "LI-orignal" + Cypress._.random(0, 999);
const Copy_LINEITEM_DESC = "Copy_LI" + Cypress._.random(0, 999);
let CONTAINERS_COST_CODES;
let CONTAINER_COLUMNS_COST_CODES;
let CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER;
let CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER;
let CONTAINERS_MATERIAL_RECORDS;
let CONTAINER_COLUMNS_MATERIAL_RECORDS;
let CONTAINERS_PROJECT;
let PROJECT_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let LINE_ITEM_PARAMETERS_1: DataCells;

let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let RESOURCE_PARAMETERS: DataCells;
let RESOURCE_SUB_PARAMETERS: DataCells;


allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 4.17 | Copy line item for CO2 attributes")
describe("EST- 4.17 | Copy line item for CO2 attributes", () => {
    beforeEach(function () {
        cy.fixture("estimate/est-4.17-copy-line_item-For-CO2-attributes.json").then((data) => {
            this.data = data
        })
    })
    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("estimate/est-4.17-copy-line_item-For-CO2-attributes.json").then((data) => {
            this.data = data
            CONTAINERS_COST_CODES = this.data.CONTAINERS.COST_CODES;
            CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES;
            CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG_FILTER;
            CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP_FILTER;
            CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS;
            CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS;
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
            LINE_ITEM_PARAMETERS_1 = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY[0],
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
            };
           
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCES;
            RESOURCE_PARAMETERS= {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
            };
            RESOURCE_SUB_PARAMETERS= {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.COST_CODE[0],
            };
        })
    });
    after(() => {
        cy.LOGOUT();
    });

    it('TC - Add CO2 project value to record in cost code', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES);
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
        })
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.maximizeContainer(cnt.uuid.COST_CODES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.CODE,CONTAINERS_RESOURCE.COST_CODE[0])
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.COST_CODE_CO2_VALUE)
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.CODE, CONTAINERS_RESOURCE.COST_CODE[1])
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.COST_CODE_CO2_VALUE)
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.COST_CODES)
    })

    it('TC - Add CO2 project value to record in material module', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.setDefaultView(app.TabBar.RECORDS)

            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 1);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER)

        })
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.DESCRIPTION_INFO,CONTAINERS_MATERIAL_RECORDS.VALUE1)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)

        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS,CONTAINERS_MATERIAL_RECORDS.VALUE2)
        _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.COST_CODE_CO2_VALUE)
        cy.SAVE()

    })

    it("TC - Create estimate header", function () {
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(Sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
        _common.waitForLoaderToDisappear()
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
    })

    it("TC - Create new line item record", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.quantity, CONTAINER_COLUMNS_LINE_ITEM.co2projecttotal, CONTAINER_COLUMNS_LINE_ITEM.co2sourcetotal, CONTAINER_COLUMNS_LINE_ITEM.co2totalvariance, CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo, CONTAINER_COLUMNS_LINE_ITEM.basuomfk], cnt.uuid.ESTIMATE_LINEITEMS,)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_1);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Assign resource to the line item', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.co2project, CONTAINER_COLUMNS_RESOURCE.co2source, CONTAINER_COLUMNS_RESOURCE.co2projecttotal, CONTAINER_COLUMNS_RESOURCE.co2sourcetotal], cnt.uuid.RESOURCES,)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
        _common.create_newSubRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_SUB_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2_PROJECT_RES1", $ele1.text())
            cy.log(Cypress.env("CO2_PROJECT_RES1"))
        })
        cy.SAVE()
    });

    it('TC - Copy Line item and verify CO2 attribute', function () {
        cy.wait(1000)//required wait
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE_LINEITEMS, btn.ToolBar.ICO_COPY_LINE_ITEM)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, Copy_LINEITEM_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_PROJECT_TOTAL,  CONTAINERS_COST_CODES.COST_CODE_CO2_VALUE)

    })

    it('TC - Verify updated CO2 attribute from resource record gets updated in line item record', function () {
        cy.REFRESH_CONTAINER()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LINEITEM_DESC)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
        });
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        _common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.Updatedco2projectvalue)
        cy.SAVE()
        cy.wait(1000)//required wait
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            cy.REFRESH_CONTAINER()
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LINEITEM_DESC)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_PROJECT_TOTAL, CONTAINERS_RESOURCE.Updatedco2projectvalue)
        cy.wait(1000)//required wait
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_PROJECT_TOTAL,  CONTAINERS_COST_CODES.COST_CODE_CO2_VALUE)
        cy.wait(1000)//required wait
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, Copy_LINEITEM_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_PROJECT_TOTAL, CONTAINERS_RESOURCE.Updatedco2projectvalue)

    })

})
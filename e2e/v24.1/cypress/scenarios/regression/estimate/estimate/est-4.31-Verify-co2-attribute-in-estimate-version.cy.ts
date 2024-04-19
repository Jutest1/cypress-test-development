import { _common, _estimatePage, _validate, _mainView, _modalView, _projectPage, _assembliesPage } from "cypress/pages";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { EST_HEADER, BAS_MATERIAL } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
import common from "mocha/lib/interfaces/common";
import { DataCells } from "cypress/pages/interfaces";
const allure = Cypress.Allure.reporter.getInterface()


const ASSEMBLY_DESC = "A-DESC-" + Cypress._.random(0, 999)
const ASSEMBLYCATAGORY_DESC = "A-DESC-" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC" + Cypress._.random(0, 999);
const ESTVERJOB = "JOB-" + Cypress._.random(0, 999);
const ESTVERDESC = "EDESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS";
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999); const LINEITEM_DESC = "LI-orignal" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LI_DESC" + Cypress._.random(0, 999);

let CREATE_PROJECT_PARAMETERS: DataCells
let CONTAINER_COST_CODES
let CONTAINER_COLUMNS_COST_CODES
let CONTAINER_MATERIAL
let CONTAINER_COLUMNS_MATERIAL
let CONTAINER_ASSEMBLY_RESOURCE
let CONTAINER_COLUMNS_ASSEMBLY_RESOURCE
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS: DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM;
let RESOURCE_PARAMETERS: DataCells
let RESOURCE_PARAMETERS_1: DataCells
let RESOURCE_PARAMETERS_2: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_ASSEMBLY_PROJECT

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 4.31 | Verify CO2/kg attribute in estimate version")
describe("EST- 4.31 | Verify CO2/kg attribute in estimate version", () => {
    before(function () {

        cy.fixture("estimate/est-4.31-Verify-co2-attribute-in-estimate-version.json").then((data) => {
            this.data = data
            CONTAINER_COST_CODES = this.data.CONTAINERS.COST_CODES
            CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES
            CONTAINER_MATERIAL = this.data.CONTAINERS.MATERIAL
            CONTAINER_COLUMNS_MATERIAL = this.data.CONTAINER_COLUMNS.MATERIAL
            CONTAINER_ASSEMBLY_RESOURCE = this.data.CONTAINERS.ASSEMBLY_RESOURCE
            CONTAINER_COLUMNS_ASSEMBLY_RESOURCE = this.data.CONTAINER_COLUMNS.ASSEMBLY_RESOURCE
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_ASSEMBLY_PROJECT = this.data.CONTAINER_COLUMNS.ASSEMBLY_PROJECT
            CREATE_PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME
            }
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[2],
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.COST_CODE,
            }
            RESOURCE_PARAMETERS_1 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                [app.GridCells.CODE]: ASSEMBLY_DESC,
            }
            RESOURCE_PARAMETERS_2 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL,
            }
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
            }
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
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
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(CREATE_PROJECT_PARAMETERS);
            _common.waitForLoaderToDisappear()
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
            _common.waitForLoaderToDisappear()
        })
    })

    after(() => {
        cy.LOGOUT();
    })

    it('TC - Add CO2 project value to record in cost code', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES)
        cy.wait(1000)
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINER_COST_CODES.COST_CODE)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_COST_CODES.CO2_PROJECT_VALUE)
        _common.clickOn_activeRowCell(cnt.uuid.COST_CODES, app.GridCells.PRC_STRUCTURE_FK)
        cy.SAVE()
    })

    it('TC - Add CO2 project value to record in material module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL)
        cy.wait(3000) //required wait to load page
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.DESCRIPTION_INFO, CONTAINER_MATERIAL.CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, CONTAINER_MATERIAL.MATERIAL_RECORD_CODE)
        _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_MATERIAL.CO2_PROJECT_VALUE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Add assembly resource in assemblies module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES)
        cy.wait(1000) //required wait to load page
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.enterRecord_inNewRow(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, ASSEMBLYCATAGORY_DESC)
        cy.SAVE()
        cy.wait(2000)//required wait
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES, ASSEMBLYCATAGORY_DESC)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.MARKER)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.create_newRecord(cnt.uuid.ASSEMBLIES)
        _common.edit_containerCell(cnt.uuid.ASSEMBLIES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, ASSEMBLY_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE, CONTAINER_COLUMNS_ASSEMBLY_RESOURCE)
        });
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY, commonLocators.CommonKeys.GRID, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_TYPE[0])
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CODE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_CODE[0])
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY, commonLocators.CommonKeys.GRID, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_TYPE[1])
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CODE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_CODE[1])
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create estimate header", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        cy.wait(2000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    });


    it("TC - Create New Line Item Record", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Assign resource to the line item', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.co2project], cnt.uuid.RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_1)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_2)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create estimate version', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.waitForLoaderToDisappear()
        cy.wait(2000) //required wait to load page
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE, app.GridCells.DESCRIPTION_INFO, EST_DESC, EST_HEADER)
        _estimatePage.createEstimateVersion(cnt.uuid.ESTIMATE, ESTVERJOB, ESTVERDESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE, app.GridCells.LGM_JOB_FK, ESTVERJOB, EST_HEADER)
    });

    it('TC - Verify CO2 attribute of estimate version in assembly, cost code, Material in project', function () {

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 1);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY, CONTAINER_COLUMNS_ASSEMBLY_PROJECT)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLY_PROJECT.co2projecttotal, CONTAINER_COLUMNS_ASSEMBLY_PROJECT.lgmjobfk], cnt.uuid.ASSEMBLY)
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY, app.GridCells.DESCRIPTION_INFO, ASSEMBLY_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ASSEMBLY, app.GridCells.CO2_PROJECT_TOTAL, CONTAINER_MATERIAL.CO2_PROJECT_VALUE_SUM)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY)
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COSTCODESINPROJECT, app.FooterTab.COSTCODES, 1)
            _common.setup_gridLayout(cnt.uuid.COSTCODESINPROJECT, CONTAINER_COLUMNS_COST_CODES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODES.co2project], cnt.uuid.COSTCODESINPROJECT)
        });
        _common.maximizeContainer(cnt.uuid.COSTCODESINPROJECT)
        _common.clear_subContainerFilter(cnt.uuid.COSTCODESINPROJECT)
        _common.search_inSubContainer(cnt.uuid.COSTCODESINPROJECT, CONTAINER_COST_CODES.COST_CODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COSTCODESINPROJECT, app.GridCells.DESCRIPTION, CONTAINER_COST_CODES.COST_CODE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.COSTCODESINPROJECT, app.GridCells.CO2_PROJECT, CONTAINER_MATERIAL.CO2_PROJECT_VALUE)
        _common.minimizeContainer(cnt.uuid.COSTCODESINPROJECT)
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_MATERIALS, app.FooterTab.MATERIALS, 1)
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_MATERIALS, CONTAINER_COLUMNS_MATERIAL)
            _common.waitForLoaderToDisappear()
            _common.set_columnAtTop([CONTAINER_COLUMNS_MATERIAL.co2project], cnt.uuid.ASSEMBLY_MATERIALS)
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_MATERIALS)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_MATERIALS)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_MATERIALS, app.GridCells.DESCRIPTION_INFO_1, CONTAINER_MATERIAL.CODE, BAS_MATERIAL)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ASSEMBLY_MATERIALS, app.GridCells.CO2_PROJECT, CONTAINER_MATERIAL.CO2_PROJECT_VALUE)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_MATERIALS)
    })
})




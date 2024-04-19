import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _projectPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { EST_HEADER } from "cypress/pages/variables";

import _ from "cypress/types/lodash";

const allure = Cypress.Allure.reporter.getInterface()
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS";
const DATARECORD = "PA-" + Cypress._.random(0, 999);
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DATARECORDSHORTKEY = alphabet.charAt(Cypress._.random(0, 25)) + alphabet.charAt(Cypress._.random(0, 25));
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);
const ASSEMCATCODE = 'ASSEMCATCODE'
const ASSEMBLY_RESCOURCE_CODE_1 = "ASSEMBLYRESCOURCECODE1"
const ASSEMBLY_RESCOURCE_CODE_2 = "ASSEMBLYRESCOURCECODE2"

let CREATE_PROJECT_PARAMETERS: DataCells;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINERS_LINE_ITEM;
let LINE_ITEM_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINERS_CUSTOMIZING
let CONTAINER_COLUMNS_ASSEMBLY_CATEGORY
let CONTAINERS_ASSEMBLY_CATEGORY
let CONTAINERS_ASSEMBLY_RESOURCE

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.71 | Assign Protected assembly to the line item")
describe("EST- 1.71 | Assign Protected assembly to the line item", () => {

    before(function () {
        cy.fixture("estimate/est-1.71-assign-protected-assembly-to-the-line-item.json").then((data) => {
            this.data = data
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEMS
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_CUSTOMIZING = this.data.CONTAINERS.CUSTOMIZING
            CONTAINER_COLUMNS_ASSEMBLY_CATEGORY = this.data.CONTAINER_COLUMNS.ASSEMBLY_CATEGORY
            CONTAINERS_ASSEMBLY_CATEGORY = this.data.CONTAINERS.ASSEMBLY_CATEGORY
            CONTAINERS_ASSEMBLY_RESOURCE = this.data.CONTAINERS.ASSEMBLY_RESOURCE
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
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
            };
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: DATARECORDSHORTKEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
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
        });
    })

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Verify Create data record and assign to assemby', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, CONTAINERS_CUSTOMIZING.EST_ASSEMBLY_TYPE)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME,CONTAINERS_CUSTOMIZING.EST_ASSEMBLY_TYPE)

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 1);
            _common.create_newRecord(cnt.uuid.INSTANCES)
        });
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES, app.GridCells.ASSEMBLY_TYPE_LOGIC_FK, commonLocators.CommonKeys.LIST, CONTAINERS_CUSTOMIZING.PROTECTED_ASSEMBLY)
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, DATARECORD)
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES, app.GridCells.SHORT_KEY_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, DATARECORDSHORTKEY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify Create data record and assign to assemby', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLY_CATEGORIES, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINER_COLUMNS_ASSEMBLY_CATEGORY)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_ASSEMBLY_CATEGORY.DESCRIPTION)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.EST_ASSEMBLY_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, DATARECORDSHORTKEY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.CODE, ASSEMCATCODE)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.MARKER)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_ASSEMBLY_CATEGORY.ASSEMBLY_DESCRIPTION)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CODE, CONTAINERS_ASSEMBLY_RESOURCE.CODE_1)
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO, ASSEMBLY_RESCOURCE_CODE_1)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CODE, CONTAINERS_ASSEMBLY_RESOURCE.CODE_2)
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO, ASSEMBLY_RESCOURCE_CODE_2)
    })

    it('TC - Create new estimate record', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        cy.wait(3000) //required wait to load page
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    });

    it("TC- Create new Line item record", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it('TC - Assign resource to the line item', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Verify Assemblies should be added to the resource', function () {
        _common.clickOn_toolbarButton(cnt.uuid.RESOURCES, btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_ASSEMBLY_RESOURCE.CODE_1)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO, Cypress.env(ASSEMBLY_RESCOURCE_CODE_1))
        _validate.verify_inputFieldVisibility(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, "notVisibleRow")
        _validate.verify_inputFieldVisibility(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT, "notVisibleRow")
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_ASSEMBLY_RESOURCE.CODE_2)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO, Cypress.env(ASSEMBLY_RESCOURCE_CODE_2))
        _validate.verify_inputFieldVisibility(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, "notVisibleRow")
        _validate.verify_inputFieldVisibility(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT, "notVisibleRow")
    })
});
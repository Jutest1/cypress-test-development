import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _package, _validate, _procurementContractPage, _procurementConfig } from "cypress/pages";
import { app, btn, cnt, commonLocators, sidebar, tile, } from "cypress/locators";
import { BASE_COST_CODE_RATE } from "cypress/pages/variables";
import cypress from "cypress";
import { DataCells } from "cypress/pages/interfaces";
const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS";
const ASSEMBLY_DESC = "A-DESC-" + Cypress._.random(0, 999)
const ASSEMBLYCATAGORY_DESC = "A-DESC-" + Cypress._.random(0, 999);
const ASSEMBLY_DESC1 = "A-DESC-" + Cypress._.random(0, 999)
const ASSEMBLYCATAGORY_DESC1 = "A-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999); const LINEITEM_DESC = "LI-orignal" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LI_DESC" + Cypress._.random(0, 999);

const CO2_PROJECT_1 = "CO2_PROJECT_1"
const CO2_PROJECT_2 = "CO2_PROJECT_2"
const CO2_PROJECT_3 = "CO2_PROJECT_3"
const CO2_DESC = "CO2_DESC-" + Cypress._.random(0, 999);

let CREATE_PROJECT_PARAMETERS: DataCells
let CONTAINER_COLUMNS_DATA_TYPE
let CONTAINER_COLUMNS_DATA_RECORD
let CONTAINER_CUSTOMIZING
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
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINERS_PROJECT_ASSEMBLY_RESOURCE
let UPDATE_ESTIMATE_PARAMETER: DataCells
let MODAL_UPDATE_ESTIMATE_WIZARD
let CONTAINER_COLUMNS_PROJECT_ASSEMBLY_RESOURCE

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 4.30 | Update CO2 attributes for assembly resources at project level");
describe("EST- 4.30 | Update CO2 attributes for assembly resources at project level", () => {
    before(function () {
        cy.fixture("estimate/est-4.30-Update-CO2-attributes-for-assembly-resources-at-Project-level.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_DATA_TYPE = this.data.CONTAINER_COLUMNS.DATA_TYPE
            CONTAINER_COLUMNS_DATA_RECORD = this.data.CONTAINER_COLUMNS.DATA_RECORD
            CONTAINER_CUSTOMIZING = this.data.CONTAINERS.CUSTOMIZING
            CONTAINER_ASSEMBLY_RESOURCE = this.data.CONTAINERS.ASSEMBLY_RESOURCE
            CONTAINER_COLUMNS_ASSEMBLY_RESOURCE = this.data.CONTAINER_COLUMNS.ASSEMBLY_RESOURCE
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINERS_PROJECT_ASSEMBLY_RESOURCE = this.data.CONTAINERS.PROJECT_ASSEMBLY_RESOURCE
            MODAL_UPDATE_ESTIMATE_WIZARD = this.data.MODAL.UPDATE_ESTIMATE_WIZARD
            CONTAINER_COLUMNS_PROJECT_ASSEMBLY_RESOURCE = this.data.CONTAINER_COLUMNS.PROJECT_ASSEMBLY_RESOURCE
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                [app.GridCells.CODE]: ASSEMBLY_DESC,
            };
            RESOURCE_PARAMETERS_1 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                [app.GridCells.CODE]: ASSEMBLY_DESC1,
            };
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
            };
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            CREATE_PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME
            };
            UPDATE_ESTIMATE_PARAMETER = {
                [commonLocators.CommonKeys.CHECKBOX]: MODAL_UPDATE_ESTIMATE_WIZARD
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
    });
    after(() => {
        cy.LOGOUT();
    });

    it("TC - Precondition : Create CO2 Source Under Customizing", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
            _common.setup_gridLayout(cnt.uuid.ENTITY_TYPES, CONTAINER_COLUMNS_DATA_TYPE)
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, CONTAINER_CUSTOMIZING.CO2_SOURCE)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, CONTAINER_CUSTOMIZING.CO2_SOURCE)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
            _common.setup_gridLayout(cnt.uuid.INSTANCES, CONTAINER_COLUMNS_DATA_RECORD)
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.create_newRecord(cnt.uuid.INSTANCES)
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CO2_DESC)
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES, app.GridCells.IS_DEFAULT, commonLocators.CommonKeys.CHECK)
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES, app.GridCells.IS_LIVE, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Precondition : Add Assembly Resource In Assemblies Module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES)
        cy.wait(1000)//required wait
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.enterRecord_inNewRow(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, ASSEMBLYCATAGORY_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.EST_ASSEMBLY_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_ASSEMBLY_RESOURCE.PROTECTED_ASSEMBLY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES, ASSEMBLYCATAGORY_DESC)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.MARKER)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.create_newRecord(cnt.uuid.ASSEMBLIES)
        _common.edit_containerCell(cnt.uuid.ASSEMBLIES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, ASSEMBLY_DESC)
        cy.SAVE()
        cy.wait(2000) // required wait to load page
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE, CONTAINER_COLUMNS_ASSEMBLY_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.co2projecttotal, CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.estresourcetypeshortkey], cnt.uuid.ASSEMBLY_RESOURCE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY, commonLocators.CommonKeys.GRID, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_TYPE[0])
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CODE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_CODE[0])
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO)
        cy.SAVE() // required wait to load page
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CO2_PROJECT_TOTAL, CO2_PROJECT_1)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY, commonLocators.CommonKeys.GRID, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_TYPE[1])
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CODE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_CODE[1])
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CO2_PROJECT_TOTAL, CO2_PROJECT_2)
    })

    it('TC - Precondition : Add Second Assembly Resource In Assemblies Module', function () {
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, ASSEMBLYCATAGORY_DESC1)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.EST_ASSEMBLY_TYPE_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_ASSEMBLY_RESOURCE.STANDARD_ASSEMBLY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES, ASSEMBLYCATAGORY_DESC1)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.MARKER)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ASSEMBLIES)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.ASSEMBLIES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, ASSEMBLY_DESC1)
        cy.SAVE()
        cy.wait(2000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY, commonLocators.CommonKeys.GRID, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_TYPE[1])
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CODE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_CODE[1])
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CO2_PROJECT_TOTAL, CO2_PROJECT_3)
    })

    it("TC - Create estimate header", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        cy.wait(2000) // required wait to load page
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

    it('TC - Assign Assembly Resource To The Line Item', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.co2projecttotal], cnt.uuid.RESOURCES)

        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_1);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.RESOURCES)
        _common.clickOn_toolbarButton(cnt.uuid.RESOURCES, btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_CODE[0])
        _common.clickOn_activeRowCell(cnt.uuid.RESOURCES, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT_TOTAL, Cypress.env(CO2_PROJECT_1))
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_CODE[1])
        _common.clickOn_activeRowCell(cnt.uuid.RESOURCES, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT_TOTAL, Cypress.env(CO2_PROJECT_2))
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_CODE[2])
        _common.clickOn_activeRowCell(cnt.uuid.RESOURCES, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT_TOTAL, Cypress.env(CO2_PROJECT_3))
    });

    it('TC - Update Project assembly in project and verify changes from assemblies are reflected in project', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY, ASSEMBLY_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY, app.GridCells.DESCRIPTION_INFO, ASSEMBLY_DESC)
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE);
            _common.setup_gridLayout(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, CONTAINER_COLUMNS_PROJECT_ASSEMBLY_RESOURCE);
            _common.set_columnAtTop([CONTAINER_COLUMNS_PROJECT_ASSEMBLY_RESOURCE.co2project], cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)
        });
        _common.select_rowInContainer(cnt.uuid.ASSEMBLY)
        cy.wait(1000) //required wait to load page
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.GridCells.CODE, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_CODE[0])
        _common.edit_containerCell(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PROJECT_ASSEMBLY_RESOURCE.CO2_PROJECT_COST_1)
        cy.SAVE()
        cy.wait(1000) // required wait to load page
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.GridCells.CODE, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_CODE[1])
        _common.edit_containerCell(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PROJECT_ASSEMBLY_RESOURCE.CO2_PROJECT_COST_2)
        cy.SAVE()
        cy.wait(1000) // required wait to load page
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY, ASSEMBLY_DESC1)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY, app.GridCells.DESCRIPTION_INFO, ASSEMBLY_DESC1)
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.GridCells.CODE, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_CODE[0])
        _common.select_rowInContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)
        _common.edit_containerCell(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PROJECT_ASSEMBLY_RESOURCE.CO2_PROJECT_COST_3)
        cy.SAVE()
        cy.wait(1000) // required wait to load page
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.select_rowInContainer(cnt.uuid.ESTIMATE)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        cy.wait(2000) // required wait to load page
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    })

    it("TC - Verify Update Estimate Assemblies", function () {
        cy.wait(2000) // required wait to load page
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE)
        _estimatePage.update_estimate_fromWizard(UPDATE_ESTIMATE_PARAMETER);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify Updated Co2 Project Values in Resources', function () {
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.co2projecttotal], cnt.uuid.RESOURCES)
        });
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
        });
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.select_allContainerData(cnt.uuid.RESOURCES)
        _common.clickOn_toolbarButton(cnt.uuid.RESOURCES, btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_CODE[0])
        _common.clickOn_activeRowCell(cnt.uuid.RESOURCES, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY)
        cy.SAVE().then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT_TOTAL, Cypress.env(CO2_PROJECT_1))
            _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_CODE[1])
            _common.clickOn_activeRowCell(cnt.uuid.RESOURCES, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY)
            _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT_TOTAL, Cypress.env(CO2_PROJECT_2))
            _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINER_ASSEMBLY_RESOURCE.RESOURCE_CODE[2])
            _common.clickOn_activeRowCell(cnt.uuid.RESOURCES, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY)
            _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT_TOTAL, Cypress.env(CO2_PROJECT_3))
            _common.minimizeContainer(cnt.uuid.RESOURCES)
        })
    })
})

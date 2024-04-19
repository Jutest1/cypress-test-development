import { app, commonLocators, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _materialPage, _validate, _estimatePage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface()
const PRICE_LIST_DESC = "PLDESC-" + Cypress._.random(0, 999);
const PRICE_VERSION_DESC = "PVDESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ-" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const EST_CODE = "EST-CODE-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "TEST-DESC-" + Cypress._.random(0, 999);
const MATERIAL_CATALOG_CODE = "CAT-CD-" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_CODE = "GRP_CD-" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_DESC = "GRP-DESC-" + Cypress._.random(0, 999);
const MATERIAL_RECORD_CODE = "MAT-CD-" + Cypress._.random(0, 999);
const MATERIAL_RECORD_DESC = "MAT-DESC-" + Cypress._.random(0, 999);

let CONTAINERS_DATA_TYPES, CONTAINERS_DATA_RECORDS, CONTAINERS_MATERIAL_CATALOGS, CONTAINERS_PRICE_LIST, CONTAINERS_MATERIAL_RECORDS, CONTAINERS_ESTIMATE, CONTAINERS_PROJECT, CONTAINERS_RESOURCES;

let CONTAINER_COLUMNS_MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_PRICE_VERSION, CONTAINER_COLUMNS_PRICE_LIST, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCES;

let MATERIAL_CATALOGS_PARAMETERS: DataCells, MATERIAL_GROUPS_PARAMETERS: DataCells, MATERIAL_RECORDS_PARAMETERS: DataCells, PROJECTS_PARAMETERS: DataCells, ESTIMATE_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS: DataCells;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.161 | Create and assign different Price Lists")
describe("PCM- 2.161 | Create and assign different Price Lists", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.161-create-and-assign-different-price-lists.json")
            .then((data) => {
                this.data = data
                CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES
                CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
                CONTAINER_COLUMNS_MATERIAL_CATALOGS = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOGS
                CONTAINERS_MATERIAL_CATALOGS = this.data.CONTAINERS.MATERIAL_CATALOGS
                MATERIAL_CATALOGS_PARAMETERS = {
                    [app.GridCells.CODE]: MATERIAL_CATALOG_CODE,
                    [app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_MATERIAL_CATALOGS.BUSINESS_PARTNER,
                }
                CONTAINER_COLUMNS_MATERIAL_GROUPS = this.data.CONTAINER_COLUMNS.MATERIAL_GROUPS
                MATERIAL_GROUPS_PARAMETERS = {
                    [app.GridCells.CODE]: MATERIAL_GROUPS_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: MATERIAL_GROUPS_DESC,
                    [app.GridCells.PRC_STRUCTURE_FK]: CommonLocators.CommonKeys.MATERIAL
                }
                CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG_FILTER
                CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS
                CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS
                MATERIAL_RECORDS_PARAMETERS = {
                    [app.GridCells.CODE]: MATERIAL_RECORD_CODE,
                    [app.GridCells.DESCRIPTION_INFO_1]: MATERIAL_RECORD_DESC,
                    [app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORDS.UOM[0],
                    [app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORDS.RETAIL_PRICE[0],
                    [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORDS.LIST_PRICE[0]
                }
                CONTAINER_COLUMNS_PRICE_VERSION = this.data.CONTAINER_COLUMNS.PRICE_VERSION
                CONTAINER_COLUMNS_PRICE_LIST = this.data.CONTAINER_COLUMNS.PRICE_LIST
                CONTAINERS_PRICE_LIST = this.data.CONTAINERS.PRICE_LIST
                CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
                PROJECTS_PARAMETERS = {
                    [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                    [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                    [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
                }
                CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
                ESTIMATE_PARAMETERS = {
                    [app.GridCells.CODE]: EST_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                    [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                    [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
                }
                CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
                LINE_ITEM_PARAMETERS = {
                    [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESC,
                };
                CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCES
                CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCES;
            }).then(() => {
                cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.openTab(app.TabBar.PROJECT).then(() => {
                    _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
                });
                _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
                _common.create_newRecord(cnt.uuid.PROJECTS);
                _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
                _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, "Werkstatt").pinnedItem();
            })
    })

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Verify create material catalog and Material groups', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.PRICE_LIST)
        cy.REFRESH_CONTAINER()
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_RECORDS.MASTER_DATA)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.create_newRecord(cnt.uuid.INSTANCES)
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICE_LIST_DESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES, app.GridCells.CONTEXT_FK, CommonLocators.CommonKeys.LIST, CONTAINERS_DATA_RECORDS.CONTEXT)
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES, app.GridCells.CURRENCY_FK, CommonLocators.CommonKeys.LIST, CONTAINERS_DATA_RECORDS.CURRENCY)
        cy.SAVE().wait(1000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOGS,)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOGS_PARAMETERS)
        cy.SAVE().wait(1000)
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUPS)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_GROUPS_PARAMETERS)
        cy.SAVE().wait(1000)
        cy.REFRESH_CONTAINER()
        _common.select_rowInSubContainer(cnt.uuid.MATERIAL_GROUPS)
    })

    it('TC - Verify create new price versions', function () {
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_VERSION, app.FooterTab.PRICE_VERSIONS, 2);
            _common.setup_gridLayout(cnt.uuid.PRICE_VERSION, CONTAINER_COLUMNS_PRICE_VERSION)
        });
        _common.clear_subContainerFilter(cnt.uuid.PRICE_VERSION)
        _common.create_newRecord(cnt.uuid.PRICE_VERSION)
        _common.select_rowInContainer(cnt.uuid.PRICE_VERSION)
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_VERSION, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICE_VERSION_DESC)
        _validate.verify_dataUnderCaret(cnt.uuid.PRICE_VERSION, app.GridCells.PRICE_LIST_FK, CommonLocators.CommonKeys.LIST, PRICE_LIST_DESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_VERSION, app.GridCells.PRICE_LIST_FK, CommonLocators.CommonKeys.LIST, PRICE_LIST_DESC)
        _validate.verify_inputFieldVisibility(cnt.uuid.PRICE_VERSION, app.GridCells.VALID_FROM, CommonLocators.CommonKeys.VISIBLE, app.InputFields.INPUT_GROUP_CONTENT)
        _validate.verify_inputFieldVisibility(cnt.uuid.PRICE_VERSION, app.GridCells.VALID_TO, CommonLocators.CommonKeys.VISIBLE, app.InputFields.INPUT_GROUP_CONTENT)
        cy.SAVE().wait(1000)
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify create material records-1', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.set_containerLayoutUnderEditView(CommonLocators.CommonKeys.LAYOUT_6)
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        cy.REFRESH_CONTAINER()
        _common.set_cellCheckboxValueForAllRowCell(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.UNCHECK)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIAL_CATALOG_CODE)
        _common.select_rowHasValue(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIAL_CATALOG_CODE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.CODE, MATERIAL_CATALOG_CODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.CODE, MATERIAL_CATALOG_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify create material records-2', function () {
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER, 1)
        });
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER, MATERIAL_GROUPS_CODE)
        _common.select_rowInContainer(cnt.uuid.MATERIAL_GROUP_FILTER)
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.CODE, MATERIAL_GROUPS_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORDS_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE().wait(1000)
    })

    it('TC - Verify create price list in material records', function () {
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_LISTS, app.FooterTab.PRICE_LISTS, 3)
            _common.setup_gridLayout(cnt.uuid.PRICE_LISTS, CONTAINER_COLUMNS_PRICE_LIST)
        });
        _common.create_newRecord(cnt.uuid.PRICE_LISTS)
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_LISTS, app.GridCells.RETAIL_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LIST.LIST_PRICE[0])
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_LISTS, app.GridCells.LIST_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LIST.LIST_PRICE[0])
        _common.edit_dropdownCellWithInput(cnt.uuid.PRICE_LISTS, app.GridCells.MATERIAL_PRICE_VERSION_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, PRICE_VERSION_DESC)
        _common.waitForLoaderToDisappear()
        cy.SAVE().wait(2000)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PRICE_LISTS, app.GridCells.MATERIAL_PRICE_VERSION_FK, PRICE_VERSION_DESC)
        _common.getText_fromCell(cnt.uuid.PRICE_LISTS, app.GridCells.LIST_PRICE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("LIST_PRICE_1", $ele1.text())
            cy.log(Cypress.env("LIST_PRICE_1"))
        })
    })

    it('TC - Create new estimate and line Item', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, "Werkstatt").pinnedItem();
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowInSubContainer(cnt.uuid.ESTIMATE)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LINE_ITEM_DESC)
    });

    it('TC - Assign resource to the line item', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _common.edit_dropdownCellWithCaret(cnt.uuid.RESOURCES, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY, commonLocators.CommonKeys.GRID, CONTAINERS_RESOURCES.SHORT_KEY[0])
        _common.lookUpButtonInCell(cnt.uuid.RESOURCES, app.GridCells.CODE, btn.IconButtons.ICO_INPUT_LOOKUP, 0)
        _validate.verify_priceListUnderMaterialLookUp(MATERIAL_RECORD_CODE, CommonLocators.CommonKeys.GRID, PRICE_LIST_DESC, Cypress.env("LIST_PRICE_1"));
        cy.SAVE().wait(1000)
    });

    it('TC - Verify price list is deleted', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        cy.REFRESH_CONTAINER()
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIAL_CATALOG_CODE)
        _common.select_rowHasValue(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIAL_CATALOG_CODE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.CODE, MATERIAL_CATALOG_CODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.CODE, MATERIAL_CATALOG_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER, 1)
        });
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER, MATERIAL_GROUPS_CODE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.CODE, MATERIAL_GROUPS_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 1)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.select_rowInContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_LISTS, app.FooterTab.PRICE_LISTS, 2)
            _common.setup_gridLayout(cnt.uuid.PRICE_LISTS, CONTAINER_COLUMNS_PRICE_LIST)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PRICE_LISTS, app.GridCells.MATERIAL_PRICE_VERSION_PRICE_LIST, PRICE_LIST_DESC)
        _common.delete_recordFromContainer(cnt.uuid.PRICE_LISTS)
        cy.SAVE()
        _validate.verify_isRecordDeleted(cnt.uuid.PRICE_LISTS, PRICE_LIST_DESC)
    })

})
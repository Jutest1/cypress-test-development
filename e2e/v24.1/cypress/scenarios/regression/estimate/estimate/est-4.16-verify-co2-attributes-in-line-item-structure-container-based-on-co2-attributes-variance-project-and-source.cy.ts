import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _validate, _materialPage, _estimatePage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PN-EST-4.16-" + Cypress._.random(0, 999);
const PRJ_NAME = "PRJ-EST-4.16_" + Cypress._.random(0, 999);
const CO2_SOURCE_DESCRIPTION = "CO2_SOURCE-" + Cypress._.random(0, 9999);
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST_DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC_1 = "LINE_ITEM_1-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC_2 = "LINE_ITEM_2-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC_3 = "LINE_ITEM_3-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC_4 = "LINE_ITEM_4-" + Cypress._.random(0, 999);
const MATERIAL_CATALOG_CODE = "MC" + Cypress._.random(0, 999);
const MATERIAL_CATALOG_DESC = "MC_DESC_" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_CODE = "MG" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_DESC = "MG_DESC_" + Cypress._.random(0, 999);
const MATERIAL_RECORD_CODE = "MR" + Cypress._.random(0, 999);
const MATERIAL_RECORD_DESC = "MR_DESC_" + Cypress._.random(0, 999);

let CONTAINERS_COST_CODES;
let CONTAINER_COLUMNS_COST_CODES;
let CONTAINERS_MATERIAL_CATALOGS;
let CONTAINER_COLUMNS_MATERIAL_CATALOGS;
let MATERIAL_CATALOG_PARAMETER: DataCells;
let CONTAINERS_MATERIAL_GROUPS;
let CONTAINER_COLUMNS_MATERIAL_GROUPS;
let MATERIAL_GROUP_PARAMETER: DataCells;
let CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER;
let CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER;
let CONTAINERS_MATERIAL_RECORDS;
let CONTAINER_COLUMNS_MATERIAL_RECORDS;
let MATERIAL_RECORD_PARAMETER: DataCells;
let CONTAINERS_PROJECT;
let PROJECT_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let LINE_ITEM_PARAMETERS_1: DataCells;
let LINE_ITEM_PARAMETERS_2: DataCells;
let LINE_ITEM_PARAMETERS_3: DataCells;
let LINE_ITEM_PARAMETERS_4: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let RESOURCE_PARAMETERS_1: DataCells;
let RESOURCE_PARAMETERS_2: DataCells;
let RESOURCE_PARAMETERS_3: DataCells;
let RESOURCE_PARAMETERS_4: DataCells;
let RESOURCE_PARAMETERS_5: DataCells;
let CONTAINER_COLUMNS_LINE_ITEM_STRUCTURE;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 4.16 | Verify CO2 attributes in line item structure container based on CO2 attributes (variance, project and source)");

describe("EST- 4.16 | Verify CO2 attributes in line item structure container based on CO2 attributes (variance, project and source)", () => {

    before(function () {
        cy.fixture("estimate/est-4.16-verify-co2-attributes-in-line-item-structure-container-based-on-co2-attributes-variance-project-and-source.json")
            .then((data) => {
                this.data = data;
                CONTAINERS_COST_CODES = this.data.CONTAINERS.COST_CODES;
                CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES;
                CONTAINERS_MATERIAL_CATALOGS = this.data.CONTAINERS.MATERIAL_CATALOGS;
                CONTAINER_COLUMNS_MATERIAL_CATALOGS = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOGS;
                MATERIAL_CATALOG_PARAMETER = {
                    [app.GridCells.CODE]: MATERIAL_CATALOG_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: MATERIAL_CATALOG_DESC,
                    [app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_MATERIAL_CATALOGS.BUSINESS_PARTNER,
                    [app.GridCells.VALID_FROM]: _common.getDate(CommonLocators.CommonKeys.CURRENT_SMALL),
                    [app.GridCells.VALID_TO]: _common.getDate(CommonLocators.CommonKeys.INCREMENTED_SMALL, 5),
                    [app.GridCells.MATERIAL_CATALOG_TYPE_FK]: CONTAINERS_MATERIAL_CATALOGS.MATERIAL_TYPE
                }
                CONTAINERS_MATERIAL_GROUPS = this.data.CONTAINERS.MATERIAL_GROUPS;
                CONTAINER_COLUMNS_MATERIAL_GROUPS = this.data.CONTAINER_COLUMNS.MATERIAL_GROUPS;
                MATERIAL_GROUP_PARAMETER = {
                    [app.GridCells.CODE]: MATERIAL_GROUPS_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: MATERIAL_GROUPS_DESC,
                    [app.GridCells.PRC_STRUCTURE_FK]: CONTAINERS_MATERIAL_GROUPS.STRUCTURE_CODE
                }
                CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG_FILTER;
                CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP_FILTER;
                CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS;
                CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS;
                MATERIAL_RECORD_PARAMETER = {
                    [app.GridCells.CODE]: MATERIAL_RECORD_CODE,
                    [app.GridCells.DESCRIPTION_INFO_1]: MATERIAL_RECORD_DESC,
                    [app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORDS.UOM,
                    [app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORDS.RETAIL_PRICE,
                    [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORDS.LIST_PRICE,
                    [app.GridCells.CO2_PROJECT]: CONTAINERS_MATERIAL_RECORDS.CO2_PROJECT
                }
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
                    [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESC_1,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY[0],
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                };
                LINE_ITEM_PARAMETERS_2 = {
                    [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESC_2,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY[1],
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                };
                LINE_ITEM_PARAMETERS_3 = {
                    [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESC_3,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY[2],
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                };
                LINE_ITEM_PARAMETERS_4 = {
                    [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESC_4,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY[3],
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                };
                CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
                CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCES;
                RESOURCE_PARAMETERS_1 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.COST_CODE[0],
                };
                RESOURCE_PARAMETERS_2 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
                    [app.GridCells.CODE]: MATERIAL_RECORD_DESC,
                };
                RESOURCE_PARAMETERS_3 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.COST_CODE[0],
                };
                RESOURCE_PARAMETERS_4 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
                    [app.GridCells.CODE]: MATERIAL_RECORD_DESC,
                };
                RESOURCE_PARAMETERS_5 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.COST_CODE[0],
                };
                CONTAINER_COLUMNS_LINE_ITEM_STRUCTURE = this.data.CONTAINER_COLUMNS.LINE_ITEM_STRUCTURE;
            }).then(() => {
                cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            });
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create CO2 Source under customizing", function () {
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

    it("TC - Add CO2 project value under cost codes", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES);
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
        })
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.CODE, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.COST_CODE_CO2_VALUE)
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create material catalog and material group", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.setDefaultView(app.TabBar.CATALOGS)
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOGS);
        })
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS)
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
        _common.waitForLoaderToDisappear()
        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOG_PARAMETER);
        _common.select_activeRowInContainer(cnt.uuid.MATERIAL_CATALOGS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOG_DESC)
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUPS);
        })
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0)
        })
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOG_DESC)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1)
        })
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.MATERIAL_GROUPS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_GROUP_PARAMETER)
        _common.select_activeRowInContainer(cnt.uuid.MATERIAL_GROUPS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_GROUPS)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create material record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.setDefaultView(app.TabBar.RECORDS)
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.set_cellCheckboxValueForAllRowCell(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.UNCHECK)
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIAL_CATALOG_DESC)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.DESCRIPTION_INFO, MATERIAL_CATALOG_DESC)
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER, 1)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUP_FILTER, CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER)
        })
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUP_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER, MATERIAL_GROUPS_DESC)
        _common.select_rowHasValue(cnt.uuid.MATERIAL_GROUP_FILTER, MATERIAL_GROUPS_DESC)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
        })
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _common.waitForLoaderToDisappear()
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("MATERIAL_1_CO2_VALUE", $ele1.text())
            cy.log(Cypress.env("MATERIAL_1_CO2_VALUE"))
        })
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create project and an estimate header", function () {
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

    it("TC - Create line item with resources", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.quantity, CONTAINER_COLUMNS_LINE_ITEM.co2projecttotal, CONTAINER_COLUMNS_LINE_ITEM.co2sourcetotal, CONTAINER_COLUMNS_LINE_ITEM.co2totalvariance, CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo, CONTAINER_COLUMNS_LINE_ITEM.basuomfk], cnt.uuid.ESTIMATE_LINEITEMS,)
        });

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.co2project, CONTAINER_COLUMNS_RESOURCE.co2source, CONTAINER_COLUMNS_RESOURCE.co2projecttotal, CONTAINER_COLUMNS_RESOURCE.co2sourcetotal], cnt.uuid.RESOURCES,)
        });
        //! First Line Item
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_1);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_1);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        //! Second Line Item
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_2);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_2);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        //! Third Line Item
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_3);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_3);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_4);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        //! Fourth Line Item
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_4);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_5);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.getTotal_cellColumn(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_PROJECT_TOTAL, "CO2_PROJECT")
        _estimatePage.getTotal_cellColumn(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_TOTAL_VARIANCE, "CO2_VARIANCE")
        _estimatePage.getTotal_cellColumn(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_SOURCE_TOTAL, "CO2_SOURCE")
    })

    it("TC - Verify CO2 attributes under line items structure container (variance, project and source)", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.LINEITEMSSTRUCTURE, app.FooterTab.LINE_ITEMS_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.LINEITEMSSTRUCTURE, CONTAINER_COLUMNS_LINE_ITEM_STRUCTURE);
        });
        _common.waitForLoaderToDisappear()
        _estimatePage.select_LineItemsStructureAttributeAndRefresh(cnt.uuid.LINEITEMSSTRUCTURE, commonLocators.CommonLabels.CO2, commonLocators.CommonKeys.CO2_PROJECT_TOTAL)
        for (let index = 0; index <= 4; index++) {
            if (index != 0) {
                _estimatePage.select_LineItemsStructureFilter(cnt.uuid.LINEITEMSSTRUCTURE, index)
                _common.waitForLoaderToDisappear()
                _common.getText_fromCell(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.CO2_PROJECT_TOTAL)
                    .then(($co2ProjectTotal) => {
                        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
                            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
                        });
                        _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_PROJECT_TOTAL, $co2ProjectTotal.text())
                    })
            }
            if (index == 0) {
                _estimatePage.select_LineItemsStructureFilter(cnt.uuid.LINEITEMSSTRUCTURE, index)
                _common.waitForLoaderToDisappear()
                _common.getText_fromCell(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.CO2_PROJECT_TOTAL)
                    .then(($co2ProjectTotal) => {
                        expect(parseFloat(Cypress.env("CO2_PROJECT")).toFixed(2)).to.equals(parseFloat($co2ProjectTotal.text().replace(',', '')).toFixed(2));
                    })
            }
        }
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.LINEITEMSSTRUCTURE, app.FooterTab.LINE_ITEMS_STRUCTURE, 1);
        });
        _common.waitForLoaderToDisappear()
        _estimatePage.select_LineItemsStructureAttributeAndRefresh(cnt.uuid.LINEITEMSSTRUCTURE, commonLocators.CommonLabels.CO2, commonLocators.CommonKeys.CO2_TOTAL_VARIANCE)
        for (let index = 0; index <= 4; index++) {
            if (index != 0) {
                _estimatePage.select_LineItemsStructureFilter(cnt.uuid.LINEITEMSSTRUCTURE, index)
                _common.waitForLoaderToDisappear()
                _common.getText_fromCell(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.CO2_TOTAL_VARIANCE)
                    .then(($co2TotalVariance) => {
                        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
                            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
                        });
                        _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_TOTAL_VARIANCE, $co2TotalVariance.text())
                    })
            }
            if (index == 0) {
                _estimatePage.select_LineItemsStructureFilter(cnt.uuid.LINEITEMSSTRUCTURE, index)
                _common.waitForLoaderToDisappear()
                _common.getText_fromCell(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.CO2_TOTAL_VARIANCE)
                    .then(($co2TotalVariance) => {
                        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
                            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
                            _common.waitForLoaderToDisappear()
                            expect(parseFloat(Cypress.env("CO2_VARIANCE")).toFixed(2)).to.equals(parseFloat($co2TotalVariance.text().replace(',', '')).toFixed(2));
                        });
                    })
            }
        }
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.LINEITEMSSTRUCTURE, app.FooterTab.LINE_ITEMS_STRUCTURE, 1);
        });
        _common.waitForLoaderToDisappear()
        _estimatePage.select_LineItemsStructureAttributeAndRefresh(cnt.uuid.LINEITEMSSTRUCTURE, commonLocators.CommonLabels.CO2, CommonLocators.CommonKeys.CO2_SOURCE_TOTAL)
        _estimatePage.select_LineItemsStructureFilter(cnt.uuid.LINEITEMSSTRUCTURE, 1)
        _common.waitForLoaderToDisappear()
        _common.assert_forNumericValues(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.CO2_SOURCE_TOTAL, "0")
        _estimatePage.select_LineItemsStructureFilter(cnt.uuid.LINEITEMSSTRUCTURE, 0)
        _common.waitForLoaderToDisappear()
        _common.assert_forNumericValues(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.CO2_SOURCE_TOTAL, parseFloat(Cypress.env("CO2_SOURCE")).toString())
    });

});
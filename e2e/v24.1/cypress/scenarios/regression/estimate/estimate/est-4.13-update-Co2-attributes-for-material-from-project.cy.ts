import { tile, app, cnt, sidebar, btn, commonLocators } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _mainView, _materialPage, _estimatePage, _validate, _assembliesPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface()
const PRJ_NO = "PCM" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const PRICELIST_DESC = "PRICELIST_DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_1 = "LINEITEM_DESC-" + Cypress._.random(0, 999);
const PRICE_VERSION_DESC_1 = "PV_DESC1-" + Cypress._.random(0, 999);
const PRICE_VERSION_DESC_2 = "PV_DESC2-" + Cypress._.random(0, 999);
const MATERIAL_DESC_1 = "MR_D1-" + Cypress._.random(0, 999);
const MATERIAL_DESC_2 = "MR_D2-" + Cypress._.random(0, 999);
const MATERIAL_CODE_1 = "MAT_1-" + Cypress._.random(0, 999);
const MATERIAL_CODE_2 = "MAT_2-" + Cypress._.random(0, 999);
const EST_CODE = "EST-" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC" + Cypress._.random(0, 999);

let CONTAINERS_DATA_TYPES;
let CONTAINERS_DATA_RECORDS;
let CONTAINERS_MATERIAL_CATALOGS;
let CONTAINER_COLUMNS_MATERIAL_CATALOGS;
let CONTAINER_COLUMNS_PRICE_VERSION;
let CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER;
let CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER;
let CONTAINERS_MATERIAL_RECORDS;
let CONTAINER_COLUMNS_MATERIAL_RECORDS;
let CONTAINERS_MATERIAL_GROUP_FILTER;
let MATERIAL_RECORD_PARAMETER_1: DataCells;
let MATERIAL_RECORD_PARAMETER_2: DataCells
let CONTAINERS_PRICE_LIST
let CONTAINER_COLUMNS_PRICE_LIST;
let CONTAINERS_PROJECT;
let PROJECT_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let LINE_ITEM_PARAMETERS: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let RESOURCE_PARAMETERS_1: DataCells;
let RESOURCE_PARAMETERS_2: DataCells;
let MODAL_UPDATE_MATERIAL_PRICES_WIZARD;
let MODAL_UPDATE_ESTIMATE;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 4.13 | Assign CO2/kg to material with multiple version")

describe("EST- 4.13 |  Assign CO2/kg to material with multiple version", () => {

  before(function () {

    cy.fixture("estimate/est-4.13-update-Co2-attributes-for-material-from-project.json").then((data) => {
      this.data = data
      CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES
      CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
      CONTAINERS_MATERIAL_CATALOGS = this.data.CONTAINERS.MATERIAL_CATALOGS;
      CONTAINER_COLUMNS_MATERIAL_CATALOGS = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOGS;
      CONTAINER_COLUMNS_PRICE_VERSION = this.data.CONTAINER_COLUMNS.PRICE_VERSION;
      CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG_FILTER;
      CONTAINERS_MATERIAL_GROUP_FILTER = this.data.CONTAINERS.MATERIAL_GROUP_FILTER;
      CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP_FILTER;
      CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS;
      CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS;
      MATERIAL_RECORD_PARAMETER_1 = {
        [app.GridCells.CODE]: MATERIAL_CODE_1,
        [app.GridCells.DESCRIPTION_INFO_1]: MATERIAL_DESC_1,
        [app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORDS.UOM[0],
        [app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORDS.PRICE_LIST[0],
        [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORDS.LIST_PRICE[0],
        [app.GridCells.CO2_PROJECT]: CONTAINERS_MATERIAL_RECORDS.CO2_PROJECT_VALUE[0]
      }
      MATERIAL_RECORD_PARAMETER_2 = {
        [app.GridCells.CODE]: MATERIAL_CODE_2,
        [app.GridCells.DESCRIPTION_INFO_1]: MATERIAL_DESC_2,
        [app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORDS.UOM[0],
        [app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORDS.PRICE_LIST[1],
        [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORDS.LIST_PRICE[1],
        [app.GridCells.CO2_PROJECT]: CONTAINERS_MATERIAL_RECORDS.CO2_PROJECT_VALUE[1]
      }
      CONTAINERS_PRICE_LIST = this.data.CONTAINERS.PRICE_LIST;
      CONTAINER_COLUMNS_PRICE_LIST = this.data.CONTAINER_COLUMNS.PRICE_LIST;
      CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT;
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
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
      };
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCES;
      RESOURCE_PARAMETERS_1 = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
        [app.GridCells.CODE]: MATERIAL_DESC_1,
      };
      RESOURCE_PARAMETERS_2 = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
        [app.GridCells.CODE]: MATERIAL_DESC_2,
      };
      MODAL_UPDATE_MATERIAL_PRICES_WIZARD = this.data.MODAL.UPDATE_MATERIAL_PRICES
      MODAL_UPDATE_ESTIMATE = this.data.MODAL.UPDATE_ESTIMATE_WIZARD
    }).then(() => {
      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    })
  })

  after(() => {
    cy.LOGOUT();
  });

  it('TC - Create price list record in customizing', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
    _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CommonLocators.CommonLabels.PRICE_LIST)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.MODULE_NAME, CONTAINERS_DATA_TYPES.MASTER_DATA)
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
    _common.create_newRecord(cnt.uuid.DATA_RECORDS)
    _common.edit_containerCell(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICELIST_DESC)
    _common.lookUpButtonInCell(cnt.uuid.DATA_RECORDS, app.GridCells.CONTEXT_FK, btn.IconButtons.BTN_DEFAULT, 1)
    _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS, app.GridCells.CONTEXT_FK, commonLocators.CommonKeys.LIST, CONTAINERS_DATA_RECORDS.CONTEXT)
    _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS, app.GridCells.CURRENCY_FK, commonLocators.CommonKeys.LIST, CONTAINERS_DATA_RECORDS.CURRENCY)
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_DEFAULT, commonLocators.CommonKeys.CHECK)
    cy.SAVE()

  })

  it('TC - Create price version in material catalog module', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
    _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
      _common.setDefaultView(app.TabBar.MATERIAL_CATALOG)
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0);
      _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOGS)
    });

    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
    cy.REFRESH_CONTAINER()

    _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOGS.MATERIAL_CATALOG_DESCRIPTION)
    _common.select_activeRowInContainer(cnt.uuid.MATERIAL_CATALOGS)

    _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PRICE_VERSION, app.FooterTab.PRICE_VERSIONS, 1);
      _common.setup_gridLayout(cnt.uuid.PRICE_VERSION, CONTAINER_COLUMNS_PRICE_VERSION)
    });

    _common.clear_subContainerFilter(cnt.uuid.PRICE_VERSION)
    _common.create_newRecord(cnt.uuid.PRICE_VERSION)

    _common.enterRecord_inNewRow(cnt.uuid.PRICE_VERSION, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICE_VERSION_DESC_1)
    _common.select_activeRowInContainer(cnt.uuid.PRICE_VERSION)
    _common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_VERSION, app.GridCells.PRICE_LIST_FK, commonLocators.CommonKeys.LIST, PRICELIST_DESC)
    cy.SAVE()
    _common.create_newRecord(cnt.uuid.PRICE_VERSION)

    _common.enterRecord_inNewRow(cnt.uuid.PRICE_VERSION, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICE_VERSION_DESC_2)
    _common.select_activeRowInContainer(cnt.uuid.PRICE_VERSION)
    _common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_VERSION, app.GridCells.PRICE_LIST_FK, commonLocators.CommonKeys.LIST, PRICELIST_DESC)
    cy.SAVE()

  })

  it('TC - Create material record and add price list', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);

    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.setDefaultView(app.TabBar.RECORDS)
      _common.set_containerLayoutUnderEditView(CommonLocators.CommonLabels.LAYOUT_6)
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
      _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER)
    });

    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)

    _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINERS_MATERIAL_CATALOGS.MATERIAL_CATALOG_DESCRIPTION)

    _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOGS.MATERIAL_CATALOG_DESCRIPTION)

    _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)

    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER, 1)
      _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUP_FILTER, CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER)
    })
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUP_FILTER)
    _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER, CONTAINERS_MATERIAL_GROUP_FILTER.PROCUREMENT_STRUCTURE_CODE)
    _common.select_allContainerData(cnt.uuid.MATERIAL_GROUP_FILTER)
    _common.set_cellCheckboxValueForAllRowCell(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.UNCHECK)
    _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER, CONTAINERS_MATERIAL_GROUP_FILTER.PROCUREMENT_STRUCTURE_CODE)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.PRC_STRUCTURE_FK, CONTAINERS_MATERIAL_GROUP_FILTER.PROCUREMENT_STRUCTURE_CODE)
    _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)

    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2)
      _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
    })

    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
    _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)

    _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_PARAMETER_1)
    cy.SAVE()

    _common.getText_fromCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("MATERIAL_1_CO2_VALUE", $ele1.text())
      cy.log(Cypress.env("MATERIAL_1_CO2_VALUE"))
    })

    _common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS)

    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PRICE_LISTS, app.FooterTab.PRICE_LISTS, 3)
      _common.setup_gridLayout(cnt.uuid.PRICE_LISTS, CONTAINER_COLUMNS_PRICE_LIST)
    })
    _common.clear_subContainerFilter(cnt.uuid.PRICE_LISTS)
    _common.create_newRecord(cnt.uuid.PRICE_LISTS)

    _common.edit_dropdownCellWithInput(cnt.uuid.PRICE_LISTS, app.GridCells.MATERIAL_PRICE_VERSIO_FKN, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, PRICE_VERSION_DESC_1)
    _common.edit_containerCell(cnt.uuid.PRICE_LISTS, app.GridCells.RETAIL_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LIST.PRICE_LIST[0])
    _common.edit_containerCell(cnt.uuid.PRICE_LISTS, app.GridCells.LIST_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LIST.LIST_PRICE[0])
    _common.edit_containerCell(cnt.uuid.PRICE_LISTS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LIST.CO2_PROJECT_VALUE[0])
    cy.SAVE()

  });

  it('TC - Create second material record and add price list ', function () {
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2)
      _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
    })

    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
    _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)

    _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_PARAMETER_2)
    cy.SAVE()

    _common.getText_fromCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("MATERIAL_2_CO2_VALUE", $ele1.text())
      cy.log(Cypress.env("MATERIAL_2_CO2_VALUE"))
    })

    _common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS)

    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PRICE_LISTS, app.FooterTab.PRICE_LISTS)
      _common.setup_gridLayout(cnt.uuid.PRICE_LISTS, CONTAINER_COLUMNS_PRICE_LIST)
    })
    _common.clear_subContainerFilter(cnt.uuid.PRICE_LISTS)
    _common.create_newRecord(cnt.uuid.PRICE_LISTS)

    _common.edit_dropdownCellWithInput(cnt.uuid.PRICE_LISTS, app.GridCells.MATERIAL_PRICE_VERSIO_FKN, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, PRICE_VERSION_DESC_2)
    _common.edit_containerCell(cnt.uuid.PRICE_LISTS, app.GridCells.RETAIL_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LIST.PRICE_LIST[0])
    _common.edit_containerCell(cnt.uuid.PRICE_LISTS, app.GridCells.LIST_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LIST.LIST_PRICE[0])
    _common.edit_containerCell(cnt.uuid.PRICE_LISTS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LIST.CO2_PROJECT_VALUE[1])
    cy.SAVE()

  })

  it('TC - Create estimate header', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.create_newRecord(cnt.uuid.PROJECTS);
    _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
    cy.SAVE()

    _common.toggleSidebar(Sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);

    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS)
    cy.SAVE();

    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);

  })

  it('TC - Create new line item record', function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
      _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.quantity, CONTAINER_COLUMNS_LINE_ITEM.co2projecttotal, CONTAINER_COLUMNS_LINE_ITEM.co2sourcetotal, CONTAINER_COLUMNS_LINE_ITEM.co2totalvariance, CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo, CONTAINER_COLUMNS_LINE_ITEM.basuomfk], cnt.uuid.ESTIMATE_LINEITEMS,)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
    cy.SAVE()

  })

  it('TC - Assign resources to the line item', function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
      _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.co2project, CONTAINER_COLUMNS_RESOURCE.co2source, CONTAINER_COLUMNS_RESOURCE.co2projecttotal, CONTAINER_COLUMNS_RESOURCE.co2sourcetotal], cnt.uuid.RESOURCES,)
    });

    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);

    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_1);
    cy.SAVE();

    _common.create_newRecord(cnt.uuid.RESOURCES);

    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_2);
    cy.SAVE();

  });

  it('TC - Navigate back to material record and change the co2 project price', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);

    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.setDefaultView(app.TabBar.RECORDS)
      _common.set_containerLayoutUnderEditView(CommonLocators.CommonLabels.LAYOUT_6)
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
      _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER)
    });

    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
    _common.set_cellCheckboxValueForAllRowCell(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.UNCHECK)

    _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINERS_MATERIAL_CATALOGS.MATERIAL_CATALOG_DESCRIPTION)

    _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOGS.MATERIAL_CATALOG_DESCRIPTION)

    _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)

    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER, 1)
      _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUP_FILTER, CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER)
    })
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUP_FILTER)
    _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER, CONTAINERS_MATERIAL_GROUP_FILTER.PROCUREMENT_STRUCTURE_CODE)
    _common.select_allContainerData(cnt.uuid.MATERIAL_GROUP_FILTER)
    _common.set_cellCheckboxValueForAllRowCell(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.UNCHECK)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.PRC_STRUCTURE_FK, CONTAINERS_MATERIAL_GROUP_FILTER.PROCUREMENT_STRUCTURE_CODE)
    _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)

    cy.REFRESH_CONTAINER()

    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2)
      _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
    })

    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
    _common.clickOn_containerFooterButton(cnt.uuid.MATERIAL_RECORDS, CommonLocators.CommonKeys.STATUS_BAR, btn.IconButtons.ICO_REC_LAST)
    _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, MATERIAL_DESC_1)

    _common.select_rowHasValue(cnt.uuid.MATERIAL_RECORDS, MATERIAL_DESC_1)
    _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.UPDATED_CO2_PROJECT_VALUE[0])
    _common.select_activeRowInContainer(cnt.uuid.MATERIAL_RECORDS)
    cy.SAVE()

    _common.getText_fromCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("UPDATED_MATERIAL_CO2_VALUE_1", $ele1.text())
      cy.log(Cypress.env("UPDATED_MATERIAL_CO2_VALUE_1"))
    })

    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PRICE_LISTS, app.FooterTab.PRICE_LISTS, 3)
      _common.setup_gridLayout(cnt.uuid.PRICE_LISTS, CONTAINER_COLUMNS_PRICE_LIST)
    })
    _common.clear_subContainerFilter(cnt.uuid.PRICE_LISTS)
    _common.select_rowHasValue(cnt.uuid.PRICE_LISTS, PRICE_VERSION_DESC_1)

    _common.edit_containerCell(cnt.uuid.PRICE_LISTS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.UPDATED_CO2_PROJECT_VALUE[0])
    cy.SAVE()

    _common.getText_fromCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("UPDATED_MATERIAL_PRICE_LIST_CO2_VALUE_1", $ele1.text())
      cy.log(Cypress.env("UPDATED_MATERIAL_PRICE_LIST_CO2_VALUE_1"))
    })

    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2)
    })
    _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, MATERIAL_DESC_2)

    _common.select_rowHasValue(cnt.uuid.MATERIAL_RECORDS, MATERIAL_DESC_2)
    _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.UPDATED_CO2_PROJECT_VALUE[1])
    _common.select_activeRowInContainer(cnt.uuid.MATERIAL_RECORDS)
    cy.SAVE()

    _common.getText_fromCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("UPDATED_MATERIAL_CO2_VALUE_2", $ele1.text())
      cy.log(Cypress.env("UPDATED_MATERIAL_CO2_VALUE_2"))
    })

    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PRICE_LISTS, app.FooterTab.PRICE_LISTS, 3)
    })
    _common.clear_subContainerFilter(cnt.uuid.PRICE_LISTS)
    _common.select_rowHasValue(cnt.uuid.PRICE_LISTS, PRICE_VERSION_DESC_2)

    _common.edit_containerCell(cnt.uuid.PRICE_LISTS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.UPDATED_CO2_PROJECT_VALUE[1])
    cy.SAVE()

    _common.getText_fromCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("UPDATED_MATERIAL_PRICE_LIST_CO2_VALUE_2", $ele1.text())
      cy.log(Cypress.env("UPDATED_MATERIAL_PRICE_LIST_CO2_VALUE_2"))
    })
  })

  it('TC - Update the first record material price list in estimate', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });

    _common.toggleSidebar(Sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
    });

    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.select_allContainerData(cnt.uuid.ESTIMATE)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, commonLocators.CommonLabels.UPDATE_MATERIAL_PRICES)
    _estimatePage.updateMaterialcatalogPrices_FromWizard(MODAL_UPDATE_MATERIAL_PRICES_WIZARD.UPDATE_MATERIAL_PRICE_FROM_MATERIAL_CATALOG, 0, MATERIAL_CODE_1, PRICE_VERSION_DESC_1, 1)
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    cy.SAVE()

    cy.REFRESH_CONTAINER()

  });

  it('TC - Update the second record material price list in estimate ', function () {
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.select_allContainerData(cnt.uuid.ESTIMATE)
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, commonLocators.CommonLabels.UPDATE_MATERIAL_PRICES)

    _estimatePage.updateMaterialcatalogPrices_FromWizard(MODAL_UPDATE_MATERIAL_PRICES_WIZARD.UPDATE_MATERIAL_PRICE_FROM_MATERIAL_CATALOG, 0, MATERIAL_CODE_2, PRICE_VERSION_DESC_2, 1)
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    cy.SAVE()

    cy.REFRESH_CONTAINER()

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
    })
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
    _common.search_inSubContainer(cnt.uuid.ESTIMATE, EST_DESC)
    _common.select_rowHasValue(cnt.uuid.ESTIMATE, EST_DESC)

    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
  });

  it('TC - Verify the updated material price for first material ', function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_1)
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, commonLocators.CommonLabels.UPDATE_ESTIMATE)
    _estimatePage.update_estimate_fromWizard(MODAL_UPDATE_ESTIMATE);
    cy.SAVE()

    cy.REFRESH_CONTAINER()

    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
      _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.co2project], cnt.uuid.RESOURCES)
    });

    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, MATERIAL_CODE_1)
    cy.wait(1000).then(() => {
      _common.assert_forNumericValues(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT, Cypress.env("UPDATED_MATERIAL_CO2_VALUE_1"))
    })
  });

  it('TC - Verify the updated material price for  second material ', function () {
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, MATERIAL_CODE_2)
    cy.wait(1000).then(() => {
      _common.assert_forNumericValues(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT, Cypress.env("UPDATED_MATERIAL_CO2_VALUE_2"))
    })
  });

})


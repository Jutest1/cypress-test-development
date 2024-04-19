import { commonLocators, app, tile, sidebar, cnt, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _boqPage, _estimatePage, _schedulePage, _mainView } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "P-4.13-" + Cypress._.random(0, 999);
const PRJ_NAME = "PRJ_EST-4.13_-" + Cypress._.random(0, 999);
const BOQ_DESCRIPTION = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_ITEM_DESCRIPTION = "BOQ-ITEM-DESC-" + Cypress._.random(0, 999);
const CG_CATLOG_CODE = "CG_1_" + Cypress._.random(0, 999);
const CG_CATLOG_DESC = "CG_CATALOG-" + Cypress._.random(0, 999);
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const SCHEDULE_CODE = "SCH-" + Cypress._.random(0, 999);
const SCHEDULE_DESC = "SCH_DESC-" + Cypress._.random(0, 999);
const ACTIVITY_DESC = "ACT_DESC-" + Cypress._.random(0, 999);
const LOCATION_CODE = "L-" + Cypress._.random(0, 999);
const LOCATION_DESCRIPTION = "LOCATION-DESC-" + Cypress._.random(0, 999);
const COST_GROUP_CODE = "CG-" + Cypress._.random(0, 999);
const COST_GROUP_DESC = "CG-DESC-" + Cypress._.random(0, 999);

let CONTAINERS_COST_CODES, CONTAINERS_MATERIAL_CATALOG_FILTER, CONTAINERS_MATERIAL_RECORDS, CONTAINERS_PROJECT, CONTAINERS_BOQ_STRUCTURE, CONTAINERS_LOCATION, CONTAINERS_COST_GROUP, CONTAINERS_SCHEDULE, CONTAINERS_ACTIVITY_STRUCTURE, CONTAINERS_ESTIMATE, CONTAINERS_RESOURCE

let CONTAINER_COLUMNS_COST_CODES, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_RECORDS, CONTAINER_COLUMNS_BOQ, CONTAINER_COLUMNS_BOQ_STRUCTURE, CONTAINER_COLUMNS_LOCATIONS, CONTAINER_COLUMNS_COST_GROUP, CONTAINER_COLUMNS_SCHEDULE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCE, CONTAINER_COLUMNS_LINE_ITEMS_STRUCTURE
let PROJECT_PARAMETERS: DataCells, BOQ_PARAMETERS: DataCells, BOQ_STRUCTURE_PARAMETER: DataCells, SCHEDULE_PARAMETERS: DataCells, ESTIMATE_PARAMETERS: DataCells, GENERATE_LINE_ITEMS_PARAMETERS_1: DataCells, GENERATE_LINE_ITEMS_PARAMETERS_2: DataCells, GENERATE_LINE_ITEMS_PARAMETERS_3: DataCells, GENERATE_LINE_ITEMS_PARAMETERS_4: DataCells, RESOURCE_PARAMETERS_COST_CODE_1: DataCells, RESOURCE_PARAMETERS_COST_CODE_2: DataCells, RESOURCE_PARAMETERS_MATERIAL_1: DataCells;

let MODAL_PROJECT_CATALOG_CONFIGURATION;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 4.15 | Verify CO2 attributes in line item structure container  based on cost group / BoQ  / Location / Activities");

describe("EST- 4.15 | Verify CO2 attributes in line item structure container  based on cost group / BoQ  / Location / Activities", () => {

  before(function () {

    cy.fixture("estimate/est-4.15-Verify_CO2_attributes_in_line_item_structure_container_based_on_costgroup_BoQ_Location_Activities.json")
      .then((data) => {
        this.data = data;
        CONTAINERS_COST_CODES = this.data.CONTAINERS.COST_CODES;
        CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES;
        CONTAINERS_MATERIAL_CATALOG_FILTER = this.data.CONTAINERS.MATERIAL_CATALOG_FILTER
        CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG_FILTER
        CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS
        CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS
        CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
        PROJECT_PARAMETERS = {
          [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
          [commonLocators.CommonLabels.NAME]: PRJ_NAME,
          [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
        };
        CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ;
        BOQ_PARAMETERS = {
          [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESCRIPTION,
        }
        CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
        CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
        BOQ_STRUCTURE_PARAMETER = {
          [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
          [app.GridCells.BRIEF_INFO_SMALL]: BOQ_ITEM_DESCRIPTION,
          [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY_1,
          [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM,
        };
        CONTAINERS_LOCATION = this.data.CONTAINERS.LOCATION
        CONTAINER_COLUMNS_LOCATIONS = this.data.CONTAINER_COLUMNS.LOCATION
        MODAL_PROJECT_CATALOG_CONFIGURATION = this.data.MODAL.PROJECT_CATALOG_CONFIGURATION
        CONTAINERS_COST_GROUP = this.data.CONTAINERS.COST_GROUP
        CONTAINER_COLUMNS_COST_GROUP = this.data.CONTAINER_COLUMNS.COST_GROUP
        CONTAINERS_SCHEDULE = this.data.CONTAINERS.SCHEDULE
        CONTAINER_COLUMNS_SCHEDULE = this.data.CONTAINER_COLUMNS.SCHEDULE
        SCHEDULE_PARAMETERS = {
          [app.GridCells.CODE]: SCHEDULE_CODE,
          [app.GridCells.DESCRIPTION_INFO]: SCHEDULE_DESC
        }
        CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
        CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
        CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
        CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM;
        ESTIMATE_PARAMETERS = {
          [app.GridCells.CODE]: EST_CODE,
          [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
          [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
        };
        GENERATE_LINE_ITEMS_PARAMETERS_1 = {
          [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
          [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESCRIPTION
        }
        GENERATE_LINE_ITEMS_PARAMETERS_2 = {
          [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
          [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: SCHEDULE_DESC
        }
        GENERATE_LINE_ITEMS_PARAMETERS_3 = {
          [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
          [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: CG_CATLOG_DESC
        }
        GENERATE_LINE_ITEMS_PARAMETERS_4 = {
          [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
          [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: CommonLocators.CommonKeys.LOCATION
        }
        CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
        CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCES;
        RESOURCE_PARAMETERS_COST_CODE_1 = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.COST_CODE[0],
        };
        RESOURCE_PARAMETERS_COST_CODE_2 = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.COST_CODE[1],
        };
        RESOURCE_PARAMETERS_MATERIAL_1 = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL[0],
        };
        CONTAINER_COLUMNS_LINE_ITEMS_STRUCTURE = this.data.CONTAINER_COLUMNS.LINE_ITEMS_STRUCTURE
      })
      .then(() => {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      });
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
      _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODES.co2project, CONTAINER_COLUMNS_COST_CODES.descriptioninfo], cnt.uuid.COST_CODES)
    })
    _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
    _common.search_inSubContainer(cnt.uuid.COST_CODES, CONTAINERS_COST_CODES.COST_CODE[0])
    _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.CODE, CONTAINERS_COST_CODES.COST_CODE[0])
    _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
    _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.COST_CODE_CO2_VALUE[0])
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
    _common.getText_fromCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("COST_CODE_1_CO2_VALUE", $ele1.text())
      cy.log(Cypress.env("COST_CODE_1_CO2_VALUE"))
    })
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.COST_CODES, CONTAINERS_COST_CODES.COST_CODE[1])
    _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.CODE, CONTAINERS_COST_CODES.COST_CODE[1])
    _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
    _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.COST_CODE_CO2_VALUE[0])
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.getText_fromCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("COST_CODE_2_CO2_VALUE", $ele1.text())
      cy.log(Cypress.env("COST_CODE_2_CO2_VALUE"))
    })
    _common.waitForLoaderToDisappear()
  })

  it('TC - Add CO2 project value to record in material module', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
      _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER)
    });
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_FILTER.MATERIAL_CATALOG_DESCRIPTION)
    _common.waitForLoaderToDisappear()
    _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 0);
      _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
      _common.set_columnAtTop([CONTAINER_COLUMNS_MATERIAL_RECORDS.co2project, CONTAINER_COLUMNS_MATERIAL_RECORDS.descriptioninfo1], cnt.uuid.MATERIAL_RECORDS)
    });
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
    _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, CONTAINERS_MATERIAL_RECORDS.MATERIAL_DESCRIPTION[0])
    _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.CO2_PROJECT_VALUE)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.select_activeRowInContainer(cnt.uuid.MATERIAL_RECORDS)
    _common.getText_fromCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("MATERIAL_1_CO2_VALUE", $ele1.text())
      cy.log(Cypress.env("MATERIAL_1_CO2_VALUE"))
    })
    _common.waitForLoaderToDisappear()
  })

  it("TC - Create new BoQ header and BoQ structure", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
    _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CommonLocators.CommonLabels.ENTERPRISE_CATALOG_CONFIGURATION)
    cy.REFRESH_CONTAINER()
    _common.select_rowInContainer(cnt.uuid.DATA_TYPES)
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
    _estimatePage.projectCatalogConfiguration(MODAL_PROJECT_CATALOG_CONFIGURATION.CATALOG_TYPE[0], MODAL_PROJECT_CATALOG_CONFIGURATION.SEARCH_RECORD, '', CG_CATLOG_CODE, CG_CATLOG_DESC)
    cy.SAVE()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.setDefaultView(app.TabBar.PROJECT)
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.PROJECTS);
    _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ);
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE);
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create new location record", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECT_LOCATION, app.FooterTab.LOCATIONS, 1);
      _common.setup_gridLayout(cnt.uuid.PROJECT_LOCATION, CONTAINER_COLUMNS_LOCATIONS)
    });
    _common.clear_subContainerFilter(cnt.uuid.PROJECT_LOCATION)
    _common.create_newRecord(cnt.uuid.PROJECT_LOCATION)
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreateLocation(LOCATION_CODE, LOCATION_DESCRIPTION)
    _common.select_activeRowInContainer(cnt.uuid.PROJECT_LOCATION)
    _common.edit_containerCell(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LOCATION.QUANTITY_FACTOR[0])
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create new cost group catalog and cost group", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.set_containerLayoutUnderEditView(CommonLocators.CommonLabels.LAYOUT_6)
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.COST_GROUP_CATALOG, app.FooterTab.COSTGROUPCATALOG, 1);
    });
    _common.select_rowHasValue(cnt.uuid.COST_GROUP_CATALOG, CG_CATLOG_CODE)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.COST_GROUPS, app.FooterTab.COSTGROUPS, 2);
      _common.setup_gridLayout(cnt.uuid.COST_GROUPS, CONTAINER_COLUMNS_COST_GROUP)
    });
    _common.create_newRecord(cnt.uuid.COST_GROUPS)
    _estimatePage.enterrecordto_CreateCostGroup(cnt.uuid.COST_GROUPS, COST_GROUP_CODE, COST_GROUP_DESC, CONTAINERS_COST_GROUP.QUANTITY[0], CONTAINERS_COST_GROUP.UOM[0])
    _common.select_activeRowInContainer(cnt.uuid.COST_GROUPS,)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create new schedule header and activity record.", function () {
    _common.openTab(app.TabBar.SCHEDULING).then(() => {
      _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
      _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULE)
    });
    _common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
    _common.create_newRecord(cnt.uuid.SCHEDULES);
    _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES, SCHEDULE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES, btn.ToolBar.ICO_GO_TO);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PLANNING).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 2);
      _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
    });
    _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
    _schedulePage.enterDataTo_CreateScheduleActivity(ACTIVITY_DESC, CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY[0], CONTAINERS_ACTIVITY_STRUCTURE.UOM[0]);
    _common.select_activeRowInContainer(cnt.uuid.ACTIVITY_STRUCTURE)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create new estimate", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
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

  it("TC - generate line item from by wizard ", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
    _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS_1);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
    _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS_2);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
    _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS_3);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
    _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS_4);
  });

  it("TC - Verify assign resource to line item", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LOCATION_DESCRIPTION)
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES)
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_COST_CODE_1)
    _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_ITEM_DESCRIPTION)
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_COST_CODE_2)
    _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, ACTIVITY_DESC)
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES)
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_COST_CODE_1)
    _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.RESOURCES)
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_COST_CODE_2)
    _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, COST_GROUP_DESC)
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES)
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_MATERIAL_1)
    _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it("TC - Fetch CO2 project total for each line item ", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
    });
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LOCATION_DESCRIPTION)
    _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_PROJECT_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("CO2_LOCATION", $ele1.text())
      cy.log(Cypress.env("CO2_LOCATION"))
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_ITEM_DESCRIPTION)
    _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_PROJECT_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("CO2_BOQ", $ele1.text())
      cy.log(Cypress.env("CO2_BOQ"))
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, ACTIVITY_DESC)
    _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_PROJECT_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("CO2_SCH", $ele1.text())
      cy.log(Cypress.env("CO2_SCH"))
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, COST_GROUP_DESC)
    _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_PROJECT_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("CO2_CG", $ele1.text())
      cy.log(Cypress.env("CO2_CG"))
    })
  });

  it("TC - Verify CO2 project total values in line item structure for location, BoQ, schedule and cost group", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.LINEITEMSSTRUCTURE, app.FooterTab.LINE_ITEMS_STRUCTURE, 2)
      _common.setup_gridLayout(cnt.uuid.LINEITEMSSTRUCTURE, CONTAINER_COLUMNS_LINE_ITEMS_STRUCTURE)
    })
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.LINEITEMSSTRUCTURE);
    _estimatePage.add_LineItemsStructure(CommonLocators.CommonKeys.LOCATION);
    _estimatePage.add_LineItemsStructure(CommonLocators.CommonKeys.ACTIVITY);
    _estimatePage.add_LineItemsStructure(CommonLocators.CommonKeys.BOQ_ITEM_REF_NO);
    _estimatePage.add_LineItemsStructure(CG_CATLOG_CODE);
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.LINEITEMSSTRUCTURE, btn.ToolBar.ICO_REFRESH)
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.LINEITEMSSTRUCTURE, btn.ToolBar.ICO_REFRESH)
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.LINEITEMSSTRUCTURE, LOCATION_DESCRIPTION)
    _common.assert_cellData_insideActiveRow(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.CO2_PROJECT_TOTAL, Cypress.env("CO2_LOCATION"))
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.LINEITEMSSTRUCTURE, BOQ_ITEM_DESCRIPTION)
    _common.assert_cellData_insideActiveRow(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.CO2_PROJECT_TOTAL, Cypress.env("CO2_BOQ"))
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.LINEITEMSSTRUCTURE, ACTIVITY_DESC)
    _common.assert_cellData_insideActiveRow(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.CO2_PROJECT_TOTAL, Cypress.env("CO2_SCH"))
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.LINEITEMSSTRUCTURE, COST_GROUP_DESC)
    _common.assert_cellData_insideActiveRow(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.CO2_PROJECT_TOTAL, Cypress.env("CO2_CG"))
  })

});

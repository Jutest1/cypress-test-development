import { btn, tile, app, cnt, commonLocators, sidebar } from "cypress/locators";
import { _projectPage, _schedulePage, _common, _estimatePage, _package, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const SCH_CODE = 'SCH_CODE-' + Cypress._.random(0, 999);
const SCH_ACTIVITY_DESC = 'ACT-001-' + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const UPDATED_DATE = 'UPDATED_DATE'
const SCH_DESC = "SCH-DESC-" + Cypress._.random(0, 999);

let PROJECTS_PARAMETERS: DataCells,
  ESTIMATE_PARAMETERS: DataCells,
  RESOURCE_PARAMETERS: DataCells,
  GENERATE_LINE_ITEMS_PARAMETERS: DataCells,
  SCH_PARAMETERS:DataCells

let CONTAINERS_ESTIMATE,
  CONTAINER_COLUMNS_ESTIMATE,
  CONTAINER_COLUMNS_LINE_ITEM,
  CONTAINERS_RESOURCE,
  CONTAINER_COLUMNS_RESOURCE,
  CONTAINERS_ACTIVITY_STRUCTURE,
  CONTAINER_COLUMNS_SCHEDULE,
  CONTAINER_COLUMNS_ACTIVITY_STRUCTURE,
  CONTAINER_PACKAGE,
  CONTAINER_COLUMNS_PACKAGE

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 1.76 | Update package date from scheduling");

describe("PCM- 1.76 |  Update package date from scheduling", () => {
  before(function () {
    cy.fixture("procurement-and-bpm/pcm-1.76-update-package-date-from-scheduling.json").then((data) => {
      this.data = data;
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
      CONTAINER_COLUMNS_SCHEDULE = this.data.CONTAINER_COLUMNS.SCHEDULE
      CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
      CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
      CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
      PROJECTS_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
        [commonLocators.CommonLabels.NAME]: PRJ_NAME,
        [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
      }
      SCH_PARAMETERS={
        [app.GridCells.CODE]:SCH_CODE,
        [app.GridCells.DESCRIPTION_INFO]:SCH_DESC
    }
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      GENERATE_LINE_ITEMS_PARAMETERS = {
        [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: SCH_DESC
      }
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
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
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.create_newRecord(cnt.uuid.PROJECTS);
      _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
      cy.SAVE();
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
    });
  });

  after(() => {
    cy.LOGOUT();
  });

  it('TC - Create new schedule header', function () {
    _common.openTab(app.TabBar.SCHEDULING).then(() => {
      _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 3);
      _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULE);
    });
    _common.create_newRecord(cnt.uuid.SCHEDULES);
    _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCH_PARAMETERS)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.goToButton_inActiveRow(cnt.uuid.SCHEDULES, app.GridCells.CODE, btn.IconButtons.ICO_SCHEDULING);
    cy.wait(2000); //required wait to load page
  });

  it('TC - Add activity structure 1', function () {
    _common.openTab(app.TabBar.PLANNING).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE);
    });
    _schedulePage.enterDataTo_CreateScheduleActivity(SCH_ACTIVITY_DESC, CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY, CONTAINERS_ACTIVITY_STRUCTURE.UOM, _common.getDate("current"), _common.getDate("current"));
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create Estimate Header", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
    cy.wait(2000) //required wait to load page
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    cy.wait(2000) //required wait to load page
  });

  it("TC - Create new line item recordfor created estimate", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
    cy.wait(1000) //required wait to load page
    _common.waitForLoaderToDisappear()
    _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
  });

  it("TC - Create new record in resource for cost code and generate budget", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.maximizeContainer(cnt.uuid.RESOURCES)
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    _common.minimizeContainer(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS);
    cy.wait(2000); //required wait to load page
    _common.select_allContainerData(cnt.uuid.RESOURCES);
  });

  it("TC - Create material package include cost code checkbox using wizard", function () {
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _common.waitForLoaderToDisappear()
    _package.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
    cy.wait(2000); //required wait to load page
    _common.waitForLoaderToDisappear()
  });

  it("TC - Assert the material package", function () {
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.setDefaultView(app.TabBar.PACKAGE)
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE)
      _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
    })
    _common.maximizeContainer(cnt.uuid.PACKAGE)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
    cy.wait(2000); //required wait to load page
    _common.assert_cellDataByContent_inContainer(cnt.uuid.PACKAGE, app.GridCells.PLANNED_START, _common.getDate("current"));
    _common.assert_cellDataByContent_inContainer(cnt.uuid.PACKAGE, app.GridCells.PLANNED_END, _common.getDate("current"));
    _common.minimizeContainer(cnt.uuid.PACKAGE)
  });

  it("TC - Navigate back to scheduling and changing the planned dates", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.SCHEDULING);
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.PLANNING).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
    });
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.QUANTITY_UOM_FK, CONTAINERS_ACTIVITY_STRUCTURE.UOM)
    _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.PLANNED_START, app.InputFields.INPUT_GROUP_CONTENT, _common.getDate("incremented", 15))
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ACTIVITY_STRUCTURE.UPDATE_QUANTITY)
    _common.saveCellDataToEnv(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.PLANNED_START, UPDATED_DATE)
  });

  it("TC - Navigate back to package and update the dates ", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
    cy.wait(2000) //required wait to load page
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE)
      _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_DATE);
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    cy.wait(1000) //required wait to load page
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
  });

  it("TC - verify the  updated dates ", function () {
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      cy.wait(1000) //required wait to load page
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE)
      _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE,app.GridCells.PLANNED_START, Cypress.env(UPDATED_DATE))
    })
  })
});

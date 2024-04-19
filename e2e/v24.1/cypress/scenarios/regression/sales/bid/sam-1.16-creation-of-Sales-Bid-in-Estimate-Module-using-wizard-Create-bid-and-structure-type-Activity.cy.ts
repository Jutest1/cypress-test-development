import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _schedulePage, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
const allure = Cypress.Allure.reporter.getInterface();
const SCH_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const ACTIVITY_CODE = "AC-" + Cypress._.random(0, 999);
const SCH_CODE = "ACT-" + Cypress._.random(0, 999);
const SCH_ACT_DESC = "SADES-" + Cypress._.random(0, 999);
const BID_DESC = "BID-Test-" + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_BIDS;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let GENERATE_LINE_ITEMS_PARAMETERS: DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let MODAL_CREATE_BID
let CONTAINERS_LINE_ITEM
let CONTAINERS_CONTROLLING_UNIT
let SCH_PARAMETERS: DataCells
let CONTAINERS_ACTIVITY_STRUCTURE;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINER_COLUMNS_SCHEDULES;
let CONTAINERS_SCHEDULES;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 1.16 | Creation of sales bid in estimate module using wizard create bid & structure type activity");
describe("SAM- 1.16 | Creation of sales bid in estimate module using wizard create bid & structure type activity", () => {

  beforeEach(function () {
    cy.fixture("sam/sam-1.16-creation-of-Sales-Bid-in-Estimate-Module-using-wizard-Create-bid-&-structure-type-Activity copy.json").then((data) => {
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
    cy.fixture("sam/sam-1.16-creation-of-Sales-Bid-in-Estimate-Module-using-wizard-Create-bid-&-structure-type-Activity copy.json").then((data) => {
      this.data = data;
      SCH_PARAMETERS = {
        [app.GridCells.CODE]: SCH_CODE,
        [app.GridCells.DESCRIPTION_INFO]: SCH_DESC
      }
      CONTAINERS_SCHEDULES = this.data.CONTAINERS.SCHEDULES
      CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
      CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
      CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
      CONTAINER_COLUMNS_BIDS = this.data.CONTAINER_COLUMNS.BIDS
      MODAL_CREATE_BID = this.data.MODALS.CREATE_BID
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
      };
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE
      GENERATE_LINE_ITEMS_PARAMETERS = {
        [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: SCH_DESC
      }
      PROJECTS_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
        [commonLocators.CommonLabels.NAME]: PRJ_NAME,
        [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
      }
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.create_newRecord(cnt.uuid.PROJECTS);
      _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
    });
  });

  it("TC - Create new schedule header and activity record.", function () {
    _common.openTab(app.TabBar.SCHEDULING).then(() => {
      _common.setDefaultView(app.TabBar.SCHEDULING)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
      _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULES)
    });
    _common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
    _common.create_newRecord(cnt.uuid.SCHEDULES)
    _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES, SCH_PARAMETERS)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES, btn.ToolBar.ICO_GO_TO)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.PLANNING).then(() => {
      _common.waitForLoaderToDisappear()
      _common.setDefaultView(app.TabBar.PLANNING, commonLocators.CommonKeys.DEFAULT)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
    });
    _common.create_newRecord(cnt.uuid.ACTIVITY_STRUCTURE);
    _common.waitForLoaderToDisappear()
    _common.edit_containerCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, ACTIVITY_CODE)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _schedulePage.enterRecord_toCreateActivityStructure(SCH_ACT_DESC, CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY, CONTAINERS_ACTIVITY_STRUCTURE.UOM);
    cy.SAVE();
    _common.waitForLoaderToDisappear()

  });

  it('TC - Create new estimate record', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
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
  });

  it("TC - Generate line item and assign activity to it", function () {
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
    _common.waitForLoaderToDisappear()
    _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
  });

  it("TC - Verify assign resource to line item", function () {
    _common.waitForLoaderToDisappear()
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
  });
  it("TC - Create new sales bid", function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
    _common.waitForLoaderToDisappear()
    _bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.MAIN_BID, BID_DESC, MODAL_CREATE_BID.BUSINESS_PARTNER, MODAL_CREATE_BID.STRUCTURE_TYPE);
    _common.waitForLoaderToDisappear()
  });

  it("TC - Verify net amount and BoQ structure quantity", function () {
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
      _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BIDS)
      _common.clear_subContainerFilter(cnt.uuid.BIDS)
    })
    _bidPage.verifying_Bid_Net_Amount();
    _common.openTab(app.TabBar.BIDBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDBOQS, app.FooterTab.BOQs, 0);
      _common.select_rowInSubContainer(cnt.uuid.BIDBOQS)
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE, 1);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREBID, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });

    _common.clickOn_cellHasUniqueValue(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, commonLocators.CommonKeys.POSITION)
    _package.assert_cellData_insideActiveRow(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY)

  });

  after(() => {
    cy.LOGOUT();
  });
});

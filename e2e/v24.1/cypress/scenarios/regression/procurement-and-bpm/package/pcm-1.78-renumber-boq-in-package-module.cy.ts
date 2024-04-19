import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _estimatePage, _package, _validate, _boqPage, _mainView, _projectPage, _modalView } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const BOQ_STRCU_DESC = "BOQ-STRC-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);

let BOQS_PARAMETERS: DataCells
let BOQ_STRUCTURE_PARAMETER: DataCells
let ESTIMATE_PARAMETERS: DataCells
let RESOURCE_PARAMETERS: DataCells
let RENUMBER_BOQ_PARAMETERS: DataCells
let GENERATE_LINE_ITEMS_PARAMETERS: DataCells
let CONTAINERS_COLUMNS_BOQ
let CONTAINERS_COLUMNS_BOQ_STRUCTURE
let CONTAINERS_COLUMNS_ESTIMATE
let CONTAINER_ESTIMATE
let CONTAINER_BOQ_STRUCTURE
let CONTAINERS_COLUMNS_RESOURCE
let CONTAINERS_RESOURCE
let CONTAINERS_PACKAGE
let CONTAINERS_RENUMBER_BOQ

allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 1.78 | Renumber BOQ in package Module");

describe("PCM- 1.78 | Renumber BOQ in package Module", () => {
  before(function () {
    cy.fixture("pcm/pcm-1.78-renumber-boq-in-package-module.json").then((data) => {
      this.data = data;
      CONTAINERS_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
      CONTAINERS_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINER_ESTIMATE = this.data.CONTAINERS.ESTIMATE
      CONTAINER_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
      CONTAINERS_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      CONTAINERS_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
      CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE;
      CONTAINERS_RENUMBER_BOQ = this.data.CONTAINERS.RENUMBER_BOQ;
      BOQS_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      };
      BOQ_STRUCTURE_PARAMETER = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRCU_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINER_BOQ_STRUCTURE.QUANTITY,
        [app.GridCells.PRICE_SMALL]: CONTAINER_BOQ_STRUCTURE.UNIT_RATE,
        [app.GridCells.BAS_UOM_FK]: CONTAINER_BOQ_STRUCTURE.UOM
      },
        ESTIMATE_PARAMETERS = {
          [app.GridCells.CODE]: ESTIMATE_CODE,
          [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINER_ESTIMATE.RUBRIC_CATEGORY,
          [app.GridCells.EST_TYPE_FK]: CONTAINER_ESTIMATE.ESTIMATE_TYPE,
        },
        RESOURCE_PARAMETERS = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE_1,
        };
      RENUMBER_BOQ_PARAMETERS = {
        [commonLocators.CommonLabels.SELECTION]: CONTAINERS_RENUMBER_BOQ.SELECTION,
        [commonLocators.CommonElements.LINE_TYPE]: CONTAINERS_RENUMBER_BOQ.LINE_TYPE,
        [commonLocators.CommonElements.START_VALUE]: CONTAINERS_RENUMBER_BOQ.START_VALUE,
        [commonLocators.CommonElements.STEP_INC]: CONTAINERS_RENUMBER_BOQ.INCREMENT,
        [app.GridCells.BRIEF_INFO_SMALL]: [BOQ_STRCU_DESC],
      },
        GENERATE_LINE_ITEMS_PARAMETERS = {
          [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
          [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
        }
    })
    cy.preLoading(
      Cypress.env("adminUserName"),
      Cypress.env("adminPassword"),
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName")
    );
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
  })

  it("TC - Create BOQ header & BOQ Structure", function () {
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINERS_COLUMNS_BOQ)
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS)
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQS_PARAMETERS)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINERS_COLUMNS_BOQ_STRUCTURE)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create Estimate header and generate line items from BOQ and assign resource to it", function () {
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINERS_COLUMNS_ESTIMATE)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE)
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS)
    _common.waitForLoaderToDisappear()
    _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.getTextfromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL)
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINERS_COLUMNS_RESOURCE)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  })

  it("TC -Create BOQ Package using wizard Create/Update BoQ Package", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE)
    _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(CONTAINERS_PACKAGE.BASED_ON, CONTAINERS_PACKAGE.ESTIMATE_SCOPE, CONTAINERS_PACKAGE.ESTIMATE_SCOPE_INDEX, CONTAINERS_PACKAGE.WIC_BOQ, CONTAINERS_PACKAGE.PROCUREMENT_STRUCTURE, CONTAINERS_PACKAGE.QTY_TYPE, CONTAINERS_PACKAGE.CREATE_PACKAGE_CHECKBOX)
  });

  it("TC - Verify Renumber BoQ wizard option", function () {
    _common.openTab(app.TabBar.BOQDETAILS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINERS_COLUMNS_BOQ_STRUCTURE)
    });
    _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURE)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, CONTAINERS_RENUMBER_BOQ.LEVEL)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.RENUMBER_BOQ)
    _common.clickOn_modalFooterButton(Buttons.ButtonText.CANCEL)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.RENUMBER_BOQ)
    _boqPage.renumberBoQ_fromWizard(cnt.uuid.BOQ_STRUCTURE, RENUMBER_BOQ_PARAMETERS)
    _common.minimizeContainer(cnt.uuid.BOQ_STRUCTURE)
  })

  after(() => {
    cy.LOGOUT();
    });

})
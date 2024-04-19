import cypress from "cypress";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _validate, _common, _controllingUnit, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";


const allure = Cypress.Allure.reporter.getInterface();
const OUTLINESPEC = "BOQDEC-" + Cypress._.random(0, 999)
const ADDEDBOQDEC = "BOQDEC-" + Cypress._.random(0, 999)
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const FINAL_PRICE = 'FINAL_PRICE'

let BOQ_PARAMETERS: DataCells,
  BOQ_STRUCTURE_PARAMETERS: DataCells,
  ESTIMATE_PARAMETERS: DataCells,
  RESOURCE_PARAMETERS: DataCells,
  GENERATE_LINE_ITEMS_PARAMETERS: DataCells

let CONTAINER_DATA_TYPE,
  CONTAINER_COLUMNS_BOQS,
  CONTAINERS_BOQ_STRUCTURE,
  CONTAINER_COLUMNS_BOQ_STRUCTURE,
  CONTAINERS_ESTIMATE,
  CONTAINER_COLUMNS_ESTIMATE,
  CONTAINER_COLUMNS_LINE_ITEM,
  CONTAINERS_RESOURCE,
  CONTAINER_COLUMNS_RESOURCE,
  CONTAINER_DATA_RECORDS,
  CONTAINER_PACKAGE,
  CONTAINER_COLUMNS_PACKAGE,
  CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE
allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 1.72 | BoQ scope replacement in package");

describe("PCM- 1.72 | BoQ scope replacement in package", () => {
  before(function () {
    cy.fixture("pcm/pcm-1.72-boq-scope-replacement-in-package.json").then((data) => {
      this.data = data
      CONTAINER_DATA_TYPE = this.data.CONTAINERS.DATA_TYPE
      CONTAINER_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
      CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQSTRUCTURE
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
      CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
      CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.PACKAGE_BOQ_STRUCTURE
      BOQ_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      }
      BOQ_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY[0],
        [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0]
      }
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      BOQ_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      }
      BOQ_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY[0],
        [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0]
      }
      GENERATE_LINE_ITEMS_PARAMETERS = {
        [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
      }
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
      }

      cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
    })
  });

  after(() => {
    cy.LOGOUT();
  });

  it("TC - Set Is For Package satatus under customizing module", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
    })
    _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, CONTAINER_DATA_TYPE.PACKAGE_STATUS)
    cy.REFRESH_CONTAINER()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, CONTAINER_DATA_TYPE.PACKAGE_STATUS)
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
    })
    _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, CONTAINER_DATA_RECORDS.RECORDED)
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_ESTIMATE, commonLocators.CommonKeys.CHECK)
    cy.SAVE()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
  })

  it("TC - Create BOQ header and BOQ structure", function () {
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.maximizeContainer(cnt.uuid.BOQS)
    _common.create_newRecord(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.BOQS)
    _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
    _common.waitForLoaderToDisappear()
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it('TC - Create new estimate', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
    cy.wait(2000) //required wait to load page
    _common.waitForLoaderToDisappear()
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
  });

  it('TC - Genrate line item and assign resource to it', function () {
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
    cy.wait(1000) //required wait to load page
    _common.waitForLoaderToDisappear()
    _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create boq package from wizards option", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
    _common.waitForLoaderToDisappear()
    _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(CONTAINER_PACKAGE.BASED_ON, CONTAINER_PACKAGE.ESTIMATE_SCOPE, 2, CONTAINER_PACKAGE.BASED_ON, CONTAINER_PACKAGE.PROCUREMENT_STRUCTURE, CONTAINER_PACKAGE.QUANTITY_TRANSFER, commonLocators.CommonKeys.UNCHECK)
    _common.openTab(app.TabBar.PACKAGE).then(function () {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 3);
      _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
    _common.openTab(app.TabBar.BOQBASED).then(function () {
      _common.setDefaultView(app.TabBar.BOQBASED)
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 3);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE)
    })
  })

  it("TC - Create a new record in boq structure and boq scope replacement from wizard", function () {
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, CONTAINER_PACKAGE.ROOT)
    _common.create_newRecord(cnt.uuid.BOQ_STRUCTURE)
    _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, ADDEDBOQDEC)
    _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PACKAGE.QUANTITY)
    _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PACKAGE.UNITRATE)
    _common.edit_dropdownCellWithInput(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BAS_UOM_FK,commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PACKAGE.UOM)
    _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL, FINAL_PRICE)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, CONTAINER_PACKAGE.ROOT)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, CONTAINER_PACKAGE.POSITION)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, CONTAINER_PACKAGE.BOQ_SCOPE_REPLACEMENT);
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasValueWithIndex_fromModal(app.GridCells.BOQ_LINE_TYPE_FK, CONTAINER_PACKAGE.POSITION, 0)
    _package.select_itemScopeReplacementfromWizard(3)
  })

  it("TC - Update the estimate from package and verify the cost total in estimate", function () {
    _common.openTab(app.TabBar.BOQBASED).then(function () {
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE);
    cy.wait(2000) //required wait to load page
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    cy.wait(2000) //required wait to load page
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    cy.wait(2000) //required wait to load page
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
    cy.wait(2000) //required wait to load page
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.search_inSubContainer(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
      _common.search_inSubContainer(cnt.uuid.RESOURCES,CONTAINERS_RESOURCE.DESCRIPTION)
      _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL, Cypress.env(FINAL_PRICE))
    });
  })
})

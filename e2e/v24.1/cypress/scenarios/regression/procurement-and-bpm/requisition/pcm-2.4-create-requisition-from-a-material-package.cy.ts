import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const PACKAGE_CODE_1 = "PACKAGE_CODE_1";
const PACKAGE_CODE_2 = "PACKAGE_CODE_2";

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE_ITEM_DESC1-" + Cypress._.random(0, 999);


let ESTIMATE_PARAMETERS: DataCells,
  RESOURCE_PARAMETERS: DataCells,
  LINE_ITEM_PARAMETERS: DataCells

let CONTAINERS_ESTIMATE,
  CONTAINER_COLUMNS_ESTIMATE,
  CONTAINERS_RESOURCE,
  CONTAINER_COLUMNS_RESOURCE,
  CONTAINERS_LINE_ITEM,
  CONTAINER_COLUMNS_LINE_ITEM,
  CONTAINER_COLUMNS_REQUISITION_ITEM,
  CONTAINERS_CONTRACT

allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.4 | Create requisition from a material package")

describe('PCM- 2.4 | Create requisition from a material package', () => {
  before(function () {
    cy.fixture("pcm/pcm-2.4-create-requisition-from-a-material-package.json").then((data) => {
      this.data = data
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      CONTAINER_COLUMNS_REQUISITION_ITEM = this.data.CONTAINER_COLUMNS.REQUISITION_ITEM
      CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      LINE_ITEM_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
        [app.GridCells.QUANTITY]: CONTAINERS_LINE_ITEM.QUANTITY
      };

      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
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
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    })
  });

  after(() => {
    cy.LOGOUT();
  });

  it('TC - Create new estimate header', function () {
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
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()
  });

  it('TC - Create new line item with quantity', function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 3);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
      cy.SAVE()
      _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });
  });

  it('TC - Assign resource to the line item', function () {
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
    cy.wait(1000) //required wait to load page
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
  });

  it('TC - Create material package', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    cy.wait(2000) //required wait to load page
    _common.clickOn_checkboxByLabel_fromModal(commonLocators.CommonElements.ESTIMATE_SELECT_CRITERIA_PLATFORM_FORM_ROW, commonLocators.CommonLabels.MULTI_PACKAGE_ASSIGNMENT_MODEL, 0)
    _package.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
  });

  it('TC - Change status of the material package', function () {
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.setDefaultView(app.TabBar.PACKAGE)
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 4);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    cy.wait(2000) //required wait to load page
    _common.saveCellDataToEnv(cnt.uuid.PACKAGE, app.GridCells.CODE, PACKAGE_CODE_1)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1)
      _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
    });
    _common.maximizeContainer(cnt.uuid.PACKAGEITEMS)
    _common.create_newRecord(cnt.uuid.PACKAGEITEMS)
    _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGEITEMS, app.GridCells.BAS_UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.UOM)
    cy.wait(1000) //required wait to load page
    _common.edit_containerCell(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.QUANTITY)
    cy.wait(1000) //required wait to load page
    _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGEITEMS, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.CODE[1])
    cy.wait(2000) //required wait to load page
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.PACKAGEITEMS)
  });

  it('TC - Verify Item Scope replacement in package module', function () {
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 3);
    })
    _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
    _common.select_rowHasValue(cnt.uuid.PACKAGEITEMS, CONTAINERS_RESOURCE.CODE[0])
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.ITEM_SCOPE_REPLACEMENT)
    cy.wait(1000) //required wait to load page
    _common.select_rowHasValue_fromModal(CONTAINERS_RESOURCE.CODE[1], 1)
    _common.set_cellCheckboxValue_fromModal(app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    cy.wait(1000) //required wait to load page
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  })

  it('TC - Create requisition from material package', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
    _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.setDefaultView(app.TabBar.MAIN)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_REQUISITION_ITEM)
    });
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
    _common.select_rowInContainer(cnt.uuid.REQUISITIONITEMS)
    _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, CONTAINERS_RESOURCE.CODE[1])
    _validate.verify_recordNotPresentInContainer(cnt.uuid.REQUISITIONITEMS, CONTAINERS_RESOURCE.CODE[0])
  });

  it('TC - Create second material package with Multi Package Assignment Model', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
    })
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.clickOn_toolBarButtonWithTitle(cnt.uuid.ESTIMATE, Buttons.ButtonText.FILTER_CURRENT_ESTIMATE)
    cy.wait(1000) //required wait to load page
    _common.search_inSubContainer(cnt.uuid.ESTIMATE, EST_DESC)
    cy.wait(2000) //required wait to load page
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
    })
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    cy.wait(2000) //required wait to load page
    _common.clickOn_checkboxByLabel_fromModal(commonLocators.CommonElements.ESTIMATE_SELECT_CRITERIA_PLATFORM_FORM_ROW, commonLocators.CommonLabels.MULTI_PACKAGE_ASSIGNMENT_MODEL, 0)
    _package.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
    });
    _common.saveCellDataToEnv(cnt.uuid.PACKAGE, app.GridCells.CODE, PACKAGE_CODE_2)
  });

  it("TC - Create contract from package", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
    _saleContractPage.enterRecord_createNewContract_fromRequisition(CONTAINERS_CONTRACT.BUSINESS_PARTNER)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
    cy.wait(2000) //required wait to load page
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS);
    });
    _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.PROCUREMENTCONTRACT, CONTAINERS_CONTRACT.PACKAGE)
    _common.waitForLoaderToDisappear()
  })

  it('TC - Verify package status is contracted ', function () {
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 4);
    });
    _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.PACKAGE_STATUS_FK, commonLocators.CommonKeys.CONTRACTED)
  });
})
import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { _common, _estimatePage, _projectPage, _procurementContractPage, _validate, _mainView, _boqPage, _bidPage, _materialPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { coroutine } from "cypress/types/bluebird";

const allure = Cypress.Allure.reporter.getInterface();
let REQUISITION_PARAMETERS: DataCells;
let CONTAINERS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION;
let CONTAINERS_REQUISITION_ITEMS;
let CONTAINER_COLUMNS_REQUISITION_ITEMS;
allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.70 | Change status for item in requisition")

describe('PCM- 2.70 | Change status for item in requisition', () => {

  beforeEach(function () {
    cy.fixture("pcm/pcm-2.70-change_status_for_item_in_requisition.json").then((data) => {
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

    cy.fixture("pcm/pcm-2.70-change_status_for_item_in_requisition.json").then((data) => {
      this.data = data
      CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
      CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
      REQUISITION_PARAMETERS = {
        [commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION,
      }
      CONTAINER_COLUMNS_REQUISITION_ITEMS = this.data.CONTAINER_COLUMNS.REQUISITION_ITEMS
      CONTAINERS_REQUISITION_ITEMS = this.data.CONTAINERS.REQUISITION_ITEMS;
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });

  });
  after(() => {
    cy.LOGOUT();
  });
  it('TC - Verify creation requisition record ,requisition item record and change contract item status', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.setDefaultView(app.TabBar.MAIN)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS);
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
      _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
    });
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.REQUISITIONS);
    _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS);
    cy.SAVE();
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_ITEMS.BUSINESS_PARTNER_NAME)
    cy.wait(1000)
    cy.SAVE()

    cy.wait(1000)
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_REQUISITION_ITEMS)
    });
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
    _common.maximizeContainer(cnt.uuid.REQUISITIONITEMS)
    _common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_ITEMS.MATERIAL_CODE)
    cy.wait(1000)
    cy.SAVE()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_STATUS_FOR_ITEM);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.PROCESSED, CONTAINERS_REQUISITION.REMARK);
    cy.wait(2000)
    _common.select_rowInContainer(cnt.uuid.REQUISITIONITEMS)
    _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONITEMS, app.GridCells.PRC_ITEM_STATUS_FK, commonLocators.CommonKeys.PROCESSED)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_STATUS_FOR_ITEM);
    _common.waitForLoaderToDisappear()
    _modalView.findModal().acceptButton(btn.ButtonText.HISTORY);
    _validate.validate_Text_In_Modal(app.GridCells.REMARK, CONTAINERS_REQUISITION.REMARK)
    _modalView.findModal().acceptButton(btn.ButtonText.CLOSE);

  })

  it('TC - Verify creation of multiple requisition item record and change status of it', function () {

    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 0);
    });

    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
    _common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_ITEMS.MATERIAL_CODE)
    cy.wait(1000)
    cy.SAVE()
    _common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_ITEMS.MATERIAL_CODE)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.wait(1000)
    _common.search_inSubContainer(cnt.uuid.REQUISITIONITEMS, commonLocators.CommonKeys.RECORDED)
    cy.wait(1000)
    _common.waitForLoaderToDisappear()
    _common.select_allContainerData(cnt.uuid.REQUISITIONITEMS)
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_STATUS_FOR_ITEM);
    _common.changeStatus_ofMultipleRecord_fromModal(commonLocators.CommonKeys.PROCESSED);
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
    _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONITEMS, app.GridCells.PRC_ITEM_STATUS_FK, commonLocators.CommonKeys.PROCESSED)
  })

  it('TC - Verify message added to history of item in requisition', function () {
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
    _common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_ITEMS.MATERIAL_CODE)
    cy.wait(1000)
    cy.SAVE()
  })


})
import { _common, _controllingUnit, _package, _projectPage, _estimatePage, _sidebar, _mainView, _validate, _procurementPage, _materialPage, _saleContractPage, _rfqPage } from "cypress/pages";
import { cnt, tile, app, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.196 | Update text item in contract");

let CONTAINER_REQUISITION
let REQUISITION_PARAMETER: DataCells
let CONTAINER_COLUMNS_REQUISITION_ITEM
let CONTAINER_REQUISITION_ITEM
let REQUISTION_ITEM_PARAMETER: DataCells
let CONTAINER_ITEM_TEXT
let CONTAINER_CONTRACT

describe("PCM- 2.196 | Update text item in contract", () => {
  before(() => {

    cy.fixture("pcm/pcm-2.196-update-text-item-in-contract.json").then(function (data) {
      this.data = data;
      CONTAINER_REQUISITION = this.data.CONTAINERS.REQUISITION
      CONTAINER_COLUMNS_REQUISITION_ITEM = this.data.CONTAINER_COLUMNS.REQUISITION_ITEM
      CONTAINER_REQUISITION_ITEM = this.data.CONTAINERS.REQUISITION_ITEM
      CONTAINER_ITEM_TEXT = this.data.CONTAINERS.ITEM_TEXT
      CONTAINER_CONTRACT = this.data.CONTAINERS.CONTRACT
      REQUISITION_PARAMETER = {
        [commonLocators.CommonLabels.CONFIGURATION]: CONTAINER_REQUISITION.CONFIGURATION
      }
      REQUISTION_ITEM_PARAMETER = {
        [app.GridCells.MDC_MATERIAL_FK]: CONTAINER_REQUISITION_ITEM.MATERIAL_CODE,
        [app.GridCells.QUANTITY_SMALL]: CONTAINER_REQUISITION_ITEM.QUANTITY
      }
    });
    cy.preLoading(
      Cypress.env("adminUserName"),
      Cypress.env("adminPassword"),
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName")
    );
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
  });

  it('TC - Verify Creation Of Record in Requisition module', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.REQUISITIONS)
    _common.waitForLoaderToDisappear()
    _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETER)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  })

  it('TC - Create requisition item record and add material', function () {
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.setDefaultView(app.TabBar.MAIN)
      cy.wait(1000) //required wait to load page
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 1);
      _common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_REQUISITION_ITEM)
    });
    _common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
    _common.waitForLoaderToDisappear()
    _package.enterRecord_toCreateNewRequisitionItem(cnt.uuid.REQUISITIONITEMS, REQUISTION_ITEM_PARAMETER)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  })

  it('TC - Create item text ', function () {
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ITEM_TEXTS, app.FooterTab.ITEM_TEXTS, 2);
    });
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.ITEM_TEXTS)
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithCaret(cnt.uuid.ITEM_TEXTS, app.GridCells.PRC_TEXT_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINER_ITEM_TEXT.TEXT_TYPE)
    _materialPage.enterRecord_toSpacificationFormatedText(cnt.uuid.ITEM_TEXTS, app.GridCells.QL_EDITOR, CONTAINER_ITEM_TEXT.TEXT_INPUT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
  })

  it('TC - Create contract by wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT)
    _common.waitForLoaderToDisappear()
    cy.wait(2000) //required wait to load page
    _saleContractPage.enterRecord_createNewContract_fromRequisition(CONTAINER_CONTRACT.BUSINESS_PARTNER)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2);
    });
    _common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT)
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACT_ITEM_TEXTS, app.FooterTab.ITEM_TEXTS, 1);
    });
    _common.select_rowInContainer(cnt.uuid.CONTRACT_ITEM_TEXTS)
    _common.edit_dropdownCellWithCaret(cnt.uuid.CONTRACT_ITEM_TEXTS, app.GridCells.PRC_TEXT_TYPE_FK, "list", CONTAINER_ITEM_TEXT.TEXT_TYPE_1)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });


})
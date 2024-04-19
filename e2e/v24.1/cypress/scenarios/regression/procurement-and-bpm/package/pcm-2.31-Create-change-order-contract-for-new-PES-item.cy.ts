import { _common, _sidebar, _rfqPage, _mainView, _procurementPage, _controllingUnit, _validate, _estimatePage, _modalView, _procurementConfig, _package } from 'cypress/pages';
import { cnt, tile, app, sidebar, commonLocators, btn } from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { EST_HEADER } from 'cypress/pages/variables';

const allure = Cypress.Allure.reporter.getInterface();
// VARIABLES----------------------------------------------------------------

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-N" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells,
  REQUEST_FOR_QUOTE_PARAMETERS,
  UPDATE_ITEM_PRICE_QUOTE_PARAMETERS
let RESOURCE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells, CONTROLLING_UNIT_PARAMETERS: DataCells



let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let MODAL_UPDATE_ITEM_PRICE

let CONTAINERS_PACKAGE

let CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_RESOURCE, CONTAINERS_CONTROLLING_UNIT
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_PACKAGE_ITEM
let CONTAINER_COLUMNS_RESOURCE
let CONTAINER_COLUMNS_TOTALS;
let CONTAINERS_QUOTE_ITEM
let CONTAINER_COLUMNS_QUOTES
let CONTAINER_COLUMNS_QUOTE_ITEMS, CONTAINERS_CONTRACT, CONTAINER_COLUMNS_CONTRACT, CONTAINER_COLUMNS_CONTRACT_ITEM, CONTAINER_COLUMNS_PES_ITEMS
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
const CHNAGE_ORDER_DESC = "ORDERCHANGEDESC-" + Cypress._.random(0, 999);
const CHNAGE_DESC = "CHANGEDESC-" + Cypress._.random(0, 999);
const COUNTUNIT = "COUNTUNIT-" + Cypress._.random(0, 999);


allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM-2.31 | PCM-2.31-Create-change-order-contract-for-new-PES-item")
describe("PCM-2.31 | PCM-2.31-Create-change-order-contract-for-new-PES-item", () => {
  before(function () {
    cy.fixture('procurement-and-bpm/PCM-2.31-Create-change-order-contract-for-new-PES-item.json').then((data) => {
      this.data = data;
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE

      CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
      CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT

      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
      CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
      CONTAINERS_QUOTE_ITEM = this.data.CONTAINERS.QUOTE_ITEM
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
      CONTAINER_COLUMNS_PACKAGE_ITEM = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
      CONTAINER_COLUMNS_QUOTES = this.data.CONTAINER_COLUMNS.QUOTES
      CONTAINER_COLUMNS_QUOTE_ITEMS = this.data.CONTAINER_COLUMNS.QUOTE_ITEMS
      MODAL_UPDATE_ITEM_PRICE = this.data.MODAL.UPDATE_ITEM_PRICE

      CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
      CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
      CONTAINER_COLUMNS_CONTRACT_ITEM = this.data.CONTAINER_COLUMNS.CONTRACT_ITEM
      CONTAINER_COLUMNS_PES_ITEMS = this.data.CONTAINER_COLUMNS.PES_ITEMS

      CONTROLLING_UNIT_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: COUNTUNIT,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
        [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
      }
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }

      LINE_ITEM_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
      },


        RESOURCE_PARAMETERS = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
          [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
        }


      UPDATE_ITEM_PRICE_QUOTE_PARAMETERS = {
        [commonLocators.CommonKeys.CHECKBOX]: MODAL_UPDATE_ITEM_PRICE
      }
    });
    cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();

  });
  after(() => {
    cy.LOGOUT();
  });

  // ** Precondition adding updateprice items to wizard and controlling unit**//
  it("TC - adding controlling unit to project", function () {


    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MODULES);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.WIZARD).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MODULES, app.FooterTab.MODULES, 0);
    })
    _common.clear_subContainerFilter(cnt.uuid.MODULES);
    _common.clickOn_containerFooterButton(cnt.uuid.MODULES, commonLocators.CommonKeys.STATUS_BAR, btn.IconButtons.ICO_NEXT)
    _common.search_inSubContainer(cnt.uuid.MODULES, "PES")
    _common.openTab(app.TabBar.WIZARD).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MODULES, app.FooterTab.MODULES, 0);
    })
    _common.clear_subContainerFilter(cnt.uuid.WIZARD_GROUP);
    _common.search_inSubContainer(cnt.uuid.WIZARD_GROUP, "PES")

    _common.openTab(app.TabBar.WIZARD).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIZARD_TO_GROUP, app.FooterTab.WIZARD_TO_GROUP, 1);
    })
    _common.clear_subContainerFilter(cnt.uuid.WIZARD_TO_GROUP);
    _common.search_inSubContainer(cnt.uuid.WIZARD_TO_GROUP, "Create CO contract from PES variance");
    _procurementConfig.clickcheckbox_formcell(cnt.uuid.WIZARD_TO_GROUP)
    cy.SAVE();
    cy.REFRESH_CONTAINER();
    _common.waitForLoaderToDisappear()
    cy.wait(2000)//required wait

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER'))
    _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
      _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
    });
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
    _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()
  });

  it('TC - Create new estimate and line item', function () {

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);

    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
    cy.SAVE();
    _common.waitForLoaderToDisappear()

  });

  it('TC - Assign resource to the line item', function () {

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  })

  it('TC - Create material package and change status of package', function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
    cy.SAVE();
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
      _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    })
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION)
    _procurementConfig.changeProcurementConfiguration_FromWizard("Material", btn.ButtonText.YES);
    _common.waitForLoaderToDisappear()
    cy.wait(1000)//required wait

    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1)
      _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
    })
    _common.select_dataFromSubContainer(cnt.uuid.PACKAGEITEMS, CONTAINERS_RESOURCE.CODE)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
    cy.SAVE();

  });
  it('TC - Create Contract from package and change contract status', function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT)
    _package.create_ContractfromPackage(CONTAINERS_CONTRACT.BP)
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      cy.wait(1000)
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
    });
    cy.wait(1000)
    _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, COUNTUNIT)
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, "HS")
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
      _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_CONTRACT_ITEM);
    });
    _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
    _common.search_inSubContainer(cnt.uuid.ITEMSCONTRACT, CONTAINERS_RESOURCE.CODE)
    _common.edit_containerCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.QUANTITY)
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
    cy.SAVE();
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS)
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
  })

  it('TC - Create PES and add new item ', function () {

    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES)
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_PES_ITEMS)
    })
    _common.waitForLoaderToDisappear()
    cy.wait(1000)//required wait
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.ITEMS)
    _common.clear_subContainerFilter(cnt.uuid.ITEMS)
    _common.create_newRecord(cnt.uuid.ITEMS)
    _common.edit_dropdownCellWithInput(cnt.uuid.ITEMS, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.MATERIAL_CODE)
    _common.waitForLoaderToDisappear()
    _common.edit_containerCell(cnt.uuid.ITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.PRICE)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.REFRESH_SELECTED_ENTITIES()
    cy.wait(500)//required wait
    _common.search_inSubContainer(cnt.uuid.ITEMS, CONTAINERS_RESOURCE.MATERIAL_CODE)
    _common.minimizeContainer(cnt.uuid.ITEMS)

  });

  it('TC - Create CO contract from PES variance from PES', function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CO_CONTRACT_FOR_NEW_PES_ITEM)
    _procurementPage.Change_Order_Contract_New_Item(Cypress.env("PROJECT_NUMBER"), "Standard", CHNAGE_DESC, commonLocators.CommonKeys.DESIGN_CHANGE,
      commonLocators.CommonKeys.CHANGE_REQUEST, CHNAGE_ORDER_DESC)
    _common.waitForLoaderToDisappear()

  });

  it('TC - Verify contract name with Reference name  ', function () {

    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
      _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, CHNAGE_ORDER_DESC)
      _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.DESCRIPTION, CHNAGE_ORDER_DESC)
    })
  });

  it('TC - Verify the new added item Quantity ,price with contract item ', function () {

    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 3);
      _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_CONTRACT_ITEM)
      _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
      _common.search_inSubContainer(cnt.uuid.ITEMSCONTRACT, CONTAINERS_RESOURCE.MATERIAL_CODE)
      cy.wait(500)
      cy.REFRESH_SELECTED_ENTITIES()
      cy.wait(500)
      _common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, CONTAINERS_RESOURCE.MATERIAL_CODE)
      cy.wait(500)
      cy.REFRESH_SELECTED_ENTITIES()
      cy.wait(500)
      _common.assert_forNumericValues(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL, CONTAINERS_RESOURCE.PRICE)
    });
  })

})


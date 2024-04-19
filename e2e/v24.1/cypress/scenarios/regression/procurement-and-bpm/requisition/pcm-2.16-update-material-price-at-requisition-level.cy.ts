import { commonLocators, app, tile, sidebar, cnt, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _procurementContractPage, _estimatePage, _package, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "PRO" + Cypress._.random(0, 999);
const PRJ_NO_2 = "PRJ2" + Cypress._.random(0, 999);
const PRJ_NAME_2 = "PRO" + Cypress._.random(0, 999);
const EST_CODE = "EST-CODE" + Cypress._.random(0, 999)
const EST_DESCRIPTION = "EST-DESC" + Cypress._.random(0, 999)
const LINE_DESCRIPTION = "LINE_ITEM-1-" + Cypress._.random(0, 999)
const ITEMPRICE = Cypress._.random(0, 99);

let CONTAINERS_UNITS_OF_MEASUREMENT, CONTAINERS_MATERIAL_CATALOG_FILTER, CONTAINERS_MATERIAL_RECORDS, CONTAINERS_PROJECT, CONTAINERS_CONTRACT, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCES;

let CONTAINER_COLUMNS_UNITS_OF_MEASUREMENT, CONTAINER_COLUMNS_MATERIAL_RECORDS, CONTAINER_COLUMNS_CONTRACT, CONTAINER_COLUMNS_ITEMS, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCES, CONTAINERS_ITEMS;

let PROJECTS_PARAMETERS_1: DataCells, CONTRACT_PARAMETERS_1: DataCells, CONTRACT_PARAMETERS_2: DataCells, PROJECTS_PARAMETERS_2: DataCells, ESTIMATE_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS: DataCells, RESOURCE_PARAMETER_1;

let MODAL_UPDATE_ITEM_PRICE;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Requisition");
ALLURE.story("PCM- 2.16 | Update material price at requisition level");

describe("PCM- 2.16 | Update material price at requisition level", () => {

  before(function () {

    cy.fixture("procurement-and-bpm/pcm-2.16-update-material-price-at-requisition-level.json").then((data) => {
      this.data = data;
      CONTAINERS_UNITS_OF_MEASUREMENT = this.data.CONTAINERS.UNITS_OF_MEASUREMENT;
      CONTAINER_COLUMNS_UNITS_OF_MEASUREMENT = this.data.CONTAINER_COLUMNS.UNITS_OF_MEASUREMENT;
      CONTAINERS_MATERIAL_CATALOG_FILTER = this.data.CONTAINERS.MATERIAL_CATALOG_FILTER;
      CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS;
      CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS;
      CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT;
      PROJECTS_PARAMETERS_1 = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
        [commonLocators.CommonLabels.NAME]: PRJ_NAME,
        [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME
      }
      CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
      CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
      CONTRACT_PARAMETERS_1 = {
        [commonLocators.CommonLabels.CONFIGURATION]: CommonLocators.CommonKeys.MATERIAL_PO,
        [commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINERS_CONTRACT.BUSINESS_PARTNER[0]
      }
      CONTRACT_PARAMETERS_2 = {
        [commonLocators.CommonLabels.CONFIGURATION]: CommonLocators.CommonKeys.MATERIAL_PO,
        [commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINERS_CONTRACT.BUSINESS_PARTNER[0]
      }
      CONTAINERS_ITEMS = this.data.CONTAINERS.ITEMS;
      CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS
      PROJECTS_PARAMETERS_2 = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO_2,
        [commonLocators.CommonLabels.NAME]: PRJ_NAME_2,
        [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK
      }
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: EST_CODE,
        [app.GridCells.DESCRIPTION_INFO]: EST_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      };
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS;
      LINE_ITEM_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_DESCRIPTION,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY[0],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM[0]
      }
      CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCES;
      CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCES;
      RESOURCE_PARAMETER_1 = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
        [app.GridCells.CODE]: CONTAINERS_RESOURCES.MATERIAL[0]
      };
      MODAL_UPDATE_ITEM_PRICE = this.data.MODAL.UPDATE_ITEM_PRICE
    }).then(() => {
      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    });
  });

  after(() => {
    cy.LOGOUT();
  });

  it('TC - Precondition-Update unit of measurement module for factor, dimension and base measure', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, Sidebar.SideBarOptions.UNIT);
    _common.openTab(app.TabBar.UNIT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.UNITSOFMEASUREMENT, app.FooterTab.UNITOFMEASUREMENT)
      _common.setup_gridLayout(cnt.uuid.UNITSOFMEASUREMENT, CONTAINER_COLUMNS_UNITS_OF_MEASUREMENT)
    })
    _common.clear_subContainerFilter(cnt.uuid.UNITSOFMEASUREMENT)
    _common.search_inSubContainer(cnt.uuid.UNITSOFMEASUREMENT, CONTAINERS_UNITS_OF_MEASUREMENT.UNIT_DESCRIPTION[0])
    _common.select_rowHasValue(cnt.uuid.UNITSOFMEASUREMENT, CONTAINERS_UNITS_OF_MEASUREMENT.UNIT_DESCRIPTION[0])
    _common.edit_containerCell(cnt.uuid.UNITSOFMEASUREMENT, app.GridCells.LENGTH_DIMENSION, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_UNITS_OF_MEASUREMENT.LENGTH_DIMENSION[0])
    _common.edit_containerCell(cnt.uuid.UNITSOFMEASUREMENT, app.GridCells.FACTOR, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_UNITS_OF_MEASUREMENT.FACTOR[0])
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.UNITSOFMEASUREMENT)
    _common.search_inSubContainer(cnt.uuid.UNITSOFMEASUREMENT, CONTAINERS_UNITS_OF_MEASUREMENT.UNIT_DESCRIPTION[1])
    _common.select_rowHasValue(cnt.uuid.UNITSOFMEASUREMENT, CONTAINERS_UNITS_OF_MEASUREMENT.UNIT_DESCRIPTION[1])
    _common.edit_containerCell(cnt.uuid.UNITSOFMEASUREMENT, app.GridCells.LENGTH_DIMENSION, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_UNITS_OF_MEASUREMENT.LENGTH_DIMENSION[0])
    _common.set_cellCheckboxValue(cnt.uuid.UNITSOFMEASUREMENT, app.GridCells.IS_BASE, commonLocators.CommonKeys.CHECK)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  })

  it('TC - Create project and add material to contract', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS)
      _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
    })
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER)
    })
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_FILTER.MATERIAL_CATALOG_DESCRIPTION[0])
    _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS)
    })
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
    _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, CONTAINERS_MATERIAL_RECORDS.MATERIAL_DESCRIPTION[0])
    _common.select_rowInContainer(cnt.uuid.MATERIAL_RECORDS)
    _common.edit_dropdownCellWithCaret(cnt.uuid.MATERIAL_RECORDS, app.GridCells.UOM_FK, CommonLocators.CommonKeys.GRID, CONTAINERS_MATERIAL_RECORDS.UOM[0])
    cy.SAVE()
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
    _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, CONTAINERS_MATERIAL_RECORDS.MATERIAL_DESCRIPTION[1])
    _common.select_rowInContainer(cnt.uuid.MATERIAL_RECORDS)
    _common.edit_dropdownCellWithCaret(cnt.uuid.MATERIAL_RECORDS, app.GridCells.UOM_FK, CommonLocators.CommonKeys.GRID, CONTAINERS_MATERIAL_RECORDS.UOM[1])
    _common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_RECORDS, app.GridCells.NEUTRAL_MATERIAL_CATALOG_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOG_FILTER.MATERIAL_CATALOG_DESCRIPTION[0])
    _common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_RECORDS, app.GridCells.MDC_MATERIAL_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.MATERIAL_DESCRIPTION[0])
    cy.SAVE()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.create_newRecord(cnt.uuid.PROJECTS);
    _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS_1);
    cy.SAVE()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
    cy.SAVE()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME)
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
    _procurementContractPage.enterRecord_createNewProcurementContract_fromModal(CONTRACT_PARAMETERS_1)
    cy.SAVE()
    _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("CONTRACT1", $ele1.text())
      cy.log(Cypress.env("CONTRACT1"))
    })
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 1)
      _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_ITEMS)
      _common.set_columnAtTop([CONTAINER_COLUMNS_ITEMS.price, CONTAINER_COLUMNS_ITEMS.mdcmaterialfk], cnt.uuid.ITEMSCONTRACT)
    })
    _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
    _common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
    _common.edit_dropdownCellWithInput(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.MATERIAL_DESCRIPTION[0])
    _common.select_activeRowInContainer(cnt.uuid.ITEMSCONTRACT)
    _common.edit_containerCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, ITEMPRICE)
    _common.select_activeRowInContainer(cnt.uuid.ITEMSCONTRACT)
    cy.SAVE()
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS)
    })
    _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
    _procurementContractPage.enterRecord_createNewProcurementContract_fromModal(CONTRACT_PARAMETERS_2)
    cy.SAVE()
    _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("CONTRACT2", $ele1.text())
      cy.log(Cypress.env("CONTRACT2"))
    })
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS)
    })
    _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
    _common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
    _common.edit_dropdownCellWithInput(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.MATERIAL_DESCRIPTION[1])
    _common.select_activeRowInContainer(cnt.uuid.ITEMSCONTRACT)
    cy.SAVE()
  });

  it('TC - Create second project and create new estimate', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.create_newRecord(cnt.uuid.PROJECTS);
    _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS_2);
    cy.SAVE()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
    cy.SAVE()
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE)
    })
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE)
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    cy.SAVE()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
  });

  it("TC - Create new line item record and add material resource", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS)
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    })
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
    cy.SAVE();
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES)
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
    })
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER_1);
    cy.SAVE();
  });

  it('TC - Create material package include cost code checkbox using wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
    _estimatePage.enterRecord_toCreatePackage_wizard(CommonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
  });

  it('TC - Change material package status and create requisition', function () {
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
    })
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME)
    _common.select_rowInSubContainer(cnt.uuid.PACKAGE)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS)
    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
    })
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
    _common.select_rowInSubContainer(cnt.uuid.REQUISITIONS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
  });

  it('TC - Update item price from wizard and verify scope ,price version checkbox and price version look up is correctly selected', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE)
    _package.enterRecordTo_Update_Item_price_wizard(MODAL_UPDATE_ITEM_PRICE.SCOPE[0], MODAL_UPDATE_ITEM_PRICE.PRICE_VERSION[0], ITEMPRICE)
  });

  it('TC - Verify neutral material filtered based on material module', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE)
    _package.verify_Neutral_Material_In_Modal_Are_Reflected_From_MDC_MATERIAL(MODAL_UPDATE_ITEM_PRICE.SCOPE[0], MODAL_UPDATE_ITEM_PRICE.CHECKBOX[0], CONTAINERS_RESOURCES.MATERIAL[1])
    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
  });

  it('TC - Verify PRC_ITEM are reflected from all valid quotation or contract or MDC_MATERIAL', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE)
    _package.verify_Material_In_Modal_Are_Reflected_From_CON_MDC_MATERIAL(MODAL_UPDATE_ITEM_PRICE.SCOPE[0], CONTAINERS_RESOURCES.MATERIAL[0], 1)
    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS)
      _common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_ITEMS)
    })
    _common.maximizeContainer(cnt.uuid.REQUISITIONITEMS)
    _common.select_dataFromSubContainer(cnt.uuid.REQUISITIONITEMS, CONTAINERS_RESOURCES.MATERIAL[0])
    _common.getText_fromCell(cnt.uuid.REQUISITIONITEMS, app.GridCells.PRICE_UNIT).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("PRICEUNIT", $ele1.text())
      cy.log(Cypress.env("PRICEUNIT"))
    })
    _common.getText_fromCell(cnt.uuid.REQUISITIONITEMS, app.GridCells.PRICE_EXTRA).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("EXTRAS", $ele1.text())
      cy.log(Cypress.env("EXTRAS"))
    })
    _common.getText_fromCell(cnt.uuid.REQUISITIONITEMS, app.GridCells.PRICE_SMALL).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("PRICE", $ele1.text())
      cy.log(Cypress.env("PRICE"))
    })
    _common.getText_fromCell(cnt.uuid.REQUISITIONITEMS, app.GridCells.DISCOUNT).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("DISCOUNT", $ele1.text())
      cy.log(Cypress.env("DISCOUNT"))
    })
    _common.getText_fromCell(cnt.uuid.REQUISITIONITEMS, app.GridCells.FACTOR_PRICE_UNIT).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("FACTOR", $ele1.text())
      cy.log(Cypress.env("FACTOR"))
    })
    _common.minimizeContainer(cnt.uuid.REQUISITIONITEMS)
  });

  it('TC - Verify unit rate and variance', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE)
    _package.verify_Unit_Rate(Cypress.env("PRICE"), Cypress.env("EXTRAS"), Cypress.env("PRICEUNIT"), Cypress.env("FACTOR"), Cypress.env("DISCOUNT"), PRJ_NO_2)
    _package.verify_Variance(Cypress.env("PRICE"), PRJ_NO)
    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
  })

  it('TC - Verify converted unit rate', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE)
    _package.verify_ConvertedUnitRate(CONTAINERS_UNITS_OF_MEASUREMENT.FACTOR[0], Cypress.env("CONTRACT2"))
    _validate.verify_isRecordAdditionOfTwoValuesInModal(Cypress.env("CONTRACT1"), Cypress.env("PRICE"), Cypress.env("EXTRAS"), app.GridCells.CONVERTED_UNIT_RATE)
    _common.getText_fromCell_fromModal(app.GridCells.DATE).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("STARTDATE", $ele1.text())
      cy.log(Cypress.env("STARTDATE"))
    })
    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
  });

  it('TC - Verify contract reflected correct if filtered based on creation date', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE)
    _package.verify_StartDateFilter(MODAL_UPDATE_ITEM_PRICE.SCOPE[0], Cypress.env("STARTDATE"))
    _common.assert_cellDataByContent_fromModal(app.GridCells.SOURCE_CODE_DESC, Cypress.env("CONTRACT1"))
    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE)
    _package.verify_StartDateFilter(MODAL_UPDATE_ITEM_PRICE.SCOPE[0], _common.getDate(CommonLocators.CommonKeys.INCREMENTED_SMALL, 5))
    _validate.verify_modalTextShouldNotExistInModalCell(app.GridCells.SOURCE_CODE_DESC, Cypress.env("CONTRACT1"))
    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
  });

  it('TC - Verify scope: select option "selected item(s)"', function () {
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS)
    })
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
    _common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.MATERIAL[0])
    cy.SAVE()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, CONTAINERS_ITEMS.MATERIAL[1])
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE)
    _package.verify_Material_In_Modal_Are_Reflected_From_CON_MDC_MATERIAL(MODAL_UPDATE_ITEM_PRICE.SCOPE[1], CONTAINERS_RESOURCES.MATERIAL[0], 2)
    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
  });

})
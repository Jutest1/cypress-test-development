import { app, commonLocators, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _boqPage, _estimatePage, _package, _procurementContractPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = 'BOQ-DESC-' + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC = 'BOQ-STRC-DESC-' + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC_2 = 'BOQ-STRC-DESC2-' + Cypress._.random(0, 999);
const ESTIMATE_CODE = 'E-' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'E1.48-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "Line-01-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_2 = "Line-02-" + Cypress._.random(0, 999);
const CHANGE_01 = "Pro-Desc" + Cypress._.random(0, 99);

let CONTAINERS_BOQ_STRUCTURE, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEMS, CONTAINERS_RESOURCE, CONTAINERS_CONTRACT, CONTAINERS_PES_BOQ;

let CONTAINER_COLUMNS_BOQ, CONTAINER_COLUMNS_BOQ_STRUCTURE, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEMS, CONTAINER_COLUMNS_RESOURCE, CONTAINER_COLUMNS_PES_BOQ_STRUCTURE, CONTAINER_COLUMNS_PES_BOQ, CONTAINER_COLUMNS_CONTRACT, CONTAINER_COLUMNS_PES, CONTAINER_COLUMNS_REQUISITION, CONTAINER_COLUMNS_PACKAGE;

let BOQS_PARAMETERS: DataCells, BOQS_STRUCTURE_PARAMETERS: DataCells, BOQS_STRUCTURE_PARAMETERS_2: DataCells, ESTIMATE_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS_2: DataCells, RESOURCE_PARAMETERS: DataCells;

let MODAL_CREATE_UPDATE_BOQ_PACKAGE, MODAL_CREATE_CONTRACT;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Contract");
ALLURE.story("PCM- 1.48 | Update a PES from a change order of an existing approved contract, using selection 'Update to specified PES' ");

describe("PCM- 1.48 | Update a PES from a change order of an existing approved contract, using selection 'Update to specified PES' ", () => {

  before(function () {

    cy.fixture("pcm/pcm-1.48-Update-PES-from-change-order-of-existing-approved-contract-using-selection-Update-to-specified-PES.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
      BOQS_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      };
      BOQS_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
        [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0]
      };
      BOQS_STRUCTURE_PARAMETERS_2 = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_DESC_2,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[1],
        [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0]
      };
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      };
      CONTAINERS_LINE_ITEMS = this.data.CONTAINERS.LINE_ITEMS;
      CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEMS
      LINE_ITEM_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEMS.QUANTITY[0],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEMS.UOM[0],
        [app.GridCells.BOQ_ITEM_FK]: BOQ_STRUCT_DESC
      };
      LINE_ITEM_PARAMETERS_2 = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_2,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEMS.QUANTITY[0],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEMS.UOM[0],
        [app.GridCells.BOQ_ITEM_FK]: BOQ_STRUCT_DESC_2
      };
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0]
      };
      MODAL_CREATE_UPDATE_BOQ_PACKAGE = this.data.MODAL.CREATE_UPDATE_BOQ_PACKAGE
      MODAL_CREATE_CONTRACT = this.data.MODAL.CREATE_CONTRACT
      CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
      CONTAINERS_PES_BOQ = this.data.CONTAINERS.PES_BOQ;
      CONTAINER_COLUMNS_PES_BOQ = this.data.CONTAINER_COLUMNS.PES_BOQ
      CONTAINER_COLUMNS_PES_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.PES_BOQ_STRUCTURE;
      CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
      CONTAINER_COLUMNS_PES = this.data.CONTAINER_COLUMNS.PES
      CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
      CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
    }).then(() => {
      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0)
      })
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
    })
  })

  it("TC - Create BOQ header & BOQ Structure in first Project", function () {
    _common.openTab(app.TabBar.BOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ);
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQS_PARAMETERS);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE);
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQS_STRUCTURE_PARAMETERS);
    cy.SAVE();
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQS_STRUCTURE_PARAMETERS_2);
    cy.SAVE();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
  });

  it("TC - Create Estimate header", function () {
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
    cy.REFRESH_CONTAINER();
  })

  it("TC - Create line item assign BOQ and add resource to it", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.RESOURCES, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
    cy.SAVE()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    cy.SAVE();
  })

  it("TC -Create BOQ Package using wizard Create/Update BoQ Package and change package status", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
    _package.enterRecord_toCreateBoQPackage_FromWizard(MODAL_CREATE_UPDATE_BOQ_PACKAGE.CREATE_UPDATE_PACKAGE_CASE[0], CommonLocators.CommonLabels.ENTIRE_ESTIMATE, CommonLocators.CommonKeys.PROJECT_BOQ, MODAL_CREATE_UPDATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE[0]);
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
      _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
    });
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE);
    _common.select_rowInContainer(cnt.uuid.PACKAGE);
    _package.changeStatus_ofPackage_inWizard();
  });

  it('TC - Create requisition by wizard and change requisition status', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 2);
      _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
    _common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED)
  });

  it('TC - Create contract and change status of the contract', function () {
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 2);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT)
    _package.create_ContractfromPackage(MODAL_CREATE_CONTRACT.BUSINESS_PARTNER)
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
    });
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT.CLERK_NAME)
    cy.SAVE()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS)
    _common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED)
  });

  it('TC - Create PES ,update BoQ quantity in PES and change PES status', function () {
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0);
      _common.setup_gridLayout(cnt.uuid.HEADERS, CONTAINER_COLUMNS_PES)
    })
    _common.clear_subContainerFilter(cnt.uuid.HEADERS)
    _common.select_rowInContainer(cnt.uuid.HEADERS)
    _common.openTab(app.TabBar.PESBOQ).then(() => {
      _common.setDefaultView(app.TabBar.PESBOQ)
      _common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_6)
      _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQs, 3);
      _common.setup_gridLayout(cnt.uuid.PES_ITEMS, CONTAINER_COLUMNS_PES_BOQ)
    })
    _common.clear_subContainerFilter(cnt.uuid.PES_ITEMS)
    _common.select_rowInContainer(cnt.uuid.PES_ITEMS)
    _common.edit_dropdownCellWithInput(cnt.uuid.PES_ITEMS, app.GridCells.CONTROLLING_UNIT_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PES_BOQ.UPDATED_CONTROLLING_UNIT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PESBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.PES_BOQS_STRUCTURE, CONTAINER_COLUMNS_PES_BOQ_STRUCTURE)
    });
    _common.clickOn_cellHasIcon(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.edit_containerCell(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.PES_QUANTITY[0])
    cy.SAVE()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS)
    _common.changeStatus_fromModal(CommonLocators.CommonKeys.ACCEPTION)
  });

  it("TC - Add new line item assign second BOQ , project change and add resource to it", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    cy.SAVE()
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 1);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_FILTER_CURRENT_VERSION)
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.search_inSubContainer(cnt.uuid.ESTIMATE, ESTIMATE_DESCRIPTION)
    _common.select_rowHasValue(cnt.uuid.ESTIMATE, ESTIMATE_DESCRIPTION)
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS);
      _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEMS.estqtyrelboqfk, CONTAINER_COLUMNS_LINE_ITEMS.estqtytelaotfk, CONTAINER_COLUMNS_LINE_ITEMS.quantity, CONTAINER_COLUMNS_LINE_ITEMS.prjchangefk, CONTAINER_COLUMNS_LINE_ITEMS.boqitemfk, CONTAINER_COLUMNS_LINE_ITEMS.descriptioninfo], cnt.uuid.ESTIMATE_LINEITEMS)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_2)
    cy.SAVE()
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION_2)
    _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _estimatePage.edit_LineItem_ProjectChange(CONTAINERS_LINE_ITEMS.QUANTITY[0], CommonLocators.CommonKeys.FROM_STRUCTURE, CommonLocators.CommonKeys.FROM_STRUCTURE, Cypress.env('PROJECT_NUMBER'), CHANGE_01, CommonLocators.CommonKeys.DESIGN_CHANGE)
    _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRJ_CHANGE_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CHANGE_01)
    _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    cy.SAVE();
    _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
  })

  it("TC -Update BOQ Package using wizard Create/Update BoQ Package", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
    _package.enterRecord_toCreateBoQPackage_FromWizard(MODAL_CREATE_UPDATE_BOQ_PACKAGE.CREATE_UPDATE_PACKAGE_CASE[1], CommonLocators.CommonLabels.RADIO_HIGHLETED_LINE_ITEM, CommonLocators.CommonKeys.PROJECT_BOQ, '', '', MODAL_CREATE_UPDATE_BOQ_PACKAGE.UPDATE_EXISTED_PACKAGE);
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
      _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
    });
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE);
    _common.openTab(app.TabBar.BOQDETAILS).then(function () {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
    })
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE, BOQ_STRUCT_DESC_2)
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.QUANTITY[0])
  });

  it('TC - Create requisition by wizard change requisition status', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
    _package.createRequisition_FromWizard("Create change order requisition based on below selected base requisition", 0, CHANGE_01)
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 2);
      _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
    });
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
    _common.openTab(app.TabBar.REQUISITIONBOQS).then(function () {
      _common.setDefaultView(app.TabBar.REQUISITIONBOQS)
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
    })
    _common.maximizeContainer(cnt.uuid.REQUISITIONBOQSTRUCTURE)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, CommonLocators.CommonKeys.POSITION)
    _common.assert_forNumericValues(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.QUANTITY[0])
    _common.minimizeContainer(cnt.uuid.REQUISITIONBOQSTRUCTURE)
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 2);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
    _common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED)
  });

  it('TC - Create change order contract and change status of the contract', function () {
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 2);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT)
    _package.create_ContractfromPackage(MODAL_CREATE_CONTRACT.BUSINESS_PARTNER)

    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
    });
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT.CLERK_NAME)
    cy.SAVE()

    _common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(function () {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
    })
    _common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, BOQ_STRUCT_DESC_2)
    _common.assert_forNumericValues(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.QUANTITY[1])
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS)
    _common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED)
    cy.SAVE()
  });

  it('TC - Create PES verify BoQ quantity in PES', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES)
    _procurementContractPage.verify_CreatePESForExistingContractandGoToPES()
    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0);
      _common.setup_gridLayout(cnt.uuid.HEADERS, CONTAINER_COLUMNS_PES)
    })
    _common.clear_subContainerFilter(cnt.uuid.HEADERS)
    _common.openTab(app.TabBar.PESBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQS, 0);
      _common.setup_gridLayout(cnt.uuid.PES_ITEMS, CONTAINER_COLUMNS_PES_BOQ)
    })
    _common.select_rowInContainer(cnt.uuid.PES_ITEMS)
    _common.openTab(app.TabBar.PESBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 3);
    });
    _common.clear_subContainerFilter(cnt.uuid.PES_BOQS_STRUCTURE)
    cy.wait(500).then(() => {
      _common.clickOn_cellHasIcon(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    })
    _common.assert_forNumericValues(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.QUANTITY[1])
  })

})
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _validate } from "cypress/pages";
import { app, tile, cnt, commonLocators, btn, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import { EST_HEADER } from "cypress/pages/variables";
import Buttons from "cypress/locators/buttons";
const allure = Cypress.Allure.reporter.getInterface();

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const BID_DESC = 'BID-DESC-' + Cypress._.random(0, 999);
const CONTRACT_DESC = 'CONTRACT-DESC-' + Cypress._.random(0, 999);
const BILL_DESC = 'BILL-DESC-' + Cypress._.random(0, 999);

let BOQ_PARAMETERS: DataCells,
  BOQ_STRUCTURE_PARAMETERS: DataCells,
  ESTIMATE_PARAMETERS: DataCells,
  RESOURCE_PARAMETERS: DataCells,
  GENERATE_LINE_ITEMS_PARAMETERS: DataCells,
  BILL_PARAMETER: DataCells,
  MODAL_UPDATE_LINE_ITEM_QUANTITIES_PARAMETERS: DataCells,
  CONTAINER_COLUMNS_BOQS,
  CONTAINERS_BOQ_STRUCTURE,
  CONTAINER_COLUMNS_BOQ_STRUCTURE,
  CONTAINERS_ESTIMATE,
  CONTAINER_COLUMNS_ESTIMATE,
  CONTAINERS_RESOURCE,
  CONTAINER_COLUMNS_RESOURCE,
  CONTAINER_COLUMNS_LINE_ITEM,
  CONTAINERS_LINE_ITEM,
  CONTAINER_BID,
  CONTAINER_CONTRACT,
  MODAL_UPDATE_LINE_ITEM_QUANTITIES,
  CONTAINER_COLUMNS_LINE_ITEM_QUANTITY

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 3.4 | Update Line item quantities From Bill - Recording level BoQ item");

describe("EST- 3.4 | Update Line item quantities From Bill - Recording level BoQ item", () => {
  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("estimate/est-3.4-Scenario_Update_LineItem_Qnty_From_Bill_ItemLevel.json").then((data) => {
      this.data = data;
      this.data = data;
      CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQSTRUCTURE
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE
      BOQ_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      }
      BOQ_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
        [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
      }
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
      }
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM

      GENERATE_LINE_ITEMS_PARAMETERS = {
        [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
      }
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      CONTAINER_BID = this.data.CONTAINERS.BID
      CONTAINER_CONTRACT = this.data.CONTAINERS.CONTRACT
      BILL_PARAMETER = {
        [commonLocators.CommonLabels.BILL_TYPE]: commonLocators.CommonKeys.PROGRESS_INVOICE,
        [commonLocators.CommonKeys.VALUE]: [commonLocators.CommonKeys.CHECK]
      }
      MODAL_UPDATE_LINE_ITEM_QUANTITIES = this.data.MODAL.UPDATE_LINE_ITEM_QUANTITIES
      MODAL_UPDATE_LINE_ITEM_QUANTITIES_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]: [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE, commonLocators.CommonLabels.UPDATE_BILLING_QUANTITY],
        [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: MODAL_UPDATE_LINE_ITEM_QUANTITIES.SELECT_ESTIMATE_SCOPE,
        [commonLocators.CommonLabels.UPDATE_BILLING_QUANTITY]: MODAL_UPDATE_LINE_ITEM_QUANTITIES.UPDATE_BILLING_QUANTITY
      }
      CONTAINER_COLUMNS_LINE_ITEM_QUANTITY = this.data.CONTAINER_COLUMNS.LINE_ITEM_QUANTITY

      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });
  });

  // after(() => {
  //   cy.LOGOUT();
  // });

  it("TC - Create BoQ header and BoQ structure", function () {
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
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
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.waitForLoaderToDisappear()
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
      _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create estimate header", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
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

  it("TC - Generate boq line item", function () {
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
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create resources for line item", function () {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.maximizeContainer(cnt.uuid.RESOURCES)
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  })

  it("TC - Create new sales bid", function () {
    _bidPage.createBidRecord_byWizardOption(BID_DESC, CONTAINER_BID.BUSINESS_PARTNER, CONTAINER_BID.SOURCE);
    _common.openTab(app.TabBar.BIDBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE,)
    })
    _bidPage.verifyBidQuantity_inBoQStructure(CONTAINERS_BOQ_STRUCTURE.QUANTITY);
    _common.waitForLoaderToDisappear()
    _bidPage.changeStatus_BidRecord();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create Sales Contract using Wizard option", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT)
    _saleContractPage.create_contract_fromWizard(CONTRACT_DESC);
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"))
    _common.edit_dropdownCellWithInput(cnt.uuid.CONTRACTS, app.GridCells.CUSTOMER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_CONTRACT.CUSTOMER)
    _common.openTab(app.TabBar.CONTRACTBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACTSALES_BOQS, app.FooterTab.BOQs, 0);
      _common.openTab(app.TabBar.CONTRACTS)
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
      _saleContractPage.changeStatus_ContractRecord();
    });
  });

  it("TC - Create Bill from wizard", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BILL)
    _billPage.create_bill_fromWizard(BILL_PARAMETER)
    _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_BILL)
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.setDefaultView(app.TabBar.BILLS)
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
      _common.clear_subContainerFilter(cnt.uuid.BILLS)
      _common.openTab(app.TabBar.APPLICATIONS)
      _common.setDefaultView(app.TabBar.APPLICATIONS)
      _common.select_tabFromFooter(cnt.uuid.BILL_BOQ, app.FooterTab.BOQs, 0);
      _common.select_rowInContainer(cnt.uuid.BILL_BOQ)
      _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
      _common.clickOn_cellHasValue(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC)
      _common.edit_containerCell(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UPDATE_QUANTITY)
      cy.SAVE()
      cy.wait(1000)//required wait to load page
      _common.openTab(app.TabBar.BILLS)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BILL_STATUS)
      _common.changeStatus_fromModal(commonLocators.CommonKeys.BPA_BILLED)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
      cy.wait(2000)//required wait to load page
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
      _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      });
      _common.filterCurrentEstimate(cnt.uuid.ESTIMATE, "noFilter")
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
      _common.search_inSubContainer(cnt.uuid.ESTIMATE, ESTIMATE_DESCRIPTION)
      _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE, app.GridCells.DESCRIPTION_INFO, ESTIMATE_DESCRIPTION, EST_HEADER)
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_LINE_ITEM_QUANTITIES)
      _common.waitForLoaderToDisappear()
      _estimatePage.update_lineItem_fromWizard(MODAL_UPDATE_LINE_ITEM_QUANTITIES_PARAMETERS);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.LINE_ITEM_QUANTITIES, app.FooterTab.LINE_ITEM_QUANTITY);
        _common.setup_gridLayout(cnt.uuid.LINE_ITEM_QUANTITIES, CONTAINER_COLUMNS_LINE_ITEM_QUANTITY)
      });
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.select_rowInSubContainer(cnt.uuid.LINE_ITEM_QUANTITIES)
      _validate.verify_LineItemQuantities(CONTAINERS_BOQ_STRUCTURE.UPDATE_QUANTITY)
    });
  });

});

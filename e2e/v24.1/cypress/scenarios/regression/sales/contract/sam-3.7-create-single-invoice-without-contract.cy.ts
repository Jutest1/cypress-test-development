import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _salesPage, _validate } from "cypress/pages";
import { app, tile, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import CommonLocators from "cypress/locators/common-locators";
const allure = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-Test-" + Cypress._.random(0, 999);
const BILL_DESC = "BILL_DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let MODAL_GENERATE_BUDGET;
let DJC_BUDGET_PARAMETERS: DataCells
let PROJECTS_PARAMETERS: DataCells;
let BOQ_PARAMETERS: DataCells
let BOQ_STRUCTURE_PARAMETERS: DataCells
let CONTAINERS_DATA_TYPE
let CONTAINER_COLUMNS_DATA_TYPE
let CONTAINERS_DATA_RECORD
let CONTAINER_COLUMNS_BOQS;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
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
let BILL_PARAMETERS: DataCells
let CONTAINERS_BILL;
let CONTAINER_COLUMNS_BILL_BOQS;
let CONTAINER_COLUMNS_BILLS;
allure.epic("SALES");
allure.feature("Sales-Contract");
allure.story("SAM- 3.7 | Create Single Invoice without Contract");
describe("SAM- 3.7 | Create Single Invoice without Contract", () => {


  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("sam/sam-3.7-create-single-invoice-without-contract.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQSTRUCTURE
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE
      CONTAINER_COLUMNS_BIDS = this.data.CONTAINER_COLUMNS.BIDS
      MODAL_CREATE_BID = this.data.MODALS.CREATE_BID
      MODAL_GENERATE_BUDGET = this.data.MODALS.GENERATE_BUDGET;

      CONTAINERS_BILL = this.data.CONTAINERS.BILL
      CONTAINER_COLUMNS_BILL_BOQS = this.data.CONTAINER_COLUMNS.BILL_BOQS
      CONTAINER_COLUMNS_BILLS = this.data.CONTAINER_COLUMNS.BILLS
      CONTAINERS_DATA_TYPE=this.data.CONTAINERS.DATA_TYPE
      CONTAINER_COLUMNS_DATA_TYPE=this.data.CONTAINER_COLUMNS.DATA_TYPE
      CONTAINERS_DATA_RECORD=this.data.CONTAINERS.DATA_RECORD

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
      };
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM

      GENERATE_LINE_ITEMS_PARAMETERS = {
        [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
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
      DJC_BUDGET_PARAMETERS = {
        [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE,
        [commonLocators.CommonLabels.BUDGET_FROM]: MODAL_GENERATE_BUDGET.BUDGET_FROM,
        [commonLocators.CommonLabels.X_FACTOR]: MODAL_GENERATE_BUDGET.X_FACTOR,
        [commonLocators.CommonKeys.INDEX]: MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE_INDEX,
        [commonLocators.CommonKeys.RADIO_INDEX]: MODAL_GENERATE_BUDGET.BUDGET_FROM_INDEX
      }
       BILL_PARAMETERS = {
        [commonLocators.CommonLabels.BILL_TYPE]: CONTAINERS_BILL.BILL_TYPE,
        [commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINERS_BILL.BUSINESS_PARTNER,
        [commonLocators.CommonLabels.DESCRIPTION]: BILL_DESC,
        [commonLocators.CommonLabels.BOQ_SOURCE]: CONTAINERS_BILL.BOQ_SOURCE,
        [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_DESC
      }
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
  it("TC - Precondition : Select Single Invoice And Uncheck Checkbox for Is Progress", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.CUSTOMIZING);
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.openTab(app.TabBar.MASTERDATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES)
     // _common.setup_gridLayout(cnt.uuid.DATA_TYPES, DATATYPE_Column)
    })
    _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
    _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_RECORD.BILL_TYPE)
    _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_RECORD.BILL_TYPE)
    _common.openTab(app.TabBar.MASTERDATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
  })
    _common.waitForLoaderToDisappear()
    cy.wait(1000) //required wait
    _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, CONTAINERS_DATA_RECORD.SINGLE_INVOICE);
    _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_PROGRESS, CommonLocators.CommonKeys.UNCHECK)
    _common.waitForLoaderToDisappear()
    cy.SAVE()

  })
  it("TC - Create new BoQ record", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
    _common.waitForLoaderToDisappear()
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
  it("TC - Create new estimate record", function () {
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
  it("TC - Verify generate line item wizards option", function () {
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
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL).then(($FINALPRICE) => {
      Cypress.env("COST_TOTAL", $FINALPRICE.text())
    })
    _common.minimizeContainer(cnt.uuid.RESOURCES)
  });

  it("TC - Create new sales bid", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
    _common.waitForLoaderToDisappear()
    _bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.MAIN_BID, BID_DESC, MODAL_CREATE_BID.BUSINESS_PARTNER, MODAL_CREATE_BID.STRUCTURE_TYPE);

    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
      _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BIDS)
      _common.clear_subContainerFilter(cnt.uuid.BIDS)
    })

    _common.openTab(app.TabBar.BIDBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDBOQS, app.FooterTab.BOQs, 0);
      _common.select_rowInSubContainer(cnt.uuid.BIDBOQS)
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE, 1);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREBID, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREBID, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTUREBID, app.GridCells.FINAL_PRICE_SMALL, Cypress.env("COST_TOTAL"))
    _bidPage.verifyBidQuantity_inBoQStructure(CONTAINERS_LINE_ITEM.QUANTITY);
    cy.SAVE()
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
      _common.clear_subContainerFilter(cnt.uuid.BIDS)
    })
    _common.select_rowInContainer(cnt.uuid.BIDS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create Single Invoice Without Contract", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.setDefaultView(app.TabBar.BILLS)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
      _common.setup_gridLayout(cnt.uuid.BILLS, CONTAINER_COLUMNS_BILLS)
    })
    _common.create_newRecord(cnt.uuid.BILLS);
    _common.waitForLoaderToDisappear()
    cy.wait(1000)
    _billPage.enterRecord_toCreateBillRecord(BILL_PARAMETERS)
    cy.wait(1000)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.APPLICATIONS).then(() => {
      _common.setDefaultView(app.TabBar.APPLICATIONS)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BILL_BOQ, app.FooterTab.BOQS, 0);
      _common.setup_gridLayout(cnt.uuid.BILL_BOQ, CONTAINER_COLUMNS_BILL_BOQS)
    })
    _common.select_rowInContainer(cnt.uuid.BILL_BOQ)
    _common.openTab(app.TabBar.APPLICATIONS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
      _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    })
    _common.clickOn_cellHasIcon(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.edit_containerCell(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BILL.BILL_BOQ_QUANTITY)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasIcon(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.getText_fromCell(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL).then(($FINALPRICE) => {
      Cypress.env("BILL_Quantity", $FINALPRICE.text())
      cy.log(Cypress.env("BILL_Quantity"))
    })
    _common.getText_fromCell(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.PRICE_SMALL).then(($FINALPRICE) => {
      Cypress.env("BILL_UnitRate", $FINALPRICE.text())
      cy.log(Cypress.env("BILL_UnitRate"))
    })
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
    });
    _common.getText_fromCell(cnt.uuid.BILLS, app.GridCells.AMOUNT_NET).then(($FINALPRICE) => {
      Cypress.env("BILL_Netamount", $FINALPRICE.text())
      cy.log(Cypress.env("BILL_Netamount"))
    })

  })
  it("TC - Verify Final Price of Bill BoQ", function () {
    _common.openTab(app.TabBar.APPLICATIONS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILL_BOQ, app.FooterTab.BOQs, 0)
    });
    _common.assert_cellData_insideActiveRow(cnt.uuid.BILL_BOQ, app.GridCells.FINAL_PRICE_SMALL, Cypress.env("BILL_Netamount"), app.GridCells.BOQ_ROOT_ITEM)
    _common.openTab(app.TabBar.APPLICATIONS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1)
    });
    _common.clickOn_cellHasIcon(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.BILLBOQSTRUCTURE, Cypress.env("BILL_Quantity"), Cypress.env("BILL_UnitRate"), app.GridCells.FINAL_PRICE_SMALL)
    _common.waitForLoaderToDisappear()
  })

  after(() => {
    cy.LOGOUT();
  });
});

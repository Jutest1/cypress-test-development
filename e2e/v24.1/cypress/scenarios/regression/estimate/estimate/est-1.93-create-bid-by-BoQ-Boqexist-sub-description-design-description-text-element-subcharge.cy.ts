import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { _bidPage, _boqPage, _common, _estimatePage, _modalView } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_STRCU_DESC = "BOQ-STRC-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);
const COST_TOTAL = "COST_TOTAL"
const BOQ_REFERENCE = "BOQ_REFERENCE"
const AQ_QUANTITY = "AQ_QUANTITY"

let CONTAINERS_ESTIMATE;
let CONTAINERS_BOQ_STRUCTURE;
let ESTIMATE_PARAMETERS: DataCells;
let BOQ_PARAMETERS: DataCells;
let BOQS_STRUCTURE_PARAMETERS: DataCells;
let GENERATE_LINE_ITEMS_PARAMETERS: DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let UPDATE_ESTIMATE_PARAMETER: DataCells
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_RESOURCE
let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE
let CONTAINERS_DATA_TYPE
let CONTAINER_COLUMNS_DATA_TYPE
let CONTAINER_COLUMNS_DATA_RECORD
let CONTAINERS_DATA_RECORD
let MODAL_UPDATE_ESTIMATE_WIZARD
let CONTAINER_COLUMNS_BID
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.93 | Create bid by BoQ : Boq  exist sub description, design description, text element , subcharge");

describe("EST- 1.93 | Create bid by BoQ : Boq  exist sub description, design description, text element , subcharge", () => {
  before(function () {
    cy.fixture(
      "estimate/est-1.93-create-bid-by-BoQ-Boqexist-sub-description-design-description-text-element-subcharge.json"
    ).then((data) => {
      this.data = data;
      CONTAINERS_DATA_TYPE = this.data.CONTAINERS.DATA_TYPE
      CONTAINER_COLUMNS_DATA_TYPE = this.data.CONTAINER_COLUMNS.DATA_TYPE
      CONTAINERS_DATA_RECORD = this.data.CONTAINERS.DATA_RECORD
      CONTAINER_COLUMNS_DATA_RECORD = this.data.CONTAINER_COLUMNS.DATA_RECORD
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE;
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID
      MODAL_UPDATE_ESTIMATE_WIZARD = this.data.MODAL.UPDATE_ESTIMATE_WIZARD
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: EST_CODE,
        [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      BOQ_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      }
      BOQS_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRCU_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
        [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
      }
      GENERATE_LINE_ITEMS_PARAMETERS = {
        [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
      }
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
      }
      UPDATE_ESTIMATE_PARAMETER = {
        [commonLocators.CommonKeys.CHECKBOX]: MODAL_UPDATE_ESTIMATE_WIZARD
      }
      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
      _common.waitForLoaderToDisappear()
    });
  });

  after(() => {
    cy.LOGOUT();
  });

  it('TC - Precondition', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 1);
      _common.setup_gridLayout(cnt.uuid.DATA_TYPES, CONTAINER_COLUMNS_DATA_TYPE);
      _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
    });
    _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPE.SYSTEM_OPTION);
    cy.REFRESH_CONTAINER();
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, CONTAINERS_DATA_TYPE.SYSTEM_OPTION);
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 1);
      _common.setup_gridLayout(cnt.uuid.DATA_RECORDS, CONTAINER_COLUMNS_DATA_RECORD);
      _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS);
    });
    _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, CONTAINERS_DATA_RECORD.DESCRIPTION);
    _common.clickOn_cellHasValue(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, CONTAINERS_DATA_RECORD.DESCRIPTION);
    _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.PARAMETER_VALUE, app.InputFields.DOMAIN_TYPE_COMMENT, CONTAINERS_DATA_RECORD.PARAMETER_VALUE);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
  });

  it("TC - Create new boq header and BoQ structure", function () {
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ);
    });
    _common.search_inSubContainer(cnt.uuid.BOQS, ' ');
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE);
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQS_STRUCTURE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURES, app.GridCells.REFERENCE, BOQ_REFERENCE)
    _common.create_newRecord(cnt.uuid.BOQ_STRUCTURES);
    _common.edit_dropdownCellWithCaret(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BOQ_LINE_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_BOQ_STRUCTURE.NOTE)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTAINERS_BOQ_STRUCTURE.NOTE + Cypress._.random(0, 999));
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.BOQ_STRUCTURES);
    _common.edit_dropdownCellWithCaret(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BOQ_LINE_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_BOQ_STRUCTURE.DESIGN_DESCRIPTION)
    _common.waitForLoaderToDisappear()
    _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTAINERS_BOQ_STRUCTURE.DESIGN_DESCRIPTION + Cypress._.random(0, 999));
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BOQ_LINE_TYPE_FK, CONTAINERS_BOQ_STRUCTURE.DESIGN_DESCRIPTION)
    _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTAINERS_BOQ_STRUCTURE.DESIGN_DESCRIPTION + Cypress._.random(0, 999));
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BOQ_LINE_TYPE_FK, CONTAINERS_BOQ_STRUCTURE.TEXT_ELEMENT)
    _common.waitForLoaderToDisappear()
    _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTAINERS_BOQ_STRUCTURE.TEXT_ELEMENT + Cypress._.random(0, 999));
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRCU_DESC)
    _common.create_newRecord(cnt.uuid.BOQ_STRUCTURES);
    _common.edit_dropdownCellWithCaret(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BOQ_LINE_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_BOQ_STRUCTURE.SUB_DESCRIPTION)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    cy.wait(2000) //required wait to load page
  });

  it("TC - Create new estimate", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
    cy.wait(2000) //required wait to load page
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE, ' ');
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
  });

  it("TC - Generate Line item by wizard", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2)
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
      _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.estqtyrelboqfk], cnt.uuid.ESTIMATE_LINEITEMS)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS)
    _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear()

  });

  it('TC - Assign resource to the line item', function () {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3)
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    })
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES)
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    cy.wait(2000) //required wait to load page
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, COST_TOTAL)
    _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, AQ_QUANTITY)
  });

  it('TC - Update BoQs from wizard option', function () {
    _common.select_tabFromFooter(cnt.uuid.BOQ_ESTIMATEBYBOQ, app.FooterTab.BOQs, 2);
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
    });
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.EST_QTY_REL_BOQ_FK, commonLocators.CommonKeys.LIST, CONTAINERS_ESTIMATE.BOQ_QUANTITY_REL)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE);
    _estimatePage.openModalContainerByDownArrow();
    _estimatePage.update_estimate_fromWizard(UPDATE_ESTIMATE_PARAMETER);
  });

  it("TC - Verify Create bid by BoQ", function () {
    _bidPage.createBidRecord_byWizardOption(BID_DESC, CONTAINERS_BOQ_STRUCTURE.BUSINESS_PARTNER, CONTAINERS_BOQ_STRUCTURE.STRUCTURE_TYPE, CONTAINERS_BOQ_STRUCTURE.BOQ_CHECKBOX);
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.BIDBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
      _common.setup_gridLayout(cnt.uuid.BIDBOQSTRUCTURE, CONTAINER_COLUMNS_BID)
    });
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRCU_DESC)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.QUANTITY)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL, Cypress.env(COST_TOTAL))
    _common.assert_cellData_insideActiveRow(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.QUANTITY_ADJ, Cypress.env(AQ_QUANTITY))
    _common.assert_cellData_insideActiveRow(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.REFERENCE, Cypress.env(BOQ_REFERENCE))
    _common.assert_cellData_insideActiveRow(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.BAS_UOM_FK, CONTAINERS_BOQ_STRUCTURE.UOM)
  });
});



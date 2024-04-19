import { tile, app, cnt, commonLocators,sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _projectPage, _procurementPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import _ from "cypress/types/lodash";
const ALLURE = Cypress.Allure.reporter.getInterface()

const PROCBOQ_DESC = "PROCBOQ-DESC-" + Cypress._.random(0, 999);
const RFQ_DESC = "RFQ_Desc" + Cypress._.random(0, 999);
const REQBOQSTR_DESC = "REQBOQSTR_DESC-" + Cypress._.random(0, 999);
const TOTAL = "Total env"

let REQUISITION_PARAMETER:DataCells;
let CONTAINERS_REQUISITION;
let CONTAINERS_PROCUREMNET_BOQ;
let CONTAINERS_REQUISITION_BOQ;
let CONTAINER_COLUMNS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION_BOQ
let CONTAINER_COLUMNS_REQUISITION_TOTAL;
let  CONTAINERS_REQUISITION_TOTAL;
let CONTAINER_COLUMNS_RFQ;
let CONTAINER_COLUMNS_RFQ_REQUISITION;
let CONTAINER_COLUMNS_RFQ_BIDDERS;
let CONTAINERS_RFQ_BIDDERS;
let CONTAINER_COLUMNS_TOTALS;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Requisition");
ALLURE.story("PCM- 1.3 | Create RFQ directly from RFQ module, and assign requisitions for BOQ items to it")
describe("PCM- 1.3 | Create RFQ directly from RFQ module, and assign requisitions for BOQ items to it", () => {
  before(function () {
    cy.fixture("pcm/pcm-1.3-create-RFQ-directly-from-RFQ-module-and-assign-requisitions-for-BOQ-items-to-it.json").then((data) => {
      this.data = data;
      
      CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
                CONTAINERS_PROCUREMNET_BOQ = this.data.CONTAINERS.PROCUREMNET_BOQ;
                CONTAINERS_REQUISITION_BOQ = this.data.CONTAINERS.REQUISITION_BOQ;
    
                CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
                CONTAINER_COLUMNS_REQUISITION_BOQ = this.data.CONTAINER_COLUMNS.REQUISITION_BOQ
                CONTAINER_COLUMNS_REQUISITION_TOTAL = this.data.CONTAINER_COLUMNS.REQUISITION_TOTAL
                CONTAINERS_REQUISITION_TOTAL = this.data.CONTAINERS.REQUISITION_TOTAL
                CONTAINER_COLUMNS_TOTALS= this.data.CONTAINER_COLUMNS.TOTALS

                CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
                CONTAINER_COLUMNS_RFQ_REQUISITION = this.data.CONTAINER_COLUMNS.RFQ_REQUISITION
                CONTAINER_COLUMNS_RFQ_BIDDERS= this.data.CONTAINER_COLUMNS.RFQ_BIDDERS
                CONTAINERS_RFQ_BIDDERS= this.data.CONTAINERS.RFQ_BIDDERS
                

                REQUISITION_PARAMETER={
                    [commonLocators.CommonLabels.CONFIGURATION]:CONTAINERS_REQUISITION.CONFIGURATION
                }
        });
    cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });

  it('TC - Verify Creation Of Record in Requisition module', function () {
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
      _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
    });
    _common.create_newRecord(cnt.uuid.REQUISITIONS)
    _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS,REQUISITION_PARAMETER)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.enterRecord_inNewRow(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.STRUCTURE_CODE)
    _common.waitForLoaderToDisappear()
    _mainView.findModuleClientArea().select_popupItem(commonLocators.CommonKeys.GRID, CONTAINERS_REQUISITION.STRUCTURE_CODE)
    _common.clickOn_cellInSubContainer(cnt.uuid.REQUISITIONS, app.GridCells.PROJECT_FK_PROJECT_NAME)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  })

  it('TC - Verify Creation of record in Procurement BOQs', function () {
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.setDefaultView(app.TabBar.MAIN)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONPROCUREMENTBOQS, app.FooterTab.PROCUREMENT_BOQ, 2);
  });
  _common.create_newRecord(cnt.uuid.REQUISITIONPROCUREMENTBOQS)
  _boqPage.enterRecord_ToCreate_procurementBoQs(CONTAINERS_PROCUREMNET_BOQ.SUBPACAKGE, PROCBOQ_DESC,"Create new BoQ")
  cy.SAVE()
  _common.waitForLoaderToDisappear()
  })

  it('TC - Verify Addition of BOQ item in BOQ structure', function () {
    _common.openTab(app.TabBar.REQUISITIONBOQS).then(() => {
      _common.setDefaultView(app.TabBar.REQUISITIONBOQS)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 3);
      _common.setup_gridLayout(cnt.uuid.REQUISITIONBOQSTRUCTURE, CONTAINER_COLUMNS_REQUISITION_BOQ)
    });

    _rfqPage.enterRecordToCreate_BoQStructureInRequisition(REQBOQSTR_DESC, CONTAINERS_REQUISITION_BOQ.QUANTITY, CONTAINERS_REQUISITION_BOQ.UNITRATE, CONTAINERS_REQUISITION_BOQ.UOM)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 0);
      _common.setup_gridLayout(cnt.uuid.REQUISITION_TOTALS,CONTAINER_COLUMNS_REQUISITION_TOTAL)
    });
      _common.select_rowHasValue(cnt.uuid.REQUISITION_TOTALS, CONTAINERS_REQUISITION_TOTAL.VALUE)
      _common.saveCellDataToEnv(cnt.uuid.REQUISITION_TOTALS, app.GridCells.VALUE_NET, TOTAL)
  })

  it('TC - Change requisition status', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.REQ_STATUS_FK,commonLocators.CommonKeys.APPROVED)
  });

  it('TC - Create RFQ', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.RFQ);
      _common.openTab(app.TabBar.RFQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 1);
      _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE,CONTAINER_COLUMNS_RFQ)
    });
       cy.REFRESH_CONTAINER()
      _common.create_newRecord(cnt.uuid.REQUEST_FOR_QUOTE)
      _common.enterRecord_inNewRow(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, RFQ_DESC);
       cy.SAVE()
       _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.RFQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITION_IN_RFQ, app.FooterTab.REQUISITIONS, 1);
      _common.setup_gridLayout(cnt.uuid.REQUISITION_IN_RFQ, CONTAINER_COLUMNS_RFQ_REQUISITION)
    });
      _common.create_newRecord(cnt.uuid.REQUISITION_IN_RFQ)
      _boqPage.Requisitionlookupbutton()
      _boqPage.enterRecord_AssignRequisition(Cypress.env('PROJECT_NUMBER'))
       cy.SAVE()
       _common.waitForLoaderToDisappear()
  })

  it('TC - Verify RFQ totals', function () {
      _common.openTab(app.TabBar.RFQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.BIDDERS, 1);
      _common.setup_gridLayout(cnt.uuid.BIDDERS,CONTAINER_COLUMNS_RFQ_BIDDERS)
    });
      _common.create_newRecord(cnt.uuid.BIDDERS)
      _common.edit_containerCell(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RFQ_BIDDERS.BUSINESS_PARTNER)
      cy.wait(2000) // Required wait to load page
      _mainView.select_popupItem(commonLocators.CommonKeys.GRID, CONTAINERS_RFQ_BIDDERS.BUSINESS_PARTNER)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_RFQ_BIDDERS.BUSINESS_PARTNER)
      _common.openTab(app.TabBar.RFQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RFQ_TOTALS, app.FooterTab.TOTALS, 1);
      _common.setup_gridLayout(cnt.uuid.RFQ_TOTALS, CONTAINER_COLUMNS_TOTALS)
    })
    _common.select_rowInContainer(cnt.uuid.RFQ_TOTALS)
    _common.assert_cellData_insideActiveRow(cnt.uuid.RFQ_TOTALS, app.GridCells.VALUE_NET, Cypress.env(TOTAL))
  })
})

after(() => {
  cy.LOGOUT();
});



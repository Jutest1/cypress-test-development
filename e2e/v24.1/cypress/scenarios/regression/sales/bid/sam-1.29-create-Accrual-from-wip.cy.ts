
import { _common, _estimatePage, _validate, _mainView,_billPage, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage } from "cypress/pages";
import { app, tile, cnt,btn,commonLocators, sidebar } from "cypress/locators";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
import cypress from "cypress";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);
const WIP1_DESC = "WIP1-DESC-" + Cypress._.random(0, 999);
const VOUCHER_NO = "VOUCHER_NO-" + Cypress._.random(0, 999);
const WIPACCRUAL_DESC= "WIPACCRUAL_DESC-" + Cypress._.random(0, 999);
const ACCR_ABB= "ACCR_ABB-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC= "BSD-" + Cypress._.random(0, 999);
let BOQ_PARAMETERS: DataCells
let BOQ_STRUCTURE_PARAMETERS: DataCells

let CONTAINERS_BOQ_STRUCTURE
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

const PROJECT_NO = "34" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS: DataCells
let MODAL_PROJECTS

const CONTRACT_DESC = "CD1-" + Cypress._.random(0, 999);
const WIP_DESC = "WIPD1-" + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM
let GENERATE_LINE_ITEMS_PARAMETERS: DataCells
let CONTAINER_COLUMNS_BID
let MODAL_CREATE_BID

let CONTAINER_COLUMNS_CONTRACT

let WIP_PARAMETERS: DataCells
let MODAL_ACCRUAL
let CONTAINER_COLUMNS_WIP
let CONTAINERS_WIP
let CONTAINER_COLUMNS_WIP_BOQ
let CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE

let ACCRUAL_PARAMETER
allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 1.29 | Create Accrual from wip")

describe("SAM- 1.29 | Create Accrual from wip", () => {
    
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("sam/sam-1.29-create-Accrual-from-wip.json").then((data) => {
          this.data = data;
          MODAL_PROJECTS = this.data.MODAL.PROJECTS
          PROJECTS_PARAMETERS = {
              [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
              [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
              [commonLocators.CommonLabels.CLERK]: MODAL_PROJECTS.CLERK
          }

          CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
          CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
          ESTIMATE_PARAMETERS = {
              [app.GridCells.CODE]: ESTIMATE_CODE,
              [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
              [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
              [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
          }
          CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
          CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
          RESOURCE_PARAMETERS = {
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
              [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
              [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
          };

          CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
          CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
          GENERATE_LINE_ITEMS_PARAMETERS = {
              [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
              [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
          }

          CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
          BOQ_PARAMETERS = {
              [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
          }
  
          CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
          BOQ_STRUCTURE_PARAMETERS = {
              [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
              [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
              [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
              [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
              [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
          }
          CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE

          CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID
          MODAL_CREATE_BID = this.data.MODAL.CREATE_BID

          CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT

        
          WIP_PARAMETERS = {
              [commonLocators.CommonLabels.DESCRIPTION]: WIP_DESC,
              [commonLocators.CommonLabels.CLERK]: MODAL_PROJECTS.CLERK,
              [commonLocators.CommonLabels.CONTRACT]:CONTRACT_DESC
          }
          CONTAINERS_WIP= this.data.CONTAINERS.WIP
          CONTAINER_COLUMNS_WIP = this.data.CONTAINER_COLUMNS.WIP
          CONTAINER_COLUMNS_WIP_BOQ = this.data.CONTAINER_COLUMNS.WIP_BOQ
          CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.WIP_BOQ_STRUCTURE
          MODAL_ACCRUAL = this.data.MODAL.ACCRUAL
           ACCRUAL_PARAMETER={
               [commonLocators.CommonLabels.VOUCHER_NO]: VOUCHER_NO,
               [commonLocators.CommonLabels.DESCRIPTION]: WIPACCRUAL_DESC
               }
          /* Open desktop should be called in before block */
          _common.openDesktopTile(tile.DesktopTiles.PROJECT);
          _common.waitForLoaderToDisappear()
          _common.openTab(app.TabBar.PROJECT).then(() => {
              _common.setDefaultView(app.TabBar.PROJECT)
              _common.waitForLoaderToDisappear()
              _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
          });
          _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
          _common.create_newRecord(cnt.uuid.PROJECTS);
          _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
          _common.waitForLoaderToDisappear()
          cy.SAVE();
          _common.waitForLoaderToDisappear()
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        });
    });

    it("TC - Create Prerequisite", function () {
     _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
     _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
     _common.waitForLoaderToDisappear()

     cy.REFRESH_CONTAINER();
     _common.waitForLoaderToDisappear()
     _common.openTab(app.TabBar.MASTER_DATA).then(() => {
          _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 1);
      });
      cy.REFRESH_CONTAINER();
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
      _common.search_inSubContainer(cnt.uuid.DATA_TYPES, sidebar.SideBarOptions.COMPANY_TRANSFER_STATUS);
      _common.select_rowHasValue(cnt.uuid.DATA_TYPES, sidebar.SideBarOptions.COMPANY_TRANSFER_STATUS)
      _common.waitForLoaderToDisappear()
         _common.search_inSubContainer(cnt.uuid.INSTANCES,sidebar.SideBarOptions.RECORDED)
         _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.GridCells.IS_DEFAULT,commonLocators.CommonKeys.CHECK)
         _common.waitForLoaderToDisappear()
         cy.SAVE()
         cy.REFRESH_CONTAINER()
         _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
         _common.openTab(app.TabBar.MASTER_DATA).then(() => {
          _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 1);
      });
      _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
      _common.search_inSubContainer(cnt.uuid.DATA_TYPES, sidebar.SideBarOptions.TRANSACTION_TYPE);
      _common.select_rowHasValue(cnt.uuid.DATA_TYPES, sidebar.SideBarOptions.TRANSACTION_TYPE)
         _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
         _common.search_inSubContainer(cnt.uuid.INSTANCES,sidebar.SideBarOptions.WIP_ACCRUAL)
         _common.enterRecord_inNewRow(cnt.uuid.INSTANCES,app.GridCells.ABBREVIATION,app.InputFields.DOMAIN_TYPE_CODE,ACCR_ABB)
         cy.SAVE().wait(1000)
         _common.waitForLoaderToDisappear()
         cy.wait(1000)
         _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
         _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
         cy.wait(3000)
    });
    it("TC - Create new BoQ record", function () {
     _common.waitForLoaderToDisappear()

     _common.openTab(app.TabBar.BOQS).then(() => {
         _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
     });

     _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
     _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();

     _common.openTab(app.TabBar.BOQS).then(() => {
         _common.setDefaultView(app.TabBar.BOQS)
         _common.waitForLoaderToDisappear()
         _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
         _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
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
         _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
         _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
       //  _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
     })
     _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS);
     cy.SAVE()
     _common.waitForLoaderToDisappear()
     _common.waitForLoaderToDisappear()
     _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
     _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
     _common.waitForLoaderToDisappear()

    });  
    it("TC - Create new Estimate header record and  generate Line item and Resources ", function () {         _common.waitForLoaderToDisappear()
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
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear();
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
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)


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
      _common.minimizeContainer(cnt.uuid.RESOURCES)
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      })
      _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, "EST_COST_TOTAL")

    });
    it("TC - Create new sales bid", function () {
     _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
     _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);

     _bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.MAIN_BID, BID_DESC, MODAL_CREATE_BID.BUSINESS_PARTNER, MODAL_CREATE_BID.STRUCTURE_TYPE)
     _common.waitForLoaderToDisappear()

     _common.openTab(app.TabBar.BID).then(() => {
         _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS)
         _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BID)
     })
     _common.clear_subContainerFilter(cnt.uuid.BIDS)
     cy.REFRESH_CONTAINER()
     _common.waitForLoaderToDisappear()
     _common.select_rowHasValue(cnt.uuid.BIDS, BID_DESC)
     _common.assert_forNumericValues(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, Cypress.env("EST_COST_TOTAL").toString())
     _common.saveCellDataToEnv(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, "BID_NET_AMOUNT")

     _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
     _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
     _common.waitForLoaderToDisappear()
     _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED)
     _common.waitForLoaderToDisappear()    });
    it("TC - Create Contract using Wizard option", function () {
       //  _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTUREBID,app.GridCells.FINAL_PRICE_SMALL,"Save_Bid_finalprice") 
         _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
         _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
         _common.waitForLoaderToDisappear()
         _saleContractPage.create_contract_fromWizard(CONTRACT_DESC);
         _common.waitForLoaderToDisappear()
         _common.openTab(app.TabBar.CONTRACTS).then(() => {
             _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
             _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACT)
         });
         _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
         _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
         _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
         _common.waitForLoaderToDisappear()
         _common.changeStatus_fromModal(commonLocators.CommonKeys.CONTRACTED);
         _common.waitForLoaderToDisappear()
         cy.SAVE()
    });
    it("TC - Create Contract and wip using Wizard option", function () {
         _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
         _common.select_rowInContainer(cnt.uuid.CONTRACTS)
         _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTS,app.GridCells.AMOUNT_NET,Cypress.env("EST_COST_TOTAL"))
         cy.SAVE()
         _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
         _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WIP);
    });      
    it("TC - Assertion 1-Add Wip1 Quantity and verify remaining total ", function () {
        _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.WIP).then(() => {
          _common.setDefaultView(app.TabBar.WIP)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
          _common.setup_gridLayout(cnt.uuid.WIP, CONTAINER_COLUMNS_WIP)
      });
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
         _common.clear_subContainerFilter(cnt.uuid.WIP)
         _common.create_newRecord(cnt.uuid.WIP)
         _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETERS)
         cy.SAVE()
         _common.openTab(app.TabBar.WIPBOQ).then(() => {
         cy.wait(1000)
         _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs,0); 
         });
         _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.TREE,app.GridCellIcons.ICO_BOQ_ITEM)
         cy.SAVE()
         _common.edit_containerCell(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_WIP.QUANTITY)
         cy.SAVE()
         cy.wait(1000)
         _common.waitForLoaderToDisappear()
         _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.ORD_QUANTITY_SMALL,"CONTRACTED_QUANTITY")
         _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.QUANTITY_SMALL,"WIP_QUANTITY")
         _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.PRICE_SMALL,"WIP_UNIT_RATE")
    });
    it("TC - Assertion 3-Verify RecordMultiply Two Values In Row", function () {
           cy.wait(500).then(() => { 
         _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.BOQ_STRUCTUREWIP,Cypress.env("WIP_QUANTITY"),Cypress.env("WIP_UNIT_RATE"),app.GridCells.FINAL_PRICE_SMALL)
         cy.wait(500)
         })
         _common.openTab(app.TabBar.WIP).then(() => {
          _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_WIP_STATUS);
      _common.waitForLoaderToDisappear()
      _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
      _common.waitForLoaderToDisappear()

         cy.SAVE() 
    });
    it("TC - Create Accurates ", function () {
         _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
         _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_ACCRUALS);
         cy.wait(500)
         _wipPage.enterRecord_CreateAccruals(ACCRUAL_PARAMETER)
         _common.waitForLoaderToDisappear()
         cy.SAVE()
         _validate.validate_Text_message_In_PopUp(MODAL_ACCRUAL.MESSAGE)
         _common.clickOn_modalFooterButton(btn.ButtonText.OK)
         cy.SAVE()
      _common.waitForLoaderToDisappear()
    });
    it("TC - Verify created Accounting Journals ", function () {
     _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
     _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ACCOUNTING_JOURNALS)
         _common.waitForLoaderToDisappear()
         cy.REFRESH_CONTAINER()
         _common.waitForLoaderToDisappear()
         cy.wait(1000)
         _common.openTab(app.TabBar.TRANSACTION_HEADER).then(() => {
         _common.select_tabFromFooter(cnt.uuid.TRANSACTION_HEADERS,app.FooterTab.Transaction_Headers,0);
         });
         cy.REFRESH_CONTAINER()
         cy.wait(1000)
         _common.clear_subContainerFilter(cnt.uuid.TRANSACTION_HEADERS)
         _common.search_inSubContainer(cnt.uuid.TRANSACTION_HEADERS,WIPACCRUAL_DESC)

    })
      after(() => {
      cy.LOGOUT();
      });
  
})

        
   


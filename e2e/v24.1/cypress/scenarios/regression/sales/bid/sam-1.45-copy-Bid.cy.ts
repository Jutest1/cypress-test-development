import {_salesPage,_common, _estimatePage, _validate, _mainView, _boqPage, _package, _bidPage, _saleContractPage, _projectPage } from "cypress/pages";
import {commonLocators, app, tile, cnt,btn, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();


const BOQ_DESC="BOQ_DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC="BSD-" + Cypress._.random(0, 999);
let BOQ_PARAMETERS:DataCells
let BOQ_STRUCTURE_PARAMETERS:DataCells
let CONTAINERS_BOQ_STRUCTURE
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;

const BID_DESC = "BID_DESC-" + Cypress._.random(0, 999);
let CONTAINERS_CREATE_BID
let BID_PARAMETERS

const BID_BOQ_DESC="BID_BOQ_DESC-" + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_SOURCE_BOQ

const PROJECT_NO="34" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

ALLURE.epic("SALES");
ALLURE.feature("Sales-Contract");

ALLURE.story("SAM- 1.45 | Copy Bid.");

describe("SAM- 1.45 | Copy Bid.", () => {

  before(function () {
    cy.fixture("sam/sam-1.45-copy-Bid.json")
      .then((data) => {
        this.data = data;
        CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ
        BOQ_PARAMETERS={
            [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
        }

        CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
        BOQ_STRUCTURE_PARAMETERS={
            [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
            [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC,
            [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY,
            [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
            [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
        }
        CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
        CONTAINERS_CREATE_BID=this.data.CONTAINERS.CREATE_BID
        BID_PARAMETERS={
          [app.InputFields.DOMAIN_TYPE_DESCRIPTION]:BID_DESC,
          [app.InputFields.INPUT_GROUP_CONTENT]:CONTAINERS_CREATE_BID.BUSINESS_PARTNER       
        }
        CONTAINER_COLUMNS_SOURCE_BOQ=this.data.CONTAINER_COLUMNS.SOURCE_BOQ

        MODAL_PROJECTS=this.data.MODAL.PROJECTS
        PROJECTS_PARAMETERS={
          [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
          [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
          [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
        }
      })
      .then(()=>{
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
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
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  
      })
  });


  it("TC - Create BOQ header and BOQ structure", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.BOQS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  

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
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.BOQS)
    _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
        _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
   
  });

  it("TC - Create Bid", function () {
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BID);

    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.BID).then(() => {
      _common.setDefaultView(app.TabBar.BID)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.BIDS)
    _common.create_newRecord(cnt.uuid.BIDS)
    _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETERS)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create BoQ", function () {
    _common.openTab(app.TabBar.BIDBOQ).then(() => {
      _common.setDefaultView(app.TabBar.BIDBOQ)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BIDBOQS, app.FooterTab.BOQs,0);
    });
    _common.openTab(app.TabBar.BIDBOQ).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.BIDS)
    _common.search_inSubContainer(cnt.uuid.BIDS,BID_DESC)
    _common.select_rowHasValue(cnt.uuid.BIDS,BID_DESC)

    _common.openTab(app.TabBar.BIDBOQ).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BIDBOQS, app.FooterTab.BOQs,0);
    });
    _common.clear_subContainerFilter(cnt.uuid.BIDBOQS)
    _common.create_newRecord(cnt.uuid.BIDBOQS)
    _common.waitForLoaderToDisappear()
    _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.OUTLINE_SPECIFICATION, 0, app.InputFields.FORM_CONTROL)
           .clear({ force: true })
           .type(BID_BOQ_DESC, { force: true })
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.BIDBOQ).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQs);
    });
    _common.select_allContainerData(cnt.uuid.BOQ_STRUCTUREBID)
  });

  it("TC - Copy Item from Source BoQ", function () {
    _common.openTab(app.TabBar.OTHERS).then(() => {
      _common.setDefaultView(app.TabBar.OTHERS)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BIDSOURCEBOQ, app.FooterTab.SOURCE_BOQ,1);
      _common.waitForLoaderToDisappear()
      _common.setup_gridLayout(cnt.uuid.BIDSOURCEBOQ,CONTAINER_COLUMNS_SOURCE_BOQ)
    });

    _common.openTab(app.TabBar.OTHERS).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE,0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREBID,CONTAINER_COLUMNS_SOURCE_BOQ)
    });

    _common.openTab(app.TabBar.OTHERS).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BIDBOQS, app.FooterTab.BOQ_STRUCTURE,0);
    });

    _common.openTab(app.TabBar.OTHERS).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.BIDS)
    _common.search_inSubContainer(cnt.uuid.BIDS,BID_DESC)
    _common.select_rowHasValue(cnt.uuid.BIDS,BID_DESC)

    _common.openTab(app.TabBar.OTHERS).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BIDBOQS, app.FooterTab.BOQ_STRUCTURE,0);
    });

    _common.clear_subContainerFilter(cnt.uuid.BIDBOQS)
    _common.select_rowHasValue(cnt.uuid.BIDBOQS,BID_BOQ_DESC)

    _common.openTab(app.TabBar.OTHERS).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE,0);
    });

    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREBID,commonLocators.CommonKeys.ROOT)
    _common.create_newRecord(cnt.uuid.BOQ_STRUCTUREBID)
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREBID,commonLocators.CommonKeys.POSITION)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.OTHERS).then(() => {
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.BIDSOURCEBOQ, app.FooterTab.SOURCE_BOQ,1);
    });
   _boqPage.search_recordingUnderSourceBoQ(cnt.uuid.BIDSOURCEBOQ, cnt.uuid.BOQ_STRUCTUREBID, commonLocators.CommonKeys.PROJECT_BOQ, " ",PROJECT_NO ,BOQ_DESC, BOQ_STRUCTURE_DESC,commonLocators.CommonKeys.POSITION,commonLocators.CommonKeys.POSITION);
   _common.waitForLoaderToDisappear()
  });

  it("TC - Verify the quantity in boq structure", function () {
    _common.openTab(app.TabBar.BIDBOQ).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE);
    });
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREBID,BOQ_STRUCTURE_DESC)
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREBID,app.GridCells.QUANTITY_SMALL,CONTAINERS_BOQ_STRUCTURE.QUANTITY)
    _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTUREBID,app.GridCells.FINAL_PRICE_SMALL,"FINAL_PRICE")
  });

  it("TC - Deep copy bid and save the description ", function () {
      _common.openTab(app.TabBar.BID).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
      });
      _common.search_inSubContainer(cnt.uuid.BIDS,BID_DESC)
      _common.select_rowHasValue(cnt.uuid.BIDS,BID_DESC)
      _common.clickOn_toolbarButton(cnt.uuid.BIDS,btn.ToolBar.ICO_COPY_PASTE_DEEP)
      _common.waitForLoaderToDisappear()
      _common.getText_CellData_fromModal(commonLocators.CommonElements.ROW,commonLocators.CommonLabels.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,"COPY_DESC")
      _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
      _common.waitForLoaderToDisappear()
      _common.clickOn_modalFooterButton(btn.ButtonText.FINISH)
      _common.waitForLoaderToDisappear()
  });

  it("TC - Verify deep copy Description and final price in bid  ", function () {
      _common.openTab(app.TabBar.BID).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.BIDS)
      _validate.verify_isRecordEntered(cnt.uuid.BIDS,app.GridCells.DESCRIPTION_INFO,Cypress.env("COPY_DESC"))
      cy.wait(1000)
      _common.assert_forNumericValues(cnt.uuid.BIDS,app.GridCells.AMOUNT_NET,Cypress.env("FINAL_PRICE"))

  });
  
after(() => {
  cy.LOGOUT();
});

});


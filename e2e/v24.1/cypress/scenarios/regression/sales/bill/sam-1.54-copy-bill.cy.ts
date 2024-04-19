
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage, _billPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BILL_DESC = "BILL_DESC" + Cypress._.random(0, 999);
let CONTAINERS_BILL;
let CONTAINER_COLUMNS_BILL;
let CONTAINER_COLUMNS_BILL_BOQ_STRUCTURE;
let PROJECTS_PARAMETERS: DataCells;
let BILL_PARAMETERS: DataCells;
let BOQ_PARAMETERS:DataCells
let BOQ_STRUCTURE_PARAMETERS:DataCells
let CONTAINER_COLUMNS_BOQS;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
allure.epic("SALES");
allure.feature("Sales-Bill");
allure.story("SAM- 1.54 | Copy Bill")

describe("SAM- 1.54 | Copy Bill", () => {


    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("sam/sam-1.54-copy-bill.json").then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQSTRUCTURE
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE
            CONTAINERS_BILL = this.data.CONTAINERS.BILL;
            CONTAINER_COLUMNS_BILL = this.data.CONTAINER_COLUMNS.BILL

            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
              }
              BOQ_STRUCTURE_PARAMETERS={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
            }
            BOQ_PARAMETERS={
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
            }
            BILL_PARAMETERS= {
                [commonLocators.CommonLabels.BILL_TYPE]:CONTAINERS_BILL.TYPE,
                [commonLocators.CommonLabels.DESCRIPTION]: BILL_DESC,
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINERS_BILL.BUSINESS_PARTNER,
                [commonLocators.CommonLabels.BOQ_SOURCE]:CONTAINERS_BILL.PROJECT_BOQ,
                [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_DESC,
                
    
            }
            /* Open desktop should be called in beforae block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            cy.SAVE();
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
          });
        });
    it("TC - Create BOQ header and BOQ structure", function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
    
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            //_common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create bill and assign boqs in billing module", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING);
        _common.openTab(app.TabBar.BILLS).then(() => {
          _common.setDefaultView(app.TabBar.BILLS)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
          _common.setup_gridLayout(cnt.uuid.BILLS, CONTAINER_COLUMNS_BILL)
          _common.clear_subContainerFilter(cnt.uuid.BILLS)
        })
        _common.create_newRecord(cnt.uuid.BILLS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _billPage.enterRecord_toCreateBillRecord(BILL_PARAMETERS)
        cy.SAVE()
      })

    it("TC - Add Quantity In Billing BoQ Structure", function () {
        _common.openTab(app.TabBar.APPLICATIONS).then(() => {
            _common.setDefaultView(app.TabBar.APPLICATIONS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BILL_BOQ, app.FooterTab.BOQs)
            _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE)
            _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _billPage.editQuantity_inBill(CONTAINERS_BILL.QUANTITY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,  sidebar.SideBarOptions.CHANGE_BILL_STATUS);
        _common.changeStatus_fromModal(sidebar.SideBarOptions.BPA_Billed);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.BILLS, app.GridCells.AMOUNT_NET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("NetAmount", $ele1.text())
        })
    })

    it("TC - Copy Bill", function () {
        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
            _common.clear_subContainerFilter(cnt.uuid.BILLS)
          })
          _common.clickOn_toolbarButton(cnt.uuid.BILLS, btn.ToolBar.ICO_COPY_PASTE_DEEP)
          cy.wait(1000)
          _modalView.acceptButton(btn.ButtonText.NEXT);
          cy.wait(1000)
          _modalView.acceptButton(btn.ButtonText.FINISH);
          cy.SAVE()
          _common.waitForLoaderToDisappear()
          _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLS, app.GridCells.DESCRIPTION_INFO, BILL_DESC + " - Copy")
          cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.BILLS, app.GridCells.DESCRIPTION_INFO, BILL_DESC + " - Copy")
        _common.assert_cellData_insideActiveRow(cnt.uuid.BILLS, app.GridCells.AMOUNT_NET, Cypress.env("NetAmount"))
    });

    after(() => {
        cy.LOGOUT();
    });
});




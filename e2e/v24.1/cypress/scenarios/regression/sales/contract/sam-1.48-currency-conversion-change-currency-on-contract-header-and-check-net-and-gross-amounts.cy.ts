
import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const CONTRACT_DESC = "Contracts-Currency-Conversion-Test-" + Cypress._.random(0, 999);

let CONTRACT_PARAMETERS: DataCells;

let CONTAINERS_CONTRACTS;
let CONTAINER_COLUMNS_CONTRACTS;
let CONTAINER_COLUMNS_CURRENCY_CONVERSION;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_PARAMETERS:DataCells
let BOQ_STRUCTURE_PARAMETERS:DataCells
let CONTAINERS_BOQ_STRUCTURE
let PROJECTS_PARAMETERS:DataCells;
allure.epic("SALES");
allure.feature("Sales-Contract");
allure.story("SAM- 1.48 | Currency Conversion Change Currency On Contract Header And Check Net And Gross Amounts")

describe("SAM- 1.48 | Currency Conversion Change Currency On Contract Header And Check Net And Gross Amounts", () => {
  beforeEach(function () {
    cy.fixture("sam/sam-1.48-currency-conversion-change-currency-on-contract-header-and-check-net-and-gross-amounts.json").then((data) => {
      this.data = data;
    });
  });

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("sam/sam-1.48-currency-conversion-change-currency-on-contract-header-and-check-net-and-gross-amounts.json").then((data) => {
      this.data = data;
      CONTAINERS_CONTRACTS = this.data.CONTAINERS.CONTRACTS;
      CONTAINER_COLUMNS_CONTRACTS = this.data.CONTAINER_COLUMNS.CONTRACTS
      CONTAINER_COLUMNS_CURRENCY_CONVERSION = this.data.CONTAINER_COLUMNS.CURRENCY_CONVERSION
      CONTRACT_PARAMETERS =  {
        [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: CONTRACT_DESC,
        [app.InputFields.INPUT_GROUP_CONTENT]: CONTAINERS_CONTRACTS.BUSINESS_PARTNER,
        [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_DESC,
      }
      PROJECTS_PARAMETERS={
        [commonLocators.CommonLabels.PROJECT_NUMBER]:PRJ_NO,
        [commonLocators.CommonLabels.NAME]:PRJ_NAME,
        [commonLocators.CommonLabels.CLERK]:CLERK_NAME
      }
      
      CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQS

      BOQ_PARAMETERS={
          [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
      }
      CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQSTRUCTURE

      BOQ_STRUCTURE_PARAMETERS={
          [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
          [app.GridCells.BRIEF_INFO_SMALL]:BOQSTRUCT_DESC,
          [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY,
          [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
          [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
      }
      CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQSTRUCTURE

    }).then(()=>{
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
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PRJ_NO).pinnedItem(); 
    })
  });

  it("TC - Create BOQ header and BOQ structure", function () {
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
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()
});

  it("TC - Create Contract And Assign BoQ", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT_SALES);

    _common.openTab(app.TabBar.CONTRACTS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
      _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACTS)
      _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
    });
    _common.create_newRecord(cnt.uuid.CONTRACTS);
    _salesPage.enterRecord_toCreateSalesBID(CONTRACT_PARAMETERS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.getText_fromCell(cnt.uuid.CONTRACTS, app.GridCells.CURRENCY_FK).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("CURRENCY", $ele1.text())
    })


  });

  it("TC - Add Currency Conversion And Exchange Rates To Home Currency", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CURRENCY);
    _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.CURRENCY).then(() => {
        _common.select_tabFromFooter(cnt.uuid.HOME_CURRENCY, app.FooterTab.HOME_CURRENCY, 0);
      })
      _common.clear_subContainerFilter(cnt.uuid.HOME_CURRENCY)
      _common.search_inSubContainer(cnt.uuid.HOME_CURRENCY, CONTAINERS_CONTRACTS.EUR)
      _common.openTab(app.TabBar.CURRENCY).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CURRENCY_CONVERSION, app.FooterTab.CURRENCY_CONVERSION, 0);
        _common.setup_gridLayout(cnt.uuid.CURRENCY_CONVERSION, CONTAINER_COLUMNS_CURRENCY_CONVERSION)
      })
        _common.create_newRecordInCurrencyConversion_ifRecordNotExists(cnt.uuid.CURRENCY_CONVERSION, app.GridCells.CURRENCY_FOREIGN_FK, CONTAINERS_CONTRACTS.USD, CONTAINERS_CONTRACTS.RATE, 0)
        _common.edit_containerCell(cnt.uuid.CURRENCY_CONVERSION, app.GridCells.BASIS,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACTS.CONVERSION_RATE)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.getText_fromCell(cnt.uuid.CURRENCY_CONVERSION, app.GridCells.BASIS).then(($ele1: JQuery<HTMLElement>) => {
        Cypress.env("CURRENCY_CONVERSION", $ele1.text())
      })
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT_SALES);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.CONTRACTS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
      });
      _common.getText_fromCell(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET).then(($ele1: JQuery<HTMLElement>) => {
        Cypress.env("NetAmount", $ele1.text())
        cy.log(Cypress.env("NetAmount"))
      })
    })

  it("TC - Verify Currency Conversion Contract ", function () {
    _common.edit_dropdownCellWithInput(cnt.uuid.CONTRACTS, app.GridCells.CURRENCY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACTS.USD)
    cy.SAVE()
    cy.wait(500)
    _common.findRadio_byLabel_fromModal(CONTAINERS_CONTRACTS.FOREIGN_CURRENCY,commonLocators.CommonKeys.RADIO, 0, commonLocators.CommonElements.RADIO_SPACE_TO_UP)
    _common.clickOn_modalFooterButton(Buttons.ButtonText.YES)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.getText_fromCell(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("NewNetAmount", $ele1.text())

    })
    _validate.verify_isRecordDivisionOfTwoValuesAnd_ComapreWithThirdValue(cnt.uuid.CONTRACTS, Cypress.env("NetAmount"), CONTAINERS_CONTRACTS.CONVERSION_RATE, app.GridCells.AMOUNT_NET)
    _validate.verify_isRecordDivisionOfTwoValuesAnd_ComapreWithThirdValue(cnt.uuid.CONTRACTS, Cypress.env("NetAmount"), CONTAINERS_CONTRACTS.CONVERSION_RATE, app.GridCells.AMOUNT_GROSS)
  });

  after(() => {
    cy.LOGOUT();
  });
});




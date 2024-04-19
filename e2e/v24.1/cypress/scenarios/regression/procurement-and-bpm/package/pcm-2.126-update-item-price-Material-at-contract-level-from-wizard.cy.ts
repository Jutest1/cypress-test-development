import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _controllingUnit, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView, _saleContractPage, _modalView, _validate, _procurementContractPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";


const allure = Cypress.Allure.reporter.getInterface();
const CONTRACT_CODE = 'CONTRACT_CODE'
const ITEM_DESC = "ITEM-" + Cypress._.random(0, 999);

var MATERIAL_NO_ARRAY

let PROCUREMENT_CONTRACT_PARAMETER: DataCells,
  ITEM_PARAMETER: DataCells,
  ITEM_PARAMETER_1: DataCells

let CONTAINERS_CONTRACT,
  CONTAINERS_UPDATE_ITEM_PRICE,
  CONTAINER_COLUMNS_CONTRACT,
  CONTAINER_COLUMNS_CONTRACT_ITEM,
  CONTAINER_COLUMNS_QUOTE,
  CONTAINER_COLUMNS_QUOTE_ITEM,
  CONTAINERS_MATERIAL_CATALOG,
  CONTAINER_COLUMNS_MATERIAL_RECORD,
  CONTAINERS_ITEMS,
  CONTAINER_COLUMNS_ITEMS

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.126 | Update item price (Material) at contract level from wizard");

describe("PCM- 2.126 | Update item price (Material) at contract level from wizard", () => {
  beforeEach(function () {
    cy.fixture("pcm/pcm-2.126-update-item-price-Material-at-contract-level-from-wizard.json").then((data) => {
      this.data = data
      CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
      CONTAINERS_UPDATE_ITEM_PRICE = this.data.CONTAINERS.UPDATE_ITEM_PRICE
      CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
      CONTAINER_COLUMNS_CONTRACT_ITEM = this.data.CONTAINER_COLUMNS.CONTRACT_ITEM
      CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE
      CONTAINER_COLUMNS_QUOTE_ITEM = this.data.CONTAINER_COLUMNS.QUOTE_ITEM
      CONTAINERS_MATERIAL_CATALOG = this.data.CONTAINERS.MATERIAL_CATALOG;
      CONTAINER_COLUMNS_MATERIAL_RECORD = this.data.CONTAINER_COLUMNS.MATERIAL_RECORD
      CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS
      CONTAINERS_ITEMS = this.data.CONTAINERS.ITEMS
      PROCUREMENT_CONTRACT_PARAMETER = {
        [commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_CONTRACT.CONFIGURATION,
        [commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINERS_CONTRACT.BUSINESS_PARTNER
      }
      ITEM_PARAMETER = {
        [app.GridCells.DESCRIPTION_1]: ITEM_DESC,
        [app.GridCells.MDC_MATERIAL_FK]: CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_NUMBER_FIRST_ITEM
      };
      ITEM_PARAMETER_1 = {
        [app.GridCells.DESCRIPTION_1]: ITEM_DESC,
        [app.GridCells.MDC_MATERIAL_FK]: CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_NUMBER_SECOND_ITEM
      };
    })
  })

  before(function () {
    cy.fixture("pcm/pcm-2.126-update-item-price-Material-at-contract-level-from-wizard.json").then((data) => {
      this.data = data
      cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
    })
  });

  after(() => {
    cy.LOGOUT();
  });

  it("Update ITEM from Wizard and verify contract price", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.CONTRACT);
    cy.wait(3000) //Required wait to load page
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
    });
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT)
    _procurementContractPage.enterRecord_createNewProcurementContract_fromModal(PROCUREMENT_CONTRACT_PARAMETER)
    cy.wait(2000) //Required wait to load page
    cy.SAVE()
    cy.wait(3000) //Required wait to load page
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, CONTRACT_CODE)
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2);
    });
    _common.create_newRecord(cnt.uuid.ITEMSCONTRACT)
    cy.wait(1000) //Required wait to load page
    _procurementContractPage.enterRecord_toCreateContractItems(cnt.uuid.ITEMSCONTRACT, ITEM_PARAMETER)
    cy.wait(2000) //Required wait to load page
    _common.create_newRecord(cnt.uuid.ITEMSCONTRACT)
    cy.wait(1000) //Required wait to load page
    _procurementContractPage.enterRecord_toCreateContractItems(cnt.uuid.ITEMSCONTRACT, ITEM_PARAMETER_1)
    cy.SAVE()
    cy.wait(2000) //Required wait to load page
    for (var i = 0; i <= CONTAINERS_UPDATE_ITEM_PRICE.ITEM_CODE - 1; i++) {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE)
      cy.wait(1000) //Required wait to load page
      _package.doUpdate_Item_price_wizardOption(CONTAINERS_UPDATE_ITEM_PRICE.LABEL_1, CONTAINERS_UPDATE_ITEM_PRICE.PRICE_VERSION, CONTAINERS_UPDATE_ITEM_PRICE.CHECK_BOX, CONTAINERS_UPDATE_ITEM_PRICE.ITEM_CODE[i])
      _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 0);
        _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_CONTRACT_ITEM);
      });
      _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT, CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_NUMBER_FIRST_ITEM)

      cy.wait(1000).then(() => { //Required wait to load page
        _common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRICE, Cypress.env("Unit_Rate"))
      })
    }
  })

  it("Verify Catalog Price Version: default checked and show latest price version lookup to price version", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE)
    cy.wait(2000) //Required wait to load page
    _common.findRadio_byLabel_fromModal(CONTAINERS_UPDATE_ITEM_PRICE.LABEL_1, commonLocators.CommonKeys.RADIO, 0, commonLocators.CommonElements.RADIO_SPACE_TO_UP)
    _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
    // _common.verifycheckbox_IsCheck_OrUncheck_InModal("checkboxIsSelected", UpdateItemPrice.checkboxClass, UpdateItemPrice.checkbox1)
    cy.wait(2000) //Required wait to load page
    _modalView.getTextFrom_ModalInput(CONTAINERS_UPDATE_ITEM_PRICE.LATEST_PRICE_VERSION, 0)
    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
  })

  it("Verify check scope: select option all item current selected lead record it will take all items of selected header", function () {
    _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT, CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_NUMBER_SECOND_ITEM)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE)
    _common.findRadio_byLabel_fromModal(CONTAINERS_UPDATE_ITEM_PRICE.LABEL_1, commonLocators.CommonKeys.RADIO, 0, commonLocators.CommonElements.RADIO_SPACE_TO_UP)
    _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
    _package.select_priceVersion_fromCaret(CONTAINERS_UPDATE_ITEM_PRICE.PRICE_VERSION)
    cy.wait(2000) //Required wait to load page
    for (var i = 0; i <= CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_NO.length - 1; i++) {
      _common.clickOn_cellHasValue_fromModal(app.GridCells.SOURCE_CODE_DESC, CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_NO[i])
      _common.assert_cellDataByContent_fromModal(app.GridCells.SOURCE_CODE_DESC, CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_NO[i])
    }
    cy.wait(2000) //Required wait to load page
  })

  it("Verify check scope: select option selected item(s), it will only take selected item", function () {
    _common.clickOn_modalFooterButton(Buttons.ButtonText.PREVIOUS)
    _common.findRadio_byLabel_fromModal(CONTAINERS_UPDATE_ITEM_PRICE.LABEL_2, commonLocators.CommonKeys.RADIO, 0, commonLocators.CommonKeys.RADIO)
    _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
    _package.select_priceVersion_fromCaret(CONTAINERS_UPDATE_ITEM_PRICE.PRICE_VERSION)
    cy.wait(1000) //Required wait to load page
    _common.clickOn_cellHasValue_fromModal(app.GridCells.SOURCE_CODE_DESC, CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_NUMBER_SECOND_ITEM)
    _common.assert_cellDataByContent_fromModal(app.GridCells.SOURCE_CODE_DESC, CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_NUMBER_SECOND_ITEM)
    cy.wait(2000)
  })

  it("Verify Search button will be grey out if Catalog, Quotation and Contract check boxes are all not checked", function () {
    _common.clickOn_modalFooterButton(Buttons.ButtonText.PREVIOUS)
    cy.wait(1000) //Required wait to load page
    _common.clickOn_modalFooterButton(Buttons.ButtonText.NEXT)
    for (var i = 0; i <= CONTAINERS_UPDATE_ITEM_PRICE.CHECK_BOX.length - 1; i++) {
      _common.clickOn_checkboxByLabel_fromModal(CONTAINERS_UPDATE_ITEM_PRICE.CHECKBOX, CONTAINERS_UPDATE_ITEM_PRICE.CHECK_BOX[i], 0)
    }
    _validate.verify_isButtonDisabled("Search")
  })

  it("Verify check dates come from Quote,contract, start date and end date", function () {
    cy.wait(1000).then(() => {
      _common.clickOn_cellHasValue_fromModal(app.GridCells.SOURCE_CODE_DESC, Cypress.env(CONTRACT_CODE))
    })
    _common.getText_fromCell_fromModal(app.GridCells.UPDATE_DATE).then(($date) => {
      Cypress.env("Date", $date.text())
    })
    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
      _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
      _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.DATEE_FFECTIVE, Cypress.env("Date"))
      _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
      _common.clickOn_goToButton_toSelectModule(cnt.uuid.PROCUREMENTCONTRACT, "Quote")
      cy.wait(3000) //Required wait to load page
    })
    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
      _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE);
    });
    _common.maximizeContainer(cnt.uuid.QUOTES)
    _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES, app.GridCells.DATE_QUOTED, Cypress.env("Date"))
    _common.minimizeContainer(cnt.uuid.QUOTES)
  })

  it("Verify click Search Button: it will search PRC_ITEM from all valid QTN or CON or MDC_MATERIAL", function () {
    _common.openTab(app.TabBar.QUOTE_ITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_QUOTE_ITEM);
    });
    _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
    _common.getText_fromCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.MDC_MATERIAL_FK).then(($ele) => {
      Cypress.env("Quote_Material", $ele.text())
    })
    _common.openTab(app.TabBar.QUOTES)
    cy.wait(2000) //Required wait to load page
    _common.getText_fromCell(cnt.uuid.QUOTES, app.GridCells.CODE).then(($ele) => {
      Cypress.env("Quote_Code", $ele.text())
    })
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.QUOTES, "Contract")
    cy.wait(5000) //Required wait to load page
    _common.openTab(app.TabBar.ORDER_ITEM)
    //MATERIAL_NO_ARRAY = _common.returnArrayForMultipleCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE)
    _common.findRadio_byLabel_fromModal(CONTAINERS_UPDATE_ITEM_PRICE.LABEL_1, commonLocators.CommonKeys.RADIO, 0, commonLocators.CommonElements.RADIO_SPACE_TO_UP)
    _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
    cy.wait(500).then(() => {
      _common.clickOn_cellHasValue_fromModal(app.GridCells.SOURCE_CODE_DESC, Cypress.env("Quote_Code"))
      _common.assert_cellDataByContent_fromModal(app.GridCells.ITEM_CODE_DESC, Cypress.env("Quote_Material"))
    })
  })

  it("Verify unit rate:In children level show correct value;", function () {
    cy.wait(500).then(() => { //Required wait to load page
      _common.clickOn_cellHasValue_fromModal(app.GridCells.SOURCE_CODE_DESC, Cypress.env(CONTRACT_CODE))
    })
    _common.getText_fromCell_fromModal(app.GridCells.UNIT_RATE).then(($ele) => {
      Cypress.env("Contract_Unite_Rate", $ele.text())
    })
    _common.clickOn_cellHasValue_fromModal(app.GridCells.SOURCE_CODE_DESC, Cypress.env("Quote_Code"))
    _common.getText_fromCell_fromModal(app.GridCells.UNIT_RATE).then(($ele) => {
      Cypress.env("Quote_Unite_Rate", $ele.text())
    })
    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
    _common.openTab(app.TabBar.ORDER_ITEM)
    _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT, CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_NUMBER_FIRST_ITEM)
    cy.wait(500).then(() => { //Required wait to load page
      _common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRICE, Cypress.env("Contract_Unite_Rate"))
    })
    _common.openTab(app.TabBar.CONTRACT)
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.PROCUREMENTCONTRACT, "Quote")
    cy.wait(3000) //Required wait to load page
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.QUOTE_ITEM)
    _common.select_rowHasValue(cnt.uuid.QUOTES_ITEMS, CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_NUMBER_FIRST_ITEM)
    cy.wait(500).then(() => { //Required wait to load page
      _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE, Cypress.env("Quote_Unite_Rate"))
    })
  })

  it("Verify Include Neutral Material: default checked, if checked means also search the linked MDC_MATERIAL from the catalog/QTN/CON", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.CONTRACT);
    cy.wait(3000) //Required wait to load page
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ORDER_ITEM)
    _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT, CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_NUMBER_FIRST_ITEM)
    _common.goToButton_inActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, Buttons.ButtonText.GO_TO_MATERIAL)
    cy.wait(3000) //Required wait to load page
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2);
      _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORD);
    });
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
    _common.select_rowHasValue(cnt.uuid.MATERIAL_RECORDS, CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_NUMBER_FIRST_ITEM)
    _common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_RECORDS, app.GridCells.NEUTRAL_MATERIAL_CATALOG_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOG.CODE)
    _common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_RECORDS, app.GridCells.MDC_MATERIAL_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_NUMBER_SECOND_ITEM)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.CONTRACT);
    cy.wait(3000) //Required wait to load page
    _common.openTab(app.TabBar.CONTRACT)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, Cypress.env(CONTRACT_CODE))
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE)
    _common.findRadio_byLabel_fromModal(CONTAINERS_UPDATE_ITEM_PRICE.LABEL_1, commonLocators.CommonKeys.RADIO, 0, commonLocators.CommonElements.RADIO_SPACE_TO_UP)
    _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
    cy.wait(2000) //Required wait to load page
    _common.clickOn_cellHasValue_fromModal(app.GridCells.ITEM_CODE_DESC, CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_NUMBER_SECOND_ITEM)
    _modalView.findModal().findButtonIndex("btn btn-default ng-binding", 0).clickIn()
    cy.wait(2000) //Required wait to load page
    _common.clickOn_cellHasValue_fromModal(app.GridCells.SOURCE_CODE_DESC, Cypress.env(CONTRACT_CODE))
    _common.Verify_cellNotIncludeText_fromModal(app.GridCells.ITEM_CODE_DESC, CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_NUMBER_SECOND_ITEM)
    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
  })

  it("Verify variance: Root rate Children Converted Unit Rate;", function () {
    _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
      _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT, CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_NUMBER_FIRST_ITEM)
      _common.saveCellDataToEnv(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRICE, "Contract_ItemPrice")
      _common.edit_containerCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_UPDATE_ITEM_PRICE.UPDATE_PRICE_VALUE)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE)
      _common.findRadio_byLabel_fromModal(CONTAINERS_UPDATE_ITEM_PRICE.LABEL_1, commonLocators.CommonKeys.RADIO, 0, commonLocators.CommonElements.RADIO_SPACE_TO_UP)
      _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
      _common.clickOn_cellHasValue_fromModal(app.GridCells.SOURCE_CODE_DESC, Cypress.env(CONTRACT_CODE))
      var SUBTRACTED_VALUE = CONTAINERS_UPDATE_ITEM_PRICE.UPDATE_PRICE_VALUE - Cypress.env("Contract_ItemPrice")
      _common.assert_forNumericValues_fromModal(app.GridCells.VARIANCE, SUBTRACTED_VALUE.toString())
    })
  })

  it("Verify unite Rate:In root level, its show item unit rate", function () {
    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
    _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_ITEMS);
      _common.edit_dropdownCellWithCaret(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRC_PRICE_CONDITION_FK, commonLocators.CommonKeys.LIST, CONTAINERS_ITEMS.PRICE_CONDITION)
      _common.edit_containerCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.DISCOUNT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.DISCOUNT_PERCENTAGE)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _validate.verify_unitRate_isEqualsTo_TotalPRice(CONTAINERS_ITEMS.DISCOUNT_PERCENTAGE)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE)
      _common.findRadio_byLabel_fromModal(CONTAINERS_UPDATE_ITEM_PRICE.LABEL_1, commonLocators.CommonKeys.RADIO, 0, commonLocators.CommonElements.RADIO_SPACE_TO_UP)
      _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
      cy.wait(2000) //Required wait to load page
      _common.clickOn_cellHasValue_fromModal(app.GridCells.SOURCE_CODE_DESC, Cypress.env(CONTRACT_CODE))
      cy.wait(500).then(() => { //Required wait to load page
        _common.assert_forNumericValues_fromModal(app.GridCells.UNIT_RATE, Cypress.env("ItemsTotalPrice"))
      })
    })
  });

  it("Verify Converted Unit Rate:only applicable to children level, if BAS_UOM_PRICE_UNIT_FK are same between root & children, it will equal to unit rate else need to convert unit rate based on root UoM", function () {
    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
    _common.edit_containerCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.DISCOUNT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_UPDATE_ITEM_PRICE.ZERO_DISCOUNT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ORDER_ITEM)
    _common.create_newRecord(cnt.uuid.ITEMSCONTRACT)
    _common.edit_dropdownCellWithInput(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.MATERIAL_FOR_CONVERTED_VALUE)
    _common.edit_containerCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, 1)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    cy.wait(2000) //Required wait to load page
    _common.waitForLoaderToDisappear()
    _common.saveNumericCellDataToEnv(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRICE, "ItemPrice")
    _common.goToButton_inActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, Buttons.ButtonText.GO_TO_MATERIAL)
    cy.wait(3000) //Required wait to load page
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2);
    });
    _common.select_rowHasValue(cnt.uuid.MATERIAL_RECORDS, CONTAINERS_ITEMS.MATERIAL_FOR_CONVERTED_VALUE)
    _common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_RECORDS, app.GridCells.UOM_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_UPDATE_ITEM_PRICE.MATERIAL_RECORD_UOM_AFTER)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.CONTRACT);
    cy.wait(3000) //Required wait to load page
    _common.openTab(app.TabBar.ORDER_ITEM)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE)
    _common.findRadio_byLabel_fromModal(CONTAINERS_UPDATE_ITEM_PRICE.LABEL_1, commonLocators.CommonKeys.RADIO, 0, commonLocators.CommonElements.RADIO_SPACE_TO_UP)
    _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
    _package.select_priceVersion_fromCaret(CONTAINERS_UPDATE_ITEM_PRICE.PRICE_VERSION)
    cy.wait(2000) //Required wait to load page
    _common.clickOn_cellHasValue_fromModal(app.GridCells.SOURCE_CODE_DESC, CONTAINERS_ITEMS.MATERIAL_FOR_CONVERTED_VALUE)
    _common.set_cellCheckboxValue_fromModal(app.SubContainerLayout.SELECTED, commonLocators.CommonKeys.CHECK)
    _common.clickOn_modalFooterButton(Buttons.ButtonText.UPDATE)
    _common.clickOn_modalFooterButton(Buttons.ButtonText.OK)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, CONTAINERS_ITEMS.MATERIAL_FOR_CONVERTED_VALUE)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.wait(2000).then(() => {
      var convertedPrice = Cypress.env("ItemPrice") * 0.01
      var convertedVAlueInString = convertedPrice.toString()
      _common.assert_forNumericValues(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRICE, convertedVAlueInString)
    })
    _common.waitForLoaderToDisappear()
  })

  it("Verify Click “Update” button:update price and price extra:PRICE = Converted Unit Rate * PRICE_UNIT / FACTOR_PRICE_UNIT / (100-DISCOUNT) *100;PRICE_EXTRA = 0 (remove price condition)", function () {
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, CONTAINERS_ITEMS.MATERIAL_FOR_CONVERTED_VALUE)
    _package.updatePricewithDiscountPercentage(CONTAINERS_ITEMS.DISCOUNT_PERCENTAGE, CONTAINERS_ITEMS.FACTOR_INPUT)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE)
    _common.findRadio_byLabel_fromModal(CONTAINERS_UPDATE_ITEM_PRICE.LABEL_1, commonLocators.CommonKeys.RADIO, 0, commonLocators.CommonElements.RADIO_SPACE_TO_UP)
    _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
    _package.select_priceVersion_fromCaret(CONTAINERS_UPDATE_ITEM_PRICE.PRICE_VERSION)
    cy.wait(2000)  //Required wait to load page
    _common.clickOn_cellHasValue_fromModal(app.GridCells.SOURCE_CODE_DESC, CONTAINERS_ITEMS.MATERIAL_FOR_CONVERTED_VALUE)
    _common.set_cellCheckboxValue_fromModal(app.SubContainerLayout.SELECTED, commonLocators.CommonKeys.CHECK)
    _common.clickOn_modalFooterButton(Buttons.ButtonText.UPDATE)
    _common.clickOn_modalFooterButton(Buttons.ButtonText.OK)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, CONTAINERS_ITEMS.MATERIAL_FOR_CONVERTED_VALUE)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.wait(500).then(() => {  //Required wait to load page
      _common.assert_forNumericValues(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRICE, Cypress.env("FinalConvertedPrice"))
    })
    _common.delete_recordFromContainer(cnt.uuid.ITEMSCONTRACT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  })
})

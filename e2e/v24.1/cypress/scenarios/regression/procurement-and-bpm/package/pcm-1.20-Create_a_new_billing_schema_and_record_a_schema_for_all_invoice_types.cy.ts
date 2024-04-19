import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _estimatePage, _billPage, _projectPage, _materialPage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package } from "cypress/pages";

const allure = Cypress.Allure.reporter.getInterface();


const BILLINGSCHEMADESC = "Billing" + Cypress._.random(0, 999)
const BILLINGSCHEMADETAILSDESC = "Billing" + Cypress._.random(0, 999)

let CONTAINER_COLUMNS_BILLING_SCHEMA,
  CONTAINER_COLUMNS_BILLING_SCHEMA_DETAILS,
  CONTAINER_BILLING_SCHEMA_DETAILS,
  CONTAINER_COLUMNS_INVOICE,
  CONTAINER_INVOICE,
  CONTAINER_COLUMNS_PROCUREMENT_CONFIGURATION,
  CONTAINER_PROCUREMENT_CONFIGURATION,
  CONTAINER_COLUMNS_INVOICE_BILLING_SCHEMA


allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 1.20 | Create a new billing schema and record a schema for all invoice types")

describe('PCM- 1.20 | Create a new billing schema and record a schema for all invoice types', () => {
  before(function () {
    cy.fixture("pcm/pcm-1.20-Create_a_new_billing_schema_and_record_a_schema_for_all_invoice_types.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BILLING_SCHEMA = this.data.CONTAINER_COLUMNS.BILLING_SCHEMA
      CONTAINER_COLUMNS_BILLING_SCHEMA_DETAILS = this.data.CONTAINER_COLUMNS.BILLING_SCHEMA_DETAILS
      CONTAINER_BILLING_SCHEMA_DETAILS = this.data.CONTAINERS.BILLING_SCHEMA_DETAILS
      CONTAINER_COLUMNS_INVOICE = this.data.CONTAINER_COLUMNS.INVOICE
      CONTAINER_INVOICE = this.data.CONTAINERS.INVOICE
      CONTAINER_COLUMNS_PROCUREMENT_CONFIGURATION = this.data.CONTAINER_COLUMNS.PROCUREMENT_CONFIGURATION
      CONTAINER_PROCUREMENT_CONFIGURATION = this.data.CONTAINERS.PROCUREMENT_CONFIGURATION
      CONTAINER_COLUMNS_INVOICE_BILLING_SCHEMA = this.data.CONTAINER_COLUMNS.INVOICE_BILLING_SCHEMA

      cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });
  });
  
  after(() => {
    cy.LOGOUT();
  });

  it('TC - Create billing schema record', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING_SCHEMA);
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA, app.FooterTab.BILLINGSCHEMA)
      _common.setup_gridLayout(cnt.uuid.BILLING_SCHEMA, CONTAINER_COLUMNS_BILLING_SCHEMA)
    })
    const dayjs = require('dayjs')
    let date = parseInt(dayjs().format('DD'))
    let month = dayjs().format('MM')
    let year = dayjs().format('YYYY')
    let vaildTo = dayjs().daysInMonth() + "/" + month + "/" + year;
    let validFrom = date + "/" + month + "/" + year;
    cy.wait(2000)
    _common.maximizeContainer(cnt.uuid.BILLING_SCHEMA)
    _common.clear_subContainerFilter(cnt.uuid.BILLING_SCHEMA);
    _common.create_newRecord(cnt.uuid.BILLING_SCHEMA)
    _common.enterRecord_inNewRow(cnt.uuid.BILLING_SCHEMA, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, BILLINGSCHEMADESC)
    _common.enterRecord_inNewRow(cnt.uuid.BILLING_SCHEMA, app.GridCells.VALID_FROM, app.InputFields.INPUT_GROUP_CONTENT, validFrom)
    _common.enterRecord_inNewRow(cnt.uuid.BILLING_SCHEMA, app.GridCells.VALID_TO, app.InputFields.INPUT_GROUP_CONTENT, vaildTo)
    cy.SAVE()
    _common.minimizeContainer(cnt.uuid.BILLING_SCHEMA)
  });

  it('TC - Create billing schema details record for all invoice type', function () {
    _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA_DETAILS, app.FooterTab.BILLINGSCHEMADETAILS)
      _common.setup_gridLayout(cnt.uuid.BILLING_SCHEMA_DETAILS, CONTAINER_COLUMNS_BILLING_SCHEMA_DETAILS)
      _common.set_columnAtTop([CONTAINER_COLUMNS_BILLING_SCHEMA_DETAILS.descriptioninfo,
      CONTAINER_COLUMNS_BILLING_SCHEMA_DETAILS.billinglinetypefk,
      CONTAINER_COLUMNS_BILLING_SCHEMA_DETAILS.taxcodefk,
      CONTAINER_COLUMNS_BILLING_SCHEMA_DETAILS.generalstypefk,
      CONTAINER_COLUMNS_BILLING_SCHEMA_DETAILS.credfactor], cnt.uuid.BILLING_SCHEMA_DETAILS)
    })
    _common.maximizeContainer(cnt.uuid.BILLING_SCHEMA_DETAILS)
    _common.select_allContainerData(cnt.uuid.BILLING_SCHEMA_DETAILS)
    _common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS, Buttons.ToolBar.ACTIONS);
    _mainView.findButton(Buttons.ToolBar.ICO_TREE_LEVEL_COLLAPSE).clickIn()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.DESCRIPTION_INFO, CONTAINER_BILLING_SCHEMA_DETAILS.TYPE_4)
    _common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS, Buttons.ToolBar.ACTIONS);
    _mainView.findButton(Buttons.ToolBar.ICO_TREE_LEVEL_EXPAND).clickIn()
    _billPage.createBillingSchemaDetailsRecord(cnt.uuid.BILLING_SCHEMA_DETAILS, CONTAINER_BILLING_SCHEMA_DETAILS.TYPE_1, BILLINGSCHEMADETAILSDESC, CONTAINER_BILLING_SCHEMA_DETAILS.NET_TOTAL, CONTAINER_BILLING_SCHEMA_DETAILS.GENERAL_TYPE, CONTAINER_BILLING_SCHEMA_DETAILS.TAX_CODE, CONTAINER_BILLING_SCHEMA_DETAILS.CRED_FACTOR)
    _billPage.createBillingSchemaDetailsRecord(cnt.uuid.BILLING_SCHEMA_DETAILS, CONTAINER_BILLING_SCHEMA_DETAILS.TYPE_2, BILLINGSCHEMADETAILSDESC, CONTAINER_BILLING_SCHEMA_DETAILS.NET_TOTAL, CONTAINER_BILLING_SCHEMA_DETAILS.GENERAL_TYPE, CONTAINER_BILLING_SCHEMA_DETAILS.TAX_CODE, CONTAINER_BILLING_SCHEMA_DETAILS.CRED_FACTOR)
    _billPage.createBillingSchemaDetailsRecord(cnt.uuid.BILLING_SCHEMA_DETAILS, CONTAINER_BILLING_SCHEMA_DETAILS.TYPE_3, BILLINGSCHEMADETAILSDESC, CONTAINER_BILLING_SCHEMA_DETAILS.NET_TOTAL, CONTAINER_BILLING_SCHEMA_DETAILS.GENERAL_TYPE, CONTAINER_BILLING_SCHEMA_DETAILS.TAX_CODE, CONTAINER_BILLING_SCHEMA_DETAILS.CRED_FACTOR)
  });

  it('TC - Create procurement configuration', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.HEADER).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER)
      _common.setup_gridLayout(cnt.uuid.CONFIGURATION_HEADER, CONTAINER_COLUMNS_PROCUREMENT_CONFIGURATION)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER, app.GridCells.DESCRIPTION_INFO, CONTAINER_PROCUREMENT_CONFIGURATION.VALUE)
    _common.openTab(app.TabBar.HEADER).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLINGSCHEMATA, app.FooterTab.BILLING_SCHEMATA)
    })
    _common.create_newRecord(cnt.uuid.BILLINGSCHEMATA)
    _common.edit_dropdownCellWithInput(cnt.uuid.BILLINGSCHEMATA, app.GridCells.BILLING_SCHEMA_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, BILLINGSCHEMADESC)
    cy.SAVE()
  });

  it('TC - Create invoice header and change procurement configuration using wizard option', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE);
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER)
      _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE)
    })
    _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
    _common.create_newRecord(cnt.uuid.INVOICEHEADER)
    cy.wait(1000) //required wait to load page
    _common.enterRecord_inNewRow(cnt.uuid.INVOICEHEADER, app.GridCells.REFERENCE, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINER_INVOICE.REFERENCE)
    cy.SAVE()
    _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.BUSINESS_PARTNER, CONTAINER_INVOICE.BUSINESS_PARTNER, commonLocators.CommonKeys.GRID)
    _common.clickOn_modalFooterButton(Buttons.ButtonText.OK)
    cy.wait(2000)  //required wait to load page
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.getText_fromCell(cnt.uuid.INVOICEHEADER, app.GridCells.BILLING_SCHEMA_FK).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("DEFAULTBILLINGSCHEMA", $ele1.text())
    })
    _common.minimizeContainer(cnt.uuid.INVOICEHEADER)
    _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INVOICE_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA)
      _common.setup_gridLayout(cnt.uuid.INVOICE_BILLING_SCHEMA, CONTAINER_COLUMNS_INVOICE_BILLING_SCHEMA)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.BILLING_LINE_TYPE_FK, CONTAINER_BILLING_SCHEMA_DETAILS.NET_TOTAL)
    _common.getText_fromCell(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.DESCRIPTION).eq(0).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("DEFAULTRECORD_DESC", $ele1.text())
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION)
    _billPage.change_Procurement_Configuration(CONTAINER_INVOICE.PROCUREMENT_CONFIGURATION, CONTAINER_INVOICE.BILLING_SCHEMA)
    _common.select_rowInContainer(cnt.uuid.INVOICEHEADER)
    _common.getText_fromCell(cnt.uuid.INVOICEHEADER, app.GridCells.INV_TYPE_FK).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("INVOICE_TYPE", $ele1.text())
    })
    _common.getText_fromCell(cnt.uuid.INVOICEHEADER, app.GridCells.BILLING_SCHEMA_FK).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("BILLINGSCHEMA_TYPE", $ele1.text())
    })
    _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INVOICE_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA)
      _common.setup_gridLayout(cnt.uuid.INVOICE_BILLING_SCHEMA, CONTAINER_COLUMNS_INVOICE_BILLING_SCHEMA)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.BILLING_LINE_TYPE_FK, CONTAINER_BILLING_SCHEMA_DETAILS.NET_TOTAL)
    _common.getText_fromCell(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.DESCRIPTION).eq(0).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("RECORD_DESC", $ele1.text())
    })
  });

  it('TC - Verify changed Configuration Billing Schema ', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING_SCHEMA);
    _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA, app.FooterTab.BILLINGSCHEMA)
      _common.setup_gridLayout(cnt.uuid.BILLING_SCHEMA, CONTAINER_COLUMNS_BILLING_SCHEMA)
    })
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA, app.GridCells.DESCRIPTION_INFO, Cypress.env("BILLINGSCHEMA_TYPE"))
    _common.maximizeContainer(cnt.uuid.BILLING_SCHEMA_DETAILS)
    _common.select_allContainerData(cnt.uuid.BILLING_SCHEMA_DETAILS)
    _common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS, Buttons.ToolBar.ICO_TREE_COLLAPSE_ALL);
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.DESCRIPTION_INFO, CONTAINER_BILLING_SCHEMA_DETAILS.TYPE_4)
    _common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS, Buttons.ToolBar.ICO_TREE_EXPAND);
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.DESCRIPTION_INFO, Cypress.env("INVOICE_TYPE"))
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.BILLING_LINE_TYPE_FK, CONTAINER_BILLING_SCHEMA_DETAILS.NET_TOTAL)
    _billPage.assertBillingSchemaDetailsContainerRecord(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.DESCRIPTION_INFO, Cypress.env("RECORD_DESC"))
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE);
    _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER)
      _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE)
    })
    _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
    _common.create_newRecord(cnt.uuid.INVOICEHEADER)
    _common.enterRecord_inNewRow(cnt.uuid.INVOICEHEADER, app.GridCells.REFERENCE, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINER_INVOICE.REFERENCE_1)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.BUSINESS_PARTNER, CONTAINER_INVOICE.BUSINESS_PARTNER, commonLocators.CommonKeys.GRID)
    _common.clickOn_modalFooterButton(Buttons.ButtonText.OK)
    _common.clickOn_activeRowCell(cnt.uuid.INVOICEHEADER, app.GridCells.BILLING_SCHEMA_FK)
    _common.edit_dropdownCellWithInput(cnt.uuid.INVOICEHEADER, app.GridCells.BILLING_SCHEMA_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, BILLINGSCHEMADESC)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.INVOICEHEADER).findGrid().findActiveRow().findCell(app.GridCells.REFERENCE)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.INVOICEHEADER, app.GridCells.BILLING_SCHEMA_FK, BILLINGSCHEMADESC)
    _common.getText_fromCell(cnt.uuid.INVOICEHEADER, app.GridCells.INV_TYPE_FK).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("INVOICE_TYPE1", $ele1.text())
    })
    _common.minimizeContainer(cnt.uuid.INVOICEHEADER)
  })

  it('TC - Update billing schema details record ', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING_SCHEMA);
    _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA, app.FooterTab.BILLINGSCHEMA)
      _common.setup_gridLayout(cnt.uuid.BILLING_SCHEMA, CONTAINER_COLUMNS_BILLING_SCHEMA)
      _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA, app.GridCells.DESCRIPTION_INFO, BILLINGSCHEMADESC)
      _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA_DETAILS, app.FooterTab.BILLINGSCHEMADETAILS)
        _common.setup_gridLayout(cnt.uuid.BILLING_SCHEMA_DETAILS, CONTAINER_COLUMNS_BILLING_SCHEMA_DETAILS)
        _common.maximizeContainer(cnt.uuid.BILLING_SCHEMA_DETAILS)
        _common.select_allContainerData(cnt.uuid.BILLING_SCHEMA_DETAILS)
        _common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS, Buttons.ToolBar.ICO_TREE_COLLAPSE_ALL);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.DESCRIPTION_INFO, CONTAINER_BILLING_SCHEMA_DETAILS.TYPE_4)
        _common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS, Buttons.ToolBar.ICO_TREE_EXPAND);
        _billPage.verifyInvoiceType(Cypress.env("INVOICE_TYPE1"))
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.DESCRIPTION_INFO, Cypress.env("INVOICE_TYPE1"))
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.BILLING_LINE_TYPE_FK, CONTAINER_BILLING_SCHEMA_DETAILS.NET_TOTAL)
        _common.edit_containerCell(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.BILLING_LINE_TYPE_FK, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_BILLING_SCHEMA_DETAILS.SUB_TOTAL)
        _modalView.findPopup().select_popupItem("list", CONTAINER_BILLING_SCHEMA_DETAILS.SUB_TOTAL)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
      })
    })
  })

  it('TC - Verify billing schema record details updated after recalculation in invoice header', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE);
    _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER)
      _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE)
      _common.clickOn_cellHasUniqueValue(cnt.uuid.INVOICEHEADER, app.GridCells.REFERENCE, CONTAINER_INVOICE.REFERENCE_1)
      _common.clickOn_toolbarButton(cnt.uuid.INVOICE_BILLING_SCHEMA, Buttons.ToolBar.ICO_RECALCULATE)
      _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.BILLING_LINE_TYPE_FK, CONTAINER_BILLING_SCHEMA_DETAILS.SUB_TOTAL)
    })
  })

  it('TC - Change Billing Schema in invoice header and verify ', function () {
    cy.wait(500).then(() => {
      _common.clickOn_cellHasUniqueValue(cnt.uuid.INVOICEHEADER, app.GridCells.BILLING_SCHEMA_FK, BILLINGSCHEMADESC)
      _common.edit_dropdownCellWithInput(cnt.uuid.INVOICEHEADER, app.GridCells.BILLING_SCHEMA_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("DEFAULTBILLINGSCHEMA"))
      _common.clickOn_cellHasUniqueValue(cnt.uuid.INVOICEHEADER, app.GridCells.REFERENCE, CONTAINER_INVOICE.REFERENCE_1)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.clickOn_cellHasUniqueValue(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.BILLING_LINE_TYPE_FK, CONTAINER_BILLING_SCHEMA_DETAILS.NET_TOTAL)
      _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.DESCRIPTION, Cypress.env("DEFAULTRECORD_DESC"))
    })
  })
})

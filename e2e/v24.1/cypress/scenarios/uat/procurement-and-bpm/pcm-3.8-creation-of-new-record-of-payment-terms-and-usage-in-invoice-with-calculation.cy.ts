import {_salesPage,_common, _estimatePage, _validate, _mainView, _boqPage, _package, _bidPage, _saleContractPage, _procurementPage } from "cypress/pages";
import {generic, app, tile, cnt,btn } from "cypress/locators";

const allure = Cypress.Allure.reporter.getInterface();
const PT_CODE1="PC1-" + Cypress._.random(0, 999);
const PT_CODE2="PC2-" + Cypress._.random(0, 999);
const PT_CODE3="PC3-" + Cypress._.random(0, 999);
const INVOICE_NO="INVOICE_NO-" + Cypress._.random(0, 999);


allure.epic("PROCUREMENT AND BPM");
allure.feature("Invoice");

allure.story("PCM- 3.8 | Creation of new record of payment terms and usage in invoice with calculation.");

describe("PCM- 3.8 | Creation of new record of payment terms and usage in invoice with calculation.", () => {

  beforeEach(function () {
    cy.fixture("procurement-and-bpm/pcm-3.8-creation-of-new-record-of-payment-terms-and-usage-in-invoice-with-calculation.json").then((data) => {
      this.data = data;
    });
  });

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("procurement-and-bpm/pcm-3.8-creation-of-new-record-of-payment-terms-and-usage-in-invoice-with-calculation.json").then((data) => {
      this.data = data;
      const standerdInputs = this.data.Prerequisites.SidebarInputs;
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.tabBar.project).then(() => {
        _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
      });
      _common.openSidebarOption(standerdInputs.Search).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });
  });

  it("TC - Create payment term", function () {
      const PAYMENTTERMINPUT = this.data.Payment_Term;
      const PAYMENTTERMINCOL = this.data.Headers.Column_PaymentTerm
      const STD_INPUTS = this.data.Prerequisites.SidebarInputs;
      _common.openSidebarOption(STD_INPUTS.QuickStart);
      _common.search_fromSidebar(STD_INPUTS.searchTypeQuick, STD_INPUTS.PaymentTerm); 
      cy.wait(1000)
      _common.openTab(app.tabBar.PAYMENT_TERMS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.Payment_Term, app.FooterTab.PAYMENT_TERMS, 0);
      _common.setup_gridLayout(cnt.uuid.Payment_Term, PAYMENTTERMINCOL)
      });
      _common.waitForLoaderToDisappear()
      _common.maximizeContainer(cnt.uuid.Payment_Term)
      _common.create_newRecord(cnt.uuid.Payment_Term)
      _package.enterRecord_toCreatePaymentTerm(cnt.uuid.Payment_Term,PT_CODE1,PT_CODE2,PT_CODE3,PAYMENTTERMINPUT.NetDay,PAYMENTTERMINPUT.DiscountDays,PAYMENTTERMINPUT.DiscountPercent,PAYMENTTERMINPUT.DayMonth,PAYMENTTERMINPUT.CalType)
      cy.SAVE()
      _common.minimizeContainer(cnt.uuid.Payment_Term)
      _common.saveCellDataToEnv(cnt.uuid.Payment_Term,app.GridCells.DISCOUNT_PERCENT,STD_INPUTS.Discountprice)
      cy.wait(1000)
  });
  it("TC - Create invoice header", function () {
      const STD_INPUTS = this.data.Prerequisites.SidebarInputs;
      const COLOUMINVOICEHEADER = this.data.Headers.Column_InvoiceHeader
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(STD_INPUTS.searchTypeQuick, STD_INPUTS.Invoice);
      _common.waitForLoaderToDisappear() 
      _common.openTab(app.tabBar.invoices).then(() => {
        _common.setDefaultView(app.tabBar.invoices)
        _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 1)
        _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,COLOUMINVOICEHEADER);
      })
      cy.wait(1000)
      _validate.verify_isContainerMinimized(cnt.uuid.INVOICEHEADER)
      _validate.set_ColumnAtTop([COLOUMINVOICEHEADER.paymenttermfk,COLOUMINVOICEHEADER.percentdiscount],cnt.uuid.INVOICEHEADER)
      _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
      _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
      _common.create_newRecord(cnt.uuid.INVOICEHEADER)
      _common.enterRecord_inNewRow(cnt.uuid.INVOICEHEADER,app.GridCells.REFERENCE,app.InputFields.DOMAIN_TYPE_DESCRIPTION,INVOICE_NO)
      _common.edit_dropdownCellWithInput(cnt.uuid.INVOICEHEADER,app.GridCells.BUSINESS_PARTNER_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,STD_INPUTS.AdolfKoch)
      cy.wait(1000)
      cy.SAVE()
      _common.minimizeContainer(cnt.uuid.INVOICEHEADER)
      _validate.verify_invoiceHeaderDetailsForPaymentTerm(cnt.uuid.Invoice_Header_Details,STD_INPUTS.PaymentTerms,'grid',PT_CODE1)
      cy.wait(1000)
      cy.SAVE()
      _common.waitForLoaderToDisappear() 
     
  })
  it("TC - Verify the payment term in Invoice header", function () {
      const STD_INPUTS = this.data.Prerequisites.SidebarInputs;
      _common.assert_cellData_by_contain(cnt.uuid.INVOICEHEADER,app.gridCells.PRCENT_DISCOUNT,Cypress.env(STD_INPUTS.Discountprice))
  }); 

});


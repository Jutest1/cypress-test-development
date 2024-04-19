import {_common, _validate,  _package } from "cypress/pages";
import {sidebar, commonLocators, app, tile, cnt,btn } from "cypress/locators";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
const allure = Cypress.Allure.reporter.getInterface();
const PT_CODE1="PC1-" + Cypress._.random(0, 999);
const PT_CODE2="PC2-" + Cypress._.random(0, 999);
const PT_CODE3="PC3-" + Cypress._.random(0, 999);
const INVOICE_NO="INVOICE_NO-" + Cypress._.random(0, 999);



let CONTAINERS_PAYMENT_TERM;

let CONTAINER_COLUMNS_PAYMENT_TERM;
let CONTAINER_COLUMNS_INVOICE_HEADER;

allure.epic("PROCUREMENT AND BPM");
allure.feature("Invoice");
allure.story("PCM- 3.8 | Creation of new record of payment terms and usage in invoice with calculation.");

  describe('PCM- 3.8 | Creation of new record of payment terms and usage in invoice with calculation', () => {

		before(function () {
			cy.fixture('procurement-and-bpm/pcm-3.8-creation-of-new-record-of-payment-terms-and-usage-in-invoice-with-calculation.json').then((data) => {
				this.data = data;
				CONTAINERS_PAYMENT_TERM = this.data.CONTAINERS.PAYMENT_TERM;
				
				
				CONTAINER_COLUMNS_PAYMENT_TERM=this.data.CONTAINER_COLUMNS.PAYMENT_TERM
				CONTAINER_COLUMNS_INVOICE_HEADER = this.data.CONTAINER_COLUMNS.INVOICE_HEADER
			
			});
	
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.waitForLoaderToDisappear()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	
		after(() => {
			cy.LOGOUT();
		});

  it("TC - Create payment term", function () {
         
    
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PAYMENT_TERM);
		  _common.waitForLoaderToDisappear()

    
      _common.openTab(app.TabBar.PAYMENT_TERMS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PAYMENT_TERM, app.FooterTab.PAYMENT_TERMS, 0);
      _common.setup_gridLayout(cnt.uuid.PAYMENT_TERM, CONTAINER_COLUMNS_PAYMENT_TERM)
      });
      _common.waitForLoaderToDisappear()
      _common.maximizeContainer(cnt.uuid.PAYMENT_TERM)
      _common.create_newRecord(cnt.uuid.PAYMENT_TERM)
      _package.enterRecord_toCreatePaymentTerm(cnt.uuid.PAYMENT_TERM,PT_CODE1,PT_CODE2,PT_CODE3,CONTAINERS_PAYMENT_TERM.NETDAY,CONTAINERS_PAYMENT_TERM.DISCOUNTDAYS,CONTAINERS_PAYMENT_TERM.DISCOUONTPERCENT,CONTAINERS_PAYMENT_TERM.DAYMONTH,CONTAINERS_PAYMENT_TERM.CALTYPE)
      cy.SAVE()
      _common.minimizeContainer(cnt.uuid.PAYMENT_TERM)
      _common.saveCellDataToEnv(cnt.uuid.PAYMENT_TERM,app.GridCells.DISCOUNT_PERCENT,"DISCOUNT_PRICE")
      _common.waitForLoaderToDisappear()
  });
  it("TC - Create invoice header", function () {
     
     
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE);
		  _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.INVOICES).then(() => {
        _common.setDefaultView(app.TabBar.INVOICES)
        _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 1)
        _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE_HEADER);
      })
      _common.waitForLoaderToDisappear()
      _validate.verify_isContainerMinimized(cnt.uuid.INVOICEHEADER)
      _common.set_columnAtTop([CONTAINER_COLUMNS_INVOICE_HEADER.paymenttermfk,CONTAINER_COLUMNS_INVOICE_HEADER.percentdiscount],cnt.uuid.INVOICEHEADER)
      _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
      _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
      _common.create_newRecord(cnt.uuid.INVOICEHEADER)
      _common.enterRecord_inNewRow(cnt.uuid.INVOICEHEADER,app.GridCells.REFERENCE,app.InputFields.DOMAIN_TYPE_DESCRIPTION,INVOICE_NO)
      _common.edit_dropdownCellWithInput(cnt.uuid.INVOICEHEADER,app.GridCells.BUSINESS_PARTNER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PAYMENT_TERM.BPNAME)
      
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.INVOICEHEADER)
      _validate.verify_invoiceHeaderDetailsForPaymentTerm(cnt.uuid.INVOICE_HEADER_DETAILS,commonLocators.CommonKeys.PAYMENT_TERM,commonLocators.CommonKeys.GRID,PT_CODE1)
    
      cy.SAVE()
      _common.waitForLoaderToDisappear() 
     
  })
  it("TC - Verify the payment term in Invoice header", function () {
      

      _common.assert_cellDataByContent_inContainer(cnt.uuid.INVOICEHEADER,app.GridCells.PERCENT_DISCOUNT,Cypress.env("DISCOUNT_PRICE"))
  }); 

});


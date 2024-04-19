import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package } from "cypress/pages";
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import Buttons from "cypress/locators/buttons";

const INVOICE_NO= "VER-"+ Cypress._.random(0, 999);
const SEARCHFORM= "SEARCHFORM-"+ Cypress._.random(0, 999);
const SEARCHDESC = "TEST-"+ Cypress._.random(0, 999);
const FILTERNAME= "FILTERNAME-"+ Cypress._.random(0, 999);

let CONTAINER_COLUMNS_INVOICE;
let CONTAINERS_INVOICE;


const allure = Cypress.Allure.reporter.getInterface();
allure.epic("PROCUREMENT AND BPM");
allure.feature("Invoice");
allure.story("PCM- 2.203 | Sidebar search for Invoice")
describe("PCM- 2.203 | Sidebar search for Invoice", () => {
    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("pcm/pcm-2.203-sidebar-search-for-invoice.json").then((data) => {
            this.data = data;  
            CONTAINER_COLUMNS_INVOICE = this.data.CONTAINER_COLUMNS.INVOICE 
            CONTAINERS_INVOICE = this.data.CONTAINERS.INVOICE;       
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
           
        })
    });

    after(() => {
        cy.LOGOUT();
      });

    it("TC - Create invoice header", function () {
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.INVOICE); 
        _common.openTab(app.TabBar.INVOICES).then(() => {
          _common.setDefaultView(app.TabBar.INVOICES)
          _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 1)
          _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE);
        })
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.set_columnAtTop([CONTAINER_COLUMNS_INVOICE.businesspartnerfk,CONTAINER_COLUMNS_INVOICE.reference],cnt.uuid.INVOICEHEADER)
        _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        _common.create_newRecord(cnt.uuid.INVOICEHEADER)
        _package.enterRecord_toCreateInvoiceHeader({container_UUID:cnt.uuid.INVOICEHEADER,invoiceNo:INVOICE_NO,businessPartner:"Adolf Koch"})
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait      
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.SEARCH_RESULT,INVOICE_NO);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.REFERENCE,INVOICE_NO)
        cy.wait(1000)//required wait
        _validate.verify_enhancedSearch(CONTAINERS_INVOICE.parentElement,CONTAINERS_INVOICE.item,CONTAINERS_INVOICE.BusinessPartner,FILTERNAME)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.BUSINESS_PARTNER_FK,CONTAINERS_INVOICE.BusinessPartner)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait

    })

    it("TC - Verify create search  form",function(){
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.SEARCH_RESULT,INVOICE_NO);
            _validate.verify_createSearchForm(SEARCHDESC,SEARCHFORM,CONTAINERS_INVOICE.BusinessPartner)
            _common.waitForLoaderToDisappear()
            cy.wait(1000)//required wait
           _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.BUSINESS_PARTNER_FK,CONTAINERS_INVOICE.BusinessPartner)
           _common.waitForLoaderToDisappear()
           cy.wait(1000)//required wait
    
        })

       it("TC - Verify Edit search form and search by date",function(){
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.SEARCH_RESULT,INVOICE_NO);
 
        _validate.verify_editTheCurrentSearchForm(SEARCHFORM,CONTAINERS_INVOICE.BusinessPartner2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.BUSINESS_PARTNER_FK,CONTAINERS_INVOICE.BusinessPartner2)
        _validate.verify_searchByDate(CONTAINERS_INVOICE.dateposted,CONTAINERS_INVOICE.label)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth() +1;
        const currentYear = today.getFullYear();
        const TodaysDate = `${currentDay.toString().padStart(2,"0")}/${currentMonth.toString().padStart(2,"0")}/${currentYear.toString()}`
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.DATE_RECEIVED,TodaysDate)
          
      }) 
    
})

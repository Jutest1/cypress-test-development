import { _billPage,_common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _rfqPage, _materialPage, _ticketSystemPage, _businessPartnerPage } from "cypress/pages";
import { app, tile, cnt,btn , sidebar, commonLocators} from "cypress/locators";
import { CONTROLLING_UNIT_DESCRIPTION } from "cypress/pages/variables";
import { DataCells } from "cypress/pages/interfaces";

const INVOICECODE = "RNM_INV-" + Cypress._.random(0, 999)
const allure = Cypress.Allure.reporter.getInterface();
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK = "HS";
const CU_MAIN = "CU_MAIN-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let CONTROLLING_UNIT_MAIN_PARAMETERS:DataCells
let CONTAINER_COLUMNS_INVOICE,CONTAINERS_INVOICE,CONTAINER_COLUMNS_CONTROLLING_UNITS,CONTAINERS_CONTROLLING_UNITS,
CONTAINERS_GENERALS_INVOICE

allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 2.204 | Create a contract directly for cart")
describe("PCM- 2.204 | Create a contract directly for cart", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-2.204-update-generals-value-in-invoice.json").then((data) => {
            this.data = data
        })
    })
        before(function () {
            cy.preLoading(
                Cypress.env("adminUserName"), 
                Cypress.env("adminPassword"),             
                Cypress.env("parentCompanyName"), 
                Cypress.env("childCompanyName"));
        cy.fixture("pcm/pcm-2.204-update-generals-value-in-invoice.json").then((data) => {
            this.data = data;
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]: CLERK
            }
            CONTAINERS_CONTROLLING_UNITS = this.data.CONTAINERS.CONTROLLING_UNITS
            CONTAINER_COLUMNS_CONTROLLING_UNITS = this.data.CONTAINER_COLUMNS.CONTROLLING_UNITS;
            CONTROLLING_UNIT_MAIN_PARAMETERS= {
                [app.GridCells.DESCRIPTION_INFO]: CU_MAIN,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNITS.QUANTITY[0],
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNITS.UOM[0]
            }
            CONTAINERS_INVOICE = this.data.CONTAINERS.INVOICE
            CONTAINER_COLUMNS_INVOICE = this.data.CONTAINER_COLUMNS.INVOICE;
       
            CONTAINERS_GENERALS_INVOICE = this.data.CONTAINERS.GENERALS_INVOICE
       
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

    after(() => {
        cy.LOGOUT();
    })

    it("TC - Create and Pin the Project and Add Controlling Unit.", function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
		_common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
			_common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNITS)
		});
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
		_controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_MAIN_PARAMETERS);
		cy.SAVE()
		_common.waitForLoaderToDisappear()

		_common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
    })
    it("TC - Navigating to Invoice header and creating new record", function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.INVOICES).then(() => {
          _common.setDefaultView(app.TabBar.INVOICES)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 1)
          _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE);
        })
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        _common.create_newRecord(cnt.uuid.INVOICEHEADER)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        _package.enterRecord_toCreateInvoiceHeader({ container_UUID: cnt.uuid.INVOICEHEADER, invoiceNo: INVOICECODE, businessPartner: CONTAINERS_INVOICE.BP })
         cy.SAVE() 
         _common.waitForLoaderToDisappear()
    });
    it("TC - Creating Generals with type Nachlass and Verifying same with Billing schema  ", function () {
        _common.openTab(app.TabBar.APPLICATION).then(() => {
        _common.select_tabFromFooter(cnt.uuid.GENERALS_INVOICE, app.FooterTab.GENERALS,1)
        })
        _common.clear_subContainerFilter(cnt.uuid.GENERALS_INVOICE)
        _common.create_newRecord(cnt.uuid.GENERALS_INVOICE)
        cy.wait(1000)//required waits
        _common.edit_dropdownCellWithInput(cnt.uuid.GENERALS_INVOICE,app.GridCells.PRC_GENERALS_TYPE_FK,'listexact',app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_GENERALS_INVOICE.NACHLESS) 
        cy.wait(2000)//required waits
        _common.enterRecord_inNewRow(cnt.uuid.GENERALS_INVOICE,app.GridCells.VALUE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_GENERALS_INVOICE.VALUE[0]) 
        _common.edit_dropdownCellWithInput(cnt.uuid.GENERALS_INVOICE,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CU_MAIN)
        cy.wait(1000)//required waits
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.GENERALS_INVOICE,app.GridCells.VALUE,"TYPE_NACHLESS")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });
    it("TC - Creating Generals with type Nachlass and Verifying same with Billing schema ", function () {

        _common.openTab(app.TabBar.APPLICATION).then(() => {
        _common.select_tabFromFooter(cnt.uuid.INVOICE_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA)
        })
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,CONTAINERS_GENERALS_INVOICE.NACHLESS)
        cy.wait(1000)//required waits
        _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICE_BILLING_SCHEMA,app.GridCells.VALUE,Cypress.env("TYPE_NACHLESS"))
    });
    it("TC - Creating Generals with type Baustrom and Verifying same with Billing schema ", function () {
        _common.openTab(app.TabBar.APPLICATION).then(() => {
        cy.wait(1000)//required waits
        _common.select_tabFromFooter(cnt.uuid.GENERALS_INVOICE, app.FooterTab.GENERALS,1)
        })
        _common.clear_subContainerFilter(cnt.uuid.GENERALS_INVOICE)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.GENERALS_INVOICE,app.GridCells.PRC_GENERALS_TYPE_FK,'listexact',app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_GENERALS_INVOICE.BAUSTROM) 
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.GENERALS_INVOICE,app.GridCells.VALUE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_GENERALS_INVOICE.VALUE[1]) 
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.GENERALS_INVOICE,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CU_MAIN)
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.GENERALS_INVOICE,app.GridCells.VALUE,"TYPE_Baustrom")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
  
    }); 
    it("TC - Creating Generals with type Baustrom and Verifying same with Billing schema ", function () {
        _common.openTab(app.TabBar.APPLICATION).then(() => {
        _common.select_tabFromFooter(cnt.uuid.INVOICE_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA)
         })
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
         cy.wait(1000)//required waits
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,CONTAINERS_GENERALS_INVOICE.BAUSTROM)
        cy.wait(1000)//required waits
        _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICE_BILLING_SCHEMA,app.GridCells.VALUE,Cypress.env("TYPE_Baustrom"))
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required waits
    });
    it("TC - Verifying  Nachlass same with value 0 ", function () {
    
        _common.openTab(app.TabBar.APPLICATION).then(() => {
        _common.select_tabFromFooter(cnt.uuid.INVOICE_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA)
        })
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
         cy.wait(1000)//required waits
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,CONTAINERS_GENERALS_INVOICE.NACHLESS)
        cy.wait(1000)//required waits
        _common.assert_cellData(cnt.uuid.INVOICE_BILLING_SCHEMA,app.GridCells.VALUE,CONTAINERS_GENERALS_INVOICE.VALUE[2])
    });
});   
    

    
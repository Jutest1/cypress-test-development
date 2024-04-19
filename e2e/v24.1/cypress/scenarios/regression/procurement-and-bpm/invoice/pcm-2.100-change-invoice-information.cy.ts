
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _controllingUnit, _validate } from "cypress/pages";
import { app, tile, cnt, commonLocators, btn, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const CU_DESC = "CU-DESC-" + Cypress._.random(0, 999);
const CU_DESC1 = "CU-DESC1-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS:DataCells
let CONTROLLING_UNIT_PARAMETERS_1:DataCells

const INVOICE_NO = "INVOICE_NO_" + Cypress._.random(0, 999);
const INVOICE_NO_1 = "INVOICE_NO_1_" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_INVOICE_HEADER
let CONTAINERS_INVOICE_HEADER


const PROJECT_NO="39" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Invoice");
ALLURE.story("PCM- 2.100 | Change invoice information");

describe("PCM- 2.100 | Change invoice information", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.100-change-invoice-information.json")
          .then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
            CONTAINERS_CONTROLLING_UNIT=this.data.CONTAINERS.CONTROLLING_UNIT
            CONTROLLING_UNIT_PARAMETERS={
              [app.GridCells.DESCRIPTION_INFO]:CU_DESC,
              [app.GridCells.QUANTITY_SMALL]:CONTAINERS_CONTROLLING_UNIT.QUANTITY,
              [app.GridCells.UOM_FK]:CONTAINERS_CONTROLLING_UNIT.UOM
            }
            CONTROLLING_UNIT_PARAMETERS_1={
              [app.GridCells.DESCRIPTION_INFO]:CU_DESC1,
              [app.GridCells.QUANTITY_SMALL]:CONTAINERS_CONTROLLING_UNIT.QUANTITY,
              [app.GridCells.UOM_FK]:CONTAINERS_CONTROLLING_UNIT.UOM
            }
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }

            CONTAINER_COLUMNS_INVOICE_HEADER=this.data.CONTAINER_COLUMNS.INVOICE_HEADER
            CONTAINERS_INVOICE_HEADER=this.data.CONTAINERS.INVOICE_HEADER
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

    after(() => {
        cy.LOGOUT();
    });
    
    it("TC - Create controlling unit", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS); 
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  
      _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
        _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
        _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
      });
      _common.waitForLoaderToDisappear()
      _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
      _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT,CU_DESC)
      _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE,"CONTROLLING_UNIT_CODE")
      _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
      _common.waitForLoaderToDisappear()
    });

    it("TC - Create invoice header", function () {
      
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.INVOICES).then(() => {
        _common.setDefaultView(app.TabBar.INVOICES)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 1)
        _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE_HEADER);
      })
      _common.waitForLoaderToDisappear()
      _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
      _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
      _common.create_newRecord(cnt.uuid.INVOICEHEADER)
      _common.waitForLoaderToDisappear()
      _package.enterRecord_toCreateInvoiceHeader({businessPartner:CONTAINERS_INVOICE_HEADER.BUSINESS_PARTNER[0],container_UUID:cnt.uuid.INVOICEHEADER,invoiceNo:INVOICE_NO,procurementStructure:CONTAINERS_INVOICE_HEADER.PROCUREMENT_STRUCTURE[0],taxCode:CONTAINERS_INVOICE_HEADER.TAX_CODE[0],responsible:CONTAINERS_INVOICE_HEADER.RESPONSIBLE[0],controllingUnit:Cypress.env("CONTROLLING_UNIT_CODE")})
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      cy.SAVE()   
      _common.waitForLoaderToDisappear()
    })

    it("TC - Create controlling unit", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS); 
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  
      _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
        _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
        _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
      });
      _common.waitForLoaderToDisappear()
      _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
      _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS_1);
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT,CU_DESC1)
      _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE,"CONTROLLING_UNIT_CODE_1")
      _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
      _common.waitForLoaderToDisappear()
    });

    it("TC - Verify change invoice information", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE);
      _common.waitForLoaderToDisappear()
        
        _common.openTab(app.TabBar.INVOICES).then(() => {
          _common.setDefaultView(app.TabBar.INVOICES)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 1)
          _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE_HEADER);
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)
        _common.waitForLoaderToDisappear()

        _common.enterRecord_inNewRow(cnt.uuid.INVOICEHEADER, app.GridCells.REFERENCE, app.InputFields.DOMAIN_TYPE_DESCRIPTION, INVOICE_NO_1)
        _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
        _common.edit_dropdownCellWithInput(cnt.uuid.INVOICEHEADER,app.GridCells.BUSINESS_PARTNER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_INVOICE_HEADER.BUSINESS_PARTNER[1])

        _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)
        _common.edit_dropdownCellWithInput(cnt.uuid.INVOICEHEADER,app.GridCells.PRC_STRUCTURE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_INVOICE_HEADER.PROCUREMENT_STRUCTURE[1])

        _common.edit_dropdownCellWithInput(cnt.uuid.INVOICEHEADER,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,Cypress.env("CONTROLLING_UNIT_CODE_1"))
        _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)

        _common.edit_dropdownCellWithInput(cnt.uuid.INVOICEHEADER,app.GridCells.TAX_CODE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_INVOICE_HEADER.TAX_CODE[1])
        _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)

        _common.edit_dropdownCellWithInput(cnt.uuid.INVOICEHEADER,app.GridCells.CLERK_PRC_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_INVOICE_HEADER.RESPONSIBLE[1])    
        _common.select_activeRowInContainer(cnt.uuid.INVOICEHEADER)

        cy.SAVE()
        _common.waitForLoaderToDisappear()

        cy.REFRESH_CONTAINER() 
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO_1)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER, app.GridCells.REFERENCE, INVOICE_NO_1)
        _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.BUSINESS_PARTNER_FK,CONTAINERS_INVOICE_HEADER.BUSINESS_PARTNER[1])
        _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.PRC_STRUCTURE_FK,CONTAINERS_INVOICE_HEADER.PROCUREMENT_STRUCTURE[1])
        _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.CONTROLLING_UNIT_FK,Cypress.env("CONTROLLING_UNIT_CODE_1"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.TAX_CODE_FK,CONTAINERS_INVOICE_HEADER.TAX_CODE[1])
        _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER,app.GridCells.CLERK_PRC_FK,CONTAINERS_INVOICE_HEADER.RESPONSIBLE[1])    
    })
});

import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _rfqPage, _materialPage, _ticketSystemPage } from "cypress/pages";
import { app, tile, cnt, commonLocators, sidebar } from "cypress/locators";
import { CONTROLLING_UNIT_DESCRIPTION } from "cypress/pages/variables";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const CU_DESC = "CU-DESC-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS:DataCells

const PROJECT_NO="39" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

let CLERK_PARAMETER:DataCells
let CONTAINER_COLUMNS_COMPANIES
let CONTAINER_COLUMNS_CLERKS

let CONTAINERS_MATERIAL

let CONTAINER_COLUMNS_REQUISITION

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Requisition");
ALLURE.story("PCM- 2.105 | Assign Controlling Unit")
describe("PCM- 2.105 | Assign Controlling Unit", () => {
   
    before(function () {
        cy.fixture("pcm/pcm-2.105-assign-controlling-unit.json")
          .then((data) => {
            this.data = data;
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
                [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
                [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }

            CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
            CONTAINERS_CONTROLLING_UNIT=this.data.CONTAINERS.CONTROLLING_UNIT
            CONTROLLING_UNIT_PARAMETERS={
                [app.GridCells.DESCRIPTION_INFO]:CU_DESC,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]:CONTAINERS_CONTROLLING_UNIT.UOM
            }

            CLERK_PARAMETER={
                [app.GridCells.CODE]:MODAL_PROJECTS.CLERK
            }
            CONTAINER_COLUMNS_COMPANIES=this.data.CONTAINER_COLUMNS.COMPANIES
            CONTAINER_COLUMNS_CLERKS=this.data.CONTAINER_COLUMNS.CLERKS

            CONTAINERS_MATERIAL=this.data.CONTAINERS.MATERIAL

            CONTAINER_COLUMNS_REQUISITION=this.data.CONTAINER_COLUMNS.REQUISITION
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
    })

    it("TC - Assign logged-in user a clerk", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COMPANY); 
    
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.COMPANY).then(() => {
            _common.setDefaultView(app.TabBar.COMPANY)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.COMPANIES, app.FooterTab.COMPANIES, 0);
            _common.setup_gridLayout(cnt.uuid.COMPANIES, CONTAINER_COLUMNS_COMPANIES)
        });
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.COMPANIES)
        _common.search_inSubContainer(cnt.uuid.COMPANIES,MODAL_PROJECTS.COMPANY_NAME)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COMPANIES,app.GridCells.COMPANY_NAME_SMALL,MODAL_PROJECTS.COMPANY_NAME)
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.COMPANIES,commonLocators.CommonKeys.CLERK)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CLERK).then(() => {
            _common.setDefaultView(app.TabBar.CLERK)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.CLERKS, app.FooterTab.CLERKS, 0);
            _common.setup_gridLayout(cnt.uuid.CLERKS, CONTAINER_COLUMNS_CLERKS)
        });
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CLERKS)
        _common.assign_clerkForLoggedInUser(cnt.uuid.CLERKS,CLERK_PARAMETER)
        _common.waitForLoaderToDisappear()
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

    it("TC - Go to Ticket System Clear the Cart and Add item to the Cart", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TICKET_SYSTEM)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CART).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS)
        })
        _ticketSystemPage.deleteRecord_toClearItemsInCart(cnt.uuid.CART_ITEMS)

        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
        })
        _ticketSystemPage.enterRecord_toAddMaterialInCart(cnt.uuid.COMMODITY_SEARCH, [CONTAINERS_MATERIAL.CODE], [CONTAINERS_MATERIAL.QUANTITY])
    })

    it("TC - Go to Cart and Create Requisition for Added Material and verify controlling unit lookup", function () {
        _common.openTab(app.TabBar.CART).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS)
        })
        _ticketSystemPage.enterRecord_toPlaceOrderForRequisitionFromCart(cnt.uuid.CART_ITEMS)
        _common.waitForLoaderToDisappear()
        _validate.verify_controllingUnitInLookup(PROJECT_NO, CU_DESC, commonLocators.CommonLabels.REQUISITION)

        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.maximizeContainer(cnt.uuid.REQUISITIONS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.TRANSLATED, CU_DESC, CONTROLLING_UNIT_DESCRIPTION)
    })

})
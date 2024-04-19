import { _billPage, _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _rfqPage, _materialPage, _ticketSystemPage, _businessPartnerPage } from "cypress/pages";
import { app, tile, cnt, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import Buttons from "cypress/locators/buttons";

const allure = Cypress.Allure.reporter.getInterface();
const PROJECT_NO = "39" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"
const CU_DESC = "CU_DESC-" + Cypress._.random(0, 999);
const BD_DESC = "CU_DESC-" + Cypress._.random(0, 999);
const TOTAL = 'TOTAL'

let PROJECTS_PARAMETERS: DataCells,
    CONTROLLING_UNIT_PARAMETERS: DataCells

let CONTAINER_COLUMNS_CONTROLLING_UNIT,
    CONTAINERS_CONTROLLING_UNIT,
    CONTAINERS_MATERIAL,
    CONTAINERS_VARIABLES,
    CONTAINER_COMPANIES,
    CONTAINER_COLUMNS_COMPANIES,
    CONTAINER_COLUMNS_CLERK

allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 2.214 | Create a contract directly for cart")
describe("PCM- 2.214 | Create a contract directly for cart", () => {
    before(function () {
        cy.fixture("pcm/pcm-2.214-create-a-contract-directly-for-cart.json").then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
            CONTAINERS_MATERIAL = this.data.CONTAINERS.MATERIAL
            CONTAINERS_VARIABLES = this.data.CONTAINERS.VARIABLES
            CONTAINER_COMPANIES = this.data.CONTAINERS.COMPANIES
            CONTAINER_COLUMNS_COMPANIES = this.data.CONTAINER_COLUMNS.COMPANIES
            CONTAINER_COLUMNS_CLERK = this.data.CONTAINER_COLUMNS.CLERK

            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME
            }
            CONTROLLING_UNIT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: CU_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
            }

            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
        });
    });

    after(() => {
        cy.LOGOUT();
    })

    it("TC - Assign logged-in user a clerk", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COMPANY)
        cy.wait(2000)// required wait to load page
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COMPANY).then(() => {
            _common.setDefaultView(app.TabBar.COMPANY)
            _common.select_tabFromFooter(cnt.uuid.COMPANIES, app.FooterTab.COMPANIES, 0);
            _common.setup_gridLayout(cnt.uuid.COMPANIES, CONTAINER_COLUMNS_COMPANIES)
        });
        cy.wait(2000)// required wait to load page
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.COMPANIES)
        _common.search_inSubContainer(cnt.uuid.COMPANIES, CONTAINER_COMPANIES.COMPANY_NAME)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COMPANIES, app.GridCells.COMPANY_NAME_SMALL, CONTAINER_COMPANIES.COMPANY_NAME)
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.COMPANIES, commonLocators.CommonKeys.CLERK)
        cy.wait(2000)// required wait to load page
        cy.REFRESH_CONTAINER()
        cy.wait(2000)// required wait to load page
        _common.openTab(app.TabBar.CLERK).then(() => {
            _common.setDefaultView(app.TabBar.CLERK)
            _common.select_tabFromFooter(cnt.uuid.CLERKS, app.FooterTab.CLERKS, 0);
            _common.setup_gridLayout(cnt.uuid.CLERKS, CONTAINER_COLUMNS_CLERK)
        });
        cy.wait(2000) // required wait to load page
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CLERKS)
        _common.search_inSubContainer(cnt.uuid.CLERKS, CLERK_NAME)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CLERKS, app.GridCells.CODE, CLERK_NAME)
        _common.edit_dropdownCellWithInput(cnt.uuid.CLERKS, app.GridCells.USER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("USER_NAME"))
        _common.clickOn_activeRowCell(cnt.uuid.CLERKS, app.GridCells.CODE)
        cy.SAVE()
        cy.wait(2000) // required wait to load page
    });

    it("TC - Create and Pin the Project and Add Controlling Unit.", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        cy.wait(2000) // required wait to load page
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
        cy.wait(2000) // required wait to load page
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
        cy.wait(2000) // required wait to load page
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS)
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - create Billing schema-prerequisite", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING_SCHEMA)
        _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA, app.FooterTab.BILLINGSCHEMA)
        })
        _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA, app.FooterTab.BILLINGSCHEMA, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA, app.GridCells.DESCRIPTION_INFO, commonLocators.CommonKeys.STANDARD_SINGEL)
        _common.select_allContainerData(cnt.uuid.BILLING_SCHEMA_DETAILS)
        _common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS,Buttons.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BILLING_SCHEMA_DETAILS).findCell_ByIcon(app.GridCellIcons.ICO_RUBRIC_CONTRACTS, 0)
        _common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS,Buttons.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.waitForLoaderToDisappear()
        _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BILLING_SCHEMA_DETAILS).findCell_ByIcon(app.GridCellIcons.ICO_RUBRIC_CATEGORY, 0)
        _common.waitForLoaderToDisappear()
        cy.wait(2000) //required wait to load page
        _common.create_newRecordInContainer_ifNoRecordExists(cnt.SubcontainerId.BILLING_SCHEMA_DETAILS, 1)
        _common.enterRecord_inNewRow(cnt.SubcontainerId.BILLING_SCHEMA_DETAILS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, BD_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Go to Ticket System Clear the Cart and Add item to the Cart", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TICKET_SYSTEM)
        _common.openTab(app.TabBar.CART).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS)
        })
        _ticketSystemPage.deleteRecord_toClearItemsInCart(cnt.uuid.CART_ITEMS)
        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
        })
        _ticketSystemPage.enterRecord_toAddMaterialInCart(cnt.uuid.COMMODITY_SEARCH, [CONTAINERS_MATERIAL.MATERIAL_CODE], [CONTAINERS_MATERIAL.MATERIAL_QUANTITY])
    })

    it("TC - If 'Procurement Type' is 'Requisition', click place order button, in dialog,each fields is working and filter is ok", function () {
        _common.openTab(app.TabBar.CART).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS)
        })
        _common.waitForLoaderToDisappear()
        _ticketSystemPage.set_cartViewMaterialsHeader({ [commonLocators.CommonLabels.VENDOR]: CONTAINERS_VARIABLES.BUSINESS_PARTNER })
        _common.waitForLoaderToDisappear()
        _ticketSystemPage.set_cartViewMaterialsHeader({ [commonLocators.CommonLabels.PROCUREMENT_TYPE]: commonLocators.CommonLabels.CONTRACT })
        _common.waitForLoaderToDisappear()
        _ticketSystemPage.enterRecord_toPlaceOrderForRequisitionFromCart(cnt.uuid.CART_ITEMS)
        _common.waitForLoaderToDisappear()
        _validate.verify_controllingUnitInLookup(PROJECT_NO, CU_DESC, commonLocators.CommonLabels.CONTRACT)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify the ticket materials with contract item", function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
        });
        _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS);
        });
        _common.search_inSubContainer(cnt.uuid.ITEMSCONTRACT, CONTAINERS_MATERIAL.MATERIAL_CODE)
        _common.assert_cellDataByContent_inContainer(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, CONTAINERS_MATERIAL.MATERIAL_CODE)
        _common.assert_cellDataByContent_inContainer(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL, CONTAINERS_MATERIAL.MATERIAL_QUANTITY)
        _common.saveCellDataToEnv(cnt.uuid.ITEMSCONTRACT, app.GridCells.TOTAL,TOTAL)
    })

    it("TC - Verify the contract item total with billing schema", function () {
        _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA);
        })
        _common.clickOn_toolbarButton(cnt.uuid.CONTRACT_BILLING_SCHEMA,Buttons.ToolBar.ICO_RECALCULATE)
        cy.wait(1000) //required wait to load page
        _common.clickOn_toolbarButton(cnt.uuid.CONTRACT_BILLING_SCHEMA,Buttons.ToolBar.ICO_RECALCULATE)
        _common.search_inSubContainer(cnt.uuid.CONTRACT_BILLING_SCHEMA, BD_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_BILLING_SCHEMA, app.GridCells.RESULT, Cypress.env(TOTAL))
    })
});



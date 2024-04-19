import { _common, _estimatePage, _package, _mainView, _modalView, _sidebar, _rfqPage, _boqPage, _projectPage, _validate, _controllingUnit, _salesPage, _saleContractPage, _ticketSystemPage } from "cypress/pages";

import _ from "cypress/types/lodash";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import Buttons from "cypress/locators/buttons";
const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const MANUAL__ADRESS = "MANUAL_ADRESS"
const UPDATED_ADDRESS = "UPDATED_ADDRESS"

let ADDRESS_PARAMETERS: DataCells,
    ADDRESS_PARAMETERS_1: DataCells,
    PROJECTS_PARAMETERS: DataCells

let CONTAINER_PROJECT_ADDRESS,
    CONTAINER_MATERIAL,
    CONTAINER_COLUMNS_REQUISITION,
    CONTAINER_COLUMNS_PROJECT_ADDRESS,
    CONTAINER_COLUMNS_COMPANIES,
    CONTAINER_COMPANIES,
    CONTAINER_COLUMNS_CLERK,
    CONTAINER_CLERK

allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.219 | Delivery Address - automatic address assignment")

describe("PCM- 2.219 | Delivery Address - automatic address assignment", () => {
    before(function () {
        cy.fixture("pcm/pcm-2.219-delivery-address-automatic-address-assignment.json").then((data) => {
            this.data = data;
            CONTAINER_PROJECT_ADDRESS = this.data.CONTAINERS.PROJECT_ADDRESS
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
            CONTAINER_MATERIAL = this.data.CONTAINERS.MATERIAL
            CONTAINER_COLUMNS_PROJECT_ADDRESS = this.data.CONTAINER_COLUMNS.PROJECT_ADDRESS
            CONTAINER_COMPANIES = this.data.CONTAINERS.COMPANIES
            CONTAINER_COLUMNS_COMPANIES = this.data.CONTAINER_COLUMNS.COMPANIES
            CONTAINER_COLUMNS_CLERK = this.data.CONTAINER_COLUMNS.CLERK
            CONTAINER_CLERK = this.data.CONTAINERS.CLERK
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
            }
            ADDRESS_PARAMETERS = {
                [commonLocators.CommonLabels.CITY]: CONTAINER_PROJECT_ADDRESS.CITY,
                [commonLocators.CommonLabels.STREET]: CONTAINER_PROJECT_ADDRESS.STREET,
                [commonLocators.CommonLabels.ZIP_CODE]: CONTAINER_PROJECT_ADDRESS.ZIPCODE,
                [commonLocators.CommonLabels.COUNTRY]: CONTAINER_PROJECT_ADDRESS.COUNTRY
            }
            ADDRESS_PARAMETERS_1 = {
                [commonLocators.CommonKeys.MANUAL_INPUT]: CONTAINER_PROJECT_ADDRESS.MANUAL_ADRESS
            }
        });
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName"));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        cy.wait(2000) //required wait
    });

    it("TC - Assign logged-in user a clerk", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COMPANY)
        cy.wait(2000)// required wait to load page
        cy.REFRESH_CONTAINER()
        cy.wait(2000)// required wait to load page
        _common.openTab(app.TabBar.COMPANY).then(() => {
            _common.setDefaultView(app.TabBar.COMPANY)
            cy.wait(2000)// required wait to load page
            _common.select_tabFromFooter(cnt.uuid.COMPANIES, app.FooterTab.COMPANIES, 0);
            _common.setup_gridLayout(cnt.uuid.COMPANIES, CONTAINER_COLUMNS_COMPANIES)
        });
        cy.REFRESH_CONTAINER()
        _common.maximizeContainer(cnt.uuid.COMPANIES)
        _common.search_inSubContainer(cnt.uuid.COMPANIES, CONTAINER_COMPANIES.COMPANY_NAME)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COMPANIES, app.GridCells.COMPANY_NAME_SMALL, CONTAINER_COMPANIES.COMPANY_NAME)
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.COMPANIES, commonLocators.CommonKeys.CLERK)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.CLERK).then(() => {
            _common.setDefaultView(app.TabBar.CLERK)
            cy.wait(2000)  // required wait to load page
            _common.select_tabFromFooter(cnt.uuid.CLERKS, app.FooterTab.CLERKS, 0);
            _common.setup_gridLayout(cnt.uuid.CLERKS, CONTAINER_COLUMNS_CLERK)
        });
        cy.wait(2000) // required wait to load page
        cy.REFRESH_CONTAINER()
        cy.wait(2000)  // required wait to load page
        _common.maximizeContainer(cnt.uuid.CLERKS)
        _common.search_inSubContainer(cnt.uuid.CLERKS, CONTAINER_CLERK.CODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CLERKS, app.GridCells.CODE, CONTAINER_CLERK.CODE)
        _common.edit_dropdownCellWithInput(cnt.uuid.CLERKS, app.GridCells.USER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("USER_NAME"))
        _common.clickOn_activeRowCell(cnt.uuid.CLERKS, app.GridCells.CODE)
        cy.SAVE()
        cy.wait(2000) // required wait to load page
    });


    it("TC - Create New Project And Add Address", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        cy.wait(2000)  // required wait to load page
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROJECTS, CONTAINER_COLUMNS_PROJECT_ADDRESS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_PROJECT_ADDRESS.addressfk], cnt.uuid.PROJECTS)
        });
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        cy.wait(2000) // required wait to load page
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        cy.wait(1000) // required wait to load page
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.PROJECTS)
        _common.lookUpButtonInCell(cnt.uuid.PROJECTS, app.GridCells.ADDRESS_FK, app.InputFields.ICO_INPUT_LOOKUP, 0)
        cy.wait(1000) // required wait to load page
        _projectPage.enterRecord_toAddressInsideModal(ADDRESS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.PROJECTS, app.GridCells.ADDRESS_FK, MANUAL__ADRESS)
    });

    it("TC - Go to Ticket System Clear the Cart and Add item to the Cart", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TICKET_SYSTEM)
        cy.wait(2000) //required wait to load page
        _common.openTab(app.TabBar.CART).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS)
        })
        _ticketSystemPage.deleteRecord_toClearItemsInCart(cnt.uuid.CART_ITEMS)
        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
        })
        _ticketSystemPage.enterRecord_toAddMaterialInCart(cnt.uuid.COMMODITY_SEARCH, [CONTAINER_MATERIAL.MATERIAL_CODE], [CONTAINER_MATERIAL.MATERIAL_QUANTITY])
    })

    it("TC - Go to Cart and Create Requisition and Verify Address", function () {
        _common.openTab(app.TabBar.CART).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS)
        })
        cy.REFRESH_SELECTED_ENTITIES().then(() => {
            _ticketSystemPage.enterRecord_toPlaceOrderForRequisitionFromCart(cnt.uuid.CART_ITEMS)
            cy.wait(2000)// required wait to load page
        })
        _validate.validate_Text_message_In_PopUp(Cypress.env(MANUAL__ADRESS))
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.clickOn_modalFooterButton(Buttons.ButtonText.REQUISITION)
        cy.wait(2000)// required wait to load page
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
            _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
            _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.ADDRESS_ENTITY, Cypress.env(MANUAL__ADRESS))
        })
    })

    it("TC - Verify user to create address manuallly", function () {
        _common.lookUpButtonInCell(cnt.uuid.REQUISITIONS, app.GridCells.ADDRESS_ENTITY, app.GridCellIcons.ICO_INPUT_DELETE, 0)
        _common.lookUpButtonInCell(cnt.uuid.REQUISITIONS, app.GridCells.ADDRESS_ENTITY, app.InputFields.ICO_INPUT_LOOKUP, 0)
        _projectPage.enterRecord_toAddressInsideModal(ADDRESS_PARAMETERS_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.lookUpButtonInCell(cnt.uuid.REQUISITIONS, app.GridCells.ADDRESS_ENTITY, app.InputFields.ICO_INPUT_LOOKUP, 0)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.ADDRESS_ENTITY, UPDATED_ADDRESS)
    });

    it("TC - Verify updated address ", function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS)
            _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.REQUISITIONS, app.GridCells.ADDRESS_ENTITY, Cypress.env(MANUAL__ADRESS))
        })
    });

    after(() => {
        cy.LOGOUT();
    });
})
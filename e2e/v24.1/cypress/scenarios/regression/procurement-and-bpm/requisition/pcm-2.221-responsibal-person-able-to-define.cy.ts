import { _common, _estimatePage, _package, _mainView, _modalView, _sidebar, _rfqPage, _boqPage, _projectPage, _validate, _controllingUnit, _salesPage, _saleContractPage, _ticketSystemPage } from "cypress/pages";

import _ from "cypress/types/lodash";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import Buttons from "cypress/locators/buttons";

const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PCM" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"

let PROJECTS_PARAMETERS: DataCells

let CONTAINER_COMPANIES,
    CONTAINER_COLUMNS_COMPANIES,
    CONTAINER_CLERK,
    CONTAINER_COLUMNS_CLERK,
    CONTAINER_MATERIAL,
    CONTAINER_REQUISITION,
    CONTAINER_COLUMNS_REQUISITION


allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.221 | Responsible person able to define")

describe("PCM- 2.221 | Responsible person able to define", () => {
    before(function () {
        cy.fixture("pcm/pcm-2.221-responsible-person-able-to-define.json").then((data) => {
            this.data = data;
            CONTAINER_COMPANIES = this.data.CONTAINERS.COMPANIES
            CONTAINER_COLUMNS_COMPANIES = this.data.CONTAINER_COLUMNS.COMPANIES
            CONTAINER_CLERK = this.data.CONTAINERS.CLERK
            CONTAINER_COLUMNS_CLERK = this.data.CONTAINER_COLUMNS.CLERK
            CONTAINER_MATERIAL = this.data.CONTAINERS.MATERIAL
            CONTAINER_REQUISITION = this.data.CONTAINERS.REQUISITION
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
            }

            cy.preLoading(
                Cypress.env("adminUserName"),
                Cypress.env("adminPassword"),
                Cypress.env("parentCompanyName"),
                Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        });

    });

    after(() => {
        cy.LOGOUT();
    });

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
        _common.search_inSubContainer(cnt.uuid.CLERKS, CONTAINER_CLERK.CODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CLERKS, app.GridCells.CODE, CONTAINER_CLERK.CODE)
        _common.edit_dropdownCellWithInput(cnt.uuid.CLERKS, app.GridCells.USER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("USER_NAME"))
        _common.clickOn_activeRowCell(cnt.uuid.CLERKS, app.GridCells.CODE)
        cy.SAVE()
        cy.wait(2000) // required wait to load page
    });

    it("TC - Create New Project", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        cy.wait(2000) // required wait to load page
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        cy.wait(1000) // required wait to load page
        _common.waitForLoaderToDisappear()
    });

    it("TC - Verify adding material in cart and placing an order to create a requisition", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TICKET_SYSTEM)
        _common.openTab(app.TabBar.CART).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS)
        })
        _ticketSystemPage.deleteRecord_toClearItemsInCart(cnt.uuid.CART_ITEMS)
        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
        })
        _ticketSystemPage.enterRecord_toAddMaterialInCart(cnt.uuid.COMMODITY_SEARCH, [CONTAINER_MATERIAL.MATERIAL_CODE], [CONTAINER_MATERIAL.MATERIAL_QUANTITY])
        _common.openTab(app.TabBar.CART).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS)
        })
        cy.REFRESH_SELECTED_ENTITIES().then(() => {
            _ticketSystemPage.enterRecord_toPlaceOrderForRequisitionFromCart(cnt.uuid.CART_ITEMS)
            cy.wait(1000)// required wait to load page
        })
        _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.REQUISITION_OWNER, CONTAINER_REQUISITION.REQUISITION_OWNER, commonLocators.CommonKeys.GRID)
        _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.RESPONSIBLE, CONTAINER_REQUISITION.RESPONSIBLE, commonLocators.CommonKeys.GRID)
        _common.clickOn_modalFooterButton(Buttons.ButtonText.OK)
        cy.wait(2000) // required wait to load page
        _common.clickOn_cellHasValue_fromModal(app.GridCells.PROJECT_ID, PRJ_NO)
        _common.getText_fromCell_fromModal(app.GridCells.CODE).then(($ele) => {
            Cypress.env("PlaceOrder_Code", $ele.text())
        })
        _common.clickOn_modalFooterButton(Buttons.ButtonText.REQUISITION)
    })

    it("TC - Verify requisition owner and responsible in requisition container", function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        })
        _common.maximizeContainer(cnt.uuid.REQUISITIONS)
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env("PlaceOrder_Code"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.CLERK_REQ_FK, CONTAINER_REQUISITION.REQUISITION_OWNER)
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.CLERK_PRC_FK, CONTAINER_REQUISITION.RESPONSIBLE)

    })
})
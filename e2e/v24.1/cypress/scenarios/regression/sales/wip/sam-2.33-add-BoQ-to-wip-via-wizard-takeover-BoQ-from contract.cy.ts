import cypress from "cypress";

import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage, _wicpage } from "cypress/pages";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);
const CONTRACT_DESC = "CONTRACT-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const FINAL_PRICE = 'FINAL_PRICE'

let BID_PARAMETER: DataCells,
    PROJECTS_PARAMETERS: DataCells,
    BOQ_PARAMETERS: DataCells,
    BOQ_STRUCTURE_PARAMETERS: DataCells,
    WIP_PARAMETER: DataCells,
    COPY_BOQS_PARAMETER: DataCells

let CONTAINER_BOQS,
    CONTAINER_COLUMNS_BOQS,
    CONTAINERS_BOQ_STRUCTURE,
    CONTAINER_COLUMNS_BOQ_STRUCTURE,
    CONTAINERS_BID,
    CONTAINER_COLUMNS_BID

allure.epic("SALES");
allure.feature("Sales-WIP");
allure.story("SAM- 2.33 | Add BOQ to WIP via Wizard Takeover BOQ (from contract)")

describe("SAM- 2.33 | Add BOQ to WIP via Wizard Takeover BOQ (from contract)", () => {
    before(function () {
        cy.fixture("sam/sam-2.33-add-BoQ-to-wip-via-wizard-takeover-BoQ-from contract.json").then((data) => {
            this.data = data;
            CONTAINER_BOQS = this.data.CONTAINERS.BOQS
            CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQSTRUCTURE
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE
            CONTAINERS_BID = this.data.CONTAINERS.BID
            CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
            }
            BOQ_PARAMETERS = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC,
            }
            BOQ_STRUCTURE_PARAMETERS = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
            }
            BID_PARAMETER = {
                [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: BID_DESC,
                [app.InputFields.INPUT_GROUP_CONTENT]: CONTAINERS_BID.BUSINESS_PARTNER,
                [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_DESC
            };
            WIP_PARAMETER = {
                [commonLocators.CommonLabels.CONTRACT]: CONTRACT_DESC,
            }
            COPY_BOQS_PARAMETER = {
                [commonLocators.CommonLabels.BOQ_SOURCE]: CONTAINER_BOQS.CONTRACT_BOQ,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC,
                [app.GridCells.MARKER]: commonLocators.CommonKeys.CHECK
            }
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            cy.SAVE();
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        });
    });

    it("TC - Create BOQ header and BOQ structure", function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.maximizeContainer(cnt.uuid.BOQS)
        _common.create_newRecord(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.BOQS)
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURES, app.GridCells.FINAL_PRICE_SMALL, FINAL_PRICE)
    });

    it("TC - Create new Bid and change status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BID);
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 1);
            _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BID)
        });
        _common.create_newRecord(cnt.uuid.BIDS)
        _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETER);
        _common.waitForLoaderToDisappear()
        _bidPage.changeStatus_BidRecord()
    })

    it("TC - Verify Bid BoQ item should be populated form project boq item", function () {
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, Cypress.env(FINAL_PRICE))
        })
    })

    it("TC - Create Contract by wizard and change status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        cy.wait(2000) //required wait to load page
        _saleContractPage.createContractRecord_byWizardOption(CONTRACT_DESC)
        cy.wait(2000) //required wait to load page
        _saleContractPage.changeStatus_ContractRecord()
        cy.SAVE()
    })

    it("TC - Verify Contract Item should be populated from the Bid Boq item", function () {
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET, Cypress.env(FINAL_PRICE))
        })
    })

    it("TC - Create WIP", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WIP);
        cy.wait(2000) //required wait to load page
        _common.openTab(app.TabBar.WIP).then(() => {
            _common.setDefaultView(app.TabBar.WIP)
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.clear_subContainerFilter(cnt.uuid.WIP)
        });
        _common.create_newRecord(cnt.uuid.WIP)
        _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETER)
        cy.SAVE()
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs, 0);
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
    })

    it("TC - Verify Copy BoQs", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.COPY_BOQS);
        cy.wait(1000) //required wait to load page
        _wicpage.copy_boqs_fromWizard(COPY_BOQS_PARAMETER)
        _modalView.findModal().acceptButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs, 0);
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
        });
        _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.ORD_QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.QUANTITY)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC)
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs, 0);
        });
        _common.select_rowInContainer(cnt.uuid.BOQ_WIP)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_WIP, app.GridCells.BRIEF_INFO_SMALL, BOQ_DESC, BOQ_ROOT_ITEM)
    })

    after(() => {
        cy.LOGOUT();
    });
})


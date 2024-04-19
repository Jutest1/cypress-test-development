import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage } from "cypress/pages";

import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
import cypress from "cypress";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);
const COST_TOTAL = 'COST_TOTAL'
const UNIT_PRICE = 'UNIT_PRICE'
const UNIT_PRICE_1 = 'UNIT_PRICE_1'

let PROJECTS_PARAMETERS: DataCells,
    BOQ_PARAMETERS: DataCells,
    BOQ_STRUCTURE_PARAMETERS: DataCells,
    ESTIMATE_PARAMETERS: DataCells,
    RESOURCE_PARAMETERS: DataCells,
    UPDATE_BID_PARAMETERS: DataCells,
    GENERATE_LINE_ITEMS_PARAMETERS: DataCells,
    UPDATE_ESTIMATE_PARAMETER: DataCells

let CONTAINER_COLUMNS_BOQS,
    CONTAINERS_BOQ_STRUCTURE,
    CONTAINER_COLUMNS_BOQ_STRUCTURE,
    CONTAINERS_ESTIMATE,
    CONTAINER_COLUMNS_ESTIMATE,
    CONTAINER_COLUMNS_LINE_ITEM,
    CONTAINERS_RESOURCE,
    CONTAINER_COLUMNS_RESOURCE,
    CONTAINERS_BID,
    MODAL_UPDATE_ESTIMATE_WIZARD,
    CONTAINERS_LINE_ITEM,
    CONTAINER_COLUMNS_ESTIMATE_BOQ
allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 2.31 | Update UR from estimate")

describe("SAM- 2.31 | Update UR from estimate", () => {
    before(function () {
        cy.fixture("sam/sam-2.31-update-UR-from-estimate.json").then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQSTRUCTURE
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINER_COLUMNS_ESTIMATE_BOQ = this.data.CONTAINER_COLUMNS.ESTIMATE_BOQ
            CONTAINERS_BID = this.data.CONTAINERS.BID
            MODAL_UPDATE_ESTIMATE_WIZARD = this.data.MODAL.UPDATE_ESTIMATE_WIZARD
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
            }
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            BOQ_PARAMETERS = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
            }
            BOQ_STRUCTURE_PARAMETERS = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY[0],
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0]
            }
            GENERATE_LINE_ITEMS_PARAMETERS = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
            }
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            }
            UPDATE_ESTIMATE_PARAMETER = {
                [commonLocators.CommonKeys.CHECKBOX]: MODAL_UPDATE_ESTIMATE_WIZARD
            }
            UPDATE_BID_PARAMETERS = {
                [commonLocators.CommonLabels.STRUCTURE_TYPE]: CONTAINERS_BID.SOURCE_LEAD
            }
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            cy.SAVE();
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        });
    });

    it("TC - Create BOQ header and BOQ structure", function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
        });
        _common.waitForLoaderToDisappear()
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
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE()
        cy.wait(2000) //required wait to load page
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create new Estimate header record and Assembly generate Line item and Resources ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        cy.wait(1000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.minimizeContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, COST_TOTAL)
        cy.wait(1000) //required wait to load page
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create new sales bid", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
        _common.waitForLoaderToDisappear()
        cy.wait(2000) //required wait to load page
        _salesPage.enterRecord_toCreate_BID_from_Estimate(BID_DESC, CONTAINERS_BID.BUSINESS_PARTNER, CONTAINERS_BID.SOURCE_LEAD)
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_BID)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
        });
        _bidPage.changeStatus_BidRecord();
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - updating AQ quantity", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        cy.wait(2000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.search_inSubContainer(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        cy.wait(2000)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.EST_QTY_REL_BOQ_FK, commonLocators.CommonKeys.SPAN, commonLocators.CommonKeys.TO_STRUCTURE)
        _common.edit_containerCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LINE_ITEM.QUANTITY_INPUT)
        _common.edit_containerCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LINE_ITEM.AQ_QUANTITY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE);
        cy.wait(1000) //required wait to load page
        _estimatePage.update_estimate_fromWizard(UPDATE_ESTIMATE_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_STRUCTURE_DESC)
    });

    it("TC - updating AQ quantity and create updatd bid  ", function () {
        _common.openTab(app.TabBar.ESTIMATEBYBOQ).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATEBYBOQ)
            cy.wait(2000) //required wait to load page
            _common.select_tabFromFooter(cnt.uuid.BOQ_ESTIMATEBYBOQ, app.FooterTab.BOQs, 3);
            _common.maximizeContainer(cnt.uuid.BOQ_ESTIMATEBYBOQ)
            _common.setup_gridLayout(cnt.uuid.BOQ_ESTIMATEBYBOQ, CONTAINER_COLUMNS_ESTIMATE_BOQ)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_ESTIMATEBYBOQ)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_ESTIMATEBYBOQ, app.GridCells.BAS_UOM_FK, CONTAINERS_BID.UOM)
        _common.saveCellDataToEnv(cnt.uuid.BOQ_ESTIMATEBYBOQ, app.GridCells.PRICE, UNIT_PRICE)
    });

    it("TC - updating AQ quantity and create updatd bid --Assertion 1 ", function () {
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_ESTIMATEBYBOQ, app.GridCells.PRICE, Cypress.env(UNIT_PRICE))
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.BOQ_ESTIMATEBYBOQ, app.GridCells.PRICE, UNIT_PRICE_1)
        _common.minimizeContainer(cnt.uuid.BOQ_ESTIMATEBYBOQ)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
        _common.waitForLoaderToDisappear()
        _salesPage.enterRecord_toUpdate_BID_from_Estimate()
        cy.wait(2000) // required wiat to load page
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_BID)
        cy.wait(3000) // required wiat to load page
        _common.waitForLoaderToDisappear()
    });

    it("TC - Verify updated AQ quantity with create bid AQ quantity--Assertion 2", function () {
        _common.openTab(app.TabBar.BIDBOQ).then(() => {
            _common.setDefaultView(app.TabBar.BIDBOQ)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREBID, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTUREBID, app.GridCells.PRICE_SMALL, Cypress.env(UNIT_PRICE_1))
    });

    after(() => {
        cy.LOGOUT();
    });

});

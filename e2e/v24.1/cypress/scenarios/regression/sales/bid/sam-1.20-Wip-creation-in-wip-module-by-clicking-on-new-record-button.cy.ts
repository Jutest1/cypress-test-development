import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _bidPage, _saleContractPage, _projectPage, _wipPage } from "cypress/pages";
import { app, tile, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM, EST_HEADER } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQ-STR-" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);
const WIP_DESC = "WIP-DESC-" + Cypress._.random(0, 999);
const WIP1_DESC = "WIP1-DESC-" + Cypress._.random(0, 999);
const CONT_DESC = "CONTRACT-DESC-" + Cypress._.random(0, 999);



let CREATEPROJECT_PARAMETERS: DataCells;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

let GENERATE_LINE_ITEMS_PARAMETERS: DataCells

let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;

let BOQ_PARAMETERS: DataCells
let BOQ_STRUCTURE_PARAMETERS: DataCells
let CONTAINERS_BOQ_STRUCTURE

let CONTAINER_COLUMNS_LINE_ITEM

let CONTAINERS_PROJECT

let CREATE_NEW_WIP: DataCells

let BIDINPUT
let CHECKBIDCOPY




ALLURE.epic("SALES");
ALLURE.feature("Sales-BID");
ALLURE.story("SAM- 1.20 | WIP Creation in WIP Module by clicking on new record button");

describe("SAM- 1.20 | WIP Creation in WIP Module by clicking on new record button", () => {

    before(function () {
        cy.fixture("sam/sam-1.20-wip-creation-in-wip-module-by-clicking-on-new-record-button.json")
            .then((data) => {
                this.data = data;
                CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
                CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT;
                CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
                BIDINPUT = this.data.BID_CREATION.BID_INPUTS;
                CHECKBIDCOPY = this.data.COPY_DEPENDENCIES.CHECK_COPY

                CREATEPROJECT_PARAMETERS = {
                    [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NAME,
                    [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                    [commonLocators.CommonLabels.CLERK]: CLERK_NAME
                };

                ESTIMATE_PARAMETERS = {
                    [app.GridCells.CODE]: ESTIMATE_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                    [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                    [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
                }

                CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
                CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
                RESOURCE_PARAMETERS = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
                };

                CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM

                GENERATE_LINE_ITEMS_PARAMETERS = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                    [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
                }

                CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ

                BOQ_PARAMETERS = {
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
                }
                CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE

                BOQ_STRUCTURE_PARAMETERS = {
                    [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                    [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
                }
                CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE

                CREATE_NEW_WIP = {
                    [commonLocators.CommonLabels.CONTRACT]: CONT_DESC,
                    [commonLocators.CommonLabels.DESCRIPTION]: WIP_DESC,

                }

            }).then(() => {
                cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.waitForLoaderToDisappear()
                _common.openTab(app.TabBar.PROJECT).then(() => {
                    _common.setDefaultView(app.TabBar.PROJECT)
                    _common.waitForLoaderToDisappear()
                    _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
                });

                _common.create_newRecord(cnt.uuid.PROJECTS);
                _projectPage.enterRecord_toCreateProject(CREATEPROJECT_PARAMETERS);
                cy.SAVE()
                _common.waitForLoaderToDisappear()
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
                _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
            })
    })

    after(() => {
        cy.LOGOUT();
    })

    it("TC - Create BOQ header and BOQ structure", function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.setDefaultView(app.TabBar.BOQS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.maximizeContainer(cnt.uuid.BOQS)
        _common.create_newRecord(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
        cy.SAVE();
        _common.saveCellDataToEnv(cnt.uuid.BOQS, app.GridCells.BRIEF_INFO_SMALL, "BOQNAME", BOQ_ROOT_ITEM)
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
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

    });
    it('TC - Create new estimate record', function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE, app.GridCells.DESCRIPTION_INFO, "ESTIMATE_DESCRIPTION", EST_HEADER)
    });
    it("TC - Generate boq line item", function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.grandtotal, CONTAINER_COLUMNS_LINE_ITEM.budget, CONTAINER_COLUMNS_LINE_ITEM.revenue], cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_STRUCTURE_DESC)
    });
    it("TC - Create new record in resource", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.minimizeContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, "COSTTOTAL")
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO, "RESOURCENAME")
    });
    it("TC - Create new sales bid", function () {
        _bidPage.createBidRecord_byWizardOption(BID_DESC, BIDINPUT.businessPartner, BIDINPUT.sourceLead)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS)
            _common.clear_subContainerFilter(cnt.uuid.BIDS)
        })
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
        _common.waitForLoaderToDisappear()
        _bidPage.changeStatus_BidRecord();
        _common.openTab(app.TabBar.BIDBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE, 1);
        });
    });
    it("TC - Create Contract using Wizard option", function () {
        cy.wait(1000) //required Wait;
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREBID, CHECKBIDCOPY.Uom)
        _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTUREBID, app.GridCells.FINAL_PRICE_SMALL, "Save_Bid_finalprice")
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS)
            _common.clear_subContainerFilter(cnt.uuid.BIDS)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required Wait
        _modalView.findModal().acceptButton(btn.ButtonText.OK);
        _common.waitForLoaderToDisappear()
        _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_CONTRACT)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.setDefaultView(app.TabBar.CONTRACTS)
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
        cy.wait(1000) //required Wait
        _common.waitForLoaderToDisappear()
    });
    it("TC - Add Customer", function () {
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
        });
        _common.maximizeContainer(cnt.uuid.CONTRACTS)
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.select_rowInContainer(cnt.uuid.CONTRACTS)
        _common.edit_containerCell(cnt.uuid.CONTRACTS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONT_DESC)
        cy.wait(1000) //required Wait
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.CONTRACTS, app.GridCells.CUSTOMER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, BIDINPUT.businessPartner)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });
    it("TC - Create Contract and wip using Wizard option", function () {
        _saleContractPage.changeStatus_ContractRecord();
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.CONTRACTS)
        _common.saveCellDataToEnv(cnt.uuid.CONTRACTS, app.GridCells.CODE, "CONTRACT_CODE")
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET, Cypress.env("Save_Bid_finalprice"))

    });
    it("TC - Assertion 1-Add Wip1 Quantity and verify remaining total ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WIP);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.create_newRecord(cnt.uuid.WIP)
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required Wait
        _wipPage.enterRecord_toCreateNewWIP(CREATE_NEW_WIP)
        cy.wait(1000) //required Wait
        _common.enterRecord_inNewRow(cnt.uuid.WIP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, WIP1_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs, 0);
            _common.waitForLoaderToDisappear()
            _common.select_rowInContainer(cnt.uuid.BOQ_WIP)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE);
            _common.waitForLoaderToDisappear()

        });
        _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.BAS_UOM_FK, CHECKBIDCOPY.Uom)
        _common.edit_containerCell(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CHECKBIDCOPY.Wip1_Quantity)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.TOTAL_QUANTITY, "CONTRACTED_QUANTITY")
        cy.wait(500).then(() => {
            _validate.verify_isRecordSubstractTwoValues(cnt.uuid.BOQ_STRUCTUREWIP, Cypress.env("CONTRACTED_QUANTITY"), CHECKBIDCOPY.Wip1_Quantity, app.GridCells.REM_QUANTITY)
            cy.SAVE()
            _common.waitForLoaderToDisappear()
        })
    });
    it("TC - Assertion 3-Verify RecordMultiply Two Values In Row", function () {
        _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL, "WIPBOQ_QUANTITY")
        _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.PRICE_SMALL, "WIPBOQ_UNIT_RATE")
        cy.wait(500).then(() => {
            _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.BOQ_STRUCTUREWIP, Cypress.env("WIPBOQ_QUANTITY"), Cypress.env("WIPBOQ_UNIT_RATE"), app.GridCells.FINAL_PRICE_SMALL)
            cy.wait(500)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_WIP_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
    });
    it("TC - Add Wip2 Quantity and verify the previous quanity ", function () {
        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        });
        _common.create_newRecord(cnt.uuid.WIP)
        _common.waitForLoaderToDisappear()
        _wipPage.enterRecord_toCreateNewWIP(CREATE_NEW_WIP)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.WIP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, WIP_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQS, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.BAS_UOM_FK, CHECKBIDCOPY.Uom)
        _common.edit_containerCell(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CHECKBIDCOPY.Wip2_Quantity)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.PREV_QUANTITY_SMALL, "PREVIOUS_QUANTITY")
        cy.wait(500).then(() => {
            _validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.BOQ_STRUCTUREWIP, CHECKBIDCOPY.Wip2_Quantity, Cypress.env("PREVIOUS_QUANTITY"), app.GridCells.TOTAL_QUANTITY)
            cy.wait(500)
            cy.SAVE()
            _common.waitForLoaderToDisappear()
        })
    });
    it("TC - Add Wip2 Quantity and verify the previous quanity ", function () {
        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        })
        _common.search_inSubContainer(cnt.uuid.WIP, WIP1_DESC)
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQS, 0);
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.BAS_UOM_FK, CHECKBIDCOPY.Uom)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL, Cypress.env("PREVIOUS_QUANTITY"))
    });
})
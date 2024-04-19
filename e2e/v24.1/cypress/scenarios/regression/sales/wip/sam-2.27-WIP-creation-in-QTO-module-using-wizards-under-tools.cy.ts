import cypress from "cypress";

import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage } from "cypress/pages";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { DataCells } from "cypress/pages/interfaces";
const allure = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-Test-" + Cypress._.random(0, 999);
const QTO_DESC = "QTO_DESC-" + Cypress._.random(0, 999);
const BILL_DESC = "BILL_DESC-" + Cypress._.random(0, 999);
const CONTRACT_DESC = "CONTRACT_DESC" + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
let PROJECTS_PARAMETERS: DataCells;
let BID_PARAMETERS: DataCells;
let BOQ_PARAMETERS: DataCells
let BOQ_STRUCTURE_PARAMETERS: DataCells

let CONTAINER_COLUMNS_BOQS;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINERS_CONTRACTS;
let CONTAINER_COLUMNS_CONTRACTS;
let CONTAINER_COLUMNS_BIDS;
let CONTAINERS_QUANTITY_TAKEOFF_HEADER;
let CONTAINER_COLUMNS_QUANTITY_TAKEOFF_HEADER;
let CONTAINERS_BILL_OF_QUANTITY_LOOKUP;
let CONTAINER_COLUMNS_BILL_OF_QUANTITY_LOOKUP;

let CONTAINER_COLUMNS_QUANTITY_TAKEOFF_DETAIL;
let CONTAINER_COLUMNS_WIP;


allure.epic("SALES");
allure.feature("Sales-WIP");
allure.story("SAM- 2.27 | WIP creation in QTO module using wizards under tools")

describe("SAM- 2.27 | WIP creation in QTO module using wizards under tools", () => {

        before(function () {
            cy.preLoading(
                Cypress.env("adminUserName"),
                Cypress.env("adminPassword"),
                Cypress.env("parentCompanyName"),
                Cypress.env("childCompanyName")
            );
            cy.fixture("sam/sam-2.27-WIP-creation-in-QTO-module-using-wizards-under-tools.json").then((data) => {
                this.data = data;
                CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
                CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQSTRUCTURE
                CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE
                CONTAINERS_CONTRACTS = this.data.CONTAINERS.CONTRACTS;
                CONTAINER_COLUMNS_BIDS = this.data.CONTAINER_COLUMNS.BIDS
                CONTAINERS_QUANTITY_TAKEOFF_HEADER = this.data.CONTAINERS.QUANTITY_TAKEOFF_HEADER
                CONTAINER_COLUMNS_QUANTITY_TAKEOFF_HEADER = this.data.CONTAINER_COLUMNS.QUANTITY_TAKEOFF_HEADER
                CONTAINERS_BILL_OF_QUANTITY_LOOKUP = this.data.CONTAINERS.BILL_OF_QUANTITY_LOOKUP
                CONTAINER_COLUMNS_BILL_OF_QUANTITY_LOOKUP = this.data.CONTAINER_COLUMNS.BILL_OF_QUANTITY_LOOKUP
                CONTAINER_COLUMNS_QUANTITY_TAKEOFF_DETAIL = this.data.CONTAINER_COLUMNS.QUANTITY_TAKEOFF_DETAIL
                CONTAINER_COLUMNS_CONTRACTS = this.data.CONTAINER_COLUMNS.CONTRACTS
                CONTAINER_COLUMNS_WIP = this.data.CONTAINER_COLUMNS.WIP
                BOQ_PARAMETERS = {
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
                }
                BOQ_STRUCTURE_PARAMETERS = {
                    [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                    [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
                }
                BID_PARAMETERS = {
                    [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: BID_DESC,
                    [app.InputFields.INPUT_GROUP_CONTENT]: CONTAINERS_CONTRACTS.BUSINESS_PARTNER,
                    [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_DESC,
                }
                PROJECTS_PARAMETERS = {
                    [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                    [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                    [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
                }
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.waitForLoaderToDisappear()
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


        it("TC - Create new BoQ header", function () {
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
        });

        it("TC - Create BoQ Structure", function () {
            _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
                _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
                _common.waitForLoaderToDisappear()
                _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
                _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
            });
            _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.FINAL_PRICE_SMALL).then(($FINALPRICE) => {
                Cypress.env("FINALPRICE", $FINALPRICE.text())
            })
        });

        it("TC - Create new Bid and change status", function () {
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
            _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.BID);
            _common.openTab(app.TabBar.BID).then(() => {
                _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
                _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BIDS)
                _common.clear_subContainerFilter(cnt.uuid.BIDS)
            });
            _common.create_newRecord(cnt.uuid.BIDS);
            cy.wait(1000)
            _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETERS)
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.BID).then(() => {
                _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
                _common.clear_subContainerFilter(cnt.uuid.BIDS)
            })
            _common.select_rowInContainer(cnt.uuid.BIDS)
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
            _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
            _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED);
            _common.assert_forNumericValues(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, Cypress.env("FINALPRICE"))

        })

        it("TC - Create Contract by wizard and change status", function () {
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
            _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
            _saleContractPage.create_contract_fromWizard(CONTRACT_DESC);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.CONTRACTS).then(() => {
                _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS);
                _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACTS)
                _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
            })
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
            _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
            _common.changeStatus_fromModal(sidebar.SideBarOptions.CONTRACTED);
            cy.SAVE()
            _common.assert_forNumericValues(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET, Cypress.env("FINALPRICE"))
        })

        it("TC - Create quantity TakeOff Detail", function () {

            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
            _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QTO);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.QTOHEADER).then(() => {
                _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_HEADER, app.FooterTab.QUANTITYTAKEOFFHEADER)
                _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_HEADER, CONTAINER_COLUMNS_QUANTITY_TAKEOFF_HEADER)
                _common.clear_subContainerFilter(cnt.uuid.QUANTITY_TAKEOFF_HEADER)
            })
            _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_HEADER);
            cy.wait(1000)
            _salesPage.enter_dataToCreate_QTOHeader(CONTAINERS_QUANTITY_TAKEOFF_HEADER.ITEM, QTO_DESC, CONTRACT_DESC, BOQ_DESC);
            _common.waitForLoaderToDisappear()
            cy.SAVE()
            _common.openTab(app.TabBar.DETAIL).then(() => {
                _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
                _common.setup_gridLayout(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, CONTAINER_COLUMNS_BILL_OF_QUANTITY_LOOKUP)
            })
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.DETAIL).then(() => {
                _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITY_TAKEOFF, 1);
                _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, CONTAINER_COLUMNS_QUANTITY_TAKEOFF_DETAIL)
            })
            _common.waitForLoaderToDisappear()
            _common.select_rowInContainer(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
            _common.clickOn_toolbarButton(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, btn.ToolBar.ICO_TREE_EXPAND_ALL);
            _common.clickOn_cellHasIcon(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)

            _common.openTab(app.TabBar.DETAIL).then(() => {
                _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITY_TAKEOFF, 1);
                _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, CONTAINER_COLUMNS_QUANTITY_TAKEOFF_DETAIL)
            })
            _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
            _common.enterRecord_inNewRow(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.GridCells.VALUE_1_DETAIL, app.InputFields.DOMAIN_TYPE_REMARK, CONTAINERS_BILL_OF_QUANTITY_LOOKUP.QUANTITY)
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            _common.select_rowInSubContainer(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
            _common.getText_fromCell(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.GridCells.RESULT).then(($ele1: JQuery<HTMLElement>) => {
                Cypress.env("IQ_Quantity", $ele1.text())
            })
        });

        it("TC - Verify IQ quantity in bill of quantity container should be reflected from quantity take off container", function () {
            _common.openTab(app.TabBar.DETAIL).then(() => {
                _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
                _common.clickOn_cellHasIcon(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
                _common.assert_cellData_insideActiveRow(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.INSTALLED_QUANTITY, Cypress.env("IQ_Quantity"))
            })
        });

        it("TC - Create WIP and Verify Wip Boq Quantity should come from QTO IQ Quantity & WIP BoQ Final Price= Quantity* Unit Rate", function () {

            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
            _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_WIP);
            _common.waitForLoaderToDisappear()
            cy.wait(1000)
            _modalView.findModal().acceptButton(btn.ButtonText.OK)
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.WIPBOQ).then(() => {
                _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
                _common.select_rowInSubContainer(cnt.uuid.WIP)
                _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs, 0);
                _common.select_rowInSubContainer(cnt.uuid.BOQ_WIP)
                _common.waitForLoaderToDisappear()
                _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
                _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            });
            _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
            _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL, CONTAINERS_BILL_OF_QUANTITY_LOOKUP.QUANTITY)
        })
        it("TC - Verify Net Amount of Wip", function () {
            _common.openTab(app.TabBar.WIP).then(() => {
                _common.setDefaultView(app.TabBar.WIP)
                _common.waitForLoaderToDisappear()
                _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP)
               _common.setup_gridLayout(cnt.uuid.WIP, CONTAINER_COLUMNS_WIP)
            })
           _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.WIP,  CONTAINERS_BILL_OF_QUANTITY_LOOKUP.QUANTITY,CONTAINERS_BOQ_STRUCTURE.UNIT_RATE, app.GridCells.AMOUNT_NET_OC)
        })

        after(() => {
            cy.LOGOUT();
        });

    });

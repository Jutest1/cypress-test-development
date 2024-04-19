import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _boqPage, _estimatePage, _bidPage, _saleContractPage, _salesPage, _wipPage, _billPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRC1" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ1-" + Cypress._.random(0, 9999);
const BOQ_HEADER_01 = "BOQHEAD1-" + Cypress._.random(0, 999)
const BOQ_ITEM_01 = "BOQitem1-" + Cypress._.random(0, 999)
const BOQ_ITEM_02 = "BOQitem2-" + Cypress._.random(0, 999)
const CHG_ITEM_03 = "Changeitem2-" + Cypress._.random(0, 999)
const EST_CODE_01 = "E1" + Cypress._.random(0, 999)
const EST_HEADER_01 = "EST-01-" + Cypress._.random(0, 999)
const CHANGE_01 = "CHANGE-01-" + Cypress._.random(0, 999)
const BID_01 = "BID-01-" + Cypress._.random(0, 999)
const BID_CHANGE_01 = "BID-01-" + Cypress._.random(0, 999)
const CHANGEBID_01 = "CHANGE_BID-01-" + Cypress._.random(0, 999)
const CONT_01 = "CONTRACT-01-" + Cypress._.random(0, 999)
const CHANGECONT_01 = "CHNGCONT-01-" + Cypress._.random(0, 999)
const QTO_01 = "QTO-01-" + Cypress._.random(0, 999)
const WIP_01 = "WIP-01-" + Cypress._.random(0, 999)
const BILL_01 = "BILL-01-" + Cypress._.random(0, 999)

let CONTAINERS_PROJECT, CONTAINERS_BOQ_STRUCTURE, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCE, CONTAINERS_BIDS, CONTAINER_COLUMNS_SALES_CONTRACT, CONTAINERS_SALES_CONTRACT_BOQ_STRUCTURE;

let CONTAINER_COLUMNS_BOQS, CONTAINER_COLUMNS_BOQ_STRUCTURE, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCE, CONTAINER_COLUMNS_BIDS, CONTAINER_COLUMNS_SALES_CONTRACT_BOQS, CONTAINER_COLUMNS_SALES_CONTRACT_BOQ_STRUCTURE, CONTAINER_COLUMNS_WIP, CONTAINER_COLUMNS_BILL_OF_QUANTITY, CONTAINER_COLUMNS_WIP_BOQS, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE, CONTAINER_COLUMNS_BILLS, CONTAINER_COLUMNS_QUANTITY_TAKEOFF_HEADER;

let PROJECTS_PARAMETERS: DataCells, BOQ_PARAMETERS_1: DataCells, BOQ_STRUCTURE_PARAMETERS_1: DataCells, BOQ_STRUCTURE_PARAMETERS_2: DataCells, ESTIMATE_PARAMETERS_1: DataCells, RESOURCE_PARAMETERS_1: DataCells, RESOURCE_PARAMETERS_2: DataCells, CHANGE_LINE_ITEM_PARAMETERS: DataCells, RESOURCE_PARAMETERS_3: DataCells;

let GENERATE_LINE_ITEMS_PARAMETERS_1: DataCells;

ALLURE.epic("SALES");
ALLURE.feature("Sales-Contract");
ALLURE.story("SAM- 2.7 | Change order for a sales contract for a new estimate line item linked to same BOQ");

describe("SAM- 2.7 | Change order for a sales contract for a new estimate line item linked to same BOQ", () => {

    before(function () {
        cy.fixture("sam/sam-2.7-change-order-for-a-sales-contract-for-a-new-estimate-line-item-linked-to-same-BOQ.json").then((data) => {
            this.data = data
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
            }
            CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
            BOQ_PARAMETERS_1 = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_HEADER_01
            }
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            BOQ_STRUCTURE_PARAMETERS_1 = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_ITEM_01,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0]
            }
            BOQ_STRUCTURE_PARAMETERS_2 = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_ITEM_02,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[1],
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[1],
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0]
            }
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS_1 = {
                [app.GridCells.CODE]: EST_CODE_01,
                [app.GridCells.DESCRIPTION_INFO]: EST_HEADER_01,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            GENERATE_LINE_ITEMS_PARAMETERS_1 = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_HEADER_01
            }
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            RESOURCE_PARAMETERS_1 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL[0],
            };
            RESOURCE_PARAMETERS_2 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL[0],
            };
            CONTAINERS_BIDS = this.data.CONTAINERS.BIDS
            CONTAINER_COLUMNS_BIDS = this.data.CONTAINER_COLUMNS.BIDS
            CONTAINER_COLUMNS_SALES_CONTRACT = this.data.CONTAINER_COLUMNS.SALES_CONTRACT
            CONTAINER_COLUMNS_SALES_CONTRACT_BOQS = this.data.CONTAINER_COLUMNS.SALES_CONTRACT_BOQS
            CONTAINERS_SALES_CONTRACT_BOQ_STRUCTURE = this.data.CONTAINERS.SALES_CONTRACT_BOQ_STRUCTURE
            CONTAINER_COLUMNS_SALES_CONTRACT_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.SALES_CONTRACT_BOQ_STRUCTURE
            CHANGE_LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: CHG_ITEM_03,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.CHANGE_QUANTITY[0],
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM[0]
            };
            CONTAINER_COLUMNS_QUANTITY_TAKEOFF_HEADER = this.data.CONTAINER_COLUMNS.QUANTITY_TAKEOFF_HEADER
            CONTAINER_COLUMNS_BILL_OF_QUANTITY = this.data.CONTAINER_COLUMNS.BILL_OF_QUANTITY
            CONTAINER_COLUMNS_BIDS = this.data.CONTAINER_COLUMNS.BIDS
            CONTAINER_COLUMNS_WIP = this.data.CONTAINER_COLUMNS.WIP
            CONTAINER_COLUMNS_WIP_BOQS = this.data.CONTAINER_COLUMNS.WIP_BOQS
            CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.WIP_BOQ_STRUCTURE
            CONTAINER_COLUMNS_BILLS = this.data.CONTAINER_COLUMNS.BILLS
            RESOURCE_PARAMETERS_3 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.COST_CODE[0],
            };
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS)
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS)
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
        });
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Create new BoQ header and BoQ structure', function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS_1);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS_1);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item1_Qty", $ele1.text())
            cy.log(Cypress.env("Item1_Qty"))
        })
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS_2);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item2_Qty", $ele1.text())
            cy.log(Cypress.env("Item2_Qty"))
        })
    });

    it("TC- Create new estimate header and go to estimate, generate line item and assign resource", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS_1);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS_1);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_ITEM_01)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_1);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_ITEM_02)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_2);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create new sales bid and change the Bid status", function () {
        _bidPage.createBidRecord_byWizardOption(BID_01, CONTAINERS_BIDS.BUSINESS_PARTNER, CommonLocators.CommonKeys.BOQ);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
            _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BIDS)
        });
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME)
        _common.select_rowInContainer(cnt.uuid.BIDS)
        _common.getText_fromCell(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("BID1_TOTAL", $ele1.text())
        })
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.SUBMITTED);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create contract from wizard and Change contract status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _saleContractPage.createContractRecord_byWizardOption(CONT_01);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_SALES_CONTRACT)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME)
        _common.select_rowInContainer(cnt.uuid.CONTRACTS)
        _common.getText_fromCell(cnt.uuid.CONTRACTS, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CONTRACT_CODE", $ele1.text())
        })
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET, Cypress.env("BID1_TOTAL"))
        _common.openTab(app.TabBar.CONTRACTBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTSALES_BOQS, app.FooterTab.BOQs, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTSALES_BOQS)
        _common.select_rowInContainer(cnt.uuid.CONTRACTSALES_BOQS)

        _common.openTab(app.TabBar.CONTRACTBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1, CONTAINER_COLUMNS_SALES_CONTRACT_BOQ_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURE1)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1, BOQ_ITEM_01)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.QUANTITY_ADJ, Cypress.env("Item1_Qty"))
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1, BOQ_ITEM_02)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.QUANTITY_ADJ, Cypress.env("Item2_Qty"))
        _saleContractPage.changeStatus_ContractRecord();
        cy.SAVE();
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create QTO header and Verify Quantity", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, Sidebar.SideBarOptions.QTO)
        _common.openTab(app.TabBar.QTOHEADER).then(() => {
            _common.setDefaultView(app.TabBar.QTOHEADER)
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_HEADER, app.FooterTab.QUANTITYTAKEOFFHEADER, 0)
            _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_HEADER, CONTAINER_COLUMNS_QUANTITY_TAKEOFF_HEADER)
        })
        _common.clear_subContainerFilter(cnt.uuid.QUANTITY_TAKEOFF_HEADER)
        _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_HEADER);
        cy.wait(1000).then(() => {
            _salesPage.enter_dataToCreate_QTOHeader(CommonLocators.CommonKeys.SALES_WIP_AND_BILL, QTO_01, Cypress.env("CONTRACT_CODE"), BOQ_HEADER_01, PRJ_NAME);
        })
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.QUANTITY_TAKEOFF_HEADER, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("QTO_CODE", $ele1.text())
            cy.log(Cypress.env("QTO_CODE"))
        })
        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY)
            _common.setup_gridLayout(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, CONTAINER_COLUMNS_BILL_OF_QUANTITY)
        })
        _common.clear_subContainerFilter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
        _common.maximizeContainer(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
        _common.select_rowHasValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, BOQ_HEADER_01)
        _common.clickOn_toolbarButton(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, BOQ_ITEM_01)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.ORD_QUANTITY_SMALL, Cypress.env("Item1_Qty"))
        _common.select_rowHasValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, BOQ_ITEM_02)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.ORD_QUANTITY_SMALL, Cypress.env("Item2_Qty"))
        _common.minimizeContainer(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
    });

    it("TC - Go back to Estimateheader", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, Sidebar.SideBarOptions.PROJECT)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_FILTER_CURRENT_VERSION)
        _common.search_inSubContainer(cnt.uuid.ESTIMATE, EST_HEADER_01);
        _common.select_rowHasValue(cnt.uuid.ESTIMATE, EST_HEADER_01)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create new line item for project change with resource", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.prjchangefk, CONTAINER_COLUMNS_LINE_ITEM.boqitemfk, CONTAINER_COLUMNS_LINE_ITEM.estqtyrelactfk, CONTAINER_COLUMNS_LINE_ITEM.estqtyrelboqfk, CONTAINER_COLUMNS_LINE_ITEM.estqtytelaotfk, CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo], cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, CHANGE_LINE_ITEM_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, CHG_ITEM_03)
        _estimatePage.edit_LineItem_ProjectChange(CONTAINERS_LINE_ITEM.CHANGE_QUANTITY[0], CommonLocators.CommonKeys.FROM_STRUCTURE, CommonLocators.CommonKeys.FROM_STRUCTURE, PRJ_NAME, CHANGE_01)
        cy.SAVE();
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_3)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, CHG_ITEM_03)
        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item3_Qty", $ele1.text())
            cy.log(Cypress.env("Item3_Qty"))
        })
        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CH_ITEM_TOTAL", $ele1.text())
            cy.log(Cypress.env("CH_ITEM_TOTAL"))
        })
    });

    it("TC - Create new sales bid for project change change bid status", function () {
        _bidPage.createBidRecord_byWizardOptions(CommonLocators.CommonKeys.CHANGE_BID, CHANGEBID_01, CONTAINERS_BIDS.BUSINESS_PARTNER, CommonLocators.CommonKeys.BOQ);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
            _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BIDS)
        });
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME)
        _common.select_rowHasValue(cnt.uuid.BIDS, BID_CHANGE_01)
        _common.getText_fromCell(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CH_BID_TOTAL", $ele1.text())
            cy.log(Cypress.env("CH_BID_TOTAL"))
        })
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, Cypress.env("BID1_TOTAL"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, Cypress.env("CH_ITEM_TOTAL"))
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.SUBMITTED);
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create contract from wizard and Change contract status for project change", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _saleContractPage.createContractRecord_byWizardOptions(CommonLocators.CommonKeys.CHANGE_ORDER, CHANGECONT_01, CONTAINERS_BIDS.BUSINESS_PARTNER, CONT_01)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.CONTACTS, CONTAINER_COLUMNS_SALES_CONTRACT)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.search_inSubContainer(cnt.uuid.CONTRACTS, CHANGECONT_01)
        _common.select_rowHasValue(cnt.uuid.CONTRACTS, CHANGECONT_01)
        _common.getText_fromCell(cnt.uuid.CONTRACTS, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CH_CONT_Code", $ele1.text())
            cy.log(Cypress.env("CH_CONT_Code"))
        })
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET, Cypress.env("CH_BID_TOTAL"))
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET, Cypress.env("BID1_TOTAL"))
        _common.openTab(app.TabBar.CONTRACTBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTSALES_BOQS, app.FooterTab.BOQs, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTSALES_BOQS)
        _common.select_rowInSubContainer(cnt.uuid.CONTRACTSALES_BOQS)

        _common.openTab(app.TabBar.CONTRACTBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1, CONTAINER_COLUMNS_SALES_CONTRACT_BOQ_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURE1)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1, BOQ_ITEM_02)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.QUANTITY_ADJ, Cypress.env("Item3_Qty"))
        _saleContractPage.changeStatus_ContractRecord();
        cy.SAVE();
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify Quantity in QTO header", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, Sidebar.SideBarOptions.QTO)
        _common.openTab(app.TabBar.QTOHEADER).then(() => {
            _common.setDefaultView(app.TabBar.QTOHEADER)
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_HEADER, app.FooterTab.QUANTITYTAKEOFFHEADER, 0)
            _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_HEADER, CONTAINER_COLUMNS_QUANTITY_TAKEOFF_HEADER)
        })
        _common.clear_subContainerFilter(cnt.uuid.QUANTITY_TAKEOFF_HEADER)
        _common.select_rowHasValue(cnt.uuid.QUANTITY_TAKEOFF_HEADER, Cypress.env("QTO_CODE"))

        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY)
            _common.setup_gridLayout(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, CONTAINER_COLUMNS_BILL_OF_QUANTITY)
        })
        _common.clear_subContainerFilter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
        _common.maximizeContainer(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
        cy.REFRESH_CONTAINER()
        _common.select_rowHasValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, BOQ_HEADER_01)
        _common.clickOn_toolbarButton(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, BOQ_ITEM_02)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.ORD_QUANTITY_SMALL, (parseFloat(Cypress.env("Item2_Qty")) + parseFloat(Cypress.env("Item3_Qty"))).toFixed(3).toString())
        _common.minimizeContainer(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
        cy.REFRESH_CONTAINER()
    });

    it("TC - Create WIP from Contract and Change WIP Status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, Sidebar.SideBarOptions.CONTRACT_SALES)
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_SALES_CONTRACT)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME);
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.select_rowHasValue(cnt.uuid.CONTRACTS, Cypress.env("CONT1_CODE"))
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
        _wipPage.create_WIPfrom_Wizard(WIP_01)
        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.setup_gridLayout(cnt.uuid.WIP, CONTAINER_COLUMNS_WIP)
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP, WIP_01)
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_WIP, CONTAINER_COLUMNS_WIP_BOQS)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_WIP)
        _common.select_rowInSubContainer(cnt.uuid.BOQ_WIP)
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTUREWIP)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREWIP, BOQ_ITEM_01)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.ORD_QUANTITY_SMALL, Cypress.env("Item1_Qty"))
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREWIP, BOQ_ITEM_02)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.ORD_QUANTITY_SMALL, Cypress.env("Total Qty"))
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_WIP_STATUS);
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC- Create Bill from WIP and change its status", function () {
        _billPage.create_BillFromWizard(Sidebar.SideBarOptions.CREATE_BILL, CommonLocators.CommonKeys.PROGRESS_INVOICE, CommonLocators.CommonKeys.WIP1, BILL_01)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
            _common.setup_gridLayout(cnt.uuid.BILLS, CONTAINER_COLUMNS_BILLS)
        });
        _common.clear_subContainerFilter(cnt.uuid.BILLS)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BILL_STATUS);
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.BPA_BILLED);
        cy.SAVE()
    })
    
})
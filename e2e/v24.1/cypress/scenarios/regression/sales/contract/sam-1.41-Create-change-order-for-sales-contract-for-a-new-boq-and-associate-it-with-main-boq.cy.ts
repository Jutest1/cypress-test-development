
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _bidPage, _saleContractPage, _procurementPage, _wipPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const BOQ_DESC_1 = "BOQ1_DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC_1 = "BSD-" + Cypress._.random(0, 999);
let BOQ_PARAMETERS_1: DataCells
let BOQ_STRUCTURE_PARAMETERS_1: DataCells

const BOQ_DESC_2 = "BOQ2_DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC_2 = "BSD-1-" + Cypress._.random(0, 999);
let BOQ_PARAMETERS_2: DataCells
let BOQ_STRUCTURE_PARAMETERS_2: DataCells

let CONTAINERS_BOQ_STRUCTURE
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

const PROJECT_NO = "34" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS: DataCells
let MODAL_PROJECTS

const BID_DESC = "BD1_" + Cypress._.random(0, 999);
const BID_DESC_1 = "BD2_" + Cypress._.random(0, 999);

const CONTRACT_DESC = "CD1-" + Cypress._.random(0, 999);
const CONTRACT_DESC_1 = "CD2-" + Cypress._.random(0, 999);

const QTO_DESC_1 = "QTOD1_" + Cypress._.random(0, 999);
const QTO_DESC_2 = "QTOD2_" + Cypress._.random(0, 999);

const CHANGES_DESC = "CHS1-" + Cypress._.random(0, 999);
const CHANGES_DESC2 = "CHS2-" + Cypress._.random(0, 999);


const WIP_DESC_1 = "WIPD1-" + Cypress._.random(0, 999);
const WIP_DESC_2 = "WIPD2-" + Cypress._.random(0, 999);

const BILL_DESC_1 = "BILL_DESC_" + Cypress._.random(0, 999);
const BILL_DESC_2 = "BILL_DESC_" + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM
let GENERATE_LINE_ITEMS_PARAMETERS_1: DataCells
let GENERATE_LINE_ITEMS_PARAMETERS_2: DataCells

let CONTAINER_COLUMNS_BID
let MODAL_CREATE_BID

let CONTAINER_COLUMNS_CONTRACT

let CONTAINER_COLUMNS_QTO_HEADER

let CONTAINER_COLUMNS_BILL_OF_QUANTITY

let CONTAINER_COLUMNS_QUANTITY_TAKE_OFF_DETAILS

let WIP_PARAMETERS_1: DataCells
let WIP_PARAMETERS_2: DataCells

let CONTAINER_COLUMNS_WIP
let CONTAINER_COLUMNS_WIP_BOQ
let CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE

let CONTAINER_COLUMNS_CHANGES

let CONTAINER_COLUMNS_BILL

let BILL_PARAMETERS_1: DataCells
let BILL_PARAMETERS_2: DataCells

ALLURE.epic("SALES");
ALLURE.feature("Sales-Bill");
ALLURE.story("SAM- 1.41 | Create change order for sales contract for new boq and associate it with main boq");

describe("SAM- 1.41 | Create change order for sales contract for new boq and associate it with main boq", () => {

    beforeEach(function () {
        cy.fixture("sam/sam-1.41-Create-change-order-for-sales-contract-for-a-new-boq-and-associate-it-with-main-boq.json")
            .then((data) => {
                this.data = data;
            });
    });

    before(function () {
        cy.fixture("sam/sam-1.41-Create-change-order-for-sales-contract-for-a-new-boq-and-associate-it-with-main-boq.json")
            .then((data) => {
                this.data = data;
                MODAL_PROJECTS = this.data.MODAL.PROJECTS
                PROJECTS_PARAMETERS = {
                    [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                    [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                    [commonLocators.CommonLabels.CLERK]: MODAL_PROJECTS.CLERK
                }

                CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
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
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
                };

                CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
                CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
                GENERATE_LINE_ITEMS_PARAMETERS_1 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                    [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC_1
                }
                GENERATE_LINE_ITEMS_PARAMETERS_2 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                    [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC_2
                }

                CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
                BOQ_PARAMETERS_1 = {
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC_1
                }
                BOQ_PARAMETERS_2 = {
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC_2
                }
                CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
                BOQ_STRUCTURE_PARAMETERS_1 = {
                    [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC_1,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                    [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
                }
                BOQ_STRUCTURE_PARAMETERS_2 = {
                    [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC_2,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                    [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
                }
                CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE

                CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID
                MODAL_CREATE_BID = this.data.MODAL.CREATE_BID

                CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT

                CONTAINER_COLUMNS_QTO_HEADER = this.data.CONTAINER_COLUMNS.QTO_HEADER

                CONTAINER_COLUMNS_BILL_OF_QUANTITY = this.data.CONTAINER_COLUMNS.BILL_OF_QUANTITY

                CONTAINER_COLUMNS_QUANTITY_TAKE_OFF_DETAILS = this.data.CONTAINER_COLUMNS.QUANTITY_TAKE_OFF_DETAILS

                WIP_PARAMETERS_1 = {
                    [commonLocators.CommonLabels.DESCRIPTION]: WIP_DESC_1,
                    [commonLocators.CommonLabels.CLERK]: MODAL_PROJECTS.CLERK
                }
                WIP_PARAMETERS_2 = {
                    [commonLocators.CommonLabels.DESCRIPTION]: WIP_DESC_2,
                    [commonLocators.CommonLabels.CLERK]: MODAL_PROJECTS.CLERK
                }
                CONTAINER_COLUMNS_WIP = this.data.CONTAINER_COLUMNS.WIP
                CONTAINER_COLUMNS_WIP_BOQ = this.data.CONTAINER_COLUMNS.WIP_BOQ
                CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.WIP_BOQ_STRUCTURE

                CONTAINER_COLUMNS_CHANGES = this.data.CONTAINER_COLUMNS.CHANGES

                CONTAINER_COLUMNS_BILL = this.data.CONTAINER_COLUMNS.BILL
                BILL_PARAMETERS_2 = {
                    [commonLocators.CommonLabels.BILL_TYPE]: commonLocators.CommonKeys.PROGRESS_INVOICE,
                    [commonLocators.CommonLabels.DESCRIPTION]: BILL_DESC_2,
                    [app.GridCells.DESCRIPTION_INFO]: [WIP_DESC_1, WIP_DESC_2],
                    [commonLocators.CommonKeys.VALUE]: [commonLocators.CommonKeys.CHECK, commonLocators.CommonKeys.CHECK]
                }

                BILL_PARAMETERS_1 = {
                    [commonLocators.CommonLabels.BILL_TYPE]: commonLocators.CommonKeys.PROGRESS_INVOICE,
                    [commonLocators.CommonLabels.DESCRIPTION]: BILL_DESC_1,
                    [app.GridCells.DESCRIPTION_INFO]: WIP_DESC_1,
                    [commonLocators.CommonKeys.VALUE]: [commonLocators.CommonKeys.CHECK]
                }
            })
            .then(() => {
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
                _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
            })
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Project change status accepted and Is Identified checkbox check', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.waitForLoaderToDisappear()

        cy.REFRESH_CONTAINER();
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, sidebar.SideBarOptions.PROJECT_CHANGE_STATUS);
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER();
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, sidebar.SideBarOptions.PROJECT_CHANGE_STATUS);

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS);
        _common.maximizeContainer(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, commonLocators.CommonKeys.APPROVED);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_RECORDS, app.GridCells.ICON, commonLocators.CommonKeys.HOOK);
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_ACCEPTED, commonLocators.CommonKeys.CHECK)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_ALLOWED_QTO_FOR_PROC, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
    });



    it("TC - Create BoQ header and BoQ structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();

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
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS_1);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.BOQS)
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
        })
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS_1);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

    });
    it("TC - Create estimate header", function () {
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
    });

    it("TC - Generate boq line item and assign resource to it", function () {
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
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS_1);
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)


        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.minimizeContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        })
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, "EST_COST_TOTAL")

    });

    it("TC - Create Bid ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);

        _bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.MAIN_BID, BID_DESC, MODAL_CREATE_BID.BUSINESS_PARTNER, MODAL_CREATE_BID.STRUCTURE_TYPE)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS)
            _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BID)
        })
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BIDS, BID_DESC)
        _common.assert_forNumericValues(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, Cypress.env("EST_COST_TOTAL").toString())
        _common.saveCellDataToEnv(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, "BID_NET_AMOUNT")

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED)
        _common.waitForLoaderToDisappear()

    })

    it("TC - Create contract from bid ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        _saleContractPage.create_contract_fromWizard(CONTRACT_DESC);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACT)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.search_inSubContainer(cnt.uuid.CONTRACTS, CONTRACT_DESC)
        _common.select_rowHasValue(cnt.uuid.CONTRACTS, CONTRACT_DESC)
        _common.assert_forNumericValues(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET, Cypress.env("BID_NET_AMOUNT"))

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.CONTRACTED);
        _common.waitForLoaderToDisappear()
        cy.SAVE()

    })

    it("TC - Create QTO ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QTO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QTOHEADER).then(() => {
            _common.setDefaultView(app.TabBar.QTOHEADER)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_HEADER, app.FooterTab.QUANTITYTAKEOFFHEADER, 0);
            _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_HEADER, CONTAINER_COLUMNS_QTO_HEADER)
        });
        _common.clear_subContainerFilter(cnt.uuid.QUANTITY_TAKEOFF_HEADER)
        _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_HEADER)
        _salesPage.enter_dataToCreate_QTOHeader(commonLocators.CommonKeys.SALES_WIP_AND_BILL, QTO_DESC_1, CONTRACT_DESC, BOQ_DESC_1)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()

        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.QUANTITY_TAKEOFF_HEADER, QTO_DESC_1)

        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
            _common.setup_gridLayout(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, CONTAINER_COLUMNS_BILL_OF_QUANTITY)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BILL_OF_QUANTITY.briefinfo, CONTAINER_COLUMNS_BILL_OF_QUANTITY.installedquantity], cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
        });
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITYTAKEOFFHEADER, 1);
            _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, CONTAINER_COLUMNS_QUANTITY_TAKE_OFF_DETAILS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_QUANTITY_TAKE_OFF_DETAILS.boqitemcode, CONTAINER_COLUMNS_QUANTITY_TAKE_OFF_DETAILS.value1detail, CONTAINER_COLUMNS_QUANTITY_TAKE_OFF_DETAILS.result], cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
        })
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
        _common.select_rowHasValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, BOQ_DESC_1)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.BRIEF_INFO_SMALL, BOQ_DESC_1)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC_1)


        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITYTAKEOFFHEADER, 1);
        })
        _common.clear_subContainerFilter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
        _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
        _common.edit_dropdownCellWithInput(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.GridCells.BOQ_ITEM_CODE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, BOQ_STRUCTURE_DESC_1)
        _common.enterRecord_inNewRow(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.GridCells.VALUE_1_DETAIL, app.InputFields.DOMAIN_TYPE_REMARK, CONTAINERS_LINE_ITEM.QTO_VALUE)
        _common.select_activeRowInContainer(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.GridCells.RESULT)
            .then(($result) => {
                _common.openTab(app.TabBar.DETAIL).then(() => {
                    _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
                });
                _common.clickOn_cellHasUniqueValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.BRIEF_INFO_SMALL, BOQ_DESC_1)
                _common.clickOn_toolbarButton(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, btn.ToolBar.ICO_TREE_EXPAND_ALL)
                _common.clickOn_cellHasUniqueValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC_1)
                _common.select_activeRowInContainer(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
                _common.assert_forNumericValues(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.INSTALLED_QUANTITY, $result.text())
            })
    })

    it("TC - Create WIP1 from QTO ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_WIP);
        _common.waitForLoaderToDisappear()

        _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETERS_1)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.setDefaultView(app.TabBar.WIP)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.setup_gridLayout(cnt.uuid.WIP, CONTAINER_COLUMNS_WIP)
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP, WIP_DESC_1)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.setup_gridLayout(cnt.uuid.WIP, CONTAINER_COLUMNS_WIP)
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP, WIP_DESC_1)
        _common.saveCellDataToEnv(cnt.uuid.WIP, app.GridCells.AMOUNT_NET, "WIP1_NET_AMOUNT")
        _common.getText_fromCell(cnt.uuid.WIP, app.GridCells.AMOUNT_NET)
            .then(($netAmount) => {
                _common.openTab(app.TabBar.WIPBOQ).then(() => {
                    _common.waitForLoaderToDisappear()
                    _common.select_tabFromFooter(cnt.uuid.WIPBOQ, app.FooterTab.BOQs, 0);
                    _common.setup_gridLayout(cnt.uuid.WIPBOQ, CONTAINER_COLUMNS_WIP_BOQ)
                });
                _common.clear_subContainerFilter(cnt.uuid.WIPBOQ)
                _common.select_rowHasValue(cnt.uuid.WIPBOQ, BOQ_DESC_1)

                _common.openTab(app.TabBar.WIPBOQ).then(() => {
                    _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
                    _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE)
                    _common.set_columnAtTop([CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE.boqlinetypefk, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE.prevquantity], cnt.uuid.BOQ_STRUCTUREWIP)
                });
                _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTUREWIP)
                _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREWIP, BOQ_STRUCTURE_DESC_1)
                _common.getText_fromCell(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.PRICE_SMALL)
                    .then(($unitRate) => {
                        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL)
                            .then(($quantity) => {
                                let quantity: any = parseFloat($quantity.text().replace(',', '')).toFixed(2)
                                let unitRate: any = parseFloat($unitRate.text().replace(',', '')).toFixed(2)
                                let calculatedNetAmount: any = quantity * unitRate
                                expect(parseFloat(calculatedNetAmount).toFixed(2)).equal(parseFloat($netAmount.text().replace(',', '')).toFixed(2))
                            })
                    })

            })

        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_WIP_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create Bill1 ", function () {
        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        });

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BILL);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _billPage.create_bill_fromWizard(BILL_PARAMETERS_1)
        cy.wait(2000)
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_BILL)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
        });
    })

    it("TC - Create changes and change status", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CHANGES);

        _common.openTab(app.TabBar.CHANGES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CHANGES, app.FooterTab.CHANGES, 0);
            _common.setup_gridLayout(cnt.uuid.CHANGES, CONTAINER_COLUMNS_CHANGES)
        });
        _common.clear_subContainerFilter(cnt.uuid.CHANGES)
        _common.create_newRecord(cnt.uuid.CHANGES)
        _common.enterRecord_inNewRow(cnt.uuid.CHANGES, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CHANGES_DESC)
        _common.select_activeRowInContainer(cnt.uuid.CHANGES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CHANGES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CHANGES, app.FooterTab.CHANGES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.CHANGES)
        _common.create_newRecord(cnt.uuid.CHANGES)
        _common.enterRecord_inNewRow(cnt.uuid.CHANGES, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CHANGES_DESC2)
        _common.select_activeRowInContainer(cnt.uuid.CHANGES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.reload()
        cy.wait(2000)// This iw required as entire page is reloaded

        _common.openTab(app.TabBar.CHANGES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CHANGES, app.FooterTab.CHANGES, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.CHANGES)
        _common.search_inSubContainer(cnt.uuid.CHANGES, CHANGES_DESC)
        _common.select_rowHasValue(cnt.uuid.CHANGES, CHANGES_DESC)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()


        _common.clear_subContainerFilter(cnt.uuid.CHANGES)
        _common.search_inSubContainer(cnt.uuid.CHANGES, CHANGES_DESC2)
        _common.select_rowHasValue(cnt.uuid.CHANGES, CHANGES_DESC2)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
    })
    //! /* SECOND PART */

    it("TC - Create BoQ header and BoQ structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();

        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.maximizeContainer(cnt.uuid.BOQS)
        _common.create_newRecord(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS_2);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.BOQS)
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS_2);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
    });

    it("TC - Go to estimate", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.search_inSubContainer(cnt.uuid.ESTIMATE, ESTIMATE_DESCRIPTION);
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Generate boq line item add project change and assign resource to it", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo, CONTAINER_COLUMNS_LINE_ITEM.code, CONTAINER_COLUMNS_LINE_ITEM.costtotal, CONTAINER_COLUMNS_LINE_ITEM.estqtyrelboqfk, CONTAINER_COLUMNS_LINE_ITEM.prjchangefk], cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS_2);

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        })
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_STRUCTURE_DESC_2)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_STRUCTURE_DESC_2)

        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.EST_QTY_REL_BOQ_FK, commonLocators.CommonKeys.LIST, commonLocators.CommonKeys.TO_STRUCTURE)
        _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRJ_CHANGE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CHANGES_DESC)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, "EST_COST_TOTAL_1")
    });

    it("TC - Create Bid and verify change Bid Net Amount == Cost Total of newly generated line item from change Boq", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);

        _bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.CHANGE_BID, BID_DESC_1, MODAL_CREATE_BID.BUSINESS_PARTNER, MODAL_CREATE_BID.STRUCTURE_TYPE, BID_DESC, "NA", CHANGES_DESC)
        _common.waitForLoaderToDisappear()

        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS)
        })
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BIDS, BID_DESC_1)
        _common.assert_forNumericValues(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, Cypress.env("EST_COST_TOTAL_1").toString())
        _common.saveCellDataToEnv(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, "BID_NET_AMOUNT_1")

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create change order contract from bid and verify change order gets created with new BoQ and selected project change", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        _saleContractPage.createContractRecord_byWizardOptions(commonLocators.CommonKeys.CHANGE_ORDER, CONTRACT_DESC_1, "NA", CONTRACT_DESC, CHANGES_DESC2)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.search_inSubContainer(cnt.uuid.CONTRACTS, CONTRACT_DESC_1)
        _common.select_rowHasValue(cnt.uuid.CONTRACTS, CONTRACT_DESC_1)
        _common.assert_forNumericValues(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET, Cypress.env("BID_NET_AMOUNT_1"))

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(sidebar.SideBarOptions.CONTRACTED)
        _common.waitForLoaderToDisappear()

    })

    it("TC - Create QTO2 and verify new BoQ added to it", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QTO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QTOHEADER).then(() => {
            _common.setDefaultView(app.TabBar.QTOHEADER)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_HEADER, app.FooterTab.QUANTITYTAKEOFFHEADER, 0);
            _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_HEADER, CONTAINER_COLUMNS_QTO_HEADER)
        });
        _common.clear_subContainerFilter(cnt.uuid.QUANTITY_TAKEOFF_HEADER)
        _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_HEADER)
        _salesPage.enter_dataToCreate_QTOHeader(commonLocators.CommonKeys.SALES_WIP_AND_BILL, QTO_DESC_2, CONTRACT_DESC, BOQ_DESC_2)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()

        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.QUANTITY_TAKEOFF_HEADER, QTO_DESC_2)

        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
            _common.setup_gridLayout(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, CONTAINER_COLUMNS_BILL_OF_QUANTITY)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BILL_OF_QUANTITY.briefinfo, CONTAINER_COLUMNS_BILL_OF_QUANTITY.installedquantity], cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
        });
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITYTAKEOFFHEADER, 1);
            _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, CONTAINER_COLUMNS_QUANTITY_TAKE_OFF_DETAILS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_QUANTITY_TAKE_OFF_DETAILS.boqitemcode, CONTAINER_COLUMNS_QUANTITY_TAKE_OFF_DETAILS.value1detail, CONTAINER_COLUMNS_QUANTITY_TAKE_OFF_DETAILS.result], cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
        })
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.BRIEF_INFO_SMALL, BOQ_DESC_2)
        _common.clickOn_toolbarButton(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC_2)


        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITYTAKEOFFHEADER, 1);
        })
        _common.clear_subContainerFilter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
        _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
        _common.edit_dropdownCellWithInput(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.GridCells.BOQ_ITEM_CODE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, BOQ_STRUCTURE_DESC_2)
        _common.enterRecord_inNewRow(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.GridCells.VALUE_1_DETAIL, app.InputFields.DOMAIN_TYPE_REMARK, CONTAINERS_LINE_ITEM.QTO_VALUE)
        _common.select_activeRowInContainer(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.GridCells.RESULT)
            .then(($result) => {
                _common.openTab(app.TabBar.DETAIL).then(() => {
                    _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
                });
                _common.clickOn_cellHasUniqueValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.BRIEF_INFO_SMALL, BOQ_DESC_2)
                _common.clickOn_toolbarButton(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, btn.ToolBar.ICO_TREE_EXPAND_ALL)
                _common.clickOn_cellHasUniqueValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC_2)
                _common.select_activeRowInContainer(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
                _common.assert_forNumericValues(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.INSTALLED_QUANTITY, $result.text())
            })
    })

    it("TC - Create WIP2 from QTO ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_WIP);
        _common.waitForLoaderToDisappear()

        _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETERS_2)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.setDefaultView(app.TabBar.WIP)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.setup_gridLayout(cnt.uuid.WIP, CONTAINER_COLUMNS_WIP)
        });
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP, WIP_DESC_2)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.setup_gridLayout(cnt.uuid.WIP, CONTAINER_COLUMNS_WIP)
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP, WIP_DESC_2)
        _common.saveCellDataToEnv(cnt.uuid.WIP, app.GridCells.AMOUNT_NET, "WIP2_NET_AMOUNT")
        _common.getText_fromCell(cnt.uuid.WIP, app.GridCells.AMOUNT_NET)
            .then(($netAmount) => {
                _common.openTab(app.TabBar.WIPBOQ).then(() => {
                    _common.waitForLoaderToDisappear()
                    _common.select_tabFromFooter(cnt.uuid.WIPBOQ, app.FooterTab.BOQs, 0);
                    _common.setup_gridLayout(cnt.uuid.WIPBOQ, CONTAINER_COLUMNS_WIP_BOQ)
                });
                _common.clear_subContainerFilter(cnt.uuid.WIPBOQ)
                _common.select_rowHasValue(cnt.uuid.WIPBOQ, BOQ_DESC_2)

                _common.openTab(app.TabBar.WIPBOQ).then(() => {
                    _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
                    _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE)
                    _common.set_columnAtTop([CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE.boqlinetypefk, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE.prevquantity], cnt.uuid.BOQ_STRUCTUREWIP)
                });
                _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTUREWIP)
                _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREWIP, BOQ_STRUCTURE_DESC_2)
                _common.getText_fromCell(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.PRICE_SMALL)
                    .then(($unitRate) => {
                        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL)
                            .then(($quantity) => {
                                let quantity: any = parseFloat($quantity.text().replace(',', '')).toFixed(2)
                                let unitRate: any = parseFloat($unitRate.text().replace(',', '')).toFixed(2)
                                let calculatedNetAmount: any = quantity * unitRate
                                expect(parseFloat(calculatedNetAmount).toFixed(2)).equal(parseFloat($netAmount.text().replace(',', '')).toFixed(2))
                            })
                    })

            })

        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_WIP_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()

    })
    it("TC - Create Bill2 from WIP and verify Bill2 Net Amount == New WIP Net Amount", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BILL);
        _billPage.create_bill_fromWizard(BILL_PARAMETERS_2)
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_BILL)

        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.setDefaultView(app.TabBar.BILLS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
            _common.setup_gridLayout(cnt.uuid.BILLS, CONTAINER_COLUMNS_BILL)
        });
        _common.clear_subContainerFilter(cnt.uuid.BILLS)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.BILLS, BILL_DESC_2)
        _common.select_rowHasValue(cnt.uuid.BILLS, BILL_DESC_2)

        let wip1NetAmount: any = parseFloat(Cypress.env('WIP1_NET_AMOUNT').toString().replace(',', '')).toFixed(2)
        let wip2NetAmount: any = parseFloat(Cypress.env('WIP2_NET_AMOUNT').toString().replace(',', '')).toFixed(2)
        let totalNetAmount: any = (+wip1NetAmount) + (+wip2NetAmount)
        _common.assert_forNumericValues(cnt.uuid.BILLS, app.GridCells.AMOUNT_NET, Cypress.env('WIP2_NET_AMOUNT'))
    })

});
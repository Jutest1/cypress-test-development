import cypress from "cypress";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage, _billPage } from "cypress/pages";
import _ from "cypress/types/lodash";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const BOQ_HEADER_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);
const CONTRACT_DESC = "CONTRACT-DESC-" + Cypress._.random(0, 999);
const QTO_DESC = "QTO-DESC-" + Cypress._.random(0, 999);
const EST_CODE = '1' + Cypress._.random(0, 999);
const CLERK_NAME = "HS"
const BILL_DESC = "BILL-DESC-" + Cypress._.random(0, 999);
const CHANGE_DESC = "CHANGE-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_CHANGE_DESC = "BOQSTRUCTCHANGE-DESC-" + Cypress._.random(0, 999);
const BID_CHANGE_DESC = "BIDCHANGE-DESC-" + Cypress._.random(0, 999);
const CONTRACT_CHANGE_DESC = "BIDCHANGE-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJNO-" + Cypress._.random(0, 999);
const PRJ_NAME = "PRJNAME-" + Cypress._.random(0, 999);
const COST_TOTAL = 'COST_TOTAL'
const BID_CODE = 'BID_CODE'
const NET_AMOUNT = 'NET_AMOUNT'
const PRJ_CHANGED_CODE = 'PRJ_CHANGED_CODE'
const CHANGE_COST_TOTAL = 'CHANGE_COST_TOTAL'

let PROJECTS_PARAMETERS: DataCells,
    BOQ_PARAMETERS: DataCells,
    BOQ_STRUCTURE_PARAMETERS: DataCells,
    BOQ_STRUCTURE_PARAMETERS_1: DataCells,
    ESTIMATE_PARAMETERS: DataCells,
    GENERATE_LINE_ITEMS_PARAMETERS: DataCells,
    RESOURCE_PARAMETERS: DataCells,
    WIP_PARAMETERS: DataCells,
    CHANGE_LINE_ITEM_PARAMETERS: DataCells

let CONTAINER_DATA_TYPE,
    CONTAINER_DATA_RECORD,
    CONTAINER_COLUMNS_BOQS,
    CONTAINERS_BOQ_STRUCTURE,
    CONTAINER_COLUMNS_BOQ_STRUCTURE,
    CONTAINERS_ESTIMATE,
    CONTAINER_COLUMNS_ESTIMATE,
    CONTAINER_CHANGE_LINE_ITEM,
    CONTAINER_COLUMNS_LINE_ITEM,
    CONTAINERS_RESOURCE,
    CONTAINER_COLUMNS_RESOURCE,
    CONTAINERS_BID,
    CONTAINERS_QUANTITY_TAKEOFF_HEADER,
    CONTAINER_COLUMNS_QUANTITY_TAKEOFF_HEADER,
    CONTAINER_COLUMNS_BILL_OF_QUANTITY_LOOKUP,
    CONTAINER_COLUMNS_QUANTITY_TAKEOFF_DETAIL,
    CONTAINER_BILL,
    CONTAINER_COLUMNS_BILL


allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 1.67 | Working with change order1 adding change lines to existing BoQ")

describe("SAM- 1.67 | Working with change order1 adding change lines to existing BoQ", () => {
    before(function () {
        cy.fixture("sam/sam-1.67-working-with-change-order1-adding-change-lines-to-existing-BoQ.json").then((data) => {
            this.data = data;
            CONTAINER_DATA_TYPE = this.data.CONTAINERS.DATA_TYPE
            CONTAINER_DATA_RECORD = this.data.CONTAINERS.DATA_RECORD
            CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_QUANTITY_TAKEOFF_HEADER = this.data.CONTAINERS.QUANTITY_TAKEOFF_HEADER
            CONTAINER_COLUMNS_QUANTITY_TAKEOFF_HEADER = this.data.CONTAINER_COLUMNS.QUANTITY_TAKEOFF_HEADER
            CONTAINERS_BID = this.data.CONTAINERS.BID
            CONTAINER_COLUMNS_BILL_OF_QUANTITY_LOOKUP = this.data.CONTAINER_COLUMNS.BILL_OF_QUANTITY_LOOKUP
            CONTAINER_COLUMNS_QUANTITY_TAKEOFF_DETAIL = this.data.CONTAINER_COLUMNS.QUANTITY_TAKEOFF_DETAIL
            CONTAINER_BILL = this.data.CONTAINERS.BILL
            CONTAINER_COLUMNS_BILL = this.data.CONTAINER_COLUMNS.BILL
            CONTAINER_CHANGE_LINE_ITEM = this.data.CONTAINERS.CHANGE_LINE_ITEM
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
            }
            BOQ_PARAMETERS = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_HEADER_DESC
            }
            BOQ_STRUCTURE_PARAMETERS = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQSTRUCT_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY[0],
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
            }
            BOQ_STRUCTURE_PARAMETERS_1 = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQSTRUCT_CHANGE_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY[1],
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[1],
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
            }
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            GENERATE_LINE_ITEMS_PARAMETERS = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_HEADER_DESC
            }
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            }
            WIP_PARAMETERS = {
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME
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

    it('TC - Precondition - Project change status accepted and Is Identified checkbox check  ', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        cy.wait(2000) //required wait to load page
        cy.REFRESH_CONTAINER();
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 1);
            _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
        });
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINER_DATA_TYPE.PROJECT_CHANGE_STATUS);
        cy.REFRESH_CONTAINER();
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, CONTAINER_DATA_TYPE.PROJECT_CHANGE_STATUS);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 1);
            _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS);
        });
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, CONTAINER_DATA_RECORD.DESCRIPTION);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, CONTAINER_DATA_RECORD.DESCRIPTION);
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_ACCEPTED, commonLocators.CommonKeys.CHECK)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_IDENTIFIED, commonLocators.CommonKeys.CHECK)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_ALLOWED_QTO_FOR_SALES, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
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
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE()
        cy.wait(2000) //required wait to load page
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create new estimate record", function () {
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
    });

    it("TC - Generate line item by wizards option", function () {
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
    });

    it("TC - Assign resource to generated line item", function () {
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

    it("TC - Verify Bid Net Amount= Estimate Cost Total", function () {
        _bidPage.createBidRecord_byWizardOption(BID_DESC, CONTAINERS_BID.BUSINESS_PARTNER, CONTAINERS_BID.STRUCTURE_TYPE);
        _common.waitForLoaderToDisappear()
        cy.wait(2000) //required wait to load page
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.clear_searchInSidebar()
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.BIDS, BID_DESC)
        _common.saveCellDataToEnv(cnt.uuid.BIDS, app.GridCells.CODE, BID_CODE)
        _bidPage.changeStatus_BidRecord()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(500).then(() => {//required wait to load page
            _common.assert_forNumericValues(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, Cypress.env(COST_TOTAL))
        })
    });

    it("TC - Verify Contract Net Amount= Bid Net Amount", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        cy.wait(2000) //required wait to load page
        _saleContractPage.createContractRecord_byWizardOption(CONTRACT_DESC)
        cy.wait(2000) //required wait to load page
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.clear_searchInSidebar()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET, Cypress.env(COST_TOTAL))
        _saleContractPage.changeStatus_ContractRecord()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create quantity TakeOff Detail", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QTO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QTOHEADER).then(() => {
            _common.setDefaultView(app.TabBar.QTOHEADER)
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_HEADER, app.FooterTab.QUANTITYTAKEOFFHEADER)
            _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_HEADER, CONTAINER_COLUMNS_QUANTITY_TAKEOFF_HEADER)
            _common.clear_subContainerFilter(cnt.uuid.QUANTITY_TAKEOFF_HEADER)
        })
        _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_HEADER);
        _salesPage.enter_dataToCreate_QTOHeader(CONTAINERS_QUANTITY_TAKEOFF_HEADER.ITEM, QTO_DESC, CONTRACT_DESC, BOQ_HEADER_DESC);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
            _common.setup_gridLayout(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, CONTAINER_COLUMNS_BILL_OF_QUANTITY_LOOKUP)
        })
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
        _common.clickOn_toolbarButton(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, btn.ToolBar.ICO_TREE_EXPAND_ALL);
        _common.clickOn_cellHasIcon(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITY_TAKEOFF, 1);
            _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, CONTAINER_COLUMNS_QUANTITY_TAKEOFF_DETAIL)
        })
        _salesPage.enter_recordToCreate_quantityTakeOffDetail(BOQ_HEADER_DESC, BOQSTRUCT_DESC, CONTAINERS_QUANTITY_TAKEOFF_HEADER.VALUE_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify In QTO1, IQ quantity in bill of quantity container should be reflected from quantity take off container", function () {
        cy.wait(2000).then(() => {//required wait to load page
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
            _common.assert_forNumericValues(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.INSTALLED_QUANTITY, CONTAINERS_QUANTITY_TAKEOFF_HEADER.VALUE_1)
        })
    })

    it("TC - Verify Wip Boq Quantity should come from installed QTO Quantity", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_WIP);
        cy.wait(1000)  //required wait to load page
        _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETERS)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.wait(1000)  //required wait to load page
        _common.setDefaultView(app.TabBar.WIP)
        _common.waitForLoaderToDisappear()
        _wipPage.changeStatus_WipRecord()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.WIP, app.GridCells.AMOUNT_NET, NET_AMOUNT)
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs, 0);
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
        });
        _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL, CONTAINERS_QUANTITY_TAKEOFF_HEADER.VALUE_1)
    })

    it("TC - Verify Bill1 Net Amount = WIP Net Amount", function () {
        _billPage.create_BillFromWizard(sidebar.SideBarOptions.CREATE_BILL, CONTAINER_BILL.TYPE, CONTAINER_BILL.SWITCH_CASE, BILL_DESC)
        cy.wait(2000)  //required wait to load page
        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
            _common.setup_gridLayout(cnt.uuid.BILLS, CONTAINER_COLUMNS_BILL)
            _common.waitForLoaderToDisappear()
            _common.assert_forNumericValues(cnt.uuid.BILLS, app.GridCells.AMOUNT_NET, Cypress.env(NET_AMOUNT))
        });
    })

    it("TC - Create new Change record in changes conatiner", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CHANGES);
        cy.wait(3000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.CHANGES)
        _common.edit_containerCell(cnt.uuid.CHANGES, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CHANGE_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.CHANGES, app.GridCells.CODE, PRJ_CHANGED_CODE)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        cy.wait(3000) //required wait to load page
    })

    it("TC - Create new BoQ structure record in same BoQ header", function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        cy.wait(1000).then(() => { //required wait to load page
            _common.search_inSubContainer(cnt.uuid.BOQS, BOQ_HEADER_DESC)
        })
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS_1);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create new line item in same Estimate header record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        cy.wait(2000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.ESTIMATE)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        cy.wait(3000) //required wait to load page
    });

    it("TC - Create new change line item record and  Assign resource to line item", function () {
        CHANGE_LINE_ITEM_PARAMETERS = {
            [app.GridCells.QUANTITY_SMALL]: CONTAINER_CHANGE_LINE_ITEM.QUANTITY,
            [app.GridCells.DESCRIPTION_INFO]: CHANGE_DESC,
            [app.GridCells.BOQ_ITEM_FK]: BOQSTRUCT_CHANGE_DESC,
            [app.GridCells.PRJ_CHANGE_FK]: Cypress.env(PRJ_CHANGED_CODE)
        };
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.prjchangefk,CONTAINER_COLUMNS_LINE_ITEM.boqitemfk,CONTAINER_COLUMNS_LINE_ITEM.quantity,CONTAINER_COLUMNS_LINE_ITEM.basuomfk,CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo],cnt.uuid.ESTIMATE_LINEITEMS)
        })
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, CHANGE_LINE_ITEM_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        cy.SAVE();
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, CHANGE_COST_TOTAL)
    });

    it("TC - Verify Change Bid Net Amount = Change Line Item Cost Total from Estimate", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
        cy.wait(2000).then(() => {//required wait to load page
            _bidPage.createBidRecord_byWizardOptions(CONTAINERS_BID.SWITCH_CASE_CHANGE_BID, BID_CHANGE_DESC, null, CONTAINERS_BID.STRUCTURE_TYPE, Cypress.env(BID_CODE), null, Cypress.env(PRJ_CHANGED_CODE));
        })
        cy.wait(2000)//required wait to load page
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
        _common.waitForLoaderToDisappear()
        cy.wait(500).then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, Cypress.env(CHANGE_COST_TOTAL))
        })
        _bidPage.changeStatus_BidRecord()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Verify Change Contract Net Amount= Change Bid Net Amount", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT)
        cy.wait(2000)//required wait to load page
        _saleContractPage.createContractRecord_byWizardOptions("Change Order", CONTRACT_CHANGE_DESC, null, CONTRACT_DESC, Cypress.env(PRJ_CHANGED_CODE)) //Buttons.buttonText.Yes
        cy.wait(2000)//required wait to load page
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.waitForLoaderToDisappear()
        _saleContractPage.changeStatus_ContractRecord()
        cy.wait(2000).then(() => { //required wait to load page
            _common.assert_forNumericValues(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET, Cypress.env(CHANGE_COST_TOTAL))
        })
        cy.SAVE()
    });

    it("TC - Verify In QTO2, New Change Line is automatically added to the QTO BoQ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QTO);
        cy.wait(2000)//required wait to load page
        _common.select_rowInContainer(cnt.uuid.QUANTITY_TAKEOFF_HEADER)
        _common.openTab(app.TabBar.DETAILS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
        });
        cy.wait(2000).then(() => {//required wait to load page
            _common.select_rowInContainer(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
            _common.assert_cellData_insideActiveRow(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.BRIEF_INFO, BOQSTRUCT_CHANGE_DESC)
        })
        _common.openTab(app.TabBar.DETAILS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITY_TAKEOFF, 0);
        });
        _salesPage.enter_recordToCreate_quantityTakeOffDetail(BOQ_HEADER_DESC, BOQSTRUCT_CHANGE_DESC, CONTAINERS_QUANTITY_TAKEOFF_HEADER.CHANGE_VALUE_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(2000).then(() => {//required wait to load page
            _common.assert_forNumericValues(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.INSTALLED_QUANTITY, CONTAINERS_QUANTITY_TAKEOFF_HEADER.CHANGE_VALUE_1)
        })
    })

    it("TC - Verify In WIP2 BoQ Structure, New Change Line Item gets populated with Qty", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
        cy.wait(2000)//required wait to load page
        _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETERS)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait to load page
        _common.setDefaultView(app.TabBar.WIP)
        _common.waitForLoaderToDisappear()
        _wipPage.changeStatus_WipRecord()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs, 0);
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.BRIEF_INFO, BOQSTRUCT_CHANGE_DESC)
        _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL, CONTAINERS_QUANTITY_TAKEOFF_HEADER.CHANGE_VALUE_1)
    })

    it("TC - Verify In Bill2, New Change Line Item gets populated with Qty", function () {
        _billPage.create_BillFromWizard(sidebar.SideBarOptions.CREATE_BILL, CONTAINER_BILL.TYPE, "WIP1", BILL_DESC)
        cy.wait(2000)//required wait to load page
        _common.openTab(app.TabBar.APPLICATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_BOQ, app.FooterTab.BOQs, 0);
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.BILLBOQSTRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.assert_forNumericValues(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_QUANTITY_TAKEOFF_HEADER.CHANGE_VALUE_1)
    })

    after(() => {
        cy.LOGOUT();
    });
})   

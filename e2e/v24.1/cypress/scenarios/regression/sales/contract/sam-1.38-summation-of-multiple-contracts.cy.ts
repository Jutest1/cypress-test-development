import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import { _common, _projectPage, _boqPage, _estimatePage, _bidPage, _saleContractPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const BOQ_DESC_1 = "BOQ1_DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC_1 = "BSD-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "Line-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const PROJECT_NO = "34" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const BID_DESC = "BD1_" + Cypress._.random(0, 999);
const BID_DESC_1 = "BD2_" + Cypress._.random(0, 999);
const CONTRACT_DESC = "CD1-" + Cypress._.random(0, 999);
const CONTRACT_DESC_1 = "CD2-" + Cypress._.random(0, 999);
const CHANGES_DESC = "CHS1-" + Cypress._.random(0, 999);
const CHANGES_DESC2 = "CHS2-" + Cypress._.random(0, 999);

let PROJECTS_PARAMETERS: DataCells, BOQ_PARAMETERS_1: DataCells, BOQ_STRUCTURE_PARAMETERS_1: DataCells, ESTIMATE_PARAMETERS: DataCells, RESOURCE_PARAMETERS: DataCells, RESOURCE_PARAMETERS_2: DataCells, GENERATE_LINE_ITEMS_PARAMETERS_1: DataCells, LINE_ITEM_PARAMETERS: DataCells;

let CONTAINERS_BOQ_STRUCTURE, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCE;

let CONTAINER_COLUMNS_BOQ, CONTAINER_COLUMNS_BOQ_STRUCTURE, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCE, CONTAINER_COLUMNS_BID, CONTAINER_COLUMNS_CONTRACT, CONTAINER_COLUMNS_CHANGES, CONTAINER_COLUMNS_TOTALS;

let MODAL_PROJECTS, MODAL_CREATE_BID;

ALLURE.epic("SALES");
ALLURE.feature("Sales-Contract");
ALLURE.story("SAM- 1.38 | Summation of multiple contracts");

describe("SAM- 1.38 | Summation of multiple contracts", () => {

    before(function () {
        cy.fixture("sam/sam-1.38-summation-of-multiple-contracts.json")
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
                CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
                CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
                GENERATE_LINE_ITEMS_PARAMETERS_1 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                    [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC_1
                }
                LINE_ITEM_PARAMETERS = {
                    [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
                    [app.GridCells.BOQ_ITEM_FK]: BOQ_STRUCTURE_DESC_1,
                    [app.GridCells.PRJ_CHANGE_FK]: CHANGES_DESC
                };
                CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
                CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
                RESOURCE_PARAMETERS = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.COST_CODE[0],
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY[0]
                };
                RESOURCE_PARAMETERS_2 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.COST_CODE[1],
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY[1]
                };
                CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
                BOQ_PARAMETERS_1 = {
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC_1
                }
                CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
                BOQ_STRUCTURE_PARAMETERS_1 = {
                    [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC_1,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                    [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
                }
                CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
                CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID
                MODAL_CREATE_BID = this.data.MODAL.CREATE_BID
                CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
                CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
                CONTAINER_COLUMNS_CHANGES = this.data.CONTAINER_COLUMNS.CHANGES
            })
            .then(() => {
                cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.openTab(app.TabBar.PROJECT).then(() => {
                    _common.setDefaultView(app.TabBar.PROJECT)
                    _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
                });
                _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
                _common.create_newRecord(cnt.uuid.PROJECTS);
                _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
                cy.SAVE();
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
        cy.REFRESH_CONTAINER();
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, sidebar.SideBarOptions.PROJECT_CHANGE_STATUS);
        cy.REFRESH_CONTAINER();
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
        _common.minimizeContainer(cnt.uuid.DATA_RECORDS)
    });

    it("TC - Create BoQ header and BoQ structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.setDefaultView(app.TabBar.BOQS)
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.maximizeContainer(cnt.uuid.BOQS)
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS_1);
        cy.SAVE();
        _common.minimizeContainer(cnt.uuid.BOQS)
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
        })
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS_1);
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    });

    it("TC - Create estimate header", function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        cy.SAVE()
    });

    it("TC - Generate boq line item and assign resource to it", function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS_1);
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        cy.SAVE();
        _common.minimizeContainer(cnt.uuid.RESOURCES)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        })
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, "EST_COST_TOTAL")
    });

    it("TC - Create Bid ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
        _bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.MAIN_BID, BID_DESC, MODAL_CREATE_BID.BUSINESS_PARTNER, MODAL_CREATE_BID.STRUCTURE_TYPE)
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS)
            _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BID)
        })
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
        cy.REFRESH_CONTAINER()
        _common.select_rowHasValue(cnt.uuid.BIDS, BID_DESC)
        _common.assert_forNumericValues(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, Cypress.env("EST_COST_TOTAL").toString())
        _common.saveCellDataToEnv(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, "BID_NET_AMOUNT")
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED)
    })

    it("TC - Create contract from bid ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _saleContractPage.create_contract_fromWizard(CONTRACT_DESC);
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACT)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.search_inSubContainer(cnt.uuid.CONTRACTS, CONTRACT_DESC)
        _common.select_rowHasValue(cnt.uuid.CONTRACTS, CONTRACT_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.CONTRACTS, app.GridCells.CUSTOMER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, MODAL_CREATE_BID.BUSINESS_PARTNER)
        cy.SAVE()
        _common.assert_forNumericValues(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET, Cypress.env("BID_NET_AMOUNT"))
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.CONTRACTED);
        cy.SAVE()
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
        _common.getText_fromCell(cnt.uuid.CHANGES, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Change_CODE", $ele1.text())
            cy.log(Cypress.env("Change_CODE"))
        })
        _common.openTab(app.TabBar.CHANGES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CHANGES, app.FooterTab.CHANGES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.CHANGES)
        _common.create_newRecord(cnt.uuid.CHANGES)
        _common.enterRecord_inNewRow(cnt.uuid.CHANGES, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CHANGES_DESC2)
        _common.select_activeRowInContainer(cnt.uuid.CHANGES)
        cy.SAVE()
        cy.reload()
        cy.wait(2000)// This is required as entire page is reloaded
        _common.openTab(app.TabBar.CHANGES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CHANGES, app.FooterTab.CHANGES, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        _common.clear_subContainerFilter(cnt.uuid.CHANGES)
        _common.search_inSubContainer(cnt.uuid.CHANGES, CHANGES_DESC)
        _common.select_rowHasValue(cnt.uuid.CHANGES, CHANGES_DESC)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.clear_subContainerFilter(cnt.uuid.CHANGES)
        _common.search_inSubContainer(cnt.uuid.CHANGES, CHANGES_DESC2)
        _common.select_rowHasValue(cnt.uuid.CHANGES, CHANGES_DESC2)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    })

    it("TC - Go to estimate", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
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
    });

    it("TC - Create line item,add boq and assign resource to it", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.prjchangefk, CONTAINER_COLUMNS_LINE_ITEM.boqitemfk, CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo, CONTAINER_COLUMNS_LINE_ITEM.code], cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
        cy.SAVE()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_2);
        cy.SAVE();
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, "EST_COST_TOTAL_1")
    });

    it("TC - Create Bid and verify change Bid Net Amount == Cost Total of newly generated line item from change Boq", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
        _bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.CHANGE_BID, BID_DESC_1, MODAL_CREATE_BID.BUSINESS_PARTNER, MODAL_CREATE_BID.STRUCTURE_TYPE, BID_DESC, "NA", Cypress.env("Change_CODE"))
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS)
        })
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
        cy.REFRESH_CONTAINER()
        _common.select_rowHasValue(cnt.uuid.BIDS, BID_DESC_1)
        cy.SAVE()
        _common.select_rowHasValue(cnt.uuid.BIDS, BID_DESC_1)
        _common.assert_forNumericValues(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, Cypress.env("EST_COST_TOTAL_1").toString())
        _common.saveCellDataToEnv(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, "BID_NET_AMOUNT_1")
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED)
    })

    it("TC - Create change order contract from bid and verify change order gets created with existing BoQ and selected project change", function () {
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
        cy.SAVE()
        _common.assert_forNumericValues(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET, Cypress.env("BID_NET_AMOUNT_1"))
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        cy.REFRESH_CONTAINER()
    })

    it("TC - Verify main contract & change order contract in totals ", function () {
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TOTALS_CONTRACTS, app.FooterTab.TOTALS, 1);
            _common.setup_gridLayout(cnt.uuid.TOTALS_CONTRACTS, CONTAINER_COLUMNS_TOTALS)
        });
        _common.clear_subContainerFilter(cnt.uuid.TOTALS_CONTRACTS)
        _common.select_rowInContainer(cnt.uuid.TOTALS_CONTRACTS)
        _validate.assertAndVerify_SumOfMultipleCellValues(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET, cnt.uuid.TOTALS_CONTRACTS, app.GridCells.AMOUNT_NET)
    })

});



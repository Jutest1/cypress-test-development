import { app, commonLocators, tile, sidebar, cnt, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _boqPage, _estimatePage, _package, _rfqPage, _projectPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { PACKAGE_TOTAL_TRANSLATION } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "P-" + Cypress._.random(0, 999);
const PRJ_DESC = "P2.177-" + Cypress._.random(0, 999);

const EST_CODE = "E-" + Cypress._.random(0, 999);
const EST_DESCRIPTION = "EST_DESC" + Cypress._.random(0, 999);
const BOQ_HEADER_01 = "BOQ-" + Cypress._.random(0, 999);
const BOQ_ITEM_01 = "BOQ_ITEM_01" + Cypress._.random(0, 999);
const BOQ_HEADER_02 = "BOQ-" + Cypress._.random(0, 999);
const BOQ_ITEM_02R = "BOQ_ITEM_02R-" + Cypress._.random(0, 999);

let CONTAINERS_PROJECT, CONTAINERS_BOQ, CONTAINERS_BOQ_STRUCTURE, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCES, CONTAINERS_REQUISITION, CONTAINERS_RFQ;

let CONTAINER_COLUMNS_BOQ, CONTAINER_COLUMNS_BOQ_STRUCTURE, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCES, CONTAINER_COLUMNS_PACKAGE, CONTAINER_COLUMNS_REQUISITION, CONTAINER_COLUMNS_RFQ;

let PROJECTS_PARAMETERS: DataCells, BOQ_HEADER_PARAMETER_1: DataCells, BOQ_STRUCTURE_PARAMETER_1: DataCells, ESTIMATE_PARAMETERS: DataCells, RESOURCE_PARAMETER: DataCells;

let GENERATE_LINE_ITEMS_PARAMETERS: DataCells, MODAL_CREATE_UPDATE_BOQ_PACKAGE, MODAL_CREATE_RFQ, RFQ_PARAMETER: DataCells;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Requisition");
ALLURE.story("PCM- 2.177 | Bundling requisition for one RFQ");

describe("PCM- 2.177 | Bundling requisition for one RFQ", () => {

    before(function () {

        cy.fixture("pcm/pcm-2.177-bundling-requisition-for-one-rfq.json").then((data) => {
            this.data = data
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_DESC,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK
            }
            CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ;
            CONTAINERS_BOQ = this.data.CONTAINERS.BOQ
            BOQ_HEADER_PARAMETER_1 = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_HEADER_01
            }
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            BOQ_STRUCTURE_PARAMETER_1 = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_ITEM_01,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0],
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0]
            };
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            };
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS;
            GENERATE_LINE_ITEMS_PARAMETERS = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_HEADER_01
            }
            CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCES;
            CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCES;
            RESOURCE_PARAMETER = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
                [app.GridCells.CODE]: CONTAINERS_RESOURCES.MATERIAL[0]
            };
            MODAL_CREATE_UPDATE_BOQ_PACKAGE = this.data.MODAL.CREATE_UPDATE_BOQ_PACKAGE
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION;
            CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
            MODAL_CREATE_RFQ = this.data.MODAL.CREATE_RFQ
            RFQ_PARAMETER = {
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: [MODAL_CREATE_RFQ.BUSINESS_PARTNER],
            }
            CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ;
            CONTAINERS_RFQ = this.data.CONTAINERS.RFQ;
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
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
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESC).pinnedItem();
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Create new BoQ header and BoQ structure', function () {
        _common.openTab(app.TabBar.BOQS).then(function () {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        })
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS)
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_HEADER_PARAMETER_1);
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO)

        _common.openTab(app.TabBar.BOQSTRUCTURE).then(function () {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        })
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER_1);
        cy.SAVE();
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item1_Qty", $ele1.text())
        })
    });

    it('TC - Create new estimate header', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT)
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESC).pinnedItem();
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
    });

    it('TC - Genrate line item and assign resource to it', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.set_containerLayoutUnderEditView(commonLocators.CommonLabels.LAYOUT_6)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create boq package from wizards option", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE)
        _package.enterRecord_toCreateBoQPackage_FromWizard(CommonLocators.CommonKeys.BOQ, CommonLocators.CommonLabels.ENTIRE_ESTIMATE, CommonLocators.CommonKeys.PROJECT_BOQ, MODAL_CREATE_UPDATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE[0]);
        cy.SAVE()
        _common.openTab(app.TabBar.PACKAGE).then(function () {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 3);
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESC)
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.IN_PROGRESS)
        cy.SAVE()
    })

    it('TC - Create requisistion by wizard', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_DESC)
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.select_rowInContainer(cnt.uuid.REQUISITIONS)
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE, "FirstRequisitionCode")
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED)
        cy.SAVE()
        _common.openTab(app.TabBar.MAIN).then(function () {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 1);
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_TOTALS, app.GridCells.TRANSLATED, CommonLocators.CommonKeys.TOTAL, PACKAGE_TOTAL_TRANSLATION)
        _common.getText_fromCell(cnt.uuid.REQUISITION_TOTALS, app.GridCells.VALUE_NET).then(($ele: JQuery<HTMLElement>) => {
            const text = $ele.text();
            var text1 = text.replace(",", "")
            var FirstRequisitionTotal = parseFloat(text1).toFixed(2)
            Cypress.env("FirstRequisitionTotal", FirstRequisitionTotal)
            cy.log(Cypress.env("FirstRequisitionTotal"))
        })
    });

    it('TC - Create request for quote by wizard', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
        _rfqPage.create_requestForQuote_fromWizard(RFQ_PARAMETER);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)

        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 2)
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_DESC)
        _common.select_rowInContainer(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINERS_REQUISITION.NAVIGATE_REQUISITION)
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create requisition manually', function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_DESC)
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.create_newRecord(cnt.uuid.REQUISITIONS)
        _package.enterData_ToCreateRequisition(CommonLocators.CommonLabels.SERVICE_REQ)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
        _common.openTab(app.TabBar.MAIN).then(function () {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONPROCUREMENTBOQS, app.FooterTab.PROCUREMENT_BOQ, 1);
        })
        _common.create_newRecord(cnt.uuid.REQUISITIONPROCUREMENTBOQS)
        _package.create_ProcuremenBoQswithNewReocrd(PRJ_DESC, CONTAINERS_REQUISITION.PROCUREMENT_STRUCTURE[0])
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.openTab(app.TabBar.MAIN).then(function () {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.REQUISITIONBOQSTRUCTURE)
        })
        _common.maximizeContainer(cnt.uuid.REQUISITIONBOQSTRUCTURE)
        _rfqPage.enterRecordToCreate_BoQStructureInRequisition(BOQ_ITEM_02R, CONTAINERS_BOQ_STRUCTURE.QUANTITY[0], CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0], CONTAINERS_BOQ_STRUCTURE.UOM[0]);
        cy.SAVE();
        _common.minimizeContainer(cnt.uuid.REQUISITIONBOQSTRUCTURE)
        _common.openTab(app.TabBar.MAIN).then(function () {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 3);
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_TOTALS, app.GridCells.TRANSLATED, "Total", PACKAGE_TOTAL_TRANSLATION)
        _common.getText_fromCell(cnt.uuid.REQUISITION_TOTALS, app.GridCells.VALUE_NET).then(($ele: JQuery<HTMLElement>) => {
            const text = $ele.text();
            var text1 = text.replace(",", "")
            var SecondRequisitionTotal = parseFloat(text1).toFixed(2)
            Cypress.env("SecondRequisitionTotal", SecondRequisitionTotal)
            cy.log(Cypress.env("SecondRequisitionTotal"))
        })
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE, "SecondRequisitionCode")
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
        });
        cy.wait(500).then(() => {
            _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env("SecondRequisitionCode"))
        })
        cy.wait(500).then(() => {
            _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env("FirstRequisitionCode"))
        })
    });

    it('TC - Verify requisition Total', function () {
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.REQUISITIONS, CONTAINERS_REQUISITION.NAVIGATE_RFQ)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.RFQ).then(function () {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0);
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_DESC)
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)

        _common.openTab(app.TabBar.RFQ).then(function () {
            _common.select_tabFromFooter(cnt.uuid.RFQ_REQUISISTION, app.FooterTab.REQUISITIONS, 1);
        })
        _common.create_newRecord(cnt.uuid.RFQ_REQUISISTION)
        _common.edit_dropdownCellWithInput(cnt.uuid.RFQ_REQUISISTION, app.GridCells.REQ_HEADER_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("SecondRequisitionCode"))
        cy.SAVE()
        _common.clickOn_modalFooterButton(btn.ButtonText.PROCEED)
        _common.openTab(app.TabBar.RFQ).then(function () {
            _common.select_tabFromFooter(cnt.uuid.RFQ_TOTALS, app.FooterTab.TOTALS, 3);
        })
        cy.wait(500).then(() => {
            cy.log(Cypress.env("FirstRequisitionTotal"))
            cy.log(Cypress.env("SecondRequisitionTotal"))
            var additionOfTwoRequisition = parseFloat(Cypress.env("FirstRequisitionTotal")) + parseFloat(Cypress.env("SecondRequisitionTotal"))
            cy.log("additionOfTwoRequisition" + additionOfTwoRequisition)
            _common.clickOn_cellHasUniqueValue(cnt.uuid.RFQ_TOTALS, app.GridCells.TRANSLATED, "Total", PACKAGE_TOTAL_TRANSLATION)
            _common.assert_forNumericValues(cnt.uuid.RFQ_TOTALS, app.GridCells.VALUE_NET, additionOfTwoRequisition.toString())
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.PUBLISHED)
        cy.SAVE()
    });

    it('TC - Create Quote from Wizard', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE)
        _rfqPage.create_quote_fromWizard([CONTAINERS_RFQ.BUSINESS_PARTNER], [CommonLocators.CommonKeys.CHECK])
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QUOTES).then(function () {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS_FOR_QUOTE, app.FooterTab.REQUISITIONS, 1);
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_DESC)
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS_FOR_QUOTE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS_FOR_QUOTE, app.GridCells.REQ_HEADER_FK_CODE, Cypress.env("FirstRequisitionCode"))

        _common.openTab(app.TabBar.QUOTES).then(function () {
            _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
        })
        _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 3);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, "Position")
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_ITEM_01)
        _common.openTab(app.TabBar.QUOTES).then(function () {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS_FOR_QUOTE, app.FooterTab.REQUISITIONS, 1);
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS_FOR_QUOTE, app.GridCells.REQ_HEADER_FK_CODE, Cypress.env("SecondRequisitionCode"))
        _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 3);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, CommonLocators.CommonKeys.POSITION)
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_ITEM_02R)
    });

});
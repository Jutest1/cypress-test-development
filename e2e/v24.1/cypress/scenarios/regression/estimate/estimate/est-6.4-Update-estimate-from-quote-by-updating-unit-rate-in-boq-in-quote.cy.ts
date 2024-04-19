import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _boqPage, _estimatePage, _package, _rfqPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BoQS_DESC1 = "LI1-DESC-" + Cypress._.random(0, 999);
const BoQS_DESC2 = "LI2-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"

let PROJECT_PARAMETER: DataCells;
let CONTAINER_COLUMNS_BOQ;
let BOQ_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINERS_BOQ_STRUCTURE;
let BOQ_STRUCTURE1_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_LINE_ITEM;
let GENERATE_LINE_ITEMS_PARAMETERS: DataCells;
let RESOURCE1_PARAMETERS: DataCells;
let RESOURCE2_PARAMETERS: DataCells;
let CREATE_UPDATE_BOQ_PACKAGE_WIZARD;
let CONTAINER_COLUMNS_REQUISITION;
let CREATE_REQUEST_FOR_QUOTE_WIZARD;
let CREATE_REQUEST_FOR_QUOTE_WIZARD_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_RFQ;
let CREATE_QUOTE_FROM_WIZARD;
let CONTAINER_COLUMNS_QUOTE;
let CONTAINER_COLUMNS_QUOTE_PROCUREMENT_BOQS;
let CONTAINER_COLUMNS_QUOTES_BOQ_STRUCTURE;
let CONTAINERS_QUOTE_BOQ_STRUCTURE;
let MODAL_UPDATE_ESTIMATE_WIZARD;
let UPDATE_ESTIMATE_WIZARD_PARAMETERS:DataCells;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 6.4 |  Update the estimate from the Quote module by updating the unit rate in BOQ in the BOQ structure tab");

describe("EST- 6.4 | Update the estimate from the Quote module by updating the unit rate in BOQ in the BOQ structure tab", () => {

    before(function () {
        cy.fixture("estimate/est-6.4-Update-estimate-from-quote-by-updating-unit-rate-in-boq-in-quote.json").then((data) => {
            this.data = data;
            PROJECT_PARAMETER = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
            }
            CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
            BOQ_PARAMETERS = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
            }
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            BOQ_STRUCTURE1_PARAMETERS = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BoQS_DESC1,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
            }
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            GENERATE_LINE_ITEMS_PARAMETERS = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
            }
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            RESOURCE1_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE_1,
            }
            RESOURCE2_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE_2,
            }
            CREATE_UPDATE_BOQ_PACKAGE_WIZARD = this.data.MODAL.CREATE_UPDATE_BOQ_PACKAGE
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
            CREATE_REQUEST_FOR_QUOTE_WIZARD = this.data.MODAL.CREATE_REQUEST_FOR_QUOTE
            CREATE_REQUEST_FOR_QUOTE_WIZARD_PARAMETERS = {
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: [CREATE_REQUEST_FOR_QUOTE_WIZARD.ADOLF_KOCH]
            }
            CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
            CREATE_QUOTE_FROM_WIZARD = this.data.MODAL.CREATE_QUOTE_FROM_WIZARD;
            CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE
            CONTAINER_COLUMNS_QUOTE_PROCUREMENT_BOQS = this.data.CONTAINER_COLUMNS.QUOTE_PROCUREMENT_BOQS
            CONTAINER_COLUMNS_QUOTES_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            CONTAINERS_QUOTE_BOQ_STRUCTURE = this.data.CONTAINERS.QUOTES_BOQ_STRUCTURE;
            MODAL_UPDATE_ESTIMATE_WIZARD = this.data.MODAL.UPDATE_ESTIMATE_WIZARD
            UPDATE_ESTIMATE_WIZARD_PARAMETERS = {
                [commonLocators.CommonKeys.CHECKBOX]: MODAL_UPDATE_ESTIMATE_WIZARD
            }
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        });
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create New Project", function () {
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETER);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
    });

    it("TC - Create BOQ header and BOQ structure", function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        });
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price], cnt.uuid.BOQ_STRUCTURES)
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE1_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _boqPage.get_BoQsFinalPrice()
        _common.create_newRecord(cnt.uuid.BOQ_STRUCTURES)
        _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, BoQS_DESC2)
        _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.QUANTITY)
        _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UNIT_RATE)
        _common.edit_dropdownCellWithInput(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BAS_UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UOM)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    });

    it("TC - Create estimate header", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
    });

    it("TC - Generate BOQ line item and create Resource", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BoQS_DESC1)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.isgeneratedprc, CONTAINER_COLUMNS_RESOURCE.commenttext, CONTAINER_COLUMNS_RESOURCE.costtotal], cnt.uuid.RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE1_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BoQS_DESC2)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE2_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create BoQ Package from the Estimate", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
        _package.enterRecord_toCreateBoQPackage_FromWizard("BoQ", CREATE_UPDATE_BOQ_PACKAGE_WIZARD.ESTIMATE_SCOPE, CREATE_UPDATE_BOQ_PACKAGE_WIZARD.GROUPING_STRUCTURE, CREATE_UPDATE_BOQ_PACKAGE_WIZARD.PROCUREMENT_STRUCTURE,"","","",PRJ_NO)
        _common.waitForLoaderToDisappear()
    })

    it('TC - Create requisition from Package', function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.select_rowInContainer(cnt.uuid.PACKAGE)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.IN_MINUS_PROGRESS);


        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 2)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED);
    });

    it('TC - Create Request For Quote from wizard and change status', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
        _rfqPage.create_requestForQuote_fromWizard(CREATE_REQUEST_FOR_QUOTE_WIZARD_PARAMETERS);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        cy.SAVE();
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 2)
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.PUBLISHED);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create Quote and update unit rate in BoQ structure', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _rfqPage.create_quote_fromWizard([CREATE_QUOTE_FROM_WIZARD.ADOLF_KOCH],[commonLocators.CommonKeys.CHECK]);
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
            _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE)
        })
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.QUOTEBOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTEPROCUREMENTBOQS, app.FooterTab.PROCUREMENT_BOQ, 1)
            _common.setup_gridLayout(cnt.uuid.QUOTEPROCUREMENTBOQS, CONTAINER_COLUMNS_QUOTE_PROCUREMENT_BOQS)
        })
        _common.clear_subContainerFilter(cnt.uuid.QUOTEPROCUREMENTBOQS)
        _common.select_rowHasValue(cnt.uuid.QUOTEPROCUREMENTBOQS, BOQ_DESC)
        
        _common.openTab(app.TabBar.QUOTEBOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
            _common.setup_gridLayout(cnt.uuid.QUOTEBOQSTRUCTURE, CONTAINER_COLUMNS_QUOTES_BOQ_STRUCTURE)
        })
        _common.clear_subContainerFilter(cnt.uuid.QUOTEBOQSTRUCTURE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BoQS_DESC1)
        _common.edit_containerCell(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_BOQ_STRUCTURE.UPDATED_UNIT_RATE1)
        _common.set_cellCheckboxValue(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.IS_FREE_QUANTITY, commonLocators.CommonKeys.CHECK)
        _common.edit_containerCell(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_BOQ_STRUCTURE.UPDATED_QUANTITY1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.getText_fromCell(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.PRICE_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item1_UR", $ele1.text())
            cy.log(Cypress.env("Item1_UR"))
        })
        _common.getText_fromCell(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item1_Qty", $ele1.text())
            cy.log(Cypress.env("Item1_Qty"))
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BoQS_DESC2)
        _common.edit_containerCell(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_BOQ_STRUCTURE.UPDATED_UNIT_RATE2)
        _common.set_cellCheckboxValue(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.IS_FREE_QUANTITY, commonLocators.CommonKeys.CHECK)
        _common.edit_containerCell(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_BOQ_STRUCTURE.UPDATED_QUANTITY2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Update Estimate", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE);
        _estimatePage.openModalContainerByDownArrow();
        _estimatePage.update_estimate_fromWizard(UPDATE_ESTIMATE_WIZARD_PARAMETERS);
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QUOTEBOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
        })

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.select_rowHasValue(cnt.uuid.ESTIMATE,EST_DESC)
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
    })

    it("TC - Verify resource generated prc is checked, cost total, comment gets updated as per boq", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BoQS_DESC1)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.isgeneratedprc, CONTAINER_COLUMNS_RESOURCE.commenttext, CONTAINER_COLUMNS_RESOURCE.costtotal], cnt.uuid.RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.search_inSubContainer(cnt.uuid.RESOURCES,commonLocators.CommonKeys.NACHUNTERNEHMER)
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        cy.wait(500).then(() => {
            _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.RESOURCES, CONTAINERS_QUOTE_BOQ_STRUCTURE.UPDATED_UNIT_RATE1, CONTAINERS_QUOTE_BOQ_STRUCTURE.UPDATED_QUANTITY1, app.GridCells.COST_TOTAL)
            _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_GENERATED_PRC, CommonLocators.CommonKeys.CHECK)
        })
    })

    it("TC - Verify line item AQ quantity is updated with boq quantity", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, BoQS_DESC1)
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET,CONTAINERS_QUOTE_BOQ_STRUCTURE.UPDATED_QUANTITY1)
        })
    })

})
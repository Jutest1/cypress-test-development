import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _boqPage, _validate, _estimatePage, _projectPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_HEADER } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "P-" + Cypress._.random(0, 999);
const PRJ_DESCRIPTION = "PRJ-" + PRJ_NO + "_" + Cypress._.random(0, 999);
const BOQ_DESCRIPTION_1 = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_ITEM_DESCRIPTION_1 = "BOQ-IT1-" + Cypress._.random(0, 999);
const BOQ_DESCRIPTION_2 = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_ITEM_DESCRIPTION_2 = "BOQ-IT2-" + Cypress._.random(0, 999);
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);

let CONTAINERS_PROJECT;
let PROJECT_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_BOQ;
let BOQ_PARAMETERS1: DataCells;
let BOQ_PARAMETERS2: DataCells;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINERS_BOQ_STRUCTURE;
let BOQ_STRUCTURE_PARAMETER1: DataCells;
let BOQ_STRUCTURE_PARAMETER2: DataCells;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINERS_ESTIMATE;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINERS_LINE_ITEM;
let GENERATE_LINE_ITEMS_PARAMETERS1: DataCells;
let GENERATE_LINE_ITEMS_PARAMETERS2: DataCells;
let CONTAINER_COLUMNS_RESOURCES;
let CONTAINERS_RESOURCES;
let RESOURCE_PARAMETER1: DataCells;
let RESOURCE_PARAMETER2: DataCells;
let RESOURCE_PARAMETER3: DataCells;
let RESOURCE_PARAMETER4: DataCells;
let RESOURCE_PARAMETER5: DataCells;
let RESOURCE_PARAMETER6: DataCells;
let RESOURCE_PARAMETER7: DataCells;
let CONTAINER_COLUMNS_STANDARD_ALLOWANCE;
let CONTAINERS_STANDARD_ALLOWANCE;
let CONTAINER_COLUMNS_ALLOWANCE_MARKUP;
let CONTAINERS_ALLOWANCE_MARKUP;
let ALLOWANCE_MARKUP_PARAMETERS1: DataCells;
let ALLOWANCE_MARKUP_PARAMETERS2: DataCells;
let ALLOWANCE_MARKUP_PARAMETERS3: DataCells;
let ALLOWANCE_MARKUP_PARAMETERS4: DataCells;
let ESTIMATE_CONFIG_DIALOG_MODAL;
let ESTIMATE_CONFIG_PARAMETER1: DataCells;
let ESTIMATE_CONFIG_PARAMETER2: DataCells;
let ESTIMATE_CONFIG_PARAMETER3: DataCells;
let ESTIMATE_CONFIG_PARAMETER4: DataCells;
let ESTIMATE_CONFIG_PARAMETER5: DataCells;
let ESTIMATE_CONFIG_PARAMETER6: DataCells;
let CONTAINER_COLUMNS_TOTALS;
let CONTAINERS_TOTALS;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 1.111 | Set Simple Allowance as a: Change to 1-step, WQ, level out=1; Setting M(GC)[%] on multi costcode; GA RP AM percentage is different");

describe("EST- 1.111 | Set Simple Allowance as a: Change to 1-step, WQ, level out=1; Setting M(GC)[%] on multi costcode; GA RP AM percentage is different", () => {

    before(function () {

        cy.fixture("estimate/est-1.111-Set-Simple-Allowance-1-step-WQ-level-out-1-Setting-MGC-on-multi-cost-code-GA-RP-AM-percentage-is-different.json")
            .then((data) => {
                this.data = data;
                CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
                PROJECT_PARAMETERS = {
                    [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                    [commonLocators.CommonLabels.NAME]: PRJ_DESCRIPTION,
                    [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK
                };
                CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ;
                BOQ_PARAMETERS1 = {
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESCRIPTION_1,
                }
                CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
                CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
                BOQ_STRUCTURE_PARAMETER1 = {
                    [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_ITEM_DESCRIPTION_1,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY_1,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM,
                };
                BOQ_PARAMETERS2 = {
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESCRIPTION_2,
                }
                BOQ_STRUCTURE_PARAMETER2 = {
                    [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_ITEM_DESCRIPTION_2,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY_1,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM,
                    [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE_1,
                };
                CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
                CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                ESTIMATE_PARAMETERS = {
                    [app.GridCells.CODE]: EST_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: EST_DESCRIPTION,
                    [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                    [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
                };
                CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
                CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
                GENERATE_LINE_ITEMS_PARAMETERS1 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                    [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESCRIPTION_1
                }
                GENERATE_LINE_ITEMS_PARAMETERS2 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                    [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESCRIPTION_2
                }
                CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCE;
                CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCE;
                RESOURCE_PARAMETER1 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCES.CODE[0]
                };
                RESOURCE_PARAMETER2 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[1],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCES.MATERIAL[0],
                };
                RESOURCE_PARAMETER3 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[2],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCES.ASSEMBLY[0],
                };
                RESOURCE_PARAMETER4 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCES.CODE[1]
                };
                RESOURCE_PARAMETER5 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCES.CODE[2],
                };
                RESOURCE_PARAMETER6 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCES.CODE[3]
                };
                RESOURCE_PARAMETER7 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[1],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCES.MATERIAL[0],
                };
                CONTAINER_COLUMNS_STANDARD_ALLOWANCE = this.data.CONTAINER_COLUMNS.STANDARD_ALLOWANCE
                CONTAINERS_STANDARD_ALLOWANCE = this.data.CONTAINERS.STANDARD_ALLOWANCE;
                CONTAINER_COLUMNS_ALLOWANCE_MARKUP = this.data.CONTAINER_COLUMNS.ALLOWANCE_MARKUP
                CONTAINERS_ALLOWANCE_MARKUP = this.data.CONTAINERS.ALLOWANCE_MARKUP;
                ALLOWANCE_MARKUP_PARAMETERS1 = {
                    [app.GridCells.MDC_COST_CODE_DESCRIPTION]: CONTAINERS_ALLOWANCE_MARKUP.COST_CODE[0],
                    [app.GridCells.GA_PERC]: CONTAINERS_ALLOWANCE_MARKUP.GA[0],
                    [app.GridCells.RP_PERC]: CONTAINERS_ALLOWANCE_MARKUP.RP[0],
                    [app.GridCells.AM_PERC]: CONTAINERS_ALLOWANCE_MARKUP.AM[0],
                    [app.GridCells.DEF_MGC_PERC]: CONTAINERS_ALLOWANCE_MARKUP.DEF_M_GC[0]
                }
                ALLOWANCE_MARKUP_PARAMETERS2 = {
                    [app.GridCells.MDC_COST_CODE_DESCRIPTION]: CONTAINERS_ALLOWANCE_MARKUP.COST_CODE[1],
                    [app.GridCells.GA_PERC]: CONTAINERS_ALLOWANCE_MARKUP.GA[0],
                    [app.GridCells.RP_PERC]: CONTAINERS_ALLOWANCE_MARKUP.RP[0],
                    [app.GridCells.AM_PERC]: CONTAINERS_ALLOWANCE_MARKUP.AM[0],
                    [app.GridCells.DEF_MGC_PERC]: CONTAINERS_ALLOWANCE_MARKUP.DEF_M_GC[1]
                }
                ALLOWANCE_MARKUP_PARAMETERS3 = {
                    [app.GridCells.MDC_COST_CODE_DESCRIPTION]: CONTAINERS_ALLOWANCE_MARKUP.COST_CODE[2],
                    [app.GridCells.GA_PERC]: CONTAINERS_ALLOWANCE_MARKUP.GA[1],
                    [app.GridCells.RP_PERC]: CONTAINERS_ALLOWANCE_MARKUP.RP[1],
                    [app.GridCells.AM_PERC]: CONTAINERS_ALLOWANCE_MARKUP.AM[0],
                }
                ALLOWANCE_MARKUP_PARAMETERS4 = {
                    [app.GridCells.MDC_COST_CODE_DESCRIPTION]: CONTAINERS_ALLOWANCE_MARKUP.COST_CODE[3],
                    [app.GridCells.GA_PERC]: CONTAINERS_ALLOWANCE_MARKUP.GA[2],
                    [app.GridCells.RP_PERC]: CONTAINERS_ALLOWANCE_MARKUP.RP[0],
                    [app.GridCells.AM_PERC]: CONTAINERS_ALLOWANCE_MARKUP.AM[0],
                }
                ESTIMATE_CONFIG_DIALOG_MODAL = this.data.MODAL.ESTIMATE_CONFIG_DIALOG_PARAMETER
                ESTIMATE_CONFIG_PARAMETER1 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [ESTIMATE_CONFIG_DIALOG_MODAL.CONFIGURATION[0], ESTIMATE_CONFIG_DIALOG_MODAL.CONFIGURATION[1]],
                    [commonLocators.CommonLabels.EDIT_ESTIMATE_TYPE]: commonLocators.CommonKeys.CHECK,
                    [commonLocators.CommonLabels.TOTAL_CONFIGURE_EDIT_TYPE]: commonLocators.CommonKeys.CHECK,
                    [commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS]: commonLocators.CommonKeys.CREATE,
                    [app.GridCells.LINETYPE]: ESTIMATE_CONFIG_DIALOG_MODAL.LINE_TYPE[0],
                    [app.GridCells.DESCRIPTION]: ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[0],
                }
                ESTIMATE_CONFIG_PARAMETER2 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [ESTIMATE_CONFIG_DIALOG_MODAL.CONFIGURATION[1]],
                    [commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS]: commonLocators.CommonKeys.CREATE,
                    [app.GridCells.LINETYPE]: ESTIMATE_CONFIG_DIALOG_MODAL.LINE_TYPE[1],
                    [app.GridCells.DESCRIPTION]: ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[1],
                }
                ESTIMATE_CONFIG_PARAMETER3 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [ESTIMATE_CONFIG_DIALOG_MODAL.CONFIGURATION[1]],
                    [commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS]: commonLocators.CommonKeys.CREATE,
                    [app.GridCells.LINETYPE]: ESTIMATE_CONFIG_DIALOG_MODAL.LINE_TYPE[2],
                    [app.GridCells.DESCRIPTION]: ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[2],
                }
                ESTIMATE_CONFIG_PARAMETER4 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [ESTIMATE_CONFIG_DIALOG_MODAL.CONFIGURATION[1]],
                    [commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS]: commonLocators.CommonKeys.CREATE,
                    [app.GridCells.LINETYPE]: ESTIMATE_CONFIG_DIALOG_MODAL.LINE_TYPE[3],
                    [app.GridCells.DESCRIPTION]: ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[3],
                }
                ESTIMATE_CONFIG_PARAMETER5 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [ESTIMATE_CONFIG_DIALOG_MODAL.CONFIGURATION[1]],
                    [commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS]: commonLocators.CommonKeys.CREATE,
                    [app.GridCells.LINETYPE]: ESTIMATE_CONFIG_DIALOG_MODAL.LINE_TYPE[4],
                    [app.GridCells.DESCRIPTION]: ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[4],
                }
                ESTIMATE_CONFIG_PARAMETER6 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [ESTIMATE_CONFIG_DIALOG_MODAL.CONFIGURATION[1]],
                    [commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS]: commonLocators.CommonKeys.CREATE,
                    [app.GridCells.LINETYPE]: ESTIMATE_CONFIG_DIALOG_MODAL.LINE_TYPE[5],
                    [app.GridCells.DESCRIPTION]: ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[5],
                }
                CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
                CONTAINERS_TOTALS = this.data.CONTAINERS.TOTALS;
            }).then(() => {
                cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.openTab(app.TabBar.PROJECT).then(() => {
                    _common.setDefaultView(app.TabBar.PROJECT)
                    _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
                });
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
                _common.waitForLoaderToDisappear()
                _common.create_newRecord(cnt.uuid.PROJECTS);
                _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
                cy.SAVE()
                _common.waitForLoaderToDisappear()
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
                _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION).pinnedItem();
            });
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Create 1st BOQ header and BOQ structure', function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS1);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.BOQS, app.GridCells.IS_GC_BoQ, CommonLocators.CommonKeys.CHECK, 1, BOQ_HEADER)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER1)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create Second BOQ header and BOQ structure', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT)
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS2);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.BOQS, app.GridCells.IS_GC_BoQ, CommonLocators.CommonKeys.UNCHECK, 1, BOQ_HEADER)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER2)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create estimate header', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT)
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
    });

    it("TC - Generate New Line Items From BoQ header", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.set_containerLayoutUnderEditView(commonLocators.CommonLabels.LAYOUT_6)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.am, CONTAINER_COLUMNS_LINE_ITEM.gc,
            CONTAINER_COLUMNS_LINE_ITEM.fm, CONTAINER_COLUMNS_LINE_ITEM.rp, CONTAINER_COLUMNS_LINE_ITEM.ga,
            CONTAINER_COLUMNS_LINE_ITEM.urd, CONTAINER_COLUMNS_LINE_ITEM.grandcostunittarget,
            CONTAINER_COLUMNS_LINE_ITEM.isfixedprice, CONTAINER_COLUMNS_LINE_ITEM.advancedall,
            CONTAINER_COLUMNS_LINE_ITEM.advancedallunititem, CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo], cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS1);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS2);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Assign material and costcode resources to the first line item', function () {
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_ITEM_DESCRIPTION_1)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCES.estresourcetypeshortkey, CONTAINER_COLUMNS_RESOURCES.code, CONTAINER_COLUMNS_RESOURCES.rp, CONTAINER_COLUMNS_RESOURCES.gc, CONTAINER_COLUMNS_RESOURCES.ga, CONTAINER_COLUMNS_RESOURCES.descriptioninfo], cnt.uuid.RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER3)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Assign material and costcode resources to the second line item', function () {
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_ITEM_DESCRIPTION_2)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
        });
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER4)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER5)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER6)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER7)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Verify create standard allowance', function () {
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_ITEM_DESCRIPTION_1)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.STANDARD_ALLOWANCES, app.FooterTab.STANDARS_ALLOWANCES, 2);
            _common.setup_gridLayout(cnt.uuid.STANDARD_ALLOWANCES, CONTAINER_COLUMNS_STANDARD_ALLOWANCE);
        });
        _common.create_newRecord(cnt.uuid.STANDARD_ALLOWANCES);
        _estimatePage.enterRecord_toStanderdAllowance(CONTAINERS_STANDARD_ALLOWANCE.CODE, CONTAINERS_STANDARD_ALLOWANCE.QUANTITY_TYPE);
        _common.edit_dropdownCellWithCaret(cnt.uuid.STANDARD_ALLOWANCES, app.GridCells.MDC_ALLOWANCE_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_STANDARD_ALLOWANCE.ALLOWANCE_TYPE)
        _common.set_cellCheckboxValue(cnt.uuid.STANDARD_ALLOWANCES, app.GridCells.IS_BALANCE_FP, commonLocators.CommonKeys.CHECK)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it('TC - Verify Add Allowance Markup', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ALLOWANCEMARKUP, app.FooterTab.ALLOWANCE_MARKUP, 2);
            _common.setup_gridLayout(cnt.uuid.ALLOWANCEMARKUP, CONTAINER_COLUMNS_ALLOWANCE_MARKUP);
        });
        _common.clickOn_toolbarButton(cnt.uuid.ALLOWANCEMARKUP, btn.ToolBar.ICO_REC_NEW_DEEP_COPY)
        _common.maximizeContainer(cnt.uuid.ALLOWANCEMARKUP)
        _estimatePage.enterRecord_toCreateAllowanceMarkup(ALLOWANCE_MARKUP_PARAMETERS1);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateAllowanceMarkup(ALLOWANCE_MARKUP_PARAMETERS2);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateAllowanceMarkup(ALLOWANCE_MARKUP_PARAMETERS3);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateAllowanceMarkup(ALLOWANCE_MARKUP_PARAMETERS4);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ALLOWANCEMARKUP)
        _common.waitForLoaderToDisappear()
    });

    it('TC - Add Allowance/Unit and Grand Cost/unit', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 3);
        });
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_ITEM_DESCRIPTION_2)
        _common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.ADVANCED_ALL_UNIT_ITEM, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LINE_ITEM.ADV_ALLOWANCE_PER_UNIT_ITEM);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_ITEM_DESCRIPTION_2)
        _common.set_cellCheckboxValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.IS_FIXED_PRICE, commonLocators.CommonKeys.CHECK)
        cy.SAVE();
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_ITEM_DESCRIPTION_2)
        _common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.GRAND_COST_UNIT_TARGET, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LINE_ITEM.GRAND_COST_PER_UNIT_ITEM);
        cy.SAVE();
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });

    it('TC - Add Estimate Configuration', function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE_LINEITEMS, btn.IconButtons.ICO_SETTING_DOC)
        _estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIG_PARAMETER1)
        _estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIG_PARAMETER2)
        _estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIG_PARAMETER3)
        _estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIG_PARAMETER4)
        _estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIG_PARAMETER5)
        _estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIG_PARAMETER6)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Verify Totals in Totals container', function () {
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_ITEM_DESCRIPTION_2)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATETOTALS, app.FooterTab.TOTALS, 3);
            _common.setup_gridLayout(cnt.uuid.ESTIMATETOTALS, CONTAINER_COLUMNS_TOTALS);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATETOTALS)
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATETOTALS, btn.ToolBar.ICO_TOTAL_GRAND)
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATETOTALS, btn.ToolBar.ICO_RECALCULATE)
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.ESTIMATETOTALS)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION, ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[0])
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATETOTALS)
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.ESTIMATETOTALS, app.GridCells.TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("GC", $ele1.text())
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION, ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[1])
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATETOTALS)
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.ESTIMATETOTALS, app.GridCells.TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("FM", $ele1.text())
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION, ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[2])
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATETOTALS)
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.ESTIMATETOTALS, app.GridCells.TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("R&P", $ele1.text())
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION, ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[3])
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATETOTALS)
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.ESTIMATETOTALS, app.GridCells.TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("G&A", $ele1.text())
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION, ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[4])
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATETOTALS)
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.ESTIMATETOTALS, app.GridCells.TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("MM", $ele1.text())
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION, ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[5])
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATETOTALS)
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.ESTIMATETOTALS, app.GridCells.TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("AA", $ele1.text())
        })
        _common.minimizeContainer(cnt.uuid.ESTIMATETOTALS)
    });

    it('TC - Verify Totals In LI container', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 3);
            _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_ITEM_DESCRIPTION_2)
        cy.wait(2000)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.GA, Cypress.env("G&A"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.RP, Cypress.env("R&P"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.FM, Cypress.env("FM"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.GC, Cypress.env("GC"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.URD, Cypress.env("MM"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.ADVANCED_ALL, Cypress.env("AA"))
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });

    it('TC - Verify GA,GC,RP In Resource container', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_ITEM_DESCRIPTION_2)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATETOTALS, app.FooterTab.TOTALS, 3);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION, CONTAINERS_TOTALS.TOTALS_TYPE[0])
        _validate.verify_additionOfMultipleElementInContainer(cnt.uuid.RESOURCES, app.GridCells.GA, cnt.uuid.ESTIMATETOTALS, app.GridCells.TOTAL, commonLocators.CommonKeys.ACTIVE);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION, CONTAINERS_TOTALS.TOTALS_TYPE[1])
        _validate.verify_additionOfMultipleElementInContainer(cnt.uuid.RESOURCES, app.GridCells.GC, cnt.uuid.ESTIMATETOTALS, app.GridCells.TOTAL, commonLocators.CommonKeys.ACTIVE);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION, CONTAINERS_TOTALS.TOTALS_TYPE[2])
        _validate.verify_additionOfMultipleElementInContainer(cnt.uuid.RESOURCES, app.GridCells.RP, cnt.uuid.ESTIMATETOTALS, app.GridCells.TOTAL, commonLocators.CommonKeys.ACTIVE);
    });

});
import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _controllingUnit, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView, _modalView, _validate, _rfqPage, _saleContractPage, _procurementPage, _salesPage, _procurementConfig, _procurementContractPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

import { PACKAGE_TOTAL_TRANSLATION } from "cypress/pages/variables";

const allure = Cypress.Allure.reporter.getInterface();
const LINE_ITEM_DESC = "TEST-DESC-" + Cypress._.random(0, 999);
const PROJECT_NO = "PCM2" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS";
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS: DataCells;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINERS_LINE_ITEM;
let LINE_ITEM_PARAMETERS: DataCells;
let MATERIAL_RESOURCE_PARAMETERS: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINERS_CONFIGURATIONS
let CONTAINER_COLUMNS_CONFIGURATIONS
let CONTAINERS_CONFIGURATION_HEADER
let CONTAINER_COLUMNS_CONFIGURATION_HEADER
let CONTAINER_COLUMNS_PACKAGE
let CONTAINER_COLUMNS_REQUISITION
let CONTAINERS_ITEMS
let CREATE_RFQ_PARAMETERS: DataCells
let MODAL_REQUEST_FOR_QUOTE
let CONTAINER_COLUMNS_RFQ
let CONTAINER_COLUMNS_QUOTE, CONTAINER_COLUMNS_ITEMS_QUOTES
let MODAL_PACKAGE
allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.127 | Totals container in quote module");
describe("PCM- 2.127 | Totals container in quote module", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-2.127-totals-container-in-quote-module.json").then((data) => {
            this.data = data
        })
    })
    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("pcm/pcm-2.127-totals-container-in-quote-module.json").then((data) => {
            this.data = data
            CONTAINERS_CONFIGURATIONS = this.data.CONTAINERS.CONFIGURATIONS
            CONTAINER_COLUMNS_CONFIGURATIONS = this.data.CONTAINER_COLUMNS.CONFIGURATIONS

            CONTAINERS_CONFIGURATION_HEADER = this.data.CONTAINERS.CONFIGURATION_HEADER
            CONTAINER_COLUMNS_CONFIGURATION_HEADER = this.data.CONTAINER_COLUMNS.CONFIGURATION_HEADER
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            MODAL_PACKAGE = this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
            CONTAINER_COLUMNS_ITEMS_QUOTES = this.data.CONTAINER_COLUMNS.ITEMS_QUOTES;

            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
            }
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            };
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
            };
            MATERIAL_RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY,
            }
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE

            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION

            MODAL_REQUEST_FOR_QUOTE = this.data.MODAL.REQUEST_FOR_QUOTE

            CREATE_RFQ_PARAMETERS = {
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: [MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER]
            }
            CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ

            CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE
            CONTAINERS_ITEMS = this.data.CONTAINERS.ITEMS

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
    })
    after(() => {
        cy.LOGOUT();
    });
    it('TC - Prerequisites-Procurement configuration and Total types', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER, 0);
            _common.setup_gridLayout(cnt.uuid.CONFIGURATION_HEADER, CONTAINER_COLUMNS_CONFIGURATION_HEADER)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONFIGURATION_HEADER)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER, app.GridCells.DESCRIPTION_INFO, sidebar.SideBarOptions.MATERIAL)
        cy.wait(500)
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONFIGURATIONS, app.FooterTab.CONFIGURATIONS, 2);
            _common.setup_gridLayout(cnt.uuid.CONFIGURATIONS, CONTAINER_COLUMNS_CONFIGURATIONS)
        });
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TOTAL_TYPES, app.FooterTab.TOTAL_TYPES, 1);
        });
        _common.getText_storeIntoArray(cnt.uuid.TOTAL_TYPES, app.GridCells.DESCRIPTION_INFO, "TOTALDESCRIPTIONS");
    })

    it("TC - Create new Estimate and line items ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
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
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()

    });
    it("TC - Add Resource for selected line item", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, MATERIAL_RESOURCE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required Waits//required Waits
    });
    it('TC - Create material package,requisition,RFQ,Quote and change Status', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
        _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_PACKAGE.MATERIAL_AND_COST_CODE);
        cy.SAVE();
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();

        })
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required Waits//required Waits
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION)
        _procurementConfig.changeProcurementConfiguration_FromWizard(sidebar.SideBarOptions.MATERIAL, btn.ButtonText.YES)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.changeStatus_fromModal(sidebar.SideBarOptions.IN_PROGRESS);
        cy.SAVE();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_REQUISITION);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 0);
        });
        cy.wait(1000)//required Waits
        _common.select_allContainerData(cnt.uuid.REQUISITION_TOTALS)
        cy.wait(1000)//required Waits
        _common.delete_recordFromContainer(cnt.uuid.REQUISITION_TOTALS)
        cy.SAVE().wait(2000)
        _common.waitForLoaderToDisappear()
        _package.clickPlusIcon_asPerArrayLength(Cypress.env("TOTALDESCRIPTIONS"), cnt.uuid.REQUISITION_TOTALS);
        cy.SAVE().wait(1000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required Waits//required Waits
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
        _common.waitForLoaderToDisappear()
        _rfqPage.create_requestForQuote_fromWizard(CREATE_RFQ_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0)
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED)
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _common.waitForLoaderToDisappear()

        _rfqPage.create_quote_fromWizard([MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER], [commonLocators.CommonKeys.CHECK])
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
    })

    it('TC - Verify all the Total types added in Quotes totals container-1', function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
            _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
        })

        _common.select_rowInContainer(cnt.uuid.QUOTES)
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_TOTALS, app.FooterTab.TOTALS, 0);
        });
        _common.getText_storeIntoArray(cnt.uuid.QUOTES_TOTALS, app.GridCells.TRANSLATED, "TOTALSDESC", PACKAGE_TOTAL_TRANSLATION)
    })

    it('TC - Verify all the Total types added in Quotes totals container-2', function () {
        _validate.verify_isArrayEquals(Cypress.env("TOTALDESCRIPTIONS"), Cypress.env("TOTALSDESC"))
    })

    it('TC - Verify calculate gross in totals containers-1', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TAX_CODE);
        _common.openTab(app.TabBar.TAXCODE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TAX_CODE, app.FooterTab.TAXCODE, 0)
        })
        cy.wait(2000).REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear
        _common.clickOn_cellHasUniqueValue(cnt.uuid.TAX_CODE, app.GridCells.DESCRIPTION_INFO, CONTAINERS_ITEMS.TAX_CODE)
        cy.wait(1000)//required Waits
        _common.saveCellDataToEnv(cnt.uuid.TAX_CODE, app.GridCells.VAT_PERCENT, "TAXCODEPERCENTAGE")
    })

    it("TC - Verify calculate gross in totals containers-2", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QUOTE);
        cy.wait(2000).REFRESH_CONTAINER()
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
        });
        cy.wait(1000)//required Waits
        _common.select_rowInContainer(cnt.uuid.QUOTES)
        _common.openTab(app.TabBar.QUOTE_ITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 0)
            _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_ITEMS_QUOTES)
            cy.wait(1000)//required Waits
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES_ITEMS, app.GridCells.MDC_MATERIAL_FK, CONTAINERS_RESOURCE.CODE)
        _common.edit_dropdownCellWithInput(cnt.uuid.QUOTES_ITEMS, app.GridCells.MDC_TAX_CODE_FK_SMALL, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.TAX_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.PRICE)
        cy.SAVE().wait(2000)
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_TOTALS, app.FooterTab.TOTALS, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES_TOTALS, app.GridCells.TRANSLATED, commonLocators.CommonKeys.TOTAL, PACKAGE_TOTAL_TRANSLATION)
        cy.wait(500)
        _validate.verify_VATCalculation(cnt.uuid.QUOTES_TOTALS, Cypress.env("TAXCODEPERCENTAGE"))
    })
})
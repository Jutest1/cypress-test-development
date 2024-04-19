import { _common, _projectPage, _bidPage, _saleContractPage, _procurementPage, _wipPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage, _procurementContractPage } from "cypress/pages";
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import cypress from "cypress";
import { DataCells } from "cypress/pages/interfaces";
const allure = Cypress.Allure.reporter.getInterface();
const CU_DESC = "CU-DESC-" + Cypress._.random(0, 999);

const PROJECT_NO = "PRJ" + Cypress._.random(0, 999);
const PROJECT_DESC = "PR1DESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS: DataCells
let MODAL_PROJECTS
let CONTAINERS_INVOICE_BILLING_SCHEMA
let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS: DataCells


const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);

let LINE_ITEMS_PARAMETERS: DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM
let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE
let CONTAINER_COLUMNS_PACKAGE
let CONTAINER_COLUMNS_REQUISITION
let CREATE_RFQ_PARAMETERS: DataCells
let MODAL_REQUEST_FOR_QUOTE
let CONTAINER_COLUMNS_RFQ
let CONTAINER_COLUMNS_QUOTE
let CONTAINERS_ITEM_PRICE
let CONTAINER_COLUMNS_QUOTE_ITEMS
let CONTAINER_COLUMNS_CONTRACT
let CONTAINER_COLUMNS_HEADER
let CONTAINER_COLUMNS_PES_ITEMS
let CONTAINER_COLUMNS_INVOICE
let CONTAINER_COLUMNS_OTHER_SERVICES
let CONTAINERS_OTHER_SERVICES
let OTHER_SERVICES_PARAMETER_1: DataCells

const INVOICE_NO = "INV-" + Cypress._.random(0, 999);

allure.epic("PROCUREMENT AND BPM");
allure.feature("Invoice");
allure.story("PCM- 2.207 | Check effect of other services item in totals");

describe("PCM- 2.207 | Check effect of other services item in totals", () => {
    before(function () {
        cy.fixture("pcm/pcm-2.207-check-effect-of-other-service-item-in-totals.json").then((data) => {
            this.data = data;
            MODAL_PROJECTS = this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]: MODAL_PROJECTS.CLERK[0]
            }
            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
            CONTROLLING_UNIT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: CU_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
            }
            CONTAINERS_INVOICE_BILLING_SCHEMA = this.data.CONTAINERS.INVOICE_BILLING_SCHEMA
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
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
            };
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            LINE_ITEMS_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
            }
            MODAL_CREATE_UPDATE_MATERIAL_PACKAGE = this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
            MODAL_REQUEST_FOR_QUOTE = this.data.MODAL.REQUEST_FOR_QUOTE
            CREATE_RFQ_PARAMETERS = {
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: [MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER[0], MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER[1]]
            }
            CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
            CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE
            CONTAINERS_ITEM_PRICE = this.data.CONTAINERS.ITEM_PRICE
            CONTAINER_COLUMNS_QUOTE_ITEMS = this.data.CONTAINER_COLUMNS.QUOTE_ITEMS
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
            CONTAINER_COLUMNS_HEADER = this.data.CONTAINER_COLUMNS.HEADER
            CONTAINER_COLUMNS_PES_ITEMS = this.data.CONTAINER_COLUMNS.PES_ITEMS
            CONTAINER_COLUMNS_INVOICE = this.data.CONTAINER_COLUMNS.INVOICE
            CONTAINER_COLUMNS_OTHER_SERVICES = this.data.CONTAINER_COLUMNS.OTHER_SERVICES
            CONTAINERS_OTHER_SERVICES = this.data.CONTAINERS.OTHER_SERVICES
            OTHER_SERVICES_PARAMETER_1 = {
                [app.GridCells.PRC_STRUCTURE_FK]: "M",
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_OTHER_SERVICES.QUANTITY
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

    it("TC - Create controlling unit", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT, CU_DESC)
        _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT, app.GridCells.CODE, "CONTROLLING_UNIT_CODE")
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create new Estimate having line item ", function () {
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
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
        });
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEMS_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it("TC - Add Resource for selected line item", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.SAVE();
    });

    it("TC - Create Material Package from Estimate", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        cy.wait(2000) // This wait required as UI takes time to load
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.MATERIAL_AND_COST_CODE, null, MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.CONFIGURATION, MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE);
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create Requisition from Package", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        cy.wait(4000) // This wait required as UI takes time to load
        _rfqPage.getCode_fromRequisitionModal("REQUISITION_CODE")
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create RfQ from Requisition", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
        _common.waitForLoaderToDisappear()
        _rfqPage.create_requestForQuote_fromWizard(CREATE_RFQ_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _rfqPage.getCode_fromRFQModal("RFQ_CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0)
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create Quote for multiple suppliers from RfQ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _common.waitForLoaderToDisappear()
        _rfqPage.create_quote_fromWizard([MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER[0], MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER[1]], [commonLocators.CommonKeys.CHECK])
        _common.waitForLoaderToDisappear()
        _boqPage.getCode_fromMultipleQuoteModal("QUOTE-CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Quote the Prices for the supliers in Quote's items Container", function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
            _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE)
        })
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.CODE, Cypress.env("QUOTE_CODE0"))
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 1)
            _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_QUOTE_ITEMS)
        })
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEM_PRICE.PRICE[0])
        _common.clickOn_activeRowCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.ITEM_NO)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.CODE, Cypress.env("QUOTE_CODE1"))
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 1)
        })
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEM_PRICE.PRICE[1])
        _common.clickOn_activeRowCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.ITEM_NO)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Change Status Of Quote", function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        _common.search_inSubContainer(cnt.uuid.QUOTES, Cypress.env("RFQ_CODE"))
        _common.select_allContainerData(cnt.uuid.QUOTES)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_ofMultipleRecord_fromModal(commonLocators.CommonKeys.CHECKED)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
    });

    it("TC - verify price comparision and goto contract", function () {
        cy.wait(1000)//required waits
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        cy.wait(3000) // This wait required as UI takes time to load
        _package.getCode_fromContractModal("CONTRACT_CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Verify Contract and Item ", function () {
        cy.wait(1000);//required waits
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
            _common.waitForLoaderToDisappear()
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
        })
        _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("CONTROLLING_UNIT_CODE"))
        cy.SAVE()
        cy.wait(1000);//required waits
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2);
            _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
        });
        _common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT)
        _common.getTextfromCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL, app.GridCells.QUANTITY_REMAINING)
        cy.wait(1000);//required waits  
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        })
    })

    it("TC- Create PES from contract", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)// Added this wait script was getting failed
        _procurementPage.getCode_fromPESModal("PES_CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
            _common.setup_gridLayout(cnt.uuid.HEADERS, CONTAINER_COLUMNS_HEADER);
        })
        _common.select_rowInContainer(cnt.uuid.HEADERS)
        _common.edit_dropdownCellWithInput(cnt.uuid.HEADERS,app.GridCells.BILLING_SCHEMA_FK,commonLocators.CommonKeys.LIST,app.InputFields.INPUT_GROUP_CONTENT,commonLocators.CommonKeys.STANDARD_SINGEL)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)// Added this wait script was getting failed
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 1)
            _common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_PES_ITEMS);
        })
        _common.maximizeContainer(cnt.uuid.ITEMS)
        _common.select_rowInContainer(cnt.uuid.ITEMS)
        _common.assert_forNumericValues(cnt.uuid.ITEMS, app.GridCells.QUANTITY_SMALL, CONTAINERS_OTHER_SERVICES.quantity1)
    })

    it("TC- Add Quantity in PES item and verify remaining quantity", function () {
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2);
        });
        _common.select_rowInContainer(cnt.uuid.ITEMS)
        _common.edit_containerCell(cnt.uuid.ITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_OTHER_SERVICES.quantity)
        _common.minimizeContainer(cnt.uuid.ITEMS)
    })

    it('TC - Change PES status', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.ACCEPTION)
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create invoice from wizard', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_INVOICE);
        _common.waitForLoaderToDisappear()
        _package.enterRecord_toCreate_Invoice_FromWizard(commonLocators.CommonKeys.CREATE_ONE_INVOICE_PER_PES, INVOICE_NO)
        _common.waitForLoaderToDisappear()
    });

    it('TC- Add record in other services', function () {
        _common.openTab(app.TabBar.INVOICES).then(() => {
            cy.REFRESH_CONTAINER()
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
            _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE);
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
        })
        _common.openTab(app.TabBar.APPLICATION).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OTHER_SERVICES, app.FooterTab.OTHER_SERVICES, 1)
            _common.setup_gridLayout(cnt.uuid.OTHER_SERVICES, CONTAINER_COLUMNS_OTHER_SERVICES);
        })
        _common.clear_subContainerFilter(cnt.uuid.OTHER_SERVICES)
        _common.create_newRecord(cnt.uuid.OTHER_SERVICES)
        _procurementPage.enterRecord_toCreateOtherServices(cnt.uuid.OTHER_SERVICES, OTHER_SERVICES_PARAMETER_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.OTHER_SERVICES, app.GridCells.AMOUNT_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Other_Service", $ele1.text())
        })
        cy.log(Cypress.env("Other_Service"))
        cy.SAVE()
        cy.wait(3000)
        _common.openTab(app.TabBar.APPLICATION).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICE_BILLING_SCHEMA, app.FooterTab.BILLINGSCHEMA, 1)
        })
        _common.select_rowHasValue(cnt.uuid.INVOICE_BILLING_SCHEMA, CONTAINERS_INVOICE_BILLING_SCHEMA.BILLING_SCHEMA)
        cy.wait(1000);//required waits  
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.RESULT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Billing_Schema", $ele1.text())
        })
        cy.log(Cypress.env("Billing_Schema"))
        cy.SAVE()
        cy.wait(3000);
    })

    it('TC- Verify other services item in Reconcilliation container', function () {
        _common.openTab(app.TabBar.APPLICATION).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICE_RECONCILLIATION, app.FooterTab.RECONCILIATION, 3)
            _common.select_rowHasValue(cnt.uuid.INVOICE_RECONCILLIATION, CONTAINERS_INVOICE_BILLING_SCHEMA.fromOther)
            _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICE_RECONCILLIATION, app.GridCells.RECON_NET, Cypress.env("Other_Service"))
            cy.wait(1000);//required waits  
            _common.waitForLoaderToDisappear()
            _common.select_rowHasValue(cnt.uuid.INVOICE_RECONCILLIATION, CONTAINERS_INVOICE_BILLING_SCHEMA.fromBillingSchema)
            _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICE_RECONCILLIATION, app.GridCells.RECON_NET, Cypress.env("Billing_Schema"))
            cy.wait(1000);//required waits
            _common.waitForLoaderToDisappear()
            _common.select_rowHasValue(cnt.uuid.INVOICE_RECONCILLIATION, CONTAINERS_INVOICE_BILLING_SCHEMA.fromPES)
            cy.wait(1000);//required waits
            _common.getText_fromCell(cnt.uuid.INVOICE_RECONCILLIATION, app.GridCells.RECON_NET).then(($ele1: JQuery<HTMLElement>) => {
                Cypress.env("PES_TOTAL", $ele1.text())
                cy.log("PES===>" + Cypress.env("PES_TOTAL"))
            })
            _common.select_rowHasValue(cnt.uuid.INVOICE_RECONCILLIATION, CONTAINERS_INVOICE_BILLING_SCHEMA.Amount)
            cy.wait(1000);//required waits
            _common.getText_fromCell(cnt.uuid.INVOICE_RECONCILLIATION, app.GridCells.RECON_NET).then(($ele1: JQuery<HTMLElement>) => {
                Cypress.env("Invoice_Amount", $ele1.text())
                cy.log("Amount===>" + Cypress.env("Invoice_Amount"))
            })
            _common.select_rowHasValue(cnt.uuid.INVOICE_RECONCILLIATION, CONTAINERS_INVOICE_BILLING_SCHEMA.balance)
            _common.saveCellDataToEnv(cnt.uuid.INVOICE_RECONCILLIATION, app.GridCells.RECON_NET, "BALANCE")
            cy.wait(3000)
        })
    })

    it('TC - Verify Balance in Reconcilliation container', function () {
        cy.wait(1000).then(() => {
            _common.select_rowHasValue(cnt.uuid.INVOICE_RECONCILLIATION, CONTAINERS_INVOICE_BILLING_SCHEMA.balance)
            cy.wait(1000);//required waits     
            const totals = parseFloat(Cypress.env("Other_Service")) + parseFloat(Cypress.env("PES_TOTAL"))
            cy.log("Total is =>" + totals)
            const invTotal = parseFloat(Cypress.env("Invoice_Amount"))
            cy.log("Amount is =>" + invTotal)
            const Balance = invTotal - totals
            cy.log("Balance is =>" + Balance)
            _common.select_rowHasValue(cnt.uuid.INVOICE_RECONCILLIATION, CONTAINERS_INVOICE_BILLING_SCHEMA.balance)
            _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICE_RECONCILLIATION, app.GridCells.RECON_NET, Cypress.env("BALANCE"))
            _common.waitForLoaderToDisappear()
        })
    })
})

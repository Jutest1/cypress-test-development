
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _procurementPage, _wipPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const BoQS_DESC1 = "LI1-DESC-" + Cypress._.random(0, 999);
const CU_DESC = "CU-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const CREATE_CHANGE_DESC = "CREATE_CHANGE_DESC-" + Cypress._.random(0, 999);
const ORDER_CHANGE_DESC = "ORDER_CHANGE_DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQ_STRUCTURE_DESC-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells,
    BOQ_PARAMETERS: DataCells,
    GENERATE_LINE_ITEMS_PARAMETERS: DataCells,
    RESOURCE_PARAMETERS: DataCells,
    CONTROLLING_UNIT_PARAMETERS: DataCells,
    CO_CONTRACT_ITEM_PARAMETER: DataCells,

    CONTAINERS_CONTROLLING_UNIT,
    CONTAINER_COLUMNS_CONTROLLING_UNIT,
    CONTAINERS_BOQ_STRUCTURE,
    CONTAINER_COLUMNS_BOQ,
    CONTAINER_COLUMNS_BOQ_STRUCTURE,
    BOQ_STRUCTURE_PARAMETERS,
    CONTAINERS_ESTIMATE,
    CONTAINER_COLUMNS_ESTIMATE,
    CONTAINERS_RESOURCE,
    CONTAINER_COLUMNS_RESOURCE,
    CONTAINERS_PACKAGE,
    CONTAINERS_CONTRACT,
    CONTAINER_COLUMNS_CONTRACT,
    CONTAINER_PES,
    CONTAINER_COLUMNS_PES,
    CONTAINER_COLUMNS_PES_ITEMS,
    CONTAINER_COLUMNS_PES_BOQ_STRUCTURE,
    CONTAINER_CO_CONTRACT_ITEM
allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 1.18 | Change order contract BOQ quantity");
describe("PCM- 1.18 | Change order contract BOQ quantity", () => {
    before(function () {
        cy.fixture("pcm/pcm-1.18-change-order-contract-boq-quantity-alm-130017-b.json").then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
            CONTROLLING_UNIT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: CU_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
            }
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQS
            BOQ_PARAMETERS = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
            }
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            BOQ_STRUCTURE_PARAMETERS = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
            }
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            GENERATE_LINE_ITEMS_PARAMETERS = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
            }
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
            };
            CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
            CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT;
            CONTAINER_PES = this.data.CONTAINERS.PES;
            CONTAINER_COLUMNS_PES = this.data.CONTAINER_COLUMNS.PES;
            CONTAINER_COLUMNS_PES_ITEMS = this.data.CONTAINER_COLUMNS.PES_ITEMS;
            CONTAINER_COLUMNS_PES_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.PES_BOQ_STRUCTURE;
            CONTAINER_CO_CONTRACT_ITEM = this.data.CONTAINERS.CO_CONTRACT_ITEM;
            CO_CONTRACT_ITEM_PARAMETER = {
                [commonLocators.CommonLabels.PROJECT]: CONTAINER_CO_CONTRACT_ITEM.PROJECT_CHANGE,
                [commonLocators.CommonLabels.CHANGE_TYPE]: CONTAINER_CO_CONTRACT_ITEM.CHANGE_TYPE,
                [commonLocators.CommonLabels.CHANGE_REASON]: CONTAINER_CO_CONTRACT_ITEM.CHANGE_REASON,
                [commonLocators.CommonLabels.DESCRIPTION]: CREATE_CHANGE_DESC,
                [commonLocators.CommonLabels.CHANGE_ORDER_CONTRACT_DESC]:ORDER_CHANGE_DESC

            }
            cy.preLoading(
                Cypress.env("adminUserName"),
                Cypress.env("adminPassword"),
                Cypress.env("parentCompanyName"),
                Cypress.env("childCompanyName")
            );
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
                _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
            });
        });
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create controlling unit", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
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
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create BOQ header and BOQ structure", function () {
        _common.openTab(app.TabBar.BOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE);
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE();
        _boqPage.get_BoQsFinalPrice()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    });

    it('TC - Create new estimate', function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Generate BOQ line item and create Resource", function () {
        cy.REFRESH_CONTAINER();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        cy.SAVE();
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
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    });

    it("TC - Create BoQ Package from the Estimate and Change package status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE)
        cy.wait(1000); //Required wait to load page
        _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(CONTAINERS_PACKAGE.BASED_ON, CONTAINERS_PACKAGE.ESTIMATE_SCOPE, CONTAINERS_PACKAGE.ESTIMATE_SCOPE_INDEX, CONTAINERS_PACKAGE.WIC_BOQ, CONTAINERS_PACKAGE.PROCUREMENT_STRUCTURE, CONTAINERS_PACKAGE.QTY_TYPE, CONTAINERS_PACKAGE.CREATE_PACKAGE_CHECKBOX)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"))
         cy.wait(2000) //Required wait to load page
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        })
    })

    it("TC - Create contract change contract status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _package.create_ContractfromPackage(CONTAINERS_CONTRACT.BUSINESS_PARTNER);
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
        });
        _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK,commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT.RESPONSIBLE);
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CU_DESC);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        })
    })

    it("TC - Create PES and add new BoQ Structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        cy.wait(1000) //Required wait to load page
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        cy.wait(2000) //Required wait to load page
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
            _common.setup_gridLayout(cnt.uuid.HEADERS, CONTAINER_COLUMNS_PES);
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"))
        cy.wait(2000) //Required wait to load page
        _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        _common.openTab(app.TabBar.PESBOQ).then(() => {
            _common.setDefaultView(app.TabBar.PESBOQ)
            _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQs, 0)
        })
        cy.wait(2000) //Required wait to load page
        cy.REFRESH_CONTAINER()
        cy.wait(1000)
        _common.clear_subContainerFilter(cnt.uuid.PES_ITEMS)
        _common.openTab(app.TabBar.PESBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1)
            _common.setup_gridLayout(cnt.uuid.PES_BOQS_STRUCTURE, CONTAINER_COLUMNS_PES_BOQ_STRUCTURE);
        })
        _common.maximizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
        cy.wait(1000) //Required wait to load page
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC)
        cy.wait(1000) //Required wait to load page
        _common.edit_containerCell(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PES.QUANTITY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, CONTAINER_PES.ROOT)
        _common.create_newRecord(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.enterRecord_inNewRow(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, BoQS_DESC1);
        _common.enterRecord_inNewRow(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PES.QUANTITY_1);
        _common.enterRecord_inNewRow(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PES.UNIT_RATE);
        _common.edit_dropdownCellWithInput(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.BAS_UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PES.UOM)
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
    })

    it("TC - Create CO contract for new PES item", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CO_CONTRACT_FOR_NEW_PES_ITEM);
        _package.create_changeOrderContractForNewItem_fromWizard(CO_CONTRACT_ITEM_PARAMETER)
    })

    it("TC - Verify contracted quantity in PES module, When status of  contract is Recorded", function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.DESCRIPTION, ORDER_CHANGE_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONSTATUS_FK, commonLocators.CommonKeys.RECORDED)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PES);
        cy.wait(1000) //Required wait to load page
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
            _common.setup_gridLayout(cnt.uuid.HEADERS, CONTAINER_COLUMNS_PES);
        })
        _common.openTab(app.TabBar.PESBOQ).then(() => {
            _common.setDefaultView(app.TabBar.PESBOQ)
            _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQs, 0)
        })
        _common.select_rowInContainer(cnt.uuid.PES_ITEMS)
        _common.openTab(app.TabBar.PESBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0)
            _common.setup_gridLayout(cnt.uuid.PES_BOQS_STRUCTURE, CONTAINER_COLUMNS_PES_BOQ_STRUCTURE);
        })
        _common.maximizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BoQS_DESC1)
        _common.assert_forNumericValues(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.ORD_QUANTITY_SMALL, "0")
        _common.minimizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
    })

    it("TC - Verify contracted quantity in PES module, When status of  contract is Approved", function () {
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
        })
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.HEADERS, commonLocators.CommonKeys.CONTRACT);
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.DESCRIPTION, ORDER_CHANGE_DESC)
        cy.wait(1000) //Required wait to load page
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PES);
        cy.wait(2000) //Required wait to load page
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
        })
        _common.openTab(app.TabBar.PESBOQ).then(() => {
            _common.setDefaultView(app.TabBar.PESBOQ)
            _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQs, 0)
            _common.select_rowInContainer(cnt.uuid.PES_ITEMS)
            cy.wait(1000) //Required wait to load page
        })
        _common.openTab(app.TabBar.PESBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0)
            _common.setup_gridLayout(cnt.uuid.PES_BOQS_STRUCTURE, CONTAINER_COLUMNS_PES_BOQ_STRUCTURE);
        })
        _common.maximizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
        cy.wait(4000) //Required wait to load page
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BoQS_DESC1)
        _common.assert_forNumericValues(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.ORD_QUANTITY_SMALL, CONTAINER_PES.QUANTITY_1)
        _common.minimizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
    })
});

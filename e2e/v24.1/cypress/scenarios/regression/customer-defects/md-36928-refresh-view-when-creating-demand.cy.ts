import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import { _common, _projectPage, _controllingUnit, _estimatePage, _procurementConfig, _package, _procurementPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECT_NO = "PRJ-" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRJ-DESC-" + Cypress._.random(0, 999);
const CONTROLLING_UNIT = "CONTROLLING-UNIT-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LI-DESC-" + Cypress._.random(0, 999);
const CHANGE_ORDER_DESC = "ORDER-CHANGE-DESC-" + Cypress._.random(0, 999);
const CHANGE_DESC = "CHANGE-DESC-" + Cypress._.random(0, 999);

let MODAL_PROJECTS;

let CONTAINERS_CONTROLLING_UNIT, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCE, CONTAINERS_PACKAGE, CONTAINERS_CONTRACT;

let CONTAINER_COLUMNS_CONTROLLING_UNIT, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCE, CONTAINER_COLUMNS_PACKAGE, CONTAINER_COLUMNS_CONTRACT, CONTAINER_COLUMNS_CONTRACT_ITEM, CONTAINER_COLUMNS_PES_ITEMS, CONTAINER_COLUMNS_PACKAGE_ITEM, CONTAINER_COLOUMN_PROCUREMENT_CONTRACT;

let PROJECTS_PARAMETERS: DataCells, CONTROLLING_UNIT_PARAMETERS: DataCells, ESTIMATE_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS: DataCells, RESOURCE_PARAMETERS: DataCells;

ALLURE.epic("CUSTOMER DEFECTS")
ALLURE.feature("Mainka Defects")
ALLURE.story("MD- 36928 Refresh view (when creating demand)")

describe("MD- 36928 | Refresh view (when creating demand)", () => {

    before(function () {
        cy.fixture("customer-defects/md-36928-refresh-view-when-creating-demand.json").then((data) => {
            this.data = data;
            MODAL_PROJECTS = this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]: MODAL_PROJECTS.CLERK
            }
            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
            CONTROLLING_UNIT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: CONTROLLING_UNIT,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
            }
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
            },
                CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
            }
            CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE_ITEM = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
            CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
            CONTAINER_COLUMNS_CONTRACT_ITEM = this.data.CONTAINER_COLUMNS.CONTRACT_ITEM
            CONTAINER_COLUMNS_PES_ITEMS = this.data.CONTAINER_COLUMNS.PES_ITEMS
            CONTAINER_COLOUMN_PROCUREMENT_CONTRACT = this.data.CONTAINER_COLUMNS.PROCUREMENT_CONTRACT
        }).then(() => {
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        })
    })

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create new project", function () {
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear();
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
        _common.waitForLoaderToDisappear();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        _common.saveCellDataToEnv(cnt.uuid.PROJECTS, app.GridCells.PROJECT_NO, "ProjectNo");
    });

    it("TC - Adding controlling unit to the project", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("ProjectNo"))
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
    });

    it('TC - Add new estimate record', function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("ProjectNo")).pinnedItem();
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

    it('TC - Add line item and assign resource to it', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    })

    it('TC - Create material package from wizard', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
            _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        })
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION)
        _procurementConfig.changeProcurementConfiguration_FromWizard(commonLocators.CommonKeys.MATERIAL, btn.ButtonText.YES);
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE, app.GridCells.STRUCTURE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PACKAGE.PROCUREMENT_STRUCTURE)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1)
            _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
        })
        _common.select_dataFromSubContainer(cnt.uuid.PACKAGEITEMS, CONTAINERS_RESOURCE.CODE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
        cy.SAVE();
    });

    it('TC - Create contract and change contract status', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT)
        _package.create_ContractfromPackage(CONTAINERS_CONTRACT.BP)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            cy.wait(1000)
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        });
        cy.wait(1000)
        _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTROLLING_UNIT)
        _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, MODAL_PROJECTS.CLERK)
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    })

    it('TC - Create PES and add new item ', function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0);
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("ProjectNo"))
        _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        _common.select_rowInContainer(cnt.uuid.HEADERS)
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 1);
            _common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_PES_ITEMS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_PES_ITEMS.mdcmaterialfk], cnt.uuid.ITEMS)
        })
        _common.clear_subContainerFilter(cnt.uuid.ITEMS)
        _common.create_newRecord(cnt.uuid.ITEMS)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.ITEMS, app.GridCells.MDC_MATERIAL_FK, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.MATERIAL_CODE)
        _common.delete_recordFromContainer(cnt.uuid.ITEMS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ITEMS)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.ITEMS, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.MATERIAL_CODE)
        _common.select_activeRowInContainer(cnt.uuid.ITEMS)
        _common.edit_containerCell(cnt.uuid.ITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.PRICE)
        _common.select_activeRowInContainer(cnt.uuid.ITEMS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create CO contract for new PES item', function () {
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        _common.select_rowInContainer(cnt.uuid.HEADERS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CO_CONTRACT_FOR_NEW_PES_ITEM)
        _procurementPage.Change_Order_Contract_New_Item(Cypress.env("ProjectNo"), "Standard", CHANGE_DESC, commonLocators.CommonKeys.DESIGN_CHANGE, commonLocators.CommonKeys.CHANGE_REQUEST, CHANGE_ORDER_DESC)
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, "Contract_Code")
    });

    it('TC - Assert contract code while populate basis and change order is uncheck', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env("Contract_Code"))
        _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.assert_cellDataByContent_inContainer(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, Cypress.env("Contract_Code"))
    })

    it('TC - Assert contract code while populate basis and change order is check', function () {
        _validate.verify_searchByPopulateBasisAndChangeOrders()
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env("Contract_Code"))
        _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, Cypress.env("Contract_Code"))
    })
});      
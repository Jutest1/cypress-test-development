import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _validate, _projectPage, _materialPage, _ticketSystemPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const MATERIAL_CATALOG_CODE = "MC" + Cypress._.random(0, 999);
const MATERIAL_CATALOG_DESC = "MC_DESC_" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_CODE = "MG" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_DESC = "MG_DESC_" + Cypress._.random(0, 999);
const MATERIAL_RECORD_CODE = "MR" + Cypress._.random(0, 999);
const MATERIAL_RECORD_DESC = "MR_DESC_" + Cypress._.random(0, 999);
const PROJECT_NO = "PR-" + Cypress._.random(0, 999);
const PROJECT_DESC = "PROJECT_DESC-" + Cypress._.random(0, 999);
const MATERIAL_STRUCTURE = "MS-" + Cypress._.random(0, 999);
const MATERIAL_DEC = "MAT-" + Cypress._.random(0, 999);
const MANUALREMARK = "MANUALREMARK-" + Cypress._.random(0, 999);

let CONTAINERS_DATA_TYPES, CONTAINERS_DATA_RECORDS, CONTAINERS_COMPANIES, CONTAINERS_CLERKS, CONTAINERS_PROJECT, CONTAINERS_MATERIAL_CATALOG, CONTAINERS_MATERIAL_GROUP, CONTAINERS_MATERIAL_RECORDS, CONTAINERS_COMMODITY_SEARCH, CONTAINERS_CART;

let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE, CONTAINER_COLUMNS_COMPANIES, CONTAINER_COLUMNS_CLERKS, CONTAINER_COLUMNS_PROJECT, CONTAINER_COLUMNS_MATERIAL_CATALOG, CONTAINER_COLUMNS_MATERIAL_GROUP, CONTAINER_COLUMNS_MATERIAL_RECORDS, CONTAINER_COLUMNS_CONTRACT, CONTAINER_COLUMNS_ITEMS;

let CLERK_PARAMETER: DataCells, PROJECT_PARAMETERS: DataCells, MATERIAL_CATALOGS_PARAMETER: DataCells, MATERIAL_GROUP_PARAMETER: DataCells, MATERIAL_RECORD_PARAMETER: DataCells, COMMODITY_RESULT_PARAMETER: DataCells;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Ticket System");
ALLURE.story("PCM- 2.213 | If materials from Framework agreement are selected and create directly contract");

describe("PCM- 2.213 | If materials from Framework agreement are selected and create directly contract", () => {

    before(function () {
        cy.fixture("procurement-and-bpm/pcm-2.213-If-materials-from-Framework-agreement-are-selected-and-create-directly-contract.json")
            .then((data) => {
                this.data = data;
                CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES
                CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
                CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE = this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE
                CONTAINERS_COMPANIES = this.data.CONTAINERS.COMPANIES
                CONTAINER_COLUMNS_COMPANIES = this.data.CONTAINER_COLUMNS.COMPANIES
                CONTAINERS_CLERKS = this.data.CONTAINERS.CLERKS
                CONTAINER_COLUMNS_CLERKS = this.data.CONTAINER_COLUMNS.CLERKS
                CLERK_PARAMETER = {
                    [app.GridCells.CODE]: CONTAINERS_CLERKS.CODE
                }
                CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
                CONTAINER_COLUMNS_PROJECT = this.data.CONTAINER_COLUMNS.PROJECT;
                PROJECT_PARAMETERS = {
                    [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                    [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                    [commonLocators.CommonLabels.CLERK]: Cypress.env("CLERK_LOGGED_USER")
                };
                CONTAINERS_MATERIAL_CATALOG = this.data.CONTAINERS.MATERIAL_CATALOG
                CONTAINER_COLUMNS_MATERIAL_CATALOG = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
                MATERIAL_CATALOGS_PARAMETER = {
                    [app.GridCells.CODE]: MATERIAL_CATALOG_CODE,
                    [app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_MATERIAL_CATALOG.BUSINESS_PARTNER,
                    [app.GridCells.DESCRIPTION_INFO]: MATERIAL_CATALOG_DESC,
                    [app.GridCells.IS_TICKET_SYSTEM]: CommonLocators.CommonKeys.CHECK
                }
                CONTAINERS_MATERIAL_GROUP = this.data.CONTAINERS.MATERIAL_GROUP
                CONTAINER_COLUMNS_MATERIAL_GROUP = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
                MATERIAL_GROUP_PARAMETER = {
                    [app.GridCells.CODE]: MATERIAL_GROUPS_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: MATERIAL_GROUPS_DESC,
                    [app.GridCells.PRC_STRUCTURE_FK]: CONTAINERS_MATERIAL_GROUP.PROCUREMENT_STRUCTURE
                }
                CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS
                CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS
                MATERIAL_RECORD_PARAMETER = {
                    [app.GridCells.CODE]: MATERIAL_RECORD_CODE,
                    [app.GridCells.DESCRIPTION_INFO_1]: MATERIAL_RECORD_DESC,
                    [app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORDS.UOM[0],
                    [app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORDS.RETAIL_PRICE[0],
                    [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORDS.LIST_PRICE[0],
                    [app.GridCells.MIN_QUANTITY]: CONTAINERS_MATERIAL_RECORDS.MINIMUM_QUANTITY[0],
                    [app.GridCells.MATERIAL_TYPE_FK]: CommonLocators.CommonKeys.STOCK_MANAGED_MATERIAL,
                }
                CONTAINERS_COMMODITY_SEARCH = this.data.CONTAINERS.COMMODITY_SEARCH
                COMMODITY_RESULT_PARAMETER = {
                    [commonLocators.CommonLabels.TYPE]: commonLocators.CommonKeys.FILTER_SMALL,
                    [commonLocators.CommonKeys.FILTER]: CONTAINERS_COMMODITY_SEARCH.FILTER_CHECKBOX,
                    [commonLocators.CommonKeys.SEARCH_RESULT]: MATERIAL_RECORD_DESC
                }
                CONTAINERS_CART = this.data.CONTAINERS.CART
                CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
                CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS

            }).then(() => {
                cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            });
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Set Is Framework under customizing module", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 2)
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.MATERIAL_CATALOG_TYPE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, CONTAINERS_DATA_TYPES.MATERIAL_CATALOG_TYPE)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.search_inSubContainer(cnt.uuid.INSTANCES, CONTAINERS_DATA_RECORDS.FRAMEWORK_AGREEMENTS)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_DATA_RECORDS.FRAMEWORK_AGREEMENTS)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_DEFAULT, commonLocators.CommonKeys.CHECK)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_FRAMEWORK, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Set Is For Procurement under customizing module", function () {
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, CONTAINERS_DATA_TYPES.MATERIAL_TYPE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, CONTAINERS_DATA_TYPES.MATERIAL_TYPE)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 1);
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.search_inSubContainer(cnt.uuid.INSTANCES, CONTAINERS_DATA_RECORDS.STOCK_MANAGED_MATERIAL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_DATA_RECORDS.STOCK_MANAGED_MATERIAL)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_DEFAULT, CommonLocators.CommonKeys.CHECK)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_FOR_PROCUREMENT, CommonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create material procurement structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE)
        _common.openTab(app.TabBar.GENERALS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES, btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.enterRecord_inNewRow(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, MATERIAL_DEC)
        cy.wait(500)
        _common.enterRecord_inNewRow(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, MATERIAL_STRUCTURE)
        cy.SAVE()
    })

    it("TC - Assign logged-in user a clerk", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COMPANY)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.COMPANY).then(() => {
            _common.setDefaultView(app.TabBar.COMPANY)
            _common.select_tabFromFooter(cnt.uuid.COMPANIES, app.FooterTab.COMPANIES, 0);
            _common.setup_gridLayout(cnt.uuid.COMPANIES, CONTAINER_COLUMNS_COMPANIES)
        });
        cy.REFRESH_CONTAINER()
        _common.maximizeContainer(cnt.uuid.COMPANIES)
        _common.search_inSubContainer(cnt.uuid.COMPANIES, CONTAINERS_COMPANIES.COMPANY_NAME)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COMPANIES, app.GridCells.COMPANY_NAME_SMALL, CONTAINERS_COMPANIES.COMPANY_NAME)
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.COMPANIES, CommonLocators.CommonKeys.CLERK)
        _common.openTab(app.TabBar.CLERK).then(() => {
            _common.setDefaultView(app.TabBar.CLERK)
            _common.select_tabFromFooter(cnt.uuid.CLERKS, app.FooterTab.CLERKS, 0);
            _common.setup_gridLayout(cnt.uuid.CLERKS, CONTAINER_COLUMNS_CLERKS)
        });
        _common.maximizeContainer(cnt.uuid.CLERKS)
        cy.REFRESH_CONTAINER()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CLERKS, app.GridCells.CODE, CONTAINERS_CLERKS.CODE)
        _common.assign_clerkForLoggedInUser(cnt.uuid.CLERKS, CLERK_PARAMETER)
        cy.SAVE()
    });

    it("TC - Create new project", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
    })

    it("TC - Create material catalog and material group", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG)
        cy.wait(1000)
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG)
            _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS);
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOGS_PARAMETER);
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS);
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUP)
        })
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_GROUP_PARAMETER);
        cy.SAVE()
    })

    it("TC - Create material record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIAL_CATALOG_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER)
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_GROUP_FILTER)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUP_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER, MATERIAL_GROUPS_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)
        _common.minimizeContainer(cnt.uuid.MATERIAL_GROUP_FILTER)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
            _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        });
        _common.maximizeContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_PARAMETER)
        cy.SAVE()
    });

    it("TC - Go to Ticket System Clear the Cart and Add item to the Cart by selecting filter only framework", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TICKET_SYSTEM)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CART).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS)
        })
        _ticketSystemPage.deleteRecord_toClearItemsInCart(cnt.uuid.CART_ITEMS)
        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
        })
        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH, COMMODITY_RESULT_PARAMETER)
        _ticketSystemPage.enterRecord_toAddMaterialInCart(cnt.uuid.COMMODITY_SEARCH, [MATERIAL_RECORD_DESC], [CONTAINERS_COMMODITY_SEARCH.QUANTITY[0]])
    })

    it("TC - If Assertion 1 -Verify the vendor the auto selected ", function () {
        _common.openTab(app.TabBar.CART).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS)
        })
        cy.wait(2000)//need time to serch the cart
        _ticketSystemPage.verifyVendorin_ticketsystem(CONTAINERS_CART.BUSINESS_PARTNER)
        _common.waitForLoaderToDisappear()
        _ticketSystemPage.set_cartViewMaterialsHeader({ [commonLocators.CommonLabels.PROCUREMENT_TYPE]: CommonLocators.CommonKeys.CONTRACT })
        _common.waitForLoaderToDisappear()
        _ticketSystemPage.enterRecord_toPlaceOrderForRequisitionFromCart(cnt.uuid.CART_ITEMS)
        _common.waitForLoaderToDisappear()
        _ticketSystemPage.enterRecord_toAddRemarkandplaceorderSuccessfully(MANUALREMARK, CommonLocators.CommonKeys.CONTRACT)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Assertion 2-Verify the  new catalog", function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
        });
        _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS);
        });
        _common.search_inSubContainer(cnt.uuid.ITEMSCONTRACT, MATERIAL_CATALOG_DESC)
    });

    it("TC - Assertion 3-Verify the Procurement sctucture ", function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
        });
        _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS);
        });
        _common.search_inSubContainer(cnt.uuid.ITEMSCONTRACT, CommonLocators.CommonKeys.MATERIAL)
        _common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.TRANSLATED, CommonLocators.CommonKeys.MATERIAL, app.GridCells.PRC_STRUCTURE_FK_DESCRIPTION_INFO)
    });

    it("TC - Assertion 4-Verify the ticket materials total with contract item", function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
        });
        _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS);
            _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_ITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
        _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.ITEMSCONTRACT, CONTAINERS_MATERIAL_RECORDS.LIST_PRICE[0], CONTAINERS_COMMODITY_SEARCH.QUANTITY[0], app.GridCells.TOTAL)
    })

    it("TC - Assertion 5-Verify the ticket materials Remark with contract item", function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.setDefaultView(app.TabBar.CONTRACT)
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        });
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.assert_cellDataByContent_inContainer(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.REMARK, MANUALREMARK)
    })

});



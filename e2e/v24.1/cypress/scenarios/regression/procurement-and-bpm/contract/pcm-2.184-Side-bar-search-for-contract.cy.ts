import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementContractPage, _projectPage, _procurementPage, _controllingUnit, _materialPage } from "cypress/pages";
import { app, tile, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";


const CU_DESC = "CU-DESC-" + Cypress._.random(0, 9999);

const SEARCHFORM = "SEARCHFORM-" + Cypress._.random(0, 9999);
const SEARCHDESC = "TEST-" + Cypress._.random(0, 9999);
const FILTERNAME = "FILTERNAME-" + Cypress._.random(0, 9999);
const CO_CONTRACT_DESC = "CO_CONTRACT_DESC-" + Cypress._.random(0, 9999);
const PROJECT_CHANGE_DESC = "PROJECT_CHANGE_DESC-" + Cypress._.random(0, 9999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
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
let MODAL_PACKAGE
let CONTAINERS_ITEMS
let CONTAINERS_PES

let CONTAINER_COLUMNS_PROCUREMENTCONTRACT
let CONTAINERS_PROCUREMENTCONTRACT
let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS: DataCells
let CO_CONTRACT_ITEM_PARAMETER: DataCells
const allure = Cypress.Allure.reporter.getInterface();
allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 2.184 | Side bar search for contract")

describe("PCM- 2.184 | Side bar search for contract", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-2.184-Side-bar-search-for-contract.json").then((data) => {
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
        cy.fixture("pcm/pcm-2.184-Side-bar-search-for-contract.json").then((data) => {
            this.data = data;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_ITEMS = this.data.CONTAINERS.ITEMS;
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            MODAL_PACKAGE = this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
            }
            CONTROLLING_UNIT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: CU_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
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
            }


            CONTAINERS_PES = this.data.CONTAINERS.PES

            CONTAINERS_PROCUREMENTCONTRACT = this.data.CONTAINERS.PROCUREMENTCONTRACT
            CONTAINER_COLUMNS_PROCUREMENTCONTRACT = this.data.CONTAINER_COLUMNS.PROCUREMENTCONTRACT
            CO_CONTRACT_ITEM_PARAMETER = {
                [commonLocators.CommonLabels.PROJECT]: PRJ_NO,
                [commonLocators.CommonLabels.RUBRIC_CATEGORY]: CONTAINERS_PROCUREMENTCONTRACT.RUBERIC_CATAGORY,
                [commonLocators.CommonLabels.CHANGE_TYPE]: CONTAINERS_PROCUREMENTCONTRACT.CHANGE_TYPE,
                [commonLocators.CommonLabels.CHANGE_REASON]: CONTAINERS_PROCUREMENTCONTRACT.CHANGE_TYPE_REASONS,
                [commonLocators.CommonLabels.DESCRIPTION]: PROJECT_CHANGE_DESC,
                [commonLocators.CommonLabels.CONTRACT_STATUS]: CONTAINERS_PROCUREMENTCONTRACT.STATUS,
                [commonLocators.CommonLabels.CHANGE_ORDER_CONTRACT_DESC]: CO_CONTRACT_DESC
            }
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
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
        })
    });

    it("TC - Create controlling unit", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT, app.GridCells.CODE, "CU_CODE")
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

    })

    it('TC - Create New Estimate Record', function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    });

    it('TC - Create new line item', function () {
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
    });

    it("TC - Create Material Package from Estimate", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
        _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_PACKAGE.MATERIAL_AND_COST_CODE);
        cy.SAVE();
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();

        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.changeStatus_fromModal(sidebar.SideBarOptions.IN_PROGRESS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
    });

    it('TC - Creation Of contract', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        cy.wait(1000)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.setDefaultView(app.TabBar.CONTRACT);
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_PROCUREMENTCONTRACT)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)

        _common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT)
        _materialPage.enterRecord_toCreateContract(CONTAINERS_PROCUREMENTCONTRACT.BUISNESS_PARTNER)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, "MusM")
            _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.PROJECT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, PRJ_NO)
            _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("CU_CODE"))
        })
         cy.SAVE()
        _common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
        cy.SAVE()
        _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CONTRACT_CODE", $ele1.text())
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);

        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
        _common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
    });

    it("TC - Verify Add new  PES item", function () {
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.setDefaultView(app.TabBar.PERFORMANCEENTRYSHEET)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS);
        })
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS);
        })
        _common.create_newRecord(cnt.uuid.ITEMS)
        _common.maximizeContainer(cnt.uuid.ITEMS)
        cy.wait(1000).then(() => {
            _procurementPage.enterRecord_toeditpesitem(CONTAINERS_PES.STRUCTURE, CONTAINERS_PES.MATERIAL_NO, CONTAINERS_PES.QUANTITY_2)
        })
        _common.minimizeContainer(cnt.uuid.ITEMS)
        _common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
        _common.openTab(app.TabBar.PES_ITEMS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS)
        _common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
        _common.changeStatus_fromModal(sidebar.SideBarOptions.ACCEPTION)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CO_CONTRACT_FROM_PES_VARIANCE);
        _common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
        _procurementPage.create_changeOrderContractForNewItem_fromWizard(CO_CONTRACT_ITEM_PARAMETER)
        _common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
        cy.SAVE()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            cy.wait(1000)
            cy.REFRESH_CONTAINER()
            _common.waitForLoaderToDisappear()
            cy.wait(1000) //required Waits
        })
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_STRUCTURE__, app.FooterTab.CONTRACT_STRUCTURE_MAIN_SUB);
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
            .search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("CONTRACT_CODE"))
        cy.wait(2000).then(() => {
            _validate.verify_searchByPopulateBasisAndChangeOrders()
            _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_STRUCTURE__, app.GridCells.CODE, Cypress.env("CONTRACT_CODE"))
        })
        cy.SAVE()
        cy.wait(1000)//required Waits
        _common.waitForLoaderToDisappear()
    })

    it("TC- Verify search by date", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.openTab(app.TabBar.CONTRACT).then(() => {

            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
                .search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("CONTRACT_CODE"))
        });
        _common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
        _validate.verify_searchByDate("Inserted At", "Today")
        _common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth() + 1;
        const currentYear = today.getFullYear();
        const TodaysDate = `${currentDay.toString().padStart(2, "0")}/${currentMonth.toString().padStart(2, "0")}/${currentYear.toString()}`
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, Cypress.env("CONTRACT_CODE"))
        cy.SAVE()
        cy.wait(1000)//required Waits
        _common.waitForLoaderToDisappear()
    })

    it("TC- Verify standard search and enhanced search", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.waitForLoaderToDisappear
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_PROCUREMENTCONTRACT)
        });
        cy.wait(1000)//required Waits
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("CONTRACT_CODE"))
        cy.wait(2000).then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, Cypress.env("CONTRACT_CODE"))
        })
        _validate.verify_enhancedSearch(CONTAINERS_PROCUREMENTCONTRACT.PARENT_ELEMENT, CONTAINERS_PROCUREMENTCONTRACT.ITEM, CONTAINERS_PROCUREMENTCONTRACT.BUISNESS_PARTNER, FILTERNAME)
        cy.wait(1000)//required Waits
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_PROCUREMENTCONTRACT.BUISNESS_PARTNER)
        _validate.verify_createSearchForm(SEARCHDESC, SEARCHFORM, CONTAINERS_PROCUREMENTCONTRACT.BUISNESS_PARTNER)
        cy.wait(2000)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_PROCUREMENTCONTRACT.BUISNESS_PARTNER)
        cy.wait(1000)//required Waits
        _common.waitForLoaderToDisappear()
        cy.SAVE()
    });
    after(() => {
        cy.LOGOUT();
    });
})







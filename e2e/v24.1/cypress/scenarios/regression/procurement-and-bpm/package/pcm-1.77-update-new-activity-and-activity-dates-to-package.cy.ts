import { _common, _controllingUnit, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView, _modalView, _rfqPage, _procurementContractPage, _saleContractPage, _validate, _procurementPage, _procurementConfig, _wicpage, _schedulePage } from "cypress/pages";
import { cnt, tile, app, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import Buttons from "cypress/locators/buttons";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const SCH_CODE = "SCHCD-" + Cypress._.random(0, 999)
const SCH_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const SCH_ITEM2 = "SACT2-" + Cypress._.random(0, 999)
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999)
const SCH_ACTIVITY_DESC = 'ACT-001-' + Cypress._.random(0, 999);

let SCH_PARAMETERS: DataCells,
    ESTIMATE_PARAMETERS: DataCells,
    RESOURCE_PARAMETERS: DataCells,
    GENERATE_LINE_ITEMS_PARAMETERS: DataCells

let CONTAINERS_ACTIVITY_STRUCTURE,
    CONTAINER_COLUMNS_SCHEDULE,
    CONTAINER_COLUMNS_ACTIVITY_STRUCTURE,
    CONTAINERS_ESTIMATE,
    CONTAINER_COLUMNS_ESTIMATE,
    CONTAINER_COLUMNS_LINE_ITEM,
    CONTAINERS_RESOURCE,
    CONTAINER_COLUMNS_RESOURCE,
    CONTAINER_COLUMNS_PACKAGE

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM - 1.77 | Update new Activity and Activity Dates to Package.");

describe("PCM - 1.77 | Update new Activity and Activity Dates to Package.", () => {
    before(function () {
        cy.fixture("pcm/pcm-1.77-update-new-activity-and-activity-dates-to-package.json").then((data) => {
            this.data = data
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
            CONTAINER_COLUMNS_SCHEDULE = this.data.CONTAINER_COLUMNS.SCHEDULE
            CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
            SCH_PARAMETERS = {
                [app.GridCells.CODE]: SCH_CODE,
                [app.GridCells.DESCRIPTION_INFO]: SCH_DESC
            }
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            GENERATE_LINE_ITEMS_PARAMETERS = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: SCH_DESC
            }
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            }
            cy.preLoading(Cypress.env("adminUserName"),
                Cypress.env("adminPassword"),
                Cypress.env("parentCompanyName"),
                Cypress.env("childCompanyName")
            );
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        })
    });

    it("TC - Create a Schedule header and Scheduling activity in it.", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 3);
            _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULE);
            _common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
        });
        _common.create_newRecord(cnt.uuid.SCHEDULES);
        _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES, SCH_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.goToButton_inActiveRow(cnt.uuid.SCHEDULES, app.GridCells.CODE, btn.IconButtons.ICO_SCHEDULING);
        cy.wait(2000); //required wait to load page
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE);
            _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        });
        _schedulePage.enterDataTo_CreateScheduleActivity(SCH_ACTIVITY_DESC, CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY, CONTAINERS_ACTIVITY_STRUCTURE.UOM, _common.getDate("current"), _common.getDate("current"));
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Act1Code", $ele1.text())
            cy.log(Cypress.env("Act1Code"))
        })
        _common.getText_fromCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.PLANNED_DURATION).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("A1plannedduration", $ele1.text())
            cy.log(Cypress.env("A1plannedduration"))
        })
        _common.getText_fromCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.PLANNED_START).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("A1Start", $ele1.text())
            cy.log(Cypress.env("A1Start"))
        })
        _common.getText_fromCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.PLANNED_FINISH).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("A1finish", $ele1.text())
            cy.log(Cypress.env("A1finish"))
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
        cy.wait(2000) //required wait to load page
    })

    it("TC - Create Estimate Header", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
        cy.wait(2000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
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
        cy.wait(2000) //required wait to load page
    });

    it("TC - Create new line item recordfor created estimate", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        cy.wait(1000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
    });

    it("TC - Create new record in resource for cost code and generate budget", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.minimizeContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS);
        cy.wait(2000); //required wait to load page
        _common.select_allContainerData(cnt.uuid.RESOURCES);
    });

    it("TC - Create a Material Package from the Estimate Line items, and Add Activity in created Schedule.", function () {
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _common.waitForLoaderToDisappear()
        _package.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
        cy.wait(2000); //required wait to load page
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE)
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        cy.wait(2000); //required wait to load page
        _common.getText_fromCell(cnt.uuid.PACKAGE, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PackageCode", $ele1.text())
            cy.log(Cypress.env("PackageCode"))
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        cy.SAVE().then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.ACTIVITY_FK, Cypress.env("Act1Code"))
            _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.PLANNED_START, Cypress.env("A1Start"))
            _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.PLANNED_END, Cypress.env("A1finish"))
        })
        cy.SAVE()
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        cy.wait(2000); //required wait to load page
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        cy.wait(2000); //required wait to load page
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 3);
            _common.search_inSubContainer(cnt.uuid.SCHEDULES,SCH_DESC)
        })
        _common.goToButton_inActiveRow(cnt.uuid.SCHEDULES, app.GridCells.CODE, btn.IconButtons.ICO_SCHEDULING);
        cy.wait(2000); //required wait to load page
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
            _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _schedulePage.enterDataTo_CreateScheduleActivity(SCH_ITEM2, CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY, CONTAINERS_ACTIVITY_STRUCTURE.UOM, _common.getDate("incremented", 5), _common.getDate("incremented", 10))
        cy.SAVE()
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, SCH_ITEM2)
        _common.getText_fromCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Act2Code", $ele1.text())
            cy.log(Cypress.env("Act2Code"))
        })
        _common.getText_fromCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.PLANNED_DURATION).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("A2plannedduration", $ele1.text())
            cy.log(Cypress.env("A2plannedduration"))
        })
        _common.getText_fromCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.PLANNED_START).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("A2Start", $ele1.text())
            cy.log(Cypress.env("A2Start"))
        })
        _common.getText_fromCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.PLANNED_FINISH).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("A2finish", $ele1.text())
            cy.log(Cypress.env("A2finish"))
        })
    })

    it("TC - Create a Procurement Contract from the BoQ package.", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE, Cypress.env("PackageCode"))
        _common.select_rowHasValue(cnt.uuid.PACKAGE, Cypress.env("PackageCode"))
        _common.edit_dropdownCellWithCaret(cnt.uuid.PACKAGE, app.GridCells.ACTIVITY_FK, commonLocators.CommonKeys.GRID, Cypress.env("Act2Code"))
        cy.SAVE()
        _common.clickOn_modalFooterButton(Buttons.ButtonText.ACCEPT)
        cy.SAVE()
        cy.wait(3000)/* This wait here is mandatory as values take time to reflect.*/
        cy.REFRESH_CONTAINER()
        _common.select_rowHasValue(cnt.uuid.PACKAGE, Cypress.env("PackageCode"))
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_DATE);
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.wait(1000) //required wait to load page
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    })

    it("TC - Verify Updated Activity and Dates in the Package.", function () {
        cy.SAVE().then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.ACTIVITY_FK, Cypress.env("Act2Code"))
            _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.PLANNED_START, Cypress.env("A2Start"))
            _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.PLANNED_FINISH, Cypress.env("A2finish"))
        })
    })

    after(() => {
        cy.LOGOUT();
    })
});





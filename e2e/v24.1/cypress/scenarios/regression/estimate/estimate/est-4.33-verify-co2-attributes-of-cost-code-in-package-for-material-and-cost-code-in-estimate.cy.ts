import { commonLocators, app, tile, sidebar, cnt, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _estimatePage, _package, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const EST_CODE = "EST-CODE-" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "P-EST-4.21-" + Cypress._.random(0, 999);
const PRJ_NAME = "PRJ-EST-4.21-" + Cypress._.random(0, 999);
const LI_DESC = "LI-DESC-" + Cypress._.random(0, 999);

let CONTAINERS_PROJECT, CONTAINERS_COST_CODES, CONTAINERS_ESTIMATE, CONTAINERS_RESOURCE;

let CONTAINER_COLUMNS_COST_CODES, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCE, CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM, CONTAINER_COLUMNS_ESTIMATE_RESOURCE;

let PROJECT_PARAMETERS: DataCells, ESTIMATE_PARAMETERS: DataCells, RESOURCE1_PARAMETERS: DataCells, RESOURCE2_PARAMETERS: DataCells;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 4.33 | Verify CO2 attributes of cost codes in package (created with selection criteria  - material & cost code) from estimate")

describe("EST- 4.33 | Verify CO2 attributes of cost codes in package (created with selection criteria  - material & cost code) from estimate", () => {

    before(function () {

        cy.fixture("estimate/est-4.33-verify-co2-attributes-of-cost-code-in-package-for-material-and-cost-code-in-estimate.json").then((data) => {
            this.data = data
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
            };
            CONTAINERS_COST_CODES = this.data.CONTAINERS.COST_CODES;
            CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            };
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM;
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCES;
            RESOURCE1_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.COST_CODE[0],
            };
            RESOURCE2_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.COST_CODE[1],
            };
            CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM = this.data.CONTAINER_COLUMNS.ESTIMATE_LINE_ITEM;
            CONTAINER_COLUMNS_ESTIMATE_RESOURCE = this.data.CONTAINER_COLUMNS.ESTIMATE_RESOURCES;
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        })
    });
    
    after(() => {
        cy.LOGOUT();
    });

    it('TC - Pre-Conditions : Add CO2 project value to records and Cost Code Module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODES.co2project, CONTAINER_COLUMNS_COST_CODES.descriptioninfo], cnt.uuid.COST_CODES)
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.CO2_PROJECT_VALUE[0])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.getText_fromCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CostCode_CO2_Value", $ele1.text())
            cy.log(Cypress.env("CostCode_CO2_Value"))
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.COST_CODES, CONTAINERS_COST_CODES.COST_CODE[1])
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.CO2_PROJECT_VALUE[1])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE[1])
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.getText_fromCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CostCode_CO2_Value", $ele1.text())
            cy.log(Cypress.env("CostCode_CO2_Value"))
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Create new estimate header.', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(Sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create new line item and assign resource to it.', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.co2projecttotal, CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo], cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, LI_DESC)
        cy.SAVE()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.co2project, CONTAINER_COLUMNS_RESOURCE.descriptioninfo], cnt.uuid.RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE1_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2Item1", $ele1.text())
            cy.log(Cypress.env("CO2Item1"))
        })
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE2_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2Item2", $ele1.text())
            cy.log(Cypress.env("CO2Item2"))
        })
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_PROJECT_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2TotalLineItem", $ele1.text())
            cy.log(Cypress.env("CO2TotalLineItem"))
        })
    });

    it('TC - Create a Material Package with Material and Cost Code selection criteria.', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _package.enterRecord_toCreatePackage_wizard(commonLocators.CommonLabels.PROCUREMENT_STRUCTURE_SMALL)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(Sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME)
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify the CO2 attributes of added Cost Codes in Estimate Line item and Estimate Resources container in Package Module.', function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINE_ITEM, app.FooterTab.ESTIMATELINEITEM, 1);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINE_ITEM, CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM.co2projecttotal, CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM.co2totalvariance, CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM.descriptioninfo], cnt.uuid.ESTIMATE_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINE_ITEM)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINE_ITEM)
        _validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.ESTIMATE_LINE_ITEM, Cypress.env("CO2Item1"), Cypress.env("CO2Item2"), app.GridCells.CO2_PROJECT_TOTAL)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINE_ITEM, app.GridCells.CO2_PROJECT_TOTAL, Cypress.env("CO2TotalLineItem"))
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_RESOURCE, app.FooterTab.ESTIMATE_RESOURCE, 3);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_RESOURCE, CONTAINER_COLUMNS_ESTIMATE_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ESTIMATE_RESOURCE.co2project, CONTAINER_COLUMNS_ESTIMATE_RESOURCE.co2source, CONTAINER_COLUMNS_ESTIMATE_RESOURCE.estresourcetypefkextend], cnt.uuid.ESTIMATE_RESOURCE)
        });
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINE_ITEM, app.FooterTab.ESTIMATELINEITEM, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINE_ITEM)
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINE_ITEM, LI_DESC)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_RESOURCE, app.FooterTab.ESTIMATELINEITEM, 1);
        });
        cy.wait(1000).then(() => {
            _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_RESOURCE, app.GridCells.DESCRIPTION_INFO, CONTAINERS_RESOURCE.COST_CODE[0])
            _common.waitForLoaderToDisappear()
            _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_RESOURCE, app.GridCells.CO2_PROJECT, Cypress.env("CO2Item1"))
            _common.waitForLoaderToDisappear()
            _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_RESOURCE, app.GridCells.DESCRIPTION_INFO, CONTAINERS_RESOURCE.COST_CODE[1])
            _common.waitForLoaderToDisappear()
            _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_RESOURCE, app.GridCells.CO2_PROJECT, Cypress.env("CO2Item2"))
        })
    })

})
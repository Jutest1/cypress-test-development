import { tile, commonLocators, app, cnt, btn, sidebar } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _estimatePage, _package, _projectPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface()
const PRJ_NO = "PRC1" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ1-" + Cypress._.random(0, 9999);
const EST_CODE_01 = '1' + Cypress._.random(0, 999);
const EST_HEADER_01 = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LI_DESC" + Cypress._.random(0, 999);

let CONTAINERS_PROJECT, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCE;

let CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCE, CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMEMT, CONTAINER_COLUMNS_PACKAGE, CONTAINER_COLUMNS_ITEM_ASSIGNMENT;

let PROJECTS_PARAMETERS: DataCells, ESTIMATE_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS: DataCells, RESOURCE_PARAMETERS: DataCells;

let MODAL_REMOVE_PACKAGE: DataCells;

let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.72 | Remove material package from estimate wizard")
describe("PCM- 2.72 | Remove material package from estimate wizard", () => {

    before(function () {

        cy.fixture("pcm/pcm-2.72-remove-material-package-from-estimate-wizard.json").then((data) => {
            this.data = data
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
            }
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE,
                CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE,
                ESTIMATE_PARAMETERS = {
                    [app.GridCells.CODE]: EST_CODE_01,
                    [app.GridCells.DESCRIPTION_INFO]: EST_HEADER_01,
                    [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                    [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
                }
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
            };
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL[0],
            };
            MODAL_CREATE_UPDATE_MATERIAL_PACKAGE = this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMEMT = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM_ASSIGNMEMT
            CONTAINER_COLUMNS_ITEM_ASSIGNMENT = this.data.CONTAINER_COLUMNS.ITEM_ASSIGNMENT
            MODAL_REMOVE_PACKAGE = {
                [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: commonLocators.CommonLabels.ENTIRE_ESTIMATE,
                [commonLocators.CommonLabels.SELECT_PACKAGES]: { [Cypress.env("PACKAGE_CODE")]: CommonLocators.CommonKeys.CHECK }
            }

        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS)
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS)
            cy.SAVE()

            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
        });
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create an estimate header and line item with resource.", function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
        cy.SAVE()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 0);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS)
        cy.SAVE()
    });

    it('TC - Create a Material Package', function () {
        _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _package.create_materialPackage_Consolidatedchkbox(CommonLocators.CommonLabels.ENTIRE_ESTIMATE, MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.SCOPE_ID, CommonLocators.CommonKeys.MATERIAL_AND_COST_CODE, CONTAINERS_RESOURCE.MATERIAL[0])
        cy.SAVE()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
        });
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME)
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
        _common.getText_fromCell(cnt.uuid.PACKAGE, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PACKAGE_CODE", $ele1.text())
        })
    })

    it("TC- Remove package from estimate Wizard", function () {
        MODAL_REMOVE_PACKAGE = {
            [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: commonLocators.CommonLabels.ENTIRE_ESTIMATE,
            [commonLocators.CommonLabels.SELECT_PACKAGES]: { [Cypress.env("PACKAGE_CODE")]: CommonLocators.CommonKeys.CHECK }
        }
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.search_inSubContainer(cnt.uuid.ESTIMATE, EST_HEADER_01)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION)
        _common.select_rowInSubContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PACKAGE_ASSIGNMENTS, Cypress.env("PACKAGE_CODE"))
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REMOVE_PACKAGE);
        cy.wait(1000).then(() => {
            _package.removePackage_wizardOptionInEstimate(MODAL_REMOVE_PACKAGE)
        })
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION)
        _common.select_rowInSubContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PACKAGE_ASSIGNMENTS, Cypress.env("PACKAGE_CODE"))
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.select_rowInSubContainer(cnt.uuid.RESOURCES)
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.RESOURCES, app.GridCells.PACKAGE_ASSIGNMENTS, Cypress.env("PACKAGE_CODE"))
    })

    it("TC- Delete record in package item assignment container in estimate module to remove package ", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.FooterTab.PACKAGE_ITEM_ASSIGNMENT, 2);
            _common.setup_gridLayout(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMEMT);
            _common.clear_subContainerFilter(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        });
        _common.create_newRecord(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.PRC_PACKAGE_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("PACKAGE_CODE"))
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.EST_RESOURCE_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.MATERIAL[0])
        cy.SAVE()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        })
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PACKAGE_ASSIGNMENTS, Cypress.env("PACKAGE_CODE"))
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.FooterTab.PACKAGE_ITEM_ASSIGNMENT, 2);
        })
        _common.search_inSubContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, Cypress.env("PACKAGE_CODE"))
        _common.delete_recordFromContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        })
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PACKAGE_ASSIGNMENTS, Cypress.env("PACKAGE_CODE"))

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        })
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.select_rowInSubContainer(cnt.uuid.RESOURCES)
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.RESOURCES, app.GridCells.PACKAGE_ASSIGNMENTS, Cypress.env("PACKAGE_CODE"))
    });

    it("TC- delete record in item assignment container in package module to remove package", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.FooterTab.PACKAGE_ITEM_ASSIGNMENT, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.create_newRecord(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.PRC_PACKAGE_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("PACKAGE_CODE"))
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.EST_RESOURCE_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.MATERIAL[0])
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
        });
        _common.search_inSubContainer(cnt.uuid.PACKAGE, Cypress.env("PACKAGE_CODE"))
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEM_ASSIGNMENT, app.FooterTab.ITEM_ASSIGNMENT, 3);
            _common.setup_gridLayout(cnt.uuid.ITEM_ASSIGNMENT, CONTAINER_COLUMNS_ITEM_ASSIGNMENT);
        });
        _common.search_inSubContainer(cnt.uuid.ITEM_ASSIGNMENT, CONTAINERS_RESOURCE.MATERIAL[0])
        _common.select_rowInContainer(cnt.uuid.ITEM_ASSIGNMENT)
        _common.delete_recordFromContainer(cnt.uuid.ITEM_ASSIGNMENT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ESTIMATE);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION)
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PACKAGE_ASSIGNMENTS, Cypress.env("PACKAGE_CODE"))
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
        });
        _common.select_rowInSubContainer(cnt.uuid.RESOURCES)
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.RESOURCES, app.GridCells.PACKAGE_ASSIGNMENTS, Cypress.env("PACKAGE_CODE"))
    });

});
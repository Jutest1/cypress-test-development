import { _projectPage, _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _materialPage, _procurementContractPage } from "cypress/pages";
import { app, tile, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import Buttons from "cypress/locators/buttons";
import { EST_HEADER } from "cypress/pages/variables";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK = "HS";
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);
const EST_DESCRIPTION = 'EST_DESCRIPTION'
let PROJECTS_PARAMETERS

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
let CONTAINER_COLUMNS_ITEM_GRID

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 4.25 | Verify CO2 attrubutes for a newly added material from material package to estimate")

describe("EST- 4.25 | Verify CO2 attrubutes for a newly added material from material package to estimate", () => {

    beforeEach(function () {
        cy.fixture("estimate/est-4.25-verify-updated-CO2-attributes-for-a-particular-material-from-requisition-to-estimate.json").then((data) => {
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
        cy.fixture("estimate/est-4.25-verify-updated-CO2-attributes-for-a-particular-material-from-requisition-to-estimate.json").then((data) => {
            this.data = data

            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEMS
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            MODAL_PACKAGE = this.data.MODAL.PACKAGE
            CONTAINER_COLUMNS_ITEM_GRID = this.data.CONTAINER_COLUMNS.ITEM_GRID
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
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL_CODE,
            }
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]: CLERK
            }
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


    it('TC - Create new estimate header.', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        cy.wait(3000) //required wait to load page
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE, app.GridCells.DESCRIPTION_INFO, EST_DESCRIPTION, EST_HEADER)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()

    });
    it('TC - Create new line item and assign resource to it.', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
        });
        _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.co2project], cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, MATERIAL_RESOURCE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
    });
    it('TC - Create a Material Package, add item having CO2 attribute, and Update Estimate using wizard.', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
        _package.create_materialPackage_Consolidatedchkbox(MODAL_PACKAGE.SCOPE, MODAL_PACKAGE.SCOPE_ID, MODAL_PACKAGE.CRITERIA_SELECTION, CONTAINERS_RESOURCE.MATERIAL_CODE)
        //_package.create_materialPackage_Consolidatedchkbox(MODAL_PACKAGE.SCOPE, MODAL_PACKAGE.SCOPE_ID, MODAL_PACKAGE.CRITERIA_SELECTION, CONTAINERS_RESOURCE.MATERIAL)
        // _estimatePage.enterRecord_toCreatePackage_wizard( CONTAINERS_RESOURCE.MATERIAL_CODE)
        cy.wait(2000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        })

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION)
        _procurementConfig.changeProcurementConfiguration_FromWizard(MODAL_PACKAGE.CONFIGURATION_INPUT, btn.ButtonText.YES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS)
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
        _common.waitForLoaderToDisappear()

    }),
        it('TC - Create requistion.', function () {
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
            _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
            _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
            cy.SAVE();
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.MAIN).then(() => {
                _common.setDefaultView(app.TabBar.MAIN)
                _common.waitForLoaderToDisappear()
                _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 2);
            });
            
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
            _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
            _common.openTab(app.TabBar.MAIN).then(() => {
                _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS);
                _common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_ITEM_GRID)
            })

            _common.search_inSubContainer(cnt.uuid.REQUISITIONITEMS, CONTAINERS_RESOURCE.MATERIAL_CODE)
            _common.enterRecord_inNewRow(cnt.uuid.REQUISITIONITEMS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.VALUE)
            cy.SAVE()
            cy.wait(1000)//Required Wait
            cy.SAVE()
        }),
        it('TC - Update the Estimate and verify co2 value in ', function () {
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
            _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE)
            _common.clickOn_checkboxByLabel_fromModal(commonLocators.CommonElements.PLATFORM_COL, MODAL_PACKAGE.UPDATE_ESTIMATE_UNCHECK_OPTION, 0)
            _common.clickOn_modalFooterButton(btn.ButtonText.OK)
            cy.wait(3000)/*This wait is mandatory here, as modal takes time to popup.*/
            _common.clickOn_modalFooterButton(btn.ButtonText.OK)
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            cy.SAVE()
        });

    it('TC - Verify the CO2 of added material in Estimate..', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ESTIMATE)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
            _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
            _common.select_rowInContainer(cnt.uuid.RESOURCES)
        });
        _common.assert_forNumericValues(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT, CONTAINERS_RESOURCE.VALUE)
    })

})


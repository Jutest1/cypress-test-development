import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _controllingUnit, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView, _modalView, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const PACKAGEDESC = "PKGDESC-1" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQ-STR-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const PRICE = 'PRICE'

let BOQ_PARAMETERS: DataCells,
    BOQ_STRUCTURE_PARAMETERS: DataCells,
    ESTIMATE_PARAMETERS: DataCells,
    GENERATE_LINE_ITEMS_PARAMETERS: DataCells,
    RESOURCE_PARAMETERS: DataCells

let CONTAINER_COLUMNS_BOQ,
    CONTAINER_COLUMNS_BOQ_STRUCTURE,
    CONTAINERS_BOQ_STRUCTURE,
    CONTAINERS_ESTIMATE,
    CONTAINER_COLUMNS_ESTIMATE,
    CONTAINER_COLUMNS_LINE_ITEM,
    CONTAINERS_LINE_ITEM,
    CONTAINERS_RESOURCE,
    CONTAINER_COLUMNS_RESOURCE,
    CONTAINER_PACKAGE,
    CONTAINER_COLUMNS_PACKAGE,
    CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE,
    CONTAINER_COLUMNS_ITEMS

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 1.19 | Copy unit rate to Budget/unit to BOQ package");

describe("PCM- 1.19 | Copy unit rate to Budget/unit to BOQ package", () => {
    before(function () {
        cy.fixture("pcm/pcm-1.19-copy-unit-rate-to-budget-unit-to-boq-package.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
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
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
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
            CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.PACKAGE_BOQ_STRUCTURE
            CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
              _common.setDefaultView(app.TabBar.PROJECT)
              _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
              _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
              _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env("PROJECT_NUMBER")).pinnedItem();
            });
        })

    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Create new BoQ header and BoQ structure', function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.setDefaultView(app.TabBar.BOQS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.maximizeContainer(cnt.uuid.BOQS)
        _common.create_newRecord(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.BOQS)
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create new estimate and generate line item and assign resource', function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
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
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
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

    it('TC - Verify Create BoQ Package', function () {
        //cy.wait(20000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
        cy.wait(2000) //required wait to load page
        _package.enterRecord_toCreateBoQPackage_FromWizard("BoQ", CONTAINER_PACKAGE.ESTIMATE_SCOPE, CONTAINER_PACKAGE.GROUPING_STRUCTURE, CONTAINER_PACKAGE.PROCUREMENT_STRUCTURE)
        _common.openTab(app.TabBar.PACKAGE).then(function () {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.create_newRecord(cnt.uuid.PACKAGE)
        _package.enterRecord_toCreatePackage(commonLocators.CommonKeys.MATERIAL, PACKAGEDESC)
        cy.wait(1000)//required wait to load page
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.PACKAGE, PACKAGEDESC)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_ITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
        _common.create_newRecord(cnt.uuid.PACKAGEITEMS)
        _common.enterRecord_inNewRow(cnt.uuid.PACKAGEITEMS, app.GridCells.MDC_MATERIAL_FK, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PACKAGE.MATERIAL)
        _mainView.select_popupItem(commonLocators.CommonKeys.GRID, CONTAINER_PACKAGE.MATERIAL)
        cy.wait(1000)//required wait to load page
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.PACKAGE_STATUS_FK, commonLocators.CommonKeys.RECORDED)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.COPY_UNIT_RATE_TO_BUDGET_PER_UNIT);
        cy.wait(2000)//required wait to load page
        _modalView.findModal().acceptButton("OK")
        cy.wait(500).then(()=>{
            _common.search_inSubContainer(cnt.uuid.PACKAGE, Cypress.env("Package_Code"))
            _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.PACKAGE_STATUS_FK, commonLocators.CommonKeys.RECORDED)
        })
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 7);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE)
        });
        cy.wait(3000) //required wait to load page
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.COPY_UNIT_RATE_TO_BUDGET_PER_UNIT);
        cy.wait(2000) //required wait to load page
        _modalView.findModal().acceptButton("Yes")
        _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTURE, app.GridCells.TREE, app.GridCells.ICO_BOQ_ITEM)
        _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURE, app.GridCells.PRICE_SMALL, PRICE)
    })

    it('TC - Verify Copy unit rate to Budget/unit to BOQ package', function () {
        cy.wait(500).then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BUDGET_PER_UNIT, Cypress.env(PRICE))
        })
    })
})
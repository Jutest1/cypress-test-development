import { _common,  _sidebar, _controllingUnit,_package,_rfqPage,_mainView, _validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();
// VARIABLES----------------------------------------------------------------


const CU_DESCRIPTION = 'CU-DESC-' + Cypress._.random(0, 999);


let CONTROLLING_UNIT_PARAMETERS:DataCells
let CONTAINER_COLUMNS_ITEM;
let CONTAINERS_CONTROLLING_UNIT;
let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_PACKAGE;
let CONTAINER_COLUMNS_PACKAGE;
let CONTAINERS_ITEM

const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"

const PACKAGEDESC = "PKGDESC-1" + Cypress._.random(0, 999);
allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.37 | Create a Material Package directly from Package module")
describe("PCM- 2.37 | Create a Material Package directly from Package module", () => {
    before(function () {
        cy.fixture('pcm/pcm-2.37-create-a-material-package-directly-from-package-module.json').then((data) => {
            this.data = data;
           
           
            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT;
           
            CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
            CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
            CONTAINERS_ITEM = this.data.CONTAINERS.ITEM
            CONTAINER_COLUMNS_ITEM = this.data.CONTAINER_COLUMNS.ITEM

            CONTROLLING_UNIT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: CU_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM,
            };

        });

        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
});

after(() => {
        cy.LOGOUT();
});


it('TC - Create new controlling unit', function () {
		
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER'))
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
        _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
    });
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
    _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
    cy.SAVE( )
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasValue(cnt.uuid.CONTROLLING_UNIT,app.GridCells.DESCRIPTION_INFO,CU_DESCRIPTION)
    _common.waitForLoaderToDisappear()
   _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE, "CNTSUBCODE")
   cy.log(Cypress.env("CNTSUBCODE"))
    _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
   
});
it('TC - Create a Material Package directly from Package module', function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
    /* Pre-Condition Steps */

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    _common.waitForLoaderToDisappear()

    /* Creation of Package */

    _common.openTab(app.TabBar.PACKAGE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
    });
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.PACKAGE)
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    _common.create_newRecord(cnt.uuid.PACKAGE);
    _package.enterRecord_toCreatePackage(CONTAINERS_PACKAGE.CONFIGURATION,PACKAGEDESC);
    cy.SAVE();
     _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL,commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT,Cypress.env("CNTSUBCODE"))
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.minimizeContainer(cnt.uuid.PACKAGE)
    _common.search_inSubContainer(cnt.uuid.PACKAGE, PACKAGEDESC)

    _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1);
            _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_ITEM)
    })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
        _common.create_newRecord(cnt.uuid.PACKAGEITEMS)
        _common.enterRecord_inNewRow(cnt.uuid.PACKAGEITEMS, app.GridCells.MDC_MATERIAL_FK, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEM.MATERIAL1)
        _common.waitForLoaderToDisappear()
        _mainView.select_popupItem(commonLocators.CommonKeys.GRID, CONTAINERS_ITEM.MATERIAL1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.maximizeContainer(cnt.uuid.PACKAGEITEMS)
        cy.REFRESH_SELECTED_ENTITIES()
        _common.search_inSubContainer(cnt.uuid.PACKAGEITEMS, CONTAINERS_ITEM.CELL_1)
        _common.enterRecord_inNewRow(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEM.QUANTITY1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
        _common.minimizeContainer(cnt.uuid.PACKAGEITEMS)
        _common.create_newRecord(cnt.uuid.PACKAGEITEMS)
        _common.enterRecord_inNewRow(cnt.uuid.PACKAGEITEMS, app.GridCells.MDC_MATERIAL_FK, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEM.MATERIAL2)
        _common.waitForLoaderToDisappear()

        _mainView.select_popupItem(commonLocators.CommonKeys.GRID, CONTAINERS_ITEM.MATERIAL2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.maximizeContainer(cnt.uuid.PACKAGEITEMS)
        cy.REFRESH_SELECTED_ENTITIES()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGEITEMS, app.GridCells.ITEM_NO, CONTAINERS_ITEM.CELL_2)
        _common.enterRecord_inNewRow(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEM.QUANTITY2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.PACKAGEITEMS)
        _common.waitForLoaderToDisappear()
        _common.perform_additionOfCellData(cnt.uuid.PACKAGEITEMS, app.GridCells.TOTAL)

        _common.minimizeContainer(cnt.uuid.PACKAGEITEMS)
        
    })

    it('TC - Verify Total of the items with net value in totals container', function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TOTALS, app.FooterTab.TOTALS, 1);
            _common.waitForLoaderToDisappear()
            _common.select_rowHasValue(cnt.uuid.TOTALS, commonLocators.CommonKeys.TOTAL)
            _common.waitForLoaderToDisappear()
            _common.assert_forNumericValues(cnt.uuid.TOTALS, app.GridCells.VALUE_NET, Cypress.env("AdditionOfColumnValues").toString())
        })
    
    })
})
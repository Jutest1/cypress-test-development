import { _common, _controllingUnit, _package, _sidebar, _mainView, _validate, _modalView, _projectPage, _estimatePage, _boqPage } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators, btn } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const ALLURE = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const BOQSTR_COPY = "BOQST_COPY_DESC-" + Cypress._.random(0, 999);
const BOQST_COPY_REFERENCE = "BOQST_COPY-" + Cypress._.random(0, 999);
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC" + Cypress._.random(0, 999);
const PROJECT_NOA = "PRA" + Cypress._.random(0, 999);
const PROJECT_DESCA = "PRDESCA" + Cypress._.random(0, 999);

let MODAL_PROJECTS
let PROJECTS_PARAMETERS:DataCells;
let PROJECTS_PARAMETERSA:DataCells

let BOQ_PARAMETERS: DataCells;
let BOQ_STRUCTURE_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_BOQS,
    CONTAINERS_BOQ_STRUCTURE,
    CONTAINER_COLUMNS_BOQ_STRUCTURE;

let ESTIMATE_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_RESOURCE;

let CONTAINERS_BOQ_PACKAGE
let CONTAINER_COLUMNS_BOQ_PACKAGE

ALLURE.epic("CUSTOMER DEFECTS");
ALLURE.feature("Mainka Defects");
ALLURE.story('MD- 26576 | Project no, Reference no and Outline Specification should get change only in the copied package');

describe('MD- 26576 | Project no, Reference no and Outline Specification should get change only in the copied package', () => {

	before(function () {
		cy.fixture('customer-defects/md-26576-project-no-reference-no-and-outline-specification-should-get-change-only-in-the-copied-package.json').then((data) => {
			this.data = data;
            CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
            CONTAINERS_BOQ_PACKAGE = this.data.CONTAINERS.BOQ_PACKAGE
            CONTAINER_COLUMNS_BOQ_PACKAGE = this.data.CONTAINER_COLUMNS.BOQ_PACKAGE

            BOQ_PARAMETERS = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
            }
            BOQ_STRUCTURE_PARAMETERS = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQSTRUCT_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY,
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
            }
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            LINE_ITEM_PARAMETERS = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
            },
           
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            }
                
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
                    [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
                    [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
                    [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }
            PROJECTS_PARAMETERSA={
                [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NOA,
                [commonLocators.CommonLabels.NAME]:PROJECT_DESCA,
                [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERKA
            }
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERSA);
            _common.waitForLoaderToDisappear()
            cy.SAVE();          
            _common.waitForLoaderToDisappear()
        });
     
    });
	
	after(() => {
		cy.LOGOUT();
	});

    it("TC - Create Project", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();          
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
		_common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        });
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create BOQ header and BOQ structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.maximizeContainer(cnt.uuid.BOQS)
        _common.create_newRecord(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.BOQS)
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        cy.wait(1000) //required wait to load page
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create new estimate record', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        _common.waitForLoaderToDisappear()
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
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        cy.wait(1000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
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
        cy.wait(1000) //required wait to load page
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()   
    });
           
    it("TC - Create boq package from wizards option", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
        cy.wait(2000)// required wait to enable fields in modal
        _common.waitForLoaderToDisappear()
        _package.enterRecord_toCreateBoQPackage_FromWizard(CONTAINERS_BOQ_PACKAGE.BOQ, CONTAINERS_BOQ_PACKAGE.ESTIMATE_SCOPE, CONTAINERS_BOQ_PACKAGE.GROUPING_STRUCTURE, CONTAINERS_BOQ_PACKAGE.PROCUREMENT_STRUCTURE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Copy package in package module", function () {
        _common.select_activeRowInContainer(cnt.uuid.PACKAGE)
        _common.clickOn_toolbarButton(cnt.uuid.PACKAGE,btn.ToolBar.ICO_COPY_PASTE_DEEP)
        _common.select_activeRowInContainer(cnt.uuid.PACKAGE)
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE,app.GridCells.PROJECT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,PROJECT_NOA)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PACKAGE,PROJECT_NOA)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE_DETAILS,app.FooterTab.PACKAGEDETAILS);
        });
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE,app.FooterTab.BOQ_STRUCTURE);
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE,CONTAINERS_BOQ_PACKAGE.ROOT)
        _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURE,app.GridCells.REFERENCE,app.InputFields.DOMAIN_TYPE_DESCRIPTION,BOQST_COPY_REFERENCE)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE,BOQSTRUCT_DESC)
        _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL,app.InputFields.DOMAIN_TYPE_TRANSLATION,BOQSTR_COPY)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Assert Project no, Reference no and Outline specification", function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
            _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PACKAGE,PROJECT_NO)
        _common.assert_cellData(cnt.uuid.PACKAGE,app.GridCells.PROJECT_FK,PROJECT_NO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE_DETAILS,app.FooterTab.PACKAGEDETAILS);
        });
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE);
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE,CONTAINERS_BOQ_PACKAGE.ROOT)
        _validate.assert_cellData_not_equal(cnt.uuid.BOQ_STRUCTURE,app.GridCells.REFERENCE,BOQST_COPY_REFERENCE)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE,BOQSTRUCT_DESC)
        _common.waitForLoaderToDisappear()
        _validate.assert_cellData_not_equal(cnt.uuid.BOQ_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL,BOQSTR_COPY)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });
});

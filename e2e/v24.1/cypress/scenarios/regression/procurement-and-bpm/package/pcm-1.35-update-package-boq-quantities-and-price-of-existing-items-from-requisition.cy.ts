import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const TAX_CODE_BOQ = "TAX_CODE_BOQ-" + Cypress._.random(0, 999);
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const QUANTITY = "QUANTITY-" + Cypress._.random(0, 999);
const UNITRATE = "UNITRATE-" + Cypress._.random(0, 999);
const FINALPRICE = "FINALPRICE-" + Cypress._.random(0, 999);
const BOQ_OUTLINE = "BOQ_OUTLINE-" + Cypress._.random(0, 999);
const PACKAGE_CONTROLLING_UNIT = "PACKAGE_CONTROLLING_UNIT-" + Cypress._.random(0, 999);
const PROCUREMENT_STRUCTURE = "PROCUREMENT_STRUCTURE-" + Cypress._.random(0, 999);

let BOQ_PARAMETERS: DataCells,
    BOQ_STRUCTURE_PARAMETERS: DataCells,
    ESTIMATE_PARAMETERS: DataCells,
    GENERATE_LINE_ITEMS_PARAMETERS: DataCells,
    RESOURCE_PARAMETERS: DataCells

let CONTAINER_COLUMNS_BOQS,
    CONTAINERS_BOQ_STRUCTURE,
    CONTAINER_COLUMNS_BOQ_STRUCTURE,
    CONTAINERS_ESTIMATE,
    CONTAINER_COLUMNS_ESTIMATE,
    CONTAINER_PACKAGE,
    CONTAINER_COLUMNS_PACKAGE,
    CONTAINER_COLUMNS_REQUISITION,
    MODAL_UPDATE_BOQ_PACKAGE,
    CONTAINER_PACKAGE_BOQ,
    CONTAINER_COLUMNS_PACKAGE_BOQ,
    CONTAINER_COLUMNS_RESOURCE,
    CONTAINERS_RESOURCE


allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 1.35 | Update package boq quantities and price of existing items from requisition");
describe("PCM- 1.35 | Update package boq quantities and price of existing items from requisition", () => {
    before(function () {
        cy.fixture("pcm/pcm-1.35-update-package-boq-quantities-and-price-of-existing-tems-from-requisition.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
            MODAL_UPDATE_BOQ_PACKAGE = this.data.MODAL.UPDATE_BOQ_PACKAGE
            CONTAINER_PACKAGE_BOQ = this.data.CONTAINERS.PACKAGE_BOQ
            CONTAINER_COLUMNS_PACKAGE_BOQ = this.data.CONTAINER_COLUMNS.PACKAGE_BOQ
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
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
            GENERATE_LINE_ITEMS_PARAMETERS = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
            }
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
            }
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
        });
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create BOQ header and BOQ structure", function () {
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
        cy.SAVE()
        cy.wait(2000) //required wait to load page
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create new estimate header record and generate line item", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        cy.wait(1000) //required wait to load page
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        cy.wait(1000) //required wait to load page
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
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create new record in resource", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        cy.wait(2000)// REQUIRED WAIT TO PASS THE TEST
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create BoQ package and change Package Status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
        cy.wait(2000) //required wait to load page
        _package.enterRecord_toCreateBoQPackage_FromWizard(CONTAINER_PACKAGE.BOQ, CONTAINER_PACKAGE.ESTIMATE_SCOPE, CONTAINER_PACKAGE.GROUPING_STRUCTURE, CONTAINER_PACKAGE.PROCUREMENT_STRUCTURE)
        _common.openTab(app.TabBar.PACKAGE).then(function () {
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
        cy.wait(2000) //required wait to load page

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
        _common.clickOn_modalFooterButton("Go To Requisition")
        cy.wait(2000) //required wait to load page
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        });
        _common.openTab(app.TabBar.REQUISITIONBOQS).then(() => {
            _common.setDefaultView(app.TabBar.REQUISITIONBOQS)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,
                                     CONTAINER_COLUMNS_BOQ_STRUCTURE.price,
                                     CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,
                                     CONTAINER_COLUMNS_BOQ_STRUCTURE.mdccontrollingunitfk,
                                     CONTAINER_COLUMNS_BOQ_STRUCTURE.prcstructurefk,
                                     CONTAINER_COLUMNS_BOQ_STRUCTURE.finalprice,
                                     CONTAINER_COLUMNS_BOQ_STRUCTURE.mdctaxcodefk],cnt.uuid.REQUISITIONBOQSTRUCTURE)
        });
        _common.maximizeContainer(cnt.uuid.REQUISITIONBOQSTRUCTURE);
        cy.REFRESH_CONTAINER();
        _common.select_rowInContainer(cnt.uuid.REQUISITIONBOQSTRUCTURE, 0)
        _common.edit_containerCell(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PACKAGE_BOQ.QUANTITY)
        _common.edit_containerCell(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PACKAGE_BOQ.UNIT_RATE)
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, BOQ_OUTLINE);
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PACKAGE_BOQ.CONTROLLING_UNIT)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.PRC_STRUCTURE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PACKAGE_BOQ.PROCUREMENT_STRUCTURE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, QUANTITY)
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.PRICE_SMALL, UNITRATE)
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL, FINALPRICE)
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_OUTLINE)
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.MDC_TAX_CODE_FK_SMALL, TAX_CODE_BOQ)
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, PACKAGE_CONTROLLING_UNIT)
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.PRC_STRUCTURE_FK, PROCUREMENT_STRUCTURE)
        cy.wait(4000) //** Application need time to load //  
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_PACKAGE_BOQ)
        _package.updatePackageBoQ_FromWizard(MODAL_UPDATE_BOQ_PACKAGE)
        cy.wait(2000) //required wait to load page
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        });
        _common.maximizeContainer(cnt.uuid.REQUISITIONS);
        _common.goToButton_inActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.REQ_STATUS_FK, btn.IconButtons.ICO_PACKAGE)
        cy.wait(2000) //required wait to load page
    })

    it("TC - Verify unit rate, quantity, final price, Outline Specification in package boq structure", function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_PACKAGE_BOQ)
            _common.set_columnAtTop([CONTAINER_COLUMNS_PACKAGE_BOQ.quantity,
                                     CONTAINER_COLUMNS_PACKAGE_BOQ.price,
                                     CONTAINER_COLUMNS_PACKAGE_BOQ.finalprice,
                                     CONTAINER_COLUMNS_PACKAGE_BOQ.briefinfo,
                                     CONTAINER_COLUMNS_PACKAGE_BOQ.mdccontrollingunitfk,
                                     CONTAINER_COLUMNS_PACKAGE_BOQ.prcstructurefk,
                                     CONTAINER_COLUMNS_PACKAGE_BOQ.mdctaxcodefk],cnt.uuid.REQUISITIONBOQSTRUCTURE)

        });
        _common.select_rowInContainer(cnt.uuid.BOQ_STRUCTURE, 0)
        _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, Cypress.env(QUANTITY));
        _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE, app.GridCells.PRICE_SMALL, Cypress.env(UNITRATE));
        _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL, Cypress.env(FINALPRICE));
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, Cypress.env(BOQ_OUTLINE));
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.MDC_TAX_CODE_FK_SMALL, Cypress.env(TAX_CODE_BOQ));
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.PRC_STRUCTURE_FK, Cypress.env(PROCUREMENT_STRUCTURE));
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, Cypress.env(PACKAGE_CONTROLLING_UNIT));
    })
})



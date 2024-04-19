import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _bidPage, _saleContractPage, _projectPage, _wipPage, _package } from "cypress/pages";
import { app, tile, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM, EST_HEADER } from "cypress/pages/variables";
import CommonLocators from "cypress/locators/common-locators";

const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-1-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQ-1-STR-" + Cypress._.random(0, 999);
const PRJ_NO = "SAM" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-SAM-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const NEW_PRJ_NO = "NEW_SAM_NO" + Cypress._.random(0, 999);
const NEW_BOQ_STRUCTURE_DESC = "NEW_BOQ_STRUCTURE_DESC-" + Cypress._.random(0, 999);
const NEW_PRJ_NAME = "NEW_PRJ_NAME" + Cypress._.random(0, 999);
const NEW_BOQ_DESC = "NEW_BOQ_DESC" + Cypress._.random(0, 999);
const PACKAGEBOQ_REFCD = 'R_CD_-' + Cypress._.random(0, 999);
const PACKAGEBOQ_REFDESC = 'R_PCKDESC_' + Cypress._.random(0, 999);
let CREATEPROJECT_PARAMETERS: DataCells;
let CONTAINERS_PROJECT
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEM
let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let GENERATE_LINE_ITEMS_PARAMETERS: DataCells
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_PARAMETERS: DataCells
let BOQ_STRUCTURE_PARAMETERS, SOURCE_WIC_BOQ_PARAMETERS: DataCells
let CONTAINERS_BOQ_STRUCTURE

let CONTAINER_COLUMNS_SOURCE_BOQS
let NEW_BOQ_PARAMETERS
let NEW_CREATEPROJECT_PARAMETERS
let NEW_BOQ_STRUCTURE_PARAMETERS
let CONTAINERS_SOURCE_WIC_BOQ;



ALLURE.epic("SALES");
ALLURE.feature("Sales-Package");
ALLURE.story("SAM- 1.31 | Copy package boq items from another project for material package");

describe("SAM- 1.31 | Copy package boq items from another project for material package", () => {

    before(function () {
        cy.fixture("sam/sam-1.31-copy-package-BoQ-items-from-another-project-for-material-package.json")
            .then((data) => {
                this.data = data;
                CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
                CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT;
                CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;

                CREATEPROJECT_PARAMETERS = {
                    [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                    [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                    [commonLocators.CommonLabels.CLERK]: CLERK_NAME
                };

                NEW_CREATEPROJECT_PARAMETERS = {
                    [commonLocators.CommonLabels.PROJECT_NUMBER]: NEW_PRJ_NO,
                    [commonLocators.CommonLabels.NAME]: NEW_PRJ_NAME,
                    [commonLocators.CommonLabels.CLERK]: CLERK_NAME
                };


                ESTIMATE_PARAMETERS = {
                    [app.GridCells.CODE]: ESTIMATE_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                    [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                    [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
                }

                CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
                CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
                RESOURCE_PARAMETERS = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
                };

                CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM

                GENERATE_LINE_ITEMS_PARAMETERS = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                    [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
                }

                CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
                CONTAINER_COLUMNS_SOURCE_BOQS = this.data.CONTAINER_COLUMNS.BOQ_SOURCE

                BOQ_PARAMETERS = {
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
                }

                NEW_BOQ_PARAMETERS = {
                    [app.GridCells.BRIEF_INFO_SMALL]: NEW_BOQ_DESC
                }

                CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE

                BOQ_STRUCTURE_PARAMETERS = {
                    [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                    [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
                }

                NEW_BOQ_STRUCTURE_PARAMETERS = {
                    [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                    [app.GridCells.BRIEF_INFO_SMALL]: NEW_BOQ_STRUCTURE_DESC,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                    [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
                }
                CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
                CONTAINERS_SOURCE_WIC_BOQ = this.data.CONTAINERS.SOURCE_WIC_BOQ;
                SOURCE_WIC_BOQ_PARAMETERS = {
                    [commonLocators.CommonLabels.COPY_FROM]: CONTAINERS_SOURCE_WIC_BOQ.PACKAGE_BOQ,
                    [commonLocators.CommonLabels.PROJECT]: PRJ_NO,
                    [commonLocators.CommonLabels.BOQ_SELECTION]: PACKAGEBOQ_REFCD
                }

            }).then(() => {
                cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.waitForLoaderToDisappear()
                _common.openTab(app.TabBar.PROJECT).then(() => {
                    _common.setDefaultView(app.TabBar.PROJECT)
                    _common.waitForLoaderToDisappear()
                    _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
                });

                _common.create_newRecord(cnt.uuid.PROJECTS);
                _projectPage.enterRecord_toCreateProject(CREATEPROJECT_PARAMETERS);  
                 cy.SAVE()
                 _common.waitForLoaderToDisappear()
                 cy.SAVE();
                 _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
                 _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
                 _common.waitForLoaderToDisappear()
            })
    })

        after(() => {
            cy.LOGOUT();
        })

    it("TC - Create BOQ header and BOQ structure", function () {
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
        _common.saveCellDataToEnv(cnt.uuid.BOQS, app.GridCells.BRIEF_INFO_SMALL, "BOQNAME", BOQ_ROOT_ITEM)
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
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL, "QUANTITY")
        _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURES, app.GridCells.PRICE_SMALL, "UNIT_PRICE")

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

    });

    it('TC - Create new estimate record', function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE, app.GridCells.DESCRIPTION_INFO, "ESTIMATE_DESCRIPTION", EST_HEADER)
    });
    it("TC - Generate boq line item", function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            //  _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.grandtotal,CONTAINER_COLUMNS_LINE_ITEM.budget,CONTAINER_COLUMNS_LINE_ITEM.revenue],cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_STRUCTURE_DESC)
    });
    it("TC - Create new record in resource", function () {
        _common.waitForLoaderToDisappear()
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
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(CommonLocators.CommonKeys.MATERIAL_AND_COST_CODE)

        // _package.create_materialPackage_Consolidatedchkbox(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.SCOPE, MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.SCOPE_ID, MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.MATERIAL_AND_COST_CODE, CONTAINERS_RESOURCE.CODE)
        cy.SAVE()
        //  _package.enterRecord_toCreateBoQPackage_FromWizard(BOQ_COPY.grouping,BOQ_COPY.estimateScope,BOQ_COPY.groupingStructure,BOQ_COPY.procurementStructure,BOQ_COPY.selectionStructure,BOQ_COPY.create)
        _common.waitForLoaderToDisappear()
    });
    it("TC - Create material package from wizards option", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        })
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO);
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_BOQS)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PROCUREMENT_BOQS)
        _common.waitForLoaderToDisappear()
        _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.REFERENCE_NO, 0, app.InputFields.DOMAIN_TYPE_CODE).clear({ force: true }).type(PACKAGEBOQ_REFCD, { force: true })
        _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.OUTLINE_SPECIFICATION, 0, app.InputFields.DOMAIN_TYPE_TRANSLATION).clear({ force: true }).type(PACKAGEBOQ_REFDESC, { force: true })
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)


        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURE)

        })
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURE)
        _common.select_rowInContainer(cnt.uuid.BOQ_STRUCTURE)

        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURE, NEW_BOQ_STRUCTURE_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()

    });
    it("TC - Create new project", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.create_newRecord(cnt.uuid.PROJECTS);
        cy.wait(500)
        _projectPage.enterRecord_toCreateProject(NEW_CREATEPROJECT_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });
    it("TC - Create new BOQ header and BOQ structure", function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, NEW_PRJ_NO).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, NEW_BOQ_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE);

        });

    })
    it("TC - Copy package boq form source package", function () {
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQSOURCE, app.FooterTab.SOURCE_BOQ, 2);
            _common.waitForLoaderToDisappear()
            _common.clear_subContainerFilter(cnt.uuid.BOQSOURCE)
            cy.wait(1000)//required wait
            _common.setup_gridLayout(cnt.uuid.BOQSOURCE, CONTAINER_COLUMNS_SOURCE_BOQS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_SOURCE_BOQS.reference, CONTAINER_COLUMNS_SOURCE_BOQS.briefinfo], cnt.uuid.BOQSOURCE)
        });

        _boqPage.selectRecord_forSourceBoQ(cnt.uuid.BOQSOURCE, SOURCE_WIC_BOQ_PARAMETERS)
        cy.SAVE()
        cy.wait(1000)//required wait
        _common.search_inSubContainer(cnt.uuid.BOQSOURCE, PACKAGEBOQ_REFDESC)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _boqPage.dragDrop_sourceBoQTOBoQStructure(cnt.uuid.BOQSOURCE, PACKAGEBOQ_REFDESC, cnt.uuid.BOQ_STRUCTURES, commonLocators.CommonKeys.ROOT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES, btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTURES, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.QUANTITY)
        _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES, app.GridCells.PRICE_SMALL, CONTAINERS_BOQ_STRUCTURE.UNIT_RATE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BAS_UOM_FK, CONTAINERS_BOQ_STRUCTURE.UOM)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, NEW_BOQ_STRUCTURE_DESC)
    });


})
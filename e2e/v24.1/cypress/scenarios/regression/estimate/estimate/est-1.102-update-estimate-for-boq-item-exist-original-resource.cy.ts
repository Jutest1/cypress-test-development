import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage, _procurementPage, _estimatePage, _validate, _controllingUnit, _materialPage, _assembliesPage, _boqPage, _mainView, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { EST_HEADER } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const BOQ_PK_STRUCTURE_DESC = "BOQ_PK_STRUCTURE_DESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS: DataCells;
let BOQ_PARAMETERS: DataCells
let BOQ_STRUCTURE_PARAMETERS: DataCells

let CONTAINER_COLUMNS_BOQS;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let RESOURCE_PARAMETERS: DataCells
let RESOURCE_2_PARAMETERS: DataCells
let RESOURCE_3_PARAMETERS: DataCells
let RESOURCE_4_PARAMETERS: DataCells
let RESOURCE_5_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let GENERATE_LINE_ITEMS_PARAMETERS: DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM;
let CONTAINERS_PACKAGE;
let CONTAINER_COLUMNS_PACKAGE;
let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURES;
let CONTAINERS_PROCUREMENT_STRUCTURES;
let CONTAINERS_PACKAGE_BOQSTRUCTURE;
let UPDATE_ESTIMATE_PARAMETER: DataCells
let MODAL_UPDATE_ESTIMATE_WIZARD;
let UPDATE_ESTIMATE_2_PARAMETER: DataCells
let MODAL_UPDATE_ESTIMATE_2_WIZARD;
ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");

ALLURE.story("EST- 1.102 | Update estimate for boq item : Exist original resource");

describe("EST- 1.102 | Update estimate for boq item : Exist original resource", () => {


    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("estimate/est-1.102-update-estimate-for-boq-item-exist-original-resource.json")
            .then((data) => {
                this.data = data;
                CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
                CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQSTRUCTURE
                CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE
                BOQ_PARAMETERS = {
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
                }
                BOQ_STRUCTURE_PARAMETERS = {
                    [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                    [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
                }
                CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
                CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
                RESOURCE_PARAMETERS = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
                };
                RESOURCE_2_PARAMETERS = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[3],
                };
                RESOURCE_3_PARAMETERS = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[2],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[1],
                };
                RESOURCE_4_PARAMETERS = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[3],
                };
                RESOURCE_5_PARAMETERS = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[2],
                };
                CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
                CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM

                GENERATE_LINE_ITEMS_PARAMETERS = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                    [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
                }
                PROJECTS_PARAMETERS = {
                    [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                    [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                    [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
                }
                CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
                ESTIMATE_PARAMETERS = {
                    [app.GridCells.CODE]: ESTIMATE_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                    [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                    [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
                }
                MODAL_UPDATE_ESTIMATE_WIZARD = this.data.MODAL.UPDATE_ESTIMATE_WIZARD

                MODAL_UPDATE_ESTIMATE_2_WIZARD = this.data.MODAL.UPDATE_ESTIMATE_WIZARD_2

                UPDATE_ESTIMATE_PARAMETER = {
                    [commonLocators.CommonKeys.CHECKBOX]: MODAL_UPDATE_ESTIMATE_WIZARD
                }
                UPDATE_ESTIMATE_2_PARAMETER = {
                    [commonLocators.CommonKeys.CHECKBOX]: MODAL_UPDATE_ESTIMATE_2_WIZARD
                }
                CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
                CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
                CONTAINERS_PACKAGE_BOQSTRUCTURE = this.data.CONTAINERS.PACKAGE_BOQSTRUCTURE
                CONTAINERS_PROCUREMENT_STRUCTURES = this.data.CONTAINERS.PROCUREMENT_STRUCTURES
                CONTAINER_COLUMNS_PROCUREMENT_STRUCTURES = this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURES

                /* Open desktop should be called in before block */
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
                _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
            })
    });

    it("TC - Create BoQ header and BoQ structure", function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
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
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create estimate header", function () {
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
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Generate boq line item", function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create resources for line item", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_2_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_3_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_4_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_5_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    })

    it("TC - Create BoQ package from the estimate", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE)
        _common.waitForLoaderToDisappear()
        _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(CONTAINERS_PACKAGE.BASED_ON, CONTAINERS_PACKAGE.ESTIMATE_SCOPE, CONTAINERS_PACKAGE.ESTIMATE_SCOPE_INDDEX, CONTAINERS_PACKAGE.BASED_ON, CONTAINERS_PACKAGE.PROCUREMENT_STRUCTURE, CONTAINERS_PACKAGE.QUANTITY_TRANSFER, commonLocators.CommonKeys.UNCHECK)
    })

    it("TC - Add boq structure under package boq detail and update estimate", function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
        })
        cy.wait(500)
        _common.openTab(app.TabBar.BOQDETAILS).then(() => {
            _common.setDefaultView(app.TabBar.BOQDETAILS)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0)
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE);
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
        cy.wait(500)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        })
        cy.wait(500)
        cy.REFRESH_CONTAINER()
        cy.wait(1000)
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE, Cypress.env("PK-Code"))
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGE, app.GridCells.CODE, Cypress.env("PK-Code"))
        _common.openTab(app.TabBar.BOQDETAILS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0)
        })
        _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURE)
        _common.select_allContainerData(cnt.uuid.BOQ_STRUCTURE)
        _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURE, btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE, BOQ_DESC)
        _common.create_newRecord(cnt.uuid.BOQ_STRUCTURE)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, BOQ_PK_STRUCTURE_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BAS_UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PACKAGE_BOQSTRUCTURE.UOM)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PACKAGE_BOQSTRUCTURE.UNIT_RATE)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PACKAGE_BOQSTRUCTURE.QUANTITY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_PK_STRUCTURE_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_DESC)
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL, "PCK_FINAL_PRICE")
        _common.minimizeContainer(cnt.uuid.BOQ_STRUCTURE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE);
        _estimatePage.openModalContainerByDownArrow();
        _estimatePage.update_estimate_fromWizard(UPDATE_ESTIMATE_PARAMETER);
        cy.wait(2000)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.openTab(app.TabBar.BOQDETAILS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0)
        })
    })

    it("TC - New line item & resource gets generated from newly added Boq item in the package module", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.filterCurrentEstimate(cnt.uuid.ESTIMATE, "noFilter")
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
        _common.search_inSubContainer(cnt.uuid.ESTIMATE, ESTIMATE_DESCRIPTION)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE, app.GridCells.DESCRIPTION_INFO, ESTIMATE_DESCRIPTION, EST_HEADER)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_STRUCTURE_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_STRUCTURE_DESC)
        _common.select_rowInSubContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, "GRAND_TOTAL_1")
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_PK_STRUCTURE_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_PK_STRUCTURE_DESC)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, "GRAND_TOTAL_2")
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_PK_STRUCTURE_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_PK_STRUCTURE_DESC)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_PK_STRUCTURE_DESC)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
    })

    it("TC - The sum grand total of line items gets same as the final price of package boq items", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        let grandTotal1: any = parseFloat(Cypress.env("GRAND_TOTAL_1").replace(",", "")).toFixed(2)
        let grandTotal2: any = parseFloat(Cypress.env("GRAND_TOTAL_2").replace(",", "")).toFixed(2)
        let sum: any = (+grandTotal1) + (+grandTotal2)
        cy.wait(100)
            .then(() => {
                expect(parseFloat(sum).toFixed(2)).equal(parseFloat(Cypress.env("PCK_FINAL_PRICE").replace(",", "")).toFixed(2))
            })
    })

    it("TC - Resource quantity total for newly generated resource in estimate gets from newly added quantity from package boq item", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_PK_STRUCTURE_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_PK_STRUCTURE_DESC)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        _common.assert_forNumericValues(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_TOTAL, CONTAINERS_PACKAGE_BOQSTRUCTURE.QUANTITY)
    })

    after(() => {
        cy.LOGOUT();
    });
})
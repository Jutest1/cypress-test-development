import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { _common, _projectPage, _procurementPage, _estimatePage, _validate, _controllingUnit, _materialPage, _assembliesPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const LINE_ITEM_DESCRIPTION = "LINE_ITEM_DESC1-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const ASSEMBLY_CATEGORY_DESC = "AC_DESC-" + Cypress._.random(0, 999);
const ASSEMBLIES_DESC = "AC_DESC-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_RESOURCE;

let CONTAINERS_RESOURCE
let RESOURCE_PARAMETERS: DataCells
let RESOURCE_2_PARAMETERS: DataCells

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS
let LINE_ITEM_PARAMETERS: DataCells

let CONTAINERS_LINE_ITEM;

let CONTAINER_COLUMNS_LINE_ITEM;

let CONTAINERS_ASSEMBLY_RESOURCE;

let CONTAINER_COLUMNS_ASSEMBLY_RESOURCE;

let CONTAINERS_CUSTOMIZING;

let CONTAINER_COLUMNS_CUSTOMIZING;

let CONTAINERS_ASSEMBLIES;

let CONTAINER_COLUMNS_ASSEMBLIES;
let CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES;
let CONTAINER_COLUMNS_DATA_TYPE;
let CONTAINER_COLUMNS_DATA_RECORD;
let ASSEMBLY_RESOURCE_MATERIAL_PARAMETER: DataCells;
let ASSEMBLY_RESOURCE_COST_CODE_PARAMETER: DataCells;
let ASSEMBLIES_PARAMETER: DataCells;
ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");

ALLURE.story("EST- 1.101 | Create Project Assembly Line Item");

describe("EST- 1.101 | Create Project Assembly Line Item", () => {

    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("estimate/est-1.101-create-project-assembly-lineitem.json")
            .then((data) => {
                this.data = data;
                CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
                ESTIMATE_PARAMETERS = {
                    [app.GridCells.CODE]: ESTIMATE_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                    [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                    [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
                }

                CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
                CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
                LINE_ITEM_PARAMETERS = {
                    [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                    [app.GridCells.EST_ASSEMBLY_FK]: CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE
                };

                CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE

                CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
                RESOURCE_PARAMETERS = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
                };
                RESOURCE_2_PARAMETERS = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY_2,
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL_CODE,
                };

                CONTAINER_COLUMNS_DATA_TYPE = this.data.CONTAINER_COLUMNS.DATA_TYPE

                CONTAINER_COLUMNS_DATA_RECORD = this.data.CONTAINER_COLUMNS.DATA_RECORD
                CONTAINERS_ASSEMBLIES = this.data.CONTAINERS.ASSEMBLIES
                CONTAINER_COLUMNS_ASSEMBLIES = this.data.CONTAINER_COLUMNS.ASSEMBLIES

                CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES = this.data.CONTAINER_COLUMNS.ASSEMBLY_CATEGORIES

                CONTAINER_COLUMNS_ASSEMBLY_RESOURCE = this.data.CONTAINER_COLUMNS.ASSEMBLY_RESOURCE
                CONTAINERS_ASSEMBLY_RESOURCE = this.data.CONTAINERS.ASSEMBLY_RESOURCE
                CONTAINERS_CUSTOMIZING = this.data.CONTAINERS.CUSTOMIZING
                ASSEMBLY_RESOURCE_COST_CODE_PARAMETER = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_ASSEMBLY_RESOURCE.SHORT_KEY,
                    [app.GridCells.CODE]: CONTAINERS_ASSEMBLY_RESOURCE.CODE_C,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_ASSEMBLY_RESOURCE.QUANTITY
                }

                ASSEMBLY_RESOURCE_MATERIAL_PARAMETER = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_ASSEMBLY_RESOURCE.SHORT_KEY_MATERIAL,
                    [app.GridCells.CODE]: CONTAINERS_ASSEMBLY_RESOURCE.CODE_M,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_ASSEMBLY_RESOURCE.QUANTITY
                }
                ASSEMBLIES_PARAMETER = {
                    [app.GridCells.DESCRIPTION_INFO]: ASSEMBLIES_DESC,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_ASSEMBLY_RESOURCE.QUANTITY
                }

                /* Open desktop should be called in before block */
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.waitForLoaderToDisappear()
                _common.openTab(app.TabBar.PROJECT).then(() => {
                    _common.setDefaultView(app.TabBar.PROJECT)
                    _common.waitForLoaderToDisappear()
                    _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
                });
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
                _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();

            });
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Assign est. assembly type under customizing", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
            _common.setup_gridLayout(cnt.uuid.ENTITY_TYPES, CONTAINER_COLUMNS_DATA_TYPE)
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, CONTAINERS_CUSTOMIZING.ASSEMBLY_TYPE)
        cy.REFRESH_CONTAINER()
        cy.wait(1000)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, CONTAINERS_CUSTOMIZING.EST_ASSEMBLY_TYPE)

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
            _common.setup_gridLayout(cnt.uuid.INSTANCES, CONTAINER_COLUMNS_DATA_RECORD)
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        cy.wait(1000) // This wait is required , if not added script fails
        _common.create_newRecordIfDataNotFound(cnt.uuid.INSTANCES, app.GridCells.ASSEMBLY_TYPE_LOGIC_FK, CONTAINERS_ASSEMBLIES.CREW_ASSEMBLY);
        cy.get('@CHECK_DATA')
            .then((value) => {
                if (value.toString() == "Data does not exist") {
                    _common.enterRecord_inNewRow(cnt.uuid.INSTANCES, app.GridCells.SHORT_KEY_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTAINERS_ASSEMBLIES.SHORY_KEY_CA)
                    _common.enterRecord_inNewRow(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTAINERS_ASSEMBLIES.CREW_ASSEMBLY)
                    _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES, app.GridCells.ASSEMBLY_TYPE_LOGIC_FK, commonLocators.CommonKeys.LIST, CONTAINERS_ASSEMBLIES.CREW_ASSEMBLY)
                    cy.SAVE()
                    _common.waitForLoaderToDisappear()
                }
            })
    })

    it("TC - Create assembly category", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES)
      _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES)
        });
        cy.wait(1000) // This wait is required , if not added script fails
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLIES, CONTAINER_COLUMNS_ASSEMBLIES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLIES.code, CONTAINER_COLUMNS_ASSEMBLIES.descriptioninfo, CONTAINER_COLUMNS_ASSEMBLIES.quantity], cnt.uuid.ASSEMBLIES)
        });
        cy.wait(1000) // This wait is required , if not added script fails
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE, CONTAINER_COLUMNS_ASSEMBLY_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.estresourcetypeshortkey, CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.code, CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.costunit], cnt.uuid.ASSEMBLY_RESOURCE)
        });
        cy.wait(1000) // This wait is required , if not added script fails

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.enterRecord_inNewRow(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, ASSEMBLY_CATEGORY_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.EST_ASSEMBLY_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ASSEMBLY_RESOURCE.ASSEMBLY_TYPE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES, ASSEMBLY_CATEGORY_DESC)
        //  _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
    })

    it("TC - Create assemblies", function () {
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.create_newRecord(cnt.uuid.ASSEMBLIES)
        _assembliesPage.enterRecord_toCreateAssemblies(cnt.uuid.ASSEMBLIES, ASSEMBLIES_PARAMETER)
        cy.SAVE()
        cy.wait(1000) // This wait is required , if not added script fails
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLIES, app.GridCells.CODE, "ASSEMBLY_CODE")

        _common.minimizeContainer(cnt.uuid.ASSEMBLIES)
    })

    it("TC - Create assembly resources", function () {
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)

        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_COST_CODE_PARAMETER)
        _common.waitForLoaderToDisappear()// This wait is required , if not added script fails
        cy.SAVE()
        _common.waitForLoaderToDisappear()// This wait is required , if not added script fails

        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_MATERIAL_PARAMETER)
        _common.waitForLoaderToDisappear() // This wait is required , if not added script fails
        cy.SAVE()
        _common.waitForLoaderToDisappear() // This wait is required , if not added script fails
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    })

    it("TC - Create estimate header", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create line item with assembly", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_ASSEMBLY_FK)
        _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.EST_ASSEMBLY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("ASSEMBLY_CODE"))
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });

    it("TC - Resources get populated from created assemblies record from the project module in the estimate module", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
            _common.waitForLoaderToDisappear()
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.code, CONTAINER_COLUMNS_RESOURCE.estresourcetypeshortkey, CONTAINER_COLUMNS_RESOURCE.costtotal], cnt.uuid.RESOURCES)
            _common.waitForLoaderToDisappear()
            _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        });
        cy.wait(1000) // This wait is required , if not added script fails
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_ASSEMBLY_RESOURCE.CODE_C)
        _common.clickOn_activeRowCell(cnt.uuid.RESOURCES,app.GridCells.TREE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_ASSEMBLY_RESOURCE.CODE_C)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_ASSEMBLY_RESOURCE.CODE_M)
        _common.clickOn_activeRowCell(cnt.uuid.RESOURCES,app.GridCells.TREE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_ASSEMBLY_RESOURCE.CODE_M)
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    })

    it("TC - Resources cost total gets equal to line item grand total", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION)

        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.GRAND_TOTAL)
            .then(($grandTotal) => {
                let grandTotal: any = parseFloat($grandTotal.text().replace(',', '')).toFixed(2)

                _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
                    _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
                });

                cy.wait(1000) // This wait is required , if not added script fails
                _common.maximizeContainer(cnt.uuid.RESOURCES)

                _common.clear_subContainerFilter(cnt.uuid.RESOURCES);

                _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_ASSEMBLY_RESOURCE.CODE_C)
                _common.clickOn_activeRowCell(cnt.uuid.RESOURCES,app.GridCells.TREE)
                _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL)
                    .then(($costCodeCostTotal) => {
                        let costCodeCostTotal: any = parseFloat($costCodeCostTotal.text().replace(',', '')).toFixed(2)
                        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_ASSEMBLY_RESOURCE.CODE_M)
                        _common.clickOn_activeRowCell(cnt.uuid.RESOURCES,app.GridCells.TREE)
                        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL)
                            .then(($materialCostTotal) => {
                                let materialCostTotal: any = parseFloat($materialCostTotal.text().replace(',', '')).toFixed(2)
                                let calculatedGrandTotal: any = (+costCodeCostTotal) + (+materialCostTotal)
                                expect(parseFloat(calculatedGrandTotal).toFixed(2)).to.be.equal(grandTotal)
                            })
                    })
                _common.minimizeContainer(cnt.uuid.RESOURCES)
            })
    })

})
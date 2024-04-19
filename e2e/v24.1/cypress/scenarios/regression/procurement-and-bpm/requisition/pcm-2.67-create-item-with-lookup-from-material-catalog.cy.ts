import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _rfqPage, _materialPage } from "cypress/pages";

import _ from "cypress/types/lodash";
import { data } from "cypress/types/jquery";
import { FRAMEWORK_CONTRACT_DESCRIPTION } from "cypress/pages/variables";
import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
const allure = Cypress.Allure.reporter.getInterface();
const REQ_DESC = "REQ_DESC-" + Cypress._.random(0, 999);
const CU_DESC = "CU_DESC-" + Cypress._.random(0, 999);
const PRICElist_Desc = "PRICE_LIST_Desc" + Cypress._.random(0, 999);
const MATCAT_CODE = "MATCAT_CODE-" + Cypress._.random(0, 999);
const MAT_CODE1 = "MAT_CODE-" + Cypress._.random(0, 999);
const MATCAT_DESC = "MATCAT_DESC-" + Cypress._.random(0, 999);
const MATGRP_CODE = "MATGRP_CODE-" + Cypress._.random(0, 999);
const MATGRP_DESC = "MATGRP_DESC-" + Cypress._.random(0, 999);
const SUBGRP_CODE = "MATSUBGRP_CODE-" + Cypress._.random(0, 999);
const SUBGRP_DESC = "MATSUBGRP_DESC-" + Cypress._.random(0, 999);
const MAT_CODE = "MAT_CODE-" + Cypress._.random(0, 999);
const MAT_DESC = "MAT_DESC-" + Cypress._.random(0, 999);
const PRICE_LIST = "PRICE_LIST" + Cypress._.random(0, 999);
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK = "HS"

let MODAL_PROJECTS
let PROJECTS_PARAMETERS: DataCells

let CONTAINERS_DATA_RECORD;
let CONTAINERS_PRICE_LISTS;

let CONTAINERS_CONTROLLING_UNIT
let CONTAINERS_REQUISITIONS;
let CONTAINERS_HOME_CURRENCY;
let CONTAINER_COLUMNS_DATA_TYPES;
let CONTAINER_COLUMNS_REQUISITIONS;
let CONTAINER_COLUMNS_CONTROLLING_UNIT;
let CONTROLLING_UNIT_PARAMETERS: DataCells
let MATERIAL_CATALOGS_PARAMETER: DataCells
let MATERIAL_SUBGROUPS: DataCells
let MATERIAL_GROUPS: DataCells
let CONTAINER_COLUMNS_MATERIAL_CATALOG
let CONTAINERS_MATERIAL_CATALOG;
let CONTAINER_COLUMNS_MATERIAL_RECORD;
let CONTAINER_COLUMNS_MATERIAL_GROUP
let CONTAINER_COLUMNS_DATA_RECORDS, CONTAINERS_DATA_TYPES;
let MATERIAL_RECORD_1_PARAMETER: DataCells
let MATERIAL_RECORD_2_PARAMETER: DataCells
let CONTAINERS_MATERIAL_RECORDS
let CONTAINERS_REQUISITION_ITEMS, CONTAINER_COLUMNS_REQUISITION_ITEMS;
let REQUISITION_ITEM_PARAMETER_1, REQUISITION_ITEM_PARAMETER_2: DataCells
allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.67 | Create item with lookup from Material Catalog")
describe("PCM- 2.67 | Create item with lookup from Material Catalog", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-2.67-create-item-with-lookup-from-material-catalog.json").then((data) => {
            this.data = data
        })
    })
    before(function () {
        cy.fixture("pcm/pcm-2.67-create-item-with-lookup-from-material-catalog.json").then((data) => {
            this.data = data;
            CONTAINERS_DATA_RECORD = this.data.CONTAINERS.DATA_RECORDS;
            CONTAINER_COLUMNS_DATA_RECORDS = this.data.CONTAINER_COLUMNS.DATA_RECORDS;
            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES;
            CONTAINER_COLUMNS_DATA_TYPES = this.data.CONTAINER_COLUMNS.DATA_TYPES;

            CONTAINERS_PRICE_LISTS = this.data.CONTAINERS.PRICE_LISTS;

            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT;
            CONTROLLING_UNIT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: CU_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM,
            };


            CONTAINERS_HOME_CURRENCY = this.data.CONTAINERS.HOME_CURRENCY;
            CONTAINER_COLUMNS_MATERIAL_CATALOG = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOGS
            CONTAINERS_REQUISITIONS = this.data.CONTAINERS.REQUISITIONS;
            CONTAINER_COLUMNS_REQUISITIONS = this.data.CONTAINER_COLUMNS.REQUISITIONS;
            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT;
            CONTAINERS_MATERIAL_CATALOG = this.data.CONTAINERS.MATERIAL_CATALOG;

            CONTAINER_COLUMNS_MATERIAL_GROUP = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
            CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS;

            CONTAINER_COLUMNS_MATERIAL_RECORD = this.data.CONTAINER_COLUMNS.MATERIAL_RECORD

            CONTAINER_COLUMNS_REQUISITION_ITEMS = this.data.CONTAINER_COLUMNS.REQUISITION_ITEMS
            CONTAINERS_REQUISITION_ITEMS = this.data.CONTAINERS.REQUISITION_ITEMS;
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]: CLERK
            }

            MATERIAL_CATALOGS_PARAMETER = {
                [app.GridCells.CODE]: MATCAT_CODE,
                [app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_MATERIAL_CATALOG.BUSINESS_PARTNER,
                [app.GridCells.DESCRIPTION_INFO]: MATCAT_DESC

            }
            MATERIAL_GROUPS = {
                [app.GridCells.CODE]: MATGRP_CODE,
                [app.GridCells.DESCRIPTION_INFO]: MATGRP_DESC,
                [app.GridCells.PRC_STRUCTURE_FK]: CONTAINERS_MATERIAL_CATALOG.MATERIAL_GROUP_STRUCTURE
            }
            MATERIAL_SUBGROUPS = {
                [app.GridCells.CODE]: SUBGRP_CODE,
                [app.GridCells.DESCRIPTION_INFO]: SUBGRP_DESC,
                [app.GridCells.PRC_STRUCTURE_FK]: CONTAINERS_MATERIAL_CATALOG.MATERIAL_GROUP_STRUCTURE
            }
            MATERIAL_RECORD_1_PARAMETER = {
                [app.GridCells.CODE]: MAT_CODE,
                [app.GridCells.DESCRIPTION_INFO_1]: MAT_DESC,
                [app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORDS.UOM,
                [app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORDS.PRICE,
                [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORDS.PRICE,
                [app.GridCells.BAS_CURRENCY_FK]: CONTAINERS_MATERIAL_RECORDS.EUR
            }
            MATERIAL_RECORD_2_PARAMETER = {
                [app.GridCells.CODE]: MAT_CODE1,
                [app.GridCells.DESCRIPTION_INFO_1]: MAT_DESC,
                [app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORDS.UOM,
                [app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORDS.PRICE,
                [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORDS.PRICE,
                [app.GridCells.BAS_CURRENCY_FK]: CONTAINERS_MATERIAL_RECORDS.USD
            }
            REQUISITION_ITEM_PARAMETER_1 = {
                [app.FooterTab.MATERIALCATALOG]: CONTAINERS_REQUISITION_ITEMS.MaterialCatalog,
                [app.InputFields.FLEX_BOX_RULE]: CONTAINERS_REQUISITION_ITEMS.FLEXBOX[0],
                [app.GridCells.MDC_MATERIAL_FK]: CONTAINERS_REQUISITION_ITEMS.MATERIAL_NO[0]

            }
            REQUISITION_ITEM_PARAMETER_2 = {
                [app.FooterTab.MATERIALCATALOG]: CONTAINERS_REQUISITION_ITEMS.ProcurementStructure,
                [app.InputFields.FLEX_BOX_RULE]: CONTAINERS_REQUISITION_ITEMS.FLEXBOX[1],
                [app.GridCells.MDC_MATERIAL_FK]: CONTAINERS_REQUISITION_ITEMS.MATERIAL_NO[1]

            }

            cy.preLoading("admin8", "Winjit123", Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.setDefaultView(app.TabBar.PROJECT)
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            _common.waitForLoaderToDisappear()
            cy.SAVE();
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        });
    })
    after(() => {
        cy.LOGOUT();
    });
    it('TC - Verify Create Price list in customizing module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 1);
            _common.setup_gridLayout(cnt.uuid.DATA_TYPES, CONTAINER_COLUMNS_DATA_TYPES)

            _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
        });
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.MATERIAL_TYPE);

        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, CONTAINERS_DATA_TYPES.MATERIAL_TYPE);
        cy.SAVE();
        cy.wait(1000)//required wait
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 1);
            _common.setup_gridLayout(cnt.uuid.DATA_RECORDS, CONTAINER_COLUMNS_DATA_RECORDS)
            _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS);
        });
        cy.wait(1000)//required wait
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, CONTAINERS_DATA_RECORD.FREAMWORK_AGREEMENTS)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, CONTAINERS_DATA_RECORD.FREAMWORK_AGREEMENTS);
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_LIVE, commonLocators.CommonKeys.CHECK)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_FRAMEWORK, commonLocators.CommonKeys.CHECK)
        cy.SAVE();
        cy.REFRESH_CONTAINER();
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 1);
            _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
        });
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.PRICE_LISTS);
        cy.REFRESH_CONTAINER();
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 1);
            _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
        cy.REFRESH_CONTAINER();
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.PRICE_LISTS);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.MODULE_NAME, CONTAINERS_DATA_TYPES.MASTERDATA);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS);
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS, app.GridCells.CONTEXT_FK, commonLocators.CommonKeys.LIST, CONTAINERS_DATA_RECORD.RIB_DEMO_Stamm)
        _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS, app.GridCells.CURRENCY_FK, commonLocators.CommonKeys.LIST, CONTAINERS_DATA_RECORD.EURO)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICElist_Desc)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    });
    it("TC- Add currency conversion and exchange rates to home currency", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CURRENCY);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required Wait
        _common.clickOn_cellHasUniqueValue(cnt.uuid.HOME_CURRENCY, app.GridCells.CURRENCY, CONTAINERS_HOME_CURRENCY.EUR)
        cy.wait(5000).then(() => {
            _common.create_newRecordInCurrencyConversion_ifRecordNotExists(cnt.uuid.CURRENCY_CONVERSION, app.GridCells.CURRENCY_FOREIGN_FK, CONTAINERS_HOME_CURRENCY.USD, CONTAINERS_HOME_CURRENCY.RATE, 0)
        })
    })
    it("TC - Create material catalogue", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
        cy.wait(1000)//required wait
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG)
            _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS);
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOGS_PARAMETER)
        _common.edit_dropdownCellWithCaret(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.MATERIAL_CATALOG_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_DATA_RECORD.FREAMWORK_AGREEMENTS)
        cy.SAVE()
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.IS_TICKET_SYSTEM, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS);

    });
    it('TC- Create material group', function () {
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUP)
        })
        cy.wait(1000)//required wait
        _common.waitForLoaderToDisappear()

        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_GROUPS);
        cy.SAVE()
        _common.create_newSubRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_SUBGROUPS);
        cy.SAVE()
    });
    it("TC - Verify Add Price List for Material catalog", function () {
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_VERSION, app.FooterTab.PRICE_VERSIONS)
            _common.create_newRecord(cnt.uuid.PRICE_VERSION);
        })
        _common.select_rowInContainer(cnt.uuid.PRICE_VERSION)
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_VERSION, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICE_LIST)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_VERSION, app.GridCells.PRICE_LIST_FK, commonLocators.CommonKeys.LIST, PRICElist_Desc)
        cy.SAVE()
    })
    it('TC- Create new Material', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATCAT_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
        cy.wait(1000)//required wait
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.DETAILSMATERIAL)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORD)
            _common.waitForLoaderToDisappear()
            _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        });
        _common.maximizeContainer(cnt.uuid.MATERIAL_RECORDS)

        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_1_PARAMETER)
        cy.SAVE()
        cy.wait(1000)//required wait
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_2_PARAMETER)
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS)
    });
    it("TC - Add Price List to material record", function () {
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_LISTS, app.FooterTab.PRICE_LISTS, 0)
            _common.waitForLoaderToDisappear()
            _common.create_newRecord(cnt.uuid.PRICE_LISTS);
        })
        _common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_LISTS, app.GridCells.MATERIAL_PRICE_VERSION_FK, commonLocators.CommonKeys.GRID, PRICE_LIST)
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_LISTS, app.GridCells.RETAIL_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LISTS.PRICE[0])
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_LISTS, app.GridCells.LIST_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LISTS.PRICE[1])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
    })


    it("TC- Pin the Project and Add Controlling Unit.", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
            _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
            _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        });
        cy.wait(1000) //required wait
        _common.create_newRecord(cnt.uuid.CONTROLLING_UNIT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT, app.GridCells.CODE, "CNTSUBCODE")

    })


    it("TC - Create requisition for respective project", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            cy.wait(1000)//required wait
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITIONS)
        });
        _common.create_newRecord(cnt.uuid.REQUISITIONS)
        cy.wait(1000)// Added this wait as modal take time to load
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITIONS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, REQ_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("CNTSUBCODE"))
        // _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITIONS.STRUCTURE)
        cy.wait(500)
        cy.SAVE()
    });
    it("TC - Verify material lookup should fitler with procurement structure", function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS)
            _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
            _common.maximizeContainer(cnt.uuid.REQUISITIONITEMS)
            _common.create_newRecord(cnt.uuid.REQUISITIONITEMS);
        })
        cy.wait(1000)//required wait
        _materialPage.clickOn_cellButton(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, btn.IconButtons.LOOKUP_ICO_DIALOG)
        _common.clickOn_modalButtonByClass(btn.IconButtons.ICO_DISCARD)
        _materialPage.search_MaterialNo_FromLookup(CONTAINERS_MATERIAL_CATALOG.MATERIAL_GROUP_STRUCTURE)
        _materialPage.assign_MaterialNo_FromLookup(MAT_CODE)
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONITEMS, app.GridCells.PRC_STRUCTURE_FK, CONTAINERS_MATERIAL_CATALOG.MATERIAL_GROUP_STRUCTURE)

    })


    it('TC- Verify currency change in requisition Item', function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS)
            _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
            _common.create_newRecord(cnt.uuid.REQUISITIONITEMS);
        })
        cy.wait(1000)//required wait
        _common.waitForLoaderToDisappear()

        _materialPage.clickOn_cellButton(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, btn.IconButtons.LOOKUP_ICO_DIALOG)
        _common.clickOn_modalButtonByClass(btn.IconButtons.ICO_DISCARD)
        _materialPage.search_MaterialNo_FromLookup(MAT_CODE1)
        _materialPage.assign_MaterialNo_FromLookup(MAT_CODE1)
        cy.wait(1000)//required wait
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITIONITEMS, app.GridCells.DESCRIPTION_1, app.InputFields.DOMAIN_TYPE_DESCRIPTION, MAT_DESC)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.select_activeRowInContainer(cnt.uuid.REQUISITIONITEMS)

    })
    it("TC - Verify check change price List material", function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS)
            _common.create_newRecord(cnt.uuid.REQUISITIONITEMS);
        })
        cy.wait(1000)//required wait
        _common.waitForLoaderToDisappear()

        _materialPage.clickOn_cellButton(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, btn.IconButtons.LOOKUP_ICO_DIALOG)
        _common.clickOn_modalButtonByClass(btn.IconButtons.ICO_DISCARD)
        _materialPage.clickOn_modalButtons(CONTAINERS_PRICE_LISTS.materialSearch, CONTAINERS_PRICE_LISTS.refresh)
        _materialPage.search_MaterialNo_FromLookup(MAT_CODE1)
        _materialPage.change_pricelist(MAT_CODE1, PRICE_LIST)
        cy.SAVE()
        cy.wait(1000)//required wait
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.REQUISITIONITEMS)
        _common.assert_forNumericValues(cnt.uuid.REQUISITIONITEMS, app.GridCells.PRICE_SMALL, CONTAINERS_PRICE_LISTS.PRICE[1])

    })
    it("TC- Add framework Catalog to requision and check item in lookup", function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS)
            _common.create_newRecord(cnt.uuid.REQUISITIONITEMS);
        })
        cy.wait(1000)//required wait
        _common.waitForLoaderToDisappear()

        _validate.verify_dataUnderMaterialLookups(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, MAT_CODE)
        _validate.verify_dataUnderMaterialLookups(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, MAT_CODE1)
        _common.delete_recordFromContainer(cnt.uuid.REQUISITIONITEMS)

    })
    it("TC - Create requisition item for respective project", function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_REQUISITION_ITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
        _common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
        _common.lookUpButtonInCell(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, app.InputFields.ICO_INPUT_LOOKUP, 0)
        _materialPage.selectMaterial_fromMaterialSearchLookup(REQUISITION_ITEM_PARAMETER_1)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
        _common.lookUpButtonInCell(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, app.InputFields.ICO_INPUT_LOOKUP, 0)
        _materialPage.selectMaterial_fromMaterialSearchLookup(REQUISITION_ITEM_PARAMETER_2)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.minimizeContainer(cnt.uuid.REQUISITIONITEMS)
        cy.wait(1000)//required wait
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.MATERIAL_CATALOG_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, MATCAT_CODE)
        cy.wait(1000)//required wait
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.TRANSLATED, MATCAT_DESC, FRAMEWORK_CONTRACT_DESCRIPTION)
        cy.wait(1000)//required wait
        _common.minimizeContainer(cnt.uuid.REQUISITIONITEMS)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.MATERIAL_CATALOG_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, MATCAT_CODE)
        cy.wait(1000)//required wait
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.TRANSLATED, MATCAT_DESC, FRAMEWORK_CONTRACT_DESCRIPTION)


    });
})

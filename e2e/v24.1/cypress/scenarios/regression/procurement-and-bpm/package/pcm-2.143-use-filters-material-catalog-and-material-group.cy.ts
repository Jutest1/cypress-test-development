import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _projectPage, _businessPartnerPage, _materialPage } from "cypress/pages";
import { app, cnt, commonLocators, sidebar, tile } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
const ALLURE = Cypress.Allure.reporter.getInterface()

const MATERIALCATCODE = "MAT-CAT-" + Cypress._.random(0, 999);
const MATERIALCATDESC = "MAT-CATDESC-" + Cypress._.random(0, 999);
const MATERIALGRPCODE1 = "MAT-GRP-" + Cypress._.random(0, 999);
const MATERIALGRPDESC1 = "MAT-GRPDESC-" + Cypress._.random(0, 999);
const MATERIALGRPCODE2 = "MAT-GRP-" + Cypress._.random(0, 999);
const MATERIALGRPDESC2 = "MAT-GRPDESC-" + Cypress._.random(0, 999);
const MATERIALRECCODE = "MAT-REC-" + Cypress._.random(0, 999);
const MATERIALRECDESC = "MAT-RECDESC-" + Cypress._.random(0, 999);
const MATERIALRECCODE1 = "MAT-REC-" + Cypress._.random(0, 999);
const MATERIALRECDESC1 = "MAT-RECDESC-" + Cypress._.random(0, 999);

let CONTAINERS_MATERIAL_CATALOG;
let CONTAINER_COLUMNS_MATERIAL_CATALOG;
let CONTAINER_COLUMNS_MATERIAL_GROUP;
let CONTAINER_COLUMNS_MATERIAL_RECORD;
let MATERIAL_GROUP_PARAMETER:DataCells;
let MATERIAL_GROUP_PARAMETER2:DataCells;
let MATERIAL_RECORD_PARAMETER:DataCells;
let MATERIAL_RECORD_PARAMETER2:DataCells;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.143 | Use filters Material Catalog and Material Group")
describe("PCM- 2.143 | Use filters Material Catalog and Material Group", () => {
    
    before(function () {
        cy.clearAllLocalStorage()
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("pcm/pcm-2.143-use-filters-material-catalog-and-material-group.json").then((data) => {
            this.data = data
            CONTAINERS_MATERIAL_CATALOG=this.data.CONTAINERS.MATERIAL_CATALOG
            CONTAINER_COLUMNS_MATERIAL_CATALOG=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
            CONTAINER_COLUMNS_MATERIAL_GROUP=this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
            CONTAINER_COLUMNS_MATERIAL_RECORD= this.data.CONTAINER_COLUMNS.MATERIAL_RECORD
            MATERIAL_GROUP_PARAMETER={
                [app.GridCells.CODE]:MATERIALGRPCODE1,
                [app.GridCells.DESCRIPTION_INFO]: MATERIALGRPDESC1,
                [app.GridCells.PRC_STRUCTURE_FK]:CONTAINERS_MATERIAL_CATALOG.MATGRPSTRUCT,
            }
            MATERIAL_GROUP_PARAMETER2={
                [app.GridCells.CODE]:MATERIALGRPCODE2,
                [app.GridCells.DESCRIPTION_INFO]: MATERIALGRPDESC2,
                [app.GridCells.PRC_STRUCTURE_FK]: CONTAINERS_MATERIAL_CATALOG.MATGRPSTRUCT,
            }
            MATERIAL_RECORD_PARAMETER={
                [app.GridCells.DESCRIPTION_INFO_1]: MATERIALRECDESC,
                [app.GridCells.CODE]: MATERIALRECCODE,
                [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_CATALOG.UOM,
            }
            MATERIAL_RECORD_PARAMETER2={
                [app.GridCells.DESCRIPTION_INFO_1]: MATERIALRECDESC1,
                [app.GridCells.CODE]: MATERIALRECCODE1,
                [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_CATALOG.UOM,
            }

            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD," ")
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
            _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
            _common.openTab(app.TabBar.MASTER_DATA).then(() => {
                _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.ENTITY_TYPES);
            cy.REFRESH_CONTAINER();
            _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, CONTAINERS_MATERIAL_CATALOG.MATERIAL_CATALOG_TYPE);
            _common.waitForLoaderToDisappear()
            _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, CONTAINERS_MATERIAL_CATALOG.MATERIAL_CATALOG_TYPE);
            cy.SAVE();
           _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.MASTER_DATA).then(() => {
                _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
            });
            cy.wait(1000);
            _common.clear_subContainerFilter(cnt.uuid.INSTANCES);
            _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG.NEUTRAL_MATERIAL);
            _validate.customizing_DataRecordCheckBox(app.GridCells.IS_LIVE, CONTAINERS_MATERIAL_CATALOG.CHECK);
            _validate.customizing_DataRecordCheckBox(app.GridCells.IS_FRAMEWORK, CONTAINERS_MATERIAL_CATALOG.UNCHECK);
            cy.SAVE();
        })
    })
    after(() => {
		cy.LOGOUT();
	});

    it('TC - Verify create material catalog and Material groups', function () {
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG)
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS,CONTAINER_COLUMNS_MATERIAL_CATALOG)
        }); 
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
        _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_CATALOGS,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,MATERIALCATCODE)
        _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_CATALOGS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,MATERIALCATDESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_CATALOGS,app.GridCells.BUSINESS_PARTNER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_MATERIAL_CATALOG.BUSINESS_PARTNER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 3);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS,CONTAINER_COLUMNS_MATERIAL_GROUP)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUP_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUP_PARAMETER2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify create material records-1', function () {       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0)
        });
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER,MATERIALCATCODE)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOG_FILTER,app.GridCells.CODE,MATERIALCATCODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER,app.GridCells.CODE,MATERIALCATCODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER,app.GridCells.IS_CHECKED,CONTAINERS_MATERIAL_CATALOG.CHECK)
    })
    it('TC - Verify create material records-2', function () {       
        
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER, 2)
        });
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER,MATERIALGRPCODE1)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_GROUP_FILTER,app.GridCells.CODE,MATERIALGRPCODE1)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER,app.GridCells.IS_CHECKED,CONTAINERS_MATERIAL_CATALOG.UNCHECK)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 1)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS,CONTAINER_COLUMNS_MATERIAL_RECORD)
        });
        //1st material record
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER, 2)
        });
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER,MATERIALGRPCODE2)
        _common.waitForLoaderToDisappear()
        cy.wait(500)//wait is required to load data after search
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_GROUP_FILTER,app.GridCells.CODE,MATERIALGRPCODE2)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER,app.GridCells.IS_CHECKED,CONTAINERS_MATERIAL_CATALOG.UNCHECK)
         //2nd material record
         _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2)
        });
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_PARAMETER2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify material records with filter', function () {
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER,MATERIALGRPCODE1)
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER,app.GridCells.IS_CHECKED,CONTAINERS_MATERIAL_CATALOG.CHECK)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS,MATERIALRECCODE)
        cy.wait(500)//wait is required to load data after search
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_RECORDS,app.GridCells.CODE,MATERIALRECCODE)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER,MATERIALGRPCODE2)
        _common.waitForLoaderToDisappear()
        cy.wait(500)//wait is required to load data after search
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER,app.GridCells.IS_CHECKED,CONTAINERS_MATERIAL_CATALOG.CHECK)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS,MATERIALRECCODE1)
        _common.waitForLoaderToDisappear()
        cy.wait(500)//wait is required to load data after search
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_RECORDS,app.GridCells.CODE,MATERIALRECCODE1)
    })
})
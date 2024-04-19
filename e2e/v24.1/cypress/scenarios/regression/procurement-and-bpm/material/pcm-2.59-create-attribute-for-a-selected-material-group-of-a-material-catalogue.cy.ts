import { app, cnt, btn, sidebar, commonLocators, tile } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _materialPage } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface();

const ATTRIBUTE = "ATTRIBUTE-" + Cypress._.random(0, 9999);

let CONTAINER_COLUMNS_MATERIAL_CATALOG
let CONTAINER_MATERIAL_CATALOG

let CONTAINER_COLUMNS_MATERIAL_GROUP

let CONTAINER_COLUMNS_ATTRIBUTE
let CONTAINER_COLUMNS_TRANSLATION
ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Material");
ALLURE.story("PCM- 2.59 | Create attribute for a selected material group of a material catalogue");

describe("PCM- 2.59 | Create attribute for a selected material group of a material catalogue", () => {
    before(function () {
        cy.fixture("pcm/pcm-2.59-create-attribute-for-a-selected-material-group-of-a-material-catalogue.json")
          .then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_MATERIAL_CATALOG=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
            CONTAINER_MATERIAL_CATALOG=this.data.CONTAINERS.MATERIAL_CATALOG
            CONTAINER_COLUMNS_MATERIAL_GROUP=this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
            CONTAINER_COLUMNS_ATTRIBUTE=this.data.CONTAINER_COLUMNS.ATTRIBUTE
            CONTAINER_COLUMNS_TRANSLATION=this.data.CONTAINER_COLUMNS.TRANSLATION
          })
          .then(()=>{
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
          })
    });

    after(() => {
        cy.LOGOUT();
    });
    
    it("TC - Verify select a material group , then attribute container allow to opertaion", function() {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG); 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS,CONTAINER_COLUMNS_MATERIAL_CATALOG)
        });
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS,CONTAINER_MATERIAL_CATALOG.CODE)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOGS,app.GridCells.CODE,CONTAINER_MATERIAL_CATALOG.CODE)
        _common.waitForLoaderToDisappear()
  
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS,CONTAINER_COLUMNS_MATERIAL_GROUP)
        });
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.MATERIAL_GROUPS)
        _common.select_allContainerData(cnt.uuid.MATERIAL_GROUPS)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE, app.FooterTab.ATTRIBUTES, 2);
            _common.setup_gridLayout(cnt.uuid.ATTRIBUTE,CONTAINER_COLUMNS_ATTRIBUTE)
        });
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _validate.verify_ToolbarButtonsDisabledEnabled(cnt.uuid.ATTRIBUTE,btn.ToolBar.ICO_REC_NEW,commonLocators.CommonKeys.DISABLED)
        _common.waitForLoaderToDisappear()
    });  

    it("TC - Verify new button is working and attribute allow to be input and fixed is checkbox allow to be true", function() {       
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0);
        });
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS,CONTAINER_MATERIAL_CATALOG.CODE)
        _common.waitForLoaderToDisappear()

        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOGS,app.GridCells.CODE,CONTAINER_MATERIAL_CATALOG.CODE)  
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1);
        });
        _common.waitForLoaderToDisappear()

        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUPS,CONTAINER_MATERIAL_CATALOG.DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_GROUPS,app.GridCells.CODE,CONTAINER_MATERIAL_CATALOG.DESC) 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE, app.FooterTab.ATTRIBUTES, 2);
        });
        _common.search_inSubContainer(cnt.uuid.ATTRIBUTE,ATTRIBUTE)
        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ATTRIBUTE)
        _common.waitForLoaderToDisappear()
        _materialPage.enterRecord_toCreateAttribute(cnt.uuid.ATTRIBUTE,ATTRIBUTE,commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0);
        });
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS,CONTAINER_MATERIAL_CATALOG.CODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOGS,app.GridCells.CODE,CONTAINER_MATERIAL_CATALOG.CODE)  
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1);
        });
        
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUPS,CONTAINER_MATERIAL_CATALOG.DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_GROUPS,app.GridCells.CODE,CONTAINER_MATERIAL_CATALOG.DESC) 
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE, app.FooterTab.ATTRIBUTES, 2);
        });
        _common.search_inSubContainer(cnt.uuid.ATTRIBUTE,ATTRIBUTE)
        _common.select_rowInContainer(cnt.uuid.ATTRIBUTE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ATTRIBUTE,app.GridCells.PROPERTY_INFO,ATTRIBUTE)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.ATTRIBUTE,app.GridCells.HAS_FIXED_VALUES,commonLocators.CommonKeys.CHECK)
    });

    it("TC - Verify attribute allow to translate", function() {
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0);
        });
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS,CONTAINER_MATERIAL_CATALOG.CODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOGS,app.GridCells.CODE,CONTAINER_MATERIAL_CATALOG.CODE)  
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1);
        });
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUPS,CONTAINER_MATERIAL_CATALOG.DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_GROUPS,app.GridCells.CODE,CONTAINER_MATERIAL_CATALOG.DESC) 
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE, app.FooterTab.ATTRIBUTES, 2);
        });
        _common.search_inSubContainer(cnt.uuid.ATTRIBUTE,ATTRIBUTE)
        _common.select_rowInContainer(cnt.uuid.ATTRIBUTE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TRANSLATION_MATERIALCATALOG, app.FooterTab.TRASLATION, 2);
        });
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.TRANSLATION_MATERIALCATALOG,app.GridCells.LANG_NAME,CONTAINER_MATERIAL_CATALOG.LANGUAGE)
        _common.enterRecord_inNewRow(cnt.uuid.TRANSLATION_MATERIALCATALOG,app.GridCells.COL_10,app.InputFields.DOMAIN_TYPE_DESCRIPTION,ATTRIBUTE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

       _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0);
        });
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS,CONTAINER_MATERIAL_CATALOG.CODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOGS,app.GridCells.CODE,CONTAINER_MATERIAL_CATALOG.CODE)  
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1);
        });
        
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUPS,CONTAINER_MATERIAL_CATALOG.DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_GROUPS,app.GridCells.CODE,CONTAINER_MATERIAL_CATALOG.DESC) 
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE, app.FooterTab.ATTRIBUTES, 2);
        });
        _common.search_inSubContainer(cnt.uuid.ATTRIBUTE,ATTRIBUTE)
        _common.select_rowInContainer(cnt.uuid.ATTRIBUTE)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TRANSLATION_MATERIALCATALOG, app.FooterTab.TRASLATION, 2);
        });
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.TRANSLATION_MATERIALCATALOG,app.GridCells.LANG_NAME,CONTAINER_MATERIAL_CATALOG.LANGUAGE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.TRANSLATION_MATERIALCATALOG,app.GridCells.COL_10,ATTRIBUTE)
    })
    
    it("TC - Verify attribute allow to be null and fixed is checkbox false", function() {
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0);
        });
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS,CONTAINER_MATERIAL_CATALOG.CODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOGS,app.GridCells.CODE,CONTAINER_MATERIAL_CATALOG.CODE)  
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1);
        });
        
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUPS,CONTAINER_MATERIAL_CATALOG.DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_GROUPS,app.GridCells.CODE,CONTAINER_MATERIAL_CATALOG.DESC) 
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE, app.FooterTab.ATTRIBUTES, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE)
        _common.select_allContainerData(cnt.uuid.ATTRIBUTE)
        _common.waitForLoaderToDisappear()
        _common.delete_recordFromContainer(cnt.uuid.ATTRIBUTE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.create_newRecord(cnt.uuid.ATTRIBUTE)
        _materialPage.enterRecord_toCreateAttribute(cnt.uuid.ATTRIBUTE,null,commonLocators.CommonKeys.UNCHECK)
        cy.SAVE()
        
        _common.select_rowInContainer(cnt.uuid.ATTRIBUTE)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.ATTRIBUTE,app.GridCells.HAS_FIXED_VALUES,commonLocators.CommonKeys.UNCHECK)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ATTRIBUTE,app.GridCells.PROPERTY_INFO,"")
    })

    it("TC - Verify delete button is working", function() {
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0);
        });
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS,CONTAINER_MATERIAL_CATALOG.CODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOGS,app.GridCells.CODE,CONTAINER_MATERIAL_CATALOG.CODE)  
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1);
        });
        
        _common.select_allContainerData(cnt.uuid.MATERIAL_GROUPS)
        _common.select_allContainerData(cnt.uuid.MATERIAL_GROUPS)
        _common.waitForLoaderToDisappear()
        _validate.verify_ToolbarButtonsDisabledEnabled(cnt.uuid.MATERIAL_GROUPS,btn.IconButtons.ICO_REC_DELETE,commonLocators.CommonKeys.DISABLED)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUPS,CONTAINER_MATERIAL_CATALOG.DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_GROUPS,app.GridCells.CODE,CONTAINER_MATERIAL_CATALOG.DESC) 
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE, app.FooterTab.ATTRIBUTES, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE)
        _common.create_newRecord(cnt.uuid.ATTRIBUTE)
        _materialPage.enterRecord_toCreateAttribute(cnt.uuid.ATTRIBUTE,ATTRIBUTE,commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.search_inSubContainer(cnt.uuid.ATTRIBUTE,ATTRIBUTE)
        _common.select_rowInContainer(cnt.uuid.ATTRIBUTE)
        _common.delete_recordFromContainer(cnt.uuid.ATTRIBUTE)
        _common.search_inSubContainer(cnt.uuid.ATTRIBUTE,ATTRIBUTE)
        _validate.verify_isRecordDeleted(cnt.uuid.ATTRIBUTE,ATTRIBUTE)
    })
});

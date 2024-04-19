import { app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const ATTRIBUTE = "ATTRIBUTE-" + Cypress._.random(0, 9999);
const MATERIAL_CATALOG_CODE="MC" + Cypress._.random(0, 999);
const MATERIAL_CATALOG_DESC="MATERIAL_CATALOG_DESC-" + Cypress._.random(0, 999);
let MATERIAL_CATALOGS_PARAMETER:DataCells
let CONTAINER_COLUMNS_MATERIAL_CATALOG

const MATERIAL_GROUPS_CODE="MG" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_DESC="MATERIAL_GROUPS_DESC-" + Cypress._.random(0, 999);
let MATERIAL_GROUP_PARAMETER:DataCells
let CONTAINER_COLUMNS_MATERIAL_GROUP

const ATTRIBUTE_VALUE="AV-"+Cypress._.random(0, 9999);
const ATTRIBUTE_VALUE_1="AVE-"+Cypress._.random(0, 9999);
const ATTRIBUTE_VALUE_2="ATV-"+Cypress._.random(0, 9999);
let ATTRIBUTE_PARAMETER:DataCells
let CONTAINER_COLUMNS_ATTRIBUTE

let TRANSLATION_TYPE1:DataCells
let TRANSLATION_TYPE2:DataCells

let CONTAINERS_MATERIAL_CATALOG

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Material");

ALLURE.story("PCM- 2.113 | Define value for each of created attribute of a material group (can be fixed or variable)");
describe("PCM- 2.113 | Define value for each of created attribute of a material group (can be fixed or variable)", () => {
    before(function () {
        cy.fixture("pcm/pcm-2.113-define-value-for-each-of-created-attribute-of-a-material-group-can-be-fixed-or-variable.json").then((data) => {
            this.data = data;
            CONTAINERS_MATERIAL_CATALOG=this.data.CONTAINERS.MATERIAL_CATALOG
            MATERIAL_CATALOGS_PARAMETER={
                [app.GridCells.CODE]:MATERIAL_CATALOG_CODE,
                [app.GridCells.DESCRIPTION_INFO]:MATERIAL_CATALOG_DESC,
                [app.GridCells.BUSINESS_PARTNER_FK]:CONTAINERS_MATERIAL_CATALOG.BUSINESS_PARTNER
            } 
            CONTAINER_COLUMNS_MATERIAL_CATALOG=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
            
            MATERIAL_GROUP_PARAMETER={
                [app.GridCells.CODE]:MATERIAL_GROUPS_CODE,
                [app.GridCells.DESCRIPTION_INFO]:MATERIAL_GROUPS_DESC
            }
            CONTAINER_COLUMNS_MATERIAL_GROUP=this.data.CONTAINER_COLUMNS.MATERIAL_GROUP

            ATTRIBUTE_PARAMETER={
                [app.GridCells.PROPERTY_INFO]:ATTRIBUTE,
                [app.GridCells.HAS_FIXED_VALUES]:commonLocators.CommonKeys.CHECK
            }
            CONTAINER_COLUMNS_ATTRIBUTE=this.data.CONTAINER_COLUMNS.ATTRIBUTE

            TRANSLATION_TYPE1={
                [app.GridCells.LANG_NAME]:this.data.CONTAINERS.TRANSLATION
            }
            TRANSLATION_TYPE2={
                [app.GridCells.LANG_NAME]:this.data.CONTAINERS.TRANSLATION_TYPE
            }
        })
        .then(()=>{
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        })
    });

    after(() => {
        cy.LOGOUT();
    });
    
    it("TC - Create material catalog and material group", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.setDefaultView(app.TabBar.CATALOGS)
            _common.waitForLoaderToDisappear()
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG);
        })
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
        _common.waitForLoaderToDisappear()

        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOGS_PARAMETER);
        cy.SAVE()
         _common.waitForLoaderToDisappear()
        cy.SAVE()
         _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS)

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUP);
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_GROUPS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUP_PARAMETER)
        cy.SAVE()
         _common.waitForLoaderToDisappear()
        cy.SAVE()
         _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_GROUPS)
    })

    it("TC - Create attribute", function () {
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE, app.FooterTab.ATTRIBUTES, 2);
            _common.setup_gridLayout(cnt.uuid.ATTRIBUTE,CONTAINER_COLUMNS_ATTRIBUTE)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE)
        _common.create_newRecord(cnt.uuid.ATTRIBUTE)
        _materialPage.enterRecord_toCreateNewAttribute(cnt.uuid.ATTRIBUTE,ATTRIBUTE_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Select a attribute, then attribute value container is allowed to be operational", function () {
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOG_CODE)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1)
        })
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUPS_CODE)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE_VALUES, app.FooterTab.ATTRIBUTES_VALUES, 3);
        });
        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE_VALUES)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE, app.FooterTab.ATTRIBUTES, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE)
        _common.select_allContainerData(cnt.uuid.ATTRIBUTE)
        _common.select_allContainerData(cnt.uuid.ATTRIBUTE)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE_VALUES, app.FooterTab.ATTRIBUTES_VALUES, 3);
        });
        _validate.verify_ToolbarButtonsDisabledEnabled(cnt.uuid.ATTRIBUTE_VALUES,btn.ToolBar.ICO_REC_NEW,commonLocators.CommonKeys.DISABLED)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE, app.FooterTab.ATTRIBUTES, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE)
        _common.search_inSubContainer(cnt.uuid.ATTRIBUTE,ATTRIBUTE)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE_VALUES, app.FooterTab.ATTRIBUTES_VALUES, 3);
        });
        _validate.verify_ToolbarButtonsDisabledEnabled(cnt.uuid.ATTRIBUTE_VALUES,btn.ToolBar.ICO_REC_NEW,commonLocators.CommonKeys.ENABLED)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify new button is working and value is allowed to be inputted", function () {
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE_VALUES, app.FooterTab.ATTRIBUTES_VALUES, 3);
        });
        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE_VALUES)
        _common.waitForLoaderToDisappear()

        _common.create_newRecord(cnt.uuid.ATTRIBUTE_VALUES)
        _common.enterRecord_inNewRow(cnt.uuid.ATTRIBUTE_VALUES, app.GridCells.CHARACTERISTIC_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, ATTRIBUTE_VALUE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE_VALUES)
        _common.search_inSubContainer(cnt.uuid.ATTRIBUTE_VALUES,ATTRIBUTE_VALUE)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.ATTRIBUTE_VALUES,app.GridCells.CHARACTERISTIC_INFO,ATTRIBUTE_VALUE)
    })

    it("TC - Verify delete button is working", function () {
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE_VALUES, app.FooterTab.ATTRIBUTES_VALUES, 3);
        });
        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE_VALUES)
        _common.search_inSubContainer(cnt.uuid.ATTRIBUTE_VALUES,ATTRIBUTE_VALUE)
        _common.waitForLoaderToDisappear()
        _common.delete_recordFromContainer(cnt.uuid.ATTRIBUTE_VALUES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _validate.verify_isRecordDeleted(cnt.uuid.ATTRIBUTE_VALUES,ATTRIBUTE_VALUE)
    })

    it("TC - Verify value is allowed to be null", function () {
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE_VALUES, app.FooterTab.ATTRIBUTES_VALUES, 3);
        });
        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE_VALUES)
        _common.create_newRecord(cnt.uuid.ATTRIBUTE_VALUES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE_VALUES)
        _common.select_rowInContainer(cnt.uuid.ATTRIBUTE_VALUES)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ATTRIBUTE_VALUES,app.GridCells.CHARACTERISTIC_INFO,"")
    })
   
    it("TC - Verify value is allowed to translate", function () {
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TRANSLATION_MATERIALCATALOG, app.FooterTab.TRASLATION, 2);
        });
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOG_CODE)

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1)
        })
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUPS_CODE)

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE, app.FooterTab.ATTRIBUTES, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE)
        _common.search_inSubContainer(cnt.uuid.ATTRIBUTE,ATTRIBUTE)

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE_VALUES, app.FooterTab.ATTRIBUTES_VALUES, 3);
        });
        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE_VALUES)
        _common.create_newRecord(cnt.uuid.ATTRIBUTE_VALUES)
        _common.enterRecord_inNewRow(cnt.uuid.ATTRIBUTE_VALUES, app.GridCells.CHARACTERISTIC_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, ATTRIBUTE_VALUE_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE_VALUES)
        _common.create_newRecord(cnt.uuid.ATTRIBUTE_VALUES)
        _common.enterRecord_inNewRow(cnt.uuid.ATTRIBUTE_VALUES, app.GridCells.CHARACTERISTIC_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, ATTRIBUTE_VALUE_2)
        cy.SAVE()
         _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE_VALUES)
        _common.search_inSubContainer(cnt.uuid.ATTRIBUTE_VALUES,ATTRIBUTE_VALUE_1)


        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TRANSLATION_MATERIALCATALOG, app.FooterTab.TRASLATION, 2);
        });
         _common.waitForLoaderToDisappear()
        _materialPage.enterRecord_toAddTranslationValue(cnt.uuid.TRANSLATION_MATERIALCATALOG,TRANSLATION_TYPE1)
         _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE_VALUES, app.FooterTab.ATTRIBUTES_VALUES, 3);
        });

        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE_VALUES)
        _common.search_inSubContainer(cnt.uuid.ATTRIBUTE_VALUES,ATTRIBUTE_VALUE_2)

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TRANSLATION_MATERIALCATALOG, app.FooterTab.TRASLATION, 2);
        });
         _common.waitForLoaderToDisappear()
        _materialPage.enterRecord_toAddTranslationValue(cnt.uuid.TRANSLATION_MATERIALCATALOG,TRANSLATION_TYPE2)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()


        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE_VALUES, app.FooterTab.ATTRIBUTES_VALUES, 3);
        });

        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE_VALUES)
        _common.search_inSubContainer(cnt.uuid.ATTRIBUTE_VALUES,ATTRIBUTE_VALUE_1)

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TRANSLATION_MATERIALCATALOG, app.FooterTab.TRASLATION, 2);
        });
        _common.waitForLoaderToDisappear()
      
        _validate.verify_translationValue(cnt.uuid.TRANSLATION_MATERIALCATALOG,TRANSLATION_TYPE1)
        
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE_VALUES, app.FooterTab.ATTRIBUTES_VALUES, 3);
        });

        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE_VALUES)
        _common.search_inSubContainer(cnt.uuid.ATTRIBUTE_VALUES,ATTRIBUTE_VALUE_2)

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TRANSLATION_MATERIALCATALOG, app.FooterTab.TRASLATION, 2);
        });
        _common.waitForLoaderToDisappear()
        _validate.verify_translationValue(cnt.uuid.TRANSLATION_MATERIALCATALOG,TRANSLATION_TYPE2)

    })

    
});

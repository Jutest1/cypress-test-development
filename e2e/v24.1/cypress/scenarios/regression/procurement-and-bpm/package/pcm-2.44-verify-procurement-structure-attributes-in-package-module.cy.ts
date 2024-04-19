
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig } from "cypress/pages";
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
const ALLURE = Cypress.Allure.reporter.getInterface();

const SERVICEPRO = "SCODE-" + Cypress._.random(0, 9999);
const MATERIALPRO = "MCODE-" + Cypress._.random(0, 9999);
const PRODESC = "PRODESC-" + Cypress._.random(0, 9999);
const CHARGROUP = "CHARGROUP-" + Cypress._.random(0, 9999);
const CHAR = "CHAR-" + Cypress._.random(0, 9999);
const CHAR_DESC = "CHAR_DESC-" + Cypress._.random(0, 9999);

let CONATINER_COLUMNS_CONFIGURATION_HEADERS
let CONTAINER_COLUMNS_CONFIGURATION
let CONTAINER_COLUMNS_HEADER_TEXTS
let CONTAINER_COLUMNS_CHARACTERISTICS_GROUP
let CONTAINER_COLUMNS_CHARACTERISTICS
let CONTAINER_COLUMNS_CHARACTERISTICS_SECTIONS
let CONTAINERS_CHARACTERISTICS_SECTION
let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE
let CONTAINER_COLUMNS_GENERALS
let PROCUREMENT_STRUCTURE_SERVICE_PARAMETERS:DataCells
let PROCUREMENT_STRUCTURE_MATERIAL_PARAMETERS:DataCells
let CONTAINERS_GENERAL
let CONTAINER_COLUMNS_CLERK
let CONTAINERS_CLERK
let CONTAINER_COLUMNS_CERTIFICATES
let CERTIFICATES_SERVICES_PARAMETERS:DataCells
let CERTIFICATES_MATERIAL_PARAMETERS:DataCells
let CONTAINERS_CERTIFICATES
let CONTAINER_COLUMNS_ROLE_CHARACTERISTICS
let CONTAINERS_ROLE_CHARACTERISTICS
let CONTAINER_COLUMNS_PACKAGE
let CONTAINER_COLUMNS_PACKAGE_HEADER_TEXTS
let CONTAINER_COLUMNS_CLERK_RIGHT
let CONTAINER_COLUMNS_PACKAGE_CERTIFICATES
let CONTAINER_COLUMNS_PACKAGE_GENERALS
let CONTAINER_COLUMNS_PACKAGE_CHARACTER

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.44 | Verify Procurement structure attributes (Generals, certificate, header text, characteristics,characteristics2, Clerk) in Package module.");
describe("PCM- 2.44 | Verify Procurement structure attributes (Generals, certificate, header text, characteristics,characteristics2, Clerk) in Package module.", () => {
  
    before(function () {
        cy.fixture("pcm/pcm-2.44-verify-procurement-structure-attributes-in-package-module.json")
          .then((data) => {
            this.data = data;
            CONATINER_COLUMNS_CONFIGURATION_HEADERS=this.data.CONTAINER_COLUMNS.CONFIGURATION_HEADERS
            CONTAINER_COLUMNS_CONFIGURATION=this.data.CONTAINER_COLUMNS.CONFIGURATION
            CONTAINER_COLUMNS_HEADER_TEXTS=this.data.CONTAINER_COLUMNS.HEADER_TEXTS
            CONTAINER_COLUMNS_CHARACTERISTICS_GROUP=this.data.CONTAINER_COLUMNS.CHARACTERISTICS_GROUP
            CONTAINER_COLUMNS_CHARACTERISTICS=this.data.CONTAINER_COLUMNS.CHARACTERISTICS
            CONTAINER_COLUMNS_CHARACTERISTICS_SECTIONS=this.data.CONTAINER_COLUMNS.CHARACTERISTICS_SECTIONS
            CONTAINERS_CHARACTERISTICS_SECTION=this.data.CONTAINERS.CHARACTERISTICS_SECTION
            CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE=this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE
            CONTAINER_COLUMNS_GENERALS=this.data.CONTAINER_COLUMNS.GENERALS
            PROCUREMENT_STRUCTURE_SERVICE_PARAMETERS={
              [app.GridCells.PRC_STRUCTURE_TYPE_FK]:commonLocators.CommonKeys.SERVICE,
              [app.GridCells.CODE]:SERVICEPRO,
              [app.GridCells.DESCRIPTION_INFO]:SERVICEPRO,
              [app.GridCells.CLERK_REQ_FK]:commonLocators.CommonKeys.PROJECT_MANAGER,
              [app.GridCells.CLERK_PRC_FK]:commonLocators.CommonKeys.PROJECT_MANAGER,
              [app.GridCells.PRC_CONFIG_HEADER_FK]:commonLocators.CommonKeys.SERVICE
            }
            PROCUREMENT_STRUCTURE_MATERIAL_PARAMETERS={
              [app.GridCells.PRC_STRUCTURE_TYPE_FK]:commonLocators.CommonKeys.MATERIAL,
              [app.GridCells.CODE]:MATERIALPRO,
              [app.GridCells.DESCRIPTION_INFO]:MATERIALPRO,
              [app.GridCells.CLERK_REQ_FK]:commonLocators.CommonKeys.PROJECT_MANAGER,
              [app.GridCells.CLERK_PRC_FK]:commonLocators.CommonKeys.PROJECT_MANAGER,
              [app.GridCells.PRC_CONFIG_HEADER_FK]:commonLocators.CommonKeys.MATERIAL
            }
            CONTAINERS_GENERAL=this.data.CONTAINERS.GENERAL
            CONTAINER_COLUMNS_CLERK=this.data.CONTAINER_COLUMNS.CLERK
            CONTAINERS_CLERK=this.data.CONTAINERS.CLERK
            CONTAINER_COLUMNS_CERTIFICATES=this.data.CONTAINER_COLUMNS.CERTIFICATES
            CONTAINERS_CERTIFICATES=this.data.CONTAINERS.CERTIFICATES

            CERTIFICATES_SERVICES_PARAMETERS={
              [app.GridCells.PRC_CONFIG_HEADER_FK]:commonLocators.CommonKeys.SERVICE,
              [app.GridCells.BPD_CERTIFICATE_TYPE_FK]:CONTAINERS_CERTIFICATES.TYPE[0],
              [app.GridCells.IS_REQUIRED]:commonLocators.CommonKeys.CHECK,
              [app.GridCells.IS_MANDATORY]:commonLocators.CommonKeys.CHECK
            }
            CERTIFICATES_MATERIAL_PARAMETERS={
              [app.GridCells.PRC_CONFIG_HEADER_FK]:commonLocators.CommonKeys.MATERIAL,
              [app.GridCells.BPD_CERTIFICATE_TYPE_FK]:CONTAINERS_CERTIFICATES.TYPE[1],
              [app.GridCells.IS_REQUIRED]:commonLocators.CommonKeys.CHECK,
              [app.GridCells.IS_MANDATORY]:commonLocators.CommonKeys.CHECK
            }
            CONTAINER_COLUMNS_ROLE_CHARACTERISTICS=this.data.CONTAINER_COLUMNS.ROLE_CHARACTERISTICS
            CONTAINERS_ROLE_CHARACTERISTICS=this.data.CONTAINERS.ROLE_CHARACTERISTICS
            CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE_HEADER_TEXTS=this.data.CONTAINER_COLUMNS.PACKAGE_HEADER_TEXTS
            CONTAINER_COLUMNS_CLERK_RIGHT=this.data.CONTAINER_COLUMNS.CLERK_RIGHT
            CONTAINER_COLUMNS_PACKAGE_CERTIFICATES=this.data.CONTAINER_COLUMNS.PACKAGE_CERTIFICATES
            CONTAINER_COLUMNS_PACKAGE_GENERALS=this.data.CONTAINER_COLUMNS.PACKAGE_GENERALS
            CONTAINER_COLUMNS_PACKAGE_CHARACTER=this.data.CONTAINER_COLUMNS.PACKAGE_CHARACTER
          })
          .then(()=>{
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.setDefaultView(app.TabBar.PROJECT)
                _common.waitForLoaderToDisappear()
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
            _common.waitForLoaderToDisappear()   
          })
    });

    after(() => {
        cy.LOGOUT();
    });
    
    it("TC - Create configurations and header texts for service", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER, 0);
            _common.setup_gridLayout(cnt.uuid.CONFIGURATION_HEADER,CONATINER_COLUMNS_CONFIGURATION_HEADERS)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.SERVICE)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.HEADER).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CONFIGURATIONS, app.FooterTab.CONFIGURATIONS, 2);
          _common.setup_gridLayout(cnt.uuid.CONFIGURATIONS,CONTAINER_COLUMNS_CONFIGURATION)
        });
        _common.maximizeContainer(cnt.uuid.CONFIGURATIONS)
        _common.select_dataFromSubContainer(cnt.uuid.CONFIGURATIONS,commonLocators.CommonKeys.PACKAGE)
        _common.clickOn_activeContainerButton(cnt.uuid.CONFIGURATIONS,btn.IconButtons.ICO_TREE_COLLAPSE)
        _common.select_dataFromSubContainer(cnt.uuid.CONFIGURATIONS,commonLocators.CommonKeys.CONSTRUCTION)
        _common.create_newRecord(cnt.uuid.CONFIGURATIONS)
        _procurementConfig.enterRecord_ToCreateConfigurations(SERVICEPRO)
        cy.SAVE()
        cy.wait(1000)// Added this wait container loading takes time
        _common.waitForLoaderToDisappear()
        _common.select_dataFromSubContainer(cnt.uuid.CONFIGURATIONS,commonLocators.CommonKeys.PACKAGE)
        _common.clickOn_activeContainerButton(cnt.uuid.CONFIGURATIONS,btn.IconButtons.ICO_TREE_COLLAPSE)
        _common.select_dataFromSubContainer(cnt.uuid.CONFIGURATIONS,commonLocators.CommonKeys.CONSTRUCTION)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.select_dataFromSubContainer(cnt.uuid.CONFIGURATIONS,SERVICEPRO)
        _common.minimizeContainer(cnt.uuid.CONFIGURATIONS)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.HEADER).then(() => {
          _common.select_tabFromFooter(cnt.uuid.HEADER_TEXTS, app.FooterTab.HEADER_TEXTS, 3);
          _common.setup_gridLayout(cnt.uuid.HEADER_TEXTS,CONTAINER_COLUMNS_HEADER_TEXTS)
        });
        _common.create_newRecord(cnt.uuid.HEADER_TEXTS)
        _procurementConfig.enterRecord_ToCreateHeaderTexts(commonLocators.CommonKeys.INFO_TEXT,commonLocators.CommonKeys.INVOICE_FOOTER,commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create configurations and header texts for material", function () {
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.MATERIAL)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.HEADER).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CONFIGURATIONS, app.FooterTab.CONFIGURATIONS, 2);
        });
        _common.maximizeContainer(cnt.uuid.CONFIGURATIONS)
        _common.select_dataFromSubContainer(cnt.uuid.CONFIGURATIONS,commonLocators.CommonKeys.PACKAGE)
        _common.clickOn_activeContainerButton(cnt.uuid.CONFIGURATIONS,btn.IconButtons.ICO_TREE_COLLAPSE)
        _common.select_dataFromSubContainer(cnt.uuid.CONFIGURATIONS,commonLocators.CommonKeys.CONSTRUCTION)
        _common.create_newRecord(cnt.uuid.CONFIGURATIONS)
        _procurementConfig.enterRecord_ToCreateConfigurations(MATERIALPRO)
        cy.SAVE()
        cy.wait(1000)// Added this wait container loading takes time
        _common.waitForLoaderToDisappear()
        _common.select_dataFromSubContainer(cnt.uuid.CONFIGURATIONS,commonLocators.CommonKeys.PACKAGE)
        _common.clickOn_activeContainerButton(cnt.uuid.CONFIGURATIONS,btn.IconButtons.ICO_TREE_COLLAPSE)
        _common.select_dataFromSubContainer(cnt.uuid.CONFIGURATIONS,commonLocators.CommonKeys.CONSTRUCTION)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.select_dataFromSubContainer(cnt.uuid.CONFIGURATIONS,MATERIALPRO)
        _common.minimizeContainer(cnt.uuid.CONFIGURATIONS)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.HEADER).then(() => {
          _common.select_tabFromFooter(cnt.uuid.HEADER_TEXTS, app.FooterTab.HEADER_TEXTS, 3);
        });
        _common.create_newRecord(cnt.uuid.HEADER_TEXTS)
        _procurementConfig.enterRecord_ToCreateHeaderTexts(commonLocators.CommonKeys.INFO_TEXT,commonLocators.CommonKeys.INTERNAL_FOOTER,commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create Characteristic Group ,Characteristic and Characteristic Sections", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CHARACTERISTICS); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_GROUPS, app.FooterTab.CHARACTERISTIC_GROUP, 0);
          _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_GROUPS,CONTAINER_COLUMNS_CHARACTERISTICS_GROUP)
        });
        _common.maximizeContainer(cnt.uuid.CHARACTERISTIC_GROUPS)
        _common.select_allContainerData(cnt.uuid.CHARACTERISTIC_GROUPS)
        _common.clickOn_toolbarButton(cnt.uuid.CHARACTERISTIC_GROUPS,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.waitForLoaderToDisappear()

        _common.create_newRecord(cnt.uuid.CHARACTERISTIC_GROUPS)
        _procurementPage.enterRecord_ToCreateCharacteristicGroups(CHARGROUP)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.minimizeContainer(cnt.uuid.CHARACTERISTIC_GROUPS)
        _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_CHAR_GROUP, app.FooterTab.CHARATERISTICS, 1);
          _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_CHAR_GROUP,CONTAINER_COLUMNS_CHARACTERISTICS)
        });
        _common.create_newRecord(cnt.uuid.CHARACTERISTIC_CHAR_GROUP)
        _procurementPage.enterRecord_ToCreateCharacteristicForCharGroups(CHAR,CHAR_DESC,commonLocators.CommonKeys.QUANTITY_SMALL)
        cy.SAVE()
        _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_SECTIONS, app.FooterTab.CHARACTERISTIC_SECTIONS, 2);
          _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_SECTIONS,CONTAINER_COLUMNS_CHARACTERISTICS_SECTIONS)
        });
        _common.maximizeContainer(cnt.uuid.CHARACTERISTIC_SECTIONS)
        _procurementPage.characteristicsSections(CONTAINERS_CHARACTERISTICS_SECTION)
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.CHARACTERISTIC_SECTIONS)
    })
    
    it("TC - Create general, certificates, clerks, characteristics for services and material", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        //Creating Procurement Structure
        _common.openTab(app.TabBar.GENERALS).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
          _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE)
        });
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.waitForLoaderToDisappear()
        _procurementPage.enterRecord_toCreateProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURES,PROCUREMENT_STRUCTURE_SERVICE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURES)
        _procurementPage.enterRecord_toCreateProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURES,PROCUREMENT_STRUCTURE_MATERIAL_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.GENERALS).then(() => {
          _common.select_tabFromFooter(cnt.uuid.GENERALS, app.FooterTab.GENERALS, 2);
          _common.setup_gridLayout(cnt.uuid.GENERALS,CONTAINER_COLUMNS_GENERALS)
        });
        //Creating General for service
        _common.openTab(app.TabBar.GENERALS).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
        });
        _common.maximizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES,SERVICEPRO)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,SERVICEPRO)
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)

        _common.create_newRecord(cnt.uuid.GENERALS)
        _procurementPage.enterRecord_ToCreateGenerals(commonLocators.CommonKeys.SERVICE,CONTAINERS_GENERAL.TYPE[0],CONTAINERS_GENERAL.VALUE[0])
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        //Creating General for material
        _common.openTab(app.TabBar.GENERALS).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
        });
        _common.maximizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES,MATERIALPRO)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MATERIALPRO)
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)

        _common.openTab(app.TabBar.GENERALS).then(() => {
          _common.select_tabFromFooter(cnt.uuid.GENERALS, app.FooterTab.GENERALS, 2);
        });
        _common.create_newRecord(cnt.uuid.GENERALS)
        _procurementPage.enterRecord_ToCreateGenerals(commonLocators.CommonKeys.MATERIAL,CONTAINERS_GENERAL.TYPE[1],CONTAINERS_GENERAL.VALUE[1])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        
        _common.openTab(app.TabBar.ROLE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURE_CLERK, app.FooterTab.CLERK, 2);
          _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURE_CLERK,CONTAINER_COLUMNS_CLERK)
        });
        _common.openTab(app.TabBar.ROLE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
        });
        _common.maximizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES,SERVICEPRO)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,SERVICEPRO)
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)

        _common.openTab(app.TabBar.ROLE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURE_CLERK, app.FooterTab.CLERK, 2);
        });
        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURE_CLERK)
        _procurementPage.enterRecord_ToCreateRolesClerk(commonLocators.CommonKeys.SERVICE,commonLocators.CommonKeys.PROJECT_MANAGER,CONTAINERS_CLERK.CLERK[0])
        cy.SAVE()
         //Creating Clerk for material
         _common.openTab(app.TabBar.ROLE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
        });
        _common.maximizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES,MATERIALPRO)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MATERIALPRO)
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)

        _common.openTab(app.TabBar.ROLE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURE_CLERK, app.FooterTab.CLERK, 2);
        });
        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURE_CLERK)
        _procurementPage.enterRecord_ToCreateRolesClerk(commonLocators.CommonKeys.MATERIAL,commonLocators.CommonKeys.PROJECT_MANAGER,CONTAINERS_CLERK.CLERK[1])
        cy.SAVE()
        
        _common.openTab(app.TabBar.ROLE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CERTIFICATES, app.FooterTab.CERTIFICATES, 2);
          _common.setup_gridLayout(cnt.uuid.CERTIFICATES,CONTAINER_COLUMNS_CERTIFICATES)
        });
        _common.openTab(app.TabBar.ROLE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
        });
        _common.maximizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES,SERVICEPRO)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,SERVICEPRO)
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)

        _common.openTab(app.TabBar.ROLE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CERTIFICATES, app.FooterTab.CERTIFICATES, 2);
        });
        _common.create_newRecord(cnt.uuid.CERTIFICATES)
        _procurementPage.enterRecord_toCreateCertificates(cnt.uuid.CERTIFICATES,CERTIFICATES_SERVICES_PARAMETERS)
        cy.SAVE()
        //Creating certificate for material
        _common.openTab(app.TabBar.ROLE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
        });
        _common.maximizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES,MATERIALPRO)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MATERIALPRO)
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)

        _common.openTab(app.TabBar.ROLE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CERTIFICATES, app.FooterTab.CERTIFICATES, 2);
        });
        _common.create_newRecord(cnt.uuid.CERTIFICATES)
        _procurementPage.enterRecord_toCreateCertificates(cnt.uuid.CERTIFICATES,CERTIFICATES_MATERIAL_PARAMETERS)
        cy.SAVE()
        _common.openTab(app.TabBar.ROLE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 2);
          _common.waitForLoaderToDisappear()
          _common.setup_gridLayout(cnt.uuid.CHARACTERISTICS,CONTAINER_COLUMNS_ROLE_CHARACTERISTICS)
        });
        _common.openTab(app.TabBar.ROLE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
        });
         _common.maximizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES,SERVICEPRO)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,SERVICEPRO)
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)

        _common.openTab(app.TabBar.ROLE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 2);
        });
        _common.create_newRecord(cnt.uuid.CHARACTERISTICS)
        _procurementPage.enterRecord_ToCreateCharacteristics(cnt.uuid.CHARACTERISTICS,CHAR,CONTAINERS_ROLE_CHARACTERISTICS.VALUE[0],app.InputFields.INPUT_GROUP_CONTENT)
        cy.SAVE()
        //Creating Characteristics for material
        _common.openTab(app.TabBar.ROLE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
        });
        _common.maximizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES,MATERIALPRO)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MATERIALPRO)
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.openTab(app.TabBar.ROLE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 2);
        });
        _common.create_newRecord(cnt.uuid.CHARACTERISTICS)
        _procurementPage.enterRecord_ToCreateCharacteristics(cnt.uuid.CHARACTERISTICS,CHAR,CONTAINERS_ROLE_CHARACTERISTICS.VALUE[1],app.InputFields.INPUT_GROUP_CONTENT)
        cy.SAVE()
    })

    it("TC - Verify Procurement structure attributes in Package for service", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE); 
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.setDefaultView(app.TabBar.PACKAGE)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
          _common.setup_gridLayout(cnt.uuid.PACKAGE,CONTAINER_COLUMNS_PACKAGE)
        });
        _common.create_newRecord(cnt.uuid.PACKAGE)
        _package.enterRecord_toCreatePackage(SERVICEPRO,PRODESC)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGE,app.GridCells.STRUCTURE_FK,SERVICEPRO)
        //Package Header Texts
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.SUB_PACKAGE_HEADER, app.FooterTab.HEADER_TEXT, 2);
          _common.waitForLoaderToDisappear()
          _common.setup_gridLayout(cnt.uuid.SUB_PACKAGE_HEADER,CONTAINER_COLUMNS_PACKAGE_HEADER_TEXTS)
        });
        _common.assert_cellData(cnt.uuid.SUB_PACKAGE_HEADER,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.INFO_TEXT)
        _common.assert_cellData(cnt.uuid.SUB_PACKAGE_HEADER,app.GridCells.TEXT_MODULE_TYPE_FK,commonLocators.CommonKeys.INVOICE_FOOTER)
        //Package Clerk
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CLERK_RIGHT, app.FooterTab.CLERK_RIGHT, 2);
          _common.setup_gridLayout(cnt.uuid.CLERK_RIGHT,CONTAINER_COLUMNS_CLERK_RIGHT)
        });
        _common.waitForLoaderToDisappear()
        _common.assert_cellData(cnt.uuid.CLERK_RIGHT,app.GridCells.CLERK_ROLE_FK,commonLocators.CommonKeys.PROJECT_MANAGER)
        _common.assert_cellData(cnt.uuid.CLERK_RIGHT,app.GridCells.CLERK_FK,CONTAINERS_CLERK.CLERK[0])
        //Package Certificates
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PACKAGE_CERTIFICATES, app.FooterTab.CERTIFICATES, 2);
          _common.setup_gridLayout(cnt.uuid.PACKAGE_CERTIFICATES,CONTAINER_COLUMNS_PACKAGE_CERTIFICATES)
        });
        cy.wait(2000) // Added this wait script was getting failed
        _common.waitForLoaderToDisappear()
        _common.assert_cellData(cnt.uuid.PACKAGE_CERTIFICATES,app.GridCells.BPD_CERTIFICATE_TYPE_FK,CONTAINERS_CERTIFICATES.TYPE[0])
        
        //Package Generals
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PACKAGE_GENERALS, app.FooterTab.GENERALS, 2);
          _common.setup_gridLayout(cnt.uuid.PACKAGE_GENERALS,CONTAINER_COLUMNS_PACKAGE_GENERALS)
        });
        _common.waitForLoaderToDisappear()
        _common.assert_cellData(cnt.uuid.PACKAGE_GENERALS,app.GridCells.PRC_GENERALS_TYPE_FK,CONTAINERS_GENERAL.TYPE[0])
        _common.assert_cellData(cnt.uuid.PACKAGE_GENERALS,app.GridCells.VALUE,CONTAINERS_GENERAL.VALUE[0])
        //Package Characteristics
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PACKAGE_CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 2);
          _common.waitForLoaderToDisappear()
          _common.setup_gridLayout(cnt.uuid.PACKAGE_GENERALS,CONTAINER_COLUMNS_PACKAGE_CHARACTER)
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PACKAGE_CHARACTERISTICS,CHAR)
        _common.assert_cellData(cnt.uuid.PACKAGE_CHARACTERISTICS,app.GridCells.CHARACTERISTIC_FK,CHAR)
        _common.assert_forNumericValues(cnt.uuid.PACKAGE_CHARACTERISTICS,app.GridCells.VALUE_TEXT,CONTAINERS_ROLE_CHARACTERISTICS.VALUE[0])
    })

    it("TC - Verify Procurement structure attributes in Package for material", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
        });
        _common.create_newRecord(cnt.uuid.PACKAGE)
        _package.enterRecord_toCreatePackage(MATERIALPRO,PRODESC)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGE,app.GridCells.STRUCTURE_FK,MATERIALPRO)
        //Package Header Texts
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.SUB_PACKAGE_HEADER, app.FooterTab.HEADER_TEXT);
        });
        _common.waitForLoaderToDisappear()
        _common.assert_cellData(cnt.uuid.SUB_PACKAGE_HEADER,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.INFO_TEXT)
        _common.assert_cellData(cnt.uuid.SUB_PACKAGE_HEADER,app.GridCells.TEXT_MODULE_TYPE_FK,commonLocators.CommonKeys.INTERNAL_FOOTER)    
        //Package Certificates
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PACKAGE_CERTIFICATES, app.FooterTab.CERTIFICATES);
        });
        cy.wait(1000) // Added this wait script was getting failed
        _common.waitForLoaderToDisappear()
        _common.assert_cellData(cnt.uuid.PACKAGE_CERTIFICATES,app.GridCells.BPD_CERTIFICATE_TYPE_FK,CONTAINERS_CERTIFICATES.TYPE[1])
        
        //Package Generals
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PACKAGE_GENERALS, app.FooterTab.GENERALS);
        });
        _common.waitForLoaderToDisappear()
        _common.assert_cellData(cnt.uuid.PACKAGE_GENERALS,app.GridCells.PRC_GENERALS_TYPE_FK,CONTAINERS_GENERAL.TYPE[1])
        _common.assert_cellData(cnt.uuid.PACKAGE_GENERALS,app.GridCells.VALUE,CONTAINERS_GENERAL.VALUE[1])
         //Package Clerk
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CLERK_RIGHT, app.FooterTab.CLERK_RIGHT);
        });
        _common.waitForLoaderToDisappear()
        _common.assert_cellData(cnt.uuid.CLERK_RIGHT,app.GridCells.CLERK_ROLE_FK,commonLocators.CommonKeys.PROJECT_MANAGER)
        _common.assert_cellData(cnt.uuid.CLERK_RIGHT,app.GridCells.CLERK_FK,CONTAINERS_CLERK.CLERK[1])
        //Package Characteristics
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PACKAGE_CHARACTERISTICS, app.FooterTab.CHARATERISTICS);
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PACKAGE_CHARACTERISTICS,CHAR)
        _common.assert_forNumericValues(cnt.uuid.PACKAGE_CHARACTERISTICS,app.GridCells.VALUE_TEXT,CONTAINERS_ROLE_CHARACTERISTICS.VALUE[1])
        _common.assert_cellData(cnt.uuid.PACKAGE_CHARACTERISTICS,app.GridCells.CHARACTERISTIC_FK,CHAR)
    })
    
});

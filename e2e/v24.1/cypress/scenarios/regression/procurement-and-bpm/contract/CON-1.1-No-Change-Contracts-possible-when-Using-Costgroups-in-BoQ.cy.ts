import {  _common, _NoChangeContracts} from "cypress/pages";
import { app, tile, cnt ,btn,sidebar,commonLocators} from "cypress/locators";
import _ from "cypress/types/lodash";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const Cost_code = "1" + Cypress._.random(0, 999);

let BOQ_Document_Properties: DataCells;
let RECONTRACT_PARAMETER: DataCells;
let CONTAINERS_PROJECT
let CONTAINER_COLUMNS_PACKAGE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_CONTRACT;
let CONTAINER_COLUMNS_PROCUREMENT_BOQ;
let CONTAINERS_PACKAGE;
let CONTAINERS_BOQ;
let CONTAINERS_Customizing;
let CONTAINERS_COSTGROUP;
let CONTAINERS_CONTRACT;
let CONTAINERS_COSTGROUPCONFIG;
let CONTAINERS_CONTRACT1;

allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("CON-1.1-No-Change-Contracts-possible-when-Using-Costgroups-in-BoQ");

describe("CON-1.1-No-Change-Contracts-possible-when-Using-Costgroups-in-BoQ", () => {
    before(function () {
      cy.fixture("procurement-and-bpm/CON-1.1-No-Change-Contracts-possible-when-Using-Costgroups-in-BoQ.json").then((data) => {
        this.data = data;
        CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
        CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
        CONTAINERS_BOQ = this.data.CONTAINERS.BOQ
        CONTAINERS_Customizing = this.data.CONTAINERS.CUSTOMIZING
        CONTAINERS_COSTGROUP = this.data.CONTAINERS.COSTGROUP
        CONTAINERS_CONTRACT =this.data.CONTAINERS.CONTRACT
        CONTAINERS_CONTRACT1 =this.data.CONTAINERS.ORDERCHANGE
        CONTAINERS_COSTGROUPCONFIG = this.data.CONTAINERS.COSTGROUPCONFIG

        CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
        CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ;
        CONTAINER_COLUMNS_CONTRACT=this.data.CONTAINER_COLUMNS.CONTRACT;
        CONTAINER_COLUMNS_PROCUREMENT_BOQ = this.data.CONTAINER_COLUMNS.PROCUREMENT_BOQ

        BOQ_Document_Properties = {
          [commonLocators.CommonLabels.HEADER_TEXT]: [CONTAINERS_COSTGROUPCONFIG.Catalog_Assignment],
          [commonLocators.CommonLabels.EDIT_TYPE]: CONTAINERS_COSTGROUPCONFIG.check,
          [commonLocators.CommonKeys.BOQ_CATALOG_ASSIGN_DETAILS]: CONTAINERS_COSTGROUPCONFIG.create,
          [app.GridCells.GAEBCATALOGTYPE]: CONTAINERS_COSTGROUPCONFIG.CatalogType,
          [app.GridCells.COSTGROUP]: CONTAINERS_COSTGROUPCONFIG.CostGroup,
          [app.GridCells.BOQCATALOG]: CONTAINERS_COSTGROUPCONFIG.Catalog,
        }
        
        RECONTRACT_PARAMETER = {
          [commonLocators.CommonLabels.CHANGE_TYPE]: CONTAINERS_CONTRACT1.ChangeType,
          [commonLocators.CommonLabels.CHANGE_REASON]: CONTAINERS_CONTRACT1.ChangeReason
        }

      })
      .then(()=>{
      cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
      cy.fixture('procurement-and-bpm/CON-1.1-No-Change-Contracts-possible-when-Using-Costgroups-in-BoQ.json').then(function (data) {
        this.data = data;
        cy.wait(10000)
        _common.waitForLoaderToDisappear()
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        cy.wait(10000)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,CONTAINERS_PROJECT.PROJECT_NUMBER).pinnedItem();
      });
    })
    });

    it('TC - Create cost groups', function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT)
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.COST_GROUP_CATALOG, app.FooterTab.COSTGROUPCATALOG, 0);
      })
      _common.maximizeContainer(cnt.uuid.PROJECTS)
      _common.clear_subContainerFilter(cnt.uuid.COST_GROUP_CATALOG)
      _common.search_inSubContainer(cnt.uuid.COST_GROUP_CATALOG,CONTAINERS_COSTGROUP.Cost_Group_Catalogs)
      cy.wait(1000)
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.COST_GROUPS, app.FooterTab.COSTGROUPS, 0);
      });
      cy.wait(1000)
      _common.create_newRecord(cnt.uuid.COST_GROUPS);
      _NoChangeContracts.enterRecord_toCreateCostGroups(Cost_code,CONTAINERS_COSTGROUP.Description)
      cy.SAVE();
      _common.minimizeContainer(cnt.uuid.COST_GROUPS)
    });

  it('TC - Change Package Default State in Customizing', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.CUSTOMIZING)
    cy.wait(2000)
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES,app.FooterTab.DATA_TYPES,1)
    });
    _common.clear_subContainerFilter(cnt.uuid.ENTITY_TYPES);
    cy.REFRESH_CONTAINER();
    _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,CONTAINERS_Customizing.entityType);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME,CONTAINERS_Customizing.entityType);
    cy.SAVE();
    cy.wait(2000)
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INSTANCES,app.FooterTab.DATA_RECORDS,2)
    });
     cy.wait(1000)
    _common.clear_subContainerFilter(cnt.uuid.INSTANCES);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_Customizing.dataType);     
    _NoChangeContracts.customizing_DataRecordCheckBox(app.GridCells.IS_READONLY,CONTAINERS_Customizing.uncheck)    
    cy.SAVE(); 
  });

    it('TC - Create package', function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonKeys.PACKAGE)
      _common.openTab(app.TabBar.PACKAGE).then(() => {
        _common.setDefaultView(app.TabBar.PACKAGE)
        _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
      });
      cy.wait(2000)
      _common.clear_subContainerFilter(cnt.uuid.PACKAGE);
      cy.wait(1000)
      _common.create_newRecord(cnt.uuid.PACKAGE);
      _NoChangeContracts.enterRecord_toCreatePackage(CONTAINERS_PACKAGE.CONFIGURATION,CONTAINERS_PACKAGE.DESCRIPTION);
      cy.SAVE();
      cy.wait(2000)
    });

    it('TC - Creation of procurement BoQ for the selected package', function () {
      _common.openTab(app.TabBar.BOQBASED).then(()=> {
        _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ);
        _common.setup_gridLayout(cnt.uuid.PROCUREMENT_BOQS, CONTAINER_COLUMNS_PROCUREMENT_BOQ);
      });
      _common.create_newRecord(cnt.uuid.PROCUREMENT_BOQS);
      _NoChangeContracts.create_ProcuremenBoQs();
      cy.SAVE();
    });
  
    it('TC - Creation of BoQ for the selected package', function () {
      _common.openTab(app.TabBar.BOQBASED).then(() =>{
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE);
        cy.wait(1500)
        _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURE, btn.IconButtons.ICO_SETTING_DOC)
        cy.wait(1000)
        _NoChangeContracts.BoQDocumentPropertiesDialog(BOQ_Document_Properties)
        cy.wait(500).then(() => {
            _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        })
        cy.wait(2000)
        _NoChangeContracts.set_ColumnAtTop([CONTAINER_COLUMNS_BOQ.briefinfo,CONTAINER_COLUMNS_BOQ.quantity,CONTAINER_COLUMNS_BOQ.basuomfk,CONTAINER_COLUMNS_BOQ.costgroup_prj_prjcg1],cnt.uuid.BOQ_STRUCTURE)
        cy.wait(1000)
      });
      _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURE);
      _common.create_newRecord(cnt.uuid.BOQ_STRUCTURE);
      _NoChangeContracts.enterRecord_toCreateBoQStructure1(CONTAINERS_BOQ.description,CONTAINERS_BOQ.Uom,CONTAINERS_BOQ.Quantity1,Cost_code);
      cy.SAVE();
      _common.minimizeContainer(cnt.uuid.BOQ_STRUCTURE)
    });

    it("TC - Create contract", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT)
      _NoChangeContracts.create_ContractfromPackage(CONTAINERS_CONTRACT.BusinessPartner) 
      cy.wait(4000)
      _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)     
      })
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, CONTAINERS_PROJECT.PROJECT_NUMBER);
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
      cy.wait(2000)
      _common.clickOn_goToButton_toSelectModule(cnt.uuid.PROCUREMENTCONTRACT, commonLocators.CommonKeys.PACKAGE_1)
      _common.waitForLoaderToDisappear()
      cy.wait(2000)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, CONTAINERS_PROJECT.PROJECT_NUMBER);
      cy.wait(3000)
      _common.clear_subContainerFilter(cnt.uuid.PACKAGE);
    })

    it('TC - Again create BoQ Structure', function () {
      cy.wait(1000)
      _common.openTab(app.TabBar.BOQBASED).then(() =>{ 
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE);   
      });
      cy.wait(2000) 
      _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTURE,app.GridCells.TREE,app.GridCellIcons.ICO_BOQ_ITEM);
      _common.create_newRecord(cnt.uuid.BOQ_STRUCTURE);
      _NoChangeContracts.enterRecord_toCreateBoQStructure1(CONTAINERS_BOQ.description, CONTAINERS_BOQ.Uom, CONTAINERS_BOQ.Quantity2,Cost_code);
      cy.SAVE();
      cy.wait(5000)
    });

    it("TC - Recreate contract", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT)
      cy.wait(5000)
      _NoChangeContracts.create_changeOrderContractForNewBoQ_fromWizard(RECONTRACT_PARAMETER)
      cy.wait(2000)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, CONTAINERS_PROJECT.PROJECT_NUMBER);
      cy.wait(2000)
    })

    it('TC - Verify Cost Group',function(){
      _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        _NoChangeContracts.set_ColumnAtTop([CONTAINER_COLUMNS_CONTRACT.constatusfk,CONTAINER_COLUMNS_CONTRACT.code,CONTAINER_COLUMNS_CONTRACT.projectfk,CONTAINER_COLUMNS_CONTRACT.ProjectFkProjectName],cnt.uuid.PROCUREMENTCONTRACT)
        cy.wait(1000) 
      })
      _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("CONTRACT_CODE1"))
      _common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env("CONTRACT_CODE1"))
      cy.wait(2000)
      _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
      })
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _NoChangeContracts.set_ColumnAtTop([CONTAINER_COLUMNS_BOQ.briefinfo,CONTAINER_COLUMNS_BOQ.quantity,CONTAINER_COLUMNS_BOQ.basuomfk,CONTAINER_COLUMNS_BOQ.costgroup_prj_prjcg1],cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE)
      cy.wait(1000)
      _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE)
      _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE)
      _NoChangeContracts.searchRecord_byColumnFilter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.COSTGROUP_PRJ, app.InputFields.DOMAIN_TYPE_TEXT, Cost_code)
      cy.wait(1000)
      cy.wait(1000)
      _NoChangeContracts.clickOn_cellHasIcon1(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE,app.GridCells.TREE,app.GridCellIcons.ICO_BOQ_ITEM)
      _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE,app.GridCells.COSTGROUP_PRJ,Cost_code)
      cy.wait(1000)
      })

    after(() => {
        cy.LOGOUT();
    });

});
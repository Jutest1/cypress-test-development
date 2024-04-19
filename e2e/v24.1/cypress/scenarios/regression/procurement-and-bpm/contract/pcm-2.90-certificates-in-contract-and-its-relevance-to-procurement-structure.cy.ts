
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _validate } from "cypress/pages";
import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const MATERIALPRO = "MCODE-" + Cypress._.random(0, 9999);
const REQ_CODE = "REQ_CODE-" + Cypress._.random(0, 9999);

let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE
let PROCUREMENT_STRUCTURE_PARAMETERS:DataCells

let CONTAINERS_CERTIFICATES
let CONTAINER_COLUMNS_CERTIFICATES
let CERTIFICATES_PARAMETERS:DataCells

let CONTAINERS_REQUISITIONS
let CONTAINER_COLUMNS_REQUISITIONS

let CONTAINER_COLUMNS_CONTRACT_CERTIFICATE
let CONTAINER_COLUMNS_CONTRACTS

let CONTAINER_COLUMNS_DATA_RECORDS
let CONTAINER_COLUMNS_DATA_TYPES

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Contract");
ALLURE.story("PCM- 2.90 | Certificates in contract and its relevance to procurement structure");

describe("PCM- 2.90 | Certificates in contract and its relevance to procurement structure", () => {

  before(function () {
    cy.fixture("pcm/pcm-2.90-certificates-in-contract-and-its-relevance-to-procurement-structure.json")
      .then((data) => {
        this.data = data;
        CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE=this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE
        PROCUREMENT_STRUCTURE_PARAMETERS={
          [app.GridCells.CODE]:MATERIALPRO,
          [app.GridCells.PRC_STRUCTURE_TYPE_FK]:commonLocators.CommonKeys.MATERIAL,
          [app.GridCells.DESCRIPTION_INFO]:MATERIALPRO,
          [app.GridCells.CLERK_REQ_FK]:commonLocators.CommonKeys.PROJECT_MANAGER,
          [app.GridCells.CLERK_PRC_FK]:commonLocators.CommonKeys.PROJECT_MANAGER,
          [app.GridCells.PRC_CONFIG_HEADER_FK]:commonLocators.CommonKeys.MATERIAL
        }

        CONTAINER_COLUMNS_CERTIFICATES=this.data.CONTAINER_COLUMNS.CERTIFICATES
        CONTAINERS_CERTIFICATES=this.data.CONTAINERS.CERTIFICATES
        CERTIFICATES_PARAMETERS={
          [app.GridCells.PRC_CONFIG_HEADER_FK]:commonLocators.CommonKeys.MATERIAL,
          [app.GridCells.BPD_CERTIFICATE_TYPE_FK]:CONTAINERS_CERTIFICATES.TYPE,
          [app.GridCells.IS_REQUIRED]:commonLocators.CommonKeys.CHECK,
          [app.GridCells.IS_MANDATORY]:commonLocators.CommonKeys.CHECK
        }

        CONTAINERS_REQUISITIONS=this.data.CONTAINERS.REQUISITIONS
        CONTAINER_COLUMNS_REQUISITIONS=this.data.CONTAINER_COLUMNS.REQUISITIONS

        CONTAINER_COLUMNS_CONTRACTS=this.data.CONTAINER_COLUMNS.CONTRACTS
        CONTAINER_COLUMNS_CONTRACT_CERTIFICATE=this.data.CONTAINER_COLUMNS.CONTRACT_CERTIFICATE

        CONTAINER_COLUMNS_DATA_TYPES=this.data.CONTAINER_COLUMNS.DATA_TYPES
        CONTAINER_COLUMNS_DATA_RECORDS=this.data.CONTAINER_COLUMNS.DATA_RECORDS
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
  
  it("TC - Create certificates for procurement structure", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.PROCUREMENTSTRUCTURE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
      _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE)
    });
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
    _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
    _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURES)
    _procurementPage.enterRecord_toCreateProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURES,PROCUREMENT_STRUCTURE_PARAMETERS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
       
    _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CERTIFICATES, app.FooterTab.CERTIFICATES, 1);
      _common.setup_gridLayout(cnt.uuid.CERTIFICATES,CONTAINER_COLUMNS_CERTIFICATES)
    });
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
    });
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
    _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MATERIALPRO)

    _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CERTIFICATES, app.FooterTab.CERTIFICATES, 2);
    });
    _common.clear_subContainerFilter(cnt.uuid.CERTIFICATES)
    _common.create_newRecord(cnt.uuid.CERTIFICATES)
    _procurementPage.enterRecord_toCreateCertificates(cnt.uuid.CERTIFICATES,CERTIFICATES_PARAMETERS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  })

  it("TC - Create requisitions", function () {  
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
    _common.waitForLoaderToDisappear()
        
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.setDefaultView(app.TabBar.MAIN)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
      _common.setup_gridLayout(cnt.uuid.REQUISITIONS,CONTAINER_COLUMNS_REQUISITIONS)
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
    _common.create_newRecord(cnt.uuid.REQUISITIONS)
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    cy.wait(1000)// Added this wait loader take time to load
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()

    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS,app.GridCells.PROJECT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,Cypress.env("PROJECT_NUMBER"))
    _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
    _common.waitForLoaderToDisappear()

    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS,app.GridCells.STRUCTURE,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,MATERIALPRO)
    _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
    _common.waitForLoaderToDisappear()

    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS,app.GridCells.BUSINESS_PARTNER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_REQUISITIONS.BUSINESS_PARTNER)
    _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()       
    _common.saveCellDataToEnv(cnt.uuid.REQUISITIONS,app.GridCells.CODE,REQ_CODE)
  });
    
  it("TC - Change requisition status and create contract from requisition", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
    _common.waitForLoaderToDisappear()

    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
    _common.waitForLoaderToDisappear()

    _package.create_ContractfromPackage(CONTAINERS_REQUISITIONS.BUSINESS_PARTNER)
  })

  it("TC - Verify certificate under contract", function () {
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.setDefaultView(app.TabBar.CONTRACT)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS);
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACTS);
    })
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()

    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.search_fromSidebar(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("CONTRACT_CODE"))
    _common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("CONTRACT_CODE"))
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACT_CERTIFICATES, app.FooterTab.CERTIFICATES, 1);
      _common.setup_gridLayout(cnt.uuid.CONTRACT_CERTIFICATES,CONTAINER_COLUMNS_CONTRACT_CERTIFICATE)
    });
    _common.select_rowInContainer(cnt.uuid.CONTRACT_CERTIFICATES)
    _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CERTIFICATES,app.GridCells.BPD_CERTIFICATE_TYPE_FK,CONTAINERS_CERTIFICATES.TYPE)
    _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.CONTRACT_CERTIFICATES,app.GridCells.IS_REQUIRED,commonLocators.CommonKeys.CHECK)
    _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.CONTRACT_CERTIFICATES,app.GridCells.IS_MANDATORY,commonLocators.CommonKeys.CHECK)
  })

  it("TC - Verify delete certificate under contract", function () {
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACT_CERTIFICATES, app.FooterTab.CERTIFICATES, 1);
    });
    _common.clear_subContainerFilter(cnt.uuid.CONTRACT_CERTIFICATES)
    _common.search_inSubContainer(cnt.uuid.CONTRACT_CERTIFICATES,CONTAINERS_CERTIFICATES.TYPE)
    _common.waitForLoaderToDisappear()
    _common.delete_recordFromContainer(cnt.uuid.CONTRACT_CERTIFICATES)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.CONTRACT_CERTIFICATES,CONTAINERS_CERTIFICATES.TYPE)
    _validate.verify_isRecordDeleted(cnt.uuid.CONTRACT_CERTIFICATES,CONTAINERS_CERTIFICATES.TYPE)
  })

  it("TC - Verify create new certificate under contract", function () {
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACT_CERTIFICATES, app.FooterTab.CERTIFICATES, 1);
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.CONTRACT_CERTIFICATES)
    _common.create_newRecord(cnt.uuid.CONTRACT_CERTIFICATES)
    _common.edit_dropdownCellWithInput(cnt.uuid.CONTRACT_CERTIFICATES,app.GridCells.BPD_CERTIFICATE_TYPE_FK,commonLocators.CommonKeys.LIST,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CERTIFICATES.TYPE)
    _common.select_activeRowInContainer(cnt.uuid.CONTRACT_CERTIFICATES)
    _common.waitForLoaderToDisappear()
    _common.set_cellCheckboxValue(cnt.uuid.CONTRACT_CERTIFICATES,app.GridCells.IS_REQUIRED,commonLocators.CommonKeys.CHECK)
    _common.set_cellCheckboxValue(cnt.uuid.CONTRACT_CERTIFICATES,app.GridCells.IS_MANDATORY,commonLocators.CommonKeys.CHECK)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.search_inSubContainer(cnt.uuid.CONTRACT_CERTIFICATES,CONTAINERS_CERTIFICATES.TYPE)
    _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CERTIFICATES,app.GridCells.BPD_CERTIFICATE_TYPE_FK,CONTAINERS_CERTIFICATES.TYPE)
  })

  it("TC - Verify type should be mandatory and unique in select contract", function () {
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACT_CERTIFICATES, app.FooterTab.CERTIFICATES, 1);
    });
    _common.waitForLoaderToDisappear()

    _common.clear_subContainerFilter(cnt.uuid.CONTRACT_CERTIFICATES)
    _common.create_newRecord(cnt.uuid.CONTRACT_CERTIFICATES)
    _common.edit_dropdownCellWithInput(cnt.uuid.CONTRACT_CERTIFICATES,app.GridCells.BPD_CERTIFICATE_TYPE_FK,commonLocators.CommonKeys.LIST,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CERTIFICATES.TYPE)
    _common.select_activeRowInContainer(cnt.uuid.CONTRACT_CERTIFICATES)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _validate.verify_isCertificateTypeUniqueAndMandatory("The certificate type should be unique")
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
  })

  it("TC - Verify if BPD_CERTIFICATE_TYPE.ISVALUED =true, then the required amount should be enable, else it should be read only", function () {
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
      _common.setup_gridLayout(cnt.uuid.ENTITY_TYPES,CONTAINER_COLUMNS_DATA_TYPES)
    })
    _common.clear_subContainerFilter(cnt.uuid.ENTITY_TYPES)
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,commonLocators.CommonKeys.CERTIFICATE_TYPE)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,commonLocators.CommonKeys.CERTIFICATE_TYPE)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
      _common.setup_gridLayout(cnt.uuid.INSTANCES,CONTAINER_COLUMNS_DATA_RECORDS)
    })
    _common.search_inSubContainer(cnt.uuid.INSTANCES,commonLocators.CommonKeys.CIS_CERTIFICATE_EN)
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.CIS_CERTIFICATE_EN)
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_VALUED,commonLocators.CommonKeys.CHECK)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
      //Custominzing Code End
      
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);

    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACTS);
    })
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("CONTRACT_CODE"))
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACT_CERTIFICATES, app.FooterTab.CERTIFICATES, 1);
      _common.setup_gridLayout(cnt.uuid.CONTRACT_CERTIFICATES,CONTAINER_COLUMNS_CONTRACT_CERTIFICATE)
    });
    _common.search_inSubContainer(cnt.uuid.CONTRACT_CERTIFICATES,CONTAINERS_CERTIFICATES.TYPE)
    _validate.verify_inputFieldVisibility(cnt.uuid.CONTRACT_CERTIFICATES,app.GridCells.REQUIRED_AMOUNT,app.InputFields.INPUT_GROUP_CONTENT,commonLocators.CommonKeys.VISIBLE)
  })

  it("TC - Verify if BPD_CERTIFICATE_TYPE.ISVALUED = false, then it should be read only", function () {
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
      _common.setup_gridLayout(cnt.uuid.ENTITY_TYPES,CONTAINER_COLUMNS_DATA_TYPES)
    })
    _common.clear_subContainerFilter(cnt.uuid.ENTITY_TYPES)
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,commonLocators.CommonKeys.CERTIFICATE_TYPE)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,commonLocators.CommonKeys.CERTIFICATE_TYPE)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
      _common.setup_gridLayout(cnt.uuid.INSTANCES,CONTAINER_COLUMNS_DATA_RECORDS)
    })
    _common.search_inSubContainer(cnt.uuid.INSTANCES,commonLocators.CommonKeys.CIS_CERTIFICATE_EN)
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.CIS_CERTIFICATE_EN)
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_VALUED,commonLocators.CommonKeys.UNCHECK)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
      //Custominzing Code End
      
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);

    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACTS);
    })
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("CONTRACT_CODE"))
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACT_CERTIFICATES, app.FooterTab.CERTIFICATES, 1);
      _common.setup_gridLayout(cnt.uuid.CONTRACT_CERTIFICATES,CONTAINER_COLUMNS_CONTRACT_CERTIFICATE)
    });
    _common.search_inSubContainer(cnt.uuid.CONTRACT_CERTIFICATES,CONTAINERS_CERTIFICATES.TYPE)
    _validate.verify_inputFieldVisibility(cnt.uuid.CONTRACT_CERTIFICATES,app.GridCells.REQUIRED_AMOUNT,app.InputFields.INPUT_GROUP_CONTENT,commonLocators.CommonKeys.NOT_VISIBLE)
 })
});

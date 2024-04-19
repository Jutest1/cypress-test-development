
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _controllingUnit, _validate } from "cypress/pages";
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const REQ_CODE = "REQ_CODE-" + Cypress._.random(0, 999);
const DOCUMENT_ = "DOCUMENT_" + Cypress._.random(0, 999);
const NETVALUE="NETVALUE",VAT_VALUE_TOTAL="VAT_VALUE_TOTAL",GROSSS="GROSSS"
const STATUS_CHECK="STATUS-CHECK"

const CU_DESC = "CU-DESC-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS:DataCells

let CONTAINERS_REQUISITION
let CONTAINER_COLUMNS_REQUISITION

let CONTAINERS_REQUISITION_MILESTONE
let CONTAINER_COLUMNS_REQUISITION_MILESTONE

let CONTAINERS_REQUISITION_CHARACTERISTICS

let CONTAINER_COLUMNS_REQUISITION_CONTACT
let CONTAINERS_REQUISITION_CONTACT

let CONTAINER_COLUMNS_REQUISITION_SUB_CONTRACTOR
let CONTAINERS_REQUISITION_SUB_CONTRACTOR

let CONTAINER_COLUMNS_REQUISITION_CERTIFICATE
let CONTAINERS_REQUISITION_CERTIFICATE

let CONTAINER_COLUMNS_REQUISITION_GENERALS
let CONTAINERS_REQUISITION_GENERALS

let CONTAINER_COLUMNS_REQUISITION_DOCUMENT

let CONTAINER_COLUMNS_REQUISITION_TOTALS

let CONTAINER_COLUMNS_REQUISITION_ITEMS

let CONTAINER_COLUMNS_CONTRACTS

let CONTAINER_COLUMNS_CONTRACTS_MILESTONE

let CONTAINER_COLUMNS_CONTRACTS_CONTACT

let CONTAINER_COLUMNS_CONTRACTS_SUB_CONTRACTOR

let CONTAINER_COLUMNS_CONTRACTS_CERTIFICATE

let CONTAINER_COLUMNS_CONTRACTS_GENERALS

let CONTAINER_COLUMNS_CONTRACTS_DOCUMENT

let CONTAINER_COLUMNS_CONTRACT_TOTALS

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Requisition");
ALLURE.story("PCM- 2.85 | Check Data in contract from Requisition");

describe("PCM- 2.85 | Check Data in contract from Requisition", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.85-check-data-in-contract-from-requisition.json")
          .then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
            CONTAINERS_CONTROLLING_UNIT=this.data.CONTAINERS.CONTROLLING_UNIT
            CONTROLLING_UNIT_PARAMETERS={
                [app.GridCells.DESCRIPTION_INFO]:CU_DESC,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]:CONTAINERS_CONTROLLING_UNIT.UOM
            }

            CONTAINER_COLUMNS_REQUISITION=this.data.CONTAINER_COLUMNS.REQUISITION
            CONTAINERS_REQUISITION=this.data.CONTAINERS.REQUISITION

            CONTAINERS_REQUISITION_MILESTONE=this.data.CONTAINERS.REQUISITION_MILESTONE
            CONTAINER_COLUMNS_REQUISITION_MILESTONE=this.data.CONTAINER_COLUMNS.REQUISITION_MILESTONE

            CONTAINERS_REQUISITION_CHARACTERISTICS=this.data.CONTAINERS.REQUISITION_CHARACTERISTICS

            CONTAINER_COLUMNS_REQUISITION_CONTACT=this.data.CONTAINER_COLUMNS.REQUISITION_CONTACT
            CONTAINERS_REQUISITION_CONTACT=this.data.CONTAINERS.REQUISITION_CONTACT

            CONTAINER_COLUMNS_REQUISITION_SUB_CONTRACTOR=this.data.CONTAINER_COLUMNS.REQUISITION_SUB_CONTRACTOR
            CONTAINERS_REQUISITION_SUB_CONTRACTOR=this.data.CONTAINERS.REQUISITION_SUB_CONTRACTOR

            CONTAINER_COLUMNS_REQUISITION_CERTIFICATE=this.data.CONTAINER_COLUMNS.REQUISITION_CERTIFICATE
            CONTAINERS_REQUISITION_CERTIFICATE=this.data.CONTAINERS.REQUISITION_CERTIFICATE

            CONTAINER_COLUMNS_REQUISITION_GENERALS=this.data.CONTAINER_COLUMNS.REQUISITION_GENERALS
            CONTAINERS_REQUISITION_GENERALS=this.data.CONTAINERS.REQUISITION_GENERALS

            CONTAINER_COLUMNS_REQUISITION_DOCUMENT=this.data.CONTAINER_COLUMNS.REQUISITION_DOCUMENT

            CONTAINER_COLUMNS_REQUISITION_ITEMS=this.data.CONTAINER_COLUMNS.REQUISITION_ITEMS

            CONTAINER_COLUMNS_REQUISITION_TOTALS=this.data.CONTAINER_COLUMNS.REQUISITION_TOTALS

            CONTAINER_COLUMNS_CONTRACTS=this.data.CONTAINER_COLUMNS.CONTRACTS

            CONTAINER_COLUMNS_CONTRACT_TOTALS=this.data.CONTAINER_COLUMNS.CONTRACT_TOTALS

            CONTAINER_COLUMNS_CONTRACTS_DOCUMENT=this.data.CONTAINER_COLUMNS.CONTRACTS_DOCUMENT

            CONTAINER_COLUMNS_CONTRACTS_GENERALS=this.data.CONTAINER_COLUMNS.CONTRACTS_GENERALS

            CONTAINER_COLUMNS_CONTRACTS_CERTIFICATE=this.data.CONTAINER_COLUMNS.CONTRACTS_CERTIFICATE

            CONTAINER_COLUMNS_CONTRACTS_SUB_CONTRACTOR=this.data.CONTAINER_COLUMNS.CONTRACTS_SUB_CONTRACTOR

            CONTAINER_COLUMNS_CONTRACTS_CONTACT=this.data.CONTAINER_COLUMNS.CONTRACTS_CONTACT

            CONTAINER_COLUMNS_CONTRACTS_MILESTONE=this.data.CONTAINER_COLUMNS.CONTRACTS_MILESTONE
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
    
    it("TC - Create controlling unit", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS); 
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();  
      _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
        _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
        _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
      });
      _common.waitForLoaderToDisappear()
      _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
      _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT,CU_DESC)
      _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE,"CONTROLLING_UNIT_CODE")
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
      _common.waitForLoaderToDisappear()
    });

    it("TC - Create requisitions", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION); 
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.MAIN).then(() => {
        _common.setDefaultView(app.TabBar.MAIN)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
        _common.setup_gridLayout(cnt.uuid.REQUISITIONS,CONTAINER_COLUMNS_REQUISITION)
      });
      _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
      _common.create_newRecord(cnt.uuid.REQUISITIONS)
      _common.waitForLoaderToDisappear()
      cy.wait(1000)// Added this wait as modal take time to load
      _common.clickOn_modalFooterButton(btn.ButtonText.OK)
      _common.waitForLoaderToDisappear()
      _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS,app.GridCells.PROJECT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,Cypress.env("PROJECT_NUMBER"))
      _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
      _common.waitForLoaderToDisappear()
      _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS,app.GridCells.STRUCTURE,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_REQUISITION.STRUCTURE)
      _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
      _common.waitForLoaderToDisappear()
      _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS,app.GridCells.BUSINESS_PARTNER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_REQUISITION.BUSINESS_PARTNER)
      _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()      
      _common.saveCellDataToEnv(cnt.uuid.REQUISITIONS,app.GridCells.CODE,REQ_CODE)
    });

    it("TC - Create milestone for requisition", function () {
      _common.search_inSubContainer(cnt.uuid.REQUISITIONS,Cypress.env(REQ_CODE))
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.MAIN).then(() => {
        _common.select_tabFromFooter(cnt.uuid.REQUISITION_MILESTONE, app.FooterTab.MILESTONES, 2);
        _common.setup_gridLayout(cnt.uuid.REQUISITION_MILESTONE,CONTAINER_COLUMNS_REQUISITION_MILESTONE)
      });
      _common.clear_subContainerFilter(cnt.uuid.REQUISITION_MILESTONE)
      _common.create_newRecord(cnt.uuid.REQUISITION_MILESTONE)
      _procurementPage.enterRecord_toCreateRequisitionMileStone(cnt.uuid.REQUISITION_MILESTONE,CONTAINERS_REQUISITION_MILESTONE.TYPE,CONTAINERS_REQUISITION_MILESTONE.TAX_CODE,CONTAINERS_REQUISITION_MILESTONE.AMOUNT,_common.getDate(commonLocators.CommonKeys.CURRENT_SMALL))
      cy.SAVE()
      _common.waitForLoaderToDisappear()
    })   

    it("TC - Create characteristics for requisition", function () {
      _common.openTab(app.TabBar.MAIN).then(() => {
        _common.select_tabFromFooter(cnt.uuid.REQUISITION_CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 2);
      });
      _common.waitForLoaderToDisappear()
      _common.create_newRecord(cnt.uuid.REQUISITION_CHARACTERISTICS)
      _common.waitForLoaderToDisappear()
      _common.select_rowInContainer(cnt.uuid.REQUISITION_CHARACTERISTICS)
      _procurementPage.enterRecord_ToCreateCharacteristics(cnt.uuid.REQUISITION_CHARACTERISTICS,CONTAINERS_REQUISITION_CHARACTERISTICS.CODE,CONTAINERS_REQUISITION_CHARACTERISTICS.VALUE,app.InputFields.DOMAIN_TYPE_DESCRIPTION)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
    })
   
    it("TC - Create contact for requisition", function () {
      _common.openTab(app.TabBar.MAIN).then(() => {
        _common.select_tabFromFooter(cnt.uuid.REQUISITION_CONTACT, app.FooterTab.CONTACTS, 2);
        _common.setup_gridLayout(cnt.uuid.REQUISITION_CONTACT,CONTAINER_COLUMNS_REQUISITION_CONTACT)
      });
      _common.create_newRecord(cnt.uuid.REQUISITION_CONTACT)
      _procurementPage.enterRecord_toCreateRequisitionContact(cnt.uuid.REQUISITION_CONTACT,commonLocators.CommonKeys.SERVICE_PERSONNEL,CONTAINERS_REQUISITION_CONTACT.CONTACT)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
    })

    it("TC - Create subcontractor for requisition", function () {

      _common.openTab(app.TabBar.MAIN).then(() => {
        _common.select_tabFromFooter(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 2);
        _common.setup_gridLayout(cnt.uuid.REQUISITION_SUBCONTRACTOR,CONTAINER_COLUMNS_REQUISITION_SUB_CONTRACTOR)
      });
      _common.create_newRecord(cnt.uuid.REQUISITION_SUBCONTRACTOR)
      _common.waitForLoaderToDisappear()
      _procurementPage.enterRecord_toCreateRequisitionSubcontractor(cnt.uuid.REQUISITION_SUBCONTRACTOR,CONTAINERS_REQUISITION_SUB_CONTRACTOR.STRUCTURE,CONTAINERS_REQUISITION_SUB_CONTRACTOR.BUSINESS_PARTNER,CONTAINERS_REQUISITION_SUB_CONTRACTOR.CONTACT)
      cy.SAVE()
      _common.waitForLoaderToDisappear()

    })
    
    it("TC - Create certificate for requisition", function () {
      _common.openTab(app.TabBar.MAIN).then(() => {
        _common.select_tabFromFooter(cnt.uuid.REQUISITION_CERTIFICATES, app.FooterTab.CERTIFICATES, 2);
        _common.setup_gridLayout(cnt.uuid.REQUISITION_CERTIFICATES,CONTAINER_COLUMNS_REQUISITION_CERTIFICATE)
      });
      _common.create_newRecord(cnt.uuid.REQUISITION_CERTIFICATES)
      _procurementPage.enterRecord_toCreateRequisitionCertificates(cnt.uuid.REQUISITION_CERTIFICATES,CONTAINERS_REQUISITION_CERTIFICATE.TYPE,CONTAINERS_REQUISITION_CERTIFICATE.COST,_common.getDate(commonLocators.CommonKeys.INCREMENTED,5),_common.getDate(commonLocators.CommonKeys.CURRENT_SMALL))
      cy.SAVE()
      _common.waitForLoaderToDisappear()
    })

    it("TC - Create generals for requisition", function () {
      _common.openTab(app.TabBar.MAIN).then(() => {
        _common.select_tabFromFooter(cnt.uuid.REQUISITION_GENERALS, app.FooterTab.GENERALS, 2);
        _common.setup_gridLayout(cnt.uuid.REQUISITION_GENERALS,CONTAINER_COLUMNS_REQUISITION_GENERALS)
      });
      _common.create_newRecord(cnt.uuid.REQUISITION_GENERALS)
      _procurementPage.enterRecord_toCreateRequisitionGenerals(cnt.uuid.REQUISITION_GENERALS,CONTAINERS_REQUISITION_GENERALS.TYPE,CU_DESC,CONTAINERS_REQUISITION_GENERALS.TAX_CODE,CONTAINERS_REQUISITION_GENERALS.VALUE)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
    })

    it("TC - Create documents for requisition", function () {
      _common.openTab(app.TabBar.MAIN).then(() => {
        _common.select_tabFromFooter(cnt.uuid.REQUISITION_DOCUMENTS, app.FooterTab.DOCUMENT, 2);
        _common.setup_gridLayout(cnt.uuid.REQUISITION_DOCUMENTS,CONTAINER_COLUMNS_REQUISITION_DOCUMENT)
      });
      _common.create_newRecord(cnt.uuid.REQUISITION_DOCUMENTS)
      _common.enterRecord_inNewRow(cnt.uuid.REQUISITION_DOCUMENTS,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,DOCUMENT_)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
    })

    it("TC - Create items for requisition", function () {
      _common.openTab(app.TabBar.MAIN).then(() => {
        _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 2);
        _common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS,CONTAINER_COLUMNS_REQUISITION_ITEMS)
        _common.set_columnAtTop([CONTAINER_COLUMNS_REQUISITION_ITEMS.mdcmaterialfk,CONTAINER_COLUMNS_REQUISITION_ITEMS.price,CONTAINER_COLUMNS_REQUISITION_ITEMS.quantity],cnt.uuid.REQUISITIONITEMS)
      });
      _common.waitForLoaderToDisappear()
      _common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
      _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONITEMS,app.GridCells.MDC_MATERIAL_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_REQUISITION.MATERIAL_NO)
      _common.select_activeRowInContainer(cnt.uuid.REQUISITIONITEMS)
      _common.waitForLoaderToDisappear()
      _common.enterRecord_inNewRow(cnt.uuid.REQUISITIONITEMS,app.GridCells.PRICE_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_REQUISITION.PRICE)
      _common.enterRecord_inNewRow(cnt.uuid.REQUISITIONITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_REQUISITION.QUANTITY)
      _common.select_activeRowInContainer(cnt.uuid.REQUISITIONITEMS)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.MAIN).then(() => {
        _common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 2);
        _common.setup_gridLayout(cnt.uuid.REQUISITION_TOTALS,CONTAINER_COLUMNS_REQUISITION_TOTALS)
      }); 
      _common.search_inSubContainer(cnt.uuid.REQUISITION_TOTALS,commonLocators.CommonKeys.TOTAL)
      _common.waitForLoaderToDisappear()
      _common.saveCellDataToEnv(cnt.uuid.REQUISITION_TOTALS,app.GridCells.VALUE_NET,NETVALUE)
      _common.saveCellDataToEnv(cnt.uuid.REQUISITION_TOTALS,app.GridCells.VALUE_TAX,VAT_VALUE_TOTAL)
      _common.saveCellDataToEnv(cnt.uuid.REQUISITION_TOTALS,app.GridCells.GROSS,GROSSS)
    })

    it("TC - Get overview status for requistion", function () {
      _common.openTab(app.TabBar.MAIN).then(() => {
        _common.select_tabFromFooter(cnt.uuid.REQUISITION_OVERVIEW, app.FooterTab.OVERVIEW, 2);
      });
      _common.waitForLoaderToDisappear()
      _procurementPage.get_titlesOfRequisitionsOverviewCheckedStatus(cnt.uuid.REQUISITION_OVERVIEW,STATUS_CHECK)
    })

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

      _package.create_ContractfromPackage(CONTAINERS_REQUISITION.BUSINESS_PARTNER)
      _common.waitForLoaderToDisappear()

    })

    it("TC - Verify requisition under contract", function () {
      _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.setDefaultView(app.TabBar.CONTRACT)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
        _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT,CONTAINER_COLUMNS_CONTRACTS)
      });
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
      _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("CONTRACT_CODE"))
      _common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("CONTRACT_CODE"))
      _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.REQ_HEADER_FK,Cypress.env(REQ_CODE))
      _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PROJECT_FK,Cypress.env("PROJECT_NUMBER"))
      _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.STRUCTURE_CODE,CONTAINERS_REQUISITION.STRUCTURE)
      _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.BUSINESS_PARTNER_FK,CONTAINERS_REQUISITION.BUSINESS_PARTNER)
    })

    it("TC - Verify milestone under contract", function () {
 
      _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTRACT_MILESTONE, app.FooterTab.MILESTONES, 2);
        _common.setup_gridLayout(cnt.uuid.CONTRACT_MILESTONE,CONTAINER_COLUMNS_CONTRACTS_MILESTONE)
      });
      _common.clear_subContainerFilter(cnt.uuid.CONTRACT_MILESTONE)
      _common.select_rowInContainer(cnt.uuid.CONTRACT_MILESTONE)
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_MILESTONE,app.GridCells.PRC_MILESTONE_TYPE_FK,CONTAINERS_REQUISITION_MILESTONE.TYPE)
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_MILESTONE,app.GridCells.MDC_TAX_CODE_FK_SMALL,CONTAINERS_REQUISITION_MILESTONE.TAX_CODE)
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_MILESTONE,app.GridCells.AMOUNT_SMALL,parseFloat(CONTAINERS_REQUISITION_MILESTONE.AMOUNT).toFixed(2))
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_MILESTONE,app.GridCells.MILESTONE,_common.getDate(commonLocators.CommonKeys.CURRENT_SMALL))
    }) 

    it("TC - Verify characteristics under contract", function () {
      _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTRACT_CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 2);
      });
      _common.waitForLoaderToDisappear()
      _common.select_rowInContainer(cnt.uuid.CONTRACT_CHARACTERISTICS)
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CHARACTERISTICS,app.GridCells.CHARACTERISTIC_FK,CONTAINERS_REQUISITION_CHARACTERISTICS.CODE)
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CHARACTERISTICS,app.GridCells.VALUE_TEXT,CONTAINERS_REQUISITION_CHARACTERISTICS.VALUE)
    })
    
    it("TC - Verify contact under contract", function () {
       _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTRACT_CONTACT, app.FooterTab.CONTACTS, 2);
        _common.setup_gridLayout(cnt.uuid.CONTRACT_CONTACT,CONTAINER_COLUMNS_CONTRACTS_CONTACT)
      });
      _common.clear_subContainerFilter(cnt.uuid.CONTRACT_CONTACT)
      _common.select_rowInContainer(cnt.uuid.CONTRACT_CONTACT)
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CONTACT,app.GridCells.BPD_CONTACT_ROLE_FK,commonLocators.CommonKeys.SERVICE_PERSONNEL)
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CONTACT,app.GridCells.BPD_CONTACT_FK,CONTAINERS_REQUISITION_CONTACT.CONTACT)
    })

    it("TC - verify subcontractor under contract", function () {
      _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 2);
        _common.setup_gridLayout(cnt.uuid.CONTRACT_SUBCONTRACTOR,CONTAINER_COLUMNS_CONTRACTS_SUB_CONTRACTOR)
      });
      _common.clear_subContainerFilter(cnt.uuid.CONTRACT_SUBCONTRACTOR)
      _common.select_rowInContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR)
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CONTACT,app.GridCells.PRC_STRUCTURE_FK,CONTAINERS_REQUISITION_SUB_CONTRACTOR.STRUCTURE)
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CONTACT,app.GridCells.BPD_BUSINESS_PARTNER_FK,CONTAINERS_REQUISITION_SUB_CONTRACTOR.BUSINESS_PARTNER)
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CONTACT,app.GridCells.BPD_CONTACT_FK,CONTAINERS_REQUISITION_SUB_CONTRACTOR.CONTACT)
    })

    it("TC - Verify certificate under contract", function () {
      _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTRACT_CERTIFICATES, app.FooterTab.CERTIFICATES, 2);
        _common.setup_gridLayout(cnt.uuid.CONTRACT_CERTIFICATES,CONTAINER_COLUMNS_CONTRACTS_CERTIFICATE)
      });
      _common.select_rowInContainer(cnt.uuid.CONTRACT_CERTIFICATES)
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CERTIFICATES,app.GridCells.BPD_CERTIFICATE_TYPE_FK,CONTAINERS_REQUISITION_CERTIFICATE.TYPE)
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CERTIFICATES,app.GridCells.GUARANTEE_COST,parseFloat(CONTAINERS_REQUISITION_CERTIFICATE.COST).toFixed(2))
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CERTIFICATES,app.GridCells.VALID_TO,_common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,5))
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CERTIFICATES,app.GridCells.VALID_FROM,_common.getDate(commonLocators.CommonKeys.CURRENT_SMALL))
    })

    it("TC - Verify generals under contract", function () {
      _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.GENERALS_CONTRACT, app.FooterTab.GENERALS, 2);
        _common.setup_gridLayout(cnt.uuid.GENERALS_CONTRACT,CONTAINER_COLUMNS_CONTRACTS_GENERALS)
      });
      _common.clear_subContainerFilter(cnt.uuid.GENERALS_CONTRACT)
      _common.select_rowInContainer(cnt.uuid.GENERALS_CONTRACT)
      _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_CONTRACT,app.GridCells.PRC_GENERALS_TYPE_FK,CONTAINERS_REQUISITION_GENERALS.TYPE)
      _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_CONTRACT,app.GridCells.MDC_TAX_CODE_FK_SMALL,CONTAINERS_REQUISITION_GENERALS.TAX_CODE)
      _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_CONTRACT,app.GridCells.VALUE,parseFloat(CONTAINERS_REQUISITION_GENERALS.VALUE).toFixed(2))
      _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_CONTRACT,app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, Cypress.env("CONTROLLING_UNIT_CODE"))
    })

    it("TC - Verify document under contract", function () {    
      _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTRACT_DOCUMENT, app.FooterTab.DOCUMENT, 2);
        _common.setup_gridLayout(cnt.uuid.CONTRACT_DOCUMENT,CONTAINER_COLUMNS_CONTRACTS_DOCUMENT)
      });
      _common.clear_subContainerFilter(cnt.uuid.CONTRACT_DOCUMENT)
      _common.select_rowInContainer(cnt.uuid.CONTRACT_DOCUMENT)
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_DOCUMENT,app.GridCells.DESCRIPTION,DOCUMENT_)
      cy.SAVE()
    })

    it("TC - Verify total under contract", function () {
      _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTRACT_TOTALS, app.FooterTab.TOTALS, 2);
        _common.setup_gridLayout(cnt.uuid.CONTRACT_TOTALS,CONTAINER_COLUMNS_CONTRACT_TOTALS)
      }); 
      _common.clear_subContainerFilter(cnt.uuid.CONTRACT_TOTALS)
      _common.search_inSubContainer(cnt.uuid.CONTRACT_TOTALS,commonLocators.CommonKeys.TOTAL)
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_TOTALS,app.GridCells.VALUE_NET,Cypress.env(NETVALUE))
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_TOTALS,app.GridCells.VALUE_TAX,Cypress.env(VAT_VALUE_TOTAL))
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_TOTALS,app.GridCells.GROSS,Cypress.env(GROSSS))
    })

    it("TC - Verify overview status under contract", function () {
      _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTRACT_OVERVIEW, app.FooterTab.OVERVIEW, 2);
      });
      _common.waitForLoaderToDisappear()
      _validate.verify_overviewCheckedStatusForContract(cnt.uuid.CONTRACT_OVERVIEW,STATUS_CHECK)
    })
});

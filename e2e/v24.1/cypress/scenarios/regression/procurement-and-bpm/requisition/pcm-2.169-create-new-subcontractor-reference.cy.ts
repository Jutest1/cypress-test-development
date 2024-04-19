
import { tile, app, cnt, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const FAMILY_NAME="A-" + Cypress._.random(0, 999);
const FIRST_NAME="B-" + Cypress._.random(0, 999);

let CONTAINERS_REQUISITION
let CONTAINER_COLUMNS_REQUISITION
let REQUISITION_PARAMETER

const BRANCH_DESC="Br-" + Cypress._.random(0, 999);
let CONTAINERS_BRANCHES
let CONTAINER_COLUMNS_BRANCHES
let BRANCH_PARAMETER:DataCells

let CONTAINER_COLUMNS_SUPPLIERS
let SUPPLIER_PARAMETER:DataCells

let CONTAINER_COLUMNS_BUSINESS_PARTNER

let CONTAINER_COLUMNS_CONTACT

let CONTAINER_COLUMNS_CONTRACT

let CONTAINER_COLUMNS_SUB_CONTRACTOR
let SUBCONTRACT_PARAMETER:DataCells


ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Requisition");
ALLURE.story("PCM- 2.169 | Create new subcontractor reference");

describe("PCM- 2.169 | Create new subcontractor reference", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.169-create-new-subcontractor-reference.json")
          .then((data) => {
            this.data = data;

            CONTAINERS_REQUISITION=this.data.CONTAINERS.REQUISITION
            CONTAINER_COLUMNS_REQUISITION=this.data.CONTAINER_COLUMNS.REQUISITION
            REQUISITION_PARAMETER={
                [commonLocators.CommonLabels.CONFIGURATION]:CONTAINERS_REQUISITION.CONFIGURATION,
                [app.GridCells.BUSINESS_PARTNER_FK]:CONTAINERS_REQUISITION.BUSINESS_PARTNER
            }

            CONTAINERS_BRANCHES=this.data.CONTAINERS.BRANCHES
            CONTAINER_COLUMNS_BRANCHES=this.data.CONTAINER_COLUMNS.BRANCHES
            BRANCH_PARAMETER={
                [app.GridCells.DESCRIPTION]:BRANCH_DESC,
                [app.GridCells.ADDRESS_TYPE_FK]:CONTAINERS_BRANCHES.branch,
                [commonLocators.CommonLabels.STREET]:CONTAINERS_BRANCHES.STREET,
                [commonLocators.CommonKeys.ADDRESS_INDEX]:"0",
                [commonLocators.CommonLabels.ZIP_CODE]:CONTAINERS_BRANCHES.ZIP_CODE,
                [commonLocators.CommonLabels.COUNTRY]:CONTAINERS_BRANCHES.COUNTRY
            }

            CONTAINER_COLUMNS_SUPPLIERS=this.data.CONTAINER_COLUMNS.SUPPLIERS
            SUPPLIER_PARAMETER={
                [app.GridCells.SUBSIDIARY_FK]:BRANCH_DESC
            }

            CONTAINER_COLUMNS_BUSINESS_PARTNER=this.data.CONTAINER_COLUMNS.BUSINESS_PARTNER

            CONTAINER_COLUMNS_CONTACT=this.data.CONTAINER_COLUMNS.CONTACT

            CONTAINER_COLUMNS_SUB_CONTRACTOR=this.data.CONTAINER_COLUMNS.SUB_CONTRACTOR
            SUBCONTRACT_PARAMETER={
                [app.GridCells.PRC_STRUCTURE_FK]:CONTAINERS_REQUISITION.STRUCTURE,
                [app.GridCells.BPD_BUSINESS_PARTNER_FK]:CONTAINERS_REQUISITION.BUSINESS_PARTNER
            }

            CONTAINER_COLUMNS_CONTRACT=this.data.CONTAINER_COLUMNS.CONTRACT
    
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

    it("TC - Create business partner, branch, suppliers, contacts and assign procurement view",function(){
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER); 

        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
       

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.setDefaultView(app.TabBar.BUSINESS_PARTNERS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
            _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESS_PARTNER)
        });

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUBSIDIARIES, app.FooterTab.BRANCHES, 1);
            _common.setup_gridLayout(cnt.uuid.SUBSIDIARIES, CONTAINER_COLUMNS_BRANCHES)
        });

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUPPLIERS, app.FooterTab.SUPPLIERS, 1);
            _common.setup_gridLayout(cnt.uuid.SUPPLIERS, CONTAINER_COLUMNS_SUPPLIERS)
        });

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS_BP, app.FooterTab.CONTACTS, 1);
            _common.setup_gridLayout(cnt.uuid.CONTACTS_BP, CONTAINER_COLUMNS_CONTACT)
        });

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
        });
        _common.maximizeContainer(cnt.uuid.BUSINESS_PARTNERS)
        _common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS,CONTAINERS_REQUISITION.BUSINESS_PARTNER)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BUSINESS_PARTNERS,app.GridCells.BUSINESS_PARTNER_NAME_1,CONTAINERS_REQUISITION.BUSINESS_PARTNER)
        _common.minimizeContainer(cnt.uuid.BUSINESS_PARTNERS)
       _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUBSIDIARIES, app.FooterTab.BRANCHES, 1);
        });
    
        //Branch Creation

        _common.create_newRecord(cnt.uuid.SUBSIDIARIES)
        _procurementPage.enterRecord_toCreateBranch(cnt.uuid.SUBSIDIARIES,BRANCH_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _procurementPage.clickOn_ignoreButton()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.SUBSIDIARIES,app.GridCells.ADDRESSD_TO,"ADDRESS")

        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        //Supplier Creation
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUPPLIERS, app.FooterTab.SUPPLIERS, 1);
        });
        _common.create_newRecord(cnt.uuid.SUPPLIERS)
        _procurementPage.enterRecord_toCreateSupplier(cnt.uuid.SUPPLIERS,SUPPLIER_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.SUPPLIERS,app.GridCells.CODE,"SUPPLIER_CODE")
    
        //Contact Creation
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS_BP, app.FooterTab.CONTACTS, 1);
        });
        _common.maximizeContainer(cnt.uuid.CONTACTS_BP)
        _common.create_newRecord(cnt.uuid.CONTACTS_BP)
        _common.enterRecord_inNewRow(cnt.uuid.CONTACTS_BP, app.GridCells.FIRST_NAME, app.InputFields.DOMAIN_TYPE_DESCRIPTION, FIRST_NAME)
        _common.enterRecord_inNewRow(cnt.uuid.CONTACTS_BP, app.GridCells.FAMILY_NAME, app.InputFields.DOMAIN_TYPE_DESCRIPTION, FAMILY_NAME)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.CONTACTS_BP, app.GridCells.CONTACT_ROLE_FK, commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.SERVICE_PERSONNEL);
        _common.select_activeRowInContainer(cnt.uuid.CONTACTS_BP)
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.CONTACTS_BP,app.GridCells.IS_DEFAULT,commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.CONTACTS_BP)
    })

    it("TC - Create requisition", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION); 
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
        })
        _common.maximizeContainer(cnt.uuid.REQUISITIONS)
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.create_newRecord(cnt.uuid.REQUISITIONS)
        _common.waitForLoaderToDisappear()
        _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS,REQUISITION_PARAMETER)
        _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONS,app.GridCells.CODE,"REQUISITION_CODE")
        _common.minimizeContainer(cnt.uuid.REQUISITIONS)
    })

    it("TC - Verify create subcontractor for requisition", function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 2);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_SUBCONTRACTOR,CONTAINER_COLUMNS_SUB_CONTRACTOR)
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        _common.create_newRecord(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        _procurementPage.enterRecord_toCreateSubcontractor(cnt.uuid.REQUISITION_SUBCONTRACTOR,SUBCONTRACT_PARAMETER)
        _common.select_activeRowInContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.search_inSubContainer(cnt.uuid.REQUISITIONS,Cypress.env("REQUISITION_CODE"))
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        _common.search_inSubContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR,CONTAINERS_REQUISITION.BUSINESS_PARTNER)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_SUBCONTRACTOR,app.GridCells.BPD_BUSINESS_PARTNER_FK,CONTAINERS_REQUISITION.BUSINESS_PARTNER)
    })

    it("TC - Verify delete subcontractor for requisition", function () {
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.search_inSubContainer(cnt.uuid.REQUISITIONS,Cypress.env("REQUISITION_CODE"))
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        _common.search_inSubContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR,CONTAINERS_REQUISITION.BUSINESS_PARTNER)
        _common.waitForLoaderToDisappear()
        _common.delete_recordFromContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.search_inSubContainer(cnt.uuid.REQUISITIONS,Cypress.env("REQUISITION_CODE"))
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        _common.search_inSubContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR,CONTAINERS_REQUISITION.BUSINESS_PARTNER)
        _common.waitForLoaderToDisappear()
        _validate.verify_isRecordDeleted(cnt.uuid.REQUISITION_SUBCONTRACTOR,CONTAINERS_REQUISITION.BUSINESS_PARTNER)
    })

    it("TC - Verify each field is working and lookup filter correctly,also Set value to business partner, it will auto set value to branch,supplier and contact", function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.search_inSubContainer(cnt.uuid.REQUISITIONS,Cypress.env("REQUISITION_CODE"))

        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 2);
        });
        _common.maximizeContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        _common.clear_subContainerFilter(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        _common.create_newRecord(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        _procurementPage.enterRecord_toCreateSubcontractor(cnt.uuid.REQUISITION_SUBCONTRACTOR,SUBCONTRACT_PARAMETER)
        _common.select_activeRowInContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_SUBCONTRACTOR,app.GridCells.BPD_CONTACT_FK,FAMILY_NAME)
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_SUBCONTRACTOR,app.GridCells.BPD_SUPPLIER_FK,Cypress.env("SUPPLIER_CODE"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_SUBCONTRACTOR,app.GridCells.BPD_SUBSIDIARY_FK,BRANCH_DESC+','+Cypress.env("ADDRESS"))

        _validate.verify_dataUnderStructurelookups(cnt.uuid.REQUISITION_SUBCONTRACTOR,app.GridCells.PRC_STRUCTURE_FK,app.GridCells.CODE_CAPS,CONTAINERS_REQUISITION.STRUCTURE)
        _common.select_activeRowInContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_SUBCONTRACTOR,app.GridCells.PRC_STRUCTURE_FK,CONTAINERS_REQUISITION.STRUCTURE)
        _common.minimizeContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR)
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
    })

    it("TC - Verify subcontractor under contract", function () {

        _common.openTab(app.TabBar.CONTRACT).then(() => {
          _common.setDefaultView(app.TabBar.CONTRACT)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
          _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT,CONTAINER_COLUMNS_CONTRACT)
        });
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("CONTRACT_CODE"))
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 2);
            _common.setup_gridLayout(cnt.uuid.CONTRACT_SUBCONTRACTOR,CONTAINER_COLUMNS_SUB_CONTRACTOR)
        });
        _common.maximizeContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR)
        _common.clear_subContainerFilter(cnt.uuid.CONTRACT_SUBCONTRACTOR)
        _common.search_inSubContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR,CONTAINERS_REQUISITION.BUSINESS_PARTNER)
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_SUBCONTRACTOR,app.GridCells.PRC_STRUCTURE_FK,CONTAINERS_REQUISITION.STRUCTURE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_SUBCONTRACTOR,app.GridCells.BPD_BUSINESS_PARTNER_FK,CONTAINERS_REQUISITION.BUSINESS_PARTNER)
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_SUBCONTRACTOR,app.GridCells.BPD_CONTACT_FK,FAMILY_NAME)
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_SUBCONTRACTOR,app.GridCells.BPD_SUPPLIER_FK,Cypress.env("SUPPLIER_CODE"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_SUBCONTRACTOR,app.GridCells.BPD_SUBSIDIARY_FK,BRANCH_DESC+','+Cypress.env("ADDRESS"))  
        _common.minimizeContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR)
    })

});
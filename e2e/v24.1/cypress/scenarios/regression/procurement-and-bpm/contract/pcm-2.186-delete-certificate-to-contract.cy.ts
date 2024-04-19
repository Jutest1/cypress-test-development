
import { _common, _projectPage, _procurementContractPage,_procurementPage, _validate } from "cypress/pages";
import { app, tile, cnt, sidebar, commonLocators } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const MATERIALPRO_CODE = "MCODE-" + Cypress._.random(0, 9999);
const PS_DESCRIPTION = "PS_DESCRIPTION-" + Cypress._.random(0, 9999);

let CONTAINER_COLUMNS_CERTIFICATES;
let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE;
let CONTAINERS_CERTIFICATE
let CONTAINER_COLUMNS_CONTRACTS
let CONTAINERS_CONTRACT
let CONTAINERS_PROCUREMENT_CONFIG_HEADER
let PROCUREMENT_STRUCTURE_PARAMETERS:DataCells;
let CONTAINERS_CERTIFICATE_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_CONTRACT_CERTIFICATE;
let PROCUREMENT_CONTRACT_PARAMETER:DataCells;
allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 2.186 | Delete Certificates to a contract");

describe("PCM- 2.186 | Delete Certificates to a contract", () => {

   before(function () {
        cy.fixture("pcm/pcm-2.186-delete-certificate-to-contract.json").then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_CERTIFICATES = this.data.CONTAINER_COLUMNS.CERTIFICATES
            CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE = this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE
            CONTAINERS_CERTIFICATE = this.data.CONTAINERS.CERTIFICATE
            CONTAINER_COLUMNS_CONTRACTS = this.data.CONTAINER_COLUMNS.CONTRACTS
            CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT
            CONTAINERS_PROCUREMENT_CONFIG_HEADER = this.data.CONTAINERS.PROCUREMENT_CONFIG_HEADER
            CONTAINER_COLUMNS_CONTRACT_CERTIFICATE = this.data.CONTAINER_COLUMNS.CONTRACT_CERTIFICATE
            PROCUREMENT_STRUCTURE_PARAMETERS = {
                [app.GridCells.PRC_STRUCTURE_TYPE_FK]:CONTAINERS_PROCUREMENT_CONFIG_HEADER.TYPE,
                [app.GridCells.CODE]:MATERIALPRO_CODE,
                [app.GridCells.DESCRIPTION_INFO]:PS_DESCRIPTION,
                [app.GridCells.CLERK_REQ_FK]:CONTAINERS_PROCUREMENT_CONFIG_HEADER.REQ_OWNER_ROLE,
                [app.GridCells.CLERK_PRC_FK]:CONTAINERS_PROCUREMENT_CONFIG_HEADER.RESPONSIBLE_ROLE,
                [app.GridCells.PRC_CONFIG_HEADER_FK]:CONTAINERS_PROCUREMENT_CONFIG_HEADER.PRC_CONFIG_HEADER
            }
            CONTAINERS_CERTIFICATE_PARAMETERS={
                [app.GridCells.PRC_CONFIG_HEADER_FK]:CONTAINERS_CERTIFICATE.CONFIG_HEADER,
                [app.GridCells.BPD_CERTIFICATE_TYPE_FK]:CONTAINERS_CERTIFICATE.CIS_CERTIFICATE,
                [app.GridCells.IS_REQUIRED]:commonLocators.CommonKeys.CHECK,
                [app.GridCells.IS_MANDATORY]:commonLocators.CommonKeys.CHECK
            }
            PROCUREMENT_CONTRACT_PARAMETER = {
                [commonLocators.CommonLabels.CONFIGURATION]:CONTAINERS_CONTRACT.CONFIGURATION,
                [commonLocators.CommonLabels.BUSINESS_PARTNER]:CONTAINERS_CONTRACT.BUSINESS_PARTNER
              }
            
        });
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),           
            Cypress.env("parentCompanyName"), 
            Cypress.env("childCompanyName"));

            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
   });

   after(() => {
        cy.LOGOUT();
   });

   it("TC - Create certificates for procurement structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.PROCUREMENTSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE)
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES," ")
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,Buttons.IconButtons.ICO_TREE_COLLAPSE)
        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURES)
        _procurementPage.enterRecord_toCreateProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURES,PROCUREMENT_STRUCTURE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.DESCRIPTION_INFO)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MATERIALPRO_CODE)
        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CERTIFICATES, app.FooterTab.CERTIFICATES, 1);
            _common.setup_gridLayout(cnt.uuid.CERTIFICATES,CONTAINER_COLUMNS_CERTIFICATES)
        });
        _common.clear_subContainerFilter(cnt.uuid.CERTIFICATES)
        _common.create_newRecord(cnt.uuid.CERTIFICATES)
        _procurementPage.enterRecord_toCreateCertificates(cnt.uuid.CERTIFICATES,CONTAINERS_CERTIFICATE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
   })

   it("TC - Create procurement contract", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.setDefaultView(app.TabBar.CONTRACT)
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACTS);
        })
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT)
        _procurementContractPage.enterRecord_createNewProcurementContract_fromModal(PROCUREMENT_CONTRACT_PARAMETER)
        cy.SAVE()        
        _common.waitForLoaderToDisappear()
        cy.wait(2000)  //required wait
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.STRUCTURE_CODE,"grid",app.InputFields.INPUT_GROUP_CONTENT,MATERIALPRO_CODE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
   })

   it("TC - Verify certificate under contract", function () {
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_CERTIFICATES, app.FooterTab.CERTIFICATES, 1);
            _common.setup_gridLayout(cnt.uuid.CONTRACT_CERTIFICATES,CONTAINER_COLUMNS_CONTRACT_CERTIFICATE)
        });
        _common.select_rowInContainer(cnt.uuid.CONTRACT_CERTIFICATES)
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CERTIFICATES,app.GridCells.BPD_CERTIFICATE_TYPE_FK,CONTAINERS_CERTIFICATE.CIS_CERTIFICATE)
   })

   it("TC - Verify delete certificate under contract", function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_CERTIFICATES, app.FooterTab.CERTIFICATES, 1);
        });
        _common.search_inSubContainer(cnt.uuid.CONTRACT_CERTIFICATES,CONTAINERS_CERTIFICATE.CIS_CERTIFICATE)
        _common.delete_recordFromContainer(cnt.uuid.CONTRACT_CERTIFICATES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.CONTRACT_CERTIFICATES,CONTAINERS_CERTIFICATE.CIS_CERTIFICATE)
        _validate.verify_isRecordDeleted(cnt.uuid.CONTRACT_CERTIFICATES,CONTAINERS_CERTIFICATE.CIS_CERTIFICATE)
   })
})
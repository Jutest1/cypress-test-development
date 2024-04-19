import { tile, sidebar, commonLocators, app, cnt, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _procurementPage, _procurementContractPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PROCUREMENT_DESC = "PS-DESC-" + Cypress._.random(0, 9999);
const PROCUREMENT_CODE = "PS-" + Cypress._.random(0, 9999);
const CONTRACT_CODE = "CONT_CD-" + Cypress._.random(0, 9999);

let CONTAINERS_PROCUREMENT_STRUCTURE, CONTAINERS_CERTIFICATES, CONTAINERS_CONTRACTS;

let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE, CONTAINER_COLUMNS_CERTIFICATES, CONTAINER_COLUMNS_CONTRACTS;

let PROCUREMENT_STRUCTURE_PARAMETER: DataCells, CERTIFICATE_PARAMETER: DataCells, CONTRACT_PARAMETER_1: DataCells, CONTRACT_PARAMETER_2: DataCells;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Procurement");
ALLURE.story("PCM- 2.187 | Change procurement code to a requisition");

describe("PCM- 2.187 | Change procurement code to a requisition", () => {

  before(function () {
    cy.fixture("procurement-and-bpm/pcm-2.187-change-procurement-code-to-a-requisition.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE = this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE
      CONTAINERS_PROCUREMENT_STRUCTURE = this.data.CONTAINERS.PROCUREMENT_STRUCTURE
      PROCUREMENT_STRUCTURE_PARAMETER = {
        [app.GridCells.PRC_STRUCTURE_TYPE_FK]: CONTAINERS_PROCUREMENT_STRUCTURE.MATERIAL,
        [app.GridCells.CODE]: PROCUREMENT_CODE,
        [app.GridCells.DESCRIPTION_INFO]: PROCUREMENT_DESC
      }
      CONTAINER_COLUMNS_CERTIFICATES = this.data.CONTAINER_COLUMNS.CERTIFICATES
      CONTAINERS_CERTIFICATES = this.data.CONTAINERS.CERTIFICATES
      CERTIFICATE_PARAMETER = {
        [app.GridCells.PRC_CONFIG_HEADER_FK]: CommonLocators.CommonKeys.MATERIAL,
        [app.GridCells.BPD_CERTIFICATE_TYPE_FK]: CONTAINERS_CERTIFICATES.TYPE,
        [app.GridCells.IS_REQUIRED]: CommonLocators.CommonKeys.CHECK,
        [app.GridCells.IS_MANDATORY]: CommonLocators.CommonKeys.CHECK
      }
      CONTAINER_COLUMNS_CONTRACTS = this.data.CONTAINER_COLUMNS.CONTRACTS
      CONTAINERS_CONTRACTS = this.data.CONTAINERS.CONTRACTS
      CONTRACT_PARAMETER_1 = {
        [commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_CONTRACTS.CONFIGURATION,
        [commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINERS_CONTRACTS.BUSINESS_PARTNER
      }
      CONTRACT_PARAMETER_2 = {
        [commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_CONTRACTS.CONFIGURATION,
        [commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINERS_CONTRACTS.BUSINESS_PARTNER
      }
    }).then(() => {
      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"))
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    })
  });

  after(() => {
    cy.LOGOUT();
  });

  it('TC - Creation Of Record in procurement structure', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
    _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.PROCUREMENTSTRUCTURE);
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE)
    });
    cy.REFRESH_CONTAINER()
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
    _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
    _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES, btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
    _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURES)
    _procurementPage.enterRecord_toCreateProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURES, PROCUREMENT_STRUCTURE_PARAMETER)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CERTIFICATES, app.FooterTab.CERTIFICATES, 1);
      _common.setup_gridLayout(cnt.uuid.CERTIFICATES, CONTAINER_COLUMNS_CERTIFICATES)
    });
    _common.delete_recordInContainer_ifRecordExists(cnt.uuid.CERTIFICATES)
    _common.maximizeContainer(cnt.uuid.CERTIFICATES)
    _common.create_newRecord(cnt.uuid.CERTIFICATES)
    _procurementPage.enterRecord_toCreateCertificates(cnt.uuid.CERTIFICATES, CERTIFICATE_PARAMETER)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.CERTIFICATES)
  });

  it('TC - Creation Of contract by selecting procurement structure', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.setDefaultView(app.TabBar.CONTRACT);
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACTS)
    });
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT)
    _procurementContractPage.enterRecord_createNewProcurementContract_fromModal(CONTRACT_PARAMETER_1)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.STRUCTURE_CODE, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, PROCUREMENT_CODE)
    cy.SAVE()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("CONTRACT_CODE01", $ele1.text())
      cy.log(Cypress.env("CONTRACT_CODE01"))
    })
    _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
  });

  it("TC- Verify Certificate in contract with respect to Procurement structure", function () {
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACTS)
    });
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env("CONTRACT_CODE01"))
    _common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env("CONTRACT_CODE01"))
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACT_CERTIFICATES, app.FooterTab.CERTIFICATES);
    });
    _common.clear_subContainerFilter(cnt.uuid.CONTRACT_CERTIFICATES)
    _common.select_rowInContainer(cnt.uuid.CONTRACT_CERTIFICATES)
    _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CERTIFICATES, app.GridCells.BPD_CERTIFICATE_TYPE_FK, CONTAINERS_CERTIFICATES.TYPE)
  })

  it('TC - Creation Of contract by selecting procurement structure', function () {
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT)
    _common.waitForLoaderToDisappear()
    _procurementContractPage.enterRecord_createNewProcurementContract_fromModal(CONTRACT_PARAMETER_2)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("CONTRACT_CODE02", $ele1.text())
      cy.log(Cypress.env("CONTRACT_CODE02"))
    })
    _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    cy.then(() => {
      _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env("CONTRACT_CODE02"))
    })
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_CODE);
    _common.inputField_fromModal(commonLocators.CommonElements.ROW, CommonLocators.CommonLabels.CODE, 0, app.InputFields.DOMAIN_TYPE_CODE).clear().type(Cypress.env("CONTRACT_CODE01"))
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _validate.accept_buttonInModalInside("The  should be unique")
    _common.inputField_fromModal(commonLocators.CommonElements.ROW, CommonLocators.CommonLabels.CODE, 0, app.InputFields.DOMAIN_TYPE_CODE).clear().type(CONTRACT_CODE)
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
  });

})
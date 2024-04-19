import { tile, app, cnt, commonLocators, btn, sidebar } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _procurementPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINERS_PROCUREMENT_STRUCTURE, CONTAINERS_GENERALS, CONTAINERS_CERTIFICATES, CONTAINERS_REQUISITION;

let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE, CONTAINER_COLUMNS_GENERALS, CONTAINER_COLUMNS_CERTIFICATES, CONTAINER_COLUMNS_REQUISITION;

let CERTIFICATE_PARAMETERS_1: DataCells, CERTIFICATE_PARAMETERS_2: DataCells, REQUISITION_PARAMETER;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Requisition");
ALLURE.story("PCM- 2.199 | Change structure code to a requisition");

describe("PCM- 2.199 | Change structure code to a requisition", () => {

  before(function () {
    cy.fixture("pcm/pcm-2.199-change-structure-code-to-requisition.json").then((data) => {
      this.data = data;

      CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE = this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE;
      CONTAINERS_PROCUREMENT_STRUCTURE = this.data.CONTAINERS.PROCUREMENT_STRUCTURE
      CONTAINER_COLUMNS_GENERALS = this.data.CONTAINER_COLUMNS.GENERALS;
      CONTAINERS_GENERALS = this.data.CONTAINERS.GENERALS

      CONTAINER_COLUMNS_CERTIFICATES = this.data.CONTAINER_COLUMNS.CERTIFICATES;
      CONTAINERS_CERTIFICATES = this.data.CONTAINERS.CERTIFICATES
      CERTIFICATE_PARAMETERS_1 = {
        [app.GridCells.PRC_CONFIG_HEADER_FK]: CONTAINERS_CERTIFICATES.CONFIGURATION_HEADER[0],
        [app.GridCells.BPD_CERTIFICATE_TYPE_FK]: CONTAINERS_CERTIFICATES.TYPE[0],
        [app.GridCells.IS_REQUIRED]: commonLocators.CommonKeys.CHECK,
        [app.GridCells.IS_MANDATORY]: commonLocators.CommonKeys.CHECK
      };
      CERTIFICATE_PARAMETERS_2 = {
        [app.GridCells.PRC_CONFIG_HEADER_FK]: CONTAINERS_CERTIFICATES.CONFIGURATION_HEADER[0],
        [app.GridCells.BPD_CERTIFICATE_TYPE_FK]: CONTAINERS_CERTIFICATES.TYPE[1],
        [app.GridCells.IS_REQUIRED]: commonLocators.CommonKeys.CHECK,
        [app.GridCells.IS_MANDATORY]: commonLocators.CommonKeys.CHECK
      };
      CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION;
      CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION
      REQUISITION_PARAMETER = {
        [commonLocators.CommonLabels.CONFIGURATION]: CommonLocators.CommonKeys.SERVICE_REQ,
      };

    }).then(() => {
      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });
  });

  after(() => {
    cy.LOGOUT();
  });

  it("TC - Verify procurement structure code , general and certificate from procurement structure ", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
    _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
      cy.REFRESH_CONTAINER();
    });
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES);
    _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINERS_PROCUREMENT_STRUCTURE.STRUCTURE_CODE[0]);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.CODE, CONTAINERS_PROCUREMENT_STRUCTURE.STRUCTURE_CODE[0]);
    _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.GENERALS, app.FooterTab.GENERALS, 1);
    });
    _common.clear_subContainerFilter(cnt.uuid.GENERALS);
    _common.delete_recordInContainer_ifRecordExists(cnt.uuid.GENERALS);
    cy.SAVE();
    _common.create_newRecord(cnt.uuid.GENERALS);
    _procurementPage.enterRecord_ToCreateGenerals(CONTAINERS_GENERALS.CONFIGURATION_HEADER[0], CONTAINERS_GENERALS.TYPE[0], CONTAINERS_GENERALS.VALUE[0]);
    cy.SAVE();
    _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CERTIFICATES, app.FooterTab.CERTIFICATES, 1);
    });
    _common.clear_subContainerFilter(cnt.uuid.CERTIFICATES);
    _common.delete_recordInContainer_ifRecordExists(cnt.uuid.CERTIFICATES);
    cy.SAVE();
    _common.create_newRecord(cnt.uuid.CERTIFICATES);
    _procurementPage.enterRecord_toCreateCertificates(cnt.uuid.CERTIFICATES, CERTIFICATE_PARAMETERS_1);
    cy.SAVE();
    _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
      cy.REFRESH_CONTAINER();
    });
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES);
    _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINERS_PROCUREMENT_STRUCTURE.STRUCTURE_CODE[1]);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.CODE, CONTAINERS_PROCUREMENT_STRUCTURE.STRUCTURE_CODE[1]);
    _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.GENERALS, app.FooterTab.GENERALS, 1);
    });
    _common.clear_subContainerFilter(cnt.uuid.GENERALS);
    _common.delete_recordInContainer_ifRecordExists(cnt.uuid.GENERALS);
    cy.SAVE();
    _common.create_newRecord(cnt.uuid.GENERALS);
    _procurementPage.enterRecord_ToCreateGenerals(CONTAINERS_GENERALS.CONFIGURATION_HEADER[0], CONTAINERS_GENERALS.TYPE[1], CONTAINERS_GENERALS.VALUE[0]);
    cy.SAVE();

    _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CERTIFICATES, app.FooterTab.CERTIFICATES, 1);
    });
    _common.clear_subContainerFilter(cnt.uuid.CERTIFICATES);
    _common.delete_recordInContainer_ifRecordExists(cnt.uuid.CERTIFICATES);
    cy.SAVE();
    _common.create_newRecord(cnt.uuid.CERTIFICATES);
    _procurementPage.enterRecord_toCreateCertificates(cnt.uuid.CERTIFICATES, CERTIFICATE_PARAMETERS_2);
    cy.SAVE();
  });

  it("TC - Verify creation of record in requisition module", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.setDefaultView(app.TabBar.MAIN)
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
      _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
    });
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
    _common.create_newRecord(cnt.uuid.REQUISITIONS);
    _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETER);
    cy.SAVE();
    _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PROCUREMENT_STRUCTURE.STRUCTURE_CODE[0])
    _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
    cy.SAVE();
  });

  it("TC - Verify generals and certificate in requisition module", function () {
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITION_GENERALS, app.FooterTab.GENERALS, 1);
    });
    _common.clear_subContainerFilter(cnt.uuid.REQUISITION_GENERALS)
    _common.select_rowInContainer(cnt.uuid.REQUISITION_GENERALS);
    _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_GENERALS, app.GridCells.PRC_GENERALS_TYPE_FK, CONTAINERS_GENERALS.TYPE[0]);

    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITION_CERTIFICATES, app.FooterTab.CERTIFICATES, 2);
    });
    _common.select_rowInContainer(cnt.uuid.REQUISITION_CERTIFICATES);
    _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_CERTIFICATES, app.GridCells.BPD_CERTIFICATE_TYPE_FK, CONTAINERS_CERTIFICATES.TYPE[0]);
  });

  it("TC - Update procurement structure code and verify generals and certificate type", function () {
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
    });
    _common.select_rowInContainer(cnt.uuid.REQUISITIONS)
    _common.clickOn_cellInSubContainer(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE)
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PROCUREMENT_STRUCTURE.STRUCTURE_CODE[1])
    _common.select_rowInContainer(cnt.uuid.REQUISITIONS)
    cy.SAVE()
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITION_GENERALS, app.FooterTab.GENERALS, 1);
    });
    _common.clear_subContainerFilter(cnt.uuid.REQUISITION_GENERALS)
    _common.select_rowInContainer(cnt.uuid.REQUISITION_GENERALS);
    _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_GENERALS, app.GridCells.PRC_GENERALS_TYPE_FK, CONTAINERS_GENERALS.TYPE[1]);
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITION_CERTIFICATES, app.FooterTab.CERTIFICATES, 2);
    });
    _common.select_rowInContainer(cnt.uuid.REQUISITION_CERTIFICATES);
    _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_CERTIFICATES, app.GridCells.BPD_CERTIFICATE_TYPE_FK, CONTAINERS_CERTIFICATES.TYPE[1]);
  });

});


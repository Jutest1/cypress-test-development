import { _common, _projectPage, _procurementContractPage, _procurementPage, _validate } from "cypress/pages";
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
const allure = Cypress.Allure.reporter.getInterface();

var CONTRACT_CODE = 'ContractCode'

let CONTAINERS_CONTRACT;
let CONTAINER_COLUMNS_CONTRACT;
let CONTAINER_COLUMNS_CONTRACT_CERTIFICATE;
let CONTAINERS_CUSTOMIZING;
let CONTAINERS_CERTIFICATE;
let PROCUREMENT_CONTRACT_PARAMETER:DataCells;
allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 2.188 | Add and delete Certificate");

describe("PCM- 2.188 | Add and delete Certificate", () => {

  before(function () {
    cy.fixture("pcm/pcm-2.188-add-and-delete-new-certificate.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
      CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT
      CONTAINER_COLUMNS_CONTRACT_CERTIFICATE = this.data.CONTAINER_COLUMNS.CONTRACT_CERTIFICATE
      CONTAINERS_CUSTOMIZING = this.data.CONTAINERS.CUSTOMIZING
      CONTAINERS_CERTIFICATE = this.data.CONTAINERS.CERTIFICATE
      PROCUREMENT_CONTRACT_PARAMETER = {
        [commonLocators.CommonLabels.CONFIGURATION]:CONTAINERS_CONTRACT.CONFIGURATION,
        [commonLocators.CommonLabels.BUSINESS_PARTNER]:CONTAINERS_CONTRACT.BUSINESS_PARTNER
      }
      cy.preLoading(
        Cypress.env("adminUserName"),
        Cypress.env("adminPassword"),
        Cypress.env("parentCompanyName"),
        Cypress.env("childCompanyName"));

      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });
  });

  after(() => {
    cy.LOGOUT();
  });

  it("TC - Create procurement contract", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.setDefaultView(app.TabBar.CONTRACT)
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
    })
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT)
    _procurementContractPage.enterRecord_createNewProcurementContract_fromModal(PROCUREMENT_CONTRACT_PARAMETER)
    _common.waitForLoaderToDisappear()
    cy.wait(2000)//required wait
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, CONTRACT_CODE)
  })

  it("TC- Add record in Actual certificate details", function () {
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ACTUAL_CERTIFICATE_DETAIL_CONTRACT, app.FooterTab.ACTUAL_CERTIFICATE_DETAIL, 2)
      _common.waitForLoaderToDisappear()
    })
    cy.wait(500).then(()=>{
      _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE))
    })
    _common.create_newRecord(cnt.uuid.ACTUAL_CERTIFICATE_DETAIL_CONTRACT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _validate.verify_isRecordAddedInActualCertificateDetails(cnt.uuid.ACTUAL_CERTIFICATE_DETAIL_CONTRACT, commonLocators.CommonLabels.BUSINESS_PARTNER, CONTAINERS_CONTRACT.BUSINESS_PARTNER)
    _common.delete_recordFromContainer(cnt.uuid.ACTUAL_CERTIFICATE_DETAIL_CONTRACT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _validate.verify_isRecorDeletedInActualCertificateDetails(cnt.uuid.ACTUAL_CERTIFICATE_DETAIL_CONTRACT, commonLocators.CommonLabels.BUSINESS_PARTNER, CONTAINERS_CONTRACT.BUSINESS_PARTNER)
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.ACTUAL_CERTIFICATE_DETAIL_CONTRACT)
    _validate.verify_dataUnderFilterInputInActualCertificateDetails(cnt.uuid.ACTUAL_CERTIFICATE_DETAIL_CONTRACT, commonLocators.CommonLabels.BILL_TYPE, CONTAINERS_CONTRACT.VALUE_TYPE, commonLocators.CommonKeys.LIST)
  })

  it("TC- If type.hasamount=false, then the type should be unique", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 2)
    });
    _common.clear_subContainerFilter(cnt.uuid.ENTITY_TYPES);
    cy.REFRESH_CONTAINER();
    _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, CONTAINERS_CUSTOMIZING.ENTITY_TYPE);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, CONTAINERS_CUSTOMIZING.ENTITY_TYPE);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2)

    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.INSTANCES);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_CUSTOMIZING.DATATYPE);
    _validate.customizing_DataRecordCheckBox(app.GridCells.HAS_AMOUNT, commonLocators.CommonKeys.UNCHECK)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACT_CERTIFICATES, app.FooterTab.CERTIFICATES, 1);
      _common.setup_gridLayout(cnt.uuid.CONTRACT_CERTIFICATES, CONTAINER_COLUMNS_CONTRACT_CERTIFICATE)
    });
    _common.clear_subContainerFilter(cnt.uuid.CONTRACT_CERTIFICATES)
    _common.create_newRecord(cnt.uuid.CONTRACT_CERTIFICATES)
    _common.edit_dropdownCellWithInput(cnt.uuid.CONTRACT_CERTIFICATES, app.GridCells.BPD_CERTIFICATE_TYPE_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CUSTOMIZING.DATATYPE)
    _common.set_cellCheckboxValue(cnt.uuid.CONTRACT_CERTIFICATES, app.GridCells.IS_REQUIRED, commonLocators.CommonKeys.CHECK)
    _common.set_cellCheckboxValue(cnt.uuid.CONTRACT_CERTIFICATES, app.GridCells.IS_MANDATORY, commonLocators.CommonKeys.CHECK)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.CONTRACT_CERTIFICATES)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _validate.verify_isCertificateTypeUniqueAndMandatory(CONTAINERS_CERTIFICATE.CERTIFICATE_TYPE_VALIDATION_MSG)
    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
  })

});
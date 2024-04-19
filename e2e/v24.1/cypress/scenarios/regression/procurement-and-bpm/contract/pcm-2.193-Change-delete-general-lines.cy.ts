import { _common,_estimatePage,_sidebar,_validate,_mainView,_procurementContractPage} from "cypress/pages";
import { app, tile, cnt,commonLocators ,sidebar } from "cypress/locators";

import _ from "cypress/types/lodash";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();

let CONTRACT_PARAMETER:DataCells;
let CONTAINERS_CONTRACT;
let CONTAINERS_GENERALS;
let CONTAINER_COLUMNS_CONTRACT;
let CONTAINER_COLUMNS_GENERALS_CONTRACT;

allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 2.193 | Change delete general lines");

  describe('PCM- 2.193 | Change delete general lines', () => {
    before(function () {
        cy.fixture('pcm/pcm-2.193-Change-delete-general-lines.json').then((data) => {
            this.data = data;
           
            CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
            CONTAINERS_GENERALS = this.data.CONTAINERS.GENERALS

            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
            CONTAINER_COLUMNS_GENERALS_CONTRACT = this.data.CONTAINER_COLUMNS.GENERALS_CONTRACT

            CONTRACT_PARAMETER = {
                [commonLocators.CommonLabels.CONFIGURATION]:CONTAINERS_CONTRACT.CONFIGURATION,
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINERS_CONTRACT.BP1
            };           

        });
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });
  
    after(() => {
        cy.LOGOUT();
    });

  it("TC - Add new contract record and add general lines record", function () {
   
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.setDefaultView(app.TabBar.CONTRACT)
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        });
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _procurementContractPage.enterRecord_createNewProcurementContract_fromModal(CONTRACT_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.STRUCTURE_CODE,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CONTRACT.PROCUREMENTSTRUCTURE)     
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GENERALS_CONTRACT,app.FooterTab.GENERALS,0);
            _common.setup_gridLayout(cnt.uuid.GENERALS_CONTRACT, CONTAINER_COLUMNS_GENERALS_CONTRACT)
        });
        _common.create_newRecord(cnt.uuid.GENERALS_CONTRACT)
        _common.edit_dropdownCellWithCaret(cnt.uuid.GENERALS_CONTRACT,app.GridCells.PRC_GENERALS_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_GENERALS.TYPE1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    });


  it("TC - Verify change general lines record", function () {


    _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.GENERALS_CONTRACT,app.FooterTab.GENERALS,0);
        _common.setup_gridLayout(cnt.uuid.GENERALS_CONTRACT, CONTAINER_COLUMNS_GENERALS_CONTRACT)
    });
    _common.select_rowInContainer(cnt.uuid.GENERALS_CONTRACT)
    _common.edit_dropdownCellWithCaret(cnt.uuid.GENERALS_CONTRACT,app.GridCells.PRC_GENERALS_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_GENERALS.TYPE2)
    _common.edit_containerCell(cnt.uuid.GENERALS_CONTRACT,app.GridCells.VALUE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_GENERALS.VALUE)
    _common.edit_dropdownCellWithInput(cnt.uuid.GENERALS_CONTRACT,app.GridCells.MDC_TAX_CODE_FK_SMALL,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_GENERALS.TAXCODE)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_CONTRACT,app.GridCells.PRC_GENERALS_TYPE_FK,CONTAINERS_GENERALS.TYPE2)
    _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_CONTRACT,app.GridCells.VALUE,CONTAINERS_GENERALS.VALUE)
    _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_CONTRACT,app.GridCells.MDC_TAX_CODE_FK_SMALL,CONTAINERS_GENERALS.TAXCODE)
  });

  it("TC - Verify delete general lines record", function () {
   
     _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.GENERALS_CONTRACT,app.FooterTab.GENERALS,0);
        _common.setup_gridLayout(cnt.uuid.GENERALS_CONTRACT, CONTAINER_COLUMNS_GENERALS_CONTRACT)
    });
    _common.delete_recordFromContainer(cnt.uuid.GENERALS_CONTRACT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _validate.verify_isRecordDeleted(cnt.uuid.GENERALS_CONTRACT,CONTAINERS_GENERALS.TYPE2)
  });


  
});


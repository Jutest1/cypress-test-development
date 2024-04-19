import { _common, _sidebar,_estimatePage, _validate, _saleContractPage, _modalView, _package, _procurementContractPage   } from "cypress/pages";
import { app, tile, cnt, sidebar, btn,commonLocators } from "cypress/locators";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

import _ from "cypress/types/lodash";
const GENERAL_DESC1 = "GR1-" + Cypress._.random(0, 999);
const GENERAL_DESC2 = "GR2-" + Cypress._.random(0, 999);

let GENERALS_PARAMETER:DataCells;
let GENERALS2_PARAMETER:DataCells;
let CONTRACT_PARAMETER:DataCells;
let CONTAINERS_ENTITY_TYPE;
let CONTAINERS_CONTRACT;
let CONTAINERS_GENERALS;
let CONTAINERS_BUSINESSPARTNER;
let CONTAINER_COLUMNS_CONTRACT;
let CONTAINER_COLUMNS_CONTRACT_ITEMS;
let CONTAINER_COLUMNS_GENERALS_CONTRACT;
let CONTAINER_COLUMNS_GENERALS;

const allure = Cypress.Allure.reporter.getInterface()
allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 2.192 | Add new general lines in Contract Module")

    describe('PCM- 2.192 | Add new general lines in Contract Module', () => {
        before(function () {
            cy.fixture('pcm/pcm-2.192-add-new-general-lines-in-contract-module.json').then((data) => {
                this.data = data;
                CONTAINERS_ENTITY_TYPE = this.data.CONTAINERS.ENTITY_TYPE;
                CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
                CONTAINERS_BUSINESSPARTNER = this.data.CONTAINERS.BUSINESSPARTNER
                CONTAINERS_GENERALS = this.data.CONTAINERS.GENERALS

                CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
                CONTAINER_COLUMNS_CONTRACT_ITEMS = this.data.CONTAINER_COLUMNS.CONTRACT_ITEMS
                CONTAINER_COLUMNS_GENERALS_CONTRACT = this.data.CONTAINER_COLUMNS.GENERALS_CONTRACT
                CONTAINER_COLUMNS_GENERALS = this.data.CONTAINER_COLUMNS.GENERALS

                CONTRACT_PARAMETER = {
                    [commonLocators.CommonLabels.CONFIGURATION]:CONTAINERS_BUSINESSPARTNER.CONFIGURATION,
                    [commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINERS_BUSINESSPARTNER.PARTNERNAME

                };

                 GENERALS_PARAMETER = {
                    [app.GridCells.LEDGER_CONTEXT_FK]: CONTAINERS_ENTITY_TYPE.LEDGERCONTEXTNAME,
                    [app.GridCells.DESCRIPTION_INFO]: GENERAL_DESC1,
                    [app.GridCells.IS_COST]: commonLocators.CommonKeys.CHECK,
                    [app.GridCells.IS_SALES]: commonLocators.CommonKeys.UNCHECK,
                    [app.GridCells.IS_PROCUREMENT]: commonLocators.CommonKeys.CHECK
                };

                GENERALS2_PARAMETER = {
                    [app.GridCells.LEDGER_CONTEXT_FK]: CONTAINERS_ENTITY_TYPE.LEDGERCONTEXTNAME,
                    [app.GridCells.DESCRIPTION_INFO]: GENERAL_DESC2,
                    [app.GridCells.IS_SALES]: commonLocators.CommonKeys.UNCHECK,
                    [app.GridCells.IS_PROCUREMENT]:commonLocators.CommonKeys.CHECK,
                    [app.GridCells.IS_PERCENT]: commonLocators.CommonKeys.CHECK,
                }

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
    

    it("TC - Create Customising and assertion for Amount and Percent ", function () {
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ENTITY_TYPES)
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, CONTAINERS_ENTITY_TYPE.TYPE)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.ENTITY_TYPES)
        _common.search_inSubContainer(cnt.uuid.INSTANCES, " ")
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES);
        _common.maximizeContainer(cnt.uuid.INSTANCES)
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValueForAllRowCell(cnt.uuid.INSTANCES, app.GridCells.IS_DEFAULT, commonLocators.CommonKeys.UNCHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _package.enterRecord_toCreateGeneralsTypeDataRecord(cnt.uuid.INSTANCES, GENERALS_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _package.enterRecord_toCreateGeneralsTypeDataRecord(cnt.uuid.INSTANCES, GENERALS2_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify creation contract', function () {
       
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
        _common.clickOn_cellInSubContainer(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_BUSINESSPARTNER.CU)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_CONTRACT_ITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ITEMSCONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK,commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT.MATERIALCODE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()

    })

    it('TC - Add Generals Record', function () {
       
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GENERALS_CONTRACT, app.FooterTab.GENERALS, 3);
            _common.setup_gridLayout(cnt.uuid.GENERALS_CONTRACT, CONTAINER_COLUMNS_GENERALS_CONTRACT)
        });
        _common.create_newRecord(cnt.uuid.GENERALS_CONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.GENERALS_CONTRACT, app.GridCells.PRC_GENERALS_TYPE_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, GENERAL_DESC1)
        _common.enterRecord_inNewRow(cnt.uuid.GENERALS_CONTRACT, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_GENERALS.VALUE1)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_CONTRACT, app.GridCells.PRC_GENERALS_TYPE_FK, GENERAL_DESC1)
    })

    it('TC - Verify value Type of generals record with iscost Data type', function () {
        
        _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_CONTRACT, app.GridCells.VALUE_TYPE, CONTAINERS_GENERALS.COSTVALUETYPE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify type is mandatory field, and lookup filter is correct', function () {
       
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GENERALS_CONTRACT, app.FooterTab.GENERALS, 0);
        });
        _common.create_newRecord(cnt.uuid.GENERALS_CONTRACT)
        _common.enterRecord_inNewRow(cnt.uuid.GENERALS_CONTRACT, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_GENERALS.VALUE1)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _validate.validate_Text_message_In_PopUp("The field should not be empty.")
        _modalView.acceptButton(btn.ButtonText.CANCEL)
        _common.clickOn_toolbarButton(cnt.uuid.GENERALS_CONTRACT, btn.IconButtons.ICO_REC_DELETE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify type should not be duplicated', function () {
      

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GENERALS_CONTRACT, app.FooterTab.GENERALS, 0);

        });
        _common.create_newRecord(cnt.uuid.GENERALS_CONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.GENERALS_CONTRACT, app.GridCells.PRC_GENERALS_TYPE_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, GENERAL_DESC1)
        _common.enterRecord_inNewRow(cnt.uuid.GENERALS_CONTRACT, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_GENERALS.VALUE1)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _validate.validate_Text_message_In_PopUp("The generals type should be unique")
        _modalView.acceptButton(btn.ButtonText.CANCEL)
        _common.clickOn_toolbarButton(cnt.uuid.GENERALS_CONTRACT, btn.IconButtons.ICO_REC_DELETE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })
    
    it('TC - Verify Tax field and Controlling Unit are editable', function () {
        
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GENERALS_CONTRACT, app.FooterTab.GENERALS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.GENERALS_CONTRACT, app.GridCells.PRC_GENERALS_TYPE_FK, GENERAL_DESC1)
      
        _common.edit_dropdownCellWithCaret(cnt.uuid.GENERALS_CONTRACT, app.GridCells.MDC_TAX_CODE_FK_SMALL, commonLocators.CommonKeys.GRID, CONTAINERS_GENERALS.TAXCODE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.GENERALS_CONTRACT, btn.IconButtons.ICO_REC_DELETE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _validate.verify_isRecordDeleted(cnt.uuid.GENERALS_CONTRACT, GENERAL_DESC1)
        _common.waitForLoaderToDisappear()
        _common.handledErrorPopUp_IfExist()
    })

    it('TC - Verify controlling unit and tax are not editable with ISPERCENT Data type', function () {
       
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GENERALS_CONTRACT, app.FooterTab.GENERALS, 3);
            _common.setup_gridLayout(cnt.uuid.GENERALS_CONTRACT, CONTAINER_COLUMNS_GENERALS)
        });
        _common.create_newRecord(cnt.uuid.GENERALS_CONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.GENERALS_CONTRACT, app.GridCells.PRC_GENERALS_TYPE_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, GENERAL_DESC2)
        _common.enterRecord_inNewRow(cnt.uuid.GENERALS_CONTRACT, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_GENERALS.VALUE2)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _validate.verify_isRecordNotEditable(cnt.uuid.GENERALS_CONTRACT, app.GridCells.MDC_TAX_CODE_FK_SMALL, 0)
        _validate.verify_isRecordNotEditable(cnt.uuid.GENERALS_CONTRACT, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, 0)

    })

    it('TC - Verify value Type of generals record with ISPERCENT Data type', function () {
    
            _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_CONTRACT, app.GridCells.VALUE_TYPE, CONTAINERS_GENERALS.COSTVALUETYPEPERCENT)
            _common.waitForLoaderToDisappear()
            cy.SAVE()
        
    })

})

import { _common,  _sidebar,_projectPage,_boqPage,_controllingUnit,_procurementPage,_salesPage,_package,_saleContractPage, _rfqPage,_mainView, _validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import _ from "cypress/types/lodash";

import { PACKAGE_TOTAL_TRANSLATION } from "cypress/pages/variables";
import CommonLocators from 'cypress/locators/common-locators';

const Code1 = "MAT1-" + Cypress._.random(0, 999);
const Code2 = "MAT2-" + Cypress._.random(0, 999);
const Code3 = "MAT3-" + Cypress._.random(0, 999);
const allure = Cypress.Allure.reporter.getInterface()


let RESOURCE_PARAMETERS: DataCells,
    RFQ_PARAMETERS:DataCells,
    GENERALS_PARAMETERS1:DataCells,
    GENERALS_PARAMETERS2:DataCells,
    GENERALS_PARAMETERS3:DataCells,
    REQUISITION_PARAMETERS:DataCells,
    REQUISITION_ITEM_PARAMETERS:DataCells

let 
    CONTAINER_COLUMNS_REQUISITION,
    CONTAINER_COLUMNS_RESOURCE,
    CONTAINERS_RESOURCE,
    CONTAINERS_BIDDER,
    CONTAINER_COLUMNS_RFQ,
    CONTAINERS_CONTRACT,
    CONTAINERS_CUSTOMIZING,
    CONTAINER_COLUMNS_CONTRACT,
    CONTAINER_COLUMNS_REQUISITION_ITEMS,
    CONTAINER_COLUMNS_GENERALS,
    CONTAINERS_GENERALS

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.65 | Create items with lookup from material catalog")
describe("PCM- 2.65 | Create items with lookup from material catalog", () => {
     before(function () {
        cy.fixture('pcm/pcm-2.65-generals-to-procurement-structure.json').then((data) => {
                  this.data = data;
           
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINERS_BIDDER = this.data.CONTAINERS.BIDDER;
            CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
            CONTAINERS_CUSTOMIZING = this.data.CONTAINERS.CUSTOMIZING
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
           
            CONTAINER_COLUMNS_REQUISITION_ITEMS = this.data.CONTAINER_COLUMNS.REQUISITION_ITEMS
            CONTAINER_COLUMNS_GENERALS = this.data.CONTAINER_COLUMNS.GENERALS
            CONTAINERS_GENERALS = this.data.CONTAINERS.GENERALS
            CONTAINERS_CONTRACT =this.data.CONTAINERS.CONTRACT
            CONTAINER_COLUMNS_CONTRACT=this.data.CONTAINER_COLUMNS.CONTRACT
         
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
            }
    
            REQUISITION_PARAMETERS = {
                [commonLocators.CommonLabels.CONFIGURATION]: commonLocators.CommonKeys.MATERIAL
          }

          GENERALS_PARAMETERS1 = {
            [app.GridCells.LEDGER_CONTEXT_FK]: CONTAINERS_CUSTOMIZING.LEDGERCONTEXTName,
            [app.GridCells.DESCRIPTION_INFO]: Code1,
            [app.GridCells.IS_COST]: commonLocators.CommonKeys.CHECK,
            [app.GridCells.IS_SALES]: commonLocators.CommonKeys.CHECK,
            [app.GridCells.IS_PROCUREMENT]: commonLocators.CommonKeys.CHECK
        }

        GENERALS_PARAMETERS2 = {
            [app.GridCells.LEDGER_CONTEXT_FK]: CONTAINERS_CUSTOMIZING.LEDGERCONTEXTName,
            [app.GridCells.DESCRIPTION_INFO]: Code2,
            [app.GridCells.IS_SALES]: commonLocators.CommonKeys.CHECK,
            [app.GridCells.IS_PROCUREMENT]: commonLocators.CommonKeys.CHECK,
            [app.GridCells.IS_PERCENT]: commonLocators.CommonKeys.CHECK
        }

        GENERALS_PARAMETERS3 = {
            [app.GridCells.LEDGER_CONTEXT_FK]: CONTAINERS_CUSTOMIZING.LEDGERCONTEXTName,
            [app.GridCells.DESCRIPTION_INFO]: Code3,
            [app.GridCells.IS_COST]: commonLocators.CommonKeys.CHECK,
            [app.GridCells.IS_PROCUREMENT]: commonLocators.CommonKeys.CHECK,
            [app.GridCells.IS_SALES]: commonLocators.CommonKeys.CHECK
        }
        REQUISITION_ITEM_PARAMETERS = {
        [app.GridCells.MDC_MATERIAL_FK]: CONTAINERS_RESOURCE.CODE,
            [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
        }
            });
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
    });
    after(() => {
        cy.LOGOUT();
    });


    it("TC - Create Customising and assertion for Amount and Percent ", function () {
      
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.CUSTOMIZING);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, CONTAINERS_CUSTOMIZING.EntityType)
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
        _package.enterRecord_toCreateGeneralsTypeDataRecord(cnt.uuid.INSTANCES, GENERALS_PARAMETERS1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _package.enterRecord_toCreateGeneralsTypeDataRecord(cnt.uuid.INSTANCES, GENERALS_PARAMETERS2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _package.enterRecord_toCreateGeneralsTypeDataRecord(cnt.uuid.INSTANCES, GENERALS_PARAMETERS3)
        _common.minimizeContainer(cnt.uuid.INSTANCES)
    })

    it('TC - Create requisition', function () {
        
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.REQUISITION);
        _common.waitForLoaderToDisappear()

        _common.setDefaultView(app.TabBar.MAIN)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.create_newRecord(cnt.uuid.REQUISITIONS)
        _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })

    it('TC - Verify creation requisition items record and add material', function () {
        
       
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_REQUISITION_ITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
        _common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
        _package.enterRecord_toCreateNewRequisitionItem(cnt.uuid.REQUISITIONITEMS, REQUISITION_ITEM_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })

    it('TC - Add Generals Record', function () {
        
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_GENERALS, app.FooterTab.GENERALS, 3);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_GENERALS, CONTAINER_COLUMNS_GENERALS)
        });
        _common.create_newRecord(cnt.uuid.REQUISITION_GENERALS)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_GENERALS, app.GridCells.PRC_GENERALS_TYPE_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, Code1)
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITION_GENERALS, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_GENERALS.VALUE1)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.REQUISITION_GENERALS)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_GENERALS, app.GridCells.PRC_GENERALS_TYPE_FK,commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, Code2)
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITION_GENERALS, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_GENERALS.VALUE2)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Change requisition status', function () {
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
        _common.waitForLoaderToDisappear()

    })
    it('TC - Create Contract from requisition wizard', function () {
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        _validate.verify_isButtonDisabled(btn.ButtonText.NEXT)
        _common.waitForLoaderToDisappear()
        _package.create_ContractfromPackage(CONTAINERS_CONTRACT.BP)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        });
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.waitForLoaderToDisappear()
    })
    it('TC - Verify Generals Record in contract module', function () {
       
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GENERALS_CONTRACT, app.FooterTab.GENERALS, 0);
            _common.setup_gridLayout(cnt.uuid.GENERALS_CONTRACT, CONTAINER_COLUMNS_GENERALS)
        });
        
        _common.clickOn_cellHasUniqueValue(cnt.uuid.GENERALS_CONTRACT, app.GridCells.PRC_GENERALS_TYPE_FK, Code1)
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_CONTRACT, app.GridCells.PRC_GENERALS_TYPE_FK, Code1)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.GENERALS_CONTRACT, app.GridCells.PRC_GENERALS_TYPE_FK, Code2)
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_CONTRACT, app.GridCells.PRC_GENERALS_TYPE_FK, Code2)

    })

    it('TC - Add Generals Record in contract module', function () {
        
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GENERALS_CONTRACT, app.FooterTab.GENERALS, 0);
        });
        _common.create_newRecord(cnt.uuid.GENERALS_CONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.GENERALS_CONTRACT, app.GridCells.PRC_GENERALS_TYPE_FK, "list", app.InputFields.INPUT_GROUP_CONTENT, Code3)
        _common.enterRecord_inNewRow(cnt.uuid.GENERALS_CONTRACT, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_GENERALS.VALUE1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
    it('TC - Verify value Type of genreals record with istype Data type', function () {
        
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
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _validate.validate_Text_message_In_PopUp("The field should not be empty.")
        _modalView.acceptButton(btn.ButtonText.CANCEL)
        _common.clickOn_toolbarButton(cnt.uuid.GENERALS_CONTRACT, btn.IconButtons.ICO_REC_DELETE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
    it('TC - Verify type type should not duplicated', function () {
     
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GENERALS_CONTRACT, app.FooterTab.GENERALS, 0);

        });
        _common.create_newRecord(cnt.uuid.GENERALS_CONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.GENERALS_CONTRACT, app.GridCells.PRC_GENERALS_TYPE_FK, "list", app.InputFields.INPUT_GROUP_CONTENT, Code3)
        _common.enterRecord_inNewRow(cnt.uuid.GENERALS_CONTRACT, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_GENERALS.VALUE1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _validate.validate_Text_message_In_PopUp("The generals type should be unique")
        _modalView.acceptButton(btn.ButtonText.CANCEL)
        _common.clickOn_toolbarButton(cnt.uuid.GENERALS_CONTRACT, btn.IconButtons.ICO_REC_DELETE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })
    it('TC - Verify Tax field and Contrlling Unit are editable', function () {
       
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GENERALS_CONTRACT, app.FooterTab.GENERALS, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.GENERALS_CONTRACT, app.GridCells.PRC_GENERALS_TYPE_FK, Code3)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.edit_dropdownCellWithCaret(cnt.uuid.GENERALS_CONTRACT, app.GridCells.MDC_TAX_CODE_FK_SMALL, CommonLocators.CommonKeys.GRID, CONTAINERS_GENERALS.TAX_CODE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clickOn_toolbarButton(cnt.uuid.GENERALS_CONTRACT, btn.IconButtons.ICO_REC_DELETE)
        cy.SAVE()
       _common.waitForLoaderToDisappear()
       _common.handledErrorPopUp_IfExist()
       
    })

})

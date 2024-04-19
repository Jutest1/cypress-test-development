import { tile, app, cnt, sidebar, commonLocators, btn} from "cypress/locators";
import { _bidPage, _boqPage, _common, _sidebar,_estimatePage, _mainView, _modalView, _validate } from "cypress/pages";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_STRCU_DESC = "BOQ-STRC-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "Split-BOQ-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let BOQ_PARAMETERS: DataCells;
let BOQS_STRUCTURE_PARAMETERS:DataCells;
let GENERATE_LINE_ITEMS_PARAMETERS: DataCells;

let CONTAINERS_ESTIMATE;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINERS_BID;

let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_SPLIT_QUANTITY;

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.94 | Split Line Item Quantity in BoQ Module");

describe('EST- 1.94 | Split Line Item Quantity in BoQ Module', () => {

        before(function () {
            cy.fixture('estimate/est-1.94-split-Line-Item-quantity-in-BoQ-module.json')
              .then((data) => {
                this.data = data;
                CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE;
                CONTAINERS_BID = this.data.CONTAINERS.BID;

                CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
                CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM=this.data.CONTAINER_COLUMNS.ESTIMATE_LINE_ITEM
                CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ
                CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
                CONTAINER_COLUMNS_SPLIT_QUANTITY=this.data.CONTAINER_COLUMNS.SPLIT_QUANTITY
                

                ESTIMATE_PARAMETERS = {
                    [app.GridCells.CODE]: EST_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                    [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                    [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
                };

                BOQ_PARAMETERS = {
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
                };

                GENERATE_LINE_ITEMS_PARAMETERS={
                    [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING,commonLocators.CommonLabels.ADDITIONAL_SETTING],
                    [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_DESC  ,
                    [commonLocators.CommonLabels.ADDITIONAL_SETTING]:this.data.MODAL.ADDITIONAL_SETTING      
                }
                BOQS_STRUCTURE_PARAMETERS = {
                    [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRCU_DESC,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                    [ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
                  };


            }).then(()=>{
                cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.waitForLoaderToDisappear()
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
                _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    
            })
        });
        
        after(() => {
            cy.LOGOUT();
        });

    it('TC - Create BOQ header and BOQ structure', function () {
       
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ);
        });
        _common.search_inSubContainer(cnt.uuid.BOQS, ' ');
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
       
        _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
             _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE);
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create split quantites', function () {
       
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SPLIT_QUANTITY, app.FooterTab.SPLIT_QUANTITY, 2);
            _common.setup_gridLayout(cnt.uuid.SPLIT_QUANTITY, CONTAINER_COLUMNS_SPLIT_QUANTITY);
        });
        _common.create_newRecord(cnt.uuid.SPLIT_QUANTITY)
        _common.enterRecord_inNewRow(cnt.uuid.SPLIT_QUANTITY, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.QUANTITY1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.SPLIT_QUANTITY)
        _common.enterRecord_inNewRow(cnt.uuid.SPLIT_QUANTITY, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.QUANTITY2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    });
    it('TC - Create estimate header', function () {
      
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.search_inSubContainer(cnt.uuid.ESTIMATE, ' ');
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.ToolBar.ICO_GO_TO);
    });

    it('TC - Generate line item from BOQ & verify split quantity line item', function () {
        
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM);
        });
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, ' ');
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.GENERATE_LINE_ITEMS)

       
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            cy.REFRESH_CONTAINER()
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, CONTAINERS_BOQ_STRUCTURE.QUANTITY1)
        cy.SAVE() 
        _common.waitForLoaderToDisappear()

        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, CONTAINERS_BOQ_STRUCTURE.QUANTITY1)
        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Quantity1", $ele1.text())
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, CONTAINERS_BOQ_STRUCTURE.QUANTITY2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Quantity2", $ele1.text())
        })
        cy.wait(1000).then(()=>{
            _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, CONTAINERS_BOQ_STRUCTURE.QUANTITY2)
        })
      
    });
    it("TC - Verify create bid by BoQ", function () {
       
        _bidPage.createBidRecord_byWizardOption(BID_DESC, CONTAINERS_BID.BPNAME, CONTAINERS_BID.STRUCTRETYPE);
        _common.openTab(app.TabBar.BIDBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.BIDBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRCU_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.QUANTITY)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.BAS_UOM_FK, CONTAINERS_BOQ_STRUCTURE.UOM)

    });
    it("TC - Verify Bid BoQ 'Quantity' should be equal to the summation of Split BoQ Quantity", function () {

        _validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.BIDBOQSTRUCTURE, Cypress.env("Quantity1"), Cypress.env("Quantity2"), app.GridCells.QUANTITY_SMALL)
    });

});

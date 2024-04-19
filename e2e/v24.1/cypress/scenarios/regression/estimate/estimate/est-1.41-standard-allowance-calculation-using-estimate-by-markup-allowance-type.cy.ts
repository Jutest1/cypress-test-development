import { tile, app, cnt, sidebar, btn,commonLocators } from "cypress/locators";
import { _common, _estimatePage, _mainView, _materialPage, _modalView, _package, _procurementConfig, _projectPage, _validate } from "cypress/pages";
import { DataCells } from 'cypress/pages/interfaces';

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);


let ESTIMATE_PARAMETERS: DataCells;
let LINE_ITEMS_PARAMETERS:DataCells;
let RESOURCE_PARAMETERS:DataCells;

let MARKUP_PARAMETERS:DataCells;

let CONTAINERS_ESTIMATE;
let CONTAINERS_LINE_ITEM;
let CONTAINERS_RESOURCE;
let CONTAINERS_ALLOWANCE_MARKUP;
let CONTAINERS_STANDARD_ALLOWANCE
let CONTAINERS_ESTIMATE_CONFIGURATION;

let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_ALLOWANCE_MARKUP;
let CONTAINER_COLUMNS_STANDARD_ALLOWANCE


// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.41 | Standard Allowance Calculation Using Estimate-by-Markup Allowance Type");

 describe('EST- 1.41 | Standard Allowance Calculation Using Estimate-by-Markup Allowance Type', () => {
        before(function () {
            cy.fixture('estimate/est-1.41-standard-allowance-calculation-using-estimate-by-markup-allowance-type.json')
              .then((data) => {
                this.data=data
                
                CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
                CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
                CONTAINERS_ALLOWANCE_MARKUP = this.data.CONTAINERS.ALLOWANCE_MARKUP;
                CONTAINERS_STANDARD_ALLOWANCE = this.data.CONTAINERS.STANDARD_ALLOWANCE;
                CONTAINERS_ESTIMATE_CONFIGURATION = this.data.CONTAINERS.ESTIMATE_CONFIGURATION;
                
    
                CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
                CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
                CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
                CONTAINER_COLUMNS_ALLOWANCE_MARKUP=this.data.CONTAINER_COLUMNS.ALLOWANCE_MARKUP
                CONTAINER_COLUMNS_STANDARD_ALLOWANCE=this.data.CONTAINER_COLUMNS.STANDARD_ALLOWANCE
              
                
    
    
                ESTIMATE_PARAMETERS = {
                    [app.GridCells.CODE]: ESTIMATE_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                    [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                    [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
                }
            
                LINE_ITEMS_PARAMETERS={
                    [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY1,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                }
    
                RESOURCE_PARAMETERS={
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY,
                }
    
                  MARKUP_PARAMETERS = {
                    [app.GridCells.MDC_COST_CODE_DESCRIPTION]: CONTAINERS_ALLOWANCE_MARKUP.Lohn,
                    [app.GridCells.GA_PERC]: CONTAINERS_ALLOWANCE_MARKUP.GA,
                    [app.GridCells.RP_PERC]: CONTAINERS_ALLOWANCE_MARKUP.RP,
                    [app.GridCells.AM_PERC]: CONTAINERS_ALLOWANCE_MARKUP.AM
                }
    
              })
              .then(()=>{
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

    it("TC - Create an Estimate Header, Create a new Line items and Assign Material Resources to Line Item", function () {
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT)
		_common	.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ESTIMATE).then(() => {

			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
		_estimatePage.textOfEstimateCode();
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
		});
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEMS_PARAMETERS)
		cy.SAVE();
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
		});
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()

        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("C1_Cost", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("C1_Cost"))
        })
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION)

    });

    it("TC - Add Standard Allowance and Recalculate it.", function () {

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
           
            _common.select_tabFromFooter(cnt.uuid.STANDARD_ALLOWANCES, app.FooterTab.STANDARS_ALLOWANCES, 1);
            _common.setup_gridLayout(cnt.uuid.STANDARD_ALLOWANCES, CONTAINER_COLUMNS_STANDARD_ALLOWANCE);
        });
        _common.maximizeContainer(cnt.uuid.STANDARD_ALLOWANCES)
        _common.create_newRecord(cnt.uuid.STANDARD_ALLOWANCES);
        _estimatePage.enterRecord_toStanderdAllowance(CONTAINERS_STANDARD_ALLOWANCE.SA_CODE, CONTAINERS_STANDARD_ALLOWANCE.QUANTITY_TYPE)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.STANDARD_ALLOWANCES,app.GridCells.MDC_ALLOWANCE_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_STANDARD_ALLOWANCE.SA_TYPE)
        cy.SAVE()
		_common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.STANDARD_ALLOWANCES)
    });

    it('TC - Create & Verify Allowance Markup records in Estimate.', function () {
    
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ALLOWANCEMARKUP, app.FooterTab.ALLOWANCE_MARKUP, 2);
            _common.setup_gridLayout(cnt.uuid.ALLOWANCEMARKUP, CONTAINER_COLUMNS_ALLOWANCE_MARKUP);
        });
        _common.clickOn_toolbarButton(cnt.uuid.ALLOWANCEMARKUP, btn.ToolBar.ICO_REC_NEW_DEEP_COPY)
        _common.maximizeContainer(cnt.uuid.ALLOWANCEMARKUP)
        _estimatePage.enterRecord_toCreateAllowanceMarkup(MARKUP_PARAMETERS);
        cy.SAVE();
        _common.getText_fromCell(cnt.uuid.ALLOWANCEMARKUP, app.GridCells.GA_PERC).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("GA_Percent", $ele1.text())
            cy.log(Cypress.env("GA_Percent"))
        })
        _common.getText_fromCell(cnt.uuid.ALLOWANCEMARKUP, app.GridCells.RP_PERC).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("RP_Percent", $ele1.text())
            cy.log(Cypress.env("RP_Percent"))
        })
        _common.getText_fromCell(cnt.uuid.ALLOWANCEMARKUP, app.GridCells.AM_PERC).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("AM_Percent", $ele1.text())
            cy.log(Cypress.env("AM_Percent"))
        })
        _common.minimizeContainer(cnt.uuid.ALLOWANCEMARKUP)
        cy.REFRESH_CONTAINER()
    });

    it('TC - Create & Verify Allowance Markup records in Estimate.', function () {

        const GAVALUE = ((parseFloat(Cypress.env("GA_Percent"))) * ((parseFloat(Cypress.env("C1_Cost"))/100 ))).toString()
        const RPVALUE = ((parseFloat(Cypress.env("RP_Percent"))) * ((parseFloat(Cypress.env("C1_Cost"))/100 ))).toString()
        const AMVALUE = ((parseFloat(Cypress.env("AM_Percent"))) * ((parseFloat(Cypress.env("C1_Cost"))/100 ))).toString()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
           
            _common.select_tabFromFooter(cnt.uuid.STANDARD_ALLOWANCES, app.FooterTab.STANDARS_ALLOWANCES, 0);
        });
        _common.maximizeContainer(cnt.uuid.STANDARD_ALLOWANCES)
        _common.clickOn_toolbarButton(cnt.uuid.STANDARD_ALLOWANCES,btn.ToolBar.ICO_RECALCULATE)
        _common.minimizeContainer(cnt.uuid.STANDARD_ALLOWANCES)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION)
        _common.waitForLoaderToDisappear()
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.GA, GAVALUE)
            _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.RP, RPVALUE)
            _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.AM, AMVALUE)
        })
    })

});


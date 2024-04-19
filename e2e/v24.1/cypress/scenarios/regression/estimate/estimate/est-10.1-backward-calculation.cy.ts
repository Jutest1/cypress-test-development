import { _common, _estimatePage, _validate, _mainView, _boqPage,_projectPage} from 'cypress/pages';
import { app, tile, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { DataCells } from 'cypress/pages/interfaces';

const allure = Cypress.Allure.reporter.getInterface();
allure.epic(" Estimate");
allure.feature("Backward Calculate");
allure.story("est- 10.1| backward  calculate");

const PRJ_NO = "EST-PRJ-" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-" + PRJ_NO;
const CLERK_NAME = "HS";

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);

let CREATEPROJECT_PARAMETERS:DataCells;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS:DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST-10.1 | BackWard Calculation In An Estimate");


describe("EST | BackWard Calculation In An Estimate", () => {

	before(function () {
		cy.fixture('estimate/est-10.1-backward-calculation.json')
		  .then((data) => {
			this.data = data;  
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE 
			CREATEPROJECT_PARAMETERS= {
				[commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
				[ commonLocators.CommonLabels.NAME] :PRJ_NAME,
				[ commonLocators.CommonLabels.CLERK] :CLERK_NAME

            }
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
			ESTIMATE_PARAMETERS = {
						[app.GridCells.CODE]: ESTIMATE_CODE,
						[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
						[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
						[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}	
			CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
			CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
			LINE_ITEM_PARAMETERS = {
						[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
						[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
						[app.GridCells.ADVANCED_ALL]: CONTAINERS_LINE_ITEM.ADVANCED_ALL,
						[app.GridCells.MANUAL_MARKUP]: CONTAINERS_LINE_ITEM.MANUAL_MARKUP
						
			};
			CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
			CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
			RESOURCE_PARAMETERS = {
						[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
						[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
						[app.GridCells.QUANTITY_SMALL]:CONTAINERS_RESOURCE.QUANTITY

			};

		}).then(()=>{
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		})
	});


    it('TC-Create new project no',function(){
         /* Open desktop should be called in before block */
    _common.waitForLoaderToDisappear();
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.openTab(app.TabBar.PROJECT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    
    _common.create_newRecord(cnt.uuid.PROJECTS);
    _projectPage.enterRecord_toCreateProject(CREATEPROJECT_PARAMETERS);
    _common.waitForLoaderToDisappear();
    cy.wait(1000);
    cy.SAVE();
    
    _common.waitForLoaderToDisappear();
    _common.pinnedItem();
    
  });

	it('TC - Create Estimate',function(){
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATE)
			_common.waitForLoaderToDisappear()
				_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
				_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
			});
			_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
			_common.create_newRecord(cnt.uuid.ESTIMATE);
			_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
			_common.waitForLoaderToDisappear()
			cy.SAVE()
			_common.waitForLoaderToDisappear();
			_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO);
			_common.waitForLoaderToDisappear();
	})

    it("TC - Create new line item record", function () {
       // _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
		cy.wait(3000)

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
        });
		_common.waitForLoaderToDisappear()

        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		//_common.set_cellCheckboxValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.IS_FIXED_PRICE, commonLocators.CommonKeys.CHECK)
        _estimatePage.enterRecord_toCreateLineItem_AAMM(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
		cy.wait(3000)
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS);

    });

	it("TC - Create new record in resource", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
		});
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
		_common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);

        _common.minimizeContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.GRAND_TOTAL, "GRAND_TOTAL");

    });


	it("TC - BackWard Calculation from wizard and verify", function () {	
		cy.log('---------GRAND_TOTAL----------:' +Cypress.env("GRAND_TOTAL"));  
	   _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
	   _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.BACKWARD_CALCULATION);
	   _estimatePage.backWardCalculation_fromWizard();
	   _common.waitForLoaderToDisappear()
	   _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS);
    
	   _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.ADVANCED_ALL, '0.00');
	   _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.MANUAL_MARKUP, '0.00');
	   _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.GRAND_TOTAL, Cypress.env('GRAND_TOTAL'));
				
	});

	after(() => {
		cy.LOGOUT();
	});

});

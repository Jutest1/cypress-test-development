import { _common, _estimatePage, _validate, _mainView, _boqPage } from 'cypress/pages';
import { app, tile, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { DataCells } from 'cypress/pages/interfaces';

const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS:DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;

ALLURE.epic('ESTIMATE');
ALLURE.feature('Estimate');
ALLURE.story('EST- 1.18 | Verify convert line item into assemblies');

describe('EST- 1.18 | Verify convert line item into assemblies', () => {

	before(function () {

		cy.fixture('estimate/est-1.18-verify-convert-line-item-into-assemblies.json')
		  .then((data) => {
			this.data = data;
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
				  [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
			};

		  }).then(()=>{
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.waitForLoaderToDisappear()
			_common.openTab(app.TabBar.PROJECT).then(() => {
			  _common.setDefaultView(app.TabBar.PROJECT)
			  _common.waitForLoaderToDisappear()
			  _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
			});
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 	
		  })
	});

	after(()=>{
		cy.LOGOUT();
	})

	it('TC - Create new estimate record', function () {
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
		_common.waitForLoaderToDisappear()  
	});

	it("TC - Create new line item record", function () {
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
			_common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.estassemblyfk],cnt.uuid.ESTIMATE_LINEITEMS)
		});
		_common.waitForLoaderToDisappear()

		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
	});

	it('TC -  Verify convert line item into Assemblies', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CONVERT_LINE_ITEM_INTO_ASSEMBLY);
		_common.waitForLoaderToDisappear()
		_common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.ASSEMBLY_CATEGORY,CONTAINERS_LINE_ITEM.ASSEMBLY_CATEGORY,commonLocators.CommonKeys.GRID)
		_common.clickOn_modalFooterButton(btn.ButtonText.OK)
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
		_common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_ASSEMBLY_FK)
			   .then(($value)=>{
				var assemblyTemplate =$value.text().split(".");
				expect(assemblyTemplate[0]).to.equals(CONTAINERS_LINE_ITEM.ASSEMBLY_CATEGORY);
			   })
	});
});

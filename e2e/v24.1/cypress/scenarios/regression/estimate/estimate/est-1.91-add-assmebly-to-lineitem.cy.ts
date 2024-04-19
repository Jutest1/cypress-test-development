import { _common, _estimatePage, _validate, _mainView, _boqPage, _assembliesPage, _package } from 'cypress/pages';
import { app, tile, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { DataCells } from 'cypress/pages/interfaces';

const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINERS_ASSEMBLY_CATEGORY
let CONTAINER_COLUMNS_ASSEMBLY_CATEGORY

const ASSEMBLY_DESC = 'Test' + Cypress._.random(0, 999);
let CONTAINERS_ASSEMBLIES
let CONTAINER_COLUMNS_ASSEMBLIES
let ASSEMBLIES_PARAMETERS:DataCells

let CONTAINERS_ASSEMBLY_RESOURCE
let CONTAINER_COLUMNS_ASSEMBLY_RESOURCE
let ASSEMBLIES_RESOURCE_PARAMETERS_0:DataCells
let ASSEMBLIES_RESOURCE_PARAMETERS_1:DataCells
let ASSEMBLIES_RESOURCE_PARAMETERS_2:DataCells

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_LINE_ITEM
let LINE_ITEM_PARAMETERS:DataCells
let CONTAINERS_LINE_ITEM

let CONTAINERS_RESOURCES
let CONTAINER_COLUMNS_RESOURCES
let RESOURCE_PARAMETERS:DataCells

let CONTAINERS_PROJECT_COST_CODE
let CONTAINER_COLUMNS_PROJECT_COST_CODE

let MODAL_SELECT_UPDATE_SCOPE
let UPDATE_PROJECT_ASSEMBLIES_PARAMETERS:DataCells

ALLURE.epic('ESTIMATE');
ALLURE.feature('Estimate');
ALLURE.story('EST- 1.91 | Add assembly to line item');

describe('EST- 1.91 | Add assembly to line item', () => {

	before(function () {
		cy.fixture('estimate/est-1.91-add-assembly-to-lineitem.json')
		  .then((data) => {
			this.data = data;
			CONTAINERS_ASSEMBLY_CATEGORY=this.data.CONTAINERS.ASSEMBLY_CATEGORY
			CONTAINER_COLUMNS_ASSEMBLY_CATEGORY=this.data.CONTAINER_COLUMNS.ASSEMBLY_CATEGORY

			CONTAINERS_ASSEMBLIES=this.data.CONTAINERS.ASSEMBLIES
			CONTAINER_COLUMNS_ASSEMBLIES=this.data.CONTAINER_COLUMNS.ASSEMBLIES
			ASSEMBLIES_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: ASSEMBLY_DESC,
				[app.GridCells.RULE]: CONTAINERS_ASSEMBLIES.RULE,
				[app.GridCells.PARAM]: CONTAINERS_ASSEMBLIES.PARAMETER,
				[app.GridCells.COST_GROUP_LIC_DIN276_2018_12]: CONTAINERS_ASSEMBLIES.DIN276_2018_12
			}

			CONTAINERS_ASSEMBLY_RESOURCE=this.data.CONTAINERS.ASSEMBLY_RESOURCE
			CONTAINER_COLUMNS_ASSEMBLY_RESOURCE=this.data.CONTAINER_COLUMNS.ASSEMBLY_RESOURCE
			ASSEMBLIES_RESOURCE_PARAMETERS_0 = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_ASSEMBLY_RESOURCE.SHORT_KEY[0],
				[app.GridCells.CODE]: CONTAINERS_ASSEMBLY_RESOURCE.CODE[0]
			}
			ASSEMBLIES_RESOURCE_PARAMETERS_1 = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_ASSEMBLY_RESOURCE.SHORT_KEY[1],
				[app.GridCells.CODE]: CONTAINERS_ASSEMBLY_RESOURCE.CODE[1]
			}
			ASSEMBLIES_RESOURCE_PARAMETERS_2 = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_ASSEMBLY_RESOURCE.SHORT_KEY[2],
				[app.GridCells.CODE]: CONTAINERS_ASSEMBLY_RESOURCE.CODE[2]
			}

			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
              [app.GridCells.CODE]: ESTIMATE_CODE,
              [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
              [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
              [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }

            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            LINE_ITEM_PARAMETERS={
                [app.GridCells.DESCRIPTION_INFO]:LINE_ITEM_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_LINE_ITEM.QUANTITY,
                [app.GridCells.BAS_UOM_FK]:CONTAINERS_LINE_ITEM.UOM
            }

			CONTAINERS_RESOURCES=this.data.CONTAINERS.RESOURCES
			CONTAINER_COLUMNS_RESOURCES=this.data.CONTAINER_COLUMNS.RESOURCES
			RESOURCE_PARAMETERS={
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_RESOURCES.SHORT_KEY,
				[app.GridCells.CODE]:CONTAINERS_RESOURCES.CODE
			}

			CONTAINER_COLUMNS_PROJECT_COST_CODE=this.data.CONTAINER_COLUMNS.PROJECT_COST_CODE
			CONTAINERS_PROJECT_COST_CODE=this.data.CONTAINERS.PROJECT_COST_CODE
			MODAL_SELECT_UPDATE_SCOPE=this.data.MODAL.SELECT_UPDATE_SCOPE
            UPDATE_PROJECT_ASSEMBLIES_PARAMETERS={
                [commonLocators.CommonKeys.RADIO]:MODAL_SELECT_UPDATE_SCOPE.SELECT_UPDATE_SCOPE,
                [commonLocators.CommonKeys.RADIO_INDEX]:2
            }
		  })
		  .then(()=>{
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
            _common.waitForLoaderToDisappear()  
		  })
	});

	it('TC - Prerequisites - customizing UDP-1-5', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
		_common.openTab(app.TabBar.MASTER_DATA).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.ENTITY_TYPES)
		_common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, commonLocators.CommonKeys.USER)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, commonLocators.CommonKeys.USER_DEFINED_COST_COLUMNS)
		_common.waitForLoaderToDisappear()
		_common.set_cellCheckboxValueForAllRowCell(cnt.uuid.INSTANCES, app.GridCells.IS_LIVE, commonLocators.CommonKeys.UNCHECK)
		_common.set_cellCheckboxValueForAllRowCell(cnt.uuid.INSTANCES, app.GridCells.IS_LIVE, commonLocators.CommonKeys.CHECK)
	});

	it('TC - Create new Assemblies record', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES);
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ASSEMBLIES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
			_common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINER_COLUMNS_ASSEMBLY_CATEGORY);
			_common.waitForLoaderToDisappear()
		});
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ASSEMBLIES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 3);
			_common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE, CONTAINER_COLUMNS_ASSEMBLY_RESOURCE);
			_common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.estresourcetypeshortkey,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.code,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.costunit,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.iscost],cnt.uuid.ASSEMBLY_RESOURCE)
		});
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ASSEMBLIES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
			_common.waitForLoaderToDisappear()
		});
		_common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINERS_ASSEMBLY_CATEGORY.CODE);
		_common.waitForLoaderToDisappear()
		_common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.MARKER);

		_common.openTab(app.TabBar.ASSEMBLIES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
			_common.setup_gridLayout(cnt.uuid.ASSEMBLIES, CONTAINER_COLUMNS_ASSEMBLIES);
			_common.waitForLoaderToDisappear()
			_common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLIES.rule, CONTAINER_COLUMNS_ASSEMBLIES.param, CONTAINER_COLUMNS_ASSEMBLIES.code, CONTAINER_COLUMNS_ASSEMBLIES.descriptioninfo], cnt.uuid.ASSEMBLIES)
			_common.waitForLoaderToDisappear()
		});
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES);
		_common.create_newRecord(cnt.uuid.ASSEMBLIES);
		_common.waitForLoaderToDisappear()
		_assembliesPage.enterRecord_toCreateAssemblies(cnt.uuid.ASSEMBLIES,ASSEMBLIES_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.ASSEMBLIES)
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLIES,app.GridCells.CODE,"ASSEMBLY_CODE")
		_common.minimizeContainer(cnt.uuid.ASSEMBLIES)

		_common.openTab(app.TabBar.ASSEMBLIES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 3);
		});
		_common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
		_common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE);
		_assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLIES_RESOURCE_PARAMETERS_0);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()

		_common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
		_common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE);
		_assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLIES_RESOURCE_PARAMETERS_1);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.COST_UNIT,"CA_CostUnit")

		_common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
		_common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE);
		_assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLIES_RESOURCE_PARAMETERS_2);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	});

	it("TC - Create estimate header", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
        _common.waitForLoaderToDisappear()
    
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

    it("TC - Create line item with assembly", function() {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
			_common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.productivityfactor, CONTAINER_COLUMNS_LINE_ITEM.costfactor1, CONTAINER_COLUMNS_LINE_ITEM.costfactor2, CONTAINER_COLUMNS_LINE_ITEM.estassemblyfk, CONTAINER_COLUMNS_LINE_ITEM.costtotal, CONTAINER_COLUMNS_LINE_ITEM.quantitytotal], cnt.uuid.ESTIMATE_LINEITEMS)
            _common.waitForLoaderToDisappear()
        });

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_ASSEMBLY_FK)
        _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_ASSEMBLY_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,Cypress.env("ASSEMBLY_CODE"))
        _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.CODE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

	it('TC - Verify Cost group values, if line item exist costgroup. Costgroup value should be displayed. If line item do not exist costgroup, Costgroup should get from assembly to line item', function () {
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		cy.REFRESH_SELECTED_ENTITIES()
		_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_GROUP_LIC_DIN276_2018_12, CONTAINERS_ASSEMBLIES.DIN276_2018_12)
		_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
	});

	it('TC - Verify resource gets assigned to line item after assigning assembly template', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES);
			_common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCES.code, CONTAINER_COLUMNS_RESOURCES.descriptioninfo, CONTAINER_COLUMNS_RESOURCES.costtotal, CONTAINER_COLUMNS_RESOURCES.costfactor1, CONTAINER_COLUMNS_RESOURCES.costfactor2, CONTAINER_COLUMNS_RESOURCES.costfactorcc, CONTAINER_COLUMNS_RESOURCES.iscost, CONTAINER_COLUMNS_RESOURCES.productivityfactor, CONTAINER_COLUMNS_RESOURCES.quantityfactor1, CONTAINER_COLUMNS_RESOURCES.quantityfactor2, CONTAINER_COLUMNS_RESOURCES.quantityfactor3, CONTAINER_COLUMNS_RESOURCES.quantityfactor4, CONTAINER_COLUMNS_RESOURCES.quantityfactorcc, CONTAINER_COLUMNS_RESOURCES.quantity, CONTAINER_COLUMNS_RESOURCES.costunit, CONTAINER_COLUMNS_RESOURCES.quantitytotal], cnt.uuid.RESOURCES)
		});
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,CONTAINERS_ASSEMBLY_RESOURCE.CODE[0])
		_common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,CONTAINERS_ASSEMBLY_RESOURCE.CODE[1])
		_common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,CONTAINERS_ASSEMBLY_RESOURCE.CODE[2])
	});

	it('TC - Verify CA cost/unit value should get from master assembly', function () {
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
	
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
			_common.waitForLoaderToDisappear()
		});
		_common.select_rowHasValue(cnt.uuid.RESOURCES,CONTAINERS_ASSEMBLY_RESOURCE.CODE[1])
		_common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT, Cypress.env("CA_CostUnit"))
	});

	it('TC - Verify Resource Quantity Total = LI Quantity Total * resource quantity factor1/2/3/4/CC* parent productivity Factor * res productivity Factor', function () {

		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TOTAL).then(($LI_QuantityTotal) => {
			var LI_QuantityTotal = parseFloat($LI_QuantityTotal.text())
			Cypress.env("LI_QuantityTotal", LI_QuantityTotal)
		})
		_common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRODUCTIVITY_FACTOR).then(($PARENT_PRODUCTIVITY_FACTOR) => {
			var PARENT_PRODUCTIVITY_FACTOR = parseFloat($PARENT_PRODUCTIVITY_FACTOR.text())
			Cypress.env("PARENT_PRODUCTIVITY_FACTOR", PARENT_PRODUCTIVITY_FACTOR)
		})
		_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.waitForLoaderToDisappear()		
		
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY, CONTAINERS_ASSEMBLY_RESOURCE.SHORT_KEY[0])
		_common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_1).then(($QUANTITY_FACTOR_1) => {
			var QUANTITY_FACTOR_1 = parseFloat($QUANTITY_FACTOR_1.text())
			Cypress.env("QUANTITY_FACTOR_1", QUANTITY_FACTOR_1)
		})
		_common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_2).then(($QUANTITY_FACTOR_2) => {
			var QUANTITY_FACTOR_2 = parseFloat($QUANTITY_FACTOR_2.text())
			Cypress.env("QUANTITY_FACTOR_2", QUANTITY_FACTOR_2)
		})
		_common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_3).then(($QUANTITY_FACTOR_3) => {
			var QUANTITY_FACTOR_3 = parseFloat($QUANTITY_FACTOR_3.text())
			Cypress.env("QUANTITY_FACTOR_3", QUANTITY_FACTOR_3)
		})
		_common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_4).then(($QUANTITY_FACTOR_4) => {
			var QUANTITY_FACTOR_4 = parseFloat($QUANTITY_FACTOR_4.text())
			Cypress.env("QUANTITY_FACTOR_4", QUANTITY_FACTOR_4)
		})
		_common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_CC).then(($QUANTITY_FACTOR_CC) => {
			var QUANTITY_FACTOR_CC = parseFloat($QUANTITY_FACTOR_CC.text())
			Cypress.env("QUANTITY_FACTOR_CC", QUANTITY_FACTOR_CC)
		})
		_common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.PRODUCTIVITY_FACTOR).then(($PRODUCTIVITY_FACTOR) => {
			var PRODUCTIVITY_FACTOR = parseFloat($PRODUCTIVITY_FACTOR.text())
			Cypress.env("PRODUCTIVITY_FACTOR", PRODUCTIVITY_FACTOR)
		})
		cy.wait(500).then(() => {
			var Quantity_Factors = Cypress.env("QUANTITY_FACTOR_1") * Cypress.env("QUANTITY_FACTOR_2") * Cypress.env("QUANTITY_FACTOR_3") * Cypress.env("QUANTITY_FACTOR_4") * Cypress.env("QUANTITY_FACTOR_CC")
			var Resource_Quantity_Total = Cypress.env("LI_QuantityTotal") * Quantity_Factors * Cypress.env("PRODUCTIVITY_FACTOR") * Cypress.env("PARENT_PRODUCTIVITY_FACTOR")
			_common.assert_forNumericValues(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_TOTAL, Resource_Quantity_Total.toString())
		})
		_common.minimizeContainer(cnt.uuid.RESOURCES)
	});

	it('TC - Verify Resource cost Total =Resource Quantity Total* Rate(currency)* res cost factor1/2/CC * parent cost factor1/2 ', function () {
		_common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,  CONTAINERS_ASSEMBLY_RESOURCE.SHORT_KEY[0])

		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_TOTAL).then(($res_QuantityTotal) => {
			var res_QuantityTotal = parseFloat($res_QuantityTotal.text())
			Cypress.env("res_QuantityTotal", res_QuantityTotal)
		})
		_common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_FACTOR_1).then(($COST_FACTOR_1) => {
			var COST_FACTOR_1 = parseFloat($COST_FACTOR_1.text())
			Cypress.env("COST_FACTOR_1", COST_FACTOR_1)
		})
		_common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_FACTOR_2).then(($COST_FACTOR_2) => {
			var COST_FACTOR_2 = parseFloat($COST_FACTOR_2.text())
			Cypress.env("COST_FACTOR_2", COST_FACTOR_2)
		})
		_common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_FACTOR_CC).then(($COST_FACTOR_CC) => {
			var COST_FACTOR_CC = parseFloat($COST_FACTOR_CC.text())
			Cypress.env("COST_FACTOR_CC", COST_FACTOR_CC)
		})
		_common.minimizeContainer(cnt.uuid.RESOURCES)
		_common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_FACTOR_1).then(($PARENT_COST_FACTOR_1) => {
			var PARENT_COST_FACTOR_1 = parseFloat($PARENT_COST_FACTOR_1.text())
			Cypress.env("PARENT_COST_FACTOR_1", PARENT_COST_FACTOR_1)
		})
		_common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT).then(($Rate_currency) => {
			var Rate_currency = parseFloat($Rate_currency.text())
			Cypress.env("Rate_currency", Rate_currency)
		})
		_common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_FACTOR_2).then(($PARENT_COST_FACTOR_2) => {
			var PARENT_COST_FACTOR_2 = parseFloat($PARENT_COST_FACTOR_2.text())
			Cypress.env("PARENT_COST_FACTOR_2", PARENT_COST_FACTOR_2)
		})
		cy.wait(500).then(() => {
			var Cost_Factors = Cypress.env("COST_FACTOR_1") * Cypress.env("COST_FACTOR_2") * Cypress.env("COST_FACTOR_CC")
			var Parent_Cost_Factors = Cypress.env("PARENT_COST_FACTOR_1") * Cypress.env("PARENT_COST_FACTOR_2") * Cypress.env("COST_FACTOR_CC")
			var Resource_Cost_Total = Cypress.env("res_QuantityTotal") * Cypress.env("Rate_currency") * Cost_Factors * Parent_Cost_Factors
			_common.assert_forNumericValues(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL, Resource_Cost_Total.toString())
		})
	});

	it('TC - Verify Resource with IsCost=1, DW/T+M do sum to line item', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES);
			_common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCES.iscost, CONTAINER_COLUMNS_RESOURCES.dayworkrateunit, CONTAINER_COLUMNS_RESOURCES.EstimateResourceUDP1costunit, CONTAINER_COLUMNS_RESOURCES.EstimateResourceUDP2costunit, CONTAINER_COLUMNS_RESOURCES.EstimateResourceUDP3costunit, CONTAINER_COLUMNS_RESOURCES.EstimateResourceUDP4costunit, CONTAINER_COLUMNS_RESOURCES.EstimateResourceUDP5costunit], cnt.uuid.RESOURCES)
		});
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
		});
		_common.waitForLoaderToDisappear()

		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_ASSEMBLY_RESOURCE.CODE[0])
		_common.set_cellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_COST, "check")
		_common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.DAY_WORK_RATE_UNIT).then(($DWTMRATE) => {
			Cypress.env("DWTMRATE", $DWTMRATE.text())
		})
		_common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_ASSEMBLY_RESOURCE.CODE[1])
		_common.set_cellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_COST, "check")
		_common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.DAY_WORK_RATE_UNIT).then(($DWTMRATE1) => {
			Cypress.env("DWTMRATE1", $DWTMRATE1.text())
		})
		_common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_ASSEMBLY_RESOURCE.CODE[2])
		_common.set_cellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_COST, "check")
		_common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.DAY_WORK_RATE_UNIT).then(($DWTMRATE2) => {
			Cypress.env("DWTMRATE2", $DWTMRATE2.text())
		})
		_common.minimizeContainer(cnt.uuid.RESOURCES)
		cy.SAVE().then(() => {
			var dwRATE = parseFloat(Cypress.env("DWTMRATE")) + parseFloat(Cypress.env("DWTMRATE1")) + parseFloat(Cypress.env("DWTMRATE2"))
			_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DAY_WORK_RATE_UNIT, dwRATE.toString())
		})
	});

	it('TC - Verify Resource with IsCost=1,UDP1-5 do sum to line item', function () {
	
		_common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS)
		_common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP1_COST_UNIT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCES.LEASING_COST_UNIT)
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP1_COST_UNIT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCES.LEASING_COST_UNIT)
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.ESTIMATE_LINE_ITEM_UDP1_COST_UNIT, CONTAINERS_RESOURCES.LEASING_COST_UNIT)
		
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP2_COST_UNIT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCES.SERVICE_COST_UNIT)
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.ESTIMATE_LINE_ITEM_UDP2_COST_UNIT, CONTAINERS_RESOURCES.SERVICE_COST_UNIT)
		_common.waitForLoaderToDisappear()

		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP3_COST_UNIT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCES.INSTALLATION_COST_UNIT)
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.ESTIMATE_LINE_ITEM_UDP3_COST_UNIT, CONTAINERS_RESOURCES.INSTALLATION_COST_UNIT)
		_common.waitForLoaderToDisappear()
		
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP4_COST_UNIT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCES.LIST_MINUS_COST_UNIT)
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.ESTIMATE_LINE_ITEM_UDP4_COST_UNIT, CONTAINERS_RESOURCES.LIST_MINUS_COST_UNIT)
		_common.waitForLoaderToDisappear()


		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP5_COST_UNIT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCES.LIST_MAX_COST_UNIT)
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.ESTIMATE_LINE_ITEM_UDP5_COST_UNIT, CONTAINERS_RESOURCES.LIST_MAX_COST_UNIT)
		_common.waitForLoaderToDisappear()

	});


	it('TC - Verify cost/unit value of material and cost code should get from project cost code job rate/material if it is fixed', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
		_common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_6)
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
		_common.waitForLoaderToDisappear()  


		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
		});
		_common.waitForLoaderToDisappear()
		_common.search_inSubContainer(cnt.uuid.ASSEMBLY,Cypress.env("ASSEMBLY_CODE"))
		_common.waitForLoaderToDisappear()


		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECT_COST_CODES, app.FooterTab.COSTCODES, 1);
			_common.setup_gridLayout(cnt.uuid.PROJECT_COST_CODES, CONTAINER_COLUMNS_PROJECT_COST_CODE);
		});
		_common.waitForLoaderToDisappear()
		_common.search_inSubContainer(cnt.uuid.PROJECT_COST_CODES, CONTAINERS_ASSEMBLY_RESOURCE.CODE[0]);
		_common.waitForLoaderToDisappear()
		_common.set_cellCheckboxValue(cnt.uuid.PROJECT_COST_CODES, app.GridCells.IS_RATE, commonLocators.CommonKeys.CHECK)
		_common.waitForLoaderToDisappear()


		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.COSTCODESJOBRATE, app.FooterTab.COSTCODES_JOB_RATES, 3);
		});
		_common.select_rowInContainer(cnt.uuid.COSTCODESJOBRATE)
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.COSTCODESJOBRATE, app.GridCells.RATE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PROJECT_COST_CODE.RATE_PROJECT)
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()


		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_PROJECT_ASSEMBLY);

		_common.waitForLoaderToDisappear()
        _assembliesPage.recalculate_assemblies_fromWizard(UPDATE_PROJECT_ASSEMBLIES_PARAMETERS)
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
		});
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
		});
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE);
		_common.search_inSubContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, CONTAINERS_ASSEMBLY_RESOURCE.CODE[0])

		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
		});
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.ASSEMBLY)

		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
		});
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)
		_common.waitForLoaderToDisappear()
		_common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.GridCells.COST_UNIT, CONTAINERS_PROJECT_COST_CODE.RATE_PROJECT)
	});

	after(() => {
		cy.LOGOUT();
	});
});

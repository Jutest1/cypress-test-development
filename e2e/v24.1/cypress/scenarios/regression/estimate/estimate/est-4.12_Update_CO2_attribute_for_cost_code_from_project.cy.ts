import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _procurementContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _procurementPage, _assembliesPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface()

const PRICE_LIST_DESC = "PL_DESC-" + Cypress._.random(0, 999);
let CONTAINERS_DATA_TYPES
let CONTAINERS_DATA_RECORDS

let CONTAINERS_COST_CODES
let CONTAINER_COLUMNS_COST_CODES


const PRICE1_VERSION_DESC="P1-" + Cypress._.random(0, 999);
const PRICE2_VERSION_DESC="P2-" + Cypress._.random(0, 999);
const PRICE3_VERSION_DESC="P3-" + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_PRICE_LIST

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999)
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);
let LINE_ITEM_PARAMETERS:DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;

let RESOURCE_PARAMETERS_1:DataCells
let RESOURCE_PARAMETERS_2:DataCells
let CONTAINER_COLUMNS_RESOURCE;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 4.12 | Update CO2 attribute for cost codes from project")
describe("EST- 4.12 | Update CO2 attribute for cost codes from project", () => {
    before(function () {
        cy.fixture("estimate/est-4.12-Update_CO2_attribute_for_cost_codes_from_project.json")
          .then((data) => {
            this.data=data
            CONTAINERS_DATA_TYPES=this.data.CONTAINERS.DATA_TYPES
            CONTAINERS_COST_CODES=this.data.CONTAINERS.COST_CODES
            CONTAINER_COLUMNS_COST_CODES=this.data.CONTAINER_COLUMNS.COST_CODES

            CONTAINER_COLUMNS_PRICE_LIST=this.data.CONTAINER_COLUMNS.PRICE_LIST

            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
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

            CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
			RESOURCE_PARAMETERS_1 = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_COST_CODES.SHORT_KEY[0],
				[app.GridCells.CODE]: CONTAINERS_COST_CODES.CODE[0],
			};

            RESOURCE_PARAMETERS_2 = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_COST_CODES.SHORT_KEY[0],
				[app.GridCells.CODE]: CONTAINERS_COST_CODES.CODE[1],
			};

            CONTAINERS_DATA_RECORDS=this.data.CONTAINERS.DATA_RECORDS
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
          })
    });
    after(() => {
        cy.LOGOUT();
    });

    it('TC - Create price list record in customizing', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
           
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES,CONTAINERS_DATA_TYPES.PRICE_LIST)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES,CONTAINERS_DATA_TYPES.MASTER_DATA)

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,PRICE_LIST_DESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS,app.GridCells.CONTEXT_FK,commonLocators.CommonKeys.LIST,CONTAINERS_DATA_RECORDS.CLERK_CONFIG)
        _common.select_activeRowInContainer(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()

        _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS,app.GridCells.CURRENCY_FK,commonLocators.CommonKeys.LIST,CONTAINERS_DATA_RECORDS.CURRENCY)
        _common.select_activeRowInContainer(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()

        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS,app.GridCells.IS_DEFAULT,commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })

    it('TC - Create price version and price list record in cost code', function () {
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES,CONTAINER_COLUMNS_COST_CODES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODES.code,CONTAINER_COLUMNS_COST_CODES.co2project],cnt.uuid.COST_CODES)
        })
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.COST_CODES)
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE[0])
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) // This wait is required as its taking time to load container
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE[0])
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.CO2_PROJECT[0])
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.COST_CODES)

        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_VERSION_V1, app.FooterTab.PRICE_VERSIONS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PRICE_VERSION_V1)
        _common.create_newRecord(cnt.uuid.PRICE_VERSION_V1)
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_VERSION_V1,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,PRICE1_VERSION_DESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_VERSION_V1,app.GridCells.PRICE_LIST_FK,commonLocators.CommonKeys.LIST,PRICE_LIST_DESC)
        _common.select_activeRowInContainer(cnt.uuid.PRICE_VERSION_V1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.create_newRecord(cnt.uuid.PRICE_VERSION_V1)
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_VERSION_V1,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,PRICE2_VERSION_DESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_VERSION_V1,app.GridCells.PRICE_LIST_FK,commonLocators.CommonKeys.LIST,PRICE_LIST_DESC)
        _common.select_activeRowInContainer(cnt.uuid.PRICE_VERSION_V1)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICELIST, app.FooterTab.PRICE_LISTS, 0);
            _common.setup_gridLayout(cnt.uuid.PRICELIST,CONTAINER_COLUMNS_PRICE_LIST)
        });
        _common.maximizeContainer(cnt.uuid.PRICELIST)
        _common.clear_subContainerFilter(cnt.uuid.PRICELIST)
        _common.create_newRecord(cnt.uuid.PRICELIST)
        _common.edit_dropdownCellWithInput(cnt.uuid.PRICELIST,app.GridCells.COST_CODE_PRICE_VER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,PRICE1_VERSION_DESC)
        _common.select_activeRowInContainer(cnt.uuid.PRICELIST)
        _common.enterRecord_inNewRow(cnt.uuid.PRICELIST,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.CO2_PROJECT[1])
        _common.select_activeRowInContainer(cnt.uuid.PRICELIST)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    
        _common.clear_subContainerFilter(cnt.uuid.PRICELIST)
        _common.create_newRecord(cnt.uuid.PRICELIST)
        _common.edit_dropdownCellWithInput(cnt.uuid.PRICELIST,app.GridCells.COST_CODE_PRICE_VER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,PRICE2_VERSION_DESC)
        _common.select_activeRowInContainer(cnt.uuid.PRICELIST)
        _common.enterRecord_inNewRow(cnt.uuid.PRICELIST,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.CO2_PROJECT[2])
        _common.select_activeRowInContainer(cnt.uuid.PRICELIST)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PRICELIST)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
        })
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.COST_CODES)
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE[1])
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) // This wait is required as its taking time to load container
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE[1])
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.CO2_PROJECT[0])
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.COST_CODES)

        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_VERSION_V1, app.FooterTab.PRICE_VERSIONS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PRICE_VERSION_V1)
        _common.create_newRecord(cnt.uuid.PRICE_VERSION_V1)
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_VERSION_V1,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,PRICE3_VERSION_DESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_VERSION_V1,app.GridCells.PRICE_LIST_FK,commonLocators.CommonKeys.LIST,PRICE_LIST_DESC)
        _common.select_activeRowInContainer(cnt.uuid.PRICE_VERSION_V1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICELIST, app.FooterTab.PRICE_LISTS, 0);
        });
        _common.maximizeContainer(cnt.uuid.PRICELIST)
        _common.clear_subContainerFilter(cnt.uuid.PRICELIST)
        _common.create_newRecord(cnt.uuid.PRICELIST)
        _common.edit_dropdownCellWithInput(cnt.uuid.PRICELIST,app.GridCells.COST_CODE_PRICE_VER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,PRICE3_VERSION_DESC)
        _common.select_activeRowInContainer(cnt.uuid.PRICELIST)
        _common.enterRecord_inNewRow(cnt.uuid.PRICELIST,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.CO2_PROJECT[3])
        _common.select_activeRowInContainer(cnt.uuid.PRICELIST)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PRICELIST)
    })

    it("TC - Create estimate header", function() {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);

		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
          _common.setDefaultView(app.TabBar.ESTIMATE)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create new line item record", function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.co2projecttotal],cnt.uuid.ESTIMATE_LINEITEMS)
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
    
    it('TC - Assign resource to the line item', function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.co2projecttotal],cnt.uuid.RESOURCES)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
		_common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS_1);
        _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.RESOURCES,CONTAINERS_COST_CODES.CODE[0])
        _common.saveCellDataToEnv(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT_TOTAL,"CO2_PROJECT_RES1")
        _common.minimizeContainer(cnt.uuid.RESOURCES)

        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
		_common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS_2);
        _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.RESOURCES,CONTAINERS_COST_CODES.CODE[1])
        _common.saveCellDataToEnv(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT_TOTAL,"CO2_PROJECT_RES2")
        _common.minimizeContainer(cnt.uuid.RESOURCES)


    });
    
    it('TC - Update CO2 attribute in cost codes', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES,CONTAINER_COLUMNS_COST_CODES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODES.code,CONTAINER_COLUMNS_COST_CODES.co2project],cnt.uuid.COST_CODES)
        })
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.COST_CODES)
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE[0])
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) // This wait is required as its taking time to load container
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE[0])
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.CO2_PROJECT_UPDATE[0])
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.COST_CODES)

        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.COST_CODES)
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE[1])
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) // This wait is required as its taking time to load container
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE[1])
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.CO2_PROJECT_UPDATE[1])
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.COST_CODES)
         
    })

    it('TC - Update cost code prices in project', function () {
      
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_COST_CODES_PRICES);
        _common.waitForLoaderToDisappear()
        _estimatePage.update_costCodePrices_fromWizard(PRICE3_VERSION_DESC,CONTAINERS_COST_CODES.CODE[1],CONTAINERS_COST_CODES.CODE[0])
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    })

    it('TC - Verify co2 project attributes is updated from price list and cost code for respective resource', function () {
            
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
		});
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
		_common.waitForLoaderToDisappear()
        _common.filterCurrentEstimate(cnt.uuid.ESTIMATE,commonLocators.CommonKeys.NO_FILTER)
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
        _common.select_rowHasValue(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.co2projecttotal],cnt.uuid.ESTIMATE_LINEITEMS)
        });
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINERS_COST_CODES.CODE[0])
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINERS_COST_CODES.CODE[0])
        _common.assert_forNumericValues(cnt.uuid.RESOURCES,app.GridCells.CO2_PROJECT,CONTAINERS_COST_CODES.CO2_PROJECT_UPDATE[0])


        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINERS_COST_CODES.CODE[1])
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINERS_COST_CODES.CODE[1])
        _common.assert_forNumericValues(cnt.uuid.RESOURCES,app.GridCells.CO2_PROJECT,CONTAINERS_COST_CODES.CO2_PROJECT_UPDATE[1])

            
           
         
    })
   
})
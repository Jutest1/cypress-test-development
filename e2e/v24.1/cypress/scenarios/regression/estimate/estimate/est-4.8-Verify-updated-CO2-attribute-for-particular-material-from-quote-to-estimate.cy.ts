import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _procurementContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _procurementPage, _assembliesPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface()

let CONTAINERS_MATERIAL_RECORDS
let CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER

let CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER

let CONTAINERS_MATERIAL_CATALOGS

let CONTAINER_COLUMNS_MATERIAL_RECORDS

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999)
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);
let LINE_ITEM_PARAMETERS:DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;

let RESOURCE_PARAMETERS_4:DataCells
let CONTAINER_COLUMNS_RESOURCE;

let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE

let UPDATE_ESTIMATE_PARAMETER:DataCells
let MODAL_UPDATE_ESTIMATE_WIZARD;

let CONTAINER_COLUMNS_QUOTE_ITEMS

let CREATE_RFQ_PARAMETERS:DataCells

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 4.8 | Verify updated CO2 attributes for a particular material from quote to estimate")
describe("EST- 4.8 | Verify updated CO2 attributes for a particular material from quote to estimate", () => {
  
    before(function () {
      
        cy.fixture("estimate/est-4.8-Verify-updated-CO2-attribute-for-particular-material-from-quote-to-estimate.json")
          .then((data) => {
            this.data=data
            CONTAINERS_MATERIAL_CATALOGS=this.data.CONTAINERS.MATERIAL_CATALOGS

            CONTAINERS_MATERIAL_RECORDS=this.data.CONTAINERS.MATERIAL_RECORDS

            CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG_FILTER

            CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER=this.data.CONTAINER_COLUMNS.MATERIAL_GROUP_FILTER
            
            CONTAINER_COLUMNS_MATERIAL_RECORDS=this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS

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
            RESOURCE_PARAMETERS_4 = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_MATERIAL_RECORDS.SHORT_KEY[1],
				[app.GridCells.CODE]: CONTAINERS_MATERIAL_RECORDS.MATERIAL_RECORD_DESCRIPTION
			};

            MODAL_CREATE_UPDATE_MATERIAL_PACKAGE=this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE

            MODAL_UPDATE_ESTIMATE_WIZARD=this.data.MODAL.UPDATE_ESTIMATE_WIZARD
            UPDATE_ESTIMATE_PARAMETER={
                [commonLocators.CommonKeys.CHECKBOX]:MODAL_UPDATE_ESTIMATE_WIZARD
            }

            CONTAINER_COLUMNS_QUOTE_ITEMS=this.data.CONTAINER_COLUMNS.QUOTE_ITEMS

            CREATE_RFQ_PARAMETERS={
                [commonLocators.CommonLabels.BUSINESS_PARTNER]:[MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.BUSINESS_PARTNER]
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

          })
    });
    
    after(() => {
        cy.LOGOUT();
    });
    
    it('TC - Add CO2 project value to record in material module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.setDefaultView(app.TabBar.RECORDS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER)
        })
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINERS_MATERIAL_CATALOGS.MATERIAL_CATALOG_DESCRIPTION)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOG_FILTER)

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUP_FILTER, CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER)
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_GROUP_FILTER)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUP_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER, CONTAINERS_MATERIAL_CATALOGS.MATERIAL_GROUP_DESCRIPTION)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED,commonLocators.CommonKeys.CHECK)
        _common.minimizeContainer(cnt.uuid.MATERIAL_GROUP_FILTER)
        _common.select_rowHasValue
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, CONTAINERS_MATERIAL_RECORDS.MATERIAL_RECORD_DESCRIPTION)
        _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_MATERIAL_RECORDS.CO2_PROJECT)
        _common.select_activeRowInContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS)
    })
     
    it("TC - Create estimate header", function() {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
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
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
		_common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS_4);
        _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.RESOURCES)

    });

    it("TC - Create/update material package and change package status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.MATERIAL_AND_COST_CODE,null,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.CONFIGURATION,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE);
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
        })
    });

    it("TC - Change status of the package", function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE, Cypress.env("PACKAGE_CODE_0"))
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PACKAGE, Cypress.env("PACKAGE_CODE_0"))
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create Request For Quote from wizard', function() {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_RFQ);
        _common.waitForLoaderToDisappear()    
        _common.waitForLoaderToDisappear()    
        _rfqPage.create_requestForQuote_fromWizard(CREATE_RFQ_PARAMETERS);
        _common.waitForLoaderToDisappear()    
        _rfqPage.getCode_fromRFQModal("RFQ_CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        _common.waitForLoaderToDisappear()
    });

    it('TC - Change Request For Quote status', function() {
        _common.openTab(app.TabBar.RFQ).then(()=>{
            _common.setDefaultView(app.TabBar.RFQ)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE,app.FooterTab.RFQ,2)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.search_inSubContainer(cnt.uuid.REQUEST_FOR_QUOTE,Cypress.env("RFQ_CODE"))
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.REQUEST_FOR_QUOTE,Cypress.env("RFQ_CODE"))

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.waitForLoaderToDisappear()    
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
        _common.waitForLoaderToDisappear()    
    })

    it("TC - Create quote", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);        
        _rfqPage.create_quote_fromWizard([MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.BUSINESS_PARTNER],[commonLocators.CommonKeys.CHECK])
        _common.waitForLoaderToDisappear()    
        _boqPage.getCode_fromQuoteModal("QUOTE_CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
        _common.waitForLoaderToDisappear()    
    })
   
    it("TC - Add CO2 project under quote items", function () {
        _common.openTab(app.TabBar.QUOTES).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.QUOTES,app.FooterTab.QUOTES,0)
        }) 
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        _common.search_inSubContainer(cnt.uuid.QUOTES,Cypress.env("QUOTE_CODE"))
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.QUOTES, Cypress.env("QUOTE_CODE"))

        _common.openTab(app.TabBar.QUOTES).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS,app.FooterTab.ITEMS,1)
            _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_QUOTE_ITEMS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_QUOTE_ITEMS.co2project,CONTAINER_COLUMNS_QUOTE_ITEMS.co2projecttotal],cnt.uuid.QUOTES_ITEMS)  
        }) 
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_MATERIAL_RECORDS.CO2_PROJECT)
        _common.waitForLoaderToDisappear()    
        cy.SAVE()
        _common.waitForLoaderToDisappear()  
        
        _common.saveCellDataToEnv(cnt.uuid.QUOTES_ITEMS, app.GridCells.CO2_PROJECT_TOTAL,"CO2_PROJECT_TOTAL")


        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.UPDATE_ESTIMATE);
        _common.waitForLoaderToDisappear()
        _estimatePage.update_estimate_fromWizard(UPDATE_ESTIMATE_PARAMETER)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()    
    })

    it('TC - Verify CO2 project Total in line item is updated', function () {
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);

		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
		});
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();

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
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
        _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.CO2_PROJECT_TOTAL,Cypress.env("CO2_PROJECT_TOTAL").toString())     
    })
})
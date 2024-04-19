import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _procurementContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _procurementPage, _assembliesPage, _materialPage } from "cypress/pages";
import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import _ from "cypress/types/lodash";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface()

let CONTAINERS_COST_CODES
let CONTAINER_COLUMNS_COST_CODES

let CONTAINERS_MATERIAL_RECORDS
let CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER

let CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER

let CONTAINERS_MATERIAL_CATALOGS

let CONTAINER_COLUMNS_MATERIAL_RECORDS

const ASSEMBLY_CATEGORY_DESC="AC_DESC-" + Cypress._.random(0, 999);
let CONTAINERS_ASSEMBLY_CATEGORIES
let CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES

const ASSEMBLIES_DESC="AC_DESC-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_ASSEMBLIES
let ASSEMBLIES_PARAMETERS:DataCells

let CONTAINER_COLUMNS_ASSEMBLY_RESOURCE
let ASSEMBLY_RESOURCE_MATERIAL_PARAMETERS:DataCells
let ASSEMBLY_RESOURCE__COST_CODE_PARAMETERS:DataCells

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
let RESOURCE_PARAMETERS_3:DataCells
let RESOURCE_PARAMETERS_4:DataCells
let CONTAINER_COLUMNS_RESOURCE;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 4.7 | Verify CO2 attributes calculations in line item associated with the resources Cost codes, Material, Assembly ")
describe("EST- 4.7 | Verify CO2 attributes calculations in line item associated with the resources Cost codes, Material, Assembly ", () => {
    before(function () {
        cy.fixture("estimate/est-4.7-Verify_Co2_attributes_calculations_in_line_item_associacted_with_the_resources_Cost_codes_Material_Assembly.json")
          .then((data) => {
            this.data=data
            CONTAINERS_COST_CODES=this.data.CONTAINERS.COST_CODES
            CONTAINER_COLUMNS_COST_CODES=this.data.CONTAINER_COLUMNS.COST_CODES

            CONTAINERS_MATERIAL_CATALOGS=this.data.CONTAINERS.MATERIAL_CATALOGS

            CONTAINERS_MATERIAL_RECORDS=this.data.CONTAINERS.MATERIAL_RECORDS

            CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG_FILTER

            CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER=this.data.CONTAINER_COLUMNS.MATERIAL_GROUP_FILTER
            
            CONTAINER_COLUMNS_MATERIAL_RECORDS=this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS

            CONTAINERS_ASSEMBLY_CATEGORIES=this.data.CONTAINERS.ASSEMBLY_CATEGORIES
            CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES=this.data.CONTAINER_COLUMNS.ASSEMBLY_CATEGORIES

            CONTAINER_COLUMNS_ASSEMBLIES=this.data.CONTAINER_COLUMNS.ASSEMBLIES
            ASSEMBLIES_PARAMETERS={
                [app.GridCells.DESCRIPTION_INFO]:ASSEMBLIES_DESC,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_ASSEMBLY_CATEGORIES.QUANTITY
            }

            CONTAINER_COLUMNS_ASSEMBLY_RESOURCE=this.data.CONTAINER_COLUMNS.ASSEMBLY_RESOURCE
            ASSEMBLY_RESOURCE__COST_CODE_PARAMETERS={
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_ASSEMBLY_CATEGORIES.SHORT_KEY[0],
                [app.GridCells.CODE]:CONTAINERS_COST_CODES.CODE[0],
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_ASSEMBLY_CATEGORIES.QUANTITY
            }
            ASSEMBLY_RESOURCE_MATERIAL_PARAMETERS={
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_ASSEMBLY_CATEGORIES.SHORT_KEY[1],
                [app.GridCells.CODE]:CONTAINERS_MATERIAL_RECORDS.MATERIAL_RECORD_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_ASSEMBLY_CATEGORIES.QUANTITY
            }

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
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_ASSEMBLY_CATEGORIES.SHORT_KEY[0],
				[app.GridCells.CODE]: CONTAINERS_COST_CODES.CODE[0],
			};

            RESOURCE_PARAMETERS_2 = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_ASSEMBLY_CATEGORIES.SHORT_KEY[0],
				[app.GridCells.CODE]: CONTAINERS_COST_CODES.CODE[1],
			};

            RESOURCE_PARAMETERS_3 = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_ASSEMBLY_CATEGORIES.SHORT_KEY[2],
				[app.GridCells.CODE]: ASSEMBLIES_DESC
			};

            RESOURCE_PARAMETERS_4 = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_ASSEMBLY_CATEGORIES.SHORT_KEY[1],
				[app.GridCells.CODE]: CONTAINERS_MATERIAL_RECORDS.MATERIAL_RECORD_DESCRIPTION
			};

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
    
    it('TC - Add CO2 project value to record in cost code', function () {
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
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.CO2_PROJECT)
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()


        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE[1])
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) // This wait is required as its taking time to load container
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE[1])
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.CO2_PROJECT)
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.COST_CODES)
    })

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

    it("TC - Create assembly category", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES);
        _common.waitForLoaderToDisappear()
        
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES)
        });
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLIES, CONTAINER_COLUMNS_ASSEMBLIES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLIES.code,CONTAINER_COLUMNS_ASSEMBLIES.descriptioninfo,CONTAINER_COLUMNS_ASSEMBLIES.quantity,CONTAINER_COLUMNS_ASSEMBLIES.estassemblycatfk,CONTAINER_COLUMNS_ASSEMBLIES.mdccostcodefk,CONTAINER_COLUMNS_ASSEMBLIES.mdcmaterialfk],cnt.uuid.ASSEMBLIES)
        });
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE, CONTAINER_COLUMNS_ASSEMBLY_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.estresourcetypeshortkey,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.code,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.co2project,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.co2source,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.co2projecttotal,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.co2sourcetotal],cnt.uuid.ASSEMBLY_RESOURCE)
        });
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,ASSEMBLY_CATEGORY_DESC)
        _common.select_activeRowInContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

       
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)  
    })

    it("TC - Create assemblies", function () {
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.create_newRecord(cnt.uuid.ASSEMBLIES)
        _assembliesPage.enterRecord_toCreateAssemblies(cnt.uuid.ASSEMBLIES,ASSEMBLIES_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES,ASSEMBLIES_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLIES_DESC)
        _common.minimizeContainer(cnt.uuid.ASSEMBLIES)
    })

    it("TC - Create assembly resources", function () {
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
       
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE__COST_CODE_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_MATERIAL_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    })
    
    it("TC - Create estimate header", function() {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
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
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.co2projecttotal,CONTAINER_COLUMNS_LINE_ITEM.co2sourcetotal,CONTAINER_COLUMNS_LINE_ITEM.co2totalvariance],cnt.uuid.ESTIMATE_LINEITEMS)
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

    
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
		_common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS_4);
        _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.RESOURCES,CONTAINERS_MATERIAL_RECORDS.MATERIAL_RECORD_DESCRIPTION)
        _common.saveCellDataToEnv(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT_TOTAL,"CO2_PROJECT_RES4")
        _common.minimizeContainer(cnt.uuid.RESOURCES)

        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
		_common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS_3);
        _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.RESOURCES)
        _common.clickOn_toolbarButton(cnt.uuid.RESOURCES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.select_rowHasValue(cnt.uuid.RESOURCES,ASSEMBLIES_DESC)
        _common.saveCellDataToEnv(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT_TOTAL,"CO2_PROJECT_RES3")
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    });

    it('TC - Verify co2 project for line item is equal to sum of co2 project of all resources', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_PROJECT_TOTAL,"CO2_PROJECT_TOTAL")
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_SOURCE_TOTAL,"CO2_SOURCE_TOTAL")
        _validate.verify_additionOfMultipleValues(Cypress.env("CO2_PROJECT_RES1"),Cypress.env("CO2_PROJECT_RES2"),Cypress.env("CO2_PROJECT_RES3"),Cypress.env("CO2_PROJECT_RES4"))
        _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.CO2_PROJECT_TOTAL,Cypress.env("TotalOfAll"))
    })

    it('TC - Verify CO2 Total variance in line item is difference of CO2/kg(source) and CO2/kg(project)', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _validate.verify_isRecordSubstractTwoValues(cnt.uuid.ESTIMATE_LINEITEMS, Cypress.env("CO2_PROJECT_TOTAL"), Cypress.env("CO2_SOURCE_TOTAL"),app.GridCells.CO2_TOTAL_VARIANCE)      
    })
})
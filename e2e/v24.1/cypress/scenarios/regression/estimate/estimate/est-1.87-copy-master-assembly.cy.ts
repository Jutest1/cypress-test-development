import { _common, _estimatePage, _validate, _mainView, _boqPage, _assembliesPage, _projectPage } from 'cypress/pages';
import { app, tile, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { DataCells } from 'cypress/pages/interfaces';


// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();

const ASSEMBLY_DESC = 'ADESC_' + Cypress._.random(0, 999);
const PROJECT_NO="39" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
const ASSEMBLY_CATEGORY_DESC = 'ACD_' + Cypress._.random(0, 9999);
const ASSEMBLIES_DESC = 'ASDESC_' + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM
let CONTAINER_COLUMNS_RESOURCE;
let MODAL_RECALCULATE_ASSEMBLIES;
let MODAL_UPDATE_SETTING;
let CONTAINERS_ASSEMBLIES 
let CONTAINER_COLUMNS_ASSEMBLY_CATAGORY
let CONTAINER_COLUMNS_ASSEMBLIES
let CONTAINER_COLUMNS_ASSEMBLY_RESOURCE
let CONTAINERS_RESOURCE
let CONTAINERS_ASSEMBLY_RESOURCE
let CONTAINERS_ESTIMATE
let MODAL_PROJECTS
let CONTAINER_COLUMNS_ESTIMATE
let DATAS:DataCells
let DATAS1:DataCells
let ASSEMBLIES_PARAMETER:DataCells
let ASSEMBLY_RESOURCE_PARAMETER:DataCells
let ASSEMBLY_RESOURCE_CA_PARAMETER:DataCells
let ASSEMBLY_RESOURCE_MATERIAL_PARAMETER:DataCells
let ASSEMBLIES_PARAMETER_1:DataCells
let PROJECTS_PARAMETERS:DataCells
let ESTIMATE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS:DataCells
let RESOURCE_PARAMETERS:DataCells
let RECALCULATE_ASSEMBLIES_PARAMETERS:DataCells

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic('ESTIMATE');
ALLURE.feature('Estimate');
ALLURE.story('EST- 1.87 | Copy Master Assembly');

describe('EST- 1.87 | Copy Master Assembly', () => {
	
	before(function () {
		cy.fixture('estimate/est-1.87-copy-master-assembly.json')
		  .then((data) => {			
			this.data = data;
			CONTAINERS_ASSEMBLIES = this.data.CONTAINERS.ASSEMBLIES;
			CONTAINER_COLUMNS_ASSEMBLY_CATAGORY=this.data.CONTAINER_COLUMNS.ASSEMBLY_CATAGORY
			CONTAINER_COLUMNS_ASSEMBLIES=this.data.CONTAINER_COLUMNS.ASSEMBLIES
			CONTAINER_COLUMNS_ASSEMBLY_RESOURCE=this.data.CONTAINER_COLUMNS.ASSEMBLY_RESOURCE

			CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
			ASSEMBLIES_PARAMETER={
				[app.GridCells.DESCRIPTION_INFO]:ASSEMBLIES_DESC,
				[app.GridCells.QUANTITY_SMALL]:CONTAINERS_ASSEMBLIES.QUANTITY[0]
			}

			ASSEMBLIES_PARAMETER_1={
				[app.GridCells.DESCRIPTION_INFO]:ASSEMBLY_DESC,
				[app.GridCells.QUANTITY_SMALL]:CONTAINERS_ASSEMBLIES.QUANTITY[4]
			}	

			ASSEMBLY_RESOURCE_PARAMETER={
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_ASSEMBLIES.SHORT_KEY[0],
				[app.GridCells.CODE]:CONTAINERS_RESOURCE.CODE[0],
				[app.GridCells.QUANTITY_SMALL]:CONTAINERS_ASSEMBLIES.QUANTITY[1]
			}
			ASSEMBLY_RESOURCE_CA_PARAMETER={
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_ASSEMBLIES.ASSEMBLY_TYPE[0],
				[app.GridCells.CODE]:CONTAINERS_ASSEMBLIES.EXISTING_ASSEMBLIES,
				[app.GridCells.QUANTITY_SMALL]:CONTAINERS_ASSEMBLIES.QUANTITY[3]
			}
			ASSEMBLY_RESOURCE_MATERIAL_PARAMETER={
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_ASSEMBLIES.SHORT_KEY[1],
				[app.GridCells.CODE]:CONTAINERS_ASSEMBLIES.MATERIAL,
				[app.GridCells.QUANTITY_SMALL]:CONTAINERS_ASSEMBLIES.QUANTITY[2]
			}

			CONTAINERS_ASSEMBLY_RESOURCE = this.data.CONTAINERS.ASSEMBLY_RESOURCE

			DATAS={
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_ASSEMBLIES.SHORT_KEY[0],
				[app.GridCells.CODE]:CONTAINERS_ASSEMBLIES.CODE[1],
				[app.GridCells.QUANTITY_SMALL]:CONTAINERS_ASSEMBLIES.QUANTITY[4]
			}		
			DATAS1={
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_ASSEMBLIES.ASSEMBLY_TYPE[0],
				[app.GridCells.CODE]:Cypress.env("ASSEMBLY_CA_CODE"),
				[app.GridCells.QUANTITY_SMALL]:CONTAINERS_ASSEMBLIES.QUANTITY[5]
			}	

			MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
                [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
                [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK[0]
            }

			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE	
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
			}

			CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
			LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM
            }

            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
			CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE

			MODAL_RECALCULATE_ASSEMBLIES=this.data.MODAL.RECALCULATE_ASSEMBLIES
            MODAL_UPDATE_SETTING=this.data.MODAL.UPDATE_SETTING
			RECALCULATE_ASSEMBLIES_PARAMETERS={
                [commonLocators.CommonKeys.RADIO]:MODAL_RECALCULATE_ASSEMBLIES.SELECT_UPDATE_SCOPE,
                [commonLocators.CommonKeys.RADIO_INDEX]:2,
                [commonLocators.CommonKeys.CHECKBOX]:MODAL_UPDATE_SETTING
            }

		  })
		  .then(() => {		
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));				
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);			
		  });
	});
	
	it("TC - Create assembly category", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES);
        _common.waitForLoaderToDisappear()
        
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
			 _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINER_COLUMNS_ASSEMBLY_CATAGORY)
			_common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
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
            _common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.estresourcetypeshortkey,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.code,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.costunit,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.iscost],cnt.uuid.ASSEMBLY_RESOURCE)
        });
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.enterRecord_inNewRow(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,ASSEMBLY_CATEGORY_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.EST_ASSEMBLY_TYPE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLIES.ASSEMBLY_TYPE[2])
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,CONTAINERS_ASSEMBLIES.EXISTING_ASSEMBLY_CATEGORY)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.EST_ASSEMBLY_TYPE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLIES.ASSEMBLY_TYPE[0])
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)

		_common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)  
    })

    it("TC - Create new assemblies", function () {
              
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.create_newRecord(cnt.uuid.ASSEMBLIES)
        _assembliesPage.enterRecord_toCreateAssemblies(cnt.uuid.ASSEMBLIES,ASSEMBLIES_PARAMETER)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLIES,app.GridCells.MDC_COST_CODE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RESOURCE.CODE[3])
		_common.waitForLoaderToDisappear()
		cy.SAVE()
        _common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLIES,app.GridCells.CODE,"ASSEMBLY_CA_CODE")

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
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_CA_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear() 
		_common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.COST_UNIT,"AS_3_COST_PER_UNIT")
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,"CA_CODE")


        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.COST_UNIT,"AS_1_COST_PER_UNIT")

        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_MATERIAL_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.COST_UNIT,"AS_2_COST_PER_UNIT")       

		_common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    })

	it('TC - Create new assemblies', function () {
		_common.openTab(app.TabBar.ASSEMBLIES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
		});
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()

		_common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
		_common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINERS_ASSEMBLIES.ASSEMBLY_CATEGORY_CODE);      
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		cy.wait(2000) // Added this wait script was getting failed
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
		_common.waitForLoaderToDisappear()
       
		_common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)

		_common.openTab(app.TabBar.ASSEMBLIES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
			_common.setup_gridLayout(cnt.uuid.ASSEMBLIES, CONTAINER_COLUMNS_ASSEMBLIES);
		});
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES);
		_common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.ASSEMBLIES);
		_common.waitForLoaderToDisappear()
		_assembliesPage.enterRecord_toCreateAssemblies(cnt.uuid.ASSEMBLIES,ASSEMBLIES_PARAMETER_1);    
		_common.waitForLoaderToDisappear()
		cy.SAVE()
        _common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		cy.SAVE()
        _common.waitForLoaderToDisappear()   
		_common.search_inSubContainer(cnt.uuid.ASSEMBLIES,ASSEMBLY_DESC) 
		_common.waitForLoaderToDisappear()   
		_common.select_rowInContainer(cnt.uuid.ASSEMBLIES)
		_common.waitForLoaderToDisappear()   
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLIES,app.GridCells.CODE,"assemblyCode")
    })

    it('TC - Create Assembly Resources',function(){
        	
		_common.openTab(app.TabBar.ASSEMBLIES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 3);
		});

		_common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE);
		_assembliesPage.enterRecord_toCreateAssemblyResource(DATAS);
		_common.waitForLoaderToDisappear()
		_common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.COST_UNIT,"costUnit")
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.ASSEMBLY_RESOURCE)

        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE);
        _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,commonLocators.CommonKeys.GRID,CONTAINERS_ASSEMBLIES.SHORT_KEY[1]) 
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)           
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLIES.MATERIAL)
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()

        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE);
		_assembliesPage.enterRecord_toCreateAssemblyResource(DATAS1);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	});

	it("TC - Create New Project", function () {  
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
		_common.clear_subContainerFilter(cnt.uuid.PROJECTS)

        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
		_common.waitForLoaderToDisappear()
        cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
    });

    it('TC - Verify Project Assembly', function () {
		_common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 1);			
		});     
		_common.search_inSubContainer(cnt.uuid.ASSEMBLY,ASSEMBLY_DESC)  
        _validate.verify_recordNotPresentInContainer(cnt.uuid.ASSEMBLY,ASSEMBLY_DESC)
    })

    it('TC - Create new Estimate header', function () {
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
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

	it("TC - Create new line item record", function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM)
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

	it("TC - Create new record in resource", function () {
		RESOURCE_PARAMETERS = {
			[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
			[app.GridCells.CODE]: Cypress.env("assemblyCode")
		};
		
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
			_common.setup_gridLayout(cnt.uuid.RESOURCES,CONTAINER_COLUMNS_RESOURCE)
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
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
    });
	
	it('TC - Verify Assembly copied in Project Assembly',function(){
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
		_common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
			_common.search_inSubContainer(cnt.uuid.ASSEMBLY,Cypress.env("assemblyCode"))
		});       
        _common.assert_cellData_insideActiveRow(cnt.uuid.ASSEMBLY,app.GridCells.CODE,Cypress.env("assemblyCode"))
	})

	it('TC - Verify cost codes unit rate in resource when Is Rate checkbox checked',function(){
	
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECT_COSTCODES, app.FooterTab.COSTCODES, 0);
		}); 
		_common.waitForLoaderToDisappear()
		_common.search_inSubContainer(cnt.uuid.PROJECT_COSTCODES,CONTAINERS_ASSEMBLIES.CODE[1])
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.PROJECT_COSTCODES)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_COSTCODES,app.GridCells.CODE,CONTAINERS_ASSEMBLIES.CODE[1])		
		_common.set_cellCheckboxValue(cnt.uuid.PROJECT_COSTCODES,app.GridCells.IS_RATE,commonLocators.CommonKeys.CHECK)
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		cy.wait(500)
		_common.minimizeContainer(cnt.uuid.PROJECT_COSTCODES)
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
		}); 
		_common.select_rowInContainer(cnt.uuid.ASSEMBLY)

		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.COSTCODESJOBRATE, app.FooterTab.COSTCODES_JOBRATE, 1);			
		}); 
		_common.select_rowInContainer(cnt.uuid.COSTCODESJOBRATE)
		_common.enterRecord_inNewRow(cnt.uuid.COSTCODESJOBRATE,app.GridCells.RATE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLIES.RATE[0])	
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_PROJECT_ASSEMBLY);
		_common.waitForLoaderToDisappear()
		_assembliesPage.recalculate_assemblies_fromWizard(RECALCULATE_ASSEMBLIES_PARAMETERS)

		_common.openTab(app.TabBar.PROJECT).then(() => {           
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY,0);
		})
		_common.select_rowInContainer(cnt.uuid.ASSEMBLY)	

		_common.openTab(app.TabBar.PROJECT).then(() => {           
            _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE,3);
			_common.search_inSubContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,CONTAINERS_ASSEMBLIES.CODE[1]);           
        });  
		_common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,app.GridCells.COST_UNIT,CONTAINERS_ASSEMBLIES.RATE[0])           
	})
	
	it('TC - Verify cost codes unit rate in resource when Is Rate checkbox unchecked',function(){
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECT_COSTCODES, app.FooterTab.COSTCODES, 0);
		}); 
		_common.search_inSubContainer(cnt.uuid.PROJECT_COSTCODES,CONTAINERS_ASSEMBLIES.CODE[1])			
		_common.maximizeContainer(cnt.uuid.PROJECT_COSTCODES)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_COSTCODES,app.GridCells.CODE,CONTAINERS_ASSEMBLIES.CODE[1])		
		_common.set_cellCheckboxValue(cnt.uuid.PROJECT_COSTCODES,app.GridCells.IS_RATE,commonLocators.CommonKeys.UNCHECK)
		cy.SAVE()
		_common.minimizeContainer(cnt.uuid.PROJECT_COSTCODES)
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.COSTCODESJOBRATE, app.FooterTab.COSTCODES_JOBRATE, 1);						
		}); 
		_common.select_rowInContainer(cnt.uuid.COSTCODESJOBRATE)		

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_PROJECT_ASSEMBLY);
		_common.waitForLoaderToDisappear()
		_assembliesPage.recalculate_assemblies_fromWizard(RECALCULATE_ASSEMBLIES_PARAMETERS)
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.PROJECT).then(() => {           
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY,0);
		})
		_common.select_rowInContainer(cnt.uuid.ASSEMBLY)		 
		_common.openTab(app.TabBar.PROJECT).then(() => {           
            _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE,3);
			_common.search_inSubContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,CONTAINERS_ASSEMBLIES.CODE[1]);           
        });  
		_common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,app.GridCells.COST_UNIT,Cypress.env("costUnit"))
	})

	it('TC - Verify cost codes unit rate in resource when Is Rate checkbox checked',function(){

		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECT_COSTCODES, app.FooterTab.COSTCODES, 0);			
		}); 
		_common.search_inSubContainer(cnt.uuid.PROJECT_COSTCODES,CONTAINERS_RESOURCE.CODE[0])			
		_common.maximizeContainer(cnt.uuid.PROJECT_COSTCODES)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_COSTCODES,app.GridCells.CODE,CONTAINERS_RESOURCE.CODE[0])		
		_common.set_cellCheckboxValue(cnt.uuid.PROJECT_COSTCODES,app.GridCells.IS_RATE,commonLocators.CommonKeys.CHECK)
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()

		_common.minimizeContainer(cnt.uuid.PROJECT_COSTCODES)
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.COSTCODESJOBRATE, app.FooterTab.COSTCODES_JOBRATE, 1);						
		}); 
		_common.select_rowInContainer(cnt.uuid.COSTCODESJOBRATE)
		_common.enterRecord_inNewRow(cnt.uuid.COSTCODESJOBRATE,app.GridCells.RATE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLIES.RATE[1])	
		_common.waitForLoaderToDisappear()
		cy.SAVE()		
		_common.waitForLoaderToDisappear()

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_PROJECT_ASSEMBLY);
		_common.waitForLoaderToDisappear()
		_assembliesPage.recalculate_assemblies_fromWizard(RECALCULATE_ASSEMBLIES_PARAMETERS)
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.PROJECT).then(() => {           
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY,0);
			_common.search_inSubContainer(cnt.uuid.ASSEMBLY,Cypress.env("ASSEMBLY_CA_CODE"))
		})
		_common.select_rowInContainer(cnt.uuid.ASSEMBLY)		 
		_common.openTab(app.TabBar.PROJECT).then(() => {           
            _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE,3);
			_common.search_inSubContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,CONTAINERS_RESOURCE.CODE[0]);           
        });  
		_common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,app.GridCells.COST_UNIT,CONTAINERS_ASSEMBLIES.RATE[1])           
	})

	it('TC - Verify cost codes unit rate in resource when Is Rate checkbox unchecked',function(){
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECT_COSTCODES, app.FooterTab.COSTCODES, 0);
			_common.search_inSubContainer(cnt.uuid.PROJECT_COSTCODES,CONTAINERS_RESOURCE.CODE[0])			
		}); 
		_common.maximizeContainer(cnt.uuid.PROJECT_COSTCODES)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_COSTCODES,app.GridCells.CODE,CONTAINERS_RESOURCE.CODE[0])		
		_common.set_cellCheckboxValue(cnt.uuid.PROJECT_COSTCODES,app.GridCells.IS_RATE,commonLocators.CommonKeys.UNCHECK)
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()

		_common.minimizeContainer(cnt.uuid.PROJECT_COSTCODES)
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.COSTCODESJOBRATE, app.FooterTab.COSTCODES_JOBRATE, 1);						
		}); 
		_common.select_rowInContainer(cnt.uuid.COSTCODESJOBRATE)	

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_PROJECT_ASSEMBLY);
		_common.waitForLoaderToDisappear()
		_assembliesPage.recalculate_assemblies_fromWizard(RECALCULATE_ASSEMBLIES_PARAMETERS)
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.PROJECT).then(() => {           
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY,0);
		})
		_common.select_rowInContainer(cnt.uuid.ASSEMBLY)		 
		_common.openTab(app.TabBar.PROJECT).then(() => {           
            _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE,3);
			_common.search_inSubContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,CONTAINERS_RESOURCE.CODE[0]);           
        });  
		_common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,app.GridCells.COST_UNIT,Cypress.env("costUnit"))
	})
})
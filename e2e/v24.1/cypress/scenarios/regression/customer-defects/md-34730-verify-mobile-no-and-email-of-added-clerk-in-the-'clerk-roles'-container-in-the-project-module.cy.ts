import { _common, _controllingUnit, _package, _sidebar, _mainView, _validate, _modalView, _projectPage, _estimatePage, _boqPage } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators, btn } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const BOQSTR_COPY = "BOQST_COPY_DESC-" + Cypress._.random(0, 999);
const BOQST_COPY_REFERENCE = "BOQST_COPY-" + Cypress._.random(0, 999);
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC" + Cypress._.random(0, 999);
const PROJECT_NOA = "PRA" + Cypress._.random(0, 999);
const PROJECT_DESCA = "PRDESCA" + Cypress._.random(0, 999);
const CLERK_NAME = "CLERK" + Cypress._.random(0, 999);
let MODAL_PROJECTS;
let CLERKS_COLUMNS_CONTAINER;
let CLERKS_CONTAINER;

let PROJECTS_PARAMETERS:DataCells;
let PROJECTS_PARAMETERSA:DataCells



allure.epic('CUSTOMER DEFECTS');
allure.feature('Mainka Defects');
allure.story('MD- 34730 | Verify Mobile No and Email of added Clerk in the Clerk Roles Container in the Project Module');

describe('MD- 34730 | Verify Mobile No and Email of added Clerk in the Clerk Roles Container in the Project Module', () => {

	before(function () {
		cy.fixture('customer-defects/md-34730-verify-mobile-no-and-email-of-added-clerk-in-the-clerk-roles-container-in-the-project-module.json').then((data) => {
			this.data = data;
            
            CLERKS_COLUMNS_CONTAINER=this.data.CONTAINER_COLUMNS.CLERK
            CLERKS_CONTAINER=this.data.CONTAINERS.CLERK

            MODAL_PROJECTS=this.data.MODAL.PROJECTS 
            PROJECTS_PARAMETERS={
                    [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
                    [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
                    [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }
            
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
           
        });
     
    });
	
	after(() => {
		cy.LOGOUT();
	});
    it("TC - Create Clerk Record", function () {
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,"Clerk")
        _common.openTab(app.TabBar.CLERK).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CLERKS, app.FooterTab.CLERKS);
            _common.setup_gridLayout(cnt.uuid.CLERKS,CLERKS_COLUMNS_CONTAINER)
            _common.clear_subContainerFilter(cnt.uuid.CLERKS)
        });
         cy.REFRESH_CONTAINER()
        _common.create_newRecord(cnt.uuid.CLERKS)
        _common.enterRecord_inNewRow(cnt.uuid.CLERKS,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,CLERK_NAME)
        _common.enterRecord_inNewRow(cnt.uuid.CLERKS,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,CLERKS_CONTAINER.DESCRIPTION)
        _common.enterRecord_inNewRow(cnt.uuid.CLERKS,app.GridCells.EMAIL,app.InputFields.DOMAIN_TYPE_DIRECTIVE,CLERKS_CONTAINER.Email)
        _common.lookUpButtonInCell(cnt.uuid.CLERKS,app.GridCells.MOBILE_NO,btn.IconButtons.ICO_INPUT_LOOKUP,0)
        _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.PHONE_NUMBER, 0, app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type(CLERKS_CONTAINER.MOBILE_NO, { force: true })
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.wait(2000) // Required wait to load the data
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        cy.wait(2000) // Required wait to load the data
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

        
        
    })

     it("TC - Create Project", function () {

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
        cy.SAVE(); 
        cy.wait(1000)    
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        _common.select_rowInContainer(cnt.uuid.PROJECTS)  
      
     })

     it("TC- Create Clerk Role Record",function(){

        _common.openTab(app.TabBar.PROJECT).then(() => {
           _common.select_tabFromFooter(cnt.uuid.CLERK_ROLE, app.FooterTab.CLERK_ROLES);
           _common.setup_gridLayout(cnt.uuid.CLERK_ROLE,CLERKS_COLUMNS_CONTAINER)
        })
        _common.clear_subContainerFilter(cnt.uuid.CLERK_ROLE)
        _common.create_newRecord(cnt.uuid.CLERK_ROLE)
        _common.edit_dropdownCellWithInput(cnt.uuid.CLERK_ROLE,app.GridCells.CLERK_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CLERK_NAME)
        _common.select_activeRowInContainer(cnt.uuid.CLERK_ROLE)
        _common.clickOn_activeRowCell(cnt.uuid.CLERK_ROLE,app.GridCells.CLERK_ROLE_FK)
        _common.edit_dropdownCellWithInput(cnt.uuid.CLERK_ROLE,app.GridCells.CLERK_ROLE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CLERKS_CONTAINER.ROLE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(2000) // Required wait to load the data
        _common.assert_cellDataByContent_inContainer(cnt.uuid.CLERK_ROLE,app.GridCells.EMAIL,CLERKS_CONTAINER.Email)
        _common.assert_cellDataByContent_inContainer(cnt.uuid.CLERK_ROLE,app.GridCells.MOBILE_NO,CLERKS_CONTAINER.MOBILE_NO)
     })

   
})

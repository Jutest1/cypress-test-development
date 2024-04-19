import { app, cnt, btn, generic, tile } from 'cypress/locators';
import { _modalView, _procurementPage, _procurementContractPage, _common, _estimatePage, _businessPartnerPage, _mainView, _package, _validate, _projectPage, _rfqPage } from 'cypress/pages';

const allure = Cypress.Allure.reporter.getInterface();
const BP_CODE = 'BP-CODE-' + Cypress._.random(0, 999);
const BP_NAME = 'BP-' + Cypress._.random(0, 999);
const PKG_DESC = "PKG_DESC-"+ Cypress._.random(0, 999);
const PROJ_NO = "PROJ_NO-"+ Cypress._.random(0, 999);
const PROJ_NAME = "PROJ_NAME-"+ Cypress._.random(0, 999);
const FAMILY_NAME="A-" + Cypress._.random(0, 999);
const FIRST_NAME="B-" + Cypress._.random(0, 999);
const BRANCH_DESC= "BRANCH_DESC-"+ Cypress._.random(0, 999);

allure.epic('PROCUREMENT AND BPM');
allure.feature('Business Partner');
allure.story('PCM- 3.10 | Advance criteria of business partner lookup');
describe('PCM- 3.10 | Advance criteria of business partner lookup ', () => {
	beforeEach(function () {
		cy.fixture('pcm/pcm-3.10-advance-criteria-of-business-partner-lookup.json').then((data) => {
			this.data = data;
		});
	});
	before(function () {
		cy.preLoading(
            Cypress.env('adminUserName'),
            Cypress.env('adminPassword'),           
            Cypress.env('parentCompanyName'), 
            Cypress.env('childCompanyName')
        );
		cy.fixture('pcm/pcm-3.10-advance-criteria-of-business-partner-lookup.json').then((data) => {
			this.data = data;
            const STD_INPUTS = this.data.Prerequisites.SidebarInputs
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openSidebarOption(STD_INPUTS.search).delete_pinnedItem();
            _common.search_fromSidebar(STD_INPUTS.searchType,Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	});	
    it('TC - Add radius in customizing module',function(){
        const SIDEBAR_INPUTS = this.data.sidebarInputs.sidebar;
        const CUSTOMIZING_INPUT = this.data.customizingInput        
        cy.wait(500)
        _common.openSidebarOption(SIDEBAR_INPUTS.quickStart);
        _common.search_fromSidebar(SIDEBAR_INPUTS.quickStart1, SIDEBAR_INPUTS.customizing);
        _common.openTab(app.tabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.Entity_Types, app.FooterTab.DATA_TYPES, 0);
        })
        _common.search_inSubContainer(cnt.uuid.Entity_Types,CUSTOMIZING_INPUT.radius)
        cy.REFRESH_CONTAINER().wait(1000)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Entity_Types,app.GridCells.NAME,CUSTOMIZING_INPUT.radius)
        _common.openTab(app.tabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);     
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.search_inSubContainer(cnt.uuid.INSTANCES,CUSTOMIZING_INPUT.distance)  
        cy.wait(500)
        _common.delete_recordFromContainer(cnt.uuid.INSTANCES)
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.create_newRecord(cnt.uuid.INSTANCES)
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,CUSTOMIZING_INPUT.distance)
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES,app.gridCells.RADIUS_IN_METER,app.InputFields.INPUT_GROUP_CONTENT,CUSTOMIZING_INPUT.distanceInMeter)      
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
	it('TC - Create new business partner and add branches ', function () {
		const SIDEBAR_INPUTS = this.data.sidebarInputs.sidebar;
		const BP_INPUTS = this.data.businessPartnerInput.BPInput;   

		_common.openSidebarOption(SIDEBAR_INPUTS.quickStart);
		_common.search_fromSidebar(SIDEBAR_INPUTS.quickStart1, SIDEBAR_INPUTS.BusinessPartner);

		_common.openTab(app.tabBar.BUSINESS_PARTNERS).then(() => {
            _common.setDefaultView(app.tabBar.BUSINESS_PARTNERS)
			_common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
            			
		});        
		_common.maximizeContainer(cnt.uuid.BUSINESS_PARTNERS)
         cy.REFRESH_CONTAINER()
		_common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS);
		_common.create_newRecord(cnt.uuid.BUSINESS_PARTNERS);
		_businessPartnerPage.enterRecord_toCreateBusinessPartner(BP_CODE,BP_NAME, BP_INPUTS.street, BP_INPUTS.zipCode, BP_INPUTS.city, BP_INPUTS.country);
		cy.SAVE();
		_common.minimizeContainer(cnt.uuid.BUSINESS_PARTNERS)	

		_common.openTab(app.tabBar.BUSINESS_PARTNERS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.SUBSIDIARIES, app.FooterTab.BRANCHES, 2);
		});
		_common.create_newRecord(cnt.uuid.SUBSIDIARIES);        
		_businessPartnerPage.enterRecord_toCreateBusinessPartnerBranch(BP_INPUTS.street1, BP_INPUTS.zipCode1, BP_INPUTS.city1, BP_INPUTS.country1);
		cy.SAVE();       
        _common.edit_dropdownCellWithInput(cnt.uuid.SUBSIDIARIES,app.GridCells.ADDRESS_TYPE_FK,BP_INPUTS.list,app.InputFields.INPUT_GROUP_CONTENT,BP_INPUTS.Branch)
        _common.enterRecord_inNewRow(cnt.uuid.SUBSIDIARIES,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,BRANCH_DESC)
        cy.SAVE();
        _common.search_inSubContainer(cnt.uuid.SUBSIDIARIES,BRANCH_DESC)
        _common.select_Or_Deselect_Radio_InContainer(BP_INPUTS.selectRadioButton,cnt.uuid.SUBSIDIARIES,app.GridCells.IS_MAIN_ADDRESS)
        cy.SAVE()
        _common.openTab(app.tabBar.BUSINESS_PARTNERS).then(() => {
             _common.select_tabFromFooter(cnt.uuid.Contacts_BP, app.FooterTab.CONTACTS, 1);
        });        
        _common.clear_subContainerFilter(cnt.uuid.Contacts_BP)
        _common.create_newRecord(cnt.uuid.Contacts_BP)
        _common.enterRecord_inNewRow(cnt.uuid.Contacts_BP, app.gridCells.FIRST_NAME, app.InputFields.DOMAIN_TYPE_DESCRIPTION, FIRST_NAME)
        _common.enterRecord_inNewRow(cnt.uuid.Contacts_BP, app.gridCells.FAMILY_NAME, app.InputFields.DOMAIN_TYPE_DESCRIPTION, FAMILY_NAME)
        cy.SAVE();      
        
	});
    it('TC - Add address to Project',function(){
        const STD_INPUTS = this.data.Prerequisites.SidebarInputs
        const SIDEBAR_INPUTS = this.data.sidebarInputs.sidebar;
        const BP_INPUTS = this.data.businessPartnerInput.BPInput;
        const ADDRESS_PARAMETER: DataCells = {
            [commonLocators.CommonLabels.CITY]: BP_INPUTS.city1,
            [commonLocators.CommonLabels.STREET]: BP_INPUTS.street1,
            [commonLocators.CommonLabels.ZIP_CODE]: BP_INPUTS.zipCode1,
            [commonLocators.CommonLabels.COUNTRY]: BP_INPUTS.country1
        }
        _common.openSidebarOption(SIDEBAR_INPUTS.quickStart);
		_common.search_fromSidebar(SIDEBAR_INPUTS.quickStart1,SIDEBAR_INPUTS.project);
        _common.openTab(app.tabBar.project).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
            _common.clear_subContainerFilter(cnt.uuid.Projects)
        });
        _common.openSidebarOption(STD_INPUTS.search).delete_pinnedItem();
        _common.create_newRecord(cnt.uuid.Projects)
        _projectPage.enterRecord_toCreateProject(PROJ_NO,PROJ_NAME,SIDEBAR_INPUTS.clerk)
        cy.SAVE() 
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.Projects, app.gridCells.PROJECT_ADDRESS)       
        _common.lookUpButtonInCell(cnt.uuid.Projects, app.gridCells.PROJECT_ADDRESS, app.InputFields.ICO_INPUT_LOOKUP, 0)
        _projectPage.enterRecord_toAddressInsideModal(ADDRESS_PARAMETER)
        cy.SAVE()
        _common.pinnedItem()
      
    })
    it('TC - Create Package',function(){
        const SIDEBAR_INPUTS = this.data.sidebarInputs.sidebar;
        const PKG_COLUMN = this.data.PKG_COLUMN
        const PKGITEM_COLUMN = this.data.PKGITEM.column
        const PKGITEM_INPUTS= this.data.PKGITEM.inputs
        _common.openSidebarOption(SIDEBAR_INPUTS.quickStart);
		_common.search_fromSidebar(SIDEBAR_INPUTS.quickStart1, SIDEBAR_INPUTS.package);
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.setup_gridLayout(cnt.uuid.PACKAGE,PKG_COLUMN)
            _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        });
        _common.create_newRecord(cnt.uuid.PACKAGE)
        _package.enterRecord_toCreatePackage(SIDEBAR_INPUTS.material,PKG_DESC)
        cy.SAVE() 
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEM, app.FooterTab.ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.PACKAGEITEM,PKGITEM_COLUMN)
            _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEM)
        });   
        _common.create_newRecord(cnt.uuid.PACKAGEITEM)
        _package.assingItems_ByMaterialNumber(PKGITEM_INPUTS.materialNo,PKGITEM_INPUTS.quantity)
        cy.SAVE()  
        _package.changeStatus_ofPackage_inWizard()
    })
    it('TC - Create requisition from package', function () {
        const SIDEBAR_INPUTS = this.data.sidebarInputs.sidebar; 
        const REQUISITION_COLUMN = this.data. RequisitionColumn;      
        _common.openSidebarOption(SIDEBAR_INPUTS.wizard);
        _common.search_fromSidebar(SIDEBAR_INPUTS.wizard1, SIDEBAR_INPUTS.createRequisition);        
        _common.clickOn_modalFooterButton(btn.buttonText.gotoRequisition)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.Main).then(() => {
            _common.setDefaultView(app.tabBar.Main)            
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, REQUISITION_COLUMN)

        })        
        _common.openSidebarOption(SIDEBAR_INPUTS.wizard);
        _common.search_fromSidebar(SIDEBAR_INPUTS.wizard1,SIDEBAR_INPUTS.changeRequisitionStatus);
        _common.changeStatus_fromModal(SIDEBAR_INPUTS.status)
    })
   
    it('TC - Verify branch in business partner lookup',function(){
        const SIDEBAR_INPUTS = this.data.sidebarInputs.sidebar;
        const BPLOOKUP_INPUTS = this.data.LookupInputs
        const BP_ADVANCE_SEARCH_LOC:DataCells={
            [generic.locators.TYPE]:BPLOOKUP_INPUTS.type,
            [commonLocators.CommonKeys.RADIO]:BPLOOKUP_INPUTS.radio1,
            [generic.locators.DISTANCE]:BPLOOKUP_INPUTS.distance,
            [generic.locators.CHECKBOX_LIST_GROUP_TYPE]:BPLOOKUP_INPUTS.check,
            [app.GridCells.BP_NAME_1]:BP_NAME,
            [generic.locators.BRANCH_DESCRIPTION]:BRANCH_DESC,
            [app.gridCells.FIRST_NAME]:FIRST_NAME

        }       
        _common.openSidebarOption(SIDEBAR_INPUTS.wizard);
		_common.search_fromSidebar(SIDEBAR_INPUTS.wizard1,BPLOOKUP_INPUTS.createRfQ);        
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_LOC,btn.ButtonText.CANCEL)
        cy.SAVE()

    })
    it('TC - Search business Partner with region',function(){
        const SIDEBAR_INPUTS = this.data.sidebarInputs.sidebar;
        const BPLOOKUP_INPUTS = this.data.LookupInputs
        const BP_ADVANCE_SEARCH_LOC:DataCells={
            [generic.locators.TYPE]:BPLOOKUP_INPUTS.type,
            [generic.locators.CHECKBOX_LIST_GROUP_TYPE]:BPLOOKUP_INPUTS.uncheck,
        }
        const BP_ADVANCE_SEARCH_Region:DataCells={
            [generic.locators.TYPE]:BPLOOKUP_INPUTS.type,
            [commonLocators.CommonKeys.RADIO]:BPLOOKUP_INPUTS.radio2,
            [generic.locators.REGION]:BPLOOKUP_INPUTS.region, 
            [generic.locators.CHECKBOX_LIST_GROUP_TYPE]:BPLOOKUP_INPUTS.check,           
            [app.GridCells.BP_NAME_1]:BPLOOKUP_INPUTS.BPName1,
            [generic.locators.BRANCH_DESCRIPTION]:BPLOOKUP_INPUTS.branch,
            [app.gridCells.FIRST_NAME]:BPLOOKUP_INPUTS.contact         

        }
        _common.openSidebarOption(SIDEBAR_INPUTS.wizard);
		_common.search_fromSidebar(SIDEBAR_INPUTS.wizard1, BPLOOKUP_INPUTS.createRfQ);
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_LOC)
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_Region,btn.ButtonText.CANCEL)
        
    })
    it('TC - Search business Partner with Procurement Structure',function () {
        const SIDEBAR_INPUTS = this.data.sidebarInputs.sidebar;
        const BPLOOKUP_INPUTS = this.data.LookupInputs
        const BP_ADVANCE_SEARCH_LOC:DataCells={
            [generic.locators.TYPE]:BPLOOKUP_INPUTS.type,
            [generic.locators.CHECKBOX_LIST_GROUP_TYPE]: BPLOOKUP_INPUTS.uncheck,
        } 
        const BP_ADVANCE_SEARCH_PROCUREMENT:DataCells={
            [generic.locators.TYPE]: BPLOOKUP_INPUTS.type1,
            [generic.locators.CHECKBOX_LIST_GROUP_TYPE]: BPLOOKUP_INPUTS.check,
            [commonLocators.CommonKeys.CODE]: BPLOOKUP_INPUTS.code,
            [app.GridCells.BP_NAME_1]:BPLOOKUP_INPUTS.BPName2,
            [generic.locators.BRANCH_DESCRIPTION]: BPLOOKUP_INPUTS.branch1,
            [app.gridCells.FIRST_NAME]:BPLOOKUP_INPUTS.contact1 
            
        }
        _common.openSidebarOption(SIDEBAR_INPUTS.wizard);
		_common.search_fromSidebar(SIDEBAR_INPUTS.wizard1, BPLOOKUP_INPUTS.createRfQ);
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_LOC)
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_PROCUREMENT,btn.ButtonText.CANCEL)
        
    })
    it('TC - Search business Partner with Evaluation Mark',function () {
        const SIDEBAR_INPUTS = this.data.sidebarInputs.sidebar;
        const BPLOOKUP_INPUTS = this.data.LookupInputs
        const BP_ADVANCE_SEARCH_LOC:DataCells={
            [generic.locators.TYPE]: BPLOOKUP_INPUTS.type1,
            [generic.locators.CHECKBOX_LIST_GROUP_TYPE]: BPLOOKUP_INPUTS.uncheck,
        } 
        const BP_ADVANCE_SEARCH_EVALUATION:DataCells={
            [generic.locators.TYPE]: BPLOOKUP_INPUTS.type2,
            [generic.locators.CHECKBOX_LIST_GROUP_TYPE]: BPLOOKUP_INPUTS.check,
            [app.InputFields.INPUT_GROUP_CONTENT]: BPLOOKUP_INPUTS.contractor,
            [app.GridCells.BP_NAME_1]:BPLOOKUP_INPUTS.BPName3,
            [generic.locators.BRANCH_DESCRIPTION]: BPLOOKUP_INPUTS.branch2,
            [app.gridCells.FIRST_NAME]:BPLOOKUP_INPUTS.contact2 
            
        }
        _common.openSidebarOption(SIDEBAR_INPUTS.wizard);
		_common.search_fromSidebar(SIDEBAR_INPUTS.wizard1, BPLOOKUP_INPUTS.createRfQ);
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_LOC)
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_EVALUATION,btn.ButtonText.CANCEL)
        
    })
    it('TC - Search business Partner with status',function () {
        const SIDEBAR_INPUTS = this.data.sidebarInputs.sidebar;
        const BPLOOKUP_INPUTS = this.data.LookupInputs
        const BP_ADVANCE_SEARCH_LOC:DataCells={
            [generic.locators.TYPE]: BPLOOKUP_INPUTS.type2,
            [generic.locators.CHECKBOX_LIST_GROUP_TYPE]: BPLOOKUP_INPUTS.uncheck,
        } 
        const BP_ADVANCE_SEARCH_STATUS:DataCells={
            [generic.locators.TYPE]: BPLOOKUP_INPUTS.type3,
            [generic.locators.CHECKBOX_LIST_GROUP_TYPE]: BPLOOKUP_INPUTS.check,
            [generic.locators.BP_STATUS]:this.data.BP_STATUS ,
            [app.GridCells.BP_NAME_1]:BPLOOKUP_INPUTS.BPName1,
             
            
        }
        _common.openSidebarOption(SIDEBAR_INPUTS.wizard);
		_common.search_fromSidebar(SIDEBAR_INPUTS.wizard1, BPLOOKUP_INPUTS.createRfQ);
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_LOC)
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_STATUS,btn.ButtonText.CANCEL)
    })
    after(() => {
		cy.LOGOUT();
	});
    
})

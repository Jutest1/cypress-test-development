import { tile, app, cnt,sidebar, commonLocators} from 'cypress/locators';
import { _common, _controllingUnit, _estimatePage, _mainView, _projectPage, _saleContractPage, _validate} from 'cypress/pages';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();
const CU_DESC = 'CU-DESC-' + Cypress._.random(0, 999);
const CONFIG_DESC = 'AACONFIG_DESC-' + Cypress._.random(0, 999);
const CONTACT_DESC = 'CONTACT_DESC-' + Cypress._.random(0, 999);
const FAMILY_NAME = 'FAMILY_NAME-' + Cypress._.random(0, 999);


let CONTROLLING_UNIT_PARAMETERS:DataCells;
let CONTAINERS_CONTROLLING_UNIT;
let CONTAINERS_CUSTOMIZING;
let CONTAINERS_BUSINESS_PARTNER;

let CONTAINER_COLUMNS_CONTROLLING_UNIT;
let CONTAINER_COLUMNS_DATA_TYPE;

let CONTAINER_COLUMNS_CONTACT;
let CONTAINER_COLUMNS_CONTRACT;


allure.epic('PROCUREMENT AND BPM');
allure.feature('Contract');
allure.story('PCM- 2.87 | Contact roles in contract');
		
describe('PCM- 2.87 | Contact roles in contract', () => {

	before(function () {
		cy.fixture('pcm/pcm-2.87-contact-roles-in-contract.json').then((data) => {
			this.data = data;
			CONTAINERS_CUSTOMIZING = this.data.CONTAINERS.CUSTOMIZING;
            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT;
			CONTAINERS_BUSINESS_PARTNER = this.data.CONTAINERS.BUSINESS_PARTNER;
			
			CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
			CONTAINER_COLUMNS_DATA_TYPE = this.data.CONTAINER_COLUMNS.DATA_TYPE
			CONTAINER_COLUMNS_CONTACT = this.data.CONTAINER_COLUMNS.CONTACT
			CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
			
            CONTROLLING_UNIT_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: CU_DESC,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
				[app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM,
			}
		});

		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		_common.openDesktopTile(tile.DesktopTiles.PROJECT);
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
	});

    after(() => {
        cy.LOGOUT();
    });
	it('TC - Create controlling unit', function () {
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
		_common.waitForLoaderToDisappear()
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER'))

		_common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
			_common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT);
		});
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT);
		_controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
        cy.SAVE( )
        _common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT);
	});
	it('TC - Customising  contact', function () {
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.MASTER_DATA).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
			_common.setup_gridLayout(cnt.uuid.ENTITY_TYPES, CONTAINER_COLUMNS_DATA_TYPE);
		});
		_common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, CONTAINERS_CUSTOMIZING.ENTITY_TYPE);
		_common.openTab(app.TabBar.MASTER_DATA).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
		});
		_common.create_newRecord(cnt.uuid.INSTANCES);
		_common.enterRecord_inNewRow(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONFIG_DESC);
		_common.set_cellCheckboxValue(cnt.uuid.INSTANCES, app.GridCells.IS_LIVE, commonLocators.CommonKeys.CHECKED);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Select BPM and its customize contacts', function () {
	
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER);
		_common.waitForLoaderToDisappear()

		
		_common.openTab(app.TabBar.CONTACTS_BP).then(() => {
			_common.setDefaultView(app.TabBar.CONTACTS_BP);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
			_common.waitForLoaderToDisappear()
			
		});
		_common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
		_common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS,CONTAINERS_BUSINESS_PARTNER.PARTNERNAME)

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,CONTAINERS_BUSINESS_PARTNER.PARTNERNAME)
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.CONTACTS_BP).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTACTS_BP, app.FooterTab.BUSINESS_PARTNER, 0);
			_common.waitForLoaderToDisappear()

		});
		_common.create_newRecord(cnt.uuid.CONTACTS_BP);
		_common.enterRecord_inNewRow(cnt.uuid.CONTACTS_BP, app.GridCells.FIRST_NAME, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTACT_DESC);
		_common.enterRecord_inNewRow(cnt.uuid.CONTACTS_BP, app.GridCells.FAMILY_NAME, app.InputFields.DOMAIN_TYPE_DESCRIPTION, FAMILY_NAME);

		_common.edit_dropdownCellWithCaret(cnt.uuid.CONTACTS_BP, app.GridCells.CONTACT_ROLE_FK, commonLocators.CommonKeys.LIST, CONFIG_DESC);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTACTS_BP, app.GridCells.CONTACT_ROLE_FK, CONFIG_DESC);
	});

	it('TC - Create new contract', function () {
	
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.setDefaultView(app.TabBar.CONTRACT);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
			_common.waitForLoaderToDisappear()
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
		});
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT);
		_common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
		_saleContractPage.enterRecord_createNewContract(CONTAINERS_BUSINESS_PARTNER.PARTNERNAME, CU_DESC);

		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTRACT_CONTACT, app.FooterTab.CONTACTS, 2);
			_common.waitForLoaderToDisappear()
			_common.setup_gridLayout(cnt.uuid.CONTRACT_CONTACT, CONTAINER_COLUMNS_CONTACT);
		});

		_common.create_newRecord(cnt.uuid.CONTRACT_CONTACT);
		_common.select_rowInContainer(cnt.uuid.CONTRACT_CONTACT);
		_common.waitForLoaderToDisappear()

		_common.edit_dropdownCellWithInput(cnt.uuid.CONTRACT_CONTACT, app.GridCells.BPD_CONTACT_FK,commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTACT_DESC)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		
		_common.waitForLoaderToDisappear()
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CONTACT, app.GridCells.BPD_CONTACT_FIRST_NAME, CONTACT_DESC);
	});
});

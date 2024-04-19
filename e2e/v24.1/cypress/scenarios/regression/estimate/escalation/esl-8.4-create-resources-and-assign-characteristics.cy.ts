import { _common, _estimatePage, _mainView, _modalView, _wipPage, _schedulePage, _projectPage, _bidPage, _saleContractPage,_sidebar, _validate, _controllingUnit,_procurementPage } from 'cypress/pages';
import { app,tile, cnt, sidebar, commonLocators, btn } from 'cypress/locators';

let CONTAINER_COLUMNS_INDEX_HEADER;
let CONTAINER_COLUMNS_INDEX_DETAIL;
let CONTAINERS_INDEX_DETAIL;
let CONTAINER_COLUMNS_CHARACTERISTICS_GROUP;
let CONTAINER_COLUMNS_CHARACTERISTICS;
let CONTAINERS_CHARACTERISTICS;
let CONTAINER_COLUMNS_CHARACTERISTICS_SECTIONS;
let CONTAINERS_CHARACTERISTICS_SECTIONS;
let CONTAINERS_COMPANY;
let CONTAINER_COLUMNS_COST_CODES;
let CONTAINERS_COST_CODE;

const ALLURE = Cypress.Allure.reporter.getInterface();
const CEMENT_DESC = "CEMENT-ESL2.1-" + Cypress._.random(0, 999);
const CEMENT_CODE = '1' + Cypress._.random(0, 999);
const SAND_DESC = "SAND-ESL2.1-" + Cypress._.random(0, 999);
const SAND_CODE = '1' + Cypress._.random(0, 999);
const CHARGROUP = "CHARGROUP_ESL-" + Cypress._.random(0, 999);
const CHAR_CODE = "CHAR_CODE-ESL" + Cypress._.random(0, 9999);
const CHAR_DESC = "CHAR_DESC-ESL" + Cypress._.random(0, 9999);
const CHAR_SANDCODE = "CHAR_SANDCODE-ESL" + Cypress._.random(0, 9999);
const CHAR_SANDDESC = "CHAR_SANDDESC-ESL" + Cypress._.random(0, 9999);
const COST_CODE = '1' + Cypress._.random(0, 999);
const COSTCODE_DESC = "COSTCODE_DESC-" + Cypress._.random(0, 9999);
const QTY_CODE = '1' + Cypress._.random(0, 999);

ALLURE.epic("ESCALATION");
ALLURE.feature("Generate Characterisitc");
ALLURE.story("ESL- 8.4 | Create-resources-and-assign-characteristics");

describe("ESL- 8.4 | Create-resources-and-assign-characteristics", () => {
    before(function () {   
        cy.fixture("escalation/esl-8.4-create-resources-and-assign-characteristics.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_INDEX_HEADER=this.data.CONTAINER_COLUMNS.INDEX_HEADER
            CONTAINER_COLUMNS_INDEX_DETAIL = this.data.CONTAINER_COLUMNS.INDEX_DETAIL
            CONTAINERS_INDEX_DETAIL = this.data.CONTAINERS.INDEX_DETAIL
            CONTAINER_COLUMNS_CHARACTERISTICS_GROUP = this.data.CONTAINER_COLUMNS.CHARACTERISTICS_GROUP
            CONTAINER_COLUMNS_CHARACTERISTICS = this.data.CONTAINER_COLUMNS.CHARACTERISTICS
            CONTAINERS_CHARACTERISTICS = this.data.CONTAINERS.CHARACTERISTICS
            CONTAINER_COLUMNS_CHARACTERISTICS_SECTIONS = this.data.CONTAINER_COLUMNS.CHARACTERISTICS_SECTIONS
            CONTAINERS_CHARACTERISTICS_SECTIONS = this.data.CONTAINERS.CHARACTERISTICS_SECTIONS;
            CONTAINERS_COMPANY = this.data.CONTAINERS.COMPANY
            CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES
            CONTAINERS_COST_CODE = this.data.CONTAINERS.COST_CODES
            
        }).then(()=>{
             cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        })
    })

    it("TC - Create Index Table", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INDEX_TABLE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.INDEX_HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INDEX_HEADER, app.FooterTab.INDEX_HEADER)
            _common.setup_gridLayout(cnt.uuid.INDEX_HEADER, CONTAINER_COLUMNS_INDEX_HEADER)
            })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.INDEX_HEADER)
        cy.wait(500) //wait is needed to load data 
        _common.create_newRecord(cnt.uuid.INDEX_HEADER);
        _common.enterRecord_inNewRow(cnt.uuid.INDEX_HEADER,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,CEMENT_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.INDEX_HEADER,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,CEMENT_DESC)
        _common.openTab(app.TabBar.INDEX_HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INDEX_DETAIL, app.FooterTab.INDEX_DETAIL)
            _common.setup_gridLayout(cnt.uuid.INDEX_DETAIL, CONTAINER_COLUMNS_INDEX_DETAIL)
            })
        _common.create_newRecord(cnt.uuid.INDEX_DETAIL);
        _common.edit_containerCell(cnt.uuid.INDEX_DETAIL, app.GridCells.DATE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_INDEX_DETAIL.DATE1[0])
        _common.enterRecord_inNewRow(cnt.uuid.INDEX_DETAIL,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_INDEX_DETAIL.VALUE1[0])
        _common.create_newRecord(cnt.uuid.INDEX_DETAIL);
        _common.edit_containerCell(cnt.uuid.INDEX_DETAIL, app.GridCells.DATE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_INDEX_DETAIL.DATE1[1])
        _common.enterRecord_inNewRow(cnt.uuid.INDEX_DETAIL,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_INDEX_DETAIL.VALUE1[1])
        _common.create_newRecord(cnt.uuid.INDEX_DETAIL);
        _common.edit_containerCell(cnt.uuid.INDEX_DETAIL, app.GridCells.DATE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_INDEX_DETAIL.DATE1[2])
        _common.enterRecord_inNewRow(cnt.uuid.INDEX_DETAIL,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_INDEX_DETAIL.VALUE1[2])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.INDEX_HEADER);
        _common.enterRecord_inNewRow(cnt.uuid.INDEX_HEADER,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,SAND_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.INDEX_HEADER,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,SAND_DESC)       
        _common.create_newRecord(cnt.uuid.INDEX_DETAIL);
        _common.edit_containerCell(cnt.uuid.INDEX_DETAIL, app.GridCells.DATE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_INDEX_DETAIL.DATE2[0])
        _common.enterRecord_inNewRow(cnt.uuid.INDEX_DETAIL,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_INDEX_DETAIL.VALUE2[0])
        _common.create_newRecord(cnt.uuid.INDEX_DETAIL);
        _common.edit_containerCell(cnt.uuid.INDEX_DETAIL, app.GridCells.DATE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_INDEX_DETAIL.DATE2[1])
        _common.enterRecord_inNewRow(cnt.uuid.INDEX_DETAIL,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_INDEX_DETAIL.VALUE2[1])
        _common.create_newRecord(cnt.uuid.INDEX_DETAIL);
        _common.edit_containerCell(cnt.uuid.INDEX_DETAIL, app.GridCells.DATE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_INDEX_DETAIL.DATE2[2])
        _common.enterRecord_inNewRow(cnt.uuid.INDEX_DETAIL,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_INDEX_DETAIL.VALUE2[2])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create characteristic group", function () {  
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CHARACTERISTICS);
        _common.waitForLoaderToDisappear()    
        _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_GROUPS, app.FooterTab.CHARACTERISTIC_GROUP, 0);
          _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_GROUPS, CONTAINER_COLUMNS_CHARACTERISTICS_GROUP)
        });
        _common.clear_subContainerFilter(cnt.uuid.CHARACTERISTIC_GROUPS)
        _common.maximizeContainer(cnt.uuid.CHARACTERISTIC_GROUPS)
        _common.create_newRecord(cnt.uuid.CHARACTERISTIC_GROUPS)
        _procurementPage.enterRecord_ToCreateCharacteristicGroups(CHARGROUP)        
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.CHARACTERISTIC_GROUPS)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create characteristic for characteristic group", function () {
        _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_CHAR_GROUP, app.FooterTab.CHARATERISTICS, 1);
          _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_CHAR_GROUP, CONTAINER_COLUMNS_CHARACTERISTICS)
        });
        _common.clear_subContainerFilter(cnt.uuid.CHARACTERISTIC_CHAR_GROUP)
        _common.create_newRecord(cnt.uuid.CHARACTERISTIC_CHAR_GROUP)
        _procurementPage.enterRecord_ToCreateCharacteristicForCharGroups(CHAR_CODE, CHAR_DESC, CONTAINERS_CHARACTERISTICS.TYPE)
        cy.SAVE()
        _common.enterRecord_inNewRow(cnt.uuid.CHARACTERISTIC_CHAR_GROUP,app.GridCells.DEFAULT_VALUE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CHARACTERISTICS.CEMENT_PERCENT)
        _common.edit_dropdownCellWithInput(cnt.uuid.CHARACTERISTIC_CHAR_GROUP,app.GridCells.INDEX_HEADER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CEMENT_DESC) 
        cy.wait(1000) //need time to load data
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.CHARACTERISTIC_CHAR_GROUP)
        _procurementPage.enterRecord_ToCreateCharacteristicForCharGroups(CHAR_SANDCODE, CHAR_SANDDESC, CONTAINERS_CHARACTERISTICS.TYPE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.CHARACTERISTIC_CHAR_GROUP,app.GridCells.DEFAULT_VALUE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CHARACTERISTICS.SAND_PERCENT)
        _common.edit_dropdownCellWithInput(cnt.uuid.CHARACTERISTIC_CHAR_GROUP,app.GridCells.INDEX_HEADER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,SAND_DESC) 
        cy.wait(1000)//need time to load data
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
   
    })
    
    it("TC - Create record in characteristic section", function () {
        _common.clear_subContainerFilter(cnt.uuid.CHARACTERISTIC_CHAR_GROUP)
        _common.search_inSubContainer(cnt.uuid.CHARACTERISTIC_CHAR_GROUP, CHAR_DESC)
        _common.select_rowHasValue(cnt.uuid.CHARACTERISTIC_CHAR_GROUP, CHAR_DESC)
        
        _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_SECTIONS, app.FooterTab.CHARACTERISTIC_SECTIONS, 2);
          _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_SECTIONS, CONTAINER_COLUMNS_CHARACTERISTICS_SECTIONS)
        });
        _common.maximizeContainer(cnt.uuid.CHARACTERISTIC_SECTIONS)
        _procurementPage.characteristicsSections(CONTAINERS_CHARACTERISTICS_SECTIONS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.CHARACTERISTIC_SECTIONS)
    })

    it("TC - Check in Automatic assignments and Company", function () {
        _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
          _common.select_tabFromFooter(cnt.uuid.AUTOMATIC_ASSIGNMENT, app.FooterTab.AUTOMATIC_ASSIGNMENT, 2);
        });
        _common.maximizeContainer(cnt.uuid.AUTOMATIC_ASSIGNMENT)
        _common.set_checkBoxValue_basedOnString(cnt.uuid.AUTOMATIC_ASSIGNMENT,app.GridCells.DESCRIPTION_INFO,app.GridCells.CHECKED,CONTAINERS_CHARACTERISTICS_SECTIONS)
        _common.minimizeContainer(cnt.uuid.AUTOMATIC_ASSIGNMENT)
       
        _common.clear_subContainerFilter(cnt.uuid.CHARACTERISTIC_CHAR_GROUP)
        _common.search_inSubContainer(cnt.uuid.CHARACTERISTIC_CHAR_GROUP, CHAR_SANDDESC)
        _common.select_rowHasValue(cnt.uuid.CHARACTERISTIC_CHAR_GROUP, CHAR_SANDDESC)
        _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
          _common.select_tabFromFooter(cnt.uuid.AUTOMATIC_ASSIGNMENT, app.FooterTab.AUTOMATIC_ASSIGNMENT, 2);
        });
        _common.maximizeContainer(cnt.uuid.AUTOMATIC_ASSIGNMENT)
        _common.set_checkBoxValue_basedOnString(cnt.uuid.AUTOMATIC_ASSIGNMENT,app.GridCells.DESCRIPTION_INFO,app.GridCells.CHECKED,CONTAINERS_CHARACTERISTICS_SECTIONS)
        _common.minimizeContainer(cnt.uuid.AUTOMATIC_ASSIGNMENT)       
        _common.clear_subContainerFilter(cnt.uuid.CHARACTERISTIC_CHAR_GROUP)     
        _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
          _common.select_tabFromFooter(cnt.uuid.USED_IN_COMPANY, app.FooterTab.USED_IN_COMPANY, 2);
        });
        _common.maximizeContainer(cnt.uuid.USED_IN_COMPANY)
        _common.select_rowHasValue(cnt.uuid.USED_IN_COMPANY, CONTAINERS_COMPANY.CODE)
        _common.set_cellCheckboxValue(cnt.uuid.USED_IN_COMPANY,app.GridCells.CHECKED,commonLocators.CommonKeys.CHECK)
        _common.minimizeContainer(cnt.uuid.USED_IN_COMPANY)
    })    

    it("TC - Create Cost Code and assign characterisitc", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COST_CODES).then(() => {
          _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
          _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.maximizeContainer(cnt.uuid.COST_CODES)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.COST_CODES);
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,COST_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,COSTCODE_DESC)       
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.RATE,app.InputFields.INPUT_GROUP_CONTENT,QTY_CODE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.COST_CODES,app.GridCells.CURRENCY_FK,commonLocators.CommonKeys.GRID,CONTAINERS_COST_CODE.CURRENCY)
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.COST_CODES)
        _common.waitForLoaderToDisappear()

    })

    it("TC - Assign Characterisitc in Resource", function () {
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCE_CHARACTERISTIC, app.FooterTab.CHARATERISTICS, 1);
          });
        _common.maximizeContainer(cnt.uuid.RESOURCE_CHARACTERISTIC)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.RESOURCE_CHARACTERISTIC,CHAR_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCE_CHARACTERISTIC,app.GridCells.DESCRIPTION,CHAR_DESC) 
        _common.select_rowHasValue(cnt.uuid.RESOURCE_CHARACTERISTIC,CHAR_SANDDESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCE_CHARACTERISTIC,app.GridCells.DESCRIPTION,CHAR_SANDDESC)
        _common.minimizeContainer(cnt.uuid.RESOURCE_CHARACTERISTIC)
        _common.waitForLoaderToDisappear()

    })

    
    after(() => {

      cy.LOGOUT();
      
  })   

})


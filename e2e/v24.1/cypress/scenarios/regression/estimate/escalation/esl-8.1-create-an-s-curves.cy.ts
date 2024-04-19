import { _common, _estimatePage, _mainView, _modalView, _wipPage, _schedulePage, _projectPage, _bidPage, _saleContractPage,_sidebar, _validate, _controllingUnit } from 'cypress/pages';
import { app,tile, cnt, sidebar, commonLocators, btn } from 'cypress/locators';

let CONTAINERS_DATA_TYPE;
let CONTAINER_COLUMNS_DATA_TYPE;
let CONTAINERS_S_CURVE;
let CONTAINER_COLUMNS_S_CURVE;
let CONTAINERS_S_CURVE_DETAILS;

const ALLURE = Cypress.Allure.reporter.getInterface();
const SCURVE_DESC = "SCURVE_DESC-" + Cypress._.random(0, 999);

ALLURE.epic("ESCALATION");
ALLURE.feature("Generate S-Curve");
ALLURE.story("ESL- 8.1 | Create S-Curve ");

describe("ESL- 8.1 | Create S-Curve", () => {
    before(function () {   
        cy.fixture("escalation/esl-8.1-create-an-s-curves.json").then((data) => {
            this.data = data
			CONTAINERS_DATA_TYPE=this.data.CONTAINERS.DATA_TYPE
            CONTAINER_COLUMNS_DATA_TYPE=this.data.CONTAINER_COLUMNS.DATA_TYPE
            CONTAINERS_S_CURVE=this.data.CONTAINERS.S_CURVE_FK
            CONTAINER_COLUMNS_S_CURVE=this.data.CONTAINER_COLUMNS.S_CURVE_FK
            CONTAINERS_S_CURVE_DETAILS=this.data.CONTAINERS.S_CURVE_DETAILS
            
      }).then(()=>{
             cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
       })
    })
   
    it("TC - Create S-Curve", function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.setDefaultView(app.TabBar.MASTERDATA,commonLocators.CommonKeys.DEFAULT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES)
            _common.setup_gridLayout(cnt.uuid.DATA_TYPES, CONTAINER_COLUMNS_DATA_TYPE)
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPE.TYPE)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPE.TYPE)
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
		_common.maximizeContainer(cnt.uuid.DATA_RECORDS)      
        _common.create_newRecord(cnt.uuid.DATA_RECORDS);
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,SCURVE_DESC)
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.DATA_RECORDS)
    
    });

    it("TC- Create S-Curve Details", function (){
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPE.TYPE1)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPE.TYPE1)
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.maximizeContainer(cnt.uuid.DATA_RECORDS)     
        _common.create_newRecord(cnt.uuid.DATA_RECORDS);
        _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS,app.GridCells.S_CURVE_FK,commonLocators.CommonKeys.LIST,SCURVE_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS,app.GridCells.PERCENT_OF_TIME,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_S_CURVE_DETAILS.TIME[0])
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS,app.GridCells.PERCENT_OF_COST,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_S_CURVE_DETAILS.COST[0])
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS,app.GridCells.BIN,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_S_CURVE_DETAILS.BIN[0])
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS,app.GridCells.WEIGHT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_S_CURVE_DETAILS.WEIGHT[0])
        _common.create_newRecord(cnt.uuid.DATA_RECORDS);
        _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS,app.GridCells.S_CURVE_FK,commonLocators.CommonKeys.LIST,SCURVE_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS,app.GridCells.PERCENT_OF_TIME,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_S_CURVE_DETAILS.TIME[1])
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS,app.GridCells.PERCENT_OF_COST,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_S_CURVE_DETAILS.COST[1])
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS,app.GridCells.BIN,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_S_CURVE_DETAILS.BIN[1])
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS,app.GridCells.WEIGHT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_S_CURVE_DETAILS.WEIGHT[1])
        _common.create_newRecord(cnt.uuid.DATA_RECORDS);
        _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS,app.GridCells.S_CURVE_FK,commonLocators.CommonKeys.LIST,SCURVE_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS,app.GridCells.PERCENT_OF_TIME,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_S_CURVE_DETAILS.TIME[2])
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS,app.GridCells.PERCENT_OF_COST,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_S_CURVE_DETAILS.COST[2])
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS,app.GridCells.BIN,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_S_CURVE_DETAILS.BIN[2])
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS,app.GridCells.WEIGHT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_S_CURVE_DETAILS.WEIGHT[2])
         cy.SAVE()
        
       
})

    it("TC - Assert S-Curve", function () {
    _common.select_activeRowInContainer(cnt.uuid.DATA_RECORDS)  
    _common.assert_cellData_insideActiveRow(cnt.uuid.DATA_RECORDS,app.GridCells.S_CURVE_FK,SCURVE_DESC)
    _common.minimizeContainer(cnt.uuid.DATA_RECORDS)

    })

    after(() => {

        cy.LOGOUT();
        
    })
})
import { _common, _estimatePage, _mainView, _modalView, _wipPage, _schedulePage, _projectPage, _bidPage, _saleContractPage,_sidebar, _validate, _controllingUnit } from 'cypress/pages';
import { app,tile, cnt, sidebar, commonLocators, btn } from 'cypress/locators';

let CONTAINER_COLUMNS_INDEX_HEADER;
let CONTAINER_COLUMNS_INDEX_DETAIL;
let CONTAINERS_INDEX_DETAIL;

const ALLURE = Cypress.Allure.reporter.getInterface();
const CEMENT_DESC = "CEMENT-ESL2.1-" + Cypress._.random(0, 999);
const CEMENT_CODE = '1' + Cypress._.random(0, 999);
const SAND_DESC = "SAND-ESL2.1-" + Cypress._.random(0, 999);
const SAND_CODE = '1' + Cypress._.random(0, 999);

ALLURE.epic("ESCALATION");
ALLURE.feature("Generate Index");
ALLURE.story("ESL- 8.2 | Create Index Header");

describe("ESL- 8.2 | Create Index Header", () => {
    before(function () {   
        cy.fixture("escalation/esl-8.2-create-an-index-header-and-its-details.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_INDEX_HEADER=this.data.CONTAINER_COLUMNS.INDEX_HEADER
            CONTAINER_COLUMNS_INDEX_DETAIL = this.data.CONTAINER_COLUMNS.INDEX_DETAIL
            CONTAINERS_INDEX_DETAIL = this.data.CONTAINERS.INDEX_DETAIL
            
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

})

    after(() => {

        cy.LOGOUT();
        
    })
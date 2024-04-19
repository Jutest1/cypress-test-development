import { _common, _estimatePage, _controllingUnit,_projectPage,_mainView, _modalView, _schedulePage, _sidebar, _validate, _timekeepingPage } from 'cypress/pages';
import { app, btn,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { TimekeepingPage } from 'cypress/pages/module/timekeeping/timekeeping-page';
import _ from 'cypress/types/lodash';


const SURCHANGE_RATE='SR-' + Cypress._.random(0, 999);
const BASE_RATE='BA-' + Cypress._.random(0, 999);
const PAY_GROUP_CODE='PAY-' + Cypress._.random(0, 999);
const PAY_GROUP_DESC='PAY-' + Cypress._.random(0, 999);
const COMMENT_TEXT='TEXT-' + Cypress._.random(0, 9999);

const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINERS_DATA_TYPES,CONTAINERS_PAYMENT_GROUP_RATES,CONTAINERS_PAYMENT_GROUP_SURCHARGE
let PAYMENT_GROUP_PARAMETERS:DataCells,PAYMENT_GROUP_RATE_PARAMETERS:DataCells,PAYMENT_GROUP_SURCHARGE_PARAMETERS:DataCells
let CONTAINER_COLUMNS_PAYMENT_GROUPS,CONTAINER_COLUMNS_PAYMENT_GROUP_RATES,CONTAINER_COLUMNS_PAYMENT_GROUP_SURCHARGE
ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.1 | Create timekeeping surcharge type in customizing module with isstandardrate checkbox true and false");

describe("ETK- 1.1 | Create timekeeping surcharge type in customizing module with isstandardrate checkbox true and false", () => {

    before(function () {
        cy.fixture("time-keeping/etk-1.1-create-timekeeping-surcharge-type-in-customizing-module-with-isstandardrate-checkbox-true-and-false.json").then((data) => {
            this.data = data;
            
           
            CONTAINER_COLUMNS_PAYMENT_GROUP_SURCHARGE=this.data.CONTAINER_COLUMNS.PAYMENT_GROUP_SURCHARGE
            CONTAINERS_PAYMENT_GROUP_SURCHARGE=this.data.CONTAINERS.PAYMENT_GROUP_SURCHARGE
            PAYMENT_GROUP_SURCHARGE_PARAMETERS={
               
                [app.GridCells.SURCHARGE_TYPE_FK]: SURCHANGE_RATE,
                [app.GridCells.COMMENT_TEXT]: COMMENT_TEXT,
               
            },
            

            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES
            CONTAINER_COLUMNS_PAYMENT_GROUPS=this.data.CONTAINER_COLUMNS.PAYMENT_GROUPS_LIST
            PAYMENT_GROUP_PARAMETERS = {
                [app.GridCells.CODE]:PAY_GROUP_CODE,
                [app.GridCells.DESCRIPTION_INFO]:PAY_GROUP_DESC
            },
         
            CONTAINER_COLUMNS_PAYMENT_GROUP_RATES=this.data.CONTAINER_COLUMNS.PAYMENT_GROUP_RATES
            CONTAINERS_PAYMENT_GROUP_RATES=this.data.CONTAINERS.PAYMENT_GROUP_RATES
            PAYMENT_GROUP_RATE_PARAMETERS={
               
                [app.GridCells.SURCHARGE_TYPE_FK]: BASE_RATE,
                [app.GridCells.COMMENT_TEXT]: COMMENT_TEXT,
               
            }
        })

        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
      
    }) 
          
    it("TC - Create Data records", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES,CONTAINERS_DATA_TYPES.TIMEKEEPING_SURCHARGE)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES,CONTAINERS_DATA_TYPES.TIMEKEEPING_SURCHARGE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS, 1);
        })
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.DATA_RECORDS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,BASE_RATE)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS,app.GridCells.IS_STANDARDRATE,CONTAINERS_DATA_TYPES.CHECKBOX[0])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.DATA_RECORDS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,SURCHANGE_RATE)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS,app.GridCells.IS_STANDARDRATE,CONTAINERS_DATA_TYPES.CHECKBOX[1])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create Payment Groups List and Payment Group Rate ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PAYMENT_GROUPS)
        _common.openTab(app.TabBar.PAYMENTGROUPS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PAYMENT_GROUPS_LIST, app.FooterTab.PAYMENT_GROUPS_LIST, 0);
            _common.setup_gridLayout(cnt.uuid.PAYMENT_GROUPS_LIST, CONTAINER_COLUMNS_PAYMENT_GROUPS)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PAYMENT_GROUPS_LIST)
        _timekeepingPage.enterRecord_toPaymentGroup(cnt.uuid.PAYMENT_GROUPS_LIST,PAYMENT_GROUP_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PAYMENTGROUPS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PAYMENT_GROUP_RATES, app.FooterTab.PAYMENT_GROUP_RATES, 1);
            _common.setup_gridLayout(cnt.uuid.PAYMENT_GROUP_RATES, CONTAINER_COLUMNS_PAYMENT_GROUP_RATES)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PAYMENT_GROUP_RATES)
        _timekeepingPage.enterRecord_toPaymentGroupRate(cnt.uuid.PAYMENT_GROUP_RATES,PAYMENT_GROUP_RATE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PAYMENTGROUPS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PAYMENT_GROUP_SURCHARGES, app.FooterTab.PAYMENT_GROUPS_SURCHARGES, 1);
            _common.setup_gridLayout(cnt.uuid.PAYMENT_GROUP_SURCHARGES, CONTAINER_COLUMNS_PAYMENT_GROUP_SURCHARGE)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PAYMENT_GROUP_SURCHARGES)
        _timekeepingPage.enterRecord_toPaymentGroupSurcharge(cnt.uuid.PAYMENT_GROUP_SURCHARGES,PAYMENT_GROUP_SURCHARGE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("Verify Surcharge Type reflected in Payment Group Rate and Payment Group Surcharge Container", function(){
        _common.openTab(app.TabBar.PAYMENTGROUPS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PAYMENT_GROUP_RATES, app.FooterTab.PAYMENT_GROUP_RATES, 1);
            _common.setup_gridLayout(cnt.uuid.PAYMENT_GROUP_RATES, CONTAINER_COLUMNS_PAYMENT_GROUP_RATES)
        })
        _common.waitForLoaderToDisappear()  
        _common.assert_cellData(cnt.uuid.PAYMENT_GROUP_RATES,app.GridCells.SURCHARGE_TYPE_FK,BASE_RATE)
        _common.openTab(app.TabBar.PAYMENTGROUPS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PAYMENT_GROUP_SURCHARGES, app.FooterTab.PAYMENT_GROUPS_SURCHARGES, 1);
            _common.setup_gridLayout(cnt.uuid.PAYMENT_GROUP_SURCHARGES, CONTAINER_COLUMNS_PAYMENT_GROUP_SURCHARGE)
        })
        _common.waitForLoaderToDisappear()
        _common.assert_cellData(cnt.uuid.PAYMENT_GROUP_SURCHARGES,app.GridCells.SURCHARGE_TYPE_FK,SURCHANGE_RATE)

    })

})
   
    after(() => {
        cy.LOGOUT();
    });

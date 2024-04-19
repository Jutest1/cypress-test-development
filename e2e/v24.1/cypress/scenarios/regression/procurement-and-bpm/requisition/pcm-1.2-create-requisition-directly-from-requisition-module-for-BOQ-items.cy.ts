import { tile,sidebar,commonLocators, app, cnt } from "cypress/locators";
import { _common,  _mainView,_sidebar, _boqPage, _modalView, _package, _rfqPage, _procurementPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

import _ from "cypress/types/lodash";
const allure = Cypress.Allure.reporter.getInterface()
const PROCBOQ_DESC = "PROCBOQ-DESC-" + Cypress._.random(0, 999);
const REQBOQSTR_DESC = "REQBOQSTR_DESC-" + Cypress._.random(0, 999);

let REQUISITION_PARAMETER:DataCells;
let CONTAINERS_REQUISITION;
let CONTAINERS_REQUISITION_ITEM;
let CONTAINERS_PROCUREMNET_BOQ;
let CONTAINERS_REQUISITION_BOQ;
let CONTAINER_COLUMNS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION_ITEM;
let CONTAINER_COLUMNS_REQUISITION_BOQ
let CONTAINER_COLUMNS_PACKAGE;
let CONTAINER_COLUMNS_PROCUREMNET_BOQ;


allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 1.2 | Create requisition directly from Requisition module for BOQ items")


describe('PCM- 1.2 | Create requisition directly from Requisition module for BOQ items', () => {
    before(function () {
        cy.fixture('pcm/pcm-1.2-create-requisition-directly-from-requisition-module-for-BOQ-items.json').then((data) => {
                this.data = data;
               
                CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
                CONTAINERS_REQUISITION_ITEM = this.data.CONTAINERS.REQUISITION_ITEM;
                CONTAINERS_PROCUREMNET_BOQ = this.data.CONTAINERS.PROCUREMNET_BOQ;
                CONTAINERS_REQUISITION_BOQ = this.data.CONTAINERS.REQUISITION_BOQ;
               
    
                CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
                CONTAINER_COLUMNS_REQUISITION_ITEM = this.data.CONTAINER_COLUMNS.REQUISITION_ITEM
                CONTAINER_COLUMNS_REQUISITION_BOQ = this.data.CONTAINER_COLUMNS.REQUISITION_BOQ
                CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
                CONTAINER_COLUMNS_PROCUREMNET_BOQ = this.data.CONTAINER_COLUMNS.PROCUREMNET_BOQ
                        
    
                REQUISITION_PARAMETER={
                    [commonLocators.CommonLabels.CONFIGURATION]:CONTAINERS_REQUISITION.CONFIGURATION
                }
            });
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
        });
      
        after(() => {
            cy.LOGOUT();
        });

    it('TC - Verify Creation Of Record in Requisition module', function () {
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
        _common.waitForLoaderToDisappear()
       
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        });
        cy.SAVE()
        _common.create_newRecord(cnt.uuid.REQUISITIONS)
        _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS,REQUISITION_PARAMETER)

        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.STRUCTURE_CODE)
        _common.waitForLoaderToDisappear()
        _mainView.findModuleClientArea().select_popupItem(commonLocators.CommonKeys.GRID, CONTAINERS_REQUISITION.STRUCTURE_CODE)
        _common.clickOn_cellInSubContainer(cnt.uuid.REQUISITIONS, app.GridCells.PROJECT_FK_PROJECT_NAME)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify Creation of record in Procurement BOQs', function () {
        
       
        _common.openTab(app.TabBar.REQUISITIONBOQS).then(() => {
            _common.setDefaultView(app.TabBar.REQUISITIONBOQS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONPROCUREMENTBOQS, app.FooterTab.PROCUREMENT_BOQ, 2);
        });
        _common.create_newRecord(cnt.uuid.REQUISITIONPROCUREMENTBOQS)
        _boqPage.enterRecord_ToCreate_procurementBoQs(CONTAINERS_PROCUREMNET_BOQ.SUBPACAKGE, PROCBOQ_DESC,"Create new BoQ")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify Addition of BOQ item in BOQ structure', function () {
       
        _common.openTab(app.TabBar.REQUISITIONBOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 11);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONBOQSTRUCTURE, CONTAINER_COLUMNS_REQUISITION_BOQ)
        });
        _rfqPage.enterRecordToCreate_BoQStructureInRequisition(REQBOQSTR_DESC, CONTAINERS_REQUISITION_BOQ.QUANTITY, CONTAINERS_REQUISITION_BOQ.UNITRATE, CONTAINERS_REQUISITION_BOQ.UOM)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.REQUISITIONBOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONPROCUREMENTBOQS, app.FooterTab.PROCUREMENT_BOQ, 1);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONPROCUREMENTBOQS, CONTAINER_COLUMNS_PROCUREMNET_BOQ)
        });
        _common.getTextfromCell(cnt.uuid.REQUISITIONPROCUREMENTBOQS, app.GridCells.PACKAGE_CODE)
    })

    it('TC - Verify BOQ Package gets created in Package module', function () {
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.CODE, Cypress.env("Text"))
    })
})
import { tile, commonLocators, app, cnt, btn, sidebar } from "cypress/locators";
import { _common, _procurementPage, _mainView, _businessPartnerPage, _validate } from "cypress/pages";
import { DataCells } from 'cypress/pages/interfaces';

import _ from "cypress/types/lodash";
const ALLURE = Cypress.Allure.reporter.getInterface();
const REQUISITION_DESC="REQ_DESC-" + Cypress._.random(0, 999);
const SUBCONTRACTOR_DESC ="SUB_CON-" + Cypress._.random(0, 999);

let CONTAINERS_REQUISITION;
let CONTAINERS_SUBCONTRACTOR;
let CONTAINER_COLUMN_REQUISITION;
let CONTAINERS_COLUMN_SUBCONTRACTOR;
let REQUISITION_PARAMETER:DataCells;
let CREATE_BUSINESSPARTNER_PARAMETERS : DataCells;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Requisition");
ALLURE.story("PCM- 2.200 | Create new subcontractor reference in a requisition");

describe("PCM- 2.200 | Create new subcontractor reference in a requisition", () => {
    
    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("pcm/pcm-2.200-create-new-subcontractor-reference-in-requisition.json").then((data) => {
            this.data = data;
            CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION
            CONTAINERS_SUBCONTRACTOR= this.data.CONTAINERS.SUBCONTRACTOR
            CONTAINER_COLUMN_REQUISITION =this.data.CONTAINER_COLUMNS.REQUISITION
            CONTAINERS_COLUMN_SUBCONTRACTOR = this.data.CONTAINER_COLUMNS.SUBCONTRACTOR
            REQUISITION_PARAMETER={
                [commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIG,
            };
            CREATE_BUSINESSPARTNER_PARAMETERS={
                [commonLocators.CommonLabels.BUSINESS_PARTNER]:[CONTAINERS_SUBCONTRACTOR.BUSINESS_PARTNER],
            };            
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env("PROJECT_NUMBER")).pinnedItem();
        });
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Verify creation of record in requisition module", function () {        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMN_REQUISITION);
        });
        _common.create_newRecord(cnt.uuid.REQUISITIONS);
        _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETER);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITIONS,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,REQUISITION_DESC);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
    });


    it("TC - Verify creation of subcontractors record in requisition module", function () {      

        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 1);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_SUBCONTRACTOR, CONTAINERS_COLUMN_SUBCONTRACTOR);
        });
        _common.maximizeContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        _common.create_newRecord(cnt.uuid.REQUISITION_SUBCONTRACTOR);
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITION_SUBCONTRACTOR,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,SUBCONTRACTOR_DESC);
        _common.clickOn_activeRowCell(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.GridCells.PRC_STRUCTURE_FK)
        _validate.verify_dataUnderStructurelookups(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.GridCells.PRC_STRUCTURE_FK, app.GridCells.CODE_CAPS, CONTAINERS_SUBCONTRACTOR.STRUCTURE_CODE)
        _common.clickOn_activeRowCell(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.GridCells.BPD_BUSINESS_PARTNER_FK)
        _common.lookUpButtonInCell(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.GridCells.BPD_BUSINESS_PARTNER_FK, app.InputFields.ICO_INPUT_LOOKUP, 0)
        _businessPartnerPage.enterRecord_toAddBusinessPartnerUsingLookUp(CREATE_BUSINESSPARTNER_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.GridCells.BPD_BUSINESS_PARTNER_FK, CONTAINERS_SUBCONTRACTOR.BUSINESS_PARTNER)
        _common.search_inSubContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR, CONTAINERS_SUBCONTRACTOR.BUSINESS_PARTNER)
        _common.delete_recordFromContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        cy.SAVE()
        _validate.verify_recordNotPresentInContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR, CONTAINERS_SUBCONTRACTOR.BUSINESS_PARTNER)
        _common.clear_subContainerFilter(cnt.uuid.REQUISITION_SUBCONTRACTOR)

        _common.create_newRecord(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITION_SUBCONTRACTOR,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,SUBCONTRACTOR_DESC);
        _common.clickOn_activeRowCell(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.GridCells.PRC_STRUCTURE_FK)
        _validate.verify_dataUnderStructurelookups(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.GridCells.PRC_STRUCTURE_FK, app.GridCells.CODE_CAPS, CONTAINERS_SUBCONTRACTOR.STRUCTURE_CODE)
        _common.clickOn_activeRowCell(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.GridCells.BPD_BUSINESS_PARTNER_FK)
        _common.lookUpButtonInCell(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.GridCells.BPD_BUSINESS_PARTNER_FK, app.InputFields.ICO_INPUT_LOOKUP, 0)
        _businessPartnerPage.enterRecord_toAddBusinessPartnerUsingLookUp(CREATE_BUSINESSPARTNER_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getTextfromCell(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.GridCells.BPD_SUBSIDIARY_FK, app.GridCells.BPD_SUPPLIER_FK, app.GridCells.FIRST_NAME_CAPS)
        _common.minimizeContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR)
    });

    it("TC- Verify subcontractors data in business partner module", function () {       
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER);
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.setDefaultView(app.TabBar.BUSINESS_PARTNERS)
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
        });
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS, CONTAINERS_SUBCONTRACTOR.BUSINESS_PARTNER) 
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUBSIDIARIES, app.FooterTab.BRANCHES, 1);
        });
        _common.search_inSubContainer(cnt.uuid.SUBSIDIARIES, Cypress.env("Text"))
        _common.waitForLoaderToDisappear()
        _common.assert_cellDataByContent_inContainer(cnt.uuid.SUBSIDIARIES, app.GridCells.DESCRIPTION, Cypress.env("Text"))
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUPPLIERS, app.FooterTab.SUPPLIERS, 1);
        });
        _common.search_inSubContainer(cnt.uuid.SUPPLIERS, Cypress.env("gridcell_2_Text"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.SUPPLIERS, app.GridCells.CODE, Cypress.env("gridcell_2_Text"))
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS_BP, app.FooterTab.CONTACTS, 0);
        });
        _common.search_inSubContainer(cnt.uuid.CONTACTS_BP, Cypress.env("gridcell_3_Text"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTACTS_BP, app.GridCells.FIRST_NAME, Cypress.env("gridcell_3_Text"))
        _common.waitForLoaderToDisappear()
    })
});
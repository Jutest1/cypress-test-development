import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _procurementContractPage, _procurementPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

import _ from "cypress/types/lodash";

const allure = Cypress.Allure.reporter.getInterface()
const DOC_DESC = "DOC-DESC-" + Cypress._.random(0, 999);
const PROCBOQ_DESC = "PROCBOQ-DESC-" + Cypress._.random(0, 999);
const STATUS_CHECK = "STATUS-CHECK"
const STATUS_UNCHECK = "STATUS_UNCHECK"

let CONTAINERS_REQUISITION
let CONTAINER_COLUMNS_REQUISITION

let CONTAINERS_REQUISITION_MILESTONE
let CONTAINER_COLUMNS_REQUISITION_MILESTONE

let CONTAINERS_REQUISITION_CHARACTERISTICS

let CONTAINER_COLUMNS_REQUISITION_CONTACT
let CONTAINERS_REQUISITION_CONTACT

let CONTAINER_COLUMNS_REQUISITION_SUB_CONTRACTOR
let CONTAINERS_REQUISITION_SUB_CONTRACTOR

let CONTAINER_COLUMNS_REQUISITION_CERTIFICATE
let CONTAINERS_REQUISITION_CERTIFICATE

let CONTAINER_COLUMNS_REQUISITION_GENERALS
let CONTAINERS_REQUISITION_GENERALS

let CONTAINER_COLUMNS_REQUISITION_DOCUMENT

let CONTAINER_COLUMNS_REQUISITION_TOTALS

let CONTAINER_COLUMNS_REQUISITION_ITEMS
let CONTAINERS_REQUISITION_ITEMS
let LANGUAGE
let REQUISITION_MILESTONE_PARAMETER, REQUISTION_ITEM_PARAMETER, LANGUAGE_PARAMETER: DataCells;
let CONTAINER_COLUMNS_SUGGESTED_BIDDERS, CONTAINER_COLUMNS_REQUISITION_CHARACTERISTICS, CONTAINER_COLUMNS_REQUISITION_OVERVIEW;
allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.68 | Check information in overview")
describe("PCM- 2.68 | Check information in overview", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-2.68-check-information-in-overview.json").then((data) => {
            this.data = data
        })
    })
    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("pcm/pcm-2.68-check-information-in-overview.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
            CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION

            CONTAINERS_REQUISITION_MILESTONE = this.data.CONTAINERS.REQUISITION_MILESTONE
            CONTAINER_COLUMNS_REQUISITION_MILESTONE = this.data.CONTAINER_COLUMNS.REQUISITION_MILESTONE

            CONTAINERS_REQUISITION_CHARACTERISTICS = this.data.CONTAINERS.REQUISITION_CHARACTERISTICS

            CONTAINER_COLUMNS_REQUISITION_CONTACT = this.data.CONTAINER_COLUMNS.REQUISITION_CONTACT
            CONTAINERS_REQUISITION_CONTACT = this.data.CONTAINERS.REQUISITION_CONTACT

            CONTAINER_COLUMNS_REQUISITION_SUB_CONTRACTOR = this.data.CONTAINER_COLUMNS.REQUISITION_SUB_CONTRACTOR
            CONTAINERS_REQUISITION_SUB_CONTRACTOR = this.data.CONTAINERS.REQUISITION_SUB_CONTRACTOR

            CONTAINER_COLUMNS_REQUISITION_CERTIFICATE = this.data.CONTAINER_COLUMNS.REQUISITION_CERTIFICATE
            CONTAINERS_REQUISITION_CERTIFICATE = this.data.CONTAINERS.REQUISITION_CERTIFICATE

            CONTAINER_COLUMNS_REQUISITION_GENERALS = this.data.CONTAINER_COLUMNS.REQUISITION_GENERALS
            CONTAINERS_REQUISITION_GENERALS = this.data.CONTAINERS.REQUISITION_GENERALS

            CONTAINER_COLUMNS_REQUISITION_DOCUMENT = this.data.CONTAINER_COLUMNS.REQUISITION_DOCUMENT

            CONTAINER_COLUMNS_REQUISITION_ITEMS = this.data.CONTAINER_COLUMNS.REQUISITION_ITEMS

            CONTAINER_COLUMNS_REQUISITION_TOTALS = this.data.CONTAINER_COLUMNS.REQUISITION_TOTALS
            REQUISITION_MILESTONE_PARAMETER = {
                [app.GridCells.PRC_MILESTONE_TYPE_FK]: CONTAINERS_REQUISITION_MILESTONE.TYPE,
                [app.GridCells.AMOUNT]: CONTAINERS_REQUISITION_MILESTONE.AMOUNT,
                [app.GridCells.MDC_TAX_CODE_FK_SMALL]: CONTAINERS_REQUISITION_MILESTONE.TAX_CODE,
                [app.GridCells.MILESTONE]: CONTAINERS_REQUISITION_MILESTONE.DATE
            }
            CONTAINERS_REQUISITION_ITEMS = this.data.CONTAINERS.REQUISITION_ITEMS
            REQUISTION_ITEM_PARAMETER = {
                [app.GridCells.MDC_MATERIAL_FK]: CONTAINERS_REQUISITION_ITEMS.materialCode,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_REQUISITION_ITEMS.quantity

            }
            CONTAINER_COLUMNS_REQUISITION_OVERVIEW = this.data.CONTAINER_COLUMNS.REQUISITION_OVERVIEW
            CONTAINER_COLUMNS_REQUISITION_CHARACTERISTICS = this.data.CONTAINER_COLUMNS.REQUISITION_CHARACTERISTICS
            CONTAINER_COLUMNS_SUGGESTED_BIDDERS = this.data.CONTAINER_COLUMNS.SUGGESTED_BIDDERS


            LANGUAGE = this.data.CONTAINERS.LANGUAGE
            LANGUAGE_PARAMETER = {
                [commonLocators.CommonLabels.UI_LANGUAGE]: LANGUAGE.uilanguage,
                [commonLocators.CommonLabels.USER_DATA_LANGUAGE]: LANGUAGE.userdatalanguage,
            }
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
        })
    });
    /* after(() => {
        cy.LOGOUT();
    }); */

    it('TC - Create multiple records and check Status in Overview ', function () {


        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.create_newRecord(cnt.uuid.REQUISITIONS)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)// Added this wait as modal take time to load
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.PROJECT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("PROJECT_NUMBER"))
        _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.STRUCTURE)
        _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.BUSINESS_PARTNER)
        _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        //ITEM 
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 0);
            cy.wait(1000)//required waits
            _common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_REQUISITION_ITEMS)
        });
        _common.maximizeContainer(cnt.uuid.REQUISITIONITEMS)
        _common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
        _common.select_rowInContainer(cnt.uuid.REQUISITIONITEMS)
        _package.enterRecord_toCreateNewRequisitionItem(cnt.uuid.REQUISITIONITEMS, REQUISTION_ITEM_PARAMETER)
        cy.wait(1000)//required waits
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.REQUISITIONITEMS)

        //Milestone
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_MILESTONE, app.FooterTab.MILESTONES, 2);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_MILESTONE, CONTAINER_COLUMNS_REQUISITION_MILESTONE)
        });

        _common.create_newRecord(cnt.uuid.REQUISITION_MILESTONE)
        _common.select_rowInContainer(cnt.uuid.REQUISITION_MILESTONE)
        _procurementContractPage.enterRecord_toCreateMilestones(cnt.uuid.REQUISITION_MILESTONE, REQUISITION_MILESTONE_PARAMETER)
        cy.SAVE()

        //create Document
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_DOCUMENTS, app.FooterTab.DOCUMENT, 2);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_DOCUMENTS, CONTAINER_COLUMNS_REQUISITION_DOCUMENT)
        });
        _common.create_newRecord(cnt.uuid.REQUISITION_DOCUMENTS)
        _common.select_rowInContainer(cnt.uuid.REQUISITION_DOCUMENTS)
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITION_DOCUMENTS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, DOC_DESC)
        cy.SAVE().wait(2000).SAVE()

        //create certificate
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_CERTIFICATES, app.FooterTab.CERTIFICATES, 2);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_CERTIFICATES, CONTAINER_COLUMNS_REQUISITION_CERTIFICATE)
        });
        _common.create_newRecord(cnt.uuid.REQUISITION_CERTIFICATES)
        _common.select_rowInContainer(cnt.uuid.REQUISITION_CERTIFICATES)
        _procurementPage.enterRecord_toCreateRequisitionCertificates(cnt.uuid.REQUISITION_CERTIFICATES, CONTAINERS_REQUISITION_CERTIFICATE.TYPE, CONTAINERS_REQUISITION_CERTIFICATE.COST, _common.getDate(commonLocators.CommonKeys.INCREMENTED, 5), _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL))

        _common.enterRecord_inNewRow(cnt.uuid.REQUISITION_CERTIFICATES, app.GridCells.GUARANTEE_COST, app.InputFields.INPUT_GROUP_CONTENT, "Guarantee Cost")
        cy.SAVE()

        cy.wait(1000)//required waits
        //create Generals
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_GENERALS, app.FooterTab.GENERALS, 10);
            cy.wait(1000)//required waits
            _common.setup_gridLayout(cnt.uuid.REQUISITION_GENERALS, CONTAINER_COLUMNS_REQUISITION_GENERALS)
        });
        _common.create_newRecord(cnt.uuid.REQUISITION_GENERALS)
        cy.wait(500)
        _common.select_rowInContainer(cnt.uuid.REQUISITION_GENERALS)
        cy.wait(1000)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_GENERALS, app.GridCells.PRC_GENERALS_TYPE_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, "Nachlass %")
        _common.select_rowInContainer(cnt.uuid.REQUISITION_GENERALS)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_GENERALS, app.GridCells.MDC_TAX_CODE_FK_SMALL, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_GENERALS.TAX_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITION_GENERALS, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_GENERALS.VALUE)
        cy.SAVE().wait(2000).SAVE()
        _common.waitForLoaderToDisappear()
        //Procurement BOQ
        cy.wait(1000)//required waits
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONPROCUREMENTBOQS, app.FooterTab.PROCUREMENT_BOQ, 2);
        });
        _common.create_newRecord(cnt.uuid.REQUISITIONPROCUREMENTBOQS)
        _boqPage.enterRecord_ToCreate_procurementBoQs(commonLocators.CommonKeys.MATERIAL, PROCBOQ_DESC, commonLocators.CommonLabels.CREATE_NEW_BOQ)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        // Bidder
        cy.wait(1000)//required waits
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUGGESTED_BIDDERS, app.FooterTab.SUGGESTED_BIDDERS, 2);
            cy.wait(1000)//required waits
            _common.setup_gridLayout(cnt.uuid.SUGGESTED_BIDDERS, CONTAINER_COLUMNS_SUGGESTED_BIDDERS)
        });
        _common.create_newRecord(cnt.uuid.SUGGESTED_BIDDERS)
        _common.select_rowInContainer(cnt.uuid.SUGGESTED_BIDDERS)
        _common.enterRecord_inNewRow(cnt.uuid.SUGGESTED_BIDDERS, app.GridCells.BP_NAME_1_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_SUB_CONTRACTOR.BUSINESS_PARTNER)
        cy.SAVE()

        //Header
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADER_TEXT, app.FooterTab.HEADER_TEXT, 2);
            cy.wait(1000)//required waits
        });
        _common.create_newRecord(cnt.uuid.HEADER_TEXT)
        cy.SAVE()

        //create characteristics
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 5);
            cy.wait(1000)//required waits
            _common.setup_gridLayout(cnt.uuid.REQUISITION_CHARACTERISTICS, CONTAINER_COLUMNS_REQUISITION_CHARACTERISTICS)
        });
        _common.create_newRecord(cnt.uuid.REQUISITION_CHARACTERISTICS)
        cy.wait(500)
        _common.select_rowInContainer(cnt.uuid.REQUISITION_CHARACTERISTICS)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_CHARACTERISTICS.CODE)
        cy.SAVE().wait(2000).SAVE()

        //Document PROJECT_DOCUMENTS
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, app.FooterTab.DOCUMENTS_PROJECT, 5);
            cy.wait(1000)//required waits
        });
        _common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS)
        _common.select_rowInContainer(cnt.uuid.PROJECT_DOCUMENTS)
        cy.SAVE()

        //Subcontractor
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 2);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_SUBCONTRACTOR, CONTAINER_COLUMNS_REQUISITION_SUB_CONTRACTOR)
        });
        _common.maximizeContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        _common.create_newRecord(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        _common.waitForLoaderToDisappear()
        _procurementPage.enterRecord_toCreateRequisitionSubcontractor(cnt.uuid.REQUISITION_SUBCONTRACTOR, CONTAINERS_REQUISITION_SUB_CONTRACTOR.STRUCTURE, CONTAINERS_REQUISITION_SUB_CONTRACTOR.BUSINESS_PARTNER)
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        cy.SAVE()
        //OVERVIEW
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_OVERVIEW, app.FooterTab.OVERVIEW, 0);
            cy.wait(1000)//required waits
            _common.setup_gridLayout(cnt.uuid.REQUISITION_OVERVIEW, CONTAINER_COLUMNS_REQUISITION_OVERVIEW)
            _common.clear_subContainerFilter(cnt.uuid.REQUISITION_OVERVIEW);
        });
        _common.maximizeContainer(cnt.uuid.REQUISITION_OVERVIEW)
        cy.wait(1000);//required waits  
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.REQUISITION_OVERVIEW, app.GridCells.DESCRIPTION, "REQUISITION_CHECK")
        _common.search_inSubContainer(cnt.uuid.REQUISITION_OVERVIEW, " ")
        _common.clear_subContainerFilter(cnt.uuid.REQUISITION_OVERVIEW);

        _procurementPage.get_titlesOfRequisitionsOverviewCheckedStatus(cnt.uuid.REQUISITION_OVERVIEW, STATUS_CHECK)
        cy.wait(1000);//required waits  
        _common.waitForLoaderToDisappear()


    })

    it('TC -  Assertion of Created Record in overview', function () {

        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_OVERVIEW, app.FooterTab.OVERVIEW, 2);
        });
        _validate.verify_overviewCheckedStatusForContract(cnt.uuid.REQUISITION_OVERVIEW, STATUS_CHECK)
        cy.wait(1000);//required waits  
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.REQUISITION_OVERVIEW)
    })


    it('TC - Delete Records and check Status in Overview', function () {
        _common.minimizeContainer(cnt.uuid.REQUISITION_OVERVIEW)

        //milestone
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_MILESTONE, app.FooterTab.MILESTONES, 1);

        });
        _common.select_rowInContainer(cnt.uuid.REQUISITION_MILESTONE)
        _common.delete_recordFromContainer(cnt.uuid.REQUISITION_MILESTONE)
        cy.SAVE()

        //Create Doc
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_DOCUMENTS, app.FooterTab.DOCUMENT, 4);

        });
        _common.select_rowInContainer(cnt.uuid.REQUISITION_DOCUMENTS)
        _common.delete_recordFromContainer(cnt.uuid.REQUISITION_DOCUMENTS)
        cy.SAVE()

        //Certificate
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_CERTIFICATES, app.FooterTab.CERTIFICATES, 8);

        });
        _common.select_rowInContainer(cnt.uuid.REQUISITION_CERTIFICATES)
        _common.delete_recordFromContainer(cnt.uuid.REQUISITION_CERTIFICATES)
        cy.SAVE()

        //Subcontractor
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 2);

        });
        _common.select_rowInContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        _common.delete_recordFromContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        cy.SAVE()

        //item
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 0);
            cy.wait(1000);//required waits  
            _common.waitForLoaderToDisappear()
        });
        _common.select_rowInContainer(cnt.uuid.REQUISITIONITEMS)
        _common.delete_recordFromContainer(cnt.uuid.REQUISITIONITEMS)
        cy.SAVE()

        //Generals
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_GENERALS, app.FooterTab.GENERALS, 10);

        });
        _common.select_rowInContainer(cnt.uuid.REQUISITION_GENERALS)
        _common.delete_recordFromContainer(cnt.uuid.REQUISITION_GENERALS)
        cy.SAVE()

        //PROC_BOQ
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONPROCUREMENTBOQS, app.FooterTab.PROCUREMENT_BOQ, 2);

        });
        _common.select_rowInContainer(cnt.uuid.REQUISITIONPROCUREMENTBOQS)
        _common.delete_recordFromContainer(cnt.uuid.REQUISITIONPROCUREMENTBOQS)
        cy.SAVE()

        //Bidder
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUGGESTED_BIDDERS, app.FooterTab.SUGGESTED_BIDDERS, 2);

        });
        _common.select_rowInContainer(cnt.uuid.SUGGESTED_BIDDERS)
        _common.delete_recordFromContainer(cnt.uuid.SUGGESTED_BIDDERS)
        cy.SAVE()

        //header
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADER_TEXT, app.FooterTab.HEADER_TEXT, 2);

        });
        _common.select_rowInContainer(cnt.uuid.HEADER_TEXT)
        _common.delete_recordFromContainer(cnt.uuid.HEADER_TEXT)
        cy.SAVE()

        //characteristic
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 5);

        });
        _common.select_rowInContainer(cnt.uuid.REQUISITION_CHARACTERISTICS)
        _common.delete_recordFromContainer(cnt.uuid.REQUISITION_CHARACTERISTICS)
        cy.SAVE()

        //PROJECT_DOCUMENTS
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, app.FooterTab.DOCUMENTS_PROJECT, 5);

        });
        _common.select_rowInContainer(cnt.uuid.PROJECT_DOCUMENTS)
        _common.delete_recordFromContainer(cnt.uuid.PROJECT_DOCUMENTS)
        cy.SAVE()

        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_OVERVIEW, app.FooterTab.OVERVIEW, 0);

            _common.clear_subContainerFilter(cnt.uuid.REQUISITION_OVERVIEW);
        });
        _common.maximizeContainer(cnt.uuid.REQUISITION_OVERVIEW)
        _common.search_inSubContainer(cnt.uuid.REQUISITION_OVERVIEW, " ")
        _common.clear_subContainerFilter(cnt.uuid.REQUISITION_OVERVIEW);

        _procurementPage.get_titlesOfRequisitionsOverviewUnCheckedStatus(cnt.uuid.REQUISITION_OVERVIEW, STATUS_UNCHECK)
        cy.wait(1000);//required waits  
        _common.waitForLoaderToDisappear()
    })

    it('TC -  assertion for Deleted record in overview', function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_OVERVIEW, app.FooterTab.SUBCONTRACTOR, 2);
        });
        _validate.verify_overviewCheckedStatusForNOTICK(cnt.uuid.REQUISITION_OVERVIEW, STATUS_UNCHECK)
        cy.wait(1000);//required waits  
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.REQUISITION_OVERVIEW)

    })

    it('TC - Change Language and check assertion', function () {
        cy.GO_TO_HOME_PAGE();
        cy.SETTINGS()
        _common.enterRecord_toChangeLanguage(LANGUAGE_PARAMETER)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        cy.wait(50000)//required Wait
        _common.waitForLoaderToDisappear()
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.openTab(app.TabBar.PROJECT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, LANGUAGE.anforderung)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        cy.wait(5000)//required Wait
        _common.select_tabFromFooter(cnt.uuid.REQUISITION_OVERVIEW, app.FooterTab.OVERVIEW, 0);
        _common.select_rowHasValue(cnt.uuid.REQUISITION_OVERVIEW, LANGUAGE.bedarfsanforderungen)
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.REQUISITION_OVERVIEW, app.GridCells.DESCRIPTION, Cypress.env("REQUISITION_CHECK"))
    })

})
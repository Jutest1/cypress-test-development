import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _package, _rfqPage, _validate, _procurementContractPage, _procurementPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();

const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const TEXTASSEMBLIESCODE = "TEXT-ASM-" + Cypress._.random(0, 999);
const TEXTASSEMBLIESDESC = "TEXT-DESC-" + Cypress._.random(0, 999);
const TEXTASSEMBLIESCODE1 = "TEXT-ASM-" + Cypress._.random(0, 999);
const TEXTASSEMBLIESDESC1 = "TEXT-DESC-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"
const CONTRACTHEADERTEXT = "Supplier Text"
const TEXTMODULETYPE = "Bid Salutation"
const TEXTMODULETYPE1="Bid Salutation"
const TEXTFORMAT="HTML File"
const PLAINTEXT="MY NEW TEXT"
let REQUISITION_PARAMETERS: DataCells;
let CONTAINERS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION;
let CONTAINER_COLUMNS_TEXT_ASSEMBLIES;
let PROJECTS_PARAMETERS
allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.164 | Create Header text");
describe("PCM- 2.164 | Create Header text", () => {
    before(function () {
        cy.fixture("pcm/pcm-2.164-create-header-text.json").then((data) => {
            this.data = data
            CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
            CONTAINER_COLUMNS_TEXT_ASSEMBLIES=this.data.CONTAINER_COLUMNS.TEXT_ASSEMBLIES
            REQUISITION_PARAMETERS = {
                [commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION,
            }
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
              }
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
              });
              _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
              _common.waitForLoaderToDisappear()
              _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
              _common.create_newRecord(cnt.uuid.PROJECTS);
              _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
              cy.SAVE();
              _common.waitForLoaderToDisappear()
              _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
              _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
                 
                         })
    });
    after(() => {
        cy.LOGOUT();
    });
    it("TC - Verify Create requisition", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
        });
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.maximizeContainer(cnt.uuid.REQUISITIONS)
        _common.create_newRecord(cnt.uuid.REQUISITIONS);
        _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.BP)
        cy.wait(1000)
        cy.SAVE()
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE, "REQCODE")
        _common.minimizeContainer(cnt.uuid.REQUISITIONS)


    })

    it("TC - Verify create text assembly", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TEXT_MODULES)
        _common.openTab(app.TabBar.TEXT_MODULES_MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TEXT_ASSEMBLIES, app.FooterTab.TEXT_ASSEMBLIES, 0);
            _common.setup_gridLayout(cnt.uuid.TEXT_ASSEMBLIES,CONTAINER_COLUMNS_TEXT_ASSEMBLIES)
        _common.waitForLoaderToDisappear()
        });
        _common.create_newRecord(cnt.uuid.TEXT_ASSEMBLIES)
        _common.enterRecord_inNewRow(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,TEXTASSEMBLIESCODE)
        _common.enterRecord_inNewRow(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,TEXTASSEMBLIESDESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.TEXT_MODULE_TYPE_FK,commonLocators.CommonKeys.LIST,TEXTMODULETYPE1)
        _common.set_cellCheckboxValue(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.IS_LANGUAGE_DEPENDENT,commonLocators.CommonKeys.CHECK)
        _common.edit_dropdownCellWithCaret(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.TEXT_FORMAT_FK,commonLocators.CommonKeys.LIST,TEXTFORMAT)
        cy.SAVE().wait(1000)
        _common.openTab(app.TabBar.TEXT_MODULES_MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLAIN_TEXT, app.FooterTab.PLAIN_TEXT, 1);
        });
        _common.edit_inTextAreaOfContainer(cnt.uuid.PLAIN_TEXT,PLAINTEXT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        //verify create second record
        _common.create_newRecord(cnt.uuid.TEXT_ASSEMBLIES)
        _common.enterRecord_inNewRow(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,TEXTASSEMBLIESCODE1)
        _common.enterRecord_inNewRow(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,TEXTASSEMBLIESDESC1)
        _common.edit_dropdownCellWithCaret(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.TEXT_MODULE_TYPE_FK,commonLocators.CommonKeys.LIST,TEXTMODULETYPE1)
        _common.set_cellCheckboxValue(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.IS_LANGUAGE_DEPENDENT,commonLocators.CommonKeys.CHECK)
        _common.edit_dropdownCellWithCaret(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.TEXT_FORMAT_FK,commonLocators.CommonKeys.LIST,TEXTFORMAT)
        cy.SAVE().wait(1000)
        _common.openTab(app.TabBar.TEXT_MODULES_MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLAIN_TEXT, app.FooterTab.PLAIN_TEXT, 1);
        });
        _common.edit_inTextAreaOfContainer(cnt.uuid.PLAIN_TEXT,PLAINTEXT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
    it("TC - Verify create header text in procurement configuration", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER, 0);
            _common.clear_subContainerFilter(cnt.uuid.CONFIGURATION_HEADER)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER,app.GridCells.DESCRIPTION_INFO,"Material")
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONFIGURATIONS, app.FooterTab.CONFIGURATIONS, 5);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION,"Requisition")
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION_INFO,"Material Req")
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADER_TEXTS, app.FooterTab.HEADER_TEXTS, 5);
        });
        _common.create_newRecord(cnt.uuid.HEADER_TEXTS)
        _common.edit_dropdownCellWithCaret(cnt.uuid.HEADER_TEXTS,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.LIST,"Supplier Text")
        _common.edit_dropdownCellWithCaret(cnt.uuid.HEADER_TEXTS,app.GridCells.BAS_TEXT_MODULE_TYPE_FK,commonLocators.CommonKeys.LIST,"Bid Salutation")
        _common.edit_dropdownCellWithCaret(cnt.uuid.HEADER_TEXTS,app.GridCells.BAS_TEXT_MODULE_FK,commonLocators.CommonKeys.GRID,TEXTASSEMBLIESCODE)
        cy.SAVE()
    })

    it("TC - Verify Create header text", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADER_TEXT, app.FooterTab.HEADER_TEXT, 1);
        });
        cy.wait(2000)
        _common.create_newRecord(cnt.uuid.HEADER_TEXT)
        cy.wait(1000)
        _validate.verify_dataUnderCaret(cnt.uuid.HEADER_TEXT,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.GRID,"Supplier Text")
        _common.edit_dropdownCellWithCaret(cnt.uuid.HEADER_TEXT,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.GRID,CONTRACTHEADERTEXT)
        _common.select_rowInContainer(cnt.uuid.HEADER_TEXT)
        _common.edit_dropdownCellWithCaret(cnt.uuid.HEADER_TEXT,app.GridCells.TEXT_MODULE_TYPE_FK,commonLocators.CommonKeys.LIST,TEXTMODULETYPE)
        cy.SAVE().wait(1000)
        _common.assert_cellData_insideActiveRow(cnt.uuid.HEADER_TEXT,app.GridCells.PRC_TEXT_TYPE_FK,"Supplier Text")
    })

    it("TC - Verify header text in requisition module", function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONPLAINHEADERTEXT, app.FooterTab.HEADERPLAINTEXT, 1);
        });
        cy.wait(2000)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONPLAINHEADERTEXT,app.GridCells.PRC_TEXT_TYPE_FK,"Supplier Text")
        cy.wait(1000)
        _common.clickOn_toolbarButton(cnt.uuid.REQUISITIONPLAINHEADERTEXT,btn.ToolBar.ICO_VIEW_ODS)
        _mainView.select_popupItem(commonLocators.CommonKeys.GRID_1,TEXTASSEMBLIESDESC)
        cy.wait(1000)
        _validate.validate_Text_In_Container_Textarea(cnt.uuid.REQUISITIONPLAINHEADERTEXT,PLAINTEXT)
        cy.wait(1000)
        _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.REQUISITIONPLAINHEADERTEXT).wrapElements().find(commonLocators.CommonElements.PLS_IN_TEXT_AREA).clear()
        cy.wait(1000)
        _common.clickOn_toolbarButton(cnt.uuid.REQUISITIONPLAINHEADERTEXT,btn.ToolBar.ICO_VIEW_ODS)
        _mainView.select_popupItem(commonLocators.CommonKeys.GRID_1,TEXTASSEMBLIESDESC1)
        cy.wait(1000)
        _validate.validate_Text_In_Container_Textarea(cnt.uuid.REQUISITIONPLAINHEADERTEXT,PLAINTEXT)
    })

    it("TC - Verify header text is deleted", function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADER_TEXT, app.FooterTab.HEADER_TEXT, 1);
        });
        _common.delete_recordFromContainer(cnt.uuid.HEADER_TEXT)
        _validate.verify_isRecordDeleted(cnt.uuid.HEADER_TEXT,CONTRACTHEADERTEXT)
        cy.SAVE()
    })
})
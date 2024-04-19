import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _package, _rfqPage, _validate, _procurementContractPage } from "cypress/pages";
import { app, tile, cnt, sidebar, commonLocators} from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
const ALLURE = Cypress.Allure.reporter.getInterface();

const PROJECT_NO="31" + Cypress._.random(0, 999);
const PROJECT_DESC="PR1DESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

let PROCUREMENT_CONTRACT_PARAMETERS:DataCells
let CONTAINERS_CONTRACT
let CONTAINER_COLUMNS_TEXT_ASSEMBLIES

const TEXTASSEMBLIESCODE = "TEXT-ASM-" + Cypress._.random(0, 999);
const TEXTASSEMBLIESDESC = "TEXT-DESC-" + Cypress._.random(0, 999);
const CONTRACTHEADERTEXT = "Neutral Description"
const TEXTMODULETYPE = "Invoice Header"
const TEXTMODULETYPE1="Contract Salutation"
const TEXTFORMAT="HTML File"
const PLAINTEXT="MY NEW TEXT"


ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.185 | Create and change different header texts. Use different header text types");
describe("PCM- 2.185 | Create and change different header texts. Use different header text types", () => {
    before(function () {
        cy.fixture("pcm/pcm-2.185-create-and-change-different-header-texts-use-different-header-text-types.json")
          .then((data) => {
            this.data = data
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
                [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
                [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }
            CONTAINERS_CONTRACT=this.data.CONTAINERS.CONTRACT
            PROCUREMENT_CONTRACT_PARAMETERS={
                [commonLocators.CommonLabels.CONFIGURATION]:CONTAINERS_CONTRACT.CONFIGURATION,
                [commonLocators.CommonLabels.BUSINESS_PARTNER]:CONTAINERS_CONTRACT.BUSINESS_PARTNER
            }

            CONTAINER_COLUMNS_TEXT_ASSEMBLIES=this.data.CONTAINER_COLUMNS.TEXT_ASSEMBLIES
          })
          .then(()=>{
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
              _common.setDefaultView(app.TabBar.PROJECT)
              _common.waitForLoaderToDisappear()
              _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            _common.waitForLoaderToDisappear()
            cy.SAVE();          
            _common.waitForLoaderToDisappear()
            _common.waitForLoaderToDisappear()
    
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
          })
    });

    it("TC - Verify Create contract and header text", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
        });
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT)
        _common.waitForLoaderToDisappear()
        _procurementContractPage.enterRecord_createNewProcurementContract_fromModal(PROCUREMENT_CONTRACT_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLAINHEADERTEXT, app.FooterTab.HEADERPLAINTEXT, 1);
        });

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTHEADERTEXT, app.FooterTab.HEADER_TEXT, 3);
        });
        _common.select_allContainerData(cnt.uuid.CONTRACTHEADERTEXT)
        _common.delete_recordFromContainer(cnt.uuid.CONTRACTHEADERTEXT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.create_newRecord(cnt.uuid.CONTRACTHEADERTEXT)
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.CONTRACTHEADERTEXT)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.CONTRACTHEADERTEXT,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.GRID,CONTRACTHEADERTEXT)
        _common.select_activeRowInContainer(cnt.uuid.CONTRACTHEADERTEXT)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.CONTRACTHEADERTEXT,app.GridCells.TEXT_MODULE_TYPE_FK,commonLocators.CommonKeys.LIST,TEXTMODULETYPE)
        _common.select_activeRowInContainer(cnt.uuid.CONTRACTHEADERTEXT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify create text assembly", function () {
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TEXT_MODULES)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.TEXT_MODULES_MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TEXT_ASSEMBLIES, app.FooterTab.TEXT_ASSEMBLIES, 0);
            _common.setup_gridLayout(cnt.uuid.TEXT_ASSEMBLIES,CONTAINER_COLUMNS_TEXT_ASSEMBLIES)
        });
        _common.create_newRecord(cnt.uuid.TEXT_ASSEMBLIES)
        _common.enterRecord_inNewRow(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,TEXTASSEMBLIESCODE)
        _common.enterRecord_inNewRow(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,TEXTASSEMBLIESDESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.TEXT_MODULE_TYPE_FK,commonLocators.CommonKeys.LIST,TEXTMODULETYPE1)
        _common.set_cellCheckboxValue(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.IS_LANGUAGE_DEPENDENT,commonLocators.CommonKeys.CHECK)
        _common.edit_dropdownCellWithCaret(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.TEXT_FORMAT_FK,commonLocators.CommonKeys.LIST,TEXTFORMAT)
        _common.select_activeRowInContainer(cnt.uuid.TEXT_ASSEMBLIES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

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
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.MATERIAL)
        
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONFIGURATIONS, app.FooterTab.CONFIGURATIONS, 2);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION,commonLocators.CommonKeys.CONTRACT)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.MATERIAL_PO)

        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADER_TEXTS, app.FooterTab.HEADER_TEXTS, 3);
        })
        cy.wait(2000)
        _common.select_allContainerData(cnt.uuid.HEADER_TEXTS)
        _common.delete_recordFromContainer(cnt.uuid.HEADER_TEXTS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONFIGURATIONS, app.FooterTab.CONFIGURATIONS, 2);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION,commonLocators.CommonKeys.CONTRACT)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.MATERIAL_PO)

        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADER_TEXTS, app.FooterTab.HEADER_TEXTS, 3);
        })
        _common.create_newRecord(cnt.uuid.HEADER_TEXTS)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.HEADER_TEXTS,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.SUPPLIER_TEXT)
        _common.edit_dropdownCellWithCaret(cnt.uuid.HEADER_TEXTS,app.GridCells.BAS_TEXT_MODULE_TYPE_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.CONTRACT_SALUTATION)
        _common.edit_dropdownCellWithCaret(cnt.uuid.HEADER_TEXTS,app.GridCells.BAS_TEXT_MODULE_FK,commonLocators.CommonKeys.GRID,TEXTASSEMBLIESCODE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify create header text in contract module", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT)
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTHEADERTEXT, app.FooterTab.HEADER_TEXT, 3);
        });
        cy.wait(2000)
        _common.select_allContainerData(cnt.uuid.CONTRACTHEADERTEXT)
        _common.delete_recordFromContainer(cnt.uuid.CONTRACTHEADERTEXT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.create_newRecord(cnt.uuid.CONTRACTHEADERTEXT)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.CONTRACTHEADERTEXT,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.GRID,commonLocators.CommonKeys.SUPPLIER_TEXT)
        _common.clickOn_activeRowCell(cnt.uuid.CONTRACTHEADERTEXT,app.SubContainerLayout.INDICATOR)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTHEADERTEXT,app.GridCells.TEXT_MODULE_TYPE_FK,commonLocators.CommonKeys.CONTRACT_SALUTATION)
    })

    it("TC - Verify header text in contract module", function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLAINHEADERTEXT, app.FooterTab.HEADERPLAINTEXT, 1);
        });
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PLAINHEADERTEXT,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.SUPPLIER_TEXT)
        _common.waitForLoaderToDisappear()
        _validate.validate_Text_In_Container_Textarea(cnt.uuid.PLAINHEADERTEXT,PLAINTEXT)
    })

    it("TC - Verify change procurement configuration and check again updated header text in contract", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.MATERIAL)
        
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONFIGURATIONS, app.FooterTab.CONFIGURATIONS, 2);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION,commonLocators.CommonKeys.CONTRACT)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.MATERIAL_PO)
        
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADER_TEXTS, app.FooterTab.HEADER_TEXTS, 3);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.HEADER_TEXTS,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.SUPPLIER_TEXT)
        _common.edit_dropdownCellWithCaret(cnt.uuid.HEADER_TEXTS,app.GridCells.BAS_TEXT_MODULE_TYPE_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.INTERNAL_FOOTER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT)
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.waitForLoaderToDisappear()


        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTHEADERTEXT, app.FooterTab.HEADER_TEXT, 3);
        });
        cy.wait(2000)
        _common.select_allContainerData(cnt.uuid.CONTRACTHEADERTEXT)
        _common.delete_recordFromContainer(cnt.uuid.CONTRACTHEADERTEXT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.CONTRACTHEADERTEXT)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.CONTRACTHEADERTEXT,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.GRID,commonLocators.CommonKeys.SUPPLIER_TEXT)
        _common.clickOn_activeRowCell(cnt.uuid.CONTRACTHEADERTEXT,app.SubContainerLayout.INDICATOR)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTHEADERTEXT,app.GridCells.TEXT_MODULE_TYPE_FK,commonLocators.CommonKeys.INTERNAL_FOOTER)
    })
})
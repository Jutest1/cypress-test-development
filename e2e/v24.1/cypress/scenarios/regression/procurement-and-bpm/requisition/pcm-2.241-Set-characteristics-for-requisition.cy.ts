import { _modalView, _rfqPage,  _common, _estimatePage, _projectPage, _validate,  _procurementPage,_procurementContractPage, _mainView } from "cypress/pages";
import { tile, cnt, app, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

let REQUISITION_PARAMETER:DataCells
let CONTAINER_COLUMNS_REQUISITION

let CHARACTERISTIC_PARAMETER_1: DataCells
let CHARACTERISTIC_PARAMETER_2: DataCells
let CHARACTERISTIC_PARAMETER_3: DataCells
let CONTAINERS_CHARACTERISTICS

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Requisition");
ALLURE.story("PCM- 2.241 | Set characteristics for requisition");
describe("PCM- 2.241 | Set characteristics for requisition", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.241-Set-characteristics-for-requisition.json")
          .then((data) => {
            this.data = data;
            REQUISITION_PARAMETER={
                [commonLocators.CommonLabels.CONFIGURATION]:commonLocators.CommonKeys.SERVICE_REQ
            }
            CONTAINER_COLUMNS_REQUISITION=this.data.CONTAINER_COLUMNS.REQUISITION

            CONTAINERS_CHARACTERISTICS=this.data.CONTAINERS.CHARACTERISTICS
            CHARACTERISTIC_PARAMETER_1={
                [app.GridCells.CHARACTERISTIC_FK]:CONTAINERS_CHARACTERISTICS.CODE[0],
                [app.GridCells.VALUE_TEXT]:CONTAINERS_CHARACTERISTICS.VALUE[0]
            }
    
            CHARACTERISTIC_PARAMETER_2={
                [app.GridCells.CHARACTERISTIC_FK]:CONTAINERS_CHARACTERISTICS.CODE[1],
                [app.GridCells.VALUE_TEXT]:CONTAINERS_CHARACTERISTICS.VALUE[1]
            }
    
            CHARACTERISTIC_PARAMETER_3={
                [app.GridCells.CHARACTERISTIC_FK]:CONTAINERS_CHARACTERISTICS.CODE[2],
                [app.GridCells.VALUE_TEXT]:CONTAINERS_CHARACTERISTICS.VALUE[0]
            }

            cy.preLoading(Cypress.env('adminUserName'),Cypress.env('adminPassword'),Cypress.env('parentCompanyName'),Cypress.env('childCompanyName'));
            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
           
          });
    });

    
	after(() => {
		cy.LOGOUT();
	});
    
    it("TC - Precondition: Check the checkbox of requisition in characteristics module", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CHARACTERISTICS);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_SECTIONS, app.FooterTab.CHARACTERISTIC_SECTIONS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.CHARACTERISTIC_SECTIONS)
        _common.search_inSubContainer(cnt.uuid.CHARACTERISTIC_SECTIONS,sidebar.SideBarOptions.REQUISITION)
        _common.waitForLoaderToDisappear()

        _common.clickOn_cellHasUniqueValue(cnt.uuid.CHARACTERISTIC_SECTIONS,app.GridCells.DESCRIPTION_INFO,sidebar.SideBarOptions.REQUISITION)
        _common.set_cellCheckboxValue(cnt.uuid.CHARACTERISTIC_SECTIONS,app.GridCells.CHECKED,commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
       
    });

    it("TC - Create new Requisition", function () {
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MAIN).then(() => {
           _common.setDefaultView(app.TabBar.MAIN)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.create_newRecord(cnt.uuid.REQUISITIONS)
        _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS,REQUISITION_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONS,app.GridCells.CODE,"REQCODE")
    });

    it("TC - Set characteristics to requisition using wizard and verify add and delete button in modal", function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0); 
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.search_inSubContainer(cnt.uuid.REQUISITIONS,Cypress.env("REQCODE"))

  
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHARACTERISTIC);
        _common.waitForLoaderToDisappear()

        _procurementPage.enterRecord_toCreateCharacteristicsInRequisition(CHARACTERISTIC_PARAMETER_1)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.wait(1000)//required wait
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHARACTERISTIC);
        _common.waitForLoaderToDisappear()
        _procurementPage.enterRecord_toCreateCharacteristicsInRequisition(CHARACTERISTIC_PARAMETER_2)
        _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
        cy.wait(1000)//required wait
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHARACTERISTIC);
        _common.waitForLoaderToDisappear()
        _procurementPage.enterRecord_toCreateCharacteristicsInRequisition(CHARACTERISTIC_PARAMETER_3)
        _common.clickOn_modalButtonByClass(btn.IconButtons.ICO_REC_DELETE)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.CANCEL)
        _common.waitForLoaderToDisappear()
       
    });

    it("TC - Verify characteristics added in characteristics container", function () {
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0); 
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.search_inSubContainer(cnt.uuid.REQUISITIONS,Cypress.env("REQCODE"))
        _common.select_rowInContainer(cnt.uuid.REQUISITIONS)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_CHARACTERISTICS,app.GridCells.VALUE_TEXT,CONTAINERS_CHARACTERISTICS.VALUE[0])
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_CHARACTERISTICS,app.GridCells.CHARACTERISTIC_FK,CONTAINERS_CHARACTERISTICS.CODE[0])
        _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_CHARACTERISTICS,app.GridCells.VALUE_TEXT,CONTAINERS_CHARACTERISTICS.VALUE[1])
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_CHARACTERISTICS,app.GridCells.CHARACTERISTIC_FK,CONTAINERS_CHARACTERISTICS.CODE[1])
    });   
});

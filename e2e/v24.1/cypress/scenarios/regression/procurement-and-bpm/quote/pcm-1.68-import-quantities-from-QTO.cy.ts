import { _common,  _sidebar,_projectPage,_boqPage,_controllingUnit,_salesPage,_package,_saleContractPage, _rfqPage,_mainView, _validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import _ from "cypress/types/lodash";
const allure = Cypress.Allure.reporter.getInterface();

// VARIABLES----------------------------------------------------------------


const PROJECT_NO = "PR-" + Cypress._.random(0, 999);
const PROJECT_DESC = "PR-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTRUCT_DESC-" + Cypress._.random(0, 999);

let BOQ_PARAMETERS: DataCells,
    BOQ_STRUCTURE_PARAMETERS: DataCells,
    ESTIMATE_PARAMETERS: DataCells,
    GENERATE_LINE_ITEMS_PARAMETERS: DataCells,
    RESOURCE_PARAMETERS: DataCells,
    PROJECTS_PARAMETERS:DataCells,
    CONTROLLING_UNIT_PARAMETERS:DataCells,
    PES_PARAMETERS:DataCells

let CONTAINER_COLUMNS_BOQS,
    CONTAINERS_BOQ_STRUCTURE,
    CONTAINER_COLUMNS_BOQ_STRUCTURE,
    CONTAINERS_ESTIMATE,
    CONTAINER_COLUMNS_ESTIMATE,
    CONTAINER_PACKAGE,
    CONTAINER_COLUMNS_PACKAGE,
    CONTAINER_COLUMNS_REQUISITION,
    MODAL_UPDATE_BOQ_PACKAGE,
    CONTAINERS_PACKAGE_BOQ,
    CONTAINER_COLUMNS_PACKAGE_BOQ,
    CONTAINER_COLUMNS_RESOURCE,
    CONTAINERS_RESOURCE,
    CONTAINERS_BIDDER,
    CONTAINER_COLUMNS_RFQ,
    CONTAINER_COLUMNS_QUOTE,
    CONTAINER_COLUMNS_BIDDER,MODAL_UPDATE_ESTIMATE,
    MODAL_UPDATE_ESTIMATE_WIZARD,
    CONTAINER_COLUMNS_CONTROLLING_UNIT,
    CONTAINERS_CONTROLLING_UNIT,
    CONTAINER_COLUMNS_CONTRACT,
    CONTAINERS_PES,CONTAINER_COLUMNS_BILL_OF_QUANTITY

const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);

const CLERK_NAME = "HS"
const ContractCode = "ContractCode"
const PackageCode = "PackageCode"
const ResultsQuantity = "ResultsQuantity"
const QTO_REMAINING_QUANTITY = "QTO_REMAINING_QUANTITY"
const COUNTUNIT = "COUNTUNIT-" + Cypress._.random(0, 999);
const QTO_DESC = "QTO-DESC-" + Cypress._.random(0, 999);


allure.epic("PROCUREMENT AND BPM");
allure.feature("Quote");
allure.story("PCM- 1.68 | Import quantities from QTO")

describe("PCM- 1.68 | Import quantities from QTO", () => {
            before(function () {
                cy.fixture('pcm/pcm-1.68-import-quantities-from-QTO.json').then((data) => {
                  this.data = data;
                  CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
                  CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
                  CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
                  CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                  CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
                  CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
                  CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
                  CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
                  MODAL_UPDATE_BOQ_PACKAGE = this.data.MODAL.UPDATE_BOQ_PACKAGE
                  MODAL_UPDATE_ESTIMATE= this.data.MODAL.UPDATE_ESTIMATE
                  CONTAINERS_PACKAGE_BOQ = this.data.CONTAINERS.PACKAGE_BOQ
                  CONTAINER_COLUMNS_PACKAGE_BOQ = this.data.CONTAINER_COLUMNS.PACKAGE_BOQ
                  CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
                  CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
                  CONTAINERS_BIDDER = this.data.CONTAINERS.BIDDER;
                  CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
                  CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE
                  CONTAINER_COLUMNS_BIDDER= this.data.CONTAINER_COLUMNS.BIDDER
                  MODAL_UPDATE_ESTIMATE_WIZARD=this.data.MODAL.UPDATE_ESTIMATE_WIZARD
                  CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
			      CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
                  CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
                  CONTAINERS_PES = this.data.CONTAINERS.PES;
                  CONTAINER_COLUMNS_BILL_OF_QUANTITY = this.data.CONTAINER_COLUMNS.BILL_OF_QUANTITY
                  PROJECTS_PARAMETERS={
                    [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
                    [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
                    [commonLocators.CommonLabels.CLERK]:CLERK_NAME
                }
                
                CONTROLLING_UNIT_PARAMETERS = {
                    [app.GridCells.DESCRIPTION_INFO]: COUNTUNIT,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                    [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
                }               

                
                  ESTIMATE_PARAMETERS = {
                      [app.GridCells.CODE]: EST_CODE,
                      [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                      [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                      [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
                  }
                  BOQ_PARAMETERS = {
                      [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
                  }
                  BOQ_STRUCTURE_PARAMETERS = {
                      [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                      [app.GridCells.BRIEF_INFO_SMALL]: BOQSTRUCT_DESC,
                      [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY,
                      [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                      [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
                  }
                  GENERATE_LINE_ITEMS_PARAMETERS = {
                      [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                      [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
                  }
                  RESOURCE_PARAMETERS = {
                      [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                      [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
                  }
                 
                  PES_PARAMETERS = {
                    [commonLocators.CommonLabels.DATE_DELIVERED]: CONTAINERS_PES.DATE,
                }
                  });
              cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
              _common.openDesktopTile(tile.DesktopTiles.PROJECT);
              _common.waitForLoaderToDisappear()
    });
    after(() => {
		cy.LOGOUT();
	});
    it("TC - Create New Project", function () {
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
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    
    });

    it("TC - Create BOQ header and BOQ structure", function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.maximizeContainer(cnt.uuid.BOQS)
        _common.create_newRecord(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.BOQS)
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE()
        cy.wait(2000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _boqPage.get_BoQsFinalPrice()
       
    });
    it('TC -Verify Assign controlling unit', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
                _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
                _common.waitForLoaderToDisappear()
                _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
            _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
                _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
                _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
            });
            _common.waitForLoaderToDisappear()
            _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
            _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
            cy.SAVE()
            _common.waitForLoaderToDisappear()
    
            _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
            _common.waitForLoaderToDisappear()
    })

    it("TC - Create estimate header", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
   
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        cy.wait(1000) //required wait to load page
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        cy.wait(1000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    });
    it("TC - Generate BOQ line item and create Resource", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        cy.wait(1000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        cy.wait(1000)// REQUIRED WAIT TO PASS THE TEST
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });
    it("TC - Create BoQ Package from the Estimate", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait to load page
        _package.enterRecord_toCreateBoQPackage_FromWizard(CONTAINER_PACKAGE.BOQ, CONTAINER_PACKAGE.ESTIMATE_SCOPE, CONTAINER_PACKAGE.GROUPING_STRUCTURE, CONTAINER_PACKAGE.PROCUREMENT_STRUCTURE)
        _common.openTab(app.TabBar.PACKAGE).then(function () {
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
        cy.wait(1000) //required wait to load page
        _common.waitForLoaderToDisappear()
    })

    it('TC - Create Contract from package wizard', function () {

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
        _common.saveCellDataToEnv(cnt.uuid.PACKAGE, app.GridCells.CODE, PackageCode)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        })
        _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        _validate.verify_isButtonDisabled(btn.ButtonText.NEXT)
        _common.waitForLoaderToDisappear()
        _package.create_ContractfromPackage(CONTAINERS_BIDDER.BP)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        });
        _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, ContractCode)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, COUNTUNIT)
        cy.wait(1000)// REQUIRED WAIT TO PASS THE TEST
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        cy.wait(1000)// REQUIRED WAIT TO PASS THE TEST
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
        cy.wait(1000)// REQUIRED WAIT TO PASS THE TEST
        cy.SAVE();
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.clickOn_cellHasIcon(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        })
        _common.assert_forNumericValues(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY)
    })

    it("TC - Navigating to QTO and create quantity take off ", function () {
    
       

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QTO);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QTOHEADER).then(() => {
            _common.setDefaultView(app.TabBar.QTOHEADER)
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_HEADER, app.FooterTab.QUANTITY_TAKEOFF_HEADER, 0);
        });
        _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_HEADER)
        _salesPage.enter_dataToCreate_QTOHeader("Procurement / PES", QTO_DESC, Cypress.env("ContractCode"), Cypress.env("PackageCode"),PROJECT_NO)
        cy.wait(500)// REQUIRED WAIT TO PASS THE TEST
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY)
          
            _common.clickOn_cellHasIcon(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        })
        _common.assert_forNumericValues(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.ORD_QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY)

    });
    it("TC -  Create quantity take off record", function () {
       
        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITYTAKEOFFHEADER, 0);
           
        });
        _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
        _common.enterRecord_inNewRow(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.GridCells.VALUE_1_DETAIL, app.InputFields.DOMAIN_TYPE_REMARK, "=20")
        _common.edit_dropdownCellWithCaret(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.GridCells.QTO_FORMULA_FK, "grid", "91")
       
        _common.waitForLoaderToDisappear()
        cy.SAVE()
       
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.GridCells.RESULT, ResultsQuantity)
        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY)
            _common.clickOn_cellHasIcon(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        })
    });

    it("TC -  Create PES and verify BoQ structure attributes", function () {
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.INSTALLED_QUANTITY, Cypress.env("ResultsQuantity"))

        })
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_PES);
        _common.waitForLoaderToDisappear()
        
        _saleContractPage.enterRecord_To_CreatePES_fromWizard_From_QTO(CONTAINERS_PES.Create, PES_PARAMETERS)
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
        })
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1)

        })
        _common.maximizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.clickOn_cellHasIcon(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQSTRUCT_DESC)
        _common.assert_forNumericValues(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL, Cypress.env("ResultsQuantity"))
        _common.saveCellDataToEnv(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.REM_QUANTITY, QTO_REMAINING_QUANTITY)
        _common.minimizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
            _common.maximizeContainer(cnt.uuid.HEADERS)
            _common.clickOn_goToButton_toSelectModule(cnt.uuid.HEADERS, "QTO")
        })

    });

    it("TC - Verify PES remaining Quantity", function () {

        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY)
            _common.clickOn_cellHasIcon(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        })
        _common.assert_forNumericValues(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.IQ_REMAINING_QUANTITY, Cypress.env("QTO_REMAINING_QUANTITY"))

    })

})

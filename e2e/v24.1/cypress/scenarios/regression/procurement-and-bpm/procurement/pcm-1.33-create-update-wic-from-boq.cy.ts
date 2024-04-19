
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";


const ALLURE = Cypress.Allure.reporter.getInterface();

const PROJECT_NO_1="PR-11" + Cypress._.random(0, 999);
const PROJECT_DESC_1="PR1DESC-" + Cypress._.random(0, 999);
const PROJECT_NO_2="PR-22" + Cypress._.random(0, 999);
const PROJECT_DESC_2="PR2DESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS_1:DataCells
let PROJECTS_PARAMETERS_2:DataCells
let MODAL_PROJECTS



const BOQ_DESC_1="BOQ1_DESC-" + Cypress._.random(0, 999);
const BOQ_DESC_2="BOQ2_DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC_1="BOQ1_STR_DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC_2="BOQ2_STR_DESC-" + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_PARAMETERS_1:DataCells
let BOQ_PARAMETERS_2:DataCells
let BOQ_STRUCTURE_PARAMETERS_1:DataCells
let CONTAINERS_BOQ_STRUCTURE
let CONTAINER_COLUMNS_SOURCE_BOQ

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;


let GENERATE_LINE_ITEMS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM


let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

let MODAL_CREATE_UPDATE_BOQ_PACKAGE

let CONTAINER_COLUMNS_PACKAGE

let CONTAINER_COLUMNS_REQUISITION

let CREATE_RFQ_PARAMETERS:DataCells

let MODAL_REQUEST_FOR_QUOTE

let CONTAINER_COLUMNS_RFQ

let CONTAINER_COLUMNS_QUOTE

let CONTAINERS_QUOTE_BOQ_STRUCTURE

let CREATE_WIC_FROM_BOQ_PARAMETER:DataCells
let MODAL_CREATE_WIC_FROM_BOQ

const WIC_BOQ_REFERENCE_NO="01" + Cypress._.random(0, 999);
const WIC_BOQ_OUTLINE_SPEC="WIC_BOQ_OUTLINE_SPEC-" + Cypress._.random(0, 999);

let CONTAINERS_SOURCE_BOQ
let SOURCE_WIC_BOQ_PARAMETER

let CONTAINER_COLUMNS_WIC_GROUP
let CONTAINER_COLUMNS_WIC_CATALOGUES

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Procurement");
ALLURE.story("PCM- 1.33 | Create/Update WIC from BOQ");

describe("PCM- 1.33 | Create/Update WIC from BOQ", () => {
    before(function () {
        cy.fixture("pcm/pcm-1.33-create-update-wic-from-boq.json")
          .then((data) => {
            this.data = data;
            MODAL_PROJECTS=this.data.MODAL.PROJECTS

            CONTAINER_COLUMNS_WIC_GROUP=this.data.CONTAINER_COLUMNS.WIC_GROUP

            CONTAINER_COLUMNS_WIC_CATALOGUES=this.data.CONTAINER_COLUMNS.WIC_CATALOGUES
            CONTAINERS_QUOTE_BOQ_STRUCTURE=this.data.CONTAINERS.QUOTE_BOQ_STRUCTURE
            CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
            CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ

            CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
			CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE

            CONTAINER_COLUMNS_SOURCE_BOQ=this.data.CONTAINER_COLUMNS.SOURCE_BOQ

            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE

            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM

            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
			CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE

            MODAL_CREATE_UPDATE_BOQ_PACKAGE=this.data.MODAL.CREATE_UPDATE_BOQ_PACKAGE

            CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE

            CONTAINER_COLUMNS_REQUISITION=this.data.CONTAINER_COLUMNS.REQUISITION

            MODAL_REQUEST_FOR_QUOTE=this.data.MODAL.REQUEST_FOR_QUOTE

            CONTAINER_COLUMNS_RFQ=this.data.CONTAINER_COLUMNS.RFQ

            CONTAINER_COLUMNS_QUOTE=this.data.CONTAINER_COLUMNS.QUOTE

            CONTAINERS_QUOTE_BOQ_STRUCTURE=this.data.CONTAINERS.QUOTE_BOQ_STRUCTURE

            MODAL_CREATE_WIC_FROM_BOQ=this.data.MODAL.CREATE_WIC_FROM_BOQ
            CONTAINERS_SOURCE_BOQ=this.data.CONTAINERS.SOURCE_BOQ

            PROJECTS_PARAMETERS_1={
                [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO_1,
                [commonLocators.CommonLabels.NAME]:PROJECT_DESC_1,
                [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK[0]
            }
            PROJECTS_PARAMETERS_2={
                [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO_2,
                [commonLocators.CommonLabels.NAME]:PROJECT_DESC_2,
                [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK[0]
            }

           
			BOQ_PARAMETERS_1={
				[app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC_1
			}
            BOQ_PARAMETERS_2={
				[app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC_2
			}

			BOQ_STRUCTURE_PARAMETERS_1={
				[commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
				[app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC_1,
				[app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY,
				[ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
				[app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
			}
          
           
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}

           
			GENERATE_LINE_ITEMS_PARAMETERS={
				[commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
				[commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_DESC_2                
			}

           
			RESOURCE_PARAMETERS = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
				[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
			};

           

            CREATE_RFQ_PARAMETERS={
                [commonLocators.CommonLabels.BUSINESS_PARTNER]:[MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER]
            }

           
            CREATE_WIC_FROM_BOQ_PARAMETER={
                [commonLocators.CommonLabels.SOURCE_BOQ]:BOQ_DESC_2,
                [commonLocators.CommonLabels.TARGET_WIC_GROUP]:MODAL_CREATE_WIC_FROM_BOQ.TRAGET_WIC_GROUP,
                [commonLocators.CommonLabels.REFERENCE_NO]:WIC_BOQ_REFERENCE_NO,
                [commonLocators.CommonLabels.OUTLINE_SPECIFICATION]:WIC_BOQ_OUTLINE_SPEC
            }

           

            SOURCE_WIC_BOQ_PARAMETER={
                [commonLocators.CommonLabels.COPY_FROM]:commonLocators.CommonKeys.WIC_BOQ,
                [commonLocators.CommonLabels.WIC_GROUP]:MODAL_CREATE_WIC_FROM_BOQ.TRAGET_WIC_GROUP,
                [commonLocators.CommonLabels.BOQ_SELECTION]:WIC_BOQ_OUTLINE_SPEC           
            }

           
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
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS_1);
            _common.waitForLoaderToDisappear()
            cy.SAVE();          
            _common.waitForLoaderToDisappear()
            _common.waitForLoaderToDisappear()

            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS_2);
            _common.waitForLoaderToDisappear()
            cy.SAVE();          
            _common.waitForLoaderToDisappear()
            _common.waitForLoaderToDisappear()

            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO_1).pinnedItem();
          })
    });  

    after(() => {
    cy.LOGOUT();
    });

    it("TC - Create BoQ header and BoQ structure for project", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO_1).pinnedItem(); 
        _common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.setDefaultView(app.TabBar.BOQS)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
			_common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
		});
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.maximizeContainer(cnt.uuid.BOQS)
		_common.create_newRecord(cnt.uuid.BOQS);
		_common.waitForLoaderToDisappear()
		_boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS_1);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.BOQS)
		_common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
		_common.waitForLoaderToDisappear()
  
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.BOQSTRUCTURE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
			_common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
		});
		_boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS_1);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.waitForLoaderToDisappear()
    });

    it("TC - Create BoQ header and copy source BoQ from project", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO_2).pinnedItem(); 
        _common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.setDefaultView(app.TabBar.BOQS)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
			_common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
		});
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.maximizeContainer(cnt.uuid.BOQS)
		_common.create_newRecord(cnt.uuid.BOQS);
		_common.waitForLoaderToDisappear()
		_boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS_2);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.BOQS)
		_common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
		_common.waitForLoaderToDisappear()
  
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.BOQSTRUCTURE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
			_common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
		});
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)

        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQSOURCE, app.FooterTab.SOURCE_BOQ, 2)
            _common.setup_gridLayout(cnt.uuid.BOQSOURCE, CONTAINER_COLUMNS_SOURCE_BOQ)
            _common.set_columnAtTop([CONTAINER_COLUMNS_SOURCE_BOQ.price, CONTAINER_COLUMNS_SOURCE_BOQ.basuomfk, CONTAINER_COLUMNS_SOURCE_BOQ.quantity, CONTAINER_COLUMNS_SOURCE_BOQ.briefinfo, CONTAINER_COLUMNS_SOURCE_BOQ.boqlinetypefk], cnt.uuid.BOQSOURCE)
        })   
        _common.waitForLoaderToDisappear()
 
        _common.clear_subContainerFilter(cnt.uuid.BOQSOURCE)
        _boqPage.search_recordingUnderSourceBoQ(cnt.uuid.BOQSOURCE,cnt.uuid.BOQ_STRUCTURES,commonLocators.CommonKeys.PROJECT_BOQ,"",PROJECT_DESC_1,BOQ_DESC_1,BOQ_DESC_1,commonLocators.CommonKeys.ROOT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
		});
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,commonLocators.CommonKeys.POSITION)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, BOQ_STRUCTURE_DESC_2);
        _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTURES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create estimate header", function () {
        _common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO_2).pinnedItem(); 
        _common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
    });

    it("TC - Generate boq line item and create resource", function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
  
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
		_common.waitForLoaderToDisappear()
		_estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        _common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
  
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.waitForLoaderToDisappear()
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC_2)


        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.SAVE();
    });

    it("TC - Create BoQ package from the estimate", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
		_common.waitForLoaderToDisappear()
        _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE_INDEX, MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.QTY_TRANSFER, commonLocators.CommonKeys.UNCHECK)
        _common.waitForLoaderToDisappear()
        cy.wait(2000) // This wait required as UI takes time to load
    })

    it("TC - Change package status", function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO_2);  
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PK-Code"))

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create requisition", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        cy.wait(4000) // This wait required as UI takes time to load
        _rfqPage.getCode_fromRequisitionModal("REQUISITION_CODE")
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
		_common.waitForLoaderToDisappear()
    })

    it("TC - Change requisition status", function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO_2) 
            _common.waitForLoaderToDisappear()
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.search_inSubContainer(cnt.uuid.REQUISITIONS,Cypress.env("REQUISITION_CODE"))

        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create RFQ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
        _common.waitForLoaderToDisappear()
        _rfqPage.create_requestForQuote_fromWizard(CREATE_RFQ_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _rfqPage.getCode_fromRFQModal("RFQ_CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Change RFQ status", function () {
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0)
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO_2) 
            _common.waitForLoaderToDisappear()
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.search_inSubContainer(cnt.uuid.REQUEST_FOR_QUOTE,Cypress.env("RFQ_CODE"))

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create quote", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _common.waitForLoaderToDisappear()

        _rfqPage.create_quote_fromWizard([MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER],[commonLocators.CommonKeys.CHECK])
        _common.waitForLoaderToDisappear()
        cy.wait(2000) // Added this wait as script was getting failed
        _boqPage.getCode_fromQuoteModal("QUOTE-CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
        _common.waitForLoaderToDisappear()
        cy.wait(2000) // Added this wait as script was getting failed

        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()

        
        _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO_2) 
            _common.waitForLoaderToDisappear()

            _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
            
    })

    it("TC - Updated BoQ Structure under quote", function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
            _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE);
            _common.waitForLoaderToDisappear()
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        _common.search_inSubContainer(cnt.uuid.QUOTES,Cypress.env("QUOTE-CODE"))
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.QUOTES).then(() => {
          _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
          _common.setup_gridLayout(cnt.uuid.QUOTEBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE);
          _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.QUOTEBOQSTRUCTURE)
        })
        _common.maximizeContainer(cnt.uuid.QUOTEBOQSTRUCTURE)
        _common.select_allContainerData(cnt.uuid.QUOTEBOQSTRUCTURE)
        _common.clickOn_toolbarButton(cnt.uuid.QUOTEBOQSTRUCTURE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.waitForLoaderToDisappear()

        _common.clickOn_cellHasValue(cnt.uuid.QUOTEBOQSTRUCTURE,app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCTURE_DESC_2)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.QUOTEBOQSTRUCTURE,app.GridCells.BAS_UOM_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_QUOTE_BOQ_STRUCTURE.UOM)
        _common.select_activeRowInContainer(cnt.uuid.QUOTEBOQSTRUCTURE)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.PRICE_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_QUOTE_BOQ_STRUCTURE.UNIT_RATE)
        _common.select_activeRowInContainer(cnt.uuid.QUOTEBOQSTRUCTURE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.QUOTEBOQSTRUCTURE)
    })

    it("TC - Create WIC from BoQ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIC_FROM_BOQ);
        _common.waitForLoaderToDisappear()

        _boqPage.create_WICfromBoQ_fromWizard(CREATE_WIC_FROM_BOQ_PARAMETER)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
        })       
    })

    it("TC - Verify WIC BoQ information such as unite rate, quantity, uom are updated according the selected quote", function () {
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WIC); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WORKITEMCATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIC_GROUPS, app.FooterTab.WIC_GROUPS, 0)
            _common.setup_gridLayout(cnt.uuid.WIC_GROUPS, CONTAINER_COLUMNS_WIC_GROUP);
        }) 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.WIC_GROUPS)
        _common.clear_subContainerFilter(cnt.uuid.WIC_GROUPS)
        _common.search_inSubContainer(cnt.uuid.WIC_GROUPS,MODAL_CREATE_WIC_FROM_BOQ.TRAGET_WIC_GROUP)
        _common.select_rowInContainer(cnt.uuid.WIC_GROUPS)
        _common.minimizeContainer(cnt.uuid.WIC_GROUPS)

        _common.openTab(app.TabBar.WORKITEMCATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIC_CATALOGUES, app.FooterTab.WICCATALOGUES, 1)
            _common.setup_gridLayout(cnt.uuid.WIC_CATALOGUES, CONTAINER_COLUMNS_WIC_CATALOGUES);
        })

        _common.clear_subContainerFilter(cnt.uuid.WIC_CATALOGUES)
        _common.search_inSubContainer(cnt.uuid.WIC_CATALOGUES,WIC_BOQ_OUTLINE_SPEC)
        _common.select_rowInContainer(cnt.uuid.WIC_CATALOGUES)
        _common.clickOn_toolbarButton(cnt.uuid.WIC_CATALOGUES,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.waitForLoaderToDisappear()
         _common.clickOn_cellHasValue(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCTURE_DESC_2)
        _common.waitForLoaderToDisappear()
       
        _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES, app.GridCells.PRICE_SMALL,CONTAINERS_QUOTE_BOQ_STRUCTURE.UNIT_RATE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BAS_UOM_FK,CONTAINERS_QUOTE_BOQ_STRUCTURE.UOM)
        _common.minimizeContainer(cnt.uuid.BOQ_STRUCTURES)

        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQSOURCE, app.FooterTab.SOURCE_BOQ, 2)
        }) 
        _boqPage.selectRecord_forSourceBoQ(cnt.uuid.BOQSOURCE,SOURCE_WIC_BOQ_PARAMETER)
        _common.clear_subContainerFilter(cnt.uuid.BOQSOURCE)
        _common.maximizeContainer(cnt.uuid.BOQSOURCE)
        _common.select_allContainerData(cnt.uuid.BOQSOURCE)
        _common.clickOn_toolbarButton(cnt.uuid.BOQSOURCE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQSOURCE,app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCTURE_DESC_2)
     
        _common.assert_forNumericValues(cnt.uuid.BOQSOURCE, app.GridCells.PRICE_SMALL,CONTAINERS_QUOTE_BOQ_STRUCTURE.UNIT_RATE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQSOURCE,app.GridCells.BAS_UOM_FK,CONTAINERS_QUOTE_BOQ_STRUCTURE.UOM)
        _common.minimizeContainer(cnt.uuid.BOQSOURCE)
    })
   
});
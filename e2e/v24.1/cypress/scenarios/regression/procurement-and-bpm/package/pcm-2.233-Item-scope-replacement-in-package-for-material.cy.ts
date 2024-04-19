import { _common, _estimatePage, _package, _mainView, _modalView, _sidebar, _rfqPage, _saleContractPage, _materialPage, _procurementContractPage, _validate, _procurementConfig } from 'cypress/pages';
import { app, tile, cnt, btn, commonLocators, sidebar } from 'cypress/locators';
import { DataCells } from 'cypress/pages/interfaces';

const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS:DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE
let CONTAINER_COLUMNS_PACKAGE
let CONTAINER_COLUMNS_PACKAGE_ITEMS
let CONTAINERS_PACKAGE_ITEMS
let DJC_BUDGET_PARAMETERS:DataCells
let MODAL_GENERATE_BUDGET;
let MODAL_MESSAGES

ALLURE.epic('PROCUREMENT AND BPM');
ALLURE.feature('Package');
ALLURE.story('PCM- 2.233 | Item scope replacement in package for material');

describe('PCM- 2.233 | Item scope replacement in package for material', () => {

    before(function () {

        cy.fixture('pcm/pcm-2.233-Item-scope-replacement-in-package-for-material.json')
          .then((data) => {
            this.data = data;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                  [app.GridCells.CODE]: ESTIMATE_CODE,
                  [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                  [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                  [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }	
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS = {
                  [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                  [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
                  [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
            };
            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
            RESOURCE_PARAMETERS = {
                  [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                  [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
            };
          
            MODAL_CREATE_UPDATE_MATERIAL_PACKAGE=this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
    
            CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE


            CONTAINER_COLUMNS_PACKAGE_ITEMS=this.data.CONTAINER_COLUMNS.PACKAGE_ITEMS
    
            CONTAINERS_PACKAGE_ITEMS=this.data.CONTAINERS.PACKAGE_ITEMS

            MODAL_GENERATE_BUDGET = this.data.MODAL.GENERATE_BUDGET;
            DJC_BUDGET_PARAMETERS={
                [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]:MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE,
                [commonLocators.CommonLabels.BUDGET_FROM]:MODAL_GENERATE_BUDGET.BUDGET_FROM,
                [commonLocators.CommonLabels.X_FACTOR]:MODAL_GENERATE_BUDGET.X_FACTOR,
                [commonLocators.CommonKeys.INDEX]:MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE_INDEX,
                [commonLocators.CommonKeys.RADIO_INDEX]:MODAL_GENERATE_BUDGET.BUDGET_FROM_INDEX
            }

            MODAL_MESSAGES=this.data.MODAL.MESSAGES
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
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 	
           })
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Create new estimate and line Item', function () {
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

        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.waitForLoaderToDisappear()

        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });

    it('TC - Assign resource to the line item', function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
          _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
        _common.minimizeContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_budgetFromDJC_fromWizard(DJC_BUDGET_PARAMETERS)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION)
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.BUDGET,"LINE_ITEM_BUDGET")
    });

    it('TC - Create material package', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.MATERIAL_AND_COST_CODE,null,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.CONFIGURATION,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE);
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.setDefaultView(app.TabBar.PACKAGE)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
          _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER'));  
    });

    it('TC - Add an item to package in Items container', function () {
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.select_rowHasValue(cnt.uuid.PACKAGE, Cypress.env("PACKAGE_CODE_0"))
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_PACKAGE_ITEMS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_PACKAGE_ITEMS.itemno,CONTAINER_COLUMNS_PACKAGE_ITEMS.mdcmaterialfk,CONTAINER_COLUMNS_PACKAGE_ITEMS.quantity,CONTAINER_COLUMNS_PACKAGE_ITEMS.basuomfk,CONTAINER_COLUMNS_PACKAGE_ITEMS.price,CONTAINER_COLUMNS_PACKAGE_ITEMS.total,CONTAINER_COLUMNS_PACKAGE_ITEMS.prcitemstatusfk,CONTAINER_COLUMNS_PACKAGE_ITEMS.isdisabled], cnt.uuid.PACKAGEITEMS)
        });
        _common.maximizeContainer(cnt.uuid.PACKAGEITEMS)
        _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PACKAGEITEMS)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGEITEMS, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.CODE[1])
        _common.select_activeRowInContainer(cnt.uuid.PACKAGEITEMS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.select_activeRowInContainer(cnt.uuid.PACKAGEITEMS)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.QUANTITY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEM_ASSIGNMENT, app.FooterTab.ITEM_ASSIGNMENT, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ITEM_ASSIGNMENT)
        _validate.verify_recordNotPresentInContainer(cnt.uuid.ITEM_ASSIGNMENT, CONTAINERS_RESOURCE.CODE[1])
        _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 3);
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.ITEM_SCOPE_REPLACEMENT)
        _common.waitForLoaderToDisappear()
        _validate.validate_Text_message_In_PopUp(MODAL_MESSAGES.MESSAGE)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 3);
        });
        _common.select_rowHasValue(cnt.uuid.PACKAGEITEMS, CONTAINERS_RESOURCE.CODE[0])

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.ITEM_SCOPE_REPLACEMENT)
        _common.waitForLoaderToDisappear()
        _validate.verify_isButtonDisabled(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()

        _common.select_rowHasValue_fromModal(CONTAINERS_RESOURCE.CODE[1], 1)
        _common.set_cellCheckboxValue_fromModal(app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inActiveRow_fromModal(app.GridCells.BUDGET_TOTAL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PACKAGE_ITEMS.BUDGET)
        _common.select_rowHasValue_fromModal(CONTAINERS_RESOURCE.CODE[1], 1)
        //_validate.verify_isButtonDisabled(btn.ButtonText.OK)
        //_common.clickOn_modalButtonByClass(btn.ToolBar.ICO_RECALCULATE)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Verify Item Scope replacement in Package module', function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 3);
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
        _common.select_rowHasValue(cnt.uuid.PACKAGEITEMS, CONTAINERS_RESOURCE.CODE[0])
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.PACKAGEITEMS, app.GridCells.IS_DISABLED, commonLocators.CommonKeys.CHECK)
        _validate.verify_checkBoxDisabled_forActiveCell(cnt.uuid.PACKAGEITEMS, app.GridCells.IS_DISABLED)

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEM_ASSIGNMENT, app.FooterTab.ITEM_ASSIGNMENT, 2);
        })
        _common.clear_subContainerFilter(cnt.uuid.ITEM_ASSIGNMENT)
        _validate.verify_isRecordPresent(cnt.uuid.ITEM_ASSIGNMENT, CONTAINERS_RESOURCE.CODE[1])
    })
});

import { tile, app, cnt, sidebar, btn, commonLocators } from 'cypress/locators';
import Buttons from 'cypress/locators/buttons';
import { _boqPage, _common, _estimatePage, _mainView, _modalView, _package, _projectPage, _validate } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';
import 'cypress-iframe'

const allure = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_1 = 'LI-DESC_1-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_2 = 'LI-DESC_2-' + Cypress._.random(0, 999);
const PROJECT_NO="PR" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
let CLERK = "HS"

let GC_ALLOCATION_FOR_RESOURCE
let COST_TOTAL_OF_RESOURCE

let ESTIMATE_PARAMETERS: DataCells,
    LINE_ITEMS_PARAMETERS: DataCells,
    LINE_ITEMS_PARAMETERS_2: DataCells,
    RESOURCE_PARAMETERS: DataCells,
    UPDATE_ESTIMATE_PARAMETER: DataCells,
    RULE_PARAMETER: DataCells,
    RESOURCE_PARAMETERS_1: DataCells,
    PROJECTS_PARAMETERS:DataCells

let CONTAINERS_ESTIMATE,
    CONTAINERS_LINE_ITEM,
    CONTAINERS_RESOURCE,
    CONTAINER_COLUMNS_ESTIMATE,
    CONTAINER_COLUMNS_LINE_ITEM,
    CONTAINER_COLUMNS_RESOURCE,
    MODAL_RULE_PARAMETER,
    MODAL_UPDATE_ESTIMATE_WIZARD

allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 1.38 | allowance-of-estimated-general-cost-allowance-102');

describe('EST- 1.38 | allowance-of-estimated-general-cost-allowance-102', () => {
    before(function () {
        cy.fixture('estimate/est-1.38-allowance-of-estimated-general-cost-allowance-102.json')
            .then((data) => {
                this.data = data
                CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
                CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
                CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
                CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
                CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
                MODAL_RULE_PARAMETER = this.data.MODAL.RULE_PARAMETER
                MODAL_UPDATE_ESTIMATE_WIZARD = this.data.MODAL.UPDATE_ESTIMATE_WIZARD
                PROJECTS_PARAMETERS={
                    [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
                    [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
                    [commonLocators.CommonLabels.CLERK]:CLERK
                }
                ESTIMATE_PARAMETERS = {
                    [app.GridCells.CODE]: ESTIMATE_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                    [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                    [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
                }

                LINE_ITEMS_PARAMETERS = {
                    [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_1,
                    //[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                }
                LINE_ITEMS_PARAMETERS_2 = {
                    [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_2,
                    //[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                }
                RESOURCE_PARAMETERS = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY[0],
                }
                RESOURCE_PARAMETERS_1 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[1],
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY[1],
                }
                UPDATE_ESTIMATE_PARAMETER = {
                    [commonLocators.CommonKeys.CHECKBOX]: MODAL_UPDATE_ESTIMATE_WIZARD
                }
                RULE_PARAMETER = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.PARAMETERS],
                    [commonLocators.CommonElements.TD_HEADER_STYLE]: commonLocators.CommonElements.TD_HEADER_STYLE,
                    [commonLocators.CommonLabels.GA_2]: MODAL_RULE_PARAMETER.GA_2,
                    [commonLocators.CommonLabels.RP_2]: MODAL_RULE_PARAMETER.RP_2
                }
            })
            .then(() => {
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
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
                _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
            })
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Create new estimate header', function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _estimatePage.textOfEstimateCode();
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    });

    it('TC - Create new line item and Resource record', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
        });
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEMS_PARAMETERS)
        cy.SAVE();
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
        });
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL).then(($ele) => {
            GC_ALLOCATION_FOR_RESOURCE = parseFloat($ele.text())
        })
        cy.wait(1000)
        _common.set_cellCheckboxValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.IS_GC, commonLocators.CommonKeys.CHECK)
        cy.SAVE();
    });

    it('TC - Create new line item and Resource record', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEMS_PARAMETERS_2)
        cy.SAVE();
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
        });
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_1);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL).then(($ele) => {
            COST_TOTAL_OF_RESOURCE = parseFloat($ele.text())
        })
    });

    it('TC - Verify General Cost from Line item gets updated in Parameter popup in Root Assignment container', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ROOT_ASSIGNMENT, app.FooterTab.ROOT_ASSIGNMENT, 2);
            _common.select_rowInContainer(cnt.uuid.ROOT_ASSIGNMENT)
            _common.lookUpButtonInCell(cnt.uuid.ROOT_ASSIGNMENT, app.GridCells.RULE, Buttons.IconButtons.BLOCK_IMAGE, 0)
            _common.clickOn_modalFooterButton(Buttons.ButtonText.REFRESH)
            _common.clickOn_cellHasValue_fromModal(app.GridCells.CODE, "102")
            _common.clickOn_modalFooterButton(Buttons.ButtonText.OK)
            _common.clickOn_activeRowCell(cnt.uuid.ROOT_ASSIGNMENT, app.GridCells.PARAM)
            cy.wait(4000) // required wait to load page
            _estimatePage.assignParamater_valuesToRules_inIframe(RULE_PARAMETER)
            cy.wait(2000) // required wait to load page
            _common.waitForLoaderToDisappear()
        })
    });

    it('TC - Verify Estimate gets updated', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE)
        _common.waitForLoaderToDisappear()
        _estimatePage.update_estimate_fromWizard(UPDATE_ESTIMATE_PARAMETER);
        cy.wait(2000) // required wait to load page
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RULE_EXECUTION_OUTPUT, app.FooterTab.RULE_EXECUTION_OUTPUT, 1);
        });
        _common.waitForProgressBarToLoad()
        cy.wait(2000) // required wait to load page
    });

    it('TC - Verify Allowances for Resources of Line items get Calculated in Resources container of Estimate module, [G A Allowance for Resources = (GC allocation for Resource + Cost total of Resource) x Percentage G A specified in Parameter popup, R P = (GC allocation for Resource + Cost total of Resource) x Percentage R P specified in Parameter popup]', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 1);
            _common.clickOn_cellHasValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LINE_ITEM_DESCRIPTION_2)
            _common.clickOn_cellHasValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LINE_ITEM_DESCRIPTION_1)
            _common.clickOn_cellHasValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LINE_ITEM_DESCRIPTION_2)
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            let G_A_Allowance_For_Resources: any = ((GC_ALLOCATION_FOR_RESOURCE + COST_TOTAL_OF_RESOURCE)* MODAL_RULE_PARAMETER.GA_2) / 100
            _common.select_rowHasValue(cnt.uuid.RESOURCES, "GA_2")
            _common.assert_forNumericValues(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL, G_A_Allowance_For_Resources.toString())
            let R_P_Allowance_For_Resources: any = ((GC_ALLOCATION_FOR_RESOURCE +COST_TOTAL_OF_RESOURCE)  * MODAL_RULE_PARAMETER.RP_2) / 100
            _common.select_rowHasValue(cnt.uuid.RESOURCES, "RP_2")
            _common.assert_forNumericValues(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL, R_P_Allowance_For_Resources.toString())
        });
    });

    it('TC - Verify Grand Total for line item is summation of Total Cost of Resource and generated Allowances', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.perform_additionOfCellData(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.clickOn_cellHasValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LINE_ITEM_DESCRIPTION_2)
            _common.saveNumericCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.GRAND_TOTAL, "GRAND_TOTAL")
            cy.wait(1000).then(() => {
                expect(Cypress.env("GRAND_TOTAL")).to.equal(parseInt(Cypress.env("AdditionOfColumnValues")))
            });
        })
    });
});

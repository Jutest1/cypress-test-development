import { app, tile, sidebar, commonLocators, cnt, btn } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _validate, _materialPage, _ticketSystemPage, _businessPartnerPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const MATCAT_CODE = "CATALOG-" + Cypress._.random(0, 999);
const MATCAT_CODE2 = "CATALOG1-" + Cypress._.random(0, 9999);
const MATCAT_DESC = "CATALOG_DESC-" + Cypress._.random(0, 999);
const MATCAT_DESC2 = "CATALOG_DESC1-" + Cypress._.random(0, 9999);
const MATGRP_CODE = "GROUP" + Cypress._.random(0, 999);
const MATGRP_CODE2 = "GROUP1" + Cypress._.random(0, 9999);
const MATGRP_DESC = "GROUP-DESC-" + Cypress._.random(0, 999);
const MATGRP_DESC2 = "GROUP-DESC1-" + Cypress._.random(0, 9999);
const MAT_CODE = "MAT-CODE" + Cypress._.random(0, 999);
const MAT_CODE2 = "MAT-CODE1" + Cypress._.random(0, 9999);
const MAT_DESC = "MAT-DESC" + Cypress._.random(0, 999);
const MAT_DESC2 = "MAT-DESC1" + Cypress._.random(0, 9999);

let CONTAINERS_COMPANIES, CONTAINERS_CLERKS, CONTAINERS_DATA_TYPES, CONTAINERS_DATA_RECORDS, CONTAINERS_ROLES, CONTAINERS_RIGHTS, CONTAINERS_MATERIAL_CATALOG, CONTAINERS_MATERIAL_GROUP, CONTAINERS_MATERIAL_RECORDS, CONTAINERS_PRICE_CONDITION, CONTAINERS_CURRENCY, CONTAINERS_CART;

let CONTAINER_COLUMNS_COMPANIES, CONTAINER_COLUMNS_CLERKS, CONTAINER_COLUMNS_MATERIAL_CATALOG, CONTAINER_COLUMNS_MATERIAL_GROUP, CONTAINER_COLUMNS_ROLES, CONTAINER_COLUMNS_RIGHTS, CONTAINER_COLUMNS_MATERIAL_RECORDS;

let MATERIAL_CATALOGS_PARAMETER: DataCells, MATERIAL_CATALOGS_PARAMETER_2: DataCells, MATERIAL_GROUP_PARAMETER: DataCells, MATERIAL_GROUP_PARAMETER_2: DataCells, MATERIAL_RECORD_PARAMETER: DataCells, MATERIAL_RECORD_PARAMETER_2: DataCells, BUSINESS_PARTNER_PARAMETER: DataCells;

let CLERK_PARAMETER: DataCells;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.211 | Check cart with respect to prices and quantities");

describe("PCM- 2.211 | Check cart with respect to prices and quantities", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.211-check-cart-with-respect-to-prices-and-quantities.json").then((data) => {
            this.data = data
            CONTAINERS_COMPANIES = this.data.CONTAINERS.COMPANIES
            CONTAINER_COLUMNS_COMPANIES = this.data.CONTAINER_COLUMNS.COMPANIES
            CONTAINERS_CLERKS = this.data.CONTAINERS.CLERKS
            CONTAINER_COLUMNS_CLERKS = this.data.CONTAINER_COLUMNS.CLERKS
            CLERK_PARAMETER = {
                [app.GridCells.CODE]: CONTAINERS_CLERKS.CODE
            }
            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES
            CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
            CONTAINERS_ROLES = this.data.CONTAINERS.ROLES
            CONTAINER_COLUMNS_ROLES = this.data.CONTAINER_COLUMNS.ROLES
            CONTAINERS_RIGHTS = this.data.CONTAINERS.RIGHTS
            CONTAINER_COLUMNS_RIGHTS = this.data.CONTAINER_COLUMNS.RIGHTS
            CONTAINERS_MATERIAL_CATALOG = this.data.CONTAINERS.MATERIAL_CATALOG
            CONTAINER_COLUMNS_MATERIAL_CATALOG = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
            MATERIAL_CATALOGS_PARAMETER = {
                [app.GridCells.CODE]: MATCAT_CODE,
                [app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_MATERIAL_CATALOG.BUSINESS_PARTNER[0],
                [app.GridCells.DESCRIPTION_INFO]: MATCAT_DESC,
                [app.GridCells.IS_TICKET_SYSTEM]: CommonLocators.CommonKeys.CHECK
            }
            MATERIAL_CATALOGS_PARAMETER_2 = {
                [app.GridCells.CODE]: MATCAT_CODE2,
                [app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_MATERIAL_CATALOG.BUSINESS_PARTNER[1],
                [app.GridCells.DESCRIPTION_INFO]: MATCAT_DESC2,
                [app.GridCells.IS_TICKET_SYSTEM]: CommonLocators.CommonKeys.CHECK
            }
            CONTAINERS_MATERIAL_GROUP = this.data.CONTAINERS.MATERIAL_GROUP
            CONTAINER_COLUMNS_MATERIAL_GROUP = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
            MATERIAL_GROUP_PARAMETER = {
                [app.GridCells.CODE]: MATGRP_CODE,
                [app.GridCells.DESCRIPTION_INFO]: MATGRP_DESC,
                [app.GridCells.PRC_STRUCTURE_FK]: CONTAINERS_MATERIAL_GROUP.PROCUREMENT_STRUCTURE
            }
            MATERIAL_GROUP_PARAMETER_2 = {
                [app.GridCells.CODE]: MATGRP_CODE2,
                [app.GridCells.DESCRIPTION_INFO]: MATGRP_DESC2,
                [app.GridCells.PRC_STRUCTURE_FK]: CONTAINERS_MATERIAL_GROUP.PROCUREMENT_STRUCTURE
            }
            CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS
            CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS
            MATERIAL_RECORD_PARAMETER = {
                [app.GridCells.CODE]: MAT_CODE,
                [app.GridCells.DESCRIPTION_INFO_1]: MAT_DESC,
                [app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORDS.UOM[0],
                [app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORDS.RETAIL_PRICE[0],
                [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORDS.LIST_PRICE[0],
                [app.GridCells.BAS_CURRENCY_FK]: CONTAINERS_MATERIAL_RECORDS.CURRENCY[0]
            }
            MATERIAL_RECORD_PARAMETER_2 = {
                [app.GridCells.CODE]: MAT_CODE2,
                [app.GridCells.DESCRIPTION_INFO_1]: MAT_DESC2,
                [app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORDS.UOM[0],
                [app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORDS.RETAIL_PRICE[0],
                [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORDS.LIST_PRICE[0],
                [app.GridCells.BAS_CURRENCY_FK]: CONTAINERS_MATERIAL_RECORDS.CURRENCY[0]
            }
            CONTAINERS_PRICE_CONDITION = this.data.CONTAINERS.PRICE_CONDITION
            CONTAINERS_CURRENCY = this.data.CONTAINERS.CURRENCY
            CONTAINERS_CART = this.data.CONTAINERS.CART
            BUSINESS_PARTNER_PARAMETER = {
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: [CONTAINERS_CART.BUSINESS_PARTNER],
            };
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        });
    })

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Assign logged-in user a clerk", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COMPANY)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.COMPANY).then(() => {
            _common.setDefaultView(app.TabBar.COMPANY)
            _common.select_tabFromFooter(cnt.uuid.COMPANIES, app.FooterTab.COMPANIES, 0);
            _common.setup_gridLayout(cnt.uuid.COMPANIES, CONTAINER_COLUMNS_COMPANIES)
        });
        cy.REFRESH_CONTAINER()
        _common.maximizeContainer(cnt.uuid.COMPANIES)
        _common.search_inSubContainer(cnt.uuid.COMPANIES, CONTAINERS_COMPANIES.COMPANY_NAME)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COMPANIES, app.GridCells.COMPANY_NAME_SMALL, CONTAINERS_COMPANIES.COMPANY_NAME)
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.COMPANIES, CommonLocators.CommonKeys.CLERK)
        _common.openTab(app.TabBar.CLERK).then(() => {
            _common.setDefaultView(app.TabBar.CLERK)
            _common.select_tabFromFooter(cnt.uuid.CLERKS, app.FooterTab.CLERKS, 0);
            _common.setup_gridLayout(cnt.uuid.CLERKS, CONTAINER_COLUMNS_CLERKS)
        });
        _common.maximizeContainer(cnt.uuid.CLERKS)
        cy.REFRESH_CONTAINER()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CLERKS, app.GridCells.CODE, CONTAINERS_CLERKS.CODE)
        _common.assign_clerkForLoggedInUser(cnt.uuid.CLERKS, CLERK_PARAMETER)
        cy.SAVE()
    });

    it('TC- Framework agreements in customizing module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 2)
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
        cy.REFRESH_CONTAINER();
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.PRICE_CONDITION_TYPE);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, CONTAINERS_DATA_TYPES.PRICE_CONDITION_TYPE);
        cy.SAVE();
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2)
        });
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_DATA_RECORDS.COPPER_SURCHARGE);
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_SHOW_IN_TICKET_SYSTEM, CommonLocators.CommonKeys.CHECK)
        cy.SAVE();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ROLES)
        _common.openTab(app.TabBar.ROLES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ROLE, app.FooterTab.RIGHTS, 3)
            _common.setup_gridLayout(cnt.uuid.ROLE, CONTAINER_COLUMNS_ROLES)
        })
        _common.search_inSubContainer(cnt.uuid.ROLE, CONTAINERS_ROLES.ADMIN)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ROLE, app.GridCells.DESCRIPTION, CONTAINERS_ROLES.ADMIN)
        _common.openTab(app.TabBar.ROLES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ROLE_TO_RIGHTS, app.FooterTab.RIGHTS, 3)
            _common.setup_gridLayout(cnt.uuid.ROLE_TO_RIGHTS, CONTAINER_COLUMNS_RIGHTS)
        })
        _common.search_inSubContainer(cnt.uuid.ROLE_TO_RIGHTS, CONTAINERS_RIGHTS.SHOW_PRICE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ROLE_TO_RIGHTS, app.GridCells.NAME, CONTAINERS_RIGHTS.SHOW_PRICE)
        _common.set_cellCheckboxValue(cnt.uuid.ROLE_TO_RIGHTS, app.GridCells.READ, CommonLocators.CommonKeys.CHECK)
        cy.SAVE()
    });

    it("TC - Create material catalogue", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG)
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG)
            _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS);
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOGS_PARAMETER);
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS);
    });

    it('TC- Create material group', function () {
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUP)
        })
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_GROUP_PARAMETER);
        cy.SAVE()
    });

    it("TC - Create 2nd material catalogue", function () {
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS);
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOGS_PARAMETER_2);
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS);
    });

    it('TC- Create material group for 2nd material catalog', function () {
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP)
        })
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_GROUP_PARAMETER_2);
        cy.SAVE()
    });

    it('TC- Create new Material with price condition in first material', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATCAT_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
            _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        });
        _common.maximizeContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_PARAMETER)
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_PRICE_CONDITION, app.FooterTab.PRICE_CONDITION, 1);
            _common.clear_subContainerFilter(cnt.uuid.MATERIAL_PRICE_CONDITION)
        });
        _common.maximizeContainer(cnt.uuid.MATERIAL_PRICE_CONDITION)
        _common.create_newRecord(cnt.uuid.MATERIAL_PRICE_CONDITION)
        _common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_PRICE_CONDITION, app.GridCells.PRC_PRICE_CONDITION_TYPE_FK, CommonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_CONDITION.TYPE)
        _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_PRICE_CONDITION, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_CONDITION.VALUE)
        cy.SAVE()
        _common.getText_fromCell(cnt.uuid.MATERIAL_PRICE_CONDITION, app.GridCells.CONDITION_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("priceConditionTotal", parseFloat($ele1.text()))
            cy.log(Cypress.env("priceConditionTotal"))
        })
        cy.wait(1000)
        _common.minimizeContainer(cnt.uuid.MATERIAL_PRICE_CONDITION)
        cy.wait(2000)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        cy.wait(1000)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATCAT_CODE2)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)
        _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 1);
        _common.maximizeContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_PARAMETER_2)
        cy.SAVE()
        cy.wait(2000)
        _common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS)
    });

    it('TC- Create currency conversion of EUR to INR', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CURRENCY)
        _common.openTab(app.TabBar.CURRENCY).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HOME_CURRENCY, app.FooterTab.HOME_CURRENCY, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.HOME_CURRENCY)
        _common.search_inSubContainer(cnt.uuid.HOME_CURRENCY, CONTAINERS_CURRENCY.HOME_CURRENCY)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.HOME_CURRENCY, app.GridCells.DESCRIPTION_INFO, CONTAINERS_CURRENCY.HOME_CURRENCY)
        _common.openTab(app.TabBar.CURRENCY).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CURRENCY_CONVERSION, app.FooterTab.CURRENCY_CONVERSION, 1)
        })
        _common.clear_subContainerFilter(cnt.uuid.CURRENCY_CONVERSION)
        _common.create_newRecordInCurrencyConversion_ifRecordNotExists(cnt.uuid.CURRENCY_CONVERSION, app.GridCells.CURRENCY_FOREIGN_FK, CONTAINERS_CURRENCY.FOREIGN_CURRENCY, CONTAINERS_CURRENCY.RATE[0], 0)
        cy.SAVE()
        _common.openTab(app.TabBar.CURRENCY).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EXCHANGE_RATES, app.FooterTab.EXCHANGE_RATES, 2)
        })
        _common.clear_subContainerFilter(cnt.uuid.EXCHANGE_RATES)
        _common.saveCellDataToEnv(cnt.uuid.EXCHANGE_RATES, app.GridCells.RATE, "Exchange_Rate")
    });

    it('TC- Verify quantity comes from search item when click to add cart button', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TICKET_SYSTEM)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CART).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS, 0)
        })
        _common.clickOn_containerFooterButton(cnt.uuid.CART_ITEMS, app.ContainerElements.CART_FOOT_BUTTON, btn.IconButtons.ICO_CART_ITEM_DELETE)
        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
        })
        cy.REFRESH_SELECTED_ENTITIES()
        _common.waitForLoaderToDisappear()
        _ticketSystemPage.enterRecord_toAddMaterialInCart(cnt.uuid.COMMODITY_SEARCH, [MAT_CODE], [CONTAINERS_CART.QUANTITY])
        _common.openTab(app.TabBar.CART).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS)
        })
        _validate.verify_cartInputFields(cnt.uuid.CART_ITEMS, app.RowInputClass.COMMODITY_ROW, app.InputFields.QUANTITY_INPUT, 0, CONTAINERS_CART.QUANTITY)
    });

    it('TC- Verify the total should convert to company currency ', function () {
        _common.getText_ofCartField(cnt.uuid.CART_ITEMS, app.RowInputClass.CART_ITEM_SUBTOTAL, app.ContainerElements.NG_BINDING, 2, "SubTotal")
        cy.wait(500).then(() => {
            var calculatedTotal = (Cypress.env("SubTotal") / Cypress.env("Exchange_Rate")).toFixed(2)
            _common.getText_ofCartField(cnt.uuid.CART_ITEMS, app.RowInputClass.CART_ITEM_TOTAL, app.ContainerElements.NG_BINDING, 4, "Total")
            cy.wait(500).then(() => {
                expect(parseFloat(Cypress.env("Total"))).to.equals(parseFloat(calculatedTotal))
            })
        })
    });

    it('TC- Verify the subtotal is (price+extra)*quanttiy, it is mateiral currency', function () {
        _common.getText_ofCartField(cnt.uuid.CART_ITEMS, app.RowInputClass.COMMODITY_ROW_PRICE, app.ContainerElements.NG_BINDING, 1, "Materialprice")
        cy.wait(500).then(() => {
            var priceplusExtra = parseFloat("3.91") + parseFloat(Cypress.env("Materialprice"))
            var subTotalwithcopperSurcharge = priceplusExtra * parseFloat(CONTAINERS_CART.QUANTITY)
            _common.getText_ofCartField(cnt.uuid.CART_ITEMS, app.RowInputClass.CART_ITEM_SUBTOTAL, app.ContainerElements.NG_BINDING, 2, "subTotalwithcopperSurcharge")
            cy.wait(500).then(() => {
                expect(Cypress.env("subTotalwithcopperSurcharge")).to.equals(subTotalwithcopperSurcharge)

            })
        })
    });

    it('TC- Verify the delivey option for price condition which had been check, then it will use to calculate', function () {
        _ticketSystemPage.click_onCartCheckbox(cnt.uuid.CART_ITEMS, app.RowInputClass.COMMODITY_ROW_DELIVERY_CONTENT, 0, CommonLocators.CommonKeys.UNCHECK)
        _common.getText_ofCartField(cnt.uuid.CART_ITEMS, app.RowInputClass.COMMODITY_ROW_PRICE, app.ContainerElements.NG_BINDING, 1, "Materialprice")
        _common.getText_ofCartField(cnt.uuid.CART_ITEMS, app.RowInputClass.CART_ITEM_SUBTOTAL, app.ContainerElements.NG_BINDING, 2, "subTotalwithcopperSurcharge")
        cy.wait(500).then(() => {
            expect(Cypress.env("subTotalwithcopperSurcharge")).to.equals(Cypress.env("Materialprice"))
        })
    })

    it('TC- Verify the vendor will default to mateiral catalog business partner ', function () {
        _common.getText_ofCartFieldWithInvoke(cnt.uuid.CART_ITEMS, app.InputFields.FLEX_BOX, app.InputFields.INPUT_GROUP_CONTENT, 0)
        cy.wait(500).then(() => {
            expect(Cypress.env("stringVariable")).to.equals(CONTAINERS_CART.VENDOR[0])
        })
    });

    it('TC- Verify click button in vendor, it allows to select a business partner ', function () {
        _ticketSystemPage.click_oncartBusinessPartnerLookUp(cnt.uuid.CART_ITEMS, app.DataNGLocator.ITEM_BUSINESSPARTNER_FK, app.InputFields.ICO_INPUT_LOOKUP, 0)
        _businessPartnerPage.enterRecord_toAddBusinessPartnerUsingLookUp(BUSINESS_PARTNER_PARAMETER)
        _common.openTab(app.TabBar.CART).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS, 0)
        })
        _common.getText_ofCartFieldWithInvoke(cnt.uuid.CART_ITEMS, app.InputFields.FLEX_BOX, app.InputFields.INPUT_GROUP_CONTENT, 0)
        cy.wait(500).then(() => {
            expect(Cypress.env("stringVariable")).to.equals(CONTAINERS_CART.BUSINESS_PARTNER)
        })
    })

    it('TC- Verify the configuration will filter according procurement type', function () {
        _ticketSystemPage.set_cartViewMaterialsHeader({ [commonLocators.CommonLabels.PROCUREMENT_TYPE]: CONTAINERS_CART.PROCUREMENT_TYPE })
        _common.getText_ofCartFieldWithInvoke(cnt.uuid.CART_ITEMS, app.InputFields.FLEX_BOX, app.InputFields.INPUT_GROUP_CONTENT, 1, "Configuration")
        cy.wait(500).then(() => {
            expect(Cypress.env("Configuration")).to.equals(CONTAINERS_CART.CONFIGURATION)
        })
    });

    it('TC- Verify click merge selected catalog then select items will become in same group', function () {
        _common.openTab(app.TabBar.SEARCH).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH, 0)
        })
        _ticketSystemPage.enterRecord_toAddMaterialInCart(cnt.uuid.COMMODITY_SEARCH, [MAT_CODE2], [CONTAINERS_CART.QUANTITY])
        _common.openTab(app.TabBar.CART).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS, 0)
        })
        _common.clickOn_containerFooterButton(cnt.uuid.CART_ITEMS, app.ContainerElements.CART_FOOT_BUTTON, btn.IconButtons.ICO_MERGE)
        _common.getText_ofCartFieldWithInvoke(cnt.uuid.CART_ITEMS, app.InputFields.FLEX_BOX, app.InputFields.INPUT_GROUP_CONTENT, 0)
        cy.wait(500).then(() => {
            expect(Cypress.env("stringVariable")).to.equals(CONTAINERS_CART.VENDOR[1])
        });
    })

    it('TC- Verify if access right show price does not allow to read, then it will not show price in search result', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ROLES)

        _common.openTab(app.TabBar.ROLES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ROLE, app.FooterTab.ROLES, 0)
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ROLE, app.GridCells.DESCRIPTION, CONTAINERS_RIGHTS.ROLES_DESCRIPTION)

        _common.openTab(app.TabBar.ROLES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ROLE_TO_RIGHTS, app.FooterTab.RIGHTS, 1)
        })
        _common.search_inSubContainer(cnt.uuid.ROLE_TO_RIGHTS, CONTAINERS_RIGHTS.SHOW_PRICE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ROLE_TO_RIGHTS, app.GridCells.NAME, CONTAINERS_RIGHTS.SHOW_PRICE)
        _common.set_cellCheckboxValue(cnt.uuid.ROLE_TO_RIGHTS, app.GridCells.READ, CommonLocators.CommonKeys.UNCHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TICKET_SYSTEM)
        _common.openTab(app.TabBar.CART).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS, 0)
        })
        _common.clickOn_containerFooterButton(cnt.uuid.CART_ITEMS, app.ContainerElements.CART_FOOT_BUTTON, Buttons.IconButtons.ICO_CART_ITEM_DELETE)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.SEARCH).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH, 0)
        })
        _ticketSystemPage.enterRecord_toAddMaterialInCart(cnt.uuid.COMMODITY_SEARCH, [MAT_CODE], [CONTAINERS_CART.QUANTITY])
        _common.openTab(app.TabBar.CART).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS, 0)
        })
        _common.getText_ofCartField(cnt.uuid.CART_ITEMS, app.RowInputClass.CART_ITEM_SUBTOTAL, app.ContainerElements.NG_BINDING, 2, "subTotalafterRemoveRights")
        cy.wait(500).then(() => {
            expect(Cypress.env("subTotalafterRemoveRights")).to.equals(parseFloat("0.00"))
        })
        _common.waitForLoaderToDisappear()
    });

    it('TC- Verify create place order, it poped up dialog and set some mesasge, click ok, it will create contract or requistion', function () {
        _common.openTab(app.TabBar.CART).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS, 0)
        })
        _ticketSystemPage.enterRecord_toPlaceOrderForRequisitionFromCart(cnt.uuid.CART_ITEMS)
        _common.edit_dropDownWithInput_fromModal(CommonLocators.CommonLabels.PROJECT, Cypress.env("PROJECT_NUMBER"), CommonLocators.CommonKeys.GRID)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(Buttons.ButtonText.OK)
        _common.clickOn_cellHasValueWithIndex_fromModal(app.GridCells.PROJECT_ID, Cypress.env("PROJECT_NUMBER"), 0)
        _common.getText_fromCell_fromModal(app.GridCells.DESCRIPTION).then(($desc) => {
            Cypress.env("reqDescription", $desc.text())
        })
        _common.clickOn_modalFooterButton("Requisition")
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAIN).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 0)
        })
        cy.wait(500).then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.DESCRIPTION, Cypress.env("reqDescription"))
        })
    });

    it('TC- Verify click empty buttom, it will clear all records in cart', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TICKET_SYSTEM)
        _common.openTab(app.TabBar.CART).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS, 0)
        })
        _common.clickOn_containerFooterButton(cnt.uuid.CART_ITEMS, app.ContainerElements.CART_FOOT_BUTTON, Buttons.IconButtons.ICO_CART_ITEM_DELETE)
        _common.getText_ofCartField(cnt.uuid.CART_ITEMS, app.RowInputClass.CART_ITEM_TOTAL, app.ContainerElements.NG_BINDING, 4, "Total")
        cy.wait(500).then(() => {
            expect(parseFloat(Cypress.env("Total"))).to.equals(0.00)
        })
    });

    it('Check show price R checkbox', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ROLES)
        _common.openTab(app.TabBar.ROLES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ROLE, app.FooterTab.ROLES, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.ROLE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ROLE, app.GridCells.DESCRIPTION, CONTAINERS_RIGHTS.ROLES_DESCRIPTION9)
        _common.openTab(app.TabBar.ROLES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ROLE_TO_RIGHTS, app.FooterTab.RIGHTS, 1)
        })
        _common.search_inSubContainer(cnt.uuid.ROLE_TO_RIGHTS, CONTAINERS_RIGHTS.SHOW_PRICE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ROLE_TO_RIGHTS, app.GridCells.NAME, CONTAINERS_RIGHTS.SHOW_PRICE)
        _common.set_cellCheckboxValue(cnt.uuid.ROLE_TO_RIGHTS, app.GridCells.READ, CommonLocators.CommonKeys.CHECK)
        cy.SAVE()
    })

})
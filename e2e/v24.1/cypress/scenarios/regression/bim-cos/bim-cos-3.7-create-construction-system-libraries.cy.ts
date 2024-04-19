import { tile, sidebar, commonLocators, app, cnt } from "cypress/locators";
import { _common } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface();
const GROUP_CODE = '11' + Cypress._.random(0, 999);
const LIB_CODE = '22' + Cypress._.random(0, 999);
const GROUP_DESC = 'GR' + Cypress._.random(0, 999);
const LIB_DESC = 'LIB' + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_CONSTRUCTION_SYSTEM_GROUP;
let CONTAINER_COLUMNS_CONSTRUCTION_SYSTEM_LIBRARY;

ALLURE.epic("BIM-COS");
ALLURE.feature("Construction system Libraries");
ALLURE.story("BIM/COS | 3.7 Create Construction system Libraries ");

describe("BIM/COS | 3.7 Create Construction system Libraries", () => {

    before(function () {

        cy.fixture("bim-cos/bim-cos-3.7-create-construction-system-libraries.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_CONSTRUCTION_SYSTEM_GROUP = this.data.CONTAINER_COLUMNS.CONSTRUCTION_SYSTEM_GROUP
            CONTAINER_COLUMNS_CONSTRUCTION_SYSTEM_LIBRARY = this.data.CONTAINER_COLUMNS.CONSTRUCTION_SYSTEM_LIBRARY

        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
            _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.CONSTRUCTION_SYSTEM_MASTER)
        })
    });

    after(() => {
        cy.LOGOUT();
    })

        it("TC - Create a Construction system group record.", function () {
            _common.openTab(app.TabBar.COS_MASTER).then(() => {
                _common.setDefaultView(app.TabBar.COS_MASTER)
                _common.select_tabFromFooter(cnt.uuid.CONSTRUCTION_SYSTEM_GROUP, app.FooterTab.CONSTRUCTION_SYSTEM_GROUP, 0);
                _common.setup_gridLayout(cnt.uuid.CONSTRUCTION_SYSTEM_GROUP, CONTAINER_COLUMNS_CONSTRUCTION_SYSTEM_GROUP)
            });
            _common.clear_subContainerFilter(cnt.uuid.CONSTRUCTION_SYSTEM_GROUP)
            _common.create_newRecord(cnt.uuid.CONSTRUCTION_SYSTEM_GROUP, 0)
            _common.enterRecord_inNewRow(cnt.uuid.CONSTRUCTION_SYSTEM_GROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, GROUP_CODE)
            _common.enterRecord_inNewRow(cnt.uuid.CONSTRUCTION_SYSTEM_GROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, GROUP_DESC)
            cy.SAVE()
            _common.toggle_radioFiledInContainer(commonLocators.CommonKeys.SELECT_RADIO_BUTTON, cnt.uuid.CONSTRUCTION_SYSTEM_GROUP, app.GridCells.MARKER)

        })

        it("TC - Add new record in Construction system libraries.", function () {
            _common.openTab(app.TabBar.COS_MASTER).then(() => {
                _common.select_tabFromFooter(cnt.uuid.CONSTRUCTION_SYSTEM_LIBRARIES_BIM, app.FooterTab.CONSTRUCTION_SYSTEM_LIBRARIES, 1);
                _common.setup_gridLayout(cnt.uuid.CONSTRUCTION_SYSTEM_LIBRARIES_BIM, CONTAINER_COLUMNS_CONSTRUCTION_SYSTEM_LIBRARY)
            });
            _common.clear_subContainerFilter(cnt.uuid.CONSTRUCTION_SYSTEM_LIBRARIES_BIM)
            _common.create_newRecord(cnt.uuid.CONSTRUCTION_SYSTEM_LIBRARIES_BIM, 1)
            _common.enterRecord_inNewRow(cnt.uuid.CONSTRUCTION_SYSTEM_LIBRARIES_BIM, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, LIB_CODE)
            _common.enterRecord_inNewRow(cnt.uuid.CONSTRUCTION_SYSTEM_LIBRARIES_BIM, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, LIB_DESC)
            cy.SAVE()
        })

        it("TC - Verify created record in Construction system libraries.", function () {
            _common.select_rowHasValue(cnt.uuid.CONSTRUCTION_SYSTEM_LIBRARIES_BIM, LIB_CODE)
            _common.assert_activeRow_cellDataByContent_inContainer(cnt.uuid.CONSTRUCTION_SYSTEM_LIBRARIES_BIM, app.GridCells.CONSTRUCTION_LIBRARY_GROUP, GROUP_DESC)

        })

    })

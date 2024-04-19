import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _projectPage, _businessPartnerPage, _materialPage } from "cypress/pages";
import { app, cnt, tile } from "cypress/locators";

const allure = Cypress.Allure.reporter.getInterface()
const MATGRPSTRUCT = "M";
const UOM = "BAGS";
const MATERIALCATCODE = "MAT-CAT-" + Cypress._.random(0, 999);
const MATERIALCATDESC = "MAT-CATDESC-" + Cypress._.random(0, 999);
const MATERIALGRPCODE1 = "MAT-GRP-" + Cypress._.random(0, 999);
const MATERIALGRPDESC1 = "MAT-GRPDESC-" + Cypress._.random(0, 999);
const MATERIALGRPCODE2 = "MAT-GRP-" + Cypress._.random(0, 999);
const MATERIALGRPDESC2 = "MAT-GRPDESC-" + Cypress._.random(0, 999);
const MATERIALRECCODE = "MAT-REC-" + Cypress._.random(0, 999);
const MATERIALRECDESC = "MAT-RECDESC-" + Cypress._.random(0, 999);
const MATERIALRECCODE1 = "MAT-REC-" + Cypress._.random(0, 999);
const MATERIALRECDESC1 = "MAT-RECDESC-" + Cypress._.random(0, 999);

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.143 | Use filters Material Catalog and Material Group")
describe("PCM- 2.143 | Use filters Material Catalog and Material Group", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-2.143-use-filters-material-catalog-and-material-group.json").then((data) => {
            this.data = data
        })
    })
    before(function () {
        cy.clearAllLocalStorage()
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("pcm/pcm-2.143-use-filters-material-catalog-and-material-group.json").then((data) => {
            this.data = data
            const SIDEBARACTION = this.data.sidebarInputs.sidebar
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.tabBar.project).then(() => {
                _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
            });
            _common.openSidebarOption(SIDEBARACTION.search).delete_pinnedItem().search_fromSidebar(SIDEBARACTION.Standard," ")
            _common.openTab(app.tabBar.project)
        })
    })
    after(() => {
		cy.LOGOUT();
	});

    it('TC - Verify create material catalog and Material groups', function () {
        const SIDEBARACTION = this.data.sidebarInputs.sidebar
        const MATERIALCATALOGGRID = this.data.material_Catalog_ColumnHeaders.column_Headers
        const MATERIALCATALOGINPUTS = this.data.material_Catalog_Page.Inputs
        const MATERIALGROUPGRID = this.data.material_Group_ColumnHeaders.column_Headers

        const DataCells1: DataCells={
            [app.GridCells.CODE]:MATERIALGRPCODE1,
            [app.GridCells.DESCRIPTION_INFO]: MATERIALGRPDESC1,
            [app.GridCells.PRC_STRUCTURE_FK]: MATGRPSTRUCT,
          }
          const DataCells2: DataCells={
            [app.GridCells.CODE]:MATERIALGRPCODE2,
            [app.GridCells.DESCRIPTION_INFO]: MATERIALGRPDESC2,
            [app.GridCells.PRC_STRUCTURE_FK]: MATGRPSTRUCT,
          }
        _common.openSidebarOption(SIDEBARACTION.quickStart)
        _common.search_fromSidebar(SIDEBARACTION.quickStart1, SIDEBARACTION.materialCatalog)
        _common.openTab(app.tabBar.Material_Catalog).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Material_Catalogs, app.FooterTab.MATERIALCATALOG, 0);
            _common.setup_gridLayout(cnt.uuid.Material_Catalogs,MATERIALCATALOGGRID)
        }); 
        _common.clear_subContainerFilter(cnt.uuid.Material_Catalogs)
        _common.create_newRecord(cnt.uuid.Material_Catalogs)
        _common.enterRecord_inNewRow(cnt.uuid.Material_Catalogs,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,MATERIALCATCODE)
        _common.enterRecord_inNewRow(cnt.uuid.Material_Catalogs,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,MATERIALCATDESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.Material_Catalogs,app.GridCells.BUSINESS_PARTNER_FK,SIDEBARACTION.popupType1,app.InputFields.INPUT_GROUP_CONTENT,MATERIALCATALOGINPUTS.businessPartner)
        cy.SAVE().wait(2000)
        _common.openTab(app.tabBar.Material_Catalog).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 3);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS,MATERIALGROUPGRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS,DataCells1)
        cy.SAVE().wait(1000)
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS,DataCells2)
        cy.SAVE().wait(1000)
    })

    it('TC - Verify create material records-1', function () {
        const SIDEBARACTION = this.data.sidebarInputs.sidebar
        _common.openSidebarOption(SIDEBARACTION.quickStart)
        _common.search_fromSidebar(SIDEBARACTION.quickStart1, SIDEBARACTION.material)
        _common.openTab(app.tabBar.Records).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Material_Catalog_Filter, app.FooterTab.MATERIALFILTER, 0)
        });
        _common.search_inSubContainer(cnt.uuid.Material_Catalog_Filter,MATERIALCATCODE)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.Material_Catalog_Filter,app.GridCells.CODE,MATERIALCATCODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Material_Catalog_Filter,app.GridCells.CODE,MATERIALCATCODE)
        _common.set_cellCheckboxValue(cnt.uuid.Material_Catalog_Filter,app.GridCells.IS_CHECKED,"check")
    })
    it('TC - Verify create material records-2', function () {
        const MATRECGRID = this.data.materialRecords_ColumnHeaders.column_Headers
        const DataCells: DataCells={
            [app.GridCells.DESCRIPTION_INFO_1]: MATERIALRECDESC,
            [app.GridCells.CODE]: MATERIALRECCODE,
            [app.GridCells.UOM_FK]:UOM,
          }
          const DataCells1: DataCells={
            [app.GridCells.DESCRIPTION_INFO_1]: MATERIALRECDESC1,
            [app.GridCells.CODE]: MATERIALRECCODE1,
            [app.GridCells.UOM_FK]:UOM,
          }
        _common.openTab(app.tabBar.Records).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Material_Group_Filter, app.FooterTab.MATERIALGROUPFILTER, 2)
        });
        _common.search_inSubContainer(cnt.uuid.Material_Group_Filter,MATERIALGRPCODE1)
        cy.wait(500)
        _common.assert_cellData_insideActiveRow(cnt.uuid.Material_Group_Filter,app.GridCells.CODE,MATERIALGRPCODE1)
        _common.set_cellCheckboxValue(cnt.uuid.Material_Group_Filter,app.GridCells.IS_CHECKED,"uncheck")
        _common.openTab(app.tabBar.Records).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Material_Records, app.FooterTab.MATERIAL_RECORDS, 1)
            _common.setup_gridLayout(cnt.uuid.Material_Records,MATRECGRID)
        });
        //1st material record
        _common.clear_subContainerFilter(cnt.uuid.Material_Records)
        _common.create_newRecord(cnt.uuid.Material_Records)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.Material_Records,DataCells)
        cy.SAVE().wait(1000)
        _common.search_inSubContainer(cnt.uuid.Material_Group_Filter,MATERIALGRPCODE2)
        cy.wait(500)
        _common.assert_cellData_insideActiveRow(cnt.uuid.Material_Group_Filter,app.GridCells.CODE,MATERIALGRPCODE2)
        _common.set_cellCheckboxValue(cnt.uuid.Material_Group_Filter,app.GridCells.IS_CHECKED,"uncheck")
         //2nd material record
        _common.create_newRecord(cnt.uuid.Material_Records)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.Material_Records,DataCells1)
        cy.SAVE().wait(1000)
    })

    it('TC - Verify material records with filter', function () {
        _common.search_inSubContainer(cnt.uuid.Material_Group_Filter,MATERIALGRPCODE1)
        cy.wait(500)
        _common.set_cellCheckboxValue(cnt.uuid.Material_Group_Filter,app.GridCells.IS_CHECKED,"check")
        _common.search_inSubContainer(cnt.uuid.Material_Records,MATERIALRECCODE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.Material_Records,app.GridCells.CODE,MATERIALRECCODE)
        _common.search_inSubContainer(cnt.uuid.Material_Group_Filter,MATERIALGRPCODE2)
        cy.wait(500)
        _common.set_cellCheckboxValue(cnt.uuid.Material_Group_Filter,app.GridCells.IS_CHECKED,"check")
        _common.search_inSubContainer(cnt.uuid.Material_Records,MATERIALRECCODE1)
        cy.wait(1000)
        _common.assert_cellData_insideActiveRow(cnt.uuid.Material_Records,app.GridCells.CODE,MATERIALRECCODE1)
    })
})
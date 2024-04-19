/// <reference types="cypress" />
import { _mainView, _modalView, _common } from "cypress/pages";
import { app, cnt, btn } from "../../../../locators";
import { DataCells } from "cypress/pages/interfaces";

export class SalesConfigurationPage {

    enterRecord_toCreateConfigurationHeader(container_UUID: string, description: string, ProConfigHeaderType: string, configurationType: string) {
        _common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, description);
        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID)
                 .findGrid()
                 .findActiveRow()
                 .findCell(app.GridCells.PRC_CONFIG_HEADER_TYPE_FK)
                 .caret()
                 .select_popupItem('list', ProConfigHeaderType)
        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID)
                 .findGrid()
                 .findActiveRow()
                 .findCell(app.GridCells.BAS_CONFIGURATION_TYPE_FK)
                 .caret()
                 .select_popupItem('list', configurationType)
        _modalView.findActiveRow()
                  .checkbox_inCell(app.GridCells.AUTO_CREATE_BOQ)
                  .click();
    }

    select_BidConfiguration() {

        cy.contains(".cid_ecf49aee59834853b0f78ee871676e38 .grid-container .grid-canvas-right [class*='column-id_description']", "Bid").click({ force: true });
        cy.wait(1000);
        _mainView.findActiveRow()
                 .findButton(btn.IconButtons.ICO_TREE_COLLAPSE)
                 .clickIn()
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.CONFIGURATIONS)
                 .findGrid()
        cy.contains(".grid-canvas-right [class*='column-id_description']", "Main Quote").click({ force: true });
    }

    enterRecord_toCreateTotalType(code:string) {

        cy.get('body').then(($body) => {
            if ($body.find(".cid_469e2a7ea19049fda4d5e19424b81cbe .grid-container .grid-canvas-right  .invalid-cell").length > 0) {
                _common.enterRecord_inNewRow(cnt.uuid.TOTAL_TYPES, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, code);
            } else {
                _common.create_newRecord(cnt.uuid.TOTAL_TYPES)
                _common.enterRecord_inNewRow(cnt.uuid.TOTAL_TYPES, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, code);

            }
        })
 }

    enterRecord_toCreateConfiguration(container_UUID: string, description: string, contractType: string, projectContractType: string, paymentTerm: string) {
        cy.get(".cid_ecf49aee59834853b0f78ee871676e38 .grid-container .grid-canvas-right [class*='column-id_descriptioninfo']").click();
        _mainView.findTextInput(app.InputFields.DOMAIN_TYPE_TRANSLATION)
            .type(description);
        cy.get(".cid_ecf49aee59834853b0f78ee871676e38 .grid-container .grid-canvas-right [class*='PrcContractTypeFk']").click()
        _mainView.caret()
            .select_popupItem('list', contractType)
        cy.get(".cid_ecf49aee59834853b0f78ee871676e38 .grid-container .grid-canvas-right [class*='column-id_prjcontracttypefk']").click()
        _mainView.caret()
            .select_popupItem('list', projectContractType)
        cy.get(".cid_ecf49aee59834853b0f78ee871676e38 .grid-container .grid-canvas-right [class*='column-id_paymenttermfifk']").click()
        _mainView.caret()
            .select_popupItem('grid', paymentTerm)
    }

    enterRecord_toCreateBillingSchemata(container_UUID: string, BillingSchema: string) {
        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID)
                 .findGrid()
                 .findCell(app.GridCells.BILLING_SCHEMA_FK)
                 .caret()
                 .select_popupItem('list', BillingSchema)
    }

}


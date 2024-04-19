/// <reference types="cypress" />
import { _common, _mainView, _modalView } from 'cypress/pages';
import { app, cnt, btn, commonLocators } from '../../../../locators';
import { DataCells } from "cypress/pages/interfaces";

export class AssembliesPage {

   /*
   * This is used to recalculate assemblies from wizard
   * Updated Date: 18/12/2023
   * Author : Anurag Singh
   */
  recalculate_assemblies_fromWizard(data:DataCells) {
    if (data[commonLocators.CommonKeys.RADIO]) {
      _modalView.findModal()
                .findRadio_byLabel(data[commonLocators.CommonKeys.RADIO],commonLocators.CommonKeys.RADIO, data[commonLocators.CommonKeys.RADIO_INDEX]);
    }
    if (data[commonLocators.CommonKeys.CHECKBOX]) {
      Object.keys(data[commonLocators.CommonKeys.CHECKBOX]).forEach((keys)=>{
        _modalView.findModal()
                  .findCheckBox_byLabel(keys,commonLocators.CommonKeys.CHECKBOX)
                  .as("check")
                  .invoke("is", ":checked")
                  .then((checked) => {
                    if (data[commonLocators.CommonKeys.CHECKBOX][keys]==='check') {
                      if (!checked) {
                        cy.get("@check").check();
                      }
                    } if(data[commonLocators.CommonKeys.CHECKBOX][keys]==='uncheck') {
                      if (checked) {
                        cy.get("@check").uncheck();
                      }
                    }
                  });
      })
    }
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
  }

  /*
   * This is used to create assemblies
   * Updated Date: 18/12/2023
   * Author : Anurag Singh
   */
  enterRecord_toCreateAssemblies(container_UUID:string,data:DataCells){
      if (data[app.GridCells.DESCRIPTION_INFO]) {
        _common.enterRecord_inNewRow(container_UUID,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,data[app.GridCells.DESCRIPTION_INFO])
      } 
      if (data[app.GridCells.QUANTITY_SMALL]) {
        _common.enterRecord_inNewRow(container_UUID,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.QUANTITY_SMALL])
      } 
      if (data[app.GridCells.RULE]) {
        _common.clickOn_activeRowCell(container_UUID,app.GridCells.RULE)
        _common.lookUpButtonInCell(cnt.uuid.ASSEMBLIES, app.GridCells.RULE, app.GridCellIcons.ICO_INPUT_DELETE, 0)
        _common.lookUpButtonInCell(cnt.uuid.ASSEMBLIES, app.GridCells.RULE, app.GridCellIcons.BLOCK_IMAGE, 0)
        _common.clickOn_cellHasValue_fromModal(app.GridCells.CODE,data[app.GridCells.RULE])
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
      } 
      if (data[app.GridCells.PARAM]) {
        _common.clickOn_activeRowCell(container_UUID,app.GridCells.PARAM)
        _common.lookUpButtonInCell(cnt.uuid.ASSEMBLIES, app.GridCells.PARAM, app.GridCellIcons.ICO_INPUT_DELETE, 0)
        _common.lookUpButtonInCell(cnt.uuid.ASSEMBLIES, app.GridCells.PARAM, app.GridCellIcons.BLOCK_IMAGE, 1)
        _mainView.select_popupItem(commonLocators.CommonKeys.GRID,data[app.GridCells.PARAM])
      } 
      if (data[app.GridCells.COST_GROUP_LIC_DIN276_2018_12]) {
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLIES,app.GridCells.COST_GROUP_LIC_DIN276_2018_12,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.COST_GROUP_LIC_DIN276_2018_12])
      } 
  }
   
  /*
   * This is used to create assembly resource
   * Updated Date: 18/12/2023
   * Author : Anurag Singh
   */
  enterRecord_toCreateAssemblyResource(data:DataCells){
    if (data[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]) {
      _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,commonLocators.CommonKeys.GRID,data[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY])
    }
    if (data[app.GridCells.CODE]) {
      _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE)
      _common.select_rowInContainer(cnt.uuid.ASSEMBLY_RESOURCE)
      _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.CODE])
    } 
    if (data[app.GridCells.QUANTITY_SMALL]) {
      _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.QUANTITY_SMALL)
      _common.select_rowInContainer(cnt.uuid.ASSEMBLY_RESOURCE)
      _common.enterRecord_inNewRow(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.QUANTITY_SMALL])
    } 
  }
  
   /*
   * This is used to material prices from wizard
   * Updated Date: 19/12/2023
   * Author : Anurag Singh
   */

  update_materialPrices_fromWizard(data:DataCells) {
    if (data[commonLocators.CommonKeys.RADIO]) {
      _modalView.findModal()
                .findRadio_byLabel(data[commonLocators.CommonKeys.RADIO],commonLocators.CommonKeys.RADIO, data[commonLocators.CommonKeys.RADIO_INDEX]);
    }
    _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)    
    _common.waitForLoaderToDisappear()
    if (data[app.GridCells.UP_MATERIAL_CODE]) {
      Object.keys(data[app.GridCells.UP_MATERIAL_CODE])
            .forEach(keys=>{
              _modalView.findModal()
                        .wrapElements()
                        .find(`.${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.UP_MATERIAL_CODE}`)
                        .contains(keys)
                        .click()
                        .then(()=>{
                          cy.get(`${commonLocators.CommonElements.ACTIVE} .${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.UP_SELECTED}`)
                            .within(()=>{
                              cy.get(`${commonLocators.CommonElements.CHECKBOX_INPUT}`)
                                .as("checkbox")
                                .invoke("is", ":checked")
                                .then((checked) => {
                                  if (data[app.GridCells.UP_MATERIAL_CODE][keys] === commonLocators.CommonKeys.CHECK) {
                                    if (!checked) {
                                      cy.get("@checkbox").check();
                                    }
                                  } else if (data[app.GridCells.UP_MATERIAL_CODE][keys] === commonLocators.CommonKeys.UNCHECK) {
                                    if (checked) {
                                      cy.get("@checkbox").uncheck();
                                    }
                                  }
                                });
                            })
                        })
            })
      
    }
    _common.waitForLoaderToDisappear()
    cy.wait(1000)
    _common.clickOn_modalFooterButton(btn.ButtonText.UPDATE)
    _common.waitForLoaderToDisappear()   
    cy.wait(1000) 
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)    
  }
    enterRecord_toCreateWIC(group: string,catagory:string,BoQ:string){
      _modalView.findModal()
                .findInputFieldInsideModal("WIC Group",app.InputFields.INPUT_GROUP_CONTENT)
                .type(group, { force: true });
      cy.wait(2000);
      _mainView.select_popupItem('grid',group)
      _modalView.findModal()
                .findInputFieldInsideModal("WIC Category",app.InputFields.INPUT_GROUP_CONTENT)
                .type(catagory, { force: true });
      cy.wait(2000);
      _mainView.select_popupItem('grid',catagory)

      _modalView.findModal()
                .findInputLookup(app.InputFields.ICO_INPUT_LOOKUP, 0)           
      cy.wait(2000);
      _modalView.findModal().acceptButton('Refresh')
      _modalView.findModal()
                .findTextInput(app.InputFields.FORM_CONTROL)
                .eq(0)
                .clear()
                .type(BoQ)
      _modalView.findModal()
                .findButton(btn.IconButtons.ICO_SEARCH)
                .clickIn()
      _modalView.findModal()
                .wrapElements()
                .get(".column-id_brief")
                .contains(BoQ)
                .click().then(()=>{
                  cy.get("[class*='modal-footer']").eq(1).contains("OK").click();
                })

      cy.wait(2000);
   
      _modalView.acceptButton("OK");
      _mainView.findModuleClientArea()
               .findAndShowContainer(cnt.uuid.ASSEMBLY_WIC)
               .findGrid()
               .findActiveRow()
               .getCell(app.GridCells.BOQ_ITEM_FK)
               .wrapElements().then(($ele) => {
                Cypress.env("BoqDesc", $ele.text());
                })
      _mainView.findModuleClientArea()
               .findAndShowContainer(cnt.uuid.ASSEMBLY_WIC)
               .findGrid()
               .findActiveRow()
               .getCell(app.GridCells.BOQ_WIC_CAT_FK)
               .wrapElements().then(($ele) => {
                Cypress.env("actWicGroup", $ele.text());
                })
      _mainView.findModuleClientArea()
               .findAndShowContainer(cnt.uuid.ASSEMBLY_WIC)
               .findGrid()
               .findActiveRow()
               .getCell(app.GridCells.BOQ_WIC_CAT_BOQ_FK)
               .wrapElements().then(($ele) => {
                Cypress.env("wicCategory", $ele.text());
               })
    }

    setup_EstimateConfigurationForAssembly(estType: string,wicGroup:string){
      _modalView.findModal()
                .findCheckBox_byLabel(estType, "checkbox")
                .click();
      _modalView.findModal()
                .findInputFieldInsideModal(wicGroup,app.InputFields.INPUT_GROUP_CONTENT)
                .clear({ force: true })
                .type(Cypress.env("actWicGroup"));
      _modalView.select_popupItem("grid",Cypress.env("actWicGroup"));
      _modalView.findModal().acceptButton("OK");
    }

    validateBoQ_inBoQStructure(){
      _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.BOQ_STRUCTURES)
              .findGrid()
              .findActiveRow()
              .getCell(app.GridCells.REFERENCE)
              .wrapElements().then(($ele) => {
                const Boqinfo = $ele.text()
                expect(Boqinfo).to.equals(Cypress.env("BoqDesc"));
              })
    }
}

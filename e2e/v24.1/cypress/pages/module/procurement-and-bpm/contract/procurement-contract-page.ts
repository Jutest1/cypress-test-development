/// <reference types="cypress" />
import { _common, _estimatePage, _mainView, _modalView, _package, _salesPage } from "cypress/pages";
import { app, cnt, btn, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

export class ProcurementContractPage {

    replaceMaterial_atContractLevel_fromWizard(scope: string, replaceFrom: string, replaceFromCatalog?:string, replaceCriteriatoremove?: string[], material?: string[], replacementMaterial?: string[]) {
        /* Replace Scope Radio Selection */
                if (scope === 'Highlighted Material') {
                            _mainView.findModuleClientArea()
                            _modalView.findModal()
                                      .findModalBody()
                                      .findRadio_byLabel(scope, "radio", 0)
                                      .click({ force: true })
                        }
                if (scope === 'Current Contract') {
                            _mainView.findModuleClientArea()
                            _modalView.findModal()
                                      .findModalBody()
                                      .findRadio_byLabel(scope, "radio", 1)
                                      .click({ force: true })
                        }
                if (scope === 'All Contracts from Current Project') {
                            _mainView.findModuleClientArea()
                            _modalView.findModal()
                                      .findModalBody()
                                      .findRadio_byLabel(scope, "radio", 2)
                                      .click({ force: true })
                        }

        /* Replace Scope Radio Selection */
                if (replaceFrom === 'All catalogs') {
                            _mainView.findModuleClientArea();
                            _modalView.findModal()
                                      .findModalBody()
                                      .findRadio_byLabel(replaceFrom, "radio", 0)
                                      .click({ force: true })
                           
                                      
                        }
                if (replaceFrom === 'Specific catalog' && replaceFromCatalog!=null) {
                            _mainView.findModuleClientArea();
                            _modalView.findModal()
                                      .findModalBody()
                                      .findRadio_byLabel(replaceFrom, "radio", 1)
                                      .click({ force: true })
                            _modalView.findModal()
                                      .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
                                      .clear()
                                      .type(replaceFromCatalog)
                                      .then(()=>{
                                        _modalView.select_popupItem("grid", replaceFromCatalog)
                                      })
                        }

        /* Replace Criteria to REMOVE*/
                if (replaceCriteriatoremove != null) {
                    for (let i = 0; i < replaceCriteriatoremove.length; i++) {
                        if (replaceCriteriatoremove[i] === 'By neutral material assignment') {
                            cy.log(replaceCriteriatoremove[i])
                            _modalView.findModal()
                                      .findModalBody()
                                      .findCellhasValue(app.GridCells.NAME, "By neutral material assignment")
                                      .click()
                            _modalView.findModal()
                                      .findModalBody()
                                      .findActiveRow()
                                      .checkbox_inCell(app.GridCells.SELECTED)
                                      .uncheck()
                        } 
                        if (replaceCriteriatoremove[i] === 'By identical material code') {
                            _modalView.findModal()
                                      .findModalBody()
                                      .findCellhasValue(app.GridCells.NAME, "By identical material code")
                                      .click()
                            _modalView.findModal()
                                      .findModalBody()
                                      .findActiveRow()
                                      .checkbox_inCell(app.GridCells.SELECTED)
                                      .uncheck()
                        }
                        if (replaceCriteriatoremove[i] === 'By procurement structure') {
                            _modalView.findModal()
                                      .findModalBody()
                                      .findCellhasValue(app.GridCells.NAME, "By procurement structure")
                                      .click()
                            _modalView.findModal()
                                      .findModalBody()
                                      .findActiveRow()
                                      .checkbox_inCell(app.GridCells.SELECTED)
                                      .uncheck()
                        }
                    }
                    _modalView.findModal()
                              .acceptButton("Next")
                }
                else {
                    _modalView.findModal()
                              .acceptButton("Next")
                }
                cy.wait(2000)

        /* Replacing existing material with substitute material */
                if (material != null && replacementMaterial != null) {
                    for (let i = 0; i < material.length && i < replacementMaterial.length; i++) {
                        const currentMaterial = material[i];
                        const currentReplacementMaterial = replacementMaterial[i];
                            _modalView.findModuleClientArea()
                                      .findModal()
                                      .findModalBody()
                                      .wrapElements()
                                      .within(() => {
                                        cy.get(".slick-container").first().within(() => {
                                            cy.get("[id*='_Selected']").uncheck()
                                            cy.get(`div.column-id_${app.GridCells.MATERIAL_CODE}`).contains("div", currentMaterial)
                                                                                       .click({ force: true })
                                                                                       .parent("div")
                                                                                       .find('[type="checkbox"]')
                                                                                       .check({ force: true });
                                            cy.wait(1000);
                                        });
                                        cy.get(".slick-container").last().within(() => {
                                            cy.get(`div.column-id_${app.GridCells.MATERIAL_CODE}`).contains("div", currentReplacementMaterial)
                                                                                       .click({ force: true })
                                                                                       .parent("div")
                                                                                       .find('[type="checkbox"]')
                                                                                       .check({ force: true });
                                        cy.wait(1000);
                                        cy.get(`div.column-id_${app.GridCells.MATERIAL_PRICE}`).then(($value)=>{
                                                let replacementPrice = parseFloat($value.text().replace(",","")).toFixed(2)
                                                Cypress.env(`Price${[i]}`, replacementPrice)
                                                cy.log("Price==>>", Cypress.env(`Price${[i]}`))
                                            })
                                        })
                                      })
                        }
                        cy.wait(2000)
                        _modalView.findModal().acceptButton("Replace");
                        _modalView.findModal().acceptButton("OK");
                }
        }

          /* Creating procurement contract directly from the contract module
          Author:Seema Ingole
          Date:20-12-23 */

    enterRecord_createNewProcurementContract_fromModal(data:DataCells) {
      if(data[commonLocators.CommonLabels.CONFIGURATION]){
        _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.CONFIGURATION,data[commonLocators.CommonLabels.CONFIGURATION],commonLocators.CommonKeys.GRID)
      }
      if(data[commonLocators.CommonLabels.BUSINESS_PARTNER]){
        _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.BUSINESS_PARTNER,data[commonLocators.CommonLabels.BUSINESS_PARTNER],commonLocators.CommonKeys.GRID)
        _common.waitForLoaderToDisappear
      }
      _common.clickOn_modalFooterButton(btn.ButtonText.OK)
      _common.waitForLoaderToDisappear
    }

   enterRecord_toCreateItem(Container_UUID: string, MaterialSch: string,description?: string,quantity?: string) {

    _common.edit_containerCell(Container_UUID, app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT, quantity)
    _mainView.findModuleClientArea()
             .findAndShowContainer(Container_UUID)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.DESCRIPTION_1)
             .findTextInput(app.InputFields.DOMAIN_TYPE_DESCRIPTION)
             .type(description, { force: true });
    _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.MDC_MATERIAL_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, MaterialSch)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    }

  create_contacts(container_UUID:string,cellClass:string,labelName:string,name:string){
          _mainView.findModuleClientArea()
                   .findAndShowContainer(container_UUID)
                   .findGrid()
                   .findActiveRow()
                   .findCell(cellClass)
                   .findInputLookup(app.InputFields.ICO_INPUT_LOOKUP,0)  
                 cy.wait(2000)
          _modalView.findModalBody()
                    .searchInModal_byDataNG_Selector(labelName,name)
          _modalView.findModalBody()
                    .findButtonWithTitle("search")
                    .clickIn()
          _modalView.findModal()
                    .findCellhasValue(app.GridCells.FAMILY_NAME_CAPS,name)
                    .click()
          _modalView.findModal()
                    .acceptButton("OK")
                  cy.wait(3000)
                  cy.SAVE() 
  }

  enterRecord_toCreateMilestones(uuid:string,data: DataCells){
            if(data[app.GridCells.PRC_MILESTONE_TYPE_FK]){
                _common.clickOn_activeRowCell(uuid, app.GridCells.PRC_MILESTONE_TYPE_FK)
                _common.edit_dropdownCellWithCaret(uuid, app.GridCells.PRC_MILESTONE_TYPE_FK, "list", data[app.GridCells.PRC_MILESTONE_TYPE_FK])
              }
            if(data[app.GridCells.MDC_TAX_CODE_FK_SMALL]){
                _common.clickOn_activeRowCell(uuid, app.GridCells.MDC_TAX_CODE_FK_SMALL)
                _common.edit_dropdownCellWithCaret(uuid, app.GridCells.MDC_TAX_CODE_FK_SMALL, "grid", data[app.GridCells.MDC_TAX_CODE_FK_SMALL])
              }
            if(data[app.GridCells.AMOUNT_SMALL]){
                _common.clickOn_activeRowCell(uuid, app.GridCells.AMOUNT_SMALL)
                _common.enterRecord_inNewRow(uuid, app.GridCells.AMOUNT_SMALL, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.AMOUNT_SMALL])
              }
            if(data[app.GridCells.MILESTONE]){       
                _common.clickOn_activeRowCell(uuid, app.GridCells.MILESTONE)       
                _common.enterRecord_inNewRow(uuid, app.GridCells.MILESTONE, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.MILESTONE])
              }
            cy.SAVE()           
  }           
     
  enterRecord_toCreatePESAlreadyExisted(labelName:string,checkBoxValue:string,btnText:string){
    _modalView.findModal()
              .findCheckBox_byLabel(labelName, "checkbox")
              .as("check")
              .invoke("is", ":checked")
              .then((checked) => {
                if (checkBoxValue == "check") {
                  if (!checked) {
                    cy.get("@check").check();
                  }
                }
                if (checkBoxValue == "uncheck") {
                  if (checked) {
                    cy.get("@check").uncheck();
                  }
                }
              });
    _modalView.findModal().acceptButton(btnText)
  }

  verify_CreatePESForExistingContractandGoToPES() {
    _modalView.findModal()
              .findRadio_byLabel_InModal(" Update to below specified PES","radio",0,"checkbox spaceToUp")
              .check()
    _modalView.acceptButton("OK")
    _modalView.findModal()
              .wrapElements()
              .within(() => {
              cy.contains("Create PES(s) successfully!").should("be.visible");
              });
    cy.wait(1000);
    _modalView.findModal().acceptButton("Go To PES");
  }

  enterRecord_CreatePlantFromContractitem(RadioLabel: string, RadioIndex: number, data: DataCells) {
    cy.wait(3000)
    _modalView.findModal()
              .findRadio_byLabel_Col(RadioLabel, "radio", RadioIndex);
    cy.wait(3000)
    if (data[commonLocators.CommonLabels.PLANT]) {
      cy.get(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS)
        .find("input[class*='" + app.InputFields.INPUT_GROUP_CONTENT + "']").eq(1)
        .type(data[commonLocators.CommonLabels.PLANT],{force:true})
        .wait(1000)
        .then(() => {
          _modalView.select_popupItem("grid", data[commonLocators.CommonLabels.PLANT])
        })
        cy.wait(2000)
    }
    if (data[commonLocators.CommonLabels.PLANT_TYPE]) {
      _modalView.findModal()
                .findInputFieldInsideModal(commonLocators.CommonLabels.PLANT_TYPE, app.InputFields.INPUT_GROUP_CONTENT)
                .type(data[commonLocators.CommonLabels.PLANT_TYPE],{force:true}) 
                .wait(1000)
                .then(() => {
                  _modalView.select_popupItem("grid", data[commonLocators.CommonLabels.PLANT_TYPE])
                })
       cy.wait(1000)
    }

    if (data[commonLocators.CommonLabels.PLANT_GROUP]) {
      cy.wait(1000)
      _modalView.findModal()
                .findInputFieldInsideModal(commonLocators.CommonLabels.PLANT_GROUP, app.InputFields.INPUT_GROUP_CONTENT)
                .type(data[commonLocators.CommonLabels.PLANT_GROUP],{force:true}) 
                .wait(1000)
                .then(() => {
                  _modalView.select_popupItem("grid", data[commonLocators.CommonLabels.PLANT_GROUP])
                })        
    }
    if (data[commonLocators.CommonLabels.PLANT_KIND]) {
      _modalView.findModal()
                .findCaretByLabel(commonLocators.CommonLabels.PLANT_KIND)
                .then(() => {
                  _modalView.select_popupItem("list", data[commonLocators.CommonLabels.PLANT_KIND])
                })
    }
    if (data[commonLocators.CommonLabels.PLANT_CODE]) {
      _modalView.findModal()
                .findInputFieldInsideModal(commonLocators.CommonLabels.PLANT_CODE, app.InputFields.DOMAIN_TYPE_CODE)
                .type(data[commonLocators.CommonLabels.PLANT_CODE],{force:true})         
    }
    if (data[commonLocators.CommonLabels.PLANT_DESCRIPTION]) {
      cy.wait(2000)
      _modalView.findModal()
                .findInputFieldInsideModal(commonLocators.CommonLabels.PLANT_DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                .clear({force:true})
                .type(data[commonLocators.CommonLabels.PLANT_DESCRIPTION])
    }
    cy.wait(5000)
      .then(() => {
        _modalView.acceptButton(btn.ButtonText.FINISH)
    })

    _modalView.findModal()
              .wrapElements()
              .within(() => {
                cy.contains("Plant created successfully").should("be.visible");
     });
    cy.wait(1000);
    _modalView.findModal().acceptButton(btn.ButtonText.OK);
  }

  enterRecord_toSetReportingDate(date:string,status:string) {
    _modalView.findModal()
              .findInputFieldInsideModal(commonLocators.CommonLabels.SET_THE_REPORTING_DATE_TO,app.InputFields.INPUT_GROUP_CONTENT)
              .clear()
              .type(date);
    cy.wait(1000)
    _modalView.findModal()
              .findCaretInsideModal(commonLocators.CommonLabels.WHERE_CONTRACT_STATUS_IS)
              .then(()=>{
                _modalView.select_popupItem("list",status)
              }) 
              _modalView.acceptButton(btn.ButtonText.OK)
  }
  enterRecord_toCreateContractItems(Container_UUID: string,data: DataCells) {
    if (data[app.GridCells.DESCRIPTION_1]) {
      _mainView.findModuleClientArea()
               .findAndShowContainer(Container_UUID)
               .findGrid()
               .findActiveRow()
               .findCell(app.GridCells.DESCRIPTION_1)
               .findTextInput(app.InputFields.DOMAIN_TYPE_DESCRIPTION)
               .type(data[app.GridCells.DESCRIPTION_1], { force: true });   
    }
    if (data[app.GridCells.QUANTITY_SMALL]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.QUANTITY_SMALL])
    }
    if (data[app.GridCells.MDC_MATERIAL_FK]) {
      _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.MDC_MATERIAL_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.MDC_MATERIAL_FK])
    }
    if(data[app.GridCells.PRC_STRUCTURE_FK]){
      _common.edit_dropdownCellWithInput(Container_UUID,app.GridCells.PRC_STRUCTURE_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PRC_STRUCTURE_FK])
    }
    if(data[app.GridCells.BAS_UOM_FK]){
      _common.edit_dropdownCellWithInput(Container_UUID,app.GridCells.BAS_UOM_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.BAS_UOM_FK])
    }
    if (data[app.GridCells.PRICE_SMALL]) {
      _common.enterRecord_inNewRow(Container_UUID, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PRICE_SMALL])    
    }
    }


}


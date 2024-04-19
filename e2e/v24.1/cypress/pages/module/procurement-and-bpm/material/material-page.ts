/// <reference types="cypress" />
import { _common, _mainView, _modalView } from "cypress/pages";
import { app, cnt, btn, commonLocators } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { DataCells } from "cypress/pages/interfaces";

var Code

export class MaterialPages {
  
  enterRecord_toCreateMaterialGroups(container_UUID: string,data:DataCells) {
    if (data[app.GridCells.CODE]) { 
    _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.MATERIAL_GROUPS)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.CODE)
              .findTextInput(app.InputFields.DOMAIN_TYPE_CODE)
              .clear()
              .type(data[app.GridCells.CODE])
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) { 
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.MATERIAL_GROUPS)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.DESCRIPTION_INFO)
              .findTextInput(app.InputFields.DOMAIN_TYPE_TRANSLATION)
              .clear()
              .type(data[app.GridCells.DESCRIPTION_INFO])
    }
    if (data[app.GridCells.PRC_STRUCTURE_FK]) { 
     _common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_GROUPS,app.GridCells.PRC_STRUCTURE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PRC_STRUCTURE_FK])
    }
  
  }

  enterRecord_toCreateNewMaterialRecord(container_UUID: string,data:DataCells) {
    if (data[app.GridCells.DESCRIPTION_INFO_1]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION_INFO_1, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO_1])
    } 
    if (data[app.GridCells.UOM_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.UOM_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.UOM_FK])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    }
    if (data[app.GridCells.LIST_PRICE]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.LIST_PRICE, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.LIST_PRICE])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    }
    if (data[app.GridCells.RETAIL_PRICE]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.RETAIL_PRICE, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.RETAIL_PRICE])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    } 
    if (data[app.GridCells.ESTIMATE_PRICE]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.ESTIMATE_PRICE, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.ESTIMATE_PRICE])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    } 
    if (data[app.GridCells.MIN_QUANTITY]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.MIN_QUANTITY, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.MIN_QUANTITY])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    } 
    if (data[app.GridCells.MATERIAL_TYPE_FK]) {
      _common.edit_dropdownCellWithCaret(container_UUID, app.GridCells.MATERIAL_TYPE_FK, "list", data[app.GridCells.MATERIAL_TYPE_FK])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    }
    if (data[app.GridCells.BAS_CURRENCY_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.BAS_CURRENCY_FK, "list",app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.BAS_CURRENCY_FK])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    }
    if (data[app.GridCells.NEUTRAL_MATERIAL_CATALOG_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.NEUTRAL_MATERIAL_CATALOG_FK, "grid",app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.NEUTRAL_MATERIAL_CATALOG_FK])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    }
    if (data[app.GridCells.MDC_MATERIAL_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.MDC_MATERIAL_FK, "grid",app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.MDC_MATERIAL_FK])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    }
    if (data[app.GridCells.CO2_PROJECT]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.CO2_PROJECT])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    }
    if (data[app.GridCells.CODE]) {
      _common.getText_fromCell(container_UUID,app.GridCells.CODE).then(($ele)=>{
        Code = $ele.text()
        if (Code == "") {
          _common.enterRecord_inNewRow(container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE]);
          _common.select_activeRowInContainer(container_UUID)
          _common.waitForLoaderToDisappear()
          cy.SAVE()
        }
        else{
            cy.log("code is autogenerated")
            cy.SAVE()
            _common.enterRecord_inNewRow(container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE]);
            _common.select_activeRowInContainer(container_UUID)
            _common.waitForLoaderToDisappear()
          }              
      })     
      cy.get("body").then(($body) => {
          if ($body.find("[class*='invalid-cell']").length > 0) {
            cy.wait(2000).then(()=>{
              if ($body.find(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS).length > 0) {
                _modalView.findModal()
                          .acceptButton(btn.ButtonText.CANCEL)
              }
            }).then(()=>{
              _common.enterRecord_inNewRow(container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE] + Cypress._.random(0, 999));  
              _common.select_activeRowInContainer(container_UUID)
              _common.waitForLoaderToDisappear()
              cy.SAVE()  
            })
          }
      })
    } 
  }



  enterRecord_toCreateDiscountGroup(container_UUID: string, code: string, description: string, discountType: string, discount: string) {
     _mainView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.CODE)
              .findTextInput(app.InputFields.DOMAIN_TYPE_CODE)
              .invoke("val")
              .then(function (codeVal: string) {
                if (codeVal == "") {
                  _common.enterRecord_inNewRow(container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, code);
                }
              });
                cy.get("body").then(($body) => {
                  if ($body.find("[class*='invalid-cell']").length > 0) {
                    _common.enterRecord_inNewRow(container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, code + Cypress._.random(0, 100));
                  }
    });

    _common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, description)
    _common.edit_dropdownCellWithCaret(container_UUID, app.GridCells.DISCOUNT_TYPE, "list", discountType)
    _common.enterRecord_inNewRow(container_UUID, app.GridCells.DISCOUNT, app.InputFields.INPUT_GROUP_CONTENT, discount)
    cy.SAVE();
   _mainView.findModuleClientArea()
            .findAndShowContainer(container_UUID)
            .findGrid()
            .findActiveRow()
            .getCell(app.GridCells.DISCOUNT)
            .wrapElements()
            .then(($value) => {
              expect(parseFloat($value.text())).equal(parseFloat(discount))
      });
  }

  enterRecord_toCreateAttribute(container_UUID: string, attribute?: string, fixedValueCheckbox?: string) {
    if (attribute) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.PROPERTY_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, attribute)
    }
    if (fixedValueCheckbox) {
     _mainView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .findGrid()
              .findActiveRow()
              .getCell(app.GridCells.HAS_FIXED_VALUES)
              .wrapElements()
              .find(commonLocators.CommonElements.CHECKBOX_TYPE)
              .as("check")
              .invoke('is', ':checked')
              .then(checked => {
                if (fixedValueCheckbox === "check") {
                  if (!checked) {
                    cy.get('@check').check();
                  }
                } else if (fixedValueCheckbox === "uncheck") {
                  if (checked) {
                    cy.get('@check').uncheck();
                  }
                }
              })
          }
  }

  createUpdate_frameworkMaterialCatelog_fromWizard(new_Catalog: string, code: string, description: string, catalog_Type: string, rubric_Category: string,
    Valid_From?: string,
    Valid_To?: string, paymentTerm_FI?: string, paymentTerm_AD?: string,
    paymentTerm_PA?: string, Incoterm?: string, Responcible?: string) {
    _modalView.findModal()
              .findRadio_byLabel_InModal(new_Catalog, "radio", 0, "radio")
    cy.contains('button', "OK").should('be.disabled')
    _modalView.findModal()
              .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
              .type(code);
    _modalView.findModal()
              .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
              .type(description);
    _modalView.findModal()
      .findCaretInsideModal("Catalog Type");
    _modalView.select_popupItem("list", catalog_Type);
    _modalView.findModal()
              .findCaretInsideModal("Rubric Category");
    _modalView.select_popupItem("list", rubric_Category);
    if (Valid_From) {
      _modalView.findModal()
                .findInputFieldInsideModal("Valid From", app.InputFields.INPUT_GROUP_CONTENT)
                .type(Valid_From);
    }
    if (Valid_To) {
      _modalView.findModal()
                .findInputFieldInsideModal("Valid To", app.InputFields.INPUT_GROUP_CONTENT)
                .type(Valid_To);
    }
    if (paymentTerm_FI) {
      _modalView.findModal()
                .findInputFieldInsideModal("Payment Term (FI)", app.InputFields.INPUT_GROUP_CONTENT)
                .clear()
                .type(paymentTerm_FI);
      _modalView.select_popupItem("grid", paymentTerm_FI);

    }
    if (paymentTerm_AD) {
      _modalView.findModal()
                .findInputFieldInsideModal("Payment Term (AD)", app.InputFields.INPUT_GROUP_CONTENT)
                .clear()
                .type(paymentTerm_AD);
      _modalView.select_popupItem("grid", paymentTerm_AD);
    }
    if (paymentTerm_PA) {
      _modalView.findModal()
                .findInputFieldInsideModal("Payment Term (PA)", app.InputFields.INPUT_GROUP_CONTENT)
                .clear()
                .type(paymentTerm_PA);
      _modalView.select_popupItem("grid", paymentTerm_PA);
    }
    if (Incoterm) {
      _modalView.findModal()
                .findInputFieldInsideModal("Incoterm", app.InputFields.INPUT_GROUP_CONTENT)
                .type(Incoterm);
      _modalView.select_popupItem("grid", Incoterm);
    }
    if (Responcible) {
      _modalView.findModal()
                .findInputFieldInsideModal("Responsible", app.InputFields.INPUT_GROUP_CONTENT)
                .clear()
                .type(Responcible);
      _modalView.select_popupItem("grid", Responcible);
    }
    _modalView.findModal().acceptButton("OK")
    cy.wait(1000);
    _modalView.findModal().acceptButton("Go To")
    cy.wait(5000);
  }
  createUpdate_frameworkExistedCatalogMaterialCatelog_fromWizard(existed_Catalog: string, code: string) {
    _modalView.findModal()
              .findRadio_byLabel_InModal(existed_Catalog, "radio", 0, "radio")
    _modalView.findModal()
              .findInputFieldInsideModal("Code", app.InputFields.INPUT_GROUP_CONTENT)
              .type(code);
    cy.wait(2000);
    _modalView.select_popupItem('grid', code);

    _modalView.findModal()
              .acceptButton("OK")
    cy.wait(1000);
    _modalView.findModal()
              .acceptButton("Go To")
    cy.wait(5000);
  }

  enterRecord_toCreateMaterialCatalogs(container_UUID:string,data:DataCells) {
    cy.wait(3000)
    cy.get("body").then(($body) => {
      if ($body.find(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS).length > 0) {
        if (data[app.GridCells.CODE]) {
          _modalView.findModal()
                    .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                    .clear()
                    .type(data[app.GridCells.CODE])
        }
        if(data[app.GridCells.BUSINESS_PARTNER_FK]){
          _modalView.findModal()
                    .findInputFieldInsideModal("Business Partner", app.InputFields.INPUT_GROUP_CONTENT)
                    .clear()
                    .type(data[app.GridCells.BUSINESS_PARTNER_FK])
                    cy.wait(2000)
            _mainView.select_popupItem("grid", data[app.GridCells.BUSINESS_PARTNER_FK])
        }
        _modalView.findModalBody().acceptButton("OK")
      }else{
        if (data[app.GridCells.CODE]) {
          _common.enterRecord_inNewRow(container_UUID,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,data[app.GridCells.CODE])
          _common.select_activeRowInContainer(container_UUID)
          _common.waitForLoaderToDisappear()
        }
        if(data[app.GridCells.BUSINESS_PARTNER_FK]){
          _common.clickOn_activeRowCell(container_UUID,app.GridCells.BUSINESS_PARTNER_FK)
          _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.BUSINESS_PARTNER_FK,'grid',app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.BUSINESS_PARTNER_FK])
          _common.select_activeRowInContainer(container_UUID)
          _common.waitForLoaderToDisappear()
        }      
      }
    });

    if(data[app.GridCells.DESCRIPTION_INFO]){
      cy.wait(2000);
      _common.enterRecord_inNewRow(container_UUID,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,data[app.GridCells.DESCRIPTION_INFO])
    }
    
    if(data[app.GridCells.PAYMENT_TERM_FI_FK]){
      cy.wait(2000);
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.PAYMENT_TERM_FI_FK,'grid',app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PAYMENT_TERM_FI_FK])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    }
    if(data[app.GridCells.PAYMENT_TERM_AD_FK]){
      cy.wait(2000);
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.PAYMENT_TERM_AD_FK,'grid',app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PAYMENT_TERM_AD_FK])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    }
  
    if(data[app.GridCells.VALID_FROM]){
      cy.wait(2000);
      _common.enterRecord_inNewRow(container_UUID,app.GridCells.VALID_FROM,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.VALID_FROM])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    }
    if(data[app.GridCells.VALID_TO]){
      cy.wait(2000);
      _common.enterRecord_inNewRow(container_UUID,app.GridCells.VALID_TO,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.VALID_TO])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    }
    if(data[app.GridCells.MATERIAL_CATALOG_TYPE_FK]){
      cy.wait(2000);
      _common.edit_dropdownCellWithCaret(container_UUID,app.GridCells.MATERIAL_CATALOG_TYPE_FK,'list',data[app.GridCells.MATERIAL_CATALOG_TYPE_FK])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    }
    if(data[app.GridCells.IS_TICKET_SYSTEM]){
      cy.wait(2000);
      _common.set_cellCheckboxValue(container_UUID, app.GridCells.IS_TICKET_SYSTEM, data[app.GridCells.IS_TICKET_SYSTEM])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    }
    if(data[app.GridCells.IS_NEUTRAL]){
      cy.wait(2000);
      _common.set_cellCheckboxValue(container_UUID, app.GridCells.IS_NEUTRAL, data[app.GridCells.IS_NEUTRAL])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    }
  }

  enterRecord_toCreateContract(BusinessPartner: string) {
    _modalView.findModal()
              .findInputFieldInsideModal("Business Partner", app.InputFields.INPUT_GROUP_CONTENT)
              .clear()
              .type(BusinessPartner, { force: true });
    _modalView.select_popupItem("grid", BusinessPartner);
    cy.wait(3000);
    _modalView.findModal()
              .acceptButton(btn.ButtonText.OK);
  }
selectMultipleMaterialFromMaterialSearch(materalCatalogCode:string,Materialcode1: string, Materialcode2: string) {
  this.clickOn_modalButtons("Material Search", "Refresh")
  _modalView.findCheckbox_byLabelnModal("ms-checkbox-multi-select", "Multiple Selection", 0).check()
  this.search_MaterialNo_FromLookup(materalCatalogCode)
  cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Material Search")
    .within(() => {
      cy.wait(1000)
      cy.get(`[class*='ms-commodity-row-description-specification'] span`).eq(0).click({force:true})
      cy.get(`[class*='ms-commodity-row-description-specification'] span`).eq(1).click({force:true})
      cy.contains("button", "OK")
        .click();
    });
}
selectMaterialFromMaterialSearchToShowDetails(Materialcode1: string) {
  this.clickOn_modalButtons("Material Search", "Refresh")
 // this.search_MaterialNo_FromLookup(Materialcode1)
  cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Material Search")
    .within(() => {
      /* cy.get('div.flex-box div.ms-commodity-row').contains("span.ms-commodity-row-item-title", Materialcode1)
        .as('material')
        .click({ force: true })
      cy.wait(3000) */
      cy.contains("button", "OK")
        .click();
    });
}
search_MaterialNo_FromLookup(MaterialName: string) {
  _modalView.searchInModal(app.InputFields.DOMAIN_TYPE_DESCRIPTION, "Material Search", MaterialName)
  _modalView.findModalBody()
            .findButtonIndex(btn.IconButtons.ICO_SEARCH, 0)
            .clickIn()
}
  searchmaterialFromSearchOptionFor_LowToHighPrice(MaterialName: string, Materialcode: string) {
    var arrey1: number[] = []
    cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Material Search")
      .within(() => {
        cy.get(commonLocators.CommonElements.ICO_DISCARD).click();
        cy.wait(2000)

        cy.get("select").select(4).invoke("text")
        _modalView.searchInModal(app.InputFields.DOMAIN_TYPE_DESCRIPTION, "Material Search", MaterialName)
        _modalView.findModalBody()
                  .findButtonIndex(btn.IconButtons.ICO_SEARCH, 0)
                  .clickIn()
        cy.wait(3000)
        cy.get('div.flex-box ').find(commonLocators.CommonElements.COST)
          .each(($el, Index, $list) => {
            const ActVal = parseInt($el.text());
            arrey1.push(ActVal)
            cy.log("Act value is" + ActVal);
          });
        arrey1[0] < arrey1[1]
        cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Material Search")
          .within(() => {
            cy.wait(1000)
            cy.contains(" .fullwidth", Materialcode).click();
            cy.contains("button", "OK")
              .click();
          });
      })
  }
  assign_MaterialNo_FromLookup(MaterialName: string) {
    cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Material Search")
      .within(() => {
        cy.contains(commonLocators.CommonElements.FULL_WIDTH, MaterialName)
          .click();
        cy.contains("button", btn.ButtonText.OK)
          .click({force:true});
      });
  }
  clickOn_cellButton(uuid: string, cellID: string, ButtionID: string) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(uuid)
      .findGrid()
      .findActiveRow()
      .findCell(cellID)
      .findButton(ButtionID)
      .clickIn()
  }
  change_pricelist(MaterialName: string, pricelist: string) {
    cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Material Search")
      .within(() => {
       // cy.contains(commonLocators.CommonElements.FULL_WIDTH, MaterialName).click()
       cy.get(`[class*=' ms-commodity-row'] .ico-pricelist`).click();

      });
    _modalView.select_popupItem("grid", pricelist)
    cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Material Search")
      .within(() => {
        cy.contains("button", "OK")
          .click();
      });
  }
  search_MaterialFromSearchSetting(SearchMode: string, MaterialName: string, Materialcode: string) {
    cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Material Search")
      .within(() => {
        cy.get(".ico-discard").click();
        cy.wait(2000)
        cy.get(`.ico-settings`).click();
      });
    _modalView.select_popupItem("grid1", "All Items")
    cy.wait(1000)
    _modalView.select_popupItem("grid1", SearchMode)
    cy.wait(1000)
    _modalView.select_popupItem("grid1", "OK")
    cy.wait(1000)
   // _modalView.searchInModal(app.InputFields.DOMAIN_TYPE_DESCRIPTION, "Material Search", MaterialName)
   /*  _modalView.findModalBody()
      .findButtonIndex(btn.IconButtons.ICO_SEARCH, 0)
      .clickIn() */
    cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Material Search")
      .within(() => {
        cy.wait(1000)
       // cy.contains(" .fullwidth", Materialcode).click();
        cy.contains("button", "OK")
          .click();
      });
  }
  clickOn_modalButtons(label: string, Buttontext: string) {
    cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, label)
      .within(() => {
        cy.contains("button", Buttontext)
          .click();
      });
    }
    clearMaterialSearch(label: string) {
      cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, label)
        .within(() => {
          cy.get(`a.ico-discard`)
            .click();
        });
    }
    enterRecord_toSpacificationFormatedText(uuid:string,editerID:string,Spacification: string) {
      cy.get(`[class*='cid_${uuid}'] [class*='${editerID}'] `).type(Spacification)

    }
    selectMaterial_fromMaterialSearchLookup(data:DataCells){
     _modalView.findModal()      
          cy.get(commonLocators.CommonElements.REVERT_BUTTON).click()
          cy.wait(1000)
          cy.get(commonLocators.CommonElements.LOOKUP_DROPDOWN).click()
          cy.wait(1000)
          cy.get(commonLocators.CommonElements.MATERIALCATALOG_BUTTON).click({ force: true })
            cy.get("div.popup-content").eq(1).contains("button", data[app.FooterTab.MATERIALCATALOG]).click({ force: true });
        //   cy.get(commonLocators.CommonModalElements.MODAL_FLEX).eq(0).contains(data[app.InputFields.FLEX_BOX_RULE]).click()
        // cy.get(commonLocators.CommonModalElements.MODAL_CATEGORY).find(commonLocators.CommonModalElements.FOOTER).eq(0).contains("OK").click()
           cy.get("div.popup-content").contains(data[app.InputFields.FLEX_BOX_RULE]).click()
           cy.get(`[class*='modal-footer']`).eq(1).contains("button","OK").click({ force: true })
           cy.wait(2000)
           cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Material Search")
             .within(() => {
        cy.contains(commonLocators.CommonElements.FULL_WIDTH, data[app.GridCells.MDC_MATERIAL_FK])
          .click();
        })
          /*  cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS).within(()=>{          
              cy.get(commonLocators.CommonElements.SEARCH_RESULT_COLUMN).find(commonLocators.CommonElements.SEARCH_RESULT_ROW).contains(data[app.GridCells.MDC_MATERIAL_FK]).click({force:true})
          }) */
      
    } 
   
    enterRecord_toCreateNewVairant(container_UUID:string,data:DataCells){
      if (data[app.GridCells.MAT_SCOPE]) {
        _common.enterRecord_inNewRow(container_UUID,app.GridCells.MAT_SCOPE,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.MAT_SCOPE])
      }
      if (data[app.GridCells.BUSINESS_PARTNER_FK]) {
        _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.BUSINESS_PARTNER_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.BUSINESS_PARTNER_FK])
      }
      if (data[app.GridCells.DESCRIPTION_INFO]) {
        _common.enterRecord_inNewRow(container_UUID,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,data[app.GridCells.DESCRIPTION_INFO])
      }
    }

    
    enterRecord_toCreateNewScopeOfSupply(container_UUID:string,data:DataCells){
      if (data[app.GridCells.SCOPE_OF_SUPPLY_TYPE_FK]) {
        _common.edit_dropdownCellWithCaret(container_UUID,app.GridCells.SCOPE_OF_SUPPLY_TYPE_FK,"list",data[app.GridCells.SCOPE_OF_SUPPLY_TYPE_FK])
      }
      if (data[app.GridCells.PRC_STRUCTURE_FK]) {
        _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.PRC_STRUCTURE_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PRC_STRUCTURE_FK])
      }
      if (data[ app.GridCells.PRICE]) {
        _common.enterRecord_inNewRow(container_UUID, app.GridCells.PRICE,app.InputFields.INPUT_GROUP_CONTENT,data[ app.GridCells.PRICE])
      }
      if (data[app.GridCells.QUANTITY_SMALL]) {
        _common.enterRecord_inNewRow(container_UUID,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.QUANTITY_SMALL])
      }
      if (data[app.GridCells.PRICE_UNIT]) {
        _common.enterRecord_inNewRow(container_UUID,app.GridCells.PRICE_UNIT,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PRICE_UNIT])
      }
    }


    enterRecord_toCreateNewMaterialGroups(container_UUID:string,data:DataCells) {
      if (data[app.GridCells.CODE]) {
        _common.enterRecord_inNewRow(container_UUID,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,data[app.GridCells.CODE])
      } 
      if (data[app.GridCells.DESCRIPTION_INFO]) {
        _common.enterRecord_inNewRow(container_UUID,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,data[app.GridCells.DESCRIPTION_INFO])
      } 
      if(data[app.GridCells.PRC_STRUCTURE_FK]){
        _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.PRC_STRUCTURE_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PRC_STRUCTURE_FK])
      }  
    }
    
    enterRecord_toCreateNewAttribute(container_UUID: string,data:DataCells) {
      if (data[app.GridCells.PROPERTY_INFO]) {
        _common.enterRecord_inNewRow(container_UUID, app.GridCells.PROPERTY_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.PROPERTY_INFO])
      }
      if (data[app.GridCells.HAS_FIXED_VALUES]) {
        _common.set_cellCheckboxValue(container_UUID,app.GridCells.HAS_FIXED_VALUES,data[app.GridCells.HAS_FIXED_VALUES])
      }
    }

    enterRecord_toAddTranslationValue(container_UUID:string,data:DataCells) {
      if (data[app.GridCells.LANG_NAME]) {
        Object.keys(data[app.GridCells.LANG_NAME]).forEach((key)=>{
          _common.clickOn_cellHasUniqueValue(container_UUID,app.GridCells.LANG_NAME,key)
          _common.enterRecord_inNewRow(container_UUID,app.GridCells.COL_10,app.InputFields.DOMAIN_TYPE_DESCRIPTION,data[app.GridCells.LANG_NAME][key])
        })
      } 
    }
}
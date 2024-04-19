/// <reference types="cypress" />
import { _assembliesPage, _common, _mainView, _modalView, _estimatePage, _sidebar, _package } from "cypress/pages";
import { btn, app, cnt, tile, commonLocators, sidebar } from "../../../../locators";
import { EST_HEADER, PACKAGE_TOTAL_TRANSLATION, } from "cypress/pages/variables";
import { DataCells } from "cypress/pages/interfaces";
import { data } from "cypress/types/jquery";
import { toInteger } from "cypress/types/lodash";
import CommonLocators from "cypress/locators/common-locators";
import Buttons from "cypress/locators/buttons";

//!-----------------------------VARIABLE DECLARATION SPACE--------------------------------
var plannedQty: any, remPercentage: any, finalRemPercentage: any, remainingPercentage: any, percentage: any;
var ActCostTotal: any
let EstimateCode: string;
var Budget: string;
var locationCode: string;
var finalPrice: any;
var Lineitem: any;
var aqQuantity: any;
var wqQuantity: any;
let TotalsGrandTotal: any;
let Grandtotal: any;
var schDescription: string
var no_of_days: string
var QtyPerUnitItem_inNum: number;
var QtyPerUnitItemfor2ndLine_Item_inNum: number;
var finalEstimateCode: string
export class EstimatePage {
  /*
   * This is used to create a new Estimate record
   * Updated Date: 18/12/2023
   * Author : Anurag Singh
   */

  /*  enterRecord_toCreateEstimate(container_UUID:string,data: DataCells) {
     //! This piece of code will enter estimate code when application is not generating code automatically.
     if (data[app.GridCells.CODE]) {
       _mainView.findModuleClientArea()
                .findAndShowContainer(container_UUID)
                .findGrid()
                .findActiveRow()
                .findCell(app.GridCells.CODE, EST_HEADER)
                .findTextInput(app.InputFields.DOMAIN_TYPE_CODE)
                .invoke("val")
                .then(function (codeVal: string) {
                 if (codeVal == "") {
                   _common.enterRecord_inNewRow(container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE], EST_HEADER);
                   Cypress.env("EST_CODE", data[app.GridCells.CODE])
                 }else{
                   Cypress.env("EST_CODE", codeVal)
                 }
                });
     }
     if (data[app.GridCells.DESCRIPTION_INFO]) {
       _common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO], EST_HEADER);
     }
     if (data[app.GridCells.RUBRIC_CATEGORY_FK]) {
       _common.edit_dropdownCellWithCaret(container_UUID,app.GridCells.RUBRIC_CATEGORY_FK,commonLocators.CommonKeys.LIST,data[app.GridCells.RUBRIC_CATEGORY_FK],EST_HEADER)
     }
     if (data[app.GridCells.EST_TYPE_FK]) {
       _common.edit_dropdownCellWithCaret(container_UUID,app.GridCells.EST_TYPE_FK,commonLocators.CommonKeys.LIST,data[app.GridCells.EST_TYPE_FK],EST_HEADER)
     }
     //! This piece of code will enter new estimate code when the duplicate estimate code added.
     cy.get("body")
       .then(($body) => {
         if ($body.find("[class*='invalid-cell']").length > 0) {
           let estCode=data[app.GridCells.CODE] + Cypress._.random(0, 100);
           _common.enterRecord_inNewRow(cnt.uuid.ESTIMATE, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, estCode, EST_HEADER);
           Cypress.env("EST_CODE", estCode)
         }
       });      
   } */

  /*
 * This is used to create a new Estimate record, and this method has retry logic
 * Updated Date: 26/12/2023
 * // ! Without permissions don't do any changes in this function
 * Author : Abhijeet
 */
  enterRecord_toCreateEstimate(container_UUID: string, data: DataCells) {
    cy.CREATE_ESTIMATE(container_UUID, data)
    cy.SAVE().then(() => {
      _common.waitForLoaderToDisappear()
      cy.wait(2000);
      cy.get("body")
        .then(($body) => {
          if ($body.find(`[class*="modal-body"] [class*='ico-error']`).length > 0) {
            cy.get(`button`)
              .invoke('text')
              .then((text) => {
                if (text.includes('OK')) {
                  cy.get('button').contains('OK').click();
                } if (text.includes('Yes')) {
                  cy.get('button').contains('Yes').click();
                }
                _common.create_newRecord(cnt.uuid.ESTIMATE);
                cy.CREATE_ESTIMATE(container_UUID, data)
                cy.SAVE()
              })
          }
        });
    })


  }

  /*
   * This is used to create a new line item record
   * Updated Date: 18/12/2023
   * Author : Anurag Singh
   */

  enterRecord_toCreateLineItem(container_UUID: string, data: DataCells) {
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }
    if (data[app.GridCells.QUANTITY_SMALL]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.QUANTITY_SMALL]);
    }
    if (data[app.GridCells.BAS_UOM_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.BAS_UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.BAS_UOM_FK])
      _common.select_activeRowInContainer(container_UUID)
    }
    if (data[app.GridCells.PRC_STRUCTURE_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.PRC_STRUCTURE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.PRC_STRUCTURE_FK])
      _common.select_activeRowInContainer(container_UUID)
    }
    if (data[app.GridCells.EST_ASSEMBLY_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.EST_ASSEMBLY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.EST_ASSEMBLY_FK])
      _common.select_activeRowInContainer(container_UUID)
    }
    if (data[app.GridCells.QUANTITY_ADJ]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.QUANTITY_ADJ, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.QUANTITY_ADJ]);
    }
    if (data[app.GridCells.WQ_QUANTITY_TARGET]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.WQ_QUANTITY_TARGET, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.WQ_QUANTITY_TARGET]);
    }
    if (data[app.GridCells.EST_QTY_REL_BOQ_FK]) {
      _common.edit_dropdownCellWithCaret(container_UUID, app.GridCells.EST_QTY_REL_BOQ_FK, commonLocators.CommonKeys.SPAN, data[app.GridCells.EST_QTY_REL_BOQ_FK])
    }
    if (data[app.GridCells.BOQ_ITEM_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.BOQ_ITEM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.BOQ_ITEM_FK])
    }
    if (data[app.GridCells.WIC_BOQ_ITEM_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.WIC_BOQ_ITEM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.WIC_BOQ_ITEM_FK])
    }
    if (data[app.GridCells.PRJ_CHANGE_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.PRJ_CHANGE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.PRJ_CHANGE_FK])
    }
    if (data[app.GridCells.EST_QTY_REL_ACT_FK]) {
      _common.edit_dropdownCellWithCaret(container_UUID, app.GridCells.EST_QTY_REL_ACT_FK, commonLocators.CommonKeys.SPAN, data[app.GridCells.EST_QTY_REL_ACT_FK])
    }
    if (data[app.GridCells.PSD_ACTIVITY_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.PSD_ACTIVITY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.PSD_ACTIVITY_FK])
      _common.select_activeRowInContainer(container_UUID)
    }
  }

  /*
  * This is used to create a new resource record
  * Updated Date: 18/12/2023
  * Author : Anurag Singh
  */
  enterRecord_toCreateResource(container_UUID: string, data: DataCells) {
    if (data[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]) {
      _common.edit_dropdownCellWithCaret(container_UUID, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY, commonLocators.CommonKeys.GRID, data[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY])
      _common.select_activeRowInContainer(container_UUID)
    }
    if (data[app.GridCells.CODE]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.CODE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.CODE])
      _common.select_activeRowInContainer(container_UUID)
    }
    if (data[app.GridCells.QUANTITY_SMALL]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.QUANTITY_SMALL]);

    }
    if (data[app.GridCells.QUANTITY_DETAIL]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.QUANTITY_DETAIL, app.InputFields.DOMAIN_TYPE_COMMENT, data[app.GridCells.QUANTITY_DETAIL]);

    }
  }

  /*
   * This is used to update estimate from wizard
   * Updated Date: 18/12/2023
   * Author : Anurag Singh
   */

  update_estimate_fromWizard(data: DataCells) {

    if (data[commonLocators.CommonKeys.CHECKBOX]) {
      for (var index in data[commonLocators.CommonKeys.CHECKBOX]) {
        if (data[commonLocators.CommonKeys.CHECKBOX][index].VALUE === commonLocators.CommonKeys.CHECK) {
          cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " " + commonLocators.CommonElements.ROW)
            .contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " " + commonLocators.CommonElements.ROW, data[commonLocators.CommonKeys.CHECKBOX][index].LABEL_NAME)
            .then((ele) => {
              cy.wrap(ele)
                .find(commonLocators.CommonElements.CHECKBOX_INPUT)
                .eq(data[commonLocators.CommonKeys.CHECKBOX][index].INDEX)
                .as("check")
                .invoke("is", ":checked")
                .then((checked) => {
                  if (!checked) {
                    cy.get("@check").check();
                  }
                });
            })
        }
        if (data[commonLocators.CommonKeys.CHECKBOX][index].VALUE === commonLocators.CommonKeys.UNCHECK) {
          cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " " + commonLocators.CommonElements.ROW)
            .contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " " + commonLocators.CommonElements.ROW, data[commonLocators.CommonKeys.CHECKBOX][index].LABEL_NAME)
            .then((ele) => {
              cy.wrap(ele)
                .find(commonLocators.CommonElements.CHECKBOX_INPUT)
                .eq(data[commonLocators.CommonKeys.CHECKBOX][index].INDEX)
                .as("check")
                .invoke("is", ":checked")
                .then((checked) => {
                  if (checked) {
                    cy.get("@check").uncheck();
                  }
                });
            });
        }
      }
    }
    if (data[commonLocators.CommonLabels.X_FACTOR]) {
      _modalView.findModal()
        .wrapElements()
        .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, commonLocators.CommonLabels.X_FACTOR)
        .closest(commonLocators.CommonElements.ROW)
        .within(() => {
          cy.get(commonLocators.CommonElements.PLATFORM_FORM_COL)
            .find('[class*="' + app.InputFields.DOMAIN_TYPE_FACTOR + '"]')
            .clear()
            .type(data[commonLocators.CommonLabels.X_FACTOR])
        })
    }
    cy.wait(1000)//This wait necessary 
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
  }

/*
   * This is used to remove rules from wizard
   * Updated Date: 20/03/2024
   * Author : Harshal Shinkar
   */
  remove_rulesFromEstimate(data:DataCells){
    cy.wait(1000)//This wait is necessary
    _common.waitForLoaderToDisappear()
    cy.get("body")
      .then(($body) => {
        let length = $body.find(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} .${btn.IconButtons.ICO_UP}`).length;
        if (length > 0) {
          for (let index = 1; index <= length; index++) {
            cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} .${btn.IconButtons.ICO_UP}`)
              .eq(0)
              .click();
          }
        }
      }).then(() => {
        for (var headerText of data[commonLocators.CommonLabels.HEADER_TEXT]) {
          _modalView.findModal()
            .wrapElements()
            .contains(commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT, headerText)
            .closest(commonLocators.CommonElements.PANEL_GROUP)
            .as("HEADER")
            switch (headerText) {
              case commonLocators.CommonLabels.ASSIGNED_LEVEL:
                cy.get('@HEADER')
                  .within(($el) => {
                    cy.wrap($el)
                      .find(`.${btn.IconButtons.ICO_DOWN}`)
                      .click()
                      if (data[commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]) {
                        cy.wrap($el)
                          .contains(commonLocators.CommonElements.LABEL, data[commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE])
                          .closest(commonLocators.CommonElements.ROW)
                          .within(($ele) => {
                            cy.wrap($ele)
                              .find(commonLocators.CommonElements.RADIO_INPUT)
                              .first()
                              .click()
                          })
                      }
                      cy.wrap($el)
                      .find(`.${btn.IconButtons.ICO_UP}`)
                      .click()
                  })
                break;
              case commonLocators.CommonLabels.STRUCTURE_OR_ROOT:
                cy.get('@HEADER')
                  .within(($el) => {
                    cy.wrap($el)
                      .find(`.${btn.IconButtons.ICO_DOWN}`)
                      .click()
                    if (data[commonLocators.CommonLabels.STRUCTURE_OR_ROOT]) {
                      Object.keys(data[commonLocators.CommonLabels.STRUCTURE_OR_ROOT])
                      
                          cy.wrap($el)
                            .contains(commonLocators.CommonElements.LABEL, data[commonLocators.CommonLabels.STRUCTURE_OR_ROOT])
                            .closest(commonLocators.CommonElements.ROW)
                            .within(($ele) => {
                              cy.wrap($ele)
                                .find(commonLocators.CommonElements.CHECKBOX_INPUT)
                                .as("checkbox")
                                .invoke("is", ":checked")
                                .then((checked) => {
                                  if (data[commonLocators.CommonLabels.STRUCTURE_OR_ROOT][data[commonLocators.CommonLabels.STRUCTURE_OR_ROOT]] === commonLocators.CommonKeys.CHECK) {
                                    if (!checked) {
                                      cy.get("@checkbox").check();
                                    }
                                  } else if (data[commonLocators.CommonLabels.STRUCTURE_OR_ROOT][data[commonLocators.CommonLabels.STRUCTURE_OR_ROOT]] === commonLocators.CommonKeys.UNCHECK) {
                                    if (checked) {
                                      cy.get("@checkbox").uncheck();
                                    }
                                  }
                                });
                              })
                      }
                    cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_UP}`)
                    .click()
                  })
              break;
              case commonLocators.CommonLabels.SEARCH_RULES:
                cy.get('@HEADER')
                  .within(($el) => {
                    cy.wrap($el)
                      .find(`.${btn.IconButtons.ICO_DOWN}`)
                      .click()
                    })
                  if (data[commonLocators.CommonLabels.SEARCH_RULES]) {
                    cy.get(`.toolbar [class*="ico-input-add"]`)
                    .click()
                    cy.wait(1000)
                      _common.clickOn_cellHasValue_fromModal(app.GridCells.CODE,data[commonLocators.CommonLabels.SEARCH_RULES])
                      cy.get(`[class*='modal-dialog'] [class*='modal-footer']`).last().contains('button', 'OK').click({force:true});
                  }
              break;
      }
    }
  }).then(() => {
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
  })
}
    


  /*
   * This is used to generate line items from wizard
   * Updated Date: 19/12/2023
   * Author : Anurag Singh
   */

  generate_lineItems_fromWizard(data: DataCells) {
    cy.wait(1000)//This wait is necessary
    _common.waitForLoaderToDisappear()
    cy.get("body")
      .then(($body) => {
        let length = $body.find(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} .${btn.IconButtons.ICO_UP}`).length;
        if (length > 0) {
          for (let index = 1; index <= length; index++) {
            cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} .${btn.IconButtons.ICO_UP}`)
              .eq(0)
              .click();
          }
        }
      }).then(() => {
        for (var headerText of data[commonLocators.CommonLabels.HEADER_TEXT]) {
          _modalView.findModal()
            .wrapElements()
            .contains(commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT, headerText)
            .closest(commonLocators.CommonElements.PANEL_GROUP)
            .as("HEADER")
          switch (headerText) {
            case commonLocators.CommonLabels.BASIC_SETTING:
              cy.get('@HEADER')
                .within(($el) => {
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_DOWN}`)
                    .click()
                  if (data[commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]) {
                    cy.wrap($el)
                      .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE)
                      .closest(commonLocators.CommonElements.ROW)
                      .within(($ele) => {
                        cy.wrap($ele)
                          .find(`[class*='${app.InputFields.INPUT_GROUP_CONTENT}']`)
                          .clear({ force: true })
                          .type(data[commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE])
                          .then(() => {
                            cy.document()
                              .its('body')
                              .within(() => {
                                _modalView.select_popupItem(commonLocators.CommonKeys.LIST, data[commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]);
                              })
                          })
                      })

                  } if (data[commonLocators.CommonLabels.CREATE_NEW]) {
                    Object.keys(data[commonLocators.CommonLabels.CREATE_NEW])
                      .forEach(function (labelName) {
                        cy.wrap($el)
                          .contains(commonLocators.CommonElements.LABEL, labelName)
                          .closest(commonLocators.CommonElements.ROW)
                          .within(($ele) => {
                            cy.wrap($ele)
                              .find(commonLocators.CommonElements.CHECKBOX_INPUT)
                              .as("checkbox")
                              .invoke("is", ":checked")
                              .then((checked) => {
                                if (data[commonLocators.CommonLabels.CREATE_NEW][labelName] === commonLocators.CommonKeys.CHECK) {
                                  if (!checked) {
                                    cy.get("@checkbox").check();
                                  }
                                } else if (data[commonLocators.CommonLabels.CREATE_NEW][labelName] === commonLocators.CommonKeys.UNCHECK) {
                                  if (checked) {
                                    cy.get("@checkbox").uncheck();
                                  }
                                }
                              });
                          })

                      });
                  }
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_UP}`)
                    .click()
                })
              break;

            case commonLocators.CommonLabels.ADDITIONAL_SETTING:
              cy.get('@HEADER')
                .within(($el) => {
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_DOWN}`)
                    .click()
                  if (data[commonLocators.CommonLabels.ADDITIONAL_SETTING]) {
                    Object.keys(data[commonLocators.CommonLabels.ADDITIONAL_SETTING])
                      .forEach(function (labelName) {
                        cy.wrap($el)
                          .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, labelName)
                          .closest(commonLocators.CommonElements.ROW)
                          .within(($ele) => {
                            cy.wrap($ele)
                              .find(commonLocators.CommonElements.CHECKBOX_INPUT)
                              .as("checkbox")
                              .invoke("is", ":checked")
                              .then((checked) => {
                                if (data[commonLocators.CommonLabels.ADDITIONAL_SETTING][labelName] === commonLocators.CommonKeys.CHECK) {
                                  if (!checked) {
                                    cy.get("@checkbox").check();
                                  }
                                } else if (data[commonLocators.CommonLabels.ADDITIONAL_SETTING][labelName] === commonLocators.CommonKeys.UNCHECK) {
                                  if (checked) {
                                    cy.get("@checkbox").uncheck();
                                  }
                                }
                              });
                          })

                      });
                  }
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_UP}`)
                    .click()
                })
              break;

            case commonLocators.CommonLabels.COPYING_DESCRIPTION_AND_USER_DEFINED:
              cy.get('@HEADER')
                .within(($el) => {
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_DOWN}`)
                    .click()
                  if (data[commonLocators.CommonLabels.COPYING_DESCRIPTION_AND_USER_DEFINED]) {
                    Object.keys(data[commonLocators.CommonLabels.COPYING_DESCRIPTION_AND_USER_DEFINED])
                      .forEach(function (labelName) {
                        cy.wrap($el)
                          .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, labelName)
                          .closest(commonLocators.CommonElements.ROW)
                          .within(($ele) => {
                            cy.wrap($ele)
                              .find(commonLocators.CommonElements.CHECKBOX_INPUT)
                              .as("checkbox")
                              .invoke("is", ":checked")
                              .then((checked) => {
                                if (data[commonLocators.CommonLabels.COPYING_DESCRIPTION_AND_USER_DEFINED][labelName] === commonLocators.CommonKeys.CHECK) {
                                  if (!checked) {
                                    cy.get("@checkbox").check();
                                  }
                                } else if (data[commonLocators.CommonLabels.COPYING_DESCRIPTION_AND_USER_DEFINED][labelName] === commonLocators.CommonKeys.UNCHECK) {
                                  if (checked) {
                                    cy.get("@checkbox").uncheck();
                                  }
                                }
                              });
                          })
                      });
                  }
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_UP}`)
                    .click()
                })
              break;

            case commonLocators.CommonLabels.COPYING_ASSIGNMENT:
              cy.get('@HEADER')
                .within(($el) => {
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_DOWN}`)
                    .click()
                  if (data[commonLocators.CommonLabels.COPYING_ASSIGNMENT]) {
                    Object.keys(data[commonLocators.CommonLabels.COPYING_ASSIGNMENT])
                      .forEach(function (labelName) {
                        cy.wrap($el)
                          .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, labelName)
                          .closest(commonLocators.CommonElements.ROW)
                          .within(($ele) => {
                            cy.wrap($ele)
                              .find(commonLocators.CommonElements.CHECKBOX_INPUT)
                              .as("checkbox")
                              .invoke("is", ":checked")
                              .then((checked) => {
                                if (data[commonLocators.CommonLabels.COPYING_ASSIGNMENT][labelName] === commonLocators.CommonKeys.CHECK) {
                                  if (!checked) {
                                    cy.get("@checkbox").check();
                                  }
                                } else if (data[commonLocators.CommonLabels.COPYING_ASSIGNMENT][labelName] === commonLocators.CommonKeys.UNCHECK) {
                                  if (checked) {
                                    cy.get("@checkbox").uncheck();
                                  }
                                }
                              });
                          })
                      });
                  }
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_UP}`)
                    .click()
                })
              break;

            default:
              cy.log('No matching header found.')
              break;
          }
        }
      }).then(() => {
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
      })
  }

  /*
   * This is used to generate budget from DJC from wizard
   * Updated Date: 19/12/2023
   * Author : Anurag Singh
   */

  generate_budgetFromDJC_fromWizard(data: DataCells) {
    if (data[commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]) {
      _modalView.findModal()
        .findRadio_byLabel(data[commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE], commonLocators.CommonKeys.RADIO, data[commonLocators.CommonKeys.INDEX]);
    }
    if (data[commonLocators.CommonLabels.BUDGET_FROM]) {
      _modalView.findModal()
        .findRadio_byLabel(data[commonLocators.CommonLabels.BUDGET_FROM], commonLocators.CommonKeys.RADIO, data[commonLocators.CommonKeys.RADIO_INDEX]);
    }
    if (data[commonLocators.CommonLabels.X_FACTOR]) {
      _modalView.findModal()
        .findInputFieldInsideModal(commonLocators.CommonLabels.X_FACTOR, app.InputFields.INPUT_GROUP_CONTENT)
        .clear()
        .type(data[commonLocators.CommonLabels.X_FACTOR]);
    }
    _common.clickOn_modalFooterButton(btn.ButtonText.OK);
    cy.get(commonLocators.CommonElements.WIZARD_POPUP_MESSAGE)
      .then(function (element) {
        const actualText = element.text();
        expect(actualText.includes("Done Successfully")).to.be.true;
      })
      .then(() => {
        _common.clickOn_modalFooterButton(btn.ButtonText.OK);
      })
  }

  /*
   * This is used to assign assembly template from look-up modal
   * Updated Date: 20/12/2023
   * Author : Anurag Singh
   */

  assign_assemblyTemplate_fromLookUpModal(container_UUID: string, data: DataCells) {
    _common.clickOn_activeRowCell(container_UUID, app.GridCells.EST_ASSEMBLY_FK)
    _common.waitForLoaderToDisappear()
    _common.clickOn_activeContainerButton(container_UUID, btn.IconButtons.ICO_INPUT_LOOKUP)
    _common.waitForLoaderToDisappear()
    // Pass Assembly Code
    if (data[commonLocators.CommonKeys.CODE]) {
      _modalView.findModal()
        .wrapElements()
        .find(`[class*='${app.InputFields.INPUT_GROUP_CONTENT}']`)
        .first()
        .clear()
        .type(data[commonLocators.CommonKeys.CODE])
        .then(() => {
          _modalView.findModal()
            .findButton(`${btn.IconButtons.ICO_SEARCH}`)
            .clickIn()
        })
      _common.waitForLoaderToDisappear()
      _modalView.findModal()
        .containsValue(data[commonLocators.CommonKeys.CODE])
        .click({ force: true });
    }
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()
  }

  /*
   * This is used to generate update base cost
   * Updated Date: 20/12/2023
   * Author : Anurag Singh
   */
  generate_updateBaseCost_fromWizard(data: DataCells) {

    if (data[commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]) {
      _modalView.findModal()
        .findRadio_byLabel(data[commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE], commonLocators.CommonKeys.RADIO, data[commonLocators.CommonKeys.RADIO_INDEX])
        .click();
    }
    if (data[commonLocators.CommonLabels.GENERATE_UPDATE_BASE_COST]) {
      _modalView.findModal()
        .findRadio_byLabel(data[commonLocators.CommonLabels.GENERATE_UPDATE_BASE_COST], commonLocators.CommonKeys.RADIO, data[commonLocators.CommonKeys.INDEX])
        .click();
    }
    _common.clickOn_modalFooterButton(btn.ButtonText.OK);;
  }

  /*
   * This is used to generate update revenue
   * Updated Date: 20/12/2023
   * Author : Anurag Singh
  */
  updateRevenue_fromWizard(data: DataCells) {
    if (data[commonLocators.CommonLabels.UPDATE_REVENUE]) {
      _modalView.findModal()
        .findRadio_byLabel(data[commonLocators.CommonLabels.UPDATE_REVENUE], commonLocators.CommonKeys.RADIO, data[commonLocators.CommonKeys.RADIO_INDEX])
        .click();
    }
    if (data[commonLocators.CommonLabels.DISTRIBUTE_BY]) {
      _modalView.findModal()
        .findRadio_byLabel(data[commonLocators.CommonLabels.DISTRIBUTE_BY], commonLocators.CommonKeys.RADIO, data[commonLocators.CommonKeys.INDEX])
        .click();
    }
    _common.clickOn_modalFooterButton(btn.ButtonText.OK);;
    _common.waitForLoaderToDisappear()
    cy.wait(1000)// This wait is required
    _common.clickOn_modalFooterButton(btn.ButtonText.OK);;
  }

  /*
  * This is used for estimate configuration dialog
  * Updated Date: 20/12/2023
  * Author : Anurag Singh
 */
  estimateConfigurationDialog(data: DataCells) {

    cy.wait(3000).then(() => {
      cy.get("body")
        .then(($body) => {
          let length = $body.find(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + ' ' + ".ico-up").length;
          if (length > 0) {
            for (let index = 1; index <= length; index++) {
              cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + ' ' + ".ico-up")
                .eq(0)
                .click();
            }
          }
        })
    }).then(() => {
      for (var value of data[commonLocators.CommonLabels.HEADER_TEXT]) {
        _modalView.findModal()
          .wrapElements()
          .contains(commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT, value)
          .closest(commonLocators.CommonElements.PANEL_GROUP)
          .as("HEADER")
        switch (value) {

          case "Estimate Configuration":
            cy.get('@HEADER')
              .within(($el) => {
                cy.wrap($el)
                  .find('.ico-down')
                  .click()
                if (data[commonLocators.CommonLabels.EDIT_ESTIMATE_TYPE]) {
                  cy.wrap($el)
                    .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, commonLocators.CommonLabels.EDIT_ESTIMATE_TYPE)
                    .closest(commonLocators.CommonElements.ROW)
                    .within(($ele) => {
                      cy.wrap($ele)
                        .find(commonLocators.CommonElements.CHECKBOX_INPUT)
                        .as("check")
                        .invoke("is", ":checked")
                        .then((checked) => {
                          if (data[commonLocators.CommonLabels.EDIT_ESTIMATE_TYPE] == "check") {
                            if (!checked) {
                              cy.get("@check").check();
                            }
                          }
                          if (data[commonLocators.CommonLabels.EDIT_ESTIMATE_TYPE] == "uncheck") {
                            if (checked) {
                              cy.get("@check").uncheck();
                            }
                          }
                        });
                    })
                }
                if (data[commonLocators.CommonLabels.IS_COLUMN_CONFIGURE_ACTIVATED]) {
                  cy.wrap($el)
                    .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, commonLocators.CommonLabels.IS_COLUMN_CONFIGURE_ACTIVATED)
                    .closest(commonLocators.CommonElements.ROW)
                    .within(($ele) => {
                      cy.wrap($ele)
                        .find(commonLocators.CommonElements.CHECKBOX_INPUT)
                        .as("check")
                        .invoke("is", ":checked")
                        .then((checked) => {
                          if (data[commonLocators.CommonLabels.IS_COLUMN_CONFIGURE_ACTIVATED] == "check") {
                            if (!checked) {
                              cy.get("@check").check();
                            }
                          }
                          if (data[commonLocators.CommonLabels.IS_COLUMN_CONFIGURE_ACTIVATED] == "uncheck") {
                            if (checked) {
                              cy.get("@check").uncheck();
                            }
                          }
                        });
                    })
                }
                cy.wrap($el)
                  .find('.ico-up')
                  .click()
              })
            break;

          case "Estimate Structure":
            cy.get('@HEADER')
              .within(($el) => {
                cy.wrap($el)
                  .find('.ico-down')
                  .click()
                if (data[commonLocators.CommonLabels.EDIT_TYPE]) {
                  cy.wrap($el)
                    .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, commonLocators.CommonLabels.EDIT_TYPE)
                    .closest(commonLocators.CommonElements.ROW)
                    .within(($ele) => {
                      cy.wrap($ele)
                        .find(commonLocators.CommonElements.CHECKBOX_INPUT)
                        .as("check")
                        .invoke("is", ":checked")
                        .then((checked) => {
                          if (data[commonLocators.CommonLabels.EDIT_TYPE] == "check") {
                            if (!checked) {
                              cy.get("@check").check();
                            }
                          }
                          if (data[commonLocators.CommonLabels.EDIT_TYPE] == "uncheck") {
                            if (checked) {
                              cy.get("@check").uncheck();
                            }
                          }
                        });
                    })
                }
                if (data[commonLocators.CommonLabels.ESTIMATE_STRUCTURE_CONFIG_DETAILS] === "edit") {
                  cy.wrap($el)
                    .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, commonLocators.CommonLabels.ESTIMATE_STRUCTURE_CONFIG_DETAILS)
                    .closest(commonLocators.CommonElements.ROW)
                    .within(($ele) => {
                      cy.wrap($ele)
                        .find(' .' + commonLocators.CommonElements.COLUMN_ID + app.GridCells.EST_STRUCTURE)
                        .contains(data[app.GridCells.EST_STRUCTURE])
                        .click()
                      cy.wrap($ele)
                        .find(' .active .' + commonLocators.CommonElements.COLUMN_ID + app.GridCells.QUANTITY_REL)
                        .click()
                      cy.wrap($ele)
                        .find(' .active .' + commonLocators.CommonElements.COLUMN_ID + app.GridCells.QUANTITY_REL)
                        .find(commonLocators.CommonElements.INPUT_TEXT)
                        .wait(500)
                        .clear({ force: true })
                        .type(data[app.GridCells.QUANTITY_REL])
                        .then(() => {
                          cy.document()
                            .its('body')
                            .within(() => {
                              _modalView.select_popupItem(commonLocators.CommonKeys.GRID, data[app.GridCells.QUANTITY_REL]);
                            })
                        })

                      cy.wrap($ele)
                        .find(' .' + commonLocators.CommonElements.COLUMN_ID + app.GridCells.EST_STRUCTURE)
                        .contains(data[app.GridCells.EST_STRUCTURE])
                        .click()
                    })
                }
                if (data[commonLocators.CommonLabels.ESTIMATE_STRUCTURE_CONFIG_DETAILS] === "create") {
                  cy.wait(2000)
                  cy.wrap($el)
                    .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, commonLocators.CommonLabels.ESTIMATE_STRUCTURE_CONFIG_DETAILS)
                    .closest(commonLocators.CommonElements.ROW)
                    .find('.' + btn.ToolBar.ICO_REC_NEW)
                    .click()
                  cy.wait(2000)
                  cy.wrap($el)
                    .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, commonLocators.CommonLabels.ESTIMATE_STRUCTURE_CONFIG_DETAILS)
                    .closest(commonLocators.CommonElements.ROW)
                    .within(($ele) => {
                      cy.wrap($ele)
                        .find('.' + commonLocators.CommonElements.COLUMN_ID + app.GridCells.QUANTITY_REL)
                        .last()
                        .click()

                      cy.wrap($ele)
                        .find('.active .' + commonLocators.CommonElements.COLUMN_ID + app.GridCells.EST_STRUCTURE)
                        .click()

                      cy.wrap($ele)
                        .find(' .active .' + commonLocators.CommonElements.COLUMN_ID + app.GridCells.CODE)
                        .click()

                      cy.wrap($ele)
                        .find('.active .' + commonLocators.CommonElements.COLUMN_ID + app.GridCells.EST_STRUCTURE)
                        .click()
                      cy.wrap($ele)
                        .find("[class*='" + app.ContainerElements.CARET + "']")
                        .click()
                        .then(() => {
                          cy.document()
                            .its('body')
                            .within(() => {
                              _modalView.select_popupItem(commonLocators.CommonKeys.GRID, data[app.GridCells.EST_STRUCTURE]);
                            })
                        })

                      cy.wrap($ele)
                        .find(' .active .' + commonLocators.CommonElements.COLUMN_ID + app.GridCells.QUANTITY_REL)
                        .click()
                      cy.wrap($ele)
                        .find(' .active .' + commonLocators.CommonElements.COLUMN_ID + app.GridCells.QUANTITY_REL)
                        .find(commonLocators.CommonElements.INPUT_TEXT)
                        .wait(500)
                        .clear({ force: true })
                        .type(data[app.GridCells.QUANTITY_REL])
                        .then(() => {
                          cy.document()
                            .its('body')
                            .within(() => {
                              _modalView.select_popupItem(commonLocators.CommonKeys.GRID, data[app.GridCells.QUANTITY_REL]);
                            })
                        })

                      cy.wrap($ele)
                        .find(' .active .' + commonLocators.CommonElements.COLUMN_ID + app.GridCells.CODE)
                        .click()
                      cy.wrap($ele)
                        .find(' .active .' + commonLocators.CommonElements.COLUMN_ID + app.GridCells.CODE)
                        .find(commonLocators.CommonElements.INPUT_TEXT)
                        .wait(500)
                        .clear({ force: true })
                        .type(data[app.GridCells.CODE])
                        .then(() => {
                          cy.document()
                            .its('body')
                            .within(() => {
                              _modalView.select_popupItem(commonLocators.CommonKeys.GRID, data[app.GridCells.CODE]);
                            })
                        })

                      cy.wrap($ele)
                        .find(' .' + commonLocators.CommonElements.COLUMN_ID + app.GridCells.EST_STRUCTURE)
                        .contains(data[app.GridCells.EST_STRUCTURE])
                        .click()
                    })
                }

                cy.wrap($el)
                  .find('.ico-up')
                  .click()
              })
            break;
          case "Totals Configuration":
            cy.get('@HEADER')
              .within(($el) => {
                cy.wrap($el)
                  .find('.ico-down')
                  .click()

                if (data[commonLocators.CommonLabels.TOTAL_CONFIGURE_EDIT_TYPE]) {
                  cy.wrap($el)
                    .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, commonLocators.CommonLabels.TOTAL_CONFIGURE_EDIT_TYPE)
                    .closest(commonLocators.CommonElements.ROW)
                    .within(($ele) => {
                      cy.wrap($ele)
                        .find(commonLocators.CommonElements.CHECKBOX_INPUT)
                        .as("check")
                        .invoke("is", ":checked")
                        .then((checked) => {
                          if (data[commonLocators.CommonLabels.TOTAL_CONFIGURE_EDIT_TYPE] == "check") {
                            if (!checked) {
                              cy.get("@check").check();
                            }
                          }
                          if (data[commonLocators.CommonLabels.TOTAL_CONFIGURE_EDIT_TYPE] == "uncheck") {
                            if (checked) {
                              cy.get("@check").uncheck();
                            }
                          }
                        });
                    })
                }

                if (data[commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS] === "create") {
                  cy.wrap($el)
                    .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS)
                    .closest(commonLocators.CommonElements.ROW)
                    .find('.' + btn.ToolBar.ICO_REC_NEW)
                    .click()
                  cy.wait(2000)
                  cy.wrap($el)
                    .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS)
                    .closest(commonLocators.CommonElements.ROW)
                    .within(($ele) => {

                      cy.wrap($ele)
                        .find('.active .' + commonLocators.CommonElements.COLUMN_ID + app.GridCells.LINETYPE)
                        .click()

                      cy.wrap($ele)
                        .find("[class*='" + app.InputFields.INPUT_GROUP_CONTENT + "']")
                        .clear()
                        .type(data[app.GridCells.LINETYPE])
                        .then(() => {
                          cy.document()
                            .its('body')
                            .find(".popup-container")
                            .within(() => {
                              cy.get("div.popup-content").within(() => {
                                cy.wait(1000)
                                cy.get(`div[class*='column-id']`).each(($cell) => {
                                  const cellField: string = $cell.text();
                                  if (data[app.GridCells.LINETYPE] === cellField) {
                                    cy.wait(1000);
                                    cy.wrap($cell).click({ force: true });
                                    cy.wait(2000);
                                    return false;
                                  }
                                });
                              });
                            })
                        })

                      cy.wrap($ele)
                        .find('.active .' + commonLocators.CommonElements.COLUMN_ID + app.GridCells.DESCRIPTION)
                        .click()
                      cy.wrap($ele)
                        .find("[class*='" + app.InputFields.DOMAIN_TYPE_DIRECTIVE + "']")
                        .clear()
                        .type(data[app.GridCells.DESCRIPTION])

                      cy.wrap($ele)
                        .find('.active .' + commonLocators.CommonElements.COLUMN_ID + app.GridCells.LINETYPE)
                        .click()
                    })
                }



                cy.wrap($el)
                  .find('.ico-up')
                  .click()
              })
            break;

          default:
            break;
        }
      }
    })
  }

  /*
   * This is used for copy record including dependencies
   * Updated Date: 21/12/2023
   * Author : Anurag Singh
  */
  copyRecord_includingDependencies_fromModal(data: DataCells) {
    cy.wait(1000)//This wait is necessary
    _common.waitForLoaderToDisappear()
    cy.get("body")
      .then(($body) => {
        let length = $body.find(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} .${btn.IconButtons.ICO_UP}`).length;
        if (length > 0) {
          for (let index = 1; index <= length; index++) {
            cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} .${btn.IconButtons.ICO_UP}`)
              .eq(0)
              .click();
          }
        }
      }).then(() => {
        for (var headerText of data[commonLocators.CommonLabels.HEADER_TEXT]) {
          _modalView.findModal()
            .wrapElements()
            .contains(commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT, headerText)
            .closest(commonLocators.CommonElements.PANEL_GROUP)
            .as("HEADER")
          switch (headerText) {
            case commonLocators.CommonLabels.ESTIMATE_TYPE_CONFIGURATION:
              cy.get('@HEADER')
                .within(($el) => {
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_DOWN}`)
                    .click()
                  if (data[commonLocators.CommonLabels.NEW_ESTIMATE_TYPE]) {
                    cy.wrap($el)
                      .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, commonLocators.CommonLabels.NEW_ESTIMATE_TYPE)
                      .closest(commonLocators.CommonElements.ROW)
                      .within(($ele) => {
                        cy.wrap($ele)
                          .find(`[class*='${app.InputFields.INPUT_GROUP_CONTENT}']`)
                          .clear({ force: true })
                          .type(data[commonLocators.CommonLabels.NEW_ESTIMATE_TYPE])
                          .then(() => {
                            cy.document()
                              .its('body')
                              .within(() => {
                                _modalView.select_popupItem(commonLocators.CommonKeys.LIST, data[commonLocators.CommonLabels.NEW_ESTIMATE_TYPE]);
                              })
                          })
                      })
                  }
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_UP}`)
                    .click()
                })
              break;

            case commonLocators.CommonLabels.UPDATE_ESTIMATE:
              cy.get('@HEADER')
                .within(($el) => {
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_DOWN}`)
                    .click()
                  if (data[commonLocators.CommonLabels.UPDATE_ESTIMATE]) {
                    Object.keys(data[commonLocators.CommonLabels.UPDATE_ESTIMATE])
                      .forEach(function (labelName) {
                        cy.wrap($el)
                          .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, labelName)
                          .closest(commonLocators.CommonElements.ROW)
                          .within(($ele) => {
                            cy.wrap($ele)
                              .find(commonLocators.CommonElements.CHECKBOX_INPUT)
                              .as("checkbox")
                              .invoke("is", ":checked")
                              .then((checked) => {
                                if (data[commonLocators.CommonLabels.UPDATE_ESTIMATE][labelName] === commonLocators.CommonKeys.CHECK) {
                                  if (!checked) {
                                    cy.get("@checkbox").check();
                                  }
                                } else if (data[commonLocators.CommonLabels.UPDATE_ESTIMATE][labelName] === commonLocators.CommonKeys.UNCHECK) {
                                  if (checked) {
                                    cy.get("@checkbox").uncheck();
                                  }
                                }
                              });
                          })

                      });
                  }
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_UP}`)
                    .click()
                })
              break;

            case commonLocators.CommonLabels.BUDGET:
              cy.get('@HEADER')
                .within(($el) => {
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_DOWN}`)
                    .click()
                  if (data[commonLocators.CommonLabels.BUDGET]) {
                    Object.keys(data[commonLocators.CommonLabels.BUDGET])
                      .forEach(function (labelName) {
                        cy.wrap($el)
                          .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, labelName)
                          .closest(commonLocators.CommonElements.ROW)
                          .within(($ele) => {
                            cy.wrap($ele)
                              .find(commonLocators.CommonElements.CHECKBOX_INPUT)
                              .as("checkbox")
                              .invoke("is", ":checked")
                              .then((checked) => {
                                if (data[commonLocators.CommonLabels.BUDGET][labelName] === commonLocators.CommonKeys.CHECK) {
                                  if (!checked) {
                                    cy.get("@checkbox").check();
                                  }
                                } else if (data[commonLocators.CommonLabels.BUDGET][labelName] === commonLocators.CommonKeys.UNCHECK) {
                                  if (checked) {
                                    cy.get("@checkbox").uncheck();
                                  }
                                }
                              });
                          })
                      });
                  }
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_UP}`)
                    .click()
                })
              break;

            case commonLocators.CommonLabels.ITEM_ASSIGNMENT:
              cy.get('@HEADER')
                .within(($el) => {
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_DOWN}`)
                    .click()
                  if (data[commonLocators.CommonLabels.ITEM_ASSIGNMENT]) {
                    Object.keys(data[commonLocators.CommonLabels.ITEM_ASSIGNMENT])
                      .forEach(function (labelName) {
                        cy.wrap($el)
                          .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, labelName)
                          .closest(commonLocators.CommonElements.ROW)
                          .within(($ele) => {
                            cy.wrap($ele)
                              .find(commonLocators.CommonElements.CHECKBOX_INPUT)
                              .as("checkbox")
                              .invoke("is", ":checked")
                              .then((checked) => {
                                if (data[commonLocators.CommonLabels.ITEM_ASSIGNMENT][labelName] === commonLocators.CommonKeys.CHECK) {
                                  if (!checked) {
                                    cy.get("@checkbox").check();
                                  }
                                } else if (data[commonLocators.CommonLabels.ITEM_ASSIGNMENT][labelName] === commonLocators.CommonKeys.UNCHECK) {
                                  if (checked) {
                                    cy.get("@checkbox").uncheck();
                                  }
                                }
                              });
                          })
                      });
                  }
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_UP}`)
                    .click()
                })
              break;

            default:
              cy.log('No matching header found.')
              break;
          }
        }
      }).then(() => {
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
      })
  }


  /*
  * This is used to replace resource from wizard
  * Updated Date: 22/12/2023
  * Author : Anurag Singh
 */
  replaceResource_fromWizard(data: DataCells) {


    _common.waitForLoaderToDisappear()
    cy.wait(1000)
      .then(() => {
        for (var headerText of data[commonLocators.CommonLabels.HEADER_TEXT]) {
          _modalView.findModal()
            .wrapElements()
            .contains(commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT, headerText)
            .closest(commonLocators.CommonElements.PANEL_GROUP)
            .as("HEADER")
          switch (headerText) {
            case commonLocators.CommonLabels.BASIC_SETTING_CAPS:
              cy.get('@HEADER')
                .within(($el) => {
                  if (data[commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]) {
                    cy.wrap($el)
                      .contains(commonLocators.CommonElements.LABEL, data[commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE])
                      .closest(commonLocators.CommonElements.ROW)
                      .within(($ele) => {
                        cy.wrap($ele)
                          .find(commonLocators.CommonElements.RADIO_INPUT)
                          .click()
                      })
                  } if (data[commonLocators.CommonLabels.FUNCTION_TYPE]) {
                    cy.wrap($el)
                      .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, commonLocators.CommonLabels.FUNCTION_TYPE)
                      .closest(commonLocators.CommonElements.ROW)
                      .within(($ele) => {
                        cy.wrap($ele)
                          .find(`[class*='${app.InputFields.INPUT_GROUP_CONTENT}']`)
                          .clear({ force: true })
                          .type(data[commonLocators.CommonLabels.FUNCTION_TYPE])
                          .then(() => {
                            cy.document()
                              .its('body')
                              .within(() => {
                                _modalView.select_popupItem(commonLocators.CommonKeys.LIST, data[commonLocators.CommonLabels.FUNCTION_TYPE]);
                              })
                          })
                      })
                  }
                  if (data[commonLocators.CommonLabels.RESOURCE_TYPE]) {
                    cy.get('@HEADER')
                      .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL, commonLocators.CommonLabels.RESOURCE_TYPE)
                      .closest(commonLocators.CommonElements.ROW)
                      .within(($ele) => {
                        cy.wrap($ele)
                          .find(`[class*='dropdown-toggle']`)
                          .click()
                          .then(() => {
                            cy.document()
                              .its('body')
                              .within(() => {
                                _modalView.select_popupItem(commonLocators.CommonKeys.GRID_1, data[commonLocators.CommonLabels.RESOURCE_TYPE]);
                              })
                          })
                      })
                  }
                  if (data[commonLocators.CommonLabels.CURRENT_ELEMENT]) {
                    cy.get('@HEADER')
                      .find(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`)
                      .contains(new RegExp("^" + commonLocators.CommonLabels.CURRENT_ELEMENT + "$", "g"))
                      .closest(`${commonLocators.CommonElements.ROW}`)
                      .within(() => {
                        cy.get(`${commonLocators.CommonElements.PLATFORM_FORM_COL}`)
                          .within(() => {
                            cy.get(`[class*='${app.InputFields.INPUT_GROUP_CONTENT}']`)
                              .first()
                              .type(`{selectall}{backspace}${data[commonLocators.CommonLabels.CURRENT_ELEMENT]}`)
                              .then(() => {
                                cy.document()
                                  .its('body')
                                  .within(() => {
                                    _modalView.select_popupItem(commonLocators.CommonKeys.GRID, data[commonLocators.CommonLabels.CURRENT_ELEMENT]);
                                  })
                              })
                          })
                      })
                  }

                  if (data[commonLocators.CommonLabels.CURRENT_ELEMENT_JOB]) {
                    cy.get('@HEADER')
                      .find(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`)
                      .contains(new RegExp("^" + commonLocators.CommonLabels.CURRENT_ELEMENT_JOB + "$", "g"))
                      .closest(`${commonLocators.CommonElements.ROW}`)
                      .within(() => {
                        cy.get(`${commonLocators.CommonElements.PLATFORM_FORM_COL}`)
                          .within(() => {
                            cy.get(`[class*='${app.InputFields.INPUT_GROUP_CONTENT}']`)
                              .first()
                              .type(`{selectall}{backspace}${data[commonLocators.CommonLabels.CURRENT_ELEMENT_JOB]}`)
                              .then(() => {
                                cy.document()
                                  .its('body')
                                  .within(() => {
                                    _modalView.select_popupItem(commonLocators.CommonKeys.GRID, data[commonLocators.CommonLabels.CURRENT_ELEMENT_JOB]);
                                  })
                              })
                          })
                      })
                  }
                  if (data[commonLocators.CommonLabels.REPLACE_WITH_ELEMENT]) {
                    _common.waitForLoaderToDisappear()
                    cy.wrap($el)
                      .get(commonLocators.CommonElements.PLATFORM_FORM_LABEL)
                      .contains(commonLocators.CommonLabels.REPLACE_WITH_ELEMENT)
                      .closest(commonLocators.CommonElements.ROW)
                      .within(($ele) => {
                        cy.wrap($ele)
                          .find(`[class*='${app.InputFields.INPUT_GROUP_CONTENT}']`)
                          .first()
                          .clear({ force: true })
                          .type(data[commonLocators.CommonLabels.REPLACE_WITH_ELEMENT])
                          .then(() => {
                            cy.document()
                              .its('body')
                              .within(() => {
                                _modalView.select_popupItem(commonLocators.CommonKeys.GRID, data[commonLocators.CommonLabels.REPLACE_WITH_ELEMENT]);
                              })
                          })
                      })
                  }
                  if (data[commonLocators.CommonLabels.IGNORE_CURRENT_ELEMENT_JOB]) {
                    _common.waitForLoaderToDisappear()
                    Object.keys(data[commonLocators.CommonLabels.IGNORE_CURRENT_ELEMENT_JOB])
                      .forEach(function (labelName) {
                        cy.wrap($el)
                          .get(commonLocators.CommonElements.PLATFORM_FORM_LABEL)
                          .contains(labelName)
                          .closest(commonLocators.CommonElements.ROW)
                          .within(($ele) => {
                            cy.wrap($ele)
                              .find(commonLocators.CommonElements.CHECKBOX_INPUT)
                              .as("checkbox")
                              .invoke("is", ":checked")
                              .then((checked) => {
                                if (data[commonLocators.CommonLabels.IGNORE_CURRENT_ELEMENT_JOB][labelName] === commonLocators.CommonKeys.CHECK) {
                                  if (!checked) {
                                    cy.get("@checkbox").check();
                                  }
                                } else if (data[commonLocators.CommonLabels.IGNORE_CURRENT_ELEMENT_JOB][labelName] === commonLocators.CommonKeys.UNCHECK) {
                                  if (checked) {
                                    cy.get("@checkbox").uncheck();
                                  }
                                }
                              });
                          })
                      });
                  }

                })
              break;

            case commonLocators.CommonLabels.REPLACE_DETAILS:

              cy.get('@HEADER')
                .within(($el) => {
                  if (data[commonLocators.CommonLabels.REPLACE_DETAILS]) {
                    Object.keys(data[commonLocators.CommonLabels.REPLACE_DETAILS])
                      .forEach(function (labelName) {
                        cy.wrap($el)
                          .get(`[class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.F1}']`)
                          .contains(labelName)
                          .click()
                          .then(() => {
                            cy.get(`${commonLocators.CommonElements.ACTIVE} [class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.F2}']`)
                              .within(($ele) => {
                                cy.wrap($ele)
                                  .find(commonLocators.CommonElements.CHECKBOX_INPUT)
                                  .as("checkbox")
                                  .invoke("is", ":checked")
                                  .then((checked) => {
                                    if (data[commonLocators.CommonLabels.REPLACE_DETAILS][labelName] === commonLocators.CommonKeys.CHECK) {
                                      if (!checked) {
                                        cy.get("@checkbox").check();
                                      }
                                    } else if (data[commonLocators.CommonLabels.REPLACE_DETAILS][labelName] === commonLocators.CommonKeys.UNCHECK) {
                                      if (checked) {
                                        cy.get("@checkbox").uncheck();
                                      }
                                    }
                                  });
                              })

                          });
                      })
                  }
                  if (data[commonLocators.CommonLabels.CHANGE_VALUE]) {
                    Object.keys(data[commonLocators.CommonLabels.CHANGE_VALUE])
                      .forEach(function (labelName) {
                        cy.wrap($el)
                          .get(`[class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.F1}']`)
                          .contains(labelName)
                          .click()
                          .then(() => {
                            if (labelName === "Cost/Unit") {
                              cy.get(`${commonLocators.CommonElements.ACTIVE} [class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.F3}']`)
                                .click()
                              cy.get(`${commonLocators.CommonElements.ACTIVE} [class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.F3}']`)
                                .within(($ele) => {
                                  cy.wrap($ele)
                                    .find(`[class*='${app.InputFields.INPUT_GROUP_CONTENT}']`)
                                    .clear()
                                    .type(data[commonLocators.CommonLabels.CHANGE_VALUE][labelName])
                                })
                            }

                            if (labelName === "Comment") {
                              cy.get(`${commonLocators.CommonElements.ACTIVE} [class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.F3}']`)
                                .click()
                              cy.get(`${commonLocators.CommonElements.ACTIVE} [class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.F3}']`)
                                .within(($ele) => {
                                  cy.wrap($ele)
                                    .find(`[class*='${app.InputFields.DOMAIN_TYPE_DESCRIPTION}']`)
                                    .clear()
                                    .type(data[commonLocators.CommonLabels.CHANGE_VALUE][labelName])
                                })
                            }
                          });

                        if (labelName === "Quantity Details") {
                          cy.get(`${commonLocators.CommonElements.ACTIVE} [class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.F3}']`)
                            .click()
                          cy.get(`${commonLocators.CommonElements.ACTIVE} [class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.F3}']`)
                            .within(($ele) => {
                              cy.wrap($ele)
                                .find(`[class*='${app.InputFields.DOMAIN_TYPE_DESCRIPTION}']`)
                                .clear()
                                .type(data[commonLocators.CommonLabels.CHANGE_VALUE][labelName])
                            })
                        }
                      })
                  }
                })
              break;
            default:
              cy.log('No matching header found.')
              break;
          }
        }
      }).then(() => {
        _common.clickOn_modalFooterButton(btn.ButtonText.EXECUTE)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//This wait is necessary
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
      })
  }

  /*
   * This is used to modify resource from wizard
   * Updated Date: 22/12/2023
   * Author : Anurag Singh
  */
  modifyResource_fromWizard(data: DataCells) {

    cy.wait(1000)//This wait is necessary
    _common.waitForLoaderToDisappear()
    cy.get("body")
      .then(($body) => {
        let length = $body.find(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} .${btn.IconButtons.ICO_UP}`).length;
        if (length > 0) {
          for (let index = 1; index <= length; index++) {
            cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} .${btn.IconButtons.ICO_UP}`)
              .eq(0)
              .click();
          }
        }
      }).then(() => {
        for (var headerText of data[commonLocators.CommonLabels.HEADER_TEXT]) {
          _modalView.findModal()
            .wrapElements()
            .contains(commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT, headerText)
            .closest(commonLocators.CommonElements.PANEL_GROUP)
            .as("HEADER")
          switch (headerText) {
            case commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE:
              cy.get('@HEADER')
                .within(($el) => {
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_DOWN}`)
                    .click()
                  if (data[commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]) {
                    cy.wrap($el)
                      .contains(commonLocators.CommonElements.LABEL, data[commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE])
                      .closest(commonLocators.CommonElements.ROW)
                      .within(($ele) => {
                        cy.wrap($ele)
                          .find(commonLocators.CommonElements.RADIO_INPUT)
                          .click()
                      })
                  }
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_UP}`)
                    .click()
                })
              break;

            case commonLocators.CommonLabels.MODIFY_DETAILS:
              cy.get('@HEADER')
                .within(($el) => {
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_DOWN}`)
                    .click()
                })
              if (data[commonLocators.CommonLabels.MODIFY_DETAILS]) {
                cy.get('@HEADER')
                  .within(($el) => {
                    cy.get(`[class*='${app.InputFields.INPUT_GROUP_CONTENT}']`)
                      .first()
                      .clear()
                      .type(data[commonLocators.CommonKeys.NEW_CONFIG_NAME]);
                    cy.wait(1000)
                    cy.get(`[class*='${btn.IconButtons.ICO_REC_DELETE}']`)
                      .click()
                  })
                for (var index in data[commonLocators.CommonLabels.MODIFY_DETAILS]) {
                  cy.get('@HEADER')
                    .within(($el) => {
                      cy.get(`[class*='${btn.IconButtons.ICO_CRITERION_NEW}']`)
                        .click()
                    })
                  cy.get('[class*="rule-container"] [class*="rule-container"]')
                    .eq(parseInt(index))
                    .as("RuleContainer");
                  cy.wait(500);
                  cy.get("@RuleContainer")
                    .find("[class*='ico-menu']")
                    .click();
                  _common.waitForLoaderToDisappear()
                  switch (data[commonLocators.CommonLabels.MODIFY_DETAILS][index].FieldName) {
                    case "Quantity":
                      this.bulkEditor_searchByFieldName(data[commonLocators.CommonLabels.MODIFY_DETAILS][index].FieldName);
                      this.bulkEditor_selectDropDownOption(data[commonLocators.CommonLabels.MODIFY_DETAILS][index].Option, index);
                      this.bulkEditor_setDataToField(data[commonLocators.CommonLabels.MODIFY_DETAILS][index].Option, index, data[commonLocators.CommonLabels.MODIFY_DETAILS][index].OptionData);
                      break;
                  }
                }
              }
              cy.get('@HEADER')
                .within(($el) => {
                  cy.wrap($el)
                    .find(`.${btn.IconButtons.ICO_UP}`)
                    .click()
                })
              break;
            default:
              cy.log('No matching header found.')
              break;
          }
        }
      }).then(() => {
        _common.clickOn_modalFooterButton(btn.ButtonText.EXECUTE)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//This wait is necessary
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
      })
  }

  /*
  * This is used for bulk editor
  * Author : Anurag Singh
 */

  bulkEditor_createNewRule(container_UUID: string, configName: string, createNewRuleData: any) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findButton(app.ContainerElements.SUBVIEW_HEADER_TOOLBAR)
      .toolbar(btn.ToolBar.ICO_CONSTRUCTION_51)
      .clickIn();
    _modalView.findModal()
      .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
      .eq(0)
      .clear()
      .type(configName);
    _modalView.findModal()
      .findButton(btn.IconButtons.ICO_REC_DELETE)
      .clickIn();

    for (var index in createNewRuleData) {
      _modalView.findModal()
        .findButton(btn.IconButtons.ICO_CRITERION_NEW)
        .clickIn();
      cy.get('[class*="rule-container"] [class*="rule-container"]')
        .eq(parseInt(index))
        .as("RuleContainer");
      cy.wait(500);
      cy.get("@RuleContainer")
        .find("[class*='ico-menu']")
        .click();
      switch (createNewRuleData[index].FieldName) {
        case "Quantity":
          this.bulkEditor_searchByFieldName(createNewRuleData[index].FieldName);
          this.bulkEditor_selectDropDownOption(createNewRuleData[index].Option, index);
          this.bulkEditor_setDataToField(createNewRuleData[index].Option, index, createNewRuleData[index].OptionData);
          break;
        case "Description":
          this.bulkEditor_searchByFieldName(createNewRuleData[index].FieldName);
          this.bulkEditor_selectDropDownOption(createNewRuleData[index].Option, index);
          this.bulkEditor_setDataToField(createNewRuleData[index].Option, index, createNewRuleData[index].OptionData);
          break;
        case "UoM Item":
          this.bulkEditor_searchByFieldName(createNewRuleData[index].FieldName);
          this.bulkEditor_selectDropDownOption(createNewRuleData[index].Option, index);
          this.bulkEditor_setDataToField(createNewRuleData[index].Option, index, createNewRuleData[index].OptionData);
          break;
        case "WQ Quantity Item":
          this.bulkEditor_searchByFieldName(createNewRuleData[index].FieldName);
          this.bulkEditor_selectDropDownOption(createNewRuleData[index].Option, index);
          this.bulkEditor_setDataToField(createNewRuleData[index].Option, index, createNewRuleData[index].OptionData);
          break;
        case "Quantity Total":
          this.bulkEditor_searchByFieldName(createNewRuleData[index].FieldName);
          this.bulkEditor_selectDropDownOption(createNewRuleData[index].Option, index);
          this.bulkEditor_setDataToField(createNewRuleData[index].Option, index, createNewRuleData[index].OptionData);
          break;
        case "UoM":
          this.bulkEditor_searchByFieldName(createNewRuleData[index].FieldName);
          this.bulkEditor_selectDropDownOption(createNewRuleData[index].Option, index);
          this.bulkEditor_setDataToField(createNewRuleData[index].Option, index, createNewRuleData[index].OptionData);
          break;
        case "Procurement Structure":
          this.bulkEditor_searchByFieldName(createNewRuleData[index].FieldName);
          this.bulkEditor_selectDropDownOption(createNewRuleData[index].Option, index);
          this.bulkEditor_setDataToField(createNewRuleData[index].Option, index, createNewRuleData[index].OptionData);
          break;
        case "DIN276_2018-12":
          this.bulkEditor_searchByFieldName(createNewRuleData[index].FieldName);
          this.bulkEditor_selectDropDownOption(createNewRuleData[index].Option, index);
          this.bulkEditor_setDataToField(createNewRuleData[index].Option, index, createNewRuleData[index].OptionData);
          break;
        case "BoQ Item Ref. No.":
          this.bulkEditor_searchByFieldName(createNewRuleData[index].FieldName);
          this.bulkEditor_selectDropDownOption(createNewRuleData[index].Option, index);
          this.bulkEditor_setDataToField(createNewRuleData[index].Option, index, createNewRuleData[index].OptionData);
          break;
        case "Activity":
          this.bulkEditor_searchByFieldName(createNewRuleData[index].FieldName);
          this.bulkEditor_selectDropDownOption(createNewRuleData[index].Option, index);
          this.bulkEditor_setDataToField(createNewRuleData[index].Option, index, createNewRuleData[index].OptionData);
          break;
        case "Location":
          this.bulkEditor_searchByFieldName(createNewRuleData[index].FieldName);
          this.bulkEditor_selectDropDownOption(createNewRuleData[index].Option, index);
          this.bulkEditor_setDataToField(createNewRuleData[index].Option, index, createNewRuleData[index].OptionData);
          break;
        case "Price Condition":
          this.bulkEditor_searchByFieldName(createNewRuleData[index].FieldName);
          this.bulkEditor_selectDropDownOption(createNewRuleData[index].Option, index);
          this.bulkEditor_setDataToField(createNewRuleData[index].Option, index, createNewRuleData[index].OptionData);
          break;
        default:
          cy.log("No case found")
          break;
      }
    }
    _modalView.acceptButton("Run");
    cy.wait(4000); // This wait is required as modal take times to load
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
  }

  /*
  * This method is part of bulkEditor_createNewRule method
  * Author : Anurag Singh
 */
  bulkEditor_searchByFieldName(fieldName: string) {
    _common.waitForLoaderToDisappear()
    cy.wait(1000);
    cy.get('input[id="searchfield"]').clear().type(fieldName);
    cy.wait(500);
    _common.waitForLoaderToDisappear()
    _modalView.findModal().findButton(btn.IconButtons.ICO_SEARCH).clickIn();
    cy.wait(500);
    _common.waitForLoaderToDisappear()
    cy.get(".column-id_" + app.GridCells.NAME).each(($el, nameIndex, $list) => {
      const ActVal = $el.text();
      cy.log(ActVal);
      if (ActVal == fieldName) {
        cy.wrap($el).click();
      }
    });
    cy.get("[class*='modal-footer']").last().contains("OK").click();
    _common.waitForLoaderToDisappear()
  }

  /*
   * This method is part of bulkEditor_createNewRule method
   * Author : Anurag Singh
  */

  bulkEditor_selectDropDownOption(option: string, ruleIndex: any) {
    cy.get('[class*="rule-container"] [class*="rule-container"]')
      .eq(parseInt(ruleIndex))
      .as("RuleContainer");
    cy.wait(500);
    _common.waitForLoaderToDisappear()
    cy.get("@RuleContainer")
      .find(".caret")
      .click();
    cy.wait(500);
    _common.waitForLoaderToDisappear()
    _modalView.select_popupItem("grid1", option);
  }

  /*
   * This method is part of bulkEditor_createNewRule method
   * Author : Anurag Singh
  */

  bulkEditor_setDataToField(option: string, ruleIndex: any, optionData: string) {
    cy.get('[class*="rule-container"] [class*="rule-container"]')
      .eq(parseInt(ruleIndex))
      .as("RuleContainer");
    if (option == "Set Value to") {
      cy.get("@RuleContainer")
        .find("[type='text']")
        .clear()
        .type(optionData);
      if (optionData == "%" || optionData == "BAG") {
        _modalView.select_popupItem("grid", optionData);
      }
      if (optionData == "D") {
        _modalView.select_popupItem("grid", optionData);
      }
      if (optionData == "100" || optionData == "110") {
        _modalView.select_popupItem("grid", optionData);
      }
      if (optionData == "10.10.  20.") {
        _modalView.select_popupItem("grid", optionData);
      }
      if (optionData.includes("SCH") || optionData.includes("LC")) {
        _modalView.select_popupItem("grid", optionData);
      }
      if (optionData) {
        _modalView.select_popupItem("list", optionData);
      }
    } else if (option == "Set Description for current Language") {
      cy.get("@RuleContainer").find("textarea").clear().type(optionData);
    } else if (option == "Set Text to") {
      cy.get("@RuleContainer")
        .find("[type='text']")
        .clear()
        .type(optionData);
    }
  }


  /*
  * This is used to update line item quantity
  * Updated Date: 27/12/2023
  * Author : Anurag Singh
 */
  update_lineItem_fromWizard(data: DataCells) {
    cy.wait(50)
      .then(() => {
        for (var mainLabelName of data[commonLocators.CommonLabels.TYPE]) {
          switch (mainLabelName) {
            case "Select Estimate Scope":
              cy.get(`${commonLocators.CommonModalElements.MODAL_BODY}`)
                .find(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`)
                .contains(commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE)
                .closest(`${commonLocators.CommonElements.ROW}`)
                .within(() => {
                  cy.get(`${commonLocators.CommonElements.LABEL}`)
                    .contains(data[commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE])
                    .prev(commonLocators.CommonElements.RADIO_INPUT)
                    .first()
                    .click()
                })
              break;

            case "Update Planned Quantity":
              cy.get(`${commonLocators.CommonModalElements.MODAL_BODY}`)
                .find(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`)
                .contains(commonLocators.CommonLabels.UPDATED_PLANNED_QUANTITY)
                .closest(`${commonLocators.CommonElements.ROW}`)
                .within(() => {
                  cy.get(`${commonLocators.CommonElements.LABEL}`)
                    .contains(data[commonLocators.CommonLabels.UPDATED_PLANNED_QUANTITY])
                    .prev(commonLocators.CommonElements.RADIO_INPUT)
                    .first()
                    .click()
                })
              break;

            case "IQ Quantity Update":
              cy.get(`${commonLocators.CommonModalElements.MODAL_BODY}`)
                .find(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`)
                .contains(commonLocators.CommonLabels.IQ_QUANTITY_UPDATE)
                .closest(`${commonLocators.CommonElements.ROW}`)
                .within(() => {
                  cy.get(`${commonLocators.CommonElements.LABEL}`)
                    .contains(data[commonLocators.CommonLabels.IQ_QUANTITY_UPDATE])
                    .prev(commonLocators.CommonElements.RADIO_INPUT)
                    .first()
                    .click()
                })
              break;

            case "Update Billing Quantity":
              cy.get(`${commonLocators.CommonModalElements.MODAL_BODY}`)
                .find(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`)
                .contains(commonLocators.CommonLabels.UPDATE_BILLING_QUANTITY)
                .closest(`${commonLocators.CommonElements.ROW}`)
                .within(() => {
                  cy.get(`${commonLocators.CommonElements.LABEL}`)
                    .contains(data[commonLocators.CommonLabels.UPDATE_BILLING_QUANTITY])
                    .prev(commonLocators.CommonElements.RADIO_INPUT)
                    .first()
                    .click()
                })
              break;
            default:
              cy.log("No such options.")
              break;
          }
        }
      }).then(() => {
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//This wait is required as it take time to load the modal
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
      })
  }

  /*
   * This is used to update scheduling quantity
   * Updated Date: 27/12/2023
   * Author : Anurag Singh
  */
  update_schedulingQuantities_fromWizard(data: DataCells) {
    cy.wait(50)
      .then(() => {
        Object.keys(data[commonLocators.CommonKeys.CHECKBOX])
          .forEach((labeName) => {
            _modalView.findCheckBox_byLabel(labeName, commonLocators.CommonKeys.CHECKBOX.toLowerCase())
              .as("checkbox")
              .invoke("is", ":checked")
              .then((checked) => {
                if (data[commonLocators.CommonKeys.CHECKBOX][labeName] === commonLocators.CommonKeys.CHECK) {
                  if (!checked) {
                    cy.get("@checkbox").check();
                  }
                } else if (data[commonLocators.CommonKeys.CHECKBOX][labeName] === commonLocators.CommonKeys.UNCHECK) {
                  if (checked) {
                    cy.get("@checkbox").uncheck();
                  }
                }
              })
          })
      }).then(() => {
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//This wait is required as it take time to load the modal
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
      })
  }

  update_adjustCostUnit_in_ResourceSummary(lineitemDes1: string, resourceDescription: string, adjustCostUnit: string) {
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS).findGrid().findCellhasValue(app.GridCells.DESCRIPTION_INFO, lineitemDes1).click();
    _common.maximizeContainer(cnt.uuid.RESOURCES_SUMMARY);
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.RESOURCES_SUMMARY).toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR).findButton(btn.ToolBar.ICO_REFRESH).clickIn();
    _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES_SUMMARY, app.GridCells.DESCRIPTION_INFO, resourceDescription);
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.RESOURCES_SUMMARY).findGrid().findActiveRow().findCell(app.GridCells.ADJUST_COST_UNIT).findTextInput(app.InputFields.INPUT_GROUP_CONTENT).type(adjustCostUnit);
    cy.SAVE();
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.RESOURCES_SUMMARY).toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR).findButton(btn.ToolBar.ICO_INSTANCE_CALCULATE).clickIn();
    _common.minimizeContainer(cnt.uuid.RESOURCES_SUMMARY);
  }

  selectAllRecord_inContainer(container_UUID: string) {
    _mainView.findModuleClientArea().findAndShowContainer(container_UUID).findCell_ByIcon(app.Layouts.INDICATOR_UI_SORTABLE_HANDLE, 0);
  }

  select_location(container_UUID: string, location: string) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .wrapElements()
      .within(() => {
        cy.contains(`[class*='${app.GridCells.CODE}']`, location).should("be.visible");
      });
  }

  dragDrop_locationToLineItem(locationCode: string) {
    cy.get(".cid_1dd77e2e10b54f2392870a53fcb44982 .grid-container [class*='item-field_']").contains(locationCode).as("Drag_location");
    cy.get(".cid_681223e37d524ce0b9bfa2294e18d650 .grid-container [id*='indicator']").click();
    cy.get(".cid_681223e37d524ce0b9bfa2294e18d650 .grid-container .grid-canvas-right [class*='item-field_']").first().as("Drop_LineItem");
    _mainView.dragAndDrop("@Drag_location", "@Drop_LineItem");
  }

  dragDrop_procurementStructureToLineItem(procurementStructure: string) {
    cy.get(".cid_5bafbad1e3fe4bc2a7a114e27972795c .grid-container [class*='item-field_']").contains(procurementStructure).as("Drag_procurementStructure");
    cy.get(".cid_681223e37d524ce0b9bfa2294e18d650 .grid-container [id*='indicator']").click();
    cy.get(".cid_681223e37d524ce0b9bfa2294e18d650 .grid-container .grid-canvas-right [class*='item-field_']").first().as("Drop_LineItem");
    _mainView.dragAndDrop("@Drag_procurementStructure", "@Drop_LineItem");
  }

  enterRecord_toCreateLocation(code: string, description: string) {
    _common.enterRecord_inNewRow(cnt.uuid.PROJECT_LOCATION, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, code);
    _common.enterRecord_inNewRow(cnt.uuid.PROJECT_LOCATION, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, description);
  }

  update_costUnit_toCreatedResource(lineitemDes1: string, costUnit: string) {
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS).findGrid().findCellhasValue(app.GridCells.DESCRIPTION_INFO, lineitemDes1).click();
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.RESOURCES).findGrid().findCell(app.GridCells.COST_UNIT).clickIn();
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.RESOURCES).findGrid().findCell(app.GridCells.COST_UNIT).findTextInput(app.InputFields.INPUT_GROUP_CONTENT).type(costUnit);
    cy.SAVE();
    cy.wait(500)
  }

  textOfEstimateCode() {
    _mainView.findModuleClientArea()
      .findAndShowContainer(cnt.uuid.ESTIMATE)
      .findGrid()
      .findActiveRow()
      .getCell(app.GridCells.CODE, EST_HEADER)
      .wrapElements().then(($ele) => {
        EstimateCode = $ele.text();
        finalEstimateCode = EstimateCode[0];
        cy.log(EstimateCode);
        Cypress.env("finalEstimateCode", EstimateCode);
      });
  }



  confirm_EstimateConfiguration(container_UUID: string) {
    _mainView.findModuleClientArea().findAndShowContainer(container_UUID).toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR).findButton(btn.IconButtons.ICO_SETTING_DOC).clickIn();
  }

  update_LineItem_Quantity_FromPES() {
    cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Update Line Item Quantity").within(() => {
      cy.contains("div", /^From PES$/, { matchCase: true })
        .find("input[type='radio']")
        .click({ force: true });
      cy.contains("button", "OK").click();
    });
    _modalView.findModal().acceptButton(btn.ButtonText.OK);;
  }

  /* Entering record to create package header using Wizard*/
  enterRecord_toCreatePackage_wizard(criteriaSelection: string, newPackageDefination?: string, Configuration?: string, procurementStructure?: string) {
    cy.wait(1000)
    cy.contains(".modal-content", "Create / Update Material Package Assignment")
      .within(() => {
        cy.contains("div", "Selected Line Item").find("#estimateResultSet_3")
          .click();
      });
    _modalView.findModal().caret();
    _mainView.select_popupItem("grid1", criteriaSelection);
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal().acceptButton("Previous");
    _common.waitForLoaderToDisappear()
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal().acceptButton("Previous");
    cy.wait(1000).then(() => {
      _modalView.findModal().acceptButton("Next");
      _modalView.findModal().checkBox_hasLabel("Select").click();
      _modalView.findModal().acceptButton("Next");
    })
    _modalView.findModal()
      .wrapElements()
      .find("[class*='text-center']")
      .then((checkbox) => {
        if (checkbox.find("[checked='checked']").length > 0) {
          cy.contains(".modal-content", "Create / Update Material Package Assignment")
            .within(() => {
              cy.contains("div", "Include Cost Code").find("input").click();
              cy.contains("div", "Set Free Quantity").find("input").click();
              cy.contains("li", "Consolidate to one package for all selected criteria")
                .find("input")
                .click();
            });
        } else {
          cy.contains(".modal-content", "Create / Update Material Package Assignment")
            .within(() => {
              //cy.get("[class*='slick-header-column indicator']").click();
              cy.get("[class*='Selected'] input[type='checkbox']").click({ multiple: true, force: true });
              cy.contains("div", "Include Cost Code").find("input").click();
              cy.contains("div", "Set Free Quantity").find("input").click();
              cy.contains("li", "Consolidate to one package for all selected criteria")
                .find("input")
                .click({ force: true });
            });
        }
        if (newPackageDefination) {
          cy.get("body").then(($body) => {
            if ($body.find(`[class="k-splitbar k-splitbar-horizontal"]`).length > 0) {
              _common.waitForLoaderToDisappear()
              cy.get(`[class*="expand-next"]`).click();
            }
          });
          _modalView.findModal()
            .findInputFieldInsideModal("Procurement structure", app.InputFields.INPUT_GROUP_CONTENT)
            .type(newPackageDefination);
          _modalView.findModal()
            .select_popupItem("grid", newPackageDefination);
          _modalView.findModal()
            .findCaretInsideModal("Configuration");
          _modalView.findModal()
            .select_popupItem("grid", newPackageDefination);
        }
        if (procurementStructure) {
          cy.get("body").then(($body) => {
            if ($body.find(`[class="k-splitbar k-splitbar-horizontal"]`).length > 0) {
              _common.waitForLoaderToDisappear()
              cy.get(`[class*="expand-next"]`).click();
            }
          });
          _modalView.findModal()
            .findInputFieldInsideModal("Procurement structure", app.InputFields.INPUT_GROUP_CONTENT)
            .wait(2000)
            .clear({ force: true })
            .type(procurementStructure, { force: true })
            .then(() => {
              _common.waitForLoaderToDisappear()
              _modalView.select_popupItem("grid", procurementStructure);
            })
        }
        if (Configuration) {
          cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " ")
            .contains(commonLocators.CommonElements.ROW, "Configuration")
            .then((ele) => {
              cy.wrap(ele)
                .find("[class*='" + app.InputFields.INPUT_GROUP_CONTENT + "']")
                .wait(1000)
                .clear({ force: true })
                .type(Configuration, { force: true })
            }).then(() => {
              _common.waitForLoaderToDisappear()
              _modalView.select_popupItem("grid", Configuration);
            })
        }
      });
    _modalView.findModal().acceptButton("OK");
    _common.waitForLoaderToDisappear()
    cy.wait(8000); // This wait is necessary
    _modalView.findModal()
      .wrapElements()
      .find("." + commonLocators.CommonElements.COLUMN_ID + app.GridCells.CODE_CAPS)
      .each(($el, index, $list) => {
        Cypress.env("PACKAGE_CODE_" + index, $el.text())
      })
    _modalView.findModal().acceptButton("Go to package");
  }

  dragDrop_ActivityToLineitem(ActCode: string) {
    cy.get(".cid_f423a7daa8cd474385097af443f3c73f .grid-container [class*='item-field_']").contains(ActCode).as("Drag_location");
    cy.get(".cid_681223e37d524ce0b9bfa2294e18d650 .grid-container [id*='indicator']").click();
    cy.get(".cid_681223e37d524ce0b9bfa2294e18d650 .grid-container .grid-canvas-right [class*='item-field_']").first().as("Drop_LineItem");
    _mainView.dragAndDrop("@Drag_location", "@Drop_LineItem");
  }

  dragDrop_CGToLineitem(CstGrpCode: string) {
    cy.get(".cid_4f3dd493c4e145a49b54506af6da02ef .grid-container [class*='item-field_']").contains(CstGrpCode).as("Drag_CostGroup");
    cy.get(".cid_681223e37d524ce0b9bfa2294e18d650 .grid-container [id*='indicator']").click();
    cy.get(".cid_681223e37d524ce0b9bfa2294e18d650 .grid-container .grid-canvas-right [class*='item-field_']").first().as("Drop_LineItem");
    _mainView.dragAndDrop("@Drag_CostGroup", "@Drop_LineItem");
  }

  assignResponsible_toContract(responsible: string) {
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.PROCUREMENTCONTRACT)
      .findGrid()
      .findActiveRow()
      .findCell(app.GridCells.CLERK_PRC_FK)
      .clickIn()
    cy.wait(500)
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.PROCUREMENTCONTRACT)
      .findGrid()
      .findActiveRow()
      .findCell(app.GridCells.CLERK_PRC_FK)
      .findTextInput(app.InputFields.INPUT_GROUP_CONTENT).first()
      .type(responsible).then(() => {
        cy.wait(500)
        _mainView.select_popupItem("grid", responsible)
        cy.wait(3000);
      });
    cy.SAVE();

  }

  dragDrop_CGToAssemblies(CG_code: string) {
    cy.get(".cid_a523b5adfa3341e9ad997d91a107289f .grid-container [class*='column-id_']").contains(CG_code).as("Drag_CostGroup");
    cy.get(".cid_234bb8c70fd9411299832dcce38ed118 .grid-container [id*='indicator']").click();
    cy.get(".cid_234bb8c70fd9411299832dcce38ed118 .grid-container .grid-canvas-right [class*='column-id_']").first().as("Drop_Assemblies");
    _mainView.dragAndDrop("@Drag_CostGroup", "@Drop_Assemblies");
  }

  dragDrop_LineiteminLineitem(value: string) {
    cy.get(".cid_681223e37d524ce0b9bfa2294e18d650 .grid-container [class*='column-id_']").contains(value).click({ ctrlKey: true }).as("Drag_LineItem");
    cy.get(".cid_681223e37d524ce0b9bfa2294e18d650 .grid-container [id*='indicator']").click();
    cy.get(".cid_681223e37d524ce0b9bfa2294e18d650 .grid-container .grid-canvas-right [class*='column-id_']").first().as("Drop_LineItem");
    _mainView.dragAndDrop("@Drag_LineItem", "@Drop_LineItem");
  }

  dragDrop_BoQiteminLineitem(boqvalue: string) {
    cy.get(".cid_ecaf41be6cc045588297d5efb9745fe4 .grid-container [class*='column-id_']").contains(boqvalue).as("Drag_BoQItem");
    cy.get(".cid_681223e37d524ce0b9bfa2294e18d650 .grid-container [id*='indicator']").click();
    cy.get(".cid_681223e37d524ce0b9bfa2294e18d650 .grid-container .grid-canvas-right [class*='column-id_']").first().as("Drop_LineItem");
    _mainView.dragAndDrop("@Drag_BoQItem", "@Drop_LineItem");
  }

  textOfLocationCode() {
    _mainView.findModuleClientArea()
      .findAndShowContainer(cnt.uuid.PROJECT_LOCATION)
      .findGrid()
      .findActiveRow()
      .getCell(app.GridCells.CODE)
      .wrapElements()
      .then(($ele) => {
        locationCode = $ele.text();

        cy.log(locationCode);
      });
  }

  edit_LineItem_ProjectChange(quantity: string, boqRelation: string, AOTRelation: string, projectName: string, description: string, changeType?:string) {
    cy.wait(500);
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS).findGrid().findActiveRow().findCell(app.GridCells.QUANTITY_SMALL).findTextInput(app.InputFields.INPUT_GROUP_CONTENT).type(quantity, { force: true });
    cy.wait(500)
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS).findGrid().findActiveRow().findCell(app.GridCells.EST_QTY_REL_BOQ_FK).caret();
    _mainView.select_popupItem("span", boqRelation);
    cy.wait(500)
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS).findGrid().findActiveRow().findCell(app.GridCells.EST_QTY_TELAOT_FK).caret();
    _mainView.select_popupItem("span", AOTRelation);
    cy.wait(500)
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS).findGrid().findActiveRow().findCell(app.GridCells.PRJ_CHANGE_FK).findButton(btn.IconButtons.ICO_INPUT_ADD).clickIn();
    _common.waitForLoaderToDisappear()
    _modalView.findModal().findInputFieldInsideModal("Project", app.InputFields.INPUT_GROUP_CONTENT).clear({ force: true }).type(projectName, { force: true });
    _common.waitForLoaderToDisappear()
    _mainView.select_popupItem("grid", projectName);
    _common.waitForLoaderToDisappear()
    _modalView.findModal()
      .findCaretByLabel(commonLocators.CommonLabels.CHANGE_TYPE)
      .then(() => {
        _modalView.select_popupItem(commonLocators.CommonKeys.LIST, 'Design Change');
        cy.wait(1000);//wait is required to load data in modal(change type)                  
      })
    cy.wait(1000);//wait is required 
    _modalView.findModal().findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type(description, { force: true });
    _common.waitForLoaderToDisappear()
    _modalView.findModal().acceptButton(btn.ButtonText.OK);
  }

  assign_LocationCode_To_Line_Items(container_UUID: string, Gridcell: string, code: string) {
    _common.clickOn_activeRowCell(container_UUID, Gridcell)
    _common.edit_dropdownCellWithInput(container_UUID, Gridcell, "grid", app.InputFields.INPUT_GROUP_CONTENT, code)
  }

  add_LineItemsStructure(StructureInputs: string) {
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.LINEITEMSSTRUCTURE).findButton(btn.IconButtons.ICO_INPUT_ADD).clickIn();
    cy.get("[class*='popup-container'] [class*='generic-popup'] [class='form-control']").type(StructureInputs);
    _mainView.select_popupItem("grid1", StructureInputs);
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.LINEITEMSSTRUCTURE).toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR).findButton(btn.ToolBar.ICO_REFRESH).clickIn();
  }

  verify_BudgetForLineItem(container_UUID: string, XFactor: any) {
    var expected_Budget: any;
    var actual_Budget: any;

    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findGrid()
      .findActiveRow()
      .getCell(app.GridCells.GRAND_TOTAL)
      .wrapElements()
      .then(($ele) => {
        let GrandTotal = $ele.text();
        var grandTotal_Value = GrandTotal.replace(",", "");
        var budget = parseFloat(grandTotal_Value) * parseFloat(XFactor);
        expected_Budget = budget.toFixed(2);
        cy.log(expected_Budget);
      });
    cy.REFRESH_CONTAINER()
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findGrid()
      .findActiveRow()
      .getCell(app.GridCells.BUDGET)
      .wrapElements()
      .then(($ele) => {
        var value = $ele.text();
        var budget = value.replace(",", "");
        actual_Budget = Number(budget).toFixed(2);
        cy.log(actual_Budget);
        expect(expected_Budget).equals(actual_Budget);
      });
  }

  openModalContainerByDownArrow() {
    cy.wait(3000);
    cy.get("body").then(($body) => {
      let length = $body.find(".modal-body .ico-down").length;
      if (length > 0) {
        for (let index = 1; index <= length; index++) {
          cy.get(".modal-body .ico-down").click();
        }
      }
    });
  }

  boq_RoundingConfiguration(roundConfigureType: string, roundingConfigureDetails: any) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(cnt.uuid.BOQ_STRUCTURES)
      .findButtonWithTitle("Document Properties").clickIn()
    cy.wait(3000);
    _modalView.findModal()
      .findCheckBox_byLabel("Edit BoQ Configuration", "checkbox")
      .as("checkbox")
      .invoke("is", ":checked")
      .then((checked) => {
        if (!checked) {
          cy.get("@checkbox").check();
        }
      });
    cy.wait(3000);
    _modalView.acceptButton("Rounding Configuration");
    cy.wait(3000);
    _modalView.findModal()
      .findInputFieldInsideModal("Rounding Config Type", app.InputFields.INPUT_GROUP_CONTENT)
      .type(roundConfigureType, { force: true });
    _modalView.select_popupItem("list", roundConfigureType);
    cy.wait(3000);
    cy.get("[class*='modal-dialog']")
      .eq(1).within(() => {
        _modalView.findCheckbox_byLabelnModal("platform-form-row", "Edit Type", 0).as("checkbox")
          .invoke("is", ":checked")
          .then((checked) => {
            if (!checked) {
              cy.get("@checkbox").check();
            }
          });
        roundingConfigureDetails.forEach((detail) => {
          cy.log(detail.ColumnID);
          _modalView.findCellhasValue(app.GridCells.BOQ_ROUNDING_COLUMN_ID, detail.ColumnID)
            .click({ force: true });
          cy.log(detail.UIDisplayTo);
          _modalView.findActiveRow()
            .findCell(app.GridCells.UI_DISPLAY_TO)
            .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
            .type(detail.UIDisplayTo);
          cy.log(detail.WithoutRounding);
          let checkboxVal = detail.WithoutRounding;
          _modalView.findActiveRow()
            .checkbox_inCell(app.GridCells.IS_WITHOUT_RONDING)
            .as("checkbox")
            .invoke("is", ":checked")
            .then((checkbox) => {
              if (checkboxVal === "yes") {
                if (!checkbox) {
                  cy.get("@checkbox").check();
                }
              } else if (checkboxVal === "no") {
                if (checkbox) {
                  cy.get("@checkbox").uncheck();
                }
              }
            });
          cy.log(detail.RoundTo);
          _modalView.findActiveRow()
            .findCell(app.GridCells.ROUND_TO)
            .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
            .type(detail.RoundTo);

          _modalView.findCellhasValue(app.GridCells.BOQ_ROUNDING_COLUMN_ID, detail.ColumnID)
            .click();
        })
        cy.wait(500);
        cy.get("[class*='modal-footer']").eq(0).contains("OK").click();
      });
    cy.wait(500);
    cy.get("[class*='modal-footer']").eq(0).contains("OK").click();
  }

  estimate_RoundingConfiguration(roundConfigureType: string, roundingConfigureDetails: any) {
    cy.wait(500);
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS).findButtonWithTitle("Estimate Configuration Dialog").clickIn();
    cy.wait(500);
    _modalView.findModal()
      .findCheckBox_byLabel("Edit Estimate Type", "checkbox")
      .as("checkbox")
      .invoke("is", ":checked")
      .then((checked) => {
        if (!checked) {
          cy.get("@checkbox").check();
        }
      });
    cy.wait(500);
    cy.get("[class*='modal-dialog'] [class^='platform-form-row']").contains("Rounding Config Type").scrollIntoView();
    cy.wait(500);
    _modalView.findInputFieldInsideModal("Rounding Config Type", app.InputFields.INPUT_GROUP_CONTENT).type(roundConfigureType, { force: true }).then(() => {
      _modalView.select_popupItem("list", roundConfigureType);
    })
    cy.get('[class*="modal-content"]')
      .contains(`${commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT}`, "Rounding Configuration")
      .closest(`${commonLocators.CommonElements.PANEL_GROUP}`)
      .within(() => {
        cy.wait(1500);
        _modalView.findCheckBox_byLabel("Edit Type", "checkbox")
          .as("editTypeCheckbox")
          .invoke("is", ":checked")
          .then((checked) => {
            if (!checked) {
              cy.get("@editTypeCheckbox").check({ force: true });
            }
          });
        for (var index in roundingConfigureDetails) {
          cy.log(roundingConfigureDetails[index].ColumnID);
          _modalView.findCellhasValue(app.GridCells.EST_ROUNDING_COLUMN_ID, roundingConfigureDetails[index].ColumnID).click();
          cy.log(roundingConfigureDetails[index].UIDisplayTo);
          _modalView.findActiveRow().findCell(app.GridCells.UI_DISPLAY_TO).findTextInput(app.InputFields.INPUT_GROUP_CONTENT).type(roundingConfigureDetails[index].UIDisplayTo);
          _modalView.findCellhasValue(app.GridCells.EST_ROUNDING_COLUMN_ID, roundingConfigureDetails[index].ColumnID).click();
          cy.log(roundingConfigureDetails[index].WithoutRounding);
          let checkboxVal = roundingConfigureDetails[index].WithoutRounding;
          _modalView.findActiveRow()
            .checkbox_inCell(app.GridCells.IS_WITHOUT_RONDING)
            .as("checkbox")
            .invoke("is", ":checked")
            .then((checked) => {
              if (checkboxVal == "yes") {
                if (!checked) {
                  cy.get("@checkbox").check();
                }
              } else if (checkboxVal == "no") {
                if (checked) {
                  cy.get("@checkbox").uncheck();
                }
              }
            });
          if (checkboxVal == "no") {
            cy.log(roundingConfigureDetails[index].RoundTo);
            _modalView.findCellhasValue(app.GridCells.EST_ROUNDING_COLUMN_ID, roundingConfigureDetails[index].ColumnID).click();
            _modalView.findActiveRow().findCell(app.GridCells.ROUND_TO).findTextInput(app.InputFields.INPUT_GROUP_CONTENT).type(roundingConfigureDetails[index].RoundTo);
          }
          _modalView.findCellhasValue(app.GridCells.EST_ROUNDING_COLUMN_ID, roundingConfigureDetails[index].ColumnID).click();
        }
      });
    cy.wait(500);
    cy.get("[class*='modal-footer']").eq(0).contains("OK").click();
    cy.wait(500);
  }

  splitLineItem_ByQuantity_And_QuantityTotal(radioLabel1: string, splitMethod: string, radioLabel2: string, gridCell: string, quantity: any, gridCell1: string) {
    _modalView.findModal().findRadio_byLabel(radioLabel1, "radio", 0);
    _modalView.findModal().findCaretInsideModal("Split method");
    _modalView.select_popupItem("list", splitMethod);
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal().findRadio_byLabel(radioLabel2, "radio", 0);
    cy.wait(500);
    cy.get("[class*='modal-content'] [class*='grid-canvas-right'] [class*='ico-base-line']").eq(1).click({ force: true });
    _modalView.findModalBody().findGridCanvas("right").findActiveRow().findCell(gridCell);
    _modalView.findModal().findInputFieldInsideModal("Selected Items", app.InputFields.INPUT_GROUP_CONTENT).clear().type(quantity, { force: true });
    cy.wait(500);
    _modalView.findModalBody().findGridCanvas("right").findActiveRow().findCell_ByIcon(app.GridCellIcons.ICO_BASE_LINE, 0);
    _modalView.findModalBody()
      .findGridCanvas("right")
      .findActiveRow()
      .getCell(gridCell1)
      .wrapElements()
      .then(($value) => {
        let quantityValue = $value.text();
        Cypress.env("QuantityTotal1", quantityValue);
        cy.log(Cypress.env("QuantityTotal1"));
      });
    cy.get("[class*='modal-content'] [class*='grid-canvas-right'] [class*='ico-base-line']").eq(2).click({ force: true });
    _modalView.findModalBody()
      .findGridCanvas("right")
      .findActiveRow()
      .getCell(gridCell1)
      .wrapElements()
      .then(($value) => {
        let quantityValue = $value.text();
        Cypress.env("QuantityTotal2", quantityValue);
        cy.log(Cypress.env("QuantityTotal2"));
      });
    cy.wait(500);
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal().acceptButton("Finish");
    cy.wait(3000);
    cy.get("[class='message ng-binding']").then(function (element) {
      const actualtext = element.text();
      expect(actualtext.includes("Done Successfully")).to.be.true;
    });
    cy.contains("button", "OK").click();
  }



  collapstree(container_UUID: string) {
    cy.get(`[class*="${container_UUID}`).then(($ele) => {
      cy.wait(3000);
      if ($ele.find("[class*='tree'] [class$='ico-tree-expand']").length > 0) {
        cy.log("sidebar already expanded....");
        cy.get(`[class*="${container_UUID}"] [class*='tree'] [class$='ico-tree-expand']`).eq(0).click({ multiple: true });
      } else {
        cy.log("tree not expanded....");
        cy.get(`[class*="${container_UUID}"] [class*='tree'] [class$='ico-tree-expand']`).eq(0).click();
        cy.get(`[class*="${container_UUID}"] [class*='tree'] [class$='ico-tree-expand']`).eq(0).click();
      }
    });
  }

  estimate_configuration_for_totals(DefaultWIC: string, label1: string, costCode1: string, label2: string, costCode2: string) {
    cy.wait(500);
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS).findButtonWithTitle("Estimate Configuration Dialog").clickIn();
    cy.wait(500);
    _modalView.findCheckbox_byLabelnModal("platform-form-row form-group", "Edit Estimate Type", 0).check();
    _modalView.findModalBody().findCaretByLabel("Default WIC Group");
    _modalView.select_popupItem("grid", DefaultWIC);
    _modalView.findCheckbox_byLabelnModal("platform-form-row form-group", "Edit Type", 0).check();
    cy.get('[class*="modal-content"] [class*="panel-group"]')
      .eq(2)
      .within(() => {
        cy.wait(500);
        _modalView
          .findCheckBox_byLabel("Edit Type", "checkbox")
          .as("editTypeCheckbox")
          .invoke("is", ":checked")
          .then((checked) => {
            if (!checked) {
              cy.get("@editTypeCheckbox").check();
            }
          });
      });
    /*   this.addTotalconfiguration(label1);
      _modalView.findActiveRow().checkbox_inCell(app.gridCells.ISLABOUR).check();
      _modalView.findActiveRow().checkbox_inCell(app.GridCells.IS_BOLD).check();
      _modalView.findActiveRow().checkbox_inCell(app.gridCells.ISITALIC).check();
      this.addcostcodeassignment();
      this.verify_Assign_Cost_Code(costCode1); */
    cy.wait(3000);
    this.addTotalconfiguration(label2);
    _modalView.findActiveRow().checkbox_inCell(app.GridCells.IS_BOLD).check();
    this.addcostcodeassignment();
    this.verify_Assign_Cost_Code(costCode2);
    this.addcostcodeassignment();
    this.verify_Assign_Cost_Code(costCode1);
    cy.get("[data-model*='entity.costCodeAssignmentDetails']").within(() => {
      cy.get("[class*='active'] [class*='description']").click();
    });
    cy.get('[class*="modal-content"]').contains("button", "OK").click();
  }

  splitLineItem_byResources(radioLabel1: string, splitMethod: string, radioLabel2: string) {
    _modalView.findModal().findRadio_byLabel(radioLabel1, "radio", 0);
    _modalView.findModal().findCaretInsideModal("Split method");
    _modalView.select_popupItem("list", splitMethod);
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal().findRadio_byLabel(radioLabel2, "radio", 0);
    cy.wait(500);
    _modalView.findModal().acceptButton("Finish");
    cy.wait(3000);
    cy.get("[class='message ng-binding']").then(function (element) {
      const actualtext = element.text();
      expect(actualtext.includes("Done Successfully")).to.be.true;
    });
    cy.contains("button", "OK").click();
  }



  copyReferenceLineItem(container_UUID: string, containerPosition?: number) {
    _mainView.findModuleClientArea().findAndShowContainer(container_UUID, containerPosition).toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR).findButton(btn.ToolBar.ICO_COPY_LINE_ITEM_REF).clickIn();
    cy.wait(3000);
  }



  dragDrop_sourceLineItemToLineItem(sourceContainerId: string, destinationContainerId: string, estimateHeaderDesc: string) {
    cy.get(".cid_" + sourceContainerId + " .grid-container .column-id_" + app.GridCells.ESTIMATION_DESCRIPTION)
      .contains(estimateHeaderDesc)
      .as("Drag_Source");
    cy.get(".cid_" + destinationContainerId + " .grid-container [id*='indicator']").click();
    cy.get(".cid_" + destinationContainerId + " .grid-container [id*='indicator']")
      .first()
      .as("Drop_Destination");
    _mainView.dragAndDrop("@Drag_Source", "@Drop_Destination");
  }

  add_sourceLineItem(container_UUID: string, estimateFilterType: string, project: string, estimateHeaderDesc: string) {
    switch (estimateFilterType) {
      case "Project Estimate":
        _mainView.findCaretByLabel("Estimate Filter Type");
        _mainView.select_popupItem("grid1", estimateFilterType);
        _mainView.findModuleClientArea().findAndShowContainer(container_UUID).findButton(btn.IconButtons.ICO_INPUT_LOOKUP).wrapElements().eq(0).click();
        cy.wait(500)
        _modalView.acceptButton(btn.ButtonText.REFRESH);
        cy.wait(1000)
        _modalView.findModal().findTextInput(app.InputFields.FORM_CONTROL).eq(0).clear({ force: true }).type(project);
        _modalView.findModal().findButton(btn.IconButtons.ICO_SEARCH).clickIn();
        _modalView.findModal().findCellhasValue(app.GridCells.PROJECT_NAME, project).eq(0).click();
        _modalView.acceptButton(btn.ButtonText.OK);
        cy.wait(500);
        _mainView.findInputInContainerByLabel(container_UUID, "Estimate Header").clear().type(estimateHeaderDesc);
        cy.wait(500);
        _mainView.select_popupItem("grid", estimateHeaderDesc);
        _mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findCellhasValue(app.GridCells.ESTIMATION_DESCRIPTION, estimateHeaderDesc).click({ force: true });
        break;
    }
  }

  verify_LineItemsCreatedFromSuggestedAssemblies(assembly: string) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      .findGrid()
      .getCell(app.GridCells.EST_ASSEMBLY_FK)
      .wrapElements()
      .then(($value) => {
        let assemblies = $value.text();
        expect(assemblies).equals(assembly);
      });
  }

  addTotalconfiguration(Lablal: string) {
    cy.get("[data-model*='entity.EstTotalsConfigDetails']").within(() => {
      _modalView.findButton(btn.ToolBar.ICO_REC_NEW).clickIn();
      _modalView.findActiveRow().findCell(app.GridCells.DESCRIPTION).typeIn(Lablal);
    });
  }

  addTotalconfigurationandLineType(Lablal: string, LINETYPE: string) {
    cy.get("[data-model*='entity.EstTotalsConfigDetails']").within(() => {
      _modalView.findButton(btn.ToolBar.ICO_REC_NEW)
        .clickIn();
      _modalView.findActiveRow()
        .findCell(app.GridCells.DESCRIPTION)
        .typeIn(Lablal);
      cy.wait(500)
      _modalView.findActiveRow()
        .findCell(app.GridCells.LINETYPE)
        .typeIn(LINETYPE)
      cy.wait(500)
    });
  }
  selelectModalPopUp(LINETYPE: string) {
    _modalView.select_popupItem("grid", LINETYPE)
    _modalView.findActiveRow()
      .checkbox_inCell(app.GridCells.IS_BOLD)
      .check();
  }

  addAssignment() {
    cy.get('[data-model*="entity.costCodeAssignmentDetails"]').within(() => {
      _modalView.findButton(btn.ToolBar.ICO_REC_NEW).clickIn();
      _modalView.findActiveRow().findCell(app.GridCells.EST_MDC_COST_CODE_FK).findButton(btn.IconButtons.ICO_INPUT_LOOKUP).clickIn();
      cy.wait(500);
    });
  }
  addcostcodeassignment() {
    cy.get('[data-model*="entity.costCodeAssignmentDetails"]').within(() => {
      _modalView.findButton(btn.ToolBar.ICO_REC_NEW).clickIn();
      _modalView.findActiveRow().findCell(app.GridCells.EST_MDC_COST_CODE_FK).findButton(btn.IconButtons.ICO_INPUT_LOOKUP).clickIn();
      cy.wait(500);
    });
  }
  verify_Assign_Cost_Code(costcode: string) {
    cy.contains(".modal-content", "Cost Codes").within(() => {
      cy.wait(500);
      _modalView.findTextInput(app.InputFields.FORM_CONTROL).type(costcode);
      _modalView.findButtonWithTitle(btn.ButtonText.SEARCH).clickIn();
      _mainView.findGrid().containsValue(costcode).click();
      cy.contains("button", "OK").click();
    });
  }

  verify_Totals_to_grand_total(data: string, lineitemDescription: string) {
    cy.wait(500);
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ESTIMATETOTALS).toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR).findButton(btn.ToolBar.ICO_TOTAL).clickIn();
    cy.wait(500);
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ESTIMATETOTALS).toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR).findButton(btn.ToolBar.ICO_RECALCULATE).clickIn();
    cy.wait(3000);
    _common.maximizeContainer(cnt.uuid.ESTIMATETOTALS);
    _mainView.findModuleClientArea()
      .findAndShowContainer(cnt.uuid.ESTIMATETOTALS)
      .findGrid()
      .containsValue(data)
      .scrollIntoView()
      .click({ force: true }); _mainView.findModuleClientArea()
        .findAndShowContainer(cnt.uuid.ESTIMATETOTALS)
        .findGrid()
        .findActiveRow()
        .getCell(app.GridCells.TOTAL)
        .wrapElements()
        .then(($ele) => {
          TotalsGrandTotal = $ele.text();
          cy.log("Grand Total is " + TotalsGrandTotal);
        });
    _common.minimizeContainer(cnt.uuid.ESTIMATETOTALS);
    cy.wait(500);
    _common.select_dataFromSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, lineitemDescription);
    _mainView.findModuleClientArea()
      .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      .findGrid()
      .findActiveRow()
      .getCell(app.GridCells.GRAND_TOTAL)
      .wrapElements()
      .then(($ele) => {
        Grandtotal = $ele.text();
        cy.log("Line item Grandtotal is " + Grandtotal);
      });
    expect(TotalsGrandTotal).to.equals(Grandtotal);
  }


  generate_projectBoqFromLineItems_fromWizard(GroupCriteria: string) {
    switch (GroupCriteria) {
      case "None":
        _modalView.findModalBody().findCaretInsideModal("Group Criteria").then(() => {
          _modalView.select_popupItem("grid1", "None");
        })
        cy.wait(500);
        cy.contains(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS, "Generate Project BoQs from Line Items").within(() => {
          cy.contains("button", btn.ButtonText.NEXT).click();
          cy.wait(500);
          cy.get(commonLocators.CommonElements.BOQ_ITEM_ICON).click({ multiple: true });
          cy.wait(500);
          cy.contains("button", btn.ButtonText.EXECUTE).click();
        });
        cy.get(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS).contains("button", btn.ButtonText.OK).click();
        break;
      case "WICItemRefNo":
        _modalView.findModalBody().findCaretInsideModal("Group Criteria").then(() => {
          _modalView.select_popupItem("grid1", "WIC Item Ref. No.");
        })
        cy.wait(500);
        cy.contains(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS, "Generate Project BoQs from Line Items").within(() => {
          cy.contains("button", btn.ButtonText.NEXT).click();
          cy.wait(500);
          cy.get(commonLocators.CommonElements.BOQ_ITEM_ICON).click({ multiple: true });
          cy.wait(500);
          cy.contains("button", btn.ButtonText.EXECUTE).click();
        });
        cy.get(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS).contains("button", btn.ButtonText.OK).click();
        break;
      case "lineitemstructures":
        _modalView.findModalBody().findCaretInsideModal("Group Criteria").then(() => {
          _modalView.select_popupItem("grid1", "Line Items Structure");
        })
        cy.wait(500);
        cy.contains(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS, "Generate Project BoQs from Line Items").within(() => {
          cy.contains("button", btn.ButtonText.NEXT).click();
          cy.wait(500);
          cy.get(commonLocators.CommonElements.BOQ_ITEM_ICON).click({ multiple: true });
          cy.wait(500);
          cy.contains("button", btn.ButtonText.EXECUTE).click();
        });
        cy.get(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS).contains("button", btn.ButtonText.OK).click();
        break;
    }
  }
  verify_EstimateLineItemQuantity(container_UUID: any, gridCellClass: any, qty: any) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findGrid()
      .getCell(gridCellClass)
      .wrapElements()
      .then(($val) => {
        expect(parseFloat($val.text()).toFixed(2)).equal(parseFloat(qty).toFixed(2));
      });
  }



  getListOfCodeUnderResource(container_UUID: string) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findGrid()
      .getCell(app.GridCells.CODE)
      .wrapElements()
      .each(($els, index, $list) => {
        Cypress.env("Code" + index, $els.text());
      });
  }

  verify_RemoveAssemblyTemplateWithResourcesMaintained(container_UUID: string, container_UUID_EstimateLineItem: string) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findGrid()
      .getCell(app.GridCells.CODE)
      .wrapElements()
      .each(($els, index, $list) => {
        expect(Cypress.env("Code" + index)).equal($els.text());
      });
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID_EstimateLineItem)
      .findGrid()
      .findActiveRow()
      .getCell(app.GridCells.CODE)
      .clickIn()
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID_EstimateLineItem)
      .findGrid()
      .findActiveRow()
      .getCell(app.GridCells.EST_ASSEMBLY_FK)
      .wrapElements()
      .then(($val) => {
        expect($val.text()).equals("");
      });
  }

  remove_AssemblyTemplate(container_UUID: string) {
    _mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findActiveRow().findCell(app.GridCells.EST_ASSEMBLY_FK).findButton(btn.IconButtons.ICO_INPUT_DELETE).clickIn();
  }

  GenerateEstimateFromReferenceBoQ_usingWizard(casetype: String, Project: string, BoQ: string, Estimate: string) {
    switch (casetype) {
      case "RefNo-Overwrite":
        _modalView.findModalBody()
          .findRadio_byLabel_Col("RefNo", "radio", 0)
          .click();
        _modalView.findModalBody()
          .findButton(btn.ToolBar.ICO_REC_NEW)
          .clickIn();
        _modalView.findModalBody()
          .findCell(app.GridCells.PROJECT_WIC_CODE)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(Project);
        _mainView.select_popupItem("grid", Project);
        _modalView.findModalBody()
          .findCell(app.GridCells.BOQ_HEADER_FK)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(BoQ);
        _mainView.select_popupItem("grid", BoQ);
        _modalView.findModalBody()
          .findCell(app.GridCells.EST_HEADER_ID)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(Estimate);
        _mainView.select_popupItem("grid", Estimate);
        _modalView.findModalBody()
          .findCell(app.GridCells.EST_HEADER_DESCRIPTION)
          .clickIn();
        _modalView.findModalBody()
          .findRadio_byLabel_Col("Overwrite", "radio", 0)
          .click();
        _modalView.findModal()
          .acceptButton(btn.ButtonText.OK);;
        cy.wait(2000) // required wait to load new popup
        _modalView.findModal()
          .acceptButton(btn.ButtonText.OK);;
        break;

      case "RefNo-Append":
        _modalView.findModalBody()
          .findRadio_byLabel_Col("RefNo", "radio", 0)
          .click();
        _modalView.findModalBody()
          .findButton(btn.ToolBar.ICO_REC_NEW)
          .clickIn();
        _modalView.findModalBody()
          .findCell(app.GridCells.PROJECT_WIC_CODE)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(Project);
        _mainView.select_popupItem("grid", Project);
        _modalView.findModalBody()
          .findCell(app.GridCells.BOQ_HEADER_FK)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(BoQ);
        _mainView.select_popupItem("grid", BoQ);
        _modalView.findModalBody()
          .findCell(app.GridCells.EST_HEADER_ID)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(Estimate);
        _mainView.select_popupItem("grid", Estimate);
        _modalView.findModalBody()
          .findCell(app.GridCells.EST_HEADER_DESCRIPTION)
          .clickIn();
        _modalView.findModalBody()
          .findRadio_byLabel_Col("Append", "radio", 1)
          .click();
        _modalView.findModal()
          .acceptButton(btn.ButtonText.OK);;
        _modalView.findModal()
          .acceptButton(btn.ButtonText.OK);
        break;

      case "RefNo-Ignore":
        _modalView.findModalBody()
          .findRadio_byLabel_Col("RefNo", "radio", 0)
          .click();
        _modalView.findModalBody()
          .findButton(btn.ToolBar.ICO_REC_NEW).clickIn();
        _modalView.findModalBody()
          .findCell(app.GridCells.PROJECT_WIC_CODE).findTextInput(app.InputFields.INPUT_GROUP_CONTENT).type(Project);
        _mainView.select_popupItem("grid", Project);
        _modalView.findModalBody()
          .findCell(app.GridCells.BOQ_HEADER_FK)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(BoQ);
        _mainView.select_popupItem("grid", BoQ);
        _modalView.findModalBody()
          .findCell(app.GridCells.EST_HEADER_ID)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(Estimate);
        _mainView.select_popupItem("grid", Estimate);
        _modalView.findModalBody()
          .findCell(app.GridCells.EST_HEADER_DESCRIPTION)
          .clickIn();
        _modalView.findModalBody()
          .findRadio_byLabel_Col("Ignore", "radio", 2)
          .click();
        _modalView.findModal()
          .acceptButton(btn.ButtonText.OK);;
        _modalView.findModal()
          .acceptButton(btn.ButtonText.OK);;
        break;

      case "WIC-Overwrite":
        _modalView.findModalBody()
          .findRadio_byLabel_Col("WIC", "radio", 1)
          .click();
        _modalView.findModalBody()
          .findButton(btn.ToolBar.ICO_REC_NEW)
          .clickIn();
        _modalView.findModalBody()
          .findCell(app.GridCells.PROJECT_WIC_CODE)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(Project);
        _mainView.select_popupItem("grid", Project);
        _modalView.findModalBody()
          .findCell(app.GridCells.BOQ_HEADER_FK)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(BoQ);
        _mainView.select_popupItem("grid", BoQ);
        _modalView.findModalBody()
          .findCell(app.GridCells.EST_HEADER_ID)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(Estimate);
        _mainView.select_popupItem("grid", Estimate);
        _modalView.findModalBody()
          .findCell(app.GridCells.EST_HEADER_DESCRIPTION)
          .clickIn();
        _modalView.findModalBody()
          .findRadio_byLabel_Col("Overwrite", "radio", 0)
          .click();
        _modalView.findModal()
          .acceptButton(btn.ButtonText.OK);;
        _modalView.findModal()
          .acceptButton(btn.ButtonText.OK);;
        break;

      case "WIC-Append":
        _modalView.findModalBody()
          .findRadio_byLabel_Col("WIC", "radio", 1)
          .click();
        _modalView.findModalBody()
          .findButton(btn.ToolBar.ICO_REC_NEW)
          .clickIn();
        _modalView.findModalBody()
          .findCell(app.GridCells.PROJECT_WIC_CODE)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(Project);
        _mainView.select_popupItem("grid", Project);
        _modalView.findModalBody()
          .findCell(app.GridCells.BOQ_HEADER_FK)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(BoQ);
        _mainView.select_popupItem("grid", BoQ);
        _modalView.findModalBody()
          .findCell(app.GridCells.EST_HEADER_ID)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT).
          type(Estimate);
        _mainView.select_popupItem("grid", Estimate);
        _modalView.findModalBody()
          .findCell(app.GridCells.EST_HEADER_DESCRIPTION)
          .clickIn();
        _modalView.findModalBody()
          .findRadio_byLabel_Col("Append", "radio", 1)
          .click();
        _modalView.findModal()
          .acceptButton(btn.ButtonText.OK);;
        _modalView.findModal()
          .acceptButton(btn.ButtonText.OK);;
        break;

      case "WIC-Ignore":
        _modalView.findModalBody()
          .findRadio_byLabel_Col("WIC", "radio", 1)
          .click();
        _modalView.findModalBody()
          .findButton(btn.ToolBar.ICO_REC_NEW)
          .clickIn();
        _modalView.findModalBody().findCell(app.GridCells.PROJECT_WIC_CODE)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(Project);
        _mainView.select_popupItem("grid", Project);
        _modalView.findModalBody()
          .findCell(app.GridCells.BOQ_HEADER_FK)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(BoQ);
        _mainView.select_popupItem("grid", BoQ);
        _modalView.findModalBody().findCell(app.GridCells.EST_HEADER_ID)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(Estimate);
        _mainView.select_popupItem("grid", Estimate);
        _modalView.findModalBody()
          .findCell(app.GridCells.EST_HEADER_DESCRIPTION)
          .clickIn();
        _modalView.findModalBody()
          .findRadio_byLabel_Col("Ignore", "radio", 2)
          .click();
        _modalView.findModal()
          .acceptButton(btn.ButtonText.OK);;
        _modalView.findModal()
          .acceptButton(btn.ButtonText.OK);;
        break;
    }
  }
  /* Entering record to create multiple package header using Wizard*/
  enterRecord_toCreateCostCodePackage_wizard(criteriaSelection: string) {
    cy.contains(".modal-content", "Create / Update Material Package Assignment").within(() => {
      cy.contains("div", "Entire Estimate").find("#entireEstimate_2").click();
    });
    _modalView.findModal().caret();
    _mainView.select_popupItem("grid1", criteriaSelection);
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal().acceptButton("Previous");
    cy.wait(500);
    _modalView.findModal().acceptButton("Next");
    cy.get('[class*="modal-dialog"] [class*="flex-element"]')
      .eq(0)
      .within(() => {
        cy.contains("div", "Select").find('[type="checkbox"]').click();
      });
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal()
      .wrapElements()
      .find("[class*='text-center']")
      .then((checkbox) => {
        if (checkbox.find("[checked='checked']").length > 0) {
          cy.contains(".modal-content", "Create / Update Material Package Assignment").within(() => {
            cy.contains("div", "Include Cost Code").find("input").click();
          });
        } else {
          cy.contains(".modal-content", "Create / Update Material Package Assignment").within(() => {
            //cy.get("[class*='slick-header-column indicator']").click();
            cy.get("[class*='Selected'] input[type='checkbox']").click({ multiple: true, force: true });
            cy.contains("div", "Include Cost Code").find("input").click();
          });
        }

        _modalView.findModal().wrapElements().find("[class*='text-center']").eq(0).click({ force: true })
        _modalView.findModal().wrapElements().find("[class*='text-center']").eq(2).click({ force: true })
        _modalView.findModal().acceptButton(btn.ButtonText.OK);;
        cy.wait(500);
        _modalView.findModal().acceptButton("Go to package");
      })
  }

  /* entering record to configuration of project catalog configuration */
  projectCatalogConfiguration(catalogType: string, dataRecordSearch: string, costGroupCatalog: string, catalogCode: any, catalogDesc: string) {
    let recordExists = false;
    switch (catalogType) {
      case 'Project Catalog':
        _common.search_inSubContainer(cnt.uuid.INSTANCES, dataRecordSearch)
        cy.wait(500)
        _mainView.findModuleClientArea()
          .findAndShowContainer(cnt.uuid.INSTANCES)
          .findGrid().wrapElements().then(() => {
            cy.get(`[class*='${btn.IconButtons.GRID_CELL_ICO}']`).click()
          })
        _modalView.findModal()
          .findCheckBox_byLabel("Is Project", "checkbox")
          .as("check").invoke('is', ':checked').then(checked => {
            if (!checked) {
              cy.get('@check').check();
            }
          })
        _modalView.findModal()
          .getCell(app.GridCells.CODE)
          .wrapElements().each((codeCell) => {
            cy.wrap(codeCell).invoke("text").then((text) => {
              if (text === catalogCode) {
                cy.contains(`div.${app.SubContainerLayout.COLUMN_ID}_${app.GridCells.CODE}`, catalogCode)
                  .siblings(`div.${app.SubContainerLayout.COLUMN_ID}_${app.GridCells.IS_PROJECT_CATALOG}`)
                  .find(`${commonLocators.CommonElements.CHECKBOX_INPUT}`)
                  .as('checkbox').invoke('is', ':checked').then(checked => {
                    if (!checked) {
                      cy.get('@checkbox').check();
                    }
                  })
                _modalView.findModal().acceptButton("OK")
                recordExists = true;
              }
            })
          }).then(() => {
            if (!recordExists) {
              _modalView.findModal()
                .findButton(btn.ToolBar.ICO_REC_NEW)
                .clickIn()
              _modalView.findModal()
                .findActiveRow()
                .checkbox_inCell(app.GridCells.IS_PROJECT_CATALOG)
                .click({ force: true })
              _modalView.findModal().findActiveRow()
                .findCell(app.GridCells.CODE).findTextInput(app.InputFields.DOMAIN_TYPE_CODE)
                .type(catalogCode)
              _modalView.findModal().findActiveRow()
                .findCell(app.GridCells.DESCRIPTION).findTextInput(app.InputFields.DOMAIN_TYPE_TRANSLATION)
                .type(catalogDesc)
              _modalView.findModal().acceptButton("OK")
            }
          })
        break;
      case 'Enterprise Catalog':
        _common.search_inSubContainer(cnt.uuid.INSTANCES, dataRecordSearch)
        cy.wait(500)
        _mainView.findModuleClientArea()
          .findAndShowContainer(cnt.uuid.INSTANCES)
          .findGrid().wrapElements().then(() => {
            cy.get(`[class*='${btn.IconButtons.GRID_CELL_ICO}']`).click()
          })
        _modalView.findModal()
          .findCheckBox_byLabel("Is Project", "checkbox")
          .as("check").invoke('is', ':checked').then(checked => {
            if (checked) {
              cy.get('@check').uncheck()
            }
          })
        _modalView.findModal()
          .getCell(app.GridCells.CODE)
          .wrapElements().each((codeCell) => {
            cy.wrap(codeCell).invoke("text").then((text) => {
              if (text === catalogCode) {
                _modalView.findModal().acceptButton("OK")
                recordExists = true;
              }
            })
          }).then(() => {
            if (!recordExists) {
              _modalView.findModal()
                .findButton(btn.ToolBar.ICO_REC_NEW)
                .clickIn()
              _modalView.findModal()
                .findActiveRow()
                .findCell(app.GridCells.COST_GROUP_CATALOG_FK)
                .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
                .type(costGroupCatalog)
              cy.wait(500)
              _mainView.select_popupItem("grid", costGroupCatalog)
              cy.wait(500)
              _modalView.findModal().acceptButton("OK")
            }
          })
        break;
    }
  }

  enterRecord_toCreate_TaxCodes(taxcode: string) {
    cy.get("body").then(($body) => {
      if ($body.find(".cid_" + cnt.uuid.TAX_CODES + " .column-id_" + app.GridCells.MDC_TAX_CODE_FK_SMALL).length <= 0) {
        _common.create_newRecord(cnt.uuid.TAX_CODES)
        _mainView.findModuleClientArea()
          .findAndShowContainer(cnt.uuid.TAX_CODES)
          .findGrid()
          .findActiveRow()
          .findCell(app.GridCells.MDC_TAX_CODE_FK_SMALL)
          .caret()
        _mainView.select_popupItem("grid", taxcode);
      }
      else {
        _common.saveCellDataToEnv(cnt.uuid.TAX_CODES, app.GridCells.MDC_TAX_CODE_FK_SMALL, "")
      }
    });
  }
  enterRecord_toCreate_Roles(clerk: string) {
    cy.get("body").then(($body) => {
      if ($body.find(".cid_" + cnt.uuid.ROLES_PROCUREMENT_STRUCTURES + " .column-id_" + app.GridCells.CLERK_FK).length <= 0) {
        _common.create_newRecord(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES)
        _mainView.findModuleClientArea()
          .findAndShowContainer(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES)
          .findGrid()
          .findActiveRow()
          .findCell(app.GridCells.CLERK_FK)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(clerk, { force: true });
        _mainView.select_popupItem("grid", clerk);
      }
    });
  }

  enterrecordto_CreateCostGroup(container_UUID: string, code: string, description: string, quantity: string, uom: string) {
    cy.wait(500)
    _common.enterRecord_inNewRow(container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, code);
    cy.SAVE()
    cy.wait(500)
    _common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, description);
    _common.enterRecord_inNewRow(container_UUID, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, quantity);
    _common.enterRecord_inNewRow(container_UUID, app.GridCells.UOM_FK, app.InputFields.INPUT_GROUP_CONTENT, uom);
    _mainView.select_popupItem("grid", uom);
  }

  add_LineItemsStructure_2(container_UUID: string, StructureInputs: string) {
    cy.wait(3000);
    cy.get(`[class*="${container_UUID}"]`)
      .then(($ele) => {
        cy.wait(3000);
        if ($ele.find("[class*='ico-input-delete']").length > 0) {
          cy.log("Structure is added....");
          cy.get(`[class*="${container_UUID}"] [class*='ico-input-delete']`)
            .eq(0)
            .click({ multiple: true });
          this.add_LineItemsStructure(StructureInputs)
        } else {
          this.add_LineItemsStructure(StructureInputs)
        }
      });
  }

  Generate_project_BoQ_from_LI1(searchkey: string) {
    switch (searchkey) {
      case "None":
        _modalView.findModalBody()
          .findCaretInsideModal("Group Criteria")
        _modalView.select_popupItem("grid1", "None")
        cy.wait(500)
        cy.contains(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS, "Generate Project BoQs from Line Items")
          .within(() => {
            cy.contains("button", btn.ButtonText.NEXT)
              .click();
            cy.wait(500)
            cy.get(commonLocators.CommonElements.BOQ_ITEM_ICON)
              .click({ multiple: true });
            cy.wait(500)
            cy.contains("button", btn.ButtonText.EXECUTE)
              .click();
          });
        cy.get(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS)
          .contains("button", btn.ButtonText.OK)
          .click();
        break;

      case "Line Items Structure":
        _modalView.findModalBody()
          .findCaretInsideModal("Group Criteria")
        _modalView.select_popupItem("grid1", "Line Items Structure")
        cy.wait(500)
        cy.contains(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS, "Generate Project BoQs from Line Items")
          .within(() => {
            cy.contains("button", btn.ButtonText.NEXT)
              .click();
            cy.wait(500)
            cy.get(commonLocators.CommonElements.BOQ_FOLDER_ICON)
              .click({ multiple: true });
            cy.wait(500)
            cy.contains("button", btn.ButtonText.EXECUTE)
              .click();
          });
        cy.get(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS)
          .contains("button", btn.ButtonText.OK)
          .click();
    }

  }
  estimate_totals(DefaultWIC: string) {
    cy.wait(500)
    _mainView.findModuleClientArea()
      .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      .findButtonWithTitle("Estimate Configuration Dialog")
      .clickIn()
    cy.wait(500)
    cy.wait(500)
    _modalView.findModal()
      .findCheckBox_byLabel("Edit Estimate Type", "checkbox")
      .as("checkbox")
      .invoke('is', ':checked')
      .then(checked => {
        if (!checked) {
          cy.get('@checkbox')
            .check();
        }
      });
    _modalView.findModalBody()
      .findCaretByLabel("Default WIC Group")
    _modalView.select_popupItem('grid', DefaultWIC)
    _modalView.findCheckbox_byLabelnModal("platform-form-row form-group", "Edit Type", 0)
      .check();
    cy.get('[class*="modal-content"] [class*="panel-group"]')
      .eq(2)
      .within(() => {
        cy.wait(500)
        _modalView.findCheckBox_byLabel("Edit Type", "checkbox")
          .as("editTypeCheckbox")
          .invoke('is', ':checked')
          .then(checked => {
            if (!checked) {
              cy.get('@editTypeCheckbox')
                .check();
            }
          })
      })
    this.addTotalconfigurationandLineType("Direct Cost (Sub Total)", "Cost Total");
    this.selelectModalPopUp("Cost Total")
    this.addTotalconfigurationandLineType("Generals & Administration cost/markup", "G&A");
    this.selelectModalPopUp("G&A")
    this.addTotalconfigurationandLineType("Risk and Profit", "R&P");
    this.selelectModalPopUp("R&P")
    this.addTotalconfigurationandLineType("Additional Markup", "AM");
    this.selelectModalPopUp("AM")
    this.addTotalconfigurationandLineType("Grand Total", "Item Total");
    this.selelectModalPopUp("Item Total")
    cy.wait(500)
    this.addTotalconfiguration("Budget");
    _modalView.findActiveRow()
      .checkbox_inCell(app.GridCells.IS_BOLD)
      .check();
    this.addcostcodeassignment();
    this.VerifyAssignAllCostCode();
    cy.wait(500)
    cy.get('[class*="modal-content"]')
      .contains("button", "OK")
      .click();
  }

  enterRecord_toCreateNewContract(businessPartner: string, controllingUnit: string, frameworkMaterialCatalog?: string, container_UUID?: string,) {
    _modalView.findModal()
      .findInputFieldInsideModal("Business Partner", app.InputFields.INPUT_GROUP_CONTENT)
      .clear()
      .type(businessPartner, { force: true });
    _modalView.select_popupItem("grid", businessPartner);
    _modalView.findModal().acceptButton(btn.ButtonText.OK);;
    cy.wait(3000)
    _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.CONTROLLING_UNIT_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, controllingUnit)
    cy.SAVE()
    cy.wait(500)
    _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("ContractNo.", $ele1.text())
      cy.log(Cypress.env("ContractNo."))

      if (frameworkMaterialCatalog != null) {
        _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.MATERIAL_CATALOG_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, frameworkMaterialCatalog)
        cy.wait(4000);
        cy.SAVE();
      }
    });
  }
  enterRecord_toCreateNewOrderItem(materialNo: string, quantity: string, container_UUID?: string) {
    _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.MDC_MATERIAL_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, materialNo)
    _common.enterRecord_inNewRow(container_UUID, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, quantity)
  }
  enterRecord_toStanderdAllowance(CODE: string, QUANTITY_TYPE: string) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(cnt.uuid.STANDARD_ALLOWANCES)
      .findGrid()
      .findActiveRow()
      .findCell(app.GridCells.CODE)
      .caret()
    _mainView.select_popupItem("list", CODE);
    _modalView.findModuleClientArea()
      .findAndShowContainer(cnt.uuid.STANDARD_ALLOWANCES)
      .findActiveRow()
      .checkbox_inCell(app.GridCells.ID_IS_ACTIVE)
      .click()
    cy.wait(500);
    _common.waitForLoaderToDisappear()
    cy.contains(".modal-content", 'Do you want to copy the selected Estimate Allowance from Customization')
      .within(() => {
        cy.contains('button', 'Yes')
          .click()
      })
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithCaret(cnt.uuid.STANDARD_ALLOWANCES, app.GridCells.QUANTITY_TYPE_FK, "list", QUANTITY_TYPE)
  }

  VerifyAssignAllCostCode() {
    cy.contains(".modal-content", "Cost Codes")
      .within(() => {
        cy.wait(500);
        _common.waitForLoaderToDisappear()
        cy.contains("button", 'Refresh')
          .click();
        _common.waitForLoaderToDisappear()
        cy.get(`[class*='id_Code']`).first()
          .click();
        cy.wait(500);
        cy.contains("button", "OK")
          .click();
      });
  }




  recalculate_standardAllowances(container_UUID: string) {
    _common.maximizeContainer(container_UUID)
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
      .findButton(btn.ToolBar.ICO_RECALCULATE)
      .clickIn();
    cy.wait(500)
    _common.minimizeContainer(container_UUID)
  }
  enterRecord_toCreateDataRecords_ForEstimateAllowanceType(container_UUID: string, code: any, description: string, masterDataContext: string, GA: any, AM: any, RP: any) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findGrid()
      .findActiveRow()
      .findCell(app.GridCells.CODE)
      .findTextInput(app.InputFields.DOMAIN_TYPE_CODE)
      .type(code);
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findGrid()
      .findActiveRow()
      .findCell(app.GridCells.DESCRIPTION_INFO)
      .findTextInput(app.InputFields.DOMAIN_TYPE_TRANSLATION)
      .type(description);
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findGrid()
      .findActiveRow()
      .findCell(app.GridCells.MASTER_CONTEXT_FK)
      .caret()
      .select_popupItem("list", masterDataContext);
    cy.wait(500)
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findGrid()
      .findActiveRow()
      .getCell(app.GridCells.ALLOWANCE_SETTING)
      .findButton(btn.IconButtons.ICO_SETTING_DOC)
      .clickIn();
    _modalView.findInputFieldInsideModal("G&A[%]", app.InputFields.INPUT_GROUP_CONTENT)
      .clear()
      .type(GA);
    _modalView.findInputFieldInsideModal("AM[%]", app.InputFields.INPUT_GROUP_CONTENT)
      .clear()
      .type(AM);
    _modalView.findInputFieldInsideModal("R&P[%]", app.InputFields.INPUT_GROUP_CONTENT)
      .clear()
      .type(RP);
    cy.wait(500)
    cy.get(`[class*='modal-body'] [class*=ico-rec-new-deepcopy]`).click();
    cy.wait(500)
    _modalView.acceptButton("OK")
    cy.wait(500)
    cy.SAVE()
  }
  enterRecord_toCreateAllowanceAssignment(code: string) {
    cy.get('[data-model*="entity.allowanceAssignmentDetails"]')
      .within(() => {
        cy.get(`div.toolbar button.${btn.ToolBar.ICO_REC_NEW}`).click();
        cy.wait(500)
        cy.get(`.grid-canvas div.column-id_${app.GridCells.MDC_ALLOWANCE_FK}`)
          .as("code").click({ force: true })
        _mainView.findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(code, { force: true })
        cy.wait(500)
      })
    _mainView.select_popupItem("grid", code);
    cy.get(`.grid-canvas div.column-id_${app.GridCells.DESCRIPTION}`)
      .click({ force: true })
    _modalView.findCheckbox_inCell(app.GridCells.IS_ACTIVE)
      .check()
    _modalView.acceptButton(btn.ButtonText.OK);
  }


  enterRecord_toCreateDataRecords_ForEstAllowanceAssignmentType(container_UUID: string, context: string, description: string, code: string) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findGrid()
      .findActiveRow()
      .findCell(app.GridCells.MASTER_DATA_CONTEXT_FK)
      .caret()
      .select_popupItem("list", context);
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findGrid()
      .findActiveRow()
      .findCell(app.GridCells.DESCRIPTION_INFO)
      .findTextInput(app.InputFields.DOMAIN_TYPE_TRANSLATION)
      .type(description);
    cy.wait(500)
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findGrid()
      .findActiveRow()
      .getCell(app.GridCells.ESTIMATE_ALLOWANCE_SETTING)
      .findButton(btn.IconButtons.ICO_SETTING_DOC)
      .clickIn();
    cy.wait(8000)
    _estimatePage.enterRecord_toCreateAllowanceAssignment(code)
    cy.SAVE()
  }

  updateRecordTo_AdjustPriceWQ(adjustedPrice: string, outlineSpecification: string) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(cnt.uuid.PRICEADJUSTMENT)
      .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
      .findButton(btn.ToolBar.ICO_REFRESH)
      .clickIn();
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.PRICEADJUSTMENT, outlineSpecification)
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.PRICEADJUSTMENT, btn.ToolBar.ICO_LINE_ITEM_FILTER)
    _common.waitForLoaderToDisappear()
    _mainView.findCellhasValue(app.GridCells.BRIEF_INFO_SMALL, outlineSpecification)
      .click()
    _common.enterRecord_inNewRow(cnt.uuid.PRICEADJUSTMENT, app.GridCells.WQ_ADJUSTMENT_PRICE, app.InputFields.INPUT_GROUP_CONTENT, adjustedPrice)
  }
  copyTenderPrice(rowClass: string, copyOption: string) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(cnt.uuid.PRICEADJUSTMENT)
      .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
      .findButton(btn.ToolBar.ICO_PRICE_COPY_BOQ)
      .clickIn();
    cy.wait(500);
    cy.get(".modal-dialog").within(() => {
      switch (copyOption) {
        case "option1".toLowerCase():
          _modalView.findCheckbox_byLabelnModal(rowClass, "Copy Tender Price To BoQ Item", 0)
            .uncheck()
          _modalView.acceptButton(btn.ButtonText.OK);
          break;
        case "option2":
          _modalView.findCheckbox_byLabelnModal(rowClass, "Update Project BoQ AQ Quantity", 0)
            .uncheck()
          _modalView.findCheckbox_byLabelnModal(rowClass, "Copy Tender Price To Line Item", 0)
            .uncheck()
          _modalView.acceptButton(btn.ButtonText.OK);
          break;
        case "option3":
          _modalView.findCheckbox_byLabelnModal(rowClass, "Copy Tender Price To Line Item", 0)
            .uncheck()
          _modalView.acceptButton(btn.ButtonText.OK);
          break;

      }
    })
  }

  modifyPriceAdjustment(facotr: string, copyOption: string) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(cnt.uuid.PRICEADJUSTMENT)
      .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
      .findButton(btn.ToolBar.ICO_PRICE_ADJUSTMENT)
      .clickIn();

    cy.wait(500);
    cy.get(".modal-dialog").within(() => {
      switch (copyOption) {
        case "option1".toLowerCase():
          _modalView.findModalBody()
            .findInputFieldInsideModal("x Factor", app.InputFields.FORM_CONTROL)
            .invoke('attr', 'disabled')
            .then(disabled => {
              if (disabled) {
                cy.get("[name='SelectedAreaType'][value='1']").click()
                cy.get("[name='BaseUnitRateType'][value='1']").check()
                cy.get("[name='TargetUnitRateType'][value='1']").check()
                _modalView.findModalBody()
                  .findInputFieldInsideModal("x Factor", app.InputFields.FORM_CONTROL)
                  .click()
                  .clear()
                  .type(facotr)
              }
              else {
                cy.get("[name='BaseUnitRateType'][value='1']").check()
                cy.get("[name='TargetUnitRateType'][value='1']").check()
                _modalView.findModalBody()
                  .findInputFieldInsideModal("x Factor", app.InputFields.FORM_CONTROL)
                  .click()
                  .clear()
                  .type(facotr)
              }
            })
          _modalView.acceptButton(btn.ButtonText.OK);
          break;
        case "option2".toLowerCase():
          _modalView.findModalBody()
            .findInputFieldInsideModal("x Factor", app.InputFields.FORM_CONTROL)
            .invoke('attr', 'disabled')
            .then(disabled => {
              if (!disabled) {
                cy.get("[name='SelectedAreaType'][value='2']").check()
                cy.get(`[data-ng-model="${app.DataNGLocator.MODIFY_OPTION_DEL_ADJUST_PRICES}"]`).check()
              }
              else {
                cy.get(`[data-ng-model="${app.DataNGLocator.MODIFY_OPTION_DEL_ADJUST_PRICES}"]`).check()
              }
            })
          _modalView.acceptButton(btn.ButtonText.OK);
          break;
      }
    })

  }

  enterRecord_toCreateRoundingDataRecord(Container_UUID: string, Description: string, lineItemContext: string) {
    _common.enterRecord_inNewRow(Container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, Description)
    _common.edit_dropdownCellWithCaret(Container_UUID, app.GridCells.LINE_ITEM_CONTEXT_FK, "list", lineItemContext)
    _common.set_cellCheckboxValue(Container_UUID, app.GridCells.IS_LIVE, "check")
    cy.wait(3000)
    _mainView.findModuleClientArea()
      .findAndShowContainer(Container_UUID)
      .findActiveRow()
      .findButtonWithTitle("Edit Rounding Configuration Configuration ")
      .clickIn()
    cy.wait(500)
    _modalView.findModal()
      .findTextInput(app.InputFields.DOMAIN_TYPE_DESCRIPTION)
      .click()
      .clear()
      .type(Description)
    _modalView.findModal()
      .acceptButton(btn.ButtonText.OK);
  }

  createEstimateVersion(Container_UUID: string, job: string, description: string) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(Container_UUID)
      .findButton(btn.ToolBar.ICO_ESTIMATE_VERSION_CREATE)
      .clickIn()
    _modalView.findInputFieldInsideModal("Job", app.InputFields.DOMAIN_TYPE_CODE)
      .type(job)
    _modalView.findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
      .type(description)
    _common.waitForLoaderToDisappear()
    _modalView.acceptButton(btn.ButtonText.OK);
  }

  restoreEstimateVersion(Container_UUID: string, currentjob: string, description: string, versionJob: string) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(Container_UUID)
      .findButton(btn.ToolBar.ICO_ESTIMATE_VERSION_RESTORE)
      .clickIn()
    _modalView.findInputFieldInsideModal("Job", app.InputFields.DOMAIN_TYPE_CODE)
      .type(currentjob)
    _modalView.findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
      .type(description)
    _modalView.findInputFieldInsideModal("Version Estimate Job", app.InputFields.DOMAIN_TYPE_CODE)
      .type(versionJob)
    _modalView.findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
      .click()
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    _modalView.acceptButton(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    _modalView.acceptButton(btn.ButtonText.OK)
  }

  updateExisting_Record(fieldName: string, containerID: string, searchvalue: string, cellclass: string, inputValue: string) {
    switch (fieldName) {
      case 'input':
        _common.search_inSubContainer(containerID, searchvalue)
        _mainView.findModuleClientArea()
          .findAndShowContainer(containerID)
          .findGrid().findActiveRow().findCell(cellclass)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(inputValue)
        _mainView.findModuleClientArea()
          .findAndShowContainer(containerID)
          .findGrid()
          .keyAction("{enter}")
        break;
      case 'selectDropdown':
        _common.search_inSubContainer(containerID, searchvalue)
        _mainView.findModuleClientArea()
          .findAndShowContainer(containerID)
          .findGrid().findActiveRow().findCell(cellclass)
          .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
          .type(inputValue)
        _mainView.findModuleClientArea()
          .findAndShowContainer(containerID)
          .findGrid().select_popupItem("grid", inputValue)
        break;
      default:
        console.log("Cellclass not present");
    }
  }

  edit_CostCheckboxInCostCodes(container_UUID: string, expectedStatus: string) {
    if (expectedStatus == "check") {
      cy.get(".cid_" + container_UUID + " [class^='platform-form-row'] ").find("[data-ng-model='entity.IsCost']").then((value_checkbox) => {
        if (value_checkbox.hasClass("ng-empty")) {
          cy.get(".cid_" + container_UUID + " [class^='platform-form-row'] ").find("[data-ng-model='entity.IsCost']").click()
        }
      })
    }
    else {
      cy.get(".cid_" + container_UUID + " [class^='platform-form-row'] ").find("[data-ng-model='entity.IsCost']").then((value_checkbox) => {
        if (value_checkbox.hasClass("ng-not-empty")) {
          cy.get(".cid_" + container_UUID + " [class^='platform-form-row'] ").find("[data-ng-model='entity.IsCost']").click()
        }
      })
    }
  }

  update_costCodePrices_fromWizard(priceversion: string, code1: string, code2: string) {
    _common.clickOn_cellHasValue_fromModal(app.GridCells.CODE, code1)
    _common.clickOn_cellHasValue_fromModal(app.GridCells.PRICE_VERSION_FK, priceversion)
    cy.wait(1000)//required in order to refelect respective record in subsequent panel
    _modalView.findModal().findActiveRow().wrapElements()
      .find("[class*='Selected']")
      .then((checkbox) => {
        cy.wrap(checkbox).find('[type="checkbox"]').click({ force: true });
      })

    cy.wait(1000)//required in order to refelect respective record in subsequent panel
    _common.clickOn_cellHasValue_fromModal(app.GridCells.CODE, code2)
    _common.clickOn_cellHasValue_fromModal(app.GridCells.PRICE_VERSION_FK, "Base")
    _modalView.findModal()
      .findActiveRow()
      .findCheckbox_inCell(app.GridCells.SELECTED)
      .click({ force: true })
  }
  select_LineItemsStructureAttributeAndRefresh(container_UUID: string, searchAttribute: string, attributeVlaue: string) {
    _common.maximizeContainer(container_UUID)
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .wrapElements()
      .then(($el) => {
        let len = $el.find('[class="grouped-item"] .' + btn.IconButtons.ICO_INPUT_DELETE).length
        if (len > 0) {
          for (let index = 0; index < len; index++) {
            cy.get('[class="grouped-item"] .' + btn.IconButtons.ICO_INPUT_DELETE)
              .eq(0)
              .click()
          }

        }

      })
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .wrapElements()
      .within(() => {
        cy.get('.' + btn.IconButtons.ICO_INPUT_ADD)
          .click()
        cy.document()
          .its('body')
          .find(".popup-container")
          .within(() => {
            cy.get("div.popup-content")
              .within(() => {
                cy.get(commonLocators.CommonElements.INPUT_TEXT)
                  .clear()
                  .type(searchAttribute)
              })
              .within(() => {
                cy.get('.popup-list')
                  .find('button[value="' + attributeVlaue + '"]')
                  .click()
              })
          })
      })
      .then(() => {
        _mainView.findModuleClientArea()
          .findAndShowContainer(container_UUID)
          .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
          .findButton(btn.ToolBar.ICO_REFRESH)
          .clickIn();
      })
    _common.minimizeContainer(container_UUID)

  }

  getTotal_cellColumn(container_UUID: string, cellClass: string, envName: string) {
    let total: any = 0
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findGrid()
      .getCell(cellClass)
      .wrapElements()
      .each(($el) => {
        let newStr = $el.text().replace(',', '')
        total = (+total) + (parseFloat(newStr))
      }).then(() => {
        Cypress.env(envName, total);
      })
  }
  select_LineItemsStructureFilter(container_UUID: string, index: number) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findGrid()
      .getCell(app.GridCells.MARKER)
      .wrapElements()
      .eq(index)
      .click()
  }


  enterRecord_toCreateAllowanceMarkup(data: DataCells) {
    if (data[app.GridCells.MDC_COST_CODE_DESCRIPTION]) {
      _common.clickOn_cellHasUniqueValue(cnt.uuid.ALLOWANCEMARKUP, app.GridCells.MDC_COST_CODE_DESCRIPTION, data[app.GridCells.MDC_COST_CODE_DESCRIPTION])
    }

    if (data[app.GridCells.GA_PERC]) {
      _common.enterRecord_inNewRow(cnt.uuid.ALLOWANCEMARKUP, app.GridCells.GA_PERC, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.GA_PERC]);
    }
    if (data[app.GridCells.RP_PERC]) {
      _common.enterRecord_inNewRow(cnt.uuid.ALLOWANCEMARKUP, app.GridCells.RP_PERC, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.RP_PERC]);
    }
    if (data[app.GridCells.AM_PERC]) {
      _common.enterRecord_inNewRow(cnt.uuid.ALLOWANCEMARKUP, app.GridCells.AM_PERC, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.AM_PERC]);
    }
    if (data[app.GridCells.DEF_MGC_PERC]) {
      _common.enterRecord_inNewRow(cnt.uuid.ALLOWANCEMARKUP, app.GridCells.DEF_MGC_PERC, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.DEF_MGC_PERC]);
    }
  }
  updateMaterialcatalogPrices_FromWizard(radioButtonValue?: string, index?: number, materialcode?: string, priceversion?: string, checkboxIndex?: number) {
    if (radioButtonValue) {
      _modalView.findModal().findRadio_byLabel(radioButtonValue, "radio", index);
    }
    _modalView.findModal().acceptButton("Next");

    cy.contains(".modal-content", "Update Material Prices")
    _common.clickOn_cellHasValue_fromModal(app.GridCells.UP_MATERIAL_CODE, materialcode)
    cy.wait(5000)//required in order to refelect respective record in subsequent panel
    _modalView.findModal().findActiveRow().wrapElements()
      .find("[class*='Selected']")
      .then((checkbox) => {
        cy.wrap(checkbox).find('[type="checkbox"]').click({ force: true });
      })
    cy.wait(5000)//required in order to refelect respective record in subsequent panel
    cy.contains(".modal-content", "Update Material Prices")
    _common.clickOn_cellHasValue_fromModal(app.GridCells.PRICE_VERSION, priceversion)
    if (checkboxIndex) {
      _modalView.findModal().findActiveRow().wrapElements()
        .find("[class*='Selected']")
        .then((checkbox) => {
          cy.wrap(checkbox).find('[type="checkbox"]').eq(checkboxIndex).click({ force: true });
        })
    }
    cy.wait(5000)
    _modalView.findModal().acceptButton(btn.ButtonText.UPDATE);
  }

  enterRecord_toCreateCostCodeChildRecord(data: DataCells) {
    _modalView.findModal()
      .searchInModal_byDataNG_Selector(commonLocators.CommonLabels.COSTCODES, data[commonLocators.CommonLabels.COSTCODES])
    _modalView.findModal()
      .findButtonWithTitle(btn.ButtonText.SEARCH)
      .clickIn()
    _modalView.findModal()
      .findCellhasValue(app.GridCells.CODE_CAPS, data[commonLocators.CommonLabels.COSTCODES])
      .click()
    _modalView.findModal()
      .findButtonWithTitle(btn.ButtonText.NEW_SUB_DIVISION)
      .clickIn()
    _modalView.findModal()
      .findInputFieldInsideModal(commonLocators.CommonKeys.CODE, app.InputFields.DOMAIN_TYPE_CODE)
      .type(data[commonLocators.CommonKeys.CODE])
    if (data[commonLocators.CommonLabels.UOM]) {
      _modalView.findModal()
        .findInputFieldInsideModal(commonLocators.CommonLabels.UOM, app.InputFields.INPUT_GROUP_CONTENT)
        .type(data[commonLocators.CommonLabels.UOM]).then(() => {
          cy.wait(1000)
          _modalView.select_popupItem(commonLocators.CommonKeys.GRID, data[commonLocators.CommonLabels.UOM])
        })
    }
    _modalView.findModal()
      .findButton(btn.IconButtons.OK_BTN_BTN_RETURN)
      .clickIn()

  }
  selectdata_fromCostGroupContainer(container_UUID: string, text: string) {

    cy.get(`[class*="accordion-directive-wrapper"]`).contains(text).click();
  }

  assignProjectChange_toLineItem(data: DataCells) {
    _common.lookUpButtonInCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRJ_CHANGE_FK, btn.IconButtons.ICO_INPUT_ADD, 0)
    _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.DESCRIPTION, 0, app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear().type(data[app.InputFields.DOMAIN_TYPE_DESCRIPTION]);
    _modalView.findModal()
      .findCaretByLabel(commonLocators.CommonLabels.CHANGE_TYPE)
      .then(() => {
        _modalView.select_popupItem(commonLocators.CommonKeys.LIST, data[commonLocators.CommonLabels.CHANGE_TYPE]);
        cy.wait(1000);//wait is required to load data in modal(change type)                  
      })
    _modalView.findModal().acceptButton(btn.ButtonText.OK);
    cy.wait(1000) //wait is required for appearing data in the line item  
  }














  selectLineItem_fromCellPopUpMenu(containerUUID: string, cellClass: string, data: DataCells) {
    cy.wait(1000)
    _mainView.findModuleClientArea()
      .findAndShowContainer(containerUUID)
      .findGrid()
      .findCell(cellClass)
      .clickIn();
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasIcon(containerUUID, cellClass, app.GridCellIcons.ICO_MENU)
    if (data[app.GridCells.LINE_ITEM_DESCRIPTION_INFO]) {
      _mainView.select_popupItem(commonLocators.CommonKeys.DIV, data[app.GridCells.LINE_ITEM_DESCRIPTION_INFO])
      _common.waitForLoaderToDisappear()
    }
  }

  /* Entering record to create multiple package header using Wizard for different material catalog*/
  enterRecord_toCreateMultiplePackage_wizard(criteriaSelection: string, catalog1: string, catalog2: string) {
    cy.contains(".modal-content", "Create / Update Material Package Assignment").within(() => {
      cy.contains("div", "Entire Estimate").find("#entireEstimate_2").click();
    });
    _modalView.findModal().caret();
    _mainView.select_popupItem("grid1", criteriaSelection);
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal().acceptButton("Previous");
    cy.wait(500);
    _modalView.findModal().acceptButton("Next");
    _common.clickOn_cellHasValue_fromModal(app.GridCells.CODE_CAPS, catalog1)
    _common.set_cellCheckboxValue_fromModal(app.SubContainerLayout.SELECTED, commonLocators.CommonKeys.CHECK)
    cy.wait(500);
    _common.clickOn_cellHasValue_fromModal(app.GridCells.CODE_CAPS, catalog2)
    _common.set_cellCheckboxValue_fromModal(app.SubContainerLayout.SELECTED, commonLocators.CommonKeys.CHECK)
    cy.wait(500);
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal()
      .wrapElements()
      .find("[class*='text-center']")
      .then((checkbox) => {
        if (checkbox.find("[checked='checked']").length > 0) {
          cy.contains(".modal-content", "Create / Update Material Package Assignment").within(() => {
            cy.contains("div", "Include Cost Code").find("input").click();
          });
        } else {
          cy.contains(".modal-content", "Create / Update Material Package Assignment").within(() => {
            //cy.get("[class*='slick-header-column indicator']").click();
            cy.get("[class*='Selected'] input[type='checkbox']").click({ multiple: true, force: true });
            cy.contains("div", "Include Cost Code").find("input").click();
          });
        }

        _modalView.findModal().wrapElements().find("[class*='text-center']").eq(0).click({ force: true })
        _modalView.findModal().wrapElements().find("[class*='text-center']").eq(2).click({ force: true })
        _modalView.findModal().acceptButton(btn.ButtonText.OK);;
        cy.wait(500);
        _modalView.findModal().acceptButton("Go to package");
      })
  }

  /*
   * This is used to assign parameter to rules in Iframe
   * Updated Date: 01/03/2024
   * Author : Harshal Shinkar
  */
  assignParamater_valuesToRules_inIframe(data:DataCells){
    cy.get("body")
    .then(($body) => {
      let length = $body.find(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} .${btn.IconButtons.ICO_UP}`).length;
      if (length > 0) {
        for (let index = 1; index <= length; index++) {
          cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} .${btn.IconButtons.ICO_UP}`)
            .eq(0)
            .click();
        }
      }
    }).then(() => {
      for (var headerText of data[commonLocators.CommonLabels.HEADER_TEXT]) {
        _modalView.findModal()
          .wrapElements()
          .contains(commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT, headerText)
          .closest(commonLocators.CommonElements.PANEL_GROUP)
          .as("HEADER")
        switch (headerText) {
          case commonLocators.CommonLabels.PARAMETERS:
            cy.get('@HEADER')
            .within(($el) => {
              cy.wrap($el)
                .find(`.${btn.IconButtons.ICO_DOWN}`)
                .click()
                cy.frameLoaded('#user_form_assign_parameter_frame_Pop')
                .iframe()
                .as("iFrame")
                if(data[commonLocators.CommonElements.TD_HEADER_STYLE]){
                  cy.get('@iFrame')
                  .find(`[class*='${commonLocators.CommonElements.TD_HEADER_STYLE}'] ${commonLocators.CommonElements.CHECKBOX_INPUT}`)
                  .as("check")
                  .invoke("is", ":checked")
                  .then((checked) => {
                  if (!checked) {
                    cy.get("@check").check();
                  }         
                })
              }
                if(data[commonLocators.CommonLabels.RP_4]){
                  cy.get('@iFrame')
                  .find(`[class='txtBoxStyle'][paramcode="${commonLocators.CommonLabels.RP_4}"]`).click().clear().type(data[commonLocators.CommonLabels.RP_4])
                }
                if(data[commonLocators.CommonLabels.RP_2]){
                  cy.get('@iFrame')
                  .find(`[class='txtBoxStyle'][paramcode="${commonLocators.CommonLabels.RP_2}"]`).click().clear().type(data[commonLocators.CommonLabels.RP_2])
                }
                if(data[commonLocators.CommonLabels.GA_4]){
                  cy.get('@iFrame')
                  .find(`[class='txtBoxStyle'][paramcode="${commonLocators.CommonLabels.GA_4}"]`).click().clear().type(data[commonLocators.CommonLabels.GA_4])
                }
                if(data[commonLocators.CommonLabels.GA_2]){
                  cy.get('@iFrame')
                  .find(`[class='txtBoxStyle'][paramcode="${commonLocators.CommonLabels.GA_2}"]`).click().clear().type(data[commonLocators.CommonLabels.GA_2])
                }
            })
         }
         _common.clickOn_modalFooterButton(Buttons.ButtonText.OK)
         _common.waitForLoaderToDisappear()
     }
   })
  }
  
  enterRecord_toCreateLineItem_AAMM(container_UUID: string, data: DataCells) {
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }
    if (data[app.GridCells.QUANTITY_SMALL]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.QUANTITY_SMALL]);
    }
    if (data[app.GridCells.ADVANCED_ALL]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.ADVANCED_ALL, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.ADVANCED_ALL]);
    }
    if (data[app.GridCells.MANUAL_MARKUP]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.MANUAL_MARKUP, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.MANUAL_MARKUP]);
    }
    if (data[app.GridCells.GRAND_COST_UNIT_TARGET]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.GRAND_COST_UNIT_TARGET, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.GRAND_COST_UNIT_TARGET]);
    }
  }

  backWardCalculation_fromWizard(){
    cy.wait(1500);
    _common.clickOn_modalFooterButton(btn.ButtonText.EXECUTE)
    cy.wait(1500);
    cy.SAVE();
  }
}


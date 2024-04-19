/// <reference types="cypress" />
import { _common, _mainView, _modalView } from 'cypress/pages';
import { btn, app, cnt, tile, commonLocators, sidebar } from 'cypress/locators';
import { DataCells } from "cypress/pages/interfaces";
import { data } from 'cypress/types/jquery';

export class LogesticPage {

  enterRecord_toCreatePlantListDataRecord(data: DataCells) {

    if (data[app.GridCells.ETM_CONTEXT_FK]) {
      _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS, app.GridCells.ETM_CONTEXT_FK, "list", data[app.GridCells.ETM_CONTEXT_FK]);
    }
    if (data[app.GridCells.PRICE_LIST_TYPE_FK]) {
      _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS, app.GridCells.PRICE_LIST_TYPE_FK, "list", data[app.GridCells.PRICE_LIST_TYPE_FK]);
    }
    if (data[app.GridCells.CURRENCY_FK]) {
      _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS, app.GridCells.CURRENCY_FK, "list", data[app.GridCells.CURRENCY_FK]);
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }
    if (data[app.GridCells.PERCENT]) {
      _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.PERCENT, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.PERCENT]);
    }
    if (data[app.GridCells.UOM_FK]) {
      _common.edit_dropdownCellWithInput(cnt.uuid.DATA_RECORDS, app.GridCells.UOM_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.UOM_FK]);
    }

    if (data[app.GridCells.CALCULATION_TYPE_FK]) {
      _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS, app.GridCells.CALCULATION_TYPE_FK, "list", data[app.GridCells.CALCULATION_TYPE_FK])
    }
  }

  enterRecord_toCreateOprationType(data: DataCells) {
    cy.wait(1000)
    if (data[app.GridCells.IS_LIVE]) {
      _common.set_cellCheckboxValue(cnt.uuid.OPERATION_TYPE, app.GridCells.IS_LIVE, data[app.GridCells.IS_LIVE])
    }
    if (data[app.GridCells.CODE]) {
      _common.enterRecord_inNewRow(cnt.uuid.OPERATION_TYPE, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_DESCRIPTION, data[app.GridCells.CODE]);
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.enterRecord_inNewRow(cnt.uuid.OPERATION_TYPE, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }
    if (data[app.GridCells.UOM_FK]) {
      _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_TYPE, app.GridCells.UOM_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.UOM_FK]);
    }
    if (data[app.GridCells.IS_HIRE]) {
      _common.set_cellCheckboxValue(cnt.uuid.OPERATION_TYPE, app.GridCells.IS_HIRE, data[app.GridCells.IS_HIRE])
    }
    if (data[app.GridCells.IS_DEFAULT]) {
      _common.set_cellCheckboxValue(cnt.uuid.OPERATION_TYPE, app.GridCells.IS_DEFAULT, data[app.GridCells.IS_DEFAULT])
    }
    if (data[app.GridCells.IS_MINOR_EQUIPMENT]) {
      _common.set_cellCheckboxValue(cnt.uuid.OPERATION_TYPE, app.GridCells.IS_MINOR_EQUIPMENT, data[app.GridCells.IS_MINOR_EQUIPMENT])
    }
  }

  enterRecord_toTransferOfPlantManagement(data: DataCells) {
    if (data[commonLocators.CommonLabels.JOB]) {
      _modalView.findModal()
        .findInputFieldInsideModal(commonLocators.CommonLabels.JOB, app.InputFields.INPUT_GROUP_CONTENT)
        .clear({ force: true })
        .type(data[commonLocators.CommonLabels.JOB], { force: true })
        .then(() => {
          _modalView.select_popupItem("grid", data[commonLocators.CommonLabels.JOB])
        })

    }
    if (data[commonLocators.CommonLabels.WorkOperationType]) {
      _modalView.findModal()
        .findInputFieldInsideModal(commonLocators.CommonLabels.WorkOperationType, app.InputFields.INPUT_GROUP_CONTENT)
        .clear({ force: true })
        .type(data[commonLocators.CommonLabels.WorkOperationType], { force: true })
        .then(() => {
          _modalView.select_popupItem("grid", data[commonLocators.CommonLabels.WorkOperationType])
        })
    }
    cy.wait(1000)
    _modalView.acceptButton(btn.ButtonText.FINISH)
    _common.waitForLoaderToDisappear()
    cy.wait(1000)
    _modalView.acceptButton(btn.ButtonText.OK)
  }
  enterRecord_CreatePlantFromPlantGroup(data: DataCells) {
    if (data[commonLocators.CommonLabels.PLANT_TYPE]) {
      _modalView.findModal()
        .findCaretByLabel(commonLocators.CommonLabels.PLANT_TYPE)
        .wait(1000)
        .then(() => {
          _modalView.select_popupItem("list", data[commonLocators.CommonLabels.PLANT_TYPE])
        })
      cy.wait(1000)
    }
    if (data[commonLocators.CommonLabels.PLANT_GROUP]) {
      cy.wait(1000)
      _modalView.findModal()
        .findInputFieldInsideModal(commonLocators.CommonLabels.PLANT_GROUP, app.InputFields.INPUT_GROUP_CONTENT)
        .type(data[commonLocators.CommonLabels.PLANT_GROUP], { force: true })
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
    if (data[commonLocators.CommonKeys.CODE]) {
      _modalView.findModal()
        .findInputFieldInsideModal(commonLocators.CommonKeys.CODE, app.InputFields.DOMAIN_TYPE_CODE)
        .type(data[commonLocators.CommonKeys.CODE], { force: true })
    }
    if (data[commonLocators.CommonLabels.DESCRIPTION]) {
      cy.wait(2000)
      _modalView.findModal()
        .findInputFieldInsideModal(commonLocators.CommonLabels.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION)
        .clear({ force: true })
        .type(data[commonLocators.CommonLabels.DESCRIPTION])
    }
    if (data[commonLocators.CommonLabels.STRUCTURE]) {
      _modalView.findModal()
        .findInputFieldInsideModal(commonLocators.CommonLabels.STRUCTURE, app.InputFields.INPUT_GROUP_CONTENT)
        .clear({ force: true })
        .type(data[commonLocators.CommonLabels.STRUCTURE], { force: true })
        .then(() => {
          _modalView.select_popupItem("grid", data[commonLocators.CommonLabels.STRUCTURE])
        })

    }
    cy.wait(1000)
      .then(() => {
        _modalView.acceptButton(btn.ButtonText.OK)
      })
    cy.wait(1000)
      .then(() => {
        _modalView.acceptButton(btn.ButtonText.GO_TO_PLANT)
      })

  }

  enterRecord_toCreateJobRecords(Container_UUID: string, data: DataCells) {
    cy.wait(1000)
    if (data[app.GridCells.WORK_OPERATION_TYPE_FK]) {
      _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.WORK_OPERATION_TYPE_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.WORK_OPERATION_TYPE_FK]);
    }
    if (data[app.GridCells.CODE]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE]);
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }
    if (data[app.GridCells.JOB_CARD_RECORD_TYPE_FK]) {
      _common.edit_dropdownCellWithCaret(Container_UUID, app.GridCells.JOB_CARD_RECORD_TYPE_FK, "list", data[app.GridCells.JOB_CARD_RECORD_TYPE_FK]);
    }
    if (data[app.GridCells.CARD_RECORD_FK]) {
      _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.CARD_RECORD_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.CARD_RECORD_FK]);

    }

  }

  enterRecord_toCreateScheme(Container_UUID: string, data: DataCells) {
    cy.wait(1000)
    if (data[app.GridCells.IS_RECALC_DATES]) {
      _common.set_cellCheckboxValue(Container_UUID, app.GridCells.IS_RECALC_DATES, data[app.GridCells.IS_RECALC_DATES])
    }
    if (data[app.GridCells.IS_PERFORMANCE_BASED]) {
      _common.set_cellCheckboxValue(Container_UUID, app.GridCells.IS_PERFORMANCE_BASED, data[app.GridCells.IS_PERFORMANCE_BASED])
    }
    if (data[app.GridCells.IS_FIXED_DAYS]) {
      _common.set_cellCheckboxValue(Container_UUID, app.GridCells.IS_FIXED_DAYS, data[app.GridCells.IS_FIXED_DAYS])
    }

    if (data[app.GridCells.CODE]) {
      _common.enterRecord_inNewRow(Container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE]);
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.enterRecord_inNewRow(Container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }

    if (data[app.GridCells.JOB_CARD_TEMPLATE_FK]) {
      _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.JOB_CARD_TEMPLATE_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.JOB_CARD_TEMPLATE_FK]);
    }
    if (data[app.GridCells.UOM_FK]) {
      _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.UOM_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.UOM_FK])
    }
    if (data[app.GridCells.QUANTITY_SMALL]) {
      _common.enterRecord_inNewRow(Container_UUID, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.QUANTITY_SMALL]);
    }
    if (data[app.GridCells.DURATION]) {
      _common.enterRecord_inNewRow(Container_UUID, app.GridCells.DURATION, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.DURATION]);
    }
    if (data[app.GridCells.DAYS_AFTER]) {
      _common.enterRecord_inNewRow(Container_UUID, app.GridCells.DAYS_AFTER, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.DAYS_AFTER]);
    }
  }

  enterRecord_toCreatePlant(Container_UUID: string, data: DataCells) {
    cy.wait(1000)
    if (data[app.GridCells.CODE]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE]);
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }
    if (data[app.GridCells.PROCUREMENT_STRUCTURE_FK]) {
      _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.PROCUREMENT_STRUCTURE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.PROCUREMENT_STRUCTURE_FK]);
    }
    if (data[app.GridCells.PLANT_GROUP_FK]) {
      _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.PLANT_GROUP_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.PLANT_GROUP_FK]);
    }
    if (data[app.GridCells.CLERK_RESPONSIBLE_FK]) {
      _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.CLERK_RESPONSIBLE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.CLERK_RESPONSIBLE_FK]);
    }
    if (data[app.GridCells.PLANT_KIND_FK]) {
      _common.edit_dropdownCellWithCaret(Container_UUID, app.GridCells.PLANT_KIND_FK, commonLocators.CommonKeys.LIST_EXACT, data[app.GridCells.PLANT_KIND_FK]);
    }
    if (data[app.GridCells.PLANT_TYPE_FK]) {
      _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.PLANT_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.PLANT_TYPE_FK]);
    }
    if (data[app.GridCells.UOM_FK]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.UOM_FK, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.UOM_FK]);
    }
    if (data[app.GridCells.SERIAL_NUMBER]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.SERIAL_NUMBER, app.InputFields.DOMAIN_TYPE_DESCRIPTION, data[app.GridCells.SERIAL_NUMBER]);
    }
    if (data[app.GridCells.MATCH_CODE]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.MATCH_CODE, app.InputFields.DOMAIN_TYPE_DESCRIPTION, data[app.GridCells.MATCH_CODE]);
    }
    if (data[app.GridCells.CLERK_OWNER_FK]) {
      _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.CLERK_OWNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.CLERK_OWNER_FK]);
    }

  }


  generate_resourceRequisitionsResourceReservationsJobCards_formWizard(data: DataCells) {

    if (data[commonLocators.CommonLabels.SELECTED_PLANTS_ONLY]) {
      _modalView.findModal()
        .findCheckBox_byLabel(commonLocators.CommonLabels.SELECTED_PLANTS_ONLY, "checkbox")
        .as("checkbox")
        .invoke("is", ":checked")
        .then((checked) => {
          if (data[commonLocators.CommonLabels.SELECTED_PLANTS_ONLY] === commonLocators.CommonKeys.CHECK) {
            if (!checked) {
              cy.get("@checkbox").check();
            }
          } else if (data[commonLocators.CommonLabels.SELECTED_PLANTS_ONLY] === commonLocators.CommonKeys.UNCHECK) {
            if (checked) {
              cy.get("@checkbox").uncheck();
            }
          }
        })
    }
    _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)

    if (data[commonLocators.CommonKeys.SELECT_MAINTENANCE]) {
      Object.keys(data[commonLocators.CommonKeys.SELECT_MAINTENANCE])
        .forEach(key => {
          cy.get(`${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`)
            .find(`.${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.MAINTENANCE_DESCRIPTION}`)
            .contains(key)
            .click()
          cy.get(`${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`)
            .find(`${commonLocators.CommonElements.ACTIVE} .${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.INCLUDE} ${commonLocators.CommonElements.CHECKBOX_INPUT}`)
            .as("checkbox")
            .invoke("is", ":checked")
            .then((checked) => {
              if (data[commonLocators.CommonKeys.SELECT_MAINTENANCE][key] === commonLocators.CommonKeys.CHECK) {
                if (!checked) {
                  cy.get("@checkbox").check({ force: true });
                }
              } else if (data[commonLocators.CommonKeys.SELECT_MAINTENANCE][key] === commonLocators.CommonKeys.UNCHECK) {
                if (checked) {
                  cy.get("@checkbox").uncheck();
                }
              }
            })
        })
    }
    _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)

    if (data[commonLocators.CommonLabels.SELECT_A_JOB]) {
      _modalView.findModal()
        .findRadio_byLabel(data[commonLocators.CommonLabels.SELECT_A_JOB], commonLocators.CommonKeys.RADIO, data[commonLocators.CommonKeys.RADIO_INDEX])
    }

    if (data[commonLocators.CommonLabels.PROJECT]) {
      _modalView.findModal()
        .findInputFieldInsideModal(commonLocators.CommonLabels.PROJECT, app.InputFields.INPUT_GROUP_CONTENT)
        .type(data[commonLocators.CommonLabels.PROJECT])
        .then(() => {
          _common.waitForLoaderToDisappear()
          _common.select_ItemFromPopUpList(commonLocators.CommonKeys.GRID, data[commonLocators.CommonLabels.PROJECT])
        })
    }

    if (data[commonLocators.CommonLabels.JOB_CARD]) {
      _modalView.findModal()
        .findCheckBox_byLabel(commonLocators.CommonLabels.JOB_CARD, "checkbox")
        .as("checkbox")
        .invoke("is", ":checked")
        .then((checked) => {
          if (data[commonLocators.CommonLabels.JOB_CARD] === commonLocators.CommonKeys.CHECK) {
            if (!checked) {
              cy.get("@checkbox").check();
            }
          } else if (data[commonLocators.CommonLabels.JOB_CARD] === commonLocators.CommonKeys.UNCHECK) {
            if (checked) {
              cy.get("@checkbox").uncheck();
            }
          }
        })
    }
    cy.wait(1000)
    _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
    cy.wait(4000) //this wait is required to get job card data
    cy.get(`[class*='modal-footer'] `)
      .contains(`${btn.ButtonText.OK}`)
      .last()
      .click()

    _common.clickOn_modalFooterButton(btn.ButtonText.FINISH)

  }


  enterRecord_toCreatePlantCharateristics(Container_UUID: string, data: DataCells) {
    cy.wait(1000)
    if (data[app.GridCells.CHARACTERISTIC_FK]) {
      _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.CHARACTERISTIC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.CHARACTERISTIC_FK]);
    }
    if (data[app.GridCells.VALUE_TEXT]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.VALUE_TEXT, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.VALUE_TEXT]);
    }
  }

  enterRecord_toCreateCompatibleMaterials(Container_UUID: string, data: DataCells) {
    cy.wait(1000)
    if (data[app.GridCells.MATERIAL_FK]) {
      _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.MATERIAL_FK]);
    }
    if (data[app.GridCells.COMMENT_TEXT]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.COMMENT_TEXT, app.InputFields.DOMAIN_TYPE_COMMENT, data[app.GridCells.COMMENT_TEXT]);
    }
  }

  enterRecord_toCreateComponentWarranties(Container_UUID: string, data: DataCells) {
    cy.wait(1000)
    if (data[app.GridCells.WARRANTY_END]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.WARRANTY_END, app.InputFields.INPUT_GROUP_CONTENT_DATE_PICKER_INPUT, data[app.GridCells.WARRANTY_END]);
    }
    if (data[app.GridCells.QUANTITY_SMALL]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.QUANTITY_SMALL]);
    }
    if (data[app.GridCells.UOM_FK]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.UOM_FK, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.UOM_FK]);
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }
    if (data[app.GridCells.HOURS]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.HOURS, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.HOURS]);
    }
  }

  enterRecord_toCreateBusinessPartner(Container_UUID: string, data: DataCells) {
    cy.wait(1000)
    if (data[app.GridCells.BUSINESS_PARTNER_FK]) {
      _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.BUSINESS_PARTNER_FK]);
    }
    if (data[app.GridCells.ROLE_FK]) {
      _common.edit_dropdownCellWithCaret(Container_UUID, app.GridCells.ROLE_FK, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.ROLE_FK]);
    }
    if (data[app.GridCells.PARTNER_TYPE_FK]) {
      _common.edit_dropdownCellWithCaret(Container_UUID, app.GridCells.PARTNER_TYPE_FK, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.PARTNER_TYPE_FK]);
    }
    if (data[app.GridCells.COMMENT_TEXT]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.COMMENT_TEXT, app.InputFields.DOMAIN_TYPE_COMMENT, data[app.GridCells.COMMENT_TEXT]);
    }

  }

  enterRecord_toCreatePlantComponent(Container_UUID: string, data: DataCells) {
    cy.wait(1000)
    if (data[app.GridCells.MAINTENANCE_SCHEMA_FK]) {
      _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.MAINTENANCE_SCHEMA_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.MAINTENANCE_SCHEMA_FK]);
    }
    if (data[app.GridCells.DESCRIPTION]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, data[app.GridCells.DESCRIPTION]);
    }
    if (data[app.GridCells.HOME_PROJECT_FK]) {
      _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.HOME_PROJECT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.HOME_PROJECT_FK]);
    }
    if (data[app.GridCells.PROJECT_LOCATION_FK]) {
      _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.PROJECT_LOCATION_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.PROJECT_LOCATION_FK]);
    }
    if (data[app.GridCells.UOM_FK]) {
      _common.edit_dropdownCellWithCaret(Container_UUID, app.GridCells.UOM_FK, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.UOM_FK]);
    }
    if (data[app.GridCells.METER_NO]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.METER_NO, app.InputFields.DOMAIN_TYPE_DESCRIPTION, data[app.GridCells.METER_NO]);
    }

  }

  enterRecord_toCreatePlantScheme(Container_UUID: string, data: DataCells) {
    cy.wait(1000)
    if (data[app.GridCells.IS_LIVE]) {
      _common.set_cellCheckboxValue(Container_UUID, app.GridCells.IS_LIVE, data[app.GridCells.IS_LIVE]);
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }
    if (data[app.GridCells.SORTING]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.SORTING, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.SORTING]);
    }
    if (data[app.GridCells.LEAD_QUANTITY]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.LEAD_QUANTITY, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.LEAD_QUANTITY]);
    }
    if (data[app.GridCells.LEAD_DAYS]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.LEAD_DAYS, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.LEAD_DAYS]);
    }

  }

  click_On_CloseButton(containerUUID: string) {
    _mainView.findModuleClientArea()
      .findAndShowContainer(containerUUID)
      .wrapElements()
      .then(($ele) => {
        if ($ele.find(`[class*='${btn.ToolBar.ICO_CLOSE}'] `).length > 0) {
          _mainView.findModuleClientArea()
            .findAndShowContainer(containerUUID)
            .findButton(btn.ToolBar.ICO_CLOSE)
            .clickIn();
        } else {
          cy.log("No Button Present")
        }
      });
  }


  enterRecord_toCreatePlantGroup(Container_UUID: string, data: DataCells) {
    cy.wait(1000)
    if (data[app.GridCells.IS_LIVE]) {
      _common.set_cellCheckboxValue(Container_UUID, app.GridCells.IS_LIVE, data[app.GridCells.IS_LIVE]);
    }
    if (data[app.GridCells.CODE]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE]);
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }
    if (data[app.GridCells.RUBRIC_CATEGORY_FK]) {
      _common.edit_dropdownCellWithInput(Container_UUID, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.RUBRIC_CATEGORY_FK]);
    }

  }

  createDispatchNotes(data: DataCells) {
    _modalView.findModal()
      .findInputFieldInsideModal(commonLocators.CommonLabels.RUBRIC_CATEGORY, app.InputFields.INPUT_GROUP_CONTENT)
      .click()
      .type(data[commonLocators.CommonLabels.RUBRIC_CATEGORY])
      .then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_ItemFromPopUpList(commonLocators.CommonKeys.LIST, data[commonLocators.CommonLabels.RUBRIC_CATEGORY])
      })
    cy.wait(1000)
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    cy.wait(4000)
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
  }

  enterRecord_toCreateComponentMaintenanceSchemas(Container_UUID: string, data: DataCells) {
    cy.wait(1000)// added wait to enable grid cells
    if (data[app.GridCells.MAINT_SCHEMA_FK]) {
      _common.edit_dropdownCellWithCaret(Container_UUID, app.GridCells.MAINT_SCHEMA_FK, commonLocators.CommonKeys.GRID, data[app.GridCells.MAINT_SCHEMA_FK]);
    }
    if (data[app.GridCells.DESCRIPTION]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, data[app.GridCells.DESCRIPTION]);
    }
    if (data[app.GridCells.VALID_FROM]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.VALID_FROM, app.InputFields.INPUT_GROUP_CONTENT_DATE_PICKER_INPUT, data[app.GridCells.VALID_FROM]);
    }
    if (data[app.GridCells.VALID_TO]) {
      _common.edit_containerCell(Container_UUID, app.GridCells.VALID_TO, app.InputFields.INPUT_GROUP_CONTENT_DATE_PICKER_INPUT, data[app.GridCells.VALID_TO]);
    }

  }
  create_initialAllocationForPlants_fromWizard(data: DataCells, plantType) {

    if (data[commonLocators.CommonLabels.JOB]) {

      cy.get(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + ' ' + commonLocators.CommonElements.ROW + ' ' + "[class*='input-group-content']").eq(0).type(data[commonLocators.CommonLabels.JOB]).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_ItemFromPopUpList(commonLocators.CommonKeys.GRID, data[commonLocators.CommonLabels.JOB])
      })
    }
    if (data[commonLocators.CommonLabels.ALLOCATED_FROM]) {
      _modalView.findModal()
                .findInputFieldInsideModal(commonLocators.CommonLabels.ALLOCATED_FROM, app.InputFields.INPUT_GROUP_CONTENT)
                .type(data[commonLocators.CommonLabels.ALLOCATED_FROM])
              cy.wait(1000)//required wait for work peration field to get enabled
    }

    if (data[app.GridCells.WORK_OPERATION_TYPE_FK]) {
      _common.select_multipleRow_fromModal()
      _common.waitForLoaderToDisappear()
      _common.enterRecord_inActiveRow_fromModal(app.GridCells.WORK_OPERATION_TYPE_FK, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.WORK_OPERATION_TYPE_FK])
      cy.wait(1000)//required wait for popup to appear
        .then(() => {
          _common.waitForLoaderToDisappear()
          _common.select_ItemFromPopUpList(commonLocators.CommonKeys.GRID, data[app.GridCells.WORK_OPERATION_TYPE_FK])
          _common.clickOn_cellHasValue_fromModal(app.GridCells.PLANT_TYPE_FK, plantType)
        })
    }
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
    _common.select_multipleRow_fromModal()
    cy.wait(1000)//required wait to enable Footer button
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.FINISH)
    cy.wait(1000)//required wait to enable Footer button
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()

  }


}

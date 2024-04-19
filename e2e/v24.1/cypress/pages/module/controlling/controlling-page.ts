/// <reference types="cypress" />
import { _common, _mainView, _modalView } from "cypress/pages";
import { app, cnt,btn, commonLocators} from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import common from "mocha/lib/interfaces/common";


export class ControllingUnit {
   

    /*This is used to create a new Controlling Unit record
      Updated Date: 18/12/2024
      Author : Seema Ingole
    */
    enterRecord_toCreateControllingUnit(data: DataCells){
        cy.get(commonLocators.CommonElements.BODY).then(($body) => {
          if ($body.find(".cid_"+cnt.uuid.CONTROLLING_UNIT+" .column-id_"+app.GridCells.TREE).length > 0) {
            _common.clickOn_cellHasIconWithIndex(cnt.uuid.CONTROLLING_UNIT,app.GridCells.TREE,btn.IconButtons.CONTROL_ICONS,0)
            _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
            _common.waitForLoaderToDisappear()

            _common.clickOn_activeRowCell(cnt.uuid.CONTROLLING_UNIT,app.GridCells.DESCRIPTION_INFO)         
            _common.waitForLoaderToDisappear()
            _common.enterRecord_inNewRow(cnt.uuid.CONTROLLING_UNIT, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
           
            _common.clickOn_activeRowCell(cnt.uuid.CONTROLLING_UNIT,app.GridCells.QUANTITY_SMALL)         
            _common.waitForLoaderToDisappear()
            _common.enterRecord_inNewRow(cnt.uuid.CONTROLLING_UNIT, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.QUANTITY_SMALL]);
            
            _common.clickOn_activeRowCell(cnt.uuid.CONTROLLING_UNIT,app.GridCells.UOM_FK)         
            _common.waitForLoaderToDisappear()
            _common.edit_dropdownCellWithInput(cnt.uuid.CONTROLLING_UNIT,app.GridCells.UOM_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.UOM_FK])
            _common.select_activeRowInContainer(cnt.uuid.CONTROLLING_UNIT)

          }else{
            _common.create_newRecord(cnt.uuid.CONTROLLING_UNIT)
            _common.waitForLoaderToDisappear()

            _common.clickOn_cellHasIconWithIndex(cnt.uuid.CONTROLLING_UNIT,app.GridCells.TREE,btn.IconButtons.CONTROL_ICONS,0)
            _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
            _common.waitForLoaderToDisappear()

            _common.clickOn_activeRowCell(cnt.uuid.CONTROLLING_UNIT,app.GridCells.DESCRIPTION_INFO)         
            _common.waitForLoaderToDisappear()
            _common.enterRecord_inNewRow(cnt.uuid.CONTROLLING_UNIT, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
           
            _common.clickOn_activeRowCell(cnt.uuid.CONTROLLING_UNIT,app.GridCells.QUANTITY_SMALL)         
            _common.waitForLoaderToDisappear()
            _common.enterRecord_inNewRow(cnt.uuid.CONTROLLING_UNIT, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.QUANTITY_SMALL]);
            
            _common.clickOn_activeRowCell(cnt.uuid.CONTROLLING_UNIT,app.GridCells.UOM_FK)         
            _common.waitForLoaderToDisappear()
            _common.edit_dropdownCellWithInput(cnt.uuid.CONTROLLING_UNIT,app.GridCells.UOM_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.UOM_FK])
            _common.select_activeRowInContainer(cnt.uuid.CONTROLLING_UNIT)
          }
        });
       
      
      }

      generate_controllingUnit_fromWizard(data: DataCells) {
        _common.waitForLoaderToDisappear()
        if (data[commonLocators.CommonLabels.TEMPLATE]) {
          _modalView.findModal()
                    .findCaretByClass(btn.IconButtons.BTN_BTN_DEFAULT_DROPDOWN_TOGGLE,0);
          cy.wait(1000)
                    .then(()=>{
                      _modalView.select_popupItem(commonLocators.CommonKeys.GRID_1, data[commonLocators.CommonLabels.TEMPLATE]);
            })
        }
        _common.clickOn_modalFooterButton(btn.ButtonText.GENERATE);
        _common.waitForLoaderToDisappear()
      }
      generate_controllingUnitFromTemplate_fromWizard(data: DataCells) {
        _common.waitForLoaderToDisappear()
        if (data[commonLocators.CommonLabels.CONTROL_TEMPLATE]) {
          _modalView.findModal()
                    .findCaretByLabel(commonLocators.CommonLabels.CONTROL_TEMPLATE);
          cy.wait(1000)
                    .then(()=>{
                      _modalView.select_popupItem(commonLocators.CommonKeys.GRID, data[commonLocators.CommonLabels.CONTROL_TEMPLATE]);
            })
        }
        _common.selectValue_fromModal(data[app.GridCells.CODE])
        _common.set_cellCheckboxValue_fromModal(app.GridCells.MARKER,commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK);
        _common.waitForLoaderToDisappear()
      }

      generate_create_controllingUnitFromTemplate_fromWizard(data: DataCells) {
        _common.waitForLoaderToDisappear()
        if (data[commonLocators.CommonLabels.CODE]) {
          _modalView.findModal()
                .findInputFieldInsideModal(commonLocators.CommonLabels.CODE, app.InputFields.DOMAIN_TYPE_CODE)
                .clear()
                .type(data[commonLocators.CommonLabels.CODE]);
        }

        if (data[commonLocators.CommonLabels.DESCRIPTION]) {
          _modalView.findModal()
                .findInputFieldInsideModal(commonLocators.CommonLabels.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                .clear()
                .type(data[commonLocators.CommonLabels.DESCRIPTION]);
        }
      
        _common.clickOn_modalFooterButton(btn.ButtonText.OK);
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK);
        _common.waitForLoaderToDisappear()
      }
      
}

/// <reference types="cypress" />
import { _common, _mainView, _modalView } from "cypress/pages";
import { btn, app, cnt, tile, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import { data } from "cypress/types/jquery";

var scheduleCode: string;
var sch_qty;
var wip_qty;
var lineitem_qty;
export class SchedulePage {

  enterRecord_toCreateSchedules(container_UUID:string,data: DataCells) {
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    } 
    if (data[app.GridCells.CODE]) {
      _mainView.findModuleClientArea()
               .findAndShowContainer(container_UUID)
               .findGrid()
               .findActiveRow()
               .getCell(app.GridCells.CODE)
               .wrapElements()
               .then(()=>{
                  cy.get("body")
                    .then(($body) => {
                      if ($body.find(`.column-id_${app.GridCells.CODE} [class="invalid-cell"]`).length > 0) {
                        _common.enterRecord_inNewRow(container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE]);
                      }
                    });
               })
               .then(()=>{
                  _common.select_activeRowInContainer(container_UUID)
                  _common.waitForLoaderToDisappear()
               })
    }
 
    if (data[app.GridCells.CALENDAR_FK]) {
		  _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.CALENDAR_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.CALENDAR_FK])
		}

    if (data[app.GridCells.PERFORMANCE_SHEET]) {
      _common.edit_dropdownCellWithCaret(container_UUID,app.GridCells.PERFORMANCE_SHEET,commonLocators.CommonKeys.LIST,data[app.GridCells.PERFORMANCE_SHEET])
		}
    if (data[app.GridCells.CODE_FORMATE_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.CODE_FORMATE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.CODE_FORMATE_FK])
		}
    if (data[app.GridCells.TARGET_START]) {
      _common.enterRecord_inNewRow(container_UUID,app.GridCells.TARGET_START,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.TARGET_START])
    }

    if (data[app.GridCells.TARGET_END]) {
      _common.enterRecord_inNewRow(container_UUID,app.GridCells.TARGET_END,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.TARGET_END])
    }
    cy.SAVE();

  }
    
  enterRecord_toCreateActivityStructure(description: string,quantity: string,uom: string) {
    cy.get("body").then(($body) => {
      if ($body.find(".cid_"+cnt.uuid.ACTIVITY_STRUCTURE+" .column-id_"+app.GridCells.TREE).length > 0) {
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
                 .findGrid()
                 .getCell(app.GridCells.TREE)
                 .clickIn();
        _common.create_newSubRecord(cnt.uuid.ACTIVITY_STRUCTURE);
        _common.waitForLoaderToDisappear()
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
                 .findGrid()
                 .findActiveRow()
                 .findCell(app.GridCells.QUANTITY_SMALL)
                 .clickIn();
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
                 .findGrid()
                 .findActiveRow()
                 .findCell(app.GridCells.QUANTITY_SMALL)
                 .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
                 .type(quantity, { force: true });
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
                 .findGrid()
                 .findActiveRow()
                 .findCell(app.GridCells.DESCRIPTION)
                 .findTextInput(app.InputFields.DOMAIN_TYPE_COMMENT)
                 .type(description);
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
                 .findGrid()
                 .findActiveRow()
                 .findCell(app.GridCells.QUANTITY_UOM_FK)
                 .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
                 .type(uom, { force: true })
                 .then(()=>{
                    _mainView.select_popupItem("grid", uom);
                 })
        cy.SAVE();
      }else{
        _common.create_newRecord(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.create_newSubRecord(cnt.uuid.ACTIVITY_STRUCTURE);
        _common.waitForLoaderToDisappear()
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
                 .findGrid()
                 .findActiveRow()
                 .findCell(app.GridCells.QUANTITY_SMALL)
                 .clickIn();
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
                 .findGrid()
                 .findActiveRow()
                 .findCell(app.GridCells.QUANTITY_SMALL)
                 .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
                 .type(quantity, { force: true });
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
                 .findGrid()
                 .findActiveRow()
                 .findCell(app.GridCells.DESCRIPTION)
                 .findTextInput(app.InputFields.DOMAIN_TYPE_COMMENT)
                 .type(description);
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
                 .findGrid()
                 .findActiveRow()
                 .findCell(app.GridCells.QUANTITY_UOM_FK)
                 .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
                 .type(uom, { force: true })
                 .then(()=>{
                    _mainView.select_popupItem("grid", uom);
                 })
        cy.SAVE();     
      }
    });
  }

  get_Qty_FromProgressReportHistory() {
    _mainView
      .findModuleClientArea()
      .findAndShowContainer(cnt.uuid.PROGRESS_REPORT_HISTORY)
      .findGrid()
      .findActiveRow()
      .getCell(app.GridCells.QUANTITY_SMALL)
      .wrapElements()
      .eq(0)
      .invoke("text")
      .then((qty) => {
        sch_qty = qty;
        console.log(sch_qty);
      });
  }

 

  
  enterRecord_ToActivityAndGANTTGrid(container_UUID:string,data: DataCells) {
    if (data[app.GridCells.CODE]) {
      cy.wait(1000)
      _mainView.findModuleClientArea()
               .findAndShowContainer(container_UUID)
               .findGrid()
               .findActiveRow()
               .findCell(app.GridCells.CODE)
               .findTextInput(app.InputFields.DOMAIN_TYPE_CODE)
               .invoke("val")
               .then(function (codeVal: string) {
                if (codeVal == "") {
                  _common.enterRecord_inNewRow(container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE]);
                  Cypress.env("SCH_CODE", data[app.GridCells.CODE])
                }else{
                Cypress.env("SCH_CODE", codeVal)
              }
              });
}
if (data[app.GridCells.DESCRIPTION]) {
  _common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_COMMENT, data[app.GridCells.DESCRIPTION]);
}
if (data[app.GridCells.QUANTITY_SMALL]) {
  _common.enterRecord_inNewRow(container_UUID, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.QUANTITY_SMALL]);
}
if (data[app.GridCells.QUANTITY_UOM_FK]) {
  _common.edit_dropdownCellWithCaret(container_UUID,app.GridCells.QUANTITY_UOM_FK,commonLocators.CommonKeys.LIST,data[app.GridCells.QUANTITY_UOM_FK])
}
if (data[app.GridCells.PLANNED_START]) {
  _common.enterRecord_inNewRow(container_UUID,app.GridCells.PLANNED_START,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PLANNED_START])
}
if (data[app.GridCells.PLANNED_FINISH]) {
  _common.enterRecord_inNewRow(container_UUID,app.GridCells.PLANNED_FINISH,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PLANNED_FINISH])
}
if (data[app.GridCells.PLANNED_DURATION]) {
  _common.enterRecord_inNewRow(container_UUID, app.GridCells.PLANNED_DURATION, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.PLANNED_DURATION]);
}
//! This piece of code will enter new estimate code when the duplicate estimate code added.
cy.get("body")
  .then(($body) => {
    if ($body.find("[class*='invalid-cell']").length > 0) {
      let schCode=data[app.GridCells.CODE] + Cypress._.random(0, 100);
      _common.enterRecord_inNewRow(cnt.uuid.SCHEDULES, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, schCode);
      Cypress.env("SCH_CODE", schCode)
    }
  });      
} 

/*
   * This is used to assign assembly template from look-up modal
   * Updated Date: 2/12/2024
   * Author : Anupama G
   */


generate_activityStructureRecord_byWizard(data:DataCells) {
  cy.wait(2000)
  _modalView.findModal()
            .wrapElements()
            .contains(`${commonLocators.CommonElements.NAV_TABS}`,data[commonLocators.CommonElements.NAV_TABS])
            .click({force:true})
            
            .then(()=>{
              
           
              if (data[commonLocators.CommonElements.NAV_TABS]===commonLocators.CommonLabels.GENERATE_ACTIVITIES) {
                _modalView.findModal()
            
                .findRadio_byLabel_InModal(data[commonLocators.CommonKeys.LABEL],commonLocators.CommonKeys.RADIO,data[commonLocators.CommonKeys.RADIO_INDEX],app.InputFields.DOMAIN_TYPE_RADIO)


                if (data[commonLocators.CommonKeys.LABEL]===commonLocators.CommonLabels.GENERATE_ACTIVITIES_FROM_ONE_ACTIVE_ESTIMATE) {
                  _modalView.findModal()
                            .findTextInput(`${app.InputFields.INPUT_GROUP_CONTENT}`)
                            .clear()
                            .type(data[commonLocators.CommonKeys.CODE],{force:true})
                            .then(()=>{
                              _common.waitForLoaderToDisappear()
                              _common.select_ItemFromPopUpList(commonLocators.CommonKeys.GRID,data[commonLocators.CommonKeys.CODE])
                            })
                }

                if (data[commonLocators.CommonKeys.CRITERIA_LABEL]) {
                  Object.keys(data[commonLocators.CommonKeys.CRITERIA_LABEL])
                        .forEach((key)=>{
                          _modalView.findModal()
                                    .wrapElements()
                                    .contains(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`,key)
                                    .closest(`${commonLocators.CommonElements.ROW}`)
                                    .within(()=>{
                                      cy.get(`.caret`)
                                        .trigger("click")
                                    })
                                    .then(()=>{
                                      _common.waitForLoaderToDisappear()
                                      _common.select_ItemFromPopUpList(commonLocators.CommonKeys.GRID_1,data[commonLocators.CommonKeys.CRITERIA_LABEL][key])
                                    })
                          })
                  
                }
              }

              if (data[commonLocators.CommonElements.NAV_TABS]===commonLocators.CommonLabels.SUCCESSORS) {
                _modalView.findModal()
                          .findCheckBox_byLabel(commonLocators.CommonLabels.CREATE_RELATIONS,"checkbox")
                          .as("check")
                          .invoke("is", ":checked")
                          .then((checked) => {
                             if (data[commonLocators.CommonLabels.CREATE_RELATIONS] == "check") {
                               if (!checked) {
                                 cy.get("@check").check();
                               }
                             }
                             if (data[commonLocators.CommonLabels.CREATE_RELATIONS] == "uncheck") {
                               if (checked) {
                                 cy.get("@check").uncheck();
                               }
                             }
                          })
                          .then(()=>{
                            _common.waitForLoaderToDisappear()
                            _modalView.findModal()
                                      .wrapElements()
                                      .contains(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`,commonLocators.CommonLabels.KIND_CAPS)
                                      .closest(`${commonLocators.CommonElements.ROW}`)
                                      .within(()=>{
                                        cy.get(`.caret`)
                                          .trigger("click")
                                      })
                                      .then(()=>{
                                        _common.waitForLoaderToDisappear()
                                        _common.select_ItemFromPopUpList(commonLocators.CommonKeys.LIST,data[commonLocators.CommonLabels.KIND_CAPS])
                                      })
                          })
                
              }
            })
}

  
  enterrecord_toActivestructuregrid(
    code: string,
    description: string,
    Quantity: string,
    uom: string,
    startdate: string,
    finishdate: string
  ) {
    _mainView
      .findModuleClientArea()
      .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
      .findGrid()
      .findActiveRow()
      .findCell(app.GridCells.CODE)
      .findTextInput(app.InputFields.DOMAIN_TYPE_CODE)
      .clear({ force: true })
      .type(code, { force: true });
    _mainView
      .findModuleClientArea()
      .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
      .findGrid()
      .findActiveRow()
      .findCell(app.GridCells.DESCRIPTION)
      .typeIn(description);
    _mainView
      .findModuleClientArea()
      .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
      .findGrid()
      .findActiveRow()
      .findCell(app.GridCells.QUANTITY_SMALL)
      .typeIn(Quantity);
    _mainView
      .findModuleClientArea()
      .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
      .findGrid()
      .findActiveRow()
      .findCell(app.GridCells.BAS_UOM_FK)
      .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
      .type(uom, { force: true });
    _mainView.select_popupItem("grid", uom);
    _mainView
      .findModuleClientArea()
      .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
      .findGrid()
      .findActiveRow()
      .findCell(app.GridCells.PLANNED_START)
      .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
      .clear({ force: true })
      .type(startdate, { force: true });
    _mainView
      .findModuleClientArea()
      .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
      .findGrid()
      .findActiveRow()
      .findCell(app.GridCells.PLANNED_START)
      .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
      .clear({ force: true })
      .type(finishdate, { force: true });
    cy.SAVE();
  }

  /* entering data to create scheduling activity*/
  enterDataTo_CreateScheduleActivity(description: string, quantity: string, uom: string,plannedStart?:string,plannedFinished?:string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
             .toolbar(btn.ToolBar.ICO_SETTINGS).clickIn()
    _mainView.findModuleClientArea()
             .select_popupItem("span", "Activity Settings")
    _modalView.findModal()
              .findCheckBox_byLabel("Enable Transient Root Entity", "checkbox")
              .as("chkbox").invoke("is", "checked")
              .then((checked) => {
                if (checked) {
                  _modalView.findModal()
                            .acceptButton("Cancel") 
                }
                else {
                  cy.get("@chkbox")
                    .check({ force: true })
                  _modalView.findModal()
                            .acceptButton("OK")
                }
              })
    cy.REFRESH_CONTAINER()
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
             .findGrid()
             .findCell_ByIcon(app.GridCellIcons.ICO_ROOT_SCHEDULING, 0)
             .clickIn();
    _common.create_newSubRecord(cnt.uuid.ACTIVITY_STRUCTURE);
    cy.wait(2000);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.QUANTITY_SMALL)
             .clickIn();
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.QUANTITY_SMALL)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(quantity, { force: true });
    _common.waitForLoaderToDisappear()
    _common.select_activeRowInContainer(cnt.uuid.ACTIVITY_STRUCTURE)
    _common.waitForLoaderToDisappear()
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.DESCRIPTION)
             .findTextInput(app.InputFields.DOMAIN_TYPE_COMMENT)
            .type(description);
    _common.waitForLoaderToDisappear()
    _common.select_activeRowInContainer(cnt.uuid.ACTIVITY_STRUCTURE)
    _common.waitForLoaderToDisappear()
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.QUANTITY_UOM_FK)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(uom, { force: true });
    _mainView.select_popupItem("grid", uom);
    _common.waitForLoaderToDisappear()
    _common.select_activeRowInContainer(cnt.uuid.ACTIVITY_STRUCTURE)
    _common.waitForLoaderToDisappear()
    if (plannedStart) {
      _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PLANNED_START,app.InputFields.INPUT_GROUP_CONTENT,plannedStart)
      _common.select_activeRowInContainer(cnt.uuid.ACTIVITY_STRUCTURE)
    }
    if (plannedFinished) {
      _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PLANNED_FINISH,app.InputFields.INPUT_GROUP_CONTENT,plannedFinished)
      _common.select_activeRowInContainer(cnt.uuid.ACTIVITY_STRUCTURE)
    }
    cy.SAVE();
  }

  /*
   * This is used to create schedule from wizard
   * Updated Date: 5/1/2023
   * Author : Anurag Singh
  */

  create_schedule_fromWizard(data:DataCells) {

    if (data[commonLocators.CommonLabels.TEMPLATE_PROJECT]) {
      _modalView.findModal()
                .findInputFieldInsideModal(commonLocators.CommonLabels.TEMPLATE_PROJECT,app.InputFields.INPUT_GROUP_CONTENT)
                .clear({ force: true })
                .type(data[commonLocators.CommonLabels.TEMPLATE_PROJECT])
                .then(()=>{
                  _modalView.select_popupItem(commonLocators.CommonKeys.GRID, data[commonLocators.CommonLabels.TEMPLATE_PROJECT]);
                })
    }
    if (data[commonLocators.CommonLabels.SCHEDULE]) {
      _modalView.findModal()
                .findInputFieldInsideModal(commonLocators.CommonLabels.SCHEDULE,app.InputFields.INPUT_GROUP_CONTENT)
                .clear({ force: true })
                .type(data[commonLocators.CommonLabels.SCHEDULE])
                .then(()=>{
                  _modalView.select_popupItem(commonLocators.CommonKeys.GRID, data[commonLocators.CommonLabels.SCHEDULE]);
                })
    }
    _modalView.findModal()
              .findInputFieldInsideModal(commonLocators.CommonLabels.CODE, app.InputFields.DOMAIN_TYPE_CODE)
              .invoke("val")
              .then(function (codeVal: string) {
                Cypress.env("SCHEDULE_CODE", codeVal)
              });

    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()
    cy.wait(1000)// This wait is added as modal take time to load
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()
  }
  enterRecord_toCreateBaseline(data: DataCells) {
    if (data[commonLocators.CommonLabels.DESCRIPTION]) {
           _modalView.findModal()
                     .findInputFieldInsideModal(commonLocators.CommonLabels.DESCRIPTION,app.InputFields.INPUT_GROUP_CONTENT)
                     .clear({ force: true })
                     .type(data[commonLocators.CommonLabels.DESCRIPTION])
    } 
    
    if (data[commonLocators.CommonLabels.REMARKS]) {
           _modalView.findModal()
                     .findInputFieldInsideModal(commonLocators.CommonLabels.REMARKS,app.InputFields.DOMAIN_TYPE_REMARK)
                     .clear({ force: true })
                     .type(data[commonLocators.CommonLabels.REMARKS])
    } 
           _modalView.findModal().acceptButton(btn.ButtonText.OK);
           cy.wait(500)
           _modalView.findModal().acceptButton(btn.ButtonText.OK);
 
  }

   /*
   * This is used to create set Renumbering Activities from wizard
   * Updated Date: 2/6/2024
   * Author : Anupama G
  */
  enterRecord_to_set_Renumbering(sublevelsText:string,data: DataCells){
  
    if (data[commonLocators.CommonLabels.CODE_FORMAT]) {
      cy.get("body")
      .then(($body) => {
          let length = $body.find(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} .${btn.IconButtons.ICO_DOWN}`).length;
          if (length > 0) {
            for (let index = 1; index <= length; index++) {
              cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} .${btn.IconButtons.ICO_DOWN}`)
            }      
          }  
             cy.get(`[class="panel-title"] [class*="platform-form-group-header-text"]`)
               .contains(sublevelsText)
                         if (data[commonLocators.CommonLabels.CODE_FORMAT]) {
       
                              _modalView.findModal()
                                        .wrapElements()
                                        .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.CODE_FORMAT)
                                        .closest(commonLocators.CommonElements.ROW)
                                        .within(()=>{
                                          cy.get(commonLocators.CommonElements.PLATFORM_FORM_COL)
                                            .find('[class*="'+app.InputFields.INPUT_GROUP_CONTENT+'"]')
                                            .clear()
                                            .type(data[commonLocators.CommonLabels.CODE_FORMAT])
                                            .then(()=>{
                                              cy.document()
                                                .its('body')
                                                .within(()=>{
                                                  _modalView.select_popupItem(commonLocators.CommonKeys.DIV, data[commonLocators.CommonLabels.CODE_FORMAT]);
                                                  cy.wait(1000)
                                                })
                                                })     
            })
                      cy.get(`[class="panel-title"] [class*="platform-form-group-header-text"]`)
                        .contains(commonLocators.CommonLabels.LEVEL_1)
                                _modalView.findModal()
                                          .wrapElements()
                                          .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.LEVEL_1)
                                          .closest(commonLocators.CommonElements.ROW)
                                          .find("[class*='"+app.ContainerElements.CARET+"']")
                                          .click()
                                 _mainView.select_popupItem(commonLocators.CommonKeys.GRID_1,commonLocators.CommonKeys.CODE);
                                        cy.wait(1000)//need time to load //
                                 _modalView.findModal().acceptButton(btn.ButtonText.OK);
                                         cy.wait(500)
                                 _modalView.findModal().acceptButton(btn.ButtonText.OK);
              
            }
           })

     
    
    } }


     /*
   * This is used to create Apply performance sheet from wizard
   * Updated Date: 2/20/2024
   * Author : Anupama G
  */

    apply_performance_sheet_fromWizard(data:DataCells) {
   
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
   
      cy.wait(1000)//This wait necessary 
      _common.clickOn_modalFooterButton(btn.ButtonText.OK)
      cy.wait(1000)//This wait necessary 
      _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    }
  

  




  }
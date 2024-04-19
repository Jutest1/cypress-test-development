/// <reference types="cypress" />
import { _common, _estimatePage, _mainView, _modalView, _package, _salesPage, _validate,_NoChangeContracts } from "cypress/pages";
import { app, cnt, btn, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";


export class NoChangeContracts {
	clickGridSettingButton(container_UUID) {
		cy.log('click grid setting button');
		cy.get(`[class*='${container_UUID}'] ` + commonLocators.CommonElements.ICON_SETTING).click();
	}
	clickGridLayoutButton() {
		cy.log('click grid layout button');
		cy.get(commonLocators.CommonElements.GRID_LAYOUT).click();
	}
	clickAllColumnsToLeft() {
		cy.log('make all columns to available pan');
		cy.get('.middle-container .ico-ar1-left2').click();
	}
	clickColumnToRight() {
		cy.log('make all columns to available pan');
		cy.get('.middle-container .ico-ar1-right1').click();
	}

  set_ColumnAtTop(columnName:string[],container_UUID:string){
		cy.wait(5000)
		_common.maximizeContainer(container_UUID);
		cy.get(`[class*='${container_UUID}'] `+commonLocators.CommonElements.ICON_SETTING)
		  .click();
		cy.get(commonLocators.CommonElements.GRID_LAYOUT)
		  .click();
		cy.wait(4000);
		_NoChangeContracts.clickAllColumnsToLeft();
		cy.wait(2000);
		for (let index = 0; index < columnName.length; index++) {
		  const colName = columnName[index];
		  cy.get(commonLocators.CommonElements.GRID_Layout_LEFT_ID+" "+commonLocators.CommonElements.SEARCH_TERM_INPUT)
			.clear()
			.type(colName)
		  cy.wait(1000)
		  cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS+" "+commonLocators.CommonElements.GRID_Layout_LEFT_ID+" ."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.FIELD_NAME)
			.each(($el, nameIndex, $list) => {
				const ActVal = $el.text();
				cy.log(ActVal);
				if (ActVal == colName) {
				  cy.wait(2000)
				  cy.wrap($el).click();
				}
			});
		  cy.wait(1000)
		  cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS+" "+commonLocators.CommonElements.SEARCH_TERM_INPUT)
			.clear()
		  cy.wait(1000)
		  cy.get("[class*='"+btn.GridButtons.ICO_GRID_ROW_START+"']")
			.click({force:true})
		_NoChangeContracts.clickColumnToRight();
		}
		cy.wait(2000)
		_modalView.findModal()
				  .acceptButton(btn.ButtonText.OK)
		cy.wait(2000)
		cy.get(`[class*='${container_UUID}'] `+commonLocators.CommonContainerElements.MINIMIZE)
		  .click();
	}


  getCode_fromContractModal(envName:string) {
    cy.wait(5000)
    cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " [class*='icon-message']").then(($value) => {
      var str = ($value.text()).replace(" ","")
      console.log(str)
      var splitted = str.split(":", 2);
      console.log(splitted[1])
      Cypress.env(envName, (splitted[1].replace(/'/g, "")).replace(/^\s+|\s+$/g, ""))
    })
  }
  
  enterRecord_toCreateBoQStructure1(briefInfo: any, Uom: string, Qty: any,cost:string) {
    cy.wait(1000)
    _mainView.findModuleClientArea()
            .findAndShowContainer(cnt.uuid.BOQ_STRUCTURE)
            .findGrid()
            .findCell(app.GridCells.BRIEF_INFO_SMALL)
            .findTextInput(app.InputFields.DOMAIN_TYPE_TRANSLATION)
            .type(briefInfo)
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTURE)
             .findGrid()
             .findCell(app.GridCells.BAS_UOM_FK)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(Uom);
    _mainView.select_popupItem("grid", Uom);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTURE)
             .findGrid()
             .findCell(app.GridCells.QUANTITY_SMALL)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(Qty);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTURE)
             .findGrid()
             .findCell(app.GridCells.COSTGROUP_PRJ)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .wait(500)
             .type(cost)
             .wait(500);
    _mainView.select_popupItem("grid", cost);
    cy.wait(1000)
  }
  
  BoQDocumentPropertiesDialog(data:DataCells){
    cy.wait(3000).then(()=>{
      cy.get("body")
        .then(($body) => {
          let length = $body.find(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS+' '+".ico-up").length;
          if (length > 0) {
            for (let index = 1; index <= length; index++) {
              cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS+' '+".ico-up")
                .eq(0)
                .click();
            }      
          }   
        })
    }).then(()=>{
      for(var value of data[commonLocators.CommonLabels.HEADER_TEXT]){
        _modalView.findModal()
                  .wrapElements()
                  .contains(commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT,value)
                  .closest(commonLocators.CommonElements.PANEL_GROUP)
                  .as("HEADER")
                  cy.wait(2000)
        switch (value) {
    
          case "BOQ Catalog Assignments":
            cy.get('@HEADER')
              .within(($el)=>{
                cy.wrap($el)
                  .find('.ico-down')
                  .click()
                   
                  if (data[commonLocators.CommonLabels.EDIT_TYPE]) {
                    cy.wrap($el)
                    .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.EDIT_TYPE)
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
  
                  if (data[commonLocators.CommonKeys.BOQ_CATALOG_ASSIGN_DETAILS]==="create") {
                    cy.wrap($el)
                      .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonKeys.BOQ_CATALOG_ASSIGN_DETAILS)
                      .closest(commonLocators.CommonElements.ROW)
                      .within(($ele) => {
                        cy.wrap($ele)
                          .find('.even .'+commonLocators.CommonElements.COLUMN_ID+app.GridCells.GAEBCATALOGNAME).first()
                          .click() 
                        cy.wrap($ele)
                          .find("[class*='"+app.InputFields.DOMAIN_TYPE_DESCRIPTION+"']")
                          .clear()
                        cy.wrap($ele)
                          .find('.even .'+commonLocators.CommonElements.COLUMN_ID+app.GridCells.GAEBCATALOGTYPE).first()
                          .click() 
                        cy.wrap($ele)
                          .find('.even .'+commonLocators.CommonElements.COLUMN_ID+app.GridCells.BOQCATALOG).first()
                          .click()
                        cy.wrap($ele)
                          .find("[class*='"+app.InputFields.INPUT_GROUP_CONTENT+"']")
                          .clear()
                          .type(data[app.GridCells.BOQCATALOG])
                          .then(()=>{
                            cy.document()
                              .its('body')
                              .find(".popup-container")
                              .within(()=>{
                                cy.get("div.popup-content").within(() => {
                                  cy.wait(1001)
                                  cy.get('.lookup-item').each(($cell) => {
                                    const cellField: string = $cell.text();
                                    if (data[app.GridCells.BOQCATALOG] === cellField) {
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
                          .find('.even .'+commonLocators.CommonElements.COLUMN_ID+app.GridCells.COSTGROUP).first()
                          .click()
                          cy.wrap($ele)
                          .find("[class*='"+app.InputFields.INPUT_GROUP_CONTENT+"']")
                          .clear()
                          .type(data[app.GridCells.COSTGROUP])
                          .then(()=>{
                            cy.document()
                              .its('body')
                              .find(".popup-container")
                              .within(()=>{
                                cy.get("div.popup-content").within(() => {
                                  cy.wait(1001)
                                  cy.get('.lookup-item').each(($cell) => {
                                    const cellField: string = $cell.text();
                                    if (data[app.GridCells.COSTGROUP] === cellField) {
                                      cy.wait(1000);
                                      cy.wrap($cell).click({ force: true });
                                      cy.wait(2000);
                                      return false;
                                    }
                                  });
                                });
                              }) 
                          })
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
  
  enterRecord_toCreate_catalog(Description:string,LineItemContext:string) {
    _common.enterRecord_inNewRow(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, Description);
    cy.wait(2000)
    _modalView.findModuleClientArea()
    .findAndShowContainer(cnt.uuid.INSTANCES)
    .findGrid()
    .findActiveRow()
    .findCell(app.GridCells.LINE_ITEM_CONTEXT_FK)
    .findButton(app.ContainerElements.CARET)
    .clickIn();
    _modalView.select_popupItem("list",LineItemContext)
  }
  
  enterRecord_toCreateCostGroups(Code:string,Description:string) {
    _mainView.findModuleClientArea()
    .findAndShowContainer(cnt.uuid.COST_GROUPS)
    .findGrid()
    .findCell(app.GridCells.CODE)
    .findTextInput(app.InputFields.DOMAIN_TYPE_CODE)
    .type(Code);
    _mainView.findModuleClientArea()
    .findAndShowContainer(cnt.uuid.COST_GROUPS)
    .findGrid()
    .findCell(app.GridCells.DESCRIPTION_INFO)
    .findTextInput(app.InputFields.DOMAIN_TYPE_TRANSLATION)
    .type(Description);
  }
  
  create_changeOrderContractForNewBoQ_fromWizard(data:DataCells){
     _modalView.findModal()
               .findModalBody()
             cy.get('input[value="changeOrder"]').click({force:true})
  
      _modalView.findModal()
                .findModalBody()
                .wrapElements()
                .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.PROJECT_CHANGE)
                .closest(commonLocators.CommonElements.ROW)
                .within(($ele) => {
                  cy.wrap($ele).find(`[class*='${btn.IconButtons.ICO_INPUT_ADD}']`).click()
                })
    
      _modalView.findModal()
                .findCaretInsideModal(commonLocators.CommonLabels.CHANGE_TYPE)
                .then(()=>{
                  _modalView.select_popupItem("list",data[commonLocators.CommonLabels.CHANGE_TYPE])
                })
      
      cy.wait(2000)
        .then(()=>{
          cy.get("[class*='modal-footer']").last().contains(btn.ButtonText.OK).click();
        })
            cy.wait(1000)
    _modalView.findModal()
              .findModalBody()
            cy.get("[class*='panel-group'] [type='checkbox']").click({force:true})
  
    cy.wait(5000)
    _modalView.findModal().acceptButton(btn.ButtonText.OK);
            cy.wait(2000)
    _validate.validate_Text_message_In_PopUp("Create contract(s) successfully!")
    this.getCode_fromContractModal("CONTRACT_CODE1")
    _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_CONTRACT)
    cy.wait(2000)
    .then(()=>{
      cy.get("body").then(($body) => {
        if ($body.find(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS).length > 0) {
          _modalView.findModal().acceptButton(btn.ButtonText.OK);
        }
      });
  })       
    
  }
  
  
  clickOn_cellHasIcon1(containerUUID: string, cellClass: string, iconClass: string,recordType?:string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .getCell(cellClass,recordType)
             .wrapElements()
             .get(`i.${iconClass}`)
             .click();
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .getCell(cellClass,recordType)
             .wrapElements()
             .get(`i.${iconClass}`)
             .click();
  
  
  }

  customizing_DataRecordCheckBox(checkboxCell: string, checkBoxValue: string) {
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.INSTANCES).findGrid().findActiveRow().getCell(checkboxCell).wrapElements()
      .find(commonLocators.CommonElements.CHECKBOX_TYPE).as("check").invoke('is', ':checked')
      .then(checked => {
        if (checkBoxValue == "check") {
          if (!checked) {
            cy.get('@check').check();
          }
        } if (checkBoxValue == "uncheck") {
          if (checked) {
            cy.get('@check').uncheck();
          }
        }
      })
  }

  enterRecord_toCreatePackage(procurementStru: string, descInfo: string) {
    _mainView.findModuleClientArea();
    _modalView.findModal()
              .findInputFieldInsideModal("Procurement structure", app.InputFields.INPUT_GROUP_CONTENT)
              .type(procurementStru)
              .then(() => {
                cy.wait(1000)
                _modalView.select_popupItem("grid", procurementStru);
              })
    _modalView.findModal()
      .findInputFieldInsideModal("Configuration", app.InputFields.INPUT_GROUP_CONTENT)
      .clear({ force: true })
      .type(procurementStru)
      .then(() => {
        cy.wait(1000)
        _modalView.select_popupItem("grid", procurementStru);
      })
    _modalView.findModal()
      .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
      .clear()
      .type(descInfo);
    _modalView.findModal().acceptButton("OK");
  }

  create_ProcuremenBoQs() {
    _modalView.findModal().acceptButton("OK");
  }

  create_ContractfromPackage(BusinessPartner: string) {
    _common.waitForLoaderToDisappear()
    _modalView.findModal()
              .findInputFieldInsideModal("Business Partner",app.InputFields.INPUT_GROUP_CONTENT)
              .wait(1000)
              .clear({force:true})
              .wait(1000)
              .type(BusinessPartner, { force: true });
    _common.waitForLoaderToDisappear()
    _modalView.select_popupItem("grid", BusinessPartner);
    _common.waitForLoaderToDisappear()
    _modalView.findModal().acceptButton("Next");
    _common.waitForLoaderToDisappear()
    _validate.validate_Text_message_In_PopUp("Create contract(s) successfully!")
    this.getCode_fromContractModal("CONTRACT_CODE")
    _modalView.findModal().acceptButton("Go To Contract");
  }

  searchRecord_byColumnFilter(container_UUID: string,columncellClass:string,textInputClass:string,searchValue: string)
  {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
             .findButton(btn.ToolBar.ICO_SEARCH_COLUMN)
             .assertClass("active")
             .then((searchField) => {
              if(searchField)
              {
                cy.get("body").then(($body) => {
                  if ($body.find(`.cid_${container_UUID} [class*='${btn.IconButtons.ICO_INPUT_DELETE}']`).length > 0) {
                    cy.wait(500)
                    cy.get(`.cid_${container_UUID} [class*='${btn.IconButtons.ICO_INPUT_DELETE}']`)
                      .click();
                  }
                });
                console.log("----> column filter is present and direct searching <----");
                _mainView.findModuleClientArea()
                         .findAndShowContainer(container_UUID)
                         .findGrid()
                         .wrapElements().then(()=>{
                          cy.get(`.cid_${container_UUID} div.${app.SubContainerLayout.ITEM_FIELD}${columncellClass}`)
                            .click({force:true}).click()
                          cy.get(`.cid_${container_UUID} div.${app.SubContainerLayout.ITEM_FIELD}${columncellClass}`)
                            .find(`input[class^='${textInputClass}']`)
                            .clear({force:true})
                            .type(`${searchValue}{enter}`)
                         })
              }
              else {
                console.log("----> Clicking on column filter icon and searching <----");
               _mainView.findModuleClientArea()
                        .findAndShowContainer(container_UUID)
                        .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
                        .findButton(btn.ToolBar.ICO_SEARCH_COLUMN)
                        .clickIn()
                      cy.get("body").then(($body) => {
               if ($body.find(`.cid_${container_UUID} [class*='${btn.IconButtons.ICO_INPUT_DELETE}']`).length > 0) {
                      cy.wait(500)
                      cy.get(`.cid_${container_UUID} [class*='${btn.IconButtons.ICO_INPUT_DELETE}']`)
                        .click();
                  }
              });
                      cy.wait(500)
               _mainView.findModuleClientArea()
                        .findAndShowContainer(container_UUID)
                        .findGrid()
                        .wrapElements()
                        .then(()=>{
                      cy.get(`.cid_${container_UUID} div.${app.SubContainerLayout.ITEM_FIELD}${columncellClass}`)
                        .click({force:true}).click()
                      cy.get(`.cid_${container_UUID} div.${app.SubContainerLayout.ITEM_FIELD}${columncellClass}`)
                        .find(`input[class^='${textInputClass}']`)
                        .type(`${searchValue}{enter}`)
              })
          }
      })
  }
}
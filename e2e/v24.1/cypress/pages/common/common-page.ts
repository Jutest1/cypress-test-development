/// <reference types="cypress" />

import { _mainView, _sidebar, _modalView, _validate, _common } from "../index";
import { cnt, btn, app, commonLocators, sidebar } from "../../locators";
import { DataCells } from "../interfaces";
import { forIn } from "cypress/types/lodash";
import CommonLocators from "cypress/locators/common-locators";

export class CommonPage {
  element: string = "";

  //! Container related common method
  
  waitForLoaderToDisappear(){
    cy.get('#loading-bar')
      .should('not.exist', { timeout: 10000, interval: 1000 });
  }

  toggleSidebar(sideBarClass: string) {
    cy.get(`#${app.Layouts.MAIN_CONTAINER}`)
      .then(($ele) => {
        this.waitForLoaderToDisappear()
        if ($ele.find(commonLocators.CommonElements.SIDEBAR).length > 0) {
          cy.log("Sidebar already expanded....");
          cy.get("body")
            .then(($body) => {
              if ($body.find(`[id='${sideBarClass}']`+commonLocators.CommonElements.CLASS_SELECTED).length > 0) {
                cy.log("Sidebar is present");
              }else{
                _sidebar.findSidebar()
                        .sidebarIndicator(sideBarClass)
                        .clickIn()
              }
            });
        } else {
          cy.log("Sidebar not expanded. Expanding...");
          _sidebar.findSidebar()
                  .sidebarIndicator(sideBarClass)
                  .clickIn()
        }
    });
    return this;
  }
  
  clear_searchInSidebar() {
    cy.wait(1000) // This wait is required as script was getting failed
    cy.get(`#${sidebar.sideBarList.SIDEBAR_SEARCH}`)
      .find(`#${sidebar.fields.GOOGLE_SEARCH_INPUT}`)
      .clear();
    cy.wait(1000) // This wait is required as script was getting failed
    cy.get(`#${sidebar.sideBarList.SIDEBAR_SEARCH}`)
      .find(`[class*="${sidebar.icoButtons.SEARCH}"]`)
      .click();
  }

  pinnedItem() {
    _mainView.toolbar(app.ContainerElements.SUBVIEW_HEADER_TOOLBAR)
             .findButton(btn.ToolBar.ICO_SET_PRJ_CONTEXT)
             .clickIn();
    return this;
  }

  delete_pinnedItem() {
    _sidebar.delete_pinnedItem();
    return this;
  }

  maximizeContainer(containerUUID: string) {
    cy.wait(1000)
    cy.get(commonLocators.CommonElements.BODY)
      .then(($body) => {
        if ($body.find(".cid_"+containerUUID+` [class*='${app.Layouts.SUB_VIEW_HEADER_TOOLBAR}'] [class*='${btn.ToolBar.ICO_MINIMIZED_2}']`).length > 0) {
          cy.log('Container already maximized')
        }else{
          _mainView.findModuleClientArea()
                   .findAndShowContainer(containerUUID)
                   .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
                   .findButton(btn.ToolBar.ICO_MAXIMIZED_2)
                   .clickIn();
        }
      });
  }

  minimizeContainer(containerUUID: string) {
    cy.wait(1000)
    cy.get("body")
      .then(($body) => {
        if ($body.find(".cid_"+containerUUID+` [class*='${app.Layouts.SUB_VIEW_HEADER_TOOLBAR}'] [class*='${btn.ToolBar.ICO_MAXIMIZED_2}']`).length > 0) {
          cy.log('Container already minimized')
        }else{
          _mainView.findModuleClientArea()
                   .findAndShowContainer(containerUUID)
                   .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
                   .findButton(btn.ToolBar.ICO_MINIMIZED_2)
                   .clickIn()
        }
      });
  }

  search_fromSidebar(searchType: string, searchValue: string) {
    _sidebar.searchBySidebar(searchType, searchValue);
    return this;
  }

  openTab(tabID: string): Cypress.Chainable<any> {
    cy.wait(2000);
    Cypress.env("groupContainerArray", []);
    const chain = cy.wrap(_mainView.findModuleClientArea()
                                   .tabBar()
                                   .findTab(tabID)
                                   .clickIn()
                         );
    cy.wait(5000);
    return chain;
  }

  openDesktopTile(tileClass: string) {
    Cypress.env("groupContainerArray", []);
    _mainView.findModuleClientArea()
             .findTile(tileClass)
             .clickIn();
  }

  clickOn_toolbarButton(containerUUID: string,buttonClass:string, containerPosition?: number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
             .findButton(buttonClass)
             .clickIn();
    this.waitForLoaderToDisappear()
  }

  create_newRecord(containerUUID: string, containerPosition?: number) {
    if (containerUUID===cnt.uuid.PROJECTS) {
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).clear_searchInSidebar()
      _common.waitForLoaderToDisappear()
      _mainView.findModuleClientArea()
               .findAndShowContainer(containerUUID, containerPosition)
               .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
               .findButton(btn.ToolBar.ICO_REC_NEW)
               .clickIn();
      this.waitForLoaderToDisappear()
    }else{
      _mainView.findModuleClientArea()
               .findAndShowContainer(containerUUID, containerPosition)
               .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
               .findButton(btn.ToolBar.ICO_REC_NEW)
               .clickIn();
      this.waitForLoaderToDisappear()
    }
    
  }

  create_newSubRecord(containerUUID: string, containerPosition?: number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
             .findButton(btn.IconButtons.ICO_SUB_FLD_NEW)
             .clickIn()
    this.waitForLoaderToDisappear()
  }

  delete_recordFromContainer(containerUUID: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
             .findButton(btn.IconButtons.ICO_REC_DELETE)
             .wrapElements()
             .click({force:true})
             .then(()=>{
                cy.wait(1000)
                cy.get("body")
                  .then(($body) => {
                    if ($body.find(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS}`).length > 0) {
                      _modalView.acceptButton(btn.ButtonText.YES)
                    }
                  });
             })
  }

  select_rowInContainer(containerUUID: string, containerPosition?: number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .findGrid()
             .findCell(app.SubContainerLayout.INDICATOR);
    _common.waitForLoaderToDisappear()
  }

  select_rowInSubContainer(containerUUID: string, containerPosition?: number) {
    _mainView.findModuleClientArea()
             .findAndShowSubContainer_InContainer(containerUUID, containerPosition)
             .findCell(app.SubContainerLayout.INDICATOR);
  }

  search_inSubContainer(containerUUID: string, searchValue: string, containerPosition?: number) {
    cy.wait(1000)
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
             .findButton(btn.ToolBar.ICO_SEARCH_ALL)
             .assertClass("active")
             .then((searchField) => {
                if (searchField) {
                  console.log("----> Search field is present and direct searching <----");
                  _mainView.findModuleClientArea()
                           .findAndShowContainer(containerUUID)
                           .findGrid()
                           .findTextInput(app.InputFields.FILTER_INPUT)
                           .type(`{selectAll}{backspace}${searchValue}`);
                } else {
                  cy.wait(1000)
                  console.log("----> Clicking on search icon and searching <----");
                  _mainView.findModuleClientArea()
                           .findAndShowContainer(containerUUID)
                           .wrapElements()
                           .find(`button[class*='${btn.ToolBar.ICO_SEARCH_ALL}']`)
                           .click()
                  _mainView.findModuleClientArea()
                           .findAndShowContainer(containerUUID)
                           .findGrid()
                           .findTextInput(app.InputFields.FILTER_INPUT)
                           .type(`{selectAll}{backspace}${searchValue}`);
                }
             });
  }

  select_dataFromSubContainer(containerUUID: string, data: string, containerPosition?: number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID,containerPosition)
             .findGrid()
             .wrapElements()
             .contains(`[class*='${app.SubContainerLayout.COLUMN_ID}']`, data)
             .click({ force: true });
  }

  select_tabFromFooter(containerUUID: string, containerTitle: string, containerPosition?: number) {
    cy.wait(1000) // This wait is added as container takes time to load
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .selectTabInSubContainerView(containerTitle);
  }

  enterRecord_inNewRow(containerUUID: string, gridCellClass: string, inputFieldClass: string, inputData: string, recordType?: string, containerPosition?: number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .findGrid()
             .findActiveRow()
             .getCell(gridCellClass, recordType)
             .clickIn()
    cy.wait(1000)
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .findGrid()
             .findActiveRow()
             .findCell(gridCellClass, recordType)
             .findTextInput(inputFieldClass)
             .clear()
             .type(inputData,{force:true,parseSpecialCharSequences:false});
  }

  clear_subContainerFilter(containerUUID: string) {
    this.waitForLoaderToDisappear()
    cy.wait(1000)
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
             .findButton(btn.ToolBar.ICO_SEARCH_ALL)
             .assertClass("active")
             .then((searchField) => {
                if (searchField) {
                  console.log("----> Search field is present and direct searching <----");
                  _mainView.findModuleClientArea()
                           .findAndShowContainer(containerUUID)
                           .findGrid()
                           .findTextInput(app.InputFields.FILTER_INPUT)
                           .clear({force:true});
                } else {
                  console.log("----> Clicking on search icon and searching <----");
                  cy.wait(1000)
                  _mainView.findModuleClientArea()
                           .findAndShowContainer(containerUUID)
                           .wrapElements()
                           .find(`button[class*='${btn.ToolBar.ICO_SEARCH_ALL}']`)
                           .click({force:true})
                  _mainView.findModuleClientArea()
                           .findAndShowContainer(containerUUID)
                           .findGrid()
                           .findTextInput(app.InputFields.FILTER_INPUT)
                           .clear({force:true});
                }
             });
  }

  select_allContainerData(containerUUID: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .selectAllContainerData();
  }  

  clickOn_cellHasValue(containerUUID: string, gridCell: string, cellValue: string, recordType?: string, containerPosition?: number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID,containerPosition)
             .findGrid()
             .findCellhasValue(gridCell, cellValue,recordType)
             .click()
  }

  clickOn_cellHasUniqueValue(containerUUID: string, cellClass: string, value: string, recordType?: string, containerPosition?: number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .findGrid()
             .getCell(cellClass, recordType)
             .wrapElements()
             .each(($el) => {
                const val = $el.text().trim();
                if (val === value) {
                  cy.wrap($el).click({force:true});
                  return false;
                }
             });
  }

  clickOn_activeRowCell(containerUUID: string, gridCell: string,containerPosition?:number,recordType?:string) {
    cy.wait(1000)
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID,containerPosition)
             .findGrid()
             .findActiveRow()
             .findCell(gridCell,recordType);
    this.waitForLoaderToDisappear()
  }

  clickOn_goToButton_toSelectModule(containerUUID: string, moduleName: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID).toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
             .findButton(btn.IconButtons.ICO_GO_TO)
             .wrapElements()
             .click()
             .then(()=>{
              _mainView.select_popupItem("span", moduleName);
             })
  }

  clickOn_actionButton_toSelectAction(containerUUID: string, actionName: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
             .findButton(btn.ToolBar.ACTIONS)
             .wrapElements()
             .click()
             .then(()=>{
              _mainView.select_popupItem("span", actionName);
             })
  }

  edit_containerCell(containerUUID: string, gridCells: string,inputTextClass:string, cellValue: any, recordType?) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .findActiveRow()
             .findCell(gridCells, recordType)
             .findTextInput(inputTextClass)
             .clear({force:true})
             .type(cellValue,{force:true});
  }
  
  setDefaultView(tabBarID: any,value?:string) {
    _mainView.findModuleClientArea()
             .tabBar()
             .wrapElements()
             .find(`#${tabBarID}`)
             .within(() => {
                cy.get(`[class*='${btn.IconButtons.ICO_MENU}']`)
                  .click();
             })
             .then(()=>{
              cy.wait(500);
              if(value){
                cy.get(`${commonLocators.CommonElements.VIEW_DESCRIPTION}`)
                  .contains(value)
                  .click({ force: true })
              }else{
                cy.get(`${commonLocators.CommonElements.VIEW_DESCRIPTION}`)
                  .contains("RIB")
                  .click({ force: true })
              }
              
             })
    
  }

  clickOn_cellInSubContainer(containerUUID: string, cellClass: string,recordType?:string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .findCell(cellClass,recordType);
  }

  clickOn_cellHasIcon(containerUUID: string, cellClass: string, iconClass: string,recordType?:string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .getCell(cellClass,recordType)
             .wrapElements()
             .get(`i.${iconClass}`)
             .click();
  }

  clickOn_cellHasIconWithIndex(containerUUID: string, cellClass: string, iconClass: string,index:number,recordType?:string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .getCell(cellClass,recordType)
             .wrapElements()
             .get(`i.${iconClass}`)
             .eq(index)
             .click({force:true});
  }

  select_activeRowInContainer(containerUUID: string,recordType?:string , containerPosition?: number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .findGrid()
             .findActiveRow()
             .findCell(app.SubContainerLayout.INDICATOR,recordType)
    _common.waitForLoaderToDisappear()
  }

  setup_gridLayout(containerUUID: string, requiredColumn: { [key: string]: any }) {
    var requiredColumns = requiredColumn;
    console.log("GRID LAYOUT COLUMN==>", requiredColumns);
    _mainView.configure_containerColumn(containerUUID, requiredColumns);
  }

  select_rowHasValue_byId(containerUUID: string, value: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGridById(containerUUID)
             .wrapElements()
             .within(() => {
              cy.contains(`[class*='${app.SubContainerLayout.COLUMN_ID}']`,value)
                .then(($cell) => {
                  if ($cell) {
                    cy.wrap($cell)
                      .click({multiple:true,force:true});
                    cy.wait(1000);
                    cy.get(`.${app.SubContainerLayout.ACTIVE} div.${app.SubContainerLayout.COLUMN_ID}_${app.SubContainerLayout.INDICATOR}`)
                      .click();
                  }
              });
             });
  }

  select_rowHasValue_onIndexBased(containerUUID: string, value: string,index?:number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGridById(containerUUID)
             .wrapElements()
             .within(() => {
              cy.get(`[class*='${app.SubContainerLayout.COLUMN_ID}']:contains('${value}')`)
                .eq(index)
                .then(($cell) => {
                  if ($cell) {
                    cy.wrap($cell)
                      .click({force:true});
                    cy.wait(1000);
                    cy.get(`.${app.SubContainerLayout.ACTIVE} div.${app.SubContainerLayout.COLUMN_ID}_${app.SubContainerLayout.INDICATOR}`)
                      .click();
                  }
              });
             });
  }

  select_rowHasValue(containerUUID: string, value: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .wrapElements()
             .within(() => {
              cy.contains(`[class*='${app.SubContainerLayout.COLUMN_ID}']`,value)
                .then(($cell) => {
                  if ($cell) {
                    cy.wrap($cell)
                      .click({multiple:true,force:true});
                    cy.wait(1000);
                    cy.get(`.${app.SubContainerLayout.ACTIVE} div.${app.SubContainerLayout.COLUMN_ID}_${app.SubContainerLayout.INDICATOR}`)
                      .click();
                  }
              });
             });
  }

  create_newRecordIfDataNotFound(containerUUID:string,gridCells:string,value:string){
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(containerUUID)
    let returnValue:string=""
    cy.get('body').then(($body) => {
      if ($body.find(`div.${app.SubContainerLayout.COLUMN_ID}_${gridCells} `).length <= 0) {
        cy.wait(1000);
        _common.create_newRecord(containerUUID)
        returnValue="Data does not exist"
        cy.wrap(returnValue).as("CHECK_DATA")
      }else{
        _mainView.findModuleClientArea()
                 .findAndShowContainer(containerUUID)
                 .findGrid()
                 .getCell(gridCells)
                 .wrapElements()
                 .each(($ele) => {
                    var GetTextValue = $ele.text()
                    if(GetTextValue==value){
                      console.log("Already Present")
                      cy.log("VALUE => "+ GetTextValue)
                      returnValue="Data already exist"
                      cy.wrap(returnValue).as("CHECK_DATA")
                    }
                 }).then(()=>{
                  if(returnValue!="Data already exist"){
                    _common.create_newRecord(containerUUID)
                    returnValue="Data does not exist"
                    cy.wrap(returnValue).as("CHECK_DATA")
                  }
                 })
      }
    });
    
  }

  getText_fromCell(containerUUID: string, cellClass: string, recordType?) {
    return _mainView.findModuleClientArea()
                    .findAndShowContainer(containerUUID)
                    .findGrid()
                    .findActiveRow()
                    .getCell(cellClass,recordType)
                    .wrapElements();
  }

  edit_dropdownCellWithInput(containerUUID: string, cellType: string, popUpType: string, cellInputType: string, value: string, recordType?: string, containerPosition?: number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .findGrid()
             .findActiveRow()
             .findCell(cellType, recordType)
    _common.waitForLoaderToDisappear()
    cy.wait(1000)
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .findGrid()
             .findActiveRow()
             .findCell(cellType, recordType)
             .findTextInput(cellInputType)
             .first()
             .clear({force:true})
             .type(value)
             .then(() => {
                cy.wait(2000) // This wait is necessary
                cy.get("body")
                  .then(($body) => {
                    if ($body.find(`${commonLocators.CommonElements.POPUP_FOOTER} .${btn.ToolBar.ICO_REFRESH}`).length > 0) {
                      cy.get(`${commonLocators.CommonElements.POPUP_FOOTER} .${btn.ToolBar.ICO_REFRESH}`)
                        .click()
                        cy.wait(2000) // This wait is necessary
                    }
                  })
              })
              .then(()=>{
                _mainView.findModuleClientArea()
                        .findAndShowContainer(containerUUID, containerPosition)
                        .findGrid()
                        .findActiveRow()
                        .findCell(cellType, recordType)
                        .findTextInput(cellInputType)
                        .first()
                        .clear({force:true})
                        .type(value)
                        .then(() => {
                            cy.wait(4000) // This wait is necessary
                            _mainView.select_popupItem(popUpType, value);
                        });
            })
  }

  edit_dropdownCellWithCaret(containerUUID: string, cellType: string, popUpType: string, value: string, recordType?: string, containerPosition?: number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .findGrid()
             .findActiveRow()
             .findCell(cellType, recordType)
             .caret()
    cy.wait(2000)
    _mainView.select_popupItem(popUpType, value);
  }

  edit_dropdownCellWith_Input_without_ref(containerUUID: string, cellType: string, popUpType: string, cellInputType: string, value: string, recordType?: string, containerPosition?: number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .findGrid()
             .findActiveRow()
             .findCell(cellType, recordType)
    _common.waitForLoaderToDisappear()
    cy.wait(1000)
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .findGrid()
             .findActiveRow()
             .findCell(cellType, recordType)
             .findTextInput(cellInputType)
             .first()
             .clear({force:true})
             .type(value)
              .then(()=>{
                _mainView.findModuleClientArea()
                        .findAndShowContainer(containerUUID, containerPosition)
                        .findGrid()
                        .findActiveRow()
                        .findCell(cellType, recordType)
                        .findTextInput(cellInputType)
                        .first()
                        .clear({force:true})
                        .type(value)
                        .then(() => {
                            cy.wait(4000) // This wait is necessary
                            _mainView.select_popupItem(popUpType, value);
                        });
            })
  }


  create_newRecordInContainer_ifNoRecordExists(containerUUID:string,index:number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .wrapElements()
             .find(`${commonLocators.CommonElements.GRID_CANVAS_RIGHT}`).eq(index)
             .then(($ele) => {
              if ($ele.find(`${commonLocators.CommonElements.UI_WIDGET_CONTENT}`).length > 0) {
                _common.select_rowInContainer(containerUUID);
              } else {
                _common.create_newRecord(containerUUID);
              }
             });
  }

  create_newRecordInSubContainer_ifNoRecordExists(containerUUID:string,index:number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .wrapElements()
             .find(`${commonLocators.CommonElements.GRID_CANVAS_RIGHT}`).eq(index)
             .then(($ele) => {
                if ($ele.find(`${commonLocators.CommonElements.UI_WIDGET_CONTENT}`).length > 0) {
                  _common.select_rowInContainer(containerUUID);
                } else {
                  _common.create_newRecord(containerUUID);
                }
             });
  }

  delete_recordInContainer_ifRecordExists(containerUUID:string) {
    cy.wait(3000)//Added this wait as data is getting loaded after sometime
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .wrapElements()
             .find(`${commonLocators.CommonElements.GRID_CANVAS_RIGHT}`)
             .then(($ele) => {
                if ($ele.find(`${commonLocators.CommonElements.UI_WIDGET_CONTENT}`).length > 0) {
                  _common.select_allContainerData(containerUUID);
                  _common.delete_recordFromContainer(containerUUID);
                } else {
                  cy.log("No record is available in container");
                }
             });
  }

  saveCellDataToEnv(containerUUID: string, cellClass: string, cypressEnvName: string, recordType?: string, containerPosition?: number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .findGrid()
             .findActiveRow()
             .getCell(cellClass, recordType)
             .wrapElements()
             .then(($value) => {
                Cypress.env(cypressEnvName, $value.text());
             });
  }

  saveNumericCellDataToEnv(containerUUID: string, cellClass: string, cypressEnvName: string, recordType?: string, containerPosition?: number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .findGrid()
             .findActiveRow()
             .getCell(cellClass, recordType)
             .wrapElements()
             .then(($value) => {
               Cypress.env(cypressEnvName, parseInt($value.text()))
             });
  }

  set_cellCheckboxValue(containerUUID: string, checkboxCell: string, checkBoxValue: string, containerPosition?: number, recordType?: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .findGrid()
             .findActiveRow()
             .getCell(checkboxCell, recordType)
             .wrapElements()
             .find(commonLocators.CommonElements.CHECKBOX_TYPE)
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
  }

  goToButton_inActiveRow(containerUUID: string, gridCell: string,buttonClass:string, recordType?: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .findActiveRow()
             .getCell(gridCell, recordType)
             .wrapElements()
             .rightclick({ force: true })
             .then(()=>{
              cy.get(`${commonLocators.CommonElements.POPUP_CONTAINER}`)
                .first()
                .within(() => {
                  cy.get(`button.${btn.IconButtons.ICO_GO_TO}`)
                    .click({ force: true });
                });
                cy.wait(1000)
              cy.get(`${commonLocators.CommonElements.POPUP_CONTAINER}`)
                .last()
                .within(() => {
                  cy.get(`button.${buttonClass}`)
                    .first()
                    .click({ force: true });
                });
              cy.wait(2000);
             })
    
  }

  collapse_activeRecord(containerUUID:string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .findActiveRow()
             .findIconTreeCollapse();
  }

  filterCurrentEstimate(containerUUID: string,type:string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
             .wrapElements()
             .then(($el)=>{
                if(type==="noFilter"){
                    if ($el.find(`[class*='${btn.ToolBar.ICO_FILTER}'].${app.SubContainerLayout.ACTIVE}`).length > 0) {
                      cy.wrap($el)
                        .find(`[class*='${btn.ToolBar.ICO_FILTER}'].${app.SubContainerLayout.ACTIVE}`)
                        .click()
                    }
                }
                if(type==="filter"){
                  if ($el.find(`[class*='${btn.ToolBar.ICO_FILTER}'].${app.SubContainerLayout.ACTIVE}`).length > 0) {
                    cy.log("Already Filtered")
                  }else{
                    cy.wrap($el)
                      .find(`[class*='${btn.ToolBar.ICO_FILTER}']`)
                      .click()
                  }
                }
             })    
  }
    
  returnArrayForMultipleCell(containerUUID: string, cellClass: string, recordType?: string, containerPosition?: number):string[] {
      let arrayData:string[]=[];
      _mainView.findModuleClientArea()
               .findAndShowContainer(containerUUID, containerPosition)
               .findGrid()
               .getCell(cellClass, recordType)
               .wrapElements()
               .each(($el,index)=>{
                  arrayData.push($el.text())
               })
      return arrayData
  }

  set_containerLayoutUnderEditView(layout_name:string){
    cy.get('#tabbar', { timeout: 3000 })
      .within((li) => {
      cy.wrap(li).get('li[class*="active"] button.ico-menu').click();
    });
    cy.get("[class*='popup-content flex-box']", { timeout: 3000 })
      .contains('Edit View')
      .click();
    cy.get(`[class*='modal-content'] [name='${layout_name}']`)
      .click();
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
  }

  clickOn_activeContainerButton(containerUUID:string,btnClass:string){
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .findActiveRow()
             .findButton(btnClass)
             .clickIn()        
  }
  
  clickOn_toolBarButtonWithTitle(containerUUID:string,buttonTitle:string){
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
             .findButtonWithTitle(buttonTitle)
             .clickIn()
  }

  lookUpButtonInCell(containerUUID: string, cellClass: string, lookUpBtnClass: string, index: number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .findActiveRow()
             .findCell(cellClass)
             .findInputLookup(lookUpBtnClass, index);
  }

  checkSearchOption_inSideBar(data:DataCells){
      cy.get(data[commonLocators.CommonKeys.CLASS])
        .contains(data[commonLocators.CommonElements.LABEL])
        .click({force:true})
        .closest(commonLocators.CommonElements.ROW)
        .within(($ele) => {
            cy.wrap($ele)
              .find(commonLocators.CommonElements.CHECKBOX_INPUT)
              .as("checkbox")
              .invoke("is", ":checked")
              .then((checked) => {
                if (data[commonLocators.CommonKeys.VALUE] === commonLocators.CommonKeys.CHECK) {
                  if (!checked) {
                    cy.get("@checkbox").check();
                  }
                } else if (data[commonLocators.CommonKeys.VALUE] === commonLocators.CommonKeys.UNCHECK) {
                  if (checked) {
                    cy.get("@checkbox").uncheck();
                  }
                }
            
          })
         
        })    
  }

  select_numberRangeSetting() {
    _mainView.findAndShowContainer(cnt.uuid.NUMBER_RANGES)
             .findCheckBox_byLabel("Check Number", "checkbox")
             .then((check_number) => {
              if (check_number.hasClass("ng-empty")) {
                _common.create_newRecord_forNumberRange(cnt.uuid.NUMBER_RANGES);
                _mainView.findAndShowContainer(cnt.uuid.NUMBER_RANGES)
                         .findCaretByLabel("Sequence Type")
                         .then(()=>{
                          _mainView.select_popupItem("list", "Continues Sequence");
                         })
                _modalView.findAndShowContainer(cnt.uuid.NUMBER_RANGES)
                          .findCheckBox_byLabel("Check Number", "checkbox")
                          .click()
                          .then(()=>{
                            _mainView.findInputInContainerByLabel(cnt.uuid.NUMBER_RANGES, "Minimal Length")
                            .clear()
                            .type("1");
                            _mainView.findInputInContainerByLabel(cnt.uuid.NUMBER_RANGES, "Maximum Length")
                                     .clear()
                                     .type("999");

                          })
                _mainView.findAndShowContainer(cnt.uuid.NUMBER_RANGES)
                         .findCaretByLabel("Number Sequence")
                         .then(()=>{
                            _mainView.select_popupItem("list", "999_Vertrag");
                         })
                cy.SAVE();
              } else {
                cy.log("auto code generated setting is active");
              }
             });
  }

  create_newRecordInCurrencyConversion_ifRecordNotExists(containerUUID:string,gridCells:string,value:string,rate:string,index:number){
    const DAYS = require('dayjs')
    let date=parseInt(DAYS().format('DD'))
    let month=DAYS().format('MM')
    let year=DAYS().format('YYYY')
    let currentDate=date+"/"+month+"/"+year;
    let status:any
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .wrapElements()
             .find("[class*='grid-canvas grid-canvas-top grid-canvas-right']").eq(index)
             .then(($ele) => {
                if ($ele.find("[class*='ui-widget-content']").length > 0) {
                  _mainView.findModuleClientArea()
                           .findAndShowContainer(containerUUID)
                           .findGrid()
                           .getCell(app.SubContainerLayout.INDICATOR)
                           .wrapElements()
                           .each(($ele)=> {
                              cy.wrap($ele).click()
                              _mainView.findAndShowContainer(containerUUID)
                                       .findGrid()
                                       .getCell(gridCells)
                                       .wrapElements()
                                       .each(($ele)=> {
                                          var GetTextValue = $ele.text()
                                          cy.log(GetTextValue)
                                          if(GetTextValue.match(value)){
                                            console.log("Already Present")
                                            status="true"
                                            _mainView.findModuleClientArea()
                                                     .findAndShowContainer(cnt.uuid.EXCHANGE_RATES)
                                                     .findGrid()
                                                     .getCell(app.GridCells.RATE_DATE)
                                                     .wrapElements()
                                                     .each(($el, index, $list)=>{
                                                      if($list.length==0){
                                                        _common.create_newRecord(cnt.uuid.EXCHANGE_RATES)
                                                        _common.edit_containerCell(cnt.uuid.EXCHANGE_RATES,app.GridCells.RATE,app.InputFields.INPUT_GROUP_CONTENT,rate)
                                                        cy.SAVE()
                                                        cy.wait(2000)
                                                        _common.saveCellDataToEnv(cnt.uuid.EXCHANGE_RATES,app.GridCells.RATE,"EXCHANGE-RATE")
                                                      }
                                                      if(($el.text()).match(currentDate)){
                                                        cy.wrap($el).click()
                                                        cy.wait(2000)
                                                        _common.saveCellDataToEnv(cnt.uuid.EXCHANGE_RATES,app.GridCells.RATE,"EXCHANGE-RATE")
                                                      }
                                                    })
                                                    return false
                                          }
                                          else{
                                            status="false"
                                          }
                                        })
                           })
                }
                else{
                    _common.create_newRecord(containerUUID)
                    _common.edit_dropdownCellWithInput(containerUUID,gridCells,"grid",app.InputFields.INPUT_GROUP_CONTENT,value)
                    _common.create_newRecord(cnt.uuid.EXCHANGE_RATES)
                    _common.edit_containerCell(cnt.uuid.EXCHANGE_RATES,app.GridCells.RATE,app.InputFields.INPUT_GROUP_CONTENT,rate)
                    cy.SAVE()
                    cy.wait(2000)
                    this.saveCellDataToEnv(cnt.uuid.EXCHANGE_RATES,app.GridCells.RATE,"EXCHANGE-RATE")
                }
  
                if(status=="false"){
                  _common.create_newRecord(containerUUID)
                  _common.edit_dropdownCellWithInput(containerUUID,gridCells,"grid",app.InputFields.INPUT_GROUP_CONTENT,value)
                  _common.create_newRecord(cnt.uuid.EXCHANGE_RATES)
                  _common.edit_containerCell(cnt.uuid.EXCHANGE_RATES,app.GridCells.RATE,app.InputFields.INPUT_GROUP_CONTENT,rate)
                  cy.SAVE()
                  cy.wait(2000)
                  this.saveCellDataToEnv(cnt.uuid.EXCHANGE_RATES,app.GridCells.RATE,"EXCHANGE-RATE")
                }
              })
  }

  set_cellCheckboxValueForAllRowCell(containerUUID: string, checkboxCell: string, checkBoxValue: string, containerPosition?: number, recordType?: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .findGrid()
             .getCell(checkboxCell, recordType)
             .wrapElements()
             .find(commonLocators.CommonElements.CHECKBOX_TYPE)
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
  }

  enterRecord_toChangeLanguage(data: DataCells){
    cy.get(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS)
      .find(commonLocators.CommonElements.MASTER_ITEM)
      .contains(commonLocators.CommonLabels.LANGUAGE)
      .click({force:true})  
   _modalView.findModal()
             .findCaretInsideModal(commonLocators.CommonLabels.UI_LANGUAGE)
             .then(()=>{
                _modalView.select_popupItem("grid1", data[commonLocators.CommonLabels.UI_LANGUAGE]);  
             })
     _common.waitForLoaderToDisappear() 
     cy.wait(1000)       
   _modalView.findModal()
             .findCaretInsideModal(commonLocators.CommonLabels.USER_DATA_LANGUAGE)
             .then(()=>{
                _modalView.select_popupItem("grid1", data[commonLocators.CommonLabels.USER_DATA_LANGUAGE]);   
             })
  }

  assign_clerkForLoggedInUser(containerUUID:string,data:DataCells){
    _common.search_inSubContainer(cnt.uuid.CLERKS,Cypress.env("USER_NAME"))
    cy.wait(1000)
      _mainView.findModuleClientArea()
               .findAndShowContainer(containerUUID)
               .findGrid()
               .wrapElements()
               .find("[class*='grid-canvas grid-canvas-top grid-canvas-right']")
               .then(($ele) => {
                  if ($ele.find("[class*='ui-widget-content']").length > 0) {
                    let clerkStatus
                    _mainView.findModuleClientArea()
                              .findAndShowContainer(containerUUID)
                              .findGrid()
                              .wrapElements()
                              .find(`[class*='${app.SubContainerLayout.COLUMN_ID}_userfk']`)
                              .each(($value,index)=>{
                                let clerkName=$value.text()
                                if (clerkName===Cypress.env("USER_NAME")) {
                                  clerkStatus="true"
                                  return false
                                }else{
                                  clerkStatus="false"
                                }
                              })
                              .then(()=>{
                                if (clerkStatus==="true") {
                                  _common.select_rowHasValue(containerUUID,Cypress.env("USER_NAME"));
                                  cy.wait(1000)
                                  _common.saveCellDataToEnv(containerUUID,app.GridCells.CODE,"CLERK_LOGGED_USER")
                                }else{
                                  _common.search_inSubContainer(containerUUID,data[app.GridCells.CODE])
                                  _common.clickOn_cellHasUniqueValue(containerUUID,app.GridCells.CODE,data[app.GridCells.CODE])
                                  _common.edit_dropdownCellWithInput(containerUUID,app.GridCells.USER_FK,'grid',app.InputFields.INPUT_GROUP_CONTENT,Cypress.env("USER_NAME"))
                                  _common.select_activeRowInContainer(containerUUID)
                                  this.waitForLoaderToDisappear()
                                  cy.SAVE()
                                  this.waitForLoaderToDisappear()
                                  cy.wait(1000)
                                  _common.saveCellDataToEnv(containerUUID,app.GridCells.CODE,"CLERK_LOGGED_USER")
                                }
                              })
                            
                  } else {
                    _common.search_inSubContainer(containerUUID,data[app.GridCells.CODE])
                    _common.clickOn_cellHasUniqueValue(containerUUID,app.GridCells.CODE,data[app.GridCells.CODE])
                    _common.edit_dropdownCellWithInput(containerUUID,app.GridCells.USER_FK,'grid',app.InputFields.INPUT_GROUP_CONTENT,Cypress.env("USER_NAME"))
                    _common.clickOn_activeRowCell(containerUUID,app.GridCells.CODE)
                    cy.SAVE()
                    this.waitForLoaderToDisappear()
                    cy.wait(1000)
                    _common.saveCellDataToEnv(containerUUID,app.GridCells.CODE,"CLERK_LOGGED_USER")
                  }
               });    
    
   
  }

  clickOn_containerFooterButton(containerUUID:string,footerClass:string,buttonClass:string){
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .containerFooter(footerClass)
             .findButton(buttonClass)
             .clickIn()
  }

  columnFilter_inSubContainer(containerUUID: string, columnClass:string, searchValue: string) {
    this.waitForLoaderToDisappear()
    cy.wait(1000);
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
             .findButton(btn.ToolBar.ICO_SEARCH_COLUMN)
             .assertClass("active")
             .then((searchField) => {
              if (searchField) {
                console.log("----> column filter is present and direct searching <----");
                _mainView.findModuleClientArea()
                         .findAndShowContainer(containerUUID)
                         .findGrid()
                         .wrapElements()
                         .within(()=>{
                            cy.get(`.item-field_${columnClass} input`)
                              .clear({force:true})

                            cy.get(`.item-field_${columnClass} input`)
                              .click({force:true})
                              .type(searchValue)
                              .type('{enter}')
                         })
              } else {
                console.log("----> Clicking on column filter icon and searching <----");
                this.waitForLoaderToDisappear()
                cy.wait(1000);
                _mainView.findModuleClientArea()
                         .findAndShowContainer(containerUUID)
                         .wrapElements()
                         .find(`button[class*='${btn.ToolBar.ICO_SEARCH_COLUMN}']`)
                         .click()
                _mainView.findModuleClientArea()
                         .findAndShowContainer(containerUUID)
                         .findGrid()
                         .wrapElements()
                         .within(()=>{
                            cy.get(`.item-field_${columnClass} input`)
                              .clear({force:true})
                            cy.get(`.item-field_${columnClass} input`)
                              .click({force:true})
                              .type(searchValue)
                              .type('{enter}')
                         }) 
              }
            });
  }

  edit_inTextAreaOfContainer(containerUUID:string,inputText:string){
     _mainView.findModuleClientArea()
              .findAndShowContainer(containerUUID)
              .findTextAreaInModal(app.InputFields.K_CONTENT_FRAME)
              .type(inputText)
  }

  toggle_radioFiledInContainer(checkBoxStatus:string, containerUUID: string, gridCell: string) {
    switch (checkBoxStatus) {
      case "selectRadioButton":
         _mainView.findModuleClientArea()
                  .findAndShowContainer(containerUUID)
                  .findGrid()
                  .findActiveRow()
                  .getCell(gridCell)
                  .wrapElements()
                  .then(($ele) => {
                    if ($ele.find("[checked='checked']").length > 0) {
                      cy.log("radio button is already selected");
                    } else {
                      _mainView.findModuleClientArea()
                               .findAndShowContainer(containerUUID)
                               .findGrid()
                               .findActiveRow()
                               .findCell(gridCell);
                    }
                  });
        break;
      case "deSelectRadioButton":
         _mainView.findModuleClientArea()
                  .findAndShowContainer(containerUUID)
                  .findGrid()
                  .findActiveRow()
                  .getCell(gridCell)
                  .wrapElements()
                  .then(($ele) => {
                    if ($ele.find("[checked='checked']").length < 1) {
                      cy.log("radio button is already not selected");
                    } else {
                      _mainView.findModuleClientArea()
                               .findAndShowContainer(containerUUID)
                               .findGrid()
                               .findActiveRow()
                               .findCell(gridCell);
                    }
                  });
        break;
      default:
        cy.log("Search type not supported");
    }
  }

  getDate(type:string,numberOfDays?:number,dateFetched?:string){
    if (type=== "year") {
      let date = new Date();
      let year=date.getFullYear()
      let fullYear=year
      return fullYear
    }
    if(type=== "current"){
      let date = new Date();
      let year=date.getFullYear()
      let month:any=(date.getMonth()+1)
      let dates:any=date.getDate()
      if(dates<10){
        dates='0'+date.getDate()
      }
      if(month<10){
        month='0'+(date.getMonth()+1)
      }
      let currentFullDate=dates+'/'+month+'/'+year
      
      return currentFullDate
    }   
    if(type=== "incremented"){
      let date = new Date();
      date.setDate(date.getDate()+numberOfDays);
      let year=date.getFullYear()
      let month:any=(date.getMonth()+1)
      let dates:any=date.getDate()
      if(dates<10){
        dates='0'+date.getDate()
      }
      if(month<10){
        month='0'+(date.getMonth()+1)
      }
      let incFullDate=dates+'/'+month+'/'+year
      
      return incFullDate
    } 
    
    if(type==="fetchedDateIncrement"){
      var datearray = dateFetched.split("/");
      var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
      let date = new Date(newdate); 
      date.setDate(date.getDate() + numberOfDays);
      let year=date.getFullYear()
      let month:any=(date.getMonth()+1)
      let dates:any=date.getDate()
      if(dates<10){
        dates='0'+date.getDate()
      }
      if(month<10){
        month='0'+(date.getMonth()+1)
      }
      let incFullDate=dates+'/'+month+'/'+year
      
      return incFullDate
    }
    if(type==="fetchedDateDecrement"){
      var datearray = dateFetched.split("/");
      var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
      let date = new Date(newdate); 
      date.setDate(date.getDate() - numberOfDays);
      let year=date.getFullYear()
      let month:any=(date.getMonth()+1)
      let dates:any=date.getDate()
      if(dates<10){
        dates='0'+date.getDate()
      }
      if(month<10){
        month='0'+(date.getMonth()+1)
      }
      let incFullDate=dates+'/'+month+'/'+year
      
      return incFullDate
    }
    if(type==="extraDayBetweenDates")
    {
      let startdate:any = new Date();
      let endDate:any = new Date();
      endDate.setDate(endDate.getDate()+numberOfDays); 
      let differenceTime:any =Math.abs(endDate-startdate)
      let differenceDay:any=Math.floor(differenceTime/(1000 * 60 * 60 * 24))
      let a:any=Math.floor(differenceDay/7)
      let b:any=a*7
      let c:any=differenceDay-b;
      return c;
    }
    if(type==="DayBetweenDates")
    {
      let startdate:any = new Date();
      let endDate:any = new Date();
      endDate.setDate(endDate.getDate()+numberOfDays); 
      let differenceTime:any =Math.abs(endDate-startdate)
      let differenceDay:any=Math.floor(differenceTime/(1000 * 60 * 60 * 24))
      let c:any=differenceDay;
      return c;
    }

  }

 
  search_dataInNumberRangeContainer(containerUUID: string, searchValue: string, containerPosition?: number) {
    cy.wait(1000)
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .toolbar(app.Layouts.SUB_VIEW_CONTENT)
             .findButton(btn.ToolBar.ICO_SEARCH_ALL)
             .assertClass("active")
             .then((searchField) => {
                if (searchField) {
                  console.log("----> Search field is present and direct searching <----");
                  _mainView.findModuleClientArea()
                           .findAndShowContainer(containerUUID)
                           .findGrid()
                           .findTextInput(app.InputFields.FILTER_INPUT)
                           .type(`{selectAll}{backspace}${searchValue}`);
                } else {
                  cy.wait(1000)
                  console.log("----> Clicking on search icon and searching <----");
                  _mainView.findModuleClientArea()
                           .findAndShowContainer(containerUUID, containerPosition)
                           .toolbar(app.Layouts.SUB_VIEW_CONTENT)
                           .findButton(btn.ToolBar.ICO_SEARCH_ALL)
                           .clickIn()
                  _mainView.findModuleClientArea()
                           .findAndShowContainer(containerUUID)
                           .findGrid()
                           .findTextInput(app.InputFields.FILTER_INPUT)
                           .type(`{selectAll}{backspace}${searchValue}`);
                }
             });             
  }

  create_newRecord_forNumberRange(containerUUID: string, containerPosition?: number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .toolbar(app.Layouts.SUB_VIEW_CONTENT)
             .findButton(btn.ToolBar.ICO_REC_NEW)
             .clickIn();
    this.waitForLoaderToDisappear()
  }

  //! Modal related common methods

  select_dataFromLookups_fromModal(container_UUID:string,cellClass:string,searchValue:string,inputTextClass:string){
    _common.waitForLoaderToDisappear()
     _mainView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .findGrid()
              .findActiveRow()
              .findCell(cellClass)
              .findInputLookup(app.InputFields.ICO_INPUT_LOOKUP,0)
    cy.wait(2000)//  Added this wait as data take time to load
    _common.waitForLoaderToDisappear()
    _modalView.findModal()
              .acceptButton(btn.ButtonText.REFRESH)
    _common.waitForLoaderToDisappear()
    _modalView.findModal()
              .findTextInput(inputTextClass)
              .first()
              .clear()
              .type(searchValue)
    _modalView.findModal()
              .findButton(btn.IconButtons.ICO_SEARCH)
              .wrapElements()
              .first()
              .click()
    _modalView.findModal()
              .wrapElements()
              .find(`[class*='${app.SubContainerLayout.COLUMN_ID}']`)
              .contains(searchValue)
              .click()
    _modalView.findModal()
              .acceptButton(btn.ButtonText.OK) 
    _common.waitForLoaderToDisappear()
  }
  
  clickOn_modalFooterButton(buttonLabel:string){
    _modalView.findModal()
              .acceptButton(buttonLabel)
  }

  
  clickOn_modalFooterButton_ifExists(buttonLabel: string) {
    cy.wait(1000)
    cy.get("body")
      .then(($body) => {
          if ($body.find(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS}`).length > 0) {
            _modalView.acceptButton(buttonLabel)
          }
      });
  }

  select_multipleRow_fromModal() {
      _modalView.findModal()
                .findMultipleCell(app.SubContainerLayout.INDICATOR);
  }

  clickOn_multipleCellHasICON(containerUUID: string, cellClass: string, iconClass: string,recordType?:string) {
    _mainView.findModuleClientArea()
    .findAndShowContainer(containerUUID)
    .findGrid()
    .getCell(cellClass,recordType)
    .wrapElements()
    .get(`i.${iconClass}`).as("boq_Icon")
    cy.get('@boq_Icon').then(els => {
      cy.wrap(els).click({ multiple: true, ctrlKey: true })
    })
}

  clickOn_cellHasValue_fromModal(gridCell: string, data: string) {
      _modalView.findModal()
                .findModalBody()
                .findCellhasValue(gridCell, data)
                .scrollIntoView()
                .click({ force: true });
  }
  
  clickOn_cellHasValueWithIndex_fromModal(cellClass: string, value: string,index) {
    _modalView.findModal()
              .getCell(cellClass)
              .wrapElements()
              .contains(value)
              .eq(index)
              .click({force: true });
  }

  select_ItemFromPopUpList(popupType: string, value: string) {
    _modalView.select_popupItem(popupType, value)
  }

  editModalDropdown_WithCaret(label:string) {
    _modalView.findModal()
              .findCaretInsideModal(label)
  }

  edit_dropDownWithInput_fromModal(label:string,value:string,popUpType:string) {
    _modalView.findModal()
              .wrapElements()
              .find(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`)
              .contains(label)
              .closest(`${commonLocators.CommonElements.ROW}`)
              .within(()=>{
                  cy.get(`${commonLocators.CommonElements.PLATFORM_FORM_COL}`)
                    .within(()=>{
                      cy.get(`[class*='${app.InputFields.INPUT_GROUP_CONTENT}']`)
                        .first()
                        .type(`{selectall}{backspace}${value}`)
                        .then(()=>{
                          cy.document()
                            .its('body')
                            .find(".popup-container")
                            .within(()=>{
                              switch (popUpType) {
                                case "list".toLowerCase():
                                  cy.contains("li",value).click({ force: true });
                                  break;
                                case "grid":
                                  cy.get("div.popup-content").within(() => {
                                  cy.wait(1000)
                                  cy.get(`div[class*='${app.SubContainerLayout.COLUMN_ID}']`).each(($cell) => {
                                    const cellField: string = $cell.text();
                                    if (value === cellField) {
                                    cy.wait(1000);
                                    cy.wrap($cell).click({ force: true });
                                    cy.wait(1000);
                                    return false;
                                    }
                                  });
                                  });
                                  break;
                                case "grid1".toLowerCase():
                                  cy.contains("button", value).click({ force: true });
                                  break;
                                case "span".toLowerCase():
                                  cy.contains("span", value).click({ force: true });
                                  break;
                                case "listexact".toLowerCase():
                                  cy.contains("li", new RegExp("^" + value + "$", "g")).click({ force: true });
                                  break;
                                default:
                                  cy.log("Search type not supported");
                              }
                            }) 
                        })
                    })
              })
  }
  edit_dropDownWithCaret_fromModal(label:string,value:string,popUpType:string) {
    _modalView.findModal()
              .wrapElements()
              .find(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`)
              .contains(label)
              .closest(`${commonLocators.CommonElements.ROW}`)
              .within(()=>{
                  cy.get(`${commonLocators.CommonElements.PLATFORM_FORM_COL}`)
                    .within(()=>{
                      cy.get(`[class*='${commonLocators.CommonElements.CARET_MODAL}']`)
                        .first()
                        .click()
                        .then(()=>{
                          cy.document()
                            .its('body')
                            .find(".popup-container")
                            .within(()=>{
                              switch (popUpType) {
                                case "list".toLowerCase():
                                  cy.contains("li",value).click({ force: true });
                                  break;
                                case "grid":
                                  cy.get("div.popup-content").within(() => {
                                  cy.wait(1000)
                                  cy.get(`div[class*='${app.SubContainerLayout.COLUMN_ID}']`).each(($cell) => {
                                    const cellField: string = $cell.text();
                                    if (value === cellField) {
                                    cy.wait(1000);
                                    cy.wrap($cell).click({ force: true });
                                    cy.wait(1000);
                                    return false;
                                    }
                                  });
                                  });
                                  break;
                                case "grid1".toLowerCase():
                                  cy.contains("button", value).click({ force: true });
                                  break;
                                case "span".toLowerCase():
                                  cy.contains("span", value).click({ force: true });
                                  break;
                                case "listexact".toLowerCase():
                                  cy.contains("li", new RegExp("^" + value + "$", "g")).click({ force: true });
                                  break;
                                default:
                                  cy.log("Search type not supported");
                              }
                            }) 
                        })
                    })
              })
  }

 enterRecord_inActiveRow_fromModal(gridCellClass: string, inputFieldClass: string, inputData: string, recordType?: string) {
    _modalView.findModal()
              .findActiveRow()
              .findCell(gridCellClass, recordType)
              .findTextInput(inputFieldClass)
              .clear({force:true})
              .type(inputData);
  }

  
  
  select_rowHasValue_fromModal(cellValue: string, bodyIndex?: number) {
      _modalView.findModal()
                .findModalBody()
                .wrapElements()
                .within(() => {
                  if (bodyIndex!) {
                    cy.get(commonLocators.CommonElements.GRID_CONTAINER)
                      .eq(bodyIndex)
                    cy.contains(`[class*='${app.SubContainerLayout.COLUMN_ID}']`, cellValue)
                      .then(($cell) => {
                        if ($cell) {
                          cy.wrap($cell)
                            .click({ force: true });
                          cy.wait(1000);
                          cy.get(`.${app.SubContainerLayout.ACTIVE} div.${app.SubContainerLayout.COLUMN_ID}_${app.SubContainerLayout.INDICATOR}`)
                            .click();
                        }
                        else {
                          cy.get(commonLocators.CommonElements.GRID_CONTAINER)
                          cy.contains(`[class*='${app.SubContainerLayout.COLUMN_ID}']`, cellValue)
                            .then(($cell) => {
                              if ($cell) {
                                cy.wrap($cell)
                                  .click({ force: true });
                                cy.wait(1000);
                                cy.get(`.${app.SubContainerLayout.ACTIVE} div.${app.SubContainerLayout.COLUMN_ID}_${app.SubContainerLayout.INDICATOR}`)
                                  .click();
                              }
                          });
                        }
                    });
                  }

                });
  }

  set_cellCheckboxValue_fromModal(checkboxCell: string, checkBoxValue: string, recordType?: string) {
    _modalView.findModal()
              .findActiveRow()
              .getCell(checkboxCell, recordType)
              .wrapElements()
              .find(commonLocators.CommonElements.CHECKBOX_TYPE)
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
  }

  set_checkboxValueForAllRowCell_fromModal(checkboxCell: string, checkBoxValue: string, recordType?: string) {
    _modalView.findModal()
              .getCell(checkboxCell, recordType)
              .wrapElements()
              .find(commonLocators.CommonElements.CHECKBOX_TYPE)
              .as("check")
              .invoke("is", ":checked")
              .then((checked) => {
                 if (checkBoxValue == "check") {
                   if (!checked) {
                     cy.get("@check").check({force:true});
                   }
                 }
                 if (checkBoxValue == "uncheck") {
                   if (checked) {
                     cy.get("@check").uncheck({force:true});
                   }
                 }
             });
  }

  getText_fromCell_fromModal(cellClass: string, recordType?) {
    return _modalView.findModal()
                     .findActiveRow()
                     .getCell(cellClass,recordType)
                     .wrapElements();
  }
  
  findRadio_byLabel_fromModal(labelName: string, inputClass: string, index: number, radioClass: string){
    _modalView.findModal()
              .findRadio_byLabel_InModal(labelName,inputClass,index,radioClass);

  }

  changeStatus_ofMultipleRecord_fromModal(option: string) {
    _modalView.findModal()
              .containsValue(option)
              .click()
    _modalView.findModal()
              .acceptButton("Next");
    cy.wait(2000)//Required wait
    _modalView.findModal()
              .acceptButton(btn.ButtonText.CLOSE);
  }

  changeStatus_fromModal(option: string, remark?:string) {
    _modalView.findModal()
              .containsValue(option)
              .click()
              .then(()=>{
                if(remark){
                  _modalView.findModal()
                            .findModalBody()
                            .findTextAreaInModal(app.InputFields.DOMAIN_TYPE_REMARK)
                            .type(remark)
                }
                cy.wait(2000)
                _modalView.findModal()
                          .acceptButton("OK");
              })
  }

  clickOn_checkboxByLabel_fromModal(rowInputClass:string,labelName:string,index:number){
    _modalView.findModal()
              .findCheckbox_byLabelnModal(rowInputClass,labelName,index)
  }

  select_cellHasValueWithIndexBySearch_fromModal(modalLabel:string,searchValue:string,popUpGridCell:string){
    _modalView.findModal()
              .searchInModal_byDataNG_Selector(modalLabel,searchValue)
    cy.wait(1000)
    _modalView.findModal()
              .searchOption()
              .clickIn()
    cy.wait(1000)
    _common.clickOn_cellHasValueWithIndex_fromModal(popUpGridCell,searchValue,0)
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
  }

  findCaret_withDynamicInputClass_fromModal(inputClass:string, labelName:string) {
    this.element = this.element.concat(`[class*='modal-dialog'] ${inputClass}`);
    cy.wait(2000);
    const div = cy.get(this.element)
                  .contains(this.element, labelName)
                  .then((ele) => {
                    cy.wrap(ele)
                      .find(`.caret`)
                      .eq(0)
                      .should("be.visible")
                      .click();
                  });
    this.element = "";
    return div;  
  }

  clickOn_modalButtonByClass(btnClass:string){
    _modalView.findModal()
              .findModalBody()
              .findButton(btnClass)
              .clickIn()
  }

  handledErrorPopUp_IfExist(){
    _modalView.findModal()
              .wrapElements()
              .then(($err)=>{
                if($err.find(`[class*='icon tlb-icons ico-error']`).length > 0){
                  _common.clickOn_modalFooterButton(btn.ButtonText.OK)
                }else{
                  cy.log("No error PopUp Exist")
                }
              })
  }

  selectValue_fromModal(value: string) {
    _modalView.findModalBody()
              .wrapElements()
              .contains(value)
              .eq(0)
              .click({force: true })
  }

  goToModule_inActiveRow(containerUUID: string, gridCell: string, modulename:string,recordType?: string) {
    cy.wait(500)
      .then(()=>{
        _mainView.findModuleClientArea()
                  .findAndShowContainer(containerUUID)
                  .findGrid()
                  .findActiveRow()
                  .getCell(gridCell, recordType)
                  .wrapElements()
                  .rightclick({ force: true });
      })
     cy.get(".popup-content")
       .first()
       .within(() => {
         cy.get("button.ico-goto").click({ force: true });
       });
       cy.wait(1000)
    cy.get(".popup-content")
      .last()
      .within(() => {
        cy.get("button.app-small-icons").contains(modulename).click({ force: true });
      });
    cy.wait(2000);
  }
  goToModule_inPopUpActiveRow(gridCell: string) {
    cy.get(".popup-container").within(() => {
      _mainView
       .findGrid()
       .findActiveRow()
       .getCell(gridCell)
       .wrapElements()
       .rightclick({ force: true });
     })
     cy.get(".popup-content")
       .first()
       .within(() => {
         cy.get("button.ico-goto").click({ force: true });
       });
    cy.wait(2000);
  }



  set_columnAtTop(columnName:string[],container_UUID:string){
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    cy.get(`[class*='${container_UUID}'] `+commonLocators.CommonContainerElements.MAXIMIZE)
      .click();
    cy.get(`[class*='${container_UUID}'] `+commonLocators.CommonElements.ICON_SETTING)
      .click();
    cy.get(commonLocators.CommonElements.GRID_LAYOUT)
      .click();
    for (let index = 0; index < columnName.length; index++) {
      const colName = columnName[index];
      cy.get(commonLocators.CommonElements.GRID_CONFIGURATOR_ID+" "+commonLocators.CommonElements.SEARCH_TERM_INPUT)
        .clear()
        .type(colName)
      cy.wait(2000)
      cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS+" "+commonLocators.CommonElements.GRID_CONFIGURATOR_ID+" ."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.FIELD_NAME)
        .each(($el, nameIndex, $list) => {
            const ActVal = $el.text();
            cy.log(ActVal);
            if (ActVal == colName) {
              cy.wait(2000)
              cy.wrap($el).click();
            }
        });
      cy.wait(1000)
      cy.get(commonLocators.CommonElements.GRID_CONFIGURATOR_ID+" "+commonLocators.CommonElements.SEARCH_TERM_INPUT)
        .clear()
      cy.wait(1000)
      cy.get("[class*='"+btn.GridButtons.ICO_GRID_ROW_START+"']")
        .click({force:true})
      cy.wait(1000)
    }
    cy.wait(2000)
    _modalView.findModal()
              .acceptButton(btn.ButtonText.OK)
    cy.wait(2000)
    cy.get(`[class*='${container_UUID}'] `+commonLocators.CommonContainerElements.MINIMIZE)
      .click();
  }

  inputField_fromModal(rowClass:string,labelName: string,Index:number,inputClass: string): Cypress.Chainable<any> {
    this.element = this.element.concat(`[class*='modal-dialog'] ${rowClass}`);
    cy.wait(2000);
    const div = cy.get(this.element)
                 .contains(this.element, labelName).eq(Index)
                 .then((ele) => {
                  cy.wrap(ele).find(`[class^='${inputClass}']`).eq(0).should("be.visible");
                 });
    this.element = "";
    return div;
  }

  //! Assertions related common method

  assert_forNumericValues(containerUUID: string, gridCellClass: string, expectedValue: string,recordType?:string) {
    _mainView.findModuleClientArea()
            .findAndShowContainer(containerUUID)
            .findGrid()
            .wrapElements()
            .within(() => {
              if (recordType) {
                cy.get(`[class*='active'] [class*='${app.SubContainerLayout.COLUMN_ID}_${recordType}.${gridCellClass}']`).then(($el) => {
                  const ActVal = ($el.text()).replace(',','');
                  cy.log(ActVal);
                  expect(parseFloat(expectedValue.replace(',','')).toFixed(2)).to.equals(parseFloat(ActVal).toFixed(2));
                });
              } else {
                cy.get(`.${app.SubContainerLayout.ACTIVE} div.${app.SubContainerLayout.COLUMN_ID}_${gridCellClass}`).then(($el) => {
                  const ActVal = ($el.text()).replace(',','');
                  cy.log(ActVal);
                  expect(parseFloat(expectedValue.replace(',','')).toFixed(2)).to.equals(parseFloat(ActVal).toFixed(2));
  
                });
              }
            });
  }

  assert_cellData(containerUUID: string, gridCellClass: string, expectedValue: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .wrapElements()
             .within(() => {
              cy.get(`div.${app.SubContainerLayout.COLUMN_ID}_${gridCellClass}`)
                .first()
                .then(($el) => {
                  const ActVal = $el.text();
                  cy.log(ActVal);
                  expect(expectedValue).to.equals(ActVal.trim());
                });
             });
  }

  assert_cellData_insideActiveRow(containerUUID: string, gridCellClass: string, expectedValue: string,recordType?:string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .wrapElements()
             .within(() => {
               if (recordType) {
                 cy.get(`[class*='active'] [class*='${app.SubContainerLayout.COLUMN_ID}_${recordType}.${gridCellClass}']`).then(($el) => {
                   const ActVal = $el.text();
                   cy.log(ActVal);
                   expect(expectedValue).to.equals(ActVal.trim());
                 });
               } else{
                 cy.get(`.${app.SubContainerLayout.ACTIVE} div.${app.SubContainerLayout.COLUMN_ID}_${gridCellClass}`).then(($el) => {
                   const ActVal = $el.text();
                   cy.log(ActVal);
                   expect(expectedValue).to.equals(ActVal.trim());
                 });
               }
              
     });
  }

  assert_forNumericValues_notEqualCondition(containerUUID: string, gridCellClass: string, expectedValue: string,recordType?:string) {
    _mainView.findModuleClientArea()
            .findAndShowContainer(containerUUID)
            .findGrid()
            .wrapElements()
            .within(() => {
              if (recordType) {
                cy.get(`[class*='active'] [class*='${app.SubContainerLayout.COLUMN_ID}_${recordType}.${gridCellClass}']`).then(($el) => {
                  const ActVal = ($el.text()).replace(',','');
                  cy.log(ActVal);
                  expect(parseFloat(expectedValue.replace(',','')).toFixed(2)).to.not.equals(parseFloat(ActVal).toFixed(2));
                });
              } else {
                cy.get(`.${app.SubContainerLayout.ACTIVE} div.${app.SubContainerLayout.COLUMN_ID}_${gridCellClass}`).then(($el) => {
                  const ActVal = ($el.text()).replace(',','');
                  cy.log(ActVal);
                  expect(parseFloat(expectedValue.replace(',','')).toFixed(2)).to.not.equals(parseFloat(ActVal).toFixed(2));
  
                });
              }
            });
  }

  assert_cellData_whereRecordIsNotEqual(containerUUID: string, gridCellClass: string, actualValue: string, recordType?: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .wrapElements()
             .within(() => {
                if (recordType) {
                  cy.get(`[class*='active'] [class*='${app.SubContainerLayout.COLUMN_ID}_${recordType}.${gridCellClass}']`)
                    .each(($el, index, $list) => {
                      const ActVal = $el.text();
                      cy.log(ActVal);
                      expect(ActVal).to.not.equals(actualValue);
                    });
                } else {
                  cy.get(`[class*='active'] div.${app.SubContainerLayout.COLUMN_ID}_${gridCellClass} `)
                    .each(($el, index, $list) => {
                      const ActVal = $el.text();
                      cy.log(ActVal);
                      expect(ActVal).to.not.equals(actualValue);
                    });
                }
             });
  }

  assert_getText_fromContainerForm(containerUUID: string, labelName: string, expectedValue: string) {
    _mainView.getTextFromContainerFormByLabel(containerUUID, labelName);
    cy.wait(500)
      .then(() => {
        expect(Cypress.env("getTextInContainerForm")).to.contain(expectedValue);
      });
  }

  assert_cellDataByContent_inContainer(containerUUID: string, gridCellClass: string, expectedValue: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .wrapElements()
             .within(() => {
                cy.get(`div.${app.SubContainerLayout.COLUMN_ID}_${gridCellClass}`)
                  .eq(0)
                  .then(($el) => {
                    const ActVal = $el.text();
                    cy.log(ActVal);
                    expect(ActVal).to.contain(expectedValue);
                  });
             });
  }

  assert_activeRow_cellDataByContent_inContainer(containerUUID: string, gridCellClass: string, expectedValue: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .wrapElements()
             .within(() => {
                cy.get(`[class*='active'] div.${app.SubContainerLayout.COLUMN_ID}_${gridCellClass}`)
                  .eq(0)
                  .then(($el) => {
                    const ActVal = $el.text();
                    cy.log(ActVal);
                    expect(ActVal).to.contain(expectedValue);
                  });
             });
  }
 
  assert_cellDataByContent_fromModal(gridCellClass: string, expectedValue: string) {
    _modalView.findModal()
              .findActiveRow()
              .getCell(gridCellClass)
              .wrapElements()
              .then(($el) => {
                  const ActVal = $el.text();
                  cy.log(ActVal);
                  expect(ActVal).to.contain(expectedValue);
              });
  }

  assert_forNumericValues_fromModal(gridCellClass: string, expectedValue: string) {
    _modalView.findModal()
              .wrapElements()
              .within(() => {
                cy.get(`.${app.SubContainerLayout.ACTIVE} div.${app.SubContainerLayout.COLUMN_ID}_${gridCellClass}`).then(($el) => {
                  const ActVal = ($el.text()).replace(',','');
                  cy.log(ActVal);
                  var ActVAlue = parseInt(ActVal).toFixed(0)
                  expect(expectedValue).to.equals(ActVAlue);
                });
              });
  }

  getText_fromPopUpContent_fromCaret(containerUUID: string,cellType:string,envVariableName:string, containerPosition?, recordType?) {
    var Column_Data:string[]=[];

    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID, containerPosition)
             .findGrid()
             .findActiveRow()
             .findCell(cellType, recordType)
             .caret()
    cy.get(`${commonLocators.CommonElements.POPUP_CONTAINER}`)
      .within(() => {
          cy.get(`${commonLocators.CommonElements.LOOKUP_ITEM}`).each($lookUpItem=>{
            $lookUpItem.text()
            var data  = $lookUpItem.text()
            Column_Data.push(data)
            cy.log("columData " + Column_Data)
            Cypress.env(envVariableName,Column_Data)
          })
      })
  }

  verify_activeRow_fromModal(gridCell:string,expectedValue:string){
    _modalView.findModal()
              .findActiveRow()
              .getCell(gridCell)
              .wrapElements()
              .eq(0)
              .then(($ele) => {
                var ccQuantity = $ele.text()
                cy.log(ccQuantity)
                Cypress.env("GetTextValueFromPopUp", ccQuantity)
                expect(ccQuantity).to.contain(expectedValue)
              })
  }

  getText_fromCell_storeInArray(containerUUID:string,gridCells:string,envVariableName:string){
    _mainView.findModuleClientArea()
              .findAndShowContainer(containerUUID)
              .findGrid()
              .getCell(app.SubContainerLayout.INDICATOR)
              .wrapElements()         
              .then(($ele)=>{
                var NumberOfRows =  $ele.length
                var Column_Data:string[]=[];
                for(var i = 0;i<=NumberOfRows-1;i++){
                  cy.get(`[class*='cid_${containerUUID}'] div.${app.SubContainerLayout.COLUMN_ID}_${app.SubContainerLayout.INDICATOR}`).eq(i).click()
                  _mainView.findModuleClientArea()
                          .findAndShowContainer(containerUUID)
                          .findGrid()
                          .findActiveRow()
                          .getCell(gridCells)
                          .wrapElements()
                          .then($value => {  
                              $value.text()
                              var data  = $value.text()
                              Column_Data.push(data)
                              var Column_Data1 = Column_Data.toString()
                              cy.log("columData " + Column_Data1)
                              Cypress.env(envVariableName,Column_Data1)
                          })                                              
                }
              })
  }

  getText_storeIntoArray(containerUUID:string,cellClass:string,arrEnvName:string,recordType?: string){
    const Arr: string[] = [];
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .findGrid()
             .getCell(cellClass,recordType)
             .wrapElements()
             .each((record) => {
               const description: string = record.text();
               Arr.push(description)
             })
             .then(()=>{
               Cypress.env(arrEnvName, Arr);
               Arr.forEach((description, index) => {
                cy.log(`Description[${index}]: ${description}`);
              });
             })
  }

  verify_cellHasValue_fromModal(cellClass: string, value: string) {
    _modalView.findModal()
              .getCell(cellClass)
              .wrapElements()
              .should("include.text",value)      
  }

  Verify_cellNotIncludeText_fromModal(cellClass: string, text:any) {
    _modalView.findModalBody()
              .findActiveRow()
              .getCell(cellClass)
              .wrapElements()
              .should("not.include.text",text)
  }

  assert_labelValues_fromModalWithPanelGroup(labelName: string,inputClass:string ,panelGroup:string,expectedValue: string) {
    _modalView.findModal()
              .wrapElements()
              .get(commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT)   
              .contains(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS+ " " +commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT,panelGroup)
              .closest(commonLocators.CommonElements.PANEL_GROUP)
              .within(($val)=>{
                  cy.wrap($val)
                    .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,labelName)
                    .closest(commonLocators.CommonElements.ROW)
                    .within((ele) => {
                      cy.wrap(ele).find(`[class*='${inputClass}']`).invoke('val')
                        .then(val =>{
                            var actualValue=val
                            expect(actualValue).to.equal(expectedValue)
                        })
                    })
              })
  }

  assert_labelValues_fromModal(genericRowClass:string,labelName: string,inputClass:string,expectedValue: string) {
    _modalView.findModalBody()
              .wrapElements()
              .within((ele) => {
               cy.wrap(ele)
                 .get(genericRowClass)
                 .contains(genericRowClass, labelName)
                 .then((ele) => {
                  cy.wrap(ele)
                    .find("[class*='"+inputClass+"']")
                    .eq(0)
                    .invoke("val")
                    .then(val =>{
                      var actualValue=val 
                      expect(actualValue).to.equals(expectedValue)
                    })   
                  });
              })  
  }

  getText_ofCartField(containerUUID:string,rowClass:string,inputField:string,index:number,envVariableNumber?){
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerUUID)
             .wrapElements()
             .find("[class*='"+rowClass+"'] [class*='"+inputField+"']")
             .eq(index)
             .then(($Value)=>{
             let ValueNumber= $Value.text()
             Cypress.env(envVariableNumber,parseFloat(ValueNumber))        
             Cypress.env("stringVariable",ValueNumber)        
 })
  }

  getText_ofCartFieldWithInvoke(containerUUID:string,rowClass:string,inputField:string,index:number,envVariableNumber?){
   _mainView.findModuleClientArea()
            .findAndShowContainer(containerUUID)
            .wrapElements()
            .find("[class*='"+rowClass+"'] [class*='"+inputField+"']")
            .eq(index)
            .invoke("val")
            .then((valueNumber) => {
            cy.log(typeof(valueNumber))
            Cypress.env(envVariableNumber,valueNumber)        
            Cypress.env("stringVariable",valueNumber)        
})
  }

  getText_CellData_fromModal(genericRowClass:string,labelName: string,inputClass:string,envName: string) {
    _modalView.findModalBody()
              .wrapElements()
              .within((ele) => {
                cy.wrap(ele).get(genericRowClass)
                  .contains(genericRowClass, labelName)
                  .then((ele) => {
                    cy.wrap(ele)
                      .find("[class*='"+inputClass+"']")
                      .eq(0)
                      .invoke("val")
                      .then(val =>{
                        Cypress.env(envName,val) 
                      })   
                  });
              })  
  }

  verify_gridCellHasNoText(containerUUID: string, gridCell:string) {
    _mainView.findModuleClientArea()
                  .findAndShowContainer(containerUUID)
                  .getCell(gridCell)
                  .wrapElements()
                  .should('not.contain', 'text')                
  }

  perform_additionOfCellData(UUID1: string, cellClass: string) {
		let sum = 0;
		   _mainView.findModuleClientArea()
                .findAndShowContainer(UUID1)
                .getCell(cellClass)
                .wrapElements()
                .each(($cell) => {
                    const value = $cell.text().replace(/,/g, '').trim();
                    const numericValue = parseFloat(value);
                    sum += numericValue;
                    Cypress.env("AdditionOfColumnValues",sum)
                });
  }

  // NA
  getTextfromCell_with_Header_inRecord(uuid: string, gridCells_1, recordType?: string, gridCells_2?, gridcelss_3?) {
    if (gridCells_1 && recordType != null) {
      _mainView
        .findModuleClientArea()
        .findAndShowContainer(uuid)
        .findGrid()
        .findActiveRow()
        .getCell(gridCells_1, recordType)
        .wrapElements()
        .then(($ele1) => {
          cy.log($ele1.text());
          Cypress.env("Text", $ele1.text());
        });
    }
    cy.wait(2000).then(() => {
      if (gridCells_2 != null) {
        _mainView
          .findModuleClientArea()
          .findAndShowContainer(uuid)
          .findGrid()
          .findActiveRow()
          .getCell(gridCells_2)
          .wrapElements()
          .then(($ele2) => {
            cy.log($ele2.text());
            Cypress.env("gridcell_2_Text", $ele2.text());
          });
      }
      if (gridcelss_3 != null) {
        _mainView
          .findModuleClientArea()
          .findAndShowContainer(uuid)
          .findGrid()
          .findActiveRow()
          .getCell(gridcelss_3)
          .wrapElements()
          .then(($ele1) => {
            cy.log($ele1.text());
            Cypress.env("gridcelss_3_text", $ele1.text());
          });
      }
    });
  }

  getTextfromCell(uuid: string, gridCells_1, gridCells_2?, gridcelss_3?) {
    if (gridCells_1 != null) {
      _mainView
        .findModuleClientArea()
        .findAndShowContainer(uuid)
        .findGrid()
        .findActiveRow()
        .getCell(gridCells_1)
        .wrapElements()
        .then(($ele1) => {
          cy.log($ele1.text());
          Cypress.env("Text", $ele1.text());
        });
    }
    cy.wait(2000).then(() => {
      if (gridCells_2!= null) {
        _mainView
          .findModuleClientArea()
          .findAndShowContainer(uuid)
          .findGrid()
          .findActiveRow()
          .getCell(gridCells_2)
          .wrapElements()
          .then(($ele2) => {
            cy.log($ele2.text());

            Cypress.env("gridcell_2_Text", $ele2.text());
          });
      }
      cy.wait(2000).then(() => {
      if (gridcelss_3 != null) {
        _mainView
          .findModuleClientArea()
          .findAndShowContainer(uuid)
          .findGrid()
          .findActiveRow()
          .getCell(gridcelss_3)
          .wrapElements()
          .then(($ele1) => {
            cy.log($ele1.text());
            Cypress.env("gridcell_3_Text", $ele1.text());
          });
      }
    })
    });
  }
  set_checkBoxValue_basedOnString(uuid: string, gridCellClass: string, checkboxGridCellClass:string, data:any){
    Object.keys(data).forEach(function (key) {
      _mainView.findModuleClientArea()
               .findAndShowContainer(uuid)
               .findGrid()
               .findCellhasValue(gridCellClass,key)
               .click()
      _mainView.findModuleClientArea()
               .findAndShowContainer(uuid)
               .findGrid()
               .findActiveRow()
               .getCell(checkboxGridCellClass)
               .wrapElements()
               .find(commonLocators.CommonElements.CHECKBOX_TYPE)
               .as("checkbox")
               .invoke("is", ":checked")
               .then((checked) => {
                  if (data[key] == "check") {
                    if (!checked) {
                      cy.get("@checkbox").check();
                    }
                  } else if (data[key] == "uncheck") {
                    if (checked) {
                      cy.get("@checkbox").uncheck();
                    }
                  }
                });
               });
   }

  clearOrType_inPlainTextArea_inContainer(container_UUID: string, value?: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .wrapElements()
             .within(() => {
              cy.get(CommonLocators.CommonElements.PLS_IN_TEXT_AREA).clear({ force: true })
              if (value != null) {
                cy.get(CommonLocators.CommonElements.PLS_IN_TEXT_AREA).clear({ force: true }).type(value, { force: true })
              }
             })
  }

  addRecord_inSubContainer_ifNotExist(container_UUID,index) {
    _mainView
      .findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findGrid()
      .wrapElements()
      .find("[class*='grid-canvas grid-canvas-top grid-canvas-left']").eq(index)
      .then(($ele) => {
        if ($ele.find("[class*='ui-widget-content']").length > 0) {
        } else {
          _common.create_newRecord(container_UUID);
        }
      });
  }
      /*
   * This is used to select_dropdownCellWithInput_basedOnIndex_forDiv
   * Updated Date: 2/15/2024
   * Author : Anupama G
  */

      select_dropdownCellWithInput_basedOnIndex_forDiv(containerUUID: string, cellType: string, indexValue: number, cellInputType: string, value: string, recordType?: string, containerPosition?: number) {
        _mainView.findModuleClientArea()
                 .findAndShowContainer(containerUUID, containerPosition)
                 .findGrid()
                 .findActiveRow()
                 .findCell(cellType, recordType)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _mainView.findModuleClientArea()
                 .findAndShowContainer(containerUUID, containerPosition)
                 .findGrid()
                 .findActiveRow()
                 .findCell(cellType, recordType)
                 .findTextInput(cellInputType)
                 .clear({force:true})
                 .type(value)
                 .then(() => {
                    cy.wait(2000) // This wait is necessary
                 
                            cy.get("div.popup-content").within(() => {
                              cy.wait(1000);
                              cy.get(`div[class*='column-id']`).each(($cell, index) => {
                                if (index === indexValue) { // Index 1 corresponds to the second element (index is zero-based)
                                  cy.wait(1000);
                                  cy.wrap($cell).click({ force: true });
                                  cy.wait(2000);
                                  return false; // Stop the loop after clicking the second element
                                }
                                });
                  });
                })
            
      }  
 /*
   * This is used to wait for progress loads to 100 %
   * Updated Date: 01/03/2024
   * Author : Harshal Shinkar
  */
      waitForProgressBarToLoad(){
        cy.get('[class="progress-bar"] > span')
          .should('have.text',"100%",{ timeout: 10000, interval: 1000 });
      }

  edit_dropdownCellWithButton(container_UUID:string,cellClass:string,popUpType: string, value: string,){
    _common.waitForLoaderToDisappear()
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .findCell(cellClass)
             .findInputLookup(app.InputFields.ICO_DOWN,0)
           cy.wait(2000)//  Added this wait as data take time to load
    _mainView.select_popupItem(popUpType, value);
    
}

assert_forNumericValues_mathsAbs(containerUUID: string, gridCellClass: string, expectedValue: string,recordType?:string) {
  _mainView.findModuleClientArea()
          .findAndShowContainer(containerUUID)
          .findGrid()
          .wrapElements()
          .within(() => {
            if (recordType) {
              cy.get(`[class*='active'] [class*='${app.SubContainerLayout.COLUMN_ID}_${recordType}.${gridCellClass}']`).then(($el) => {
                const ActVal = ($el.text()).replace(',','');
                cy.log(ActVal);
                expect(parseFloat(expectedValue.replace(',','')).toFixed(2)).to.equals(Math.abs(parseFloat(ActVal)).toFixed(2));
              });
            } else {
              cy.get(`.${app.SubContainerLayout.ACTIVE} div.${app.SubContainerLayout.COLUMN_ID}_${gridCellClass}`).then(($el) => {
                const ActVal = ($el.text()).replace(',','');
                cy.log(ActVal);
                expect(parseFloat(expectedValue.replace(',','')).toFixed(2)).to.equals(Math.abs(parseFloat(ActVal)).toFixed(2));

              });
            }
          });
}
 /*
   * This is used to create caluclate the percentage
   * Date: 20/3/2024
   * Author : Anupama G
   */


 calculatePercentage_inContainer(container_UUID, value1, value2, cellClass) {

  return _mainView.findModuleClientArea()
                  .findAndShowContainer(container_UUID)
                  .findGrid()
                  .findActiveRow()
                  .getCell(cellClass)
                  .wrapElements().invoke('text').then((cellText) => {
                    // Remove any non-numeric characters from the text (if needed)
                    const cellValue = parseFloat(cellText.replace(/[^\d.]/g, ''));

                      // Calculate the expected value using calculatePercentage function
                      const percentage = value1; 
                      const number = value2; 
                      let expectedValue = calculatePercentage(percentage, number);
                      function calculatePercentage(percentage, number) {
                        return (percentage / 100) * number;
                      }
      
                        expectedValue = parseFloat(expectedValue.toFixed(2));
                        expect(cellValue).to.equal(expectedValue);
      });
  
    
}

}


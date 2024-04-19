import { app, btn, cnt, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _modalView, _mainView, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";


let actBidCode: string
let BidNetQuantiy: any
let Grandtotal: any
export class BidPage {
  createBidRecord_byWizardOption(description: string,businesspartner: string,structureType: string,BoQrecordCheckboxClass?:string) {
    const CODE = "1" + Cypress._.random(0, 999);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
           .search_fromSidebar("wizard", "Create Bid");
    cy.get("body").then(($body) => {
    if ($body.find('[class*="modal-dialog"] [class*="domain-type-code"][readonly="readOnly"]').length !=0) {
      _modalView.findModal()
                .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                .invoke("val")
                .then(function (codeVal: string) {
                  if (codeVal == "") {
                    _modalView.findModal()
                              .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                              .clear({ force: true })
                              .type(CODE, { force: true });
                    Cypress.env("BID-CODE",CODE) 
                  }
      });      
    }else{
      console.log("Code is generated automatically.")
    }
    });
    cy.wait(5000)
    _modalView.findModal()
              .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
              .clear({ force: true })
              .type(description, { force: true });
    _modalView.findModal()
              .findInputFieldInsideModal("Business Partner",app.InputFields.INPUT_GROUP_CONTENT)
              .clear({ force: true })
              .type(businesspartner);
    _modalView.findModal()
              .select_popupItem("grid", businesspartner);
    cy.wait(1000);
    _modalView.findModal()
              .acceptButton("Next");
    _modalView.findModal()
              .findCaretByLabel("Structure Type")
              .then(()=>{
                _modalView.select_popupItem("list", structureType);
              })
    if(BoQrecordCheckboxClass!=null){
    _modalView.findModal()
              .acceptButton("Next");
   _modalView.findModalBody()
             .checkbox_inCell(BoQrecordCheckboxClass).click();
   _modalView.findModal()
             .checkbox_inCell(BoQrecordCheckboxClass).check();
    }
    _modalView.findModal()
              .acceptButton("Execute");
    cy.wait(5000);
    _common.waitForLoaderToDisappear()
    _modalView.findModal()
              .acceptButton("Go to Bid");
    cy.wait(10000);
  
  }

  verifyBidQuantity_inBoQStructure(bidQuantity: string) {
    
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BIDBOQSTRUCTURE)
             .findGrid()
             .findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, "Position")
             .click();
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BIDBOQSTRUCTURE)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.QUANTITY_SMALL)
             .wrapElements()
             .then(($ele) => {
               const bidquantityvalue = $ele.text();
              console.log("expected value:-->", bidQuantity);
              console.log("Actual value:-->", bidquantityvalue);
              expect(bidQuantity).to.equals(bidquantityvalue);
            });
  }

  changeStatus_BidRecord() {
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
           .search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED);
    _common.waitForLoaderToDisappear()

  }


  ExportQTODocument(radioLabelName: string, index: number, RebVersion: string) {
    _modalView.findModal().findRadio_byLabel(radioLabelName, "radio", index);
    _modalView.findModal().findCaretInsideModal("REB Version");
    _modalView.select_popupItem("list", RebVersion);
    _modalView.findModal().acceptButton("OK");
  }


  enter_record_in_create_bid(description: string, businesspartner: string) {
    const CODE = "1" + Cypress._.random(0, 999);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
           .search_fromSidebar("wizard", "Create Bid");
    cy.get("body").then(($body) => {
    if ($body.find('[class*="modal-dialog"] [class*="domain-type-code"][readonly="readOnly"]').length !=0) {
      _modalView.findModal()
                .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                .invoke("val")
                .then(function (codeVal: string) {
                  if (codeVal == "") {
                    _modalView.findModal()
                              .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                              .clear({ force: true })
                              .type(CODE, { force: true });
                    Cypress.env("BID-CODE",CODE) 
                  }
      });      
    }else{
      console.log("Code is generated automatically.")
    }
    });
    _modalView.findModal()
              .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
              .clear({ force: true })
              .type(description, { force: true });
    _modalView.findModal()
              .findInputFieldInsideModal(
                "Business Partner",
                app.InputFields.INPUT_GROUP_CONTENT
              )
              .clear({ force: true })
              .type(businesspartner);
    _modalView.findModal().select_popupItem("grid", businesspartner);
    cy.wait(1000);
  }

  uncheck_checkbox(labelName: string) {
    cy.wait(2000)
    _modalView.findModal().findCheckBox_byLabel(labelName, "checkbox").uncheck()
    /*  cy.wait(2000)
     cy.get("[class*='modal-content'] [type='checkbox']")
     .eq(2).uncheck() */
  }

  createBidRecord_byWizardOptions(rubricCategory: string, description: string, businesspartner: string, structureType: string, mainBid?: string, configuration?: string, projectChange?:string,bidChangeRadioOption?:string,multipleProject?:any) {
    cy.wait(1000)
    const CODE = "1" + Cypress._.random(0, 999);
    switch (rubricCategory) {
      case "Main Bid":
        cy.wait(3000)
        _modalView.findModal()
                  .findCaretInsideModal("Type").then(()=>{
                    _modalView.select_popupItem("list", "Main Bid")
                  })
       
        cy.get("body").then(($body) => {
          if ($body.find('[class*="modal-dialog"] [class*="domain-type-code"][readonly="readOnly"]').length <= 0) {
            _modalView.findModal()
                      .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                      .invoke("val")
                      .then(function (codeVal: string) {
                        if (codeVal == "") {
                          _modalView.findModal()
                            .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                            .clear({ force: true })
                            .type(CODE, { force: true });
                          Cypress.env("BID-CODE", CODE)
                        }
                      });
                  } 
          else {
            console.log("Code is generated automatically.")
          }
        });
        if (configuration) {
          _modalView.findModal()
                    .findInputFieldInsideModal("Configuration", app.InputFields.INPUT_GROUP_CONTENT)
                    .clear({ force: true })
                    .type(configuration, { force: true });
          cy.wait(1000);
          _modalView.select_popupItem("grid", configuration)
        }
        _modalView.findModal()
                  .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                  .clear({ force: true })
                  .type(description, { force: true });
        _modalView.findModal()
                  .findInputFieldInsideModal("Business Partner", app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(businesspartner);
        _modalView.findModal()
                  .select_popupItem("grid", businesspartner);
        cy.wait(1000);
        _modalView.findModal()
                  .acceptButton("Next");
        _modalView.findModal()
                  .findCaretByLabel("Structure Type")
                  .then(()=>{'cy.wait(1000)//requierd wait'
                    _modalView.select_popupItem("grid1", structureType);
                    cy.wait(1000)//requierd wait
                  })
                  
        _modalView.findModal().findCheckBox_byLabel("Use UR Breakdown", "checkbox").uncheck()
        _modalView.findModal()
                  .acceptButton("Execute");
        cy.wait(3000)
        this.getCode_fromBIDModal("MAIN_BID_CODE")
        _modalView.findModal()
                  .acceptButton("Go to Bid");
      break;
      case "Change Bid":
        _modalView.findModal()
                  .findCaretInsideModal("Type")
                  .then(()=>{
                    _modalView.select_popupItem("list", "Change Bid")
                  })
        cy.get("body")
          .then(($body) => {
            if ($body.find('[class*="modal-dialog"] [class*="domain-type-code"][readonly="readOnly"]').length <= 0) {
              _modalView.findModal()
                        .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                        .invoke("val")
                        .then(function (codeVal: string) {
                            if (codeVal == "") {
                              _modalView.findModal()
                                        .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                                        .clear({ force: true })
                                        .type(CODE, { force: true });
                              Cypress.env("BID-CODE", CODE)
                            }
                          });
            }
            else {
              console.log("Code is generated automatically.")
            }
          });
        _modalView.findModal()
                  .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                  .clear({ force: true })
                  .type(description, { force: true });
        _modalView.findModal()
                  .findInputFieldInsideModal("Main Bid", app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(mainBid)
                  .then(()=>{
                    _modalView.findModal()
                              . select_popupItem("grid", mainBid);
                  })
        if(projectChange!=null){
          _modalView.findModal()
                    .findInputFieldInsideModal("Project Change", app.InputFields.INPUT_GROUP_CONTENT)
                    .clear({ force: true })
                    .type(projectChange); 
          _modalView.findModal()
                    .select_popupItem("grid", projectChange);      
        }   
        _modalView.findModal()
                  .acceptButton("Next");
        _modalView.findModal()
                  .findCaretByLabel("Structure Type")
                  .then(()=>{
                    _modalView.select_popupItem("list", structureType);
                  })
        cy.wait(1000);
        cy.contains(".modal-content", "Structure Settings")
          .within(() => {
                cy.contains("div", "Based on major line items")
                  .find("input[type='checkbox']")
                  .uncheck();
                cy.contains("div", "Based on project change line items")
                  .find("input[type='checkbox']")
                  .check();
          });
        _modalView.findModal()
                  .acceptButton("Next");

        _modalView.findModal()
                  .findCellhasValue(app.GridCells.DESCRIPTION, "Identified")
                  .click()
                  .then(()=>{
                    cy.get(`.active .column-id_stateSelected`)
                      .find('[type="checkbox"]')
                      .check()
                  })
        _modalView.findModal()
                  .findCellhasValue(app.GridCells.DESCRIPTION, "Approved")
                  .click()
                  .then(()=>{
                    cy.get(`.active .column-id_stateSelected`)
                      .find('[type="checkbox"]')
                      .check()
                  })

        _common.clickOn_cellHasValue_fromModal(app.GridCells.CODE,projectChange)
        _modalView.findCheckbox_inCell("item-field_ChangeOrderSelected")
                  .check({ force: true })
        _modalView.findModal()
                  .acceptButton("Execute");
        cy.wait(3000)
        this.getCode_fromBIDModal("CHANGE_BID_CODE")
        _modalView.findModal()
                  .acceptButton("Go to Bid");
        break;
      case "Change Bid with Project Change and Main Bid":
        _modalView.findModal()
                  .findCaretInsideModal("Type")
                  .then(()=>{
                    _modalView.select_popupItem("list", "Change Bid")

                  })
        cy.get("body")
          .then(($body) => {
          if ($body.find('[class*="modal-dialog"] [class*="domain-type-code"][readonly="readOnly"]').length <= 0) {
            _modalView.findModal()
                      .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                      .invoke("val")
                      .then(function (codeVal: string) {
                        if (codeVal == "") {
                          _modalView.findModal()
                                    .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                                    .clear({ force: true })
                                    .type(CODE, { force: true });
                          Cypress.env("BID-CODE", CODE)
                        }
                      });
          } 
          else {
            console.log("Code is generated automatically.")
          }
        });
        _modalView.findModal()
                  .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                  .clear({ force: true })
                  .type(description, { force: true });
        _modalView.findModal()
                  .findInputFieldInsideModal("Main Bid", app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(mainBid);
        _modalView.findModal()
                  .select_popupItem("grid", mainBid);
        if(projectChange!=null){
        _modalView.findModal()
                  .findInputFieldInsideModal("Project Change", app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(projectChange)
                  .then(()=>{
                    _modalView.findModal()
                              .select_popupItem("grid", projectChange);
                  })
              
        }   
        _modalView.findModal()
                  .acceptButton("Next");
        _modalView.findModal()
                  .caret()
                  .select_popupItem("list", structureType);
        cy.wait(1000);
        cy.contains(".modal-content", "Structure Settings")
          .within(() => {
            cy.contains("div", "Based on major line items")
              .find("input[type='checkbox']")
              .check();
            cy.contains("div", "Based on project change line items")
              .find("input[type='checkbox']")
              .check();
          });
        _modalView.findModal()
                  .acceptButton("Next");
        cy.wait(5000)
        cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Project Change Settings")
          .within(() => {
            cy.get("#sales_bid_create_update_wizard_3")
              .click({ force: true });
          });
        cy.get("div.modal-dialog  div.grid-container")
          .eq(0)
          .within(()=>{
            _modalView.findCellhasValue(app.GridCells.DESCRIPTION, "Identified")
                      .click()
            _modalView.findCheckbox_inCell("column-id_stateSelected").check({ force: true })
          })
        cy.get("div.modal-dialog  div.grid-container")
          .eq(1)
          .within(()=>{
          _modalView.findCellhasValue(app.GridCells.DESCRIPTION, projectChange)
                    .click()
          _modalView.findCheckbox_inCell('column-id_changeOrderSelected').check({ force: true })
        })
        _modalView.findModal()
                  .acceptButton("Execute");
        cy.wait(2000)
        _modalView.findModal()
                  .acceptButton("Go to Bid");
      break;
      case "ByActivity":
        cy.wait(2000)
        _modalView.findModal()
                  .findCaretInsideModal("Type")
                  .then(()=>{
                    _modalView.select_popupItem("list", "Main Bid")
                  })
        cy.get("body")
          .then(($body) => {
            if ($body.find('[class*="modal-dialog"] [class*="domain-type-code"][readonly="readOnly"]').length <= 0) {
              _modalView.findModal()
                        .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                        .invoke("val")
                        .then(function (codeVal: string) {
                          if (codeVal == "") {
                            _modalView.findModal()
                                      .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                                      .clear({ force: true })
                                      .type(CODE, { force: true });
                            Cypress.env("BID-CODE", CODE)
                          }
                        });
            }
            else {
              console.log("Code is generated automatically.")
            }
        });
        _modalView.findModal()
                  .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                  .clear({ force: true })
                  .type(description, { force: true });
        _modalView.findModal()
                  .findInputFieldInsideModal("Business Partner", app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(businesspartner);
        _modalView.findModal()
                  .select_popupItem("grid", businesspartner);
        cy.wait(1000);
        _modalView.findModal()
                  .acceptButton("Next");
        _modalView.findModal()
                  .findCaretByLabel("Structure Type")
                  .then(()=>{
                    _modalView.select_popupItem("grid1", structureType);
                  })
        cy.contains(".modal-content", "Structure Settings")
          .within(() => {
            cy.contains("div", "Use UR Breakdown")
              .find("input[type='checkbox']")
              .click();
          });
        _modalView.findModal()
                  .acceptButton("Execute");
        cy.wait(2000)
        _modalView.findModal()
                  .acceptButton("Go to Bid");
      break;
      case "Change Bid with multiple Project Change":
        _modalView.findModal()
                  .findCaretInsideModal(commonLocators.CommonLabels.TYPE_CAPS)
                  .then(()=>{
                    _modalView.select_popupItem(commonLocators.CommonKeys.LIST, commonLocators.CommonKeys.CHANGE_BID)
                  })
        cy.get("body")
          .then(($body) => {
            if ($body.find('[class*="modal-dialog"] [class*="domain-type-code"][readonly="readOnly"]').length <= 0) {
              _modalView.findModal()
                        .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                        .invoke("val")
                        .then(function (codeVal: string) {
                          if (codeVal == "") {
                            _modalView.findModal()
                                      .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                                      .clear({ force: true })
                                      .type(CODE, { force: true });
                            Cypress.env("BID-CODE", CODE)
                          }
                        });
            }
            else {
              console.log("Code is generated automatically.")
            }
          });
        _modalView.findModal()
                  .findInputFieldInsideModal(commonLocators.CommonLabels.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                  .clear({ force: true })
                  .type(description, { force: true });
        _modalView.findModal()
                  .findInputFieldInsideModal(commonLocators.CommonLabels.MAIN_BID, app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(mainBid)
                  .then(()=>{
                    _modalView.select_popupItem(commonLocators.CommonKeys.GRID, mainBid);
                  })
        _modalView.findModal()
                  .acceptButton(btn.ButtonText.NEXT);

        _modalView.findModal()
                  .findCaretByLabel(commonLocators.CommonLabels.STRUCTURE_TYPE)
                  .then(()=>{
                    _modalView.select_popupItem(commonLocators.CommonKeys.LIST, structureType);
                  })

        _common.waitForLoaderToDisappear()

        cy.contains(`${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`, commonLocators.CommonLabels.STRUCTURE_SETTINGS)
          .within(() => {
            cy.contains(commonLocators.CommonKeys.DIV, commonLocators.CommonLabels.BASED_ON_MAJOR_LINE_ITEMS)
              .find(`${commonLocators.CommonElements.CHECKBOX_TYPE}`)
              .uncheck();
            cy.contains(commonLocators.CommonKeys.DIV, commonLocators.CommonLabels.BASED_ON_PROJECT_CHANGE_LINE_ITEMS)
              .find(`${commonLocators.CommonElements.CHECKBOX_TYPE}`)
              .check();
          });
        _modalView.findModal()
                  .acceptButton(btn.ButtonText.NEXT);
        _common.waitForLoaderToDisappear()

        if (bidChangeRadioOption!="") {
          _modalView.findModal()
                    .wrapElements()
                    .contains(commonLocators.CommonElements.LABEL,bidChangeRadioOption)
                    .prev(`${commonLocators.CommonElements.RADIO_INPUT}`)
                    .click()
        }

        _modalView.findModal()
                  .findCellhasValue(app.GridCells.DESCRIPTION, commonLocators.CommonKeys.IDENTIFIED)
                  .click()
                  .then(()=>{
                    cy.get(`${commonLocators.CommonElements.ACTIVE} .${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.STATE_SELECTED}`)
                      .find(`${commonLocators.CommonElements.CHECKBOX_TYPE}`)
                      .check()
                  })

        _modalView.findModal()
                  .findCellhasValue(app.GridCells.DESCRIPTION, commonLocators.CommonKeys.APPROVED)
                  .click()
                  .then(()=>{
                    cy.get(`${commonLocators.CommonElements.ACTIVE} .${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.STATE_SELECTED}`)
                      .find(`${commonLocators.CommonElements.CHECKBOX_TYPE}`)
                      .check()
                  })

        cy.wait(100)
          .then(()=>{
            Object.keys(multipleProject)
                  .forEach((keys)=>{
                    cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} ${commonLocators.CommonElements.GRID_CONTAINER}` )
                      .last()
                      .within(() => {
                        _modalView.findCellhasValue(app.GridCells.DESCRIPTION, keys)
                                  .click()
                        cy.get(`${commonLocators.CommonElements.ACTIVE} .${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.CHANGE_ORDER_SELECTED}`)
                          .find(`${commonLocators.CommonElements.CHECKBOX_TYPE}`)
                          .as("checkbox")
                          .invoke("is", ":checked")
                          .then((checked) => {
                                if (multipleProject[keys] == commonLocators.CommonKeys.CHECK) {
                                  if (!checked) {
                                    cy.get("@checkbox")
                                      .check();
                                  }
                                } else if (multipleProject[keys] == commonLocators.CommonKeys.UNCHECK) {
                                  if (checked) {
                                    cy.get("@checkbox")
                                      .uncheck();
                                  }
                            }
                          });
                      })
                  })
          })
      
        _modalView.findModal()
                  .acceptButton("Execute");
        cy.wait(2000)
        _modalView.findModal()
                  .acceptButton("Go to Bid");
        break;
      case "UpdateBidWithMainBid":
        _common.waitForLoaderToDisappear()

        cy.get('#sales_bid_create_update_wizard_2')
          .click()

        _modalView.findModal()
                  .findCaretInsideModal("Type").then(()=>{
                    _modalView.select_popupItem("list", "Main Bid")
                  })
      
        _modalView.findModal()
                  .acceptButton("Next");
        _common.waitForLoaderToDisappear()
                  
        _modalView.findModal()
                  .acceptButton("Execute");
        _common.waitForLoaderToDisappear()
        this.getCode_fromBIDModal("MAIN_BID_CODE")
        _modalView.findModal()
                  .acceptButton("Go to Bid");
      break;
      case "Main Bid With Cost Group":
        cy.wait(3000)
        _modalView.findModal()
                  .findCaretInsideModal("Type").then(()=>{
                    _modalView.select_popupItem("list", "Main Bid")
                  })
       
        cy.get("body").then(($body) => {
          if ($body.find('[class*="modal-dialog"] [class*="domain-type-code"][readonly="readOnly"]').length <= 0) {
            _modalView.findModal()
                      .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                      .invoke("val")
                      .then(function (codeVal: string) {
                        if (codeVal == "") {
                          _modalView.findModal()
                            .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                            .clear({ force: true })
                            .type(CODE, { force: true });
                          Cypress.env("BID-CODE", CODE)
                        }
                      });
                  } 
          else {
            console.log("Code is generated automatically.")
          }
        });
        if (configuration) {
          _modalView.findModal()
                    .findInputFieldInsideModal("Configuration", app.InputFields.INPUT_GROUP_CONTENT)
                    .clear({ force: true })
                    .type(configuration, { force: true });
          cy.wait(1000);
          _modalView.select_popupItem("grid", configuration)
        }
        _modalView.findModal()
                  .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                  .clear({ force: true })
                  .type(description, { force: true });
        _modalView.findModal()
                  .findInputFieldInsideModal("Business Partner", app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(businesspartner);
        _modalView.findModal()
                  .select_popupItem("grid", businesspartner);
        cy.wait(1000);
        _modalView.findModal()
                  .acceptButton("Next");
        cy.wait(1000);
        _modalView.findModal()
                  .acceptButton(btn.ButtonText.PREVIOUS);
        cy.wait(1000);
        _modalView.findModal()
                            .acceptButton("Next");
        _modalView.findModal()
                  .findCaretByLabel("Structure Type");
        cy.wait(1000)
        _modalView.findModal()
                  .findCaretByLabel("Structure Type");
        cy.wait(1000)
        _modalView.findModal()
                  .findCaretByLabel("Structure Type")
                  .then(()=>{'cy.wait(1000)//requierd wait'
                    _modalView.select_popupItem("grid1", structureType);
                    cy.wait(1000)//requierd wait
                  })
                  
        _modalView.findModal().findCheckBox_byLabel("Use UR Breakdown", "checkbox").uncheck()
        _modalView.findModal()
                  .acceptButton("Execute");
        cy.wait(3000)
        this.getCode_fromBIDModal("MAIN_BID_CODE")
        _modalView.findModal()
                  .acceptButton("Go to Bid");
      break;

      case "Change bid from bid page":
        _modalView.findModal()
                  .findCaretInsideModal("Type");
        _modalView.select_popupItem("list", "Change Bid")
        cy.get("body").then(($body) => {
          if ($body.find('[class*="modal-dialog"] [class*="domain-type-code"][readonly="readOnly"]').length <= 0) {
            _modalView.findModal()
                      .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                      .invoke("val")
                      .then(function (codeVal: string) {
                        if (codeVal == "") {
                          _modalView.findModal()
                                    .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                                    .clear({ force: true })
                                    .type(CODE, { force: true });
                          Cypress.env("BID-CODE", CODE)
                        }
                        });
          }
          else {
            console.log("Code is generated automatically.")
          }
        });
        _modalView.findModal()
                  .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                  .clear({ force: true })
                  .type(description, { force: true });
        _modalView.findModal()
                  .findInputFieldInsideModal("Main Bid", app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(mainBid);
        _modalView.findModal()
                  .select_popupItem("grid", mainBid);
        if(projectChange!=null){
            _modalView.findModal()
                      .findInputFieldInsideModal("Project Change", app.InputFields.INPUT_GROUP_CONTENT)
                      .clear({ force: true })
                      .type(projectChange); 
            _modalView.findModal()
                      .select_popupItem("grid", projectChange);      
        }   
        _modalView.findModal()
                  .acceptButton("OK");
    }
  }

  verify_Bid_netQuantyto_LI_GrandTotal(lineitemDescription: string) {
    cy.wait(1000)

    _mainView.findModuleClientArea()
      .findAndShowContainer(cnt.uuid.BIDS)
      .findGrid()
      .findActiveRow()
      .getCell(app.GridCells.AMOUNT_NET)
      .wrapElements().then(($ele) => {
        BidNetQuantiy = $ele.text()
        cy.log("BidNetQuantiy is " + BidNetQuantiy)
      })
    _mainView.findModuleClientArea()
      .findAndShowContainer(cnt.uuid.BIDDETAILS)
      .findButtonWithTitle(btn.ButtonText.GO_TO_ESTIMATE)
      .clickIn()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);

    });
    _common.select_dataFromSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, lineitemDescription)
    _mainView.findModuleClientArea()
      .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      .findGrid()
      .findActiveRow()
      .getCell(app.GridCells.GRAND_TOTAL)
      .wrapElements().then(($ele) => {
        Grandtotal = $ele.text()
        cy.log("Line item Grandtotal is " + Grandtotal)
      })
    expect(BidNetQuantiy).to.equals(Grandtotal);
  }

  verifying_Bid_Net_Amount() {
    var BidNetQuantiy: string
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BIDS)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.AMOUNT_NET)
             .wrapElements().then(($ele) => {
              cy.wait(2000)
              BidNetQuantiy = $ele.text()
              cy.log("BidNetQuantiy is " + BidNetQuantiy)
              Cypress.env("BidNetAmount", BidNetQuantiy)
              expect(BidNetQuantiy).to.not.equals('0.00');
             })
  }
  
  validate_BidsConfiguration(container_UUID: string, rubricCategory: string, configuration: string, billingSchema: string, paymentTerm: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.RUBRIC_CATEGORY_FK)
             .wrapElements().then(($ele) => {
              var rubric_category = $ele.text()
              cy.log(rubric_category)
              expect(rubric_category).to.equals(rubricCategory);
             })
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.CONFIGURATION_FK)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .invoke('val')
             .then(function (actualValue: string) {
              expect(actualValue).to.equals(configuration)
              })
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.BILLING_SCHEMA_FK)
             .wrapElements().then(($ele) => {
              var billing_Schema = $ele.text()
              cy.log(billing_Schema)
              expect(billing_Schema).to.equals(billingSchema);
             })
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.PAYMENT_TERM_FI_FK)
             .wrapElements().then(($ele) => {
              var Payment_Term = $ele.text()
              cy.log(Payment_Term)
              expect(Payment_Term).to.equals(paymentTerm);
              })
  }
  select_structure_type(structureType: string) {
    cy.wait(1000); 
    _modalView.findModal()
              .caret()
              .select_popupItem("grid1", structureType);
    cy.wait(1000);        
  }

  getCode_fromBIDModal(envName:string) {
    cy.wait(5000)
    cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " [class*='icon-message'] [class*='message']").then(($value) => {
      var str = ($value.text()).replace(" ","")
      console.log(str)
      var splitted = str.split(":", 2);
      console.log(splitted[1])
      Cypress.env(envName, (splitted[1].replace(/'/g, "")).replace(" ",""))
    })
  }

  enterRecord_toCopyProject(BoQSource:string){
    _modalView.findModal()
              .findCaretByLabel("BoQ Source")
              .then(()=>{ 
               _mainView.select_popupItem("grid1", BoQSource)
              })
     _modalView.findModal()
               .wrapElements()
               .then(() =>{
                cy.contains(`${commonLocators.CommonElements.ROW}`,"BoQs")
                  .within(() =>{
                    cy.get(`[id*='${app.SubContainerLayout.INDICATOR}']`).click()
                    cy.wait(1000)
                    _modalView.findCell_ByIcon(btn.IconButtons.ICO_STATUS_16,0)
                  })
               }) 
     _modalView.findModal()
               .wrapElements()
               .then(() =>{
                   cy.contains(`${commonLocators.CommonElements.ROW}`,"BoQ Structure")
                     .within(() =>{
                      _modalView.findCell_ByIcon(btn.IconButtons.ICO_BOQ_ITEM,0)
                     }) 
                      _modalView.findModal()
                                .findActiveRow()
                                .checkbox_inCell(app.GridCells.MARKER)
                                .click();
               }) 
     _modalView.findModal().acceptButton("OK");
 }

 enterRecord_toCopyBoq(data: DataCells){
  if (data[commonLocators.CommonLabels.BOQ_SOURCE] && data[commonLocators.CommonLabels.BOQS]) {
    _modalView.findModal()
              .findCaretInsideModal(commonLocators.CommonLabels.BOQ_SOURCE)
              .then(()=>{
                _modalView.select_popupItem("grid1", data[commonLocators.CommonLabels.BOQ_SOURCE])
              })
    _common.waitForLoaderToDisappear()
    cy.get(`${commonLocators.CommonElements.SUB_VIEW_CONTAINER}` + " " + `[class*='${app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO}']`)
      .contains(`[class*='${app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO}']`, data[commonLocators.CommonLabels.BOQS])
      .click({ force: true })
    _modalView.findActiveRow()
              .checkbox_inCell(app.GridCells.MARKER)
              .check()
    }
    _modalView.findModal()
              .acceptButton("OK");
 }
 
  
}


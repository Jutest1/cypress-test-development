/// <reference types="cypress" />
import {  _common, _mainView, _modalView, _estimatePage, _sidebar ,_qtoPage} from 'cypress/pages';
import { app, commonLocators,btn} from '../../../locators';
import { DataCells } from "cypress/pages/interfaces";


var getCode: string;

export class QTOPage {


  createQTOHeader(container_UUID: string, data: DataCells){
    if (data[app.GridCells.QTO_HEADER_PURPOSE]) {
      _qtoPage.edit_dropdownCellWithClickIronInModal(container_UUID, app.GridCells.QTO_HEADER_PURPOSE,  data[app.GridCells.QTO_HEADER_PURPOSE], commonLocators.CommonKeys.LI, app.GridCells.BTN_DEFAULT_INPUT_SM, app.InputFields.INPUT_GROUP_CONTENT);
    }

    if (data[app.GridCells.QTO_HEADER_QTO_TYPE]) {
      _qtoPage.edit_dropdownCellWithInputValueInModal(container_UUID, app.GridCells.QTO_HEADER_QTO_TYPE,data[app.GridCells.QTO_HEADER_QTO_TYPE], commonLocators.CommonKeys.LI, app.InputFields.INPUT_GROUP_CONTENT);
    }

    if (data[app.GridCells.QTO_HEADER_DESCRIPTION]) {
      _qtoPage.enterRecord_inNewModal(container_UUID, app.GridCells.QTO_HEADER_DESCRIPTION,  data[app.GridCells.QTO_HEADER_DESCRIPTION]);
    }

    if (Cypress.env('PackageCode')) {
      cy.log('PackageCode:'+Cypress.env('PackageCode'));
      _qtoPage.edit_dropdownCellWithInputValueInModal(container_UUID, app.GridCells.PACKAGE, Cypress.env('PackageCode'), commonLocators.CommonKeys.DIV, app.InputFields.INPUT_GROUP_CONTENT);
    }

    if (data[app.GridCells.QTO_HEADER_BOQ_REF_NO]) {
      cy.log('boqNo:'+Cypress.env('BoQcode'));
      _qtoPage.edit_dropdownCellWithClickIronInModal(container_UUID, app.GridCells.QTO_HEADER_BOQ_REF_NO, Cypress.env('BoQcode'), commonLocators.CommonKeys.DIV, app.GridCells.BTN_DEFAULT_INPUT_SM, app.InputFields.INPUT_GROUP_CONTENT);
    }



    /* clcik ok button*/
    _common.clickOn_modalFooterButton(btn.ButtonText.OK);

  }


  textOfEnvCode(container_UUID: string,  gridCellColumn:string, envCode:string, recordType?:string) {
		_mainView
			.findModuleClientArea()
			.findAndShowContainer(container_UUID)
			.findGrid()
			.findActiveRow()
			.getCell(gridCellColumn, recordType)
			.wrapElements()
			.then(($ele) => {
				getCode = $ele.text(); //.split("R");
				cy.log(getCode);

        cy.log("----getCode-----"+getCode+"----typeof of getCode-----"+typeof(getCode));
				Cypress.env(envCode, getCode);
			});
	}



  GetAndchangeValueToFloat(container_UUID: string,  gridCellColumn:string, envCode:string, item?:string, decimal?:number){
    let a,b,c;
    _mainView
    .findModuleClientArea()
    .findAndShowContainer(container_UUID)
    .findGrid()
    .findActiveRow()
    .getCell(gridCellColumn, item)
    .wrapElements()
    .then(($ele) => {
      getCode = $ele.text(); //.split("R");
      cy.log("----getCode-----"+getCode+"----typeof of getCode-----"+typeof(getCode));
      a=getCode.toString();
      b=a.replace(/,/gi,'');
      c=parseFloat(b);
      if(decimal){
        c= c.toFixed(decimal);
       }
       cy.log("----getValue-----"+c);
       Cypress.env(envCode, c);

    });

  
  }
  

  createQTODetailLine(container_UUID: string, data: DataCells){
    
    if (data[app.GridCells.BOQ_ITEM_CODE]) {
      _qtoPage.edit_dropdownCellWithInputValue(container_UUID, app.GridCells.BOQ_ITEM_CODE, data[app.GridCells.BOQ_ITEM_CODE], commonLocators.CommonKeys.DIV, app.InputFields.INPUT_GROUP_CONTENT );
    }

    if (data[app.GridCells.QTO_lINE_TYPE_CODE]) {
      // _mainView.findModuleClientArea()
      // .findAndShowContainer(container_UUID)
      // .findGrid().findActiveRow()
      // .findCell(app.GridCells.QTO_lINE_TYPE_CODE)
      // .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
      // .type(data[app.GridCells.QTO_lINE_TYPE_CODE])
      // .then(()=>{
      //  _mainView.select_popupItem(commonLocators.CommonKeys.DIV, data[app.GridCells.QTO_lINE_TYPE_CODE]);
      // })
      
      //_common.edit_dropdownCellWithCaret(container_UUID, app.GridCells.QTO_lINE_TYPE_CODE, commonLocators.CommonKeys.DIV, data[app.GridCells.QTO_lINE_TYPE_CODE]);
    }

    if (data[app.GridCells.FACTOR]) {
      _qtoPage.edit_inputValueinNewRow(container_UUID, app.GridCells.FACTOR,  data[app.GridCells.FACTOR]);
    }

    if (data[app.GridCells.QTO_FORMULA_FK]) {
      _qtoPage.edit_dropdownCellWithInputValue(container_UUID, app.GridCells.QTO_FORMULA_FK, data[app.GridCells.QTO_FORMULA_FK], commonLocators.CommonKeys.DIV, app.InputFields.INPUT_GROUP_CONTENT );
    }
    if (data[app.GridCells.VALUE_1_DETAIL]) {
      _qtoPage.edit_inputValueinNewRow(container_UUID, app.GridCells.VALUE_1_DETAIL,  data[app.GridCells.VALUE_1_DETAIL]);
    }

  }



  deleteQTODetailLines(container_UUID: string, searchValue:string){
    _common.search_inSubContainer(container_UUID, searchValue);
    _common.delete_recordFromContainer(container_UUID);
    _common.waitForLoaderToDisappear()
		cy.SAVE();
    _common.clear_subContainerFilter(container_UUID);
  }   
    
   

  renumberQTOLinesFromWizard(container_UUID: string, data: DataCells){
    if (data[app.GridCells.SHEET]) {
     // _modalView.findModal().findModalBody().findInsideModal(app.GridCells.SHEET).clear().type(data[app.GridCells.SHEET]);
     _qtoPage.enterRecord_inNewModal(container_UUID, app.GridCells.SHEET,  data[app.GridCells.SHEET]);
    }
    if (data[app.GridCells.LINE]) {
      _qtoPage.enterRecord_inNewModal(container_UUID, app.GridCells.LINE,  data[app.GridCells.LINE]);
    }
    if (data[app.GridCells.INDEX]) {
      _qtoPage.enterRecord_inNewModal(container_UUID, app.GridCells.INDEX,  data[app.GridCells.INDEX]);
    }
      _common.clickOn_modalFooterButton(btn.ButtonText.OK);
  }

  selectCellInContainer(container_UUID: string, cell:string, code:string,recordType?: string ){
    cy.wait(300).then(()=>{
        _mainView.findModuleClientArea()
            .findAndShowContainer(container_UUID)
            .findCellhasValue(cell, code,recordType)
            .click({force:true});
    });
    cy.wait(2000)
}
    

  GetAllValueFromCell(container_UUID: string, cell:string, decimal?:number){
    var totalCost;
    _mainView.findModuleClientArea()
    .findAndShowContainer(container_UUID)
    .findGrid()
    .getCell(cell)
    .wrapElements().then(($costTotalElements: JQuery<HTMLElement>) => {
        totalCost = Array.from($costTotalElements)
                              .map((costTotalElement) => parseFloat(costTotalElement.textContent.replace(/,/g, '')))
                              .reduce((total, costTotal) => total + costTotal, 0);
                              if(decimal){
                                totalCost= totalCost.toFixed(decimal);
                               }
       cy.log('------totalCost-----------'+totalCost);
       Cypress.env('totalCost', totalCost);
      });
  }


  verify_BoqQuantity_and_result(){
    cy.wait(500).then(() => {
      cy.log('-----BoqQuantity---'+Cypress.env('BoqQuantity') );
      cy.log('-----totalCost---'+Cypress.env('totalCost') );
       expect( Cypress.env('BoqQuantity')).to.equal(Cypress.env('totalCost') );
  })

  }


  edit_dropdownCellWithClickIronInModal(containerUUID: string, cellType: string, value: string, popUpType: string, btnInputSM:string,  recordType?: string) {
    _modalView.findModal()
    .findInputFieldInsideModalClickIron(cellType, recordType, btnInputSM)
    .then(()=>{;
      _qtoPage.select_popupItem(popUpType, value);
    })
  }

  edit_dropdownCellWithInputValueInModal(containerUUID: string, cellType: string, value: string, popUpType: string, recordType?: string){
    _modalView.findModal()
    .findInputFieldInsideModal(cellType, recordType)
    .clear()
    .type(value)
    .then(()=>{
      _qtoPage.select_popupItem(popUpType, value);
    })

  }



  enterRecord_inNewModal(containerUUID: string, gridCellClass: string,  inputData: string, inputFieldClass?: string, recordType?: string, containerPosition?: number) {
    _modalView.findModal()
    .findInsideModal(gridCellClass)
    .clear()
    .type(inputData);
   
  }


  edit_inputValueinNewRow(containerUUID: string, cellType: string, value: string,   recordType?: string){
    _mainView.findModuleClientArea()
    .findAndShowContainer(containerUUID)
    .findGrid().findActiveRow()
    .findCell(cellType)
    .typeIn(value);
   
  }



  edit_dropdownCellWithInputValue(containerUUID: string, cellType: string, value: string, popUpType: string,  recordType?: string){
    _mainView.findModuleClientArea()
      .findAndShowContainer(containerUUID)
      .findGrid().findActiveRow()
      .findCell(cellType)
      .findTextInput(recordType)
      .type(value)
      .then(()=>{
        _qtoPage.select_popupItem(popUpType, value);
      })
  }

  select_popupItem(popUpType: string, value: string) {
		cy.wait(1000);
		cy.get(".popup-container").within(() => {
		  switch (popUpType) {
			case "list".toLowerCase():
			  cy.contains("li",value).click({ force: true });
			  break;
			case "grid":
			  //cy.contains("div", value).click({force: true });
			  cy.get("div.popup-content").within(() => {
				cy.wait(1000)
				cy.get(`div[class*='column-id']`).each(($cell) => {
				  const cellField: string = $cell.text();
				  if (value === cellField) {
					cy.wait(1000);
					cy.wrap($cell).click({ force: true });
					cy.wait(2000);
					return false;
				  }
				});
			  });
			  break;
			// case "div":
			// //if div doesn't contains'column-id' class then use this
			//   cy.contains("div", value).click({force: true });  
			//   break;
			case "grid1".toLowerCase():
			  cy.contains("button", value).click({ force: true });
			  break;
			case "span".toLowerCase():
			  cy.contains("span", value).click({ force: true });
			  break;
			case "listexact".toLowerCase():
				cy.contains("li", new RegExp("^" + value + "$", "g")).click({ force: true });
				break;


			case 'li'.toLowerCase():
					// cy.get(`[class*='btn-default input-sm']`).first().click({force:true});
					cy.contains('li', value).click({ force: true });
				break;

			case 'div'.toLowerCase():
						// cy.get(`[class*='btn-default input-sm']`).first().click({force:true});
						cy.wait(500);
							//cy.contains('div', value).click({ force: true });
							cy.get('div.popup-content').within(() => {
							
								cy.get(`div[class*='column-id']`).each(($cell) => {
									const cellField: string = $cell.text();
									if (value === cellField) {
										cy.wait(1000) // wait to resolve promise;
										cy.wrap($cell).should('exist').click({force:true});
										cy.wait(3000) //
										return false;
									}
								});
							});
				break;  




			default:
			  cy.log("Search type not supported");
		  }
		});
	  }





      
}
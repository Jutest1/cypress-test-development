/// <reference types="cypress" />
import { _common, _mainView, _modalView } from 'cypress/pages';
import { app, cnt, btn, commonLocators } from '../../../../locators';
import { BOQ_ROOT_ITEM, WIC_CATALOGUES_HEADER } from 'cypress/pages/variables';
import { DataCells } from "cypress/pages/interfaces";

export class WICPages {
	enterRecord_toCreateWICGroup(code: string, description: string) {
		_mainView.findModuleClientArea()
		         .findAndShowContainer(cnt.uuid.WIC_GROUPS)
				 .findGrid()
				 .findCell(app.GridCells.CODE).findTextInput(app.InputFields.DOMAIN_TYPE_CODE).clear().type(code);
		_mainView.findModuleClientArea()
		         .findAndShowContainer(cnt.uuid.WIC_GROUPS)
				 .findGrid()
				 .findCell(app.GridCells.DESCRIPTION_INFO)
				 .findTextInput(app.InputFields.DOMAIN_TYPE_TRANSLATION).type(description);
		cy.wait(2000)
	}

	enterRecord_toCreateWICCatalogs(container_UUID: string, data: DataCells) {
		if (data[app.GridCells.BPD_BUSINESS_PARTNER_FK]) {
			_common.edit_dropdownCellWithInput(container_UUID, app.GridCells.BPD_BUSINESS_PARTNER_FK, 'grid', app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.BPD_BUSINESS_PARTNER_FK], WIC_CATALOGUES_HEADER);
		}
		if (data[app.GridCells.BRIEF_INFO_SMALL]) {
			_common.clickOn_activeRowCell(container_UUID, app.GridCells.BRIEF_INFO_SMALL, 1, BOQ_ROOT_ITEM);
			_common.waitForLoaderToDisappear()
			_common.enterRecord_inNewRow(container_UUID, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.BRIEF_INFO_SMALL], BOQ_ROOT_ITEM);
		}
		if (data[app.GridCells.BAS_PAYMENT_TERM_AD_FK]) {
			_common.edit_dropdownCellWithInput(container_UUID, app.GridCells.BAS_PAYMENT_TERM_AD_FK, 'grid', app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.BAS_PAYMENT_TERM_AD_FK], WIC_CATALOGUES_HEADER);
		}
		if (data[app.GridCells.BAS_PAYMENT_TERM_FI_FK]) {
			_common.edit_dropdownCellWithInput(container_UUID, app.GridCells.BAS_PAYMENT_TERM_FI_FK, 'grid', app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.BAS_PAYMENT_TERM_FI_FK], WIC_CATALOGUES_HEADER);
		}
		if (data[app.GridCells.BAS_PAYMENT_TERM_FK]) {
			_common.edit_dropdownCellWithInput(container_UUID, app.GridCells.BAS_PAYMENT_TERM_FK, 'grid', app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.BAS_PAYMENT_TERM_FK], WIC_CATALOGUES_HEADER);
		}
	}

	enterRecord_WICSubGroup(container_UUID: string, parentGroupCode: string, wicGroupcode: string, description: string) {
		_common.clickOn_cellHasUniqueValue(container_UUID, app.GridCells.CODE, parentGroupCode);
		_common.create_newRecord(container_UUID);
		_common.enterRecord_inNewRow(container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, wicGroupcode);
		_common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, description);
	}

	  copy_boqs_fromWizard(data:DataCells){
		cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS}`)
		  .contains(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`,commonLocators.CommonLabels.BOQ_SOURCE)
		  .closest(`${commonLocators.CommonElements.ROW}`)
		  .within(()=>{
			cy.get(`${commonLocators.CommonElements.PLATFORM_FORM_COL}`)
			  .within(()=>{
				  cy.get(`${commonLocators.CommonElements.CARET}`)
					.click()
					.then(()=>{
					  cy.document().its('body')
						.find(commonLocators.CommonElements.POPUP_CONTAINER)
						.within(()=>{
						  cy.contains(commonLocators.CommonKeys.BUTTON_TAG, data[commonLocators.CommonLabels.BOQ_SOURCE])
							.click({ force: true })
					  })
					})
			  })
		  })
	
		cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS}`)
		  .contains(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`,commonLocators.CommonLabels.BOQS)
		  .closest(`${commonLocators.CommonElements.ROW}`)
		  .within(()=>{
			cy.get(`${commonLocators.CommonElements.PLATFORM_FORM_COL}`)
			  .within(()=>{
				 cy.get(`[class*='${commonLocators.CommonElements.COLUMN_ID}${BOQ_ROOT_ITEM}.${app.GridCells.BRIEF_INFO_SMALL}']`)
					.contains(data[app.GridCells.BRIEF_INFO_SMALL])
					.click()
					.then(()=>{
					  cy.get(`${commonLocators.CommonElements.ACTIVE} .${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.MARKER}`)
						.within(()=>{
						  cy.get(`${commonLocators.CommonElements.CHECKBOX_INPUT}`)
							.as("checkbox")
							.invoke("is", ":checked")
							.then((checked) => {
								  if (data[app.GridCells.MARKER] == "check") {
									if (!checked) {
									  cy.get("@checkbox")
										.check();
									}
								  } else if (data[app.GridCells.MARKER] == "uncheck") {
									if (checked) {
									  cy.get("@checkbox")
										.uncheck();
									}
							  }
						})
					})
			  })
		  })
	  }
	)}
  
	selectdata_fromWICBOQs_container(container_UUID: string, text: string) {
 
		cy.get(`[class*="tree-label"]`).contains(text).click();
	  }
	  
}

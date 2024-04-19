/// <reference types="cypress" />
import { _common, _mainView, _modalView } from 'cypress/pages';
import { btn, app, cnt, tile, commonLocators } from 'cypress/locators';
import { DataCells } from "cypress/pages/interfaces";

export class ProjectPage {
	selectProjectModule() {
		_mainView.findModuleClientArea().findTile(tile.DesktopTiles.PROJECT).clickIn();
	}

	enterRecord_toCreateProject(data:DataCells) {
		if (data[commonLocators.CommonLabels.PROJECT_NUMBER]) {
			_modalView.findModal()
					  .findInputFieldInsideModal(commonLocators.CommonLabels.PROJECT_NUMBER, app.InputFields.DOMAIN_TYPE_CODE)
					  .clear()
					  .type(data[commonLocators.CommonLabels.PROJECT_NUMBER]);
		}
		if (data[commonLocators.CommonLabels.NAME]) {
			_modalView.findModal()
					  .findInputFieldInsideModal(commonLocators.CommonLabels.NAME, app.InputFields.DOMAIN_TYPE_DESCRIPTION)
					  .clear()
					  .type(data[commonLocators.CommonLabels.NAME]);
		}
		if (data[commonLocators.CommonLabels.CLERK]) {
			_modalView.findModal()
					  .findInputFieldInsideModal(commonLocators.CommonLabels.CLERK, app.InputFields.INPUT_GROUP_CONTENT)
					  .clear()
					  .type(data[commonLocators.CommonLabels.CLERK])
					  .then(()=>{
						_modalView.select_popupItem(commonLocators.CommonKeys.GRID, data[commonLocators.CommonLabels.CLERK]);
					  })
		}
		_common.clickOn_modalFooterButton(btn.ButtonText.OK)
	}

	enterRecord_toCopyProject(rubricCategory: string, projectNumber: string, costGroupConfiguration: string, group: string, clerk: string) {
		_modalView.findModal().findCheckBox_byLabel('Project Template To Copy', 'checkbox').check({ force: true });
		_modalView.findModal().acceptButton(btn.ButtonText.NEXT);
		_modalView.findModal().findCaretByLabel('Rubric Category');
		_modalView.select_popupItem('list', rubricCategory);
		_modalView.findModal().findInputFieldInsideModal('Project Number', app.InputFields.DOMAIN_TYPE_CODE).clear().type(projectNumber);
		cy.wait(2000);
		_modalView.findModal().findCaretByLabel('Cost Group Configuration');
		_modalView.select_popupItem('list', costGroupConfiguration);
		cy.wait(2000);
		_modalView.findModal().findInputFieldInsideModal('Clerk', app.InputFields.INPUT_GROUP_CONTENT).clear().type(clerk);
		_modalView.select_popupItem('grid', clerk);
		cy.wait(3000);
		_modalView.findModal().acceptButton(btn.ButtonText.NEXT);
		_modalView.findModal().findCheckBox_byLabel('Schedules', 'checkbox').check({ force: true });
		_modalView
			.findModal()
			.wrapElements()
			.then(() => {
				cy.contains(`${commonLocators.CommonElements.ROW}`, 'Estimate').within(() => {
					cy.get(`[title*='${commonLocators.CommonLabels.SELECT}']`).find(`${commonLocators.CommonElements.CHECKBOX_TYPE}`).check({ force: true });
				});
			});
		_modalView.findModal().findCheckBox_byLabel('BoQ', 'checkbox').check({ force: true });
		_modalView.findModal().findCheckBox_byLabel('Line Item Selection Statement', 'checkbox').check({ force: true });
		_modalView.findModal().findCheckBox_byLabel('COS Instance Headers', 'checkbox').check({ force: true });
		_modalView.findModal().findCheckBox_byLabel('Controlling Units', 'checkbox').check({ force: true });
		_modalView.findModal().findCheckBox_byLabel('Cost Group Catalogs', 'checkbox').check({ force: true });
		_modalView.findModal().acceptButton(btn.ButtonText.NEXT);

		_modalView.findModal().findCheckBox_byLabel('Document Management', 'checkbox').check({ force: true });
		_modalView.findModal().findCheckBox_byLabel('Sales', 'checkbox').check({ force: true });
		_modalView.findModal().findCheckBox_byLabel('Tender Results', 'checkbox').check({ force: true });
		_modalView.findModal().findCheckBox_byLabel('Clerk Rights', 'checkbox').check({ force: true });
		_modalView.findModal().acceptButton(btn.ButtonText.FINISH);
		cy.contains('.spinner-lg', 'Deep Copy in Progress, this Operation may take Several Minutes', { timeout: 10000 }).should('not.exist');
	}
	enterRecord_toCreateProjectCalender(projectCalendar: string, isMandatory: string) {
		_modalView.findModalBody().findInputFieldInsideModal('Project Calendar', app.InputFields.INPUT_GROUP_CONTENT).type(projectCalendar);
		_mainView.select_popupItem('grid', projectCalendar);
		_modalView
			.findModalBody()
			.wrapElements()
			.find(commonLocators.CommonElements.CHECKBOX_TYPE)
			.as('check')
			.invoke('is', ':checked')
			.then((checked) => {
				if (isMandatory == 'check') {
					if (!checked) {
						cy.get('@check').check();
					}
				}
				if (isMandatory == 'uncheck') {
					if (checked) {
						cy.get('@check').uncheck();
					}
				}
			});
		_modalView.acceptButton('OK');
	}
	enterRecord_toUpdateProjectCalender() {
		cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, 'Update base data').within(() => {
			cy.contains('div', /^Overwrite All$/, { matchCase: true })
				.find("input[type='radio']")
				.click({ force: true });
		});
		cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, 'Update Works, Weekdays and Exceptions').within(() => {
			cy.contains('div', /^Overwrite All$/, { matchCase: true })
				.find("input[type='radio']")
				.click({ force: true });
			cy.contains('button', 'OK').click();
		});
	}

	enterRecord_toCreateNewStockLocations(container_UUID:string,data:DataCells){
		if (data[app.GridCells.CODE]) {
		  _common.enterRecord_inNewRow(container_UUID,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,data[app.GridCells.CODE])
		}
		if (data[app.GridCells.CONTROLLING_UNIT_FK]) {
		  _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.CONTROLLING_UNIT_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.CONTROLLING_UNIT_FK])
		}
		if (data[app.GridCells.DESCRIPTION]) {
		  _common.enterRecord_inNewRow(container_UUID,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,data[app.GridCells.DESCRIPTION])
		}
		
	  }

	  enterRecord_toCreateNewStorageLocations(container_UUID:string,data:DataCells){
		if (data[app.GridCells.CODE]) {
		  _common.enterRecord_inNewRow(container_UUID,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,data[app.GridCells.CODE])
		}
		if (data[app.GridCells.DESCRIPTION_INFO]) {
		  _common.enterRecord_inNewRow(container_UUID,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,data[app.GridCells.DESCRIPTION_INFO])
		}
	  }
	  
	  enterRecord_toCreateNewProjectStockMaterial(container_UUID:string,data:DataCells){
		if (data[app.GridCells.STOCK_LOCATION_FK]) {
		  _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.STOCK_LOCATION_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.STOCK_LOCATION_FK])
		}
		if (data[app.GridCells.MATERIAL_FK]) {
		  _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.MATERIAL_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.MATERIAL_FK])
		}
		if (data[app.GridCells.MIN_QUANTITY]) {
		  _common.enterRecord_inNewRow(container_UUID,app.GridCells.MIN_QUANTITY,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.MIN_QUANTITY])
		}
		if (data[app.GridCells.PROVISION_PERCENT]) {
		  _common.enterRecord_inNewRow(container_UUID,app.GridCells.PROVISION_PERCENT,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PROVISION_PERCENT])
		}
	  }

	  enterRecord_toAddressInsideModal(data:DataCells){
		if (data[commonLocators.CommonLabels.STREET]) {
			_modalView.findModalBody()
					  .findTextAreaInModal(app.InputFields.DOMAIN_TYPE_COMMENT)
					  .eq(0)
					  .clear()
					  .type(data[commonLocators.CommonLabels.STREET])
		}
		if (data[commonLocators.CommonLabels.ZIP_CODE]) {
		  _modalView.findModal()
					.findInputFieldInsideModal(commonLocators.CommonLabels.ZIP_CODE,app.InputFields.DOMAIN_TYPE_DESCRIPTION)
					.clear({force:true})
					.type(data[commonLocators.CommonLabels.ZIP_CODE], {force:true})
		}
		if (data[commonLocators.CommonLabels.CITY]) {
		  _modalView.findModal()
					.findInputFieldInsideModal(commonLocators.CommonLabels.CITY,app.InputFields.DOMAIN_TYPE_DESCRIPTION)
					.clear({force:true})
					.type(data[commonLocators.CommonLabels.CITY], {force:true})
		}
		if (data[commonLocators.CommonLabels.COUNTRY]) {
		  _modalView.findModal()
					.findInputFieldInsideModal(commonLocators.CommonLabels.COUNTRY,app.InputFields.INPUT_GROUP_CONTENT)
					.clear({force:true})
					.type(data[commonLocators.CommonLabels.COUNTRY], {force:true})
					.then(()=>{
					  _modalView.select_popupItem("list",data[commonLocators.CommonLabels.COUNTRY])
					})
		}
		if (data[commonLocators.CommonKeys.MANUAL_INPUT]) {
		  cy.wait(2000)
		  _modalView.findModal()
					.checkbox_inCell("platform-form-col")
					.check({force:true});
		  cy.wait(500).then(()=>{
			  _modalView.findModal()
						.findTextAreaInModal(app.InputFields.DOMAIN_TYPE_REMARK)
						.clear({force:true})
						.type(data[commonLocators.CommonKeys.MANUAL_INPUT]);
		  })        
		}
		cy.wait(500).then(()=>{
		  _modalView.findModal().acceptButton(btn.ButtonText.OK)
		})
		
	  }
}

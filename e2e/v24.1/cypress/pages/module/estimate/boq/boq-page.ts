/// <reference types="cypress" />
import Buttons from 'cypress/locators/buttons';
import { _common, _mainView, _modalView, _controllingUnit, _validate, _boqPage } from 'cypress/pages';
import { MainView } from 'cypress/pages/app/app';
import { BOQ_ROOT_ITEM } from 'cypress/pages/variables';
import { btn, app, cnt, tile, commonLocators } from '../../../../locators';
import { DataCells } from "cypress/pages/interfaces";
import { first } from 'cypress/types/lodash';

var finalBoQCode: string;
var finalEstimateCode: string;
var unitRatevalue: string;
let boqCode: string;
export class BoQPage {

	/*
* This is used to create new boq
* Updated Date: 20/12/2023
* Author : Anurag Singh
*/

	enterRecord_toCreateBoQ(container_UUID: string, data: DataCells) {
		if (data[app.GridCells.BRIEF_INFO_SMALL]) {
			_common.enterRecord_inNewRow(container_UUID, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.BRIEF_INFO_SMALL], BOQ_ROOT_ITEM);
			_common.select_activeRowInContainer(container_UUID)
			_common.waitForLoaderToDisappear()
		}
	}

	/*
   * This is used to create boq structure
   * Note have removed refresh because of which we were not able to enter data in correct position
   * If column is not visible then first set to default view and then add required column at top in scenario file
   * Updated Date: 19/12/2023
   * Author : Anurag Singh
   */

	enterRecord_toCreateBoQStructure(container_UUID: string, data: DataCells) {
		if (data[commonLocators.CommonLabels.TYPE] === commonLocators.CommonLabels.NEW_RECORD) {
			_common.waitForLoaderToDisappear()
			cy.REFRESH_CONTAINER()
			_common.waitForLoaderToDisappear()
			_common.select_allContainerData(container_UUID)
			_common.clickOn_toolbarButton(container_UUID, btn.ToolBar.ICO_TREE_EXPAND_ALL)

			_common.select_rowHasValue(container_UUID, commonLocators.CommonKeys.ROOT)
			_common.create_newRecord(container_UUID);
			_common.waitForLoaderToDisappear()
			cy.wait(1000) // This wait is added loader take time
			_mainView.findModuleClientArea()
					 .findAndShowContainer(container_UUID)
					 .findGridById(container_UUID)
					 .wrapElements()
					 .within(() => {
						cy.get(`[class*='slick-header-column indicator'] `)
						  .click()
						cy.get(`[class*='${app.SubContainerLayout.COLUMN_ID}']:contains('${commonLocators.CommonKeys.POSITION}')`)
						  .last()
						  .click()
				
						cy.wait(1000) // This wait is added loader take time
						cy.get(`.${app.SubContainerLayout.ACTIVE} div.${app.SubContainerLayout.COLUMN_ID}_${app.SubContainerLayout.INDICATOR}`)
						  .click();								
					
					});
			_common.waitForLoaderToDisappear()
			_common.select_activeRowInContainer(container_UUID)
			_common.waitForLoaderToDisappear()


			if (data[app.GridCells.BRIEF_INFO_SMALL]) {
				_common.enterRecord_inNewRow(container_UUID, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.BRIEF_INFO_SMALL]);
			}
			if (data[app.GridCells.QUANTITY_SMALL]) {
				_common.enterRecord_inNewRow(container_UUID, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.QUANTITY_SMALL]);
				_common.select_activeRowInContainer(container_UUID)
			}
			if (data[app.GridCells.PRICE_SMALL]) {
				_common.enterRecord_inNewRow(container_UUID, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.PRICE_SMALL]);
				_common.select_activeRowInContainer(container_UUID)
			}
			if (data[app.GridCells.BAS_UOM_FK]) {
				_common.edit_dropdownCellWithInput(container_UUID, app.GridCells.BAS_UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.BAS_UOM_FK])
				_common.select_activeRowInContainer(container_UUID)
			}
			if (data[app.GridCells.QUANTITY_ADJ]) {
				_common.enterRecord_inNewRow(container_UUID, app.GridCells.QUANTITY_ADJ, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.QUANTITY_ADJ]);
				_common.select_activeRowInContainer(container_UUID)
			}
			if (data[app.GridCells.PRC_STRUCTURE_FK]) {
				_common.edit_dropdownCellWithInput(container_UUID, app.GridCells.PRC_STRUCTURE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.PRC_STRUCTURE_FK])
				_common.select_activeRowInContainer(container_UUID)
			}
			if (data[app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL]) {
				_common.edit_dropdownCellWithInput(container_UUID, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL])
				_common.select_activeRowInContainer(container_UUID)
			}
			if (data[app.GridCells.EXTERNAL_CODE]) {
				_common.enterRecord_inNewRow(container_UUID, app.GridCells.EXTERNAL_CODE, app.InputFields.DOMAIN_TYPE_DESCRIPTION, data[app.GridCells.EXTERNAL_CODE]);
				_common.select_activeRowInContainer(container_UUID)
			}
			if (data[app.GridCells.IS_FIXED_PRICE]) {
				_common.set_cellCheckboxValue(container_UUID, app.GridCells.IS_FIXED_PRICE,data[app.GridCells.IS_FIXED_PRICE] );
				_common.select_activeRowInContainer(container_UUID)
			}
		}

	}

	assignRecordLevelToBoQStructure(Recording_Level: string) {
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTURES).findGrid().findActiveRow().findCell_ByIcon(app.GridCellIcons.ICO_BOQ_ITEM, 0).clickIn();
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTURES).findGrid().findActiveRow().findCell(app.GridCells.RECORDING_LEVEL);
		cy.wait(1000);
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTURES).findGrid().findActiveRow().caret().select_popupItem('grid1', Recording_Level);
		_common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTURES)
		_common.waitForLoaderToDisappear()
		cy.wait(2000); //this wait is necessary
		cy.get("body")
			.then(($body) => {
				if ($body.find(`[class*="modal-body"]`).length > 0) {
					cy.get(`button`)
						.invoke('text')
						.then((text) => {
							if (text.includes('OK')) {
								cy.get('button').contains('OK').click();
							} if (text.includes('Yes')) {
								cy.get('button').contains('Yes').click();
							}
						})
				} else {
					cy.SAVE();
				}
			});
	}

	assignRecordingLevelAtRoot(Recording_Level: string) {
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTURES).findGrid().findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, 'Root').click();
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTURES).findGrid().findActiveRow().findCell(app.GridCells.RECORDING_LEVEL);
		cy.wait(1000);
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTURES).findGrid().findActiveRow().caret().select_popupItem('grid1', Recording_Level);
		_common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTURES)
		_common.waitForLoaderToDisappear()
		cy.wait(2000); //this wait is necessary
		cy.get("body")
			.then(($body) => {
				if ($body.find(`[class*="modal-body"]`).length > 0) {
					cy.get(`button`)
						.invoke('text')
						.then((text) => {
							if (text.includes('OK')) {
								cy.get('button').contains('OK').click();
							} if (text.includes('Yes')) {
								cy.get('button').contains('Yes').click();
							}
						})
				} else {
					cy.SAVE();
				}
			});
	}


	change_boqRelationAndaqRelation(boqRelation: string) {
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS).findGrid().findActiveRow().findCell(app.GridCells.EST_QTY_REL_BOQ_FK).caret();
		_mainView.select_popupItem('span', boqRelation);
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS).findGrid().findActiveRow().findCell(app.GridCells.EST_QTY_TELAOT_FK).caret();
		_mainView.select_popupItem('span', boqRelation);
		cy.SAVE();
	}

	editBoQUnitRate_inBoQStructure(description: string, unitrate: string) {
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BIDBOQSTRUCTURE).findGrid().findCellhasValue(app.GridCells.BRIEF_INFO_SMALL, description).click();
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BIDBOQSTRUCTURE).findGrid().findActiveRow().findCell(app.GridCells.PRICE_SMALL).findTextInput(app.InputFields.INPUT_GROUP_CONTENT).type(unitrate);
		cy.SAVE();
	}

	verifyUpdated_UnitrateOfBoQStructure(description: string, unitRatevalue: string) {
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTURES).findGrid().findCell_ByIcon(app.GridCellIcons.ICO_FOLDER_DOC, 0).clickIn();
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTURES).toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR).findButton(btn.ToolBar.ICO_TREE_EXPAND_ALL).clickIn();
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTURES).findGrid().findCellhasValue(app.GridCells.BRIEF_INFO_SMALL, description).click();
		cy.REFRESH_CONTAINER();
		_mainView.findModuleClientArea()
			.findAndShowContainer(cnt.uuid.BOQ_STRUCTURES)
			.findGrid()
			.findActiveRow()
			.getCell(app.GridCells.PRICE_SMALL)
			.wrapElements()
			.then(($ele) => {
				var BoQunitRatevalue = $ele.text();
				cy.log(BoQunitRatevalue);
				expect(unitRatevalue).to.equals(BoQunitRatevalue);
			});
	}

	UpdateBoQSource(copyFrom: string, projectName: string, boqSelection: string, description: string) {
		_mainView.findCaretByLabel(copyFrom);
		_mainView.select_popupItem('grid1', 'Project BoQ');
		_mainView.findInputInContainerByLabel(cnt.uuid.BOQSOURCE, 'Project').wait(1000).clear({ force: true }).type(projectName);
		_mainView.select_popupItem('grid', projectName);
		_mainView.findInputInContainerByLabel(cnt.uuid.BOQSOURCE, 'BoQ Selection').clear().type(boqSelection);
		_mainView.select_popupItem('grid', boqSelection);
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQSOURCE).findGrid().findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, 'Root').click();
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQSOURCE).toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR).findButton(btn.ToolBar.ICO_COPY).clickIn();
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTURES).findGrid().findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, 'Root').click();
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTURES).toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR).findButton(btn.ToolBar.ICO_PASTE).clickIn();
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTURES).findGrid().findCellhasValue(app.GridCells.BRIEF_INFO_SMALL, description).click();
		cy.SAVE();
	}
	update_BoQFromWizard(value, index: number) {
		_modalView.findModal().findRadio_byLabel(value, 'radio', index);
		_modalView.findModal().acceptButton('OK');
	}

	/* entering Unit rate into Boq structure in BID */
	enter_unitRate_inToBidBoQstructure(UR: any) {
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BIDBOQSTRUCTURE).findGrid().findCell(app.GridCells.PRICE_SMALL).findTextInput(app.InputFields.INPUT_GROUP_CONTENT).type(UR);
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BIDBOQSTRUCTURE).findGrid().keyAction('{enter}');
	}

	edit_boQStructure_QuantityinWIP(qty: any) {
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTUREWIP).findGrid().findCell(app.GridCells.QUANTITY_SMALL).findTextInput(app.InputFields.INPUT_GROUP_CONTENT).type(qty);
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTUREWIP).findGrid().keyAction('{enter}');
	}
	dragDrop_sourceBoQTOBoQStructure(sourceBoQCid: string,sourceOutlineSpec:any, boqStructureCid:string,boqStructureOutlineSpec:any) {
		cy.wait(1000);
		cy.get('.cid_' + boqStructureCid + ' '+commonLocators.CommonElements.GRID_CONTAINER+' .'+commonLocators.CommonElements.COLUMN_ID+ app.GridCells.BOQ_LINE_TYPE_FK)
			.contains(boqStructureOutlineSpec)
			.click();
		cy.get('.cid_' + boqStructureCid +" "+commonLocators.CommonElements.GRID_CONTAINER+" "+commonLocators.CommonElements.ACTIVE+" ."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.BRIEF_INFO_SMALL).click();

		if (sourceOutlineSpec == commonLocators.CommonKeys.ROOT || sourceOutlineSpec == commonLocators.CommonKeys.LEVEL_1 || sourceOutlineSpec == commonLocators.CommonKeys.LEVEL_2) {
			cy.get('.cid_' + sourceBoQCid +' '+commonLocators.CommonElements.GRID_CONTAINER+' .'+commonLocators.CommonElements.COLUMN_ID+ app.GridCells.BOQ_LINE_TYPE_FK)
				.contains(sourceOutlineSpec)
				.as('Drag');
			cy.get('.cid_' + boqStructureCid + ' '+commonLocators.CommonElements.GRID_CONTAINER+' .'+commonLocators.CommonElements.COLUMN_ID+ app.GridCells.BOQ_LINE_TYPE_FK)
				.contains(boqStructureOutlineSpec)
				.first()
				.as('Drop');
			_mainView.dragAndDrop('@Drag', '@Drop');
		} else {
			cy.get('.cid_' + sourceBoQCid + ' '+commonLocators.CommonElements.GRID_CONTAINER+' .'+commonLocators.CommonElements.COLUMN_ID+app.GridCells.BRIEF_INFO_SMALL)
				.contains(sourceOutlineSpec)
				.as('Drag');
			cy.get('.cid_' + boqStructureCid + ' '+commonLocators.CommonElements.GRID_CONTAINER+' .'+commonLocators.CommonElements.COLUMN_ID+app.GridCells.BOQ_LINE_TYPE_FK)
				.contains(boqStructureOutlineSpec)
				.first()
				.as('Drop');
			_mainView.dragAndDrop('@Drag', '@Drop');
		}

		
	  }
	/* Entering fields into source BOQ*/
	search_recordingUnderSourceBoQ(container_UUID: string, targetcontainer_UUID: string, copyFrom: string, wicGroup: string, projectName: string, boqSelection: string, searchValueSource: string, targetBOQValue: string,value?:string, containername?: string) {
		switch (copyFrom) {
			//WIC BoQ
			case 'WIC BoQ':
				_common.maximizeContainer(container_UUID)
				_common.waitForLoaderToDisappear()
				_common.clear_subContainerFilter(container_UUID);
				_common.waitForLoaderToDisappear()
				_mainView.findModuleClientArea()
						 .findAndShowContainer(container_UUID)
						 .findCaretByLabel('Copy From')
						 .then(()=>{
							_mainView.select_popupItem('grid1', 'WIC BoQ');
						 })
				_mainView.findInputInContainerByLabel(container_UUID, 'WIC Group')
						 .clear()
						 .type(wicGroup)
						 .then(()=>{
							_common.waitForLoaderToDisappear()
							_mainView.select_popupItem('grid', wicGroup);
						 })
				_mainView.findInputInContainerByLabel(container_UUID, 'BoQ Selection')
						 .clear()
						 .type(boqSelection)
						 .then(()=>{
							_mainView.select_popupItem('grid', boqSelection);
						 })
				_common.waitForLoaderToDisappear()
				_common.clear_subContainerFilter(container_UUID);
				_common.search_inSubContainer(container_UUID, searchValueSource);
				_common.clear_subContainerFilter(container_UUID);
				_common.search_inSubContainer(container_UUID, searchValueSource);
				_common.waitForLoaderToDisappear()
				_common.clickOn_toolbarButton(container_UUID,btn.ToolBar.ICO_TREE_EXPAND_ALL);
				_common.waitForLoaderToDisappear()
				_mainView.findModuleClientArea()
						 .findAndShowContainer(container_UUID)
						 .findGrid().findCellhasValue(app.GridCells.BRIEF_INFO_SMALL, searchValueSource)
						 .click({ force: true });
				if(value){
					_common.select_rowHasValue(container_UUID,value)
				}
				_mainView.findModuleClientArea()
						 .findAndShowContainer(container_UUID)
						 .toolbar(btn.ToolBar.ICO_COPY)
						 .clickIn();
				_common.minimizeContainer(container_UUID)
				_common.waitForLoaderToDisappear()
				if (containername) {
					_common.saveCellDataToEnv(targetcontainer_UUID, app.GridCells.BRIEF_INFO_SMALL, 'OUTSPEC');
					_common.saveCellDataToEnv(targetcontainer_UUID, app.GridCells.BAS_UOM_FK, 'UOM');
				}
				_common.select_tabFromFooter(targetcontainer_UUID, app.FooterTab.BOQ_STRUCTURE);
				_mainView.findModuleClientArea()
						 .findAndShowContainer(targetcontainer_UUID)
						 .findGrid()
						 .findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, targetBOQValue)
						 .click({ force: true });
				_mainView.findModuleClientArea()
					     .findAndShowContainer(targetcontainer_UUID)
						 .toolbar(btn.ToolBar.ICO_PASTE)
						 .clickIn();
			break;
			//Project BoQ
			case 'Project BoQ':
				_mainView.findModuleClientArea().findAndShowContainer(container_UUID);
				_mainView.findCaretByLabel('Copy From');
				_mainView.select_popupItem('grid1', 'Project BoQ');

				_mainView.findInputInContainerByLabel(container_UUID, 'Project')
						 .clear()
						 .type(projectName)
						 .then(()=>{
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
							_mainView.findInputInContainerByLabel(container_UUID, 'Project')
									 .clear()
									 .type(projectName)
									 .then(()=>{
										_common.waitForLoaderToDisappear()
										_mainView.select_popupItem('grid', projectName);
									 })
						 })
						 
				_mainView.findInputInContainerByLabel(container_UUID, 'BoQ Selection').clear().type(boqSelection);
				_mainView.select_popupItem('grid', boqSelection);
				_common.search_inSubContainer(container_UUID, searchValueSource);
				_common.waitForLoaderToDisappear()
				_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findCellhasValue(app.GridCells.BRIEF_INFO_SMALL, searchValueSource).click({ force: true });
				_common.search_inSubContainer(container_UUID, searchValueSource);
				_common.waitForLoaderToDisappear()
				_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findCellhasValue(app.GridCells.BRIEF_INFO_SMALL, searchValueSource).click({ force: true });
				_mainView.findModuleClientArea().findAndShowContainer(container_UUID).toolbar(btn.ToolBar.ICO_COPY).clickIn();
				_mainView.findModuleClientArea().findAndShowContainer(targetcontainer_UUID).findGrid().findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, targetBOQValue).click({ force: true });
				_mainView.findModuleClientArea().findAndShowContainer(targetcontainer_UUID).toolbar(btn.ToolBar.ICO_PASTE).clickIn();
				break;
			//Package BOQ
			case 'Package BOQ':
				_mainView.findModuleClientArea().findAndShowContainer(container_UUID);
				_mainView.findCaretByLabel('Copy From');
				_mainView.select_popupItem('grid1', 'Package BOQ');
				_mainView.findInputInContainerByLabel(container_UUID, 'Project').clear().type(projectName);
				_common.waitForLoaderToDisappear()
				_mainView.select_popupItem('grid', projectName);
				_mainView.findInputInContainerByLabel(container_UUID, 'BoQ Selection').clear().type(boqSelection);
				_common.waitForLoaderToDisappear()
				_mainView.select_popupItem('grid', boqSelection);
				_common.waitForLoaderToDisappear()
				_common.search_inSubContainer(container_UUID, searchValueSource);
				_common.waitForLoaderToDisappear()
				_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findCellhasValue(app.GridCells.BRIEF_INFO, searchValueSource).click({ force: true });
				_common.search_inSubContainer(container_UUID, searchValueSource);
				_common.waitForLoaderToDisappear()
				_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findCellhasValue(app.GridCells.BRIEF_INFO, searchValueSource).click({ force: true });
				_mainView.findModuleClientArea().findAndShowContainer(container_UUID).toolbar(btn.ToolBar.ICO_COPY).clickIn();
				_mainView.findModuleClientArea().findAndShowContainer(targetcontainer_UUID).findGrid().findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, targetBOQValue).click({ force: true });
				_mainView.findModuleClientArea().findAndShowContainer(targetcontainer_UUID).toolbar(btn.ToolBar.ICO_PASTE).clickIn();
				break;
			//Procurement Contract BoQ
			case 'Procurement Contract BoQ':
				_mainView.findModuleClientArea().findAndShowContainer(container_UUID);
				_mainView.findCaretByLabel('Copy From');
				_mainView.select_popupItem('grid1', 'Procurement Contract BoQ');
				_mainView.findInputInContainerByLabel(container_UUID, 'Project').clear().type(projectName);
				_common.waitForLoaderToDisappear()
				_mainView.select_popupItem('grid', projectName);
				_mainView.findInputInContainerByLabel(container_UUID, 'BoQ Selection').clear().type(boqSelection);
				_mainView.select_popupItem('grid', boqSelection);

				_common.maximizeContainer(container_UUID);
				_common.search_inSubContainer(container_UUID, searchValueSource);
				_common.waitForLoaderToDisappear()
				_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findCellhasValue(app.GridCells.BRIEF_INFO, searchValueSource).click({ force: true });
				_common.search_inSubContainer(container_UUID, searchValueSource);
				_common.waitForLoaderToDisappear()
				_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findCellhasValue(app.GridCells.BRIEF_INFO, searchValueSource).click({ force: true });
				_common.minimizeContainer(container_UUID);

				_mainView.findModuleClientArea().findAndShowContainer(container_UUID).toolbar(btn.ToolBar.ICO_COPY).clickIn();
				_common.clear_subContainerFilter(targetcontainer_UUID);
				_mainView.findModuleClientArea().findAndShowContainer(targetcontainer_UUID).findGrid().findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, targetBOQValue).click({ force: true });
				_mainView.findModuleClientArea().findAndShowContainer(targetcontainer_UUID).toolbar(btn.ToolBar.ICO_PASTE).clickIn();
				break;
			default:
				cy.log('Copy Value not present');
		}
	}

	verifyCorrectedURGross_InProjectBoQ(container_UUID: string, gridcell: string, corrected_URGross: string) {
		cy.wait(1000);
		cy.REFRESH_CONTAINER();
		cy.wait(1000);
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, 'Position').click();
		_mainView.findModuleClientArea()
			.findAndShowContainer(container_UUID)
			.findGrid()
			.findActiveRow()
			.getCell(gridcell)
			.wrapElements()
			.then(($ele) => {
				var correctedUR = $ele.text();
				var expectedCorrectedUR = correctedUR.split('.');
				var CorrectedURValue;
				CorrectedURValue = expectedCorrectedUR[0];
				cy.log(CorrectedURValue);
				expect(CorrectedURValue).to.equals(corrected_URGross);
			});
	}

	click_OnDivision(container_UUID: string, boqLineType: string) {
		cy.wait(4000);
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, boqLineType).click();
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findButton(btn.ToolBar.ICO_TREE_EXPAND_ALL).clickIn();
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findButton(btn.IconButtons.ICO_FLD_INS_BELOW).clickIn();
		cy.wait(1000);
	}

	click_OnSubDivision(container_UUID: string, boqLineType: string) {
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, 'Root').click();
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findButton(btn.ToolBar.ICO_TREE_EXPAND_ALL).clickIn();
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, boqLineType).click();
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findButton(btn.ToolBar.ICO_TREE_EXPAND_ALL).clickIn();
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findButton(btn.IconButtons.ICO_SUB_FLD_NEW).clickIn();
		cy.wait(1000);
	}
	dragDrop_SourceBoQToBoQStructure(sourceBoQCid: string, boqStructureCid: string, copyFrom: string, wicGroup: string, boqSelection: string, sourceOutlineSpec: string, boqStructureLineType: string,sourceBoQCOlumns?:any) {
		switch (copyFrom) {
			case 'WIC BoQ':
				_mainView.findModuleClientArea().findAndShowContainer(sourceBoQCid).findCaretByLabel('Copy From');
				_mainView.select_popupItem('grid1', copyFrom);
				if (wicGroup) {
				_mainView.findInputInContainerByLabel(sourceBoQCid, 'WIC Group').clear().type(wicGroup);
				cy.wait(500);

				_mainView.select_popupItem('grid', wicGroup);
				}
				_mainView.findInputInContainerByLabel(sourceBoQCid, 'BoQ Selection').clear().type(boqSelection);
				_mainView.select_popupItem('grid', boqSelection);

				if (sourceBoQCOlumns) {
					_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
						_common.setup_gridLayout(cnt.uuid.BOQSOURCE, sourceBoQCOlumns)
					})
				}
				
				_common.waitForLoaderToDisappear()

				_common.search_inSubContainer(sourceBoQCid, sourceOutlineSpec);

				cy.wait(5000);
				cy.get('.cid_' + boqStructureCid + ' .grid-container .column-id_' + app.GridCells.BOQ_LINE_TYPE_FK)
					.contains(boqStructureLineType)
					.click();
				cy.get('.cid_' + boqStructureCid + " .grid-container [class*='active'] .column-id_" + app.GridCells.BRIEF_INFO_SMALL).click();

				if (sourceOutlineSpec == 'Root' || sourceOutlineSpec == 'Level 1' || sourceOutlineSpec == 'Level 2') {
					cy.get('.cid_' + sourceBoQCid + ' .grid-container .column-id_' + app.GridCells.BOQ_LINE_TYPE_FK)
						.contains(sourceOutlineSpec)
						.as('Drag');
					cy.get('.cid_' + boqStructureCid + ' .grid-container .column-id_' + app.GridCells.BOQ_LINE_TYPE_FK)
						.contains(boqStructureLineType)
						.first()
						.as('Drop');
					_mainView.dragAndDrop('@Drag', '@Drop');
				} else {
					cy.get('.cid_' + sourceBoQCid + ' .grid-container .column-id_' + app.GridCells.BRIEF_INFO_SMALL)
						.contains(sourceOutlineSpec)
						.as('Drag');
					cy.get('.cid_' + boqStructureCid + ' .grid-container .column-id_' + app.GridCells.BOQ_LINE_TYPE_FK)
						.contains(boqStructureLineType)
						.first()
						.as('Drop');
					_mainView.dragAndDrop('@Drag', '@Drop');
				}

				break;
				
		}
	}

	selectAssignedSourceUnderBoQStructureViaWIC(wicGroup: string, wicCatalog: string, outLineSpec: string) {
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.WIC_GROUPS).findGrid().findCellhasValue(app.GridCells.CODE, wicGroup).click();
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.WIC_CATALOGUES).findGrid().findCellhasValue(app.GridCells.REFERENCE, wicCatalog, BOQ_ROOT_ITEM).click();
		_common.clickOn_toolbarButton(cnt.uuid.WIC_CATALOGUES, btn.IconButtons.ICO_GO_TO);
		cy.wait(2000);
		_common.search_inSubContainer(cnt.uuid.BOQ_STRUCTURES, outLineSpec);
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTURES).findGrid().findCellhasValue(app.GridCells.BRIEF_INFO_SMALL, outLineSpec).click();
		cy.wait(2000);
	}

	delete_AllAssemblyAssignments() {
		cy.wait(1000);
		_common.select_allContainerData(cnt.uuid.ASSEMBLY_ASSIGNMENT);
		cy.wait(1000);
		_mainView
			.findModuleClientArea()
			.findAndShowContainer(cnt.uuid.ASSEMBLY_ASSIGNMENT)
			.findButton(btn.IconButtons.ICO_REC_DELETE)
			.wrapElements()
			.as('Delete')
			.invoke('attr', 'disabled')
			.then((disabled) => {
				disabled ? cy.log('buttonIsDiabled') : cy.get('@Delete').click();
			});
		cy.SAVE();
	}

	create_AssemblyAssignment(qty: string, takeOverMode: string, assemblyCode: string) {
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ASSEMBLY_ASSIGNMENT).findGrid().findActiveRow().findCell(app.GridCells.WIC_2_ASSEMBLY_QUANTITY).typeIn(qty);
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ASSEMBLY_ASSIGNMENT).findGrid().findActiveRow().findCell(app.GridCells.WIC_EST_ASSEMBLY_2_WIC_FLAG_FK).caret();
		_mainView.select_popupItem('list', takeOverMode);
		cy.get("[class^='required-cell']").click({ force: true });
		cy.wait(8000)
		cy.get("[class^='input-group-content']").type(assemblyCode);
		// _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ASSEMBLY_ASSIGNMENT).findGrid().findActiveRow().getCell(app.GridCells.EST_LINE_ITEM_FK).clickIn()
		//  _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ASSEMBLY_ASSIGNMENT).findGrid().findActiveRow().getCell(app.GridCells.EST_LINE_ITEM_FK).typeIn(assemblyCode)
		 _mainView.select_popupItem('grid', assemblyCode);
	}

	select_BoQUnderEstimateByBoQ(outLineSpec: string) {
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ESTIMATE_BOQS).findGrid().findCellhasValue(app.GridCells.BRIEF_INFO_SMALL, outLineSpec).click();
		cy.wait(1000);
	}

	dragDrop_RelatedAssemblyToLineItem(relatedAssemblyCid: string, lineItemCid: string, assemblyCode: string) {
		cy.get('.cid_' + relatedAssemblyCid + ' .grid-container div.column-id_estlineitemfk')
			.click()
			.as('Drag');
		cy.get('.cid_' + lineItemCid + " .grid-container [id*='indicator']").click();
		cy.get('.cid_' + lineItemCid + " .grid-container [id*='indicator']")
			.first()
			.as('Drop');
		_mainView.dragAndDrop('@Drag', '@Drop');
	}

	get_BoQsFinalPrice() {
		cy.wait(1000);
		_mainView
			.findModuleClientArea()
			.findAndShowContainer(cnt.uuid.BOQ_STRUCTURES)
			.findGrid()
			.findActiveRow()
			.getCell(app.GridCells.FINAL_PRICE_SMALL)
			.wrapElements()
			.then(($val) => {
				Cypress.env('BoQsFinalPrice', $val.text());
			});
	}

	enterRecord_toCreateBoQStructureUnderpackage(container_UUID: string, boqOutLineSpecification: string, quantity: string, unitRate: string, uom: string) {
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, 'Root').click();
		_common.create_newRecord(container_UUID);
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findButton(btn.ToolBar.ICO_TREE_EXPAND_ALL).clickIn();
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGridById(container_UUID).wrapElements().within(() => {
						cy.get(`[class*='slick-header-column indicator'] `)
						  .click()
						cy.get(`[class*='${app.SubContainerLayout.COLUMN_ID}']:contains('${commonLocators.CommonKeys.POSITION}')`)
						  .last()
						  .click()
						  cy.wait(1000) // This wait is added loader take time
						  cy.get(`.${app.SubContainerLayout.ACTIVE} div.${app.SubContainerLayout.COLUMN_ID}_${app.SubContainerLayout.INDICATOR}`)
							.click();		
					 })
		_common.enterRecord_inNewRow(container_UUID, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, boqOutLineSpecification);
		_common.enterRecord_inNewRow(container_UUID, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, quantity);
		_common.enterRecord_inNewRow(container_UUID, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, unitRate);
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findActiveRow().findCell(app.GridCells.BAS_UOM_FK).findTextInput(app.InputFields.INPUT_GROUP_CONTENT).type(uom);
		_mainView.select_popupItem(commonLocators.CommonKeys.GRID, uom);
	}

	/* entering details to create procurement BoQs */
	enterRecord_ToCreate_procurementBoQs(subpackage: string, outlineSpecification: string, createnewboqradiolable?: string) {
		_modalView.findModal().findInputFieldInsideModal('Sub Package', app.InputFields.INPUT_GROUP_CONTENT).type(subpackage);
		_modalView.findModal().select_popupItem('list', subpackage);
		cy.wait(1000);
		if (createnewboqradiolable) {
			_modalView
				.findModal()
				.wrapElements()
				.then(() => {
					cy.contains('label', createnewboqradiolable).parent('div').find(`input${commonLocators.CommonElements.RADIO_INPUT}`).check({ force: true });
				});
			_modalView.findModal().findInputFieldInsideModal('Outline Specification', app.InputFields.FORM_CONTROL).type(outlineSpecification);
		}
		_modalView.findModal().acceptButton('OK');
	}

	Requisitionlookupbutton() {
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.REQUISITION_IN_RFQ).findGrid().findActiveRow().findCell(app.GridCells.REQ_HEADER_FK).clickIn();

		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.REQUISITION_IN_RFQ).findGrid().findActiveRow().findButton(btn.IconButtons.ICO_INPUT_LOOKUP).clickIn();
		cy.wait(1000);
	}

	enterRecord_AssignRequisition(Requisitins: string) {
		cy.contains('.modal-content', 'Look Up Requisition').within(() => {
			cy.wait(1000);
			cy.get(`[title="search"]`).click();
			cy.contains(Requisitins).click();
			cy.contains('button', 'OK').click();
		});
	}
	enterRecord_toCreateAAN(container_UUID: string, boqOutLineSpecification1: string, agninput: any, boqOutLineSpecification2: string) {
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, 'Root').click();
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).toolbar(btn.ToolBar.ICO_REC_NEW).clickIn();
		cy.wait(500);
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, 'Position').click();
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findActiveRow().findCell(app.GridCells.BRIEF_INFO_SMALL).findTextInput(app.InputFields.DOMAIN_TYPE_TRANSLATION).type(boqOutLineSpecification1);
		_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findActiveRow().findCell(app.GridCells.AGN).findTextInput(app.InputFields.DOMAIN_TYPE_DESCRIPTION).type(agninput);
		cy.SAVE();
		cy.wait(3000);
		_mainView
			.findModuleClientArea()
			.findAndShowContainer(container_UUID)
			.findGrid()
			.findActiveRow()
			.getCell(app.GridCells.AAN)
			.wrapElements()
			.then(($cell) => {
				const initialValue = parseInt($cell.text().trim());
				for (let i = 0; i < 3; i++) {
					_mainView.findModuleClientArea().findAndShowContainer(container_UUID).toolbar(btn.ToolBar.ICO_REC_NEW).clickIn();
					cy.wait(500);
					_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findActiveRow().findCell(app.GridCells.BRIEF_INFO_SMALL).findTextInput(app.InputFields.DOMAIN_TYPE_TRANSLATION).type(boqOutLineSpecification2);
					_mainView.findModuleClientArea().findAndShowContainer(container_UUID).findGrid().findActiveRow().findCell(app.GridCells.AGN).findTextInput(app.InputFields.DOMAIN_TYPE_DESCRIPTION).type(agninput);
					cy.SAVE();
					cy.wait(3000);
					_mainView
						.findModuleClientArea()
						.findAndShowContainer(container_UUID)
						.findGrid()
						.findActiveRow()
						.getCell(app.GridCells.AAN)
						.wrapElements()
						.then(($cell) => {
							const updatedValue = parseInt($cell.text().trim());
							const expectedValue = initialValue + 2 * (i + 1);
							expect(updatedValue).to.equal(expectedValue);
						});
				}
			});
	}

	renumberBoQ_fromWizard(uuid: string, data: DataCells) {
		_modalView.findModal()
			.findCaretInsideModal(commonLocators.CommonLabels.SELECTION)
		_modalView.select_popupItem("grid1", data[commonLocators.CommonLabels.SELECTION])
		_modalView.findModal()
			.label("Structure Details")
		_modalView.findModal()
		cy.get(commonLocators.CommonElements.SUBCONTAINER_INMODEL).within(() => {
			cy.get(commonLocators.CommonElements.LINE_TYPE).contains(data[commonLocators.CommonElements.LINE_TYPE]).click()
			cy.get(commonLocators.CommonElements.START_VALUE).type(`{selectall}{backspace}`).then(() => {
				cy.get(`div.column-id_val input`).type(data[commonLocators.CommonElements.START_VALUE])
			})
			cy.wait(500)

		})
		_modalView.findModal()
				  .acceptButton(btn.ButtonText.RENUMBER)
		cy.wait(2000)    
	   _mainView.findModuleClientArea()
				 .findAndShowContainer(uuid)
				 .findGrid()
				 .getCell(app.GridCells.TREE)
				 .wrapElements()
				 .find(commonLocators.CommonElements.BOQ_ITEM_ICON)
				 .each(($value,index,$list)=>{ 
					let referenceNo = parseInt(data[commonLocators.CommonElements.START_VALUE]) + parseInt(data[commonLocators.CommonElements.STEP_INC])*index 
					let referenceNo1 = referenceNo.toString() 
					   cy.wait(1000)                        
					   _common.clickOn_cellHasUniqueValue(uuid,app.GridCells.BRIEF_INFO_SMALL,data[app.GridCells.BRIEF_INFO_SMALL][index])
					  _common.getText_fromCell(uuid,app.GridCells.REFERENCE).then((text)=>{
						let value= text.text().replace(/^10\.10\.\s*(\d+)\./,"$1")
						expect(referenceNo1).to.equals(value);
					
					  })              
				 })    
	  
	  }

	  enterRecord_toUpdateVersionBoQ(data: DataCells) {
		_common.waitForLoaderToDisappear()
		_modalView.findModal().checkbox_inCell(app.GridCells.IS_CHECKED).check()
		cy.wait(1000)
		if (data[commonLocators.CommonLabels.REQUISITION]) {
			_modalView.findModal().findCheckbox_byLabelnModal("ms-checkbox-multi-select", data[commonLocators.CommonLabels.REQUISITION], 0).check({force:true})
		}
		if (data[commonLocators.CommonLabels.CONTRACT]) {
			_modalView.findModal().findCheckbox_byLabelnModal("ms-checkbox-multi-select", data[commonLocators.CommonLabels.CONTRACT], 0).check({force:true})
		}
		if (data[commonLocators.CommonLabels.QUOTATION]) {
			_modalView.findModal().findCheckbox_byLabelnModal("ms-checkbox-multi-select", data[commonLocators.CommonLabels.QUOTATION], 0).check({force:true})
		}
		if (data[commonLocators.CommonLabels.PES]) {
			_modalView.findModal().findCheckbox_byLabelnModal("ms-checkbox-multi-select", data[commonLocators.CommonLabels.PES], 0).check({force:true})
		}
		_modalView.acceptButton(btn.ButtonText.UPDATE)
		cy.wait(1000)
		_validate.validate_Text_message_In_PopUp("Version BoQ has been updated successfully!")
		cy.wait(1000)
		_modalView.acceptButton(btn.ButtonText.OK)
	}

	getCode_fromQuoteModal(envName: string) {
		cy.wait(1000)
		cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " [class*='icon-message']").then(($value) => {
			var str = ($value.text()).replace(" ", "")
			console.log(str)
			var splitted = str.split(":", 2);
			console.log(splitted[1])
			Cypress.env(envName, (splitted[1].replace(/'/g, "")).replace(/^\s+|\s+$/g, ""))
		})
	}

	selectRecord_forSourceBoQ(container_UUID: string, data: DataCells) {
		switch (data[commonLocators.CommonLabels.COPY_FROM]) {
			case "WIC BoQ":
				_mainView.findModuleClientArea()
					.findAndShowContainer(container_UUID)
					.findCaretByLabel(commonLocators.CommonLabels.COPY_FROM)
				_mainView.select_popupItem("grid1", data[commonLocators.CommonLabels.COPY_FROM]);
				_mainView.findInputInContainerByLabel(container_UUID, commonLocators.CommonLabels.WIC_GROUP)
					.clear()
					.type(data[commonLocators.CommonLabels.WIC_GROUP]);
				cy.wait(500);
				_mainView.select_popupItem("grid", data[commonLocators.CommonLabels.WIC_GROUP]);
				_mainView.findInputInContainerByLabel(container_UUID, commonLocators.CommonLabels.BOQ_SELECTION)
					.clear()
					.type(data[commonLocators.CommonLabels.BOQ_SELECTION]);
				_mainView.select_popupItem("grid", data[commonLocators.CommonLabels.BOQ_SELECTION]);
				break;
			case "Project BoQ":
				_mainView.findModuleClientArea()
					.findAndShowContainer(container_UUID)
					.findCaretByLabel(commonLocators.CommonLabels.COPY_FROM)
				_mainView.select_popupItem("grid1", data[commonLocators.CommonLabels.COPY_FROM]);
				_mainView.findInputInContainerByLabel(container_UUID, commonLocators.CommonLabels.PROJECT)
					.clear()
					.type(data[commonLocators.CommonLabels.PROJECT]);
				cy.wait(500);
				_mainView.select_popupItem("grid", data[commonLocators.CommonLabels.PROJECT]);
				_mainView.findInputInContainerByLabel(container_UUID, commonLocators.CommonLabels.BOQ_SELECTION)
					.clear()
					.type(data[commonLocators.CommonLabels.BOQ_SELECTION]);
				_mainView.select_popupItem("grid", data[commonLocators.CommonLabels.BOQ_SELECTION]);
				break;

				case "Package BoQ":
				_mainView.findModuleClientArea()
					.findAndShowContainer(container_UUID)
					.findCaretByLabel(commonLocators.CommonLabels.COPY_FROM)
				_mainView.select_popupItem("grid1", data[commonLocators.CommonLabels.COPY_FROM]);
				_mainView.findInputInContainerByLabel(container_UUID, commonLocators.CommonLabels.PROJECT)
					.clear()
					.type(data[commonLocators.CommonLabels.PROJECT]);
				cy.wait(500);
				_mainView.select_popupItem("grid", data[commonLocators.CommonLabels.PROJECT]);
				_mainView.findInputInContainerByLabel(container_UUID, commonLocators.CommonLabels.BOQ_SELECTION)
					.clear()
					.type(data[commonLocators.CommonLabels.BOQ_SELECTION]);
				_mainView.select_popupItem("grid", data[commonLocators.CommonLabels.BOQ_SELECTION]);
				break;
			case data[commonLocators.CommonLabels.COPY_FROM]:
				_mainView.findModuleClientArea()
					.findAndShowContainer(container_UUID)
					.findCaretByLabel(commonLocators.CommonLabels.COPY_FROM)
				_mainView.select_popupItem("grid1", data[commonLocators.CommonLabels.COPY_FROM]);
				_mainView.findInputInContainerByLabel(container_UUID, commonLocators.CommonLabels.PROJECT)
					.clear()
					.type(data[commonLocators.CommonLabels.PROJECT]);
				cy.wait(500);
				_mainView.select_popupItem("grid", data[commonLocators.CommonLabels.PROJECT]);
				_mainView.findInputInContainerByLabel(container_UUID, commonLocators.CommonLabels.BOQ_SELECTION)
					.clear()
					.type(data[commonLocators.CommonLabels.BOQ_SELECTION]);
				_mainView.select_popupItem("grid", data[commonLocators.CommonLabels.BOQ_SELECTION]);
				break;
		}
	}

	create_WICfromBoQ_fromWizard(data: DataCells) {
		_common.waitForLoaderToDisappear()
		if (data[commonLocators.CommonLabels.SOURCE_BOQ]) {
			_modalView.findModal()
				.findCaretInsideModal(commonLocators.CommonLabels.SOURCE_BOQ)
				.then(() => {
					_modalView.select_popupItem("grid", data[commonLocators.CommonLabels.SOURCE_BOQ])
				})
		}
		if (data[commonLocators.CommonLabels.TARGET_WIC_GROUP]) {
			_modalView.findModal()
				.findInputFieldInsideModal(commonLocators.CommonLabels.TARGET_WIC_GROUP, app.InputFields.INPUT_GROUP_CONTENT)
				.clear()
				.type(data[commonLocators.CommonLabels.TARGET_WIC_GROUP])
				.then(() => {
					_modalView.select_popupItem("grid", data[commonLocators.CommonLabels.TARGET_WIC_GROUP])
				})
		}
		if (data[commonLocators.CommonLabels.REFERENCE_NO]) {
			_modalView.findModal()
				.findInputFieldInsideModal(commonLocators.CommonLabels.REFERENCE_NO, app.InputFields.DOMAIN_TYPE_CODE)
				.clear()
				.type(data[commonLocators.CommonLabels.REFERENCE_NO])
		}
		if (data[commonLocators.CommonLabels.OUTLINE_SPECIFICATION]) {
			_modalView.findModal()
				.findInputFieldInsideModal(commonLocators.CommonLabels.OUTLINE_SPECIFICATION, app.InputFields.DOMAIN_TYPE_DESCRIPTION)
				.clear()
				.type(data[commonLocators.CommonLabels.OUTLINE_SPECIFICATION])
		}
		_common.clickOn_modalFooterButton(btn.ButtonText.CREATE)
		_common.waitForLoaderToDisappear()
		_common.clickOn_modalFooterButton(btn.ButtonText.OK)
		_common.waitForLoaderToDisappear()
		_common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
		_common.waitForLoaderToDisappear()
	}

	getCode_fromMultipleQuoteModal(envName: string) {
		cy.wait(5000)
		cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " [class*='icon-message']").then(($value) => {
			var str = ($value.text()).replace(" ", "")
			console.log(str)
			var splitted = str.split(":", 2);
			console.log(splitted[1])
			let count = 1;
			for (let i = 0; i < splitted[1].length; i++) {
				if (splitted[1][i] === ",") {
					count++;
				}
			}
			var finalSplit = splitted[1].split(",", count);

			for (let i = 0; i < count; i++) {
				Cypress.env(envName + i, (finalSplit[i].replace(/'/g, "")).replace(/^\s+|\s+$/g, ""))
			}
		})
	}


	enterRecord_toCreateBoQ_fromBidModule(data: DataCells) {

		if (data[commonLocators.CommonLabels.REFERENCE_NO]) {
			_modalView.findModal()
				.findInputFieldInsideModal(commonLocators.CommonLabels.REFERENCE_NO, app.InputFields.FORM_CONTROL)
				.clear()
				.type(data[commonLocators.CommonLabels.REFERENCE_NO])
		}
		if (data[commonLocators.CommonLabels.OUTLINE_SPECIFICATION]) {
			_modalView.findModal()
				.findInputFieldInsideModal(commonLocators.CommonLabels.OUTLINE_SPECIFICATION, app.InputFields.FORM_CONTROL)
				.clear()
				.type(data[commonLocators.CommonLabels.OUTLINE_SPECIFICATION])
		}
		_common.clickOn_modalFooterButton(btn.ButtonText.OK)
	}
}

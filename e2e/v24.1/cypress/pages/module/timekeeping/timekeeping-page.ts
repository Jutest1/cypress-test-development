/// <reference types="cypress" />
import { _common, _mainView, _modalView } from 'cypress/pages';
import { btn, app, cnt, tile, commonLocators, sidebar } from 'cypress/locators';
import { DataCells } from "cypress/pages/interfaces";
import { data } from 'cypress/types/jquery';

export class TimekeepingPage {

  enterRecord_toCreateWorkingTimes(data: DataCells) {
    _common.waitForLoaderToDisappear()
    if (data[app.GridCells.ACRONYM]) {
      _common.enterRecord_inNewRow(cnt.uuid.WORKING_TIME, app.GridCells.ACRONYM, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.ACRONYM]);
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.enterRecord_inNewRow(cnt.uuid.WORKING_TIME, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }
    if (data[app.GridCells.TIME_SYMBOL_FK]) {
      _common.edit_dropdownCellWithInput(cnt.uuid.WORKING_TIME, app.GridCells.TIME_SYMBOL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.TIME_SYMBOL_FK])
      _common.select_activeRowInContainer(cnt.uuid.WORKING_TIME)
    }
    if (data[app.GridCells.WEEK_DAY_FK]) {
      _common.edit_dropdownCellWithCaret(cnt.uuid.WORKING_TIME, app.GridCells.WEEK_DAY_FK, commonLocators.CommonKeys.GRID, data[app.GridCells.WEEK_DAY_FK]);
    }
    if (data[app.GridCells.DURATION]) {
      _common.enterRecord_inNewRow(cnt.uuid.WORKING_TIME, app.GridCells.DURATION, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.DURATION]);
    }
    if (data[app.GridCells.FROM_TIME]) {
      _common.edit_containerCell(cnt.uuid.WORKING_TIME, app.GridCells.FROM_TIME, app.InputFields.DOMAIN_TYPE_TIME, data[app.GridCells.FROM_TIME]);
    }
    if (data[app.GridCells.TO_TIME]) {
      _common.edit_containerCell(cnt.uuid.WORKING_TIME, app.GridCells.TO_TIME, app.InputFields.DOMAIN_TYPE_TIME, data[app.GridCells.TO_TIME]);
    }
    if (data[app.GridCells.BREAK_FROM]) {
      _common.edit_containerCell(cnt.uuid.WORKING_TIME, app.GridCells.BREAK_FROM, app.InputFields.DOMAIN_TYPE_TIME, data[app.GridCells.BREAK_FROM]);
    }
    if (data[app.GridCells.BREAK_TO]) {
      _common.edit_containerCell(cnt.uuid.WORKING_TIME, app.GridCells.BREAK_TO, app.InputFields.DOMAIN_TYPE_TIME, data[app.GridCells.BREAK_TO]);
    }
  }

  enterRecord_toCreateActions(data: DataCells) {
    _common.waitForLoaderToDisappear()
    if (data[app.GridCells.CODE]) {
      _common.enterRecord_inNewRow(cnt.uuid.PROJECT_ACTIONS, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE]);
    }
    if (data[app.GridCells.DESCRIPTION]) {
      _common.enterRecord_inNewRow(cnt.uuid.PROJECT_ACTIONS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, data[app.GridCells.DESCRIPTION]);
    }
    if (data[app.GridCells.CONTROLLING_UNIT_FK]) {
      _common.edit_dropdownCellWithInput(cnt.uuid.PROJECT_ACTIONS, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.CONTROLLING_UNIT_FK])
      _common.select_activeRowInContainer(cnt.uuid.PROJECT_ACTIONS)
    }
    if (data[app.GridCells.LOGISTIC_JOB_FK]) {
      _common.edit_dropdownCellWithInput(cnt.uuid.PROJECT_ACTIONS, app.GridCells.LOGISTIC_JOB_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.LOGISTIC_JOB_FK])
      _common.select_activeRowInContainer(cnt.uuid.PROJECT_ACTIONS)
    }
    if (data[app.GridCells.ACTION_TYPE_FK]) {
      _common.edit_dropdownCellWithCaret(cnt.uuid.PROJECT_ACTIONS, app.GridCells.ACTION_TYPE_FK, commonLocators.CommonKeys.LIST, data[app.GridCells.ACTION_TYPE_FK])
    }
    if (data[app.GridCells.IS_ACTIVE]) {
      _common.set_cellCheckboxValue(cnt.uuid.PROJECT_ACTIONS, app.GridCells.IS_ACTIVE, data[app.GridCells.IS_ACTIVE])
    }
    if (data[app.GridCells.ACTIVITY_FK]) {
      _common.edit_dropdownCellWithInput(cnt.uuid.PROJECT_ACTIONS, app.GridCells.ACTIVITY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.ACTIVITY_FK])
      _common.select_activeRowInContainer(cnt.uuid.PROJECT_ACTIONS)
    }
  }

  enterRecord_toCreateTimeSymbols(data: DataCells) {
    if (data[app.GridCells.CODE]) {
      _common.enterRecord_inNewRow(cnt.uuid.TIME_SYMBOLS, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE]);
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.enterRecord_inNewRow(cnt.uuid.TIME_SYMBOLS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }
    if (data[app.GridCells.IS_PRODUCTIVE]) {
      _common.set_cellCheckboxValue(cnt.uuid.TIME_SYMBOLS, app.GridCells.IS_PRODUCTIVE, data[app.GridCells.IS_PRODUCTIVE]);
    }
    if (data[app.GridCells.IS_PRESENCE]) {
      _common.set_cellCheckboxValue(cnt.uuid.TIME_SYMBOLS, app.GridCells.IS_PRESENCE, data[app.GridCells.IS_PRESENCE]);
    }
    if (data[app.GridCells.IS_OVERTIME]) {
      _common.set_cellCheckboxValue(cnt.uuid.TIME_SYMBOLS, app.GridCells.IS_OVERTIME, data[app.GridCells.IS_OVERTIME]);
    }
    if (data[app.GridCells.VALUATION_PERCENT]) {
      _common.enterRecord_inNewRow(cnt.uuid.TIME_SYMBOLS, app.GridCells.VALUATION_PERCENT, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.VALUATION_PERCENT]);
    }
    if (data[app.GridCells.VALUATION_RATE]) {
      _common.enterRecord_inNewRow(cnt.uuid.TIME_SYMBOLS, app.GridCells.VALUATION_RATE, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.VALUATION_RATE]);
    }
    if (data[app.GridCells.TIME_SYMBOL_TYPE_FK]) {
      _common.edit_dropdownCellWithCaret(cnt.uuid.TIME_SYMBOLS, app.GridCells.TIME_SYMBOL_TYPE_FK, commonLocators.CommonKeys.LIST, data[app.GridCells.TIME_SYMBOL_TYPE_FK]);
    }
    if (data[app.GridCells.TIME_SYMBOL_GROUP_FK]) {
      _common.edit_dropdownCellWithCaret(cnt.uuid.TIME_SYMBOLS, app.GridCells.TIME_SYMBOL_GROUP_FK, commonLocators.CommonKeys.LIST, data[app.GridCells.TIME_SYMBOL_GROUP_FK]);
    }
    if (data[app.GridCells.IS_EXPENSE]) {
      _common.set_cellCheckboxValue(cnt.uuid.TIME_SYMBOLS, app.GridCells.IS_EXPENSE, data[app.GridCells.IS_EXPENSE]);
    }
    if (data[app.GridCells.IS_TIME_ACCOUNT]) {
      _common.set_cellCheckboxValue(cnt.uuid.TIME_SYMBOLS, app.GridCells.IS_TIME_ACCOUNT, data[app.GridCells.IS_TIME_ACCOUNT]);
    }
    if (data[app.GridCells.IS_VACATION]) {
      _common.set_cellCheckboxValue(cnt.uuid.TIME_SYMBOLS, app.GridCells.IS_VACATION, data[app.GridCells.IS_VACATION]);
    }
    if (data[app.GridCells.IS_OFF_DAY]) {
      _common.set_cellCheckboxValue(cnt.uuid.TIME_SYMBOLS, app.GridCells.IS_OFF_DAY, data[app.GridCells.IS_OFF_DAY]);
    }
  }

  enterRecord_toPaymentGroup(container_UUID: string, data: DataCells) {
    _common.waitForLoaderToDisappear()
    if (data[app.GridCells.CODE]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE]);
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }
  }

  enterRecord_toPaymentGroupRate(container_UUID: string, data: DataCells) {
    _common.waitForLoaderToDisappear()
    if (data[app.GridCells.CONTROLLING_UNIT_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.CONTROLLING_UNIT_FK])
    }
    if (data[app.GridCells.SURCHARGE_TYPE_FK]) {
      _common.edit_dropdownCellWithCaret(container_UUID, app.GridCells.SURCHARGE_TYPE_FK, commonLocators.CommonKeys.LIST_EXACT, data[app.GridCells.SURCHARGE_TYPE_FK])
    }
    if (data[app.GridCells.RATE]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.RATE, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.RATE]);
    }
    if (data[app.GridCells.COMMENT_TEXT]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.COMMENT_TEXT, app.InputFields.DOMAIN_TYPE_COMMENT, data[app.GridCells.COMMENT_TEXT]);
    }
  }

  enterRecord_toShiftModal(container_UUID: string, data: DataCells) {
    _common.waitForLoaderToDisappear()
    if (data[app.GridCells.CALENDAR_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.CALENDAR_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.CALENDAR_FK])
      _common.select_activeRowInContainer(container_UUID)
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }
  }

    enterRecord_toAccountAllocationRules(container_UUID:string,data: DataCells){
      _common.waitForLoaderToDisappear()
      if (data[app.GridCells.COMPANY_CHARGED_FK]) {
        _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.COMPANY_CHARGED_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.COMPANY_CHARGED_FK])
        _common.select_activeRowInContainer(container_UUID)
      }
      if (data[app.GridCells.CONTROLLING_UNIT_FK]) {
        _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.CONTROLLING_UNIT_FK])
        _common.select_activeRowInContainer(container_UUID)
      }
      if (data[app.GridCells.SURCHARGE_TYPE_FK]) {    
        _common.edit_dropdownCellWithCaret(container_UUID,app.GridCells.SURCHARGE_TYPE_FK,commonLocators.CommonKeys.LIST,data[app.GridCells.SURCHARGE_TYPE_FK])
      }
      if (data[app.GridCells.ACCOUNT_COST_FK]) {    
        _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.ACCOUNT_COST_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.ACCOUNT_COST_FK])
      }
      if (data[app.GridCells.ACCOUNT_REV_FK]) {    
        _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.ACCOUNT_REV_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.ACCOUNT_REV_FK])
      }
      if(data[app.GridCells.NOMINAL_DIMENSION1_COST]){
        _common.enterRecord_inNewRow(container_UUID,app.GridCells.NOMINAL_DIMENSION1_COST,app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.NOMINAL_DIMENSION1_COST]);
      }
      if(data[app.GridCells.NOMINAL_DIMENSION2_COST]){
        _common.enterRecord_inNewRow(container_UUID,app.GridCells.NOMINAL_DIMENSION2_COST,app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.NOMINAL_DIMENSION2_COST]);
      }
      if(data[app.GridCells.NOMINAL_DIMENSION3_COST]){
       _common.enterRecord_inNewRow(container_UUID,app.GridCells.NOMINAL_DIMENSION3_COST,app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.NOMINAL_DIMENSION3_COST]);
      }
      if(data[app.GridCells.NOMINAL_DIMENSION1_REV]){
        _common.enterRecord_inNewRow(container_UUID,app.GridCells.NOMINAL_DIMENSION1_REV,app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.NOMINAL_DIMENSION1_REV]);
      }
      if(data[app.GridCells.NOMINAL_DIMENSION2_REV]){
        _common.enterRecord_inNewRow(container_UUID,app.GridCells.NOMINAL_DIMENSION2_REV,app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.NOMINAL_DIMENSION2_REV]);
      }
      if(data[app.GridCells.NOMINAL_DIMENSION3_REV]){
       _common.enterRecord_inNewRow(container_UUID,app.GridCells.NOMINAL_DIMENSION3_REV,app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.NOMINAL_DIMENSION3_REV]);
      }
     
    }
  
    enterRecord_toCreateWorkingTimeModels(data: DataCells){
      _common.waitForLoaderToDisappear()
      if(data[app.GridCells.IS_DEFAULT]){
          _common.set_cellCheckboxValue(cnt.uuid.WORKING_TIME_MODELS, app.GridCells.IS_DEFAULT, data[app.GridCells.IS_DEFAULT]);
      }
      if(data[app.GridCells.DESCRIPTION_INFO]){
          _common.enterRecord_inNewRow(cnt.uuid.WORKING_TIME_MODELS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
      }
      if(data[app.GridCells.WEEK_ENDS_ON]){
        _common.edit_dropdownCellWithInput(cnt.uuid.WORKING_TIME_MODELS, app.GridCells.WEEK_ENDS_ON,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.WEEK_ENDS_ON]);
    }
    }
 
    enterRecord_toCreateWorkingTimeModelDays(data: DataCells){
      _common.waitForLoaderToDisappear()
      if(data[app.GridCells.WEEK_DAY_INDEX]){
          _common.edit_dropdownCellWithInput(cnt.uuid.WORKING_TIME_MODEL_DAYS, app.GridCells.WEEK_DAY_INDEX,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.WEEK_DAY_INDEX]);
      }
      if(data[app.GridCells.TARGET_HOURS]){
          _common.enterRecord_inNewRow(cnt.uuid.WORKING_TIME_MODEL_DAYS,app.GridCells.TARGET_HOURS,app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.TARGET_HOURS]);
      }
  }

  enterRecord_toCreateEmployees(container_UUID: string, data: DataCells) {
    _common.waitForLoaderToDisappear()
    if (data[app.GridCells.CODE]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE])
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }
    if (data[app.GridCells.START_DATE]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.START_DATE, app.InputFields.INPUT_GROUP_CONTENT_DATE_PICKER_INPUT, data[app.GridCells.START_DATE])
    }
    if (data[app.GridCells.SHIFT_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.SHIFT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.SHIFT_FK]);
    }
    if (data[app.GridCells.IS_CREW_LEADER]) {
      _common.set_cellCheckboxValue(container_UUID, app.GridCells.IS_CREW_LEADER, data[app.GridCells.IS_CREW_LEADER]);
    }
    if (data[app.GridCells.TIME_KEEPING_GROUP_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.TIME_KEEPING_GROUP_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.TIME_KEEPING_GROUP_FK]);
    }
    if (data[app.GridCells.GENERATE_RECORDING]) {
      _common.set_cellCheckboxValue(container_UUID, app.GridCells.GENERATE_RECORDING, data[app.GridCells.GENERATE_RECORDING]);
    }
    if (data[app.GridCells.PAYMENT_GROUP_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.PAYMENT_GROUP_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.PAYMENT_GROUP_FK]);
    }
  }
  enterRecord_toCreateTimekeepingGroups(container_UUID: string, data: DataCells) {
    _common.waitForLoaderToDisappear()
    if (data[app.GridCells.CODE]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE])
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }
  }
  enterRecord_toCreatePeriods(container_UUID: string, data: DataCells) {
    _common.waitForLoaderToDisappear()
    if (data[app.GridCells.CODE]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE]);
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }
    if (data[app.GridCells.TIME_KEEPING_GROUP_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.TIME_KEEPING_GROUP_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.TIME_KEEPING_GROUP_FK]);
    }
    if (data[app.GridCells.START_DATE]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.START_DATE, app.InputFields.INPUT_GROUP_CONTENT_DATE_PICKER_INPUT, data[app.GridCells.START_DATE])
    }
    if (data[app.GridCells.END_DATE_SMALL]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.END_DATE_SMALL, app.InputFields.INPUT_GROUP_CONTENT_DATE_PICKER_INPUT, data[app.GridCells.END_DATE_SMALL]);
    }
    if (data[app.GridCells.PAYROLL_YEAR]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.PAYROLL_YEAR, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.PAYROLL_YEAR]);
    }
  }

  enterRecord_toEmployeeReports(container_UUID: string, data: DataCells) {
    _common.waitForLoaderToDisappear()
    if (data[app.GridCells.DUE_DATE]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.DUE_DATE, app.InputFields.INPUT_GROUP_CONTENT_DATE_PICKER_INPUT, data[app.GridCells.DUE_DATE])
    }
    if (data[app.GridCells.TIME_SYMBOL_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.TIME_SYMBOL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.TIME_SYMBOL_FK]);
    }
    if (data[app.GridCells.DURATION]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.DURATION, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.DURATION])
    }
    if (data[app.GridCells.CONTROLLING_UNIT_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.CONTROLLING_UNIT_FK]);
    }
    if (data[app.GridCells.JOB_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.JOB_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.JOB_FK]);
    }
    if (data[app.GridCells.PROJECT_ACTION_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.PROJECT_ACTION_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.PROJECT_ACTION_FK]);
    }
  }
  enterRecord_toTimekeepingResults(container_UUID: string, data: DataCells) {
    _common.waitForLoaderToDisappear()
    if (data[app.GridCells.PROJECT_ACTION_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.PROJECT_ACTION_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.PROJECT_ACTION_FK]);
    }
    if (data[app.GridCells.HOURS]) {
      _common.clickOn_activeRowCell(container_UUID, app.GridCells.HOURS)
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.HOURS, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.HOURS])
    }
    if (data[app.GridCells.TIME_SYMBOL_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.TIME_SYMBOL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.TIME_SYMBOL_FK]);
    }
    if (data[app.GridCells.RATE]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.RATE, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.RATE])
    }
    if (data[app.GridCells.SHEET_FK]) {
      _common.edit_dropdownCellWithCaret(container_UUID, app.GridCells.SHEET_FK, commonLocators.CommonKeys.GRID, data[app.GridCells.SHEET_FK]);
    }
  }
  enterRecord_toCrewRecording(container_UUID: string, data: DataCells) {
    _common.waitForLoaderToDisappear()
    if (data[app.GridCells.CODE]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE]);
    }
    if (data[app.GridCells.TIME_KEEPING_PERIOD_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.TIME_KEEPING_PERIOD_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.TIME_KEEPING_PERIOD_FK]);
    }
    if (data[app.GridCells.SHIFT_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.SHIFT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.SHIFT_FK]);
    }
    if (data[app.GridCells.EMPLOYEE_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.EMPLOYEE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.EMPLOYEE_FK])
    }
  }
  enterRecord_toPaymentGroupSurcharge(container_UUID: string, data: DataCells) {
    _common.waitForLoaderToDisappear()
    if (data[app.GridCells.CONTROLLING_UNIT_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.CONTROLLING_UNIT_FK])
    }
    if (data[app.GridCells.SURCHARGE_TYPE_FK]) {
      _common.edit_dropdownCellWithCaret(container_UUID, app.GridCells.SURCHARGE_TYPE_FK, commonLocators.CommonKeys.LIST_EXACT, data[app.GridCells.SURCHARGE_TYPE_FK])
    }
    if (data[app.GridCells.RATE]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.RATE, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.RATE]);
    }
  }
  enterRecord_toCreateBreak(container_UUID: string, data: DataCells){
    _common.waitForLoaderToDisappear()
    if (data[app.GridCells.BREAK_START]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.BREAK_START, app.InputFields.DOMAIN_TYPE_TIME, data[app.GridCells.BREAK_START]);
    }
    if (data[app.GridCells.BREAK_END]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.BREAK_END, app.InputFields.DOMAIN_TYPE_TIME, data[app.GridCells.BREAK_END]);
    }
  }

  enterRecord_toCreateExceptions(container_UUID: string, data: DataCells){
    _common.waitForLoaderToDisappear()
    if(data[app.GridCells.DESCRIPTION_INFO]){
        _common.enterRecord_inNewRow(container_UUID,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO]);
    }
    if (data[app.GridCells.EXCEPT_DATE]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.EXCEPT_DATE, app.InputFields.INPUT_GROUP_CONTENT_DATE_PICKER_INPUT, data[app.GridCells.EXCEPT_DATE])
    }
    if (data[app.GridCells.TIME_SYMBOL_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.TIME_SYMBOL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.TIME_SYMBOL_FK]);
    }
  }

  enterRecord_toCreateCrewAssignment(container_UUID: string, data: DataCells){
    _common.waitForLoaderToDisappear()
    if (data[app.GridCells.EMPLOYEE_CREW_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID, app.GridCells.EMPLOYEE_CREW_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.EMPLOYEE_CREW_FK]);
    }
  }
  enterRecord_toCreateOvertimeCalculationParameterDetails(container_UUID:string,data:DataCells){
      cy.get("body").then(($body) => {
        let length = $body.find(".cid_"+container_UUID+" .panel-title .ico-up").length;
        if (length > 0) {
          for (let index = 1; index <= length; index++) {
            cy.get(".cid_"+container_UUID+" .panel-title .ico-up")
              .eq(0)
              .click();
          }
          cy.get(`[class="panel-title"] [class*="platform-form-group-header-text"]`)
          .contains(data[commonLocators.CommonKeys.VALUE])
          .click()
        }
      if(data[commonLocators.CommonKeys.VALUE]===commonLocators.CommonKeys.LIMITS){
        cy.get(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW)
          .contains(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW, commonLocators.CommonKeys.WEEKLY_LIMIT)
          .then((ele) => {
            cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
              .first().type(data[commonLocators.CommonKeys.WEEKLY_LIMIT])
              })
        _common.waitForLoaderToDisappear()      
        cy.get(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW)
            .contains(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW, commonLocators.CommonKeys.MONTHLY_LIMIT)
            .then((ele) => {
              cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
                .first().type(data[commonLocators.CommonKeys.MONTHLY_LIMIT])
            })
          }
      if(data[commonLocators.CommonKeys.VALUE]===commonLocators.CommonKeys.TIME_SYMBOL_LIMITS){
        cy.get(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW)
          .contains(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW,commonLocators.CommonKeys.TIME_SYMBOL_BEFORE_DAILY_LIMIT)
          .then((ele) => {
              cy.wrap(ele)
                .find(`[class*='${app.InputFields.INPUT_GROUP_CONTENT}']`)
                .first()
                .type(data[commonLocators.CommonKeys.TIME_SYMBOL_BEFORE_DAILY_LIMIT])
          })
          cy.wait(1000);
		      cy.get(commonLocators.CommonElements.POPUP_CONTAINER)
            .within(() => {
                cy.contains(commonLocators.CommonKeys.DIV,data[commonLocators.CommonKeys.TIME_SYMBOL_BEFORE_DAILY_LIMIT])
                  .click({force: true }); 
            })
      }  
      if(data[commonLocators.CommonKeys.VALUE]===commonLocators.CommonKeys.TIME_SYMBOL_SAVING_LIMITS){
        cy.get(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW)
          .contains(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW,commonLocators.CommonKeys.TIME_SYMBOL_FOR_HRS_OVER_SAVING_LIMIT)
          .then((ele) => {
              cy.wrap(ele)
                .find(`[class*='${app.InputFields.INPUT_GROUP_CONTENT}']`)
                .first()
                .type(data[commonLocators.CommonKeys.TIME_SYMBOL_FOR_HRS_OVER_SAVING_LIMIT])
        })
            cy.wait(1000);
            cy.get(commonLocators.CommonElements.POPUP_CONTAINER).within(() => {
              cy.contains(commonLocators.CommonKeys.DIV,data[commonLocators.CommonKeys.TIME_SYMBOL_FOR_HRS_OVER_SAVING_LIMIT]).click({force: true }); 
            })
          }
     })
   }
  }
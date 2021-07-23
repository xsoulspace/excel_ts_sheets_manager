/// <reference path='../types/SheetManager.d.ts'/>

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Log } from '@/LogicCore/Debug/Log'
import { MaintainerStatuses } from '@/LogicCore/Instances/MatrixElement/Maintainer'
import { AlertTypes, AlertArgs } from '@/types/SheetManager'

export interface AllAppSettingsInterface {
  themeName: SheetManager.AppSettingsThemeName
  maintainerStatuses: MatrixElementInterface.maintainerStatuses
  runIntroOnOpen: boolean
  showNumeration: boolean
}

@Module({ name: 'AppSettings', namespaced: true })
export default class AppSettings extends VuexModule {
  get getAllSettings(): AllAppSettingsInterface {
    return {
      themeName: this.themeName,
      maintainerStatuses: JSON.parse(JSON.stringify(this.maintainerStatuses)),
      runIntroOnOpen: this.runIntroOnOpen,
      showNumeration: this.showNumeration,
    }
  }
  @Mutation
  setAllSettings(obj: AllAppSettingsInterface) {
    const {
      themeName,
      maintainerStatuses,
      runIntroOnOpen,
      showNumeration,
    } = obj
    this.themeName = themeName
    this.runIntroOnOpen = runIntroOnOpen
    this.showNumeration = showNumeration
    this.maintainerStatuses = new MaintainerStatuses(
      maintainerStatuses.areSheetsHaveNumeration,
      maintainerStatuses.isNumerationBroken,
      maintainerStatuses.shouldWeRestoreNumeration
    )
  }
  themeName: SheetManager.AppSettingsThemeName = 'dark'

  get getIsDarkTheme() {
    const dark: SheetManager.AppSettingsThemeName = 'base'
    return this.themeName == dark
  }

  @Mutation
  setTheme(themeName: SheetManager.AppSettingsThemeName) {
    this.themeName = themeName
  }

  isTouchDevice: boolean = false
  get getIsTouchDevice() {
    return this.isTouchDevice
  }
  @Mutation
  setIsTouchDevice(value: boolean) {
    this.isTouchDevice = value
  }

  maintainerStatuses: MatrixElementInterface.maintainerStatuses = new MaintainerStatuses()
  get getMaintainerStatuses() {
    const m = new MaintainerStatuses(
      this.maintainerStatuses.areSheetsHaveNumeration,
      this.maintainerStatuses.isNumerationBroken,
      this.maintainerStatuses.shouldWeRestoreNumeration
    )
    return m
  }
  @Mutation
  switchSheetsNumerationMut(
    value: MaintainerStatuses['shouldWeRestoreNumeration']
  ) {
    this.maintainerStatuses.default.shouldWeRestoreNumeration = value
    this.maintainerStatuses.default.areSheetsHaveNumeration = value
    this.maintainerStatuses.resetToDefault()
  }
  @Mutation
  changeShouldWeRestoreNumeration(value: boolean) {
    this.maintainerStatuses.shouldWeRestoreNumeration = value
    this.maintainerStatuses.default.shouldWeRestoreNumeration = value
  }
  get getShouldWeRestoreNumeration() {
    return this.maintainerStatuses.default.shouldWeRestoreNumeration
  }

  @Action
  async switchSheetsNumeration(forceState?: boolean) {
    const currentState = this.maintainerStatuses.areSheetsHaveNumeration
    const newState = forceState !== undefined ? forceState : !currentState

    this.switchSheetsNumerationMut(newState)
    const isNumerated = true
    if (newState == isNumerated) {
      await this.context.dispatch('Sheets/initializeStore', null, {
        root: true,
      })
    } else {
      await this.context.dispatch('Sheets/cleanNumerationIni', null, {
        root: true,
      })
    }
  }
  showNumeration: boolean = false
  get getShowNumeration() {
    return this.showNumeration
  }
  @Mutation
  switchShowNumeration() {
    this.showNumeration = !this.showNumeration
  }

  alert: AlertArgs = {
    title: '',
    type: AlertTypes.loading,
    isOpen: false,
  }
  get getAlertState() {
    return this.alert
  }
  @Mutation
  openAlert({ title, type }: { title: string; type: AlertTypes }) {
    this.alert.type = type
    this.alert.title = title
    this.alert.isOpen = true
    setTimeout(() => {
      if (this.alert.title == title && this.alert.type == type) {
        this.alert.isOpen = false
      }
    }, 5000)
  }
  @Mutation
  closeAlert() {
    this.alert.title = ''
    this.alert.isOpen = false
  }
  @Mutation
  loading(isLoading: boolean) {
    if (isLoading) {
      this.alert.type = AlertTypes.loading
      const loadingTitle = 'Загрузка...'
      this.alert.title = loadingTitle
      this.alert.isOpen = true
      setTimeout(() => {
        if (
          this.alert.isOpen &&
          this.alert.type == AlertTypes.loading &&
          this.alert.title == loadingTitle
        ) {
          this.alert.type = AlertTypes.danger

          this.alert.title =
            'Не удается выполнить загрузку! Пожалуйста перезагрузите аддин'
        }
      }, 100000)
    } else {
      this.alert.title = ''
      this.alert.isOpen = false
    }
  }
  @Mutation
  dimmer(isEnabled: boolean) {
    if (isEnabled) {
      this.alert.type = AlertTypes.dimmer
      this.alert.title = ''
      this.alert.isOpen = true
    } else {
      this.alert.title = ''
      this.alert.isOpen = false
    }
  }

  intro: {
    step: number
    isRunning: boolean
  } = { step: 0, isRunning: false }

  get getIntroIsRunning() {
    return this.intro.isRunning
  }
  @Mutation
  switchIntroState() {
    this.intro.isRunning = !this.intro.isRunning
  }
  get getIntroStep() {
    return this.intro.step
  }
  @Mutation
  setIntroStep(value: number) {
    this.intro.step = value
  }

  runIntroOnOpen: boolean = true
  get getRunIntroOnOpen() {
    return this.runIntroOnOpen
  }
  @Mutation
  switchRunIntroOnOpen() {
    this.runIntroOnOpen = !this.runIntroOnOpen
  }
}

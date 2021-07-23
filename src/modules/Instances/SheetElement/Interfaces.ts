/// <reference path="../index.d.ts"/>

namespace SheetElementsInterface {
  export type outsideApp = 'browser' | 'excelDesktop'
  export type sheetsSource = Excel.Worksheet[] | any[]
  export type ClassTitle = 'Basic' | 'SheetElement' | 'SheetElementsMap'
  export interface Basic {
    _classTitle: ClassTitle
    typeOfName: NameType
    log: LogInterface
    delimiter: string
  }
  export interface Positions {
    first: number
    second: number
  }
  export interface BasicConstructor {
    _classTitle: ClassTitle | undefined
    typeOfName: NameType
    delimiter: string | undefined
  }
  export type NameType = '_excelSheetName' | '_decodedName' | '_encodedName'
  export type SheetVisibility =
    | Excel.SheetVisibility
    | 'Visible'
    | 'Hidden'
    | 'VeryHidden'
  export interface SheetElement extends Basic {
    id: string
    name: string
    visibility: SheetVisibility
    color: string
    elements: EMap
    positions: Positions
    _doesNameIncludesNumerationPattern(): boolean
    isInFirstLine: boolean
    decodedName: string
  }
  export interface SheetElementConstructor extends BasicConstructor {
    id: string
    name: string
    visibility: SheetVisibility
    color: string
    elements: EMap | undefined
    first: number
    second: number
  }
  export type EMap = Map<SheetElement['id'], SheetElement>
  export type EArr = Array<SheetElement>
  export interface getPositionsAndSortEMapOptions {
    oldMap: SheetElementsInterface.EMap
    requereToCorrectType: boolean
    typeOfName: SheetElementsInterface.NameType
  }
  export interface SheetElementsMap extends Basic {
    maintainerStatuses: {
      areSheetsHaveNumeration: boolean
      isNumerationBroken: boolean
      shouldWeRestoreNumeration: boolean
    }
    arrElements: EArr
    firstOpenScenarioCreateSheetElements(
      excelSheets: sheetsSource
    ): Promise<void>
    changeSheetPosition(
      el: SheetElementsInterface.SheetElement,
      items: SheetElementsInterface.SheetElement[]
    ): Promise<void>
    sheetsNumerationRepairer(): Promise<void>
    reorderSheets({
      requereToCorrectType,
    }: {
      requereToCorrectType: boolean
    }): Promise<void>
    correctDoubles(): Promise<void>
    writeSheets(sheetsEMap: EMap): void
    entries(): IterableIterator<[string, SheetElement]>
    eMap: EMap
  }
  export type SheetElementsMapConstructor = BasicConstructor
}

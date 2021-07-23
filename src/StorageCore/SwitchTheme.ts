import { Themes } from '@/LogicCore/enums'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module({ name: 'SwitchTheme', namespaced: true })
export default class SwitchTheme extends VuexModule {
  _theme = Themes.dark

  get theme() {
    return this._theme
  }

  @Mutation
  updateTheme(newTheme: Themes) {
    this._theme = newTheme
  }
}

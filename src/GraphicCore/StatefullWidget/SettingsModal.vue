<template>
  <NModal
    :isActive="isSettingsActive"
    @close="turnOffSettings"
    @save="turnOffSettings"
    :title="$t('settings.header')"
  >
    <template v-slot:modalBody>
      <div :class="{ form: true, '--is-dark': isDarkTheme }">
        <!-- <div class="form__field">
          <checkbox
            :text="$t('settings.sheetsNumerationEnabled')"
            :value="isNumerated"
            @click="changeIsNumerated"
          />
        </div> -->
        <!-- <div class="form__field">
						<checkbox
							:text="`Адаптировать интерфейс под тач`"
							:value="isTouchDevice"
							@click="changeIsTouchDevice"
						/>
					</div> -->
        <div class="form__field">
          <checkbox
            :text="$t('settings.darkTheme')"
            :value="isDarkTheme"
            @click="changeTheme"
          />
        </div>
        <!-- <div class="form__field">
          <checkbox
            :text="$t('settings.showNumeration')"
            :value="showNumeration"
            @click="switchNumeration"
          />
        </div> -->
        <div class="form__p --is-centered --has-underline">
          {{ $t('settings.settingsOnStart') }}
        </div>
        <div class="form__field">
          <checkbox
            :text="$t('settings.openIntroTutorial')"
            :value="runIntroOnOpen"
            @click="switchIntroOnOpenState"
          />
        </div>
        <div class="form__field">
          <checkbox
            :text="$t('settings.tryToRecoverNumeration')"
            :value="shouldWeRestoreNumeration"
            @click="changeShouldWeRestoreNumeration"
          />
        </div>
        <div class="form__field">
          {{ $t('settings.chooseLanguage') }}
          <select class="select" v-model="$i18n.locale">
            <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
              {{ lang }}
            </option>
          </select>
        </div>
        <!-- <div class="form__field --is-mobile">
						<button
							class="button__box --has-border"
							:class="{ '--is-dark': isDarkTheme }"
							@click="clearNumeration"
						>
							Очистить нумерацию листов (все цифры будут удалены)
						</button>
					</div> -->
      </div>
    </template>
  </NModal>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '../../LogicCore/Debug/Log'
import { getModule } from 'vuex-module-decorators'
import AppSettings from '@/StorageCore/AppSettings'
import Checkbox from '@/GraphicCore/StatelessWidget/Checkbox.vue'
import { AlertTypes } from '@/types/SheetManager'
import NModal from './NModal.vue'
import SwitchTheme from '@/StorageCore/SwitchTheme'
import { Themes } from '@/LogicCore/enums'

import {
  Languages,
  SettingsLangInterface,
} from '@/LogicCore/Languages/Languages'
@Component({
  props: {
    isSettingsActive: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  components: { Checkbox, NModal },
})
export default class SettingsModal extends Vue {
  langs: Languages[] = [Languages.eng, Languages.rus]
  get shouldWeRestoreNumeration() {
    const module = getModule(AppSettings, this.$store)
    return module.getShouldWeRestoreNumeration
  }
  changeShouldWeRestoreNumeration() {
    const newState = !this.shouldWeRestoreNumeration
    const module = getModule(AppSettings, this.$store)
    module.changeShouldWeRestoreNumeration(newState)
    let title: string = `${this.$t('alerts.numerationRecover')} ${
      newState ? this.$t('alerts.activated') : this.$t('alerts.deactivated')
    }`

    if (this.$i18n.locale == Languages.rus) {
      title = `${title}о`
    }
    module.openAlert({ title, type: AlertTypes.success })
  }
  get runIntroOnOpen() {
    const module = getModule(AppSettings, this.$store)
    return module.getRunIntroOnOpen
  }
  switchIntroOnOpenState() {
    const module = getModule(AppSettings, this.$store)
    const newState = !this.runIntroOnOpen
    module.switchRunIntroOnOpen()
    let title: string = `${this.$t('alerts.onOpenTutorial')} ${
      newState ? this.$t('alerts.activated') : this.$t('alerts.deactivated')
    }`

    if (this.$i18n.locale == Languages.rus) {
      title = `${title}о`
    }
    module.openAlert({ title, type: AlertTypes.success })
  }

  _isTouchDevice: boolean = false
  // public changeIsDarkTheme() {
  //   const module = getModule(AppSettings, this.$store)
  //   const oldValue = module.getIsDarkTheme
  //   if (oldValue == true) {
  //     module.setTheme('base')
  //   } else {
  //     module.setTheme('dark')
  //   }
  // }

  public async changeTheme() {
    const module = getModule(SwitchTheme, this.$store)
    const oldValue = module.theme

    if (oldValue == Themes.dark) {
      module.updateTheme(Themes.base)
    } else {
      module.updateTheme(Themes.dark)
    }
    const newValue = this.isDarkTheme
    console.log(newValue)
  }
  public get isDarkTheme() {
    const module = getModule(SwitchTheme, this.$store)
    const theme = module.theme
    const dark = Themes.dark
    return theme == dark
  }

  // public get isDarkTheme() {
  //   const module = getModule(AppSettings, this.$store)
  //   return module.getIsDarkTheme
  // }
  changeIsTouchDevice() {
    this.$data._isTouchDevice = !this.$data._isTouchDevice
  }
  get isTouchDevice() {
    return this.$data._isTouchDevice
  }
  async changeIsNumerated() {
    const settings = getModule(AppSettings, this.$store)
    settings.loading(true)
    const newState = !this.isNumerated
    let title: string = `${this.$t('alerts.numeration')} ${
      newState ? this.$t('alerts.activated') : this.$t('alerts.deactivated')
    }`

    if (this.$i18n.locale == Languages.rus) {
      title = `${title}a`
    }
    await settings.switchSheetsNumeration()
    settings.openAlert({ title, type: AlertTypes.success })
  }
  get isNumerated() {
    const settings = getModule(AppSettings, this.$store)
    return settings.getMaintainerStatuses.areSheetsHaveNumeration
  }
  turnOffSettings() {
    this.$emit('turn-off-settings-state')
  }
  switchNumeration() {
    const module = getModule(AppSettings, this.$store)
    const newState = !this.showNumeration
    module.switchShowNumeration()
    let title: string = `${this.$t('alerts.numerationVisibility')} ${
      newState ? this.$t('alerts.activated') : this.$t('alerts.deactivated')
    }`

    if (this.$i18n.locale == Languages.rus) {
      title = `${title}а`
    }

    module.openAlert({ title, type: AlertTypes.success })
  }
  get showNumeration() {
    const module = getModule(AppSettings, this.$store)
    return module.getShowNumeration
  }
  async clearNumeration() {}
}
</script>

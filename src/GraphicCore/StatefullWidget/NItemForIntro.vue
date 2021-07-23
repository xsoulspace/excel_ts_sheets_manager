<template>
  <div
    :id="id"
    draggable="isDraggable"
    class="item"
    :class="{
      '--is-dark': isDarkTheme,
      '--on-edit': isEditing,
      '--is-special': isBaseThemeSpecial,
      '--is-highlighted': isItemStep,
    }"
    data-v-step="item-whole"
  >
    <NColorMark :el="el" data-v-step="item-color" />
    <span class="item-icon">
      <i class="fas fa-ellipsis-v"></i>
    </span>
    <div data-v-step="item-name">
      <NInput :el="el" @input-state-change="changeIsEditing" :editing="true" />
    </div>
    <div
      data-v-step="item-numeration"
      class="item-numeration"
      v-if="showNumeration"
      v-show="!isEditing"
    >
      <i>{{ numerationPattern }}</i>
    </div>
  </div>
</template>

<script lang="ts">
import NColorMark from './NColorMark.vue'

import { getModule } from 'vuex-module-decorators'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '@/LogicCore/Debug/Log'
import NInput, { ActionTypes } from './NInput.vue'
import AppSettings from '@/StorageCore/AppSettings'
import Sheets from '../../StorageCore/Sheets'

@Component({
  props: ['id', 'el'],
  components: { NInput, NColorMark },
})
export default class NItemForIntro extends Vue {
  get isActive() {
    const sheetsModule = getModule(Sheets, this.$store)
    const isActive = this.$props.el.sourceId == sheetsModule.getActiveSheetId
    return isActive
  }
  get isBaseThemeSpecial() {
    if (this.currentStep >= 5 && !this.isDarkTheme) return true
    return false
  }
  get isItemStep() {
    return this.currentStep == 5
  }
  @Watch('isActive')
  elm(isActive: boolean) {
    const item: HTMLElement | null = this.$el.parentElement!.parentElement!
      .parentElement
    if (item) {
      if (isActive) {
        item.classList.add('--is-active')
        if (this.isDarkTheme) {
          item.classList.add('--is-dark')
        }
      } else {
        item.classList.remove('--is-active')
        if (this.isDarkTheme) {
          item.classList.remove('--is-dark')
        }
      }
    }
  }
  isEditing: boolean = false
  changeIsEditing(value: boolean) {
    this.isEditing = value
  }
  get isDraggable() {
    if (this.isInFiltering) return false
    if (this.isEditing) return false

    return true
  }

  get isInFiltering() {
    const module = getModule(Sheets, this.$store)
    return module.isInFiltering
  }
  get numerationPattern() {
    return this.$props.el._numerationPattern()
  }

  get isDarkTheme() {
    const module = getModule(AppSettings, this.$store)
    return module.getIsDarkTheme
  }
  openColors() {
    this.$emit('open-colors', this.$props.el)
  }
  get showNumeration() {
    const module = getModule(AppSettings, this.$store)
    return module.getShowNumeration
  }
  get currentStep() {
    const module = getModule(AppSettings, this.$store)
    return module.getIntroStep
  }
}
</script>

<style lang="scss"></style>

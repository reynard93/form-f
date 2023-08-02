<template>
  <mom-page-header
    sticky-subheader
    data-qa="page_header"
    :user-name="loginDisplay.loginFullName"
    :company-name="loginDisplay.companyName"
    :branch-name="loginDisplay.branchName"
    :company-uen="loginDisplay.uenDivBranch"
    :title="title || ''"
    :allow-logout="hasLogoutButton"
    :allow-save="allowSave"
    :has-save-button="hasSaveButton"
    :last-saved-time="lastSavedTime"
    :breadcrumb="breadCrumb"
    @save="onSave"
    @logout="onLogout"
  >
    <template v-slot:subheader>
      <span v-for="({ name, otherInfo }, idx) in subtitleInfo" :key="idx">
        <span class="fw:semibold">{{ name }}</span> {{ `${otherInfo}${subtitleCommaToggle(idx)}` }}
      </span>
    </template>
    <slot name="header">...</slot>
  </mom-page-header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import headerHelpers, { type GetLoginDisplayProps } from '../../exports/helpers/header'
import linkHelpers, {
  type GetBreadCrumbProps,
  type BreadCrumbUrls
} from '../../exports/helpers/link.ts'
import { decodeHTML } from 'entities'

const props = defineProps<{
  userData: GetLoginDisplayProps
  breadcrumbUrls: BreadCrumbUrls
  title: string
  subtitle: string
  lastSavedTime: string
  isQuickMenu: boolean
  allowLogout: boolean
  hasLogoutButton: boolean
  allowSave: boolean
  hasSaveButton: boolean
  hideMyMomPortalForMomUser: boolean
}>()

const events = defineEmits(['breadcrumb-action', 'logout', 'save'])

const loginDisplay = computed(() => headerHelpers.getLoginDisplay(props.userData))

const breadCrumb = computed(() => {
  const params: GetBreadCrumbProps = {
    isQuickMenu: props.isQuickMenu,
    isMom: !!props.userData.login.isMom,
    isSp: !!props.userData.login.isSp,
    action: onBreadcrumbAction,
    hideMyMomPortalForMomUser: props.hideMyMomPortalForMomUser,
    urls: props.breadcrumbUrls
  }

  return linkHelpers.getBreadCrumb(params)
})

const subtitleInfo = computed((): Array<{ name: String; otherInfo: String }> => {
  const subtitle = props.subtitle

  if (!subtitle) return [{ name: '', otherInfo: '' }]

  return subtitle.split(',').map((sectionInfo: String) => {
    const lastOpenBrace = sectionInfo.lastIndexOf('(')
    const name = decodeHTML(sectionInfo.substring(0, lastOpenBrace).trim())
    const otherInfo = decodeHTML(sectionInfo.substring(lastOpenBrace).trim())
    return { name, otherInfo }
  })
})

const onBreadcrumbAction = (): void => events('breadcrumb-action')
const onSave = (): void => events('save')
const onLogout = (): void => events('logout')
const subtitleCommaToggle = (idx: number): String =>
  idx < subtitleInfo.value.length - 1 ? ',' : ''
</script>

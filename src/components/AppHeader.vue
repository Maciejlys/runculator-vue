<script setup lang="ts">
import { Button } from '@/components/ui/button'
const changeLocale = (i18n: any) => {
  i18n.locale = i18n.locale === 'pl' ? 'en' : 'pl'
}
</script>

<template>
  <header class="flex gap-2 w-full justify-center p-2">
    <Button @click.prevent="changeLocale($i18n)">{{ $i18n.locale }}</Button>
  </header>
</template>

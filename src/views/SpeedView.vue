<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ref } from 'vue'
import { convert } from '@/lib/convert'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const numberValidation = computed(() =>
  z
    .string()
    .regex(/^\d*\.?\d*$/, { message: t('zod.number') })
    .min(1, { message: t('zod.short') })
    .max(2, { message: t('zod.long') })
    .refine((data) => parseInt(data) <= 60, { message: t('zod.larger') })
)

const validationSchema = computed(() =>
  toTypedSchema(
    z.object({
      minutes: numberValidation.value,
      seconds: numberValidation.value
    })
  )
)

const { handleSubmit } = useForm({
  validationSchema
})

const speed = ref()

const onSubmit = handleSubmit((values) => {
  const minutes = +values.minutes
  const seconds = +values.seconds
  speed.value = convert(minutes, seconds)
})
</script>

<template>
  <Card class="w-[400px]">
    <CardHeader>
      <CardTitle>{{ $t('title') }}</CardTitle>
      <CardDescription>{{ $t('description') }}</CardDescription>
      <Separator />
    </CardHeader>
    <CardContent>
      <form class="w-full space-y-6" @submit="onSubmit">
        <div class="flex gap-2">
          <FormField v-slot="{ componentField }" name="minutes">
            <FormItem>
              <FormLabel>{{ $t('minutes') }}</FormLabel>
              <FormControl>
                <Input type="text" placeholder="5" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormField v-slot="{ componentField }" name="seconds">
              <FormItem>
                <FormLabel>{{ $t('seconds') }}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="30" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </FormField>
        </div>
        <div class="flex justify-center w-full" v-if="speed">{{ speed }} km/h</div>
        <Button class="w-full" type="submit">{{ $t('calculate') }}</Button>
      </form>
    </CardContent>
  </Card>
</template>

<style scoped></style>

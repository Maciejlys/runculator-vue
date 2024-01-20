<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ref } from 'vue'
import { convert } from '@/lib/convert'

const numberValidation = z
  .string()
  .min(1, { message: 'Please enter' })
  .max(2, { message: 'It cannot be so long' })
  .regex(/^\d*\.?\d*$/, { message: 'It should be a non negative number' })
  .refine((data) => parseInt(data) <= 60, { message: 'Cannot be larger then 60' })

const formSchema = toTypedSchema(
  z.object({
    minutes: numberValidation,
    seconds: numberValidation
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema
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
      <CardTitle>Speed calculator</CardTitle>
      <CardDescription>Convert pace to speed</CardDescription>
    </CardHeader>
    <CardContent>
      <form class="w-full space-y-6" @submit="onSubmit">
        <div class="flex gap-2">
          <FormField v-slot="{ componentField }" name="minutes">
            <FormItem>
              <FormLabel>Minutes</FormLabel>
              <FormControl>
                <Input type="text" placeholder="5" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormField v-slot="{ componentField }" name="seconds">
              <FormItem>
                <FormLabel>Seconds</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="30" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </FormField>
        </div>
        <div class="flex justify-center w-full" v-if="speed">{{ speed }} km/h</div>
        <Button class="w-full" type="submit">Calculate</Button>
      </form>
    </CardContent>
  </Card>
</template>

<style scoped></style>

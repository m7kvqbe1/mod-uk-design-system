import { isBefore, isValid, parseISO } from 'date-fns'
import React, { useState } from 'react'
import { ComponentMeta } from '@storybook/react'
import { Formik, Field as FormikField, FieldProps } from 'formik'

import { TextInputE } from '../../components/TextInputE'
import { TextAreaE } from '../../components/TextAreaE'
import { RadioE } from '../../components/RadioE'
import { CheckboxE } from '../../components/CheckboxE'
import {
  AutocompleteE,
  AutocompleteEOption,
} from '../../components/AutocompleteE'
import { ButtonE } from '../../components/ButtonE'
import { NumberInputE } from '../../components/NumberInputE'
import {
  DatePickerE,
  DatePickerEOnChangeData,
} from '../../components/DatePickerE'
import { SelectE, SelectEOption } from '../../components/SelectE'
import { SwitchE, SwitchEOption } from '../../components/SwitchE'
import { RangeSliderE } from '../../components/RangeSliderE'
import { sleep } from '../../helpers'
import { Field } from '../../components/Field'
import { Fieldset } from '../../components/Fieldset'

export interface FormValues {
  email: string
  password: string
  description: string
  exampleCheckbox: string[]
  exampleRadio: string[]
  exampleSwitch: string
  exampleNumberInput: number | null
  exampleDatePicker: Date | null
  exampleSelect: string | null
  exampleAutocomplete: string | null
  exampleRangeSlider: number[]
}

const MINIMUM_DATE = parseISO('2022-01-01')

export const Example: React.FC<unknown> = () => {
  const [formValues, setFormValues] = useState<FormValues>()

  return (
    <main>
      <Formik<FormValues>
        initialValues={{
          email: '',
          password: '',
          description: '',
          exampleCheckbox: [],
          exampleRadio: [],
          exampleSwitch: '',
          exampleNumberInput: null,
          exampleDatePicker: null,
          exampleSelect: null,
          exampleAutocomplete: null,
          exampleRangeSlider: [20],
        }}
        validate={({ email, exampleDatePicker }) => {
          const errors: Record<string, unknown> = {}

          if (!email) {
            errors.email = 'Required'
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            errors.email = 'Invalid email address'
          }

          if (exampleDatePicker && !isValid(exampleDatePicker)) {
            errors.exampleDatePicker = 'Enter a valid date'
          }

          if (exampleDatePicker && isBefore(exampleDatePicker, MINIMUM_DATE)) {
            errors.exampleDatePicker = 'Enter a date on or after 1 January 2022'
          }

          return errors
        }}
        onSubmit={async (values: FormValues, { setSubmitting }) => {
          await sleep(400)
          setFormValues(values)
          setSubmitting(false)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormikField
              name="email"
              data-testid="form-example-TextInputE-email"
            >
              {({ field, meta }: FieldProps) => {
                return (
                  <Field
                    hintText="Example hint text."
                    errors={[{ error: meta.touched && meta.error }]}
                  >
                    <TextInputE label="Email" {...field} />
                  </Field>
                )
              }}
            </FormikField>
            <FormikField
              name="password"
              data-testid="form-example-TextInputE-password"
            >
              {({ field, meta }: FieldProps) => {
                return (
                  <Field
                    hintText="Example hint text."
                    errors={[{ error: meta.touched && meta.error }]}
                  >
                    <TextInputE type="password" label="Password" {...field} />
                  </Field>
                )
              }}
            </FormikField>
            <FormikField
              name="description"
              data-testid="form-example-TextAreaE-description"
            >
              {({ field, meta }: FieldProps) => {
                return (
                  <Field
                    hintText="Example hint text."
                    errors={[{ error: meta.touched && meta.error }]}
                  >
                    <TextAreaE label="Description" {...field} />
                  </Field>
                )
              }}
            </FormikField>
            <Fieldset>
              <legend>Example checkbox selection</legend>
              <FormikField
                name="exampleCheckbox"
                value="Option 1"
                type="checkbox"
              >
                {({ field }: FieldProps) => (
                  <CheckboxE label="Option 1" {...field} />
                )}
              </FormikField>
              <FormikField
                name="exampleCheckbox"
                value="Option 2"
                type="checkbox"
              >
                {({ field }: FieldProps) => (
                  <CheckboxE label="Option 2" {...field} />
                )}
              </FormikField>
              <FormikField
                name="exampleCheckbox"
                value="Option 3"
                type="checkbox"
              >
                {({ field }: FieldProps) => (
                  <CheckboxE label="Option 3" {...field} />
                )}
              </FormikField>
            </Fieldset>
            <Fieldset>
              <legend>Example radio selection</legend>
              <FormikField name="exampleRadio" value="Option 1" type="radio">
                {({ field }: FieldProps) => (
                  <RadioE label="Option 1" {...field} />
                )}
              </FormikField>
              <FormikField name="exampleRadio" value="Option 2" type="radio">
                {({ field }: FieldProps) => (
                  <RadioE label="Option 2" {...field} />
                )}
              </FormikField>
            </Fieldset>
            <FormikField name="exampleSwitch">
              {({ field: { name, value }, meta }: FieldProps) => {
                return (
                  <Field
                    hintText="Example hint text."
                    errors={[{ error: meta.touched && meta.error }]}
                  >
                    <SwitchE
                      label="Example switch selection"
                      name={name}
                      value={value}
                      data-testid="form-example-SwitchE"
                      onChange={(event: React.FormEvent<HTMLInputElement>) => {
                        setFieldValue(
                          'exampleSwitch',
                          event.currentTarget.value
                        )
                      }}
                    >
                      <SwitchEOption label="One" value="1" />
                      <SwitchEOption label="Two" value="2" />
                      <SwitchEOption label="Three" value="3" />
                    </SwitchE>
                  </Field>
                )
              }}
            </FormikField>
            <FormikField name="exampleNumberInput">
              {({ field: { name, value }, meta }: FieldProps) => {
                return (
                  <Field
                    hintText="Example hint text."
                    errors={[{ error: meta.touched && meta.error }]}
                  >
                    <NumberInputE
                      label="Example number input"
                      name={name}
                      value={value}
                      onChange={(
                        _:
                          | React.ChangeEvent<HTMLInputElement>
                          | React.MouseEvent<HTMLButtonElement>,
                        newValue: number | null
                      ) => {
                        setFieldValue('exampleNumberInput', newValue)
                      }}
                    />
                  </Field>
                )
              }}
            </FormikField>
            <FormikField name="exampleDatePicker">
              {({ field: { name, value }, meta }: FieldProps) => {
                return (
                  <Field
                    hintText="Example hint text."
                    errors={[{ error: meta.touched && meta.error }]}
                  >
                    <DatePickerE
                      name={name}
                      disabledDays={{ before: MINIMUM_DATE }}
                      startDate={value}
                      onChange={({ startDate }: DatePickerEOnChangeData) => {
                        setFieldValue('exampleDatePicker', startDate)
                      }}
                    />
                  </Field>
                )
              }}
            </FormikField>
            <FormikField name="exampleSelect">
              {({ field: { value }, meta }: FieldProps) => {
                return (
                  <Field
                    hintText="Example hint text."
                    errors={[{ error: meta.touched && meta.error }]}
                  >
                    <SelectE
                      value={value}
                      label="Example select"
                      onChange={(newValue: string | null) => {
                        setFieldValue('exampleSelect', newValue)
                      }}
                    >
                      <SelectEOption value="one">One</SelectEOption>
                      <SelectEOption value="two">Two</SelectEOption>
                      <SelectEOption value="three">Three</SelectEOption>
                      <SelectEOption value="four">Four</SelectEOption>
                    </SelectE>
                  </Field>
                )
              }}
            </FormikField>
            <FormikField name="exampleAutocomplete">
              {({ field: { value }, meta }: FieldProps) => {
                return (
                  <Field
                    hintText="Example hint text."
                    errors={[{ error: meta.touched && meta.error }]}
                  >
                    <AutocompleteE
                      value={value}
                      label="Example autocomplete"
                      onChange={(newValue: string | null) => {
                        setFieldValue('exampleAutocomplete', newValue)
                      }}
                    >
                      <AutocompleteEOption value="one">One</AutocompleteEOption>
                      <AutocompleteEOption value="two">Two</AutocompleteEOption>
                      <AutocompleteEOption value="three">
                        Three
                      </AutocompleteEOption>
                      <AutocompleteEOption value="four">
                        Four
                      </AutocompleteEOption>
                    </AutocompleteE>
                  </Field>
                )
              }}
            </FormikField>
            <FormikField name="exampleRangeSlider">
              {({ meta }: FieldProps) => {
                return (
                  <Field
                    hintText="Example hint text."
                    errors={[{ error: meta.touched && meta.error }]}
                  >
                    <RangeSliderE
                      domain={[0, 40]}
                      mode={1}
                      values={[20]}
                      tracksLeft
                      step={2}
                      onChange={(newValues: ReadonlyArray<number>) => {
                        setFieldValue('exampleRangeSlider', newValues)
                      }}
                    />
                  </Field>
                )
              }}
            </FormikField>
            <ButtonE
              type="submit"
              isDisabled={isSubmitting}
              data-testid="form-example-submit"
            >
              Submit
            </ButtonE>
          </form>
        )}
      </Formik>

      <pre data-testid="form-example-values">
        {JSON.stringify(formValues, null, 2)}
      </pre>
    </main>
  )
}

export default {
  title: 'Forms/Formik',
  component: Example,
} as ComponentMeta<typeof Example>

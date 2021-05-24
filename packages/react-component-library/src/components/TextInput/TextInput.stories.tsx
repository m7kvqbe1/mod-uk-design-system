import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Field, Formik } from 'formik'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'

import { IconSearch } from '@royalnavy/icon-library'
import { Button } from '../Button'
import { TextInput, TextInputProps } from '.'

import { withFormik } from '../../enhancers'
import { FormRow } from '../FormRow/FormRow'
import { FormColumn } from '../FormColumn/FormColumn'
import { ErrorSummary } from '../ErrorSummary/ErrorSummary'
import { ErrorSummaryItem } from '../ErrorSummary/ErrorSummaryItem'
import { Form } from '../Form/Form'

export default {
  component: TextInput,
  title: 'Text Input',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
} as Meta

export const Default: Story<TextInputProps> = (props) => (
  <TextInput {...props} />
)

Default.args = {
  name: 'text-input-default',
  label: 'Example label',
}

export const WithLabel: Story<TextInputProps> = (props) => (
  <TextInput {...props} name="text-input-label" label="Example label" />
)

WithLabel.storyName = 'With label'

export const Disabled: Story<TextInputProps> = (props) => (
  <TextInput
    {...props}
    name="text-input-disabled"
    label="Example label"
    isDisabled
  />
)

Disabled.storyName = 'Disabled'

export const WithStartAdornment: Story<TextInputProps> = (props) => (
  <TextInput
    {...props}
    name="text-input-start-adornment"
    label="Example label"
    startAdornment={<IconSearch />}
  />
)

WithStartAdornment.storyName = 'With start adornment'

export const WithEndAdornment: Story<TextInputProps> = (props) => (
  <TextInput
    {...props}
    name="text-input-end-adornment"
    label="Example label"
    endAdornment={<IconSearch />}
  />
)

WithEndAdornment.storyName = 'With end adornment'

// export const WithFormik: Story<TextInputProps> = (props) => {
//   interface Data {
//     'text-input-formik': string
//   }
//
//   const initialValues: Data = {
//     'text-input-formik': '',
//   }
//
//   const validationSchema = yup.object().shape({
//     'text-input-formik': yup.string().required('Something went wrong!'),
//   })
//
//   const FormikTextInput = withFormik(TextInput)
//
//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={action('onSubmit')}
//     >
//       <Form>
//         <Field
//           name="text-input-formik"
//           label="Example label"
//           component={FormikTextInput}
//         />
//         <br />
//         <Button type="submit">Submit</Button>
//       </Form>
//     </Formik>
//   )
// }
//
// WithFormik.storyName = 'Formik'

export const Spike: Story<TextInputProps> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data: any) => console.log(data)

  function getErrorSummaryItems() {
    const errorSummaryItems = Object.keys(errors).map((key) => {
      return <ErrorSummaryItem>{key} has an error</ErrorSummaryItem>
    })

    return errorSummaryItems.length ? errorSummaryItems : null
  }

  console.log('errors', errors)

  const errorSummaryItems = getErrorSummaryItems()

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {errorSummaryItems && <ErrorSummary>{errorSummaryItems}</ErrorSummary>}
      <h1>Personal details</h1>
      <FormRow>
        <FormColumn>
          <TextInput
            label="First name"
            maxLength={10}
            name="first-name"
            {...register('first-name')}
          />
        </FormColumn>
        <FormColumn>
          <TextInput
            label="Last name"
            name="last-name"
            {...register('last-name')}
          />
        </FormColumn>
      </FormRow>
      <FormRow>
        <FormColumn>
          <TextInput
            label="Email address"
            name="email-address"
            {...register('email-address')}
          />
        </FormColumn>
        <FormColumn>
          <TextInput
            error={errors['id-number']}
            isInvalid
            label="ID number"
            name="id-number"
            {...register('id-number', { required: true })}
          />
        </FormColumn>
      </FormRow>
      <h1>Address details</h1>
      <FormRow>
        <FormColumn>
          <fieldset>
            <legend>Home address</legend>
            <FormRow>
              <FormColumn>
                <TextInput label="Address line 1" name="home-1" />
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormColumn>
                <TextInput label="Address line 2" name="home-2" />
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormColumn>
                <TextInput label="City" name="home-city" />
              </FormColumn>
              <FormColumn>
                <TextInput label="Postcode" name="home-postcode" />
              </FormColumn>
            </FormRow>
          </fieldset>
        </FormColumn>
        <FormColumn>
          <fieldset>
            <legend>Work address</legend>
            <FormRow>
              <FormColumn>
                <TextInput label="Address line 1" name="work-1" />
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormColumn>
                <TextInput label="Address line 2" name="work-2" />
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormColumn>
                <TextInput label="City" name="work-city" />
              </FormColumn>
              <FormColumn>
                <TextInput label="Postcode" name="work-postcode" />
              </FormColumn>
            </FormRow>
          </fieldset>
        </FormColumn>
      </FormRow>
      <FormRow>
        <FormColumn>
          <Button type="submit">Save details</Button>
        </FormColumn>
      </FormRow>
    </Form>
  )
}

Spike.storyName = 'Spike'

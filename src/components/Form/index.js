import React, {useState, useCallback} from "react"
import {FormContainer, FillSelector, FillOptionSelector} from "./style"
import {Formik, Field} from 'formik'
import ColorPicker from 'react-color'
import "react-datepicker/dist/react-datepicker.css"

const MyColorPicker = ({ field, form, handleChange, ...props }) => {
  const {value} = field
  const [color, setColor] = useState(value)
  return <div>
    <input {...field} {...props} value={color} style={{display: 'none'}}/>
    <ColorPicker
      color={color}
      onChange={val => {
        setColor(val.hex)
        handleChange(val.hex)
      }}
    />
  </div>
}

const Form = ({task = {}, editTask}) => {
  const {border, fill} = task

  const taskChange = useCallback((value, fieldName) =>{
    editTask({...task, [fieldName]: value})
  }, [editTask, task])

  return (
    <Formik
      initialValues={{
        border: border,
        fill: fill,
      }}
      validate={values => {
        const errors = {}
        if (!values.name) {
          errors.name = 'Required'
        }
        return errors
      }}
      onSubmit={(values, {setSubmitting}) => {
        editTask(values)
        setSubmitting(false)
      }}
    >
      {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
        <FormContainer onSubmit={handleSubmit}>
          <FillSelector
            name="border"
            onChange={event => {
              handleChange(event)
              editTask({...task, border: event.target.value})
            }}
            onBlur={handleBlur}
            value={values.border}
          >
            <FillOptionSelector value="solid"> solid</FillOptionSelector>
            <FillOptionSelector value="none"> none</FillOptionSelector>
            <FillOptionSelector value="dashed"> dashed</FillOptionSelector>
            <FillOptionSelector value="dotted"> dotted</FillOptionSelector>
          </FillSelector>
          <Field
            name="fill"
            id="fill"
            component={MyColorPicker}
            handleChange={(event) => taskChange(event, 'fill')}
          />
        </FormContainer>
      )}
    </Formik>
  )
}

export default Form
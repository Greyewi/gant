import React from "react"
import {FormContainer, FormTitle} from "./style";
import { Formik } from 'formik';
import moment from 'moment'
import {format} from '../../constants'
import {setFormatDateFromHTMLtoMain} from '../../utils'


const Form = ({task, addStartIntervalTask, addEndIntervalTask, interval}) => {
  return (
    <Formik
      initialValues={{ name: task.name, border: task.border, fill: task.fill }}
      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
          /* and other goodies */
        }) => (
      <FormContainer onSubmit={handleSubmit}>
        <FormTitle>New Task</FormTitle>
        <input
          type="date"
          name="startDate"
          onChange={(e) => addStartIntervalTask(setFormatDateFromHTMLtoMain(e.target.value))}
          onBlur={handleBlur}
          value={moment(interval[0], format).format('yyyy-MM-DD')}
        />
        <input
          type="date"
          name="endDate"
          onChange={(e) => addEndIntervalTask(setFormatDateFromHTMLtoMain(e.target.value))}
          onBlur={handleBlur}
          value={moment(interval[1], format).format('yyyy-MM-DD')}
        />
        <select
          name="border"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.border}
        >
          <option value="solid" > solid </option>
          <option value="none" > none </option>
          <option value="dashed" > dashed </option>
          <option value="dotted" > dotted </option>
        </select>
        {errors.border && touched.border && errors.border}
        <input
          type="text"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
        {errors.name && touched.name && errors.name}
        <input
          type="color"
          name="fill"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.fill}
        />
        {errors.fill && touched.fill && errors.fill}
        <div>
          <button type="reset">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting}>
            Save
          </button>
        </div>
      </FormContainer>
      )}
    </Formik>
  )
}

export default Form
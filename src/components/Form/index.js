import React from "react"
import {FormContainer} from "./style";
import { Formik } from 'formik';

const Form = ({task}) => {
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
        <select
          name="border"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="solid" selected={values.border === "solid"}> solid </option>
          <option value="none" selected={values.border === "none"}> none </option>
          <option value="dashed" selected={values.border === "dashed"}> dashed </option>
          <option value="dotted" selected={values.border === "dotted"}> dotted </option>
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
        <button type="reset">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting}>
          Save
        </button>
      </FormContainer>
      )}
    </Formik>
  )
}

export default Form
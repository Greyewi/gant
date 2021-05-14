import React, { useCallback } from "react";
import { FormContainer, BorderSelector, BorderOptionSelector } from "./style";
import { Formik, Field } from "formik";
import MyColorPicker from "../../ui/ColorPicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = ({ task = {}, editTask }) => {
  const { border, fill } = task;

  const taskChange = useCallback(
    (value, fieldName) => {
      editTask({ ...task, [fieldName]: value });
    },
    [editTask, task]
  );

  return (
    <Formik
      initialValues={{
        border: border,
        fill: fill,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        editTask(values);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <FormContainer onSubmit={handleSubmit}>
          <Field
            name="fill"
            id="fill"
            component={MyColorPicker}
            handleChange={(event) => taskChange(event, "fill")}
          />
          <BorderSelector
            name="border"
            onChange={(event) => {
              handleChange(event);
              editTask({ ...task, border: event.target.value });
            }}
            onBlur={handleBlur}
            value={values.border}
          >
            <BorderOptionSelector value="solid"> solid</BorderOptionSelector>
            <BorderOptionSelector value="none"> none</BorderOptionSelector>
            <BorderOptionSelector value="dashed"> dashed</BorderOptionSelector>
            <BorderOptionSelector value="dotted"> dotted</BorderOptionSelector>
          </BorderSelector>
        </FormContainer>
      )}
    </Formik>
  );
};

export default Form;

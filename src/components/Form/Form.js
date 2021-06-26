import React, { useCallback } from "react";
import { FormContainer, BorderSelector, BorderOptionSelector } from "./style";
import { Formik, Field } from "formik";
import MyColorPicker from "../../ui/ColorPicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = ({ isOpenTaskFormId, taskList, editTask }) => {
  const task = taskList.find((item) => item.id === isOpenTaskFormId)
  const { border, fill } = task

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
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <FormContainer onSubmit={handleSubmit}>
          <Field
            name="fill"
            component={MyColorPicker}
            handleChange={(event) => taskChange(event, "fill")}
          />
          <BorderSelector
            name="border"
            onChange={(event) => {
              handleChange(event);
              taskChange(event.target.value, "border")
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

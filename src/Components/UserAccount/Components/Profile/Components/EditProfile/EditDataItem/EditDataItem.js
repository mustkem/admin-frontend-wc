import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

import { updateProfile, whomi } from "../../../../../../../store/actions";

function EditDataItem(props) {
  const [saveBtnModal, setSaveBtnModal] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="profile-forn-sec edit-profile-page">
      <Formik
        enableReinitialize
        initialValues={{
          [props.dataKey]: props.value,
        }}
        validationSchema={Yup.object({
          // firstName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const payload = {
            [props.dataKey]: values[props.dataKey],
            id: props.user.userId || props.user._id,
          };
          dispatch(updateProfile(payload))
            .then(() => {
              setSaveBtnModal(false);
            })
            .catch((err) => {
              resetForm();
            });
        }}
      >
        <Form>
          <div className="fields-wrp">
            <div class="ip-field-wrp">
              {props.editable && (
                <button
                  type="button"
                  onClick={() => {
                    setSaveBtnModal(!saveBtnModal);
                  }}
                  className="btn edit"
                >
                  Edit
                </button>
              )}

              <MyTextInput
                disabled={!saveBtnModal}
                label={props.label}
                name={[props.dataKey]}
                type={props.type ? props.type : "text"}
                placeholder="Enter"
              />
              {saveBtnModal && (
                <button className="btn btn-save" type="submit">
                  Save
                </button>
              )}
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default EditDataItem;

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input form-control" {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

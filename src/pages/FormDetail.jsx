import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { TextInput } from "../InputTypes/TextInput";
import { TextAreaInput } from "../InputTypes/TextAreaInput";

import { DropdownInput } from "../InputTypes/DropdownInput";
import { RadioCheckboxInput } from "../InputTypes/RadioCheckboxInput";
const FormDetail = () => {
  const { formId } = useParams();
  const storedFormData = localStorage.getItem(`form_${formId}`);
  const form = storedFormData ? JSON.parse(storedFormData) : null;

  if (!form) return <div>Loading...</div>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="d-flex">
            <div className="me-auto">
              <h1>{form.name}</h1>
            </div>
            <div className="">
              <Link to={"/"} className="btn btn-outline-primary">
                Forms
              </Link>
            </div>
          </div>
          {form.sections.map((section) => (
            <div className="card" key={section.id}>
              <div className="card-header" id={`section-${section.id}`}>
                <h5>{section.name}</h5>
              </div>
              <div className="card-body">
                {section.form_fields.map((field) => {
                  const name = `field-${section.id}-${field.id}`;
                  const choices = field.choices.map((choice) => (
                    <option key={choice.id} value={choice.choice_text}>
                      {choice.choice_text}
                    </option>
                  ));
                  switch (field.field_type) {
                    case "text":
                      return (
                        <div key={field.id}>
                          <label htmlFor={name} className="form-label">
                            {field.label}
                          </label>
                          <TextInput
                            
                            id={name}
                            name={name}
                            className="form-control"
                          />
                        </div>
                      );
                    case "password":
                      return (
                        <div key={field.id}>
                          <label htmlFor={name} className="form-label">
                            {field.label}
                          </label>
                          <TextAreaInput
                            
                            id={name}
                            name={name}
                            className="form-control"
                          />
                        </div>
                      );
                    case "select":
                      return (
                        <div key={field.id}>
                          <label htmlFor={name} className="form-label">
                            {field.label}
                          </label>
                          <DropdownInput choices={choices} name={name} id={name} value={''} className="form-select" >
                          
                          
                          </DropdownInput>
                            
                          
                        </div>
                      );
                    case "radio":
                    case "checkbox":
                      return (
                        <div key={field.id}>
                          <label htmlFor={name} className="form-label">
                            {field.label}
                          </label>
                          {choices.map((choice) => {
                            const choiceName = `${name}-${choice.key}`;
                            return (
                              <div className="form-check" key={choice.key}>
                                <RadioCheckboxInput
                                  type={field.field_type}
                                  id={choiceName}
                                  name={name}
                                  value={choice.props.value}
                                />
                                <label
                                  htmlFor={choiceName}
                                  className="form-check-label"
                                >
                                  {choice.props.children}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      );
                    default:
                      return <></>;
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormDetail;
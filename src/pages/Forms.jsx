
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Forms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const loadFormsFromLocalStorage = () => {
      const storedForms = Object.keys(localStorage)
        .filter((key) => key.startsWith("form_"))
        .map((key) => {
          const form = JSON.parse(localStorage.getItem(key));
          return { ...form, id: key.replace("form_", "") };
        });

      setForms(storedForms);
    };

    loadFormsFromLocalStorage();
  }, []);

  const handleDelete = (formId) => {
    localStorage.removeItem(`form_${formId}`);
    setForms(forms.filter((form) => form.id !== formId));
    alert("Form Deleted Successfully");
  };

  return (
    <div className="container">
      <div className="d-flex my-5">
        <div className="me-auto">
          <h1>Forms</h1>
        </div>
        <div className="">
          <Link to={"/forms/create"} className="btn btn-outline-primary">
            Create Form
          </Link>
        </div>
      </div>
      <table className="table table-stripped">
        <thead>
          <tr>
            <td>ID</td>
            <td>Form Name</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {forms.length > 0 ? (
            forms.map((form) => (
              <tr key={form.id}>
                <td>{form.id}</td>
                <td>{form.name}</td>
                <td>
                  <Link
                    to={`/forms/${form.id}/details`}
                    className="btn btn-info mx-1"
                  >
                    View
                  </Link>
                  <button
                    className="btn btn-danger mx-1"
                    onClick={() => handleDelete(form.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Forms;

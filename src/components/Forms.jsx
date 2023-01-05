import React, { useEffect, useState } from "react";
import data from "../assets/items.json";
import { Formik } from "formik";
import { Inputs } from "../hook/Inputs";

export const Forms = () => {
  const [state, setState] = useState({});

  useEffect(() => {
    setState(data);
  }, []);

  const arrayState= state.items?.filter(e => e.type !=="submit")
  console.log(arrayState)

  return (
    <div className="w-full h-screen	 border-2 bg-orange-500">
      <h1 className="text-2xl font-bold underline">Formulario</h1>

      <Formik
        initialValues={{
          full_name: "",
          email: "",
          birth_date: "",
          country_of_origin: "",
          terms_and_conditions: "",
        }}
        validate={values => {
            const errors = {};
            
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
          <form onSubmit={handleSubmit}>
            {arrayState?.map((e) => (
              <div>
                <p>{e.label} </p>
                <Inputs
                  type={e.type}
                  name={e.name}
                  onChange={handleChange}                 
                   onBlur={handleBlur}
                  value={e.name}
                  options={e.options}
                />

              </div>
            ))}

            <button type="submit" disabled={isSubmitting}>
              Enviar
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

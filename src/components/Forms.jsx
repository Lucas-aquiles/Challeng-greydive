import React, { useEffect, useState,useContext } from "react";
import data from "../assets/items.json";
import { Formik } from "formik";
import { Inputs } from "../hook/Inputs";
import { db } from "../api/firebase-config";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { contextApp } from "../context/Context";
import { Link } from "react-router-dom";

export const Forms = () => {
  const [state, setState] = useState({});
  const { value} = useContext(contextApp);
  const setValue = value[1]

  useEffect(() => {
    setState(data);
  }, []);

  const arrayState = state.items?.filter((e) => e.type !== "submit");

  async function sendInformation(docData) {
    const response = await addDoc(collection(db, "user"), docData);
  }

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
        validate={(values) => {
          const errors = {};

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            sendInformation(values);
            setValue(values.email)
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
              <div key={e.name}>
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
              <div>Mostrar </div>

            <button type="submit" disabled={isSubmitting}>
              Enviar
            </button>
            <div>  
            <Link to ="/information"> ir </Link>
            </div>
          </form>
        )}
      </Formik>
      
    </div>
  );
};

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
  const [modal,setModal] = useState(false)
  console.log(modal)
  const { value} = useContext(contextApp);
  const setValue = value[1]

  useEffect(() => {
    setState(data);
  }, []);

  const arrayState = state.items?.filter((e) => e.type !== "submit");

  async function sendInformation(docData) {
    const response = await addDoc(collection(db, "user"), docData);
  }

  function screenModal(){
    setModal(!modal)
  }

  return (
    <div className="w-full h-screen	 border-2 bg-gray-800">
      <div className="mx-auto w-2/5	mt-10">   
      <h1 className="text-3xl font-bold  text-slate-200 mt-5 mb-10	">Formulario</h1>

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
                <p className=" text-2xl my-6 text-slate-300">{e.label} </p>
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

              <div  className=" text-2xl  text-slate-300 cursor-pointer" onClick={screenModal} >Enviar</div>
              <div className= { `text-2xl ${modal === true ? 'hidden' : ''}`} >  
            <button   className=" text-2xl  text-slate-300" type="submit" disabled={isSubmitting}>
              Confirmar
            </button>
           
            <Link className=" text-2xl  text-slate-300" to ="/information"> Ir a resultados </Link>
            </div>
          </form>
        )}
      </Formik>
      </div>
    </div>
  );
};

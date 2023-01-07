import React, { useEffect, useState, useContext } from "react";
import data from "../assets/items.json";
import { Formik } from "formik";
import { Inputs } from "../hook/Inputs";
import { db } from "../api/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { contextApp } from "../context/Context";
import { Link } from "react-router-dom";

export const Forms = () => {
  const [state, setState] = useState({});
  const [modal, setModal] = useState(false);
  const { value } = useContext(contextApp);
  const setValue = value[1];

  useEffect(() => {
    setState(data);
  }, []);

  const arrayState = state.items?.filter((e) => e.type !== "submit");

  async function sendInformation(docData) {
    const response = await addDoc(collection(db, "user"), docData);
  }

  function screenModal() {
    setModal(!modal);
  }
  function closeModal(e) {
    e.preventDefault();
    setModal(!modal);
  }
  const stopProp = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="w-full h-screen relative	 bg-gray-300 flex items-center  ">
      <div className="mx-auto w-2/5 px-7  bg-black-example  rounded-md  md:px-3 md:w-3/4">
        <h1 className="text-2xl font-bold  text-slate-200 	mt-5">Formulario</h1>

        <Formik
          initialValues={{
            full_name: "",
            email: "",
            birth_date: "",
            country_of_origin: "",
            terms_and_conditions: false,
          }}
          validate={(values) => {
            const errors = {};
            if (!values.full_name) {
              errors.full_name = "Required";
            } else if (values.full_name.length > 15) {
              errors.full_name = "Must be 15 characters or less";
            }

            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.birth_date) {
              errors.birth_date = "Required";
            }
            if (!values.country_of_origin) {
              errors.country_of_origin = "Required";
            }
            if (!values.terms_and_conditions) {
              errors.terms_and_conditions = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              sendInformation(values);
              setValue(values.email);
              setSubmitting(false);
              screenModal();
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
            <form
              className=" flex flex-col outline-none"
              onSubmit={handleSubmit}
            >
              {arrayState?.map((e) => (
                <div key={e.name}>
                  <p className=" text-1xl my-1 text-slate-300">{e.label} </p>
                  <Inputs
                    type={e.type}
                    name={e.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={e.name}
                    options={e.options}
                  />
                  {errors[e.name] ? (
                    <p className="text-green-example">{errors[e.name]}</p>
                  ) : null}
                </div>
              ))}

              <button
                className=" text-2xl rounded-2xl bg-green-example mb-5 h-10    text-slate-300 cursor-pointer hover:text-green-example  hover:bg-slate-300"
                type="submit"
                disabled={isSubmitting}
              >
                Enviar
              </button>
            </form>
          )}
        </Formik>
        <div
          className={`text-2xl ${
            modal === false
              ? "hidden"
              : "w-full h-full bg-black-rgba  absolute top-0 left-0  flex items-center cursor-pointer "
          }`}
          onClick={(e) => closeModal(e)}
        >
          <div
            className={`text-2xl ${
              modal === false
                ? "hidden"
                : "bg-black-example w-2/4	 h-1/3 mx-auto cursor-auto rounded-md"
            }`}
            onClick={stopProp}
          >
            <div className="mx-auto flex items-center w-4/6 h-4/6 flex-col mt-10  md:mt-5">
              <h3 className=" text-2xl  text-slate-300 md:text-xs md:pl-4">
                Tus respuestas fueron enviadas
              </h3>

              <Link
                className=" text-2xl rounded-3xl text-slate-300 hover:bg-green-example p-2 mt-8 md:text-xs"
                to="/information"
              >
                Ir a resultados
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

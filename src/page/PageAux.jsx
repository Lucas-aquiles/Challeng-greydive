import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../api/firebase-config";
import { contextApp } from "../context/Context";
import { Link } from "react-router-dom";
import Loader from "./PageAux"

const PageAux = () => {
  const [state, setState] = useState({});
  const { value } = useContext(contextApp);
  const userEmail = value[0];

  useEffect(() => {
    getData();
  }, [userEmail]);

  async function getData() {
    const querySnapshot = await getDocs(collection(db, "user"));
    const usersList = querySnapshot.docs.map((doc) => doc.data());
    let user = usersList.find((e) => e.email === userEmail);
    setState(user);
  }

  return (state?.email?.length === 0)?(<Loader/>) :(
    <div className="w-full  h-screen bg-black-example flex items-center  ">
      <div className="mx-auto text-slate-200  w-96 border-2 rounded-3xl p-10 relative bg-green-example md:w-64 md:pl-4  md:pr-2 md:pt-3 md:mt-0">   
      <h2 className="text-3xl md:text-2xl	">Tus Datos</h2>
      <p className="p-2 md:text-xs">Nombre Completo : {state.full_name} </p>
      <p className="p-2 md:text-xs">Email : {state.email} </p>
      <p className="p-2 md:text-xs">Fecha de nacimiento : {state.birth_date} </p>
      <p className="p-2 md:text-xs"> País de Origen : {state.country_of_origin}</p>

      <Link className="absolute p-1 right-5 rounded-3xl bg-black-example text-slate-300 hover:bg-slate-100 hover:text-green-example md:text-xs" to="/">Atras</Link>
      </div>
    </div>
  );
};

export default PageAux;

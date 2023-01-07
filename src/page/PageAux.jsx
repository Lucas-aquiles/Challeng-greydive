import React, { useEffect, useState, useContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../api/firebase-config";
import { contextApp } from "../context/Context";
import { Link } from "react-router-dom";

const PageAux = () => {
  const [state, setState] = useState({});

  const { value } = useContext(contextApp);
  const userEmail = value[0];
  console.log(userEmail);

  useEffect(() => {
    getData();
  }, [userEmail]);

  async function getData() {
    const querySnapshot = await getDocs(collection(db, "user"));
    const usersList = querySnapshot.docs.map((doc) => doc.data());
    let user = usersList.find((e) => e.email === userEmail);
    setState(user);
  }

  return (
    <div className="w-full  h-screen bg-gray-800 flex items-center  ">
      <div className="mx-auto text-slate-200  w-96 border-2 p-10 relative">   
      <h2 className="text-3xl	">Tus Datos</h2>
      <p className="p-2">Nombre Completo : {state.full_name} </p>
      <p className="p-2">Email : {state.email} </p>
      <p className="p-2">Fecha de nacimiento : {state.birth_date} </p>
      <p className="p-2"> País de Origen : {state.country_of_origin}</p>

      <Link className="absolute p-1 right-5 rounded-3xl bg-slate-200 text-gray-800 hover:bg-gray-900 hover:text-slate-100" to="/">Atras</Link>
      </div>
    </div>
  );
};

export default PageAux;

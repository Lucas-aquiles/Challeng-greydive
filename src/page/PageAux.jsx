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
      <div className="mx-auto text-slate-200  w-96 border-2 p-10 ">   
      <h2>Tus Datos</h2>
      <p>Nombre Completo : {state.full_name} </p>
      <p>Email : {state.email} </p>
      <p>fecha de nacimiento : {state.birth_date} </p>
      <p> País de Origen : {state.country_of_origin}</p>

      <Link to="/">Atras</Link>
      </div>
    </div>
  );
};

export default PageAux;

import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Footer from "../component/Footer";
import { toast } from "react-toastify"


export const PlaceList = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();
  const id_club = parseInt(params.id_club);

  const handleSubmit = (id) => {
    navigate(`/detailPlace/${id}`);
  };
  const registerPlace = (id) => {
    navigate(`/registerPlace/${id}`);
  };

  const fetchPlace = async () => {
    const response = await actions.getPlaces(id_club);
    if (response === 0) {
      registerPlace();
    }
  };

  //validamos que exista un token, si no existe lo enviamos a login
  useEffect(() => {
    if (store.token === "" || !store.token) {
      toast.error("No autenticado");
      navigate("/login");
      return;
    }

    fetchPlace();
    actions.getUserData();
  }, [store.token]);

  return (
    <>
      <div className="list-c">
        <div className=" container ">
          <div className=" row d-flex justify-content-center">
            <ul className="list-group col-12  mt-5 mb-2 p-2">
              {
                store.placeslist.map((element, index) => {
                  return (
                    <li
                      className="list-group-item list-group-item-action d-flex justify-content-between form"
                      key={element.id}
                      onClick={() => handleSubmit(element.id)}
                    >
                      {element.name} {element.description} {element.type}
                    </li>
                  );
                }) //fin del map
              }
              <li className="list-group-item d-flex justify-content-between text-bg-info fw-bold">
                {store.placeslist.length} Cantidad de Lugares Registrados
              </li>
            </ul>
            <button
              className="btn btn-warning mb-2 my-2 p-2"
              onClick={() => registerPlace(id_club)}
            >
              Registra un Lugar de Club
            </button>
          </div>
        </div>
      </div>
      <div className="fix">
        <Footer />
      </div>
    </>
  );
};

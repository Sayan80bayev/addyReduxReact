import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { simplifyTimestamp } from "../utils"; // Separate utility functions
import BellButton from "../BellButton";
import {
  useCreateSubMutation,
  useGetSubsQuery,
  useDeleteSubMutation,
} from "../../../store";

export default function Adds({ advertisements }) {
  const { data: activeSubscriptions = [] } = useGetSubsQuery();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState();
  const [createSubscribe] = useCreateSubMutation();
  const [deleteSubscription] = useDeleteSubMutation();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setEmail(jwtDecode(token)?.sub);
      setToken(token);
    }
  }, []);

  const handleBellClick = async (e, advertisementId) => {
    e.stopPropagation();
    const isSubscribed =
      activeSubscriptions.filter(
        (sub) => sub.advertisement_id === advertisementId
      ).length > 0;
    try {
      isSubscribed
        ? await deleteSubscription({ id: advertisementId, email: email })
        : await createSubscribe({ id: advertisementId, email: email });
    } catch (error) {
      console.error("Error handling subscription:", error);
    }
  };

  return (
    <div className="ctn">
      {advertisements.map((advertisement) => {
        const isSubscribed =
          activeSubscriptions.filter(
            (sub) => sub.advertisement_id === advertisement.id
          ).length > 0;

        return (
          <div key={advertisement.id} className="card-ctn">
            <div className="card add">
              {advertisement.images.length > 0 ? (
                <img
                  src={`data:image/jpeg;base64,${advertisement.images[0].imageData}`}
                  alt="First Image"
                />
              ) : (
                <img
                  src={process.env.PUBLIC_URL + "/empty.jpg"}
                  alt={advertisement.title}
                />
              )}
              <div className="card-info">
                <h5 key={advertisement.id}>
                  <Link
                    to={"/view/" + advertisement.id}
                    state={{
                      email: advertisement.email,
                      similarParams: {
                        addId: advertisement.id,
                        price: advertisement.price,
                        catId: advertisement.category.category_id,
                      },
                    }}
                    className="link_to_full"
                  >
                    {advertisement.title}
                  </Link>
                  {token && email !== advertisement.email && (
                    <BellButton
                      className={`bell ${
                        isSubscribed ? "active" : "not-subscribed"
                      }`}
                      onClick={(e) => handleBellClick(e, advertisement.id)}
                    ></BellButton>
                  )}
                </h5>
                <p className="price">
                  <b>{advertisement.price}</b>
                </p>
                <p>{advertisement.category.category_name}</p>
                <p style={{ display: "flex", justifyContent: "space-between" }}>
                  <small>{simplifyTimestamp(advertisement.date)}</small>
                  <div className="views">
                    <img
                      className="rec_icon"
                      src={process.env.PUBLIC_URL + "/view-eye-svgrepo-com.png"}
                      alt="Views Icon"
                    />
                    <h6 style={{ display: "block" }}>{advertisement.views}</h6>
                  </div>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

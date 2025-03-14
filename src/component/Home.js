import React from "react";
import { IoFlaskOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuDrama } from "react-icons/lu";
import { GrHistory } from "react-icons/gr";
import {
  GiPoliceOfficerHead,
  GiMorbidHumour,
  GiHorseHead,
} from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { SiGraphite } from "react-icons/si";

function Home() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/books/${category.toLowerCase()}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary fw-bold">Gutenberg Project</h2>
      <p className="fs-5">
        A social cataloging website that allows you to freely search its
        database of books, annotations, and reviews.
      </p>

      <div className="row mt-4">
        {[
          { label: "FICTION", icon: <IoFlaskOutline />, category: "Fiction" },
          { label: "PHILOSOPHY", icon: <SiGraphite />, category: "PHILOSOPHY" },
          { label: "DRAMA", icon: <LuDrama />, category: "DRAMA" },
          { label: "HISTORY", icon: <GrHistory />, category: "HISTORY" },
          { label: "HUMOUR", icon: <GiMorbidHumour />, category: "HUMOUR" },
          { label: "ADVENTURE", icon: <GiHorseHead />, category: "ADVENTURE" },
          {
            label: "POLITICS",
            icon: <GiPoliceOfficerHead />,
            category: "POLITICS",
          },
        ].map(({ label, icon, category }) => (
          <div key={label} className="col-12 col-md-5 mx-md-3 mb-3">
            <div
              className="shadow bg-white rounded p-3 d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="d-flex align-items-center">
                <span
                  style={{ fontSize: "30px", color: "#5e56e7" }}
                  className="me-3"
                >
                  {icon}
                </span>
                <h5 className="m-0">{label}</h5>
              </div>
              <FaArrowRightLong
                style={{ fontSize: "25px", color: "#5e56e7" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

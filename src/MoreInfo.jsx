// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Header } from "./Header";

// const MoreInfo = () => {
//   const [loading, setLoading] = useState(false);
//   const [movie, setMovie] = useState(null);
//   const [error, setError] = useState(null);
//   const { index } = useParams();
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const response = await axios.get(
//           `https://swapi.dev/api/films/${index}`
//         );
//         setMovie(response.data);
//         setError(null);
//       } catch (error) {
//         setError(error);
//         setMovie(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getData();
//   }, []);

//   return (
//     <div className="container">
//       <Header />
//       <div className="list">
//         <Link to="/"> back to list </Link>
//       </div>
//       {/* <div>
//         {loading && <Spinner />}
//         {error && <p>{`There's a problem fetching your data ${error}`}</p>}
//       </div> */}
//       <div>
//         <div>
//           {movie && (
//             <div>
//               <h1 color="white"> {movie.title}</h1>
//               <p>{movie.director}</p>
//               <p>{movie.producer}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoreInfo;

import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Species from "./Species";
import { Header } from "./Header";
import Starships from "./StarShip";
import Vehicles from "./Vehicles";
import Planets from "./Planet";
import Character from "./Character";
import Spinner from "./Spinner";
import "./MoreInfo.css";

const MoreInfo = () => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  const { index } = useParams();

  useEffect(() => {
    fetch(`https://swapi.dev/api/films/${index}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP Error: the status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setInfo(data);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setInfo(null);
      })
      .finally(() => setLoading(false));
  });

  return (
    <div className="main-body">
      <Header />
      <div className="boxx">
        <div className="section-1">
          <div className="lefft">
            <Link className="back" to="/">
              &larr; Back to List
            </Link>
          </div>

          {loading && <Spinner />}
          {error && (
            <h3>{`There is a problem fetching your data - ${error}`}</h3>
          )}

          <div className="title-block">
            {info && (
              <div>
                <h2> {info.title} </h2>
                <p> Director: {info.director}</p>
                <p> Producer: {info.producer} </p>
              </div>
            )}
          </div>
        </div>
        {info && (
          <div className="description">
            <p className="sub-head"> Description</p>
            <p> {info.opening_crawl}</p>
          </div>
        )}

        {info?.characters?.length && (
          <div className="block">
            <p className="sub-head"> Characters</p>
            <ul className="character-list">
              {info.characters.map((character) => (
                <Character url={character} key={character}>
                  {character}
                </Character>
              ))}
            </ul>
          </div>
        )}
        {info?.planets?.length && (
          <div className="block">
            <p className="sub-head"> Planet</p>
            <ul className="planet-list">
              {info.planets.map((planet) => (
                <Planets url={planet} key={planet}>
                  {planet}
                </Planets>
              ))}
            </ul>
          </div>
        )}
        {info?.species?.length && (
          <div className="block">
            <p className="sub-head"> Species</p>

            <ul className="species-list">
              {info.species.map((species) => (
                <Species url={species} key={species}>
                  {species}
                </Species>
              ))}
            </ul>
          </div>
        )}
        {info?.starships?.length && (
          <div className="block">
            <p className="sub-head"> Starship</p>

            <ul className="starship-list">
              {info.starships.map((starships) => (
                <Starships url={starships} key={starships}>
                  {starships}
                </Starships>
              ))}
            </ul>
          </div>
        )}
        {info?.vehicles?.length && (
          <div className="block">
            <p className="sub-head"> Vehicles</p>

            <ul className="vehicle-list">
              {info.vehicles.map((vehicles) => (
                <Vehicles url={vehicles} key={vehicles}>
                  {vehicles}
                </Vehicles>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreInfo;

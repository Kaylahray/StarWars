import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import Spinner from "./Spinner";
import { Header } from "./Header";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://swapi.dev/api/films");
        setData(response.data);
        setError(null);
      } catch (error) {
        setError(error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Header />
      {loading && <Spinner />}

      <div className="container">
        {error && <p>{`There's a problem fetching your data ${error}`}</p>}

        {data &&
          data.results.map((item) => (
            <div key={item.episode_id} className="box">
              <div className="up">
                <h2> {item.title}</h2>
                <p> {item.release_date}</p>
              </div>
              <div className="second">
                <p> {item.opening_crawl}</p>
              </div>
              <div className="third">
                <p>
                  <a href="/"> more info</a>
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;

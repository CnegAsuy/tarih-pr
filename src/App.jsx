import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./App.css";
import "./index.css";

async function fetchData() {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data.json`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

function zero() {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("id"));
  return 0;
}

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const x = Number(searchParams.get("id")) || zero();

  useEffect(() => {
    async function getData() {
      try {
        const result = await fetchData();
        setData(result);
      } catch (err) {
        setError("Failed to fetch data: " + err.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data || data.length <= x) {
    return <div>No data available</div>;
  }

  const scientist = data[x];

  return (
    <>
      <a href="/tarih-pr/#/menu">
        <button>Ana Menüye dön ⏎</button>
      </a>
      <div className="scientist-container">
        <h1 className="city">{scientist.name}</h1>

        <div className="scientist-info">
          {scientist.url && (
            <img
              src={scientist.url}
              alt="Fotoğraf bulunmamaktadır."
              className="photo"
            />
          )}
          <h2 className="scientist-name">{scientist.city}</h2>
          <ul className="scientist-prop">
            <li>
              <b>Doğum Yeri:</b> {scientist.place_of_birth}
            </li>
            <li>
              <b>Yaşadığı Tarihler:</b> {scientist.birth_death}
            </li>
            <li>
              <b>Çalışma Yaptığı Alanlar:</b>{" "}
              {scientist.fields.map((f, i) => (
                <span key={i}>{f} </span>
              ))}
            </li>
          </ul>
          <br />
          <p>{scientist.contributions}</p>
        </div>

        {scientist.works != null &&
          scientist.works.map((work) => (
            <div key={work.title}>
              <br />
              <br />
              <div className="scientist-info">
                <div className="discovery-header">
                  <h3>{work.title}</h3>
                  {work.pic && (
                    <img src={work.pic} alt={work.title} className="photo" />
                  )}
                </div>
                <ul className="scientist-prop">
                  <li>{work.description}</li>
                </ul>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;

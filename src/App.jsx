import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./App.css";
import "./index.css";
async function fetchData() {
  try {
    const response = await fetch("/data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const x = Number(searchParams.get("id")) || 0;

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

  return (
    <>
      <a href="/menu">
        <button>Ana Menüye dön ⏎</button>
      </a>
      <div className="scientist-container">
        <h1 className="city">{data[x].name}</h1>

        <div className="scientist-info">
          <img
            src="https://i.ytimg.com/vi/rIuuLuwufRs/hqdefault.jpg"
            alt="Mevlana Celaleddin Rumi"
            className="photo"
          />
          <h2 className="scientist-name">{data[x].city}</h2>
          <ul className="scientist-prop">
            <li>
              <b>Doğum Yeri:</b> {data[x].place_of_birth}
            </li>
            <li>
              <b>Yaşadığı Tarihler:</b> {data[x].birth_death}
            </li>
            <li>
              <b>Çalışma Yaptığı Alanlar:</b>{" "}
              {data[x].fields.map((f) => (
                <>{f + " "}</>
              ))}
            </li>
          </ul>
          <br />
          <p>{data[x].contributions}</p>
        </div>
        {data[x].works != null &&
          data[x].works.map((work) => (
            <div key={work.title}>
              <br />
              <br />
              <div className="scientist-info">
                <div className="discovery-header">
                  <h3>{work.title}</h3>
                  <img src={work.pic} alt={work.title} className="photo" />
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

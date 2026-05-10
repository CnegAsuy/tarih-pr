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
  // Note: calling hooks inside a helper function like this isn't standard React practice, 
  // but keeping it to match your current logic.
  return 0;
}

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  
  // Calculate index safely
  const queryId = searchParams.get("id");
  const x = queryId !== null ? Number(queryId) : 0;

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

  // Helper to ensure URLs are embed-compatible
  const getEmbedUrl = (url) => {
    if (!url) return null;
    
    try {
      let videoId = "";
      
      if (url.includes("shorts/")) {
        // Handle shorts: extract ID after /shorts/
        videoId = url.split("shorts/")[1].split("?")[0];
      } else if (url.includes("v=")) {
        // Handle standard watch?v=... links
        const urlParams = new URLSearchParams(new URL(url).search);
        videoId = urlParams.get("v");
      } else if (url.includes("youtu.be/")) {
        // Handle shortened youtu.be/ID links
        videoId = url.split("youtu.be/")[1].split("?")[0];
      }

      return `https://www.youtube.com/embed/${videoId}`;
    } catch (e) {
      console.error("Invalid URL provided to embedder", url);
      return null;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data || !data[x]) return <div>No data available</div>;

  const currentItem = data[x];

  return (
    <>
      <a href="/tarih-pr/#/menu">
        <button>Ana Menüye dön ⏎</button>
      </a>

      <div className="scientist-container">
        <h1 className="city">{currentItem.name}</h1>

        <div className="scientist-info">
          <img
            src={currentItem.url}
            alt="Fotograf bulunmamaktadir."
            className="photo"
          />
          <h2 className="scientist-name">{currentItem.city}</h2>
          <ul className="scientist-prop">
            <li><b>Doğum Yeri:</b> {currentItem.place_of_birth}</li>
            <li><b>Yaşadığı Tarihler:</b> {currentItem.birth_death}</li>
            <li>
              <b>Çalışma Yaptığı Alanlar:</b>{" "}
              {currentItem.fields.map((f, i) => (
                <span key={i}>{f} </span>
              ))}
            </li>
          </ul>
          <br />
          <p>{currentItem.contributions}</p>

          {/* --- VIDEO SECTION START --- */}
          {currentItem.video_url && (
            <div className="video-wrapper" style={{ marginTop: "20px", textAlign: "center" }}>
              <iframe
                width="100%"
                height="400"
                src={getEmbedUrl(currentItem.video_url)}
                title={`${currentItem.name} Video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ borderRadius: "12px", maxWidth: "600px" }}
              ></iframe>
            </div>
          )}
          {/* --- VIDEO SECTION END --- */}
        </div>

        {currentItem.works?.map((work) => (
          <div key={work.title}>
            <br /><br />
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
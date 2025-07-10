import { useState, useEffect } from "react"
function HomePage() {
  const [reqUrl, setReqUrl] = useState("");
  const [data, setData]=useState(null);

  useEffect(() => {
    console.log(reqUrl);
  }, [reqUrl]);

  async function handleSubmit() {
    try {
      const response = await fetch("http://localhost:5000/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({url:reqUrl}),
      });
      const data= await response.json();
      console.log("RESPONSE: ", data);
      console.log("BODY URL", data.url);
      console.log("BODY ID", data.id);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>HomePage
      <input onChange={(e) => setReqUrl(e.target.value)} value={reqUrl} placeholder="Enter your url here" />
      <button onClick={handleSubmit}>Submit</button>
      {data && 
      <div>
        <a href={`https://${data.url}`}>http://shorturl/{data.id}</a>
        </div>
        }
    </div>
  )
}

export default HomePage
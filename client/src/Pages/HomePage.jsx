import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
function HomePage() {
  const [reqUrl, setReqUrl] = useState("");
  const [data, setData] = useState(null);
  const user = useSelector((state) => state?.user);
  const token = useSelector((state) => state.token);
  const userId = user._id;

  useEffect(() => {
    console.log(reqUrl);
  }, [reqUrl]);

  async function handleSubmit() {
    try {
      const response = await fetch("http://localhost:5000/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: reqUrl, id: userId }),
      });
      const data = await response.json();
      console.log("RESPONSE: ", data);
      console.log("BODY URL", data.redirectUrl);
      console.log("BODY ID", data.shortId);
      console.log("ID: ", user + " Token: ", token);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLike() {
    try {
      const response= await fetch("http://localhost:5000/likes",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id:data._id,liked:data.liked}),
      });
      const result=await response.json();
      console.log("Liked data: ", result);
      setData(result);

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
          <a href={`https://${data.redirectUrl}`}>http://shorturl/{data.shortId}</a>
          <button onClick={handleLike}>Like</button>
        </div>
      }
    </div>
  )
}

export default HomePage
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ThumbsUp, ThumbsDown } from 'lucide-react';

function HomePage() {
  const [reqUrl, setReqUrl] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const user = useSelector((state) => state?.user);
  const token = useSelector((state) => state.token);
  const userId = user._id;
  const apiUrl=import.meta.env.VITE_API_URL;

  useEffect(() => {
    console.log(reqUrl);
  }, [reqUrl]);

  function isValidUrl(url) {
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;
    console.log("URL TEST: ", urlRegex.test(url))
    return urlRegex.test(url);
  }

  async function handleSubmit() {
    setError("");
    if (!isValidUrl(reqUrl)) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/url`, {
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
      setReqUrl("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLike() {
    try {
      const response = await fetch(`${apiUrl}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: data._id, liked: data.liked }),
      });
      const result = await response.json();
      console.log("Liked data: ", result);
      setData(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <h1 className="text-2xl font-bold mb-4">Shorten Your URL</h1>
      <input
        onChange={(e) => setReqUrl(e.target.value)}
        value={reqUrl}
        placeholder="Enter your URL here"
        className="w-full max-w-md p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-orange-400 mb-2"
      />
      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
      <button
        onClick={handleSubmit}
        className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded transition mb-4"
      >
        Submit
      </button>

      {data && (
        <div className="bg-black/60 p-4 rounded-lg text-center">
          <a
            href={`${data.redirectUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:underline block mb-2"
          >
            http://shorturl/{data.shortId}
          </a>
          <button
            onClick={handleLike}
            className="bg-orange-600 hover:bg-orange-500 text-white py-1 px-3 rounded transition"
          >
            {data.liked ? <div className="flex space-x-2 px-2 items-center justify-center"><p>Unlike</p><ThumbsDown size={18} /></div> : <div className="flex space-x-2 px-2 items-center justify-center"><p>Like</p><ThumbsUp size={18} /></div>}
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;

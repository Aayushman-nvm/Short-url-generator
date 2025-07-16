import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

function Favourites() {
  const userId = useSelector((state) => state.user._id);
  const [allUrl, setAllUrl] = useState();

  async function getAllUrl() {
    const response = await fetch("http://localhost:5000/favourites", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: userId }),
    });
    const data = await response.json();
    console.log(data);
    setAllUrl(data);
    return data;
  }

  async function handleLikedUrl(urlId, likeStatus) {
    try {
      const response = await fetch("http://localhost:5000/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: urlId, liked: likeStatus }),
      });
      const result = await response.json();
      console.log("Liked data: ", result);

      if (!result.liked) {
        setAllUrl(prevUrls =>
          prevUrls.filter(item =>
            item._id !== result._id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    try {
      getAllUrl();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>Favourites
      {allUrl && <div>
        {allUrl.map((item, index) => <div key={index}>
          <p>id:{item.shortId} url:{item.redirectUrl}</p>
          <button onClick={() => handleLikedUrl(item._id, item.liked)}>Unlike</button>
        </div>)}
      </div>}
    </div>
  )
}

export default Favourites
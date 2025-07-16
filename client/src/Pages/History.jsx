import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
function History() {
  const userId = useSelector((state) => state.user._id);
  const [allUrl, setAllUrl] = useState();
  const [deletedUrl, setDeletedUrl]=useState();

  async function getAllUrl() {
    const response = await fetch("http://localhost:5000/history", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: userId }),
    });
    const data = await response.json();
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

      setAllUrl(prevUrls =>
        prevUrls.map(item =>
          item._id === result._id ? result : item)
      );

    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteUrl(urlId) {
    try {
      const response=await fetch("http://localhost:5000/delete",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id:urlId, userId:userId })
      });
      const result=await response.json();
      console.log(result);
      setAllUrl(result.allUrl);
      setDeletedUrl(result.deletedUrl)
      alert(`Successfully deleted url: ${deletedUrl.redirectUrl}`)
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
    <div>History
      {allUrl && <div>
        {allUrl.map((item, index) => <div key={index}>
          <p>id:{item.shortId} url:{item.redirectUrl}</p>
          <button onClick={() => handleLikedUrl(item._id, item.liked)}>{item.liked ? <p>Unlike</p> : <p>Like</p>}</button>
          <button onClick={() => handleDeleteUrl(item._id)}>Delete</button>
        </div>)}
      </div>}
    </div>
  )
}

export default History
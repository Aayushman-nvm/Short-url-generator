import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThumbsUp, ThumbsDown, Trash2, Link as LinkIcon } from "lucide-react";

function History() {
  const userId = useSelector((state) => state.user._id);
  const [allUrl, setAllUrl] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl=import.meta.env.VITE_API_URL;

  async function getAllUrl() {
    try {
      const response = await fetch(`${apiUrl}/history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });
      const data = await response.json();
      setAllUrl(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLikedUrl(urlId, likeStatus) {
    try {
      const response = await fetch(`${apiUrl}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: urlId, liked: likeStatus }),
      });
      const result = await response.json();
      console.log("Liked data: ", result);

      setAllUrl(prevUrls =>
        prevUrls.map(item =>
          item._id === result._id ? result : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteUrl(urlId) {
    try {
      const response = await fetch(`${apiUrl}/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: urlId, userId: userId }),
      });
      const result = await response.json();
      console.log(result);

      setAllUrl(result.allUrl);
      alert(`Successfully deleted URL: ${result.deletedUrl.redirectUrl}`);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUrl();
  }, []);

  return (
    <div className="min-h-screen text-white px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Your URL History</h1>

      {loading ? (
        <p className="text-center text-gray-300">Loading your URLs...</p>
      ) : allUrl && allUrl.length > 0 ? (
        <div className="space-y-4 max-w-xl mx-auto">
          {allUrl.map((item, index) => (
            <div
              key={index}
              className="bg-black/60 p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <LinkIcon size={18} className="text-orange-400 hidden sm:block" />
                <a
                  href={`https://${item.redirectUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:underline break-all"
                >
                  shorturl/{item.shortId}
                </a>
              </div>

              <div className="flex space-x-3 mt-2 sm:mt-0">
                <button
                  onClick={() => handleLikedUrl(item._id, item.liked)}
                  className="hover:text-orange-400 transition"
                  title={item.liked ? "Unlike" : "Like"}
                >
                  {item.liked ? <ThumbsDown size={20} /> : <ThumbsUp size={20} />}
                </button>
                <button
                  onClick={() => handleDeleteUrl(item._id)}
                  className="hover:text-red-400 transition"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-300">No URLs found. Start shortening your links!</p>
      )}
    </div>
  );
}

export default History;

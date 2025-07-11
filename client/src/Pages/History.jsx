import { useEffect,useState } from "react"
import { useSelector } from "react-redux";
function History() {
  const userId=useSelector((state)=>state.user._id);
  const [allUrl, setAllUrl]=useState();

  async function getAllUrl() {
    const response=await fetch("http://localhost:5000/history",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({id:userId}),
    });
    const data= await response.json();
    console.log(data);
    setAllUrl(data);
    return data;
  }

useEffect(()=>{
  try {
    getAllUrl();
  } catch (error) {
    console.log(error);
  }
},[]);

  return (
    <div>History
      {allUrl && <div>
        {allUrl.map((item, index)=><p key={index}>id:{item.shortId} url:{item.redirectUrl}</p>)}
        </div>}
    </div>
  )
}

export default History
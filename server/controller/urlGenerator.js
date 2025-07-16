import { nanoid } from "nanoid";
import { URL } from "../model/url.js";

export async function handleUrlGenerator(req, res) {
  const body = req.body;
  const shortId = nanoid(8);
  console.log(req.body);

  const url = await URL.create({
    createdBy: body.id,
    shortId: shortId,
    redirectUrl: body.url,
    liked: false,
  });

  const savedUrl = await url.save();

  return res.json(savedUrl);
}

export async function handleAllUrl(req, res) {
  const body = req.body;
  console.log(body);
  const allUrl = await URL.find({ createdBy: body.id });
  console.log(allUrl);

  return res.json(allUrl);
}

export async function handleLikedUrl(req, res) {
  console.log("Liked: ", req.body);
  const body = req.body;
  const updateliked = !body.liked;
  console.log("After change: ", updateliked);
  const updatedUrl = await URL.findByIdAndUpdate(
    body.id,
    { liked: updateliked },
    { new: true }
  );
  console.log("Url after liking: ",updatedUrl);
  return res.json(updatedUrl);
}

export async function handleAllLikedUrl(req, res) {
  const body = req.body;
  console.log(body);
  const allUrl = await URL.find({ createdBy: body.id, liked: true });
  console.log("All liked url: ",allUrl);

  return res.json(allUrl);
}

export async function handleDeleteUrl(req, res) {
  const body=req.body;
  console.log("Backend body: ",body);
  const deletedUrl=await URL.findByIdAndDelete(body.id);
  const allUrl=await URL.find({ createdBy: body.userId });
  return res.json({deletedUrl:deletedUrl, allUrl:allUrl});
}
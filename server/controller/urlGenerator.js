import { nanoid } from "nanoid";
import { URL } from "../model/url.js";

export async function handleUrlGenerator(req, res) {
  const body = req.body;
  const shortId = nanoid(8);
  console.log(req.body)

  const url=await URL.create({
    createdBy:body.id,
    shortId: shortId,
    redirectUrl: body.url,
  });

  const savedUrl = await url.save();

  return res.json(savedUrl);
}

export async function handleAllUrl(req, res){
  const body=req.body;
  console.log(body);
  const allUrl= await URL.find({createdBy:body.id});
  console.log(allUrl);

  return res.json(allUrl);
}

import { nanoid } from "nanoid";
import { URL } from "../model/url.js";

export async function handleUrlGenerator(req, res) {
  const body = req.body;
  const shortId = nanoid(8);

  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
  });

  const allUrls = await URL.find({});

  return res.json({
    url: allUrls,
    id: shortId,
  });

}

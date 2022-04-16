import {NextApiRequest, NextApiResponse} from "next";
import {Data} from "@dnd-kit/core/dist/store";

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  let response = await fetch("https://analytics.find.army/umami.js");
  let js = await response.text()

  js = js.replace("/api/collect" , '/foo/bar');
  console.log(js);


  return res.send({
    headers: {
      "Content-Type": "application/javascript; charset=UTF-8"
    },
    statusCode: 200,
    body: js
  })


  // js = js.replace("/api/collect" , Endpoint)
  //
  // response = new Response(js, {
  //   headers: response.headers
  // })
  //
  // event.waitUntil(caches.default.put(event.request, response.clone()));

}

export const config = {
  api: {
    bodyParser: false,
  },
}



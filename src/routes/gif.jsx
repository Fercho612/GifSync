import { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from 'react-router-dom';

import { Form, useLoaderData } from "react-router-dom";
import { getGif } from "../local-gif";

export async function loader({ params }) {
  const gif = await getGif(params.gifId);
  return { gif };
}


export default function GifElements() {
  const [gifs,setGifs] = useState([]);
  const { gifId } = useParams();
  const { gif } = useLoaderData();

  useEffect(() => {
    axios({
      method: 'get',
      baseURL: `https://tenor.googleapis.com/v2/search?q=${gif.name}&key=AIzaSyDsqy5Qe-Rpyxu_ThNNSKzlJFjCqPkjfow&client_key=my_test_app&limit=15`,
      responseType: 'json'
    }).then(function (response) {
      setGifs(response.data.results)
    });
  }, [gifId]);
  return (
    <ul>
      {gifs.map((gif, id) => (
        <li key={id}>
          <img src={gif.media_formats.tinygif.url} alt={`Gif ${id}`} />
        </li>
      ))}
    </ul>
  )
}

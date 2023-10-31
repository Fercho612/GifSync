import { Form, useLoaderData, redirect } from "react-router-dom";
import { updateGif } from "../local-gif";

export async function action({ request, params }) {
  console.log(params)
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateGif(params.gifId, updates);
  return redirect(`/gifs/${params.gifId}`);
}


export default function EditGif() {
  const { gif } = useLoaderData();

  return (
    <Form method="post" id="contact-form">
      <h3>Edit Gif</h3>
      <p>
        <span>Name: </span>
        <input
          placeholder="Name"
          aria-label="Name"
          type="text"
          name="name"
          defaultValue={gif.name}
        />
      </p>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
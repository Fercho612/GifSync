import { Form, useLoaderData, redirect } from "react-router-dom";
import { deleteGif } from "../local-gif";

export async function action({ params }) {
  console.log(params)
  await deleteGif(params.gifId);
  return redirect("/");
}

export default function ConfirmDelete() {
  const { gif } = useLoaderData();

  return (
    <Form method="post" id="contact-form">
      <h3>Confirm delete </h3>
      <p>
        <button type="submit">Confirm</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
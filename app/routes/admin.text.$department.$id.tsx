import { LoaderFunction, defer, json } from "@remix-run/node";
import { DepartmentType } from "~/model/data/actions";
import { getText } from "~/model/text";
import {
  Await,
  useLoaderData,
  useNavigation,
  useNavigate,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
export const loader: LoaderFunction = async ({ request, params }) => {
  let department = params.department as DepartmentType;
  let text = await getText(department, parseInt(params?.id!));
  return json({ text });
};

export default function AboutOneText() {
  const { text } = useLoaderData();
  let navigation = useNavigation();
  let navigate = useNavigate();
  let dialogRef = useRef<HTMLDialogElement>(null);
  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (text) dialogRef.current?.showModal();
  }, [text]);
  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        {navigation.state !== "idle" && <div>loading</div>}

        <h3 className="text-gray-500">source:</h3>
        <p className=" text-sm">{text.original_text}</p>
        <h3 className="text-gray-500">translated</h3>
        <p className=" text-sm">{text.translated}</p>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={goBack}>close</button>
      </form>
    </dialog>
  );
}

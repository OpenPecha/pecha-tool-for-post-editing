import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchDharmaMitraData } from "~/api";
import TextView from "~/component/TextView";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  let text = "བདག་ནི་སྐྱེ་བ་ཐམས་ཅད་དུ།";
  let getdata = await fetchDharmaMitraData(text);
  return {
    mitra: JSON.parse(getdata!),
  };
};

export default function EN_to_BO() {
  let data = useLoaderData();
  console.log(data);
  return (
    <div>
      <TextView />
    </div>
  );
}

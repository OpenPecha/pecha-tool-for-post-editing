import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchDharmaMitraData } from "~/api";

export const loader: LoaderFunction = async () => {
  let text =
    "བདག་ནི་སྐྱེ་བ་ཐམས་ཅད་དུ། །བསྟན་པ་གསལ་བར་བྱེད་གྱུར་ཅིག །བསྟན་པ་གསལ་བར་མ་ནུས་ནའང་། །བསྟན་པའི་ཁུར་ཆེན་འཁུར་བར་ཤོག །ཁུར་ཆེན་འཁུར་བར་མ་ནུས་ནའང་། །བསྟན་པའི་སེམས་ཁྲལ་བྱེད་པ་དང་། །བསྟན་པ་ཉམས་ཀྱིས་དོགས་པ་ཡིས། །བྱ་ར་ཙམ་ཡང་བྱེད་པར་ཤོག །མཁའ་ཁྱབ་ཕ་མ་ཐམས་ཅད་ཀྱི། །སྡུག་བསྔལ་ཐམས་ཅད་སེལ་བར་ཤོག །སྡུག་བསྔལ་སེལ་བར་མ་ནུས་ནའང་། །སྡུག་གྲོགས་ཙམ་ཡང་བྱེད་པར་ཤོག །";
  let data = await fetchDharmaMitraData(text);
  return { data };
};

function en2bo() {
  let data = useLoaderData();
  console.log(data);
  return <div>hello</div>;
}

export default en2bo;

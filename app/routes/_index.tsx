import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Post editing" },
    { name: "description", content: "post editing" },
  ];
};

export default function Index() {
  let mainStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100dvw",
    height: "100dvh",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
  };
  let link = {
    textDecoration: "none",
    color: "inherit",
    backgroundColor: "#eee",
    padding: "1rem",
    borderRadius: "1rem",
  };

  return (
    <div style={mainStyle}>
      <Link to="/bo2en?session=temp" style={link}>
        བོད་ཡིག་ to English
      </Link>
      <Link to="/en2bo?session=temp" style={link}>
        ENGLISH to བོད་ཡིག་
      </Link>
    </div>
  );
}

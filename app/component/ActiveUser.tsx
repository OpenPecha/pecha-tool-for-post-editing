import { useIdle } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
export default function ActiveUser({ state }) {
  const [active, setActive] = useRecoilState(state);
  const idle = useIdle(5000);
  let timer = null;
  useEffect(() => {
    if (!idle) {
      timer = setInterval(() => {
        setActive((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [idle]);
  return (
    <div>
      <span className={idle ? "idle" : ""} />
      <label>Status: {!idle ? active + " s" : "idle"}</label>
    </div>
  );
}

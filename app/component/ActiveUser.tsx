import { useLocation } from "@remix-run/react";
import { useIdle } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
export default function ActiveUser({ state }: { state: any }) {
  const [active, setActive] = useRecoilState(state);
  const idle = useIdle(5000);
  const location = useLocation();
  let timer = null;
  useEffect(() => {
    if (!idle) {
      timer = setInterval(() => {
        setActive((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [idle]);
  useEffect(() => {
    setActive(0);
  }, [location.search]);
  return (
    <div>
      <span className={idle ? "idle" : ""} />
      <label>Status: {!idle ? active + " s" : "idle"}</label>
    </div>
  );
}

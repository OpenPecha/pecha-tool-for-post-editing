import { BsFillPlayFill } from "react-icons/bs";
import { Button } from "~/components/ui/button";

export function SaveButton({
  handleClick,
  condition,
}: {
  handleClick: () => void;
  condition: boolean;
}) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="h-4 w-4 mr-3"
      onClick={handleClick}
      disabled={!condition}
    >
      <BsFillPlayFill className={"text-green-500"} />
    </Button>
  );
}

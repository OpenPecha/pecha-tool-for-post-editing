import { useFetcher } from "@remix-run/react";
import { User } from "@prisma/client";
import { Switch } from "~/components/ui/switch";
function AllowAnnotation({ annotator }: { annotator: User }) {
  const fetcher = useFetcher();

  function handleChangeAllow() {
    fetcher.submit(
      {
        id: annotator.id,
        allow: !annotator.isActive,
        action: "change_allow_assign",
      },
      {
        method: "POST",
      }
    );
  }

  return (
    <Switch
      title="active/inactive"
      checked={annotator?.isActive!}
      onCheckedChange={handleChangeAllow}
    />
  );
}

export default AllowAnnotation;

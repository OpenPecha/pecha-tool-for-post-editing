import { User } from "@prisma/client";
import { Role } from "@prisma/client";
import { useFetcher } from "react-router-dom";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "~/components/ui/select";
function AssignRole({
  annotator,
  isAdmin,
}: {
  annotator: User;
  isAdmin: boolean;
}) {
  const fetcher = useFetcher();

  let options: { value: Role; label: Role }[] = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "REVIEWER", label: "REVIEWER" },
    { value: "ANNOTATOR", label: "ANNOTATOR" },
    { value: "USER", label: "USER" },
  ];
  let value = { value: annotator.role, label: annotator.role };
  function handleChange(data) {
    let role = data;
    if (!role) {
      data = "";
    }
    let i = confirm(
      "do you want " + annotator.nickname + " to be " + role + "?"
    );
    if (i) {
      fetcher.submit(
        {
          id: annotator.id,
          role,
          action: "change_role",
        },
        {
          method: "POST",
        }
      );
    }
  }

  return (
    // <Select
    //   isMultiple={false}
    //   value={value}
    //   primaryColor="green"
    //   onChange={handleChange}
    //   options={options}
    //   isSearchable
    //   isDisabled={!isAdmin}
    //   loading={fetcher.state !== "idle"}
    // />
    <Select onValueChange={handleChange} disabled={!isAdmin}>
      <SelectTrigger className="w-[180px] h-6">
        <SelectValue placeholder={annotator.role} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => {
          return (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default AssignRole;

import { NavLink, useLoaderData, Link } from "@remix-run/react";

import { cn } from "~/lib/utils";
const Header = (props: { className?: string }) => {
  const { user } = useLoaderData();
  let url = "/?session=" + user.username;
  return (
    <nav
      className={cn(
        "flex items-center space-x-4 lg:space-x-6",
        props.className
      )}
      {...props}
    >
      <Link to={url} className="flex items-center space-x-2">
        Home
      </Link>
      <NavLink
        className={({ isActive, isPending }) =>
          `text-sm ${
            isActive && "text-black"
          } font-medium transition-colors hover:text-primary `
        }
        to={`/admin/metabase?session=${user.username}`}
      >
        Dashboard
      </NavLink>
      <NavLink
        to={"/admin/user?session=" + user.username}
        className={({ isActive }) =>
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary " +
          (isActive && "bg-gray-300 px-2 rounded")
        }
      >
        Users
      </NavLink>
      <NavLink
        to={"/admin/text/bo_en?session=" + user.username}
        className={({ isActive }) =>
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary " +
          (isActive && "bg-gray-300 px-2 rounded")
        }
      >
        Bo-En
      </NavLink>
      <NavLink
        to={"/admin/text/en_bo?session=" + user.username}
        className={({ isActive }) =>
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary " +
          (isActive && "bg-gray-300 px-2 rounded")
        }
      >
        En-Bo
      </NavLink>
    </nav>
  );
};

export default Header;

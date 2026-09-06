import { Can } from "@/components/functions/can";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useRouterState } from "@tanstack/react-router";
import { PlusCircleIcon } from "lucide-react";

interface Props {
  chlidren: string;
  path: string;
  icon: React.ReactNode;
  pathAdd?: string;
  textAdd?: string;
  permission: string[] | string;
  permissionAdd?: string;
}

export default function ItemHeader({
  chlidren,
  path,
  icon,
  pathAdd,
  textAdd,
  permission,
  permissionAdd,
}: Props) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isActive = path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <SidebarGroup className="py-0.5">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild isActive={isActive} className="group h-9">
            <div className="flex items-center justify-between">
              <Can permission={permission}>
                <Link to={path} className="flex flex-1 items-center gap-2.5">
                  <span
                    className={`[&>svg]:size-4 ${isActive ? "text-sidebar-primary" : ""}`}
                  >
                    {icon}
                  </span>
                  <span>{chlidren}</span>
                </Link>
              </Can>
              {pathAdd && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Can permission={permissionAdd!}>
                      <Link
                        to={pathAdd}
                        className="rounded-full p-1 text-sidebar-foreground/50 opacity-0 transition-all hover:bg-sidebar-primary/15 hover:text-sidebar-primary group-hover:opacity-100"
                      >
                        <PlusCircleIcon size={18} />
                      </Link>
                    </Can>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{textAdd}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

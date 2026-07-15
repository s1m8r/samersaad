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
import { Link } from "@tanstack/react-router";
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
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <div className="flex items-center justify-between">
              <Can permission={permission}>
                <Link to={path} className="flex items-center gap-2 flex-1">
                  <span className="[&>svg]:size-4">{icon}</span>
                  <span>{chlidren}</span>
                </Link>
              </Can>
              {pathAdd && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Can permission={permissionAdd!}>
                      <Link
                        to={pathAdd}
                        className="opacity-0 group-hover:opacity-100 rounded-full p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
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

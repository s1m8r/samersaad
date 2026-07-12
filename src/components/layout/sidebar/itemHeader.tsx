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
}

export default function ItemHeader({
  chlidren,
  path,
  icon,
  pathAdd,
  textAdd,
}: Props) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <div className="flex items-center justify-between">
              <Link to={path} className="flex items-center gap-2 flex-1">
                <span className="[&>svg]:size-4">{icon}</span>
                <span>{chlidren}</span>
              </Link>

              {pathAdd && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={pathAdd}
                      className="opacity-0 group-hover:opacity-100 rounded-full p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                    >
                      <PlusCircleIcon size={18} />
                    </Link>
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

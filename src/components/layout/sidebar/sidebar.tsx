import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  ShoppingCart,
  Store,
  Users,
  Settings,
  LogOut,
  UserCog2Icon,
  User2Icon,
} from "lucide-react";
import ItemHeader from "./itemHeader";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/userStore";

const SideBar = () => {
  const logout = useAuthStore((state) => state.logout);
  const Navigate = useNavigate();
  const handleLogout = () => {
    logout();
    setTimeout(() => {
      Navigate({ to: "/login" });
    }, 200);
  };
  return (
    <Sidebar>
      <SidebarHeader>
        <Link to={"/"}>
          <img src="/logo.png" alt="logo" className="w-30" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <ItemHeader path="/" icon={<Home />} chlidren="Home" />
        <ItemHeader
          path="/users"
          icon={<Users />}
          chlidren="User"
          pathAdd="/users/adduser"
          textAdd="Add User"
        />
        <ItemHeader
          path="/stores"
          icon={<Store />}
          chlidren="Stores"
          pathAdd="/stores/addstore"
          textAdd="Add Store"
        />
        <ItemHeader
          path="/products"
          icon={<ShoppingCart />}
          chlidren="Products"
          pathAdd="/products/addproduct"
          textAdd="Add Product"
        />

        <ItemHeader
          path="/roles"
          icon={<UserCog2Icon />}
          chlidren="Roles"
          pathAdd="/roles/addrole"
          textAdd="Add Role"
        />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className="flex items-center gap-2 w-full">
                    <Settings />
                    <span>Settings</span>
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to={"/prifile"}>
                      <User2Icon />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;

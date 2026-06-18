
import { useAuthStore } from "@/stores/userStore";
import { Link } from "@tanstack/react-router";
import {
  Outlet,
  createFileRoute,
  redirect,
} from "@tanstack/react-router";
import logo from "@/assets/images.jpg";

export const Route = createFileRoute('/_proteced')({
    beforeLoad: () => {
        const token = useAuthStore.getState().token
        
        if (!token) {
            throw redirect({
                to:"/login"
            })
        }
    },
    component: () =>
           <div className="flex min-h-screen bg-gray-50">
                <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white p-6 shadow-sm z-50">
                  <Link to="/">
                  <h1 className="mb-8 text-2xl font-bold"> <img src={logo} alt="Logo" width="100px" />
                    samer web
                    </h1>
                    </Link>
            
                    <nav className="space-y-2 ">
                      <Link
                        to="/" 
                        className="block rounded-lg px-4 py-2 hover:bg-gray-100"
                      >
                        Home
                      </Link>
                      <Link
                        to="/users/"
                        className="block rounded-lg px-4 py-2 hover:bg-gray-100"
                      >
                        Users
                      </Link>
            
                      <Link
                        to="/stores"
                        className="block rounded-lg px-4 py-2 hover:bg-gray-100"
                      >
                        Stores
                      </Link>
            
                      <Link
                      to="/products"
                        className="block rounded-lg px-4 py-2 hover:bg-gray-100"
                      >
                        Products
                      </Link>
            
                      <Link
                        to="/roles"
                        className="block rounded-lg px-4 py-2 hover:bg-gray-100"
                      >
                        Roles
            </Link>
                    </nav>
                  </aside>
        <main className="ml-64 flex-1 min-w-0 overflow-hidden p-8">
          <Outlet />
            </main>
                
                </div>
})








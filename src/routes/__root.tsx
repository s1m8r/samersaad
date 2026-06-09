import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: () =><> <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white p-6 shadow-sm">
        <h1 className="mb-8 text-2xl font-bold">Dashboard</h1>

        <nav className="space-y-2">
          <Link
            to="/"
            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            Home
          </Link>
          <Link
            to="/users/users"
            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            Users
          </Link>

          <Link
            to="/store/stores"
            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            Stores
          </Link>

          <Link
            to="/product/products"
            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            Products
          </Link>

          <Link
            to="/role/role"
            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            Roles
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div></> ,
});
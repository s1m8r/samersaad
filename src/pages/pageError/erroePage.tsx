import Button from "@/components/layout/button";
import { Link } from "@tanstack/react-router";

const ErrorPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-6">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          Page Not Found
              </h2>
              <Link to="/">
                  <Button
                      variant="add"
                  >
                      go to Home
                  </Button>
                  </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
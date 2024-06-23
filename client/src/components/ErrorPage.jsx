import { useRouteError } from "react-router-dom";

/**
 * ErrorPage component displays an error page when an unexpected error occurs in the application.
 * It receives the error object from the useRouteError hook and renders the error details.
 *
 * @returns {JSX.Element} The error page component.
 */

function ErrorPage() {
  const error = useRouteError();

  console.error(error);

  return (
    <div
      id="error-page"
      className="flex flex-col justify-center items-center h-screen gap-10"
    >
      <h1 className="text-6xl font-bold">Oops!</h1>
      <p className="text-3xl text-center">
        Sorry, an unexpected error has occurred
      </p>
      <p className="text-xl text-gray-400">
        <i>
          {error.status || ""} {error.statusText || error.message}
        </i>
      </p>
    </div>
  );
}

export default ErrorPage;

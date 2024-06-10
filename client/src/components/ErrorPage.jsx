import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col justify-center items-center h-screen gap-10
    " >
      <h1 className="text-6xl font-bold">Oops!</h1>
      <p className="text-3xl text-center">Sorry, an unexpected error has ocurred</p>
      <p className="text-xl text-gray-400">
        <i>{error.status ||''} {error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useRouteError,
} from "react-router-dom";

import Root from "./pages";
import NavLayout from "./components/NavLayout";
import Login from "./pages/login";
import Apply from "./pages/apply";
import { useEffect, useState } from "react";
import { supabase, SessionContext } from "./supabase";
import Book from "./pages/book";
import Level from "./pages/level";
import Result from "./pages/results";

function ErrorBoundary() {
  const error: any = useRouteError();
  console.log(error);

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="max-w-80">
        <h1 className="text-7xl text-yellow-400 uppercase font-mono font-semibold italic">
          {error.status}
        </h1>
        <p className="text-3xl">{error.statusText}</p>
        <p className="font-mono">{error.data}</p>
      </div>
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<NavLayout />} errorElement={<ErrorBoundary />}>
        <Route path="/" element={<Root />} />
        <Route path="auth" element={<Login />} />
        <Route path="apply" element={<Apply />} />
        <Route path="book" element={<Book />} />
        <Route path="admin" element={<Level />} />
        <Route path="result" element={<Result />} />
      </Route>
    </>,
  ),
);

export default function App() {
  const [session, setSession] = useState<any>(null);

  // console.log("=======", session)

  useEffect(() => {
    // supabase.auth.getSession().then(({ data: { session } }) => setSession(session))

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log(_event, session);
    });
  }, []);

  return (
    <SessionContext.Provider value={session}>
      <RouterProvider router={router} />
      <div
        dangerouslySetInnerHTML={{
          __html: "<!--It was always intentional-->",
        }}
      />
    </SessionContext.Provider>
  );
}

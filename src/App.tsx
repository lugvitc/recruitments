import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"

import Root from "./pages"
import NavLayout from "./components/NavLayout"
import Login from "./pages/login"
import Apply from "./pages/apply"
import { useEffect, useState } from "react"
import { supabase, SessionContext } from "./supabase"
import Book from "./pages/book"
import Level from "./pages/level"
import Result from "./pages/results"

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<NavLayout />}>
				<Route path="/" element={<Root />} />
				<Route path="auth" element={<Login />} />
				<Route path="apply" element={<Apply />} />
				<Route path="book" element={<Book />} />
				<Route path="admin" element={<Level />} />
				<Route path="result" element={<Result />} />
			</Route>
		</>
	)
)

export default function App() {
	const [session, setSession] = useState<any>(null)

	// console.log("=======", session)

	useEffect(() => {
		// supabase.auth.getSession().then(({ data: { session } }) => setSession(session))

		supabase.auth.onAuthStateChange((_event, session) => { setSession(session); console.log(_event, session) })
	}, [])

	return (
		<SessionContext.Provider value={session}>
			<RouterProvider router={router} />
		</SessionContext.Provider>
	)
}


import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext, supabase } from "../supabase";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function Level() {
	const navigate = useNavigate();
	const session = useContext(SessionContext);

	useEffect(() => {
		if (session === null) {
			localStorage.setItem("redirect", "/admin");
			navigate("/auth");
		}
	}, [session]);

	const onSubmit = async (username: string, password: string) => {
		const { data, error } = await supabase.rpc('update_level_redirect', {
			username_param: username,
			password_param: password,
			email_param: session!.user.email!,
		});
		if (error || !data) return;

		window.location.href = data;
	};

	return (
		<section className="flex justify-center items-center">
			<Formik
				initialValues={{ username: "", password: "" }}
				validate={(values) => {
					const errors: any = null;

					if (!values.username) {
						errors.username = "Required";
					}

					if (!values.password) {
						errors.password = "Required";
					}

					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					onSubmit(values.username, values.password);
					setSubmitting(false);
				}}
			>
				{({ isSubmitting }) => (
					<Form className="flex flex-col gap-2">
						<h1>Username</h1>
						<Field type="text" name="username" />
						<ErrorMessage className="text-xs" name="username" component="div" />
						<div className="min-h-4" />
						<h1>Password</h1>
						<Field type="password" name="password" />
						<ErrorMessage className="text-xs" name="password" component="div" />
						<button type="submit" disabled={isSubmitting}>
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</section>
	);
}

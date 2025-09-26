import { useState, ChangeEvent, FormEvent, useEffect, useContext } from "react";
import { SessionContext, supabase } from "../supabase";
import { Navigate } from "react-router-dom";

interface FormData {
  email: string;
  operative1: string;
  operative2: string;
  browser: string;
  threadId: string;
  systemModel: string;
}

export default function PenguinSyndicateContact() {
  const session = useContext(SessionContext);
  if (session === null) {
      localStorage.setItem("redirect", "/UGVuZ3VpbiBTeW5kaWNhdGUgQ29udGFjdA");
      return <Navigate to={"/auth"} />;
  }
  const [formData, setFormData] = useState<FormData>({
    email: "",
    operative1: "",
    operative2: "",
    browser: "",
    threadId: "",
    systemModel: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Validation functions
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const validateRequired = (val: string) => val.trim().length > 0;

  const validateForm = (): boolean => {
    let newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!validateRequired(formData.email)) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validateRequired(formData.operative1))
      newErrors.operative1 = "Operative 1 is required";

    if (!validateRequired(formData.operative2))
      newErrors.operative2 = "Operative 2 is required";

    if (!validateRequired(formData.browser))
      newErrors.browser = "Browser is required";

    if (!validateRequired(formData.threadId))
      newErrors.threadId = "Thread ID is required";

    if (!validateRequired(formData.systemModel))
      newErrors.systemModel = "System Model is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() =>{
    (async () => {
      supabase.from("penguin_contacts").select("*").then(({ data, error }) => {
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log("Fetched data:", data);
          setSuccess(data && data.length > 0);
        }
      }
      );
    })();
    session.user.email && setFormData((prev) => ({ ...prev, email: session.user.email! }));
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);

    if (!validateForm()) return;
    setLoading(true);

    await supabase.from("penguin_contacts_attempts").insert([
      {
        email: formData.email,
        operative_1: formData.operative1,
        operative_2: formData.operative2,
        browser: formData.browser,
        thread_id: formData.threadId,
        system_model: formData.systemModel,
        submitted_at: new Date().toISOString(),
      },
    ]);

    try {
      const { error } = await supabase.from("penguin_contacts").insert([
        {
          email: formData.email,
          operative_1: formData.operative1,
          operative_2: formData.operative2,
          browser: formData.browser,
          thread_id: formData.threadId,
          system_model: formData.systemModel,
          submitted_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;
      setSuccess(true);
      setFormData({
        email: "",
        operative1: "",
        operative2: "",
        browser: "",
        threadId: "",
        systemModel: "",
      });
    } catch (err: any) {
      alert("Submission failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <style>{`
        * { padding: 0; box-sizing: border-box; }
        body { background-color: black; color: white; font-family: "Montserrat", sans-serif; line-height: 1.6; }
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; }
        .form-container { background: rgba(255,255,255,0.02); margin-top: 6rem; border: 1px solid #202020; border-radius: 12px; padding: 3rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        h1 { font-size: 2.5rem; font-weight: 700; text-align: center; margin-bottom: 1rem; color: rgb(250,204,21); }
        .subtitle { text-align: center; margin-bottom: 2rem; color: #cccccc; font-size: 1.1rem; }
        .section-title { font-size: 1.5rem; font-weight: 600; margin-top: 2.5rem; margin-bottom: 1rem; color: rgb(250,204,21); border-bottom: 2px solid #535353; padding-bottom: 0.5rem; }
        .warning { background: rgba(250,204,21,0.1); border: 1px solid rgb(248,200,10); border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem; font-weight: 500; color: rgb(250,204,21); }
        .form-group { margin-bottom: 1.5rem; }
        label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: white; }
        .required { color: rgb(250,204,21); }
        input, textarea, select { width: 100%; padding: 0.75rem; background-color: black; color: white; border: 2px solid #202020; border-radius: 8px; outline: none; font-size: 1rem; transition: border-color 0.2s ease; }
        input:focus, textarea:focus, select:focus { border-color: rgb(250,204,21); }
        input::placeholder, textarea::placeholder { color: #666666; }
        .submit-btn { background: linear-gradient(135deg, rgb(250,204,21), rgb(249,159,62)); color: black; border: none; padding: 1rem 2rem; border-radius: 8px; font-weight: 700; font-size: 1.1rem; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; width: 100%; margin-top: 1rem; }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(250,204,21,0.3); }
        .form-footer { text-align: center; margin-top: 2rem; color: #888888; font-size: 0.9rem; }
        .error-message { color: #ff4444; font-size: 0.9rem; margin-top: 0.25rem; }
        .form-group.error input { border-color: #ff4444; }
        .success-message { background: rgba(34,197,94,0.1); border: 1px solid rgb(34,197,94); color: rgb(34,197,94); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
        .loading { opacity: 0.7; pointer-events: none; }
        @media (max-width: 768px) { .container { padding: 1rem; } .form-container { padding: 2rem; } h1 { font-size: 2rem; } }
      `}</style>

      <div className="form-container ">
        <h1>Penguin Syndicate Contact</h1>
        <p className="subtitle">
          You know the drill. The contact is waiting. Only use the mail you have
          used in previous correspondences with the syndicate.
        </p>

        {success && (
          <div className="success-message text-center">
            Form submitted successfully! Your contact information has been
            recorded.
          </div>
        )}
        {!success && (
        <>
        <form onSubmit={handleSubmit} className={loading ? "loading" : ""}>
          {/* Basic Info */}
          <div
            className={`form-group ${errors.email ? "error" : ""}`}
          >
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              readOnly
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          {/* Browser Operations */}
          <h2 className="section-title">Browser Operations</h2>
          <div className="warning">
            Enter your findings below. No mistakes. EVERY RESPONSE IS
            CASE-SENSITIVE SO ANSWER CAREFULLY.
            <br />Note: Any order is fine for Operative 1 and Operative 2.
          </div>

          {["operative1", "operative2", "browser", "threadId"].map((id) => (
            <div
              key={id}
              className={`form-group ${errors[id as keyof FormData] ? "error" : ""}`}
            >
              <label htmlFor={id}>
                {id.charAt(0).toUpperCase() + id.slice(1)}{" "}
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id={id}
                name={id}
                value={formData[id as keyof FormData]}
                onChange={handleChange}
                placeholder={`Enter ${id}`}
              />
              {errors[id as keyof FormData] && (
                <div className="error-message">
                  {errors[id as keyof FormData]}
                </div>
              )}
            </div>
          ))}

          {/* Device Enhancements */}
          <h2 className="section-title">Device Level Enhancements</h2>
          <div className="warning">
            Enter your findings below. No mistakes. EVERY RESPONSE IS
            CASE-SENSITIVE SO ANSWER CAREFULLY.
          </div>

          <div
            className={`form-group ${
              errors.systemModel ? "error" : ""
            }`}
          >
            <label htmlFor="systemModel">
              System Model <span className="required">*</span>
            </label>
            <input
              type="text"
              id="systemModel"
              name="systemModel"
              value={formData.systemModel}
              onChange={handleChange}
              placeholder="Enter System Model"
            />
            {errors.systemModel && (
              <div className="error-message">{errors.systemModel}</div>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Contact Form"}
          </button>
        </form>
        <div className="form-footer">
        <p>
          <span className="required">*</span> Indicates required question
        </p>
      </div>
      </>
        )}

      </div>
    </div>
  );
}

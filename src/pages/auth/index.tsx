import { logo_dark } from "../../images.ts";
import { useState } from "react";
import AuthForm from "./form.tsx";
import useAlert from "../../store/useAlert.ts";

export default function Auth() {
  const [section, setSection] = useState<"login" | "signup">("login");
  const { successToast } = useAlert();

  return (
    <div className="absolute w-screen h-screen top-0 left-0 bg-nord4 flex justify-center items-center">
      <div className="container max-w-lg rounded-lg bg-white shadow">
        <div className="p-4 bg-brand-darker rounded-t-lg"><img src={logo_dark} /></div>
        <div className="p-4 flex flex-col gap-y-4">
          <AuthForm section={section} />
          {
            section === "login" ?
              <div className="flex flex-col justify-center items-center">
                <button className="underline" onClick={() => setSection("signup")}>Create new account</button>
                <button className="underline my-1" onClick={() => {successToast("Forget Password Link is sent to your email") }}>Forgot Password ?</button>
              </div>
              :
              <button className="underline" onClick={() => setSection("login")}>Already have an account? login</button>
          }
        </div>
      </div>
    </div>
  );
}
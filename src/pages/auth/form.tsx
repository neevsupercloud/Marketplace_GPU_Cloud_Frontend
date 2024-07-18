import Login from "./login.tsx";
import Signup from "./signup.tsx";

interface AuthFormProps {
  section: "login" | "signup";
}

export default function AuthForm({section}: AuthFormProps) {
  if (section === "login") return <Login />
  return <Signup />
}
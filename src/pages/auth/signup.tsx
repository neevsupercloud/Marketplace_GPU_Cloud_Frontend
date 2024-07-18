import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
// import { LoginResponseType } from "../../types";
// import { ENDPOINTS, useQuery } from "../../store/api.tsx";
// import { KEY } from "../../data.ts";
import { useState } from "react";
import { useStore } from "../../store";
// import { useNavigate } from "react-router-dom";
// import useAlert from "../../store/useAlert.ts";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "", orgName: "", username: "" });
  const { setAuth: _setAuth} = useStore();
  // const { errorToast } = useAlert();
  // const navigate = useNavigate();
  // const { _get_raw, _post_raw } = useQuery();

  // function register() {
    // _post_raw(ENDPOINTS.register, form)
  //     .then((data) => {
  //       if (!data) {
  //         errorToast("Registration Failed", "User already registered. Please login.");
  //         return;
  //       }
  //       return _get_raw<LoginResponseType>(ENDPOINTS.me, {
  //         headers: {
  //           "Accept": "application/json",
  //           "Authorization": `Basic ${btoa(form.username + ":" + form.password)}`,
  //           "Content-Type": "application/json"
  //         }
  //       });
  //     })
  //     .then((data) => {
  //       console.log("Response data from /me endpoint:", data);
  //       if (!data || !data.user.username || data.user.username !== form.username) {
  //         console.log("INCORRECT AUTH");
  //         return;
  //       }
  //       _setAuth({ username: form.username, password: form.password });
  //       setCurrOrg(data.org.slug);
  //       console.log(data);
  //       localStorage.setItem(KEY, JSON.stringify({ username: form.username, password: form.password, org: data.org.slug }));
  //       navigate("/dashboard");
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  return (
    <>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="text" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      </FormControl>
      <FormControl>
        <FormLabel>Org Name</FormLabel>
        <Input type="text" value={form.orgName} onChange={e => setForm({ ...form, orgName: e.target.value })} />
      </FormControl>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input type="text" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
      </FormControl>
      <Button isDisabled={form.email === "" || form.password === "" || form.orgName === "" || form.username === ""} colorScheme="brand" className="w-full">
        Register
      </Button>
    </>
  );
}


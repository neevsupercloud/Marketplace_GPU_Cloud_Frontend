import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
// import { LoginResponseType } from "../../types";
// import { ENDPOINTS, useQuery } from "../../store/api.tsx";
// import { KEY } from "../../data.ts";
import { useState } from "react";
import { useStore } from "../../store";
// import { useNavigate } from "react-router-dom";

export default function Login() {
  const [auth, setAuth] = useState({ username: "", password: "" });
  const { setAuth: _setAuth} = useStore();
  // const navigate = useNavigate();
  // const { _get_raw } = useQuery();

  // function login() {
  //   const headers = {
  //     "Accept": "application/json",
  //     "Authorization": `Basic ${btoa(auth.username + ":" + auth.password)}`,
  //     "Content-Type": "application/json"
  //   };

  //   _get_raw<LoginResponseType>(ENDPOINTS.me, { headers })
  //     .then((data) => {
  //       if (!data || !data.user.username || data.user.username !== auth.username) return console.log("INCORRECT AUTH");
  //       _setAuth(auth);
  //       setCurrOrg(data.org.slug);
  //       console.log(auth);
  //       localStorage.setItem(KEY, JSON.stringify({ ...auth, org: data.org.slug }));
  //       navigate("/");
  //     });
  // }

  return (
    <>
      <FormControl>
        <FormLabel>Usfefername</FormLabel>
        <Input type="text" value={auth.username} onChange={e => setAuth({ ...auth, username: e.target.value })} />
      </FormControl>
      <FormControl>
        <FormLabel>Passwwffword</FormLabel>
        <Input type="password" value={auth.password} onChange={e => setAuth({ ...auth, password: e.target.value })} />
      </FormControl>
      <Button isDisabled={auth.username === "" || auth.password === ""} colorScheme="brand" className="w-full"
        >
        Login
      </Button>
    </>
  );
}

import { FormEvent, useState } from "react";
import Router from "next/router";
import NextLink from "next/link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import { useUserContext } from "./userStore";
import { authenticate } from "./authApiClient";

const SignIn = () => {
  const { setUser } = useUserContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = authenticate(username, password);
    if (!user) {
      setError("Wrong username or password");
    } else {
      setUser(user);
      Router.push("/");
    }
  };

  return (
    <Stack gap={3}>
      <Typography component="h1" variant="h5" textAlign="center">
        Sign in
      </Typography>
      <Stack component="form" gap={2} onSubmit={handleFormSubmit}>
        <TextField
          name="username"
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          fullWidth
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          fullWidth
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" fullWidth>
          Sign in
        </Button>
      </Stack>
      <Box>
        Don&apos;t have an account?{" "}
        <Link component={NextLink} href="/auth/sign-up">
          Sign up
        </Link>
      </Box>
    </Stack>
  );
};

export default SignIn;

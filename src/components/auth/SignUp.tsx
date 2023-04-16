import { FormEvent, useState } from "react";
import Router from "next/router";
import NextLink from "next/link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import { useUserContext } from "./userStore";
import { SignUpError, signUp } from "./authApiClient";
import Alert from "@mui/material/Alert";

const SignUp = () => {
  const { setUser } = useUserContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    try {
      setUser(await signUp(username, password));
      Router.push("/");
    } catch (error) {
      if (error instanceof SignUpError) {
        setError(error.message);
      } else {
        setError("Sign up failed");
      }
    }
  };

  return (
    <Stack gap={3}>
      <Typography component="h1" variant="h5" textAlign="center">
        Sign up
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
          Sign up
        </Button>
      </Stack>
      <Box>
        Already have an account?{" "}
        <Link component={NextLink} href="/auth/sign-in">
          Sign in
        </Link>
      </Box>
    </Stack>
  );
};

export default SignUp;

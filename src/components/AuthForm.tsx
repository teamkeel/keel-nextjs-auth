"use client";

import { Button, Callout, Flex, TextField } from "@radix-ui/themes";
import * as Label from "@radix-ui/react-label";
import { useFormState } from "react-dom";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { TextInput } from "./TextInput";

export type Mode = "login" | "signup";

export type State = {
  mode: Mode;
  error: string | null;
};

export type Action = (state: State, formData: FormData) => Promise<State>;

export type Props = {
  mode: Mode;
  action: Action;
};

export function AuthForm(props: Props) {
  const [state, action] = useFormState(props.action, {
    error: null,
    mode: props.mode,
  });

  return (
    <form action={action}>
      <TextInput type="email" id="email" label="Email" required />
      <TextInput type="password" id="password" label="Password" required />

      {props.mode === "signup" ? (
        <TextInput
          id="passwordConfirm"
          type="password"
          label="Confirm Password"
          required
        />
      ) : null}

      {state.error ? (
        <Callout.Root color="red" mb="4">
          <Callout.Icon>
            <CrossCircledIcon />
          </Callout.Icon>
          <Callout.Text>{state.error}</Callout.Text>
        </Callout.Root>
      ) : null}

      <Button type="submit" className="capitalize">
        {props.mode}
      </Button>
    </form>
  );
}

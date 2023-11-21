"use client";

import { Button, Callout } from "@radix-ui/themes";
import { useFormState } from "react-dom";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { TextInput } from "./TextInput";

export type State = {
  error: string | null;
};

export type Action = (state: State, formData: FormData) => Promise<State>;

export type Props = {
  action: Action;
};

export function CreateProfileForm(props: Props) {
  const [state, action] = useFormState(props.action, {
    error: null,
  });

  return (
    <form action={action}>
      <TextInput
        id="name"
        required
        label="Name"
        placeholder="e.g. Joe Bloggs"
      />

      <TextInput
        id="username"
        required
        label="Username"
        placeholder="e.g. joebloggs123"
      />

      {state.error ? (
        <Callout.Root color="red" mb="4">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{state.error}</Callout.Text>
        </Callout.Root>
      ) : null}

      <Button type="submit">Create Profile</Button>
    </form>
  );
}

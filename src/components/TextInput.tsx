import * as Label from "@radix-ui/react-label";
import { Flex, TextField } from "@radix-ui/themes";

export type Props = {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  required: boolean;
};

export function TextInput(props: Props) {
  return (
    <Flex direction="column" gap="1" mb="4">
      <Label.Root htmlFor={props.id}>{props.label}</Label.Root>
      <TextField.Root>
        <TextField.Input
          id={props.id}
          placeholder={props.placeholder}
          type={props.type}
          name={props.id}
          required={props.required}
        />
      </TextField.Root>
    </Flex>
  );
}

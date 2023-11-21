import { createProfile } from "@/actions/createProfile";
import { useClient } from "@/api";
import { CreateProfileForm } from "@/components/CreateProfileForm";
import { Header } from "@/components/Header";
import { Container, Heading, Text } from "@radix-ui/themes";
import { redirect } from "next/navigation";

export default async function CreateProfile() {
  // Require an authenticated client - will redirect if not authenticated
  const client = useClient({ requireAuth: true });

  // Try to fetch the profile - if it exists then redirect to the profile page
  const res = await client.api.queries.myProfile();
  if (res.error) {
    throw new Error(res.error.message);
  }
  if (res.data) {
    redirect("/profile");
  }

  return (
    <>
      <Header />
      <Container size="3" py="4">
        <Heading mb="5">Setup Profile</Heading>
        <CreateProfileForm action={createProfile} />
      </Container>
    </>
  );
}

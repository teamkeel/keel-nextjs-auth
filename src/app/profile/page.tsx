import { useClient } from "@/api";
import { Header } from "@/components/Header";
import { Container, Heading, Strong, Text } from "@radix-ui/themes";
import { redirect } from "next/navigation";

export default async function Profile() {
  // Require an authenticated client - will redirect if not authenticated
  const client = useClient({ requireAuth: true });

  // Fetch the profile - if we don't have one then redirect to the
  // create profile page
  const res = await client.api.queries.myProfile();
  if (res.error) {
    throw new Error(res.error.message);
  }
  if (!res.data) {
    redirect("/profile/create");
  }

  const profile = res.data;

  return (
    <>
      <Header />
      <Container size="3" py="4">
        <Heading mb="5">Hello {profile.name}!</Heading>
        <Text>
          Your username is: <Strong>{profile.username}</Strong>
        </Text>
      </Container>
    </>
  );
}

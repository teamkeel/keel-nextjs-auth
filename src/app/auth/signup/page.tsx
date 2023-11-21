import { authenticate } from "@/actions/authenticate";
import { useClient } from "@/api";
import { AuthForm } from "@/components/AuthForm";
import { Header } from "@/components/Header";
import { Box, Container, Heading, Link, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import { redirect } from "next/navigation";

export default function Signup() {
  const client = useClient();

  // If already authenticated we can redirect to the profile page
  if (client.ctx.isAuthenticated) {
    redirect("/profile");
  }

  return (
    <>
      <Header />
      <Container size="3" py="4">
        <Heading mb="5">Signup</Heading>
        <AuthForm mode="signup" action={authenticate} />
        <Box mt="4">
          <Text>
            Already have an account?{" "}
            <Link asChild>
              <NextLink href="/auth/login">Login here</NextLink>
            </Link>
          </Text>
        </Box>
      </Container>
    </>
  );
}

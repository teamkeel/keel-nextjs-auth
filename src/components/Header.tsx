import { useClient } from "@/api";
import { Box, Flex, Container, Link } from "@radix-ui/themes";

import NextLink from "next/link";

export function Header() {
  const client = useClient();
  const { isAuthenticated } = client.ctx;

  return (
    <Box p="4" className="border-b-2">
      <Container size="3">
        <Flex justify="end">
          <Link asChild>
            {isAuthenticated ? (
              <NextLink href="/auth/logout">Logout</NextLink>
            ) : (
              <NextLink href="/auth/login">Login</NextLink>
            )}
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}

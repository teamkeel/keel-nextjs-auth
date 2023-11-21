import { Header } from "@/components/Header";
import { Container, Heading } from "@radix-ui/themes";

export default function Home() {
  return (
    <>
      <Header />
      <Container size="3" pt="6">
        <Heading mb="5" align={"center"} size={"8"}>
          Next.js app using Keel Auth
        </Heading>
      </Container>
    </>
  );
}

import { Row, Column, Container, Heading, Hr } from "@react-email/components";

interface EmailTemplateProps {
  snakes: Array<{ name: string, daysToNextMeal: number }>;
}

export const EmailTemplate = ({
  snakes,
}: EmailTemplateProps) => (
  <Container>
    <Heading>It&apos;s time to feed your snakes!</Heading>
    <Hr />
    <Container className="grid grid-cols-2 justify-center items-center">
      <Row>
        <Column>
          <Heading>Snake</Heading>
        </Column>
        <Column>
          <Heading>Next meal (days)</Heading>
        </Column>
      </Row>
      <Row>
        {snakes.map((snake) => {
          return <>
            <Column>{snake.name}</Column>
            <Column>{snake.daysToNextMeal}</Column>
          </>
        })}
      </Row>
    </Container>
  </Container>
);

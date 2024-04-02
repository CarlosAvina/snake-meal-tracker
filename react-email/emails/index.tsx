import {
  Html,
  Text,
  Container,
  Column,
  Row,
  Tailwind,
} from "@react-email/components";
import * as React from "react";
import moment from "moment";
import { formatToIsoDate } from "@/app/utils";
import type { Snake } from "@/app/types";

type Props = {
  snakes: Snake[];
};

const mockedSnakes: Snake[] = [
  {
    id: 1,
    name: "Snake 1",
    lastmeal: new Date().toISOString(),
    mealdayinterval: 5,
  },
];

export default function Email({ snakes = mockedSnakes }: Props) {
  return (
    <Tailwind>
      <Html className="font-sans">
        <Container>
          <Text className="text-4xl font-bold">Your snakes</Text>
          <Container className="border-2 border-solid border-black rounded-md p-4">
            <Row className="border-2 border-solid border-white border-b-black py-2 font-bold">
              <Column>Snake name</Column>
              <Column>Days until next meal</Column>
            </Row>
            {snakes.map((snake) => {
              const nextMeal = formatToIsoDate(snake.lastmeal).add(
                snake.mealdayinterval,
                "days",
              );
              const datesDurationDiff = moment.duration(
                nextMeal.diff(moment()),
              );
              const diff = Math.floor(datesDurationDiff.asDays());
              return (
                <Row key={snake.id} className="py-2">
                  <Column>{snake.name}</Column>
                  <Column>{diff === 1 ? `${diff} day` : `${diff} days`}</Column>
                </Row>
              );
            })}
          </Container>
        </Container>
      </Html>
    </Tailwind>
  );
}

import React from "react";
import "gestalt/dist/gestalt.css";
import {
  Button,
  TileData,
  Dropdown,
  PageHeader,
  Box,
  Flex,
  Accordion,
} from "gestalt";
import { supabase } from "./utils/supabase";
import moment from "moment";
import { Tables } from "../database.types";
import { PostgrestError } from "@supabase/supabase-js";

type SnakesData = {
  snakes: Array<Tables<"snakes">>;
  loading: boolean;
  error: PostgrestError | null;
};

function App() {
  const [snakesData, setSnakeData] = React.useState<SnakesData>({
    snakes: [],
    loading: false,
    error: null,
  });

  React.useEffect(() => {
    async function fetchData() {
      setSnakeData((prev) => ({ ...prev, loading: true }));
      const { data, error } = await supabase.from("snakes").select();

      if (error) {
        setSnakeData((prev) => ({ ...prev, error }));
        return;
      }

      setSnakeData({ snakes: data, loading: false, error: null });
    }
    fetchData();
  }, []);

  async function feedSnake(snakeId: number) {
    const { data, error } = await supabase
      .from("snakes")
      .update({ lastMeal: moment().format() })
      .eq("id", snakeId)
      .select();

    if (error) throw error;

    const newSnakes = snakesData.snakes;
    const updatedSnake = data[0];
    const snakeIndex = newSnakes.findIndex((snake) => snake.id === snakeId);
    newSnakes.splice(snakeIndex, 1, updatedSnake);
    setSnakeData((prev) => ({ ...prev, snakes: newSnakes }));
  }

  async function feedAllSnakes() {
    snakesData.snakes.forEach(async (snake) => await feedSnake(snake.id));
  }

  if (snakesData.error) return <h1>There is an error, sorry</h1>;
  if (snakesData.loading) return <h1>Loading...</h1>;

  return (
    <Box maxWidth="50vw">
      <PageHeader
        dropdownAccessibilityLabel="More options"
        primaryAction={{
          component: (
            <Button
              color="red"
              size="lg"
              text="Feed all"
              onClick={feedAllSnakes}
            />
          ),
          dropdownItems: [
            <Dropdown.Item
              key="key"
              onSelect={feedAllSnakes}
              option={{ value: "Feel all", label: "Feed all" }}
            />,
          ],
        }}
        title="Snakes feeder"
      />
      <Box>
        {snakesData.snakes.map((snake) => {
          return (
            <Box key={snake.id} paddingX={10} paddingY={5}>
              <Accordion
                id="accordeon - snake"
                title={snake.name}
                icon="smiley"
              >
                <Flex gap={5} justifyContent="evenly" alignItems="center">
                  <Flex
                    direction="row"
                    justifyContent="between"
                    alignItems="center"
                    gap={10}
                  >
                    <TileData
                      id="lastMeal"
                      title="Last meal"
                      value={moment(snake.lastMeal).fromNow()}
                      color="01"
                      selected
                    />
                    <TileData
                      id="nextMeal"
                      title="Next meal"
                      value={moment(snake.lastMeal)
                        .add(snake.mealInterval, "days")
                        .fromNow()}
                      color="02"
                      selected
                    />
                  </Flex>
                  <Button
                    color="red"
                    size="md"
                    text="Feed"
                    fullWidth
                    onClick={() => {
                      feedSnake(snake.id);
                    }}
                  />
                </Flex>
              </Accordion>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default App;

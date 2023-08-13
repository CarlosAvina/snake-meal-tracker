interface EmailTemplateProps {
  snakes: Array<{ name: string, daysToNextMeal: number }>;
}

export const EmailTemplate = ({
  snakes,
}: EmailTemplateProps) => (
  <div>
    <h1>It&apos;s time to feed your snakes!</h1>
    <div className="grid grid-cols-2 justify-center items-center">
      <h2 className="font-bold text-2xl">Snake</h2>
      <h2 className="font-bold text-2xl">Next meal (days)</h2>
      {snakes.map((snake) => {
        return <>
          <p>{snake.name}</p>
          <p>{snake.daysToNextMeal}</p>
        </>
      })}
    </div>
  </div>
);

import { useRouter } from 'next/router';
import { api } from "~/utils/api";

const SnakeInfo = () => {
    const router = useRouter();

    const id = router.query.id?.toString();

    if (!id) return <div>Snake not found</div>

    const { data } = api.snake.getSnakeById.useQuery({ id })

    const lastMeal = data?.snake?.lastMeal;

    console.log(lastMeal?.getDate())

    const nextMeal = new Date();
    nextMeal.setDate((data?.snake?.lastMeal?.getDate() || 0) + 10);

    return <main>
        <h1>{data?.snake?.name}</h1>
        <h2>{data?.snake?.species}</h2>
        <div>
            <b>Last meal: </b>
            <p>{lastMeal?.toDateString()}</p>
        </div>
        <div>
            <b>Next meal: </b>
            <p>{nextMeal.toDateString()}</p>
        </div>

        <button> Register new last meal</button>
    </main >
}

export default SnakeInfo;
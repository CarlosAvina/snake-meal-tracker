import Link from 'next/link';
import { useRouter } from 'next/router';
import moment from 'moment';
import { api } from "~/utils/api";


const SnakeInfo = () => {
    const router = useRouter();
    const utils = api.useContext();;

    const id = router.query.id?.toString();

    if (!id) return <div>Snake not found</div>

    const querySnake = api.snake.getSnakeById.useQuery({ id })
    const mutateSnake = api.snake.registerLastMeal.useMutation({
        onSuccess: ({ snake }) => {
            utils.snake.getSnakeById.setData({ id }, { snake })
        }
    });

    const lastMeal = moment(querySnake.data?.snake?.lastMeal);
    const nextMeal = moment(querySnake.data?.snake?.lastMeal).add(10, 'days');

    const daysToNextMeal = nextMeal.diff(moment(), 'days');

    function registerNewLastMeal() {
        const lastMealDate = new Date();

        if (id && lastMealDate) {
            mutateSnake.mutate({ id, lastMeal: lastMealDate })
        }
    }

    return <main className='p-5'>
        <div className='flex items-center gap-5'>
            <Link href="/">
                <button className="border-black border-2 bg-green-400 rounded-md p-3 text-white font-bold h-min">
                    Go back
                </button>
            </Link>
            <div className='flex flex-col'>
                <h1 className='font-bold text-4xl'>{querySnake.data?.snake?.name}</h1>
                <h2 className='font-bold text-2xl italic'>{querySnake.data?.snake?.species}</h2>
            </div>
        </div>
        <div className='grid grid-cols-2 gap-3 mt-4'>
            <div className='border-black border-2 p-3'>
                <b>Last meal: </b>
                <p>{lastMeal.fromNow()}</p>
            </div>
            <div className='border-black border-2 p-3'>
                <b>Next meal: </b>
                <p>{nextMeal.format('LL')}</p>
            </div>
            <div className='border-black border-2 p-3'>
                <b>Days until next meal: </b>
                <p>{daysToNextMeal}</p>
            </div>

            <button className='border-black border-2 bg-green-400 rounded-md p-3 text-white font-bold' onClick={registerNewLastMeal}>Register new last meal</button>
        </div>
    </main >
}

export default SnakeInfo;
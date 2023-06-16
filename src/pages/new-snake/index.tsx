import type { SyntheticEvent } from "react"
import { useRouter } from "next/router"
import { api } from "~/utils/api"

const NewSnake = () => {
    const router = useRouter();
    const mutateSnake = api.snake.createSnake.useMutation({
        onSuccess: async () => {
            await router.replace('/');
        }
    })

    function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = formData.get('name')?.toString();
        const species = formData.get('species')?.toString();

        if (!name || !species) throw new Error('Fill form');

        mutateSnake.mutate({ name, species });
    }

    return <form onSubmit={onSubmit} className="flex flex-col gap-5 text-center p-6 w-2/5 m-auto">
        <h1 className='font-bold text-4xl'>Create a new snake</h1>
        <input className="border-2 border-black rounded-md p-2" name="name" type="text" placeholder="Name" required />
        <input className="border-2 border-black rounded-md p-2" name="species" type="text" placeholder="Species" required />
        <button className='border-black border-2 bg-green-400 rounded-md p-3 text-white font-bold' type='submit'>{mutateSnake.isLoading ? "Creating snake..." : "Create"}</button>
    </form>
}


export default NewSnake;
import type { SyntheticEvent } from "react"
import { api } from "~/utils/api"

const NewSnake = () => {
    const { mutate } = api.snake.createSnake.useMutation()

    function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = formData.get('name')?.toString();
        const species = formData.get('species')?.toString();

        if (!name || !species) throw new Error('Fill form');

        mutate({ name, species });
    }

    return <form onSubmit={onSubmit}>
        <h1>Create a new snake</h1>
        <label>Name:<input name="name" type="text" placeholder="name" required /></label>
        <label>Species:<input name="species" type="text" placeholder="species" required /></label>
    </form>
}


export default NewSnake;
import React, {useState} from 'react'
import {useQuery} from "@tanstack/react-query";

function TanStack() {

    const [id , setId] = useState(1);

    // const query = useQuery({
    //     queryKey: ['todos'],
    //     queryFn: getTodos
    // });

    const query = useQuery({
        queryKey: ['todos' , id],
        queryFn: () => getSingleTodo(id)
    });

    const {data: todos , isPending , refetch , error} = query;

    if(error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {
                isPending ? (
                    <p>Loading...</p>
                ) : (

                    <>
                        {
                            JSON.stringify(todos?.slice(0 , 3))
                        }
                    </>
                )

            }
            <button onClick={() => refetch()}>refetch</button>
            <button onClick={() => setId((prev) => prev + 1)}>Incr ID</button>
        </div>
    )
}

const getTodos = async () =>{
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');

    return await res.json();
}


const getSingleTodo = async (id : number) =>{
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postsId=${id}`);

    return await res.json();
}

export default TanStack;

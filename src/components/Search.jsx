import React, {useEffect, useState} from 'react'
import axios from "axios";

function Search() {

    const [query , setQuery] = useState('')

    const [data , setData] = useState([])
    const [loading , setLoading] = useState(true)

    const [page , setPage] = useState(1);

    const handleChange = (e) => {
        setQuery((e.target.value));
    }

    useEffect(() => {
        setData([]);
    }, [query]);


    useEffect(() => {
        setLoading(true);
        const getSearchItems = async () =>{
           try{
            if(query != '') {
                const data = await axios.get(`https://openlibrary.org/search.json?title=${query}&page=${page}`);

                setLoading(false);

                if(data.data.docs) {
                    setData((prev) =>{
                        return [
                            ...new Set([...prev , ...data.data.docs.map((book) => book.title)])
                        ]
                    });
                }
            }
        }
            catch (e) {
               console.error(e)
            }
        }

        getSearchItems();

    }, [query , page]);

    return (
        <div>
            <input
                type = "text"
                onChange={(e) => handleChange(e)}
            />

                {
                    data.map((item , index) => {
                        return (
                            <>
                                <div key = {index}>
                                    <p>{item}</p>
                                </div>
                            </>
                        )
                    })
                }
        </div>
    )
}

export default Search;

import React, {useEffect, useState, useRef} from 'react'
import axios from "axios";

function Search() {

    const [query, setQuery] = useState( '' )
    const [data, setData] = useState( [] )
    const [loading, setLoading] = useState( true )
    const [page, setPage] = useState( 1 );
    const observer = useRef();
    const [hasMore, setHasMore] = useState( false );
    const debounceRef = useRef( null );

    // scroll based pagination so we are observing the last element of the array
    const lastElement = ( node ) => {
        // intersection observer in javascript
        if ( loading ) return;

        if ( observer.current ) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver( ( entries ) => {
            if ( entries[0].isIntersecting && hasMore ) {
                setPage( ( prev ) => prev + 1 );
            }
        });

        if ( node ) {
            observer.current.observe( node );
        }
    }

    const handleChange = ( e ) => {
        if ( debounceRef.current ) clearTimeout( debounceRef.current );

        debounceRef.current = setTimeout( () => {
            setQuery( e.target.value )
            setPage( 1 );
        }, 1000 )
    }

    useEffect( () => {
        setData( [] );
    }, [query] );


    useEffect( () => {
        setLoading( true );

        const getSearchItems = async () => {
            try {
                if ( query !== '' ) {
                    const data = await axios.get( `https://openlibrary.org/search.json?title=${query}&page=${page}` );

                    setLoading( false );
                    setHasMore( data.data.docs.length > 0 );
                    if ( data.data.docs ) {
                        setData( ( prev ) => {
                            return [
                                ...new Set( [...prev, ...data.data.docs.map( ( book ) => book.title )] )
                            ]
                        } );
                    }
                }
            } catch (e) {
                console.error( e )
            }
        }

        getSearchItems();

    }, [query, page]);


    return (
        <div>
            <input
                type="text"
                onChange={( e ) => handleChange( e )}
            />
            {
                data.map( ( item, index ) => {
                    if ( data.length === index + 1 ) {
                        return (
                            <>
                                <div key={index} ref={lastElement}>
                                    <p>{item}</p>
                                </div>
                            </>
                        )
                    } else {
                        return (
                            <>
                                <div key={index}>
                                    <p>{item}</p>
                                </div>
                            </>
                        )
                    }

                } )
            }


            <div>
                {loading && query !== '' && "loading..."}
            </div>
        </div>
    )
}

export default Search;

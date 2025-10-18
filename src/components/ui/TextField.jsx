import React from 'react'

function TextField( {
                        id = '',
                        name = '',
                        disabled = false,
                        readOnly = false,
                        placeholder = '',
                        type = 'text',
                        onChange = () => {
                        },
                        value = '',
                        index = 1,
                        error
                    } ) {


    const handleInput = ( e ) => {
        onChange( {value: e.target.value, name, id, index} )
    }

    return (
        <div>
            <input
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                onChange={handleInput}
                value={value}
                readOnly={readOnly}
                disabled={disabled}
            />

            {error && <small>{error}</small>}
        </div>
    )
}

export default TextField

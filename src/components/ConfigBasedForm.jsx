import React, {useRef, useState} from 'react'
import TextField from "./ui/TextField.jsx";
import {DynamicForm} from "../utils/constant.js";

function ConfigBasedForm() {
    // const emailRef = useRef();
    // const [email, setEmail] = useState( '' );
    // const [password, setPassword] = useState( '' );

    // const [userData, setUserData] = useState( structuredClone(DynamicForm) );
    const [userData, setUserData] = useState( DynamicForm );


    const handleSubmit = ( e ) => {
        e.preventDefault();

        // * Uncontrolled ways of handling the forms
        // const email = document.getElementById("email").value;
        //
        // // React way of handling the forms value using ref
        // const email = emailRef.current.value;
        // // uncontrolled way of handling the from element
        // const password = document.getElementById('password').value;
        //
        // console.log( "The form data is = ", userData );


        // Controlled Way of handling the form using the useState

        const obj = {};

        userData.forEach( d => {
            obj[d.name] = d.value;
        });

        console.log(obj)

    }

    const handleChange = ( {value , index} ) => {
        // const oldData = structuredClone(userData);

        const oldData = [...userData];

        oldData[index].value = value;

        if(oldData[index].validator){
            oldData[index].error = oldData[index].validator(value);
        }

        setUserData(oldData);
    }

    function handleFileChange(e) {
        const data = new FormData();

        data.append('myFile', e.target.files[0])
    }

    return (
        <div>

            <form encType='multipart' onSubmit={handleSubmit}>
                <input type='file'  id='file' onChange={handleChange}  />
            </form>

            <form onSubmit={handleSubmit}>

                {/*<div>*/}
                {/*    <label htmlFor="email'">Email</label>*/}
                {/*    <input type="email" name="email" id="email"/>*/}
                {/*</div>*/}

                {/* React way (uncontrolled way) for handling the values using ref */}
                {/*<div>*/}
                {/*    <label htmlFor="email'">Email</label>*/}
                {/*    <input ref={emailRef}  id="email"/>*/}
                {/*</div>*/}

                {/*<div>*/}
                {/*    <label htmlFor="password">Password</label>*/}
                {/*    <input type="password" name="password" id="password"/>*/}
                {/*</div>*/}

                {/* Controlled way of handling the react */}
                <div>
                    {/*<label htmlFor="email">Email</label>*/}
                    {/*<input*/}
                    {/*    type="email"*/}
                    {/*    id="email"*/}
                    {/*    value={email}*/}
                    {/*    onChange={( event ) => setEmail( event.target.value )}*/}
                    {/*/>*/}
                    {/*<TextField*/}
                    {/*    type="email"*/}
                    {/*    name="email"*/}
                    {/*    id="email"*/}
                    {/*    value={userData.email}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    />*/}
                </div>

                <div>
                    {/*<label htmlFor="password">Password</label>*/}
                    {/*<input*/}
                    {/*    type="password"*/}
                    {/*    name="password"*/}
                    {/*    id="password"*/}
                    {/*    value={password}*/}
                    {/*    onChange={( event ) => setPassword( event.target.value )}*/}
                    {/*/>*/}

                    {/*<TextField*/}
                    {/*    type="password"*/}
                    {/*    name="password"*/}
                    {/*    id="password"*/}
                    {/*    value={userData.password}*/}
                    {/*    onChange={handleChange}*/}
                    {/*/>*/}

                    <input type='hidden' value='check' name = 'secure' />

                    {/*    JSON based config forms */}
                    {
                        userData.map( (data , index) => {
                            if ( data.type === 'text' ) {
                                return (
                                    <TextField
                                        key={index}
                                        index={index}
                                        {...data}

                                        onChange={handleChange}
                                    />
                                )
                            }
                            return (
                               <TextField
                                   key={index}
                                   index={index}
                                   {...data}
                                   onChange={handleChange}
                                   />
                            )
                        } )

                    }
                </div>

                <button type="submit">
                    Submit
                </button>

                <button type="reset">
                    Clear
                </button>
            </form>
        </div>
    )

//     Three types button
//     1) submit
//     2) reset
//     3)
}

export default ConfigBasedForm;

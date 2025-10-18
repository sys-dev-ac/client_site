export const DynamicForm = [
    {
        type: "text",
        placeholder: "Test",
        readOnly: false,
        disabled: false,
        id: "fName",
        error: '',
        value:'',
        name:"FName"
    },
    {
        type: "password",
        placeholder: "Test",
        readOnly: false,
        disabled: false,
        id: "fPassword",
        error: '',
        value: '',
        name: "FPassword",
        validator: function ( value ) {
            if ( value.length < 3 ) {
                return "length should be larger than 3 words ";
            } else {
                return "";
            }
        }
    },
    {
        type: "textarea",
        placeholder: "Test textarea description",
        readOnly: false,
        disabled: false,
        id: "fPassword",
        error: '',
        value:'',
        name:"FTextarea"
    }
];
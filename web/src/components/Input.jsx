import { FloatingLabel, Form } from "react-bootstrap";
import { useEffect } from 'react';

export function Input(props) {
//    const [entrada, setEntrada] = useState(props.valueDefault);
    useEffect(() => {
        if(props.valueDefault !=undefined)
        document.querySelector(`#${props.name}`).value = props.valueDefault
    }, []);
    return (
        <Form.Group className={props.className}>
            <FloatingLabel label={props.label}>
                <Form.Control
                    type={props.type}
                    isInvalid={props.error}
                    required={props.required}
                    id={props.name}
                    name={props.name}
                    //value={entrada}
                    //onChange={(e) => setEntrada(e.target.value)}
                    //defaultValue={props.defaultValue}
                    {...props.validations}
                />
                {props.error && (
                    <Form.Control.Feedback type="invalid">
                        {props.error.message}
                    </Form.Control.Feedback>
                )}
            </FloatingLabel>
        </Form.Group>
    );
}

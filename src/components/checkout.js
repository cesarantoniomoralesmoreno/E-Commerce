import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();
    const [form, setForm] = React.useState({
        name: "",
        email: "",
        shippingAddress1: "",
        shippingAddress2: "",
        shippingCity: "",
        touched: {
            name: false,
            email: false,
            shippingAddress1: false,
            shippingAddress2: false,
            shippingCity: false,
        },
    });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const errors = {
        name: form.name.length === 0,
        email: !validateEmail(form.email),
        shippingAddress1: form.shippingAddress1.length === 0,
        shippingCity: form.shippingCity.length === 0,
    };

    // Si existe al menos un error, deshabilitamos el botón
    const isFormValid = !Object.keys(errors).some((key) => errors[key]);

    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleBlur = (ev) => {
        const { name } = ev.target;
        setForm((prevState) => ({
            ...prevState,
            touched: { ...prevState.touched, [name]: true },
        }));
    };

    const handleConfirmOrder = () => {
        // Marcar todos los campos como "touched" para activar las validaciones
        setForm((prevState) => ({
            ...prevState,
            touched: {
                name: true,
                email: true,
                shippingAddress1: true,
                shippingAddress2: true,
                shippingCity: true,
            },
        }));

        if (isFormValid) {
            navigate("/orderConfirmation");
        }
    };

    const showError = (field) => {
        return errors[field] && form.touched[field];
    };

    return (
        <CheckoutContainer>
            <CheckoutTitle>Shopping Checkout</CheckoutTitle>

            <CheckoutHeader>
                <h4>Your Details</h4>
            </CheckoutHeader>
            <CheckoutHeaderLine />
            <CheckoutTable>
                <CheckoutFormLabel>* Name</CheckoutFormLabel>
                <InputContainer>
                    <CheckoutInput
                        type="text"
                        name="name"
                        $invalid={showError("name")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter name"
                    />
                    {showError("name") && <ErrorText>Name is required</ErrorText>}
                </InputContainer>

                <CheckoutFormLabel>* Email</CheckoutFormLabel>
                <InputContainer>
                    <CheckoutInput
                        type="text"
                        name="email"
                        $invalid={showError("email")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter email"
                    />
                    {showError("email") && <ErrorText>Invalid email format</ErrorText>}
                </InputContainer>
            </CheckoutTable>

            <CheckoutHeader>
                <h4>Address Details</h4>
            </CheckoutHeader>
            <CheckoutHeaderLine />
            <CheckoutTable>
                <CheckoutFormLabel>* Shipping Address Line 1 </CheckoutFormLabel>
                <InputContainer>
                    <CheckoutInput
                        type="text"
                        name="shippingAddress1"
                        $invalid={showError("shippingAddress1")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter first address line"
                    />
                    {showError("shippingAddress1") && <ErrorText>Shipping Address is required</ErrorText>}
                </InputContainer>

                <CheckoutFormLabel>Shipping Address Line 2</CheckoutFormLabel>
                <InputContainer>
                    <CheckoutInput
                        type="text"
                        name="shippingAddress2"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter second address line"
                    />
                </InputContainer>

                <CheckoutFormLabel>City *</CheckoutFormLabel>
                <InputContainer>
                    <CheckoutInput
                        type="text"
                        name="shippingCity"
                        $invalid={showError("shippingCity")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter city"
                    />
                    {showError("shippingCity") && <ErrorText>City is required</ErrorText>}
                </InputContainer>

                <CheckoutFormLabel>* Country</CheckoutFormLabel>
                <InputContainer>
                    <CheckoutInput
                        type="text"
                        name="shippingCountry"
                        $invalid={showError("shippingCountry")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter country"
                    />
                    {showError("shippingCountry") && <ErrorText>Country is required</ErrorText>}
                </InputContainer>
            </CheckoutTable>

            <CancelButton type="button" onClick={() => navigate("/basket")}>
                Cancel
            </CancelButton>
            <CheckoutButton type="button" onClick={handleConfirmOrder} disabled={!isFormValid}>
                Confirm Order
            </CheckoutButton>
        </CheckoutContainer>
    );
};

export default Checkout;

// Styled Components

const CheckoutContainer = styled.div`
    display: grid;
    padding: 20px;
    grid-template-rows: 0.25fr 1fr 0.25fr 0.25fr 0.25fr 0.5fr;
    grid-template-columns: 0.1fr 1fr 0.1fr;
`;

const CheckoutTable = styled.div`
    grid-column: 1 / span 3;
    display: grid;
    grid-template-rows: 0.25fr 0.25fr 0.25fr 0.25fr;
    grid-template-columns: 0.1fr 0.3fr 0.1fr 0.4fr;
    column-gap: 20px;
    padding-left: 10px;
`;

const CheckoutHeader = styled.div`
    grid-column: 1 / span 3;
    padding-top: 20px;
`;

const CheckoutHeaderLine = styled.hr`
    grid-column: 1 / span 3;
    margin-bottom: 20px;
`;

const CheckoutTitle = styled.h2`
    grid-column: 1 / span 2;
    padding-bottom: 20px;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CheckoutFormLabel = styled.label`
    justify-self: end;
`;

const CheckoutInput = styled.input`
    border-width: 1px;
    border-style: solid;

    ${(props) =>
        props.$invalid &&
        `
        border-color: red;
        border-width: 3px;
    `}
`;

const ErrorText = styled.span`
    color: red;
    font-size: 0.8em;
`;

const CheckoutButton = styled.button`
    border-radius: 8px;
    height: 40px;
    grid-column: 3;
`;

const CancelButton = styled.button`
    border-radius: 8px;
    height: 40px;
    grid-column: 1;
`;

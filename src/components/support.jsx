import React, { useRef, useState } from "react";
import Form from "./form.jsx";
import Ticket from "./ticket.jsx";
import SupportPageStyle from "./styles/support.module.css";
import CloseIcon from "./images/close-icon.png";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
emailjs.init('USER_ID');

function Support() {
    const formRef = useRef();
    const [ticketNumber, setTicketNumber] = useState("");
    const [showContent, setShowContent] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const generateTicketNumber = () => {
        const randomNumber = Math.floor(Math.random() * 9999) + 1;
        setTicketNumber(String(randomNumber).padStart(4, "0"));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        emailjs.sendForm("SERVICE_ID", "template_ihilk89", formRef.current, 'USER_ID').then(() => {
            generateTicketNumber();
            setShowContent(true);
        }, () => {
            openModal();
        });
    };
    
    return (
        <>
            <div className={SupportPageStyle.supportPageBody}>
                <div className={SupportPageStyle.supportPageContainer}>
                    <div className={SupportPageStyle.formHeader}>
                        <h1 className={SupportPageStyle.formTitle}>Support Ticket Form</h1>
                        <Link to="/">
                            <img className={SupportPageStyle.closeIcon} src={CloseIcon} alt="close-icon"></img>
                        </Link>
                    </div>
                    <hr className={SupportPageStyle.line}></hr>
                    {showContent ? ( 
                        <Ticket ticketNumber={ticketNumber}/>
                    ) : (
                        <Form handleSubmit={handleSubmit} formRef={formRef} closeModal={closeModal} modalIsOpen={modalIsOpen}/>
                    )}
                </div>
            </div>
        </>
    );
}

export default Support;

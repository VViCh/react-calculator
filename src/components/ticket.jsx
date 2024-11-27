import React from "react";
import TicketStyle from "./styles/ticket.module.css";

const Ticket = ({ ticketNumber }) => {
    return (
        <>
            <div className={TicketStyle.ticketContainer}>
                <h2 className={TicketStyle.supportMessage}>
                    Thank you for sending us your report, we will track the problem now
                </h2>
                <p className={TicketStyle.ticketNumberText}>
                    ticket number: <span className={TicketStyle.ticketNumber}>{ticketNumber}</span>
                </p>
            </div>
        </>
    );
}

export default Ticket;
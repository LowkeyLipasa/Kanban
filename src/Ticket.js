import React from 'react';
import './Ticket.css';

const Ticket = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <h3 className="ticket-title">ID: {ticket.id}</h3>
      <p className="ticket-id">Title: {ticket.title}</p>
    </div>
  );
};

export default Ticket;

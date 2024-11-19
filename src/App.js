import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";
import Navbar from "./Navbar";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState("status");

  // Fetch the data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await response.json();
        console.log("Fetched tickets:", data.tickets); // Log tickets to check statuses
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Group tickets based on the selected criteria
  const groupTickets = (tickets, groupBy) => {
    if (groupBy === "status") {
      return {
        todo: tickets.filter((ticket) => ticket.status === "Todo"),
        inProgress: tickets.filter((ticket) => ticket.status === "In progress"),
        done: tickets.filter((ticket) => ticket.status === "Done"),
        cancelled: tickets.filter((ticket) => ticket.status === "Cancelled"),
      };
    }

    if (groupBy === "user") {
      return users.reduce((acc, user) => {
        acc[user.name] = tickets.filter((ticket) => ticket.userId === user.id);
        return acc;
      }, {});
    }

    if (groupBy === "priority") {
      return {
        urgent: tickets.filter((ticket) => ticket.priority === 4),
        high: tickets.filter((ticket) => ticket.priority === 3),
        medium: tickets.filter((ticket) => ticket.priority === 2),
        low: tickets.filter((ticket) => ticket.priority === 1),
        noPriority: tickets.filter((ticket) => ticket.priority === 0),
      };
    }
  };

  const groupedTickets = groupTickets(tickets, groupBy);

  return (
    <div className="App">
      <Navbar setGroupBy={setGroupBy} />
      <div className="columns">
        {Object.keys(groupedTickets).map((group, index) => (
          <div className="column" key={index}>
            <h2>
              {group === "todo"
                ? "To Do"
                : group === "inProgress"
                ? "In Progress"
                : group === "done"
                ? "Done"
                : group === "cancelled"
                ? "Cancelled"
                : group === "urgent"
                ? "Urgent"
                : group === "high"
                ? "High"
                : group === "medium"
                ? "Medium"
                : group === "low"
                ? "Low"
                : group === "noPriority"
                ? "No Priority"
                : group}
            </h2>
            {groupedTickets[group].length > 0 ? (
              groupedTickets[group].map((ticket) => (
                <Ticket key={ticket.id} ticket={ticket} users={users} />
              ))
            ) : (
              <p>No tickets in this group</p> // Message if no tickets in this group
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

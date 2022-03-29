import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

export const Dashboard = (props) => {
  useEffect(() => {
    const infoUser = { nombre: "" };

    if (infoUser === null) {
      props.history.push("/iniciarsesion");
    }
  });

  return <div>Dashboard</div>;
};

export default withRouter(Dashboard);

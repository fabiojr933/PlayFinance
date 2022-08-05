import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "./StyleSheets/Dashboard.css";
import ChartSection from "./Components/ChartSection";
import DashboardHeaderSection from "./Components/DashboardHeaderSection";
import OrderSection from "./Components/OrderSection";
import TodoLiveChat from "./Components/TodoLiveChat";



const Dashboard = () => {
  const historty = useHistory();

  useEffect(() => {
    let usuario = localStorage.getItem('@usuario');
    if (!usuario) {
      historty.push('/login');
    }
  }, [])

  return (
    <div className="main-content-container p-4 container-fluid">
      <div className="right-panel">
        <DashboardHeaderSection />
        <ChartSection />
        <OrderSection />
        <TodoLiveChat />
      </div>
    </div>
  );
}


export default Dashboard;

import React, { useEffect, useState } from "react";
import "./Recent.css";
import RecentAlert from "../RecentAlert";
import SideNav from "../SideNav";
import * as a from "../actions";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Recent() {
  const recents = useSelector(state => state.recent);
  const monthlySafeDanger = useSelector(state => state.monthly_safe_danger);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(a.getRecentBreachesFromAPI());
    dispatch(a.getMonthlyDangerCts());
  }, [dispatch]);


  if (!localStorage.getItem("token")) {
    console.log("no token..");
    return <Redirect to="/" />
  }

  return (
    <div className="Recent">
      <SideNav />
      <section className="Recent-safe-danger">
        <div>
          <h3>Monthly Safe Browse Counts:</h3>
          <p>{monthlySafeDanger[0]}</p>
        </div>
        <div>
          <h3>Monthly Danger Browse Counts:</h3>
          <p>{monthlySafeDanger[1]}</p>
        </div>
      </section>
      <section className="Recent-notice-container">
        <div className="Recent-notice-header">Recent</div>
        {recents.length > 0 ? recents.map(breach => <RecentAlert key={breach.Name} id={breach.Name} url={breach.Domain} breach_date={breach.BreachDate} details={breach.Description} />)
          : <p className="Recent-no-recents">No recent breaches found.</p>}
      </section>
    </div>
  );
}

export default Recent;
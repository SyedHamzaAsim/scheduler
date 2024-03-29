import React from "react";
import "./Application.scss";
import DayList from "./DayList";
import Appointment from "./appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "Helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {


  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);


  const mappedAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        {...appointment}
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
            selectedDay={state.day}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {mappedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
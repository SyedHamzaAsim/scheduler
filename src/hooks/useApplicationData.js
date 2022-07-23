import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  // setday function to export
  const setDay = day => setState({ ...state, day });

  //axios get requests to the api server
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    });
  }, []);

  // update spots function
  function updateSpots(state) {
    const currentDay = state.days[state.days.findIndex((day) => day.name === state.day)];
    const newSpots = currentDay.appointments.filter(
      (id) => state.appointments[id].interview == null
    ).length;
    const index = state.days.findIndex((day) => day.name === state.day);
    const updatedDays = [...state.days];
    updatedDays[index] = { ...currentDay, newSpots };
    return updatedDays;
  }

  // Makes a put command to the api server using id and interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState(state => ({ ...state, appointments }))
      })
      .then(setState((prev) => {
        return { ...prev, days: updateSpots(prev) }
      }))
  }

  //function for cancelling the interview, makes a delete requewst to axios and doesn't add interview
  function cancelInterview(id) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState(state => ({ ...state, appointments }))
      })
      .then(setState((prev) => {
        return { ...prev, days: updateSpots(prev) }
      }))
  }

  //exporting functions
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
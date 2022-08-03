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
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
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
  function updateSpots(appointments) {
    return state.days.map((day) => {
      let freeSpots = 0;
      for (let appointment of day.appointments) {
        if (!appointments[appointment].interview) {
          freeSpots++;
        }
      }
      return { ...day, spots: freeSpots }
    })
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
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState(state => ({ ...state, appointments, days: updateSpots(appointments) }))
      })
  }

  //function for cancelling the interview, makes a delete requewst to axios and doesn't add interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState(state => ({ ...state, appointments, days: updateSpots(appointments) }))
      })
  }

  //exporting functions
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
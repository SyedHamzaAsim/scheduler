import React from "react";
import "./styles.scss";
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import { useVisualMode } from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const EDIT = "EDIT";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";

function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //save function to pass as prop
  function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch((error) => {
      console.log("Error: ", error);
      transition(ERROR_SAVE, true);
    })
  }

  //edit function, transitions to edit mode and gets passed as a prop
  function onEdit() {
    transition(EDIT);
  };

  //cancel function, just goes back to the previous mode
  function onCancel() {
    back();
  };

  //delete button pressed but no confirm
  function removeAppointment() {
    transition(CONFIRM);
  };

  //confirmed delete, destroys the appointment
  function destroy(event) {
    transition(DELETE, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
   }

  return (
    <article className="appointment" data-testid="appointment">

      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={removeAppointment}
          onEdit={onEdit}
        />
      )}

      {mode === CREATE && 
        <Form 
          onCancel={onCancel} 
          interviewers = {props.interviewers}
          onSave={onSave}
        />}

      {mode === EDIT && 
        <Form
          student={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={onSave}
          onCancel={onCancel}
        />}

      {mode === CONFIRM && 
        <Confirm 
          onCancel={onCancel} 
          onConfirm={destroy} 
          message={"Delete the Appointment?"}
        />}

      {mode === ERROR_DELETE && 
        <Error
          message="An Error has occured while Deleting"
          onClose={onCancel}
        />}

      {mode === ERROR_SAVE && 
        <Error
          message="An Error has occured while Saving"
          onClose={onCancel}
        />}

      {mode === SAVING && <Status message={"Saving"} />}

      {mode === DELETE && <Status message={"Deleting"} />}
    </article>
  );
}

export default Appointment;
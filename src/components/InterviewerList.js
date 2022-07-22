import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss"
import PropTypes from 'prop-types'; 

function InterviewerList(props) {
  const {interviewers} = props;

  const interviewerItem = interviewers.map(
    (theInterviewer) => {
      return (
        <InterviewerListItem
          key={theInterviewer.id}
          name={theInterviewer.name}
          avatar={theInterviewer.avatar}
          selected={theInterviewer.id === props.value}
          setInterviewer={() => props.onChange(theInterviewer.id)}
        />
      );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list" >
        {interviewerItem}
      </ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;
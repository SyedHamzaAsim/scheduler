import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const {days} = props;

  const dayItems = days.map((eachDay) => {
    return(
      <DayListItem 
      key={eachDay.id}
      name={eachDay.name}
      spots={eachDay.spots}
      setDay={props.onChange}
      selected={eachDay.name === props.selectedDay}/>
    );
  });

  return (

  <ul>
    {dayItems}
  </ul>
  
  
  );
}
import React from "react";
import classNames from "classnames";
import "./DayListItem.scss"

export default function DayListItem(props) {
  const {setDay, name, spots, selected} = props
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  })
  return (
    <li onClick={() => setDay(name)} className={dayClass} selected={selected} data-testid="day">
      <h2 className="text--regular" >{name}</h2> 
      <h3 className="text--light">
        {spots === 0 && "no spots remaining"}
        {spots === 1 && "1 spot remaining"}
        {spots > 1 && `${spots} spots remaining`}
      </h3>
    </li>
  );
}
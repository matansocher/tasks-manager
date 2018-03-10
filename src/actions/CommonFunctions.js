// import React from 'react';(

export function getMainColor() {
  return '#1976D2';
}

export function getBackgroundColor(priority) {
  const wellDone = '#F74D4D'; // high priority
  const mediumWell = '#F78B4D';
  const medium = '#F6A94D'; // medium priority
  const rare = '#F8C74E';
  const raw = '#CDBD34'; // low priority

  switch(priority) {
    case 1: return wellDone;
    case 2: return mediumWell;
    case 3: return medium;
    case 4: return rare;
    case 5: return raw;
    default: return medium;

  }
}

export function makeID() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export function convertDateStringToObject(date) {
  if(date === "N/A" || date === '')
    return null;
  return new Date(date);
}

export function convertTimeStringToObject(time) {
  if(time === "N/A" || time === '')
    return null;
  const newTime = new Date();
  newTime.setHours(time.substr(0, time.indexOf(':')));
  newTime.setMinutes(time.substr(time.indexOf(':')+1, time.length));
  return newTime;
}

export function createDateFormat(date) {
  if(!date) {
    return "N/A";
  } else {
    date = new Date(date);
    date.setDate(date.getDate()+1);
    return date.toJSON().slice(0,10);
  }
}

export function createDateFormatToPresent(date) {
  date = date === new Date().toJSON().slice(0,10) ?
    "Today"
    :
    date;
  return date;
}

export function createTimeFormat(time) {
  return time ? `${time.getHours()}:${time.getMinutes()}` : "N/A";
}

export function createTimeFormatToPresent(time) {
  if(time === "N/A") {
    return time;
  }
  let hours = time.substr(0, time.indexOf(':'));
  let minutes = time.substr(time.indexOf(':')+1, time.length);
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes}`
}

export function sortArray(array, sortBy) {
  return array.sort((a, b) => {
    switch(sortBy) {
      case 'title':
        return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
      case 'deadLine_date':
        array.map((task) => {
          const splitDays = task.date_deadline.split('-');
          let numOfDays = 365*splitDays[0]+30*splitDays[1]+splitDays[2];
          numOfDays = isNaN(numOfDays) ? "0" : numOfDays;
          const splitHours = task.time_deadline.split(':');
          let numOfHours = 24*splitHours[0]+splitHours[1];
          numOfHours = isNaN(numOfHours) ? "0" : numOfHours;
          task.numOfDays = numOfDays + numOfHours;
          return task;
        });
        return (a.numOfDays > b.numOfDays) ? 1 : ((b.numOfDays > a.numOfDays) ? -1 : 0);
      case 'date_created':
        array.map((task) => {
          const splitDays = task.date_created.split('-');
          let numOfDays = 365*splitDays[0]+30*splitDays[1]+splitDays[2];
          numOfDays = isNaN(numOfDays) ? "0" : numOfDays;
          task.numOfDays = numOfDays;
          return task;
        });
        return (a.numOfDays > b.numOfDays) ? 1 : ((b.numOfDays > a.numOfDays) ? -1 : 0);
      case 'priority':
        return (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0);
      default: return (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0);
    }
  });
}

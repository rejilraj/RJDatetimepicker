import React, { useEffect, useRef, useState } from "react";
import "./DateTimePicker.css";
import { ChevronLeft, ChevronRight } from "react-feather";

function DateTimePicker({
  selectedDate,
  onChange,
  ondateclick,
  value,
  editable = true,
  eighteenYearsCheck,
  resetMonthDropdown,
}) {
  const currentDate = new Date();
  const eighteenYearsAgo = new Date(
    currentDate.getFullYear() - 23,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  // Initialize state for the selected date
  const [selected, setSelected] = useState(selectedDate || currentDate);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const scrollyearref = useRef(null);

  useEffect(() => {
    if (!resetMonthDropdown) {
      setShowMonthDropdown(false);
      setShowYearDropdown(false);
    }
  }, [resetMonthDropdown]);

  // Function to handle date selection

  const formatWithLeadingZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const handleDateChange = (date) => {
    setSelected(date);
    if (onChange) {
      // const formattedDate = `${formatWithLeadingZero(date.getDate())}/${formatWithLeadingZero(
      //   date.getMonth() + 1
      // )}/${date.getFullYear()}`;
      const formattedDate = `${formatWithLeadingZero(
        date.getMonth() + 1
      )}/${formatWithLeadingZero(date.getDate())}/${date.getFullYear()}`;
      onChange(formattedDate);
    }
  };

  // Function to generate days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to generate an array of days for a month
  const generateDaysArray = () => {
    const year = selected.getFullYear();
    const month = selected.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysArray = [];

    // Get today's date
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    // Add empty slots for the days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push("");
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      // Check if the current day is the selected date
      const isSelected = i === selected.getDate();
      // Check if the current day is today's date
      const isToday =
        i === todayDate && year === todayYear && month === todayMonth;
      // Push an object containing the day and its classes
      daysArray.push({ day: i, year, month, isSelected, isToday });
    }

    return daysArray;
  };

  // Function to handle clicking on a day
  const handleDayClick = (day) => {
    if (day !== undefined) {
      const newDate = new Date(selected);
      newDate.setDate(day);
      ondateclick();
      handleDateChange(newDate);
    }
  };

  const handleMonthChange = (month) => {
    setSelected((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(month);
      return newDate;
    });
    setShowMonthDropdown(false);
    if (onChange) {
      const newDate = new Date(
        selected.getFullYear(),
        month,
        selected.getDate()
      );
      // const formattedDate = `${formatWithLeadingZero(newDate.getDate())}/${formatWithLeadingZero(
      //   newDate.getMonth() + 1
      // )}/${newDate.getFullYear()}`;
      const formattedDate = `${formatWithLeadingZero(
        newDate.getMonth() + 1
      )}/${formatWithLeadingZero(newDate.getDate())}/${newDate.getFullYear()}`;
      onChange(formattedDate);
    }
  };

  const handleYearChange = (year) => {
    setSelected((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(year);
      if (eighteenYearsCheck) {
        if (year === eighteenYearsAgo.getFullYear()) {
          if (newDate.getMonth() > eighteenYearsAgo.getMonth()) {
            newDate.setMonth(eighteenYearsAgo.getMonth());
          }
        }
      } else {
        if (year === currentDate.getFullYear()) {
          if (newDate.getMonth() > currentDate.getMonth()) {
            newDate.setMonth(currentDate.getMonth());
          }
        }
      }
      return newDate;
    });
    setShowYearDropdown(false);
    if (onChange) {
      const newDate = new Date(year, selected.getMonth(), selected.getDate());
      // const formattedDate = `${formatWithLeadingZero(newDate.getDate())}/${formatWithLeadingZero(
      //   newDate.getMonth() + 1
      // )}/${newDate.getFullYear()}`;
      const formattedDate = `${formatWithLeadingZero(
        newDate.getMonth() + 1
      )}/${formatWithLeadingZero(newDate.getDate())}/${newDate.getFullYear()}`;
      onChange(formattedDate);
    }
  };

  const maxMonthEigteenYears =
    eighteenYearsCheck &&
    selected.getFullYear() === eighteenYearsAgo.getFullYear()
      ? eighteenYearsAgo.getMonth()
      : 11;
  const maxMonth =
    !eighteenYearsCheck && selected.getFullYear() === currentDate.getFullYear()
      ? currentDate.getMonth()
      : 11;

  const maxYearCheck = currentDate.getFullYear() - 60;
  const maxMonthCheck = currentDate.getMonth();
  const maxEighteenYearCheck = eighteenYearsAgo.getFullYear() - 35;
  const maxEighteenMonthCheck = eighteenYearsAgo.getMonth();

  const showLeftChevron = !eighteenYearsCheck
    ? selected.getFullYear() > maxYearCheck ||
      (selected.getFullYear() === maxYearCheck &&
        selected.getMonth() > maxMonthCheck)
    : selected.getFullYear() > maxEighteenYearCheck ||
      (selected.getFullYear() === maxEighteenYearCheck &&
        selected.getMonth() > maxEighteenMonthCheck);

  const showRightChevron = !eighteenYearsCheck
    ? selected.getFullYear() < currentDate.getFullYear() ||
      (selected.getFullYear() === currentDate.getFullYear() &&
        selected.getMonth() < currentDate.getMonth())
    : selected.getFullYear() < eighteenYearsAgo.getFullYear() ||
      (selected.getFullYear() === eighteenYearsAgo.getFullYear() &&
        selected.getMonth() < eighteenYearsAgo.getMonth());

  const yearscroll = () => {
    setTimeout(() => {
      if (scrollyearref.current) {
        scrollyearref.current.scrollTo({
          top: scrollyearref.current.scrollHeight,
          behavior: "smooth", // This adds a smooth scrolling effect
        });
      }
    }, 200);
  };

  return (
    <div
      className="date-picker-container"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {!showMonthDropdown && !showYearDropdown ? (
        <div className="date-picker-month-year">
          {showLeftChevron ? (
            <button
              className="date-picker-button"
              onClick={(e) => {
                e.stopPropagation();
                handleDateChange(
                  new Date(selected.getFullYear(), selected.getMonth() - 1, 1)
                );
              }}
            >
              <ChevronLeft style={{ animation: "none" }} />
            </button>
          ) : (
            <div className="date-picker-button-empty"></div>
          )}

          <div className="date-picker-button-onth-year-wrapper">
            <h2
              className="date-picker-month-text"
              id="monthbtn"
              onClick={(e) => {
                e.stopPropagation();
                setShowMonthDropdown(true);
              }}
            >
              {selected
                .toLocaleDateString("en-US", {
                  month: "long",
                })
                .slice(0, 3)}
            </h2>

            <h2
              className="date-picker-year-text"
              id="yearbtn"
              onClick={(e) => {
                e.stopPropagation();
                setShowYearDropdown(true);
                yearscroll();
              }}
            >
              {selected.toLocaleDateString("en-US", {
                year: "numeric",
              })}
            </h2>
          </div>
          {showRightChevron ? (
            <button
              className="date-picker-button"
              onClick={(e) => {
                e.stopPropagation();
                handleDateChange(
                  new Date(selected.getFullYear(), selected.getMonth() + 1, 1)
                );
              }}
            >
              <ChevronRight style={{ animation: "none" }} />
            </button>
          ) : (
            <div className="date-picker-button-empty"></div>
          )}
        </div>
      ) : null}
      {!showMonthDropdown && !showYearDropdown ? (
        <>
          <div className="date-picker-days-top">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} id={"id_" + day}>
                {day}
              </div>
            ))}
          </div>

          <div className="date-picker-days">
            {generateDaysArray().map((dayInfo, index) => {
              const lastDayOfMonth = new Date(
                dayInfo.year,
                dayInfo.month + 1,
                0
              ).getDate();
              let daysValue;

              if (eighteenYearsCheck === true) {
                if (
                  dayInfo.day <= lastDayOfMonth ||
                  dayInfo.month !== eighteenYearsAgo.getMonth() ||
                  dayInfo.year !== eighteenYearsAgo.getFullYear()
                ) {
                  daysValue = dayInfo.day;
                }
              } else if (eighteenYearsCheck === false) {
                if (
                  dayInfo.day <= lastDayOfMonth ||
                  dayInfo.month !== currentDate.getMonth() ||
                  dayInfo.year !== currentDate.getFullYear()
                ) {
                  daysValue = dayInfo.day;
                }
              }
              return (
                <button
                  key={index}
                  id={"id_" + daysValue}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDayClick(daysValue);
                  }}
                  className={`${
                    dayInfo.isSelected ? "date-picker-selected" : ""
                  } ${
                    dayInfo.isToday && !dayInfo.isSelected ? "today-date" : ""
                  } ${
                    daysValue &&
                    !(
                      (eighteenYearsCheck &&
                        daysValue > currentDate.getDate() &&
                        dayInfo.month == currentDate.getMonth() &&
                        dayInfo.year == eighteenYearsAgo.getFullYear()) ||
                      (!eighteenYearsCheck &&
                        daysValue > currentDate.getDate() &&
                        dayInfo.month == currentDate.getMonth() &&
                        dayInfo.year == currentDate.getFullYear())
                    )
                      ? "valid-day"
                      : "invalid-day"
                  }`}
                  disabled={
                    (eighteenYearsCheck &&
                      daysValue > currentDate.getDate() &&
                      dayInfo.month == currentDate.getMonth() &&
                      dayInfo.year == eighteenYearsAgo.getFullYear()) ||
                    (!eighteenYearsCheck &&
                      daysValue > currentDate.getDate() &&
                      dayInfo.month == currentDate.getMonth() &&
                      dayInfo.year == currentDate.getFullYear())
                  }
                >
                  {daysValue}
                </button>
              );
            })}
          </div>
        </>
      ) : null}

      {showMonthDropdown && (
        <div className="datepicker-month-dropdown-content">
          {eighteenYearsCheck == true && (
            <>
              {Array.from({ length: 12 }, (_, i) => {
                if (i <= maxMonthEigteenYears) {
                  const monthSelected = new Date(0, i).toLocaleString(
                    "default",
                    {
                      month: "long",
                    }
                  );
                  return (
                    <div
                      key={i}
                      id={"id_" + monthSelected}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMonthChange(i);
                      }}
                    >
                      {monthSelected}
                    </div>
                  );
                }
                return null;
              })}
            </>
          )}
          {eighteenYearsCheck == false && (
            <>
              {Array.from({ length: 12 }, (_, i) => {
                if (i <= maxMonth) {
                  const monthSelected = new Date(0, i).toLocaleString(
                    "default",
                    {
                      month: "long",
                    }
                  );
                  return (
                    <div
                      key={i}
                      id={"id_" + monthSelected}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMonthChange(i);
                      }}
                    >
                      {monthSelected}
                    </div>
                  );
                }
                return null; // Don't render months beyond maxMonthEigteenYears
              })}
            </>
          )}
        </div>
      )}
      {showYearDropdown && (
        <div className="datepicker-year-dropdown-content">
          {eighteenYearsCheck == true && (
            <div
              className="datepicker-year-dropdown-scrollable"
              ref={scrollyearref}
            >
              {Array.from({ length: 50 }, (_, i) => {
                const year = eighteenYearsAgo.getFullYear() - 35 + i;
                if (year <= eighteenYearsAgo.getFullYear()) {
                  return (
                    <div
                      key={i}
                      id={"id_" + year}
                      className="datepicker-year-dropdown-list"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleYearChange(year);
                      }}
                    >
                      {year}
                    </div>
                  );
                }
              })}
            </div>
          )}
          {eighteenYearsCheck == false && (
            <div
              className="datepicker-year-dropdown-scrollable"
              ref={scrollyearref}
            >
              {Array.from({ length: 100 }, (_, i) => {
                const year = currentDate.getFullYear() - 60 + i;
                {
                  /* const year = selected.getFullYear() - 60 + i; */
                }
                if (year <= currentDate.getFullYear()) {
                  return (
                    <div
                      key={i}
                      id={"id_" + year}
                      className="datepicker-year-dropdown-list"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleYearChange(year);
                      }}
                    >
                      {year}
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DateTimePicker;
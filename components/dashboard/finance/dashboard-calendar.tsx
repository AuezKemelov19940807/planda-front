"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
interface DashboardCalendarProps {
  value: Date;
  onChange: (date: Date) => void;
}
export default function DashboardCalendar({
  value,
  onChange,
}: DashboardCalendarProps) {
  return (
    <Calendar
      value={value}
      onChange={(nextValue) => {
        if (nextValue instanceof Date) {
          onChange(nextValue);
        }
      }}
      className="planola-calendar"
      locale="ru-RU"
      navigationLabel={({ date }) =>
        date.toLocaleDateString("ru-RU", {
          month: "long",
          year: "numeric",
        })
      }
      next2Label={null}
      prev2Label={null}
    />
  );
}

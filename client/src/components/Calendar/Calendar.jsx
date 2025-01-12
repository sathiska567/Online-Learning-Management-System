import React from 'react';
import { Calendar, Select , Space } from 'antd';
import dayjs from 'dayjs';

const CalendarComponent = () => {
  const currentDate = dayjs('2025-01-12');

  const headerRender = ({ value, onChange }) => {
    const current = value.clone();
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push(current.month(i).format('MMMM'));
    }

    return (
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex gap-2">
        <Space size="large" direction="vertical">
        <Space size="large" direction="horizontal">
      <Select
        defaultValue="Month"
        className="w-24 month-dropdown"
      />
      <Select
        defaultValue="Year"
        className="w-24 year-dropdown"
      />
    </Space>

        <div className="text-2xl font-semibold">
          {current.format('MMMM YYYY')}
        </div>
      
         </Space>
        </div>
       
      </div>
    );
  };

  const dateCellRender = (value) => {
    const events = [
      {
        date: '2025-01-08',
        title: 'Lab Assignment',
        type: 'lab'
      }
    ];

    const cellEvents = events.filter(event => 
      value.format('YYYY-MM-DD') === event.date
    );

    return (
      <div>
        {cellEvents.map((event, index) => (
          <div 
            key={index}
            className="flex items-center gap-1 text-blue-600"
          >
            <span className="w-2 h-2 rounded-full bg-red-400"/>
            {event.title}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="calendar-container max-w-5xl mx-auto">
      <Calendar 
        defaultValue={currentDate}
        headerRender={headerRender}
        dateCellRender={dateCellRender}
        className="custom-calendar"
      />
    </div>
  );
};

export default CalendarComponent;
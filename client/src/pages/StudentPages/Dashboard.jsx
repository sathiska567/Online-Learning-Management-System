import React from 'react'
import SideBar from '../../components/DashboardSideBar/SideBar'
import { Calendar, Select } from 'antd';
import dayjs from 'dayjs';
import CalendarComponent from '../../components/Calendar/Calendar';

export default function Dashboard() {
  return (
    <SideBar>
       <CalendarComponent/>
    </SideBar>
  )
}

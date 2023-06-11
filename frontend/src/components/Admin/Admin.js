import React, { Fragment, useEffect, useState } from 'react';
import BarGraph from '../Layout/BarGraph';
import { useDispatch, useSelector } from 'react-redux';
import {  getBarData, getPieData } from '../../actions/adminAction';
import PieChart from '../Layout/PieChart';

const Admin = () => {
  const [selectedId, setSelectedId] = useState('');
  const dispatch = useDispatch();
   useEffect(()=>{
    Promise.all([dispatch(getPieData()), dispatch(getBarData())]);
    setSelectedId('Drugs');
   },[]);
   const [pieChartData,setPieChartData] = useState(null);
   const [barGraphData,setBarGraphData] = useState(null);
 
   const { pie,bar }= useSelector(state=>state.graph);
   useEffect(()=>{
   setPieChartData(pie);
   setBarGraphData(bar);
  },[pie,bar])

 
  const handleItemClick = (_id) => {
    setSelectedId(_id);
  };
 


 
  return (
    <div>
      <h1>Admin Panel</h1>
      <div className='d-inline-flex'>
      <div className='ml-5'>
      <h6>Select Type of Addiction</h6>
<select value={selectedId} onChange={(e) => handleItemClick(e.target.value)}>
  <option value="" disabled>Select an item</option>
  {Array.isArray(pieChartData) && pieChartData.map((item) => (
    <option key={item._id} value={item._id}>
      {item._id}
    </option>
  ))}
</select>
      {barGraphData&& Array.isArray(barGraphData.results) &&( <BarGraph data={barGraphData.results} selectedId={selectedId} />)}
     
      </div>
      <div className='ml-5'>
      <h3>Pie Chart</h3>
     
      {Array.isArray(pieChartData) && (<PieChart data={pieChartData} onItemClick={handleItemClick} />)}
      </div>
    </div>
    

    </div>
      
  );
};

export default Admin;

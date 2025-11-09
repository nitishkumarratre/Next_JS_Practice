import React from 'react';
import DashboardCharts from '@/components/DashboardCharts';
import DashboardCharts1 from '@/components/DashboardCharts1';


const Chart = () => {
    return (
        <div>
            <h1 className='text-center'>Radial Bar</h1>
            <DashboardCharts />
            <DashboardCharts1 />
        </div>
    );
}

export default Chart;

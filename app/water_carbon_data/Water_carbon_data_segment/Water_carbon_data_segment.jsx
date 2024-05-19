"use client";
import React, { useEffect, useState } from 'react';
import { createApiClient } from '@/utils/apiClient';
import Usage from './Usage_component/Usage_component';
import withLanguage from './../service/withLanguage';

const Water_carbon_data_Segment = ({ buildingId, languageData }) => {
  const [totalUsageWater, setTotalUsageWater] = useState('0 GPM');
  const [TotalUsageWaterSaved, setTotalUsageWaterSaved] = useState('0 GPM');

  useEffect(() => {
    if (!buildingId) return;

    const client = createApiClient('post', process.env.NEXT_PUBLIC_Building_Update_API);
    client('', {
      building_uid: buildingId
    })
    .then(response => {
      setTotalUsageWater(`${response.data.total_usage_water} GAL`);
      setTotalUsageWaterSaved(`${response.data.total_usage_water_saved} GAL`);
    })
    .catch(error => console.error('Error fetching building data:', error));
  }, [buildingId]);

  return (
    <div className='w-full flex justify-center items-center space-x-10 py-4 mb-5 bg-custom-cyan rounded-t-2xl shadow-md shadow-gray-950'>
      <div className='w-1/4'>
        <Usage topText={languageData.usage.total_usage_water} bottomText={totalUsageWater}></Usage>
      </div>
      <div className='w-1/4'>
        <Usage topText={languageData.usage.total_usage_water_saved} bottomText={TotalUsageWaterSaved}></Usage>
      </div>
    </div>
  );
}

export default withLanguage(Water_carbon_data_Segment);

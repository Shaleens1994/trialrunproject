import React from 'react';
import Equipmentlist from '../components/Equipmentlist';


function Equipments(){

  return (
    <div className=" my-3 equipments">
      <h1 className="mx-4 my-4">Equipments</h1>
      <div>
        <div>
          <Equipmentlist />
        </div>
      </div>
    </div>
  );
}

export default Equipments;

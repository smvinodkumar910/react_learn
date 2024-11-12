"use client"

import React, { useEffect } from 'react';
import Script from 'next/script';
//import Sheet from '@/app/linearview/tableau/extensions-api-types'
import marks from '@/app/linearview/tableau/extensions-api-types';
//import getFilterDetails from '@/app/linearview/applyFilters';



/*
function getDataColumns(worksheet: marks.Worksheet){
  

  worksheet.getSummaryColumnsInfoAsync().then((response)=>{

    response.forEach((columns, index)=>{
      console.log(columns.fieldName);
      console.log(index);
    })

  },(error) => console.log(error));
  
}

function getData(worksheet: marks.Worksheet){
  worksheet.getSummaryDataReaderAsync().then((response)=>{
    response.getAllPagesAsync(200).then(data => {
      data.data.forEach((value, index) => {
        console.log(index);
        value.forEach(value => {
          console.log(value.value);
        })
      })
    })
  },(error) => console.log(error));

}
*/

function getFilterDetails(worksheet: marks.Worksheet){
  worksheet.getFiltersAsync().then((response)=>{
      response.forEach((filter, filterIndex)=>{
          console.log(filterIndex);
          console.log(filter.fieldName);
          console.log(filter.filterType);
          console.log(filter.fieldId)
          filter.getFieldAsync().then(response => {
              console.log(response.columnType);
          })

      })
  }, (error) => console.log(error));
}


function MainComponent () {

  const [workSheetName, setWorkSheetName] = React.useState<string | null>(null);
  //const [workSheetSize, setWorkSheetSize] = React.useState<Sheet.Size | null>(null); // use to fit the Viz.
  

  
  useEffect(() => {
   
    if (typeof window !== 'undefined' && tableau) {
      
      tableau.extensions.initializeAsync().then(() => {
        const worksheet = tableau.extensions.worksheetContent?.worksheet
        let worksheetname = null;
        //getDataColumns(worksheet!);
        //getData(worksheet!)
        getFilterDetails(worksheet!);
        
        //let worksheetsize: Sheet.Size | null = null;
        try {
          if(worksheet && worksheet.name){
            worksheetname = worksheet.name;
            //worksheetsize = worksheet.size;
          }
          
          setWorkSheetName(worksheetname);
          //setWorkSheetSize(worksheetsize!);
          
        } catch (error) {
          console.error("Error getting Tableau settings:", error);
          setWorkSheetName(null);
        }
      
    });
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSheet = () => {
    if (workSheetName) {
      return <div>WorkSheet: {workSheetName} </div>;
    }
    return <div>No sheet selected</div>;
  };

  return (
    <>
      <Script src="/scripts/tableau.extensions.1.latest.js" strategy="beforeInteractive" />
      {renderSheet()}
    </>
  );
}

export default MainComponent;

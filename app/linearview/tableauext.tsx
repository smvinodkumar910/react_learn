"use client"

import React, { useEffect } from 'react';
import Script from 'next/script';
//import Sheet from '@/app/linearview/tableau/extensions-api-types'
import marks from '@/app/linearview/tableau/extensions-api-types';



/*
function getDataColumns(worksheet: marks.Worksheet){
  

  worksheet.getSummaryColumnsInfoAsync().then((response)=>{

    response.forEach((columns, index)=>{
      console.log(columns.fieldName);
      console.log(index);
    })

  },(error) => console.log(error));
  
}
*/

function getData(worksheet: marks.Worksheet){
  const records: { from: marks.DataValue | undefined; to: marks.DataValue | undefined; }[] =[];
  worksheet.getSummaryDataReaderAsync().then((response)=>{
    response.getAllPagesAsync().then(data => {
      console.log(data.totalRowCount);
      
      data.data.forEach((value) => {
        const record = {from: value.at(1)?.value, to: value.at(2)?.value};
        records.push(record);
      }) 
      
    })
  },(error) => console.log(error));
  console.log(records);
  return records;
}


function getFilterDetails(worksheet: marks.Worksheet): void {
  worksheet.getFiltersAsync().then((response) => {
    response.forEach((filter) => {
      
      const categoricalFilter = filter as marks.CategoricalFilter;

      categoricalFilter.appliedValues.forEach(function (value) {
        console.log(value.formattedValue + ', ');
      });
      


    })
  }, (error) => console.log(error));
}


function MainComponent() {

  const [workSheetName, setWorkSheetName] = React.useState<string | null>(null);
  //const [workSheetSize, setWorkSheetSize] = React.useState<Sheet.Size | null>(null); // use to fit the Viz.



  useEffect(() => {

    if (typeof window !== 'undefined' && tableau) {

      tableau.extensions.initializeAsync().then(() => {
        const worksheet = tableau.extensions.worksheetContent?.worksheet
        let worksheetname = null;
        //getDataColumns(worksheet!);
        


        if (worksheet) {
          worksheet.addEventListener(tableau.TableauEventType.FilterChanged, function (filterChangedEvent) {
            console.log(filterChangedEvent)
            getFilterDetails(worksheet!);
            getData(worksheet!)
          })
        }

        //let worksheetsize: Sheet.Size | null = null;
        try {
          if (worksheet && worksheet.name) {
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

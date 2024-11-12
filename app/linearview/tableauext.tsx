"use client"

import React, { useEffect } from 'react';
import Script from 'next/script';
//import Sheet from '@/app/linearview/tableau/extensions-api-types'
import marks from '@/app/linearview/tableau/extensions-api-types'


function MainComponent () {

  const [workSheetName, setWorkSheetName] = React.useState<string | null>(null);
  //const [workSheetSize, setWorkSheetSize] = React.useState<Sheet.Size | null>(null); // use to fit the Viz.
  

  
  useEffect(() => {
   
    if (typeof window !== 'undefined' && tableau) {
      
      tableau.extensions.initializeAsync().then(() => {
        const worksheet = tableau.extensions.worksheetContent?.worksheet
        let worksheetname = null;
        //let worksheetsize: Sheet.Size | null = null; 
        worksheet?.getSelectedMarksAsync().then((sheetmarks :marks.MarksCollection)=>{

          const sheetData = sheetmarks.data;
          console.log(sheetData.join(","));
        })
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

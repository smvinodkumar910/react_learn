"use client"

import React, { useEffect, useRef } from 'react';
import Script from 'next/script';
//import Sheet from '@/app/linearview/tableau/extensions-api-types'
import marks from '@/app/linearview/tableau/extensions-api-types';
//import { createNetwork } from '@/app/linearview/dynamicNetwork';
import { Network, Data, Options } from 'vis-network/standalone';




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

function getData(worksheet: marks.Worksheet): { from: string | undefined; to: string | undefined; }[] {
  const records: { from: string | undefined; to: string | undefined; }[] =[];
  worksheet.getSummaryDataReaderAsync().then((response)=>{
    response.getAllPagesAsync().then(data => {
      console.log(data.totalRowCount);
      
      data.data.forEach((value) => {
        const fromValue = value.at(1);
        const toValue = value.at(2);
        const record: {from: string | undefined; to: string | undefined;} = {from: undefined, to: undefined};
        if(fromValue){
          record.from = fromValue.formattedValue;
        }
        if(toValue){
          record.to = toValue.formattedValue;
        }
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


const MainComponent: React.FC =() => {
  
  const [workSheetName, setWorkSheetName] = React.useState<string | null>(null);
  const networkContainer = useRef<HTMLDivElement>(null);
  //const [workSheetSize, setWorkSheetSize] = React.useState<Sheet.Size | null>(null); // use to fit the Viz.



  useEffect(() => {
    
    if (typeof window !== 'undefined' && tableau && networkContainer.current) {

      tableau.extensions.initializeAsync().then(() => {
        const worksheet = tableau.extensions.worksheetContent?.worksheet
        let worksheetname = null;
        //getDataColumns(worksheet!);
        


        if (worksheet) {
          worksheet.addEventListener(tableau.TableauEventType.FilterChanged, function (filterChangedEvent) {
            console.log(filterChangedEvent)
            getFilterDetails(worksheet!);
            const tableaData = getData(worksheet!);
            
            const nodes: { id: string | undefined; label: string | undefined; }[] = [];
            tableaData.forEach((value)=>{
              nodes.push({ id: value.from, label: value.from });
            });

            const edges = tableaData ;

            // Data for network
            const data: Data = { nodes, edges };

            // Network options
            const options: Options = {
              nodes: {
                shape: 'dot',
                size: 16,
                color: {
                  background: '#97C2FC',
                  border: '#2B7CE9',
                },
                font: { color: '#343434' },
              },
              edges: {
                color: '#848484',
              },
              physics: {
                enabled: true,
              },
            };


            if(networkContainer.current){
              const network = new Network(networkContainer.current, data,options);
              network.on('click', (params) => {
                console.log('Clicked on:', params);
              });
            }
            
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
      return <div ref={networkContainer} style={{width: "100%", height: "800px"}}></div>;
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

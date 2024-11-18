"use client"
import React, { useEffect, useRef } from 'react';
import { Network, Data, Options } from 'vis-network/standalone';
import 'vis-network/styles/vis-network.min.css';
import marks from '@/app/linearview/tableau/extensions-api-types';
import Script from 'next/script';



function getData(worksheet: marks.Worksheet): Promise<Data> { 
    return new Promise((resolve, reject) => {
      worksheet.getSummaryDataReaderAsync().then((response) => {
        response.getAllPagesAsync().then(data => {
          const edges: { from: string; to: string; }[] = [];
          const nodesArray:  { id: string; label: string; group: string}[] = [] 
          const nodesMap = new Map<string, { id: string; label: string; group: string }>(); // Use a Map to track unique nodes
          data.data.forEach((value) => {
            const fromValue = value.at(1);
            const toValue = value.at(2);
            const nodeTypeValue = value.at(3);
            const from = fromValue?.formattedValue;
            const to = toValue?.formattedValue;
            const nodeType = nodeTypeValue?.formattedValue;
            if(from && to && nodeType){
              const key = `${from}-${nodeType}`;
            if(!nodesMap.has(key))
              {
                const newNode = { id: from, label: from, group: nodeType };
                nodesArray.push(newNode);
                nodesMap.set(key, newNode); 
              }
              edges.push({ from: from, to: to });
            }
            
          });
          
          /*
          const nodesunique = new Set(nodesArray);
          
          const nodes: { id: string; label: string; group: string}[] = [];
          nodesunique.forEach((value)=>{
            nodes.push(value);
          });
          */
          
          const networkData: Data = { nodes: nodesArray, edges: edges };
  
          resolve(networkData); 
        }).catch(reject);
      }).catch(reject);
    });
  }

/*
function configure():{ 'status' : 'success' | 'error'}{
  tableau.extensions.initializeDialogAsync().then(() => {

  }, (error) => {
    console.log(error);
  })
  return { 'status': 'success' };

}
*/

function testmarks(worksheet: marks.Worksheet){
  worksheet.getSelectedMarksAsync().then((value)=>{
    const marksData = value.data;
    marksData.forEach((dataTable)=>{
      dataTable.columns.forEach((column)=>{
        console.log(column.fieldName);
      })
    })
  }, (error)=>{
    console.log(error);
  })
}

const VisNetwork: React.FC = () => {
    const networkContainer = useRef<HTMLDivElement>(null);
    //const [workSheetName, setWorkSheetName] = React.useState<string | null>(null);
    const [currentData, setCurrentData] = React.useState<Data | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && networkContainer.current && tableau) {
          tableau.extensions.initializeAsync().then(() => {
            const worksheet = tableau.extensions.worksheetContent?.worksheet;
    
            if (worksheet) {
              //setWorkSheetName(worksheet.name); 

              worksheet.addEventListener(tableau.TableauEventType.FilterChanged, function (filterChangedEvent) {
                console.log(filterChangedEvent)
                getData(worksheet)
                .then(data => {
                  console.log("Data fetched:", data); 
                  setCurrentData(data);
                })
                .catch(error => console.error("Error fetching data:", error));

                testmarks(worksheet);
                
              }
              );
    
              getData(worksheet)
                .then(data => {
                  console.log("Data fetched:", data); 
                  setCurrentData(data);
                })
                .catch(error => console.error("Error fetching data:", error));
            }
          });
        }
      }, []);

      useEffect(() => {
        let network: Network | null = null;
    
        if (currentData && networkContainer.current) {
          const options: Options = { 
            autoResize: true,
            height: '100%',
            width: '100%',
            nodes: { 
              shape: 'dot',
              size: 16,
              color: {
                background: '#97C2FC',
                border: '#2B7CE9',
              },
              font: { color: '#343434' },
              physics : false
            },
            edges: {
              color: '#848484',
              arrows: {
                to: {
                  enabled: true,
                  type: "arrow"
                },
            },
            physics : false,
            smooth : {
               enabled : true,
               type : "discrete",
               roundness : 0.2 
            }
        },
            physics: {
              enabled: false
            },
            groups: {
                END_MODEL_PLANT : {color:{background: '#fc8403'}, borderWidth:3},
                Customer : {color:{background:'#b6fc03'}, borderWidth:3},
                tier3 : {color:{background:'#03e3fc'}, borderWidth:3},
                tier4 : {color:{background:'#03e3fc'}, borderWidth:3},
                COMPONENT_PLANT : {color:{background:'#fc03c2'}, borderWidth:3},
                Supplier : {color:{background:'#b103fc'}, borderWidth:3},
                tier2 : {color:{background:'#03e3fc'}, borderWidth:3},
                tier5 : {color:{background:'#03e3fc'}, borderWidth:3},
                tier6 : {color:{background:'#03e3fc'}, borderWidth:3},
                Logistics : {color:{background:'#03fc39'}, borderWidth:3}
              }
          };
    
          network = new Network(networkContainer.current, currentData, options);
    
          network.on('click', (params) => {
            console.log('Clicked on:', params);
          });
        }
    
        return () => { 
          if (network) {
            network.destroy();
          }
        };
      }, [currentData]);
    
    
    return (
        <>
            <Script src="/scripts/tableau.extensions.1.latest.js" strategy="beforeInteractive" />
            <div
                ref={networkContainer}
                className="h-screen w-screen"
            />
        </>

    );
};

export default VisNetwork;

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
          const nodesArray: string[] = [] 
          data.data.forEach((value) => {
            const fromValue = value.at(1);
            const toValue = value.at(2);
            const from = fromValue?.formattedValue;
            const to = toValue?.formattedValue;
            if(from && to){
              nodesArray.push(from);
              edges.push({ from: from, to: to });
            }
            
          });
          
          const nodesUnique = new Set(nodesArray);
          
          const nodes: { id: string; label: string; }[] = [];
          nodesUnique.forEach((value)=>{
            nodes.push({ id: value, label: value });
          });
          
          const networkData: Data = { nodes, edges };
  
          resolve(networkData); 
        }).catch(reject);
      }).catch(reject);
    });
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
              physics : true
            },
            edges: {
              color: '#848484',
              arrows: {
                to: {
                  enabled: true,
                  type: "arrow"
                },
            },
            physics : true,
            smooth : {
               enabled : true,
               type : "discrete",
               roundness : 0.2 
            }
        },
            physics: {
              enabled: true
            },
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
    
    /*
    const renderSheet = () => {
        if (workSheetName) {
            return <div>worksheet name is {workSheetName}</div>;
        }
        return <div>No sheet selected</div>;
    };
    */
    return (
        <>
            <Script src="/scripts/tableau.extensions.1.latest.js" strategy="beforeInteractive" />
            <div
                ref={networkContainer}
                className="h-screen w-screen"
                //style={{ width: '600px', height: '400px', border: '1px solid black' }}
            />
        </>

    );
};

export default VisNetwork;

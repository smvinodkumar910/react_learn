"use client"
import React, { useEffect, useRef } from 'react';
import { Network, Data, Options } from 'vis-network/standalone';
import 'vis-network/styles/vis-network.min.css';
import marks from '@/app/linearview/tableau/extensions-api-types';
import Script from 'next/script';



function getData(worksheet: marks.Worksheet): { from: string | undefined; to: string | undefined; }[] {
    const records: { from: string | undefined; to: string | undefined; }[] = [];
    worksheet.getSummaryDataReaderAsync().then((response) => {
        response.getAllPagesAsync().then(data => {
            console.log(data.totalRowCount);

            data.data.forEach((value) => {
                const fromValue = value.at(1);
                const toValue = value.at(2);
                const record: { from: string | undefined; to: string | undefined; } = { from: undefined, to: undefined };
                if (fromValue) {
                    record.from = fromValue.formattedValue;
                }
                if (toValue) {
                    record.to = toValue.formattedValue;
                }
                records.push(record);

            })

        })
    }, (error) => console.log(error));
    console.log(records);
    return records;
}



const VisNetwork: React.FC = () => {
    const networkContainer = useRef<HTMLDivElement>(null);
    const [workSheetName, setWorkSheetName] = React.useState<string | null>(null);
    const [currentData, setCurrentData] = React.useState<Data | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && networkContainer.current && tableau) {

            tableau.extensions.initializeAsync().then(() => {
                const worksheet = tableau.extensions.worksheetContent?.worksheet
                let worksheetname = null;
                //getDataColumns(worksheet!);

                const tableaData = getData(worksheet!);

                const nodes: { id: string | undefined; label: string | undefined; }[] = [];
                tableaData.forEach((value) => {
                    nodes.push({ id: value.from, label: value.from });
                });


                const edges = tableaData;

                console.log('edges', edges);
                // Data for network
                const data: Data = { nodes, edges };
                setCurrentData(data);


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


            // Define the nodes and edges

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
            // Initialize the network
            if (currentData) {
                const network = new Network(networkContainer.current, currentData, options);

                // Optional: Network event listeners
                network.on('click', (params) => {
                    console.log('Clicked on:', params);
                    return () => network.destroy();
                });
            }


        }

        
    }, [currentData]);

    const renderSheet = () => {
        if (workSheetName) {
          return <div>worksheet name is {workSheetName}</div>;
        }
        return <div>No sheet selected</div>;
      };

    return (
        <>
        <Script src="/scripts/tableau.extensions.1.latest.js" strategy="beforeInteractive" />
        <div
            ref={networkContainer}
            style={{ width: '600px', height: '400px', border: '1px solid black' }}
        />
        {renderSheet()}
        </>
        
    );
};

export default VisNetwork;
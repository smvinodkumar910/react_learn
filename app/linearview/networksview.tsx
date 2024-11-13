"use client"
import React, { useEffect, useRef } from 'react';
import { Network, Data, Options } from 'vis-network/standalone';
import 'vis-network/styles/vis-network.min.css';


const VisNetwork: React.FC = () => {
  const networkContainer = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    if (typeof window !== 'undefined' && networkContainer.current) {
      // Define the nodes and edges
      const nodes = [
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' },
        { id: 5, label: 'Node 5' },
      ];
 
      const edges = [
        { from: 1, to: 3 },
        { from: 1, to: 2 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
      ];
 
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
 
      // Initialize the network
      const network = new Network(networkContainer.current, data, options);
 
      // Optional: Network event listeners
      network.on('click', (params) => {
        console.log('Clicked on:', params);
      });
 
      // Cleanup on unmount
      return () => network.destroy();
    }
  }, []);
 
  return (
    <div
      ref={networkContainer}
      style={{ width: '600px', height: '400px', border: '1px solid black' }}
    />
  );
};
 
export default VisNetwork;
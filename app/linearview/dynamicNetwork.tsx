import { Data, Options } from 'vis-network/standalone';


export function createNetwork(tableaData: { from: string | undefined; to: string | undefined; }[]): [Data, Options] {
  //Implementation to create and return a vis-network Network object.

  
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

  
  return [data, options];
}

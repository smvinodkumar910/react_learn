"use client"
import React, { useEffect } from 'react';


function MainComponent () {

  const [selectedSheetName, setSelectedSheetName] = React.useState<string | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && window.tableau) {
      window.tableau.extensions.initializeAsync().then(() => {
        try {
          const selectedSheet = window.tableau.extensions.settings.get('sheet');
          setSelectedSheetName(typeof selectedSheet === 'string' ? selectedSheet : null);
        } catch (error) {
          console.error("Error getting Tableau settings:", error);
          setSelectedSheetName(null);
        }
    });
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSheet = () => {
    if (selectedSheetName) {
      return <div>Selected Sheet: {selectedSheetName}</div>;
    }
    return <div>No sheet selected</div>;
  };

  return (
    <>
      {renderSheet()}
    </>
  );
}

export default MainComponent;

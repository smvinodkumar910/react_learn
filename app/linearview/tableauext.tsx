"use client"
import React, { useEffect } from 'react';
//import * from '@tableau/extensions-api-types';

// Declare this so our linter knows that tableau is a global object
/* global tableau */

function MainComponent () {

  const [selectedSheetName, setSelectedSheetName] = React.useState<string | null>(null);


  useEffect(() => {
    tableau.extensions.initializeAsync().then(() => {
      const selectedSheet = tableau.extensions.settings.get('sheet');
      setSelectedSheetName(typeof selectedSheet === 'string' ? selectedSheet : null);
      //setSelectedSheetName(selectedSheet);
    });
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

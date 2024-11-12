"use client"

import React, { useEffect } from 'react';


function MainComponent () {

  const [selectedSheetName, setSelectedSheetName] = React.useState<string | null>(null);
  const [dashboardName, setDashboardName] = React.useState<string | null>(null);

  
  useEffect(() => {
    
    if (typeof window !== 'undefined' && window.tableau) {
      
      window.tableau.extensions.initializeAsync().then(() => {
        let dashboardName = null;
        let selectedSheet = null;
        try {
          if(window.tableau.extensions.dashboardContent && window.tableau.extensions.dashboardContent.dashboard){
            dashboardName = window.tableau.extensions.dashboardContent.dashboard.name;
          }
          selectedSheet = window.tableau.extensions.settings.get('sheet');          
          
          setSelectedSheetName(typeof selectedSheet === 'string' ? selectedSheet : null);
          setDashboardName(dashboardName);
          
        } catch (error) {
          console.error("Error getting Tableau settings:", error);
          setSelectedSheetName(null);
        }
    });
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSheet = () => {
    if (dashboardName) {
      return <div>Selected Sheet: {selectedSheetName} in dashboard {dashboardName}</div>;
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

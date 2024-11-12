"use client"

import React, { useEffect } from 'react';
import Script from 'next/script';


function MainComponent () {

  const [selectedSheetName, setSelectedSheetName] = React.useState<string | null>(null);
  const [dashboardName, setDashboardName] = React.useState<string | null>(null);

  
  useEffect(() => {
    console.log("before if block inside useEffect:")
    console.log(window)
    console.log(window.tableau)
    if (typeof window !== 'undefined' && window.tableau) {
      console.log("inside if block :")
      console.log(window.tableau)
      window.tableau.extensions.initializeAsync().then(() => {
        console.log("after initializing")
        console.log(window.tableau)
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
      <Script src="/scripts/tableau.extensions.1.latest.js" strategy="beforeInteractive" />
      {renderSheet()}
    </>
  );
}

export default MainComponent;

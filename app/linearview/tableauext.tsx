"use client"
import React, { useEffect } from 'react';


/*global tableau */
function MainComponent () {

  const [selectedSheetName, setSelectedSheetName] = React.useState<string | null>(null);
  const [dashboardName, setDashboardName] = React.useState<string | null>(null);
  const windowname = window.name;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      
      tableau.extensions.initializeAsync().then(() => {
        try {
          const dashboard = tableau.extensions.dashboardContent.dashboard;
          const dashboardName = dashboard.name
          const selectedSheet = tableau.extensions.settings.get('sheet');
          
          setSelectedSheetName(typeof selectedSheet === 'string' ? selectedSheet : null);
          setDashboardName(typeof dashboardName === 'string' ? dashboardName : null);
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
      return <div>Selected Sheet: {selectedSheetName} in dashboard {dashboardName} </div>;
    }
    return <div>No sheet selected. Window name is { windowname }</div>;
  };

  return (
    <>
      {renderSheet()}
    </>
  );
}

export default MainComponent;

import React, { useEffect, useState } from 'react';
import { ACTIONS, STATUS, Joyride, type Step } from 'react-joyride';

export const DashboardTour: React.FC = () => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('nexus_tour_seen');
    if (!seen) {
      setRun(true);
    }
  }, []);

  const steps: Step[] = [
    {
      target: '.tour-dashboard',
      content: 'Welcome to Nexus! This is your command center for managing deals, meetings, documents, and payments.',
      placement: 'bottom',
    },
    {
      target: '.tour-calendar',
      content: 'Use the calendar to track meetings, availability, and accepted collaboration requests.',
      placement: 'bottom',
    },
    {
      target: '.tour-documents',
      content: 'Upload documents, preview them, and sign them securely from the Document Chamber.',
      placement: 'top',
    },
    {
      target: '.tour-payment',
      content: 'Manage your wallet balance, transfer funds, and review transaction history here.',
      placement: 'top',
    },
  ];

  return (
    <Joyride
      run={run}
      steps={steps}
      continuous
      showSkipButton
      disableOverlayClose
      styles={{ options: { primaryColor: '#2563eb', zIndex: 1000 } }}
      callback={(data) => {
        const { status, action } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as STATUS)) {
          localStorage.setItem('nexus_tour_seen', 'true');
          setRun(false);
        }
        if (action === ACTIONS.CLOSE) {
          localStorage.setItem('nexus_tour_seen', 'true');
          setRun(false);
        }
      }}
    />
  );
};

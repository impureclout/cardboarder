import React, { useState, useEffect } from 'react';
import { mockHistoryData } from '../utils/mockHistoryData';
import type { HistoricalEvent } from '../utils/mockHistoryData';

// Helper to format date to YYYY-MM-DD for input value and matching
const formatDateToYYYYMMDD = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const HistoryPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(formatDateToYYYYMMDD(new Date()));
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState<HistoricalEvent[]>([]);

  useEffect(() => {
    const foundEvents = mockHistoryData.filter(event => event.date === selectedDate);
    setEventsForSelectedDate(foundEvents);
  }, [selectedDate]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleRandomize = () => {
    if (mockHistoryData.length === 0) return;
    const randomIndex = Math.floor(Math.random() * mockHistoryData.length);
    const randomEventDate = mockHistoryData[randomIndex].date;
    // Create a new Date object from YYYY-MM-DD and then format it back
    // This ensures the input value is correctly set even if randomEvent.date isn't a full Date object
    const [year, month, day] = randomEventDate.split('-').map(Number);
    setSelectedDate(formatDateToYYYYMMDD(new Date(year, month - 1, day)));
  };

  // Determine min and max dates for the date picker from mock data (or use fixed dates)
  const minDate = "1993-01-01"; // Theoretical first TCG release era
  const maxDate = formatDateToYYYYMMDD(new Date()); // Today
  
  // Format date for display, ensuring UTC interpretation of YYYY-MM-DD
  const displaySelectedDate = () => {
    const [year, month, day] = selectedDate.split('-').map(Number);
    return new Date(Date.UTC(year, month -1, day)).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  }

  return (
    <div className="container mx-auto p-4 pt-24 md:pt-28 min-h-screen"> {/* Adjusted top padding */}
      <h1 className="text-4xl lg:text-5xl font-bold text-cb-purple mb-10 text-center text-shadow-sm">TCG History Timeline</h1>

      <section className="mb-12 p-6 bg-cb-grey/50 backdrop-blur-sm rounded-xl shadow-lg border border-cb-grey/30 flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center lg:items-start">
          <label htmlFor="historyDate" className="block text-lg font-medium text-cb-black mb-2">Select a Date:</label>
          <input 
            type="date" 
            id="historyDate"
            value={selectedDate}
            onChange={handleDateChange}
            min={minDate}
            max={maxDate}
            className="p-3 border border-cb-black/30 rounded-lg shadow-sm focus:ring-2 focus:ring-cb-blue focus:border-cb-blue bg-white text-lg w-full max-w-xs transition-all duration-300 ease-in-out"
          />
        </div>
        <button 
          onClick={handleRandomize}
          className="bg-cb-orange hover:bg-cb-orange/80 focus:outline-none focus:ring-2 focus:ring-cb-orange focus:ring-opacity-75 text-cb-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
        >
          🎲 Randomize Date
        </button>
      </section>

      <section>
        {eventsForSelectedDate.length > 0 ? (
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-cb-purple mb-6 text-shadow-sm">Events on {displaySelectedDate()}</h2>
            {eventsForSelectedDate.map(event => (
              <div key={event.id} className="p-6 bg-white rounded-xl shadow-lg border border-cb-grey/30 hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-px">
                <h3 className="text-2xl font-bold text-cb-blue mb-2">{event.title}</h3>
                <p className="text-cb-black/90 mb-3 leading-relaxed">{event.description}</p>
                {event.tcgsInvolved.length > 0 && (
                  <p className="text-sm text-cb-black/70">
                    <strong>TCGs Involved:</strong> {event.tcgsInvolved.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-cb-grey/30">
            <svg className="mx-auto h-16 w-16 text-cb-blue opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-2xl font-semibold text-cb-black">No Events Found</h3>
            <p className="mt-2 text-cb-black/70">No major TCG events found for {displaySelectedDate()}.</p>
            <p className="mt-1 text-sm text-cb-black/60">Try another date or click "Randomize Date"!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HistoryPage; 
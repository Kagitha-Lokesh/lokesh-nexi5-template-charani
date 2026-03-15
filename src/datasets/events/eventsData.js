export const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const currentMonthTitle = "MARCH 2026";

export const calendarEvents = [
    {
        day: 1,
        events: [
            { title: "Birthday Party", type: "primary" }
        ]
    },
    {
        day: 5,
        events: [
            { title: "Conference", type: "outline" }
        ]
    },
    {
        day: 9,
        events: [
            { title: "12:30p Meeting", type: "teal" },
            { title: "6:30p Meeting", type: "primary" }
        ]
    }
];

// Helper to get events for a specific day
export const getEventsForDay = (day) => {
    const dayData = calendarEvents.find(event => event.day === day);
    return dayData ? dayData.events : [];
};

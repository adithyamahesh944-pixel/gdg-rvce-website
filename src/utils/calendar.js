const MONTHS = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
};

function to24Hour(timeStr) {
    const match = timeStr?.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return '090000';
    let [, h, m, period] = match;
    let hour = parseInt(h, 10);
    if (period.toUpperCase() === 'PM' && hour !== 12) hour += 12;
    if (period.toUpperCase() === 'AM' && hour === 12) hour = 0;
    return `${String(hour).padStart(2, '0')}${m}00`;
}

export function buildGoogleCalendarUrl(event) {
    const [monStr, yearStr] = (event.d || '').split(' ');
    const month = MONTHS[monStr] || '01';
    const year = yearStr || '2027';
    const day = '15';

    const [startRaw, endRaw] = (event.tm || '').split(/–|-/);
    const startTime = to24Hour(startRaw);
    const endTime = to24Hour(endRaw || startRaw);

    const dates = `${year}${month}${day}T${startTime}/${year}${month}${day}T${endTime}`;

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: `${event.t} — GDG on Campus RVCE`,
        dates,
        details: `${event.ds}\n\nTags: ${(event.tag || []).join(', ')}`,
        location: event.v || 'RV College of Engineering, Bengaluru',
        ctz: 'Asia/Kolkata',
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
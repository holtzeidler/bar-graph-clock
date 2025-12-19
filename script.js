// Bar Graph Clock
// Displays time as a bar graph visualization

class BarGraphClock {
    constructor() {
        this.clockDisplay = document.getElementById('clock-display');
        this.barGraph = document.getElementById('bar-graph');
        this.init();
    }

    init() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    updateClock() {
        // Use local time explicitly
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // 1-12 (getMonth() returns 0-11)
        const day = now.getDate(); // Local day of month
        const hours = now.getHours(); // Local hours (0-23)
        const minutes = now.getMinutes(); // Local minutes
        const seconds = now.getSeconds(); // Local seconds

        // Get day name (0 = Sunday, 6 = Saturday)
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = dayNames[now.getDay()];

        // Display time in DayName MM/DD/YYYY HH:MM:SS format
        const dateString = `${this.pad(month)}/${this.pad(day)}/${year}`;
        const timeString = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
        this.clockDisplay.textContent = `${dayName} ${dateString} ${timeString}`;

        // Update bar graph
        this.updateBarGraph(now);
    }

    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    getDaysInYear(year) {
        return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 366 : 365;
    }

    getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    getSeasonProgress(date) {
        const year = date.getFullYear();
        const currentDate = new Date(date);
        currentDate.setHours(0, 0, 0, 0); // Normalize to start of day
        
        // Define seasons based on solstices and equinoxes
        // Spring: March 20 (vernal equinox) to June 20 (summer solstice)
        // Summer: June 20 to September 22 (autumnal equinox)
        // Fall: September 22 to December 21 (winter solstice)
        // Winter: December 21 to March 20 (spans year boundary)
        
        const springStart = new Date(year, 2, 20); // March 20 (month is 0-indexed)
        const summerStart = new Date(year, 5, 20); // June 20
        const fallStart = new Date(year, 8, 22); // September 22
        const winterStart = new Date(year, 11, 21); // December 21
        const nextSpringStart = new Date(year + 1, 2, 20); // March 20 of next year
        
        let seasonStart, seasonEnd, seasonName;
        
        // Determine which season we're in
        if (currentDate >= springStart && currentDate < summerStart) {
            // Spring: March 20 to June 20
            seasonName = 'Spring';
            seasonStart = new Date(springStart);
            seasonEnd = new Date(summerStart);
        } else if (currentDate >= summerStart && currentDate < fallStart) {
            // Summer: June 20 to September 22
            seasonName = 'Summer';
            seasonStart = new Date(summerStart);
            seasonEnd = new Date(fallStart);
        } else if (currentDate >= fallStart && currentDate < winterStart) {
            // Fall: September 22 to December 21
            seasonName = 'Fall';
            seasonStart = new Date(fallStart);
            seasonEnd = new Date(winterStart);
        } else {
            // Winter: December 21 to March 20 (next year)
            seasonName = 'Winter';
            if (currentDate >= winterStart) {
                // December 21 to end of year
                seasonStart = new Date(winterStart);
                seasonEnd = new Date(nextSpringStart);
            } else {
                // January 1 to March 20
                seasonStart = new Date(year - 1, 11, 21); // December 21 of previous year
                seasonEnd = new Date(springStart);
            }
        }
        
        // Calculate days passed and total days
        const daysPassed = Math.floor((currentDate - seasonStart) / (1000 * 60 * 60 * 24));
        const totalDays = Math.floor((seasonEnd - seasonStart) / (1000 * 60 * 60 * 24));
        
        return { 
            progress: daysPassed / totalDays, 
            name: seasonName,
            daysPassed: daysPassed,
            totalDays: totalDays
        };
    }

    updateBarGraph(now) {
        // Clear existing bars
        this.barGraph.innerHTML = '';

        const year = now.getFullYear();
        const month = now.getMonth() + 1; // 1-12
        const day = now.getDate();
        const dayOfWeek = now.getDay(); // 0-6 (Sunday = 0)
        const weekDay = dayOfWeek === 0 ? 1 : dayOfWeek + 1; // Convert to 1-7 (Sunday = 1, Monday = 2, ..., Saturday = 7)
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Calculate 12-hour format for AM/PM
        const hours12 = hours === 0 ? 12 : (hours > 12 ? hours - 12 : hours);
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Calculate time units
        const dayOfYear = this.getDayOfYear(now);
        const daysInYear = this.getDaysInYear(year);
        const daysInMonth = this.getDaysInMonth(year, now.getMonth());
        const season = this.getSeasonProgress(now);

        // Calculate progress values
        const millenniumProgress = (year % 1000) / 1000;
        const centuryProgress = (year % 100) / 100;
        const decadeProgress = (year % 10) / 10;
        const yearProgress = dayOfYear / daysInYear;
        const seasonProgress = season.progress;
        const monthProgress = (day - 1) / daysInMonth;
        const weekProgress = (weekDay - 1) / 6; // 1-7, so (weekDay - 1) / 6 for 0-1 range
        const hourProgress = hours / 23;
        // AM/PM bar: 12 is at 0%, 11 is at 100% (12 behaves like 0)
        const ampmProgress = (hours12 === 12 ? 0 : hours12) / 11;
        const minuteProgress = minutes / 59;
        const secondProgress = seconds / 59;

        // Create bars in order from longest to shortest time period
        const values = [
            { 
                label: 'Millennium', 
                progress: millenniumProgress, 
                value: year % 1000,
                max: 1000
            },
            { 
                label: 'Century', 
                progress: centuryProgress, 
                value: year % 100,
                max: 100
            },
            { 
                label: 'Decade', 
                progress: decadeProgress, 
                value: year % 10,
                max: 10
            },
            { 
                label: 'Year', 
                progress: yearProgress, 
                value: dayOfYear,
                max: daysInYear
            },
            { 
                label: season.name, 
                progress: seasonProgress, 
                value: season.daysPassed,
                max: season.totalDays
            },
            { 
                label: 'Month', 
                progress: monthProgress, 
                value: day,
                max: daysInMonth
            },
            { 
                label: 'Week', 
                progress: weekProgress, 
                value: weekDay,
                max: 7
            },
            { 
                label: 'Hours', 
                progress: hourProgress, 
                value: hours,
                max: 23
            },
            { 
                label: ampm, 
                progress: ampmProgress, 
                value: hours12,
                max: 12
            },
            { 
                label: 'Minutes', 
                progress: minuteProgress, 
                value: minutes,
                max: 59
            },
            { 
                label: 'Seconds', 
                progress: secondProgress, 
                value: seconds,
                max: 59
            }
        ];

        values.forEach(({ label, progress, value, max, extraText }) => {
            const row = document.createElement('div');
            row.className = 'bar-row';

            // Add label
            const labelEl = document.createElement('div');
            labelEl.className = 'bar-label';
            labelEl.textContent = label;
            row.appendChild(labelEl);

            // Add bar container
            const barContainer = document.createElement('div');
            barContainer.className = 'bar-container';

            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.width = `${progress * 100}%`;

            // Create value element
            const valueEl = document.createElement('div');
            let displayText = value.toString();
            if (extraText) {
                displayText = `${value} (${extraText})`;
            }
            valueEl.textContent = displayText;

            // Position value based on bar progress
            if (progress < 0.5) {
                // Below 50%: show value to the right of the bar (positioned relative to container)
                valueEl.className = 'bar-value bar-value-outside';
                valueEl.style.left = `calc(${progress * 100}% + 8px)`;
                barContainer.appendChild(bar);
                barContainer.appendChild(valueEl);
            } else {
                // 50% or above: show value inside the bar (positioned relative to bar)
                valueEl.className = 'bar-value bar-value-inside';
                bar.appendChild(valueEl);
                barContainer.appendChild(bar);
            }
            
            row.appendChild(barContainer);
            
            // Add max value outside the bar
            const maxEl = document.createElement('div');
            maxEl.className = 'bar-max';
            maxEl.textContent = max.toString();
            row.appendChild(maxEl);
            
            this.barGraph.appendChild(row);
        });
    }

    pad(num) {
        return num.toString().padStart(2, '0');
    }
}

// Initialize the clock when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BarGraphClock();
});

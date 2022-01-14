export const getDate = (dateData) => {
    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let [date, time] = dateData.split('T');
    let [hour, minutes] = time.split(':');
    time = `${hour}:${minutes}`;

    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth();
    const currentDay = currentDate.getUTCDate();

    let [year, month, day] = date.split('-');

    return (() => {
        if (currentYear == year && currentMonth + 1 == month && currentDay == day) {
            const currentHour = currentDate.getUTCHours();            
            if (currentHour - hour > 0) {
                return `${currentHour - hour} hours ago`;
            } else {
                const currentMinutes = currentDate.getUTCMinutes();
                if (currentMinutes - minutes > 0) {
                    return `${currentMinutes - minutes} minutes ago`;
                } else {
                    return 'a few moments ago';
                }
            }
        } else {
            return `${day} ${months[Number(month) - 1]} ${year != currentYear? year : ''} at ${hour}:${minutes}`;
        }
    })();
}
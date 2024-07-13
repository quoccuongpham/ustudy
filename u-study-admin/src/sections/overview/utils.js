export function getCurrentWeekDays() {
  const today = new Date();
  const firstDayOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const days = [];
  for (let i = 0; i < 7; i += 1) {
    const date = new Date(firstDayOfWeek.getTime() + i * 24 * 60 * 60 * 1000);
    const day = `${date.toLocaleString('en-us', { month: '2-digit' })}/${date.toLocaleString('en-us', { day: '2-digit' })}/${date.getFullYear()}`;
    days.push(day);
  }
  return days;
}

export function getLast12Months() {
  const months = [];
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  for (let i = 0; i < 12; i += 1) {
    const date = new Date(firstDayOfMonth.getTime() - i * 30 * 24 * 60 * 60 * 1000);
    const month = `${date.toLocaleString('en-us', { month: '2-digit' })}/01/${date.getFullYear()}`;
    months.unshift(month);
  }
  return months;
}

// export const getLast12Months = () => {
//   let months = [];
//   let date = new Date();

//   for (let i = 0; i < 11; i++) {
//     let firstDayOfCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
//     firstDayOfCurrentMonth.setMonth(date.getMonth() - i);
//     months.push(firstDayOfCurrentMonth.toLocaleDateString());
//   }

//   return months.reverse();
// };

export function getCountUsersPer12Months(users) {
  const months = getLast12Months();
  const result = months.map((m) => {
    return users.filter(
      (u) =>
        new Date(u.createdAt).toLocaleString('en-us', { year: 'numeric', month: '2-digit' }) ===
        m.split('/')[0] + '/' + m.split('/')[2]
    ).length;
  });
  return result;
}

export function getCountCoursesSoldPer12Months(payments) {
  const months = getLast12Months();
  const result = months.map((m) => {
    return payments.filter((p) => {
      const createdAt = new Date(p.createdAt);
      return (
        createdAt.toLocaleString('en-us', { year: 'numeric', month: '2-digit' }) ===
        m.split('/')[0] + '/' + m.split('/')[2]
      );
    }).length;
  });
  return result;
}

export function getCountUsersPerLocations(users) {
  const result = {
    ASIA: 0,
    AMERICA: 0,
    EUROPE: 0,
    AFRICA: 0,
  };
  users.forEach((u) => {
    const location = u.area;
    result[location] += 1;
  });
  return result;
}

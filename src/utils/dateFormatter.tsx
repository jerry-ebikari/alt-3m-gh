export function formatDate(inputDate: string) {
  // Parse input string into a Date object
  const date = new Date(inputDate);

  // Array of month names
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Get day, month, and year from the Date object
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Add the suffix to the day
  let dayWithSuffix;
  switch (day) {
      case 1:
      case 21:
      case 31:
          dayWithSuffix = day + 'st';
          break;
      case 2:
      case 22:
          dayWithSuffix = day + 'nd';
          break;
      case 3:
      case 23:
          dayWithSuffix = day + 'rd';
          break;
      default:
          dayWithSuffix = day + 'th';
  }

  // Format the output string
  const formattedDate = `${dayWithSuffix} ${months[monthIndex]}, ${year}`;

  return formattedDate;
}


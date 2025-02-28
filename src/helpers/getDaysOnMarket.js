export const getDaysOnMarket = (date_friendly) => {
    if (!date_friendly) return "N/A"; // Handle missing data
  
    // Convert "21-06-2021" (DD-MM-YYYY) to "2021-06-21" (YYYY-MM-DD) for Date parsing
    const [day, month, year] = date_friendly.split("-");
    const listingDate = new Date(`${year}-${month}-${day}`); // Convert to valid Date object
    const today = new Date(); // Get today's date
  
    if (isNaN(listingDate.getTime())) return "N/A"; // Handle invalid date formats
  
    const differenceInTime = today - listingDate; // Get time difference in milliseconds
    const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Convert to days
  
    return differenceInDays > 0 ? differenceInDays : "0"; // Ensure non-negative value
  };
  
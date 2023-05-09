export const formatDate = (date : any) => {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

  const padTo2Digits = (num : any) => {
    return num.toString().padStart(2, '0');
  }

  export const checkBirthDate = (date : string) => {
    if (date.length != 10) return false;

    const dateArray = date.split('-');
    if ( dateArray[0].length != 4) return false;
    if ( dateArray[1].length != 2) return false;
    if ( dateArray[2].length != 2) return false;

    return true;
  }
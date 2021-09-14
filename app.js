  var dateInput = document.querySelector('#bdayInput')
var showBtn = document.querySelector('#showBtn')
var output = document.querySelector('#Output')
var spinner = document.querySelector(".spin")

spinner.style.display = "none"

function reverseStr(str) {
    var digitList = str.split('');
    var reversedDigitList = digitList.reverse();
    var reversedStr = reversedDigitList.join('');
    return reversedStr;
}
  
function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
}
  
function convertDateToStr(date) {
  
    var dateStr = { day: '', month: '', year: '' };
  
    if (date.day < 10) {
      dateStr.day = '0' + date.day;
    }
    else {
      dateStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateStr.month = '0' + date.month;
    }
    else {
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
    return dateStr;
}


function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

  
function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);
  
    var ans = false;
  
    for(var i=0; i < listOfPalindromes.length; i++){
      if(isPalindrome(listOfPalindromes[i])){
        ans = true;
        break;
      }
    }
    
    return ans;
}
  
// check for leap year
function isLeapYear(year){
    if(year % 400 === 0){
      return true;
    }
    if(year % 100 === 0){
      return false;
    }
    if(year % 4 === 0){
      return true;
    }
    return false;
}
  
// find next palindrome date
function getNextDate(date){
    var day = date.day + 1; 
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11
  
     // check for february
    if(month === 2){ 
      // check for leap year
      if(isLeapYear(year)){ 
         if(day > 29){ 
           day = 1;
           month++;  
         }
      }
      else {
         if(day > 28){
           day = 1;
           month++;  
         }
      }
    }
    // check for other months
    else {
      if(day > daysInMonth[month - 1]){ 
        day = 1; 
        month++;  
      }
    }
  
    if(month > 12){
      month = 1;
      year++; 
    }
  
    return {
      day: day,  
      month: month,
      year: year
    };
}

  
// get next palindrome date
function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);
  
    while(true){
      ctr++;
      var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
      if(isPalindrome){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

  
function clickHandler(e){

    spinner.style.display = "none"

    var bdayStr = dateInput.value; // DD-MM-YYYY
    
    if(bdayStr !== ''){
      var listOfDate = bdayStr.split('-'); // ['DD', 'MM', 'YYYY']
  
      var date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
      };
      
      var isPalindrome = checkPalindromeForAllDateFormats(date);
  
      if(isPalindrome){
         output.innerText = 'Woohoo! your birthday is a palindrome!! 😁';
      }
      else {
        var [ctr, nextDate] = getNextPalindromeDate(date);
        output.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! ☹️`;
      }

      
    }
    showBtn.style.display = "block"
    output.style.display = "block"
    dateInput.style.display = "block"
}

function showSpinner(){
  dateInput.style.display = "none"
  output.style.display = "none"
  showBtn.style.display = "none"
  spinner.style.display = "block"

  setTimeout(clickHandler, 500);

}


showBtn.addEventListener('click', showSpinner);
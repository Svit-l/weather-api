import { format, compareAsc } from 'date-fns';
import { getRefs } from "./getRefs";
const refs = getRefs();
format(new Date(), 'do');
// console.log(format(new Date(), 'do'));
// console.log(format(new Date(), 'EEE'));
// console.log(format(new Date(), 'MMMM'));
// console.log(format(new Date(), 'hh:mm:ss'));
refs.day.textContent = format(new Date(), 'do');
refs.weekDay.textContent = format(new Date(), 'EEE');
refs.month.textContent = format(new Date(), 'MMMM');
setInterval(() => {
  refs.time.textContent = format(new Date(), 'hh:mm:ss');  
}, 1000);
console.log(refs.month);
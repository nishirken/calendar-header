import { addDays } from 'date-fns';
import { render } from './render';

const interval = {
  start: addDays(new Date(), 1),
  end: addDays(new Date(), 7),
};

render('body', {
  onTodayClick: () => console.log('today click'),
  onArrowLeftClick: () => console.log('on arrow left click'),
  onArrowRightClick: () => console.log('on arrow right click'),
  interval,
});

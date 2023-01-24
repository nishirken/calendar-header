import { addDays } from "date-fns";
import { Observable } from "./Observable";
import { render } from "./render";

let interval = new Observable({start: addDays(new Date(), 1), end: addDays(new Date(), 7)});

window.setInterval(() => {
    interval.value = {
        start: addDays(interval.value.start, 1),
        end: addDays(interval.value.end, 1),
    };
}, 1000);

render("body", {
    onTodayClick: () => console.log('today click'),
    onArrowLeftClick: () => console.log('on arrow left click'),
    onArrowRightClick: () => console.log('on arrow right click'),
    interval,
});

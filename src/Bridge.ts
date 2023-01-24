import type { Observable } from "./Observable";

export type Bridge = {
    onTodayClick?(): void;
    onArrowLeftClick?(): void;
    onArrowRightClick?(): void;
    interval?: {start: Date; end: Date};
};
import { format } from 'date-fns';
import type { Interval } from 'date-fns';
import enLocale from 'date-fns/locale/en-GB';

export const formatDate = ({ start, end }: Interval): string => {
  return `${format(start, 'MMMM d', { locale: enLocale })} - ${format(
    end,
    'MMMM d',
    { locale: enLocale }
  )}`;
};

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cronParser', standalone: true
})
export class CronParserPipe implements PipeTransform {

  transform(cron: string): string {
    if (!cron) {
      return '';
    }

    const cronParts = cron.split(' ');

    if (cronParts.length !== 5) {
      return 'Invalid cron expression';
    }

    const [minute, hour, dayOfMonth, month, dayOfWeek] = cronParts;

    const minuteText = this.parseMinute(minute);
    const hourText = this.parseHour(hour);
    const dayOfMonthText = this.parseDayOfMonth(dayOfMonth);
    const monthText = this.parseMonth(month);
    const dayOfWeekText = this.parseDayOfWeek(dayOfWeek);

    return `At ${minuteText} past ${hourText} on ${dayOfMonthText} of ${monthText}, ${dayOfWeekText}`;
  }

  private parseMinute(minute: string): string {
    if (minute === '*') {
      return 'every minute';
    }
    return `minute ${minute}`;
  }

  private parseHour(hour: string): string {
    if (hour === '*') {
      return 'every hour';
    }
    return `hour ${hour}`;
  }

  private parseDayOfMonth(dayOfMonth: string): string {
    if (dayOfMonth === '*') {
      return 'every day';
    }
    return `day ${dayOfMonth}`;
  }

  private parseMonth(month: string): string {
    if (month === '*') {
      return 'every month';
    }
    return `month ${month}`;
  }

  private parseDayOfWeek(dayOfWeek: string): string {
    if (dayOfWeek === '*') {
      return 'every day of the week';
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[parseInt(dayOfWeek, 10) % 7];
  }
}
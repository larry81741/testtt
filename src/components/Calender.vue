<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Qalendar } from 'qalendar'
const events = ref([
  {
    title: 'Advanced algebra',
    with: 'Chandler Bing',
    time: { start: '2023-08-16 12:05', end: '2023-08-16 13:35' },
    color: 'yellow',
    isEditable: false,
    id: '753944708f0f',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!'
  },
  {
    title: 'Ralph on holiday',
    with: 'Rachel Greene',
    time: { start: '2022-05-10 12:05', end: '2022-05-22 13:35' },
    color: 'yellow',
    isEditable: false,
    id: '5602b6f589fc'
  }
  // ...
])
const config = ref({
  week: {
    // Takes the value 'sunday' or 'monday'
    // However, if startsOn is set to 'sunday' and nDays to 5, the week displayed will be Monday - Friday
    startsOn: 'sunday',
    // Takes the values 5 or 7.
    nDays: 7,
    // Scroll to a certain hour on mounting a week. Takes any value from 0 to 23.
    // This option is not compatible with the 'dayBoundaries'-option, and will simply be ignored if custom day boundaries are set.
    scrollToHour: 5
  },
  month: {
    // Hide leading and trailing dates in the month view (defaults to true when not set)
    showTrailingAndLeadingDates: false
  },
  // Takes any valid locale that the browser understands. However, not all locales have been thorougly tested in Qalendar
  // If no locale is set, the preferred browser locale will be used
//   locale: 'de-DE',
  style: {},
  // if not set, the mode defaults to 'week'. The three available options are 'month', 'week' and 'day'
  // Please note, that only day and month modes are available for the calendar in mobile-sized wrappers (~700px wide or less, depending on your root font-size)
  defaultMode: 'month',
  // The silent flag can be added, to disable the development warnings. This will also bring a slight performance boost
  isSilent: false,
  showCurrentTime: true // Display a line indicating the current time
})
</script>
<template>
  <Qalendar :events="events" :config="config" style="height: 800px; width: 800px" />
</template>
<style>
@import 'qalendar/dist/style.css';
</style>

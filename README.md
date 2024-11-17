DateTimePicker
A customizable and easy-to-use React component for selecting dates and times. This package provides a sleek and intuitive date and time picker that can be easily integrated into your React applications.

Features
Customizable: Easily customize the appearance and behavior of the date and time picker.

Intuitive UI: User-friendly interface with clear navigation and selection options.

Date and Time Selection: Select both dates and times with a single component.

Responsive Design: Works seamlessly on both desktop and mobile devices.

Internationalization: Supports multiple languages and date formats.

Accessibility: Built with accessibility in mind, ensuring all users can interact with the component.

Installation
You can install the DateTimePicker package using npm:

bash
Copy
npm install @rejilraj/rjdatetimepicker
Usage
Import and use the DateTimePicker component in your React application:

javascript
Copy
import React from 'react';
import DateTimePicker from '@rejilraj/rjdatetimepicker';

function App() {
  const handleDateChange = (date) => {
    console.log('Selected Date:', date);
  };

  return (
    <div>
      <DateTimePicker
        selectedDate={new Date()}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default App;
Props
The DateTimePicker component accepts the following props:

selectedDate (Date): The initially selected date. Defaults to the current date.

onChange (Function): Callback function that is called when the date is changed. It receives the selected date as an argument.

ondateclick (Function): Callback function that is called when a date is clicked.

value (Date): The value of the selected date.

editable (Boolean): Whether the date picker is editable. Defaults to true.

eighteenYearsCheck (Boolean): Whether to enforce an 18-year age limit. Defaults to false.

resetMonthDropdown (Boolean): Whether to reset the month dropdown. Defaults to false.

Examples
Basic Usage
javascript
Copy
<DateTimePicker
  selectedDate={new Date()}
  onChange={(date) => console.log(date)}
/>
With 18-Year Age Limit
javascript
Copy
<DateTimePicker
  selectedDate={new Date()}
  onChange={(date) => console.log(date)}
  eighteenYearsCheck={true}
/>
Non-Editable Date Picker
javascript
Copy
<DateTimePicker
  selectedDate={new Date()}
  onChange={(date) => console.log(date)}
  editable={false}
/>
Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any problems or have suggestions for improvements.


Feel free to customize this description further to better match your package's specific features and goals.
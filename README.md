# DateTimePicker

A customizable and easy-to-use React component for selecting dates and times. This package provides a sleek and intuitive date and time picker that can be easily integrated into your React applications.

---

## ✨ Features

- **Customizable:** Easily tailor the appearance and behavior of the date and time picker.
- **Intuitive UI:** User-friendly interface with clear navigation and selection options.
- **Date and Time Selection:** Seamlessly select both dates and times with a single component.
- **Responsive Design:** Works flawlessly on both desktop and mobile devices.
- **Internationalization:** Supports multiple languages and date formats.
- **Accessibility:** Built with accessibility in mind, ensuring all users can interact with the component.

---

## 📦 Installation

Install the DateTimePicker package via npm:

```bash
npm install @rejilraj/rjdatetimepicker
```


## 🚀 Usage

Import and use the DateTimePicker component in your React application:

```bash
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
```

## Props

The DateTimePicker component accepts the following props:

| **Prop Name**         | **Type**    | **Description**                                                                        | **Default**         |
|------------------------|-------------|----------------------------------------------------------------------------------------|---------------------|
| `selectedDate`         | `Date`      | The initially selected date.                                                          | `new Date()`        |
| `onChange`             | `Function`  | Callback function that is called when the date is changed. It receives the selected date as an argument. | `undefined`         |
| `ondateclick`          | `Function`  | Callback function that is called when a date is clicked.                              | `undefined`         |
| `value`                | `Date`      | The value of the selected date.                                                       | `undefined`         |
| `editable`             | `Boolean`   | Whether the date picker is editable.                                                  | `true`              |
| `eighteenYearsCheck`   | `Boolean`   | Whether to enforce an 18-year age limit.                                              | `false`             |
| `resetMonthDropdown`   | `Boolean`   | Whether to reset the month dropdown.                                                  | `false`             |

## 📚 Examples

Basic Usage

```bash
<DateTimePicker 
  selectedDate={new Date()} 
  onChange={(date) => console.log(date)} 
/>
```

With 18-Year Age Limit

```bash
<DateTimePicker 
  selectedDate={new Date()} 
  onChange={(date) => console.log(date)} 
  eighteenYearsCheck={true} 
/>
```

Non-Editable Date Picker

```bash
<DateTimePicker 
  selectedDate={new Date()} 
  onChange={(date) => console.log(date)} 
  editable={false} 
/>
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Submit a pull request.
- Open an issue if you encounter any problems or have suggestions for improvements.

## 🛠️ Support

For any issues or questions, please reach out via the repository's issue tracker.

Thank you for using @rejilraj/rjdatetimepicker! 🚀
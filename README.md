# 🏦 Advanced Personal Finance Dashboard

A comprehensive, feature-rich personal finance management application built with vanilla HTML, CSS, and JavaScript. Track your income, expenses, budgets, and financial goals with beautiful charts and detailed reporting capabilities.

## ✨ Features

### 📊 **Transaction Management**
- Add, edit, and delete income/expense transactions
- Categorize transactions (Salary, Food, Rent, Transport, Entertainment, Other)
- Multiple payment methods support (Cash, Card, UPI, Wallet)
- Date-based transaction tracking
- Real-time balance calculation

### 💰 **Financial Overview**
- **Summary Cards**: Total Income, Total Expenses, Current Balance
- **Currency Support**: INR (₹), USD ($), EUR (€), GBP (£)
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 📈 **Budget Management**
- Create custom budgets for different categories
- Real-time budget tracking with visual progress bars
- Color-coded progress indicators (Green → Orange → Red)
- Edit and delete existing budgets
- Automatic budget calculation based on expenses

### 🎯 **Goal Tracking**
- Set financial savings goals
- Track progress towards goal completion
- Add savings incrementally to existing goals
- Visual progress bars for goal achievement
- Edit and manage multiple goals simultaneously

### 📊 **Interactive Charts & Reports**
- **Expense Pie Chart**: Visual breakdown of spending by category
- **Income vs Expense Bar Chart**: Monthly comparison analysis
- **Spending Trend Line Chart**: Track spending patterns over time
- Charts automatically update with new transactions

### 📤 **Data Export Options**
- **JSON Export**: Complete data backup in JSON format
- **CSV Export**: Transaction data for spreadsheet analysis
- **PDF Report**: Comprehensive financial report with summaries
- Automatic file downloads with proper formatting

### 🔒 **Data Persistence**
- **Local Storage**: All data stored locally in browser
- **Auto-save**: Changes saved automatically
- **Privacy-focused**: No external servers or data transmission
- **Offline capable**: Works without internet connection

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or installations required

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/muhammadumarqadri/finance-dashboard.git
   ```

2. **Navigate to project directory**
   ```bash
   cd finance-dashboard
   ```

3. **Open in browser**
   ```bash
   # Simply open index.html in your preferred browser
   # Or use a local server:
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

### Quick Start

1. **Set Your Currency**: Choose your preferred currency from the dropdown
2. **Add Your First Transaction**: Fill out the transaction form and click "Add Transaction"
3. **Create a Budget**: Click "Add Budget" and set limits for different categories
4. **Set Financial Goals**: Use "Add Goal" to create savings targets
5. **View Reports**: Scroll down to see your financial charts and analytics

## 📱 Usage Guide

### Adding Transactions
```
1. Fill in transaction details:
   - Description (e.g., "Grocery shopping")
   - Amount (numerical value)
   - Type (Income or Expense)
   - Category (predefined categories)
   - Date (defaults to today)
   - Payment Method (Cash, Card, UPI, Wallet)

2. Click "Add Transaction"
3. Transaction appears in the table below
```

### Managing Budgets
```
1. Click "Add Budget" button
2. Enter category name
3. Set budget limit amount
4. Budget appears with progress bar
5. Progress updates automatically with expenses
```

### Setting Goals
```
1. Click "Add Goal" button
2. Enter goal name (e.g., "Emergency Fund")
3. Set target amount
4. Optionally add initial saved amount
5. Use "Add Savings" to update progress
```

### Exporting Data
```
- JSON: Complete backup with all data
- CSV: Transaction data for Excel/Sheets
- PDF: Formatted report with charts and summaries
```

## 🎨 Customization

### Themes
- **Light Mode**: Clean, bright interface
- **Dark Mode**: Easy on the eyes for extended use
- Toggle anytime using the sidebar button

### Currency Support
- Indian Rupee (₹)
- US Dollar ($)
- Euro (€)
- British Pound (£)

### Categories
Currently supports these transaction categories:
- Salary
- Food
- Rent
- Transport
- Entertainment
- Other

*Note: Categories are defined in the HTML select element and can be modified in `index.html`*

## 📂 Project Structure

```
finance-dashboard/
│
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling with themes
├── script.js           # JavaScript functionality
└── README.md          # Project documentation
```

### Key Components

**HTML (`index.html`)**
- Semantic structure with sidebar navigation
- Transaction forms and tables
- Chart containers and summary cards

**CSS (`styles.css`)**
- CSS custom properties for theming
- Responsive design with CSS Grid and Flexbox
- Dark/light mode support
- Modern styling with smooth transitions

**JavaScript (`script.js`)**
- Complete application logic
- Local storage data persistence
- Chart.js integration for visualizations
- Export functionality (JSON, CSV, PDF)

## 🔧 Technical Details

### Dependencies
- **Chart.js**: For creating interactive charts
- **jsPDF**: For PDF report generation
- **html2canvas**: For PDF chart rendering

### Browser Compatibility
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (responsive design)

### Data Storage
- Uses browser's `localStorage` API
- Data persists across browser sessions
- No external database required
- Privacy-focused (data stays local)

### Performance Features
- Lightweight vanilla JavaScript
- Efficient DOM manipulation
- Optimized chart rendering
- Responsive image loading

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Test thoroughly across different browsers
- Update documentation for new features
- Ensure responsive design principles

### Ideas for Contributions
- Additional chart types
- More export formats
- Advanced filtering options
- Recurring transaction support
- Multi-account management
- Investment tracking
- Bill reminders

## 🔮 Future Enhancements

- [ ] **Recurring Transactions**: Automate regular income/expenses
- [ ] **Advanced Filtering**: Filter by date range, category, amount
- [ ] **Investment Tracking**: Stock and mutual fund portfolio
- [ ] **Bill Reminders**: Notification system for upcoming bills
- [ ] **Multi-Account Support**: Separate tracking for different accounts
- [ ] **Data Import**: Import from bank statements or CSV files
- [ ] **Advanced Analytics**: More detailed financial insights
- [ ] **Backup & Sync**: Cloud backup options
- [ ] **Mobile App**: Native mobile application

## ❓ FAQ

**Q: Is my financial data secure?**
A: Yes! All data is stored locally in your browser's localStorage. Nothing is sent to external servers.

**Q: Can I use this on my phone?**
A: Absolutely! The dashboard is fully responsive and works great on mobile devices.

**Q: What happens if I clear my browser data?**
A: Your financial data will be lost. Make sure to export your data regularly as backup.

**Q: Can I add custom categories?**
A: Currently, categories are predefined. You can modify them in the HTML file or use "Other" category.

**Q: How do I backup my data?**
A: Use the "Export as JSON" feature to create a complete backup of all your data.

## 🐛 Troubleshooting

**Charts not displaying:**
- Ensure JavaScript is enabled in your browser
- Check if Chart.js library loaded properly
- Try refreshing the page

**Data not saving:**
- Check if localStorage is enabled in your browser
- Ensure you're not in private/incognito mode
- Try clearing browser cache and refreshing

**Export not working:**
- Ensure popup blockers are disabled
- Check if browser allows file downloads
- Try using a different browser

## 📞 Support

If you encounter any issues or have questions:

1. Check the FAQ section above
2. Look through existing issues in the repository
3. Create a new issue with detailed description
4. Include browser information and steps to reproduce

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**

*Happy budgeting! 💰*

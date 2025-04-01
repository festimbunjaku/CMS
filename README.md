# Content Management System (CMS)

A flexible and customizable content management system with modern UI, user roles, and SEO optimization.

![CMS Dashboard](https://raw.githubusercontent.com/festimbunjaku/CMS/main/images/dashboard-preview.png)

## ✨ Features

- **Intuitive Dashboard**: Modern interface for content management
- **User Management**: Role-based access control
- **Content Creation**: Rich text editor with image support
- **Template System**: Customizable layouts and themes
- **SEO Tools**: Built-in optimization for search engines
- **Responsive Design**: Mobile-friendly interface
- **Analytics**: Traffic and content performance tracking
- **API Integration**: Connect with external services

## 🛠️ Tech Stack

- **PHP**: Backend scripting
- **MySQL**: Database for content storage
- **Bootstrap**: Frontend framework
- **jQuery**: JavaScript library
- **Chart.js**: Data visualization
- **TailwindCSS**: Utility-first CSS framework

## 📋 Prerequisites

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache/Nginx)
- npm (for frontend dependencies)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/festimbunjaku/CMS.git
cd CMS
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
   - Create a MySQL database for the CMS
   - Import the provided schema from `database/schema.sql`

4. Configure the system:
   - Update database credentials in `config.php`
   - Adjust site settings in the admin panel

5. Build frontend assets:
```bash
npm run build
```

6. Access the application:
   - Frontend: `http://localhost/CMS/`
   - Admin: `http://localhost/CMS/login/login.html`

## 📁 Project Structure

```
CMS/
├── components/           # Reusable UI components
├── dashboard/            # Admin dashboard files
│   ├── dashboard.html    # Main dashboard template
│   └── dashboard.js      # Dashboard functionality
├── images/               # Static image assets
├── login/                # Authentication system
│   ├── login.html        # Login page
│   └── login.js          # Login functionality
├── src/                  # Source files
│   ├── input.css         # TailwindCSS source
│   └── output.css        # Compiled CSS
├── todaysBilling/        # Billing module
├── .gitignore            # Git ignore file
├── package.json          # npm dependencies
├── tailwind.config.js    # TailwindCSS configuration
└── README.md             # Project documentation
```

## 🔐 Default Login Credentials

- **Username**: admin
- **Password**: admin123

## 🖥️ Usage

### Admin Users
1. Log in to the admin dashboard
2. Create and manage content using the rich text editor
3. Upload and organize media files
4. Manage user accounts and permissions
5. Configure site settings and SEO parameters
6. View analytics reports

### Content Editors
1. Access the dashboard with restricted permissions
2. Create and edit assigned content
3. Submit content for review
4. Manage personal profile settings

## 📱 Mobile Compatibility

The CMS is fully responsive and provides an optimized experience on:
- Desktop browsers
- Tablets
- Mobile phones

## 🚧 Roadmap

- [ ] Multi-language support
- [ ] Enhanced media management
- [ ] Plugin system for extensibility
- [ ] Advanced user permissions
- [ ] Integration with popular marketing tools
- [ ] Improved caching system

## 📝 License

[MIT License](LICENSE)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

For questions or support, please reach out to the project maintainer.

---

*Built with ❤️ by Festim Bunjaku*
# Connex Technologies Website

This repository contains the official website and dashboard interface for Connex Technologies, a neutral coordination proof layer for inter-institutional payment handoffs in Kenya.

## Architecture

The Connex Technologies website is built with a React frontend and integrates a Namecheap-compatible PHP backend for waitlist and contact forms.

### Frontend
- **React and Vite**: High-performance static web application framework.
- **Tailwind CSS**: Modern styling system.
- **Elite Typography**: Georgia headings and Calibri body copy for institutional authority.
- **Snappy Motion**: Snappy hover underlines and reveal animations with no canvas/particle background slop.

### Backend
- **PHP Form Handlers**: Native waitlist.php and contact.php scripts optimized for Namecheap cPanel email forwarding and local waitlist count tracking.

## Development

To run the site locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build the production assets:
   ```bash
   npm run build
   ```

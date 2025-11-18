# Customer Success Ticket & Client Feedback Manager (Monochrome UI)

## Project Overview

You are building a monochrome (black, white, gray) web app UI for a Customer Success Manager. The app handles meetings with clients and converts feedback into internal processes such as:

- Discarded items
- Customer Feedback (feature ideas)
- Bugs (which are submitted to Linear)

The dashboard tracks all feedback, links Linear tickets, monitors real-time status, adds meeting notes, and receives email alerts.

**IMPORTANT: Build this in clear, progressive stages and ask for approval before moving to the next stage.**

---

## 🎨 DESIGN REQUIREMENTS

### Overall Theme
- Full monochrome palette
- No bright colors
- Shades of white, gray, charcoal, black
- Soft shadows
- Minimalist spacing
- Clean lines
- Elegant typography (Inter / SF Pro)
- Smooth animations (fade, slide, scale)

### Layout
- **Left Navigation Panel**
  - Logo placeholder
  - Navigation items vertically stacked
  - Slim, minimalist

- **Top Bar (optional)**
  - Search bar
  - Filter dropdowns

- **Main Grid View**
  - Cards displayed evenly
  - Responsive

- **Right-Side Drawer Panel**
  - Opens when clicking a card
  - Used for meeting notes and detailed information

### Card Components
- Each card uses:
  - Monochrome background
  - Thin border
  - Subtle hover lift
  - Clear typography
  - Status badge (gray tones only)
  - Icons should be outline-only, no colored fills

---

## 🧩 FUNCTIONAL REQUIREMENTS

### 1. Add New Feedback Card
A "+" button should open a modal with:
- Client Name (dropdown list)
- Feedback Category:
  - Discard
  - Customer Feedback
  - Bug
- Description (textarea)
- Meeting Date (datepicker)
- Linear Ticket URL (optional)
- Priority (Low, Medium, High)
- Submit → saves card into database.

### 2. Card Structure
Every card displays:
- Client name
- Category badge
- Description preview
- Priority indicator
- Linear ticket status (auto-pulled)
- Created date
- Click → opens right-side drawer

### 3. Right-Side Drawer (Details Panel)
Contains:
- **Top area**
  - Client name
  - Category
  - Ticket status
  - Ticket link
- **Notes Section**
  - Large textarea
  - Auto-save
  - History list for notes (each note stamped with date/time)
  - Option to add "Meeting Summary"

### 4. Linear Integration
If a feedback card has a Linear link:
- Fetch ticket ID from URL
- Pull:
  - Title
  - Status
  - Assignee
  - Project
  - Cycle
- Refresh every 15 seconds
- Show the status badge in realtime

Required statuses shown in UI:
- Todo
- In Progress
- Blocked
- Needs Info
- Completed
- Canceled

### 5. Email Notifications
Send email updates when a ticket changes to:
- In Progress
- Needs Info
- Completed

Email contains:
- Client name
- Ticket ID
- Category
- Status
- Timestamp
- Direct link

Use SendGrid, Resend, or Nodemailer with SMTP.

### 6. Filters + Search
Filters at the top of the dashboard:
- Client
- Category
- Linear Status
- Priority
- Date
- Text Search (client name, description, notes)

### 7. Database Requirements
Use Supabase or Firebase.

**Tables:**

**feedback_cards**
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | primary key |
| client | string | |
| category | string | |
| description | text | |
| meeting_date | date | |
| priority | string | |
| created_at | timestamp | |
| linear_ticket_url | string | |
| linear_status | string | |
| linear_id | string | |
| updated_at | timestamp | |

**feedback_notes**
| Field | Type |
|-------|------|
| id | uuid |
| feedback_id | uuid (FK) |
| note | text |
| created_at | timestamp |

**clients**
| Field | Type |
|-------|------|
| id | uuid |
| name | string |

---

## 🏗️ TECH STACK

### Frontend
- React
- Tailwind CSS
- Framer Motion (for subtle animations)
- React Query

### Backend
- Node.js
- Express

### APIs
- Linear API
- SendGrid / Resend / Nodemailer

### Other
- Fully modular components
- Reusable hooks
- Clean folder structure

**Example:**
```
src/
  components/
  pages/
  hooks/
  api/
  context/
  utils/
  styles/
```

---

## 📦 DEVELOPMENT STAGES (Follow strictly)

Cursor must complete one stage fully, then ask for review before proceeding.

### Stage 1 — UI Skeleton (NO LOGIC YET)
- Left navigation layout
- Top filters bar
- Empty cards grid
- Add Feedback modal
- Right-side drawer (static version)
- Monochrome design applied
- **Ask me to approve UI before proceeding.**

### Stage 2 — Database Integration
- Connect to Supabase or Firebase
- CRUD for feedback cards
- CRUD for meeting notes
- Auto-save functionality

### Stage 3 — Linear Integration
- Read ticket status from Linear API
- Display status on cards
- Auto-refresh

### Stage 4 — Email Notifications
- Trigger emails when status updates
- Add environment variables
- Email templates (monochrome, minimal)

### Stage 5 — Notes + Meeting Summaries
- Notes history
- Editable notes
- Auto-save
- UI polish in drawer

### Stage 6 — Filters + Search
- Add filtering logic
- Search bar
- Debounced search
- Multi-filter combining

### Stage 7 — Final Polishing
- Improve animations
- Ensure full responsive design
- Code cleanup
- Setup deployment scripts

---

## 📢 INSTRUCTIONS FOR CURSOR TO FOLLOW

1. Work stage-by-stage, never rushing ahead.
2. After each stage, show me:
   - Preview
   - Code changes
   - What you built
3. Ask me: "Do you want to continue to the next stage?"
4. Use clean, modular React components.
5. Apply monochrome UI theme consistently.
6. Keep all text readable, high contrast.
7. Never use bright colors. Gray scale only.
8. Keep the design minimal and elegant.


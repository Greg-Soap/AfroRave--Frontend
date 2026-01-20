# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Initial Changelog creation.
- 2-step vendor signup flow matching Figma design specifications.
- Responsive design for Vendor Dashboard (mobile and tablet support).

### Changed
- **Refactored `BusinessSignUp` component** (`src/pages/auth/sign-up/business-signup-form.tsx`):
    - Implemented multi-step state management using `useState`.
    - **Step 1:** Collects Personal Information (Name, Phone, Gender), Business Details (Business Name, URLs), and Account Credentials (Email, Password).
        - Button text: "Continue"
        - Validates all Step 1 fields before proceeding.
    - **Step 2:** Collects Business Classification (Vendor Type and Category).
        - Title changes to "Business Type"
        - Description changes to "Select The Applicable Category"
        - Button text: "Sign Up"
    - Added `handleContinue()` function to validate Step 1 fields using `form.trigger()` before transitioning to Step 2.
    - Conditional rendering of form fields based on current step.
    - Dynamic title and description based on step and user type.
- **Updated Vendor Dashboard pages** to match Figma designs:
    - Added "Discover events near you!" heading to Discover page.
    - Changed card labels from "Category" to "Available Slots" with green styling.
    - Implemented responsive grid layouts (1 column mobile → 2 columns tablet → 3-4 columns desktop).
    - Added "Discover events near you!" heading to Discover page.
    - Changed card labels from "Category" to "Available Slots" with green styling.
    - Implemented responsive grid layouts (1 column mobile → 2 columns tablet → 3-4 columns desktop).
    - Improved spacing and typography across all viewport sizes.
    - Fixed text overflow issues on Profile page.
- **Implemented new Vendor pages**:
    - **Event Details Page**: Created `/vendor/discover/:eventId` with banner, event info, expandable "About" section, and scroll-stopping slot registration card.
    - **Wishlist/Saved Events Page**: Created `/vendor/wishlist` with "RESULTS" header (mobile) / "Saved Events" (desktop) and responsive event grid.
- **Implemented Vendor Dashboard Phase 2**:
    - **Edit Profile Modal**: Implemented comprehensive modal (tabs: Profile, Inbox, Account) matching Figma Image 4. Replaced "DestructiveAddBtn".
    - **Slot Details Page**: Created `/vendor/slots/:eventId` (e.g. "Blackmarket Flea") with search function and status-badged slot list matching Figma Image 2.
    - **My Slots Integration**: Updated My Slots page (`/vendor/slots`) to display mock events that link to the new Details page.
- **Implemented Vendor Dashboard Phases 3 & 4 (Gaps & Polish)**:
    - **View Profile Modal**: Added read-only profile modal with badge, contact details, and gallery (Figma Image 2).
    - **Inbox Improvements**:
        - Populated "Inbox" tab with mock notifications (Figma Image 0).
        - Added interactive Detail View with "Secure Slot" CTA (Figma Image 1).
    - **Slot Features**:
        - **Description Modal**: Refined modal with Quantity Selector, Green Price, and "Request" button to match updated Figma reference (Image 4).
        - **Section Map**: Implemented interactive "List / Map" toggle displaying a color-coded stall grid (Figma Image 3).

# Khaika Food Ordering App (Homemaker Delivery)

A mobile application built for **Khaika** — empowering homemakers across Coimbatore by delivering healthy, hygienic, authentic desi meals directly to customer doorsteps or for self-pickup.

Based on the 28 Sketch artboards (`food-ordering-app-madhanr.sketch` in the `UI artboard` page).

## Tech Stack & Architecture
- **Framework**: React Native 0.88+, Expo SDK 58+
- **Navigation**: Expo Router (File-based navigation with `src/app/`)
- **Language**: Pure JavaScript & JSX (`.js`, `.jsx` only — 0% TypeScript)
- **Styling**: StyleSheet with semantic design tokens (Primary Coral `#FF705B`, Mint Green `#48D2A0`, Dark `#232D33`, Background `#F6F9FC`)
- **Theme**: Light & Dark mode support via context (`src/theme.js`)
- **Icons**: `@expo/vector-icons` (Ionicons)

## Screens & Artboards Covered
1. **Onboarding / Splash (`src/app/index.jsx`)**:
   - Artboard 2: "Celebrating Homemakers"
   - Artboard 3: "Healthy & Hygienic"
   - Artboard 4: "Delivered on Time"
2. **Authentication**:
   - `src/app/signup.jsx` (Artboard 5: Create Account with OTP verification prompt)
   - `src/app/login.jsx` (Artboard 8: Welcome Back with phone number `+91 7200083726`)
   - `src/app/otp.jsx` (Artboard 6: 4-digit code entry with Artboard 7 "Bindaaz!" success & "Oh Snap!" fail dialogs)
3. **Core Tabs Navigation (`src/app/(tabs)/`)**:
   - `index.jsx`: Explore & Home (Artboard 9 & 9 Copy 2 — Location selector "Avinashi Road", Categories, Veg Only filter, Showing 18 kitchens nearby, Kitchen cards)
   - `search.jsx`: Live Search & Recent Queries (Artboard 11 & 11.5 — Chicken Biryani, Khatta Meeta, Mariam homefood)
   - `orders.jsx`: Order Tracking & History (Artboard 18, 18.2, 18.5 — Status tabs "Packed", "On way now", "Delivered", expandable order cards)
   - `profile.jsx`: User Profile & Settings (Artboard 19 — Radhika Verma, Coimbatore address, account settings, dark mode toggle)
4. **Kitchen Listing (`src/app/restaurant/[id].jsx`)**:
   - Artboard 12 & 19: Mariam’s Homefood, 5.0 rating, 30+ ratings, 15 min delivery, Pure veg badge, search menu items, quantity selectors.
5. **Cart & Mode Toggle (`src/app/cart.jsx`)**:
   - Artboards 13, 14, 15: "Delivery nearby" vs "Self pickup" toggle, payable to vendor ₹320.50, delivery ₹30.00, discount ₹10.00, total ₹340.50 / ₹310.50.
6. **Checkout & Billing (`src/app/checkout.jsx`)**:
   - Artboards 15.5 & 16: Two-step contact info & payment, Paytm/UPI, Card, COD, interactive map pin drop address editor.
7. **Payment Success (`src/app/payment-success.jsx`)**:
   - Artboard 17: "Bindaaz! Payment successful. Redirecting you to your orders."
8. **Live Agent Tracking (`src/app/tracking.jsx`)**:
   - Artboard 20: Real-time map route, Khaika Hero John Britto (5.0 rating, 30+ reviews), ETA 2 min, direct agent call.
9. **Filter Modal (`src/app/filter-modal.jsx`)**:
   - Artboard 10: Within distance of 3 km, Veg Only preference, ratings 1.0+, price sort.
10. **Post-Delivery Feedback (`src/app/rating.jsx`)**:
    - Artboard 21: Timely delivery rating, packaging quality rating, per-dish item rating.

## Verification
- Babel AST parse: **100% passed (25 files, 0 errors)**
- TypeScript: **0 files (Pure JavaScript & JSX)**

<!-- run-locally:start -->

## ▶️ Run locally

```bash
npm install
npx expo start
```

Then press `i` for the iOS simulator, `a` for Android, or `w` for the web, or scan the QR code with Expo Go.

<!-- run-locally:end -->

---

<!-- design-credits:start -->

## 🎨 Design Credits

This app is based on the free **Food Delivery Mobile App** design by **Madhan R**, downloaded from Sketch App Sources. All visual design credit goes to the designer. It follows the design's screens, user flows and content; visual details (exact spacing, fonts, some colours and illustrations) are approximated and may differ from the original.

| | |
|---|---|
| Designer | [Madhan R](https://www.sketchappsources.com/contributor/madhanr) |
| Original design | Food Delivery Mobile App |
| Downloaded from | [Sketch App Sources](https://www.sketchappsources.com/free-source/4824-food-ordering-app-sketch-freebie-resource.html) |
| Original file | `food-ordering-app-madhanr.sketch` |
| License / usage | Not stated on the source page. Free download; credit the designer (Sketch App Sources Terms) and confirm with them before commercial use. |

**Attribution:**

> UI design: "Food Delivery Mobile App" by Madhan R (https://www.sketchappsources.com/contributor/madhanr), downloaded from Sketch App Sources (https://www.sketchappsources.com/free-source/4824-food-ordering-app-sketch-freebie-resource.html).

The original design source files are not included in this repository; get them from the links above. This app's **code** is released under the [MIT License](./LICENSE); the visual design remains the designer's (see [NOTICE](./NOTICE)).

Photos, brand logos and avatars inside the design may belong to third parties and are not covered by the designer's permission.

<!-- design-credits:end -->

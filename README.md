# WarePickr

This is a simple web application built to automate the process of generating a pick list for a fictional warehouse based on customer orders. It was created as part of a **take home assessment**.

---

## Overview

Customers order gift boxes containing multiple individual items. The warehouse needs a consolidated pick list of all individual items required for all orders from the previous day.

This application:

-  Loads mock order data (`orders.json`) representing customer orders.
-  Maps each gift box in the orders to its individual items.
-  Aggregates quantities of each item needed.
-  Displays a pick list for warehouse staff to efficiently pick products.
-  Supports filtering by date (defaulting to previous day).
-  Provides an API for fetching pick lists.
-  Includes a simple UI demonstrating the pick list.

---

## Tech Stack

-  **Next.js** with API routes for backend logic
-  **React**, **TypeScript** and **Tailwind** with Primereact for frontend UI

---

## Project Structure

-  `/data` — Contains mock data files (`orders.json`, etc.)
-  `/src` — Application source code
   -  `/app/api` — API route to fetch pick list data
   -  `/app/lib` — Utility functions to generate picklist
   -  `/app/components` — React UI components
-  `/generateOrder.ts` — Utility script to generate mock orders for testing and seeding.

---

## Usage

### Requirements

-  Node.js (v18+)
-  **`pnpm`** (Install with `npm i -g pnpm@latest`) if not already installed

### Steps

```bash
git clone https://github.com/navDhammu/WarePickr.git
cd WarePickr
pnpm install
pnpm dev
```

Then open http://localhost:3000 in your browser.

**Important:** Ensure `orders.json` has some data for the dates you want to test. And that product Id's in the line items match with the predefined id's in `/data/constants.ts`

_Optionally_ - modify the orders array in `seed.ts` to make adding mock data easier for larger data sets. E.g

```javascript
const orders = [
   // Providing no date defaults to yesterday
   generateOrder({
      lineItems: [valentineBox(3), clientGiftBox(2), birthdayBox(1)],
   }),

   // For 2 days ago
   generateOrder({
      date: subDays(yesterday(), 1),
      lineItems: [birthdayBox(4), clientGiftBox(1)],
   }),
];
```

Then run `pnpm seed`

## Limitations

-  **Static Data Source**: The application relies on a hardcoded `orders.json` file for simulating order data. In a real-world setup, this would be replaced by a database or external API.
-  **Limited Error Handling**: The app **assumes** valid inputs and well-structured data in the orders, and is likely to crash with malformed data. In production, this would be validated either in the database itself or in the code through schema validation.
-  **No Authentication**: Not secured or gated for access in any way.

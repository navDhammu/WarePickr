# WarePickr

This is a simple web application built to automate the process of generating a pick list for warehouse teams based on customer orders. It was created as part of a technical assessment.

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
-  **React** and **TypeScript** for frontend UI

---

## Project Structure

-  `/data` — Contains mock data files (`orders.json`, etc.)
-  `/src` — Application source code
   -  `/app/api` — API route to fetch pick list data
   -  `/app/lib` — Utility functions to generate picklist
   -  `/app/components` — React UI components
-  `/generateOrder.ts` — Utility script to generate mock orders for testing and seeding. For seeding, adjust `seed.ts` and run `pnpm seed`.

---

### Prerequisites

-  Node.js (v18+)
-  PNPM

### Steps

```bash
git clone https://github.com/navDhammu/WarePickr.git
cd WarePickr
pnpm install
pnpm dev
```

Then open http://localhost:3000 in your browser.

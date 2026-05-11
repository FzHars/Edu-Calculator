# 🎓 Education Cost Future-Caster

A mobile-first, interactive calculator designed to help parents estimate the total cost of education from Elementary (SD) to University (S1) in Indonesia, factoring in the "silent killer": **Education Inflation**.

---

## 🚀 Key Features

*   **Mobile-First Design**: Optimized for small screens with a clean, centered UI.
*   **Exclusive Accordion System**: Focus on one education level at a time (SD, SMP, SMA, S1) to reduce cognitive load.
*   **Smart Inflation Engine**: Toggle between "Current Price" and "Future Price" using an adjustable 10% default education inflation rate.
*   **Currency Input Masking**: User-friendly input that handles dots (e.g., 1.500.000) correctly without breaking calculations.
*   **Interactive Tutorial**: Step-by-step onboarding modal for new users.
*   **Real-time Results**: Sticky bottom bar showing total costs as you type.

---

## 🧮 The Math Behind

The application uses the **Future Value (FV)** formula to project costs:

$$FV = PV \times (1 + i)^n$$

*   **PV (Present Value)**: Total cost at today's prices.
*   **i (Inflation)**: Yearly education inflation rate (Default: 10%).
*   **n (Time)**: Number of years until the start of each education level.

---

## 🔍 How the Calculation Works

To ensure accuracy, the application calculates costs sequentially based on the student's journey:

1. **Base Calculation**: 
   It sums up all primary costs (Tuition, Entrance Fee, etc.) and optional extra costs (Books, Courses) for each education level.

2. **Time-to-Entry (n)**: 
   The system assumes a standard progression to determine when the user will pay for each level:
   - **SD**: Starts in year 0 (or current age).
   - **SMP**: Starts 6 years after SD.
   - **SMA**: Starts 3 years after SMP.
   - **S1**: Starts 3 years after SMA.

3. **Inflation Compounding**: 
   If inflation is enabled, the formula $FV = PV \times (1 + i)^n$ is applied to each level's total. This means university costs (12+ years away) will be hit much harder by inflation than elementary costs, reflecting real-world economic conditions.

4. **Grand Total**: 
   The "Sticky Bar" sums all future values to give parents the final "Target Amount" they need to save.
   
---

## 🛠️ Tech Stack

*   **Framework**: [React.js](https://reactjs.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)

---
 

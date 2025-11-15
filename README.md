# Savings Group Web Application

A React-based web application for managing a student savings group that collectively invests in a Play-to-Earn blockchain game with a 20% return on investment.

## 🎯 Features

### 1. Student Registration
- Register up to 12 students
- Enter name and select savings tier
- **Tier validation**: Must deposit exact tier amount
- Prevents duplicate names

### 2. Three Savings Tiers
| Tier | Amount | Weekly Interest |
|------|--------|----------------|
| Tier 1 | ₦10,000 | 5% per week |
| Tier 2 | ₦20,000 | 10% per week |
| Tier 3 | ₦30,000 | 20% per week |

### 3. Savings Dashboard
- Real-time total savings calculation
- Breakdown of each member's contribution
- Weekly interest accumulation display
- 20% game return calculation
- Final group amount

### 4. Week Simulation
- Advance week counter to simulate time progress
- Automatically calculates accumulated interest
- Reset week counter

### 5. Withdrawal & Membership Management
- Students can withdraw their funds (principal + interest)
- Withdrawal removes student from group
- Updates total savings automatically
- Opens slot for new member (max 12)
- Shows detailed withdrawal breakdown

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
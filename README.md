# Sbahle Burial Society - Testing Guide

## System Overview
This is a complete burial society management system with admin and member dashboards.

## How to Test

### 1. Open the Application
- Open `SBS - V14.html` in your web browser (Chrome, Firefox, or Edge recommended)

### 2. Admin Login
**Credentials:**
- Email: `admin`
- Password: `admin123`

**Admin Features to Test:**
1. **Overview Tab**
   - View total members, active members, suspended members
   - Click "Check Missed Payments" to suspend members with 3+ missed payments
   - Click "Apply R30 Penalties" to apply penalties to active members

2. **Members Tab**
   - Click "+ Add Member" to create a new member
   - Fill in: Name, Email, Phone, ID Number
   - Click "Save"
   - Edit existing members by clicking "Edit" button
   - Delete members with "Delete" button
   - Reactivate suspended members with "Reactivate" button

3. **Beneficiaries Tab**
   - Select a member from the dropdown
   - Click "+ Add Beneficiary"
   - Fill in: Name, Relationship, ID Number, Percentage
   - Click "Save"
   - Edit or delete beneficiaries as needed

4. **Attendance Tab**
   - Select a meeting date (defaults to today)
   - Enter meeting time and type
   - Add meeting description
   - Mark members as present/absent
   - Use search to filter members
   - Use "Mark All Present" for bulk actions
   - Click "Download Register" to export attendance CSV

5. **Payouts Tab**
   - View pending payout requests
   - Approve or reject payouts
   - Monitor payout status

6. **Penalties Tab**
   - View all penalties
   - Mark penalties as paid

7. **Data Management Tab**
   - Export all data as JSON backup
   - Import previously exported data
   - View storage statistics
   - Clear all data (with confirmation)

### 3. Member Login
**Test Member Credentials:**
- Email: Use any member email from the members list
- Default test emails:
  - `member@test.com` (Thabo Mkhize - MEM001)
  - `nomsa@test.com` (Nomsa Dlamini - MEM002)
  - `sipho@test.com` (Sipho Ndlela - MEM003)

**Member Features to Test:**
1. **Profile Tab**
   - View member ID and status
   - Click "Edit" to modify profile
   - Update name, email, or phone
   - Click "Save" to persist changes

2. **Contributions Tab**
   - View contribution history
   - Click "+ Add Contribution"
   - Enter amount (minimum R170)
   - Select payment method
   - Submit for verification

3. **Beneficiaries Tab**
   - Click "+ Add Beneficiary"
   - Add up to 5 beneficiaries
   - Total allocation must equal 100%
   - Click "Save & Lock" to finalize

4. **Documents Tab**
   - Upload proof of payment
   - Upload death certificates
   - Upload supporting documents

5. **Signature Tab**
   - Draw digital signature on canvas
   - Click "Clear" to reset
   - Click "Save Signature" to save
   - View saved signature

6. **Payouts Tab**
   - Click "+ Request Payout"
   - Enter amount and reason
   - Submit request (admin approval required)
   - View payout status

### 4. Member Registration
1. From the login page, click the "Member" tab
2. Click "Register New Member"
3. Fill in: Name, Email, Phone, ID Number
4. Click "Register"
5. Login with the email you registered

## Data Persistence
- All data is stored in browser localStorage
- Data persists across page refreshes
- Use "Export Data" to create backups
- Use "Import Data" to restore from backups

## Test Scenarios

### Scenario 1: Complete Member Lifecycle
1. Admin adds a new member
2. Member registers and logs in
3. Member adds beneficiaries (total 100%)
4. Member uploads signature
5. Member requests a payout
6. Admin approves the payout

### Scenario 2: Attendance Management
1. Admin logs in
2. Navigate to Attendance tab
3. Select today's date
4. Mark members present/absent
5. Add meeting details
6. Download attendance register
7. Change date to view historical attendance

### Scenario 3: Penalty Application
1. Admin logs in
2. Navigate to Overview tab
3. Click "Apply R30 Penalties"
4. Navigate to Penalties tab
5. View applied penalties
6. Mark penalties as paid

### Scenario 4: Data Backup & Restore
1. Admin logs in
2. Navigate to Data Management tab
3. Click "Export Data Backup"
4. Save the JSON file
5. Click "Clear All Data" (optional - for testing)
6. Import the saved JSON file
7. Verify all data is restored

## Browser Console
- Open browser console (F12) to view:
  - Data save confirmations
  - Error messages
  - Debug information

## Known Features
- **Auto-save**: Data automatically saves after every change
- **Encryption**: Data is encrypted in localStorage
- **Validation**: Forms have basic validation
- **Responsive**: Works on desktop and mobile devices

## Troubleshooting

### Data Not Saving?
- Check browser console for errors
- Ensure localStorage is enabled
- Try manual save from Data Management tab

### Can't Login?
- Clear browser cache and reload
- Check credentials carefully
- Try registering a new member account

### Attendance Not Showing?
- Ensure members exist in the system
- Check that date is selected
- Refresh the attendance list

## Technical Details
- **Storage**: Browser localStorage with encryption
- **Framework**: Vanilla JavaScript (no dependencies except Chart.js for analytics)
- **Data Format**: JSON
- **Attendance**: CSV export format

## Support
For issues or questions, check the browser console for error messages.

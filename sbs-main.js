// Externalized JS from SBS - V15.html
// All logic moved here for CSP compliance

// ===== DATA STORAGE SYSTEM =====
const STORAGE_KEY = 'sbahle_burial_society_data';
const ADMIN_CREDENTIALS = { username: 'admin', password: 'admin123' }; // In production, hash this!

// Simple encryption/decryption (for basic security - use proper encryption in production)
function encryptData(data) {
  try {
    const jsonStr = JSON.stringify(data);
    return btoa(jsonStr); // Base64 encoding (basic obfuscation)
  } catch (e) {
    console.error('Encryption error:', e);
    return null;
  }
}

function decryptData(encrypted) {
  try {
    const jsonStr = atob(encrypted);
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error('Decryption error:', e);
    return null;
  }
}

// Save all data to localStorage
function saveDataToStorage() {
  try {
    const data = {
      members,
      beneficiaries,
      payouts,
      penalties,
      memberIdCounter,
      lastSaved: new Date().toISOString()
    };
    const encrypted = encryptData(data);
    localStorage.setItem(STORAGE_KEY, encrypted);
    console.log('✓ Data saved to secure storage at', data.lastSaved);
    return true;
  } catch (e) {
    console.error('Failed to save data:', e);
    showAlert('adminAlert', '⚠ Failed to save data', 'error');
    return false;
  }
}

// Load data from localStorage
function loadDataFromStorage() {
  try {
    const encrypted = localStorage.getItem(STORAGE_KEY);
    if (encrypted) {
      const data = decryptData(encrypted);
      if (data) {
        members = data.members || [];
        beneficiaries = data.beneficiaries || [];
        payouts = data.payouts || [];
        penalties = data.penalties || [];
        memberIdCounter = data.memberIdCounter || 4;
        console.log('✓ Data loaded from storage. Last saved:', data.lastSaved);
        return true;
      }
    }
    console.log('No saved data found, using default data');
    return false;
  } catch (e) {
    console.error('Failed to load data:', e);
    return false;
  }
}

// Export data to JSON file
function exportData() {
  try {
    const data = {
      members,
      beneficiaries,
      payouts,
      penalties,
      memberIdCounter,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sbahle_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showAlert('adminAlert', '✓ Data exported successfully!', 'success');
  } catch (e) {
    console.error('Export error:', e);
    showAlert('adminAlert', '⚠ Failed to export data', 'error');
  }
}

// Import data from JSON file
function importData(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (confirm('This will replace all current data. Are you sure?')) {
        members = data.members || [];
        beneficiaries = data.beneficiaries || [];
        payouts = data.payouts || [];
        penalties = data.penalties || [];
        memberIdCounter = data.memberIdCounter || 4;
        saveDataToStorage();
        updateAdmin();
        showAlert('adminAlert', '✓ Data imported successfully!', 'success');
      }
    } catch (err) {
      console.error('Import error:', err);
      showAlert('adminAlert', '⚠ Invalid data file', 'error');
    }
  };
  reader.readAsText(file);
}

// Clear all data (with confirmation)
function clearAllData() {
  if (confirm('⚠ WARNING: This will delete ALL data permanently. Are you sure?')) {
    if (confirm('This action cannot be undone. Continue?')) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  }
}

// Default/initial data
let members = [
  { id: 'MEM001', name: 'Thabo Mkhize', email: 'member@test.com', password: 'password123', phone: '0721234567', idNum: '8712345678901', status: 'Active', missedPayments: 0 },
  { id: 'MEM002', name: 'Nomsa Dlamini', email: 'nomsa@test.com', password: 'password123', phone: '0731234567', idNum: '9012345678901', status: 'Active', missedPayments: 0 },
  { id: 'MEM003', name: 'Sipho Ndlela', email: 'sipho@test.com', password: 'password123', phone: '0741234567', idNum: '7812345678901', status: 'Suspended', missedPayments: 3 }
];
let beneficiaries = [
  { id: 'B1', memberId: 'MEM001', name: 'Aisha Mkhize', relationship: 'Spouse', idNum: '9512345678901', percentage: 50 },
  { id: 'B2', memberId: 'MEM001', name: 'Omuhle Mkhize', relationship: 'Child', idNum: '2015123456', percentage: 50 }
];
let payouts = [
  { id: 'PO1', memberId: 'MEM001', memberName: 'Thabo Mkhize', amount: 5000, reason: 'Funeral', status: 'Pending' }
];
let penalties = [
  { id: 'PEN1', memberId: 'MEM002', memberName: 'Nomsa Dlamini', amount: 30, date: '2025-03-10', status: 'Pending' }
];
let currentUser = null;
let tempBeneficiaries = [];
let isDrawing = false;
let memberIdCounter = 4; // Start from 4 since we have MEM001, MEM002, MEM003

// Load saved data on page load
loadDataFromStorage();

// ... (rest of the JS logic from SBS - V15.html should be pasted here) ...

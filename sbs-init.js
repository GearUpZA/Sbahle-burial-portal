// Initialize the system
function initializeSystem() {
  // Clear demo login credentials
  const adminEmailInput = document.getElementById('adminEmail');
  const adminPasswordInput = document.getElementById('adminPassword');
  const memberEmailInput = document.getElementById('memberEmail');
  
  if (adminEmailInput) adminEmailInput.value = '';
  if (adminPasswordInput) adminPasswordInput.value = '';
  if (memberEmailInput) memberEmailInput.value = '';

  // Initialize demo members if none exist
  if (!localStorage.getItem('members')) {
    const demoMembers = [
      { id: 'M001', name: 'John Smith', email: 'john@example.com', phone: '0123456789', status: 'Active', missedPayments: 0 },
      { id: 'M002', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '0123456790', status: 'Active', missedPayments: 0 },
      { id: 'M003', name: 'Michael Brown', email: 'michael@example.com', phone: '0123456791', status: 'Active', missedPayments: 0 },
      { id: 'M004', name: 'Emily Davis', email: 'emily@example.com', phone: '0123456792', status: 'Active', missedPayments: 0 },
      { id: 'M005', name: 'David Wilson', email: 'david@example.com', phone: '0123456793', status: 'Active', missedPayments: 0 }
    ];
    localStorage.setItem('members', JSON.stringify(demoMembers));
  }

  // Load members from storage and set global reference
  window.members = JSON.parse(localStorage.getItem('members')) || [];

  // Initialize attendance storage
  if (!localStorage.getItem('attendance')) {
    localStorage.setItem('attendance', JSON.stringify({}));
  }

  // Setup signature canvas if exists
  if (document.getElementById('signatureCanvas')) {
    setupSignatureCanvas();
  }

  console.log('System initialized with', window.members ? window.members.length : 0, 'members');
}

// Remove auto-initialization to prevent conflicts
// window.addEventListener('load', initializeSystem);
// External JS for Sbahle Burial Society
// All event handlers and logic should be moved here from inline HTML

// Example: Replace onclick="loginAdmin()" with this
// document.getElementById('adminLoginBtn').addEventListener('click', loginAdmin);

// Repeat for all buttons, selects, inputs, etc. that use inline event handlers
// You will need to assign IDs to elements in index.html if they do not have them

// Example for tab buttons:
// document.querySelectorAll('.tab').forEach(tab => {
//   tab.addEventListener('click', function(e) {
//     // Call the appropriate function based on tab text or data attribute
//   });
// });

// Example for select onchange:
// document.getElementById('memSelectBen').addEventListener('change', loadBeneficiaries);

// Continue for all other event handlers

// Place all your main logic here

// --- Keyboard Navigation for Tabs and Modal ---
document.addEventListener('DOMContentLoaded', function() {
  // Tab navigation (left/right arrows)
  function handleTabKeydown(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const tabs = Array.from(e.currentTarget.parentNode.querySelectorAll('.tab'));
      const idx = tabs.indexOf(e.currentTarget);
      let nextIdx = e.key === 'ArrowRight' ? idx + 1 : idx - 1;
      if (nextIdx < 0) nextIdx = tabs.length - 1;
      if (nextIdx >= tabs.length) nextIdx = 0;
      tabs[nextIdx].focus();
      e.preventDefault();
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.currentTarget.click();
    }
  }
  document.querySelectorAll('.tab').forEach(tab => {
    tab.setAttribute('tabindex', '0');
    tab.addEventListener('keydown', handleTabKeydown);
  });

  // Modal close with Escape key
  document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('modal');
    if (modal && modal.classList.contains('show') && e.key === 'Escape') {
      closeModal();
    }
  });

  // Modal close button keyboard
  const closeBtn = document.querySelector('.modal .close');
  if (closeBtn) {
    closeBtn.setAttribute('tabindex', '0');
    closeBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        closeModal();
      }
    });
  }

  // Main action buttons: Enter/Space triggers click
  document.querySelectorAll('button, [role="button"]').forEach(btn => {
    btn.setAttribute('tabindex', '0');
    btn.addEventListener('keydown', function(e) {
      if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
        e.preventDefault();
        btn.click();
      }
    });
  });
});

// Event listeners for buttons and controls
document.addEventListener('DOMContentLoaded', function() {
  // Add Beneficiary
  document.getElementById('addBenBtn')?.addEventListener('click', addBenModal);

  // Check Missed Payments
  document.getElementById('checkMissedBtn')?.addEventListener('click', checkMissed);

  // Apply Penalties
  document.getElementById('applyPenBtn')?.addEventListener('click', applyPen);

  // Add Member
  document.getElementById('addMemberBtn')?.addEventListener('click', addMemberModal);

  // Beneficiary select
  document.getElementById('memSelectBen')?.addEventListener('change', loadBeneficiaries);

  // Attendance controls
  document.getElementById('meetingDate')?.addEventListener('change', showAttendanceList);
  document.getElementById('meetingType')?.addEventListener('change', updateMeetingDetails);
  document.getElementById('meetingDesc')?.addEventListener('change', updateMeetingDetails);
  document.getElementById('memberSearch')?.addEventListener('keyup', filterAttendanceMembers);
  document.getElementById('statusFilter')?.addEventListener('change', filterAttendanceMembers);
  document.getElementById('sortBy')?.addEventListener('change', filterAttendanceMembers);
  document.getElementById('markAllPresentBtn')?.addEventListener('click', markAllPresent);
  document.getElementById('clearAttendanceBtn')?.addEventListener('click', clearAttendance);
  document.getElementById('downloadRegisterBtn')?.addEventListener('click', downloadAttendanceRegister);

  // Data management
  document.getElementById('importDataBtn')?.addEventListener('click', function() {
    const fileInput = document.getElementById('importFile');
    if (fileInput && fileInput.files[0]) {
      importData(fileInput.files[0]);
    }
  });
  document.getElementById('saveNowBtn')?.addEventListener('click', function() {
    saveDataToStorage();
    showAlert('adminAlert', '✓ Data saved successfully!', 'success');
  });
  document.getElementById('clearAllDataBtn')?.addEventListener('click', clearAllData);
  document.getElementById('exportDataBtn')?.addEventListener('click', exportData);
});

// All JavaScript from <script>...</script> in index.html moved here for CSP compliance
// ...existing code from the <script> block in index.html...
// (The full script content will be inserted here, as extracted from your HTML)

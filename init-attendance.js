 
// Initialize the attendance system
function initializeAttendance() {
  // Set current date in the meeting date field when the attendance tab is first shown
  const meetingDateInput = document.getElementById('meetingDate');
  if (meetingDateInput && !meetingDateInput.value) {
    const today = new Date().toISOString().split('T')[0];
    meetingDateInput.value = today;
  }

  console.log('Attendance system initialized');
}

// Initialize on load (will be called by main system)
// Remove auto-initialization to prevent conflicts
 
// Initialize the attendance system
function initializeAttendance() {
  // Set current date in the meeting date field when the attendance tab is first shown
  const meetingDateInput = document.getElementById('meetingDate');
  if (meetingDateInput && !meetingDateInput.value) {
    const today = new Date().toISOString().split('T')[0];
    meetingDateInput.value = today;
  }

  console.log('Attendance system initialized');
}

// Initialize on load (will be called by main system)
// Remove auto-initialization to prevent conflicts
>>>>>>> d27854a (Allow any ID number length for beneficiaries)
// window.addEventListener('load', initializeAttendance);
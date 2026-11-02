// Login page client-side logic
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');

  // Toggle password visibility
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.textContent = type === 'password' ? 'Show' : 'Hide';
    });
  }

  // Form submit handler
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value.trim();
      const password = passwordInput.value.trim();
      
      // Simple client-side validation
      let isValid = true;
      
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showValidationError('email', 'Please enter a valid email address');
        isValid = false;
      } else {
        clearValidationError('email');
      }
      
      if (!password) {
        showValidationError('password', 'Password is required');
        isValid = false;
      } else {
        clearValidationError('password');
      }
      
      if (isValid) {
        // Simulate login success
        showLoginSuccess();
      }
    });
  }

  function showValidationError(inputId, message) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc2626';
    errorDiv.style.fontSize = '0.6875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    // Remove existing error if any
    const existingError = input.parentElement.querySelector('.validation-error');
    if (existingError) {
      existingError.remove();
    }
    
    input.parentElement.appendChild(errorDiv);
    input.style.borderColor = '#dc2626';
  }

  function clearValidationError(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const existingError = input.parentElement.querySelector('.validation-error');
    if (existingError) {
      existingError.remove();
      input.style.borderColor = '';
    }
  }

  function showLoginSuccess() {
    // Clear form and show success message
    loginForm.reset();
    clearValidationError('email');
    clearValidationError('password');
    
    const card = loginForm.closest('.login-card');
    if (card) {
      card.innerHTML = `
        <h2>Success!</h2>
        <p>You have been successfully signed in.</p>
        <div class="spinner" style="text-align: center; padding: 2rem 0; color: var(--accent-primary);">
          <svg class="spinner-svg" viewBox="0 0 24 24" style="width: 40px; height: 40px; margin: 0 auto;">
            <circle cx="12" cy="12" r="9" fill="none" stroke-width="3" stroke-currentColor/>
            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2z" fill="currentColor"/>
          </svg>
        </div>
        <button class="btn btn-primary" onclick="window.location.reload()" style="margin-top: 1rem;">Continue</button>
      `;
    }
  }
});
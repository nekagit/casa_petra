// Casa-Petrada Form Validation

// Validation rules
const validationRules = {
    required: {
        test: (value) => value.trim() !== '',
        message: 'Dieses Feld ist erforderlich'
    },
    email: {
        test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    },
    phone: {
        test: (value) => /^[\+]?[0-9\s\-\(\)]{10,}$/.test(value),
        message: 'Bitte geben Sie eine gültige Telefonnummer ein'
    },
    minLength: (min) => ({
        test: (value) => value.length >= min,
        message: `Mindestens ${min} Zeichen erforderlich`
    }),
    maxLength: (max) => ({
        test: (value) => value.length <= max,
        message: `Maximal ${max} Zeichen erlaubt`
    }),
    pattern: (regex, message) => ({
        test: (value) => regex.test(value),
        message: message
    }),
    number: {
        test: (value) => !isNaN(value) && !isNaN(parseFloat(value)),
        message: 'Bitte geben Sie eine gültige Zahl ein'
    },
    min: (min) => ({
        test: (value) => parseFloat(value) >= min,
        message: `Wert muss mindestens ${min} sein`
    }),
    max: (max) => ({
        test: (value) => parseFloat(value) <= max,
        message: `Wert darf maximal ${max} sein`
    })
};

// Initialize form validation
document.addEventListener('DOMContentLoaded', function() {
    initializeFormValidation();
});

// Initialize form validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        initializeForm(form);
    });
}

// Initialize individual form
function initializeForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Add event listeners
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
        input.addEventListener('change', () => validateField(input));
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        if (!validateForm(form)) {
            e.preventDefault();
        }
    });
}

// Validate single field
function validateField(field) {
    const rules = getFieldRules(field);
    const value = field.value.trim();
    
    // Clear previous errors
    clearFieldError(field);
    
    // Check each rule
    for (const rule of rules) {
        if (!rule.test(value)) {
            showFieldError(field, rule.message);
            return false;
        }
    }
    
    // Field is valid
    showFieldSuccess(field);
    return true;
}

// Validate entire form
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Get validation rules for field
function getFieldRules(field) {
    const rules = [];
    const attributes = field.attributes;
    
    // Required rule
    if (attributes.required) {
        rules.push(validationRules.required);
    }
    
    // Type-specific rules
    const type = field.type.toLowerCase();
    
    if (type === 'email') {
        rules.push(validationRules.email);
    }
    
    if (type === 'tel') {
        rules.push(validationRules.phone);
    }
    
    if (type === 'number') {
        rules.push(validationRules.number);
    }
    
    // Custom validation attributes
    if (attributes['data-min-length']) {
        rules.push(validationRules.minLength(parseInt(attributes['data-min-length'].value)));
    }
    
    if (attributes['data-max-length']) {
        rules.push(validationRules.maxLength(parseInt(attributes['data-max-length'].value)));
    }
    
    if (attributes['data-min']) {
        rules.push(validationRules.min(parseFloat(attributes['data-min'].value)));
    }
    
    if (attributes['data-max']) {
        rules.push(validationRules.max(parseFloat(attributes['data-max'].value)));
    }
    
    if (attributes['data-pattern']) {
        const pattern = new RegExp(attributes['data-pattern'].value);
        const message = attributes['data-pattern-message']?.value || 'Ungültiges Format';
        rules.push(validationRules.pattern(pattern, message));
    }
    
    // Custom validation function
    if (attributes['data-validate']) {
        const customRules = getCustomValidationRules(attributes['data-validate'].value);
        rules.push(...customRules);
    }
    
    return rules;
}

// Get custom validation rules
function getCustomValidationRules(ruleName) {
    const customRules = {
        'password': [
            validationRules.minLength(8),
            {
                test: (value) => /[A-Z]/.test(value),
                message: 'Passwort muss mindestens einen Großbuchstaben enthalten'
            },
            {
                test: (value) => /[a-z]/.test(value),
                message: 'Passwort muss mindestens einen Kleinbuchstaben enthalten'
            },
            {
                test: (value) => /[0-9]/.test(value),
                message: 'Passwort muss mindestens eine Zahl enthalten'
            }
        ],
        'confirm-password': [
            {
                test: (value) => {
                    const passwordField = document.querySelector('input[type="password"]:not([data-validate="confirm-password"])');
                    return passwordField && value === passwordField.value;
                },
                message: 'Passwörter stimmen nicht überein'
            }
        ],
        'postal-code': [
            {
                test: (value) => /^[0-9]{5}$/.test(value),
                message: 'Bitte geben Sie eine gültige Postleitzahl ein (5 Ziffern)'
            }
        ],
        'credit-card': [
            {
                test: (value) => /^[0-9\s]{13,19}$/.test(value),
                message: 'Bitte geben Sie eine gültige Kreditkartennummer ein'
            }
        ],
        'cvv': [
            {
                test: (value) => /^[0-9]{3,4}$/.test(value),
                message: 'Bitte geben Sie eine gültige CVV ein'
            }
        ]
    };
    
    return customRules[ruleName] || [];
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    
    // Insert after field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
    
    // Add ARIA attributes
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', errorElement.id || (errorElement.id = 'error-' + Date.now()));
}

// Show field success
function showFieldSuccess(field) {
    field.classList.add('is-valid');
    field.classList.remove('is-invalid');
    
    // Remove error message
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
        errorElement.remove();
    }
    
    // Add ARIA attributes
    field.setAttribute('aria-invalid', 'false');
    field.removeAttribute('aria-describedby');
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('is-invalid', 'is-valid');
    
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
        errorElement.remove();
    }
    
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
}

// Real-time validation for specific fields
function initializeRealTimeValidation() {
    // Email validation
    document.querySelectorAll('input[type="email"]').forEach(field => {
        field.addEventListener('input', debounce(() => {
            if (field.value.length > 0) {
                validateField(field);
            }
        }, 300));
    });
    
    // Password confirmation
    document.querySelectorAll('input[data-validate="confirm-password"]').forEach(field => {
        const passwordField = document.querySelector('input[type="password"]:not([data-validate="confirm-password"])');
        if (passwordField) {
            passwordField.addEventListener('input', () => {
                if (field.value.length > 0) {
                    validateField(field);
                }
            });
        }
    });
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Form submission with validation
function handleFormSubmission(form, callback) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm(form)) {
            showFormError('Bitte korrigieren Sie die Fehler im Formular');
            return;
        }
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner spinner-sm"></span> Wird gesendet...';
        
        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            await callback(data);
            
            showFormSuccess('Formular erfolgreich gesendet!');
            form.reset();
            
        } catch (error) {
            showFormError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

// Show form error
function showFormError(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-error';
    alert.textContent = message;
    
    const form = document.querySelector('form');
    if (form) {
        form.insertBefore(alert, form.firstChild);
        
        setTimeout(() => {
            if (form.contains(alert)) {
                form.removeChild(alert);
            }
        }, 5000);
    }
}

// Show form success
function showFormSuccess(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.textContent = message;
    
    const form = document.querySelector('form');
    if (form) {
        form.insertBefore(alert, form.firstChild);
        
        setTimeout(() => {
            if (form.contains(alert)) {
                form.removeChild(alert);
            }
        }, 5000);
    }
}

// Initialize specific form types
function initializeNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (form) {
        handleFormSubmission(form, async (data) => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Newsletter subscription:', data);
        });
    }
}

function initializeContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        handleFormSubmission(form, async (data) => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Contact form submission:', data);
        });
    }
}

function initializeCheckoutForm() {
    const form = document.querySelector('.checkout-form');
    if (form) {
        handleFormSubmission(form, async (data) => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Checkout form submission:', data);
            
            // Redirect to success page
            window.location.href = 'order-success.html';
        });
    }
}

// Initialize all form types
document.addEventListener('DOMContentLoaded', function() {
    initializeRealTimeValidation();
    initializeNewsletterForm();
    initializeContactForm();
    initializeCheckoutForm();
});

// Export functions for global access
window.validateField = validateField;
window.validateForm = validateForm;
window.clearFieldError = clearFieldError;

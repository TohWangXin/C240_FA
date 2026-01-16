/**
 * AI Scholarship Finder & Eligibility Checker
 * JavaScript Application
 */

// ===================================
// FLOWISE API CONFIGURATION
// ===================================

const FLOWISE_API_URL = 'https://flowise-production-ad0b.up.railway.app/api/v1/prediction/6a5712e1-6ff9-48e7-baee-c7b9c64866b4';

/**
 * Call Flowise API to get AI-powered scholarship recommendations
 * @param {Object} studentData - Student profile data
 * @returns {Promise} API response
 */
const callFlowiseAPI = async (studentData) => {
    try {
        const prompt = `
Student Profile:
- GPA: ${studentData.gpa}
- Household Income: ${studentData.income}
- Field of Study: ${studentData.course}
- Activities: ${studentData.activities || 'None specified'}

Based on this student profile, please:
1. Identify scholarships they qualify for
2. Explain requirements in simple, clear English
3. List reasons why they qualify or don't qualify
4. Include scholarship amounts and deadlines if available

Please format the response as a JSON array with this structure:
[
  {
    "name": "Scholarship Name",
    "description": "Brief description",
    "isEligible": true/false,
    "reasons": ["reason 1", "reason 2"],
    "amount": "$X,XXX",
    "deadline": "YYYY-MM-DD"
  }
]
`;

        const response = await fetch(FLOWISE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: prompt
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Flowise API Error:', error);
        throw error;
    }
};

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Debounce function to limit rate of function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 */
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Handle navbar hide/show on scroll
 */
const setupNavbarScroll = () => {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollTop = 0;
    let scrollThreshold = 10; // Minimum scroll distance to trigger hide/show
    
    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Don't hide if at the top of the page
        if (scrollTop <= 100) {
            header.classList.remove('hide');
            return;
        }
        
        // Check scroll direction
        if (Math.abs(scrollTop - lastScrollTop) < scrollThreshold) {
            return; // Ignore small scroll movements
        }
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down - hide navbar
            header.classList.add('hide');
        } else {
            // Scrolling up - show navbar
            header.classList.remove('hide');
        }
        
        lastScrollTop = scrollTop;
    };
    
    // Use debounced scroll handler for better performance
    window.addEventListener('scroll', debounce(handleScroll, 10));
};

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast (success, error, warning)
 */
const showToast = (message, type = 'success') => {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    
    container.appendChild(toast);
    
    // Remove toast after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s reverse';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
};

/**
 * Store user data in localStorage
 * @param {Object} data - User profile data
 */
const saveUserProfile = (data) => {
    try {
        localStorage.setItem('userProfile', JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save user profile:', error);
    }
};

/**
 * Retrieve user data from localStorage
 * @returns {Object|null} User profile data or null
 */
const getUserProfile = () => {
    try {
        const profile = localStorage.getItem('userProfile');
        return profile ? JSON.parse(profile) : null;
    } catch (error) {
        console.error('Failed to retrieve user profile:', error);
        return null;
    }
};

// ===================================
// FORM VALIDATION
// ===================================

/**
 * Validate GPA input
 * @param {number} gpa - GPA value
 * @returns {Object} Validation result
 */
const validateGPA = (gpa) => {
    if (!gpa) {
        return { valid: false, message: 'GPA is required' };
    }
    if (gpa < 0 || gpa > 4.0) {
        return { valid: false, message: 'GPA must be between 0.0 and 4.0' };
    }
    return { valid: true, message: '' };
};

/**
 * Validate income selection
 * @param {string} income - Income range
 * @returns {Object} Validation result
 */
const validateIncome = (income) => {
    if (!income) {
        return { valid: false, message: 'Please select an income range' };
    }
    return { valid: true, message: '' };
};

/**
 * Validate course input
 * @param {string} course - Course/field of study
 * @returns {Object} Validation result
 */
const validateCourse = (course) => {
    if (!course || course.trim().length === 0) {
        return { valid: false, message: 'Please enter your field of study' };
    }
    if (course.trim().length < 2) {
        return { valid: false, message: 'Field of study must be at least 2 characters' };
    }
    return { valid: true, message: '' };
};

/**
 * Display validation error
 * @param {HTMLElement} input - Input element
 * @param {string} message - Error message
 */
const showError = (input, message) => {
    const errorElement = document.getElementById(`${input.id}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
    }
};

/**
 * Clear validation error
 * @param {HTMLElement} input - Input element
 */
const clearError = (input) => {
    const errorElement = document.getElementById(`${input.id}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
    }
};

// ===================================
// SCHOLARSHIP DATA (Mock Data)
// ===================================

const scholarships = [
    {
        id: 1,
        name: 'Merit Excellence Scholarship',
        description: 'For high-achieving students with outstanding academic performance',
        requirements: {
            minGPA: 3.5,
            income: ['low', 'medium', 'high'],
            courses: ['all'],
            activities: []
        },
        amount: '$5,000',
        deadline: '2026-03-15'
    },
    {
        id: 2,
        name: 'Community Service Award',
        description: 'For students dedicated to community service and volunteering',
        requirements: {
            minGPA: 2.5,
            income: ['low', 'medium'],
            courses: ['all'],
            activities: ['community service', 'volunteering', 'volunteer']
        },
        amount: '$3,000',
        deadline: '2026-04-01'
    },
    {
        id: 3,
        name: 'STEM Future Leaders Grant',
        description: 'Supporting students pursuing careers in Science, Technology, Engineering, or Math',
        requirements: {
            minGPA: 3.0,
            income: ['low', 'medium', 'high'],
            courses: ['computer science', 'engineering', 'mathematics', 'physics', 'chemistry', 'biology', 'technology'],
            activities: []
        },
        amount: '$7,500',
        deadline: '2026-02-28'
    },
    {
        id: 4,
        name: 'First Generation College Student Scholarship',
        description: 'For students who are the first in their family to attend college',
        requirements: {
            minGPA: 2.0,
            income: ['low', 'medium'],
            courses: ['all'],
            activities: []
        },
        amount: '$4,000',
        deadline: '2026-05-15'
    },
    {
        id: 5,
        name: 'Athletic Achievement Scholarship',
        description: 'For student-athletes who excel in sports and academics',
        requirements: {
            minGPA: 2.8,
            income: ['low', 'medium', 'high'],
            courses: ['all'],
            activities: ['basketball', 'football', 'soccer', 'track', 'swimming', 'sports', 'athletic', 'team']
        },
        amount: '$6,000',
        deadline: '2026-03-30'
    },
    {
        id: 6,
        name: 'Women in Business Scholarship',
        description: 'Empowering women pursuing business and entrepreneurship',
        requirements: {
            minGPA: 3.2,
            income: ['low', 'medium', 'high'],
            courses: ['business', 'commerce', 'finance', 'accounting', 'entrepreneurship', 'marketing'],
            activities: []
        },
        amount: '$5,500',
        deadline: '2026-04-20'
    }
];

// ===================================
// MATCH SCORE CALCULATION
// ===================================

/**
 * Calculate match score (0-100) based on how well student fits scholarship
 * @param {Object} scholarship - Scholarship data
 * @param {Object} studentData - Student profile
 * @returns {number} Match score percentage
 */
const calculateMatchScore = (scholarship, studentData) => {
    let score = 0;
    let maxScore = 0;
    
    // GPA Match (40 points max)
    maxScore += 40;
    const gpa = parseFloat(studentData.gpa);
    if (gpa >= scholarship.requirements.minGPA) {
        const excess = gpa - scholarship.requirements.minGPA;
        score += Math.min(40, 30 + (excess * 10)); // Base 30 + bonus for exceeding
    } else {
        const deficit = scholarship.requirements.minGPA - gpa;
        score += Math.max(0, 30 - (deficit * 15)); // Penalty for falling short
    }
    
    // Income Match (20 points)
    maxScore += 20;
    if (scholarship.requirements.income.includes(studentData.income)) {
        score += 20;
    }
    
    // Course/Field Match (25 points)
    maxScore += 25;
    if (scholarship.requirements.courses[0] === 'all') {
        score += 25; // Open to all = perfect match
    } else {
        const courseMatch = scholarship.requirements.courses.some(req =>
            studentData.course.toLowerCase().includes(req.toLowerCase())
        );
        score += courseMatch ? 25 : 0;
    }
    
    // Activities Match (15 points)
    maxScore += 15;
    if (scholarship.requirements.activities.length === 0) {
        score += 15; // No specific requirement = perfect match
    } else {
        const activityMatch = scholarship.requirements.activities.some(req =>
            studentData.activities.toLowerCase().includes(req.toLowerCase())
        );
        score += activityMatch ? 15 : 5; // Partial credit even if no match
    }
    
    // Return percentage (0-100)
    return Math.round((score / maxScore) * 100);
};

/**
 * Get match score badge HTML with color coding
 * @param {number} score - Match score (0-100)
 * @returns {string} HTML for badge
 */
const getMatchScoreBadge = (score) => {
    let className = 'low';
    let label = 'Low Match';
    let emoji = '🔴';
    
    if (score >= 80) {
        className = 'high';
        label = 'Excellent Match';
        emoji = '🟢';
    } else if (score >= 60) {
        className = 'medium';
        label = 'Good Match';
        emoji = '🟡';
    }
    
    return `<span class="match-score ${className}">${emoji} ${score}% ${label}</span>`;
};

// ===================================
// ELIGIBILITY CHECKING LOGIC
// ===================================

/**
 * Check if student meets scholarship requirements
 * @param {Object} scholarship - Scholarship data
 * @param {Object} studentData - Student profile data
 * @returns {Object} Eligibility result
 */
const checkEligibility = (scholarship, studentData) => {
    const reasons = [];
    let isEligible = true;
    
    // Check GPA
    if (parseFloat(studentData.gpa) < scholarship.requirements.minGPA) {
        isEligible = false;
        reasons.push(`GPA must be at least ${scholarship.requirements.minGPA} (you have ${studentData.gpa})`);
    } else {
        reasons.push(`✓ Your GPA of ${studentData.gpa} meets the requirement`);
    }
    
    // Check income
    if (!scholarship.requirements.income.includes(studentData.income)) {
        isEligible = false;
        reasons.push('Income level does not match requirements');
    } else {
        reasons.push('✓ Income level matches requirements');
    }
    
    // Check course/field of study
    if (scholarship.requirements.courses[0] !== 'all') {
        const courseMatch = scholarship.requirements.courses.some(requiredCourse => 
            studentData.course.toLowerCase().includes(requiredCourse.toLowerCase())
        );
        if (!courseMatch) {
            isEligible = false;
            reasons.push(`Field of study must be one of: ${scholarship.requirements.courses.join(', ')}`);
        } else {
            reasons.push('✓ Your field of study matches requirements');
        }
    } else {
        reasons.push('✓ Open to all fields of study');
    }
    
    // Check activities (if required)
    if (scholarship.requirements.activities.length > 0) {
        const activitiesMatch = scholarship.requirements.activities.some(requiredActivity =>
            studentData.activities.toLowerCase().includes(requiredActivity.toLowerCase())
        );
        if (!activitiesMatch) {
            isEligible = false;
            reasons.push(`Activities must include: ${scholarship.requirements.activities.join(', ')}`);
        } else {
            reasons.push('✓ Your activities match requirements');
        }
    }
    
    return {
        isEligible,
        reasons,
        scholarship
    };
};

/**
 * Find all matching scholarships
 * @param {Object} studentData - Student profile data
 * @returns {Array} Array of eligibility results
 */
const findScholarships = (studentData) => {
    return scholarships.map(scholarship => checkEligibility(scholarship, studentData));
};

// ===================================
// UI RENDERING
// ===================================

/**
 * Render scholarship results
 * @param {Array} results - Array of eligibility results
 * @param {Object} studentData - Student profile for match score calculation
 */
const renderResults = (results, studentData) => {
    const resultsContainer = document.getElementById('results');
    
    // Separate eligible and not eligible scholarships
    const eligible = results.filter(r => r.isEligible);
    const notEligible = results.filter(r => !r.isEligible);
    
    let html = '';
    
    if (eligible.length > 0) {
        html += `<h3 style="color: var(--color-accent); margin-bottom: var(--spacing-md);">
            🎉 You qualify for ${eligible.length} scholarship${eligible.length > 1 ? 's' : ''}!
        </h3>`;
        
        eligible.forEach(result => {
            html += createResultCard(result, true, studentData);
        });
    }
    
    if (notEligible.length > 0) {
        html += `<h3 style="color: var(--color-neutral-medium); margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md);">
            Scholarships you don't qualify for yet:
        </h3>`;
        
        notEligible.forEach(result => {
            html += createResultCard(result, false, studentData);
        });
    }
    
    resultsContainer.innerHTML = html;
    
    // Announce results to screen readers
    const announcement = `Found ${eligible.length} scholarships you qualify for and ${notEligible.length} you don't qualify for yet.`;
    resultsContainer.setAttribute('aria-label', announcement);
};

/**
 * Create HTML for a result card with match score
 * @param {Object} result - Eligibility result
 * @param {boolean} isEligible - Whether student is eligible
 * @param {Object} studentData - Student profile for match score
 * @returns {string} HTML string
 */
const createResultCard = (result, isEligible, studentData) => {
    const { scholarship, reasons } = result;
    
    // Calculate match score
    const matchScore = calculateMatchScore(scholarship, studentData);
    const matchBadge = getMatchScoreBadge(matchScore);
    
    return `
        <div class="result-card ${isEligible ? 'eligible' : 'not-eligible'}">
            <div class="result-header">
                <h3 class="result-title">
                    ${scholarship.name}
                    ${matchBadge}
                </h3>
                <span class="eligibility-badge ${isEligible ? 'eligible' : 'not-eligible'}">
                    ${isEligible ? '✓ Eligible' : '✗ Not Eligible'}
                </span>
            </div>
            <p class="result-description">${scholarship.description}</p>
            <div class="result-requirements">
                <h4>Requirements (in simple English):</h4>
                <ul>
                    ${reasons.map(reason => `<li>${reason}</li>`).join('')}
                </ul>
            </div>
            <p style="margin-top: var(--spacing-md); font-weight: 600; color: var(--color-primary);">
                Amount: ${scholarship.amount} | Deadline: ${new Date(scholarship.deadline).toLocaleDateString()}
            </p>
        </div>
    `;
};

// ===================================
// FORM SUBMISSION HANDLER
// ===================================

/**
 * Handle form submission
 * @param {Event} event - Form submit event
 */
const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    // Get form inputs
    const gpaInput = document.getElementById('gpa');
    const incomeInput = document.getElementById('income');
    const courseInput = document.getElementById('course');
    const activitiesInput = document.getElementById('activities');
    
    // Clear previous errors
    [gpaInput, incomeInput, courseInput].forEach(clearError);
    
    // Validate inputs
    const gpaValidation = validateGPA(parseFloat(gpaInput.value));
    const incomeValidation = validateIncome(incomeInput.value);
    const courseValidation = validateCourse(courseInput.value);
    
    let isValid = true;
    
    if (!gpaValidation.valid) {
        showError(gpaInput, gpaValidation.message);
        isValid = false;
    }
    
    if (!incomeValidation.valid) {
        showError(incomeInput, incomeValidation.message);
        isValid = false;
    }
    
    if (!courseValidation.valid) {
        showError(courseInput, courseValidation.message);
        isValid = false;
    }
    
    if (!isValid) {
        showToast('Please fix the errors in the form', 'error');
        return;
    }
    
    // Collect student data
    const studentData = {
        gpa: parseFloat(gpaInput.value),
        income: incomeInput.value,
        course: courseInput.value.trim(),
        activities: activitiesInput.value.trim()
    };
    
    // Save to localStorage
    saveUserProfile(studentData);
    
    // Show loading indicator
    const loadingIndicator = document.getElementById('loading');
    const resultsContainer = document.getElementById('results');
    
    loadingIndicator.hidden = false;
    resultsContainer.innerHTML = '';
    
    try {
        // Call Flowise API for AI-powered scholarship matching
        const apiResponse = await callFlowiseAPI(studentData);
        
        // Parse the API response
        let results;
        
        // Check if the response contains the expected data
        if (apiResponse.text) {
            // Try to parse JSON from the text response
            try {
                const jsonMatch = apiResponse.text.match(/\[[\s\S]*\]/);
                if (jsonMatch) {
                    results = JSON.parse(jsonMatch[0]);
                } else {
                    // If no JSON found, fall back to mock data
                    console.warn('No JSON found in API response, using mock data');
                    results = findScholarships(studentData);
                }
            } catch (parseError) {
                console.warn('Failed to parse API response, using mock data:', parseError);
                results = findScholarships(studentData);
            }
        } else {
            // Fallback to mock data if API fails
            console.warn('Unexpected API response format, using mock data');
            results = findScholarships(studentData);
        }
        
        // Hide loading, show results
        loadingIndicator.hidden = true;
        renderResults(results, studentData);
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Show success toast
        const eligibleCount = results.filter(r => r.isEligible).length;
        showToast(`Found ${eligibleCount} scholarships you qualify for!`, 'success');
        
    } catch (error) {
        console.error('Error fetching scholarships:', error);
        
        // Fallback to mock data on error
        const results = findScholarships(studentData);
        
        loadingIndicator.hidden = true;
        renderResults(results, studentData);
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        showToast('Using offline data. AI features may be limited.', 'warning');
    }
};

// ===================================
// REAL-TIME VALIDATION
// ===================================

/**
 * Setup real-time validation for inputs
 */
const setupRealtimeValidation = () => {
    const gpaInput = document.getElementById('gpa');
    const incomeInput = document.getElementById('income');
    const courseInput = document.getElementById('course');
    
    // GPA validation with debounce
    gpaInput.addEventListener('input', debounce((e) => {
        const validation = validateGPA(parseFloat(e.target.value));
        if (e.target.value && !validation.valid) {
            showError(e.target, validation.message);
        } else {
            clearError(e.target);
        }
    }, 500));
    
    // Income validation
    incomeInput.addEventListener('change', (e) => {
        const validation = validateIncome(e.target.value);
        if (!validation.valid) {
            showError(e.target, validation.message);
        } else {
            clearError(e.target);
        }
    });
    
    // Course validation with debounce
    courseInput.addEventListener('input', debounce((e) => {
        const validation = validateCourse(e.target.value);
        if (e.target.value && !validation.valid) {
            showError(e.target, validation.message);
        } else {
            clearError(e.target);
        }
    }, 500));
};

// ===================================
// SMOOTH SCROLLING FOR NAVIGATION
// ===================================

/**
 * Setup smooth scrolling for anchor links
 */
const setupSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// ===================================
// AUTOFILL FROM SAVED PROFILE
// ===================================

/**
 * Autofill form from saved user profile
 */
const autofillForm = () => {
    const savedProfile = getUserProfile();
    if (savedProfile) {
        const gpaInput = document.getElementById('gpa');
        const incomeInput = document.getElementById('income');
        const courseInput = document.getElementById('course');
        const activitiesInput = document.getElementById('activities');
        
        if (savedProfile.gpa) gpaInput.value = savedProfile.gpa;
        if (savedProfile.income) incomeInput.value = savedProfile.income;
        if (savedProfile.course) courseInput.value = savedProfile.course;
        if (savedProfile.activities) activitiesInput.value = savedProfile.activities;
        
        showToast('We loaded your previous information', 'success');
    }
};

// ===================================
// INITIALIZATION
// ===================================

/**
 * Initialize application
 */
const init = () => {
    console.log('🌟 AI Scholarship Finder initialized');
    
    // Setup navbar scroll behavior
    setupNavbarScroll();
    
    // Setup form submission
    const form = document.getElementById('eligibility-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        setupRealtimeValidation();
        autofillForm();
    }
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Setup Essay Library features
    setupEssayLibrary();
    
    // Add entrance animation to hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        setTimeout(() => {
            hero.style.transition = 'all 0.6s ease-out';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
};

// ===================================
// ESSAY LIBRARY FEATURES
// ===================================

/**
 * Setup Essay Library word counter and tone analyzer
 */
const setupEssayLibrary = () => {
    const essayInput = document.getElementById('essay-input');
    const checkBtn = document.getElementById('check-essay-btn');
    
    if (!essayInput) return;

    essayInput.addEventListener('input', debounce(() => {
        updateWordCount();
        analyzeTone();
    }, 300));

    if (checkBtn) {
        checkBtn.addEventListener('click', checkEssayQuality);
    }
};

/**
 * Update word and character count
 */
const updateWordCount = () => {
    const essayInput = document.getElementById('essay-input');
    const wordCountEl = document.getElementById('word-count');
    const charCountEl = document.getElementById('char-count');

    const text = essayInput.value.trim();
    const wordCount = text.length === 0 ? 0 : text.split(/\s+/).length;
    const charCount = text.length;

    wordCountEl.textContent = wordCount;
    charCountEl.textContent = charCount;
};

/**
 * Analyze essay tone (formal, casual, balanced)
 */
const analyzeTone = () => {
    const essayInput = document.getElementById('essay-input');
    const toneResultEl = document.getElementById('tone-result');
    const toneFeedbackEl = document.getElementById('tone-feedback');

    const text = essayInput.value.toLowerCase();

    if (text.trim().length < 50) {
        toneResultEl.textContent = 'Neutral';
        toneFeedbackEl.textContent = '';
        toneFeedbackEl.className = 'tone-feedback';
        return;
    }

    // Formal indicators
    const formalWords = ['furthermore', 'moreover', 'consequently', 'nevertheless', 'therefore', 'thus', 'henceforth', 'wherein', 'thereby'];
    const casualWords = ['yeah', 'cool', 'awesome', 'gonna', 'wanna', 'kinda', 'sorta', 'hey', 'wow', 'super'];
    const contractions = ["don't", "can't", "won't", "i'm", "you're", "it's", "we're", "they're"];

    let formalScore = 0;
    let casualScore = 0;

    // Count formal words
    formalWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = text.match(regex);
        if (matches) formalScore += matches.length * 2;
    });

    // Count casual words
    casualWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = text.match(regex);
        if (matches) casualScore += matches.length * 2;
    });

    // Count contractions
    contractions.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = text.match(regex);
        if (matches) casualScore += matches.length;
    });

    // Check sentence length (longer = more formal)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgSentenceLength = sentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0) / sentences.length;
    
    if (avgSentenceLength > 20) formalScore += 3;
    if (avgSentenceLength < 12) casualScore += 3;

    // Determine tone
    let tone, feedback, feedbackClass;
    
    if (formalScore > casualScore + 3) {
        tone = 'Formal';
        feedback = '📘 Your essay has a formal academic tone. This is good for scholarship applications! Consider adding personal anecdotes to make it more engaging.';
        feedbackClass = 'formal';
    } else if (casualScore > formalScore + 3) {
        tone = 'Casual';
        feedback = '💬 Your essay sounds conversational. Try using more formal language and avoiding contractions for scholarship applications.';
        feedbackClass = 'casual';
    } else {
        tone = 'Balanced';
        feedback = '✅ Perfect balance! Your tone is professional yet personal - ideal for scholarship essays.';
        feedbackClass = 'balanced';
    }

    toneResultEl.textContent = tone;
    toneFeedbackEl.textContent = feedback;
    toneFeedbackEl.className = `tone-feedback ${feedbackClass}`;
};

/**
 * AI Essay Quality Checker
 */
const checkEssayQuality = () => {
    const essayInput = document.getElementById('essay-input');
    const resultsDiv = document.getElementById('quality-results');
    const scoreDiv = document.getElementById('quality-score');
    const feedbackDiv = document.getElementById('quality-feedback');

    const text = essayInput.value.trim();

    if (text.length < 100) {
        alert('Please write at least 100 characters for a meaningful analysis.');
        return;
    }

    // Analysis criteria
    const analysis = {
        score: 0,
        maxScore: 100,
        feedback: []
    };

    // 1. Length Check (0-15 points)
    const wordCount = text.split(/\s+/).length;
    if (wordCount >= 250 && wordCount <= 650) {
        analysis.score += 15;
        analysis.feedback.push({
            type: 'positive',
            icon: '✅',
            title: 'Perfect Length',
            text: `Your essay has ${wordCount} words - ideal for scholarship applications (250-650 words).`
        });
    } else if (wordCount < 250) {
        analysis.score += 8;
        analysis.feedback.push({
            type: 'warning',
            icon: '⚠️',
            title: 'Too Short',
            text: `Your essay has ${wordCount} words. Most scholarships require 250-650 words. Add more specific examples and details.`
        });
    } else {
        analysis.score += 10;
        analysis.feedback.push({
            type: 'warning',
            icon: '⚠️',
            title: 'Too Long',
            text: `Your essay has ${wordCount} words. Consider cutting to 250-650 words to stay focused and respect word limits.`
        });
    }

    // 2. Personal Examples Check (0-20 points)
    const personalIndicators = /\b(i|my|me|myself|when i|i was|i am|i have|my family|my experience)\b/gi;
    const personalCount = (text.match(personalIndicators) || []).length;
    const hasStory = /\b(when|during|after|before|while|once|remember)\b/gi.test(text);
    
    if (personalCount >= 5 && hasStory) {
        analysis.score += 20;
        analysis.feedback.push({
            type: 'positive',
            icon: '✅',
            title: 'Personal & Authentic',
            text: 'Great use of personal experiences and stories! This makes your essay engaging and unique.'
        });
    } else if (personalCount >= 3) {
        analysis.score += 12;
        analysis.feedback.push({
            type: 'warning',
            icon: '💡',
            title: 'Add More Personal Stories',
            text: 'Include specific anecdotes from your life to make your essay more memorable and authentic.'
        });
    } else {
        analysis.score += 5;
        analysis.feedback.push({
            type: 'negative',
            icon: '❌',
            title: 'Too Generic',
            text: 'Your essay lacks personal examples. Share specific experiences, challenges, or moments that shaped you.'
        });
    }

    // 3. Specific Details Check (0-20 points)
    const specificIndicators = /\b(\d+|specific|for example|such as|including|particularly|specifically|named)\b/gi;
    const vagueWords = /\b(good|nice|great|many|some|things|stuff|very|really)\b/gi;
    const specificCount = (text.match(specificIndicators) || []).length;
    const vagueCount = (text.match(vagueWords) || []).length;
    
    if (specificCount > vagueCount && specificCount >= 3) {
        analysis.score += 20;
        analysis.feedback.push({
            type: 'positive',
            icon: '✅',
            title: 'Specific & Detailed',
            text: 'Excellent use of specific examples, numbers, and concrete details. This makes your essay credible.'
        });
    } else if (specificCount >= 2) {
        analysis.score += 12;
        analysis.feedback.push({
            type: 'warning',
            icon: '💡',
            title: 'Add More Specifics',
            text: 'Replace vague words ("good", "nice", "many") with specific details, numbers, and examples.'
        });
    } else {
        analysis.score += 5;
        analysis.feedback.push({
            type: 'negative',
            icon: '❌',
            title: 'Too Vague',
            text: 'Your essay uses too many general statements. Add specific names, numbers, achievements, and details.'
        });
    }

    // 4. Goal & Impact Check (0-20 points)
    const goalWords = /\b(goal|aspire|plan|aim|hope|dream|future|will|career|contribute|impact|change|help|serve)\b/gi;
    const goalCount = (text.match(goalWords) || []).length;
    
    if (goalCount >= 4) {
        analysis.score += 20;
        analysis.feedback.push({
            type: 'positive',
            icon: '✅',
            title: 'Clear Goals & Impact',
            text: 'You clearly articulate your goals and how you\'ll make an impact. Scholarship committees love this!'
        });
    } else if (goalCount >= 2) {
        analysis.score += 12;
        analysis.feedback.push({
            type: 'warning',
            icon: '💡',
            title: 'Strengthen Your Vision',
            text: 'Expand on your future goals and how this scholarship will help you achieve them.'
        });
    } else {
        analysis.score += 5;
        analysis.feedback.push({
            type: 'negative',
            icon: '❌',
            title: 'Missing Future Vision',
            text: 'Explain your goals and how you plan to contribute to your field or community after graduation.'
        });
    }

    // 5. Structure Check (0-15 points)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
    const avgSentenceLength = sentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0) / sentences.length;
    
    if (paragraphs.length >= 3 && paragraphs.length <= 5 && avgSentenceLength > 10 && avgSentenceLength < 25) {
        analysis.score += 15;
        analysis.feedback.push({
            type: 'positive',
            icon: '✅',
            title: 'Well-Structured',
            text: `Great structure with ${paragraphs.length} paragraphs and clear, readable sentences.`
        });
    } else if (paragraphs.length >= 2) {
        analysis.score += 10;
        analysis.feedback.push({
            type: 'warning',
            icon: '💡',
            title: 'Improve Structure',
            text: 'Aim for 3-5 paragraphs with varied sentence lengths. Break up long paragraphs for better readability.'
        });
    } else {
        analysis.score += 5;
        analysis.feedback.push({
            type: 'negative',
            icon: '❌',
            title: 'Poor Structure',
            text: 'Break your essay into clear paragraphs: Introduction, Body (experiences/goals), and Conclusion.'
        });
    }

    // 6. Passion & Enthusiasm (0-10 points)
    const passionWords = /\b(passionate|love|excited|dedicated|committed|driven|motivated|inspire|inspire)\b/gi;
    const passionCount = (text.match(passionWords) || []).length;
    
    if (passionCount >= 2) {
        analysis.score += 10;
        analysis.feedback.push({
            type: 'positive',
            icon: '✅',
            title: 'Passionate & Motivated',
            text: 'Your enthusiasm shines through! This energy makes your essay compelling.'
        });
    } else {
        analysis.score += 5;
        analysis.feedback.push({
            type: 'warning',
            icon: '💡',
            title: 'Show Your Passion',
            text: 'Let your excitement and dedication come through more clearly. Why does this matter to you?'
        });
    }

    // Calculate percentage
    const percentage = Math.round((analysis.score / analysis.maxScore) * 100);

    // Determine rating
    let rating, ratingClass, ratingEmoji;
    if (percentage >= 85) {
        rating = 'Excellent';
        ratingClass = 'excellent';
        ratingEmoji = '🌟';
    } else if (percentage >= 70) {
        rating = 'Good';
        ratingClass = 'good';
        ratingEmoji = '👍';
    } else if (percentage >= 50) {
        rating = 'Needs Work';
        ratingClass = 'needs-work';
        ratingEmoji = '⚠️';
    } else {
        rating = 'Needs Major Revision';
        ratingClass = 'poor';
        ratingEmoji = '📝';
    }

    // Display results
    scoreDiv.className = `quality-score ${ratingClass}`;
    scoreDiv.innerHTML = `
        <span class="score-percentage">${ratingEmoji} ${percentage}%</span>
        <span class="score-label">${rating}</span>
    `;

    feedbackDiv.innerHTML = analysis.feedback.map(item => `
        <div class="feedback-item ${item.type}">
            <div class="feedback-item-title">${item.icon} ${item.title}</div>
            <div class="feedback-item-text">${item.text}</div>
        </div>
    `).join('');

    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for testing (if using module system)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateGPA,
        validateIncome,
        validateCourse,
        checkEligibility,
        findScholarships,
        debounce
    };
}

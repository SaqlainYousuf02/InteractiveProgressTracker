// Course Data
const courses = [
    {
        id: 1,
        title: "Advanced React Patterns",
        category: "Frontend Development",
        color: "#61DAFB",
        icon: "⚛️",
        lessons: [
            { id: 1, title: "Compound Components", completed: true },
            { id: 2, title: "Render Props Pattern", completed: true },
            { id: 3, title: "Custom Hooks Deep Dive", completed: false },
            { id: 4, title: "Performance Optimization", completed: false },
            { id: 5, title: "State Management Patterns", completed: false }
        ]
    },
    {
        id: 2,
        title: "UI/UX Design Mastery",
        category: "Design",
        color: "#FF6B6B",
        icon: "🎨",
        lessons: [
            { id: 1, title: "Color Theory Fundamentals", completed: true },
            { id: 2, title: "Typography & Hierarchy", completed: true },
            { id: 3, title: "Design Systems", completed: true },
            { id: 4, title: "Micro-interactions", completed: false },
            { id: 5, title: "Accessibility Standards", completed: false },
            { id: 6, title: "Prototyping & Testing", completed: false }
        ]
    },
    {
        id: 3,
        title: "Node.js Microservices",
        category: "Backend Development",
        color: "#68A063",
        icon: "🟢",
        lessons: [
            { id: 1, title: "Service Architecture", completed: false },
            { id: 2, title: "API Gateway Setup", completed: false },
            { id: 3, title: "Message Queues", completed: false },
            { id: 4, title: "Docker Containerization", completed: false }
        ]
    },
    {
        id: 4,
        title: "Machine Learning Basics",
        category: "Data Science",
        color: "#FFD93D",
        icon: "🤖",
        lessons: [
            { id: 1, title: "Linear Regression", completed: true },
            { id: 2, title: "Classification Algorithms", completed: false },
            { id: 3, title: "Neural Networks Intro", completed: false },
            { id: 4, title: "Model Evaluation", completed: false },
            { id: 5, title: "Deployment Strategies", completed: false }
        ]
    },
    {
        id: 5,
        title: "DevOps & CI/CD",
        category: "Infrastructure",
        color: "#FF8C42",
        icon: "⚙️",
        lessons: [
            { id: 1, title: "Git Workflows", completed: true },
            { id: 2, title: "Jenkins Pipelines", completed: true },
            { id: 3, title: "Kubernetes Basics", completed: true },
            { id: 4, title: "Monitoring & Logging", completed: true },
            { id: 5, title: "Infrastructure as Code", completed: false }
        ]
    },
    {
        id: 6,
        title: "GraphQL & Apollo",
        category: "API Development",
        color: "#E535AB",
        icon: "◈",
        lessons: [
            { id: 1, title: "Schema Design", completed: true },
            { id: 2, title: "Resolvers & Mutations", completed: false },
            { id: 3, title: "Client-side Caching", completed: false },
            { id: 4, title: "Subscriptions", completed: false }
        ]
    }
];

// Store progress bar
const progressBarInstances = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
    updateGlobalStats();
});

function renderCourses() {
    const container = document.getElementById('courseContainer');
    container.innerHTML = '';

    courses.forEach((course, index) => {
        const completedCount = course.lessons.filter(l => l.completed).length;
        const progress = completedCount / course.lessons.length;
        
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card glass-panel rounded-3xl p-6 relative overflow-hidden';
        courseCard.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
        
        courseCard.innerHTML = `
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full"></div>
            
            <div class="flex items-start justify-between mb-6">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                        ${course.icon}
                    </div>
                    <div>
                        <h3 class="font-bold text-lg leading-tight">${course.title}</h3>
                        <span class="text-xs text-white/60 uppercase tracking-wider">${course.category}</span>
                    </div>
                </div>
                <div class="progress-container">
                    <div id="progress-${course.id}"></div>
                    <div class="progress-text" id="text-${course.id}">${Math.round(progress * 100)}%</div>
                </div>
            </div>

            <div class="space-y-2 mb-4">
                <div class="flex justify-between text-sm text-white/70 mb-2">
                    <span>${completedCount} of ${course.lessons.length} lessons</span>
                    <span id="status-${course.id}" class="${progress === 1 ? 'text-emerald-400 font-semibold' : 'text-white/60'}">
                        ${progress === 1 ? '✓ Completed' : 'In Progress'}
                    </span>
                </div>
                
                <div class="flex flex-wrap gap-2" id="lessons-${course.id}">
                    ${course.lessons.map((lesson, idx) => `
                        <button 
                            onclick="toggleLesson(${course.id}, ${lesson.id})"
                            class="lesson-btn ${lesson.completed ? 'completed' : 'bg-white/5 hover:bg-white/10'} 
                                   border border-white/20 rounded-xl px-3 py-2 text-xs font-medium transition-all
                                   ${lesson.completed ? 'text-white' : 'text-white/70'}"
                            title="${lesson.title}"
                        >
                            <div class="flex items-center gap-2">
                                <span class="w-4 h-4 rounded-full border-2 ${lesson.completed ? 'border-white bg-white' : 'border-white/40'} flex items-center justify-center text-[8px] text-purple-900 font-bold">
                                    ${lesson.completed ? '✓' : idx + 1}
                                </span>
                                <span class="truncate max-w-[120px]">${lesson.title}</span>
                            </div>
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                <div class="flex -space-x-2">
                    ${[1,2,3].map(() => `
                        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white/20 flex items-center justify-center text-xs">
                            👤
                        </div>
                    `).join('')}
                    <div class="w-8 h-8 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-xs text-white/60">
                        +42
                    </div>
                </div>
                <button onclick="resetCourse(${course.id})" class="text-xs text-white/40 hover:text-white/80 transition-colors cursor-pointer">
                    Reset Progress
                </button>
            </div>
        `;
        
        container.appendChild(courseCard);
        
        // Initialize ProgressBar.js
        setTimeout(() => {
            createProgressBar(course.id, progress, course.color);
        }, 100);
    });
}

function createProgressBar(courseId, initialProgress, color) {
    const container = document.getElementById(`progress-${courseId}`);
    if (!container) return;

    // Destroy existing 
    if (progressBarInstances[courseId]) {
        progressBarInstances[courseId].destroy();
    }

    const bar = new ProgressBar.Circle(container, {
        color: color,
        strokeWidth: 8,
        trailWidth: 8,
        trailColor: 'rgba(255, 255, 255, 0.1)',
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: { color: color, width: 8 },
        to: { color: color, width: 8 }
    });

    bar.animate(initialProgress);
    progressBarInstances[courseId] = bar;
}

function toggleLesson(courseId, lessonId) {
    const course = courses.find(c => c.id === courseId);
    const lesson = course.lessons.find(l => l.id === lessonId);

    lesson.completed = !lesson.completed;
    
    const completedCount = course.lessons.filter(l => l.completed).length;
    const newProgress = completedCount / course.lessons.length;

    if (progressBarInstances[courseId]) {
        progressBarInstances[courseId].animate(newProgress);
    }
    // Update percentage 
    const textEl = document.getElementById(`text-${courseId}`);
    animateValue(textEl, parseInt(textEl.textContent), Math.round(newProgress * 100), 1000);
    
    // Update status
    const statusEl = document.getElementById(`status-${courseId}`);
    if (newProgress === 1) {
        statusEl.textContent = '✓ Completed';
        statusEl.className = 'text-emerald-400 font-semibold';
        triggerConfetti(courseId);
    } else {
        statusEl.textContent = 'In Progress';
        statusEl.className = 'text-white/60';
    }    
    // Re-render lessons
    const lessonsContainer = document.getElementById(`lessons-${courseId}`);
    lessonsContainer.innerHTML = course.lessons.map((l, idx) => `
        <button 
            onclick="toggleLesson(${courseId}, ${l.id})"
            class="lesson-btn ${l.completed ? 'completed' : 'bg-white/5 hover:bg-white/10'} 
                   border border-white/20 rounded-xl px-3 py-2 text-xs font-medium transition-all
                   ${l.completed ? 'text-white' : 'text-white/70'}"
            title="${l.title}"
        >
            <div class="flex items-center gap-2">
                <span class="w-4 h-4 rounded-full border-2 ${l.completed ? 'border-white bg-white' : 'border-white/40'} flex items-center justify-center text-[8px] text-purple-900 font-bold">
                    ${l.completed ? '✓' : idx + 1}
                </span>
                <span class="truncate max-w-[120px]">${l.title}</span>
            </div>
        </button>
    `).join('');
       // Update
    updateGlobalStats();
}
function resetCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    course.lessons.forEach(l => l.completed = false);
    // Reset progress bar
    if (progressBarInstances[courseId]) {
        progressBarInstances[courseId].animate(0);
    }  
    // Update text
    const textEl = document.getElementById(`text-${courseId}`);
    textEl.textContent = '0%';  
    // Update status
    const statusEl = document.getElementById(`status-${courseId}`);
    statusEl.textContent = 'In Progress';
    statusEl.className = 'text-white/60';  
    // Re-render
    const lessonsContainer = document.getElementById(`lessons-${courseId}`);
    lessonsContainer.innerHTML = course.lessons.map((l, idx) => `
        <button 
            onclick="toggleLesson(${courseId}, ${l.id})"
            class="lesson-btn bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs font-medium transition-all text-white/70"
            title="${l.title}"
        >
            <div class="flex items-center gap-2">
                <span class="w-4 h-4 rounded-full border-2 border-white/40 flex items-center justify-center text-[8px] text-purple-900 font-bold">
                    ${idx + 1}
                </span>
                <span class="truncate max-w-[120px]">${l.title}</span>
            </div>
        </button>
    `).join('');
    
    updateGlobalStats();
}
function updateGlobalStats() {
    const totalCourses = courses.length;
    const totalLessons = courses.reduce((acc, c) => acc + c.lessons.length, 0);
    const completedLessons = courses.reduce((acc, c) => acc + c.lessons.filter(l => l.completed).length, 0);
    const avgProgress = Math.round((completedLessons / totalLessons) * 100);
    
    animateValue(document.getElementById('totalCourses'), parseInt(document.getElementById('totalCourses').textContent), totalCourses, 1000);
    animateValue(document.getElementById('completedLessons'), parseInt(document.getElementById('completedLessons').textContent), completedLessons, 1000);
    animateValue(document.getElementById('avgProgress'), parseInt(document.getElementById('avgProgress').textContent), avgProgress, 1000, '%');
}
function animateValue(obj, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
function triggerConfetti(courseId) {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const container = document.getElementById(`progress-${courseId}`).getBoundingClientRect();
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = container.left + container.width / 2 + 'px';
        confetti.style.top = container.top + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}
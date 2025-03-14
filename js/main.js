function checkAnswers() {
    var correctAnswers = {
        q1: 'A',
        q2: 'D',
        q3: 'B',
        q4: 'A',
        q5: 'D',
    };
    var form = document.getElementById('quizForm');
    var results = document.getElementById('results');
    var score = 0;
    var totalQuestions = Object.keys(correctAnswers).length;

    for (var question in correctAnswers) {
        var selected = form.querySelector('input[name="' + question + '"]:checked');
        if (selected && selected.value === correctAnswers[question]) {
            score++;
        }
    }

    results.innerHTML = '<h2>Skor Anda: ' + score + ' dari ' + totalQuestions + '</h2>';
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
    // Prevent form submission
    event.preventDefault();
    
    // Get form values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var number = document.getElementById("number").value;
    var message = document.getElementById("message").value;

    // Validate form fields
    if (name.trim() === "") {
        alert("Please enter your name.");
        return;
    }
    
    if (email.trim() === "") {
        alert("Please enter your email.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    
    if (number.trim() === "") {
        alert("Please enter your number.");
        return;
    }

    if (message.trim() === "") {
        alert("Please enter your message.");
        return;
    }
    
    // If all validations pass, submit the form
    alert("Form submitted successfully!");
    document.getElementById("contactForm").submit();
});

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
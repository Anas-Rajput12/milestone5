
document.getElementById('resume-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const about = document.getElementById('about').value;
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;

    // Set the values to the output section
    document.getElementById('display-name').innerText = name;
    document.getElementById('display-dob').innerText = dob;
    document.getElementById('display-email').innerText = email;
    document.getElementById('display-phone').innerText = phone;
    document.getElementById('display-address').innerText = address;
    document.getElementById('display-about').innerText = about;
    document.getElementById('display-education-text').innerText = education;
    document.getElementById('display-skills-text').innerText = skills;
    document.getElementById('display-experience-text').innerText = experience;

    // Show the resume section
    document.getElementById('resume').style.display = 'flex';

    // Handle photo upload
    const photoInput = document.getElementById('photo');
    const photoDisplay = document.getElementById('display-photo');

    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoDisplay.src = e.target.result;
        };
        reader.readAsDataURL(photoInput.files[0]); // Convert image to base64 string
    }

    // Generate shareable link
    const shareLink = `${window.location.href}#${encodeURIComponent(JSON.stringify({
        name,
        dob,
        email,
        phone,
        address,
        about,
        education,
        skills,
        experience
    }))}`;
    document.getElementById('shareLink').innerText = shareLink;

    // Copy link to clipboard
    document.getElementById('copyLinkBtn').onclick = function() {
        navigator.clipboard.writeText(shareLink).then(() => {
            alert('Link copied to clipboard!');
        });
    };

    // Download as PDF
    document.getElementById('downloadPdfBtn').onclick = function() {
        const element = document.getElementById('resume');
        html2pdf()
            .from(element)
            .save('resume.pdf');
    };
});

// Regenerate CV button
document.getElementById('regenerate-cv').addEventListener('click', function() {
    document.getElementById('resume-form').reset(); // Reset the form
    document.getElementById('resume').style.display = 'none'; // Hide the resume
});

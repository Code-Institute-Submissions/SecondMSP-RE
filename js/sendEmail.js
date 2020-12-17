

function sendMail() {
    emailjs.send("gmail", "template_pwcf2qh", {
    "from_name": document.getElementById("name").value,
    "from_email": document.getElementById("email").value, 
    "to_email": "tayo4ayo@gmail.com",
    "message_request": document.getElementById("message").value
    })

    .then(
        function(response) {
          console.log("SUCCESS!", response.status, response.text);
    }, 
        function(error) {
       console.log("FAILED", error);
        
    });
     return false; 
}

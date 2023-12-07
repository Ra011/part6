
const submitBookingForm = (e) => {
    e.preventDefault();
    document.getElementById("results").classList.remove("hidden");
  
    const form = document.getElementById("booking-form");
    const bookingName = form.elements["booking-name"].value;
    const bookingEmail = form.elements["booking-email"].value;
    const bookingPartySize = form.elements["booking-party-size"].value;
    const bookingDate = form.elements["booking-date"].value;
    const bookingTime = form.elements["booking-time"].value;
  
    console.log(bookingName);
    console.log(bookingEmail);
    console.log(bookingPartySize);
    console.log(bookingDate);
    console.log(bookingTime);

     let results = document.getElementById("results");
     results.innerHTML=""
     const h3Request = document.createElement("h3");
     h3Request.innerHTML = "Booking requested";
     results.append(h3Request);

         const pName = document.createElement("p");
         pName.innerHTML = "<b>Name:</b> "+ bookingName;
         results.append(pName);

        const pEmail = document.createElement("p");
        pEmail.innerHTML = "<b>Email:</b> "+ bookingEmail;
        results.append(pEmail);

        const pSize = document.createElement("p");
        pSize.innerHTML = "<b>Party size:</b> "+ bookingPartySize;
        results.append(pSize);

        const pDate = document.createElement("p");
        pDate.innerHTML = "<b>Date:</b> "+ bookingDate;
        results.append(pDate);

        const pTime = document.createElement("p");
        pTime.innerHTML = "<b>Time:</b> "+ bookingTime;
        results.append(pTime);
};


document.getElementById("booking-form").onsubmit = submitBookingForm
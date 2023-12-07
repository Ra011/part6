const getEvents = async () => {
  try {
    return (await fetch("api/events/")).json();
  } catch (error) {
    console.log(error);
  }
};
  
  const showEvents = async () => {
    let events = await getEvents();
    let eventsSection = document.getElementById("whatson-list");
  

    events.forEach((event) => {
      eventsSection.append(getEventItem(event));
    });
  };
  
  const getEventItem = (event) => {
    let ul = document.createElement("ul");
    ul.classList.add("whatson-items");
    let li = document.createElement("li");
    ul.append(li);
    let columns = document.createElement("div");
    columns.classList.add("columns");
    li.append(columns);

    let col10f5 = document.createElement("div");
    col10f5.classList.add("col10f5");
    columns.append(col10f5);
    let img = document.createElement("img");
    img.classList.add("whatson-img");
    img.src=event.img;
    col10f5.append(img);

let col40f5 = document.createElement("div");
    col40f5.classList.add("col40f5");
    col40f5.classList.add("centerme");
    columns.append(col40f5);

    let h2 = document.createElement("h2");
    h2.classList.add("whatson-header");
    h2.innerText = event.event_name;
    col40f5.append(h2);

    let p1 = document.createElement("p");
    p1.classList.add("whatson-date");
    p1.innerText = event.event_date;
    col40f5.append(p1);

    let p2 = document.createElement("p");
    p2.classList.add("whatson-para");
    p2.innerText = event.event_description;
    col40f5.append(p2);

    return ul;
  };
  
 

  const addEvent = async (e) => {
    e.preventDefault();
    const form = document.getElementById("event_form");
    const formData = new FormData(form);
    let response;
  
    //trying to add a new event
    if (form._id.value == -1) {
      formData.delete("_id");
  
      response = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });
    }
    //edit an existing event
    else {
      console.log(...formData);
  
      response = await fetch(`/api/events/${form._id.value}`, {
        method: "PUT",
        body: formData,
      });
    }
  
    //successfully got data from server
    if (response.status != 200) {
      console.log("Error posting data");
    }
  
    event = await response.json();
  
    if (form._id.value != -1) {
      displayDetails(event);
    }
  
    resetForm();
  
    showEvents();
  };

  const resetForm = () => {
    const form = document.getElementById("event_form");
    form.reset();
    form._id = "-1";
  };
  

  const toggleNav = () => {
    document.getElementById("nav-items").classList.toggle("hide-small");
  };
  
  const goToBookingsPage = () => {
    console.log("button pressed");
    window.location.href = "bookings.html";
  };
  
  
  const showHideEvents = () => {
    console.log("button pressed");
    document.getElementById("show-hide-add-event").classList.toggle("hide-event-form");
  };

  window.onload = () => {
  showEvents();
  document.getElementById("event_form").onsubmit = addEvent;
  console.log("testing");
  document.getElementById("hamburger").onclick = toggleNav;
  document.getElementById("button-book").onclick = goToBookingsPage;
  document.getElementById("button-event-show").onclick = showHideEvents;

  };
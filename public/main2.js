

function editEvent(_id) {
  let eventtitle = document.querySelector('.newtitle').value
  let eventlocation = document.querySelector('.newlocation').value
  let eventdate = document.querySelector('.newdate').value
  let eventdescription = document.querySelector('.newdescription').value
  let eventcapacity = document.querySelector('.newcapacity').value

  fetch('/post/edit', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      '_id': _id,
      'eventtitle': eventtitle,
      'eventlocation': eventlocation,
      'eventdate': eventdate,
      'eventdescription': eventdescription,
      'eventcapacity': eventcapacity
    })
  })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.href = `/post/${_id}`
    })
}

function deleteEvent(_id) {
  fetch('/post/deletePost', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      '_id': _id
    })
  }).then(function (response) {
    window.location.href = '/gallery'
  })
}
function makeARequest(_id) {
  fetch('/post/requests', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      '_id': _id
    })
  }).then(function (response) {
    window.location.href = `/eventinfo/${_id}`
  })
}
function accept(postid, userid) {
  //onclick brings you here, passes in these 2 parameters
  fetch('/post/accept', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // these parameters get sent to the controller with '/post/accept' <-- route
      '_id': postid,
      'userid': userid
    })
  }).then(function (response) {
    window.location.reload()
  })
}

///will need to work on on monday


function deny(postid, userid) {
  //onclick brings you here, passes in these 2 parameters
  fetch('/post/deny', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // these parameters get sent to the controller with '/post/accept' <-- route
      '_id': postid,
      'userid': userid
    })
  }).then(function (response) {
    window.location.reload()
  })
}



















// Array.from(thumbDown).forEach(function (element) {
//   element.addEventListener('click', function () {
//     const name = this.parentNode.parentNode.childNodes[1].innerText.trim()
//     const msg = this.parentNode.parentNode.childNodes[3].innerText.trim()
//     const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//     console.log(thumbDown)
//     fetch('thumbdown', {
//       method: 'put',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg,
//         'thumbDown': thumbDown
//       })
//     })
//       .then(response => {
//         if (response.ok) return response.json()
//       })
//       .then(data => {
//         console.log(data)
//         window.location.reload(true)
//       })
//   });
// });

// Array.from(trash).forEach(function (element) {
//   element.addEventListener('click', function () {
//     const name = this.parentNode.parentNode.childNodes[1].innerText.trim()
//     const msg = this.parentNode.parentNode.childNodes[3].innerText.trim()
//     fetch('messages', {
//       method: 'delete',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg
//       })
//     }).then(function (response) {
//       window.location.reload()
//     })
//   });
// });


// Get the modal
// var ebModal = document.getElementById('mySizeChartModal');

// Get the button that opens the modal
// var ebBtn = document.getElementById("mySizeChart");

// Get the <span> element that closes the modal
// var ebSpan = document.getElementsByClassName("ebcf_close")[0];

// When the user clicks the button, open the modal 
// ebBtn.onclick = function() {
    // ebModal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// ebSpan.onclick = function() {
    // ebModal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
    // if (event.target == ebModal) {
        // ebModal.style.display = "none";
    // }
// }
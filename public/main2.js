

function editEvent(_id) {
  let eventtitle = document.querySelector('.newtitle').value
  let eventcity = document.querySelector('.newcity').value
  let eventstate = document.querySelector('.newstate').value
  let eventdate = document.querySelector('.newdate').value
  let eventdescription = document.querySelector('.newdescription').value
  let eventcapacity = document.querySelector('.newcapacity').value

  fetch('/post/edit', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      '_id': _id,
      'eventtitle': eventtitle,
      'eventcity': eventcity,
      'eventstate': eventstate,
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

// const selectElement = document.querySelector('.filter').addEventListener('change', )

document.querySelector('.filter').addEventListener('click', (e) => {
  let selectedState = document.querySelector('.selectState').value
  let selectedStateCard = Array.from(document.getElementsByClassName(selectedState))
  let allEvents = Array.from(document.querySelectorAll('.events'))

  allEvents.forEach(card => card.classList.add('hide'))
  selectedStateCard.forEach(card => card.classList.remove('hide'))
  const result = document.querySelector('.result')
  result.textContent = selectedState
})


//boxwood-charmer-186806 is the project ID
const CLIENT_ID = '828863082444-52mksq4fqrbkkucd3i54uf3r4svrkioq.apps.googleusercontent.com'
      const API_KEY = 'AIzaSyA4yrIsc8ux0pXSOa-pDeCrfgWtMObABOI'

      // Array of API discovery doc URLs for APIs used by the quickstart
      const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"]

      // Authorization scopes required by the API multiple scopes can be
      // included, separated by spaces.
      const SCOPES = 'https://www.googleapis.com/auth/drive'
      'https://www.googleapis.com/auth/drive.file'
      'https://www.googleapis.com/auth/spreadsheets'

      const authorizeButton = document.getElementById('authorize-button')
      const signoutButton = document.getElementById('signout-button')

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient)
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners (Google Sheets)
       */

      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
      //    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)

       //   Handle the initial sign-in state.
   //       updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
   //       authorizeButton.onclick = handleAuthClick
   //       signoutButton.onclick = handleSignoutClick
        })
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn()
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut()
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *

       */
      function appendPre(message) {
        const pre = document.getElementById('content')
        const textContent = document.createTextNode(message + '\n')
        pre.appendChild(textContent)
      }




// Initializes the Google Maps API. In order to use it's 'calculate distance' function, I needed to have an actual map on the page. And so, I did that, and just
//made the map hidden.
 function initMap() {
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: -34.397, lng: 150.644}
        });
        const geocoder = new google.maps.Geocoder()

        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map)
        })
      }

      function geocodeAddress(geocoder, resultsMap) {
        const address = document.getElementById('address').value
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location)
            const marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            })
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        })
      }






   /* After logging in, the pages in the Bootstrap navbar are actually functions. Because they're no longer links, the drop
    down menu doesn't collapse. This function fixes that */

    function collapse() {
        const navbar = document.getElementById('myNavbar')
        navbar.setAttribute('aria-expanded', 'false')
        navbar.style.height = '1px'
        navbar.className = 'navbar-collapse collapse'
    }



/* This function gets all of the data from A2-DS in my spreadsheet and displays
    the events that follow a specific argument: the Organization throwing the event
    has to match the Organization that the requesting User is employed by*/

      function listAllEvents() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
          range: 'Sheet1!A2:DS',
        }).then(function(response) {

        document.getElementById('contentheader').innerHTML = 'All Events'
        document.getElementById('content').innerHTML = ''
        const organization = document.getElementById('organization').innerHTML

          const range = response.result
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                const row = range.values[i]

                if (row[5] === organization) {




                const ul = document.createElement('ul')
                const div = document.createElement('div')
                ul.id = 'ulidnumber' + i
                div.id ='dividnumber' + i

                div.className = 'columns'
                ul.className = 'price'

                 const pre = document.getElementById('content')
                div.appendChild(ul)
                pre.appendChild(div)

             const ulSelector = document.getElementById('ulidnumber' + i)
             const divSelector = document.getElementById('dividnumber' + i)

             const li1 = document.createElement('li')
             li1.className = 'grey'
             const li2 = document.createElement('li')
             const li3 = document.createElement('li')
             const li4 = document.createElement('li')
             const li6 = document.createElement('li')
             const li7 = document.createElement('li')



             li1.innerHTML = row[0]
            li2.innerHTML = row[1]
            li3.innerHTML = row[2]
            li4.innerHTML = row[3] + ' ' + '-' + ' ' + row[4]
             
            li6.innerHTML = row[8] + ' Staff Members Needed'
            li6.className = 'blue'
            li7.innerHTML = row[7]
            li7.className = 'orange'



             ulSelector.appendChild(li1)
                ulSelector.appendChild(li2)
                 ulSelector.appendChild(li3)
                ulSelector.appendChild(li4)
                ulSelector.appendChild(li6)
                ulSelector.appendChild(li7)
    
                    
            /*This loops specifically through all of the cells that have to do with the 'Staff Status'. For better UI, I made the 'Not Staffed'
            portion hidden*/
                for (j = 9; j < (parseInt(row[8])+9); j++) {     
                    
                  const liLoop = document.createElement('li')
                  
                    liLoop.innerHTML = row[j]
                    
                    ulSelector.appendChild(liLoop)
                    
                    if (row[j] === 'Not Staffed') {
                        liLoop.style.display = 'none'
                    }
                    
                }
                
            
                }
            }
          } else {
            appendPre('There are no events.')
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message)
        })
      }






/* This function gets all of the data from A2-DS in my spreadsheet and displays
    the events that follow a specific argument: the Organization throwing the event
    has to match the Organization that the requesting User is employed by, and the User staffed to
    the event has to match the User making the request */

 function viewYourEvents() {
    return gapi.client.sheets.spreadsheets.values.get({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
     range: 'Sheet1!A2:DS',
        }).then(function(response) {


        document.getElementById('contentheader').innerHTML = 'Your Events'
        document.getElementById('content').innerHTML = ''
        const organization = document.getElementById('organization').innerHTML
        const username = document.getElementById('username').innerHTML


          const range = response.result
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                const row = range.values[i]






                const ul = document.createElement('ul')
                const div = document.createElement('div')
                ul.id = 'ulidnumber' + i
                div.id ='dividnumber' + i

                div.className = 'columns'
                ul.className = 'price'

                 const pre = document.getElementById('content')
                div.appendChild(ul)
                pre.appendChild(div)

             const ulSelector = document.getElementById('ulidnumber' + i)
             const divSelector = document.getElementById('dividnumber' + i)

             const li1 = document.createElement('li')
             li1.className = 'grey'
             const li2 = document.createElement('li')
             const li3 = document.createElement('li')
             const li4 = document.createElement('li')
              const li5= document.createElement('li')
             
        // This adds a button/function, so that the user can check-in to the event     
        const button = document.createElement('button')
        button.setAttribute('onclick', 'getCoordinatesOfAddress(this.id);')
        button.className = 'btn btn-primary button4'
        button.className += ' '
        button.className += 'input'
        button.value = row[7]
        button.type = 'submit'
        button.innerHTML = 'Check In'
                


             li1.innerHTML = row[0]
            li2.innerHTML = row[1]
            li3.innerHTML = row[2]
            li4.innerHTML = row[3] + ' ' + '-' + ' ' + row[4]
            li5.appendChild(button)



             ulSelector.appendChild(li1)
                ulSelector.appendChild(li2)
                 ulSelector.appendChild(li3)
                ulSelector.appendChild(li4)
                    ulSelector.appendChild(li5)

                    divSelector.style.display = 'none'
                
             // After retreiving all of the usernames, this loop displays events that correlate to the user's username   
                 for (j = 9; j < (parseInt(row[8])+9); j++) {    

               if (row[5] === organization && row[j] === username) {
                   
                   


            divSelector.style.display = 'block'


               }
                 }




               

                }
    const input = document.getElementsByClassName('input')

     for (i = 0; i < input.length; i++) {
         input[i].id = 'buttonnumber' + i
     }
                
            
              
  
              
              
          } else {
            appendPre('There are no events.')
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message)
        })
      }


// After the user clicks 'check in', this gets the coordinates of the event's address, and then runs a function to get the user's location
function getCoordinatesOfAddress(clicked_id) { 
    

const geocoder = new google.maps.Geocoder()
const clickedEvent = document.getElementById(clicked_id)
clickedEvent.value = 'Checked In'

const coordinatesVariable = document.createElement('input')
coordinatesVariable.style.display = 'none'
coordinatesVariable.id = 'coordinates'
document.getElementById('footer').appendChild(coordinatesVariable)
    
    const address = clickedEvent.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML

geocoder.geocode( { 'address': address}, function(results, status) {

if (status == google.maps.GeocoderStatus.OK) {
    const latitude = results[0].geometry.location.lat()
    const longitude = results[0].geometry.location.lng()
    const coordinates = document.getElementById('coordinates')
    
    coordinates.value = latitude + ' ' + longitude
    
    getLocation()
}
    } 
 )
}



// This function gets the location of the user, then runs a function to calculate the distance between the event and user
function getLocation() {
    
    const currentLocationVariable = document.createElement('input')
currentLocationVariable.style.display = 'none'
currentLocationVariable.id = 'currentlocation'
document.getElementById('footer').appendChild(currentLocationVariable)
    
    
    const currentLocation = document.getElementById('currentlocation')
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
        function showPosition(position) {
   currentLocation.value = position.coords.latitude + 
    ' ' + position.coords.longitude;
} 
        checkArrival()
    }
}


/* This function calculates the distance between the event and user. If the distance is under 100 meters,
it runs a function that displays a check-in message*/
function checkArrival() {
    const currentLocation = document.getElementById("currentlocation")
      const coordinates = document.getElementById('coordinates')
    
      const firstLatLng = currentLocation.value.split(' ')
      const secondLatLng = coordinates.value.split(' ')
    
    
    const latitude1 = parseFloat(firstLatLng[0])
    const longitude1 = parseFloat(firstLatLng[1])
    const latitude2 = parseFloat(secondLatLng[0])
    const longitude2 = parseFloat(secondLatLng[1])
    
   const distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latitude1, longitude1), new google.maps.LatLng(latitude2, longitude2))
    
    if (distance < 100) {
        checkIn()
    } 
    
  


}





/* This function lets the user know they've checked in. Sooner than later, I plan on having this function send an email to the
administator, notifying them of the check-in */
function checkIn() {

 
       document.getElementById('content').innerHTML = ''
       document.getElementById('contentheader').innerHTML = ''
       document.getElementById('content').innerHTML = 'You have successfully checked in!'

       //row[0] = input[0].value


  
  }




// This function displays the events that still need staff members, as well as a button for the user to accept the event.
function viewAvailableEvents() {
    return gapi.client.sheets.spreadsheets.values.get({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
   range: 'Sheet1!A2:DS',
        }).then(function(response) {

        document.getElementById('contentheader').innerHTML = 'Available Events'
        document.getElementById('content').innerHTML = ''
        const organization = document.getElementById('organization').innerHTML
        const username = document.getElementById('username').innerHTML


          const range = response.result
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                const row = range.values[i]


        const button = document.createElement('button')
        button.setAttribute('onclick', 'assignName(this.id);')
        button.className = 'btn btn-primary button2'
        button.className += ' '
        button.className += 'editinput staffedclass'
        button.type = 'submit'
        button.innerHTML = 'Accept Event'

        



                const ul = document.createElement('ul')
                const div = document.createElement('div')
                ul.id = 'ulidnumber' + i
                div.id ='dividnumber' + i

                div.className = 'columns'
                ul.className = 'price'

                 const pre = document.getElementById('content')
                div.appendChild(ul)
                pre.appendChild(div)

             const ulSelector = document.getElementById('ulidnumber' + i)
             const divSelector = document.getElementById('dividnumber' + i)

             const li1 = document.createElement('li')
             li1.className = 'grey'
            const li1InvisibleValue = document.createElement('button')

             const li2 = document.createElement('li')
              const li2InvisibleValue = document.createElement('button')

             const li3 = document.createElement('li')
              const li3InvisibleValue = document.createElement('button')

             const li4 = document.createElement('li')
              const li4InvisibleValue = document.createElement('button')

             const li5 = document.createElement('li')
              const li5InvisibleValue = document.createElement('button')

           
              
              const li7 = document.createElement('li')
              const li7InvisibleValue = document.createElement('button')
              
              const li8 = document.createElement('li')
              const li8InvisibleValue = document.createElement('button')

             const invisibleButton = document.createElement('button')
             li5.className = 'buttonlistitem'
            li5.className += 'grey'

            




             li1.innerHTML = row[0]
            li1InvisibleValue.value = row[0]
            li1InvisibleValue.className = 'venueclass'
            li1.appendChild(li1InvisibleValue)

            li2.innerHTML = row[1]
             li2InvisibleValue.value = row[1]
            li2InvisibleValue.className = 'locationclass'
            li2.appendChild(li2InvisibleValue)

            li3.innerHTML = row[2]
             li3InvisibleValue.value = row[2]
            li3InvisibleValue.className = 'dateclass'
            li3.appendChild(li3InvisibleValue)

            li4.innerHTML = row[3] + ' ' + '-' + ' ' + row[4]
            li4InvisibleValue.value = row[3]
            li4InvisibleValue.className = 'beginsclass'
            li4.appendChild(li4InvisibleValue)
            li4InvisibleValue.appendChild(li5InvisibleValue)

            li5InvisibleValue.value = row[4]
            li5InvisibleValue.className = 'endsclass'

                
                
            li7.innerHTML = row[8] + ' Staff Members Needed'
            li7InvisibleValue.value = row[8]
            li7InvisibleValue.className = 'numberofstaffclass'
            li7.appendChild(li7InvisibleValue)
            li7.className = 'blue'
            
            li8.innerHTML = row[7]
            li8InvisibleValue.value = row[7]
            li8InvisibleValue.className = 'specclass'
            li8.appendChild(li8InvisibleValue)
            li8.className = 'orange'
                
            


            li5.appendChild(button)
           



             ulSelector.appendChild(li1)
                ulSelector.appendChild(li2)
                 ulSelector.appendChild(li3)
                ulSelector.appendChild(li4)
  
                ulSelector.appendChild(li7)
                ulSelector.appendChild(li8)
                ulSelector.appendChild(li5)
                
        for (j = 9; j < (parseInt(row[8])+9); j++) {    
            
                    
                  const liLoop = document.createElement('li')
                  const liLoopInvisibleValue = document.createElement('button')
                    
                  liLoop.innerHTML = row[j]
            liLoopInvisibleValue.value = row[j]
            liLoopInvisibleValue.className = 'staffedclass loop'
            liLoopInvisibleValue.id = 'staffednumber' + j
            liLoop.appendChild(liLoopInvisibleValue)
                    
                ulSelector.appendChild(liLoop)
            
        liLoopInvisibleValue.style.display = 'none'
            
            
            if (row[j] === 'Not Staffed') {
                
                liLoop.style.display = 'none'
            }

            
           // console.log(liLoopInvisibleValue)
                    
                }
                
                ulSelector.appendChild(li5)
                
                
                
                
                

                divSelector.style.display = 'none'

//This loops through all of the events and only displays the ones that aren't fully staffed
 for (j = 9; j < (parseInt(row[8])+9); j++) {    

               if (row[5] === organization && row[j] === 'Not Staffed') {
                   
                   


            divSelector.style.display = 'block'
                   


                   li1InvisibleValue.style.display = 'none'
                   li2InvisibleValue.style.display = 'none'
                   li3InvisibleValue.style.display = 'none'
                   li4InvisibleValue.style.display = 'none'
                   li5InvisibleValue.style.display = 'none'
                   invisibleButton.style.display = 'none'
                   li7InvisibleValue.style.display = 'none'
                   li8InvisibleValue.style.display = 'none'
                   
               }
                   
           //This hides events that the user is already staffed for        
                   if (row[j] === username) {
                       
                       button.parentElement.parentElement.style.display = 'none'
                       button.parentElement.parentElement.parentElement.style.display = 'none'
                       divSelector.style.display = 'none'
                   

                   }
               
                }
                
                
                
                
            }
              
              
           

               const input = document.getElementsByClassName('input')
              const editInput = document.getElementsByClassName('editinput')

     

        for (i = 0; i < editInput.length; i++) {
         editInput[i].id = 'editbuttonnumber' + i
     }
              
              
              button.parentElement.parentElement.children

          } else {
            appendPre('There are no events.')
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message)
        })
      }





 




/*After the user hits 'Accept Event', this function assigns their name to the event. It then gathers a multidimensional arrays of usernames, then runs 
a function to make the changes to the spreadsheet, as well as a function to display a mesage*/
function assignName(clicked_id) {

    const username = document.getElementById('username').innerHTML
    
    const clickedId = document.getElementById(clicked_id)
    
    //clickedId.value = username
    
    const arrayOfValues = []
    
    for (i = 6; i < clickedId.parentElement.parentElement.children.length-1 ; i++) {
        
       arrayOfValues.push(clickedId.parentElement.parentElement.children[i].firstElementChild.value)
        
    }
    
  
    
    arrayOfValues.splice( arrayOfValues.indexOf('Not Staffed'), 1 )
    
    arrayOfValues.push(username)
    
   
    
    arrayOfValues.unshift('')
    arrayOfValues.unshift('')
    arrayOfValues.unshift('')
    arrayOfValues.unshift('')
    arrayOfValues.unshift('')
    arrayOfValues.unshift('')
    
    
    for (i = 6; i < clickedId.parentElement.parentElement.children.length-1 ; i++) {
        
        
     clickedId.parentElement.parentElement.children[i].firstElementChild.value = arrayOfValues[i]
        
    }
    
    
    
    staffedClassChanges()
    
    acceptEventMessage()
    
    
    
    

}

/* This function activates when the user cancels an event. It changes their name to 'Not Staffed'. It then gathers a multidimensional arrays of usernames, then runs 
a function to make the changes to the spreadsheet, as well as a function to display a mesage*/
function clearNameValues(clicked_id) {


 const username = document.getElementById('username').innerHTML
    
    const clickedId = document.getElementById(clicked_id)

    
for (i = 6; i < clickedId.parentElement.parentElement.children.length; i++) {
    
        
       if (clickedId.parentElement.parentElement.children[i].firstElementChild.value === username) {
    
            clickedId.parentElement.parentElement.children[i].firstElementChild.value = 'Not Staffed'

        
    }
    
    

}
    
    staffedClassChanges()
    cancelEventMessage()
    
}
    
    


//This displays a message notifying the user that they cancelled the event
function cancelEventMessage() {

 
       document.getElementById('content').innerHTML = ''
       document.getElementById('contentheader').innerHTML = ''
       document.getElementById('content').innerHTML = 'You have cancelled the event'

  }


// This displays a message notifying the user that they accepted the event
function acceptEventMessage() {

 
       document.getElementById('content').innerHTML = ''
       document.getElementById('contentheader').innerHTML = ''
       document.getElementById('content').innerHTML = 'You are now staffed for the event!'

  }


// This runs a function that displays a form for the admin to create an event with
    function createEventForm() {

        const contentSelector = document.getElementById('content')
        contentSelector.innerHTML = ''
        document.getElementById('contentheader').innerHTML = 'Create Event'

        const divRow1 = document.createElement('div')
        const divCol1 = document.createElement('div')
        divRow1.className = 'row'
        divCol1.className = 'form-group col-md-6 col-sm-12'
        const venue = document.createElement('input')
        venue.type = 'text'
        venue.className = 'form-control'
        venue.id = 'venue'
        venue.placeholder = 'Enter the name of the venue'
        const venueLabel = document.createElement('label')
        venueLabel.innerHTML = 'Venue'
        divCol1.appendChild(venueLabel)
        divCol1.appendChild(venue)

        const divCol2 = document.createElement('div')
        divCol2.className = 'form-group col-md-6 col-sm-12'
        const date = document.createElement('input')
        date.type = 'date'
        date.className = 'form-control'
        date.id = 'date'
        date.placeholder = 'Enter the date of the event'
        const dateLabel = document.createElement('label')
        dateLabel.innerHTML = 'Date'
        divCol2.appendChild(dateLabel)
        divCol2.appendChild(date)

        divRow1.appendChild(divCol1)
        divRow1.appendChild(divCol2)

        contentSelector.appendChild(divRow1)




        const divRow2 = document.createElement('div')
        const divCol3 = document.createElement('div')
        divRow2.className = 'row'
        divCol3.className = 'form-group col-md-6 col-sm-12'
        const begins = document.createElement('input')
        begins.type = 'text'
        begins.className = 'form-control'
        begins.id = 'begins'
        begins.placeholder = 'Enter the time the event starts'
        const beginsLabel = document.createElement('label')
        beginsLabel.innerHTML = 'Begins At'
        divCol3.appendChild(beginsLabel)
        divCol3.appendChild(begins)

        const divCol4 = document.createElement('div')
        divCol4.className = 'form-group col-md-6 col-sm-12'
        const ends = document.createElement('input')
        ends.type = 'text'
        ends.className = 'form-control'
        ends.id = 'ends'
        ends.placeholder = 'Enter the time the event ends'
        const endsLabel = document.createElement('label')
        endsLabel.innerHTML = 'Ends at'
        divCol4.appendChild(endsLabel)
        divCol4.appendChild(ends)

         divRow2.appendChild(divCol3)
        divRow2.appendChild(divCol4)

        contentSelector.appendChild(divRow2)
        
        const divRow3 = document.createElement('div')
        const divCol5 = document.createElement('div')
        const divCol6 = document.createElement('div')

         const location = document.createElement('input')
        location.type = 'text'
        location.className = 'form-control'
        location.id = 'location'
        location.placeholder = 'Enter the address of the venue'
        const locationLabel = document.createElement('label')
        locationLabel.innerHTML = 'Location'
        divCol5.appendChild(locationLabel)
        divCol5.appendChild(location)
        
        
        const numberOfStaff = document.createElement('input')
        numberOfStaff.type = 'number'
        numberOfStaff.className = 'form-control'
        numberOfStaff.id = 'numberOfStaff'
        numberOfStaff.placeholder = 'Enter the number of staff needed'
        const numberOfStaffLabel = document.createElement('label')
        numberOfStaffLabel.innerHTML = '# of Staff'
        divCol6.appendChild(numberOfStaffLabel)
        divCol6.appendChild(numberOfStaff)
        
         
        
        divCol5.className = 'form-group col-md-6 col-sm-12'
         divCol6.className = 'form-group col-md-6 col-sm-12'
        divRow3.className = 'row'
         divRow3.appendChild(divCol5)
        divRow3.appendChild(divCol6)
        contentSelector.appendChild(divRow3)
        
        
        const specs = document.createElement('input')
        specs.type = 'text'
        specs.className = 'form-control'
        specs.id = 'specs'
        specs.placeholder = 'Enter the types of staff needed, eg. 2 Chefs, 5 Brand Ambassadors, ect'
        const specsLabel = document.createElement('label')
        specsLabel.innerHTML = 'Specifications'
        contentSelector.appendChild(specsLabel)
        contentSelector.appendChild(specs)
        
        
        

        const button = document.createElement('button')
        button.type = 'Submit'
        button.className = 'btn btn-primary button2'
        button.innerHTML = 'Create Event'
        button.setAttribute('onclick', 'execute()')
        button.id = 'createeventbutton'
        contentSelector.appendChild(button)


    }



// This is a function that takes all of the values from the 'Create Event Form' and stores the data in Google Sheets
function execute() {

    const venue = document.getElementById('venue').value
    const location = document.getElementById('location').value
    const date = document.getElementById('date').value
    const begins = document.getElementById('begins').value
    const ends = document.getElementById('ends').value
    const organization = document.getElementById('organization').innerHTML
    const specs = document.getElementById('specs').value
    const numberOfStaff = document.getElementById('numberOfStaff').value

    return gapi.client.sheets.spreadsheets.values.append({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'A:DS',
      'includeValuesInResponse': 'false',
      'insertDataOption': 'INSERT_ROWS',
      'responseDateTimeRenderOption': 'FORMATTED_STRING',
      'responseValueRenderOption': 'FORMATTED_VALUE',
      'valueInputOption': 'USER_ENTERED',
      'resource': {
        'values': [
          [
            venue,
            location,
            date,
            begins,
            ends,
            organization,
              'Not Checked In',
              specs,
              numberOfStaff,
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
               'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
              'Not Staffed',
          ]
        ]
      }
    })
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
        document.getElementById('content').innerHTML = ''
       document.getElementById('content').innerHTML = 'The event has been created!'
        }, function(error) {
        })
  }


/* This is the preliminary step for an Administrator to sign up. It makes sure that the 'Sign Up' page's form is fully
filled out before running the function that signs the Admin up*/
function preAdminSignUp() {

    const fullName = document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const organization = document.getElementById('organization').value

    if ( email.length === 0 || password.length === 0 || organization.length === 0 ) {
        const message = document.createElement('p')
                    message.innerHTML = 'Sorry, an error ocurred while signing up!'
                    message.style.color = 'red'
                    document.getElementById('content').innerHTML = ''
                    document.getElementById('content').appendChild(message)
    } else {
        adminSignUp()
    }
}





// This function takes the values of the signup form and stores them in the Sheets
function adminSignUp() {

    const fullName = document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const organization = document.getElementById('organization').value


    return gapi.client.sheets.spreadsheets.values.append({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'Sheet2!H:M',
      'includeValuesInResponse': 'false',
      'insertDataOption': 'INSERT_ROWS',
      'responseDateTimeRenderOption': 'FORMATTED_STRING',
      'responseValueRenderOption': 'FORMATTED_VALUE',
      'valueInputOption': 'USER_ENTERED',
      'resource': {
        'values': [
          [
            fullName,
            email,
            'Admin',
            organization,
              '',
              password,
          ]
        ]
      }
    })
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).


          const message = document.createElement('p')
                    document.getElementById('content').innerHTML = ''
                    message.innerHTML = 'You are now signed up! Log in to continue'
                    message.style.color = '#31B0D5'
                    document.getElementById('content').appendChild(message)

        }, function(error) {

        })
  }


/* This grabs the email and password entered, correlates it to the sheets, and signs the user in,
rendering a different menu depending on whether the user is an Admin or Employee*/
function logIn() {

    const email = document.getElementById('email').value

    const example = document.getElementById('example').value

    const entireEmail = email + '@' + example

    const password = document.getElementById('password').value


    return gapi.client.sheets.spreadsheets.values.get({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'Sheet2!M2:R',
      'dateTimeRenderOption': 'FORMATTED_STRING',
      'majorDimension': 'ROWS',
      'valueRenderOption': 'FORMATTED_VALUE'
    })
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
        const row = response.result.values



       const range = response.result
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                const row = range.values[i]




            if ( password === row[5] && entireEmail === row[1] ) {
                document.getElementById('content').innerHTML = ''


                if (row[2] === 'Admin') {
                const homeButton = document.getElementById('homebutton')
                homeButton.class = 'dropdown-toggle'
                homeButton.setAttribute('href', '#')
                homeButton.setAttribute('onclick', 'listAllEvents(); collapse();')
                homeButton.innerHTML = 'View All Events'

                const aboutButton = document.getElementById('aboutbutton')
                aboutButton.setAttribute('href', '#')
                aboutButton.setAttribute('onclick', 'createEventForm(); collapse();')
                aboutButton.innerHTML = 'Create Event'

                const featuresButton = document.getElementById('featuresbutton')
                featuresButton.setAttribute('href', '#')
                featuresButton.setAttribute('onclick', 'editEventList(); collapse();')
                featuresButton.innerHTML = 'Edit Events'

                const pricingButton = document.getElementById('pricingbutton')
                pricingButton.setAttribute('href', '#')
                pricingButton.setAttribute('onclick', 'inviteUserForm(); collapse();')
                pricingButton.innerHTML = 'Invite User'
                } else {

                    const homeButton = document.getElementById('homebutton')
                homeButton.setAttribute('href', '#')
                homeButton.setAttribute('onclick', 'listAllEvents(); collapse();')
                homeButton.innerHTML = 'View All Events'

                const aboutButton = document.getElementById('aboutbutton')
                aboutButton.setAttribute('href', '#')
                aboutButton.setAttribute('onclick', 'viewAvailableEvents(); collapse();')
                aboutButton.innerHTML = 'View Available Events'

                const featuresButton = document.getElementById('featuresbutton')
                featuresButton.setAttribute('href', '#')
                featuresButton.setAttribute('onclick', 'viewYourEvents(); collapse();')
                featuresButton.innerHTML = 'View Your Events'

                const pricingButton = document.getElementById('pricingbutton')
                pricingButton.setAttribute('href', '#')
                pricingButton.setAttribute('onclick', 'cancelEventList(); collapse();')
                pricingButton.innerHTML = 'Cancel An Event'


                }


                document.getElementById('demobutton').innerHTML = ''
                document.getElementById('login').innerHTML = ''

                const loginButton = document.getElementById('button')
                 loginButton.setAttribute('onclick', 'handleSignoutClick()')
                loginButton.setAttribute('href', 'login.html')
                loginButton.className = 'btn btn-primary button2'
                loginButton.innerHTML = 'Log Out'

                const welcomeArea = document.getElementById('loginpage')

                welcomeArea.innerHTML = ''
                welcomeArea.className = 'container welcomearea'


                const h3 = document.createElement('h3')
                h3.id = 'organization'
                h3.className = 'organization'
                const h3two = document.createElement('h3')
                h3two.id= 'username'
                const org = document.createTextNode(row[3])
                const welcomeUser = document.createTextNode(row[0])

                h3.appendChild(org)
                h3two.appendChild(welcomeUser)

                welcomeArea.appendChild(h3)
                welcomeArea.appendChild(h3two)

                const welcome = document.createElement('h2')
                const welcomeMessage = document.createTextNode('Welcome')

                welcome.appendChild(welcomeMessage)


                document.getElementById('content').appendChild(welcome)









                document.getElementById('content').setAttribute('style', 'padding-bottom: 210px')








            }

        }
          }
    






        }, function(error) {

        })
  }


/* This pops up a list of events for the user and gives them the option to cancel the event */
function cancelEventList() {
       return gapi.client.sheets.spreadsheets.values.get({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
   range: 'Sheet1!A2:DS',
        }).then(function(response) {

        document.getElementById('contentheader').innerHTML = 'Cancel Event'
        document.getElementById('content').innerHTML = ''
        const organization = document.getElementById('organization').innerHTML
        const username = document.getElementById('username').innerHTML


          const range = response.result
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                const row = range.values[i]


        const button = document.createElement('button')
        button.setAttribute('onclick', 'clearNameValues(this.id);')
        button.className = 'btn btn-primary button3'
        button.className += ' '
        button.className += 'input'
        button.value = row[5]
        button.type = 'submit'
        button.innerHTML = 'Cancel Event'
        button.id = 'buttonidnumber' + i


        // Print columns A and E, which correspond to indices 0 and 4
                const eventInfo = [ row[0], row[1], row[2], row[3], row[4], row[5], row[6] ]




            const ul = document.createElement('ul')
                const div = document.createElement('div')
                ul.id = 'ulidnumber' + i
                div.id ='dividnumber' + i

                div.className = 'columns'
                ul.className = 'price'

                 const pre = document.getElementById('content')
                div.appendChild(ul)
                pre.appendChild(div)

             const ulSelector = document.getElementById('ulidnumber' + i)
             const divSelector = document.getElementById('dividnumber' + i)

             const li1 = document.createElement('li')
             li1.className = 'grey'
            const li1InvisibleValue = document.createElement('button')

             const li2 = document.createElement('li')
              const li2InvisibleValue = document.createElement('button')

             const li3 = document.createElement('li')
              const li3InvisibleValue = document.createElement('button')

             const li4 = document.createElement('li')
              const li4InvisibleValue = document.createElement('button')

             const li5 = document.createElement('li')
              const li5InvisibleValue = document.createElement('button')

           
              
              const li7 = document.createElement('li')
              const li7InvisibleValue = document.createElement('button')
              
              const li8 = document.createElement('li')
              const li8InvisibleValue = document.createElement('button')

             const invisibleButton = document.createElement('button')
             li5.className = 'buttonlistitem'
            li5.className += 'grey'

            




             li1.innerHTML = row[0]
            li1InvisibleValue.value = row[0]
            li1InvisibleValue.className = 'venueclass'
            li1.appendChild(li1InvisibleValue)

            li2.innerHTML = row[1]
             li2InvisibleValue.value = row[1]
            li2InvisibleValue.className = 'locationclass'
            li2.appendChild(li2InvisibleValue)

            li3.innerHTML = row[2]
             li3InvisibleValue.value = row[2]
            li3InvisibleValue.className = 'dateclass'
            li3.appendChild(li3InvisibleValue)

            li4.innerHTML = row[3] + ' ' + '-' + ' ' + row[4]
            li4InvisibleValue.value = row[3]
            li4InvisibleValue.className = 'beginsclass'
            li4.appendChild(li4InvisibleValue)
            li4InvisibleValue.appendChild(li5InvisibleValue)

            li5InvisibleValue.value = row[4]
            li5InvisibleValue.className = 'endsclass'

                
                
            li7.innerHTML = row[8] + ' Staff Members Needed'
            li7InvisibleValue.value = row[8]
            li7InvisibleValue.className = 'numberofstaffclass'
            li7.appendChild(li7InvisibleValue)
            
            li8.innerHTML = row[7]
            li8InvisibleValue.value = row[7]
            li8InvisibleValue.className = 'specclass'
            li8.appendChild(li8InvisibleValue)
                
            


            li5.appendChild(button)
           



             ulSelector.appendChild(li1)
                ulSelector.appendChild(li2)
                 ulSelector.appendChild(li3)
                ulSelector.appendChild(li4)
  
                ulSelector.appendChild(li7)
                ulSelector.appendChild(li8)
                ulSelector.appendChild(li5)
                
        for (j = 9; j < (parseInt(row[8])+9); j++) {    
            
                    
                  const liLoop = document.createElement('li')
                  const liLoopInvisibleValue = document.createElement('button')
                    
                  liLoop.innerHTML = row[j]
            liLoopInvisibleValue.value = row[j]
            liLoopInvisibleValue.className = 'staffedclass loop'
            liLoopInvisibleValue.id = 'staffednumber' + j
            liLoop.appendChild(liLoopInvisibleValue)
                    
                ulSelector.appendChild(liLoop)
            
        liLoopInvisibleValue.style.display = 'none'
            
            

                
                liLoop.style.display = 'none'
    

            
           // console.log(liLoopInvisibleValue)
                    
                }
                
                ulSelector.appendChild(li5)
                
                
                
                
                

                divSelector.style.display = 'none'


 for (j = 9; j < (parseInt(row[8])+9); j++) {    

               if (row[5] === organization && row[j] === username) {
                   
                   


            divSelector.style.display = 'block'
                   


                   li1InvisibleValue.style.display = 'none'
                   li2InvisibleValue.style.display = 'none'
                   li3InvisibleValue.style.display = 'none'
                   li4InvisibleValue.style.display = 'none'
                   li5InvisibleValue.style.display = 'none'
                   invisibleButton.style.display = 'none'
                   li7InvisibleValue.style.display = 'none'
                   li8InvisibleValue.style.display = 'none'
                   li7.style.display = 'none'
                   li8.style.display = 'none'
                   
               }
                   
                   
        
               
                }
                
                
                
                
            }
              
              
           

               const input = document.getElementsByClassName('input')
              const editInput = document.getElementsByClassName('editinput')

     

        for (i = 0; i < editInput.length; i++) {
         editInput[i].id = 'editbuttonnumber' + i
     }
              
              
              button.parentElement.parentElement.children

          } else {
            appendPre('There are no events.')
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message)
        })
      }













/* This pops up a list of events for the admin and gives them the option to delete or edit */
function editEventList() {
    return gapi.client.sheets.spreadsheets.values.get({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
   range: 'Sheet1!A2:DS',
        }).then(function(response) {

        document.getElementById('contentheader').innerHTML = 'Edit Events'
        document.getElementById('content').innerHTML = ''
        const organization = document.getElementById('organization').innerHTML
        const username = document.getElementById('username').innerHTML


          const range = response.result
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                const row = range.values[i]


        const button = document.createElement('button')
        button.setAttribute('onclick', 'changeValueToInnerHtml(this.id)')
        button.className = 'btn btn-primary button2'
        button.className += ' '
        button.className += 'editinput'
 //       button.value = row[5]
        button.type = 'submit'
        button.innerHTML = 'Edit Event'

         const button2 = document.createElement('button')
        button2.setAttribute('onclick', 'clearEventValues(this.id); staffedClassChanges(); venueClassChanges(); locationClassChanges(); dateClassChanges(); beginsClassChanges(); endsClassChanges(); orgClassChanges(); specClassChanges(); numberofstaffClassChanges();')
        button2.className = 'btn btn-primary button3'
        button2.className += ' '
        button2.className += 'input'
        button2.type = 'submit'
        button2.innerHTML = 'Delete Event'


        // Print columns A and E, which correspond to indices 0 and 4
                const eventInfo = [ row[0], row[1], row[2], row[3], row[4], row[5], row[6] ]




                const ul = document.createElement('ul')
                const div = document.createElement('div')
                ul.id = 'ulidnumber' + i
                div.id ='dividnumber' + i

                div.className = 'columns'
                ul.className = 'price'

                 const pre = document.getElementById('content')
                div.appendChild(ul)
                pre.appendChild(div)

             const ulSelector = document.getElementById('ulidnumber' + i)
             const divSelector = document.getElementById('dividnumber' + i)

             const li1 = document.createElement('li')
             li1.className = 'grey'
            const li1InvisibleValue = document.createElement('button')

             const li2 = document.createElement('li')
              const li2InvisibleValue = document.createElement('button')

             const li3 = document.createElement('li')
              const li3InvisibleValue = document.createElement('button')

             const li4 = document.createElement('li')
              const li4InvisibleValue = document.createElement('button')

             const li5 = document.createElement('li')
              const li5InvisibleValue = document.createElement('button')

           
              
              const li7 = document.createElement('li')
              const li7InvisibleValue = document.createElement('button')
              
              const li8 = document.createElement('li')
              const li8InvisibleValue = document.createElement('button')

             const invisibleButton = document.createElement('button')
             li5.className = 'buttonlistitem'
            li5.className += 'grey'

            invisibleButton.className = 'orgclass'
                invisibleButton.value = row[5]




             li1.innerHTML = row[0]
            li1InvisibleValue.value = row[0]
            li1InvisibleValue.className = 'venueclass'
            li1.appendChild(li1InvisibleValue)

            li2.innerHTML = row[1]
             li2InvisibleValue.value = row[1]
            li2InvisibleValue.className = 'locationclass'
            li2.appendChild(li2InvisibleValue)

            li3.innerHTML = row[2]
             li3InvisibleValue.value = row[2]
            li3InvisibleValue.className = 'dateclass'
            li3.appendChild(li3InvisibleValue)

            li4.innerHTML = row[3] + ' ' + '-' + ' ' + row[4]
            li4InvisibleValue.value = row[3]
            li4InvisibleValue.className = 'beginsclass'
            li4.appendChild(li4InvisibleValue)
            li4InvisibleValue.appendChild(li5InvisibleValue)

            li5InvisibleValue.value = row[4]
            li5InvisibleValue.className = 'endsclass'

                
                
            li7.innerHTML = row[8] + ' Staff Members Needed'
            li7InvisibleValue.value = row[8]
            li7InvisibleValue.className = 'numberofstaffclass'
            li7.appendChild(li7InvisibleValue)
            
            li8.innerHTML = row[7]
            li8InvisibleValue.value = row[7]
            li8InvisibleValue.className = 'specclass'
            li8.appendChild(li8InvisibleValue)
                
            


            li5.appendChild(button)
            li5.appendChild(button2)


            button2.appendChild(invisibleButton)




             ulSelector.appendChild(li1)
                ulSelector.appendChild(li2)
                 ulSelector.appendChild(li3)
                ulSelector.appendChild(li4)
  
                ulSelector.appendChild(li7)
                ulSelector.appendChild(li8)
                ulSelector.appendChild(li5)
                
        for (j = 9; j < (parseInt(row[8])+9); j++) {     
                    
                  const liLoop = document.createElement('li')
                  const liLoopInvisibleValue = document.createElement('button')
                    
                  liLoop.innerHTML = row[j]
            liLoopInvisibleValue.value = row[j]
            liLoopInvisibleValue.className = 'staffedclass'
            liLoopInvisibleValue.id = 'staffednumber' + j
            liLoop.appendChild(liLoopInvisibleValue)
                    
                ulSelector.appendChild(liLoop)
            
        liLoopInvisibleValue.style.display = 'none'

            
           // console.log(liLoopInvisibleValue)
                    
                }
                
                ulSelector.appendChild(li5)
                
                
                
                
                

                divSelector.style.display = 'none'




               if (row[5] === organization) {


            divSelector.style.display = 'block'


                   li1InvisibleValue.style.display = 'none'
                   li2InvisibleValue.style.display = 'none'
                   li3InvisibleValue.style.display = 'none'
                   li4InvisibleValue.style.display = 'none'
                   li5InvisibleValue.style.display = 'none'
                   invisibleButton.style.display = 'none'
                   li7InvisibleValue.style.display = 'none'
                   li8InvisibleValue.style.display = 'none'
                   



                }
            }

               const input = document.getElementsByClassName('input')
              const editInput = document.getElementsByClassName('editinput')

     for (i = 0; i < input.length; i++) {
         input[i].id = 'buttonnumber' + i
     }

        for (i = 0; i < editInput.length; i++) {
         editInput[i].id = 'editbuttonnumber' + i
     }

          } else {
            appendPre('There are no events.')
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message)
        })
      }



// If the admin chooses to delete an event, this grabs all of the values of the event and clears them
function clearEventValues(clicked_id) {



    const clearValues = document.getElementById(clicked_id).parentElement.parentElement.children
    
    document.getElementById(clicked_id).firstElementChild.value = ''
    document.getElementById(clicked_id).parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.value = ''
    
    
    for (i = 0; i < clearValues.length; i++) {
        clearValues[i].firstElementChild.value = '' 
        
        
    }
    
    
}



//This applies whatever changes are made to the Specifications of an event
function specClassChanges() {

    const specclass = document.getElementsByClassName('specclass')



    const specclassArrayPushedValues = []


   for (i = 0; i < specclass.length; i++) {

    //   input[i].defaultValue = 'Not Staffed'
     const specclassArray = specclass[i].value


     specclassArrayPushedValues.push(specclassArray)



         //This pulls an array of inputs


 /*   if (input[i].value !== '') {
    const inputValue  = input[i].value
    }*/


   }
    
    return gapi.client.sheets.spreadsheets.values.update({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'Sheet1!H2',
  //    'includeValuesInResponse': 'true',
      'responseDateTimeRenderOption': 'FORMATTED_STRING',
      'responseValueRenderOption': 'FORMATTED_VALUE',
      'valueInputOption': 'USER_ENTERED',
  //     'metadataValue': 'Not Staffed',
      'resource': {

        'values': [

            specclassArrayPushedValues

        ],
        'majorDimension': 'COLUMNS',
      }
    })



        .then(function(response) {
          // Handle the results here (response.result has the parsed body).


       //row[0] = input[0].value


        }, function(error) {

        })
  }
    
    
    
//This applies whatever changes are made to the Staff Number of an event

function numberofstaffClassChanges() {

    const numberofstaffclass = document.getElementsByClassName('numberofstaffclass')



    const numberofstaffclassArrayPushedValues = []


   for (i = 0; i < numberofstaffclass.length; i++) {

    //   input[i].defaultValue = 'Not Staffed'
     const numberofstaffclassArray = numberofstaffclass[i].value


     numberofstaffclassArrayPushedValues.push(numberofstaffclassArray)



         //This pulls an array of inputs


 /*   if (input[i].value !== '') {
    const inputValue  = input[i].value
    }*/


   }
    
    return gapi.client.sheets.spreadsheets.values.update({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'Sheet1!I2',
  //    'includeValuesInResponse': 'true',
      'responseDateTimeRenderOption': 'FORMATTED_STRING',
      'responseValueRenderOption': 'FORMATTED_VALUE',
      'valueInputOption': 'USER_ENTERED',
  //     'metadataValue': 'Not Staffed',
      'resource': {

        'values': [

            numberofstaffclassArrayPushedValues

        ],
        'majorDimension': 'COLUMNS',
      }
    })



        .then(function(response) {
          // Handle the results here (response.result has the parsed body).


       //row[0] = input[0].value


        }, function(error) {

        })
  }



//This applies whatever changes are made to the Venue of an event

function venueClassChanges() {

    const venueclass = document.getElementsByClassName('venueclass')



    const venueclassArrayPushedValues = []


   for (i = 0; i < venueclass.length; i++) {

    //   input[i].defaultValue = 'Not Staffed'
     const venueclassArray = venueclass[i].value


     venueclassArrayPushedValues.push(venueclassArray)



         //This pulls an array of inputs


 /*   if (input[i].value !== '') {
    const inputValue  = input[i].value
    }*/


   }







   return gapi.client.sheets.spreadsheets.values.update({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'Sheet1!A2',
  //    'includeValuesInResponse': 'true',
      'responseDateTimeRenderOption': 'FORMATTED_STRING',
      'responseValueRenderOption': 'FORMATTED_VALUE',
      'valueInputOption': 'USER_ENTERED',
  //     'metadataValue': 'Not Staffed',
      'resource': {

        'values': [

            venueclassArrayPushedValues

        ],
        'majorDimension': 'COLUMNS',
      }
    })



        .then(function(response) {
          // Handle the results here (response.result has the parsed body).


       //row[0] = input[0].value


        }, function(error) {

        })
  }





//This applies whatever changes are made to the Location of an event

function locationClassChanges() {

    const locationclass = document.getElementsByClassName('locationclass')



    const locationclassArrayPushedValues = []


   for (i = 0; i < locationclass.length; i++) {

    //   input[i].defaultValue = 'Not Staffed'
     const locationclassArray = locationclass[i].value


     locationclassArrayPushedValues.push(locationclassArray)



         //This pulls an array of inputs


 /*   if (input[i].value !== '') {
    const inputValue  = input[i].value
    }*/


   }







   return gapi.client.sheets.spreadsheets.values.update({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'Sheet1!B2',
    //  'includeValuesInResponse': 'true',
      'responseDateTimeRenderOption': 'FORMATTED_STRING',
      'responseValueRenderOption': 'FORMATTED_VALUE',
      'valueInputOption': 'USER_ENTERED',
  //     'metadataValue': 'Not Staffed',
      'resource': {

        'values': [

            locationclassArrayPushedValues

        ],
        'majorDimension': 'COLUMNS',
      }
    })



        .then(function(response) {
          // Handle the results here (response.result has the parsed body).

       //row[0] = input[0].value


        }, function(error) {
        })
  }




//This applies whatever changes are made to the Date of an event

function dateClassChanges() {

    const dateclass = document.getElementsByClassName('dateclass')



    const dateclassArrayPushedValues = []


   for (i = 0; i < dateclass.length; i++) {

    //   input[i].defaultValue = 'Not Staffed'
     const dateclassArray = dateclass[i].value


     dateclassArrayPushedValues.push(dateclassArray)



         //This pulls an array of inputs


 /*   if (input[i].value !== '') {
    const inputValue  = input[i].value
    }*/


   }







   return gapi.client.sheets.spreadsheets.values.update({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'C2',
  //    'includeValuesInResponse': 'true',
      'responseDateTimeRenderOption': 'FORMATTED_STRING',
      'responseValueRenderOption': 'FORMATTED_VALUE',
      'valueInputOption': 'USER_ENTERED',
  //     'metadataValue': 'Not Staffed',
      'resource': {

        'values': [

            dateclassArrayPushedValues

        ],
        'majorDimension': 'COLUMNS',
      }
    })



        .then(function(response) {
          // Handle the results here (response.result has the parsed body).

       //row[0] = input[0].value


        }, function(error) {
        })
  }




//This applies whatever changes are made to the ending time of an event
function endsClassChanges() {

    const endsclass = document.getElementsByClassName('endsclass')



    const endsclassArrayPushedValues = []


   for (i = 0; i < endsclass.length; i++) {

    //   input[i].defaultValue = 'Not Staffed'
     const endsclassArray = endsclass[i].value


     endsclassArrayPushedValues.push(endsclassArray)



         //This pulls an array of inputs


 /*   if (input[i].value !== '') {
    const inputValue  = input[i].value
    }*/


   }







   return gapi.client.sheets.spreadsheets.values.update({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'Sheet1!E2',
    //  'includeValuesInResponse': 'true',
      'responseDateTimeRenderOption': 'FORMATTED_STRING',
      'responseValueRenderOption': 'FORMATTED_VALUE',
      'valueInputOption': 'USER_ENTERED',
  //     'metadataValue': 'Not Staffed',
      'resource': {

        'values': [

            endsclassArrayPushedValues

        ],
        'majorDimension': 'COLUMNS',
      }
    })



        .then(function(response) {
          // Handle the results here (response.result has the parsed body).

       //row[0] = input[0].value


        }, function(error) {
        })
  }




//This applies whatever changes are made to the beginning time of an event


function beginsClassChanges() {

    const beginsclass = document.getElementsByClassName('beginsclass')



    const beginsclassArrayPushedValues = []


   for (i = 0; i < beginsclass.length; i++) {

    //   input[i].defaultValue = 'Not Staffed'
     const beginsclassArray = beginsclass[i].value


     beginsclassArrayPushedValues.push(beginsclassArray)



         //This pulls an array of inputs


 /*   if (input[i].value !== '') {
    const inputValue  = input[i].value
    }*/


   }







   return gapi.client.sheets.spreadsheets.values.update({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'Sheet1!D2',
   //   'includeValuesInResponse': 'true',
      'responseDateTimeRenderOption': 'FORMATTED_STRING',
      'responseValueRenderOption': 'FORMATTED_VALUE',
      'valueInputOption': 'USER_ENTERED',
  //     'metadataValue': 'Not Staffed',
      'resource': {

        'values': [

            beginsclassArrayPushedValues

        ],
        'majorDimension': 'COLUMNS',
      }
    })



        .then(function(response) {
          // Handle the results here (response.result has the parsed body).

       //row[0] = input[0].value


        }, function(error) {
        })
  }




//This takes the multidimensional array of staff members and stores/updates the Sheets

function staffedClassAssignValues(arrayOfArrays) {
    
    
         return gapi.client.sheets.spreadsheets.values.update({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'Sheet1!J2:DS',
   //   'includeValuesInResponse': 'true',
      'responseDateTimeRenderOption': 'FORMATTED_STRING',
      'responseValueRenderOption': 'FORMATTED_VALUE',
      'valueInputOption': 'USER_ENTERED',
       

      'resource': {

        'values': arrayOfArrays,
}
    })



        .then(function(response) {
          // Handle the results here (response.result has the parsed body).

       


        }, function(error) {
        })
        
        
        
        
        
    }



//This applies whatever changes are made to the Staff of an event

function staffedClassChanges() {
    
    const ulSelector = document.getElementsByClassName('price')

//    const staffedclass = document.getElementsByClassName('staffedclass')

   
//    console.log(staffedclass)

    
const arrayOfArrays = []
    
    
      for (i = 0; i < ulSelector.length; i++) {
         ulSelector[i].children
          const someArray = []
          
          

     
          
          for (j = 6; j < ulSelector[i].children.length-1; j++) {

            
       
            
            const staffValuesOrganized = ulSelector[i].children[j].firstElementChild
            
          const staffValuesOrganizedValue = staffValuesOrganized.value
            
            someArray.push(staffValuesOrganizedValue)
            
            
   }
          
        const cutOffNumber = ulSelector[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.value
        
     //   console.log(cutOffNumber)
      //    console.log(someArray)
        
        
        arrayOfArrays.push(someArray)
          
          
              
              
              
          
          
          
      }
    
   // console.log(arrayOfArrays)
    
    
    staffedClassAssignValues(arrayOfArrays)



    
    //.querySelectorAll(".example");  
    
  }



//This applies whatever changes are made to the Organization of an event
function orgClassChanges() {


    const orgclass = document.getElementsByClassName('orgclass')



    const orgclassArrayPushedValues =[]

   for (i = 0; i < orgclass.length; i++) {

    //   input[i].defaultValue = 'Not Staffed'

     const orgclassArray = orgclass[i].value


     orgclassArrayPushedValues.push(orgclassArray)


         //This pulls an array of inputs


 /*   if (input[i].value !== '') {
    const inputValue  = input[i].value
    }*/


   }







   return gapi.client.sheets.spreadsheets.values.update({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'Sheet1!F2',
     // 'includeValuesInResponse': 'true',
      'responseDateTimeRenderOption': 'FORMATTED_STRING',
      'responseValueRenderOption': 'FORMATTED_VALUE',
      'valueInputOption': 'USER_ENTERED',
  //     'metadataValue': 'Not Staffed',
      'resource': {

        'values': [

            orgclassArrayPushedValues

        ],
        'majorDimension': 'COLUMNS',
      }
    })



        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
       document.getElementById('content').innerHTML = ''
       document.getElementById('content').innerHTML = 'Your changes have been made!'

       //row[0] = input[0].value


        }, function(error) {
        })
  }



//When the admin chooses to edit an event, this converts the data into an editable form
function changeValueToInnerHtml(clicked_id) {
    const clickedButton = document.getElementById(clicked_id)

   const selectedAreaUl = clickedButton.parentElement.parentElement
   const selectedAreaDiv = clickedButton.parentElement.parentElement.parentElement

   //const staffedValue = clickedButton.parentElement.previousElementSibling.innerText

   const beginsValue = clickedButton.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerText.split(' ')[0] + ' ' + clickedButton.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerText.split(' ')[1]

   const endsValue = clickedButton.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerText.split(' ')[3] + ' ' + clickedButton.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerText.split(' ')[4]

   const dateValue = clickedButton.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerText

   const locationValue = clickedButton.parentElement.parentElement.firstElementChild.nextElementSibling.innerText

   const venueValue = clickedButton.parentElement.parentElement.firstElementChild.innerText
   
   const numberOfStaffValue = clickedButton.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText.split(' ')[0]
   
    const specsValue = clickedButton.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText
    
    
   
   
   
   

   selectedAreaUl.style.display = 'none'


const selectedArea = document.createElement ('ul')
selectedAreaDiv.appendChild(selectedArea)

        const li1 = document.createElement('li')
        const venue = document.createElement('input')
        venue.type = 'text'
        venue.className = 'form-control'
        venue.id = 'venue'

        venue.placeholder = 'Enter the name of the venue'
        const venueLabel = document.createElement('label')
        venueLabel.innerHTML = 'Venue'
        venue.value = venueValue
        li1.appendChild(venueLabel)
        li1.appendChild(venue)
        selectedArea.appendChild(li1)

        
        const li2 = document.createElement('li')
        const location = document.createElement('input')
        location.type = 'text'
        location.className = 'form-control'
        location.id = 'location'

        location.value = locationValue
        location.placeholder = 'Enter the address of the venue'
        const locationLabel = document.createElement('label')
        locationLabel.innerHTML = 'Location'
        li2.appendChild(locationLabel)
        li2.appendChild(location)
        selectedArea.appendChild(li2)

        
        const li3 = document.createElement('li')
        const date = document.createElement('input')
        date.type = 'text'
        date.className = 'form-control'
        date.id = 'date'

        date.placeholder = 'Enter the date of the event'
        date.value = dateValue
        const dateLabel = document.createElement('label')
        dateLabel.innerHTML = 'Date'


        li3.appendChild(dateLabel)
    li3.appendChild(date)
    selectedArea.appendChild(li3)



        const li4 = document.createElement('li')
        const divRow2 = document.createElement('div')
        const divCol3 = document.createElement('div')
        divRow2.className = 'row'
        divCol3.className = 'form-group col-md-6 col-sm-12'
        const begins = document.createElement('input')
        begins.type = 'text'
        begins.className = 'form-control'
        begins.id = 'begins'

        begins.value = beginsValue
        begins.placeholder = 'Enter the time the event starts'
        const beginsLabel = document.createElement('label')
        beginsLabel.innerHTML = 'Begins At'
        divCol3.appendChild(beginsLabel)
        divCol3.appendChild(begins)



        const divCol4 = document.createElement('div')
        divCol4.className = 'form-group col-md-6 col-sm-12'
        const ends = document.createElement('input')
        ends.type = 'text'
        ends.className = 'form-control'
        ends.id = 'ends'

        ends.value = endsValue
        ends.placeholder = 'Enter the time the event ends'
        const endsLabel = document.createElement('label')
        endsLabel.innerHTML = 'Ends at'
        divCol4.appendChild(endsLabel)
        divCol4.appendChild(ends)

         divRow2.appendChild(divCol3)
        divRow2.appendChild(divCol4)

        li4.appendChild(divRow2)
        selectedArea.appendChild(li4)



      /*  const staffed = document.createElement('input')
        staffed.type = 'text'
        staffed.className = 'form-control'
        staffed.id = 'staffed'

        staffed.value = staffedValue
        staffed.placeholder = 'Enter the staff'
        const staffedLabel = document.createElement('label')
        staffedLabel.innerHTML = 'Staffed'
        selectedArea.appendChild(staffedLabel)
        selectedArea.appendChild(staffed)*/

        const li5 = document.createElement('li')
        const numberOfStaff = document.createElement('input')
        numberOfStaff.type = 'number'
        numberOfStaff.className = 'form-control'
        numberOfStaff.id = 'numberOfStaff'

        numberOfStaff.placeholder = 'Enter the number of staff members needed'
        numberOfStaff.value = numberOfStaffValue
        const numberOfStaffLabel = document.createElement('label')
        numberOfStaffLabel.innerHTML = '# of Staff Members'
    
        li5.appendChild(numberOfStaffLabel)
        li5.appendChild(numberOfStaff)
    selectedArea.appendChild(li5)
    
    
        const li6 = document.createElement('li')
        const specs = document.createElement('input')
        specs.type = 'text'
        specs.className = 'form-control'
        specs.id = 'specs'

        specs.placeholder = 'Enter the specifications of the event'
        specs.value = specsValue
        const specsLabel = document.createElement('label')
        specsLabel.innerHTML = 'Specifications'
    
        li6.appendChild(specsLabel)
        li6.appendChild(specs)
        selectedArea.appendChild(li6)
    
    
  
    
     for (j = 6; j < selectedAreaUl.children.length-1; j++) {
         const liLoop = document.createElement('li')
        const staffed = document.createElement('input')
        staffed.className = 'form-control'
         staffed.id = 'staffednumber' + j
              
         const staffedValue = selectedAreaUl.children[j].innerText
         staffed.value = staffedValue
         
         const staffedLabel = document.createElement('label')
         staffedLabel.innerHTML = 'Staffed Status'
        
         liLoop.appendChild(staffedLabel)
        liLoop.appendChild(staffed)
         selectedArea.appendChild(liLoop)
     }


        const li7 = document.createElement('li')
        const button = document.createElement('button')
        button.type = 'Submit'
        button.className = 'btn btn-primary button2'
        button.innerHTML = 'Make Changes'
        button.setAttribute('onclick', 'assignEventValues(this.id); numberofstaffClassChanges(); venueClassChanges(); locationClassChanges(); dateClassChanges(); beginsClassChanges(); endsClassChanges(); staffedClassChanges(); specClassChanges(); madeChangesMessage();')
        button.id = 'makechanges'
        li7.appendChild(button)
   
        selectedArea.appendChild(li7)


}

/* This saves the edited data of the event when the admin clicks 'Make Changes' before running a series of functions that
update the event information */
function assignEventValues(clicked_id) {

    const selector = document.getElementById(clicked_id)
    
    const hiddenUl = selector.parentElement.parentElement.previousElementSibling
    
    const displayedUl = selector.parentElement.parentElement

    
    const venue = displayedUl.firstElementChild.firstElementChild.nextElementSibling.value
    const invisibleVenue = hiddenUl.firstElementChild.firstElementChild
    invisibleVenue.value = venue
    
    const location = displayedUl.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.value
    const invisibleLocation = hiddenUl.firstElementChild.nextElementSibling.firstElementChild
    invisibleLocation.value = location
    
     const date = displayedUl.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.value
    const invisibleDate = hiddenUl.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild
    invisibleDate.value = date
    
    const begins = displayedUl.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.value
    const invisibleBegins = hiddenUl.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild
    invisibleBegins.value = begins
    
    const ends = displayedUl.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.value
    const invisibleEnds = hiddenUl.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild
    invisibleEnds.value = ends
    
    
    
    const numberOfStaffMembers = displayedUl.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.value
    const invisibleNumberOfStaffMembers = hiddenUl.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild
    invisibleNumberOfStaffMembers.value = numberOfStaffMembers
    
    const specs = displayedUl.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.value
    const invisibleSpecs = hiddenUl.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild
    invisibleSpecs.value = specs

   

    
    
    
     for (j = 6; j < displayedUl.children.length-1; j++) {
         
         const staffed = displayedUl.children[j].firstElementChild.nextElementSibling.value
         
         const invisibleStaffed = hiddenUl.children[j].firstElementChild
         
         invisibleStaffed.value = staffed
         
         if (invisibleStaffed.value === '') {

        invisibleStaffed.value = 'Not Staffed'

    }
     }
    
    

}

// This lets the admin know that the event changes have been successfully made
function madeChangesMessage() {
     document.getElementById('content').innerHTML = ''
       document.getElementById('content').innerHTML = 'Your changes have been made!'

}


/* This function creates a form for the admin to invite a staff member to the application. 
After submitting, it saves the user data into the Sheets database, and sends the staff member an 'Employee Sign Up' page link
using a Javascript Email API*/
function inviteUserForm() {

   const selectedArea = document.getElementById('content')
    document.getElementById('contentheader').innerHTML = 'Invite User'

    selectedArea.innerHTML = ''

   const form = document.createElement('form')
   form.id = 'myform'
    form.setAttribute('onsubmit', 'emailjs.sendForm("ezstaff_gmail", "ez_staff_invite", this); return false;')
    form.setAttribute('method', 'post')


   const emailLabel = document.createElement('label')
   emailLabel.innerHTML = 'Email'

   const email = document.createElement('input')

   email.type = 'text'
    email.id = 'email'
    email.autocomplete = 'off'
   email.placeholder = 'Enter the invited user email'
    email.className = 'form-control'
    email.name = 'email'
    
      
    const roleLabel = document.createElement('label')
   roleLabel.innerHTML = 'Role'

   const role = document.createElement('input')

   role.type = 'text'
    role.id = 'role'
    role.autocomplete = 'off'
   role.placeholder = 'Enter the role of the user, eg. Chef, Brand Ambassador, ect'
    role.className = 'form-control'
    role.name = 'role'
    

    
    const subject = document.createElement('input')
    subject.type = 'text'
    subject.value = 'You have been invited to EZ Staff!'
    subject.style.display = 'none'
    subject.name = 'subject'
    
    const message = document.createElement('input')
    message.type = 'text'
    message.value = 'You have Been invited to the EZ Staff Web Application! Click to get started! http://ezstaff.shiftmediamanagement.com/employeesignup.html'
    message.style.display = 'none'
    message.name = 'message'
    


    const button = document.createElement('button')
    button.value = 'Send Email'
    button.innerHTML = 'Send Email'
    button.id = 'submit'
    button.type = 'submit'
    button.className = 'btn btn-primary button2'
    button.setAttribute('onclick', 'inviteUser()')


    form.appendChild(emailLabel)
    form.appendChild(email)
    
    form.appendChild(roleLabel)
    form.appendChild(role)
    
    form.appendChild(subject)
    form.appendChild(message)

    form.appendChild(button)



    selectedArea.appendChild(form)


}


/*This function saves the staff member's name and email into the database, so that when they're signing up, the application knows
their email was invited to the app, as well as what organization they're part of
*/
function inviteUser() {

    const email = document.getElementById('email').value
    
    const role = document.getElementById('role').value

    const organization = document.getElementById('organization').innerHTML


    return gapi.client.sheets.spreadsheets.values.append({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'Sheet2!H:M',
   //   'includeValuesInResponse': 'false',
      'insertDataOption': 'INSERT_ROWS',
      'responseDateTimeRenderOption': 'FORMATTED_STRING',
      'responseValueRenderOption': 'FORMATTED_VALUE',
      'valueInputOption': 'USER_ENTERED',
      'resource': {
        'values': [
          [
              'Name',
            email,
            'Employee',
            organization,
              role,
              'Password'
          ]
        ]
      }
    })
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
        inviteMessage()

        }, function(error) {
        })
  }


// This shows the admin that their invite has been successfully sent.
function inviteMessage() {

     const selectedArea = document.getElementById('content')
     selectedArea.innerHTML = 'Your invite has been sent!'
}


// This correlates the data entered by the staff member to the data in the sheets and decides what organization they're in before signing them up
function employeeSignUp() {
    gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
          range: 'Sheet2!M2:R',
        }).then(function(response) {

        const email = document.getElementById('email').value
       

          const range = response.result

            for (i = 0; i < range.values.length; i++) {
                const row = range.values[i]


                if (email === row[1]) {

                    const randomSelectorOnPage = document.getElementById('footer')
                    
                    

                    const organization = document.createElement('input')
                    
                    const role = document.createElement('role')
                    
                    role.value = row[4]
                    
                    role.id = 'role'

                    organization.value = row[3]

                    organization.id = 'organization'


                    randomSelectorOnPage.appendChild(organization)
                    randomSelectorOnPage.appendChild(role)

                    organization.style.display = 'none'
                    role.style.display = 'none'

                    signEmployeeUp()

                } else {

                    const selectedArea = document.getElementById('content')
                    selectedArea.innerHTML = ''
                    const message = document.createElement('p')
                    message.innerHTML = 'Sorry, an error ocurred while signing up!'
                    message.style.color = 'red'
                    document.getElementById('content').appendChild(message)

                }
            }





        }, function(response) {
        })
}

// This signs the staff member up for the application
function signEmployeeUp() {
    
const role = document.getElementById('role').value
 const fullName = document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value + '(' + role + ')'
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const organization = document.getElementById('organization').value
    


    return gapi.client.sheets.spreadsheets.values.append({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'Sheet2!H:M',
      'includeValuesInResponse': 'false',
      'insertDataOption': 'INSERT_ROWS',
      'responseDateTimeRenderOption': 'FORMATTED_STRING',
      'responseValueRenderOption': 'FORMATTED_VALUE',
      'valueInputOption': 'USER_ENTERED',
      'resource': {
        'values': [
          [
            fullName,
            email,
            'Employee',
            organization,
              role,
              password
          ]
        ]
      }
    })
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
       // document.getElementById('signup').innerHTML = 'You have signed up! Log in to continue.'

          const message = document.createElement('p')
                    message.innerHTML = 'You are now signed up! Log in to continue'
                    message.style.color = '#31B0D5'
                    document.getElementById('content').innerHTML = ''
                    document.getElementById('content').appendChild(message)
     //   just clear form values and append the above message below form
        }, function(error) {
        })

}

//boxwood-charmer-186806 is the project ID



var CLIENT_ID = '828863082444-52mksq4fqrbkkucd3i54uf3r4svrkioq.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyA4yrIsc8ux0pXSOa-pDeCrfgWtMObABOI';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = 'https://www.googleapis.com/auth/drive'
      'https://www.googleapis.com/auth/drive.file'
      'https://www.googleapis.com/auth/spreadsheets';

      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */

      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
        /*  gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;*/
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
    /*  function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }*/

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }



  function liAppend(message) {
    //    var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        var li = document.createElement('li')
        li.appendChild(textContent)
    //    pre.appendChild(li);
          
      }

      /**
       * Print the names and majors of students in a sample spreadsheet:
       * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
       */
      function listAllEvents() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
          range: 'Sheet1!A2:G',
        }).then(function(response) {
            
        document.getElementById('contentheader').innerHTML = 'All Events';    
        document.getElementById('content').innerHTML = '';
        var organization = document.getElementById('organization').innerHTML;
        console.log(response.result.values)
            console.log(organization)
            
          var range = response.result;
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                var row = range.values[i];
                
                if (row[6] == organization) {
                    
              // Print columns A and E, which correspond to indices 0 and 4
                var eventInfo = [ row[0], row[1], row[2], row[3], row[4], row[5], row[6] ]
                
                
               
                
                var ul = document.createElement('ul')
                var div = document.createElement('div')
                ul.id = 'ulidnumber' + i
                div.id ='dividnumber' + i
                
                div.className = 'columns'
                ul.className = 'price'
             
                 var pre = document.getElementById('content');
                div.appendChild(ul)
                pre.appendChild(div)
                
             var ulSelector = document.getElementById('ulidnumber' + i)
             var divSelector = document.getElementById('dividnumber' + i)
             
             var li1 = document.createElement('li')
             li1.className = 'grey'
             var li2 = document.createElement('li')
             var li3 = document.createElement('li')
             var li4 = document.createElement('li')
             var li5 = document.createElement('li')
             
             
             
             li1.innerHTML = row[0]
            li2.innerHTML = row[1]
            li3.innerHTML = row[2]
            li4.innerHTML = row[3] + ' ' + '-' + ' ' + row[4]
            li5.innerHTML = row[5]
             
             
             
             ulSelector.appendChild(li1)
                ulSelector.appendChild(li2)
                 ulSelector.appendChild(li3)
                ulSelector.appendChild(li4)
                ulSelector.appendChild(li5)
   

                }
            }
          } else {
            appendPre('There are no events.');
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message);
        });
      };

    






 function viewYourEvents() {
    return gapi.client.sheets.spreadsheets.values.get({
      "spreadsheetId": "1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g",
     range: 'Sheet1!A2:G',
        }).then(function(response) {
        
            
        document.getElementById('contentheader').innerHTML = 'Your Events';    
        document.getElementById('content').innerHTML = '';
        var organization = document.getElementById('organization').innerHTML;
        var username = document.getElementById('username').innerHTML
        console.log(response.result.values)
            console.log(organization)
            
          var range = response.result;
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                var row = range.values[i];
                
                if (row[6] == organization && username === row[5]) {
                    
              // Print columns A and E, which correspond to indices 0 and 4
                var eventInfo = [ row[0], row[1], row[2], row[3], row[4], row[5], row[6] ]
                
                
               
                
                var ul = document.createElement('ul')
                var div = document.createElement('div')
                ul.id = 'ulidnumber' + i
                div.id ='dividnumber' + i
                
                div.className = 'columns'
                ul.className = 'price'
             
                 var pre = document.getElementById('content');
                div.appendChild(ul)
                pre.appendChild(div)
                
             var ulSelector = document.getElementById('ulidnumber' + i)
             var divSelector = document.getElementById('dividnumber' + i)
             
             var li1 = document.createElement('li')
             li1.className = 'grey'
             var li2 = document.createElement('li')
             var li3 = document.createElement('li')
             var li4 = document.createElement('li')
            
             
             
             
             li1.innerHTML = row[0]
            li2.innerHTML = row[1]
            li3.innerHTML = row[2]
            li4.innerHTML = row[3] + ' ' + '-' + ' ' + row[4]
             
             
             
             ulSelector.appendChild(li1)
                ulSelector.appendChild(li2)
                 ulSelector.appendChild(li3)
                ulSelector.appendChild(li4)
   
   

                }
            }
          } else {
            appendPre('There are no events.');
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message);
        });
      };

     




function viewAvailableEvents() {
    return gapi.client.sheets.spreadsheets.values.get({
      "spreadsheetId": "1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g",
   range: 'Sheet1!A2:G',
        }).then(function(response) {
            
        document.getElementById('contentheader').innerHTML = 'Available Events';    
        document.getElementById('content').innerHTML = '';
        var organization = document.getElementById('organization').innerHTML;
        var username = document.getElementById('username').innerHTML
        console.log(response.result.values)
            console.log(organization)
            
          var range = response.result;
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                var row = range.values[i];
                
                
        var button = document.createElement('button');
        button.setAttribute("onclick", "assignName(this.id); acceptEvent();");
        button.className = 'btn btn-primary button2'
        button.className += ' '
        button.className += 'input'
        button.value = row[5];
        button.type = 'submit';
        button.innerHTML = 'Accept Event'
        
                
        // Print columns A and E, which correspond to indices 0 and 4
                var eventInfo = [ row[0], row[1], row[2], row[3], row[4], row[5], row[6] ]
                
                
               
                
                var ul = document.createElement('ul')
                var div = document.createElement('div')
                ul.id = 'ulidnumber' + i
                div.id ='dividnumber' + i
                
                div.className = 'columns'
                ul.className = 'price'
             
                 var pre = document.getElementById('content');
                div.appendChild(ul)
                pre.appendChild(div)
                
             var ulSelector = document.getElementById('ulidnumber' + i)
             var divSelector = document.getElementById('dividnumber' + i)
             
             var li1 = document.createElement('li')
             li1.className = 'grey'
             var li2 = document.createElement('li')
             var li3 = document.createElement('li')
             var li4 = document.createElement('li')
             var li5= document.createElement('li')
             li5.className = 'buttonlistitem'
            li5.className += 'grey'
            
             
             
             
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
                
        
             
                
               if (row[5] === 'Not Staffed' && row[6] === organization) {
                
                    
            divSelector.style.display = 'block'
   
   

                }
            }
              
               var input = document.getElementsByClassName('input');
        
     for (i = 0; i < input.length; i++) {
         input[i].id = 'buttonnumber' + i
     }
              
          } else {
            appendPre('There are no events.');
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message);
        });
      };
            
        
        
            
            
  /*      var li = document.createElement('li');
        var button = document.createElement('button');
        button.setAttribute("onclick", "assignName(this.id); acceptEvent();");
        button.className = 'button2'
        button.className += ' '
        button.className += 'input'
        button.value = row[5];
        button.type = 'submit';
        button.innerHTML = 'Accept Event'
        li.style.display = 'none'
            
        
            
       
        var contentSelector = document.getElementById('content');
            
    
        
        var textContent = document.createTextNode(row + '\n');
        li.appendChild(textContent);
        li.appendChild(button);
        contentSelector.appendChild(li);
            
            if (row[5] === 'Not Staffed' && row[6] === organization) {
                li.style.display = 'block'
            }
            
            
        
             })
        
        var input = document.getElementsByClassName('input');
        
     for (i = 0; i < input.length; i++) {
         input[i].id = 'buttonnumber' + i
     }*/
        
     
        
     

function assignName(clicked_id) {
    
    var username = document.getElementById('username').innerHTML
    document.getElementById(clicked_id).value = username
    
}



function acceptEvent() {
    
    var input = document.getElementsByClassName('input');
    
    
    var inputArrayPushedValues = []
    
   for (i = 0; i < input.length; i++) {
      
    //   input[i].defaultValue = "Not Staffed"
     var inputArray = input[i].value
     
     inputArrayPushedValues.push(inputArray)
     
 //   console.log(inputArray)
       
         //This pulls an array of inputs
       

 /*   if (input[i].value !== "") {
    var inputValue  = input[i].value
    }*/
     
        
   }
    
    console.log(inputArrayPushedValues)
    
    
    

    
   return gapi.client.sheets.spreadsheets.values.update({
      "spreadsheetId": "1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g",
      "range": "F2",
      "includeValuesInResponse": "true",
      "responseDateTimeRenderOption": "FORMATTED_STRING",
      "responseValueRenderOption": "FORMATTED_VALUE",
      "valueInputOption": "USER_ENTERED",
  //     "metadataValue": "Not Staffed",
      "resource": {
          
        "values": [
          
            inputArrayPushedValues
          
        ],
        "majorDimension": "COLUMNS",
      }
    })
    
    
    
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
       document.getElementById('content').innerHTML = '';
       document.getElementById('contentheader').innerHTML = '';
       document.getElementById('content').innerHTML = 'You are now staffed for the event!';
     
       //row[0] = input[0].value
    
 
        }, function(error) {
          console.error("Execute error", error);
        });
  }


    function createEventForm() {
      //  var row = response.result.values;
        
        var contentSelector = document.getElementById('content')
        contentSelector.innerHTML = '';
        document.getElementById('contentheader').innerHTML = 'Create Event'
        
        var divRow1 = document.createElement('div')
        var divCol1 = document.createElement('div')
        divRow1.className = 'row'
        divCol1.className = 'form-group col-md-6 col-sm-12'
        var venue = document.createElement('input')
        venue.type = 'text'
        venue.className = 'form-control'
        venue.id = 'venue'
        venue.placeholder = 'Enter the name of the venue'
        var venueLabel = document.createElement('label')
        venueLabel.innerHTML = 'Venue'
        divCol1.appendChild(venueLabel)
        divCol1.appendChild(venue)
        
        var divCol2 = document.createElement('div')
        divCol2.className = 'form-group col-md-6 col-sm-12'
        var date = document.createElement('input')
        date.type = 'date'
        date.className = 'form-control'
        date.id = 'date'
        date.placeholder = 'Enter the date of the event'
        var dateLabel = document.createElement('label')
        dateLabel.innerHTML = 'Date'
        divCol2.appendChild(dateLabel)
        divCol2.appendChild(date)
        
        divRow1.appendChild(divCol1)
        divRow1.appendChild(divCol2)
        
        contentSelector.appendChild(divRow1)
        
        
        
         
        var divRow2 = document.createElement('div')
        var divCol3 = document.createElement('div')
        divRow2.className = 'row'
        divCol3.className = 'form-group col-md-6 col-sm-12'
        var begins = document.createElement('input')
        begins.type = 'text'
        begins.className = 'form-control'
        begins.id = 'begins'
        begins.placeholder = 'Enter the time the event starts'
        var beginsLabel = document.createElement('label')
        beginsLabel.innerHTML = 'Begins At'
        divCol3.appendChild(beginsLabel)
        divCol3.appendChild(begins)
        
        var divCol4 = document.createElement('div')
        divCol4.className = 'form-group col-md-6 col-sm-12'
        var ends = document.createElement('input')
        ends.type = 'text'
        ends.className = 'form-control'
        ends.id = 'ends'
        ends.placeholder = 'Enter the time the event ends'
        var endsLabel = document.createElement('label')
        endsLabel.innerHTML = 'Ends at'
        divCol4.appendChild(endsLabel)
        divCol4.appendChild(ends)
        
         divRow2.appendChild(divCol3)
        divRow2.appendChild(divCol4)
        
        contentSelector.appendChild(divRow2)
        
         var location = document.createElement('input')
        location.type = 'text'
        location.className = 'form-control'
        location.id = 'location'
        location.placeholder = 'Enter the address of the venue'
        var locationLabel = document.createElement('label')
        locationLabel.innerHTML = 'Location'
        contentSelector.appendChild(locationLabel)
        contentSelector.appendChild(location)
        
        var button = document.createElement('button')
        button.type = 'Submit'
        button.className = 'btn btn-primary button2'
        button.innerHTML = 'Create Event'
        button.setAttribute("onclick", "execute()")
        button.id = 'createeventbutton'
        contentSelector.appendChild(button)
        
        
    }




function execute() {
    
    var venue = document.getElementById('venue').value;
    var location = document.getElementById('location').value;
    var date = document.getElementById('date').value;
    var begins = document.getElementById('begins').value;
    var ends = document.getElementById('ends').value;
    var organization = document.getElementById('organization').innerHTML
    
    return gapi.client.sheets.spreadsheets.values.append({
      "spreadsheetId": "1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g",
      "range": "A:F",
      "includeValuesInResponse": "false",
      "insertDataOption": "INSERT_ROWS",
      "responseDateTimeRenderOption": "FORMATTED_STRING",
      "responseValueRenderOption": "FORMATTED_VALUE",
      "valueInputOption": "USER_ENTERED",
      "resource": {
        "values": [
          [
            venue,
            location,
            date,
            begins,
            ends,
            "Not Staffed",
            organization
          ]
        ]
      }
    })
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
        document.getElementById('content').innerHTML = '';
       document.getElementById('content').innerHTML = 'The event has been created!';
          console.log("Response", response);
        }, function(error) {
          console.error("Execute error", error);
        });
  }







function adminSignUp() {
    
    var fullName = document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var organization = document.getElementById('organization').value;
    
    
    return gapi.client.sheets.spreadsheets.values.append({
      "spreadsheetId": "1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g",
      "range": "M:Q",
      "includeValuesInResponse": "false",
      "insertDataOption": "INSERT_ROWS",
      "responseDateTimeRenderOption": "FORMATTED_STRING",
      "responseValueRenderOption": "FORMATTED_VALUE",
      "valueInputOption": "USER_ENTERED",
      "resource": {
        "values": [
          [
            fullName,
            email,
            password,
            'Admin',
            organization,
          ]
        ]
      }
    })
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
        alert("You have signed up! Please log in to continue")
          console.log("Response", response);
        }, function(error) {
          console.error("Execute error", error);
        });
  }



function logIn() {
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    return gapi.client.sheets.spreadsheets.values.get({
      "spreadsheetId": "1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g",
      "range": "Sheet1!M2:Q",
      "dateTimeRenderOption": "FORMATTED_STRING",
      "majorDimension": "ROWS",
      "valueRenderOption": "FORMATTED_VALUE"
    })
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
        var row = response.result.values;
        
        
        row.forEach((row) => {
            if ( password === row[2] && email === row[1] ) {
                
                if (row[3] === 'Admin') {
                var homeButton = document.getElementById('homebutton');
                homeButton.setAttribute("href", "#");
                homeButton.setAttribute("onclick", "listAllEvents()");
                homeButton.innerHTML = "View All Events";
                
                var aboutButton = document.getElementById('aboutbutton');
                aboutButton.setAttribute("href", "#");
                aboutButton.setAttribute("onclick", "createEventForm()");
                aboutButton.innerHTML = "Create Event";
                
                var featuresButton = document.getElementById('featuresbutton');
                featuresButton.setAttribute("href", "#");
                featuresButton.setAttribute("onclick", "editEventList()");
                featuresButton.innerHTML = "Edit Events";
                
                var pricingButton = document.getElementById('pricingbutton');
                pricingButton.setAttribute("href", "#");
                pricingButton.setAttribute("onclick", "inviteUserForm()");
                pricingButton.innerHTML = "Invite User";
                } else {
                    
                    var homeButton = document.getElementById('homebutton');
                homeButton.setAttribute("href", "#");
                homeButton.setAttribute("onclick", "listAllEvents()");
                homeButton.innerHTML = "View All Events";
                
                var aboutButton = document.getElementById('aboutbutton');
                aboutButton.setAttribute("href", "#");
                aboutButton.setAttribute("onclick", "viewAvailableEvents()");
                aboutButton.innerHTML = "View Available Events";
                
                var featuresButton = document.getElementById('featuresbutton');
                featuresButton.setAttribute("href", "#");
                featuresButton.setAttribute("onclick", "viewYourEvents()");
                featuresButton.innerHTML = "View Your Events";
                
                var pricingButton = document.getElementById('pricingbutton');
                pricingButton.setAttribute("href", "#");
                pricingButton.setAttribute("onclick", "cancelEventList()");
                pricingButton.innerHTML = "Cancel An Event";
                    
                    
                }
                    
                    
                
                document.getElementById('demobutton').innerHTML = '';
                
                var loginButton = document.getElementById('button');
                loginButton.setAttribute("href", "login.html");
                loginButton.className = "btn btn-primary button2"
                loginButton.innerHTML = 'Log Out';

                document.getElementById('login').innerHTML = '';
                
                document.getElementById('loginpage').innerHTML = '';
                
                
                var welcomeArea = document.getElementById('welcomearea');
                var h3 = document.createElement('h3');
                h3.id = 'organization'
                var h3two = document.createElement('h3');
                h3two.id= 'username'
                var org = document.createTextNode(row[4]);
                var welcomeUser = document.createTextNode(row[0]);
                
                h3.appendChild(org)
                h3two.appendChild(welcomeUser)
                
                welcomeArea.appendChild(h3)
                welcomeArea.appendChild(h3two)
                
                var welcome = document.createElement('h2')
                var welcomeMessage = document.createTextNode('Welcome')
                
                welcome.appendChild(welcomeMessage)

                
                document.getElementById('content').appendChild(welcome)
                
                
                
                
               
    
                
                
                
                document.getElementById('content').setAttribute('style', 'padding-bottom: 210px')
                
                
                
                
                
                
                
                
            } else {
                console.log('there was an error!')
                var p = document.createElement('p')
                p.className = 'error'
                var errorMessage = document.createTextNode('You have entered the wrong username/password!')
                var h1 = document.getElementById('loginheader')
                p.appendChild(errorMessage)
                h1.appendChild(p)
                //append 'Wrong Username or Password'
            }
        
        })
        
        
        
        
        
          console.log("Response", response);
        }, function(error) {
          console.error("Execute error", error);
        console.log('there was an error!')
        });
  };

        

function cancelEventList() {
       return gapi.client.sheets.spreadsheets.values.get({
      "spreadsheetId": "1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g",
   range: 'Sheet1!A2:G',
        }).then(function(response) {
            
        document.getElementById('contentheader').innerHTML = 'Cancel Event';    
        document.getElementById('content').innerHTML = '';
        var organization = document.getElementById('organization').innerHTML;
        var username = document.getElementById('username').innerHTML
        console.log(response.result.values)
            console.log(organization)
            
          var range = response.result;
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                var row = range.values[i];
                
                
        var button = document.createElement('button');
        button.setAttribute("onclick", "changeNameToNotStaffed(this.id); cancelEvent();");
        button.className = 'btn btn-primary button3'
        button.className += ' '
        button.className += 'input'
        button.value = row[5];
        button.type = 'submit';
        button.innerHTML = 'Cancel Event'
        
                
        // Print columns A and E, which correspond to indices 0 and 4
                var eventInfo = [ row[0], row[1], row[2], row[3], row[4], row[5], row[6] ]
                
                
               
                
                var ul = document.createElement('ul')
                var div = document.createElement('div')
                ul.id = 'ulidnumber' + i
                div.id ='dividnumber' + i
                
                div.className = 'columns'
                ul.className = 'price'
             
                 var pre = document.getElementById('content');
                div.appendChild(ul)
                pre.appendChild(div)
                
             var ulSelector = document.getElementById('ulidnumber' + i)
             var divSelector = document.getElementById('dividnumber' + i)
             
             var li1 = document.createElement('li')
             li1.className = 'grey'
             var li2 = document.createElement('li')
             var li3 = document.createElement('li')
             var li4 = document.createElement('li')
             var li5= document.createElement('li')
             li5.className = 'buttonlistitem'
            li5.className += 'grey'
            
             
             
             
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
                
        
             
                
               if (row[5] === username && row[6] === organization) {
                
                    
            divSelector.style.display = 'block'
   
   

                }
            }
              
               var input = document.getElementsByClassName('input');
        
     for (i = 0; i < input.length; i++) {
         input[i].id = 'buttonnumber' + i
     }
              
          } else {
            appendPre('There are no events.');
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message);
        });
      };
            


function changeNameToNotStaffed(clicked_id) {
    
    document.getElementById(clicked_id).value = 'Not Staffed'
    
}


function cancelEvent() {
    
    var input = document.getElementsByClassName('input');
    
    
    var inputArrayPushedValues = []
    
   for (i = 0; i < input.length; i++) {
      
    //   input[i].defaultValue = "Not Staffed"
     var inputArray = input[i].value
     
     inputArrayPushedValues.push(inputArray)
     
 //   console.log(inputArray)
       
         //This pulls an array of inputs
       

 /*   if (input[i].value !== "") {
    var inputValue  = input[i].value
    }*/
     
        
   }
    
    console.log(inputArrayPushedValues)
    
    
    

    
   return gapi.client.sheets.spreadsheets.values.update({
      "spreadsheetId": "1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g",
      "range": "F2",
      "includeValuesInResponse": "true",
      "responseDateTimeRenderOption": "FORMATTED_STRING",
      "responseValueRenderOption": "FORMATTED_VALUE",
      "valueInputOption": "USER_ENTERED",
  //     "metadataValue": "Not Staffed",
      "resource": {
          
        "values": [
          
            inputArrayPushedValues
          
        ],
        "majorDimension": "COLUMNS",
      }
    })
    
    
    
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
       document.getElementById('content').innerHTML = '';
       document.getElementById('content').innerHTML = 'You have cancelled the event!';
     
       //row[0] = input[0].value
    
 
        }, function(error) {
          console.error("Execute error", error);
        });
  }



function editEventList() {
    return gapi.client.sheets.spreadsheets.values.get({
      "spreadsheetId": "1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g",
   range: 'Sheet1!A2:G',
        }).then(function(response) {
            
        document.getElementById('contentheader').innerHTML = 'Edit Events';    
        document.getElementById('content').innerHTML = '';
        var organization = document.getElementById('organization').innerHTML;
        var username = document.getElementById('username').innerHTML
        console.log(response.result.values)
            console.log(organization)
            
          var range = response.result;
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                var row = range.values[i];
                
                
        var button = document.createElement('button');
        button.setAttribute("onclick", "changeValueToInnerHtml(this.id);");
        button.className = 'btn btn-primary button2'
        button.className += ' '
        button.className += 'editinput'
 //       button.value = row[5];
        button.type = 'submit';
        button.innerHTML = 'Edit Event'
                
         var button2 = document.createElement('button');
        button2.setAttribute("onclick", "clearEventValues(this.id); venueClassChanges(); locationClassChanges(); dateClassChanges(); beginsClassChanges(); endsClassChanges(); staffedClassChanges(); orgClassChanges();");
        button2.className = 'btn btn-primary button3'
        button2.className += ' '
        button2.className += 'input'
        button2.type = 'submit';
        button2.innerHTML = 'Delete Event'
        
                
        // Print columns A and E, which correspond to indices 0 and 4
                var eventInfo = [ row[0], row[1], row[2], row[3], row[4], row[5], row[6] ]
                
                
               
                
                var ul = document.createElement('ul')
                var div = document.createElement('div')
                ul.id = 'ulidnumber' + i
                div.id ='dividnumber' + i
                
                div.className = 'columns'
                ul.className = 'price'
             
                 var pre = document.getElementById('content');
                div.appendChild(ul)
                pre.appendChild(div)
                
             var ulSelector = document.getElementById('ulidnumber' + i)
             var divSelector = document.getElementById('dividnumber' + i)
             
             var li1 = document.createElement('li')
             li1.className = 'grey'
            var li1InvisibleValue = document.createElement('button');
                
             var li2 = document.createElement('li')
              var li2InvisibleValue = document.createElement('button');
                
             var li3 = document.createElement('li')
              var li3InvisibleValue = document.createElement('button');
             
             var li4 = document.createElement('li')
              var li4InvisibleValue = document.createElement('button');
             
             var li5 = document.createElement('li')
              var li5InvisibleValue = document.createElement('button');
             
             var li6 = document.createElement('li')
              var li6InvisibleValue = document.createElement('button');
             
             var invisibleButton = document.createElement('button')
             li5.className = 'buttonlistitem'
            li5.className += 'grey'
                
            invisibleButton.className = 'orgclass'
                invisibleButton.value = row[6]
            
             
             
             
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
                
            li6.innerHTML = row[5]
            li6InvisibleValue.value = row[5]
            li6InvisibleValue.className = 'staffedclass'
            li6.appendChild(li6InvisibleValue) 
                
            
            li5.appendChild(button)
            li5.appendChild(button2)
 
            
            button2.appendChild(invisibleButton)
            
             
             
             
             ulSelector.appendChild(li1)
                ulSelector.appendChild(li2)
                 ulSelector.appendChild(li3)
                ulSelector.appendChild(li4)
                ulSelector.appendChild(li6)
                ulSelector.appendChild(li5)
                
                divSelector.style.display = 'none'
                
        
             
                
               if (row[6] === organization) {
                
                    
            divSelector.style.display = 'block'
                   
                   
                   li1InvisibleValue.style.display = 'none'
                   li2InvisibleValue.style.display = 'none'
                   li3InvisibleValue.style.display = 'none'
                   li4InvisibleValue.style.display = 'none'
                   li5InvisibleValue.style.display = 'none'
                   li6InvisibleValue.style.display = 'none'
                   invisibleButton.style.display = 'none'
   
   

                }
            }
              
               var input = document.getElementsByClassName('input');
              var editInput = document.getElementsByClassName('editinput');
        
     for (i = 0; i < input.length; i++) {
         input[i].id = 'buttonnumber' + i
     }
              
        for (i = 0; i < editInput.length; i++) {
         editInput[i].id = 'editbuttonnumber' + i
     }
              
          } else {
            appendPre('There are no events.');
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message);
        });
      };




function clearEventValues(clicked_id) {

    

    document.getElementById(clicked_id).firstElementChild.value = ''
    
    document.getElementById(clicked_id).parentElement.previousElementSibling.firstElementChild.value = ''
    
    document.getElementById(clicked_id).parentElement.previousElementSibling.previousElementSibling.firstElementChild.value = ''
    
    document.getElementById(clicked_id).parentElement.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild.value = ''
    
    document.getElementById(clicked_id).parentElement.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.value = ''
    
    document.getElementById(clicked_id).parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.value = ''
    
    document.getElementById(clicked_id).parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.value = ''
    
    
};




function venueClassChanges() {
    
    var venueclass = document.getElementsByClassName('venueclass');

    
    
    var venueclassArrayPushedValues = []

    
   for (i = 0; i < venueclass.length; i++) {
      
    //   input[i].defaultValue = "Not Staffed"
     var venueclassArray = venueclass[i].value

     
     venueclassArrayPushedValues.push(venueclassArray)

     
 //   console.log(inputArray)
       
         //This pulls an array of inputs
       

 /*   if (input[i].value !== "") {
    var inputValue  = input[i].value
    }*/
     
        
   }
    
 
    
    
    

    
   return gapi.client.sheets.spreadsheets.values.update({
      "spreadsheetId": "1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g",
      "range": "A2",
      "includeValuesInResponse": "true",
      "responseDateTimeRenderOption": "FORMATTED_STRING",
      "responseValueRenderOption": "FORMATTED_VALUE",
      "valueInputOption": "USER_ENTERED",
  //     "metadataValue": "Not Staffed",
      "resource": {
          
        "values": [
          
            venueclassArrayPushedValues
          
        ],
        "majorDimension": "COLUMNS",
      }
    })
    
    
    
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
     
       //row[0] = input[0].value
    
 
        }, function(error) {
          console.error("Execute error", error);
        });
  }






function locationClassChanges() {
    
    var locationclass = document.getElementsByClassName('locationclass');

    
    
    var locationclassArrayPushedValues = []

    
   for (i = 0; i < locationclass.length; i++) {
      
    //   input[i].defaultValue = "Not Staffed"
     var locationclassArray = locationclass[i].value

     
     locationclassArrayPushedValues.push(locationclassArray)

     
 //   console.log(inputArray)
       
         //This pulls an array of inputs
       

 /*   if (input[i].value !== "") {
    var inputValue  = input[i].value
    }*/
     
        
   }
    
 
    
    
    

    
   return gapi.client.sheets.spreadsheets.values.update({
      "spreadsheetId": "1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g",
      "range": "B2",
      "includeValuesInResponse": "true",
      "responseDateTimeRenderOption": "FORMATTED_STRING",
      "responseValueRenderOption": "FORMATTED_VALUE",
      "valueInputOption": "USER_ENTERED",
  //     "metadataValue": "Not Staffed",
      "resource": {
          
        "values": [
          
            locationclassArrayPushedValues
          
        ],
        "majorDimension": "COLUMNS",
      }
    })
    
    
    
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
     
       //row[0] = input[0].value
    
 
        }, function(error) {
          console.error("Execute error", error);
        });
  }





function dateClassChanges() {
    
    var dateclass = document.getElementsByClassName('dateclass');

    
    
    var dateclassArrayPushedValues = []

    
   for (i = 0; i < dateclass.length; i++) {
      
    //   input[i].defaultValue = "Not Staffed"
     var dateclassArray = dateclass[i].value

     
     dateclassArrayPushedValues.push(dateclassArray)

     
 //   console.log(inputArray)
       
         //This pulls an array of inputs
       

 /*   if (input[i].value !== "") {
    var inputValue  = input[i].value
    }*/
     
        
   }
    
 
    
    
    

    
   return gapi.client.sheets.spreadsheets.values.update({
      "spreadsheetId": "1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g",
      "range": "C2",
      "includeValuesInResponse": "true",
      "responseDateTimeRenderOption": "FORMATTED_STRING",
      "responseValueRenderOption": "FORMATTED_VALUE",
      "valueInputOption": "USER_ENTERED",
  //     "metadataValue": "Not Staffed",
      "resource": {
          
        "values": [
          
            dateclassArrayPushedValues
          
        ],
        "majorDimension": "COLUMNS",
      }
    })
    
    
    
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
     
       //row[0] = input[0].value
    
 
        }, function(error) {
          console.error("Execute error", error);
        });
  }





function endsClassChanges() {
    
    var endsclass = document.getElementsByClassName('endsclass');

    
    
    var endsclassArrayPushedValues = []

    
   for (i = 0; i < endsclass.length; i++) {
      
    //   input[i].defaultValue = "Not Staffed"
     var endsclassArray = endsclass[i].value

     
     endsclassArrayPushedValues.push(endsclassArray)

     
 //   console.log(inputArray)
       
         //This pulls an array of inputs
       

 /*   if (input[i].value !== "") {
    var inputValue  = input[i].value
    }*/
     
        
   }
    
 
    
    
    

    
   return gapi.client.sheets.spreadsheets.values.update({
      "spreadsheetId": "1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g",
      "range": "E2",
      "includeValuesInResponse": "true",
      "responseDateTimeRenderOption": "FORMATTED_STRING",
      "responseValueRenderOption": "FORMATTED_VALUE",
      "valueInputOption": "USER_ENTERED",
  //     "metadataValue": "Not Staffed",
      "resource": {
          
        "values": [
          
            endsclassArrayPushedValues
          
        ],
        "majorDimension": "COLUMNS",
      }
    })
    
    
    
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
     
       //row[0] = input[0].value
    
 
        }, function(error) {
          console.error("Execute error", error);
        });
  }






function beginsClassChanges() {
    
    var beginsclass = document.getElementsByClassName('beginsclass');

    
    
    var beginsclassArrayPushedValues = []

    
   for (i = 0; i < beginsclass.length; i++) {
      
    //   input[i].defaultValue = "Not Staffed"
     var beginsclassArray = beginsclass[i].value

     
     beginsclassArrayPushedValues.push(beginsclassArray)

     
 //   console.log(inputArray)
       
         //This pulls an array of inputs
       

 /*   if (input[i].value !== "") {
    var inputValue  = input[i].value
    }*/
     
        
   }
    
 
    
    
    

    
   return gapi.client.sheets.spreadsheets.values.update({
      "spreadsheetId": "1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g",
      "range": "D2",
      "includeValuesInResponse": "true",
      "responseDateTimeRenderOption": "FORMATTED_STRING",
      "responseValueRenderOption": "FORMATTED_VALUE",
      "valueInputOption": "USER_ENTERED",
  //     "metadataValue": "Not Staffed",
      "resource": {
          
        "values": [
          
            beginsclassArrayPushedValues
          
        ],
        "majorDimension": "COLUMNS",
      }
    })
    
    
    
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
     
       //row[0] = input[0].value
    
 
        }, function(error) {
          console.error("Execute error", error);
        });
  }










function staffedClassChanges() {
    
    var staffedclass = document.getElementsByClassName('staffedclass');

    
    
    var staffedclassArrayPushedValues = []

    
   for (i = 0; i < staffedclass.length; i++) {
      
    //   input[i].defaultValue = "Not Staffed"
     var staffedclassArray = staffedclass[i].value

     
     staffedclassArrayPushedValues.push(staffedclassArray)

     
 //   console.log(inputArray)
       
         //This pulls an array of inputs
       

 /*   if (input[i].value !== "") {
    var inputValue  = input[i].value
    }*/
     
        
   }
    
 
    
    
    

    
   return gapi.client.sheets.spreadsheets.values.update({
      "spreadsheetId": "1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g",
      "range": "F2",
      "includeValuesInResponse": "true",
      "responseDateTimeRenderOption": "FORMATTED_STRING",
      "responseValueRenderOption": "FORMATTED_VALUE",
      "valueInputOption": "USER_ENTERED",
  //     "metadataValue": "Not Staffed",
      "resource": {
          
        "values": [
          
            staffedclassArrayPushedValues
          
        ],
        "majorDimension": "COLUMNS",
      }
    })
    
    
    
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
     
       //row[0] = input[0].value
    
 
        }, function(error) {
          console.error("Execute error", error);
        });
  }




function orgClassChanges() {
    

    var orgclass = document.getElementsByClassName('orgclass')
    
    

    var orgclassArrayPushedValues =[]
    
   for (i = 0; i < orgclass.length; i++) {
      
    //   input[i].defaultValue = "Not Staffed"

     var orgclassArray = orgclass[i].value
     
     
     orgclassArrayPushedValues.push(orgclassArray)
     
 //   console.log(inputArray)
       
         //This pulls an array of inputs
       

 /*   if (input[i].value !== "") {
    var inputValue  = input[i].value
    }*/
     
        
   }
    
   
    
    
    

    
   return gapi.client.sheets.spreadsheets.values.update({
      "spreadsheetId": "1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g",
      "range": "G2",
      "includeValuesInResponse": "true",
      "responseDateTimeRenderOption": "FORMATTED_STRING",
      "responseValueRenderOption": "FORMATTED_VALUE",
      "valueInputOption": "USER_ENTERED",
  //     "metadataValue": "Not Staffed",
      "resource": {
          
        "values": [
          
            orgclassArrayPushedValues
          
        ],
        "majorDimension": "COLUMNS",
      }
    })
    
    
    
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
       document.getElementById('content').innerHTML = '';
       document.getElementById('content').innerHTML = 'Your changes have been made!';
     
       //row[0] = input[0].value
    
 
        }, function(error) {
          console.error("Execute error", error);
        });
  };


function changeValueToInnerHtml(clicked_id) {
    var clickedButton = document.getElementById(clicked_id)
    
   var selectedAreaUl = clickedButton.parentElement.parentElement
   var selectedArea = clickedButton.parentElement.parentElement.parentElement
   
   var staffedValue = clickedButton.parentElement.previousElementSibling.innerText
   
   var beginsValue = clickedButton.parentElement.previousElementSibling.previousElementSibling.innerText
   
   var endsValue = clickedButton.parentElement.previousElementSibling.previousElementSibling.innerText
   
   var dateValue = clickedButton.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText
   
   var locationValue = clickedButton.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
   
   var venueValue = clickedButton.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
   
   selectedAreaUl.style.display = 'none'
    
    
    
    
        
    
        var venue = document.createElement('input')
        venue.type = 'text'
        venue.className = 'form-control'
        venue.id = 'venue'

        venue.placeholder = 'Enter the name of the venue'
        var venueLabel = document.createElement('label')
        venueLabel.innerHTML = 'Venue'
        venue.value = venueValue
        selectedArea.appendChild(venueLabel)
        selectedArea.appendChild(venue)
    
    
        var location = document.createElement('input')
        location.type = 'text'
        location.className = 'form-control'
        location.id = 'location'

        location.value = locationValue
        location.placeholder = 'Enter the address of the venue'
        var locationLabel = document.createElement('label')
        locationLabel.innerHTML = 'Location'
        selectedArea.appendChild(locationLabel)
        selectedArea.appendChild(location)
        
       
        var date = document.createElement('input')
        date.type = 'text'
        date.className = 'form-control'
        date.id = 'date'

        date.placeholder = 'Enter the date of the event'
        date.value = dateValue
        var dateLabel = document.createElement('label')
        dateLabel.innerHTML = 'Date'
       
        
        selectedArea.appendChild(dateLabel)
    selectedArea.appendChild(date)
        
        
        
         
        var divRow2 = document.createElement('div')
        var divCol3 = document.createElement('div')
        divRow2.className = 'row'
        divCol3.className = 'form-group col-md-6 col-sm-12'
        var begins = document.createElement('input')
        begins.type = 'text'
        begins.className = 'form-control'
        begins.id = 'begins'
  
        begins.value = beginsValue
        begins.placeholder = 'Enter the time the event starts'
        var beginsLabel = document.createElement('label')
        beginsLabel.innerHTML = 'Begins At'
        divCol3.appendChild(beginsLabel)
        divCol3.appendChild(begins)
    
    
        
        var divCol4 = document.createElement('div')
        divCol4.className = 'form-group col-md-6 col-sm-12'
        var ends = document.createElement('input')
        ends.type = 'text'
        ends.className = 'form-control'
        ends.id = 'ends'

        ends.value = endsValue
        ends.placeholder = 'Enter the time the event ends'
        var endsLabel = document.createElement('label')
        endsLabel.innerHTML = 'Ends at'
        divCol4.appendChild(endsLabel)
        divCol4.appendChild(ends)
        
         divRow2.appendChild(divCol3)
        divRow2.appendChild(divCol4)
        
        selectedArea.appendChild(divRow2)
        
        
    
        var staffed = document.createElement('input')
        staffed.type = 'text'
        staffed.className = 'form-control'
        staffed.id = 'staffed'

        staffed.value = staffedValue
        staffed.placeholder = 'Enter the staff'
        var staffedLabel = document.createElement('label')
        staffedLabel.innerHTML = 'Staffed'
        selectedArea.appendChild(staffedLabel)
        selectedArea.appendChild(staffed)
       
        
        
        
        var button = document.createElement('button')
        button.type = 'Submit'
        button.className = 'btn btn-primary button2'
        button.innerHTML = 'Make Changes'
        button.setAttribute("onclick", "assignEventValues(this.id); venueClassChanges(); locationClassChanges(); dateClassChanges(); beginsClassChanges(); endsClassChanges(); staffedClassChanges(); madeChangesMessage();")
        button.id = 'makechanges'
        selectedArea.appendChild(button)
    
    
}


function assignEventValues(clicked_id) {
    
    var selector = document.getElementById(clicked_id)
    
    var staffed = selector.previousElementSibling.value
    
    var begins = selector.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild.nextElementSibling.value
    
    var ends = selector.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.value
    
    var date = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.value
    
    var location = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.value
    
    var venue = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.value
    
    
    var invisibleVenue = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild
    
   
    invisibleVenue.value = venue
    
    
    var invisibleLocation = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.firstElementChild
    
    invisibleLocation.value = location
    
    var invisibleDate = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild
    
    invisibleDate.value = date
    
    var invisibleBegins = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild
    
    invisibleBegins.value = begins
    
    var invisibleEnds = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild
    
    invisibleEnds.value = ends
    
    var invisibleStaffed = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild
    
    invisibleStaffed.value = staffed
    
    if (invisibleStaffed.value === '') {
        
        invisibleStaffed.value = 'Not Staffed'
        
    }
    
}


function madeChangesMessage() {
     document.getElementById('content').innerHTML = '';
       document.getElementById('content').innerHTML = 'Your changes have been made!';
    
}



/*function inviteUserForm() {
   var selectedArea = document.getElementById('content')
    document.getElementById('contentheader').innerHTML = 'Invite User';   
    
    selectedArea.innerHTML = ''
    
   
        var staffed = document.createElement('input')
        staffed.type = 'text'
        staffed.className = 'form-control'
        staffed.id = 'staffed'


        staffed.placeholder = 'Enter the staff'
        var staffedLabel = document.createElement('label')
        staffedLabel.innerHTML = 'Staffed'
        selectedArea.appendChild(staffedLabel)
        selectedArea.appendChild(staffed)
       
        
        
        
        var button = document.createElement('button')
        button.type = 'Submit'
        button.className = 'btn btn-primary button2'
        button.innerHTML = 'Make Changes'
        button.setAttribute("onclick", "assignEventValues(this.id); venueClassChanges(); locationClassChanges(); dateClassChanges(); beginsClassChanges(); endsClassChanges(); staffedClassChanges(); madeChangesMessage();")
        button.id = 'makechanges'
        selectedArea.appendChild(button)
    
    
    
}

*/







/*emailjs.send("my_service","my_template",{
  name: "James", 
  notes: "Check this out!"
});*/
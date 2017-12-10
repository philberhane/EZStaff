//boxwood-charmer-186806 is the project ID


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



  function liAppend(message) {
    //    const pre = document.getElementById('content')
        const textContent = document.createTextNode(message + '\n')
        const li = document.createElement('li')
        li.appendChild(textContent)
    //    pre.appendChild(li)

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

        document.getElementById('contentheader').innerHTML = 'All Events'
        document.getElementById('content').innerHTML = ''
        const organization = document.getElementById('organization').innerHTML

          const range = response.result
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                const row = range.values[i]

                if (row[6] == organization) {

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
             const li2 = document.createElement('li')
             const li3 = document.createElement('li')
             const li4 = document.createElement('li')
             const li5 = document.createElement('li')



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
            appendPre('There are no events.')
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message)
        })
      }








 function viewYourEvents() {
    return gapi.client.sheets.spreadsheets.values.get({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
     range: 'Sheet1!A2:G',
        }).then(function(response) {


        document.getElementById('contentheader').innerHTML = 'Your Events'
        document.getElementById('content').innerHTML = ''
        const organization = document.getElementById('organization').innerHTML
        const username = document.getElementById('username').innerHTML


          const range = response.result
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                const row = range.values[i]

                if (row[6] == organization && username === row[5]) {

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
             const li2 = document.createElement('li')
             const li3 = document.createElement('li')
             const li4 = document.createElement('li')




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
            appendPre('There are no events.')
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message)
        })
      }






function viewAvailableEvents() {
    return gapi.client.sheets.spreadsheets.values.get({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
   range: 'Sheet1!A2:G',
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
        button.setAttribute('onclick', 'assignName(this.id); acceptEvent()')
        button.className = 'btn btn-primary button2'
        button.className += ' '
        button.className += 'input'
        button.value = row[5]
        button.type = 'submit'
        button.innerHTML = 'Accept Event'


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
             const li2 = document.createElement('li')
             const li3 = document.createElement('li')
             const li4 = document.createElement('li')
             const li5= document.createElement('li')
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





  /*      const li = document.createElement('li')
        const button = document.createElement('button')
        button.setAttribute('onclick', 'assignName(this.id) acceptEvent()')
        button.className = 'button2'
        button.className += ' '
        button.className += 'input'
        button.value = row[5]
        button.type = 'submit'
        button.innerHTML = 'Accept Event'
        li.style.display = 'none'




        const contentSelector = document.getElementById('content')



        const textContent = document.createTextNode(row + '\n')
        li.appendChild(textContent)
        li.appendChild(button)
        contentSelector.appendChild(li)

            if (row[5] === 'Not Staffed' && row[6] === organization) {
                li.style.display = 'block'
            }



             })

        const input = document.getElementsByClassName('input')

     for (i = 0 i < input.length i++) {
         input[i].id = 'buttonnumber' + i
     }*/





function assignName(clicked_id) {

    const username = document.getElementById('username').innerHTML
    document.getElementById(clicked_id).value = username

}



function acceptEvent() {

    const input = document.getElementsByClassName('input')


    const inputArrayPushedValues = []

   for (i = 0; i < input.length; i++) {

    //   input[i].defaultValue = 'Not Staffed'
     const inputArray = input[i].value

     inputArrayPushedValues.push(inputArray)


         //This pulls an array of inputs


 /*   if (input[i].value !== '') {
    const inputValue  = input[i].value
    }*/


   }






   return gapi.client.sheets.spreadsheets.values.update({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'F2',
      'includeValuesInResponse': 'true',
      'responseDateTimeRenderOption': 'FORMATTED_STRING',
      'responseValueRenderOption': 'FORMATTED_VALUE',
      'valueInputOption': 'USER_ENTERED',
  //     'metadataValue': 'Not Staffed',
      'resource': {

        'values': [

            inputArrayPushedValues

        ],
        'majorDimension': 'COLUMNS',
      }
    })



        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
       document.getElementById('content').innerHTML = ''
       document.getElementById('contentheader').innerHTML = ''
       document.getElementById('content').innerHTML = 'You are now staffed for the event!'

       //row[0] = input[0].value


        }, function(error) {
        })
  }


    function createEventForm() {
      //  const row = response.result.values

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

         const location = document.createElement('input')
        location.type = 'text'
        location.className = 'form-control'
        location.id = 'location'
        location.placeholder = 'Enter the address of the venue'
        const locationLabel = document.createElement('label')
        locationLabel.innerHTML = 'Location'
        contentSelector.appendChild(locationLabel)
        contentSelector.appendChild(location)

        const button = document.createElement('button')
        button.type = 'Submit'
        button.className = 'btn btn-primary button2'
        button.innerHTML = 'Create Event'
        button.setAttribute('onclick', 'execute()')
        button.id = 'createeventbutton'
        contentSelector.appendChild(button)


    }




function execute() {

    const venue = document.getElementById('venue').value
    const location = document.getElementById('location').value
    const date = document.getElementById('date').value
    const begins = document.getElementById('begins').value
    const ends = document.getElementById('ends').value
    const organization = document.getElementById('organization').innerHTML

    return gapi.client.sheets.spreadsheets.values.append({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'A:F',
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
            'Not Staffed',
            organization
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
                    document.getElementById('content').append(message)
    } else {
        adminSignUp()
    }
}






function adminSignUp() {

    const fullName = document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const organization = document.getElementById('organization').value


    return gapi.client.sheets.spreadsheets.values.append({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'M:Q',
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
                    document.getElementById('content').append(message)

        }, function(error) {

        })
  }



function logIn() {

    const email = document.getElementById('email').value

    const example = document.getElementById('example').value

    const entireEmail = email + '@' + example

    const password = document.getElementById('password').value


    return gapi.client.sheets.spreadsheets.values.get({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'Sheet1!M2:Q',
      'dateTimeRenderOption': 'FORMATTED_STRING',
      'majorDimension': 'ROWS',
      'valueRenderOption': 'FORMATTED_VALUE'
    })
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
        const row = response.result.values



        row.forEach((row) => {





            if ( password === row[4] && entireEmail === row[1] ) {
                document.getElementById('content').innerHTML = ''


                if (row[2] === 'Admin') {
                const homeButton = document.getElementById('homebutton')
                homeButton.setAttribute('href', '#')
                homeButton.setAttribute('onclick', 'listAllEvents()')
                homeButton.innerHTML = 'View All Events'

                const aboutButton = document.getElementById('aboutbutton')
                aboutButton.setAttribute('href', '#')
                aboutButton.setAttribute('onclick', 'createEventForm()')
                aboutButton.innerHTML = 'Create Event'

                const featuresButton = document.getElementById('featuresbutton')
                featuresButton.setAttribute('href', '#')
                featuresButton.setAttribute('onclick', 'editEventList()')
                featuresButton.innerHTML = 'Edit Events'

                const pricingButton = document.getElementById('pricingbutton')
                pricingButton.setAttribute('href', '#')
                pricingButton.setAttribute('onclick', 'inviteUserForm()')
                pricingButton.innerHTML = 'Invite User'
                } else {

                    const homeButton = document.getElementById('homebutton')
                homeButton.setAttribute('href', '#')
                homeButton.setAttribute('onclick', 'listAllEvents()')
                homeButton.innerHTML = 'View All Events'

                const aboutButton = document.getElementById('aboutbutton')
                aboutButton.setAttribute('href', '#')
                aboutButton.setAttribute('onclick', 'viewAvailableEvents()')
                aboutButton.innerHTML = 'View Available Events'

                const featuresButton = document.getElementById('featuresbutton')
                featuresButton.setAttribute('href', '#')
                featuresButton.setAttribute('onclick', 'viewYourEvents()')
                featuresButton.innerHTML = 'View Your Events'

                const pricingButton = document.getElementById('pricingbutton')
                pricingButton.setAttribute('href', '#')
                pricingButton.setAttribute('onclick', 'cancelEventList()')
                pricingButton.innerHTML = 'Cancel An Event'


                }


                document.getElementById('demobutton').innerHTML = ''

                const loginButton = document.getElementById('button')
                loginButton.setAttribute('href', 'login.html')
                loginButton.className = 'btn btn-primary button2'
                loginButton.innerHTML = 'Log Out'

                document.getElementById('login').innerHTML = ''

                document.getElementById('loginpage').innerHTML = ''


                const welcomeArea = document.getElementById('welcomearea')
                const h3 = document.createElement('h3')
                h3.id = 'organization'
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

        })






        }, function(error) {

        })
  }



function cancelEventList() {
       return gapi.client.sheets.spreadsheets.values.get({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
   range: 'Sheet1!A2:G',
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
        button.setAttribute('onclick', 'changeNameToNotStaffed(this.id); cancelEvent()')
        button.className = 'btn btn-primary button3'
        button.className += ' '
        button.className += 'input'
        button.value = row[5]
        button.type = 'submit'
        button.innerHTML = 'Cancel Event'


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
             const li2 = document.createElement('li')
             const li3 = document.createElement('li')
             const li4 = document.createElement('li')
             const li5= document.createElement('li')
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



function changeNameToNotStaffed(clicked_id) {

    document.getElementById(clicked_id).value = 'Not Staffed'

}


function cancelEvent() {

    const input = document.getElementsByClassName('input')


    const inputArrayPushedValues = []

   for (i = 0; i < input.length; i++) {

    //   input[i].defaultValue = 'Not Staffed'
     const inputArray = input[i].value

     inputArrayPushedValues.push(inputArray)


         //This pulls an array of inputs


 /*   if (input[i].value !== '') {
    const inputValue  = input[i].value
    }*/


   }







   return gapi.client.sheets.spreadsheets.values.update({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'F2',
      'includeValuesInResponse': 'true',
      'responseDateTimeRenderOption': 'FORMATTED_STRING',
      'responseValueRenderOption': 'FORMATTED_VALUE',
      'valueInputOption': 'USER_ENTERED',
  //     'metadataValue': 'Not Staffed',
      'resource': {

        'values': [

            inputArrayPushedValues

        ],
        'majorDimension': 'COLUMNS',
      }
    })



        .then(function(response) {
          // Handle the results here (response.result has the parsed body).

       document.getElementById('content').innerHTML = ''
       document.getElementById('content').innerHTML = 'You have cancelled the event!'

       //row[0] = input[0].value


        }, function(error) {
        })
  }



function editEventList() {
    return gapi.client.sheets.spreadsheets.values.get({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
   range: 'Sheet1!A2:G',
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
        button2.setAttribute('onclick', 'clearEventValues(this.id); venueClassChanges(); locationClassChanges(); dateClassChanges(); beginsClassChanges(); endsClassChanges(); staffedClassChanges(); orgClassChanges()')
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

             const li6 = document.createElement('li')
              const li6InvisibleValue = document.createElement('button')

             const invisibleButton = document.createElement('button')
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




function clearEventValues(clicked_id) {



    document.getElementById(clicked_id).firstElementChild.value = ''

    document.getElementById(clicked_id).parentElement.previousElementSibling.firstElementChild.value = ''

    document.getElementById(clicked_id).parentElement.previousElementSibling.previousElementSibling.firstElementChild.value = ''

    document.getElementById(clicked_id).parentElement.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild.value = ''

    document.getElementById(clicked_id).parentElement.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.value = ''

    document.getElementById(clicked_id).parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.value = ''

    document.getElementById(clicked_id).parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.value = ''


}




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
      'range': 'A2',
      'includeValuesInResponse': 'true',
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
      'range': 'B2',
      'includeValuesInResponse': 'true',
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
      'includeValuesInResponse': 'true',
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
      'range': 'E2',
      'includeValuesInResponse': 'true',
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
      'range': 'D2',
      'includeValuesInResponse': 'true',
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










function staffedClassChanges() {

    const staffedclass = document.getElementsByClassName('staffedclass')



    const staffedclassArrayPushedValues = []


   for (i = 0; i < staffedclass.length; i++) {

    //   input[i].defaultValue = 'Not Staffed'
     const staffedclassArray = staffedclass[i].value


     staffedclassArrayPushedValues.push(staffedclassArray)



         //This pulls an array of inputs


 /*   if (input[i].value !== '') {
    const inputValue  = input[i].value
    }*/


   }







   return gapi.client.sheets.spreadsheets.values.update({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'F2',
      'includeValuesInResponse': 'true',
      'responseDateTimeRenderOption': 'FORMATTED_STRING',
      'responseValueRenderOption': 'FORMATTED_VALUE',
      'valueInputOption': 'USER_ENTERED',
  //     'metadataValue': 'Not Staffed',
      'resource': {

        'values': [

            staffedclassArrayPushedValues

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
      'range': 'G2',
      'includeValuesInResponse': 'true',
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


function changeValueToInnerHtml(clicked_id) {
    const clickedButton = document.getElementById(clicked_id)

   const selectedAreaUl = clickedButton.parentElement.parentElement
   const selectedArea = clickedButton.parentElement.parentElement.parentElement

   const staffedValue = clickedButton.parentElement.previousElementSibling.innerText

   const beginsValue = clickedButton.parentElement.previousElementSibling.previousElementSibling.innerText.split(' ')[0] + ' ' + clickedButton.parentElement.previousElementSibling.previousElementSibling.innerText.split(' ')[1]

   const endsValue = clickedButton.parentElement.previousElementSibling.previousElementSibling.innerText.split(' ')[3] + ' ' + clickedButton.parentElement.previousElementSibling.previousElementSibling.innerText.split(' ')[4]

   const dateValue = clickedButton.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText

   const locationValue = clickedButton.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText

   const venueValue = clickedButton.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText

   selectedAreaUl.style.display = 'none'






        const venue = document.createElement('input')
        venue.type = 'text'
        venue.className = 'form-control'
        venue.id = 'venue'

        venue.placeholder = 'Enter the name of the venue'
        const venueLabel = document.createElement('label')
        venueLabel.innerHTML = 'Venue'
        venue.value = venueValue
        selectedArea.appendChild(venueLabel)
        selectedArea.appendChild(venue)


        const location = document.createElement('input')
        location.type = 'text'
        location.className = 'form-control'
        location.id = 'location'

        location.value = locationValue
        location.placeholder = 'Enter the address of the venue'
        const locationLabel = document.createElement('label')
        locationLabel.innerHTML = 'Location'
        selectedArea.appendChild(locationLabel)
        selectedArea.appendChild(location)


        const date = document.createElement('input')
        date.type = 'text'
        date.className = 'form-control'
        date.id = 'date'

        date.placeholder = 'Enter the date of the event'
        date.value = dateValue
        const dateLabel = document.createElement('label')
        dateLabel.innerHTML = 'Date'


        selectedArea.appendChild(dateLabel)
    selectedArea.appendChild(date)




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

        selectedArea.appendChild(divRow2)



        const staffed = document.createElement('input')
        staffed.type = 'text'
        staffed.className = 'form-control'
        staffed.id = 'staffed'

        staffed.value = staffedValue
        staffed.placeholder = 'Enter the staff'
        const staffedLabel = document.createElement('label')
        staffedLabel.innerHTML = 'Staffed'
        selectedArea.appendChild(staffedLabel)
        selectedArea.appendChild(staffed)




        const button = document.createElement('button')
        button.type = 'Submit'
        button.className = 'btn btn-primary button2'
        button.innerHTML = 'Make Changes'
        button.setAttribute('onclick', 'assignEventValues(this.id); venueClassChanges(); locationClassChanges(); dateClassChanges(); beginsClassChanges(); endsClassChanges(); staffedClassChanges(); madeChangesMessage()')
        button.id = 'makechanges'
        selectedArea.appendChild(button)


}


function assignEventValues(clicked_id) {

    const selector = document.getElementById(clicked_id)

    const staffed = selector.previousElementSibling.value

    const begins = selector.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild.nextElementSibling.value

    const ends = selector.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.value

    const date = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.value

    const location = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.value

    const venue = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.value


    const invisibleVenue = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild


    invisibleVenue.value = venue


    const invisibleLocation = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.firstElementChild

    invisibleLocation.value = location

    const invisibleDate = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild

    invisibleDate.value = date

    const invisibleBegins = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild

    invisibleBegins.value = begins

    const invisibleEnds = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild

    invisibleEnds.value = ends

    const invisibleStaffed = selector.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild

    invisibleStaffed.value = staffed

    if (invisibleStaffed.value === '') {

        invisibleStaffed.value = 'Not Staffed'

    }

}


function madeChangesMessage() {
     document.getElementById('content').innerHTML = ''
       document.getElementById('content').innerHTML = 'Your changes have been made!'

}



function inviteUserForm() {

   const selectedArea = document.getElementById('content')
    document.getElementById('contentheader').innerHTML = 'Invite User'

    selectedArea.innerHTML = ''

   const form = document.createElement('form')
   form.id = 'myform'
    form.setAttribute('onsubmit', 'emailjs.sendForm("ezstaff_gmail", "ez_staff_invite", this) return false')
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





    const button = document.createElement('button')
    button.value = 'Send Email'
    button.innerHTML = 'Send Email'
    button.id = 'submit'
    button.type = 'submit'
    button.className = 'btn btn-primary button2'
    button.setAttribute('onclick', 'inviteUser()')


    form.appendChild(emailLabel)
    form.appendChild(email)

    form.appendChild(button)



    selectedArea.appendChild(form)


}


function inviteUser() {

    const email = document.getElementById('email').value

    const organization = document.getElementById('organization').innerHTML


    return gapi.client.sheets.spreadsheets.values.append({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'M:Q',
      'includeValuesInResponse': 'false',
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



function inviteMessage() {

     const selectedArea = document.getElementById('content')
     selectedArea.innerHTML = 'Your invite has been sent!'
}



function employeeSignUp() {
    gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
          range: 'Sheet1!M2:Q',
        }).then(function(response) {

        const email = document.getElementById('email').value

          const range = response.result

            for (i = 0; i < range.values.length; i++) {
                const row = range.values[i]


                if (email === row[1]) {

                    const randomSelectorOnPage = document.getElementById('firstName')

                    const organization = document.createElement('input')

                    organization.value = row[3]

                    organization.id = 'organization'


                    randomSelectorOnPage.appendChild(organization)

                    organization.style.display = 'none'

                    signEmployeeUp()

                } else {

                    const selectedArea = document.getElementById('content')
                    selectedArea.innerHTML = ''
                    const message = document.createElement('p')
                    message.innerHTML = 'Sorry, an error ocurred while signing up!'
                    message.style.color = 'red'
                    document.getElementById('content').append(message)

                }
            }





        }, function(response) {
          appendPre('Error: ' + response.result.error.message)
        })
}


function signEmployeeUp() {

 const fullName = document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const organization = document.getElementById('organization').value


    return gapi.client.sheets.spreadsheets.values.append({
      'spreadsheetId': '1nowAa0bpUAE36TOHozhJTreHJH00EgEVcuM1UMgKf2g',
      'range': 'M:Q',
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
              password,
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
                    document.getElementById('content').append(message)
     //   just clear form values and append the above message below form
        }, function(error) {
        })

}

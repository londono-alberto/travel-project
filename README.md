# Take a Hike

<a href="https://guapguap.github.io/travel-project/">Take a Hike - Click here for deployed app</a>

# Take a Hike

Group Project #1 Take A Hike
Group Members: Alberto, Arthur, Mason, Timothy

General Technical Information:

     For each State in the US this Page accepts user input to provide:
        - National Park Links
        - Scalable Maps
        - A 5 Day Weather Forecast for National Park
        - Lists of History and Culturally Pertinent Details
        - A Hyperlink to the National Parks Directions
        - Cost of admission to each specific National Park
        - Interesting photos of each National Park

     This Application utilizes 3 Server Side APIs:
        - Google Maps
        - Weather
        - National Park Service

     This Application uses client-side storage to store persistent data through ??????????

    User Story:
    As a user who has been quarantined for two years, we wanted a go to website to find parks and trails that lists information regarding the park.

    	Concept:
    	As an avid outdoor person, I wanted to go to a website that gives me high level park information when I select a park that I wanted to checkout.

    Roles:

Alberto: Worked on the JavaScript. Focused on the functionality of the Park selection, park display of information (park buttons, carousel, activites), local storage
<br>
Mason: Worked on the JavaScript. Focused on the functionality of the maps, weather, park display of information (about and description), local storage.
<br>
Timothy: Worked on the CSS and HTML. Focused on the styling and layout of the website to be engaging and user intuitive.
<br>
Arthur: Worked on the ReadMe, PowerPoint, and Software Testing. Focused on fleshing out the bugs and errors of the current main branch.

Repository:
<br>
Repository Name is: travel-project
<br>
Repository contains at least 133 commit comments.

#Github Repository and Deployed Application:
<br>

- Deployed Page Link: https://guapguap.github.io/travel-project/
  <br>
- Github Repo: https://github.com/Guapguap/travel-project

#Presentation:
<br>
Link to PowerPoint: [add PP link](https://onedrive.live.com/edit.aspx?resid=DE955333573C7D02!115&ithint=file%2cpptx&wdOrigin=OFFICECOM-WEB.START.MRU)

#Version 2.0 Might Include:
<br>
The addition of photos to the corresponding parks in the park list would be an enhancement. Style updates might be to add a background image and animation to the State drop down list. Google Maps could be expanded to include additional pins.

#General Functionality:
<br>
The user is initially presented with a drop down to select a US State. Upon selecting "Submit" the transition presents a list of State specific National Parks
from which the user would make a selection. The result would present the user with a Google Map, Park specific photo carousel, historical details about the
selected park and a list of interesting activities available at the park. There is also entry cost details and a National Park Directory link for travel help.
Additionaly, the "Weather Forecast" button becomes available. When the "Weather Forecast" button is selected the user is presented with a 5 days forecast of
the specific park. The "Weather Forecast" button will close the 5 day forecast window. At the top of the screen there is a "Select State" button which will
bring the user back to a screen that allows the user to select a different state and collection of parks. To the right of the screen a list of each park
explored is saved for reference. The "Clear Recent Parks" button will clear this list from the screen.

#Challenges
<br>
Challenges we faced were mainly the functionality of some the features we implemented.
<br>

- One problem was event bubbling on the park list when a specific button is not clicked it would end up running the function and then locally storing the entire div.
  <br>
- Another was that the weather api. We had the latitude and longitude displaying an error within the console before it even ran.
  <br>
- Local Storage was another big obstacle that we encountered. We reworked it as a different feature in our application that kept giving an error.

#Successes
<br>

- A lot of the successes derived from the challenges we encountered. We were able to push through and resolve the issues and find different solutions to some of the problems.
  <br>
- Aside from the coding aspect, further into the project building process, we ended up establishing a nice work flow in the group.

<!-- # Demo

![Gif Demo](Assets/HikeTaker.gif) -->

#Screenshots:
<br><br>
Search Screen lets you select parks by state via dropdown selection
![takeahikess1](https://user-images.githubusercontent.com/35643709/169659263-671fcec7-b577-4438-bb5b-2805b2caf071.JPG)
<br>
Park list added after state selection
![takeahikess2](https://user-images.githubusercontent.com/35643709/169659279-c0650f1f-2e0b-4a50-a5d6-d7dfc184ca76.jpg)
<br>
Park Landing Page opens with location display via Google Maps
![takeahikess3](https://user-images.githubusercontent.com/35643709/169659294-60073449-95da-476f-b015-b0bca430b7e7.JPG)
<br>
Park information from api to National Park Service website
![takeahikess4](https://user-images.githubusercontent.com/35643709/169659300-5555fd9a-bfb2-4208-aa31-93d08ee1b305.jpg)
<br>
Dynamic 5 day weather forecast for chosen park
![takeahikeweather](https://user-images.githubusercontent.com/35643709/169659740-1b89ae8c-333f-4a18-80d2-4fe4f970a17b.JPG)
<br>
List of park activities
![takeahikess5](https://user-images.githubusercontent.com/35643709/169659312-7aeb2805-f963-4318-b62b-6c709cbdbbe3.JPG)

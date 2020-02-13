/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/



/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/



//const followersArray = [];

const cards = document.querySelector( '.cards' );

axios.get('https://api.github.com/users/SteveMM-III')
   .then( response => {
      cards.appendChild( CardCreator( response.data ) ); 
   })
   .catch( error => { console.log( `Error: ${error}`) } );


axios.get('https://api.github.com/users/SteveMM-III/followers')
   .then( response => {
      response.data.forEach( e => { 
         axios.get(e.url)
            .then( res => {
               cards.appendChild( CardCreator( res.data ) ); 
            })
            .catch( error => { console.log( `Error: ${error}`) } );
      });
   })
   .catch( error => { console.log( `Error: ${error}`) } );


const CardCreator = ( obj ) => {
   const card      = document.createElement( 'div' );
   const img       = document.createElement( 'img' );
   const info      = document.createElement( 'div' );
   const name      = document.createElement( 'h3'  );
   const user      = document.createElement( 'p'   );
   const loc       = document.createElement( 'p'   );
   const prof      = document.createElement( 'p'   );
   const link      = document.createElement( 'a'   );
   const followers = document.createElement( 'p'   );
   const following = document.createElement( 'p'   );
   const bio       = document.createElement( 'p'   );
   const cal       = document.createElement( 'div' );
   
   name.textContent      = obj.name;
   user.textContent      = obj.login;
   loc.textContent       = `Location: ${obj.location}`;
   prof.textContent      = `Profile:`;
   link.textContent      = obj.url;
   followers.textContent = `Followers: ${obj.followers}`;
   following.textContent = `Following: ${obj.following}`;
   bio.textContent       = `Bio: ${obj.bio}`;
   
   img.setAttribute ( 'src', obj.avatar_url );
   link.setAttribute( 'href', obj.url       );
   
   card.style.flexWrap = 'wrap';
   cal.style.width = '100%';
   
   card.classList.add( 'card'      );
   info.classList.add( 'card-info' );
   name.classList.add( 'name'      );
   user.classList.add( 'username'  );
   cal.classList.add ( 'calendar'  );
   
   new GitHubCalendar( cal, obj.login, { responsive: true } );
   
   card.appendChild( img       );
   card.appendChild( info      );
   info.appendChild( name      );
   info.appendChild( user      );
   info.appendChild( loc       );
   info.appendChild( prof      );
   prof.appendChild( link      );
   info.appendChild( followers );
   info.appendChild( following );
   info.appendChild( bio       );
   card.appendChild( cal       );
   
   
   
   return card;
};

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

const getSongsByArtist = () => {
  // Clear tracklist div
  document.getElementById('trackList').innerHTML = "";

  // Get searched artist value in input field typed in by user
  const searchedArtist = document.getElementById('artist').value

  // Uppercase first letter of artist name
  const caseFormattedSearch = searchedArtist.charAt(0).toUpperCase() + searchedArtist.slice(1)

  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', 'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' + caseFormattedSearch + '&api_key=01d67fa8b4f33dce213f0c366ed33511&format=json', true);
  

  request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  console.log(`What is the data returned from the API? : `, data)

  data.toptracks.track.forEach((currTrack) => {
      const node = document.createElement("div")
      // Create image element and append to div
      var imgElement = document.createElement("img")
      imgElement.setAttribute("src", currTrack.image[1]['#text']);
      node.appendChild(imgElement)
      // Create artist text and append to div
      const text = document.createTextNode(caseFormattedSearch + ' - ' + currTrack.name + ' | Playcount: ' + currTrack.playcount) 
      node.appendChild(text)
      var addBtn = document.createElement("button")
      addBtn.innerText = 'Add Song'
      node.appendChild(addBtn)
      document.getElementById("trackList").appendChild(node)
    })
  }
  // Send request
  request.send();
}

// Not the best way to do this, but this code adds a listener so when you press enter key (keyCode - 13),
//  it executes the function that the 'Search' button executes. This works for now but I would find a 
//  better way to do this if you have time.
document.getElementById("artist")
    .addEventListener("keyup", function(event){
    // Cancel the default action, if needed
  event.preventDefault();
    if (event.keyCode === 13) {
        getSongsByArtist()
    }
});
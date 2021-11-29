// const searchSongs= async()=>{
//     const searchText=document.getElementById('search-field').value;
//     const url=`https://api.lyrics.ovh/suggest/:${searchText}`
//     const res= await fetch(url);
//     const data = await res.json();
   
//        displaySongs(data.data);

// }

const searchSongs=()=>{
    const searchText=document.getElementById('search-field').value;
    const url=`https://api.lyrics.ovh/suggest/:${searchText}`
    fetch(url)
    .then(res=>res.json())
    .then(data =>displaySongs(data.data))
    .catch(error=>displayError("Something went wrong!! please try again later!! "))

}

const displaySongs=songs=>{
   const songContainer=document.getElementById("search-result")
   songContainer.innerHTML='';
   document.getElementById('song-lyrics').innerText='';
    songs.forEach(songs=>{
        
       const songDiv=document.createElement("div")
       songDiv.className="single-result row align-items-center my-3 p-3"
       songDiv.innerHTML=`
        <div class="single-result row align-items-center my-3 p-3">
        
        <div class="col-md-9">
            <img src="${songs.artist.picture}">
            <h3 class="lyrics-name mt-2">${songs.title}</h3>
            <p class="author lead mt-2">Album by <span>${songs.artist.name}</span></p>
            <audio controls>
            <source src="${songs.preview}" type="audio/mp3">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${songs.artist.name}','${songs.title}' )" class="btn btn-success">Get Lyrics</button>
        </div>
       </div>
     
       
       `;
        songContainer.appendChild(songDiv);
    })
}


const getLyric=async(artist,title)=>{
    const url=`https://api.lyrics.ovh/v1/${artist}/${title}`
  try {
    const res= await fetch(url)
    const data= await res.json()
    displayLyrics(data.lyrics)    
}
catch(error){
    displayError('sorry ! failed to load the Lyrics');
}

}


const displayLyrics=lyrics=>{
    const lyricsDiv=document.getElementById('song-lyrics')
    lyricsDiv.innerText='';
    lyricsDiv.innerText=lyrics;

}


const displayError=error=>{
    const errorTag=document.getElementById('error-msg');
    errorTag.innerText=error;
    errorTag.className="justify-content-center align-items-center text-danger text-center"
}

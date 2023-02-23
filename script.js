console.log("Welcome to Spotify");

// initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems= document.getElementsByClassName('songItem');
console.log(songItems);
songItems = Array.from(songItems);
console.log(songItems);
let masterSongName = document.getElementById('masterSongName');
let songItemContainer = document.querySelector('.songItemContainer');
console.log(songItemContainer);
let idArray = Array.from(songItemContainer.getElementsByTagName('i'));
console.log(idArray);
let time = document.getElementsByClassName('time');
console.log(time);
time = Array.from(time);
console.log(time);
let timeDurationOfSongs = [];

let songs = [
    {songName: "Let me Love You" , filePath: "songs/1.mp3" , coverPath: "covers/1.jpg"},
    {songName: "perfect" , filePath: "songs/2.mp3" , coverPath: "covers/2.jpg"},
    {songName: "thinking out loud" , filePath: "songs/3.mp3" , coverPath: "covers/3.jpg"},
    {songName: "attention" , filePath: "songs/4.mp3" , coverPath: "covers/4.jpg"},
    {songName: "All i want" , filePath: "songs/5.mp3" , coverPath: "covers/5.jpg"},
    {songName: "Hey there delilah" , filePath: "songs/6.mp3" , coverPath: "covers/6.jpg"},
    {songName: "Castle on the hill!" , filePath: "songs/7.mp3" , coverPath: "covers/7.jpg"},
    {songName: "Heathens" , filePath: "songs/8.mp3" , coverPath: "covers/8.jpg"},
    {songName: "Pompeii" , filePath: "songs/9.mp3" , coverPath: "covers/9.jpg"},
    {songName: "Somebody that I used to know" , filePath: "songs/10.mp3" , coverPath: "covers/10.jpg"}
]
songItems.forEach((element, idx)=>{
    console.log(element, idx);
    console.log(element.getElementsByTagName('img'));
   element.getElementsByTagName('img')[0].src = songs[idx].coverPath;   // here,[0] isliye kyunki getElementbyTagName returns an html collection
//    console.log(element.getElementsByClassName('songName'));
   element.getElementsByClassName('songName')[0].innerText = songs[idx].songName;
   
})

// audioElement.play();

//Handling Pause/Play click
let target;
let targetId;

masterPlay.addEventListener('click' , ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        targetId = songIndex;
        let requiredElement = idArray[songIndex];
        requiredElement.classList.remove('fa-play-circle');
        requiredElement.classList.add('fa-pause-circle');
        // console.log(requiredElement);
        
        // target = document.querySelector(`#${targetId}`);
        // console.log(audioElement.duration);

    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        targetId = songIndex;
        let requiredElement = idArray[songIndex];
        requiredElement.classList.remove('fa-pause-circle');
        requiredElement.classList.add('fa-play-circle');

    }
})
let minutes = 0;
let progress;
let u=0;
audioElement.addEventListener('timeupdate' , ()=>{
    // console.log("Time Update");
    //updating Seekbar---
     progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value = progress;
    
    // let seconds = Math.floor(audioElement.currentTime%60);
    
    // if(audioElement.currentTime == 0.000000 && audioElement.currentTime>= 1){
        
    //     // u++;
    //     // if(u==1){
    //     //     minutes++;
    //     // }
        
        
        
        
    //     // seconds=0;
    //     console.log("a minute passed");
    // }
    // // if(Math.floor(audioElement.currentTime) == 60){
    // // minutes++;
    // // }
    
    
    if(Math.floor(Math.floor(audioElement.currentTime) % 60)<=9){
        time[songIndex].textContent = `0${Math.floor(Math.floor(audioElement.currentTime)/60)}:
        0${Math.floor(Math.floor(audioElement.currentTime) % 60)}`;
    }else{
        time[songIndex].textContent = `0${Math.floor(Math.floor(audioElement.currentTime)/60)}:
        ${Math.floor(Math.floor(audioElement.currentTime) % 60)}`;
    }
    // time[songIndex].textContent = Math.floor(audioElement.currentTime); // now it runs in seconds
    // songProgress = parseInt((audioElement.currentTime/audioElement.duration)*60) ;
    
    

})
myProgressBar.addEventListener('change' , ()=>{
    // audioElement.currentTime = myProgressBar.value;  This doesn't work since myprogressBar.value is in percentage(since 'progress' is in percentage) so, we need to convert it back.
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})
// myProgressBar.addEventListener('touchmove' ,()=>{
//     audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
// } )

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
// let songIndex;
const makeAllZero = ()=>{
    time.forEach((element)=>{
        element.textContent = `00:00`;
    })
}
let p=0;
let pasuedAt;
let songIndexOfTheSongPaused;
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
    console.log(e.target);  // this is used to get what was clicked ----V.V.V.V.V IMP!!!!!!
    
    if(e.target.classList.contains('fa-pause-circle')){
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        console.log('meow');
        p++;
         pasuedAt = audioElement.currentTime;
        console.log(pasuedAt);
        songIndexOfTheSongPaused = parseInt(e.target.id);

    }
    else{
        makeAllZero();
    makeAllPlays();
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    // element.addEventListener('click' , (e)=>{
    //     if(e.target.classList.contains('fa-pause-circle')){
    //         e.target.classList.remove('fa-pause-circle');
    //         e.target.classList.add('fa-play-circle');
    //         audioElement.pause();
    //     }
    // })
    // let songIndex = parseInt(element.id); OR
    songIndex = parseInt(e.target.id);
    // console.log(songIndex);
    audioElement.src = `songs/${songIndex+1}.mp3`;
    if(p>0 && songIndexOfTheSongPaused=== songIndex){
        audioElement.currentTime = pasuedAt;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        p=0;
    }else{
        makeAllZero();
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;}
    }
    })
})

    let previousSong = document.getElementById('previous');
    let nextSong = document.getElementById('next');
    nextSong.addEventListener('click' , ()=>{
      if(songIndex>=9){
        songIndex=0;
      }else{
        songIndex +=1;
      }
      
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    makeAllPlays();
    makeAllZero();
    let nextSongElement = idArray[songIndex];
        nextSongElement.classList.remove('fa-play-circle');
        nextSongElement.classList.add('fa-pause-circle');

    })

    previousSong.addEventListener('click' ,()=>{
        if(songIndex<=0){
            songIndex=9;
          }else{
            songIndex -=1;
          }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex].songName;
        makeAllPlays();
        makeAllZero();
        let nextSongElement = idArray[songIndex];
        nextSongElement.classList.remove('fa-play-circle');
        nextSongElement.classList.add('fa-pause-circle');

    } )

//song stop


// Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
//     element.addEventListener('click' , (e)=>{
//     if(e.target.classList.contains('fa-pause-circle')){
//         e.target.classList.remove('fa-pause-circle');
//         e.target.classList.add('fa-play-circle');

//     }
//     })
// })
console.log(audioElement.duration);
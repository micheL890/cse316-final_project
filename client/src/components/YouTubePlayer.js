import React from 'react';
import YouTube from 'react-youtube';
import { GlobalStoreContext } from '../store/index.js'
import { useContext } from 'react'

export default function YouTubePlayerExample() {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    /*let playlist = [
        "b1kbLwvqugk", //anti hero
        "mkR_Qwix4Ho", // lavender haze 
        "lvHZjvIyqsk", // maroon 
        "ic8j13piAhQ", // cruel summer
        "VsKoOH6DVys", // london boy
        "2d1wKn-oJnA", // I think he knows
        "EUoe7cf0HYw", // gorgeous
        "KjwTwvtwFlE", // how you get the girl
        "V54CEElTF_U", // call it what you want 
        
        "mqmxkGjow1A", 
        "8RbXIMZmVv8",
        "8UbNbor3OqQ"
    ];*/

    const { store } = useContext(GlobalStoreContext);
    let playlist = new Array(store.currentList.length);
    if (store.currentList != null){
        /*for(let i = 0; i< store.currentList.length; i++){
            playlist[i] = store.currentList.songs[i].youTubeId;
        }*/

        store.currentList.songs.map((song, index) => (
            playlist[index] = song.youTubeId
        ))
    } 

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;

    const playerOptions = {
        height: '234', //390
        width: '384', //640
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
    }

    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    return <YouTube
        videoId={playlist[currentSong]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} />;
}
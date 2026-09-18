/* =========================================
   MUSIC PLAYER
========================================= */

const audio = document.getElementById("audio");

const playButton = document.getElementById("playButton");
const previousButton = document.getElementById("previousBtn");
const nextButton = document.getElementById("nextBtn");

const shuffleButton = document.getElementById("shuffleBtn");
const repeatButton = document.getElementById("repeatBtn");

const progressBar = document.getElementById("progressBar");

const currentTimeElement =
    document.getElementById("currentTime");

const durationElement =
    document.getElementById("duration");

const volumeBar =
    document.getElementById("volumeBar");

const muteButton =
    document.getElementById("muteButton");

const playerTitle =
    document.getElementById("playerTitle");

const playerArtist =
    document.getElementById("playerArtist");

const playerCover =
    document.getElementById("playerCover");

const playlistElement =
    document.getElementById("playlist");

const songGrid =
    document.getElementById("songGrid");

const searchInput =
    document.getElementById("searchInput");

const heroPlay =
    document.getElementById("heroPlay");

const likeButton =
    document.getElementById("likeButton");

const musicUpload =
    document.getElementById("musicUpload");

const playlistCount =
    document.getElementById("playlistCount");

const clearPlaylist =
    document.getElementById("clearPlaylist");


/* =========================================
   SONG DATA
========================================= */

/*
    These are DEMO audio files.

    For your own music:

    1. Put mp3 files in your project.
    2. Change "url" to:
       "music/song.mp3"

    Example:

    {
        title: "My Song",
        artist: "My Artist",
        album: "My Album",
        cover: "images/cover.jpg",
        url: "music/song.mp3"
    }
*/

const songs = [

    {
        id: 1,

        title: "Dreams",

        artist: "Benjamin Tissot",

        album: "Acoustic",

        cover:
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80",

        url:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },

    {
        id: 2,

        title: "Adventure",

        artist: "SoundHelix",

        album: "Journey",

        cover:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",

        url:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },

    {
        id: 3,

        title: "Night Drive",

        artist: "SoundHelix",

        album: "Midnight",

        cover:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",

        url:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },

    {
        id: 4,

        title: "Memories",

        artist: "SoundHelix",

        album: "Memories",

        cover:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",

        url:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },

    {
        id: 5,

        title: "Summer",

        artist: "SoundHelix",

        album: "Summer Vibes",

        cover:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&q=80",

        url:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },

    {
        id: 6,

        title: "Ocean",

        artist: "SoundHelix",

        album: "Relax",

        cover:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",

        url:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },

    {
        id: 7,

        title: "Lost Stars",

        artist: "SoundHelix",

        album: "Stars",

        cover:
            "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80",

        url:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },

    {
        id: 8,

        title: "Peace",

        artist: "SoundHelix",

        album: "Calm",

        cover:
            "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600&q=80",

        url:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    }

];


/* =========================================
   PLAYER STATE
========================================= */

let currentIndex = 0;

let isShuffle = false;

let isRepeat = false;

let isMuted = false;

let previousVolume = 0.8;

let filteredSongs = [...songs];


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");

    return `${minutes}:${secs}`;
}


/* =========================================
   LOAD SONG
========================================= */

function loadSong(index, autoPlay = false) {

    if (!songs[index]) {
        return;
    }

    currentIndex = index;

    const song = songs[currentIndex];

    audio.src = song.url;

    audio.load();

    playerTitle.textContent =
        song.title;

    playerArtist.textContent =
        song.artist;

    playerCover.src =
        song.cover;

    progressBar.value = 0;

    currentTimeElement.textContent =
        "0:00";

    durationElement.textContent =
        "0:00";

    renderPlaylist();

    updatePlayIcon();

    if (autoPlay) {
        playSong();
    }
}


/* =========================================
   PLAY
========================================= */

async function playSong() {

    if (!audio.src) {
        loadSong(currentIndex);
    }

    try {

        await audio.play();

        updatePlayIcon();

    } catch (error) {

        console.error(
            "Audio playback failed:",
            error
        );

        alert(
            "The audio could not be played. " +
            "Check your internet connection or use " +
            "Add Local Music to select an MP3."
        );
    }
}


/* =========================================
   PAUSE
========================================= */

function pauseSong() {

    audio.pause();

    updatePlayIcon();
}


/* =========================================
   PLAY / PAUSE
========================================= */

function togglePlay() {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }
}


/* =========================================
   PLAY ICON
========================================= */

function updatePlayIcon() {

    const icon =
        playButton.querySelector("i");

    if (audio.paused) {

        icon.className =
            "fa-solid fa-play";

    } else {

        icon.className =
            "fa-solid fa-pause";

    }
}


/* =========================================
   NEXT SONG
========================================= */

function nextSong() {

    if (isShuffle) {

        let randomIndex;

        do {

            randomIndex =
                Math.floor(
                    Math.random() * songs.length
                );

        } while (
            randomIndex === currentIndex &&
            songs.length > 1
        );

        currentIndex = randomIndex;

    } else {

        currentIndex++;

        if (currentIndex >= songs.length) {

            currentIndex = 0;

        }

    }

    loadSong(currentIndex, true);
}


/* =========================================
   PREVIOUS SONG
========================================= */

function previousSong() {

    /*
        If the song has already played
        more than 3 seconds, restart it.
    */

    if (audio.currentTime > 3) {

        audio.currentTime = 0;

        return;

    }

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex =
            songs.length - 1;

    }

    loadSong(currentIndex, true);
}


/* =========================================
   PROGRESS UPDATE
========================================= */

audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration) {
            return;
        }

        const progress =
            (audio.currentTime /
                audio.duration) * 100;

        progressBar.value =
            progress;

        currentTimeElement.textContent =
            formatTime(audio.currentTime);

    }
);


/* =========================================
   METADATA LOADED
========================================= */

audio.addEventListener(
    "loadedmetadata",
    () => {

        durationElement.textContent =
            formatTime(audio.duration);

    }
);


/* =========================================
   CHANGE PROGRESS
========================================= */

progressBar.addEventListener(
    "input",
    () => {

        if (!audio.duration) {
            return;
        }

        audio.currentTime =
            (progressBar.value / 100) *
            audio.duration;

    }
);


/* =========================================
   AUTO NEXT
========================================= */

audio.addEventListener(
    "ended",
    () => {

        if (isRepeat) {

            audio.currentTime = 0;

            playSong();

        } else {

            nextSong();

        }

    }
);


/* =========================================
   VOLUME
========================================= */

volumeBar.addEventListener(
    "input",
    () => {

        const volume =
            Number(volumeBar.value);

        audio.volume =
            volume;

        previousVolume =
            volume;

        isMuted = volume === 0;

        updateVolumeIcon();

    }
);


/* =========================================
   MUTE
========================================= */

muteButton.addEventListener(
    "click",
    () => {

        if (isMuted) {

            audio.volume =
                previousVolume || 0.8;

            volumeBar.value =
                previousVolume || 0.8;

            isMuted = false;

        } else {

            previousVolume =
                audio.volume;

            audio.volume = 0;

            volumeBar.value = 0;

            isMuted = true;

        }

        updateVolumeIcon();

    }
);


/* =========================================
   VOLUME ICON
========================================= */

function updateVolumeIcon() {

    const icon =
        muteButton.querySelector("i");

    if (audio.volume === 0) {

        icon.className =
            "fa-solid fa-volume-xmark";

    } else if (audio.volume < 0.5) {

        icon.className =
            "fa-solid fa-volume-low";

    } else {

        icon.className =
            "fa-solid fa-volume-high";

    }
}


/* =========================================
   SHUFFLE
========================================= */

shuffleButton.addEventListener(
    "click",
    () => {

        isShuffle =
            !isShuffle;

        shuffleButton.classList.toggle(
            "active",
            isShuffle
        );

    }
);


/* =========================================
   REPEAT
========================================= */

repeatButton.addEventListener(
    "click",
    () => {

        isRepeat =
            !isRepeat;

        repeatButton.classList.toggle(
            "active",
            isRepeat
        );

    }
);


/* =========================================
   PLAY BUTTON
========================================= */

playButton.addEventListener(
    "click",
    togglePlay
);


/* =========================================
   NEXT / PREVIOUS
========================================= */

nextButton.addEventListener(
    "click",
    nextSong
);

previousButton.addEventListener(
    "click",
    previousSong
);


/* =========================================
   RENDER SONG CARDS
========================================= */

function renderSongs(list = songs) {

    songGrid.innerHTML = "";

    if (!list.length) {

        songGrid.innerHTML =
            `<div class="empty">
                No songs found.
            </div>`;

        return;
    }

    list.forEach(song => {

        const realIndex =
            songs.findIndex(
                item => item.id === song.id
            );

        const card =
            document.createElement("div");

        card.className =
            "song-card";

        card.innerHTML = `

            <img
                class="song-image"
                src="${song.cover}"
                alt="${song.title}"
                loading="lazy"
            >

            <button
                class="card-play"
                data-index="${realIndex}"
            >
                <i class="fa-solid fa-play"></i>
            </button>

            <h3>${song.title}</h3>

            <p>${song.artist}</p>
        `;

        card.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        ".card-play"
                    )
                ) {
                    return;
                }

                loadSong(realIndex, true);

            }
        );

        const cardPlay =
            card.querySelector(".card-play");

        cardPlay.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                loadSong(
                    realIndex,
                    true
                );

            }
        );

        songGrid.appendChild(card);

    });
}


/* =========================================
   RENDER PLAYLIST
========================================= */

function renderPlaylist() {

    playlistElement.innerHTML = "";

    playlistCount.textContent =
        `${songs.length} songs`;

    if (!songs.length) {

        playlistElement.innerHTML =
            `<div class="empty">
                Your playlist is empty.
            </div>`;

        return;
    }

    songs.forEach((song, index) => {

        const item =
            document.createElement("div");

        item.className =
            "playlist-item";

        if (index === currentIndex) {

            item.classList.add("active");

        }

        item.innerHTML = `

            <div class="playlist-number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <div class="playlist-song">

                <img
                    src="${song.cover}"
                    alt="${song.title}"
                >

                <div class="playlist-song-info">

                    <strong>
                        ${song.title}
                    </strong>

                    <span>
                        ${song.artist}
                    </span>

                </div>

            </div>

            <div class="playlist-duration">
                ${song.album}
            </div>

            <button
                class="playlist-more"
                title="Play"
            >
                <i class="fa-solid fa-play"></i>
            </button>

        `;

        item.addEventListener(
            "click",
            () => {

                loadSong(index, true);

            }
        );

        playlistElement.appendChild(item);

    });
}


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();

        if (!query) {

            filteredSongs =
                [...songs];

        } else {

            filteredSongs =
                songs.filter(song =>

                    song.title
                        .toLowerCase()
                        .includes(query)

                    ||

                    song.artist
                        .toLowerCase()
                        .includes(query)

                    ||

                    song.album
                        .toLowerCase()
                        .includes(query)

                );

        }

        renderSongs(filteredSongs);

    }
);


/* =========================================
   HERO BUTTON
========================================= */

heroPlay.addEventListener(
    "click",
    () => {

        if (audio.src && !audio.paused) {

            pauseSong();

        } else {

            playSong();

        }

    }
);


/* =========================================
   LIKE BUTTON
========================================= */

likeButton.addEventListener(
    "click",
    () => {

        likeButton.classList.toggle(
            "liked"
        );

        const icon =
            likeButton.querySelector("i");

        if (
            likeButton.classList.contains(
                "liked"
            )
        ) {

            icon.className =
                "fa-solid fa-heart";

        } else {

            icon.className =
                "fa-regular fa-heart";

        }

    }
);


/* =========================================
   LOCAL MUSIC UPLOAD
========================================= */

musicUpload.addEventListener(
    "change",
    event => {

        const files =
            Array.from(event.target.files);

        if (!files.length) {
            return;
        }

        files.forEach(
            (file, fileIndex) => {

                const objectURL =
                    URL.createObjectURL(file);

                const localSong = {

                    id:
                        Date.now() +
                        fileIndex,

                    title:
                        file.name
                            .replace(
                                /\.[^/.]+$/,
                                ""
                            ),

                    artist:
                        "Local Music",

                    album:
                        "Your Device",

                    cover:
                        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",

                    url:
                        objectURL,

                    local:
                        true

                };

                songs.push(localSong);

            }
        );

        filteredSongs =
            [...songs];

        renderSongs(filteredSongs);

        renderPlaylist();

        /*
            Automatically select first
            uploaded song.
        */

        const firstUploaded =
            songs.length - files.length;

        loadSong(
            firstUploaded,
            false
        );

        /*
            Reset input so same file
            can be selected again.
        */

        musicUpload.value = "";

    }
);


/* =========================================
   CLEAR PLAYLIST
========================================= */

clearPlaylist.addEventListener(
    "click",
    () => {

        /*
            Keep original demo songs.
            Remove only locally uploaded songs.
        */

        for (
            let i = songs.length - 1;
            i >= 0;
            i--
        ) {

            if (songs[i].local) {

                songs.splice(i, 1);

            }

        }

        if (!songs.length) {

            audio.pause();

            audio.src = "";

            playerTitle.textContent =
                "Select a song";

            playerArtist.textContent =
                "Artist";

            playerCover.src =
                "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80";

        } else {

            if (
                currentIndex >= songs.length
            ) {

                currentIndex = 0;

            }

            loadSong(
                currentIndex,
                false
            );

        }

        filteredSongs =
            [...songs];

        renderSongs(filteredSongs);

        renderPlaylist();

    }
);


/* =========================================
   KEYBOARD SHORTCUTS
========================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
            Don't trigger shortcuts while
            typing in search.
        */

        if (
            document.activeElement ===
            searchInput
        ) {
            return;
        }

        switch (event.code) {

            case "Space":

                event.preventDefault();

                togglePlay();

                break;

            case "ArrowRight":

                if (audio.duration) {

                    audio.currentTime =
                        Math.min(
                            audio.duration,
                            audio.currentTime + 5
                        );

                }

                break;

            case "ArrowLeft":

                if (audio.duration) {

                    audio.currentTime =
                        Math.max(
                            0,
                            audio.currentTime - 5
                        );

                }

                break;

        }

    }
);


/* =========================================
   AUDIO ERROR
========================================= */

audio.addEventListener(
    "error",
    () => {

        console.error(
            "Could not load:",
            audio.src
        );

        /*
            Don't show alert immediately
            because browsers can briefly
            report loading errors.
        */

    }
);


/* =========================================
   INITIALIZE
========================================= */

audio.volume = 0.8;

volumeBar.value = 0.8;

renderSongs();

renderPlaylist();

loadSong(
    0,
    false
);
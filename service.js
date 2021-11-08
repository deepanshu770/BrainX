import TrackPlayer from 'react-native-track-player';
module.exports = async function() {
    
    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

    // This service needs to be registered for the module to work
    // but it will be used later in the "Receiving Events" section
}
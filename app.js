angular.module('plunker', ['ui.bootstrap']);
var ModalDemoCtrl = function ($scope, $modal, $log) {

    $scope.playlist = {
        playlist: 'name',
        name: null,
        URL: null
    };

    $scope.open = function () {

        $modal.open({
            templateUrl: 'myModalContent.html', // loads the template
            backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
            windowClass: 'modal', // windowClass - additional CSS class(es) to be added to a modal window template
            controller: function ($scope, $modalInstance, $log, playlist) {
                $scope.playlist = playlist;
                $scope.submit = function () {
                    $log.log('Submiting playlist info.'); // kinda console logs this statement
                    $log.log(playlist); 
                    $modalInstance.dismiss('cancel'); // dismiss(reason) - a method that can be used to dismiss a modal, passing a reason
                }
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel'); 
                };
            },
            resolve: {
                playlist: function () {
                    return $scope.playlist;
                }
            }
        });//end of modal.open
    }; // end of scope.open function
};

// html5media enables <video> and <audio> tags in all major browsers
// External File: https://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: https://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'http://localhost/playlist/music/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "All This Is - Joe L.'s Studio",
                "length": "2:46",
                "file": "JLS_ATI"
            }, {
                "track": 2,
                "name": "The Forsaken - Broadwing Studio (Final Mix)",
                "length": "8:31",
                "file": "BS_TF",
            }, {
                "track": 3,
                "name": "All The King's Men - Broadwing Studio (Final Mix)",
                "length": "5:02",
                "file": "BS_ATKM"
            }, {
                "track": 4,
                "name": "The Forsaken - Broadwing Studio (First Mix)",
                "length": "8:32",
                "file": "BSFM_TF"
            }, {
                "track": 5,
                "name": "All The King's Men - Broadwing Studio (First Mix)",
                "length": "5:05",
                "file": "BSFM_ATKM"
            }, {
                "track": 6,
                "name": "All This Is - Alternate Cuts",
                "length": "2:49",
                "file": "AC_ATI"
            }, {
                "track": 8,
                "name": "All The King's Men (Take 2) - Alternate Cuts",
                "length": "5:27",
                "file": "AC_ATKMTake_2"
            }, {
                "track": 9,
                "name": "Magus - Alternate Cuts",
                "length": "5:46",
                "file": "AC_M"
            }, {
                "track": 11,
                "name": "Meeetallica - Nothing Else Matters",
                "file": "Metallica-Nothing_Else_Matters",
                "image": "http://localhost/playlist/docs/pics/aerosmith.png"
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackLength = value.length;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                } else {
                    trackNumber = '' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).bind('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});
angular.module('plunker', ['ui.bootstrap']);
var ModalDemoCtrl = function ModalDemoCtrl ($scope, $http) {

  $scope.init=function(){
    getAllAlbums();
  }  

  function getAllAlbums(){
        $http.get('api/playlist.php?type=songs').then(function(data){
            //loadPlayer();
        });
  }
  $scope.stepBack = function () {
    $scope.currentStep -= 1;
  };
  
  $scope.stepForward = function () {
    $scope.currentStep += 1;
  };
  
  $scope.showStep = function (step) {
    return step == $scope.currentStep;
  };

  $scope.open = function () {
    $scope.shouldBeOpen = true;
    $scope.currentStep = 1;
  };

  $scope.close = function () {
    $scope.closeMsg = 'I was closed at: ' + new Date();
    $scope.shouldBeOpen = false;
  };


  $scope.choices = [{song: 'choice1'}, {URL: 'choice2'}];
  
  $scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':'choice'+newItemNo});
  };
    
  $scope.removeChoice = function() {
    var lastItem = $scope.choices.length-1;
    $scope.choices.splice(lastItem);
  };
  
    
  $scope.opts = {
    backdropFade: true,
    dialogFade:true
  };
 $scope.submit = function () {
  var submitedData = {
  name:  $scope.playlist.name,
  image: $scope.playlist.image,
  song: $scope.choices
 }

   //$http.post("api/playlist.php?type=playlist").success(function(data){
    //$scope.items = submitedData;
   //});
    console.log(submitedData);
  }
};
/*
   $scope.getSongs = function () {
    $http.get("api/playlist.php?type=songs&id=" + id").success(function(data){
        loadPlayer();
    });
  }; 
  $scope.changeStatus = function(item, status, task) {
    if(status=='2'){status='0';}else{status='2';}
      $http.post("api/playlist.php").success(function(data){
        getItem();
      });
  };
*/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);

// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function loadPlayer($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://eladnm.net/playlist/music/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Coldplay-Viva_la_vida.mp3",
                "length": "2:46",
                "file": "Coldplay-Viva_la_vida"
            }, {
                "track": 2,
                "name": "Green_Day-American_idiot",
                "length": "8:31",
                "file": "Green_Day-American_idiot",
            }, {
                "track": 3,
                "name": "Green_Day_21_Guns",
                "length": "5:02",
                "file": "Green_Day_21_Guns"
            }, {
                "track": 4,
                "name": "Red_Hot_Chili_peppers-Californication",
                "length": "8:32",
                "file": "Red_Hot_Chili_peppers-Californication"
            }, {
                "track": 5,
                "name": "Metallica-Ronnie_Rising",
                "length": "5:05",
                "file": "Metallica-Ronnie_Rising"
            }, {
                "track": 6,
                "name": "The_Beatles-In_My_Life",
                "length": "2:49",
                "file": "The_Beatles-In_My_Life"
            }, {
                "track": 8,
                "name": "The_Beatles-Hey_Jude_live",
                "length": "5:27",
                "file": "The_Beatles-Hey_Jude_live"
            }, {
                "track": 9,
                "name": "Magus - Alternate Cuts",
                "length": "5:46",
                "file": "AC_M"
            }, {
                "track": 10,
                "name": "Metallica - Nothing Else Matters",
                "length": "6:29",
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
            btnPrev = $('.album').click(function () {
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
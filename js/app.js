angular.module('plunker', ['ui.bootstrap']);
var ModalDemoCtrl = function ModalDemoCtrl ($scope, $http, $log) {
 jQuery(function displayAllAlbums (data) {
    $http({
        method: 'GET',
        url: "api/playlist.php?type=playlist",
    })
    .success(function (data) {
     console.log(data);
     $scope.albums= data.data;
      
     })
     .error(function(err) {
        $log.error(err);
     })    
});    
(function loadPlaylists(data, id, songs, name, image){
     //console.log(data);  
   

  })();

// popup model
  $scope.title = "Build Your Playlist";  
  $scope.opts = {
    backdropFade: true,
    dialogFade:true
  };
  $scope.stepBack = function () {
    $scope.currentStep -= 1;
  };
  
  $scope.stepForward = function () {
    $scope.currentStep += 1;
  };
    $scope.hideSteps = function () {
    $scope.shouldBeOpen = false;
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
    var newItemNo = $scope.choices;
    $scope.choices.push({'id':'choice'+newItemNo});
  };
    
  $scope.removeChoice = function() {
    var lastItem = $scope.choices.length-1;
    $scope.choices.splice(lastItem);
  };
 $scope.submit = function () {
  var submitedData = {
  name:  $scope.choise.name,
  image: $scope.choise.image,
  songs: $scope.choices
 }
 // title and effects 

// var result = [1, 2, 3, 4, 5].filter(function (yoyo) {
//    return yoyo >= 3;
// });

// console.log(result) // [3, 4, 5]

 var filledSongs = submitedData.songs.filter(function (song) {
    return song.songName && song.songURL;
 })

    //'{name: "elad", lastName: "Nahum", fullName: "Elad Nahum", songs: [{name: "a", url: "some url"}, "b", "c"]}'
    //'name=elad&lastName=Nahum&fullName=Elad%20Nahum&songs[]=a&songs[]=b&songs[]=c'
// post data from popup
    var params = [];
    params.push('name=' + encodeURIComponent(submitedData.name));
    params.push('image=' + encodeURIComponent(submitedData.image));
    filledSongs.forEach(function (song, idx) {
        params.push('songs[' + idx + '][name]=' + encodeURIComponent(song.songName));
        params.push('songs[' + idx + '][url]=' + encodeURIComponent(song.songURL));
    });

    $http({
        method: 'POST',
        url: "api/playlist.php?type=playlist",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function (o) {
            return params.join('&');
        },
        data: {}
    })
    .success(function(response){
      $scope.hideSteps();
      console.log(response);
    })
    .error(function(response){
    console.log(response);
    });
  }
  $scope.playSongs=function(id) {
    $http({
        method: 'GET',
        url: "api/playlist.php?type=playlist_songs&id=" + id,
    })
    .success(function (data) {
        BuildPlayer(data.data.songs);
        $scope.PlaySong();
        console.log(data);
    })
     .error(function(err) {
        $log.error(err);
     }) 
}
$scope.PlaySong=function play(url){
    var player= $('#audio1')[0];
    player.src =  url;
    player.play();
}
function BuildPlayer(songs) {
   $scope.Songs=songs;
   var index = 0
   songCount = songs.length,
   npAction = $('#npAction'),
   $.each(songs , function(i, val){
     audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).bind('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < songCount) {
                    index++;
                    loadSong(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadSong(index);
                  }
                }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadSong(index);
                    if (playing) {
                        audio.play();
                     }
                    } else {
                    audio.pause();
                    index = 0;
                    loadSong(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < songCount) {
                    index++;
                    loadSong(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadSong(index);
                 }
                }),
                li = $('#plList li').click(function () {
                    var id = parseInt($(this).index());
                    if (id !== index) {
                    playSong(id);
                }
            }),
                loadSong = function (url) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + url + ')').addClass('plSel');
                plTitle.ng-binding;
                index = url;
                audio.src = songs.url;
            }
  }) 
 }
};
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);

     // var supportsAudio = !!document.createElement('audio').canPlayType;
   // if (supportsAudio) {
   //     var index = 0    
   //     extension=''    
/*
        $.each($scope.Songs , function(i, val){
              
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
                if ((index + 1) < songCount) {
                    index++;
                    loadSong(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadSong(index);
                }
            }).get(0),
            btnPrev = $('.album').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadSong(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadSong(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadSong(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadSong(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playSong(id);
                }
            }),
            loadSong = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + val.name + ')').addClass('plSel');
                npTitle.text(val.name);
                index = val.id;
                audio.src =  val.URL;
            },
            playSong = function (id) {
                loadSong(val.name);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadSong(index);
    })
}
*/

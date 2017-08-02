var app= angular.module('app', ['ui.bootstrap']);


app.controller("ModalDemoCtrl",function ($scope, $http, $log) {


    function init()
    {
        $scope.IsPlaying=false;
     $http({
            method: 'GET',
            url: "api/playlist.php?type=playlist",
        })
        .then(function (result) {
        // console.log(data);
         $scope.albums= result.data.data;
          
         })
         ,function(err) {
            $log.error(err);
         }   
     }; 

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
    if($scope.currentStep==1)
    {
        var pattern= /[.mp3]/
        var n = $scope.choise.image.search(pattern);
       if (n>-1) 
       {
        $scope.currentStep += 1;
       }
       else
       {
        //message to the client
       }
    }
    
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
    .then(function(result){
      $scope.hideSteps();
      console.log(response);
    })
    ,function(response){
      console.log(response);
    };
  }
  $scope.playSongs = function(album) {
    $scope.currentAlbum=album;
    $http({
      method: 'GET',
      url: "api/playlist.php?type=playlist_songs&id=" + album.id,
    })
    .then(function (result) {
      BuildPlayer(result.data.data.songs);
      $scope.PlaySong(result.data.data.songs[0].url);
      console.log(result.data);
    })
    ,function(err) {
      $log.error(err);
     }; 

    $scope.deleteAlbum= function(album) {

      var params = [];
      params.push('id=' + encodeURIComponent(album.id));
     
    $http({
        method: 'DELETE',
        url: "api/playlist.php?type=playlist_item",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
           transformRequest: function (o) {
            return params.join('&');
        },
        data: {}
        })
        .then(function (result) {
          console.log(result.data);
        })
        ,function(err) {
          $log.error(err);
     }; 
  }

    

}
$scope.PlaySong = function (url){
  var player= $('#audio1')[0];
  player.src =  url;
  player.play();
}
function BuildPlayer(songs) {
    //clone image
   $scope.Songs=songs;
   var index = 0
   songCount = songs.length,
   npAction = $('#npAction'),
     player = $('#audio1')
            .bind('play', function () {
                playing = true;
                 $scope.IsPlaying=true;
                 $scope.$apply()
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                $scope.IsPlaying=false;
                $scope.$apply()
                npAction.text('Paused...');
            }).bind('ended', function ()
             {
                npAction.text('Paused...');
                if ((index + 1) < songCount) {
                    index++;
                    loadSong(index);
                    player.play();
                } else {
                    player.pause();
                    index = 0;
                    loadSong(index);
                  }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadSong(index);
                    if (playing) {
                        player.play();
                     }
                    } else {
                    player.pause();
                    index = 0;
                    loadSong(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < songCount) {
                    index++;
                    loadSong(index);
                    if (playing) {
                        player.play();
                    }
                } else {
                    player.pause();
                    index = 0;
                    loadSong(index);
                 }
                }),
                loadSong = function (index) {
                console.log(songs[index].url);
                plTitle=songs[index].name;   
                index = index;
                player.src =songs[index].url;
                player.play();
                }
  
 }
 init();
});

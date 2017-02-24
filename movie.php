<!-- http://www.imdb.com/showtimes/title/"
 -->
<?php
    header('Content-Type: application/json');

    $aResult = array();

    if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

    if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

    if( !isset($aResult['error']) ) {

        switch($_POST['functionname']) {
            case 'getMovie':
               if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 1) ) {
                   $aResult['error'] = 'Error in arguments!';
               }
               else {
                  $query = "";
                  $query = urlencode($_POST['arguments'][0]);
                  //$json_str = file_get_contents("http://www.omdbapi.com/?t=" . $query . "&y=&plot=long&r=json&tomatoes=true");
                  $json_str = file_get_contents("http://www.omdbapi.com/?t=2012&y=&plot=short&r=json");
					$json = json_decode($json_str, true);

					$response =  "" . $json['Title'] .
					 
					  ". <br>Ratings: IMDB: " . $json['imdbRating'] .". Metacritic :". $json['Metascore']." Rotten Tomatoes: ".$json['tomatoMeter'].
					   "% <br>IMDB: http://www.imdb.com/title/" . $json['imdbID'] .

					    "/ <br>Plot: " . $json['Plot'].
					    " <br>Genre: " . $json['Genre'] .
					 " <br>Director: " . $json['Director'] .
					 " <br>Actors: " . $json['Actors'] .
					    "<br>Poster: ". $json['Poster'];
                  $aResult['result'] = $response;
               }
               break;

            default:
               $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
               break;
        }

    }

    echo json_encode($aResult);

?>
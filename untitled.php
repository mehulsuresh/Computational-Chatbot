<?php
$json_str = file_get_contents("http://www.omdbapi.com/?t=" . urlencode($_REQUEST["text"]) . "&y=&plot=short&r=json");
$json = json_decode($json_str, true);

echo "'" . $json['Title'] . "' " . $json['Year'] . ". Rating:" . $json['imdbRating'] . " IMDB: http://www.imdb.com/title/" . $json['imdbID'] . "/ Plot: " . $json['Plot'];
?>
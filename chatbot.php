<?php
    header('Content-Type: application/json');

    $aResult = array();

    if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

    if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

    if( !isset($aResult['error']) ) {

        switch($_POST['functionname']) {
            case 'getWolfram':
               if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 1) ) {
                   $aResult['error'] = 'Error in arguments!';
               }
               else {
                  $query = "";
                  $query = urlencode($_POST['arguments'][0]);
                  $request = "http://api.wolframalpha.com/v1/result?appid=XEWX8Q-4UPEJTREUK&input=$query&reinterpret=true";
                  //$request = "https://www.wolframalpha.com/queryrecognizer/query.jsp?appid=DEMO&mode=Default&i=$query";
                  //$request = "http://api.wolframalpha.com/v2/query?input=$query&appid=XEWX8Q-4UPEJTREUK&podindex=2&reinterpret=true&format=plaintext";
                  $curl = curl_init();
                  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                  curl_setopt($curl, CURLOPT_URL, $request);
                  $response = curl_exec($curl);
                  curl_close($curl);
                  if ($response=="No short answer available" || $_POST['arguments'][1]==1337) {
                    $request = "http://api.wolframalpha.com/v2/query?input=$query&appid=XEWX8Q-4UPEJTREUK&podindex=2&reinterpret=true&format=plaintext,image";
                  $curl = curl_init();
                  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                  curl_setopt($curl, CURLOPT_URL, $request);
                  $response = curl_exec($curl);
                  curl_close($curl);
                  }
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
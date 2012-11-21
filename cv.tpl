<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Iain Dawson: a CV</title>
        <link rel="stylesheet" type="text/css" href="http://d.bldm.us/cv.css?v=wrap">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <link href='http://fonts.googleapis.com/css?family=Buenard:400,700' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Share+Tech' rel='stylesheet' type='text/css'>
        <link rel="shortcut icon" href="http://media.musicfortheblind.co.uk/static/favicon.ico" type="image/vnd.microsoft.icon">
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script src="http://d.bldm.us/tags.js"></script>
    </head>

    <body>

    <h1>Iain Dawson: a CV</h1>
    <div id="contact">
        <p><a class="inline" href="mailto:iain@musicfortheblind.co.uk">iain@musicfortheblind.co.uk</a></p>
        % if tel:
        <p>{{tel}}</p>
        % end
    </div>

    <div id="things">
    {{!cv}}
    </div>

    <div id="logo">
    <a target="_blank" href="http://musicfortheblind.co.uk/"><img alt="Music for the Blind" title="Music for the Blind" src="http://d.bldm.us/stamp.png"></a>
    </div>

    </body>
</html>

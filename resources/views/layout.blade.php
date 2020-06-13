<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>@php echo env('APP_NAME'); @endphp</title>
        <link rel="icon" thpe="image/png" href="images/favicon.png">
        <link rel="stylesheet" type="text/css" href="{{ mix('css/app.css') }}">
        <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">

        <meta name="twitter:card" content="app">
        <meta name="twitter:creator" content="@katuura028">
        <!-- <meta property="og:url" content="http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/" />
        <meta property="og:title" content="onpuPractice" />
        <meta property="og:description" content="In the early days, Twitter grew so quickly that it was almost impossible to add new features because engineers spent their time trying to keep the rocket ship from stalling." />
        <meta property="og:image" content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg" /> -->

        <meta name="viewport" content="width=device-width,initial-scale=1">
    </head>
    <body>
        <div id="app">
            <header>@include('header')</header>
            <main>@include('main')</main>
            <!-- <footer>@include('footer')</footer> -->
            <menu-background-component></menu-background-component>
        </div>
    </body>
    <script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
    <script type="text/javascript" src="{{ mix('js/app.js') }}"></script>
</html>

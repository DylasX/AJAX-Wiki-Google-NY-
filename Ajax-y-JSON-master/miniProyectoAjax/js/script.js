

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var articles;

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

     var Street = $('#street').val();
     var City = $('#city').val();
     var address = Street + " , " + City;
     var url='http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '&key=AIzaSyDPvZUOe-Iy-kRe-T6zM2Xb1QjbzlwGzjU';
     var urlny = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + City +'&sort=newest&api-key=8385afb72c3a4c419a76a5ece5e1aedb';

     $body.append('<img class="bgimg" src="' + url + '">');

     $.getJSON(urlny,function(data){

          articles = data.response.docs;



            for (var i = 0; i < articles.length; i++) {
            var article = articles[i];

            if (article.multimedia.length>0) {

            var  urlimg= "http://www.nytimes.com/"+article.multimedia[0].url;

          }else {
            var  urlimg=  "http://fasterpen.com/img/220x220/q-75/ffffff//1/uploads/image-not-available.jpg";
          }



            $nytElem.append('<li class="article">'+
               '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
               '<p>' + article.snippet + '</p>'+ '<img src="' + urlimg + '">'+
           '</li>');
           urlimg =  " ";
          }


     }).error(function(e){
       $nytHeaderElem.text('New York Times Articles Could Not Be Found');
     });

     //wikipedia-links

     var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + City + '&format=json&callback=wikiCallback';

     /* La api no puede ser accedida así
     $.getJSON(wikiUrl,function(data){

       console.log(data);


     });*/

     $.ajax({

       url:wikiUrl,
       dataType: "jsonp",
       success: function( response ){
         console.log(response);
          var articleList = response[3];
          var responsed = response;
          var articleListtxt = response[2];
          var articleTitle = response[1];


          for (var i = 0; i < articleTitle.length; i++) {
            var articletittle1 = articleTitle[i];
            $wikiElem.append('<li id="Item'+i+'"><h2>"'+ articletittle1 + '"</h2>');
          }

          for (var i = 0; i < articleListtxt.length; i++) {
            var articletext = articleListtxt[i];
            $('#Item'+i).append('<p>"'+ articletext + '"</p>');

          }


            for (var i = 0; i < articleList.length; i++) {

              articleStr = articleList[i];
              var url =  articleStr;
              $('#Item'+i).append('<a href="'+ url + '">Más información</a>');

            }
       }


     });



    $greeting.text('So, you want to live at ' + address + '?');




    return false;
};

$('#form-container').submit(loadData);

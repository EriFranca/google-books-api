  $(document).ready(function() {
  
    window.onload = function() {
      var search = sessionStorage.getItem("search");
      console.log(search)

      if(search == null || search == '')
      {
        setSearch();
      }
      else
      {
        var url = '';
        var img = '';
        var title = '';
        var author = '';
        var div= '';

        $.get('https://www.googleapis.com/books/v1/volumes?q=author:"' + search + '"' + "&filter=ebooks&langRestrict=en&maxResults=40&orderBy=newest",function(response) {

          for(i=0; i<response.items.length;i++)
          {
            //get title of the book
            div=$('<div class="col-1-10"><a href=' + response.items[i].volumeInfo.infoLink + ' target="_blank"><img src=' + response.items[i].volumeInfo.imageLinks.thumbnail + '></a><p>'+ response.items[i].volumeInfo.title + '</p></div>')

            div.appendTo("#result");
          }
        })
      }
    };
    function setSearch() {
        sessionStorage.setItem("search", $("#author").val());
    };
    $("#search").submit(function() {
      sessionStorage.setItem("search", $("#author").val());
    });
    $('.search').click(function() {
        $('.search').addClass('active');
        $('.line-1').css({
            'transform': 'rotate(45deg)',
            'top': '0px',
            'left': '0px'
        });
        $('.line-2').css({
            'height':'40px',
            'opacity':'1'
        });
    });
    $('.line-1, .line-2').click(function() {
        $('.search').removeClass('active').val('');
        $('.line-1').css({
            'transform': 'rotate(-45deg)',
            'top': '-20px',
            'left': '45px'
        });
        $('.line-2').css({
            'height':'0px',
            'opacity':'0'
        });

    });
    return false;
});

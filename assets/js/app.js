(function($) {

 function init() {
    /* Sidebar height set */
    $sidebarStyles = $('.sidebar').attr('style') || "";
    $sidebarStyles += ' min-height: ' + $(document).height() + 'px;';
    $('.sidebar').attr('style', $sidebarStyles);

    /* Secondary contact links */
    var $scontacts = $('#contact-list-secondary');
    var $contactList = $('#contact-list');

    $scontacts.hide();
    $contactList.mouseenter(function(){ $scontacts.fadeIn(); });
    $contactList.mouseleave(function(){ $scontacts.fadeOut(); });

    /**
     * Tags & categories tab activation based on hash value. If hash is undefined then first tab is activated.
     */
    function activateTab() {
      if(['/tags.html', '/categories.html'].indexOf(window.location.pathname) > -1) {
        var hash = window.location.hash;
        if(hash)
          $('.tab-pane').length && $('a[href="' + hash + '"]').tab('show');
        else
          $('.tab-pane').length && $($('.cat-tag-menu li a')[0]).tab('show');
      }
    }

    // watch hash change and activate relevant tab
    $(window).on('hashchange', activateTab);

    // initial activation
    activateTab();
  };

  function scroll(){
    $(document).bind('scroll',function () {
      var scrollY = window.scrollY;
      if(scrollY>102){
        $('.forkme-div').addClass('forkme-div-scroll');
      }else{
        $('.forkme-div').removeClass('forkme-div-scroll');

      }

    });
  }

  function ajaxCall(){

    $.ajax({
        url: "https://api.github.com/repos/"+githubGlobalUsername+"/"+githubGlobalRepository,
        context: document.body
      }).done(function(data) {
        console.log(data);
        $('#gh-count-stars').text(data.stargazers_count);
        $('#gh-count-forks').text(data.forks_count);
      });
  }

  // run init on document ready
  $(document).ready(init);
  $(document).ready(scroll);
  $(document).ready(ajaxCall);

})(jQuery);

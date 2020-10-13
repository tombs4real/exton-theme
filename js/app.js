// OnLoad Run Init
window.onload = function(){ init(); };

function init() {

  var $window = jQuery( window );
  var $header = jQuery( '#mapts_header' );
  var $page = jQuery( '#mapts_page' );
  var $mobile_toggle = jQuery( '#mobile_nav_toggle' );
  var $site_nav = jQuery( '#site_nav' );
  var $video_marquee = jQuery( '#mapts_video_marquee' );
  var $floor_plan_toggle = jQuery( '.floor-plan-toggle-btn' );
  var $floor_plan_pane = jQuery( '.floor-plan-toggle-pane' );
  var $specials_bar = jQuery( '#specials_bar' );
  var $specials_close = jQuery( '#specials_close' );

  // CHECK USER SESSION TO SEE IF SPECIALS HAVE BEEN CLOSED
  if ( !sessionStorage.getItem( 'closedSpecial' ) ) {
    $specials_bar.addClass( 'active' );
    $page.addClass( 'specials-bar-active' );
  }

  // MOBILE NAV TOGGLE
  $mobile_toggle.on( 'click', function() {
    var $$ = jQuery( this );

    $$.toggleClass( 'mobile-nav-active' );
    $site_nav.toggleClass( 'mobile-nav-active' );
  });

  // SPECALS BAR CLOSE
  $specials_close.on( 'click', function() {
    closeSpecial();
    sessionStorage.setItem( 'closedSpecial', '1' );
  });

  // CHECK WIDTH FOR MEDIA QUERY CHANGES
  function checkWidth() {
    var $windowsize = $window.width();

    if ( $windowsize >= 1000 ) {
      $mobile_toggle.removeClass( 'mobile-nav-active' );
      $site_nav.removeClass( 'mobile-nav-active' );
    }

    if ( $windowsize < 900 ) {
      jQuery( '.owl-mob' ).addClass( 'owl-carousel' ).owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        responsive: {
          0: {
              items:1,
              stagePadding:50
          },
          600: {
              items:2,
              stagePadding:50
          }
        }
      });
    } else if ( $windowsize >= 900 ) {
      jQuery('.owl-mob').removeClass('owl-carousel').trigger('destroy.owl.carousel');
    }

  }

  // FLOOR PLAN TOGGLE
  $floor_plan_toggle.on( 'click', function() {
    var $$ = jQuery( this );
    var $pane = $$.attr( 'data-target' );

    $floor_plan_toggle.removeClass( 'active' );
    $$.addClass( 'active' );

    $floor_plan_pane.removeClass( 'active' );
    jQuery( '#' + $pane ) .addClass( 'active' );
  });


  // VIDEO MARQUEE USING VIMEO API
  if ( $video_marquee.length ) {
    // Video Options
    var vid_options = {
      id: 465965705,
      background: true,
      autoplay: true,
      loop: true,
      muted: true,
    };
    // CREATE VIDEO
    var vid = new Vimeo.Player( 'mapts_video_marquee_element', vid_options) ;

    // ON PLAY
    vid.on( 'play', function() {
      console.log( 'Played the video' );
    });
  }


  // MAP
  if ( jQuery( '#map' ).length ) {
    var lat = 40.276266;
    var long = -111.684012;
    var map_options = {
      zoom: 10,
      center: new google.maps.LatLng(lat,long),
      styles: [{
        "featureType":"water","elementType":"geometry","stylers":[{"color":"<?=$cms['secondary_color'];?>"}
        ,{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]
      }],
    };
    var $map_container = jQuery( '#map' );
    var map = new google.maps.Map($map_container.get(0), map_options);
    var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, long),
        map: map,
        title: 'The Exton at Univeristy Place'
    });
  }



  // CLOSE SPECIALS BAR
  function closeSpecial() {
    $specials_bar.removeClass( 'active' );
    $page.removeClass( 'specials-bar-active' );
  }


  // CHECK WINDOW WIDTH ON RESIZE
  checkWidth();
  jQuery( window ).resize( checkWidth );

} // End Init

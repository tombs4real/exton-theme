// OnLoad Run Init
window.onload = function(){ init(); };

function init() {

  var $window = jQuery( window );
  var $mobile_toggle = jQuery( '#mobile_nav_toggle' );
  var $site_nav = jQuery( '#site_nav' );
  var $video_marquee = jQuery( '#mapts_video_marquee' );
  var $floor_plan_toggle = jQuery( '.floor-plan-toggle-btn' );
  var $floor_plan_pane = jQuery( '.floor-plan-toggle-pane' );



  // MOBILE NAV TOGGLE
  $mobile_toggle.on( 'click', function() {
    var $$ = jQuery( this );

    $$.toggleClass( 'mobile-nav-active' );
    $site_nav.toggleClass( 'mobile-nav-active' );
  });

  // CHECK WIDTH FOR MEDIA QUERY CHANGES
  function checkWidth() {
    var $windowsize = $window.width();

    if ($windowsize >= 1000) {
      $mobile_toggle.removeClass( 'mobile-nav-active' );
      $site_nav.removeClass( 'mobile-nav-active' );
    } else {

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


  // CHECK WINDOW WIDTH ON RESIZE
  checkWidth();
  jQuery( window ).resize( checkWidth );

} // End Init

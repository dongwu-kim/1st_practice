const widthMediaList = [
  window.matchMedia("(max-width: 439.9px)"), // mobile
  window.matchMedia("(min-width: 440px) and (max-width: 767.9px)"), // ipad
  window.matchMedia("(min-width: 768px)"), // ipad pro + pc
];
/*const headerBar = document.querySelector(".index-header");

function handelMediaQuery() {
  const 
  if (widthMediaList[0].matches) {
    console.log("hi");
  } else if (widthMediaList[1].matches) {
    console.log("nice");
  } else if (widthMediaList[2].matches) {
    console.log("bye");
  }
}*/

function init() {
  /*console.log(widthMediaList);
  handelMediaQuery();*/
}

init();

document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages = document.querySelectorAll("img.lazy");    
  var lazyloadThrottleTimeout;
  
  function lazyload () {
    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }    
    
    lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
    }, 20);
  }
  
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);

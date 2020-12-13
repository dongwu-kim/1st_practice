///*
function logMedia() {
  const phoneMode = window.matchMedia("(max-width: 439.9px)"),
    // mobile
    tabletMode = window.matchMedia(
      "(min-width: 440px) and (max-width: 767.9px)"
    ),
    // ipad
    pcMode = window.matchMedia("(min-width: 768px)");
  // ipad pro + pc
  console.log(phoneMode.matches, tabletMode, pcMode);
}

export { logMedia };

//*/

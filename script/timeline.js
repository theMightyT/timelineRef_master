(function(){
  var timelineWidth = document.querySelector('.timeline').offsetWidth,
      panelWidth = document.querySelector('.timeline .panel').offsetWidth,
      firstRun = true,
      totalPanels = document.querySelectorAll('.timeline .panel').length,
      currentPanel,
      panels;

      setInterval(checkWindowSize, 1000);

  function adjustLayout() {
    [].forEach.call(document.querySelectorAll('.timeline .panel'), function(panel, index) {
      let newX = panelWidth * index;
      panel.style.left = newX + "px";

      // generate nav
      let newAnchor = document.createElement('a');
      newAnchor.href = "#";
      newAnchor.dataset.myindex = index;
      newAnchor.innerHTML = panel.querySelector('.label').innerHTML;

      newAnchor.addEventListener('click', activateNavigation, false);

      // add this element to the nav
      document.querySelector('.timeline nav').appendChild(newAnchor);
    });
    // get the last child's index

    currentPanel = document.querySelectorAll('.timeline nav a').length;

    //activateNavigation();
  }

  function activateNavigation() {
    currentPanel = parseInt(this.dataset.myindex, 10);

    // reset the timeline width to check for window resize while using nav
    timelineWidth = document.querySelector('.timeline').offsetWidth;

    [].forEach.call(document.querySelectorAll('.timeline nav a'), function(navItem) {
      navItem.classList.remove('selected');
    });

    this.classList.add('selected');

    let timelineOffset = (timelineWidth - panelWidth) * 0.5;
    let newPosition = ((currentPanel * panelWidth) * -1) + timelineOffset;

    document.querySelector('.panel_slider').style.left = newPosition + "px";

    let backgroundWidth = document.querySelector('.timeline .background_slider img').offsetWidth;
    let moveAmount = (backgroundWidth - timelineWidth) / totalPanels;
    let multiplier = null;

    if (currentPanel != 0) {
      multiplier = currentPanel + 1;
    } else {
      multiplier = 0;
    }

    let newBackgroundPosition = ((moveAmount * multiplier) * -1);
    document.querySelector('.background_slider img').style.left = newBackgroundPosition + "px";
  }

  function checkWindowSize() {
    let newTimelineWidth = document.querySelector('.timeline').offsetWidth;

    if (newTimelineWidth > 500 && timelineWidth > 500) {
      // do nothing
    } else if(newTimelineWidth < 500 && timelineWidth < 500) {
      // do nothing
    } else {
      if(newTimelineWidth > 500 && timelineWidth < 500) {
        firstRun = true;
      }
    }

    timelineWidth = newTimelineWidth;

    if(firstRun){
      document.querySelector('.timeline nav a:nth-child('+ (currentPanel)+')').click();
      firstRun = false;
    }
  }
  adjustLayout();
})();

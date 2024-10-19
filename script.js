function loco(){
    gsap.registerPlugin(ScrollTrigger);
  
  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
  const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
  }
  loco()
  var clutter = "";

  document.querySelector("#page2>h1").textContent.split("").forEach(function(dets){
    clutter += `<span>${dets}</span>`
  
    document.querySelector("#page2>h1").innerHTML = clutter;
  })
  
  
  gsap.to("#page2>h1>span",{
    scrollTrigger:{
        trigger:`#page2>h1>span`,
        start:`top bottom`,
        end:`bottom top`,
        scroller:`#main`,
        scrub:.5,
    },
    stagger:.2,
    color:`#fff`
  })
    
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // Initialize Locomotive Scroll and GSAP here
    loco();

    const nextImages = [
        "assets/1.jpg",
        "assets/2.jpg",
        "assets/3.jpg",
        "assets/4.jpg",
        "assets/5.jpg",
        "assets/16.jpg",
        "assets/17.jpg",
        "assets/18.jpg",
        "assets/19.jpg",
        "assets/15.jpg"
    ];

    const prevImages = [
        "assets/6.jpg",
        "assets/7.jpg",
        "assets/8.jpg",
        "assets/9.jpg",
        "assets/10.jpg",
        "assets/11.jpg",
        "assets/12.jpg",
        "assets/13.jpg",
        "assets/14.jpg",
        "assets/15.jpg"
    ];

    let showingNextSet = false;

    // Function to update images based on the provided array
    function updateImages(imageArray) {
        for (let i = 0; i < imageArray.length; i++) {
            const imgElement = document.getElementById((i + 1).toString());
            if (imgElement) {
                imgElement.src = imageArray[i]; // Update image source
            } else {
                console.error(`Image element with ID ${i + 1} not found.`);
            }
        }
    }

    const nextArrow = document.getElementById('nextArrow');
    const prevArrow = document.getElementById('prevArrow');

    console.log('Setting up event listeners');

    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            if (!showingNextSet) {
                updateImages(nextImages); // Display next image set
                showingNextSet = true; // Update state
                console.log('Next arrow clicked: Showing next set of images');
            }
        });
    } else {
        console.error('Next arrow not found');
    }

    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            if (showingNextSet) {
                updateImages(prevImages); // Display previous image set
                showingNextSet = false; // Update state
                console.log('Previous arrow clicked: Showing previous set of images');
            }
        });
    } else {
        console.error('Previous arrow not found');
    }
});


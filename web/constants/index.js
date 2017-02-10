export const APP_TITLE = "PrintAt™"
export const TOKEN_KEY = "feathers-jwt"
export const DEFAULT_UA = "all" // Default user agent

// HotKeys used in the Application
export const KEYMAP = {
  save: "ctrl+s"
}

export const UPLOAD_PATH = "/uploads/"

// Parameters for Chat Interface
export const WAITING_TIME_BASE = 800
export const WAITING_TIME_MULTIPLIER = 550
export const TYPING_TIME = 950

export const SEGMENT_KEY = "inYx5crWKP9gKRgehuRMlXH3hS8MjENa"
export const SEGMENT = `
!function(){var analytics=window.analytics=window.analytics||[];
  if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error(Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https: "===document.location.protocol?"https://: "http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.1.0";
  analytics.load("${SEGMENT_KEY}");
  analytics.page()
  }}();
`

export const NO_JWT = "NO_JWT"
export const INVALID_JWT = "INVALID_JWT"
export const NO_COOKIE = "NO_COOKIE"

export const MapsAPIKey = "AIzaSyASiOO_cYaxEHyeH-ucUrhkeNMvxAZkCAE"

export const WhiteMap = [{
  featureType: "road",
  elementType: "geometry",
  stylers: [{visibility: "off"}]
}, {
  featureType: "poi",
  elementType: "geometry",
  stylers: [{visibility: "off"}]
}, {
  featureType: "landscape",
  elementType: "geometry",
  stylers: [{color: "#fffffa"}]
}, {
  featureType: "water",
  stylers: [{lightness: 50}]
}, {
  featureType: "road",
  elementType: "labels",
  stylers: [{visibility: "on"}]
}, {
  featureType: "road",
  elementType: "labels.icon",
  stylers: [{visibility: "off"}]
}, {
  featureType: "transit",
  stylers: [{visibility: "on"}]
}, {
  featureType: "administrative",
  elementType: "geometry",
  stylers: [{lightness: 40}]
}]

const NaturalMap = [{
  featureType: "landscape",
  stylers: [{
    hue: "#FFA800"
  }, {
    saturation: 0
  }, {
    lightness: 0
  }, {
    gamma: 1
  }]
},
{
  featureType: "road.highway",
  stylers: [{
    saturation: -73
  }, {
    lightness: 40
  }, {
    gamma: 1
  }]
},
{
  featureType: "road.arterial",
  stylers: [{
    saturation: 0
  }, {
    lightness: 0
  }, {
    gamma: 1
  }]
},
{
  featureType: "road.local",
  stylers: [{
    hue: "#00FFFD"
  }, {
    saturation: 0
  }, {
    lightness: 30
  }, {
    gamma: 1
  }]
},
{
  featureType: "water",
  stylers: [{
    hue: "#00BFFF"
  }, {
    saturation: 6
  }, {
    lightness: 8
  }, {
    gamma: 1
  }]
},
{
  featureType: "poi",
  stylers: [{
    saturation: 33.4
  }, {
    lightness: -25.4
  }, {
    gamma: 1
  }]
}]

// https://snazzymaps.com/style/8356/flat

export const MAP_STYLE = NaturalMap

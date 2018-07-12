require('./bootstrap');
let Vue = window.Vue;

import avatar from './components/common/avatar';

new Vue({
    el: '#topnav-avatar',
    components: {
        avatar
    }
})



// Import our requests modal
import requestModal from './components/requests/modal'
import notifications from './components/requests/notifications'

// Setup our request modal and wire it to our button in the navbar
new Vue({
    el: '#navbar-request-button',
    components: {
        requestModal
    }
})

/**
 * Setup the notifications block
 */
new Vue({
    el: '#navbar-notifications-button',
    components: {
        notifications
    },
    data() {
        return {
            messages: ProcessMaker.notifications
        }
    }
})

// Setup our api client interceptor to handle errors and reflect the error
// in our skin.
window.ProcessMaker.apiClient.interceptors.response.use(function (response) {
    // No need to handle success responses
    return response;
  }, function (error) {
      if (error.response.status != 422 && error.response.status != 404){
        // Replace our content div with our error div
        // Remove our #content-inner
        let elem = document.getElementById('content-inner');
        elem.parentNode.removeChild(elem);
        // Now show our #api-error div
        elem  = document.getElementById('api-error');
        elem.setAttribute('style', 'display: block');
      }
    return Promise.reject(error);
  });

// Use this method to trigger the sidebar menu to open and closed
$("#menu-toggle").click(function (e) {
    e.preventDefault();

    if(document.getElementById("sidebar-inner").classList.contains("closed")){

    document.getElementById("sidebar").style.maxWidth = "250px";
    document.getElementById("sidebar").classList.remove('closed');
    document.getElementById("sidebar-inner").classList.remove('closed');

  } else {

    document.getElementById("sidebar").style.maxWidth = "58px";
    document.getElementById("sidebar").classList.add('closed');
    document.getElementById("sidebar-inner").classList.add('closed');
    document.getElementById("mainbody").style.maxWidth = "100%";

  }
  });

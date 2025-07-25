document.addEventListener('DOMContentLoaded', function() {

    /*----------------------------------*/
    /*---- Minor Tweaks to the Chat ----*/
    /*----------------------------------*/
    
    /*---- Higher char limits ----*/
    // Higher character limit for chat box
    const messageInput = document.getElementById('message'); {
      messageInput.setAttribute('maxlength', '1000'); // 400 character limit
    }
    // Higher character limit for name box
    const nameInput = document.getElementById('name'); {
      nameInput.setAttribute('maxlength', '1000'); // 400 character limit
    } 

    /*---- Name color changes ----*/
    var namecolor = document.getElementById('colorpicker');
    // Function (for some reason only loads after few seconds)
    function func() {
      //namecolor.style.removeProperty('all');
      // namecolor.style.color = 'rgb(255, 0, 0)'; // CHANGE COLOR HERE! <---------------------------
    }
    setTimeout(func, 3000);


    /*---- Click colors and names ----*/
    // Function (for some reason only loads after few seconds)
    /* function mess() {
      // Get the elements whose color and text you want to copy
      const sourceElements = document.querySelectorAll('#messages .entry .name');
      // Get the elements where you want to copy the color and text
      const targetColorElement = document.getElementById('colorpicker');
      const targetTextElement = document.getElementById('name');
      addClickListeners(sourceElements, targetColorElement, targetTextElement);
      // Set up a mutation observer to watch for new elements
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList') {
            const newSourceElements = document.querySelectorAll('#messages .entry .name');
            addClickListeners(newSourceElements, targetColorElement, targetTextElement);
          }
        });
      });
      // Start observing the #messages element for changes
      observer.observe(document.getElementById('messages'), { childList: true });
      function addClickListeners(elements, targetColorElement, targetTextElement) {
        elements.forEach(element => {
          element.addEventListener('click', () => {
            // Get the computed color of the source element
            const computedColor = window.getComputedStyle(element).color;
            // Convert the color to an RGB object
            const rgbColor = convertColorToRGB(computedColor);
            // Apply the color to the target element
            targetColorElement.style.color = `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`;

            // Copy the text content of the clicked element, removing the last character
            const innerText = element.textContent;
            if (innerText.length > 1) {
              targetTextElement.value = innerText.slice(0, -1);
            } else {
              targetTextElement.value = innerText;
            }
          });
        });
      }
      function convertColorToRGB(colorString) {
        // Remove the "rgb(" and ")" from the string
        const colorValues = colorString.slice(4, -1).split(', ');
        return {
          red: parseInt(colorValues[0]),
          green: parseInt(colorValues[1]),
          blue: parseInt(colorValues[2])
        };
      }
    }
    setTimeout(mess, 6000); */


    /*---- Removing Unicode ----*/
    // Function (for some reason only loads after few seconds)
    function removeUnicodeFromElements() {
      console.log('Removing Unicode from elements...');
      // Get all the ".message" elements nested under the ".entry" class and "#messages" parent
      const messageElements = document.querySelectorAll('#messages .entry .message');
      messageElements.forEach(element => {
        // use /[^\u0000-\u007F]/g for ALL unicode characters (including emojies)!
        element.textContent = element.textContent.replace(/[^\u0000-\u007F\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F500}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
      });
      // Get all the ".name" elements nested under the ".entry" class and "#messages" parent
      const nameElements = document.querySelectorAll('#messages .entry .name');
      nameElements.forEach(element => {
        // use /[^\u0000-\u007F]/g for ALL unicode characters (including emojies)!
        element.textContent = element.textContent.replace(/[^\u0000-\u007F\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F500}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
      });
    }
    // Run the function to remove Unicode characters after a 3-second delay
    function toggleFunction(checkbox) {
      var func = document.getElementById("removeUnicodeFromElements");
      if (checkbox.checked) {
        func.disabled = false; // Enable the function
        // Start observing the "#messages" element for changes after a 3-second delay
        observer.observe(document.getElementById('messages'), { childList: true });
      } else {
        func.disabled = true; // Disable the function
        observer.observe(document.getElementById('messages'), { childList: false });
      }
    }
    // Set up a mutation observer to watch for new elements
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          console.log('New elements added, running Unicode removal...');
          removeUnicodeFromElements();
        }
      });
    });

      
    /* Keybindings for [ ] and \ to change colors */
    // Listen for the 'keypress' event on the document
    /*document.addEventListener('keypress', function(event) {
      // Check if the pressed key is the 'Enter' key
      function red() {
        namecolor.style.removeProperty('all');
        namecolor.style.color = 'rgb(255, 0, 0)'; // red
      }
      function green() {
        namecolor.style.removeProperty('all');
        namecolor.style.color = 'rgb(0, 255, 0)'; // green
      }
      function blue() {
        namecolor.style.removeProperty('all');
        namecolor.style.color = 'rgb(0, 0, 255)'; // blue
      }
      if (event.key === '[') { // [
        // Call the function you want to activate
        red();
      }
      if (event.key === ']') { // ]
        // Call the function you want to activate
        green();
      }
      if (event.key === '\\') { // \
        // Call the function you want to activate
        blue();
      }
    });*/

    /*-----------------------------------*/
    /*------ User blocking script -------*/
    /*-----------------------------------*/

    // BLOCK USERS FEATURE
    'use strict';

    // Load blocked users from localStorage
    let blockedUsers = JSON.parse(localStorage.getItem('blockedUsers')) || ["a bot", "Guest8389"];

    // Create the container for the blocked users list
    const blockedUsersList = document.querySelectorAll('.blockedUsersListClass');
    // Create the input box for blocking users
    const blockInput = document.querySelectorAll('.blockInputClass');
    // Create the input box for unblocking users
    const unblockInput = document.querySelectorAll('.unblockInputClass');
    // Create the button to unblock all users
    const unblockAllButton = document.querySelectorAll('.unblockAllButtonClass');

    // Function to update the blocked users list display
    function updateBlockedUsersList() {
        blockedUsersList.forEach(element => {
            element.textContent = 'Blocked Users:\n' + blockedUsers.join('\n');
        });
        localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
    }

    // Function to block a user
    function blockUser(username) {
        if (username.includes('*')) {
            const pattern = '^' + username.replace(/\*/g, '.*') + '$';
            if (!blockedUsers.some(user => user === pattern)) {
                blockedUsers.push(pattern);
                console.log(`Users matching pattern '${pattern}' have been blocked`);
            }
        } else {
            if (!blockedUsers.includes(username)) {
                blockedUsers.push(username);
                console.log(`User '${username}' has been blocked`);
            }
        }
        updateBlockedUsersList();
        filterMessages();
    }

    // Function to unblock a user
    function unblockUser(username) {
        if (username.includes('*')) {
            const pattern = '^' + username.replace(/\*/g, '.*') + '$';
            blockedUsers = blockedUsers.filter(user => user !== pattern);
            console.log(`Users matching pattern '${pattern}' have been unblocked`);
        } else {
            blockedUsers = blockedUsers.filter(user => user !== username);
            console.log(`User '${username}' has been unblocked`);
        }
        updateBlockedUsersList();
        filterMessages();
    }

    // Function to unblock all users
    function unblockAllUsers() {
        blockedUsers = ["a bot", "Guest8389"];
        updateBlockedUsersList("a bot", "Guest8389");
        filterMessages();
    }

    // Function to filter messages from blocked users
    function filterMessages() {
        const messagesContainer = document.getElementById('messages');
        if (messagesContainer) {
            const messageEntries = messagesContainer.querySelectorAll('.entry');
            messageEntries.forEach(entry => {
                const usernameElement = entry.querySelector('.name');
                if (usernameElement) {
                    const username = usernameElement.textContent.replace(':', '').trim();
                    // Check if the username should be hidden
                    const isBlocked = blockedUsers.some(blockedUser => {
                        if (blockedUser.startsWith('^') && blockedUser.endsWith('$')) {
                            return new RegExp(blockedUser).test(username);
                        } else {
                            return blockedUser === username;
                        }
                    });
                    if (isBlocked) {
                        entry.remove();
                    }
                }
            });
        }
    }

    // Initialize with default blocked users and filter existing messages
    updateBlockedUsersList();
    filterMessages();

    // Event listener typing input for blocking users
    blockInput.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const username = input.value.trim();
                if (username) {
                    blockUser(username);
                    input.value = '';
                }
            }
        });
    });

    // Event listener typing input for unblocking users
    unblockInput.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const username = input.value.trim();
                if (username) {
                    unblockUser(username);
                    input.value = '';
                }
            }
        });
    });

    // Event listener button for unblocking all users
    unblockAllButton.forEach(button => {
        button.addEventListener('click', unblockAllUsers);
    });

    // Observe the messages container for new messages
    const observer2 = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('entry')) {
                        const usernameElement = node.querySelector('.name');
                        if (usernameElement) {
                            const username = usernameElement.textContent.replace(':', '').trim();
                            // Check if the username should be hidden
                            const isBlocked = blockedUsers.some(blockedUser => {
                                if (blockedUser.startsWith('^') && blockedUser.endsWith('$')) {
                                    return new RegExp(blockedUser).test(username);
                                } else {
                                    return blockedUser === username;
                                }
                            });
                            if (isBlocked) {
                                node.remove();
                            }
                        }
                    }
                });
            }
        });
        // After processing all mutations, run filterMessages to catch any missed entries
        // filterMessages();
    });

    const messagesContainer = document.getElementById('messages');
    if (messagesContainer) {
        observer2.observe(messagesContainer, { childList: true, subtree: true });
    }

    /*-----------------------------------*/
    /*----- Username color script -------*/
    /*-----------------------------------*/

    /* cookie color catcher below */

    // Function to generate a random color
    function getRandomColor() {
        return "#" + Math.random().toString(16).slice(2, 8).padStart(6, "0");
    }

    var pick = document.getElementById("usernameColorPicker"); // Username's Colorpicker

    // Function to set background-color and text color
    function setColor(element, color) {
        element.value = color;
    }

    // Function to set a cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Function to get a cookie by name
    function getCookie(name) {
        const cookies = document.cookie.split(";"); // Split cookies into an array
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim(); // Trim whitespace
            if (cookie.startsWith(name + "=")) {
                return cookie.substring((name + "=").length); // Return the value of the cookie
            }
        }
        return null; // Return null if the cookie is not found
    }

    // Check if a color is stored in cookies
    var userColor = getCookie("color");
    if (!userColor) {
        // Generate a random color if no cookie exists
        var userColor = getRandomColor();
        setCookie("color", userColor); // Store the color in a cookie
    }

    // Apply the stored or newly generated color
    setColor(pick, userColor);

    /* username colorpicker */
    
    // Add the color picker to the page
    const colorPicker = document.querySelectorAll('.colorPickerClass');
    
    // Function to update the username color
    function updateUsernameColor(event) {
        const nameColor = document.getElementById('colorpicker');
        nameColor.style.removeProperty('all');
        nameColor.style.color = event.target.value;
        var userColor = pick.value;
        setCookie("color", userColor); // Store the color in a cookie
    }

    // Add event listener to the color picker
    colorPicker.forEach(picker => {
        picker.addEventListener('input', updateUsernameColor);
    });

    // Optionally, set an initial color
    /* colorPicker.value = '#ff0000'; // Red
    updateUsernameColor({target: {value: colorPicker.value}}); */

    /*------------------*/
    /*- Background js --*/
    /*------------------*/
        
    // Remove the background first variable
    const elementToRemove = document.querySelectorAll('#video-background');
    
    // Pick which background variables
    const videoUrls = {
      b1: 'https://cdn.pixabay.com/video/2024/05/29/214405_large.mp4',
      b2: 'https://cdn.pixabay.com/video/2024/06/08/215762_large.mp4',
      b3: 'https://cdn.pixabay.com/video/2024/03/01/202587-918431513_large.mp4',
      b4: 'https://cdn.pixabay.com/video/2021/04/15/71122-537102350_large.mp4',
      b5: 'https://cdn.pixabay.com/video/2021/10/10/91562-629172467_large.mp4',
      b6: 'https://cdn.pixabay.com/video/2019/10/09/27669-365224683_large.mp4'
    };
    
    // Remove background
    const rem = document.querySelector('.rem');
    
    // Function to remove existing video-background elements
    function removeVideoBackground() {
      const existingVideos = document.querySelectorAll('#video-background');
      existingVideos.forEach(video => {
        video.remove();
      });
    }
    
    // Function to create a new video-background element
    function createVideoBackground(videoUrl) {
      var video = document.createElement('video');
      video.id = 'video-background';
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.style.opacity = 0.6;
      var source = document.createElement('source');
      source.src = videoUrl;
      source.type = 'video/mp4';
      video.appendChild(source);
      document.body.insertBefore(video, document.body.firstChild);
    }
    
    // Event listener function for background changes
    function changeBackground(event) {
      const videoKey = event.target.classList[0];
      const videoUrl = videoUrls[videoKey];
    
      if (videoUrl) {
        removeVideoBackground();
        createVideoBackground(videoUrl);
        localStorage.setItem('lastBackground', videoKey); // Store the last clicked background
      }
    }
    
    // Add event listeners to background elements
    const backgroundElements = document.querySelectorAll('.b1, .b2, .b3, .b4, .b5, .b6');
    backgroundElements.forEach(element => {
      element.addEventListener('click', changeBackground);
    });
    
    // noBackground variable
    const noBackground = removeVideoBackground();
    
    // Remove background click
    function remchange() {
      removeVideoBackground();
      localStorage.removeItem('lastBackground'); // Remove the stored last background
      localStorage.setItem('noBackground', noBackground); // Store the last "no background" option
    }
    
    rem.addEventListener('click', remchange);
    
    // Load the last clicked background on page load
    window.addEventListener('load', () => {
      const lastBackground = localStorage.getItem('lastBackground');
      const noBackground = localStorage.getItem('noBackground');
      if (lastBackground && videoUrls[lastBackground]) {
        createVideoBackground(videoUrls[lastBackground]);
      } else if (noBackground) {
        removeVideoBackground();
      } else {
        // If no last background is stored, load background 5
        createVideoBackground(videoUrls['b5']);
      }
    });

    /*---------------------------------*/
    /*- GIF automatic loading support -*/
    /*---------------------------------*/
    
    setTimeout(function() {
      const messages = document.querySelectorAll('.message');

      function convertGifUrlToImage(message) {
        const text = message.textContent.trim();
        const regex = /https?:\/\/\S+\.(gif)/i;
        const match = text.match(regex);

        if (match) {
          const img = document.createElement('img');
          img.src = match[0];
          img.style.maxWidth = '200px'; // Set the max-width to 100%
          message.innerHTML = '';
          message.appendChild(img);
        }
      }

      messages.forEach(convertGifUrlToImage);
    }, 3000);
});

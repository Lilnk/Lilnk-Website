// Change when button clicked
function toggleTheme() {
    if (localStorage.getItem('lilnk') === 'LightTheme') {
        localStorage.setItem('lilnk', 'DarkTheme');
        document.getElementById('slider').checked = true;
        document.getElementById("darkMode").disabled = false;
    } else {
        localStorage.setItem('lilnk', 'LightTheme');
        document.getElementById('slider').checked = false;
        document.getElementById("darkMode").disabled = true;
    }
}


// Check when page loaded
(function () {
    if (localStorage.getItem('lilnk') === 'DarkTheme') {
        localStorage.setItem('lilnk', 'DarkTheme');
        try {
            document.getElementById('slider').checked = true;
        } catch (error) {
            // 
        }
        document.getElementById("darkMode").disabled = false;
    } else if (localStorage.getItem('lilnk') === 'LightTheme'){
        localStorage.setItem('lilnk', 'LightTheme');
        try {
            document.getElementById('slider').checked = false;
        } catch (error) {
            // 
        }
        document.getElementById("darkMode").disabled = true;
    } else {
        localStorage.setItem('lilnk', 'LightTheme');
        try {
            document.getElementById('slider').checked = false;
        } catch (error) {
            // 
        }
        document.getElementById("darkMode").disabled = true;
    }
}());
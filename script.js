// Your existing JavaScript code for form handling

function changeTab(event, tabId) {
    // Hide all tab-content elements
    var tabContents = document.querySelectorAll('.tab-content .jobcard');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Show the selected tab
    var selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Update the active class for tab-titles
    var tabTitles = document.querySelectorAll('.tab-titles .tab-title');
    tabTitles.forEach(title => {
        title.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

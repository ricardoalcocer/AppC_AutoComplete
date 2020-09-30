# Appcelerator Auto-complete/Incremental search

This is the sample code for the blog post at [http://www.appcelerator.com/blog/2014/10/appcelerator-autocomplete-search](http://www.appcelerator.com/blog/2014/10/appcelerator-autocomplete-search)


A server side search for customers, accounts, inventory, products, etc… in a mobile application is a very common operation. A typical UI for this operation is to allow the user to enter the search text and press a search button or the enter key on the on screen keyboard, as shown below. Then a search is performed, perhaps via a web service call to a server search API, and the retrieved results are displayed in a list for the user to select from the search results, as shown:

This is accomplished in Appcelerator by adding a event listener on the search TextField and listen for the return event as follows:

$.searchTF.addEventListener('return', function(e){
    processInput();
});

In the above UI, you would also add an event listener on the search button to the right of the search TextField.

One way to make the mobile application more useful and responsive is to enhance this search operation by implementing autocomplete. As the user types, searches are performed using the entered text, instead of waiting for the user to finish entering the entire search text. You experience this every time you use Google or Bing to search the web, as shown below:

This is easily accomplished in Appcelerator by also listening for the change event on the TextField as follows:

$.searchTF.addEventListener(‘change’, function(e){
    processInput();
});

Now, as the user enters text, search results are fetched on each key entered as shown below:

One down side of implementing autocomplete is that you are now making many more calls over the network and taxing your back end more. This must be weighed against the increased adoption of the application due its increased usefulness.

One tip to reduce the number of web service calls made while still providing the autocomplete feature is to only make the web service call when the user pauses typing. This prevents extra web service calls from being made if the user backs up or changes the input text. This can be accomplished using a JavaScript timer to implement a delay before making the web service call. If the user continues typing before the delay time is reached, then the timer can be reset as follows:

var waitForPause, pauseDelay = 1000;

// code goes here

$.wordTF.addEventListener('change', function(e){
    clearTimeout(waitForPause);
    waitForPause = setTimeout(processInput, pauseDelay);
});

Next time you implement a server search feature in your application try the autocomplete and see for yourself how your application will appear more responsive and you will find yourself using this feature more and more.

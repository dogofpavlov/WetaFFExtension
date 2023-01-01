# Weta Workshop Name Fixer 


This is a browser extension made for Firefox that modifies Weta Workshop's website to show more information.
https://addons.mozilla.org/en-US/firefox/addon/wetaworkshop-name-fixer/


# Why does this extension exist?

Well because Weta Workshop's website is missing what I consider to be VERY helpful information... the "Name" of items you have ordered.

When you login to Weta's website and go to either the "My Orders" or "Pre-orders & Payment Plans" page, each of these sections will show a list of all the things you have ordered or pre-ordered. The problem is they don't say the name of the items you have ordered. This extension was built to simply add the names back into the list to make it much easier to understand what you're looking at (Something I have messaged Weta to fix but to no avail).

# Advanced explanation... 

Once logged in, on the "My Orders" page, you will see a list of the items you have ordered. Unfortunately there is no name shown next to each item. The only way to find out the name is to click the "View" button on each row. This takes you to a single page that then has the name of the item. Now this might not seem like a big deal but honestly this issue wasn't the main reason the extension was made (Although it does fix this).

The main reason this extension was made was for the "Pre-orders & Payment Plans" page. On this page,  you will see a list of the items you have pre-ordered. Again unfortunately there is no name shown next to each item... there is also no name shown if you click the "View" button on each row. The only way to find out the name of the item is to first memorize the "Order ID". Next you have to go back to the "My Orders" page. Now you have to search through each page until you find that matching "Order ID". Finally you can click the "View" button on that row and once loaded you can see the name of the item.

Having personally done this process over 20 times I finally got frustrated enough and decided to build this extension.

# How it works....

First off, this extension only does anything if you are on either the "My Orders" page or the "Pre-Orders & Payment Plans" page. If installed and you visit either of these pages, you will see a new orange bar shown at the top to verify things are happening.

This extension starts by loading the "My Orders" page to retrieve the list of items and find the "Order ID" as well as the "URL" to the "View" page of each item. The extension then loads each of these "URL"s into memory and the retrieves the "Name" of each item from the page it loads. Yes, that means in order for this extension to work, it has to load (up to) 50 individual pages. So yes it may be a bit slow to find all the data but its much faster than having to manually find the names of each item. At the top right of the orange bar, you should see "progress" percentage shown as it loads the pages.

This extension works by a process called "Web Scraping".  Web scraping refers to the extraction of data from a website (loading web pages and "looking" through the HTML to find data).  Web scraping of data publicly available on the internet is legal. Now obviously the "My Orders" page and the "Pre-Orders & Payment Plans" page are not publicly available (You must be logged in to see these). This being said, I don't believe this extension violates any laws because the data scrapped is not used in any way other than to add data back into different pages. Your data is NEVER sent or saved to any external source.... NEVER EVER. The extension simply loads additional html pages and uses that data to populate other html pages on the same website. The code used to do this is very simple and only around 100 lines long (including verbose comments). I fully admit I do not know all the legal aspect of web scraping so if it comes to it, beware this extension may be removed at any time. 

If you wish to know more about the legality of web scraping visit this website: https://blog.apify.com/is-web-scraping-legal

Since this extension relies on web scraping, that means if Weta decides to change their website it could "break" this extension and make it no longer work. If this happens I will attempt to fix it (if it still remains useful).

Honestly the ultimate goal of this extension is to hopefully make Weta aware of this issue and encourage them to fix it and make this extension no longer needed/relevant. @Weta Workshop... please make this extension irrelevant and fix this issue on your end! 

If you are a web developer (or just curious) and wish to take a look at the source code of this extension to verify your own concerns, you can do so here: 
https://github.com/dogofpavlov/WetaFFExtension

This extension was created with regular ole vanilla javascript and doesn't rely on anything special to work. 

# About the Author...

My name is Ryan Caillouet (The Cyber Hobbit) and I am a huge fan and collector of lots of Tolkien & Lord of the Rings related things. I have a youtube channel dedicated to collecting that you can visit here: https://www.youtube.com/@thecyberhobbit  

I built this extension as a fan with no ill intentions other than to help fix an issue that I see with Weta Workshops current website. If you find any issues, you can send me an email at thecyberhobbit@gmail.com and I will attempt to fix it.






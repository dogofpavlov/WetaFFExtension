let currentURL = window.location.pathname;
//only apply to the "My Orders" and the "Pre-orders & Payment Plans" page...
if(currentURL.indexOf("sales/order/history")!==-1 || currentURL.indexOf("partialpayment/customer/partiallypaidorders")!==-1){
    //find country
    const splitURL = currentURL.split("/");
    const countryURL = splitURL[1];
    //Create a status bar
    document.body.style.borderTop = "50px solid #e36100";
    const statusBar = document.createElement("div");
    statusBar.style.position = "absolute";
    statusBar.style.top = "-50px";
    statusBar.style.left = 0;
    statusBar.style.width = "100%";
    statusBar.style.height = "50px";
    statusBar.style.zIndex = 10000;
    statusBar.style.display = "flex";
    statusBar.style.flexDirection = "row";
    statusBar.style.paddingLeft = "30px";
    statusBar.style.paddingRight = "30px";
    statusBar.style.color = "#FFF";
    statusBar.style.fontWeight = "bold";
    statusBar.style.alignItems = "center";
    statusBar.innerHTML='<div style="margin-right:auto;">The Cyber Hobbit\'s Website Helper is Enabled</div><div id="tch-loadingStatus"></div>';
    document.body.appendChild(statusBar);

    //get our loading status div
    const loadingStatus = document.querySelector("#tch-loadingStatus");
    loadingStatus.innerText = "Loading...";
    
    const myOrdersData = [];
    const parser = new DOMParser();

    const letsFixIt = ()=>{
        let loadTotal = 0;
        let loadComplete = 0;
        //First we need to load the "My Orders" page to retrieve the last 50 orders.
        const myOrdersPath = "https://www.wetanz.com/"+countryURL+"/sales/order/history/?limit=50";
        fetch(myOrdersPath).then(($response)=>{
            return $response.text();
        }).then(($html)=>{
            //parse the html
            const htmlDocMyOrders = parser.parseFromString($html,"text/html");
            //find the rows
            const myOrdersMatches = htmlDocMyOrders.querySelectorAll("#my-orders-table tbody tr");
            //set total number of items to load
            loadTotal = myOrdersMatches.length;
            //start loading data for each item needed
            for(let i=0; i<myOrdersMatches.length; i++){
                //find per row td cells
                const trRowCells = myOrdersMatches[i].cells;
                //order ID
                const orderID = trRowCells[0].innerText;
                //URL of each item
                const orderItemURL = trRowCells[4].firstElementChild.href;
                //build data for each
                const orderItemData = {index:i, orderID:orderID, orderItemURL:orderItemURL};
                myOrdersData.push(orderItemData);
                //now we load the individual "My Order" item pages to retreive the item name.
                fetch(orderItemURL).then(($response)=>{
                    return $response.text();
                }).then(($htmlItem)=>{
                    //parse the htmlText into something we can query
                    const myOrderItemHTML = parser.parseFromString($htmlItem,"text/html");
                    //find the item name
                    const myOrderItemMatches = myOrderItemHTML.querySelector(".product-item-name");
                    //store the item name in our data
                    orderItemData.itemName = myOrderItemMatches.innerText;
                    loadComplete++;
                    tryComplete();
                });
            }
        });
        //what we run after each item has loaded
        const tryComplete = ()=>{
            if(loadTotal!==0 && loadComplete!==0){ 
                //update the progress
                const loadPercentage = Math.round((loadComplete/loadTotal)*100);
                loadingStatus.innerText = "Loading "+loadPercentage+"%";
                if(loadComplete===loadTotal){
                    //lets grab the rows and do our matching
                    const idColumnTDs = document.querySelectorAll("td.col.id");
                    //begin the fix with the data we found
                    let totalMatchesFound = 0;
                    for(let i=0; i<idColumnTDs.length; i++){
                        const itemIdTD = idColumnTDs[i];
                        const itemOrderID = itemIdTD.innerText;
                        //find matching page element with that order ID
                        const matchFromOurData = myOrdersData.find(($itemData)=>{
                            return $itemData.orderID===itemOrderID;
                        });
                        //if found (which it always should right?) we can FINALLY add the item name.
                        if(matchFromOurData){
                            totalMatchesFound++;
                            itemIdTD.innerHTML=itemOrderID+"<div style='font-weight:700; font-size:12px'>"+matchFromOurData.itemName+"</div>";
                        }
                    }
                    loadingStatus.innerText = "Item names have been added!";
                }
            }
        }
    }
    letsFixIt();
}
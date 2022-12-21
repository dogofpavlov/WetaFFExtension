/*
	Understanding what we're doing here.
	
	There is a "My Orders" Page	and there is a "Pre-Orders & Payment Plans" Page.
	
	Each order item shown on BOTH of these pages has 2 different IDs we need... the first ID is the actual "Order #", the 2nd ID is the ID Weta uses as an index/key to reference data related to the order in their database.
	
	Both of these pages will have a matching "Order #", but the index/key used as reference is different for each page.

*/

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
statusBar.innerHTML='<div style="margin-right:auto;">The Cyber Hobbit\'s Website Helper is Enabled</div><div style="">Loading</div>';

document.body.appendChild(statusBar);


const myOrdersData = [];
const parser = new DOMParser();

const addTheNameOfTheItem = ()=>{


	/*
		First we need to load the "My Orders" page to retrieve the last 50 orders.
	*/
	const myOrdersPath = "https://www.wetanz.com/us/sales/order/history/?limit=50";

	fetch(myOrdersPath).then(($response)=>{
		return $response.text();
	}).then(($html)=>{
		//parse the html
		const htmlDocMyOrders = parser.parseFromString($html,"text/html");
		//find the rows
		const myOrdersMatches = htmlDocMyOrders.querySelectorAll("#my-orders-table tbody tr");
		//now let's convert those rows into something easier to manage
		for(let i=0; i<myOrdersMatches.length; i++){
			
			const trRow = myOrdersMatches[i];			
			const trRowCells = myOrdersMatches[i].cells;
			const rowTDOrderID = trRowCells[0].innerText;
			const rowTDActionURL = trRowCells[4].firstElementChild.href;
			myOrdersData.push({index:i, orderID:rowTDOrderID, actionURL:rowTDActionURL});
		}
		
		//Now that we have our initial data, we can load each individual page "actionURL" to retrieve the name of item.
		//lets use a different for loop just make things a bit easier to look at and understand
		for(let i=0; i<myOrdersData.length; i++){
			let itemData = myOrdersData[i];
			
		}
		
		console.log("And our data:");
		console.log(myOrdersData);
		//const wtf = mapDOM($html,true);
		//console.log("Loaded My Orders");
		//console.log(wtf);
		//const split1 = $html.split('product name product-item-name">')
	});
	
	
	/*
    const baseMyOrdersPath = "https://www.wetanz.com/us/sales/order/view/order_id/";

    if(matches[0] && matches[0].children && matches[0].children[2] && matches[0].children[2].children){

        const tableRows = matches[0].children[2].children;

        for(let i=0; i<tableRows.length; i++){
    
            const rowCells = tableRows[i].cells;

            const viewURL = rowCells[5].firstElementChild.href;

            const split1 = viewURL.split("partialpayment_id/");
            
            const rowID = split1[1];

            
    
            const pathToLoad = baseMyOrdersPath+rowID;
            console.log(pathToLoad);
            
            
            fetch(pathToLoad).then(($response)=>{
                return $response.text();
            }).then(($html)=>{

                const wtf = mapDOM($html,true);
                console.log("got it?");
                console.log(wtf);
                //const split1 = $html.split('product name product-item-name">')
            });
            
            //rowFirstTd.innerHTML+="<br/>yoyoyo";
    
    
        }

    }
	
	*/
}





addTheNameOfTheItem();


/*
function mapDOM(element, json) {
    var treeObject = {};
    
    console.log("TRY PARSE");
    // If string convert to document Node
    if (typeof element === "string") {
        if (window.DOMParser) {
              parser = new DOMParser();
              docNode = parser.parseFromString(element,"text/html");
              console.log(docNode);
        } else { // Microsoft strikes again
              docNode = new ActiveXObject("Microsoft.XMLDOM");
              docNode.async = false;
              docNode.loadXML(element); 
        } 
        element = docNode.firstChild;
    }
    
    //Recursively loop through DOM elements and assign properties to object
    function treeHTML(element, object) {
        object["type"] = element.nodeName;
        var nodeList = element.childNodes;
        if (nodeList != null) {
            if (nodeList.length) {
                object["content"] = [];
                for (var i = 0; i < nodeList.length; i++) {
                    if (nodeList[i].nodeType == 3) {
                        object["content"].push(nodeList[i].nodeValue);
                    } else {
                        object["content"].push({});
                        treeHTML(nodeList[i], object["content"][object["content"].length -1]);
                    }
                }
            }
        }
        if (element.attributes != null) {
            if (element.attributes.length) {
                object["attributes"] = {};
                for (var i = 0; i < element.attributes.length; i++) {
                    object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
                }
            }
        }
    }
    treeHTML(element, treeObject);
    
    return (json) ? JSON.stringify(treeObject) : treeObject;
}

*/
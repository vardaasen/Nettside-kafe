let cafeMenu=0,cakes=1,shoppingCart=2,model={pages:["kafeMeny","kaker","handlevogn"],app:{currentPageIndex:cafeMenu,selectedProduct:null},inputs:{cafeMenu:{tab:"baguette",quantity:1,message:""},themeCakeMenu:{selectedThemeId:1,theme:"",size:1,basePrice:250,message:"",quantity:1},cakeMenu:{type:"chocolate",size:8,basePrice:300,quantity:1,message:""},shoppingCart:{case:"Overview",customerName:"",contactNumber:"",pickUpSchedule:{date:"",time:""},products:[]}},sizeMultipliers:{8:1,12:1.5,16:2},flavors:["Vanilje","Sjokolade","Sitron","Jordbær"],categories:["baguette","canapes","coffee","cakes"],categoryTranslations:{0:"Baguette",1:"Snitter",2:"Kaffe",3:"Kaker"},themes:[{themeId:1,themeName:"Uten tema",basePrice:450,description:"Ingen dekorasjon. Enkel og elegant."},{themeId:2,themeName:"Bryllup",basePrice:550,description:"Perfekt for bryllupsfeiring, med elegante dekorasjoner."},{themeId:3,themeName:"Barnebursdag",basePrice:400,description:"En morsom kake for barnas bursdag, med fargerik pynt."},{themeId:4,themeName:"Bursdag voksen",basePrice:420,description:"En sofistikert kake for voksne bursdagsfeiringer."},{themeId:5,themeName:"Jubileum",basePrice:440,description:"Feir store milepæler med en spesiell jubileumskake."},{themeId:6,themeName:"Jul",basePrice:480,description:"En festlig kake for juletiden, pyntet med sesongens farger."},{themeId:7,themeName:"Halloween",basePrice:490,description:"Skummel og morsom kake for Halloween, med kreativ pynt."},{themeId:8,themeName:"Konfirmasjon",basePrice:430,description:"En elegant kake til konfirmasjonsfeiringer."},{themeId:9,themeName:"Valentin",basePrice:470,description:"En romantisk kake for Valentinsdag, pyntet med hjerter."}],themeImages:{1:"uten-tema.webp",2:"Bryllup.webp",3:"Barnebursdag.webp",4:"bursdag-voksen.webp",5:"Jubileum.webp",6:"Jul.webp",7:"Halloween.webp",8:"konfirmasjon.webp",9:"Valentin.webp"},products:[],orders:[{orderId:1,customerName:"Maria Nilsen",contactNumber:"87493827",status:"Ny",pickUpSchedule:{date:"2024-11-09",time:"10:30"},products:[{productId:14,productName:"Biff og løkbaguette",quantity:2,comment:"Ekstra løk"},{productId:24,productName:"Americano",quantity:2,comment:""}]},{orderId:2,customerName:"Thomas Andersen",contactNumber:"48292838",status:"Klar til henting",pickUpSchedule:{date:"2024-11-13",time:"14:00"},products:[{productId:49,productName:"Brownies",quantity:1,comment:"Ekstra nøtter"},{productId:26,productName:"Cortado",quantity:1,comment:"Vanlig melk"}]},{orderId:3,customerName:"Camilla Foss",contactNumber:"92736483",status:"Hentet",pickUpSchedule:{date:"2024-10-19",time:"10:45"},products:[{productId:17,productName:"Snitter med roastbiff",quantity:1,comment:""}]},{orderId:4,customerName:"Ola Nordmann",contactNumber:"38299283",status:"Ny",pickUpSchedule:{date:"2024-11-06",time:"12:00"},products:[{productId:9,productName:"Falafelbaguette",quantity:3,comment:"Ekstra tahinisaus"},{productId:37,productName:"Flat White",quantity:3,comment:"Laktosefri melk"}]},{orderId:5,customerName:"Lise Kristoffersen",contactNumber:"91827364",status:"Under arbeid",pickUpSchedule:{date:"2024-11-15",time:"10:00"},products:[{productId:12,productName:"Baguette med spekeskinke",quantity:2,comment:""},{productId:24,productName:"Americano",quantity:2,comment:""}]},{orderId:6,customerName:"Anders Hauge",contactNumber:"92736484",status:"Hentet",pickUpSchedule:{date:"2024-10-23",time:"15:30"},products:[{productId:22,productName:"Cappuccino",quantity:1,comment:""},{productId:4,productName:"Røkelaks og eggerørebaguette",quantity:1,comment:""}]},{orderId:7,customerName:"Erik Hansen",contactNumber:"23829382",status:"Ny",pickUpSchedule:{date:"2024-11-04",time:"10:15"},products:[{productId:5,productName:"Tunfiskbaguette",quantity:2,comment:"Ingen rødløk, takk"},{productId:38,productName:"Mocha",quantity:2,comment:"Ekstra sjokolade"}]},{orderId:8,customerName:"Marius Strand",contactNumber:"93827164",status:"Klar til henting",pickUpSchedule:{date:"2024-11-18",time:"15:30"},products:[{productId:27,productName:"Macchiato",quantity:2,comment:""},{productId:7,productName:"Kyllingbaguette",quantity:2,comment:""}]},{orderId:9,customerName:"Peter Larsen",contactNumber:"38392839",status:"Under arbeid",pickUpSchedule:{date:"2024-11-11",time:"13:15"},products:[{productId:34,productName:"Ostekake med bær",quantity:1,comment:"Tilpasset for glutenfri"}]},{orderId:10,customerName:"Fredrik Dahl",contactNumber:"91827366",status:"Hentet",pickUpSchedule:{date:"2024-10-25",time:"09:00"},products:[{productId:6,productName:"Ost og skinkebaguette",quantity:1,comment:""},{productId:23,productName:"Latte",quantity:1,comment:""}]},{orderId:11,customerName:"Hans Pettersen",contactNumber:"87499283",status:"Under arbeid",pickUpSchedule:{date:"2024-11-08",time:"09:45"},products:[{productId:33,productName:"Sjokoladekake",quantity:1,comment:"Gratulerer med dagen på toppen"}]},{orderId:12,customerName:"Sara Bjerke",contactNumber:"93827165",status:"Hentet",pickUpSchedule:{date:"2024-10-21",time:"14:15"},products:[{productId:39,productName:"Marmorkake",quantity:1,comment:""}]},{orderId:13,customerName:"Jonas Lie",contactNumber:"92736481",status:"Under arbeid",pickUpSchedule:{date:"2024-11-16",time:"14:30"},products:[{productId:35,productName:"Gulrotkake",quantity:1,comment:"Ingen nøtter"}]},{orderId:14,customerName:"Vilde Sørensen",contactNumber:"92736482",status:"Klar til henting",pickUpSchedule:{date:"2024-11-19",time:"11:20"},products:[{productId:34,productName:"Ostekake med bær",quantity:1,comment:"Ekstra bringebær"}]},{orderId:15,customerName:"Sofie Berg",contactNumber:"93847483",status:"Ny",pickUpSchedule:{date:"2024-11-14",time:"09:15"},products:[{productId:3,productName:"Vegetarbaguette",quantity:2,comment:"Ekstra avokado"},{productId:52,productName:"Makroner",quantity:1,comment:"Blandede smaker"}]},{orderId:16,customerName:"Elisabeth Moe",contactNumber:"91827365",status:"Klar til henting",pickUpSchedule:{date:"2024-11-17",time:"12:45"},products:[{productId:16,productName:"Assorterte snitter",quantity:1,comment:""}]},{orderId:17,customerName:"Ingrid Svendsen",contactNumber:"38374738",status:"Ny",pickUpSchedule:{date:"2024-11-12",time:"11:00"},products:[{productId:13,productName:"Egg- og rekebaguette",quantity:3,comment:"Uten majones"},{productId:23,productName:"Latte",quantity:3,comment:"Med havremelk"}]},{orderId:18,customerName:"Eirik Holmen",contactNumber:"91827367",status:"Hentet",pickUpSchedule:{date:"2024-10-18",time:"12:30"},products:[{productId:11,productName:"Capresebaguette",quantity:2,comment:"Ekstra basilikum"},{productId:25,productName:"Americano",quantity:2,comment:""}]},{orderId:19,customerName:"Anna Johansen",contactNumber:"48392783",status:"Under arbeid",pickUpSchedule:{date:"2024-11-05",time:"11:30"},products:[{productId:8,productName:"Brie og avokadobaguette",quantity:1,comment:"Ingen tomat"},{productId:22,productName:"Cappuccino",quantity:1,comment:"Med soyamelk"}]},{orderId:20,customerName:"Kari Olsen",contactNumber:"43289283",status:"Klar til henting",pickUpSchedule:{date:"2024-11-07",time:"14:45"},products:[{productId:50,productName:"Sjokolademousse",quantity:5,comment:"Pyntet med friske bær"}]}],calculateCustomCakePrice(t,e){var r=this.themes.find(e=>e.themeId===t);return(r?r.basePrice:250)*(this.sizeMultipliers[e]||1)},calculateStandardCakePrice(t,e){var r=this.products.find(e=>e.productId===t);return(r?r.unitPrice:200)*(this.sizeMultipliers[e]||1)},subtractOrderedQuantityFromUnitsInStock(e){for(var t of this.products)for(var r of e)t.productId===r.productId&&(t.unitsInStock-=r.quantity)},addCustomQuantity(t,e){var r=this.products.find(e=>e.productId===t);if(!r)throw new Error("Produkt ikke funnet");r.unitsInStock+=e,saveModel()},submitOrder(e){let t=0;for(let e of this.orders)e.orderId>t&&(t=e.orderId+1);e.orderId=t,e.status="Ny",this.orders.push(e),this.subtractOrderedQuantityFromUnitsInStock(e.products),saveModel()},updateOrderStatus(t,e){var r=this.orders.find(e=>e.orderId===t);r&&(r.status=e),saveModel()},updateProductStock(t,e){var r=this.products.find(e=>e.productId===t);r?(r.unitsInStock=parseInt(e,10),saveModel(),console.log(`Oppdatert lagerbeholdning for "${r.productName}" til `+r.unitsInStock)):console.error(`Produkt med ID ${t} ikke funnet.`)},updateProductDetails(t,e){var r=this.products.find(e=>e.productId===t);r?(void 0!==e.unitsInStock&&(r.unitsInStock=parseInt(e.unitsInStock,10)),void 0!==e.description&&(r.description=e.description),saveModel(),console.log(`Oppdatert detaljer for "${r.productName}"`)):console.error(`Produkt med ID ${t} ikke funnet.`)},replaceModel(e){for(var t in this)Object.prototype.hasOwnProperty.call(e,t)&&(this[t]=e[t])}},localStorageModelName="model";function initiateModelLocalStorage(){var e=localStorage.getItem(localStorageModelName);e?(e=JSON.parse(e),model.replaceModel(e)):getProducts()}function saveModel(){localStorage.setItem(localStorageModelName,JSON.stringify(model))}async function getProductsFromStore(){try{return await(await fetch("data/products.json")).json()}catch(e){return alert("Failed to load products from json file: ",e),[]}}async function getProducts(){model.products=await getProductsFromStore(),saveModel(),updateView()}
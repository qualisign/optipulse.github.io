


/* 
Protocol entries take the form:

{"tagName": "",
 {"recommendation: "",  <----- 
  "explanation": "",    <----- 
  "justification": "",  <-----
  "upvotes": "",        <-----
  "downvotes": "",      <-----
  "units": ""           <-----
  }
}

*/
Vue.config.debug = true;

var protocol = {"offer" :
                {
                    "explanation": "Make an Offer",
                    "recommendations": {},                                  
                    "upvotes": "",
                    "downvotes": "",
                    "units": {},
                    "children": [],
                },
                "find" :
                {
                    "explanation" : "Find an Offer",
                    "recommendations": {},                                  
                    "upvotes" : "",
                    "downvotes" : "",
                    "units": {},
                    "children": [],
                },
                "internet":
                {
                    "explanation": "",
                    "recommendations": {},                                
                    "upvotes": "",
                    "downvotes": "",
                    "units": {},
                    "children": ["wireless", "optical", "cables", "Wi-Fi"],
                },
                "wireless":
                {
                    "explanation": "communications channel not requiring wires/cables",              
                    "recommendations": {"optical": "faster, reduce RF polution"},   
                    "upvotes": "",
                    "downvotes": "",
                    "units": {"bandwidth": "bit/s, Mb/s, Gb/s", "distance": "kilometers, miles"},
                    "children": [],
                }
                 
               };

var offerPromptList = ["Give your offer a name.",
                       "Add tags to your offer to make it easier to find.",
                       "How would you describe your offer?",
                       "Which currencies will you accept for your offer?",
                       "Give your offer a value.",                               
                       "Choose location(s) for your offer.",                     
                       "When should your offer be valid?",
                       "Look good?"
                  ];


$(document).ready(function() {    
    

    var vm = new Vue({
        el: '#app-container',
        data: {
            offer: {
                name: '',
                value: '',
                perUnit: '',
                units: {},
                tags: '',
                description: '',
                currencies: [],
                location: '',
                validFrom: '',
                validTo: '',
            },
            offerShow: false,
            findShow: false,
            appShow: true,
            apiShow: false,
            protocolShow: false,
            offerCount: 1,
            findCount: 1,
            protocol: protocol
        },             
        methods: {        
            makeOffer(e) {
                e.preventDefault();                
                console.log(this.offer.currencies);
                SimpleStorage.set(15);
                console.log(SimpleStorage.get());
            },
            findOffer(e) {
                e.preventDefault();                           
            },
            detailsClose(e) {
                e.preventDefault();
                this.offerShow = false;
                this.findShow = false;                
            }
            
        },
        computed: {
            offerPrompt: function(){
                return offerPromptList[this.offerCount-1];
                
            }                                       
        },
        watch: {
            'offer.tags': {
                handler : function(){
                    var tagList = this.offer.tags.split(',');
                    console.log(tagList);
                        
                    for(var i=0; i<tagList.length; i++){
                        console.log(tagList[i]);
                        try {
                            var unitsObj = this.protocol[tagList[i]]["units"];                        
                            var unitKeys = Object.keys(unitsObj);
                        
                            for (var i=0; i<unitKeys.length; i++){
  
                                  if (!unitsObj[unitKeys[i]]){
                                  console.log("updating units");
                                  // update dict only if it doesn't already contain key
                                  this.offer.units[unitKeys[i]] = unitsObj[unitKeys[i]];
                                  }
  
                                this.offer.units[unitKeys[i]] = unitsObj[unitKeys[i]];
                            }
                        console.log(this.offer.units);
                        }                             
                        catch(e) {return true}
                    }                    
                }    
            }
        }
    });

    // auto-complete for tags

    
    // date interval selector
    
    $( function() {
        var dateFormat = "mm/dd/yy",
            from = $( "#from" )
            .datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 3
            })
            .on( "change", function() {
                to.datepicker( "option", "minDate", getDate( this ) );
            }),
            to = $( "#to" ).datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 3
            })
            .on( "change", function() {
                from.datepicker( "option", "maxDate", getDate( this ) );
            });
        
        function getDate( element ) {
            var date;
            try {
                date = $.datepicker.parseDate( dateFormat, element.value );
            } catch( error ) {
                date = null;
            }
            
            return date;
        }
    } );

    // update protocol div
    
    function explain(element){
        var tag = element;
        console.log(tag);
        var explanation = protocol[tag]["explanation"];
        $("#explanation").html('<transition name="fade">' + explanation + '</transition>');
    }

    $(".pro").hover(function(){
        explain(this.id);

    });

    $(".pro").mouseleave(function(){
        $("#explanation").text("Mesh Market");

    });

    // leaflet
    var map = L.map('map');
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    var markers = new L.FeatureGroup();
    map.addLayer(markers);
    map.setView([0, 0], 2);



    $("#offer-location").geocomplete();
    
});



$( function() {
    var availableTags = Object.keys(protocol);
    $( "#offer-tags" ).autocomplete({
        source: availableTags,
        change: function (event, ui) {
            if(!ui.item){
                $("#offer-tags").val("");
            }

        },
        focus: function (event, ui) {
            return false;
        }
    });
} );




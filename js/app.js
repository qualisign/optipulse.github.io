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

var protocol = {"offer" :
                {"recommendation": "",
                 "explanation": "Make an Offer",
                 "justification": "",
                 "upvotes": "",
                 "downvotes": "",
                 "units": "",
                 "children": [],
                },
                "find" :
                {"recommendation": "",
                 "explanation" : "Find an Offer",
                 "justification" : "",
                 "upvotes" : "",
                 "downvotes" : "",
                 "units": "",
                 "children": [],
                },
                "internet" :
                {"recommendation": "",
                 "explanation" : "",
                 "justification" : "",
                 "upvotes" : "",
                 "downvotes" : "",
                 "units" : "",
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

function explain(element){    
    var tag = element;
    console.log(tag);
    var explanation = protocol[tag]["explanation"];
    $("#explanation").html('<transition name="fade">' + explanation + '</transition>');
}
$(document).ready(function() {    
    // protocol update


    function setup() {
        var myCanvas = createCanvas(600, 400);
        myCanvas.parent('canvas-container');
    }
    function draw() {
        ellipse(50, 50, 80, 80);
    }



    
    $(".pro").hover(function(){
        explain(this.id);

    });

    $(".pro").mouseleave(function(){
        $("#explanation").text("Mesh Market");
               
    });

    
    var vm = new Vue({
        el: "#app-container",
        data: {
            offer: {
                name: '',
                value: '',
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
        }
        
    });

    
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

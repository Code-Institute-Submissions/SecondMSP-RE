function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
          mapTypeControl: false,
          center: { lat: 59.3293, lng: 18.0686 },
          zoom: 8,
        });
        new AutocompleteDirectionsHandler(map);
      }

      class AutocompleteDirectionsHandler {
        constructor(map) {
          this.map = map;
          this.originPlaceId = "";
          this.destinationPlaceId = "";
          this.travelMode = google.maps.TravelMode.WALKING;
          this.directionsService = new google.maps.DirectionsService();
          this.directionsRenderer = new google.maps.DirectionsRenderer();
          this.directionsRenderer.setMap(map);
          const originInput = document.getElementById("origin-input");
          const destinationInput = document.getElementById("destination-input");
          const modeSelector = document.getElementById("mode-selector");
          const originAutocomplete = new google.maps.places.Autocomplete(
            originInput
          );
          //  the place data fields that you needed.
          originAutocomplete.setFields(["place_id"]);
          const destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput
          );
          // the place data fields that you need.
          destinationAutocomplete.setFields(["place_id"]);
          this.setupClickListener(
            "changemode-walking",
            google.maps.TravelMode.WALKING
          );
          this.setupClickListener(
            "changemode-transit",
            google.maps.TravelMode.TRANSIT
          );
          this.setupClickListener(
            "changemode-driving",
            google.maps.TravelMode.DRIVING
          );
          this.setupPlaceChangedListener(originAutocomplete, "ORIG");
          this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
          this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
            originInput
          );
          this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
            destinationInput
          );
          this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
            modeSelector
          );
          document.getElementById("destination-input").value = "Glory Tabernacle International Stockholm, Bergfotsvägen, Tumba, Sweden";
          let autocompleteService = new google.maps.places.AutocompleteService();
          let request = {input: "Glory Tabernacle International Stockholm, Bergfotsvägen, Tumba, Sweden"};
          autocompleteService.getPlacePredictions(request, (predictionsArr, placesServiceStatus) => {
            console.log('getting place predictions :: predictionsArr = ', predictionsArr, '\n',
              'placesServiceStatus = ', placesServiceStatus);

            let placeRequest = {placeId: predictionsArr[0].place_id};
            let placeService = new google.maps.places.PlacesService(this.map);
            placeService.getDetails(placeRequest, (placeResult, placeServiceStatus) => {
              console.log('placeService :: placeResult = ', placeResult, '\n',
                'placeServiceStatus = ', placeServiceStatus);
                destinationAutocomplete.set("place", placeResult);
                google.maps.event.trigger(destinationAutocomplete, 'place_changed');
      

    });
    
  });
        }
        
        setupClickListener(id, mode) {
          const radioButton = document.getElementById(id);
          radioButton.addEventListener("click", () => {
            this.travelMode = mode;
            this.route();
          });
        }
        setupPlaceChangedListener(autocomplete, mode) {
          autocomplete.bindTo("bounds", this.map);
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();

            if (!place.place_id) {
              window.alert("Please select an option from the dropdown list.");
              return;
            }

            if (mode === "ORIG") {
              this.originPlaceId = place.place_id;
            } else {
              this.destinationPlaceId = place.place_id;
            }
            this.route();
          });
        }
        route() {
          if (!this.originPlaceId || !this.destinationPlaceId) {
            return;
          }
          const me = this;
          this.directionsService.route(
            {
              origin: { placeId: this.originPlaceId },
              destination: { placeId: this.destinationPlaceId },
              travelMode: this.travelMode,
            },
            (response, status) => {
              if (status === "OK") {
                me.directionsRenderer.setDirections(response);
              } else {
                window.alert("Directions request failed due to " + status);
              }
            }
          );
        }
        
      }
      
loadData().then(data => {

    // no country selected by default
    this.activeCountry = null;
    // deafultActiveYear is 2000
    this.activeYear = '2010';
    let that = this;

    // ******* TODO: PART 3 *******
    /**
     * Calls the functions of the views that need to react to a newly selected/highlighted country
     *
     * @param countryID the ID object for the newly selected country
     */
    function updateCountry(countryID) {

        that.activeCountry = countryID;

        //TODO - Your code goes here -
            gapPlot.updateHighlightClick(countryID);
            worldMap.updateHighlightClick(countryID);
            infoBox.updateTextDescription(countryID, gapPlot.activeYear);
    }

    // ******* TODO: PART 3 *******

    /**
     *  Takes the specified activeYear from the range slider in the GapPlot view.
     *  It takes the value for the activeYear as the parameter. When the range slider is dragged, we have to update the
     *  gap plot and the info box.
     *  @param year the new year we need to set to the other views
     */
    function updateYear(year) {
        gapPlot.updatePlot( this.activeYear
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_x").value]
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_y").value]
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_c").value])
    }
    // Creates the view objects
    const infoBox = new InfoBox(data);
    const worldMap = new Map(data, updateCountry);
    const gapPlot = new GapPlot(data, updateCountry, updateYear, this.activeYear);


    // Initialize the plots; pick reasonable default values

    // here we load the map data
    d3.json('data/world.json').then(mapData => {

        // ******* TODO: PART I *******
        // You need to pass the world topo data to the drawMap() function as a parameter
        worldMap.drawMap(mapData);
        
    });
    // here we load the scatter plot
    gapPlot.drawPlot();
    
    // This clears a selection by listening for a click
    document.getElementById("dropdown_x").addEventListener("change", function() {
        //TODO - Your code goes here - 
        gapPlot.updatePlot(gapPlot.activeYear
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_x").value]
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_y").value]
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_c").value])
		// call clear highight methods
    });
    document.getElementById("dropdown_y").addEventListener("change", function() {
        //TODO - Your code goes here - 
        gapPlot.updatePlot(gapPlot.activeYear
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_x").value]
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_y").value]
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_c").value])
		// call clear highight methods
    });
    document.getElementById("dropdown_c").addEventListener("change", function() {
        //TODO - Your code goes here - 
        gapPlot.updatePlot(gapPlot.activeYear
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_x").value]
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_y").value]
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_c").value])
    });
		// call clear highight methods
    document.querySelector("body").addEventListener("mousedown", function() {
        //TODO - Your code goes here - 
        worldMap.clearHighlight();
        gapPlot.clearHighlight();
        infoBox.clearHighlight();
		// call clear highight methods
    });
                                                           
});

// ******* DATA LOADING *******
// We took care of that for you

/**
 * A file loading function or CSVs
 * @param file
 * @returns {Promise<T>}
 */
async function loadFile(file) {
    let data = await d3.csv(file).then(d => {
        let mapped = d.map(g => {
            for (let key in g) {
                let numKey = +key;
                if (numKey) {
                    g[key] = +g[key];
                }
            }
            return g;
        });
        return mapped;
    });
    return data;
}

async function loadData() {
    let pop = await loadFile('data/pop.csv');
    let gdp = await loadFile('data/gdppc.csv');
    let tfr = await loadFile('data/tfr.csv');
    let cmu = await loadFile('data/cmu5.csv');
    let life = await loadFile('data/life_expect.csv');
    //return [pop, gdp, tfr, cmu, life];
    return {
        'population': pop,
        'gdp': gdp,
        'child-mortality': cmu,
        'life-expectancy': life,
        'fertility-rate': tfr
    };
}

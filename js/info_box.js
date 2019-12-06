/** Data structure for the data associated with an individual country. */
class InfoBoxData {
    /**
     *
     * @param country name of the active country
     * @param region region of the active country
     * @param indicator_name the label name from the data category
     * @param value the number value from the active year
     */
    constructor(country, region, indicator_name, value) {
        this.indicator_name = indicator_name;
        this.country = country;
        this.region = region;
        this.population = null;
        this.gdp = null;
        this.fertility = null;
        this.life_exp = null;
        this.child_mort = null;        
    }
}

/** Class representing the highlighting and selection interactivity. */
class InfoBox {
    /**
     * Creates a InfoBox Object
     * @param data the full data array
     */
    constructor(data) {
        this.data=data;
    }

    /**
     * Renders the country description
     * @param activeCountry the IDs for the active country
     * @param activeYear the year to render the data for
     */
    updateTextDescription(activeCountry, activeYear) {
        // ******* TODO: PART 4 *******
        // Update the text elements in the infoBox to reflect:
        // Selected country, region, population and stats associated with the country.
        /*
         * You will need to get an array of the values for each category in your data object
         * hint: you can do this by using Object.values(this.data)
         * you will then need to filter just the activeCountry data from each array
         * you will then pass the data as paramters to make an InfoBoxData object for each category
         *
         */
        
        //TODO - Your code goes here - 
        
        //SETTNG UP DATA TO DISPLAY IN INFO BOX////////////////////////////////////////////////////// 
        
        this.clearHighlight();
        let ind = 0;
        
        if(activeCountry==null)
            return;
        
        for(let entry in this.data["population"]){
            if(this.data["population"][entry]["geo"].toUpperCase() === activeCountry.toUpperCase()){
                console.log(this.data["population"][entry]["geo"]);
                    ind = entry;
                    break;
            }
        }
        
        let info_obj = new InfoBoxData();
        
        info_obj.indicator_name = activeCountry;
        info_obj.region = this.data["population"][ind].region.toUpperCase();
        info_obj.country = this.data["population"][ind]["country"].toUpperCase();
        info_obj.population = this.data["population"][ind][activeYear];
        info_obj.gdp = this.getInnerJoin(this.data, "gdp", activeYear, activeCountry);
        info_obj.fertility = this.getInnerJoin(this.data, "fertility-rate", activeYear, activeCountry);
        info_obj.life_exp = this.getInnerJoin(this.data, "life-expectancy", activeYear, activeCountry);
        info_obj.child_mort = this.getInnerJoin(this.data, "child-mortality", activeYear, activeCountry)
                
        
        //ADDING HTML ELEMENTS FOR INFO BOX////////////////////////////////////////////////////// 
        
        let labels = ["Country", "Population", "GDP Per Capita", "Child Mortality", "Fertility", "Life Expectancy"];
        let values = [info_obj.country, info_obj.population, info_obj.gdp, info_obj.child_mort, info_obj.fertility, info_obj.life_exp];
        
        d3.select("#country-detail")
            .selectAll("text")
            .data(labels)
            .enter()
            .append("p")
            .attr("class", "info-box")
            .append("text")
            .attr("id", d=> {
                return d.replace(/\s/g, '_')+"_info";
        })
            .text( d => {
                return d; 
        })
            .style("font-weight", "bold")
            .style("opacity", 1);
        
        for(let entry in labels){
            if(entry == 0){
                let label_name = labels[entry].replace(/\s/g, '_')+"_info";
                d3.select("#"+label_name).html("<h1>"+values[entry]+"<\h1>"); 
                continue;
            }
            let label_name = labels[entry].replace(/\s/g, '_')+"_info";
            let text_info = d3.select("#"+label_name).text();
            d3.select("#"+label_name).text( d => {
                return text_info + " : " + values[entry] 
            });
        }

    }
    /**
     * Removes or makes invisible the info box
     */
    clearHighlight() {
        d3.select("#country-detail").selectAll("text").remove();
        d3.select(".info-box").style("opacity", 0);
        //TODO - Your code goes here -
        
    }
    
    //THE FOLLOWING METHODS HAVE BEEN ADDED BY ROHIT/////////////////////////////////////////////////////////
    getInnerJoin(data, index, year, id){
        for(let entry in data[index]){
            if (data[index][entry]["geo"].toUpperCase()===id.toUpperCase())
                return data[index][entry][year];
        }
    }

}
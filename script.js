

d3.csv("./data/final.umbrellas.csv").then(function(data) {


    /*
    DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS

    Note that this template places an SVG canvas in the element with
    ID "chart", which has a width and height equal to the size of
    the browser window (controlled in the CSS);

    If you want the visualization to be located somewhere else
    in the HTML, or to be a different size, you'll need to modify
    the code below.
    
    */
    const width = 800;
    const height = 600;
    const margin = {top: 50, left: 75, right: 50, bottom: 75};

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


        const Selling = {
            min: d3.min(data, function(d) { return +d.Sell; }),
            max: d3.max(data, function(d) { return +d.Sell; })
        };
    
        const Buying = {
            min: d3.min(data, function(d) { return +d.Buy; }),
            max: d3.max(data, function(d) { return +d.Buy; })
        };
    
    
        const xScale = d3.scaleLinear()
            .domain([Selling.min, Selling.max])
            .range([margin.left, width-margin.right]);
    
        const yScale = d3.scaleLinear()
            .domain([Buying.min, Buying.max])
            .range([height-margin.bottom, margin.top]);
    
    
    
        const xAxis = svg.append("g")
            .attr("class","axis")
            .attr("transform",`translate(0,${height-margin.bottom})`)
            .call(d3.axisBottom().scale(xScale));
    
        const yAxis = svg.append("g")
            .attr("class","axis")
            .attr("transform",`translate(${margin.left},0)`)
            .call(d3.axisLeft().scale(yScale));
    
    
    
        const circle = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d.Sell); })
            .attr("cy", function(d) { return yScale(d.Buy); })
            .attr("r", 5)
            .attr("fill","green");
    

        svg.append("text")
            .attr("class","axisLabel")
            .attr("x", width/2)
            .attr("y", height - 10)
            .attr("text-anchor","middle")
            .text("Selling Price (Bells)")
            .attr("fill", "#fff563");
    
        svg.append("text")
            .attr("class","axisLabel")
            .attr("x", -height/2)
            .attr("y", 20)
            .attr("text-anchor","middle")
            .attr("transform","rotate(-90)")
            .text("Buying Price (Bells)")
            .attr("fill", "#fff563");
    
    
        const tooltip = d3.select("#chart")
            .append("div")
            .attr("class", "tooltip");
    
        circle.on("mouseover", function(e, d) {
    
            let cx = +d3.select(this).attr("cx")-50;
            let cy = +d3.select(this).attr("cy")+1475; 
    
            tooltip.style("visibility", "visible")
                .style("left", `${cx}px`)
                .style("top", `${cy}px`)
                .html(`<b>Buying:</b> $${d.Buy}<br><b>Selling:</b> $${d.Sell}`);
    
            d3.select(this)
                .attr("stroke", "white")
                .attr("stroke-width", 2);
    
            }).on("mouseout", function() {
        
            tooltip.style("visibility", "hidden");
    
                d3.select(this)
                    .attr("stroke", "none")
                    .attr("stroke-width", 0);
            })

    
    








});

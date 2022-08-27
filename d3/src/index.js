/*
 * :file description: 
 * :name: /d3/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-27 22:22:35
 * :last editor: 张德志
 * :date last edited: 2022-08-27 22:58:13
 */
import * as d3 from 'd3';

const data = [
    {
        name:'shao',
        value:6,
    },
    {
        name:'web12',
        value:15
    },
    {
        name:'shao',
        value:22,
    },
    {
        name:'web-Yang',
        value:80
    },
    {
        name:'shao',
        value:66,
    },
    {
        name:'Yang',
        value:22
    },
    {
        name:'shao1',
        value:10,
    },
    {
        name:'Yang2',
        value:19
    }
];

const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const margin = {top:60,right:40,bottom:60,left:50};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;


const xScale = d3.scaleLinear()
.domain([0,d3.max(data,d => d.value)])
.range([0,innerWidth]);

const yScale = d3.scaleBand()
.domain(data.map(d => d.name))
.range([0,innerHeight]);



const g = svg.append('g').attr('id','group')
.attr('transform',`translate(${margin.left},${margin.top})`)

const yAxis = d3.axisLeft(yScale);

g.append('g').call(yAxis);

const xAxis = d3.axisBottom(xScale);
g.append('g').call(xAxis).attr('transform',`translate(0,${innerHeight})`);


data.forEach(d => {
    g.append('rect')
    .attr('width',xScale(d.value))
    .attr('height',yScale.bandwidth())
    .attr('fill','green')
    .attr('y',yScale(d.name))
})

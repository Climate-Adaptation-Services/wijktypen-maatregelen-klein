<script>
  import _ from 'lodash';
  import { onMount } from 'svelte'
  import { selectAll, scaleLinear } from 'd3'
  export let data;
  let csvData = data.data

  const wijken = _.map(csvData, 'Wijk')
  const bouwjaren = _.map(csvData, 'Bouwjaar')
  const hoogtes = _.map(csvData, 'Hoogte')
  const groenen = _.map(csvData, 'Groen')
  const hittes = _.map(csvData, 'Hitte')
  const wateroverlasten = _.map(csvData, 'Wateroverlast')

  const gebouwhoogte = {
    '2,6':'midden',
    '1,4':'laag',
    '3,10':'hoog',
    '6,20':'hoger',
    '4,10':'hoog',
    '3,5':'midden',
    '2,3':'laag',
    '2,4':'laag',
    '4,6':'5lagen',
    '3,5':'midden'
  }

  const klasse = {
    '1':'Laag',
    '2':'Midden',
    '3':'Hoog'
  }
  
  const bouwjaarScale = {
    'Voor 1910':[1870, 1910],
    'Voor 1945':[1870, 1945],
    'Van alle tijden':[1870, 2010],
    'Na 1945':[1945, 2010],
    'Na 1960':[1960, 2010]
  }

  onMount(() => {
    const elem = document.querySelector(".tdbouwjaar");
    const box = elem.getBoundingClientRect();
    const cellWidth = box.width
    const cellHeight = box.height

    const xScale = scaleLinear()
      .domain([1870, 2010])
      .range([0, cellWidth-0]);

    selectAll('line')
      .data(bouwjaren)
        .attr('x1', d => {
          if(d.includes('-')){return xScale(+d.split('-')[0])}
          else{console.log(d);return xScale(bouwjaarScale[d][0])}
        })
        .attr('x2', d => {
          if(d.includes('-')){return xScale(+d.split('-')[1])}
          else{return xScale(bouwjaarScale[d][1])}
        })        
        .attr('y1', cellHeight/2 - 3)
        .attr('y2', cellHeight/2 - 3)

  })

</script>

<table>
  <tr>
    <th></th>
    {#each wijken as wijk, i}
      <th style="background-image:url('/images/wijken/{wijk}.png'); background-size: 100% 100%">{wijk}</th>
    {/each}
  </tr>
  <tr>
    <td class='tdimage'>
      <img class='category_image' src='/images/calendar.png'/>
      <p class='category_tekst'>Bouwjaar</p>
    </td>
    {#each bouwjaren as bouwjaar, i}
      <td class='tdbouwjaar'>
        <svg>
          <line stroke="steelblue" stroke-width='12'/>
        </svg>
        <p class='category_tekst'>{bouwjaar}</p>
      </td>
    {/each}
  </tr>
  <tr>
    <td class='tdimage'>
      <img class='category_image' src='/images/building.png'/>
      <p class='category_tekst'>Hoogte</p>
    </td>
    {#each hoogtes as hoogte, i}
      <td>        
        {#if hoogte}
          <img class='hoogteimage' src='/images/{gebouwhoogte[hoogte]}.png'/>
          <p class='hoogtetekst'>{hoogte.split(',')[0] + ' tot ' + hoogte.split(',')[1] + ' lagen'}</p>
        {/if}
      </td>
    {/each}
  </tr>
  <tr>
    <td class='tdimage'>
      <img class='category_image' src='/images/forest.png'/>
      <p class='category_tekst'>Groen</p>
    </td>
    {#each groenen as groen, i}  
      <td>
        {#if groen}
          <img src='/images/tree.png' style="width:{groen*1.3}%" />
          <p>{groen}%</p>
        {/if}
      </td>
    {/each}
  </tr>
  <tr>
    <td class='tdimage'>
      <img class='category_image' src='/images/sun.png'/>
      <p class='category_tekst'>Hitte</p>
    </td>
    {#each hittes as hitte, i}
      <td>
        {#if hitte}
          <img src='/images/hitte{hitte}.png' style='width:{12+hitte*7}%'/>
          <p>{klasse[hitte]}</p>
        {/if}
      </td>
    {/each}
  </tr>
  <tr>
    <td class='tdimage'>
      <img class='category_image' src='/images/rain.png'/>
      <p class='category_tekst'>Wateroverlast</p>
    </td>
    {#each wateroverlasten as wateroverlast, i}
      <td>
        {#if wateroverlast}
          <img src='/images/wateroverlast{wateroverlast}.png' style='width:{4+wateroverlast*3}%'/>
          <p>{klasse[wateroverlast]}</p>
        {/if}
      </td>
    {/each}
  </tr>
</table>

<style>
  table{
    width:99vw;
    height:97vh;
    table-layout: fixed;
    border-spacing: 3px 3px;
  }

  td{
    background-color: #e9ecf5;
    text-align: center;
    position: relative;
    color:rgb(96, 96, 96);
    height:15vh;
    font-size:0.95vw;
  }
  th{
    font-size:0.9vw;
    /* color:rgb(96, 96, 96); */
    color:white;
    word-wrap: break-word;
    font-weight:normal;
    text-shadow:
    -1px -1px 0 #000,  
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
  }
  .tdimage{
    background-color: white;
  }

  .category_image{
    width:50%;
  }
  .category_tekst{
    font-size: 0.9vw;
  }
  p{
    text-align: center;
    position:absolute;
    width:100%;
    bottom:3px;
    margin-bottom: 0px;
  }

  .hoogteimage{
    position: absolute;
    bottom:25px;
    width:30%;
    left:35%;
  }

  svg{
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
  }

</style>
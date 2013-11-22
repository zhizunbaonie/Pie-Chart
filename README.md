Pie-Chart
=========

Pie chart using D3.js

##Usage:

###Description

- This plugin generate pie graph with titles for each sectors and description light box for you details.
- Here using a json format for your data

###Html example

```
//Box for pie graph
<div id="pieChart"></div>
//Box for light box with details
<div id="pieLightBox">
  <h3 class="title"></h3>
  <div class="desc"></div>
</div>
```

###Data in Json format

```
<script>
  var data = [
    {
      "title": "Fantastic",
      "value": 35,
      "color": "#00ba68",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    },
    {
      "title": "Comedy",
      "value": 30,
      "color": "#1550a3",
      "description": "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
    },
    {
      "title": "Old movies",
      "value": 15,
      "color": "#2b79eb",
      "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
    },
    {
      "title": "Action",
      "value": 10,
      "color": "#f09f00",
      "description": "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
      "title": "Drama",
      "value": 10,
      "color": "#f9d48c",
      "description": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. "
    }
  ];
</script>
```

###JS

```
<script>
$('#pieChart').pieChart({
  data: data,
  lightBox: '#pieLightBox',
  width: 750,
  height: 750,
  radius: 200,
  innerRadius: 80
});
</script>
```

###Options

- **width** - width of svg element,
- **height** - height of svg element
- **radius** - radius of a circle
- **innerRadius** - inner radius of the circle
- **data** - data in json format
- **lightBox** - light box id or unique class
- **title** - title box class inside of the light box
- **desc** - description box class inside of light box
- **labelColor** - color of labels
- **labelActive** - color for active lable
'use strict';

$(document).ready(function(){

  function Horns (horns){
    this.image_url=horns.image_url;
    this.title=horns.title;
    this.description=horns.description;
    this.keyword=horns.keyword;
    this.horns=horns.horns;
    allofHorns.push(this);
    // console.log(this);


  }


  var allofHorns = [];

  var keywords = [];
  let value;

  var flag = 0;
  var currentPage = 1;

  Horns.prototype.render=function(){
    let $photoTemplate=$('.photo-template').html();
    var rendered=Mustache.render($photoTemplate,this);

    $('.allphotos').append(rendered);
    //console.log(rendered);
    // let $hornClone=$('.photo-template').clone();
    // $hornClone.find('h2').text(this.title);
    // $hornClone.find('img').attr('src',this.image_url);
    // $hornClone.find('p').text(this.description);
    // $hornClone.removeClass('photo-template');
    // $hornClone.attr('class',this.keyword);
    // $hornClone.show();
    // $('.allphotos').append($hornClone);



  };



  const readJson=()=>{
    currentPage = 1;
    allofHorns = [];
    keywords = [];
    $('.allphotos').html('');
    $('select').val('default');
    $.ajax('data/page-1.json',{method:'GET',dataType:'JSON'}).then(data=>{

      data.forEach(horns => {
        new Horns(horns);

      });
      let $data = data;
      // var titles=[];
      // var horns = [];
      $data.forEach(function(element){
        keywords.push(element.keyword);

        // titles.push(element.title);
        // horns.push(element.horns);

      });
      if(flag===0) allofHorns.sort((a, b) => (a.title.localeCompare(b.title)));
      if(flag===1) allofHorns.sort((a, b) => (a.horns > b.horns) ? 1 : -1);

      allofHorns.forEach(function(element){
        // console.log(element);
        element.render();
      });
      var taken = [];
      $('#keyword').html('');
      keywords.forEach(function(element){
        if(!taken.includes(element)){
          createList(element);
          taken.push(element);
        }

      });
      $('select').change(function(event){
        // console.log(event);
        value = event.originalEvent.target.value;
        // console.log(allofHorns);
        // console.log(value)
        allofHorns.forEach(function(element){
          // console.log(element);
          // console.log(element.keyword);
          // console.log($('.'+element.keyword));

          if(element.keyword !== value && value !== 'default'){
            $('.'+element.keyword).hide();
          }
          else{
            $('.'+element.keyword).show();
          }
        });
      });

      // keywords = new Set(keywords);
    });
  };

  const readJson2=()=>{
    currentPage=2;
    allofHorns = [];
    keywords = [];
    $('.allphotos').html('');
    $('select').val('default');
    $.ajax('data/page-2.json',{method:'GET',dataType:'JSON'}).then(data=>{

      data.forEach(horns => {
        new Horns(horns);

      });
      let $data = data;

      $data.forEach(function(element){
        if(element.title !== undefined){
          keywords.push(element.keyword);
        }


      });

      if(flag===0) allofHorns.sort((a, b) => (a.title.localeCompare(b.title)));
      if(flag===1) allofHorns.sort((a, b) => (a.horns > b.horns) ? 1 : -1);

      allofHorns.forEach(function(element){
        // console.log(element);
        element.render();
      });
      var taken = [];
      $('#keyword').html('');

      keywords.forEach(function(element){
        if(!taken.includes(element)){
          createList(element);
          taken.push(element);
        }

      });
      $('select').change(function(event){
        // console.log(event);
        value = event.originalEvent.target.value;
        // console.log(allofHorns);
        // console.log(value)
        allofHorns.forEach(function(element){
          // console.log(element);
          // console.log(element.keyword);
          // console.log($('.'+element.keyword));

          if(element.keyword !== value && value !== 'default'){
            $('.'+element.keyword).hide();
          }
          else{
            $('.'+element.keyword).show();
          }
        });
      });

      // keywords = new Set(keywords);
    });
  };


  readJson();

  $('#page_one').click(function(){
    readJson2();
  });
  $('#page_two').click(function(){
    readJson();
  });




  function createList(keyword) {
    let $option = $('<option>').text(keyword).attr('value', keyword);
    $('select').append($option);
  }

  $('input[name=\'sort\']').on('change',function(){
    let v = $('input[name=\'sort\']:checked').val();
    if(v ==='name'){
      flag = 0;
    }
    if(v ==='horns'){
      flag = 1;
    }
    if(currentPage === 1){
      readJson();
    }
    if(currentPage === 2){
      readJson2();
    }
  });



});





















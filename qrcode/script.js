$('[name=tab]').each(function(i,d){
  var p = $(this).prop('checked');
  if(p){
      $('article').eq(i)
          .addClass('on');
  }
});

$('[name=tab]').on('change', function(){
  var p = $(this).prop('checked');

  // $(type).index(this) == nth-of-type
  var i = $('[name=tab]').index(this);

  $('article').removeClass('on');
  $('article').eq(i).addClass('on');
});

function qr_generate() {
$('#qrcode').empty();
let select_val = $('input[type=radio]:checked').val();
if(select_val == 'url') {
let url = $('#url').val();
if(url == '' || url == null) {
blank_qr();
} else {
$('#qrcode').qrcode({width: 1000,height: 1000,text: url});
}
} else if(select_val == 'phone'){
let phone = $('#phone').val();
if(phone == '' || phone == null) {
blank_qr();
} else {
$('#qrcode').qrcode({width: 1000,height: 1000,text: 'tel:'+phone});
}
} else if(select_val == 'sms'){
let phone = $('#sms_phone').val();
let text = $('#sms_text').val();
if(phone == '' || phone == null) {
blank_qr();
} else {
$('#qrcode').qrcode({width: 1000,height: 1000,text:'smsto:'+phone+':'+text});
}
} else if(select_val == 'text') {
let plain_text = $('#plain_text').val();
if(plain_text == '' || plain_text == null) {
blank_qr();
} else {
$('#qrcode').qrcode({width: 1000,height: 1000,text: plain_text});
}
} else if(select_val == 'email'){
let email = $('#email').val();
let subject = $('#subject').val();
let message = $('#message').val();
if(email == '' || email == null) {
blank_qr();
} else {
$('#qrcode').qrcode({width: 1000,height: 1000,text:'mailto:'+email+'?subject='+subject+'&body='+message});
}
}
}

function blank_qr() {
$('#qrcode').empty();
$('#qrcode').qrcode({width: 1000,height: 1000,text: 'Hi! i am Nhan',rander:'svg'});
}
$('input').on('change keyup', function(){
qr_generate();
})
$('textarea').on('change keyup', function(){
qr_generate();
})
$(document).ready(function(){
qr_generate();
})

function download(canvas, filename) {
  var canvas = document.getElementById('canvas');
  var lnk = document.createElement('a'), e;

  lnk.download = filename;

  lnk.href = canvas.toDataURL("image/png;base64");

  if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window,
          0, 0, 0, 0, 0, false, false, false,
          false, 0, null);

      lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
  }
}


$('.qr-png-download').on('click', function (){
  $('canvas').attr('id', 'canvas');
   var canvas = document.getElementById('canvas');
download(canvas, 'qrcode.png')

})
$('.qr-svg-download').on('click', function (){
  
htmlToImage.toSvg(document.getElementById('qrcode'), { })
  .then(function (dataUrl) {
    let svg = decodeURIComponent(dataUrl.split(',')[1])
   const base64doc = btoa(unescape(encodeURIComponent(svg)));
    const a = document.createElement('a');
    const e = new MouseEvent('click');
    a.download = 'qrcode.svg';
    a.href = 'data:image/svg+xml;base64,' + base64doc;
    a.dispatchEvent(e);       
  });
})
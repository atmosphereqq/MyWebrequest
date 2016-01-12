// Generated by CoffeeScript 1.10.0
define(function(require) {
  var QRAPIURL, getQrText, getVcardString, init, loadQrImg, showQrErrTip, utils, vars;
  utils = require('common/js/utils');
  vars = require('js/vars');
  QRAPIURL = vars.QR_API_URL;
  init = function(cat) {
    return setTimeout(function() {
      $('#qrcode .tab-content').find(':input:visible:first').focus();
    }, 300);
  };
  $('#qrcode .nav-tabs li').on('click', function(e) {
    var $tabContent, $target, $this, target;
    $this = $(this);
    target = $this.attr('data-target');
    $this.siblings().removeClass('active');
    $this.addClass('active');
    $tabContent = $('#qrcode .tab-content');
    $tabContent.find('.tab-pane.active').removeClass('active in');
    $target = $tabContent.find(".tab-pane#tab-" + target);
    $target.addClass('active');
    return setTimeout(function() {
      $target.addClass('in');
      return $target.find('.input:first').focus();
    }, 0);
  });
  $('#qrcode .tab-content').on('keydown', '.input', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 13) {
      $(this).parents('.tab-pane').find('.make-qrcode').click();
      return false;
    }
  });
  document.getElementById('qrimg').onerror = function(e) {
    this.setAttribute('hidden', true);
    dialog({
      title: utils.i18n('opt_errtip_gtitle'),
      content: utils.i18n('opt_errtip_gcontent'),
      okValue: utils.i18n('ok_btn'),
      ok: function() {}
    }).showModal();
  };
  getVcardString = function() {
    var str;
    str = [];
    $('#tab-vcard').find('input,textarea').map(function(i, el) {
      if (el.value !== '') {
        return str.push(el.name + ":" + el.value);
      }
    });
    return str.join(';');
  };
  showQrErrTip = function($div, msg) {
    $div.text(msg);
    $div.prop('hidden', false);
    setTimeout(function() {
      $div.prop('hidden', true);
    }, 3000);
  };
  getQrText = function(type) {
    var str;
    str = '';
    switch (type) {
      case 'text':
        str = $('#s-text').val().trim();
        break;
      case 'vcard':
        str = getVcardString();
        if (str) {
          str = 'MECARD:' + str + ';;';
        }
        break;
      case 'msg':
        if ($('#s-tel').val().trim() || $('#s-msg').val().trim()) {
          str = 'smsto:' + $('#s-tel').val().trim() + ':' + $('#s-msg').val().trim();
        }
    }
    return str;
  };
  $('#qrimg').on('load', function() {
    $('#qrimg').addClass('show');
  });
  loadQrImg = function(src) {
    $('#qrimg').removeClass('show').attr('src', src);
  };
  $('#qrcode .tab-content').on('click', '.make-qrcode', function(e) {
    var $eMsg, $qrimg, $tab, $this, str, type;
    $this = $(this);
    $tab = $this.parents('.tab-pane');
    $eMsg = $this.prev();
    type = $tab.attr('data-type');
    str = getQrText(type);
    if (str === '') {
      showQrErrTip($eMsg, utils.i18n('opt_qrtip_notext'));
      $tab.find('.input:first').focus();
      return;
    }
    str = encodeURIComponent(str);
    if (str.length > 1900) {
      showQrErrTip($eMsg, utils.i18n('opt_qrtip_ovfl'));
      return;
    }
    $qrimg = $('#qrimg');
    loadQrImg(QRAPIURL.replace('%s', str));
  });
  $('.letter-cunt-wrapper').on('keyup', 'textarea', function(e) {
    $(this).next().text(this.value.trim().length + '/300');
  });
  return {
    init: init
  };
});


//# sourceMappingURL=qr-page.js.map

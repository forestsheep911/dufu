jQuery.noConflict();

(function ($, PLUGIN_ID) {
  'use strict';

  var $form = $('.js-submit-settings');
  var $cancelButton = $('.js-cancel-button');
  var $message = $('.js-text-message');
  var $mtcode = $('.js-text-mtcode');
  var config = kintone.plugin.app.getConfig(PLUGIN_ID);

  if (config.message) {
    $message.val(config.message);
  }

  if (config.mtcode) {
    $mtcode.val(config.mtcode);
  }

  $form.on('submit', function (e) {
    e.preventDefault();
    kintone.plugin.app.setConfig({
      message: $message.val(),
      mtcode: $mtcode.val()
    }, function () {
      // alert('The plug-in settings have been saved. Please update the app!');
      window.location.href = '../../flow?app=' + kintone.app.getId();
    });
  });
  $cancelButton.on('click', function () {
    window.location.href = '../../' + kintone.app.getId() + '/plugin/';
  });
})(jQuery, kintone.$PLUGIN_ID);
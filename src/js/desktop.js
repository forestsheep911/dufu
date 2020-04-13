jQuery.noConflict();

(function ($, PLUGIN_ID) {
  'use strict';

  kintone.events.on('app.record.index.show', function () {
    var config = kintone.plugin.app.getConfig(PLUGIN_ID);

    var spaceElement = kintone.app.getHeaderSpaceElement();
    var fragment = document.createDocumentFragment();
    var headingEl = document.createElement('h3');
    var messageEl = document.createElement('p');

    messageEl.classList.add('plugin-space-message');
    messageEl.textContent = config.message;
    headingEl.classList.add('plugin-space-heading');
    headingEl.textContent = 'Hello kintone plugin!';

    fragment.appendChild(headingEl);
    fragment.appendChild(messageEl);
    spaceElement.appendChild(fragment);
  });

  kintone.events.on('app.record.detail.show', function (event) {
    console.log(event.record)
    console.log(event.record.multi.value)
    console.log(kintone.app.record.getFieldElement('multi'))
  });

  kintone.events.on('app.record.edit.show', function (event) {
    console.log("plugin is here")
    console.log("new git success")
    let textElement = document.getElementsByClassName("row-gaia clearFix-cybozu")[0]
    let addnewTextAreaElement = document.createElement("div")
    textElement.parentNode.append(addnewTextAreaElement)
    let markdownTextContent = "# title1"
    Vditor.preview(addnewTextAreaElement,
      markdownTextContent, {
        markdown: {
          toc: true,
        },
        hljs: {
          style: 'native'
        },
        speech: {
          enable: true,
        },
        anchor: true,
      })

    let edittingVeditor = document.createElement("div")
    edittingVeditor.setAttribute("id", "vditor")
    textElement.parentNode.append(edittingVeditor)

    const vditor = new Vditor('vditor', {
      debugger: true,
      typewriterMode: true,
      placeholder: 'placeholder',
      counter: 100,
      height: 500,
      width:1400,
      preview: {
        markdown: {
          toc: true,
        },
      },
      resize: {
        enable: true
      },
      hint: {
        emojiPath: 'https://cdn.jsdelivr.net/npm/vditor@1.8.3/dist/images/emoji',
        emojiTail: '<a href="https://hacpai.com/settings/function" target="_blank">设置常用表情</a>',
        emoji: {
          'sd': '💔',
          'j': 'https://unpkg.com/vditor@1.3.1/dist/images/emoji/j.png',
        },
      },
      tab: '\t',
      upload: {
        accept: 'image/*,.mp3, .wav, .rar',
        token: 'test',
        url: '/api/upload/editor',
        linkToImgUrl: '/api/upload/fetch',
        filename(name) {
          return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').
          replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').
          replace('/\\s/g', '')
        },
      },
    })
  });

})(jQuery, kintone.$PLUGIN_ID);
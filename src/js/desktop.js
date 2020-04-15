jQuery.noConflict();

(function ($, PLUGIN_ID) {
    'use strict';
    let config = kintone.plugin.app.getConfig(PLUGIN_ID);
    let vditor;
    kintone.events.on('app.record.index.show', function () {});

    kintone.events.on(['app.record.detail.show', 'app.record.print.show'], function (event) {
        let mtcode = config.mtcode;
        let spcode = config.spcode;
        let multiEle = kintone.app.record.getSpaceElement(spcode);
        let markdownValue = event.record[mtcode].value;
        kintone.app.record.setFieldShown(mtcode, false)

        let markdownPreviewDiv = document.createElement("div");
        $(multiEle).after(markdownPreviewDiv);

        Vditor.preview(markdownPreviewDiv,
            markdownValue, {
                markdown: {
                    toc: true,
                },
                hljs: {
                    style: 'manni'
                },
                speech: {
                    enable: true,
                },
                anchor: true,
            })
        return event
    });



    kintone.events.on('app.record.edit.submit', function (event) {
        let mtcode = config.mtcode;
        event.record[mtcode].value = vditor.getValue();
        return event;
    });

    kintone.events.on(['app.record.edit.show', 'app.record.create.show'], function (event) {
        console.log(event)
        let mtcode = config.mtcode;
        let spcode = config.spcode;
        let spaceEle = kintone.app.record.getSpaceElement(spcode);
        let markdownValue = event.record[mtcode].value;
        kintone.app.record.setFieldShown(mtcode, false)

        let edittingVeditor = document.createElement("div")
        edittingVeditor.setAttribute("id", "vditor")
        spaceEle.append(edittingVeditor)

        vditor = new Vditor('vditor', {
            cache: {
                enable: false
            },
            debugger: true,
            typewriterMode: true,
            placeholder: '空白',
            counter: 100,
            height: 610,
            width: 1400,
            mode: "sv",
            preview: {
                markdown: {},
                hljs: {
                    style: 'manni',
                    lineNumber: true
                }
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
            tab: '    ',
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
        setTimeout(() => {
            vditor.setValue(markdownValue)
        }, 300);
    });

})(jQuery, kintone.$PLUGIN_ID);
import Vue from "vue";
import store from "@/store";
import CommentForm from "@/components/CommentForm";
import CommentCanvas from "@/components/CommentCanvas";
import vuetify from '@/plugins/vuetify';

init();

async function init() {

    // 画面にコメント用のCanvasの配置
    document.querySelector("body").insertAdjacentHTML(
        `afterBegin`,
        `
<div id="google-meet-nico-extension">
</div>`
    );

    // コメントフォームが開かれるまで待機
    const openCommentFormResult = await openCommentForm().then(() => ({status: "success"})).catch(() => ({status: "failure"}));
    if (openCommentFormResult.status === "success") {
        console.log("終了");
    } else {
        console.log("失敗");
    }
    const closeBtn = document.querySelector(".VUk8eb");
    closeBtn.removeChild(closeBtn.firstChild);
    // 画面にコメント用のフォームの配置
    document.querySelector(".vvTMTb").insertAdjacentHTML(
        `beforeend`,
        `
<div id="nico-comment-form">
</div>`
    );
    new Vue({
        el: "#nico-comment-form",
        vuetify,
        store,
        render: h => h(CommentForm)
    });
    new Vue({
        el: "#google-meet-nico-extension",
        vuetify,
        store,
        render: h => h(CommentCanvas)
    });
}


async function openCommentForm() {
    const rejectTime = 10000;
    return new Promise((resolve, reject) => {
        let hasChanged = false;
        const option = {
            childList: true,
            subtree: true
        };
        const target = document.querySelector(".usGiVb.t1xuq");
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    hasChanged = true;
                    observer.disconnect();
                    resolve();
                });
            });
        });

        setTimeout(() => {
            if (!hasChanged) {
                reject();
            }
        }, rejectTime);

        observer.observe(target, option);

        document.querySelectorAll(".uArJ5e.UQuaGc.kCyAyd.QU4Gid.foXzLb").forEach(elm => {
            if (elm.dataset.tooltip === "全員とチャット") {
                elm.click();
            }
        });
    });
}
<template>

    <div class="image">
        <img src="/static/1.jpeg" data-url="/static/2.jpg" alt="" @click="open($event)">
        <transition name="fade">
            <div v-show="max_show" @click="no_show" style="width: 100%;height: 100%" id="max_div">
                <img :src="max_img" alt="" id="max_img" style="">
            </div>
        </transition>
    </div>

</template>
<script>
    export default {
        name: 'Image',
        data () {
            return {
                max_img: '',
                max_show: false,

            }
        },
        computed: {},
        methods: {
            open(event){
                let url = event.target.src;
                let self = this;
                event.target.src = event.target.getAttribute('data-url');
                let image = new Image();
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                image.src = event.target.src;
                image.onload = function () {
                    let cw = image.width;
                    let ch = image.height;
                    let w = image.width;
                    let h = image.height;
                    if (cw > 800 && cw > ch) {
                        w = 800;
                        h = (600 * ch) / cw;
                        canvas.width = w;
                        canvas.height = h;
                    }
                    if (ch > 600 && ch > cw) {
                        h = 600;
                        w = (800 * cw) / ch;
                        canvas.width = w;
                        canvas.height = h;
                    }
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
                    let img = canvas.toDataURL("image/jpeg", 1);
                    self.max_img = img;
                    self.max_show = true;
                    event.target.src = url;
                    let max_div = document.getElementById('max_div');
                    max_div.style.height = document.body.clientHeight;
                    let max_img = document.getElementById('max_img');
                    max_img.style.marginTop = (document.documentElement.clientHeight - canvas.height) / 2 + 'px';

                }

            },
            no_show(){
                this.max_show = false;
                this.max_img = '';
            }
        }
    }
</script>
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    #max_div {
        position: fixed;
        top: 0px;
        left: 0px;
        background-color: #000;
        width: 100%;
        height: 100%;
    }

    #max_img {
        /*vertical-align: middle;*/
        position: relative;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>
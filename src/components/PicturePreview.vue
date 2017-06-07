<template>

    <div class="image">
        <div v-for="(item,index) in imgList">
            <img :src="item.min_pic" :data-url="item.max_pic" alt="" @click="open($event,index)">
        </div>
        <transition name="fade">
            <div v-show="max_show" @click="no_show" style="width: 100%;height: 100%" id="max_div" draggable="true"
                 v-on:dragend="end($event)" v-on:touchend="t_end($event)" v-on:touchstart="t_start($event)">
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
                pic: '/static/1.jpeg',
                imgList: [{'min_pic': '/static/1.jpeg', 'max_pic': '/static/2.jpg'}, {
                    'min_pic': '/static/3.jpg',
                    'max_pic': '/static/4.jpg'
                }],
                now_index: '',
                t_X:'',
                t_Y:''

            }
        },
        computed: {},
        mounted(){
            let self = this;
            window.addEventListener('keyup', function (event) {
                if (event.keyCode == 39) {
                    self.right();
                }
                if (event.keyCode == 37) {
                    self.left();
                }
            });
            window.addEventListener('touchstart', function (event) {
                event.preventDefault();

            },false);
        },
        methods: {
            open(event, index){
//                console.log(event);
                let url = event.target.src;
                this.create_img(event.target.getAttribute('data-url'), index);
//


            },
            create_img(img, index){
                let self = this;
                let image = new Image();
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                image.src = img;
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
//                    event.target.src = url;
                    let max_div = document.getElementById('max_div');
                    max_div.style.height = document.body.clientHeight;
                    let max_img = document.getElementById('max_img');
                    max_img.style.marginTop = (document.documentElement.clientHeight - canvas.height) / 2 + 'px';
                    self.now_index = index;

                }
            },
            no_show(){
                this.max_show = false;
                this.max_img = '';
            },


            end(event){
                if (event.layerX > 100) {
                    this.right();
//                   event.preventDefault();
                }
                if (event.layerX < -100) {
                    this.left();
//                   event.preventDefault();
                }
            },
            right(){
                let index = this.now_index + 1;
                if (this.now_index == this.imgList.length - 1) {
                    index = 0;
                }
                this.create_img(this.imgList[index].max_pic, index);
                this.now_index = index;


            },
            left(){
                let index = this.now_index - 1;
                if (this.now_index == 0) {
                    index = this.imgList.length - 1;
                }
                this.create_img(this.imgList[index].max_pic, index);
                this.now_index = index;

            },
            t_start(event){
                event.preventDefault();
//             alert(event.touches[0].pageX);
                this.t_X=event.changedTouches[0].pageX;
                this.t_Y=event.changedTouches[0].pageY;
            },
            t_end(event){
                event.preventDefault();
                let endX=event.changedTouches[0].pageX;
                let endY=event.changedTouches[0].pageY;
                let X=endX-this.t_X;
                alert(X);
//                let Y=endY-this.t_Y;
//                if(X>0){
//                    this.right();
//                }else{
//                    this.left();
//                }


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
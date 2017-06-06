<template>

    <div class="image">
        <label>选择图片上传</label>
        <input type="file" name="file" @change="upload($event)" multiple :accept="size" />
        <label>拍照上传</label>
        <input type="file" accept="image/*" capture="camera" @change="upload($event)">
        <div>
            <div v-for="(item,k) in uploadList">
                <img :src="item.img" alt="" @click="show_all($event)" :data-url="imageList[k].img">
                <button @click="del(k)">删除</button>
            </div>
        </div>
        <button @click="delAll()" v-if="all_show">删除全部</button>
        <button @click="api_upload()" v-if="all_show">上传</button>
<transition name="fade">
        <div v-show="max_show" @click="no_show" id="max_show" style="width: 100%;height: 100%">
         <img :src="max_pic" alt="" id="max_img" width="auto" height="auto">
            </div>
    </transition>
    </div>

</template>
<script>
    export default {
        name: 'Image',
        data () {
            return {
                imageList: [],
                uploadList: [],
                pic_flag:true,
                max_pic:'',
                max_show:false,
                max_size:8*1024*1024,
                size:'image/jpg,image/jpeg,image/png'
            }
        },
        computed:{
            all_show(){
              return this.uploadList.length > 0 ? true:false;
            }
        },
        methods: {
            upload(event){
                let self = event;
                let files = self.target.files;
                if (!files) {
                    return;
                }
                this.createImage(files);
                setTimeout(function () {
                    self.target.value=null;
                },1000);

            },
            createImage(files){
                let self = this;
                let image = new Image();
                let length = files.length;
                let arr=[];
                for (let i = 0; i < length; i++) {
                    let reader = new FileReader();
                    reader.readAsDataURL(files[i]);
//                    console.log(files[i]);

                    reader.onload = function () {
                        let canvas=document.createElement('canvas');
                        let ctx=canvas.getContext('2d');
                        let image=new Image();
                        self.imageList.push({'index':i,'img':this.result});
                        if(self.imageList){
                            self.imageList.sort((a,b)=>{
                                return a.index-b.index;
                            })
                        }

                        image.src=this.result;
                        image.onload=function () {
                            let cw=image.width;
                            let ch=image.height;
                            let w=image.width;
                            let h=image.height;
                            canvas.width=w;
                            canvas.height=h;
                            if(cw>580&&cw>ch){
                                w=580;
                                h=(500*ch)/cw;
                                canvas.width=w;
                                canvas.height=h;
                            }
                            if(ch>500&&ch>cw){
                                h=500;
                                w=(580*cw)/ch;
                                canvas.width=w;
                                canvas.height=h;

                            }

                            ctx.drawImage(image,0,0,w,h);
                            let img=canvas.toDataURL("image/jpeg",0.7);
//                            self.imageList.push(img);
                            self.uploadList.push({'index':i,'img':img});
                            if(self.uploadList){
                                self.uploadList.sort((a,b)=>{
                                    return a.index-b.index;
                                });
                            }
                        }


                        }

                    }

            },
            del(index){
                this.uploadList.splice(index, 1);
                this.imageList.splice(index,1);

            },
            delAll(){
              this.uploadList=[];
              this.imageList=[];
            },
            api_upload(){
                this.$http.post('http://dbshicai2.dev/mobile/te/vue_upload', this.uploadList).then(success => {
//                    this.imageList=[];
//                    success.body.forEach((item,index)=>{
//                        this.imageList.push({'index':index,'img':'http://dbshicai2.dev'+item});
//                    })

                })
            },
            show_all(event){
                let self=this;
                let src=event.target.getAttribute('data-url');

                if(self.pic_flag){
                    let image=new Image();
                    image.src=src;
                    let canvas=document.createElement('canvas');
                    let ctx=canvas.getContext('2d');
                    image.onload=function () {
                        let cw=image.width;
                        let ch=image.height;
                        let w=image.width;
                        let h=image.height;
                        canvas.width=image.width;
                        canvas.height=image.height;
                        if(cw>800&&cw>ch){
                            w=800;
                            h=(600*ch)/cw;
                            canvas.width=w;
                            canvas.height=h;
                        }
                        if(ch>600&&ch>cw){
                            h=600;
                            w=(800*cw)/ch;
                            canvas.width=w;
                            canvas.height=h;

                        }
                         ctx.fillStyle='#fff';
                            ctx.fillRect(0,0,canvas.width,canvas.height);
                        ctx.drawImage(image,0,0,canvas.width,canvas.height);
                        let img=canvas.toDataURL("image/jpeg",1);
                         self.max_pic=img;
                         self.max_show=true;
                         let max_div=document.getElementById('max_show');
                         max_div.style.height=document.body.clientHeight;
                         let max_img=document.getElementById('max_img');
                        max_img.style.marginTop=(document.documentElement.clientHeight-canvas.height)/2+'px';
//                        console.log(this.max_pic);

                    }
                }
            },
            no_show(){
                this.max_show=false;
                this.max_pic='';
                this.pic_flag=true;
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
    #max_show{
     position:fixed;
        top:0px;
        left:0px;
        background-color: #000;
        width: 100%;
        height: 100%;
    }
    #max_img{
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
<template>
    <div class="hello">
        <ul v-for="(item,index) in list">
            <li v-for="(item1,index1) in list[index]" @click="select(index,index1)"
                v-bind:class="{test:item1.id==selects[index].id}">{{item1.title}}
            </li>
        </ul>
        <span v-text="has_select_arr"></span>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
                list: [
                    [
                        {'id': 0, 'title': '111'},
                        {'id': 1, 'title': '222'}
                    ],
                    [
                        {
                            'id': 2, 'title': '333'
                        },
                        {
                            'id': 3, 'title': '444'
                        }
                    ]
                ],
                selects: [{'group': 0, 'id': 0}, {'group': 1, 'id': 2}],
                select_arr: {'group': '', 'id': ''},
                has_selects:[],
                has_select_arr:''
            }
        },
        mounted(){
         this.selects.forEach((item,index)=>{
             this.list[index].forEach((it,k)=>{
                 if(it.id==item.id){
                     this.has_selects.push({'group':index,'title':index+":"+it.title});
                     this.select_arr={'group': '', 'id': ''};
                 }
             })
         });
         console.log(this.has_selects);
            let arr=[];
            this.has_selects.forEach((item,index)=>{
                arr.push(item.title);
            });
//            console.log(arr);
         this.has_select_arr=arr.join(',');
//         console.log(this.has_select_arr);

        },
        methods: {
            select(index, index1){
                let status = false;
                this.selects.forEach((item, k) => {
                    if (item.group == index) {
                        status = true;
                        this.selects.splice(k, 1);
                        this.has_selects.splice(k,1)
                    } else {
                        status = true;
                    }
                });
                if (status) {
                    this.select_arr.group = index;
                    this.select_arr.id = this.list[index][index1].id;
                    this.selects.push(this.select_arr);
                    this.has_selects.push({'group':index,'title':index+":"+this.list[index][index1].title});
                    this.select_arr = {'group': '', 'id': ''};
                }

                this.selects.sort((a, b) => {
                    return a.group - b.group;
                });
                this.has_selects.sort((a,b)=>{
                    return a.group-b.group
                });
                let arr=[];
                this.has_selects.forEach((item,index)=>{
                    arr.push(item.title);
                });
                this.has_select_arr=arr.join(',');
                console.log(this.selects);
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

    .test {
        color: red;
    }
</style>

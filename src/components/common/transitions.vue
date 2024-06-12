<template>
        <div>
                <transition :name="boonSidebar">
                        <slot></slot>
                </transition>
                <transition :name="iconDown">
                        <slot></slot>
                </transition>
        </div>
</template>
<script>
export default {
        name:"transitions",
        props:{
                boonSidebar:{
                        type:String,
                        default:'boonSidebar'
                },
                iconDown:{
                        type:String,
                        default:'iconDown'
                }
        },
        data() {
                return {
                        
                }
        },
}
</script>
<style scoped lang="scss">
        .boonSidebar-enter-active {
                transition: all .3s ease;
                }
                .boonSidebar-leave-active {
                transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
                }
                .boonSidebar-enter, .boonSidebar-leave-to
                /* .slide-fade-leave-active for below version 2.1.8 */ {
                transform: translateX(100px);
                opacity: 0;
                }

                .iconDown-enter-active {
                transition: transform 5s ease;
                }
                .iconDown-leave-active {
                transition: transform 5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
                }
                .iconDown-enter, .iconDown-leave-to
                        /* .slide-fade-leave-active for below version 2.1.8 */ {
                        transform: rotate(0deg);
                        opacity: 0;
                }
</style>
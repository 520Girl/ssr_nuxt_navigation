<template>
    <div>
        <p>header</p>
        <main>
            <!-- 内容区域 -->
            <!--        <slot name="main"></slot>-->
            <appMain></appMain>
        </main>
    </div>
</template>
<script>
    import appMain from "@/components/pages/mains/appMain";
    import home from "@/components/Home";
    export default {
        name: "headerNav",
        components: { appMain, home },
        data() {
            return {
                
            }
        },
    }
</script>
<style lang="scss" scoped>
    @import '~/assets/css/_bianliang.scss';

    div {
        background: red;
        height: 50px;

        p {
            background-color: pink;
        }
    }
</style>
<template>
    <div class="gradeBackground">
<!--        <img src="https://www.ymrkou.com/wp-content/themes/webstackpro/images/fx/shape-11.svg" alt="" class="img trianle-01">-->
<!--        <img src="https://www.ymrkou.com/wp-content/themes/webstackpro/images/fx/shape-02.svg" alt="" class="img trianle-02">-->
<!--        <img src="https://www.ymrkou.com/wp-content/themes/webstackpro/images/fx/shape-03.svg" class="img trianle-03 " >-->
<!--        <img src="https://www.ymrkou.com/wp-content/themes/webstackpro/images/fx/shape-04.svg" class="img trianle-04 " >-->
<!--        <img src="https://www.ymrkou.com/wp-content/themes/webstackpro/images/fx/shape-05.svg" class="img trianle-05 " >-->
<!--        <img src="https://www.ymrkou.com/wp-content/themes/webstackpro/images/fx/shape-06.svg" class="img trianle-06 " >-->
<!--        <img src="https://www.ymrkou.com/wp-content/themes/webstackpro/images/fx/shape-07.svg" class="img trianle-07 " >-->
<!--        <img src="https://www.ymrkou.com/wp-content/themes/webstackpro/images/fx/shape-08.svg" class="img trianle-08 " >-->
<!--        <img src="https://www.ymrkou.com/wp-content/themes/webstackpro/images/fx/shape-09.svg" class="img trianle-09 " >-->
<!--        <img src="https://www.ymrkou.com/wp-content/themes/webstackpro/images/fx/shape-10.svg" class="img trianle-10 " >-->
<!--        <img src="https://www.ymrkou.com/wp-content/themes/webstackpro/images/fx/shape-11.svg" class="img trianle-11 " >-->
        <img class="img trianle-12" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAsCAYAAAATmipGAAAAAXNSR0IArs4c6QAABUFJREFUWAndWVuMXVMY/v4zo9ox55xBVUQoUtWqXh6aRkNDEDWK4kEfpKlIiFt4EeKSCEGERw80wgMpkkoTpaYdnryoS1vSRkZCJZ3GJaH23udMp9Hp/L519uxz9j5rnbPPbc+Dlaystb/1X75ZZ/3/uowgqzKpF+IkVkCxiC7OgqDE1kMfvsMAfoDIdFau0+2qzoOvj7HuhafapB7j2NsI9LJ0o6GEtCqYKufpJsq8xnpBqmwkIDCz+j4KeIQz7Eewq+2eqGoffLxB4/e5HLSIHabcXRiSfY3kuyOqOhcBtnMd3tLIQRv4BNfxDSjKXpdO50TNTAbYQZK3uQzPYMfp/BBlfmM7wHYZ8fMbyguOUWYNZ/aXhjJtD3j6TpNgOcyA2gzVMyy7ZV3BsfdYp536vn5Jvc4nMOHQ01edTkyk+7qNjuYm5F0fvm6gDc9pJ9AtLpX2sECfcBoP09HWtmbDkHXNrK+H2iNVLx3ovU1IMqg0V6+S+u3rC06bga5N1XUKBLqRf/2U06inX5DkHKdeGqhaoM3jll1fn4urtjYDJb2G0fgha19cudIXbolF3M6E/a811gogEjAjfGKJKq6NY+lEy7oKp7CTJO0AEfxEJ8MkWY4b7aC/06GzKo41J+rrIpLcTYVCXGmmfxRzcCMK8pdjrD0ohwMOhSFM6sIIb0x0Qs/jLI6ynhsJV1vB31wE6zFPjlSxbjqDlV/mhGXiJKqz6iaqOsQj2h4qXmwpAxPENiAvPzrGOoNETlHRTknajKiJ3gCfUnG55VVIH7iT+/HX1li3gOJ7y4RiZYTZMxrgFf7cV0UC1dYcyRSbuQ+PVrFedsRBFLUZTbryddi5U4Rb40NJ4R5/BXq1I5dycphnE8XsKp7+agmHJBPJN6HXqw/VvHOSAl1nXNR++hIDBLjIgIki+IBr8vkElsWHiLlTmQN0sswEVI2o4uGkROVrnBn0AQeeDeQOqEqKComqnkbP11nec3idu05g4VkBwtupXSqRHxKdwFJGtCGbLDm8mwQy/nJFvuAKBlR/SHSKROuL8PowKH/Ww5l+9ztSlOJ0lLEkJCqOU5Hy/jLbZUDGecix/U5jZUg0B9cRzb7vzAZxdaxTRn5IVPGHxUGYqjw908KzBtzrdHFINI99nHKzj9eKEsnhjhowa72fHZ4WzKxRmeTgfktA8Tgjzs4GlmAPAeUR0i7zQ6JmQPCWNa7MBj5etPBsAXu5KYIa0Ty2kazrtG6ux09nyy1mXRzHS+BIjajICRJ9MqYS777EA8MemFeOLIt5JlJstFzkMCYW6Ku5yN1q4REg+JbjH3MfG+Fr0gFusRoNdd16ej9tbLXsCK60iZqUJJW70mpLoR6QSlrbTeIjvDKPkrRXL9Lyt6+X0o65OdSv0XHaXmgTNZZVi7yOjFCx9dcK4X0V+KpCuh+fcfu1rxbGtqsEuoT3h10cusQx/CBvFW+6iRppk5YCPMXeM3Te/iuI4PcK6T7+wYP4nLPtWyTMU3qJr83TeJZjBWtcMEZ0OXWnGhONtEq6lIYepdO7CeUjuK1WMEX5b7ikDtLOUdYi+4vZXk+80VZtcvu66BU6nWjEyLx1BpVH25sJraeTc6KhnrdC64pNJLk9st060UjDtOZ+FcAEmyE9zLqahmupjkAXpcyz3Ba+G+yI2+iMaNyC6Qc6n0RvYs+QNrN9toE7KPvRj3sYiAfrdXtDNG41nO01hAzpaLbT/JgM8TJX7keN8nKagTiFzvolXcAZXsuAvJwBtIxGiqz/sJp/LIwxn+yCOTD/X8p/MzB/buX27+oAAAAASUVORK5CYII=" alt="">
        <img class="img trianle-13" src="data:image/png;base64,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" alt="">
        <img class="img trianle-14" width="50" height="72" src="data:image/png;base64,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" alt="">
        <div class="img trianle-15"></div>
    </div>
</template>
<script>
    export default {
      name:"",
      data(){
        return{

        }
      },
      mounted() {
      }
    }
</script>
<style lang="scss" scoped>
    .gradeBackground{
        position: fixed;
        width: 100vw;
        height: 100vh;
        img{
            height: auto;
            max-width: 100%;
        }
        .trianle-01{
            animation:trianle-01 13s linear infinite ;
            opacity: 0.5;
        }
        .trianle-02{
            animation:trianle-03 25s linear infinite alternate;
            position: inherit;
            left: 20%;
            bottom: 15%;
        }
        .trianle-03{
            animation:trianle-03 35s linear infinite alternate;
        }
        .trianle-04{
            animation:trianle-04 15s linear infinite ;
        }
        .trianle-05{
            animation:trianle-05 20s linear infinite alternate;
        }
        .trianle-06{
            animation:trianle-06 17s linear infinite ;
            top:25%;
            right: 5%;
            position: inherit;
        }
        .trianle-07{
            animation:trianle-07 20s linear infinite alternate;
            top:25%;
            right: 50%;
            position: inherit;
        }
        .trianle-08{
             animation:trianle-01 18s linear infinite ;
             opacity: 0.6;
            top: 50%;
            left: 35%;
            position: inherit;
         }
        .trianle-09{
            animation:trianle-05 15s linear infinite ;
            position: inherit;
            top: 5%;
            left: 45%;
            opacity: 0.7;
        }
        .trianle-10{
            animation:trianle-01 12s linear infinite ;
            opacity: 0.1;
            top: 30%;
            right: 5%;
            position: inherit;
        }
        .trianle-11{
            animation:trianle-01 10s linear infinite ;
            opacity: 0.5;
            bottom: 30%;
            left: 50%;
            position: inherit;
        }
        .trianle-12{
            animation:trianle-08 10s linear infinite ;
            opacity: 0.5;
            bottom: 20%;
            right: 6%;
            position: inherit;
        }
        .trianle-13{
            animation:trianle-09 5s linear infinite ;
            opacity: 0.5;
            bottom: 20%;
            left: 6%;
            position: inherit;
        }
        .trianle-14{
            animation:trianle-10 6s linear infinite ;
            position: inherit;
            top: 15%;
            right: 30%;
        }
        .trianle-15{
            animation:trianle-01 20s linear infinite ;
            border: 2.6px solid #0045ff;
            border-radius: 50%;
            width: 26px;
            height: 26px;
            opacity: .4;
            position: inherit;
            bottom: 20%;
            left: 20%;
        }
    }
    @keyframes trianle-01 {
        0% {
            transform: translate(0) rotate(0deg) scale(1)
        }

        20% {
            transform: translate(73px,-1px) rotate(36deg) scale(.9)
        }

        40% {
            transform: translate(141px,72px) rotate(72deg) scale(1)
        }

        60% {
            transform: translate(83px,122px) rotate(108deg) scale(1.2)
        }

        80% {
            transform: translate(-40px,72px) rotate(144deg) scale(1.1)
        }

        to {
            transform: translate(0) rotate(0deg) scale(1)
        }
    }
    @keyframes trianle-02 {
        0% {
            transform: translate(-300px,151px) rotate(0deg)
        }

        to {
            transform: translate(251px,-200px) rotate(180deg)
        }
    }
    @keyframes trianle-03 {
        0% {
            transform: translate(165px,-179px)
        }

        to {
            transform: translate(-346px,617px)
        }
    }
    @keyframes trianle-04 {
        0% {
            transform: translate(-300px,151px) rotate(0deg)
        }

        to {
            transform: translate(251px,-200px) rotate(180deg)
        }
    }
    @keyframes trianle-05 {
        0% {
            transform: translate(0) rotate(0deg)
        }

        20% {
            transform: translate(73px,-1px) rotate(36deg)
        }

        40% {
            transform: translate(141px,72px) rotate(72deg)
        }

        60% {
            transform: translate(83px,122px) rotate(108deg)
        }

        80% {
            transform: translate(-40px,72px) rotate(144deg)
        }

        to {
            transform: translate(0) rotate(0deg)
        }
    }
    @keyframes trianle-06 {
        0% {
            transform: translate(-300px,151px) rotate(0deg)
        }

        to {
            transform: translate(251px,-200px) rotate(180deg)
        }
    }
    @keyframes trianle-07{
        0% {
            transform: translate(0) rotate(0deg)
        }

        20% {
            transform: translate(73px,-1px) rotate(36deg)
        }

        40% {
            transform: translate(141px,72px) rotate(72deg)
        }

        60% {
            transform: translate(83px,122px) rotate(108deg)
        }

        80% {
            transform: translate(-40px,72px) rotate(144deg)
        }

        to {
            transform: translate(0) rotate(0deg)
        }
    }
    @keyframes trianle-08 {
        0% {
            -webkit-transform: none;
            transform: none;
            opacity:0.9;
        }

        30% {
            -webkit-transform: translate(-40px,30px);
            transform: translate(-40px,30px);
            opacity:0.5;
        }

        60% {
            -webkit-transform: none;
            transform: none;
            opacity:0.2;
        }
    }
    @keyframes trianle-09 {
        0% {
            -webkit-transform: none;
            transform: none
        }

        30% {
            -webkit-transform: translate(30px,20px);
            transform: translate(30px,20px)
        }

        60% {
            -webkit-transform: none;
            transform: none
        }
    }
    @keyframes trianle-10 {
        0% {
            -webkit-transform: none;
            transform: none;
            opacity: 0
        }

        15% {
            -webkit-transform: translate(-5px,-20px);
            transform: translate(-5px,-20px);
            opacity: 1
        }

        30% {
            -webkit-transform: translate(-15px,-40px);
            transform: translate(-15px,-40px)
        }

        45% {
            -webkit-transform: translate(5px,-50px);
            transform: translate(5px,-50px)
        }

        60% {
            -webkit-transform: translate(15px,-80px);
            transform: translate(15px,-80px);
            opacity: 1
        }

        80% {
            -webkit-transform: translateY(-100px);
            transform: translateY(-100px);
            opacity: 0
        }

        to {
            -webkit-transform: none;
            transform: none;
            opacity: 0
        }
    }
</style>

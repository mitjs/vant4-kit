<template>
    <div class="pay-code-container">
        <h3>💕 打赏作者，喝杯热茶 💕</h3>
        <div class="qrcode-group">
            <div class="qr-code">
                <img src="../public/wxpay.png" alt="">
            </div>
            <div class="qr-code">
                <img src="../public/alipay.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>
<style scoped>
.pay-code-container {
    text-align: center;

    h3 {
        padding: 10px 20px 15px;
        font-size: 28px;
    }

    .qrcode-group {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 120px;
        padding: 30px 60px 0px;

        .qr-code {
            background: #d3d3d3;
            padding: 10px;
            border-radius: 10px;

            img {
                width: 100%;
                border-radius: 10px;
            }
        }
    }


}
</style>
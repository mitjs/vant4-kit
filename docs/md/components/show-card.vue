<template>
    <ul class="card-group">
        <li>
            <div></div>
            <div>

            </div>
        </li>
        <li>
            <div></div>
            <div></div>
        </li>
        <li>
            <div></div>
            <div></div>
        </li>
    </ul>
</template>

<script lang="ts" setup>

</script>
<style scoped>
.card-group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
    margin: 0;
    padding: 0;
}

.card-group li {
    list-style: none;
    margin: 0;
    height: 150px;
    background: #e8e8e8;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    vertical-align: middle;
}
</style>
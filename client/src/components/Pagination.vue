<template>
    <div>
        <div>
            <slot></slot>
        </div>
        <div class="pagination-wrapper">
            <ul
                v-if="pager && pager.pages && pager.pages.length"
                class="pagination"
            >
                <li
                    :class="{ disabled: pager.currentPage === 1 }"
                    class="pagination__item pagination__item--first"
                >
                    <router-link
                        :to="{ query: { page: 1 } }"
                        class="pagination__link"
                        >First</router-link
                    >
                </li>
                <li
                    :class="{ disabled: pager.currentPage === 1 }"
                    class="pagination__item pagination__item--previous"
                >
                    <router-link
                        :to="{ query: { page: pager.currentPage - 1 } }"
                        class="pagination__link"
                        >ᐸ</router-link
                    >
                </li>
                <li
                    v-for="page in pager.pages"
                    :key="page"
                    :class="{ active: pager.currentPage === page }"
                    class="pagination__item pagination__item--number"
                >
                    <router-link
                        :to="{ query: { page: page } }"
                        class="pagination__link"
                        >{{ page }}</router-link
                    >
                </li>
                <li
                    :class="{
                        disabled: pager.currentPage === pager.totalPages
                    }"
                    class="pagination__item pagination__item--next"
                >
                    <router-link
                        :to="{
                            query: { page: pager.currentPage + 1 }
                        }"
                        class="pagination__link"
                        >ᐳ</router-link
                    >
                </li>
                <li
                    :class="{
                        disabled: pager.currentPage === pager.totalPages
                    }"
                    class="pagination__item pagination__item--last"
                >
                    <router-link
                        :to="{ query: { page: pager.totalPages } }"
                        class="pagination__link"
                        >Last</router-link
                    >
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        pager: {
            type: Object,
            require: true
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_pagination.scss";
</style>

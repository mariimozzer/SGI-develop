<template>
    <nav>
        <ul class="pagination">
            <li class="page-item" :class="{disabled: currentPage === 0}">
                <a class="page-link" href="#" aria-label="Previous" @click="prevPage">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
            </li>
            <li v-for="n in numberOfPages" :key="n" class="page-item" :class="{active: n === currentPage}">
                <a class="page-link" href="#" @click="setPage(n)">{{ n + 1 }}</a>
            </li>
            <li class="page-item" :class="{disabled: currentPage === numberOfPages - 1}">
                <a class="page-link" href="#" aria-label="Next" @click="nextPage">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "PaginationComponent",

    data() {
        return {
            grupos: [],
            currentPage: 0,
            itemsPerPage: 5,
        }
    },


    computed: {

        paginatedData() {
            const startIndex = this.currentPage * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.grupos.slice(startIndex, endIndex);
        },
        numberOfPages() {
             return Math.ceil(this.grupos.length / this.itemsPerPage);
        }
    },

    methods: {
        setPage(pageNumber) {
            this.currentPage = pageNumber;
        },
        prevPage() {
            if (this.currentPage > 0) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.numberOfPages - 1) {
                this.currentPage++;
            }
        },
    }
}
</script>
